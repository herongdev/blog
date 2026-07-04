#!/usr/bin/env python3
"""Build zh-CN from en-US for The Little Book of C tutorial."""

from __future__ import annotations

import re
import time
from datetime import date
from pathlib import Path

import yaml
from deep_translator import GoogleTranslator

ROOT = Path("/Users/ronnie/Documents/my-project/blog/docs/posts/c教程")
EN = ROOT / "en-US"
ZH = ROOT / "zh-CN"

CHAPTER_ZH = {
    "01-Getting Started": "01-入门",
    "02-Language Basics": "02-语言基础",
    "03-Working with Memory": "03-内存",
    "04-Structuring Data": "04-数据结构",
    "05-Input Output and Files": "05-输入输出与文件",
    "06-Compilation and Build": "06-编译与构建",
    "07-Working Close to the System": "07-贴近系统",
    "08-Debugging Testing Profiling": "08-调试测试与 profiling",
    "09-Portable and Modern C": "09-可移植与现代 C",
    "10-Building Real Projects": "10-真实项目",
    "11-Epilogue": "11-结语",
}

TITLE_ZH = {
    "Epilogue. The Spirit of C": "结语：C 的精神",
    "The Path Beyond": "此后的路径",
    "A Note from the Author": "作者的话",
    "Final Exercise": "最后的练习",
}

translator = GoogleTranslator(source="en", target="zh-CN")
CODE_FENCE = re.compile(r"(```[\s\S]*?```|`[^`\n]+`)")


def split_preserve_code(text: str) -> list[tuple[str, bool]]:
    parts: list[tuple[str, bool]] = []
    last = 0
    for m in CODE_FENCE.finditer(text):
        if m.start() > last:
            parts.append((text[last : m.start()], False))
        parts.append((m.group(0), True))
        last = m.end()
    if last < len(text):
        parts.append((text[last:], False))
    return parts


def translate_text(text: str, retries: int = 3) -> str:
    text = text.strip()
    if not text:
        return text
    if re.fullmatch(r"[\d\s\W]+", text):
        return text
    for i in range(retries):
        try:
            # Google limit ~5000 chars; chunk long paragraphs
            if len(text) <= 4500:
                return translator.translate(text)
            chunks: list[str] = []
            buf = ""
            for para in text.split("\n\n"):
                if len(buf) + len(para) > 4000:
                    if buf.strip():
                        chunks.append(translator.translate(buf.strip()))
                    buf = para
                else:
                    buf = f"{buf}\n\n{para}" if buf else para
            if buf.strip():
                chunks.append(translator.translate(buf.strip()))
            return "\n\n".join(chunks)
        except Exception as e:
            if i == retries - 1:
                print(f"  WARN translate failed: {e}")
                return text
            time.sleep(2 * (i + 1))
    return text


def translate_mixed_line(line: str) -> str:
    parts = split_preserve_code(line)
    out: list[str] = []
    for chunk, is_code in parts:
        out.append(chunk if is_code else translate_text(chunk))
    return "".join(out)


def translate_body(body: str) -> str:
    blocks = re.split(r"\n\n+", body.strip())
    out_blocks: list[str] = []

    for block in blocks:
        block = block.strip()
        if not block:
            continue
        if block.startswith("```") and block.endswith("```"):
            out_blocks.append(block)
            continue

        lines = block.split("\n")
        if len(lines) == 1 and lines[0].startswith("#"):
            prefix = re.match(r"^(#+\s*)", lines[0]).group(1)
            heading = lines[0][len(prefix) :]
            m = re.match(r"^(\d+\.\s*)(.+)$", heading)
            if m:
                out_blocks.append(f"{prefix}{m.group(1)}{translate_text(m.group(2))}")
            else:
                out_blocks.append(f"{prefix}{translate_text(heading)}")
            time.sleep(0.12)
            continue

        if all(l.startswith("#") for l in lines if l.strip()):
            translated_lines = []
            for line in lines:
                if not line.strip():
                    continue
                prefix = re.match(r"^(#+\s*)", line).group(1)
                heading = line[len(prefix) :]
                translated_lines.append(f"{prefix}{translate_text(heading)}")
            out_blocks.append("\n".join(translated_lines))
            time.sleep(0.12)
            continue

        if "`" in block:
            out_blocks.append("\n".join(translate_mixed_line(ln) for ln in lines))
        else:
            out_blocks.append(translate_text(block))
        time.sleep(0.12)

    return "\n\n".join(out_blocks) + "\n"


