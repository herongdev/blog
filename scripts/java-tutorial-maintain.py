#!/usr/bin/env python3
"""Clean OneNote artifacts, reorganize Spring Boot, regenerate Java tutorial README."""

from __future__ import annotations

import re
import shutil
from collections import defaultdict
from datetime import date
from pathlib import Path

JAVA_ROOT = Path("/Users/ronnie/Documents/my-project/blog/docs/posts/java快速入门")
SPRING_BOOT = JAVA_ROOT / "第六部分：Spring 生态" / "02-Spring Boot"

# Root-level Spring Boot files -> subfolder
SPRING_BOOT_ROOT_MAP: dict[str, str] = {
    "SpringBoot简介.md": "A-入门",
    "SpringBoot原理分析.md": "A-入门",
    "如何判断你是Spring Boot项目还是Spring项目.md": "A-入门",
    "使用idea快速创建SpringBoot项目.md": "A-入门",
    "SpringBoot - 多模块项目的搭建教程.md": "A-入门",
    "基于Tomcat构建Java web环境.md": "A-入门",
    "查看和管理Spring Beans.md": "A-入门",
    "获取Get请求参数详解（附样例：非空、默认值、数组、对象）.md": "B-接口开发",
    "创建拦截器来打印请求的信息.md": "B-接口开发",
    "全局异常处理.md": "B-接口开发",
    "转换器的作用.md": "B-接口开发",
    "DO.md": "B-接口开发",
    "DO和VO的转换.md": "B-接口开发",
    "DTO与VO.md": "B-接口开发",
    "java实体entity转map对象.md": "B-接口开发",
    "Spring boot 跨域处理.md": "B-接口开发",
    "二）springboot整合redis，基于注解快速实现缓存功能.md": "C-配置与整合",
    "MyBatis-Plus自动填充功能填坑.md": "C-配置与整合",
    "SpringBoot与整合其他技术.md": "C-配置与整合",
    "Springboot starter开发之traceId请求日志链路追踪.md": "C-配置与整合",
    "还不知道微服务的入口？快看这里，手把手实战网关组件Gateway，一发入魂～.md": "C-配置与整合",
}

# Existing subdirs -> new prefix folder
SPRING_BOOT_DIR_MAP: dict[str, str] = {
    "SpringBoot快速入门": "A-入门/SpringBoot快速入门",
    "SpringBoot快速入门 ": "A-入门/SpringBoot快速入门",
    "一、构建SpringBoot项目": "A-入门/一、构建SpringBoot项目",
    "后端接口开发入门": "B-接口开发/后端接口开发入门",
    "后端快速开发": "B-接口开发/后端快速开发",
    "接口开发进阶": "B-接口开发/接口开发进阶",
    "请求方式": "B-接口开发/请求方式",
    "请求方法与请求参数": "B-接口开发/请求方法与请求参数",
    "Spring MVC自定义参数解析器": "B-接口开发/Spring MVC自定义参数解析器",
    "六、异常统一处理的三种方式": "B-接口开发/六、异常统一处理的三种方式",
    "SpringBoot的配置文件": "C-配置与整合/SpringBoot的配置文件",
    "SpringBoot的配置文件 ": "C-配置与整合/SpringBoot的配置文件",
    "application.yml中配置使用方式": "C-配置与整合/application.yml中配置使用方式",
    "常用注解": "C-配置与整合/常用注解",
    "接口文档": "C-配置与整合/接口文档",
    "常见报错": "D-排错/常见报错",
}

TRAINING_FOOTER = re.compile(
    r"北京市昌平区[^\n]*?(?:电话：?\s*)?(?:```\s*)?\d{3}-\d{3,4}-\d{4}\s*",
    re.MULTILINE | re.DOTALL,
)
MULTI_NEWLINES = re.compile(r"\n{3,}")
FENCE_BLOCK = re.compile(r"```[^\n]*\n(.*?)```", re.DOTALL)

KEEP_AT_ROOT = {"README.md", "0-提示词.md", "为什么要重新系统学习 Java.md"}


def split_front_matter(text: str) -> tuple[str | None, str]:
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return None, text
    fm = text[: end + 5]
    body = text[end + 5 :]
    return fm, body


