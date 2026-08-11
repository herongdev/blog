#!/usr/bin/env python3
"""Convert exported OneNote Markdown into VitePress/Hexo-compatible tutorials.

The active blog is VitePress, but every generated page keeps conventional Hexo
front matter (title/date/categories/tags).  Dedicated output directories are
fully managed by this script and may be regenerated safely.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import quote


DEFAULT_SOURCE_ROOT = Path("/Users/ronnie/Documents/OneNote导出/OneNote")
DEFAULT_BLOG_ROOT = Path(__file__).resolve().parents[1]
MANAGED_TRACKS = (
    "JavaScript系统教程",
    "Vue系统教程",
    "React系统教程",
    "前端面试与实战",
)

SOURCE_DIRECTORIES = {
    "interview": "a-吊打面试官",
    "javascript": "b-原生js",
    "framework": "f-vue",
}

JAVASCRIPT_PARTS = {
    "概述": "01-语言与运行时",
    "变量和常量": "02-语法、变量与数据",
    "数据类型": "02-语法、变量与数据",
    "基本数据类型-字符串": "02-语法、变量与数据",
    "基本数据类型-数字": "02-语法、变量与数据",
    "运算符": "02-语法、变量与数据",
    "语句和代码块": "02-语法、变量与数据",
    "流程控制": "02-语法、变量与数据",
    "引用数据类型-数组": "03-对象、数组与函数",
    "引用数据类型-对象": "03-对象、数组与函数",
    "引用数据类型-函数": "03-对象、数组与函数",
    "引用数据类型-正则": "03-对象、数组与函数",
    "面向对象程序设计": "03-对象、数组与函数",
    "日期": "03-对象、数组与函数",
    "DOM": "04-浏览器与 Web API",
    "BOM": "04-浏览器与 Web API",
    "事件": "04-浏览器与 Web API",
    "blob": "04-浏览器与 Web API",
    "Buffer": "04-浏览器与 Web API",
    "二进制数据": "04-浏览器与 Web API",
    "Cookie和Session": "04-浏览器与 Web API",
    "js特效": "04-浏览器与 Web API",
    "11-异步编程": "05-异步编程",
    "12-模块化编程": "06-模块化与工程化",
    "Proxy": "07-进阶语言能力",
    "Reflect": "07-进阶语言能力",
    "Atomics": "07-进阶语言能力",
    "webworkers": "07-进阶语言能力",
    "性能优化": "08-实战与性能",
    "常用技巧": "08-实战与性能",
    "经典方法": "08-实战与性能",
    "需求实现": "08-实战与性能",
    "规范": "08-实战与性能",
    "难点": "08-实战与性能",
    "面试": "09-面试与手写",
    "面试题": "09-面试与手写",
}

REACT_TOP_LEVEL = {
    "dva",
    "jsx,tsx",
    "react-router",
    "redux",
    "原理 2",
    "实现",
    "应用",
    "新特性",
    "概念",
    "状态改变",
}

VUE_PARTS = {
    "安装": "01-快速开始与工程环境",
    "安装配置": "01-快速开始与工程环境",
    "创建项目": "01-快速开始与工程环境",
    "vue-cli": "01-快速开始与工程环境",
    "脚手架": "01-快速开始与工程环境",
    "基础": "01-快速开始与工程环境",
    "api": "02-模板、组件与交互",
    "template": "02-模板、组件与交互",
    "单文件vue": "02-模板、组件与交互",
    "组件": "02-模板、组件与交互",
    "插槽": "02-模板、组件与交互",
    "指令": "02-模板、组件与交互",
    "自定义指令": "02-模板、组件与交互",
    "自定义事件": "02-模板、组件与交互",
    "样式": "02-模板、组件与交互",
    "过渡和动画": "02-模板、组件与交互",
    "处理边界情况": "02-模板、组件与交互",
    "vue3": "03-响应式与组合式 API",
    "响应式问题": "03-响应式与组合式 API",
    "composable": "03-响应式与组合式 API",
    "vue-use": "03-响应式与组合式 API",
    "Vueuse": "03-响应式与组合式 API",
    "vue2使用composition": "03-响应式与组合式 API",
    "双向绑定": "03-响应式与组合式 API",
    "生命周期": "03-响应式与组合式 API",
    "pinia": "04-路由与状态管理",
    "vuex": "04-路由与状态管理",
    "数据流": "04-路由与状态管理",
    "vueRouter": "04-路由与状态管理",
    "路由": "04-路由与状态管理",
    "原理": "05-原理与手写实现",
    "min-vue": "05-原理与手写实现",
    "手写": "05-原理与手写实现",
    "性能优化": "06-工程化、质量与性能",
    "工具": "06-工程化、质量与性能",
    "eslint": "06-工程化、质量与性能",
    "动态导入": "06-工程化、质量与性能",
    "实用包": "06-工程化、质量与性能",
    "常用依赖": "06-工程化、质量与性能",
    "库": "06-工程化、质量与性能",
    "安全": "06-工程化、质量与性能",
    "规模化": "06-工程化、质量与性能",
    "错误处理": "06-工程化、质量与性能",
    "实战": "07-项目实战",
    "vue商城": "07-项目实战",
    "云音乐实例": "07-项目实战",
    "面试": "08-面试复习",
    "面试要点": "08-面试复习",
}

REACT_PARTS = {
    "概念": "01-核心概念与组件",
    "状态改变": "01-核心概念与组件",
    "新特性": "01-核心概念与组件",
    "redux": "02-状态管理与路由",
    "dva": "02-状态管理与路由",
    "react-router": "02-状态管理与路由",
    "原理 2": "03-原理与手写实现",
    "实现": "03-原理与手写实现",
    "jsx,tsx": "04-JSX 与工程化",
    "应用": "05-性能与实战",
}

INTERVIEW_PARTS = {
    "CSS": "01-前端知识复习",
    "复习大纲": "01-前端知识复习",
    "考点难点": "01-前端知识复习",
    "技能点：UI封装": "02-技能与业务实战",
    "技能点：业务实现": "02-技能与业务实战",
    "技能点：搭建开发环境": "02-技能与业务实战",
    "业务": "02-技能与业务实战",
    "算法题": "03-算法训练",
    "java": "04-Java 面试",
    "简历设计": "05-求职准备",
    "职业规划": "05-求职准备",
    "理想职位": "05-求职准备",
    "华为": "06-公司面试复盘",
    "拓保": "06-公司面试复盘",
    "赢时胜": "06-公司面试复盘",
    "飞戈数字": "06-公司面试复盘",
    "超级马克": "06-公司面试复盘",
}

TRACK_META = {
    "JavaScript系统教程": {
        "category": "JavaScript 系统教程",
        "tags": ["JavaScript", "前端", "教程", "OneNote"],
        "description": "从语言基础到异步、浏览器 API、工程化与手写题的 JavaScript 系统学习路径。",
        "outcome": "完成后，你能解释 JavaScript 核心机制，独立处理浏览器交互与异步任务，并应对常见手写题。",
    },
    "Vue系统教程": {
        "category": "Vue 系统教程",
        "tags": ["Vue", "Vue3", "前端", "教程", "OneNote"],
        "description": "覆盖 Vue 模板、组件、响应式、路由、状态管理、原理、性能与项目实战。",
        "outcome": "完成后，你能从零搭建 Vue 应用，设计组件和数据流，并能从响应式与渲染原理定位问题。",
    },
    "React系统教程": {
        "category": "React 系统教程",
        "tags": ["React", "Redux", "前端", "教程", "OneNote"],
        "description": "从 JSX、组件和状态，到 Redux、路由、渲染原理与手写实现的 React 学习路径。",
        "outcome": "完成后，你能理解 React 的组件与更新模型，组织状态和路由，并阅读常见实现原理。",
    },
    "前端面试与实战": {
        "category": "前端面试与实战",
        "tags": ["前端面试", "算法", "求职", "教程", "OneNote"],
        "description": "按知识复习、业务技能、算法训练、Java 补充与求职准备组织的面试实战教程。",
        "outcome": "完成后，你能按技能树复习前端知识，用真实业务和算法题验证掌握程度，并形成自己的面试复盘。",
    },
}

BROKEN_IMAGE = re.compile(r"!\[[^\]]*\]\((?:<)?[^)\n]+(?:>)?\)")
FRONT_MATTER = re.compile(r"\A---\s*\n.*?\n---\s*\n", re.DOTALL)
MARKDOWN_LINK = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")
FENCE = re.compile(r"```.*?```", re.DOTALL)
FENCED_BLOCK = re.compile(r"```([^\n`]*)\n(.*?)```", re.DOTALL)
INLINE_CODE = re.compile(r"(`+)([^`\n]*?)\1")


@dataclass
class GeneratedArticle:
    source: str
    source_path: str
    track: str
    part: str
    title: str
    output_path: str
    bytes: int
    weight: int


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def clean_component(value: str) -> str:
    value = value.replace("`", "").replace("\u200b", "")
    value = re.sub(r"[\x00-\x1f]", "", value)
    value = re.sub(r"\s+", " ", value).strip(" .")
    value = value.replace(": ", "：")
    return value or "未命名"


def clean_title(stem: str) -> str:
    title = clean_component(stem)
    title = re.sub(r"^--+", "", title).strip()
    title = re.sub(r"^\((?:\d+\s*[mM]|重)\)\s*", "", title).strip()
    return title or "未命名"


def strip_front_matter(text: str) -> str:
    return FRONT_MATTER.sub("", text, count=1)


def clean_body(raw: str) -> tuple[str, int]:
    body = strip_front_matter(raw)
    body = body.replace("\r\n", "\n").replace("\r", "\n")
    body = body.replace("\ufeff", "").replace("\ufffc", "").replace("\u00a0", " ")
    body = re.sub(r"<br\s*/?>", "\n", body, flags=re.IGNORECASE)
    body = re.sub(r"<(\[[^\]]+\]\([^)]+\))>", r"\1", body)

    removed_images = 0

    def remove_missing_image(match: re.Match[str]) -> str:
        nonlocal removed_images
        target = match.group(0)
        url_match = re.search(r"\]\((?:<)?([^)>]+)", target)
        url = url_match.group(1).strip() if url_match else ""
        if url.startswith(("http://", "https://", "data:")):
            return target
        removed_images += 1
        return ""

    body = BROKEN_IMAGE.sub(remove_missing_image, body)
    body = sanitize_markdown_links(body)
    body = unwrap_prose_fences(body)
    body = normalize_corrupted_fence_info(body)
    body = unescape_code_angles(body)
    body = escape_markdown_attribute_braces(body)
    body = re.sub(r"^\*\*(#{1,6})\s*(.+?)\*\*\s*$", r"\1 \2", body, flags=re.MULTILINE)
    body = re.sub(r"[ \t]+\n", "\n", body)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    return body, removed_images


def sanitize_markdown_links(body: str) -> str:
    """Turn corrupted OneNote URLs into text before VitePress parses them."""

    def replace(match: re.Match[str]) -> str:
        label = match.group(1)
        target = match.group(2).strip()
        if target.startswith("http://#"):
            return f"[{label}]({target.removeprefix('http://')})"
        if not target.startswith(("http://", "https://")):
            return match.group(0)

        rest = re.sub(r"^https?://", "", target)
        authority = rest.split("/", 1)[0]
        bad_percent = re.search(r"%(?![0-9a-fA-F]{2})", target)
        invalid_chars = re.search(r"[\s\\{}]", authority)
        invalid_port = False
        if ":" in authority and not authority.startswith("["):
            port = authority.rsplit(":", 1)[1].rstrip("'")
            invalid_port = bool(port) and not port.isdigit()
        if (
            not authority
            or invalid_chars
            or invalid_port
            or bad_percent
            or authority.startswith("javascript:")
            or re.search(r"[，。；！？]", authority)
        ):
            return label
        return match.group(0)

    return MARKDOWN_LINK.sub(replace, body)


def normalize_corrupted_fence_info(body: str) -> str:
    """Prevent OneNote table fragments from becoming fake Shiki languages."""
    return re.sub(r"^```(\|[^\n]*)$", r"```text\n\1", body, flags=re.MULTILINE)


def unwrap_prose_fences(body: str) -> str:
    """Undo OneNote's habit of exporting ordinary prose as code fences."""

    def replace(match: re.Match[str]) -> str:
        language = match.group(1).strip()
        content = match.group(2).strip()
        if language or not content:
            return match.group(0)
        chinese_count = len(re.findall(r"[\u3400-\u9fff]", content))
        code_signals = len(
            re.findall(
                r"(?:=>|\b(?:const|let|var|function|class|return|import|export|public|private|new)\b|[{};])",
                content,
            )
        )
        prose_punctuation = len(re.findall(r"[，。；：！？]", content))
        if chinese_count >= 24 and prose_punctuation >= 2 and code_signals <= 1:
            return content
        return match.group(0)

    return FENCED_BLOCK.sub(replace, body)


