#!/usr/bin/env python3
"""Migrate OneNote Java notes into docs/posts/java快速入门/."""

from __future__ import annotations

import re
import shutil
from datetime import date
from pathlib import Path

SRC = Path("/Users/ronnie/Documents/OneNote导出/OneNote/java")
DEST = Path("/Users/ronnie/Documents/my-project/blog/docs/posts/java快速入门")

# OneNote top-level folder -> blog part folder
TOP_MAP: dict[str, str] = {
    "开发环境": "第一部分：语言基础/00-开发环境",
    "2.基础": "第一部分：语言基础/01-基础语法",
    "4.数组": "第一部分：语言基础/02-数组",
    "3.面向对象": "第二部分：面向对象/01-类与对象",
    "5.创建类和方法": "第二部分：面向对象/02-创建类和方法",
    "6.面向对象特性": "第二部分：面向对象/03-面向对象特性",
    "常用API": "第三部分：核心 API/01-常用 API",
    "数据结构": "第三部分：核心 API/02-数据结构",
    "List": "第三部分：核心 API/03-List",
    "map": "第三部分：核心 API/04-Map",
    "IO流和File类": "第三部分：核心 API/05-IO 与 File",
    "输入和输出": "第三部分：核心 API/06-输入和输出",
    "异常和线程": "第三部分：核心 API/07-异常与线程",
    "反射": "第三部分：核心 API/08-反射",
    "Function": "第三部分：核心 API/09-Function 与 Lambda",
    "单元测试": "第三部分：核心 API/10-单元测试",
    "XML": "第四部分：Web 基础/01-XML",
    "Servlet和HTTP请求协议": "第四部分：Web 基础/02-Servlet 与 HTTP",
    "Cookie和Session": "第四部分：Web 基础/03-Cookie 与 Session",
    "Filter和Listener": "第四部分：Web 基础/04-Filter 与 Listener",
    "JSON": "第四部分：Web 基础/05-JSON 与 AJAX",
    "Tomcat": "第四部分：Web 基础/06-Tomcat",
    "JDBC": "第五部分：数据库/01-JDBC",
    "Mybatis": "第五部分：数据库/02-MyBatis",
    "mybatis ": "第五部分：数据库/02-MyBatis",
    "Spring": "第六部分：Spring 生态/01-Spring 核心",
    "springBoot": "第六部分：Spring 生态/02-Spring Boot",
    "springMVC": "第六部分：Spring 生态/03-Spring MVC",
    "java注解": "第六部分：Spring 生态/04-Java 注解",
    "注解": "第六部分：Spring 生态/04-Java 注解",
    "Maven": "第七部分：构建与运维/01-Maven",
    "linux": "第七部分：构建与运维/02-Linux 环境",
    "ngix": "第七部分：构建与运维/03-Nginx",
    "Java联网技术": "第八部分：网络编程/01-Java 联网",
    "网络编程": "第八部分：网络编程/02-网络编程",
    "微服务": "第九部分：微服务/01-微服务入门",
    "乐优商城": "第九部分：微服务/02-实战-乐优商城",
    "新蜂商城": "第九部分：微服务/03-实战-新蜂商城",
    "常见需求": "第十部分：常见需求",
    "好文": "附录/好文",
    "新分区 1": "附录/杂项",
}

KEEP_AT_ROOT = {
    "README.md",
    "0-提示词.md",
    "为什么要重新系统学习 Java.md",
}

PART_TAG: dict[str, str] = {
    "第一部分": "Java基础",
    "第二部分": "面向对象",
    "第三部分": "核心API",
    "第四部分": "Web基础",
    "第五部分": "数据库",
    "第六部分": "Spring",
    "第七部分": "构建运维",
    "第八部分": "网络编程",
    "第九部分": "微服务",
    "第十部分": "常见需求",
    "附录": "附录",
}


def clean_name(name: str) -> str:
    name = name.strip()
    name = re.sub(r"\s+", " ", name)
    return name


def slug_title(stem: str) -> str:
    stem = clean_name(stem)
    if stem.startswith("--"):
        stem = stem[2:].strip()
    return stem or "未命名"


def infer_tag(dest_rel: str) -> str:
    for prefix, tag in PART_TAG.items():
        if dest_rel.startswith(prefix):
            return tag
    return "Java"


def has_front_matter(text: str) -> bool:
    return text.startswith("---\n") and "\n---\n" in text[4:]


def add_front_matter(title: str, tag: str, body: str) -> str:
    safe_title = title.replace('"', '\\"')
    return (
        f"---\ntitle: {safe_title}\n"
        f"date: {date.today().isoformat()}\n"
        f"categories: [Java 快速入门]\n"
        f"tags: [Java, {tag}, OneNote]\n"
        f"---\n\n{body.lstrip()}"
    )


def resolve_dest(rel: Path) -> Path:
    parts = [clean_name(p) for p in rel.parts]
    top = parts[0]
    if top not in TOP_MAP:
        return DEST / "附录" / "未分类" / Path(*parts[1:])
    base = TOP_MAP[top]
    if len(parts) == 1:
        return DEST / base
    sub = Path(*[clean_name(p) for p in parts[1:]])
    return DEST / base / sub


