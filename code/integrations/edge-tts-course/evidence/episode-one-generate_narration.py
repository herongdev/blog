"""Generate whole-scene TTS, then add only the missing pedagogical pauses.

The original MP3 and WordBoundary events remain intact. Derived 48 kHz PCM
tracks retain every original sample and add zero-valued samples only in
verified between-word gaps or at the tail. Derived word timings equal the
original timings plus the exact known sample shifts; no uniform timing exists.
"""
from __future__ import annotations

import truststore
truststore.inject_into_ssl()
import argparse
import array
import asyncio
import copy
import hashlib
import json
import math
import os
import re
import ssl
import subprocess
import unicodedata
import wave
from pathlib import Path

import edge_tts
import edge_tts.communicate

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "narration"
VOICE = "zh-CN-YunxiNeural"
DEFAULT_RATE = "-5%"
SAMPLE_RATE = 48000
TICKS = 10_000_000
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
PROCESSING_VERSION = "whole-scene-real-word-boundaries-minimum-semantic-pauses-v1"


def dump(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def norm(text):
    return "".join(c for c in text if not c.isspace() and not unicodedata.category(c).startswith("P"))


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def probe(path):
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration:stream=codec_name,sample_rate,channels", "-of", "json", str(path)
    ], text=True))


def request_fingerprint(scene):
    request = {"text": "".join(scene["captions"]), "voice": VOICE,
               "rate": scene.get("suggested_rate", DEFAULT_RATE), "boundary": "WordBoundary"}
    return hashlib.sha256(json.dumps(request, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def map_cues(scene, events):
    script = norm("".join(scene["captions"]))
    cursor = 0
    spans = []
    for index, event in enumerate(events):
        assert event["type"] == "WordBoundary", (scene["id"], index)
        word = norm(event["text"])
        assert word and script[cursor:cursor + len(word)] == word, (scene["id"], index, event)
        assert event["duration"] > 0 and event["offset"] >= 0
        if index:
            prior = events[index - 1]
            assert event["offset"] >= prior["offset"] + prior["duration"] - 10
        spans.append((cursor, cursor + len(word)))
        cursor += len(word)
    assert cursor == len(script), (scene["id"], cursor, len(script))
    mapped = []
    cursor = 0
    for index, text in enumerate(scene["captions"]):
        last = cursor + len(norm(text))
        ids = [i for i, (a, b) in enumerate(spans) if cursor <= a < last]
        assert ids and all(spans[i][1] <= last for i in ids), (scene["id"], index, "cue crosses TTS word")
        cue = scene["cues"][index]
        assert cue["text"] == text
        mapped.append({"index": index, "text": text, "first_event": ids[0], "last_event": ids[-1],
                       "pause_after_min_seconds": float(cue.get("pause_after_min_seconds", 0))})
        cursor = last
    return mapped


def choose_quiet_cut(samples, start, end):
    """Select a low-energy, near-zero cut inside the middle of a real word gap."""
    assert 0 <= start <= end <= len(samples), (start, end, len(samples))
    if end - start < 3:
        middle = (start + end) // 2
        return middle, {"method": "event-gap-midpoint", "rms_4ms": None,
                        "cut_abs_sample": abs(samples[middle]) if middle < len(samples) else 0}
    # Staying inside the central 70% avoids boundary estimates at word tails.
    guard = min(round((end - start) * .15), round(.025 * SAMPLE_RATE))
    left, right = start + guard, end - guard
    radius = min(round(.002 * SAMPLE_RATE), max(1, (right - left) // 4))
    middle = (left + right) // 2
    section = samples[left:right]
    energy = [0]
    for sample in section:
        energy.append(energy[-1] + sample * sample)
    candidates = range(left + radius, right - radius + 1, 8)
    if not candidates:
        candidates = [middle]
    def score(index):
        a, b = max(left, index - radius), min(right, index + radius)
        mean_square = (energy[b - left] - energy[a - left]) / max(1, b - a)
        return mean_square, abs(index - middle)
    quiet = min(candidates, key=score)
    # Within the quiet window choose the nearest zero-crossing sample.
    a, b = max(left, quiet - radius // 2), min(right - 1, quiet + radius // 2)
    cut = min(range(a, b + 1), key=lambda i: (abs(samples[i]), abs(i - quiet)))
    rms = math.sqrt(score(quiet)[0])
    return cut, {"method": "middle-gap-minimum-4ms-PCM-energy-then-near-zero-sample",
                 "rms_4ms": round(rms, 4), "cut_abs_sample": abs(samples[cut]),
                 "event_gap_samples": [start, end], "central_search_samples": [left, right]}


def process_pauses(scene, events, raw_media):
    sid = scene["id"]
    raw_pcm = OUT / f"{sid}.raw.wav"
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw_media),
        "-ac", "1", "-ar", str(SAMPLE_RATE), "-c:a", "pcm_s16le", str(raw_pcm)
    ], check=True)
    with wave.open(str(raw_pcm), "rb") as source:
        assert source.getnchannels() == 1 and source.getsampwidth() == 2 and source.getframerate() == SAMPLE_RATE
        raw_bytes = source.readframes(source.getnframes())
    samples = array.array("h")
    samples.frombytes(raw_bytes)
    raw_count = len(samples)
    raw_duration = raw_count / SAMPLE_RATE
    cues = map_cues(scene, events)
    cuts = []
    pauses = []
    for cue in cues:
        target = cue["pause_after_min_seconds"]
        final_event = events[cue["last_event"]]
        end = (final_event["offset"] + final_event["duration"]) / TICKS
        tail = cue["index"] == len(cues) - 1
        following = None if tail else events[cues[cue["index"] + 1]["first_event"]]
        next_start = raw_duration if tail else following["offset"] / TICKS
        raw_gap = next_start - end
        assert raw_gap >= -.025 if tail else raw_gap >= -1e-6, (sid, cue["index"], raw_gap)
        addition = max(0, math.ceil((target - raw_gap - 1e-8) * SAMPLE_RATE))
        record = {"cue_index": cue["index"], "text": cue["text"], "target_min_gap_seconds": target,
                  "original_gap_seconds": raw_gap, "inserted_samples": addition,
                  "inserted_seconds": addition / SAMPLE_RATE, "after_raw_event_index": cue["last_event"],
                  "tail": tail}
        if addition:
            if tail:
                cut, details = raw_count, {"method": "append-after-original-PCM-tail", "rms_4ms": 0,
                                           "cut_abs_sample": 0}
            else:
                first = max(0, min(raw_count, math.ceil(end * SAMPLE_RATE)))
                last = max(first, min(raw_count, math.floor(next_start * SAMPLE_RATE)))
                cut, details = choose_quiet_cut(samples, first, last)
                assert (cut / SAMPLE_RATE) >= end - 1 / SAMPLE_RATE
                assert (cut / SAMPLE_RATE) <= next_start + 1 / SAMPLE_RATE
                # Inserting at strong waveform amplitude risks an audible click.
                assert details["cut_abs_sample"] <= 1500, (sid, cue["index"], "No sufficiently quiet cut", details)
            record.update(cut_sample_raw=cut, cut_time_raw_seconds=cut / SAMPLE_RATE, **details)
            cuts.append(record)
        pauses.append(record)
    output = bytearray()
    previous = 0
    for cut in cuts:
        location = cut["cut_sample_raw"]
        assert location >= previous
        output.extend(raw_bytes[previous * 2:location * 2])
        output.extend(b"\0\0" * cut["inserted_samples"])
        previous = location
    output.extend(raw_bytes[previous * 2:])
    media = OUT / f"{sid}.wav"
    with wave.open(str(media), "wb") as target:
        target.setnchannels(1)
        target.setsampwidth(2)
        target.setframerate(SAMPLE_RATE)
        target.writeframes(output)
    shifted = []
    for index, event in enumerate(events):
        shift_samples = sum(c["inserted_samples"] for c in cuts if not c["tail"] and index > c["after_raw_event_index"])
        changed = copy.deepcopy(event)
        changed["offset"] += round(shift_samples / SAMPLE_RATE * TICKS)
        changed["original_offset"] = event["offset"]
        changed["original_duration"] = event["duration"]
        changed["original_event_index"] = index
        changed["silence_shift_samples"] = shift_samples
        shifted.append(changed)
    duration = len(output) / 2 / SAMPLE_RATE
    assert len(output) == len(raw_bytes) + sum(c["inserted_samples"] for c in cuts) * 2
    # Re-map the complete word sequence and verify each declared minimum pause.
    map_cues(scene, shifted)
    for pause, cue in zip(pauses, cues):
        last = shifted[cue["last_event"]]
        last_end = (last["offset"] + last["duration"]) / TICKS
        next_start = duration if pause["tail"] else shifted[cues[cue["index"] + 1]["first_event"]]["offset"] / TICKS
        actual = next_start - last_end
        pause["processed_gap_seconds"] = actual
        pause["minimum_satisfied"] = actual + 1 / SAMPLE_RATE >= pause["target_min_gap_seconds"]
        assert pause["minimum_satisfied"], (sid, cue["index"], pause)
    words = OUT / f"{sid}.words.json"
    pauses_file = OUT / f"{sid}.pauses.json"
    dump(words, shifted)
    dump(pauses_file, {
        "scene": sid, "processing_version": PROCESSING_VERSION, "sample_rate": SAMPLE_RATE,
        "timing_source": "original_tts_word_boundaries_plus_exact_inserted_silence_sample_shifts",
        "raw_audio": raw_media.name, "raw_pcm": raw_pcm.name, "raw_words": f"{sid}.raw.words.json",
        "processed_audio": media.name, "processed_words": words.name,
        "original_samples": raw_count, "processed_samples": len(output) // 2,
        "inserted_samples": sum(c["inserted_samples"] for c in cuts),
        "original_pcm_duration": raw_duration, "processed_duration": duration,
        "all_original_PCM_samples_preserved_in_order": True, "pauses": pauses
    })
    decoded = subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(media), "-f", "null", "-"],
                             capture_output=True, text=True)
    assert decoded.returncode == 0 and not decoded.stderr.strip(), decoded.stderr
    return {
        "audio": media.name, "words": words.name, "pause_table": pauses_file.name,
        "duration": duration, "boundaries": len(events), "sha256": digest(media),
        "raw_audio": raw_media.name, "raw_words": f"{sid}.raw.words.json", "raw_pcm": raw_pcm.name,
        "raw_duration": raw_duration, "added_silence_seconds": duration - raw_duration,
        "streams": probe(media)["streams"], "all_minimum_pauses_verified": True,
        "full_audio_decode_verified": True,
        "timing_source": "original_tts_word_boundaries_plus_exact_inserted_silence_sample_shifts"
    }


