---
title: 使用 hexo 在 github 部署个人博客
date: 2025-09-04 18:04:44
tags: [Hexo, GitHub Pages, 博客]
---

# 整体实现思路

- **写作方式**：本地写 Markdown（VSCode/Typora），利用 Hexo 生成静态文件。
- **站点能力**：front-matter 实现**分类/标签**；装 `hexo-generator-searchdb` 提供**本地搜索**（纯静态，无后端）。
- **部署方式**：用 **GitHub Actions** 在每次 `push main` 时自动构建，把 `public/` 发布到 **`gh-pages`** 分支；**Pages** 指向该分支即可上线。
- **路径模式**：你当前是**项目页**（仓库名不是 `<用户名>.github.io`），所以站点路径是 `https://<用户名>.github.io/<仓库名>/`，Hexo 里必须设置 `url` 和 `root`。

---

# 分步实现过程

## 1）环境与初始化（已有可跳过）

```bash
npm i -g hexo-cli
hexo init blog && cd blog
npm i
hexo s   # 本地预览 http://localhost:4000
```

## 2）启用主题与“分类/标签/搜索”

```bash
# 安装 NexT（已安装可跳过）
npm i hexo-theme-next

# 生成分类与标签页面
hexo new page categories
hexo new page tags
```

在两个索引页文件顶部加 front-matter（**只需新增这几行**）：

```md
---
title: 分类
type: categories
---
```

```md
---
title: 标签
type: tags
---
```

安装本地搜索索引插件（**一次性**）：

```bash
npm i hexo-generator-searchdb --save
```

**站点配置 `_config.yml` 里新增（或确认存在）**：

```yaml
# 复杂：生成 search.json，供主题读取（静态搜索，无后端）
search:
  path: search.json
  field: post
  content: true
```

**主题配置 `themes/next/_config.yml` 里开启**：

```yaml
# 复杂：在 NexT 主题中开启本地搜索
local_search:
  enable: true
```

## 3）Hexo 站点路径设置（项目页必改）

打开根目录的 **`_config.yml`**，**只改这两行**：

```yaml
# 复杂：GitHub Project Pages 部署在 /blog/ 子路径（用你的用户名和仓库名）
url: https://<你的GitHub名>.github.io/<你的仓库名>
root: /<你的仓库名>/
```

> 你当前仓库是 `herongxhr-netizen/blog`，因此应为：
> `url: https://herongxhr-netizen.github.io/blog` > `root: /blog/`

## 4）把项目推到 GitHub（已有仓库可跳过初始化）

```bash
git init
git add .
git commit -m "init blog"
git branch -M master
git remote add origin https://github.com/<你的GitHub名>/<你的仓库名>.git
git push -u origin master
```

## 5）创建自动部署（GitHub Actions）

在仓库中新建文件 **`.github/workflows/deploy.yml`**，内容如下：

```yaml
# 复杂：构建 Hexo 并把生成的 public/ 发布到 gh-pages
name: Deploy Hexo to GitHub Pages
on:
  push:
    # 注意检查这个分支是否存在，另外还要注意master|main 两种默认主分支
    branches: [master]
permissions:
  contents: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm i
      - run: npx hexo clean && npx hexo g
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
```

> 作用：每次推送到 `master`，自动构建 Hexo 并把 `public/` 发布到 `gh-pages` 分支。

## 6）打开 GitHub Pages（指向 `gh-pages`）

仓库 → **Settings → Pages**：

- **Source** 选 **Deploy from a branch**
- **Branch** 选 **`gh-pages`**，**Folder** 选 **`/(root)`** → Save
  访问：`https://<你的GitHub名>.github.io/<你的仓库名>/`

## 7）写第一篇/后续文章（固定节奏）

```bash
hexo new post "我的第一篇文章"
# 编辑 source/_posts/我的第一篇文章.md，增加分类/标签 front-matter
hexo s                 # 本地预览确认
git add . && git commit -m "post: 第一篇" && git push
# -> Actions 自动构建 -> Pages 自动更新
```

## 故障排查（按频率排序）

1. **页面样式丢失或 404**

   - 九成是 `_config.yml` 的 `url/root` 不匹配“项目页子路径”。
   - 修复：按上面的两行改好 → `git push` 触发重建。

2. **推送成功但没自动发布**

   - 检查 **Actions** 是否执行、是否报“权限不足”。
   - 修复：打开 **Read and write permissions** 或在 workflow 增加 `permissions: contents: write`。

3. **Pages 仍显示旧内容**

   - 浏览器缓存或 GitHub Pages 缓存未刷新。
   - 修复：改动任意文件再推一次，或等几分钟刷新。

4. **找不到搜索框/搜索无结果**

   - 主题未开启 `local_search.enable` 或站点未生成 `search.json`。
   - 修复：确认两处配置；本地 `hexo clean && hexo g` 看 `public/search.json` 是否存在。

5. **想改成“用户页”根路径**

   - 把仓库改名为 `<你的GitHub名>.github.io`；
   - `_config.yml` 改为：

     ```yaml
     # 复杂：用户页部署在根路径
     url: https://<你的GitHub名>.github.io
     root: /
     ```

   - Pages 的 Source 仍选 `gh-pages`。

---

需要的话，把你当前 `themes/next/_config.yml` 里想开的功能（目录、代码复制、文章 TOC、暗色主题）告诉我；我会**只列需要修改的那几行**，并在复杂行上面加注释。