def unescape_code_angles(body: str) -> str:
    """Make HTML/Vue examples readable without exposing raw tags to Vue SFC parsing."""

    def replace(match: re.Match[str]) -> str:
        language = match.group(1)
        content = match.group(2).replace(r"\<", "<").replace(r"\>", ">")
        return f"```{language}\n{content}```"

    return FENCED_BLOCK.sub(replace, body)


def escape_markdown_attribute_braces(body: str) -> str:
    """Stop loose code from becoming Markdown attributes; keep rendered braces."""

    def escape_outside_inline_code(text: str) -> str:
        pieces: list[str] = []
        cursor = 0
        for match in INLINE_CODE.finditer(text):
            plain = text[cursor : match.start()]
            pieces.append(re.sub(r"(?<!\\)([{}])", r"\\\1", plain))
            pieces.append(match.group(0))
            cursor = match.end()
        pieces.append(re.sub(r"(?<!\\)([{}])", r"\\\1", text[cursor:]))
        return "".join(pieces)

    pieces: list[str] = []
    cursor = 0
    for match in FENCED_BLOCK.finditer(body):
        pieces.append(escape_outside_inline_code(body[cursor : match.start()]))
        pieces.append(match.group(0))
        cursor = match.end()
    pieces.append(escape_outside_inline_code(body[cursor:]))
    return "".join(pieces)


