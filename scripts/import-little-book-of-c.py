#!/usr/bin/env python3
"""Import The Little Book of C into docs/posts/c教程/."""

from __future__ import annotations

import re
from datetime import date
from pathlib import Path

SOURCE = Path(
    "/Users/ronnie/.cursor/projects/Users-ronnie-Documents-my-project-blog/agent-tools/52d18021-2e84-4bf6-a5cf-65de0aad7d92.txt"
)
DEST = Path("/Users/ronnie/Documents/my-project/blog/docs/posts/c教程/en-US")

CHAPTER_MAP = {
    1: "01-Getting Started",
    2: "02-Language Basics",
    3: "03-Working with Memory",
    4: "04-Structuring Data",
    5: "05-Input Output and Files",
    6: "06-Compilation and Build",
    7: "07-Working Close to the System",
    8: "08-Debugging Testing Profiling",
    9: "09-Portable and Modern C",
    10: "10-Building Real Projects",
    11: "11-Epilogue",
}

EPILOGUE_HEADERS = {
    "## Epilogue. The Spirit of C": "Epilogue-The Spirit of C",
    "## The Path Beyond": "The Path Beyond",
    "## A Note from the Author": "A Note from the Author",
    "## Final Exercise": "Final Exercise",
}

SECTION_RE = re.compile(r"^###\s+(\d+)\.\s+(.+)$")
CHAPTER_RE = re.compile(r"^#\s+Chapter\s+(\d+)\\?\.\s+(.+)$")
SKIP_PREFIXES = (
    "Source URL:",
    "Title:",
    "1. The Book",
    "* Content",
    "| * Content",
    "## Table of contents",
)


def unescape(text: str) -> str:
    return text.replace("\\.", ".").replace("\\_", "_").strip()


def slugify(text: str, max_len: int = 80) -> str:
    text = unescape(text)
    text = re.sub(r'[<>:"/\\|?*]', "", text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > max_len:
        text = text[: max_len - 3].rstrip() + "..."
    return text or "untitled"


def normalize_body(lines: list[str]) -> str:
    out: list[str] = []
    for line in lines:
        if line.startswith("# Chapter ") or line.strip() == "# The Book":
            continue
        if line.startswith("### "):
            title = unescape(line[4:].strip())
            out.append(f"# {title}")
            continue
        if line.startswith("## Epilogue") or line in EPILOGUE_HEADERS:
            title = unescape(line.lstrip("#").strip())
            out.append(f"# {title}")
            continue
        out.append(line)
    body = "\n".join(out).strip()
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body + "\n"


def front_matter(title: str, chapter_dir: str, num: str) -> str:
    safe = title.replace('"', '\\"')
    ch_tag = chapter_dir.split("-", 1)[-1] if "-" in chapter_dir else chapter_dir
    return f"""---
title: "{safe}"
date: {date.today().isoformat()}
categories: [C 教程]
tags: [C, Little Book of C, {ch_tag}]
description: The Little Book of C — {safe}
source: https://little-book-of.github.io/c/books/en-US/book.html
license: CC BY-NC-SA 4.0
originalAuthor: Duc-Tam Nguyen
section: {num}
sidebarWeight: {num}
---

"""


def parse_sections(text: str) -> list[dict]:
    lines = text.splitlines()
    start = 0
    for i, line in enumerate(lines):
        if line.startswith("# Chapter 1"):
            start = i
            break

    sections: list[dict] = []
    chapter_num = 1
    current: dict | None = None
    buffer: list[str] = []

    def flush() -> None:
        nonlocal current, buffer
        if not current:
            buffer = []
            return
        body = normalize_body(buffer)
        if body.strip():
            current["body"] = body
            sections.append(current)
        current = None
        buffer = []

    for line in lines[start:]:
        if any(line.startswith(p) for p in SKIP_PREFIXES):
            continue
        if line.startswith("* Chapter ") or line.startswith("   * "):
            continue

        cm = CHAPTER_RE.match(line)
        if cm:
            flush()
            chapter_num = int(cm.group(1))
            continue

        sm = SECTION_RE.match(line)
        if sm:
            flush()
            num = int(sm.group(1))
            title = unescape(sm.group(2))
            ch = 11 if num > 100 else min((num - 1) // 10 + 1, 10)
            if num == 100:
                ch = 10
            current = {
                "num": num,
                "title": f"{num}. {title}",
                "chapter": CHAPTER_MAP.get(ch, CHAPTER_MAP[10]),
                "filename": f"{num:03d}-{slugify(title)}.md",
            }
            buffer = []
            continue

        for hdr, fname in EPILOGUE_HEADERS.items():
            if line.strip() == hdr:
                flush()
                title = unescape(hdr.lstrip("#").strip())
                current = {
                    "num": 1000 + len([s for s in sections if s["chapter"] == CHAPTER_MAP[11]]),
                    "title": title,
                    "chapter": CHAPTER_MAP[11],
                    "filename": f"{slugify(fname)}.md",
                }
                buffer = []
                break
        else:
            if line.strip() == "The Little Book of C End of Volume":
                flush()
                break
            if current is not None:
                buffer.append(line)
            continue
        continue

    flush()
    return sections


def build_readme(sections: list[dict]) -> str:
    from collections import defaultdict

    by_ch: dict[str, list[dict]] = defaultdict(list)
    for s in sections:
        by_ch[s["chapter"]].append(s)

    lines = [
        "---",
        "title: The Little Book of C 教程总览",
        f"date: {date.today().isoformat()}",
        "categories: [C 教程]",
        "tags: [C, Little Book of C, 教程]",
        "sidebarWeight: 0",
        "description: 基于 The Little Book of C（Duc-Tam Nguyen）整理的 C 语言系统教程，共 10 章 + 结语。",
        "---",
        "",
        "# The Little Book of C 教程总览",
        "",
        "> 英文原文教程，按章节拆分便于检索与学习。",
        "",
        "**出处：** [The Little Book of C](https://little-book-of.github.io/c/books/en-US/book.html) · Duc-Tam Nguyen · [GitHub](https://github.com/little-book-of/c)",
        "",
        "**许可：** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)（非商业、署名、相同方式共享）",
        "",
        "---",
        "",
    ]

    for ch in sorted(by_ch.keys()):
        items = sorted(by_ch[ch], key=lambda x: x["num"])
        lines.append(f"## {ch}（{len(items)} 篇）")
        lines.append("")
        for s in items:
            rel = f"./{ch}/{s['filename']}"
            lines.append(f"- [{s['title']}]({rel})")
        lines.append("")

    lines.append(f"*共 {len(sections)} 篇*")
    return "\n".join(lines) + "\n"


def main() -> None:
    if not SOURCE.is_file():
        raise SystemExit(f"Source not found: {SOURCE}")

    if DEST.exists():
        import shutil

        shutil.rmtree(DEST)
    DEST.mkdir(parents=True)

    text = SOURCE.read_text(encoding="utf-8")
    sections = parse_sections(text)

    for s in sections:
        ch_dir = DEST / s["chapter"]
        ch_dir.mkdir(parents=True, exist_ok=True)
        path = ch_dir / s["filename"]
        fm = front_matter(s["title"], s["chapter"], str(s["num"]))
        path.write_text(fm + s["body"], encoding="utf-8")

    (DEST / "README.md").write_text(build_readme(sections), encoding="utf-8")

    print(f"Wrote {len(sections)} articles to {DEST}")


if __name__ == "__main__":
    main()