def dump_fm(fm: dict) -> str:
    lines = ["---"]
    for key, val in fm.items():
        if val is None:
            continue
        if isinstance(val, list):
            lines.append(f"{key}:")
            for item in val:
                lines.append(f"  - {yaml_quote(str(item))}")
        elif isinstance(val, (int, float, bool)):
            lines.append(f"{key}: {val}")
        else:
            lines.append(f"{key}: {yaml_quote(str(val))}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def yaml_quote(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def parse_fm(raw: str) -> tuple[dict, str]:
    if not raw.startswith("---"):
        return {}, raw
    end = raw.find("\n---\n", 4)
    if end == -1:
        return {}, raw
    fm_text = raw[4:end]
    body = raw[end + 5 :]
    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError:
        fm = {}
        for line in fm_text.splitlines():
            if ":" not in line or line.strip().startswith("#"):
                continue
            k, _, v = line.partition(":")
            v = v.strip().strip('"')
            fm[k.strip()] = v
    return fm, body


def en_path_to_zh(en_file: Path) -> Path:
    rel = en_file.relative_to(EN)
    ch = rel.parts[0]
    zh_ch = CHAPTER_ZH.get(ch, ch)
    return ZH / zh_ch / Path(*rel.parts[1:])


def link_path(p: Path) -> str:
    rel = p.relative_to(ROOT).as_posix()
    return f"/posts/c教程/{rel.removesuffix('.md')}"


def update_en_alternates(en_file: Path, zh_file: Path) -> None:
    raw = en_file.read_text(encoding="utf-8")
    fm, body = parse_fm(raw)
    fm["lang"] = "en-US"
    fm["alternateEn"] = link_path(en_file)
    fm["alternateZh"] = link_path(zh_file)
    zh_link = f"[中文版本]({link_path(zh_file)})"
    if zh_link not in body:
        body = f"{zh_link}\n\n" + body.lstrip()
    en_file.write_text(dump_fm(fm) + body, encoding="utf-8")


def translate_title(en_title: str) -> str:
    if en_title in TITLE_ZH:
        return TITLE_ZH[en_title]
    m = re.match(r"^(\d+\.\s*)(.+)$", en_title)
    if m:
        return f"{m.group(1)}{translate_text(m.group(2))}"
    return translate_text(en_title)


def process_file(en_file: Path, force: bool = False) -> None:
    zh_file = en_path_to_zh(en_file)
    zh_file.parent.mkdir(parents=True, exist_ok=True)

    if zh_file.exists() and not force:
        update_en_alternates(en_file, zh_file)
        return

    raw = en_file.read_text(encoding="utf-8")
    fm, body = parse_fm(raw)
    en_title = str(fm.get("title", en_file.stem))

    print(f"  translating: {en_file.name}")
    zh_title = translate_title(en_title)
    zh_body = translate_body(body)

    zh_ch = CHAPTER_ZH.get(en_file.relative_to(EN).parts[0], "C")
    zh_fm = {
        "title": zh_title,
        "date": fm.get("date", date.today().isoformat()),
        "lang": "zh-CN",
        "categories": ["C 教程"],
        "tags": ["C", "Little Book of C", zh_ch, "中文"],
        "description": f"The Little Book of C 中文版 — {zh_title}",
        "source": fm.get("source"),
        "license": fm.get("license"),
        "originalAuthor": fm.get("originalAuthor"),
        "translator": "机器辅助翻译（Google Translate）",
        "section": fm.get("section"),
        "sidebarWeight": fm.get("sidebarWeight"),
        "alternateZh": link_path(zh_file),
        "alternateEn": link_path(en_file),
    }

    zh_file.write_text(
        dump_fm(zh_fm)
        + f"\n[English version]({link_path(en_file)})\n\n"
        + zh_body,
        encoding="utf-8",
    )
    update_en_alternates(en_file, zh_file)
    time.sleep(0.3)


def build_root_readme() -> None:
    content = f"""---
title: The Little Book of C 教程（多语言）
date: {date.today().isoformat()}
categories: [C 教程]
tags: [C, Little Book of C, 多语言]
sidebarWeight: 0
description: The Little Book of C 中英双语教程索引。
---

# The Little Book of C · C 语言小书

> 基于 Duc-Tam Nguyen 的 [The Little Book of C](https://little-book-of.github.io/c/books/en-US/book.html)（[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)）

## 选择语言

| 语言 | 目录 | 说明 |
|------|------|------|
| **中文** | [zh-CN 教程总览](./zh-CN/README.md) | 机器辅助翻译，代码与原书一致 |
| **English** | [en-US Index](./en-US/README.md) | Original text |

## 章节对照

| 英文章节 | 中文章节 |
|----------|----------|
| 01-Getting Started | 01-入门 |
| 02-Language Basics | 02-语言基础 |
| 03-Working with Memory | 03-内存 |
| 04-Structuring Data | 04-数据结构 |
| 05-Input Output and Files | 05-输入输出与文件 |
| 06-Compilation and Build | 06-编译与构建 |
| 07-Working Close to the System | 07-贴近系统 |
| 08-Debugging Testing Profiling | 08-调试测试与 profiling |
| 09-Portable and Modern C | 09-可移植与现代 C |
| 10-Building Real Projects | 10-真实项目 |
| 11-Epilogue | 11-结语 |

每篇文章顶部可切换 **中文 / English**（`alternateZh` / `alternateEn`）。
"""
    (ROOT / "README.md").write_text(content, encoding="utf-8")


def build_zh_readme() -> None:
    lines = [
        "---",
        "title: The Little Book of C 中文教程总览",
        f"date: {date.today().isoformat()}",
        "lang: zh-CN",
        "categories: [C 教程]",
        "tags: [C, Little Book of C, 中文]",
        "sidebarWeight: 0",
        "alternateEn: /posts/c教程/en-US/README",
        "description: The Little Book of C 中文版，共 10 章 + 结语。",
        "---",
        "",
        "# The Little Book of C · 中文教程",
        "",
        "[English version](/posts/c教程/en-US/README)",
        "",
        "> 本文由英文版机器辅助翻译，术语与代码示例保持原样。欢迎提 PR 改进译文。",
        "",
        "**出处：** Duc-Tam Nguyen · [原书](https://little-book-of.github.io/c/books/en-US/book.html)",
        "",
        "---",
        "",
    ]
    for en_ch, zh_ch in CHAPTER_ZH.items():
        zh_dir = ZH / zh_ch
        if not zh_dir.is_dir():
            continue
        files = sorted(zh_dir.rglob("*.md"))
        if not files:
            continue
        lines.append(f"## {zh_ch}（{len(files)} 篇）")
        lines.append("")
        for f in files:
            fm, _ = parse_fm(f.read_text(encoding="utf-8"))
            title = fm.get("title", f.stem)
            rel = f.relative_to(ZH)
            lines.append(f"- [{title}](./{rel.as_posix()})")
        lines.append("")
    (ZH / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_en_readme() -> None:
    en_readme = EN / "README.md"
    if not en_readme.exists():
        return
    raw = en_readme.read_text(encoding="utf-8")
    fm, body = parse_fm(raw)
    fm["lang"] = "en-US"
    fm["alternateZh"] = "/posts/c教程/zh-CN/README"
    fm["alternateEn"] = "/posts/c教程/en-US/README"
    if "[中文版本]" not in body:
        body = "[中文版本](/posts/c教程/zh-CN/README)\n\n" + body
    en_readme.write_text(dump_fm(fm) + body, encoding="utf-8")


def fix_en_frontmatter() -> None:
    for f in EN.rglob("*.md"):
        raw = f.read_text(encoding="utf-8")
        fm, body = parse_fm(raw)
        if fm:
            f.write_text(dump_fm(fm) + body, encoding="utf-8")


def main() -> None:
    import sys

    force = "--force" in sys.argv
    limit = None
    for arg in sys.argv[1:]:
        if arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])

    fix_en_frontmatter()

    files = sorted(EN.rglob("*.md"))
    files = [f for f in files if f.name != "README.md"]
    if limit:
        files = files[:limit]

    print(f"Processing {len(files)} articles...", flush=True)
    for i, f in enumerate(files, 1):
        print(f"[{i}/{len(files)}] {f.relative_to(EN)}", flush=True)
        process_file(f, force=force)

    build_en_readme()
    build_zh_readme()
    build_root_readme()
    print("Done.", flush=True)


if __name__ == "__main__":
    main()
