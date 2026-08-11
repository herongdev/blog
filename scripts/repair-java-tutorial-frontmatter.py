#!/usr/bin/env python3
"""Repair YAML and protect legacy Java OneNote Markdown from Vue parsing."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


DEFAULT_ROOT = Path(__file__).resolve().parents[1] / "docs" / "posts" / "java快速入门"
TITLE_LINE = re.compile(r"^title:\s*(.*)$", re.MULTILINE)
FENCED_BLOCK = re.compile(r"```([^\n`]*)\n(.*?)```", re.DOTALL)
INLINE_CODE = re.compile(r"(`+)([^`\n]*?)\1")
MARKDOWN_IMAGE = re.compile(r"!\[[^\]]*\]\((?:<)?([^)\n>]+)(?:>)?\)")


def escape_braces(body: str) -> str:
    def escape_outside_inline(text: str) -> str:
        pieces: list[str] = []
        cursor = 0
        for match in INLINE_CODE.finditer(text):
            pieces.append(
                re.sub(r"(?<!\\)([{}])", r"\\\1", text[cursor : match.start()])
            )
            pieces.append(match.group(0))
            cursor = match.end()
        pieces.append(re.sub(r"(?<!\\)([{}])", r"\\\1", text[cursor:]))
        return "".join(pieces)

    pieces: list[str] = []
    cursor = 0
    for match in FENCED_BLOCK.finditer(body):
        pieces.append(escape_outside_inline(body[cursor : match.start()]))
        pieces.append(match.group(0))
        cursor = match.end()
    pieces.append(escape_outside_inline(body[cursor:]))
    return "".join(pieces)


def remove_missing_local_images(body: str) -> tuple[str, int]:
    removed = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal removed
        target = match.group(1).strip()
        if target.startswith(("http://", "https://", "data:")):
            return match.group(0)
        removed += 1
        return ""

    return MARKDOWN_IMAGE.sub(replace, body), removed


def repair(path: Path) -> tuple[bool, bool, int, bool]:
    raw = path.read_text(encoding="utf-8", errors="replace")
    if not raw.startswith("---\n"):
        return False, False, 0, False
    closing = raw.find("\n---\n", 4)
    if closing == -1:
        return False, False, 0, False
    front = raw[: closing + 5]
    body = raw[closing + 5 :].strip()
    body, removed_images = remove_missing_local_images(body)
    match = TITLE_LINE.search(front)
    title_repaired = False
    if match:
        value = match.group(1).strip()
        if value.startswith(("`", "@")):
            quoted = json.dumps(value, ensure_ascii=False)
            front = front[: match.start()] + f"title: {quoted}" + front[match.end() :]
            title_repaired = True

    metadata_repaired = not re.search(r"^lastUpdated:", front, re.MULTILINE)
    if metadata_repaired:
        front = front[:-4].rstrip() + "\nlastUpdated: false\n---\n"

    wrapped = not body.startswith("::: v-pre")
    if wrapped:
        body = "::: v-pre\n\n" + escape_braces(body) + "\n\n:::"

    if title_repaired or wrapped or removed_images or metadata_repaired:
        path.write_text(front + body + "\n", encoding="utf-8")
    return title_repaired, wrapped, removed_images, metadata_repaired


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args()
    title_count = 0
    wrapped_count = 0
    removed_image_count = 0
    metadata_count = 0
    for path in sorted(args.root.rglob("*.md")):
        title_repaired, wrapped, removed_images, metadata_repaired = repair(path)
        title_count += int(title_repaired)
        wrapped_count += int(wrapped)
        removed_image_count += removed_images
        metadata_count += int(metadata_repaired)
    print(f"Repaired {title_count} Java tutorial titles")
    print(f"Wrapped {wrapped_count} Java tutorial pages with v-pre")
    print(f"Removed {removed_image_count} missing local image references")
    print(f"Disabled Git last-updated lookup on {metadata_count} imported pages")


if __name__ == "__main__":
    main()