def is_real_code(content: str) -> bool:
    c = content.strip()
    if not c:
        return False
    if len(c) > 50:
        return True
    code_signals = (
        "{",
        "}",
        ";",
        "public ",
        "private ",
        "class ",
        "import ",
        "package ",
        "void ",
        "return ",
        "->",
        "@",
        "//",
        "/*",
        "System.out",
    )
    if any(s in c for s in code_signals):
        return True
    if c.count("\n") >= 2:
        return True
    return False


def clean_body(body: str) -> str:
    body = TRAINING_FOOTER.sub("", body)
    body = re.sub(r"北京市昌平区[^\n]*", "", body)

    def process_fence(m: re.Match[str]) -> str:
        inner = m.group(1)
        lines = [ln.strip() for ln in inner.split("\n") if ln.strip()]
        if not lines:
            return ""
        if len(lines) == 1:
            line = lines[0]
            if not is_real_code(line) and len(line) <= 50:
                return f"`{line}`"
            return m.group(0)
        # Multi-line: prose bullets (OneNote list in code block)
        if all(not is_real_code(ln) and len(ln) <= 120 for ln in lines):
            if len(lines) <= 8:
                return "\n".join(f"- {ln}" for ln in lines) + "\n"
        return m.group(0)

    body = FENCE_BLOCK.sub(process_fence, body)
    body = re.sub(r"`(\d{4})`\s*\n+\s*年", r"\1年", body)
    body = re.sub(r"```\s*\n\s*(\d{4})\s*\n```\s*\n+\s*年", r"\1年", body)
    body = re.sub(r"版本\s*(\d{4})\s*`", r"版本\n\n\1年", body)
    body = re.sub(r"^(\d{4})\s*\n+[`']?年([^`\n]+)", r"\1年\2", body, flags=re.MULTILINE)
    body = re.sub(r"^`Java`?\s*\n+\*\*语言能做什么\*\*", "**Java 语言能做什么**", body, flags=re.MULTILINE)
    body = re.sub(r"^Java\s*\n+\*\*语言能做什么\*\*", "**Java 语言能做什么**", body, flags=re.MULTILINE)
    body = re.sub(r"^Java\s*\n+```\s*\n", "", body, flags=re.MULTILINE)
    body = re.sub(r"\n```\s*\n(?=[^\`])", "\n", body)
    body = MULTI_NEWLINES.sub("\n\n", body)
    body = re.sub(r"[ \t]+\n", "\n", body)
    return body.strip() + "\n"


