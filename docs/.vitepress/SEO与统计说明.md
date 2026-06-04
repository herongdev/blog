# SEO 与访问统计说明

## 已自动做的 SEO

每篇文章会根据 front matter 自动生成：

- `description`（摘要）
- `keywords`（来自 `tags` 或 `keywords` 字段）
- `canonical` 链接（依赖构建环境变量 `SITE_URL`）
- Open Graph / Twitter 卡片元信息
- `sitemap.xml`（构建时生成）

**请务必为每篇文章填写 `description`**，否则只会用标题生成默认摘要，搜索效果较差。

## 访问统计（两层）

### 1. 后台统计（已有，需在 GitHub Secrets 配置）

| 变量 | 作用 |
|------|------|
| `BAIDU_TONGJI_ID` | 百度统计，适合国内 |
| `UMAMI_SRC` + `UMAMI_WEBSITE_ID` | Umami 自建统计 |
| `GA_ID` | Google Analytics |
| `PLAUSIBLE_DOMAIN` | Plausible |

数据在对应平台后台查看，不会在页面上显示具体数字。

### 2. 页面上显示（不蒜子）

文章页底部会显示「本页访问 N 次」，全站底部显示「本站总访问 N 次」。

构建时默认开启。若不想用不蒜子（第三方服务），在构建环境设置：

```bash
ENABLE_PAGE_VIEWS=0
```

本地：

```bash
ENABLE_PAGE_VIEWS=0 npm run docs:dev
```

## 构建时注意

- VPS：`SITE_URL=http://herong.info`（已在 CI 配置）
- GitHub Pages：`SITE_URL=https://herongdev.github.io/blog`

`canonical` 与 sitemap 都依赖正确的 `SITE_URL`。
