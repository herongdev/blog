#!/usr/bin/env python3
"""Independent file/PCM/timing checks; no synthesis and no subjective listening claim."""
from pathlib import Path
from importlib.metadata import version
import array
import hashlib
import json
import math
import os
import re
import subprocess
import unicodedata
import wave

BASE = Path(__file__).resolve().parent
OUT = Path(os.environ.get('COURSE_OUTPUT_DIR', str(BASE / 'output'))).resolve()
LESSON = Path(os.environ.get('COURSE_LESSON_FILE', str(BASE / 'lesson.json'))).resolve()
SR, TICKS, FPS = 48000, 10_000_000, 24


def require(ok, message):
    if not ok:
        raise RuntimeError(message)


def read(path):
    return json.loads(path.read_text())


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def norm(text):
    return ''.join(c for c in text if not c.isspace() and not unicodedata.category(c).startswith('P'))


def pcm(path):
    with wave.open(str(path), 'rb') as audio:
        require((audio.getframerate(), audio.getnchannels(), audio.getsampwidth()) == (SR, 1, 2), f'Wrong PCM format: {path}')
        return audio.readframes(audio.getnframes())


def main():
    lesson = read(LESSON)
    timing = read(OUT / 'actual-timing.json')
    source_text = ''.join(t for s in lesson['scenes'] for t in s['captions'])
    caption_count = sum(len(s['captions']) for s in lesson['scenes'])
    require(caption_count > 0, 'Expected a non-empty lesson')
    require(''.join(c['text'] for c in timing['cues']) == source_text, 'Timeline text differs from original script')
    srt = (OUT / 'subtitles.srt').read_text().strip()
    blocks = [b.splitlines() for b in re.split(r'\n\s*\n', srt)]
    require(''.join(''.join(b[2:]) for b in blocks) == source_text, 'SRT text differs from original script')
    require(len(blocks) == len(timing['cues']), 'SRT/timeline cue count differs')

    def seconds(stamp):
        h, m, s, ms = map(int, re.split('[:,]', stamp))
        return h * 3600 + m * 60 + s + ms / 1000

    previous_end = 0
    for i, (cue, block) in enumerate(zip(timing['cues'], blocks)):
        require(cue['start'] >= previous_end - 1e-7 and cue['end'] > cue['start'], f'Overlapping/invalid caption {i}')
        a, b = map(seconds, block[1].split(' --> '))
        require(abs(a - cue['start']) <= .000501 and abs(b - cue['end']) <= .000501, f'SRT time mismatch {i}')
        require(int(block[0]) == i + 1, f'SRT index mismatch {i}')
        previous_end = cue['end']

    all_pcm = bytearray()
    global_words = []
    scenes = []
    for scene in lesson['scenes']:
        sid = scene['id']
        folder = BASE / 'narration'
        meta = read(folder / f'{sid}.metadata.json')
        raw_meta = read(folder / f'{sid}.raw.metadata.json')
        raw_words = read(folder / f'{sid}.raw.words.json')
        words = read(folder / f'{sid}.words.json')
        pauses = read(folder / f'{sid}.pauses.json')['pauses']
        require(len(pauses) == len(scene['cues']), f'Pause cue count differs {sid}')
        for pause, cue in zip(pauses, scene['cues']):
            requested = float(cue.get('pause_after_min_seconds', 0))
            require(pause['text'] == cue['text'] and abs(pause['target_min_gap_seconds'] - requested) < 1e-8,
                    f'Pause belongs to a different script/settings {sid}')
            require(pause['processed_gap_seconds'] + 1 / SR >= requested, f'Requested pause is missing {sid}')
        expected = {'text': ''.join(scene['captions']), 'voice': 'zh-CN-YunxiNeural',
                    'rate': '-3%' if sid == 'intro' else '-5%', 'pitch': '+0Hz', 'volume': '+0%',
                    'boundary': 'WordBoundary', 'edge_tts_version': version('edge-tts'),
                    'synthesis_method': 'edge-tts.Communicate.stream-real-WordBoundary-v1',
                    'processing_version': 'whole-scene-real-word-boundaries-minimum-semantic-pauses-v1'}
        fingerprint = hashlib.sha256(json.dumps(expected, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        require(meta['status'] == 'complete', f'Incomplete scene {sid}')
        for record in (meta, raw_meta):
            require(record['request'] == expected and record['request_sha256'] == fingerprint, f'Cache identity differs {sid}')
        require(sha(folder / f'{sid}.raw.mp3') == raw_meta['sha256'] == meta['raw_audio_sha256'], f'Raw audio hash differs {sid}')
        require(sha(folder / f'{sid}.raw.words.json') == raw_meta['words_sha256'] == meta['raw_words_sha256'], f'Word data hash differs {sid}')
        require(sha(folder / f'{sid}.wav') == meta['sha256'], f'Processed WAV hash differs {sid}')
        require(norm(''.join(w['text'] for w in raw_words)) == norm(expected['text']), f'WordBoundary text differs {sid}')
        require(len(raw_words) == len(words), f'WordBoundary count differs {sid}')
        raw = pcm(folder / f'{sid}.raw.wav')
        processed = pcm(folder / f'{sid}.wav')
        decoded = subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', str(folder / f'{sid}.raw.mp3'),
                                  '-ar', str(SR), '-ac', '1', '-f', 's16le', '-'], capture_output=True, check=True)
        require(decoded.stdout == raw, f'Raw WAV differs from freshly decoded MP3 {sid}')
        # Remove only the declared zero insertions; recover every original byte in order.
        recovered = bytearray()
        previous = shift = 0
        for pause in pauses:
            count = pause['inserted_samples']
            if not count:
                continue
            start = (pause['cut_sample_raw'] + shift) * 2
            end = start + count * 2
            require(start >= previous and processed[start:end] == b'\0' * (count * 2), f'Inserted interval is not silence {sid}')
            recovered.extend(processed[previous:start])
            previous = end
            shift += count
        recovered.extend(processed[previous:])
        require(bytes(recovered) == raw, f'Original PCM was changed/dropped {sid}')
        for index, (original, changed) in enumerate(zip(raw_words, words)):
            shift_samples = sum(p['inserted_samples'] for p in pauses if p['inserted_samples'] and not p['tail']
                                and p['cut_sample_raw'] / SR <= original['offset'] / TICKS)
            require(changed['offset'] == original['offset'] + round(shift_samples * TICKS / SR), f'Word timing shift differs {sid}/{index}')
            require(changed['text'] == original['text'] and changed['duration'] == original['duration']
                    and changed['type'] == original['type'] == 'WordBoundary', f'Word event changed {sid}/{index}')
            if index:
                prior = words[index - 1]
                require(changed['offset'] >= prior['offset'] + prior['duration'] - 10, f'Overlapping word events {sid}/{index}')
            base = len(all_pcm) / 2 / SR
            global_words.append((base + changed['offset'] / TICKS, base + (changed['offset'] + changed['duration']) / TICKS))
        all_pcm.extend(processed)
        scenes.append({'id': sid, 'word_boundaries': len(words), 'pcm_preserved': True, 'cache_identity_verified': True})

    master = pcm(OUT / 'narration.wav')
    require(master == bytes(all_pcm), 'Master WAV differs from the exact scene PCM concatenation')
    samples = array.array('h', master)
    peak = max(abs(s) for s in samples)
    require(peak > 100, 'Master audio is silent')
    duration = len(master) / 2 / SR
    require(abs(timing['duration'] - duration) < 1 / SR and previous_end <= duration + 1 / SR, 'Timeline duration differs from PCM')
    flattened = [w for cue in timing['cues'] for w in cue['words']]
    require(len(flattened) == len(global_words), 'Timeline dropped WordBoundary events')
    for i, (word, actual) in enumerate(zip(flattened, global_words)):
        require(abs(word['start'] - actual[0]) < 1e-7 and abs(word['end'] - actual[1]) < 1e-7, f'Timeline word differs {i}')

    final = OUT / 'full-course-original-voice.mp4'
    probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(final)]))
    videos = [s for s in probe['streams'] if s['codec_type'] == 'video']
    audios = [s for s in probe['streams'] if s['codec_type'] == 'audio']
    require(len(videos) == len(audios) == 1, 'Expected exactly one video and one audio stream')
    video, audio = videos[0], audios[0]
    require(video['codec_name'] == 'h264' and audio['codec_name'] == 'aac', 'Unexpected delivery codecs')
    require(video['avg_frame_rate'] == '24/1' and int(video['nb_frames']) == math.ceil(duration * FPS), 'Video frame count/rate differs')
    require(abs(float(video['duration']) - duration) <= 1 / FPS + .001
            and abs(float(audio['duration']) - duration) <= 1024 / SR + .001, 'Audio/video duration mismatch')
    result = {'status': 'passed', 'file': str(final), 'duration_seconds': float(probe['format']['duration']),
              'pcm_seconds': duration, 'script_captions': caption_count, 'subtitle_chunks': len(blocks),
              'real_word_boundaries': len(global_words), 'scenes': scenes, 'original_pcm_preserved': True,
              'master_pcm_exact_concatenation': True, 'subtitle_text_complete_nonoverlapping': True,
              'word_times_match_real_events': True, 'peak_pcm_sample': peak, 'audio_video_duration_verified': True,
              'full_decode': 'performed separately by main agent', 'auditory_quality_review': 'not_performed',
              'voice': 'zh-CN-YunxiNeural', 'opening_rate': '-3%', 'body_rate': '-5%', 'pitch': '+0Hz', 'volume': '+0%'}
    (OUT / 'delivery-validation.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(result, ensure_ascii=False))


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        (OUT / 'delivery-validation.json').write_text(json.dumps({'status': 'failed', 'error': str(exc),
            'auditory_quality_review': 'not_performed'}, ensure_ascii=False, indent=2) + '\n')
        raise