def migrate_file(src: Path, dest: Path, tag: str) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    text = src.read_text(encoding="utf-8", errors="replace")
    title = slug_title(src.stem)
    if has_front_matter(text):
        shutil.copy2(src, dest)
        return
    dest.write_text(add_front_matter(title, tag, text), encoding="utf-8")


def collect_index_entries() -> list[tuple[str, str, Path]]:
    entries: list[tuple[str, str, Path]] = []
    for md in sorted(DEST.rglob("*.md")):
        if md.name in KEEP_AT_ROOT:
            continue
        rel = md.relative_to(DEST)
        part = rel.parts[0] if rel.parts else ""
        title = md.stem
        # web path for vitepress
        link = f"/posts/java快速入门/{rel.as_posix()}"
        entries.append((part, title, link))
    return entries


def build_readme(entries: list[tuple[str, str, str]]) -> str:
    from collections import defaultdict

    tree: dict[str, dict[str, list[tuple[str, str]]]] = defaultdict(lambda: defaultdict(list))
    for rel_parent, title, link in entries:
        parts = Path(rel_parent).parts
        part = parts[0] if parts else "附录"
        sub = parts[1] if len(parts) > 1 else ""
        tree[part][sub].append((title, link))

    part_order = [
        "第一部分：语言基础",
        "第二部分：面向对象",
        "第三部分：核心 API",
        "第四部分：Web 基础",
        "第五部分：数据库",
        "第六部分：Spring 生态",
        "第七部分：构建与运维",
        "第八部分：网络编程",
        "第九部分：微服务",
        "第十部分：常见需求",
        "附录",
    ]

    lines = [
        "---",
        "title: Java 快速入门教程总览",
        f"date: {date.today().isoformat()}",
        "categories: [Java 快速入门]",
        "tags: [Java, 教程, 入门, 后端, OneNote]",
        "description: 从 OneNote 笔记系统化整理的 Java 全栈教程：基础语法、面向对象、Web、Spring、MyBatis、微服务与实战。",
        "---",
        "",
        "# Java 快速入门教程总览",
        "",
        "> 本系列由 OneNote 笔记迁移整理，按 **语言基础 → 面向对象 → 核心 API → Web → 数据库 → Spring → 构建 → 网络 → 微服务** 分层组织。",
        "",
        "## 怎么用",
        "",
        "1. 按下面目录顺序学习，或按关键词搜索。",
        "2. 每篇文章带 `OneNote` 标签，表示源自原始笔记，后续可逐步润色。",
        "3. 用 [0-提示词](./0-提示词.md) 把新代码归类到对应章节。",
        "",
        "- [为什么要重新系统学习 Java？](./为什么要重新系统学习 Java.md)",
        "- [0-提示词](./0-提示词.md)",
        "",
        "---",
        "",
    ]

    ordered_parts = part_order + [p for p in sorted(tree.keys()) if p not in part_order]

    for part in ordered_parts:
        if part not in tree:
            continue
        subs = tree[part]
        total = sum(len(v) for v in subs.values())
        lines.append(f"## {part}（{total} 篇）")
        lines.append("")
        for sub in sorted(subs.keys(), key=lambda x: (x == "", x)):
            items = sorted(subs[sub], key=lambda x: x[0])
            if sub:
                lines.append(f"### {sub}")
                lines.append("")
            for title, link in items:
                rel_link = "./" + link.removeprefix("/posts/java快速入门/")
                lines.append(f"- [{title}]({rel_link})")
            lines.append("")

    lines.append("---")
    lines.append("")
    lines.append(f"*共 {len(entries)} 篇文章 · 源目录：`OneNote导出/OneNote/java`*")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    if not SRC.is_dir():
        raise SystemExit(f"Source not found: {SRC}")

    # preserve root meta files
    preserved = {}
    for name in KEEP_AT_ROOT:
        p = DEST / name
        if p.exists():
            preserved[name] = p.read_text(encoding="utf-8")

    # remove old migrated content except root meta
    if DEST.exists():
        for child in DEST.iterdir():
            if child.name in KEEP_AT_ROOT:
                continue
            if child.is_dir():
                shutil.rmtree(child)
            else:
                child.unlink()

    DEST.mkdir(parents=True, exist_ok=True)
    for name, content in preserved.items():
        (DEST / name).write_text(content, encoding="utf-8")

    count = 0
    for src in sorted(SRC.rglob("*.md")):
        rel = src.relative_to(SRC)
        top = clean_name(rel.parts[0])
        dest = resolve_dest(rel)
        tag = infer_tag(str(dest.relative_to(DEST)))
        migrate_file(src, dest, tag)
        count += 1

    # also migrate first chapter if exists in old location - already in preserved

    entries = []
    for md in sorted(DEST.rglob("*.md")):
        if md.name in KEEP_AT_ROOT:
            continue
        rel = md.relative_to(DEST)
        link = f"/posts/java快速入门/{rel.as_posix()}"
        entries.append((str(rel.parent), md.stem, link))

    readme = build_readme(entries)
    (DEST / "README.md").write_text(readme, encoding="utf-8")

    print(f"Migrated {count} files to {DEST}")
    print(f"Index entries: {len(entries)}")


if __name__ == "__main__":
    main()