def clean_file(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    fm, body = split_front_matter(raw)
    cleaned = clean_body(body)
    if cleaned == body and fm:
        return False
    out = (fm or "") + cleaned
    path.write_text(out, encoding="utf-8")
    return True


def move_path(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        stem, suffix = dest.stem, dest.suffix
        i = 2
        while dest.exists():
            dest = dest.with_name(f"{stem}-{i}{suffix}")
            i += 1
    shutil.move(str(src), str(dest))


def reorganize_spring_boot() -> int:
    if not SPRING_BOOT.is_dir():
        return 0
    moved = 0

    # move subdirectories
    for name, target_rel in list(SPRING_BOOT_DIR_MAP.items()):
        src_dir = SPRING_BOOT / name.strip()
        if not src_dir.is_dir():
            continue
        dest_dir = SPRING_BOOT / target_rel
        dest_dir.parent.mkdir(parents=True, exist_ok=True)
        if dest_dir.exists():
            for f in src_dir.rglob("*"):
                if f.is_file():
                    rel = f.relative_to(src_dir)
                    move_path(f, dest_dir / rel)
                    moved += 1
            shutil.rmtree(src_dir, ignore_errors=True)
        else:
            shutil.move(str(src_dir), str(dest_dir))
            moved += 1

    # move root files
    for name, folder in SPRING_BOOT_ROOT_MAP.items():
        src = SPRING_BOOT / name
        if src.is_file():
            move_path(src, SPRING_BOOT / folder / name)
            moved += 1

    # remove empty legacy dirs
    for child in list(SPRING_BOOT.iterdir()):
        if child.is_dir() and child.name in SPRING_BOOT_DIR_MAP:
            shutil.rmtree(child, ignore_errors=True)

    # add series index
    index_path = SPRING_BOOT / "README.md"
    if not index_path.exists():
        index_path.write_text(
            """---
title: Spring Boot 教程索引
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, SpringBoot]
sidebarWeight: 1
description: Spring Boot 分四门：入门、接口开发、配置与整合、排错。
---

# Spring Boot 教程索引

| 子系列 | 说明 |
|--------|------|
| **A-入门** | 创建项目、原理、多模块、Tomcat |
| **B-接口开发** | Controller、参数、DO/VO、异常、拦截器 |
| **C-配置与整合** | 配置文件、注解、Redis、MyBatis-Plus、Gateway |
| **D-排错** | 常见报错与解决方案 |

按 **A → B → C**，遇到报错查 **D**。
""",
            encoding="utf-8",
        )

    return moved


def build_readme() -> None:
    entries: list[tuple[str, str, str]] = []
    for md in sorted(JAVA_ROOT.rglob("*.md")):
        if md.name in KEEP_AT_ROOT and md.parent == JAVA_ROOT:
            continue
        rel = md.relative_to(JAVA_ROOT)
        link = f"/posts/java快速入门/{rel.as_posix()}"
        entries.append((str(rel.parent), md.stem, link))

    tree: dict[str, dict[str, list[tuple[str, str]]]] = defaultdict(lambda: defaultdict(list))
    for rel_parent, title, link in entries:
        parts = Path(rel_parent).parts
        part = parts[0] if parts else "附录"
        sub = "/".join(parts[1:3]) if len(parts) > 1 else ""
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
        "sidebarWeight: 0",
        "description: 从 OneNote 笔记系统化整理的 Java 全栈教程，已清理格式并重组 Spring Boot 子系列。",
        "---",
        "",
        "# Java 快速入门教程总览",
        "",
        "> 537 篇笔记 · 已清理 OneNote 断行代码块 · Spring Boot 分为入门 / 接口 / 配置 / 排错",
        "",
        "- [为什么要重新系统学习 Java？](./为什么要重新系统学习 Java.md)",
        "- [0-提示词](./0-提示词.md)",
        "",
        "---",
        "",
    ]

    for part in part_order + [p for p in sorted(tree) if p not in part_order]:
        if part not in tree:
            continue
        subs = tree[part]
        total = sum(len(v) for v in subs.values())
        lines.append(f"## {part}（{total} 篇）")
        lines.append("")
        for sub in sorted(subs.keys(), key=lambda x: (x == "", x)):
            if sub:
                lines.append(f"### {sub}")
                lines.append("")
            for title, link in sorted(subs[sub], key=lambda x: x[0]):
                rel_link = "./" + link.removeprefix("/posts/java快速入门/")
                lines.append(f"- [{title}]({rel_link})")
            lines.append("")

    lines.append(f"*共 {len(entries)} 篇*")
    (JAVA_ROOT / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def set_sidebar_weight(path: Path, weight: int) -> None:
    raw = path.read_text(encoding="utf-8")
    fm, body = split_front_matter(raw)
    if not fm:
        return
    # fix corrupted description...sidebarWeight on same line
    fm = re.sub(r"(description:[^\n]*?)sidebarWeight:\s*\d+", r"\1", fm)
    fm = fm.rstrip()
    if not fm.endswith("---"):
        return
    if re.search(r"^sidebarWeight:", fm, re.MULTILINE):
        fm = re.sub(r"^sidebarWeight:.*$", f"sidebarWeight: {weight}", fm, flags=re.MULTILINE)
    else:
        fm = fm[:-3].rstrip() + f"\nsidebarWeight: {weight}\n---\n"
    path.write_text(fm + body, encoding="utf-8")


def update_meta_weights() -> None:
    set_sidebar_weight(JAVA_ROOT / "README.md", 0)
    set_sidebar_weight(JAVA_ROOT / "为什么要重新系统学习 Java.md", 1)
    set_sidebar_weight(JAVA_ROOT / "0-提示词.md", 2)


def main() -> None:
    cleaned = 0
    for md in JAVA_ROOT.rglob("*.md"):
        if clean_file(md):
            cleaned += 1

    moved = reorganize_spring_boot()
    update_meta_weights()
    build_readme()

    print(f"Cleaned {cleaned} files")
    print(f"Spring Boot moves: {moved}")
    print("README regenerated")


if __name__ == "__main__":
    main()