def plain_excerpt(body: str, title: str) -> str:
    text = FENCE.sub(" ", body)
    text = BROKEN_IMAGE.sub(" ", text)
    text = MARKDOWN_LINK.sub(r"\1", text)
    text = re.sub(r"[`*_#>|=~-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        text = f"围绕“{title}”整理的概念、示例与实践笔记。"
    return text[:140].rstrip("，。；; ") + "。"


def body_has_h1(body: str, title: str) -> bool:
    first = next((line.strip() for line in body.splitlines() if line.strip()), "")
    if not first.startswith("# "):
        return False
    lhs = re.sub(r"\s+", "", first[2:]).lower()
    rhs = re.sub(r"\s+", "", title).lower()
    return lhs == rhs


def content_hash(body: str) -> str:
    normalized = re.sub(r"\s+", " ", body).strip()
    return hashlib.sha1(normalized.encode("utf-8")).hexdigest()


def choose_destination(source: str, rel: Path) -> tuple[str, str, tuple[str, ...]]:
    top = rel.parts[0] if len(rel.parts) > 1 else ""
    remainder = rel.parts[1:] if top else rel.parts

    if source == "javascript":
        return (
            "JavaScript系统教程",
            JAVASCRIPT_PARTS.get(top, "10-补充主题"),
            remainder,
        )

    if source == "interview":
        return (
            "前端面试与实战",
            INTERVIEW_PARTS.get(top, "07-补充与复盘"),
            remainder,
        )

    if top in REACT_TOP_LEVEL:
        return (
            "React系统教程",
            REACT_PARTS.get(top, "06-补充主题"),
            remainder,
        )

    return (
        "Vue系统教程",
        VUE_PARTS.get(top, "09-补充主题"),
        remainder,
    )


def unique_output_path(candidate: Path, used: set[str]) -> Path:
    key = candidate.as_posix().casefold()
    if key not in used:
        used.add(key)
        return candidate
    index = 2
    while True:
        alternate = candidate.with_name(f"{candidate.stem}-{index}{candidate.suffix}")
        key = alternate.as_posix().casefold()
        if key not in used:
            used.add(key)
            return alternate
        index += 1


def front_matter(
    *, title: str, track: str, part: str, published: str, source_path: str, weight: int, description: str
) -> str:
    meta = TRACK_META[track]
    tags = list(dict.fromkeys([*meta["tags"], part.replace(re.match(r"^\d+-", part).group(0), "") if re.match(r"^\d+-", part) else part]))
    tag_lines = "\n".join(f"  - {yaml_string(tag)}" for tag in tags)
    return (
        "---\n"
        f"title: {yaml_string(title)}\n"
        f"date: {published}\n"
        "categories:\n"
        f"  - {yaml_string(meta['category'])}\n"
        "tags:\n"
        f"{tag_lines}\n"
        f"description: {yaml_string(description)}\n"
        f"sidebarWeight: {weight}\n"
        "lastUpdated: false\n"
        "feed: false\n"
        "source: onenote\n"
        f"sourceNote: {yaml_string(source_path)}\n"
        "---\n"
    )


def write_article(
    *, output: Path, title: str, body: str, removed_images: int, fm: str
) -> None:
    intro = []
    if not body_has_h1(body, title):
        intro.extend([f"# {title}", ""])
    intro.extend(
        [
            f"> 本节目标：理解“{title}”的核心思路，并能把它用于实际开发或面试表达。",
            "",
        ]
    )
    if removed_images:
        intro.extend(
            [
                "> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。",
                "",
            ]
        )
    output.parent.mkdir(parents=True, exist_ok=True)
    content = "\n".join(intro) + body.strip()
    output.write_text(
        fm + "::: v-pre\n\n" + content + "\n\n:::\n", encoding="utf-8"
    )


def wrap_v_pre(markdown: str) -> str:
    """Wrap a generated index body while leaving YAML front matter untouched."""
    if not markdown.startswith("---\n"):
        return "::: v-pre\n\n" + markdown.rstrip() + "\n\n:::\n"
    end = markdown.find("\n---\n", 4)
    if end == -1:
        return markdown
    front = markdown[: end + 5]
    body = markdown[end + 5 :].strip()
    return front + "\n::: v-pre\n\n" + body + "\n\n:::\n"


def track_readme(track: str, articles: list[GeneratedArticle], published: str) -> str:
    meta = TRACK_META[track]
    grouped: dict[str, list[GeneratedArticle]] = defaultdict(list)
    for article in articles:
        grouped[article.part].append(article)

    lines = [
        "---",
        f"title: {yaml_string(track + '总览')}",
        f"date: {published}",
        "categories:",
        f"  - {yaml_string(meta['category'])}",
        "tags:",
        *[f"  - {yaml_string(tag)}" for tag in meta["tags"]],
        f"description: {yaml_string(meta['description'])}",
        "sidebarWeight: 0",
        "lastUpdated: false",
        "feed: false",
        "source: onenote",
        "---",
        "",
        f"# {track}",
        "",
        f"> {meta['outcome']}",
        "",
        "## 推荐学习方法",
        "",
        "1. 按章节顺序阅读，先建立主干知识，再查补充主题。",
        "2. 运行或改写笔记中的代码，不只记结论。",
        "3. 每完成一章，用自己的话讲清核心机制，并为易错点补一个最小示例。",
        "4. 遇到版本较老的写法，先理解其解决的问题，再结合当前项目决定是否采用。",
        "",
        "## 学习路径",
        "",
    ]

    for part in sorted(grouped):
        items = grouped[part]
        part_link = "./" + quote(f"{part}/README", safe="/")
        lines.append(f"### {part}（{len(items)} 篇）")
        lines.append("")
        lines.append(f"- [查看本章目标与完整目录]({part_link})")
        lines.append("")

    lines.extend(
        [
            "## 说明",
            "",
            f"- 本教程从个人 OneNote 导出笔记中清理得到，共收录 {len(articles)} 篇有效笔记。",
            "- 已跳过空白页和完全重复内容，并移除无法恢复的本地图片引用。",
            "- 文章保留 Hexo 常用 front matter，同时按当前博客的 VitePress 目录发布。",
            "",
        ]
    )
    return "\n".join(lines)


def part_readme(
    track: str, part: str, articles: list[GeneratedArticle], published: str
) -> str:
    meta = TRACK_META[track]
    ordered = sorted(articles, key=lambda item: (item.weight, item.output_path))
    lines = [
        "---",
        f"title: {yaml_string(part + '学习目录')}",
        f"date: {published}",
        "categories:",
        f"  - {yaml_string(meta['category'])}",
        "tags:",
        *[f"  - {yaml_string(tag)}" for tag in meta["tags"]],
        f"  - {yaml_string(part)}",
        f"description: {yaml_string(track + '的“' + part + '”章节目标与完整学习目录。')}",
        "sidebarWeight: 0",
        "lastUpdated: false",
        "feed: false",
        "source: onenote",
        "---",
        "",
        f"# {part}",
        "",
        f"> 章节目标：围绕“{part}”建立知识主干，能说清关键机制，并能用最小代码或真实案例验证结论。",
        "",
        "## 学习要求",
        "",
        "- 阅读时把“概念、适用场景、常见错误、验证方法”分别记下来。",
        "- 带代码的内容至少运行一次，再主动修改一个条件观察结果。",
        "- 学完后选择三个主题，不看原文向别人讲清楚。",
        "",
        f"## 完整目录（{len(ordered)} 篇）",
        "",
    ]
    part_root = Path(track) / part
    for article in ordered:
        article_path = Path(article.output_path)
        relative = article_path.relative_to(part_root).with_suffix("")
        link = "./" + quote(relative.as_posix(), safe="/")
        lines.append(f"- [{article.title}]({link})")
    lines.append("")
    return "\n".join(lines)


def overview_page(all_articles: list[GeneratedArticle], published: str) -> str:
    counts = Counter(article.track for article in all_articles)
    return f"""---
title: OneNote 系统教程总览
date: {published}
categories:
  - 教程
tags:
  - OneNote
  - JavaScript
  - Vue
  - React
  - Java
description: 从个人 OneNote 笔记整理出的 JavaScript、Vue、React、前端面试与 Java 系统教程入口。
sidebarWeight: 0
lastUpdated: false
feed: false
---

# OneNote 系统教程总览

这些内容不再按笔记软件里的零散目录阅读，而是整理成“基础 → 原理 → 工程实践 → 面试验证”的学习路线。

## 选择你的学习路线

| 教程 | 适合谁 | 本次整理 |
| --- | --- | ---: |
| [JavaScript 系统教程](./JavaScript系统教程/README.md) | 想补齐语言、浏览器、异步与手写能力的前端开发者 | {counts['JavaScript系统教程']} 篇 |
| [Vue 系统教程](./Vue系统教程/README.md) | 使用 Vue 2 / Vue 3，需要理解组件、响应式、状态管理与原理的开发者 | {counts['Vue系统教程']} 篇 |
| [React 系统教程](./React系统教程/README.md) | 想系统学习 React、Redux、路由与渲染原理的开发者 | {counts['React系统教程']} 篇 |
| [前端面试与实战](./前端面试与实战/README.md) | 正在准备面试，希望把知识、业务、算法和复盘串起来的人 | {counts['前端面试与实战']} 篇 |
| [Java 快速入门](./java快速入门/README.md) | 想从 Java 语法逐步走到 Spring、数据库和微服务的开发者 | 已有 545 篇 |

## 建议顺序

前端主线建议先学 **JavaScript → Vue 或 React → 前端面试与实战**。Java 路线可以独立学习；如果目标是全栈，再接着学习数据库、Spring 与微服务。

> 这批文章来自长期积累的 OneNote 笔记。迁移过程完成了分轨、去空、去重、标题与 Markdown 清理；涉及旧版本框架的章节仍有历史学习价值，实际项目选型请以项目版本为准。
"""


def prepare_destinations(posts_root: Path) -> None:
    posts_root.mkdir(parents=True, exist_ok=True)
    for track in MANAGED_TRACKS:
        target = posts_root / track
        if target.exists():
            shutil.rmtree(target)
        target.mkdir(parents=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-root", type=Path, default=DEFAULT_SOURCE_ROOT)
    parser.add_argument("--blog-root", type=Path, default=DEFAULT_BLOG_ROOT)
    parser.add_argument("--date", default=date.today().isoformat())
    args = parser.parse_args()

    posts_root = args.blog_root / "docs" / "posts"
    prepare_destinations(posts_root)

    seen_hashes: dict[str, str] = {}
    used_paths: set[str] = set()
    generated: list[GeneratedArticle] = []
    skipped_empty: list[str] = []
    skipped_duplicate: list[dict[str, str]] = []
    removed_images_total = 0
    part_weights: Counter[tuple[str, str]] = Counter()

    for source, source_dirname in SOURCE_DIRECTORIES.items():
        source_dir = args.source_root / source_dirname
        if not source_dir.is_dir():
            raise SystemExit(f"OneNote source directory not found: {source_dir}")

        for source_file in sorted(source_dir.rglob("*.md")):
            rel = source_file.relative_to(source_dir)
            raw = source_file.read_text(encoding="utf-8", errors="replace")
            body, removed_images = clean_body(raw)
            source_label = f"{source_dirname}/{rel.as_posix()}"
            if not body.strip():
                skipped_empty.append(source_label)
                continue

            digest = content_hash(body)
            if digest in seen_hashes:
                skipped_duplicate.append(
                    {"path": source_label, "sameAs": seen_hashes[digest]}
                )
                continue
            seen_hashes[digest] = source_label

            track, part, remainder = choose_destination(source, rel)
            components = [clean_component(value) for value in remainder]
            if not components:
                components = [clean_component(rel.name)]
            filename = clean_component(Path(components[-1]).stem) + ".md"
            if filename.casefold() == "readme.md":
                filename = "README-原笔记.md"
            relative_output = Path(track) / clean_component(part) / Path(*components[:-1]) / filename
            relative_output = unique_output_path(relative_output, used_paths)
            output = posts_root / relative_output

            title = clean_title(source_file.stem)
            part_weights[(track, part)] += 1
            weight = part_weights[(track, part)]
            description = plain_excerpt(body, title)
            fm = front_matter(
                title=title,
                track=track,
                part=part,
                published=args.date,
                source_path=f"OneNote/{source_label}",
                weight=weight,
                description=description,
            )
            write_article(
                output=output,
                title=title,
                body=body,
                removed_images=removed_images,
                fm=fm,
            )
            removed_images_total += removed_images
            generated.append(
                GeneratedArticle(
                    source=source,
                    source_path=source_label,
                    track=track,
                    part=part,
                    title=title,
                    output_path=relative_output.as_posix(),
                    bytes=output.stat().st_size,
                    weight=weight,
                )
            )

    by_track: dict[str, list[GeneratedArticle]] = defaultdict(list)
    for article in generated:
        by_track[article.track].append(article)

    for track in MANAGED_TRACKS:
        readme = posts_root / track / "README.md"
        readme.write_text(
            wrap_v_pre(track_readme(track, by_track[track], args.date)),
            encoding="utf-8",
        )
        grouped: dict[str, list[GeneratedArticle]] = defaultdict(list)
        for article in by_track[track]:
            grouped[article.part].append(article)
        for part, part_articles in grouped.items():
            chapter_index = posts_root / track / part / "README.md"
            chapter_index.write_text(
                wrap_v_pre(part_readme(track, part, part_articles, args.date)),
                encoding="utf-8",
            )

    (posts_root / "onenote教程总览.md").write_text(
        wrap_v_pre(overview_page(generated, args.date)), encoding="utf-8"
    )

    report = {
        "generatedAt": args.date,
        "sourceRoot": str(args.source_root),
        "generated": len(generated),
        "byTrack": dict(sorted(Counter(item.track for item in generated).items())),
        "skippedEmpty": len(skipped_empty),
        "skippedDuplicate": len(skipped_duplicate),
        "removedMissingImages": removed_images_total,
        "emptyPaths": skipped_empty,
        "duplicatePaths": skipped_duplicate,
        "articles": [item.__dict__ for item in generated],
    }
    scripts_dir = args.blog_root / "scripts"
    scripts_dir.mkdir(parents=True, exist_ok=True)
    (scripts_dir / "onenote-tutorial-manifest.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(json.dumps({key: report[key] for key in ("generated", "byTrack", "skippedEmpty", "skippedDuplicate", "removedMissingImages")}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
