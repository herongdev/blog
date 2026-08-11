# OneNote 教程维护说明

## 当前发布方式

本仓库曾经使用 Hexo，目前实际构建器是 VitePress。OneNote 教程因此发布到 `docs/posts/`，每篇文章仍保留 Hexo 常用的 `title`、`date`、`categories` 和 `tags` front matter。

教程总入口：`docs/posts/onenote教程总览.md`。

## 重新导入

OneNote 的默认导出目录是：

```text
/Users/ronnie/Documents/OneNote导出/OneNote
```

在博客根目录执行：

```bash
npm run tutorials:import:onenote
```

脚本会重新生成以下四个专用目录：

- `docs/posts/JavaScript系统教程`
- `docs/posts/Vue系统教程`
- `docs/posts/React系统教程`
- `docs/posts/前端面试与实战`

`docs/posts/java快速入门` 使用已有的 Java 专用迁移脚本维护，本脚本不会改动它。

## 转换规则

- 跳过空白页和清理后没有有效文字、代码的页面。
- 按正文去掉完全重复的页面。
- 自动补全 Hexo/VitePress front matter、文章标题、学习目标和侧边栏顺序。
- 将混在 `f-vue` 中的 React、Redux、React Router 笔记分到 React 教程。
- OneNote 导出目录没有携带原图片文件，因此会移除失效的本地图片链接，并在受影响文章中注明。
- 自动生成 `scripts/onenote-tutorial-manifest.json`，记录数量、跳过原因及源文件到目标文章的映射。

## 构建检查

```bash
npm run build
```

导入脚本只会清空并重建上面列出的四个专用教程目录，不会删除博客中的其他文章。