async def synthesize(scene, sem, force=False):
    async with sem:
        sid = scene["id"]
        spoken = "".join(scene["captions"])
        rate = scene.get("suggested_rate", DEFAULT_RATE)
        raw_media = OUT / f"{sid}.raw.mp3"
        raw_words = OUT / f"{sid}.raw.words.json"
        raw_metadata = OUT / f"{sid}.raw.metadata.json"
        request_hash = request_fingerprint(scene)
        record = {"id": sid, "text": spoken, "captions": scene["captions"], "voice": VOICE,
                  "rate": rate, "request_sha256": request_hash, "status": "pending",
                  "processing_version": PROCESSING_VERSION}
        events = []
        # One whole-scene synthesis preserves clause-level prosody across subtitle lines.
        async def receive():
            events.clear()
            speech = edge_tts.Communicate(spoken, VOICE, rate=rate, pitch="+0Hz", volume="+0%",
                                         boundary="WordBoundary", proxy=PROXY,
                                         connect_timeout=10, receive_timeout=35)
            with raw_media.open("wb") as target:
                async for item in speech.stream():
                    if item["type"] == "audio":
                        target.write(item["data"])
                    elif item["type"] in ("WordBoundary", "SentenceBoundary"):
                        events.append(dict(item))
        try:
            reusable = False
            if not force and raw_media.exists() and raw_words.exists() and raw_metadata.exists():
                cached = json.loads(raw_metadata.read_text())
                reusable = cached.get("request_sha256") == request_hash and cached.get("sha256") == digest(raw_media)
            if reusable:
                events = json.loads(raw_words.read_text())
            else:
                await asyncio.wait_for(receive(), timeout=65)
                map_cues(scene, events)
                dump(raw_words, events)
                dump(raw_metadata, {"id": sid, "text": spoken, "captions": scene["captions"],
                                    "voice": VOICE, "rate": rate, "request_sha256": request_hash,
                                    "sha256": digest(raw_media), "boundary": "WordBoundary",
                                    "same_stream_audio_and_events": True, "duration": float(probe(raw_media)["format"]["duration"])})
            result = await asyncio.to_thread(process_pauses, scene, events, raw_media)
            record.update(status="complete", **result)
            print(json.dumps({"scene": sid, "status": "complete", "duration": record["duration"],
                              "raw_duration": record["raw_duration"], "added_silence": record["added_silence_seconds"],
                              "words": len(events), "raw_cache_reused": reusable}, ensure_ascii=False), flush=True)
        except Exception as exc:
            message = re.sub(r"https?://\S+", "[URL omitted]", str(exc))
            if PROXY:
                message = message.replace(PROXY, "[configured proxy]")
            record.update(status="failed", error_type=type(exc).__name__, message=message[:600])
            print(json.dumps({"scene": sid, "status": "failed", "type": type(exc).__name__, "message": message[:600]}, ensure_ascii=False), flush=True)
        dump(OUT / f"{sid}.metadata.json", record)
        return record


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*")
    parser.add_argument("--force-tts", action="store_true")
    args = parser.parse_args()
    OUT.mkdir(exist_ok=True)
    assert PROXY, "Existing environment proxy required."
    ctx = edge_tts.communicate._SSL_CTX
    assert ctx.verify_mode == ssl.CERT_REQUIRED and ctx.check_hostname
    lesson = json.loads((ROOT / "lesson.json").read_text())
    selected = [s for s in lesson["scenes"] if not args.only or s["id"] in args.only]
    sem = asyncio.Semaphore(2)
    results = await asyncio.gather(*(synthesize(s, sem, args.force_tts) for s in selected))
    records = []
    for scene in lesson["scenes"]:
        path = OUT / f'{scene["id"]}.metadata.json'
        if path.exists():
            record = json.loads(path.read_text())
            if record.get("request_sha256") == request_fingerprint(scene):
                records.append(record)
    complete = len(records) == len(lesson["scenes"]) and all(r["status"] == "complete" for r in records)
    by_id = {r["id"]: r for r in records if r["status"] == "complete"}
    durations = {v: sum(by_id[i]["duration"] for i in cfg["scene_ids"])
                 for v, cfg in lesson["variants"].items() if all(i in by_id for i in cfg["scene_ids"])}
    manifest = {
        "status": "complete" if complete else "incomplete", "voice": VOICE,
        "rate": "per-scene: hook -3%, other scenes -5%", "boundary": "WordBoundary",
        "timing_source": "original_tts_word_boundaries_plus_exact_inserted_silence_sample_shifts",
        "processing_version": PROCESSING_VERSION,
        "network": "existing proxy with normal system CA verification",
        "original_audio_preserved": True, "original_word_events_preserved": True,
        "raw_mp3_is_not_the_paced_program_audio": True, "variant_duration_seconds_before_frame_padding": durations,
        "scenes": records
    }
    dump(OUT / "manifest.json", manifest)
    print(json.dumps({"status": manifest["status"], "durations": durations}, ensure_ascii=False), flush=True)
    if any(r["status"] != "complete" for r in results):
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
