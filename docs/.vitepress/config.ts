import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
const BASE = process.env.BASE || "/";
const SITE_HOSTNAME = process.env.SITE_URL || "https://example.com";
const BAIDU_TONGJI_ID = process.env.BAIDU_TONGJI_ID || "";
const UMAMI_SRC = process.env.UMAMI_SRC || "";
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID || "";
const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN || "";
const GA_ID = process.env.GA_ID || "";
const OUT_DIR = process.env.OUT_DIR || "./.vitepress/dist";
const ENABLE_PAGE_VIEWS = process.env.ENABLE_PAGE_VIEWS !== "0";
const LIGHT_TOOLS_URL = process.env.LIGHT_TOOLS_URL || "http://127.0.0.1:3000";
const COURSES_URL = `${LIGHT_TOOLS_URL.replace(/\/$/, "")}/courses`;
const LIGHT_TOOLS_NAV =
  /^https?:\/\//i.test(LIGHT_TOOLS_URL)
    ? { text: "工具箱", link: LIGHT_TOOLS_URL, target: "_self", rel: "" }
    : { text: "工具箱", link: LIGHT_TOOLS_URL };
const COURSES_NAV =
  /^https?:\/\//i.test(COURSES_URL)
    ? { text: "课程", link: COURSES_URL, target: "_self", rel: "" }
    : { text: "课程", link: COURSES_URL };

function siteOrigin(): string {
  return SITE_HOSTNAME.replace(/\/$/, "");
}

function canonicalUrl(pagePath = "/"): string {
  const base = BASE === "/" ? "" : BASE.replace(/\/$/, "");
  const path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  return `${siteOrigin()}${base}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

function pageDescription(pageData: {
  title: string;
  description?: string;
  frontmatter: Record<string, unknown>;
}): string {
  const fromFm = pageData.frontmatter.description;
  if (typeof fromFm === "string" && fromFm.trim()) return fromFm.trim();
  if (pageData.description?.trim()) return pageData.description.trim();
  return `${pageData.title} | 我的技术分享`;
}

function pageKeywords(pageData: { frontmatter: Record<string, unknown> }): string {
  const tags = pageData.frontmatter.tags;
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t)).join(", ");
  }
  const keywords = pageData.frontmatter.keywords;
  if (typeof keywords === "string") return keywords;
  if (Array.isArray(keywords)) return keywords.map((k) => String(k)).join(", ");
  return "";
}

const HEAD_LINKS: any[] = [
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      href: `${BASE}logo.png`,
    },
  ],
  [
    "link",
    {
      rel: "apple-touch-icon",
      href: `${BASE}logo.png`,
    },
  ],
  [
    "link",
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: `${BASE}rss.xml`,
    },
  ],
  [
    "link",
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: "Atom",
      href: `${BASE}atom.xml`,
    },
  ],
  [
    "link",
    {
      rel: "alternate",
      type: "application/feed+json",
      title: "JSON Feed",
      href: `${BASE}feed.json`,
    },
  ],
];

// 安装百度统计（适合国内可达性）
if (BAIDU_TONGJI_ID) {
  HEAD_LINKS.push([
    "script",
    {},
    `var _hmt = _hmt || []; (function(){ var hm = document.createElement('script'); hm.src = 'https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s); })();`,
  ]);
  // 单页应用的 PV 与 CTA 事件埋点
  HEAD_LINKS.push([
    "script",
    {},
    `
    (function(){
      function trackPage(){ try{ if(window._hmt){ window._hmt.push(['_trackPageview', location.pathname + location.search]); } }catch(e){} }
      // 首次
      trackPage();
      // 监听历史路由变化
      var _pushState = history.pushState; history.pushState = function(){ var r = _pushState.apply(this, arguments); setTimeout(trackPage, 0); return r; };
      var _replaceState = history.replaceState; history.replaceState = function(){ var r = _replaceState.apply(this, arguments); setTimeout(trackPage, 0); return r; };
      window.addEventListener('popstate', trackPage);

      // 简单 CTA / 外链点击埋点
      document.addEventListener('click', function(ev){
        var el = ev.target && (ev.target.closest ? ev.target.closest('a') : null);
        if(!el) return;
        var href = el.getAttribute('href') || '';
        if(!href) return;
        var isExternal = /^https?:/i.test(href) && href.indexOf(location.origin) !== 0;
        var isCTA = href.indexOf('/newsletter') === 0 || href.indexOf('/community') === 0 || href === '/posts/' || href === '/posts';
        if(!isExternal && !isCTA) return;
        var category = isExternal ? 'outbound' : 'cta';
        var label = href;
        try{ if(window._hmt){ window._hmt.push(['_trackEvent', category, 'click', label]); } }catch(e){}
      }, true);
    })();
    `,
  ]);
}

if (UMAMI_SRC && UMAMI_WEBSITE_ID) {
  HEAD_LINKS.push([
    "script",
    { src: UMAMI_SRC, defer: "", "data-website-id": UMAMI_WEBSITE_ID },
  ]);
}

if (PLAUSIBLE_DOMAIN) {
  HEAD_LINKS.push([
    "script",
    {
      defer: "",
      "data-domain": PLAUSIBLE_DOMAIN,
      src: "https://plausible.io/js/script.js",
    },
  ]);
}

if (GA_ID) {
  HEAD_LINKS.push([
    "script",
    { async: "", src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` },
  ]);
  HEAD_LINKS.push([
    "script",
    {},
    `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`,
  ]);
}

// 复杂逻辑：CI 构建时打印 base/outDir，直接在 Actions 日志里可见
if (process.env.CI) {
  console.log(
    "[VitePress]",
    "BASE=",
    BASE,
    "OUT_DIR=",
    OUT_DIR,
    "cwd=",
    process.cwd()
  );
}

export default {
  lang: "zh-CN",
  title: "我的技术分享",
  description: "记录、积累人气、可被搜索引擎良好收录的个人技术分享",
  lastUpdated: true,
  cleanUrls: true,
  outDir: OUT_DIR,
  base: BASE.endsWith("/") ? BASE : `${BASE}/`,
  sitemap: { hostname: SITE_HOSTNAME },
  ignoreDeadLinks: true,
  markdown: {
    // 避免原始 HTML 导致 Vue SFC 解析错误
    html: false,
  },
  vite: {
    define: {
      "import.meta.env.VITE_ENABLE_PAGE_VIEWS": JSON.stringify(
        ENABLE_PAGE_VIEWS ? "true" : "false"
      ),
    },
  },
  transformPageData(pageData) {
    const fromFm = pageData.frontmatter.description;
    if (typeof fromFm === "string" && fromFm.trim() && !pageData.description) {
      pageData.description = fromFm.trim();
    }
    return pageData;
  },
  transformHead({ pageData, siteData }) {
    const siteTitle = siteData.title || "我的技术分享";
    const title = String(pageData.frontmatter.title || pageData.title || siteTitle);
    const desc = pageDescription({
      title,
      description: pageData.description,
      frontmatter: pageData.frontmatter,
    });
    const pagePath = pageData.path || "/";
    const url = canonicalUrl(pagePath);
    const keywords = pageKeywords(pageData);
    const isArticle = pagePath.startsWith("/posts/");
    const pageLang =
      typeof pageData.frontmatter.lang === "string"
        ? pageData.frontmatter.lang
        : "zh-CN";
    const ogLocale = pageLang.startsWith("en") ? "en_US" : "zh_CN";

    const head: Array<[string, Record<string, string>]> = [
      ["meta", { name: "description", content: desc }],
      ["meta", { property: "og:locale", content: ogLocale }],
      ["meta", { property: "og:site_name", content: siteTitle }],
      ["meta", { property: "og:title", content: `${title} | ${siteTitle}` }],
      ["meta", { property: "og:description", content: desc }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { name: "twitter:card", content: "summary" }],
      ["meta", { name: "twitter:title", content: `${title} | ${siteTitle}` }],
      ["meta", { name: "twitter:description", content: desc }],
      ["link", { rel: "canonical", href: url }],
    ];

    const alternateZh = pageData.frontmatter.alternateZh;
    const alternateEn = pageData.frontmatter.alternateEn;
    if (typeof alternateZh === "string" && alternateZh.trim()) {
      head.push([
        "link",
        {
          rel: "alternate",
          hreflang: "zh-CN",
          href: canonicalUrl(alternateZh.trim()),
        },
      ]);
      head.push([
        "link",
        {
          rel: "alternate",
          hreflang: "x-default",
          href: canonicalUrl(alternateZh.trim()),
        },
      ]);
    }
    if (typeof alternateEn === "string" && alternateEn.trim()) {
      head.push([
        "link",
        {
          rel: "alternate",
          hreflang: "en",
          href: canonicalUrl(alternateEn.trim()),
        },
      ]);
    }

    if (keywords) {
      head.push(["meta", { name: "keywords", content: keywords }]);
    }

    head.push([
      "meta",
      { property: "og:type", content: isArticle ? "article" : "website" },
    ]);

    const date = pageData.frontmatter.date;
    if (isArticle && date) {
      head.push([
        "meta",
        { property: "article:published_time", content: String(date) },
      ]);
    }

    return head;
  },
  themeConfig: {
    logo: {
      src: "/logo.png",
      alt: "Harbor & Route",
    },
    siteTitle: "我的技术分享",
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/" },
      COURSES_NAV,
      LIGHT_TOOLS_NAV,
    ],
    socialLinks: [],
    search: { provider: "local" },
    outline: { level: [2, 3] },
    footer: {
      copyright:
        '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">湘ICP备2024071383号-6</a>',
    },
    // 基于 docs/posts 目录结构自动生成多级侧边栏
    sidebar: {
      "/posts/java快速入门/": generateSidebarFromDir(
        path.resolve(__dirname, "../posts/java快速入门"),
        "/posts/java快速入门/"
      ),
      "/posts/c教程/": generateSidebarFromDir(
        path.resolve(__dirname, "../posts/c教程"),
        "/posts/c教程/"
      ),
      "/posts/c教程/en-US/": generateSidebarFromDir(
        path.resolve(__dirname, "../posts/c教程/en-US"),
        "/posts/c教程/en-US/"
      ),
      "/posts/c教程/zh-CN/": generateSidebarFromDir(
        path.resolve(__dirname, "../posts/c教程/zh-CN"),
        "/posts/c教程/zh-CN/"
      ),
      "/posts/": generateSidebarFromDir(
        path.resolve(__dirname, "../posts"),
        "/posts/"
      ),
    },
  },
  head: HEAD_LINKS,
};

// —— 以下为自动侧边栏构建逻辑 ——
type SidebarItem =
  | { text: string; link: string }
  | { text: string; items: SidebarItem[]; collapsed?: boolean };

function readTitleFromMd(file: string): string | null {
  try {
    const raw = fs.readFileSync(file, "utf8");
    const fm = matter(raw);
    const t = (fm.data?.title as string | undefined) || null;
    return t && String(t).trim() ? String(t) : null;
  } catch {
    return null;
  }
}

function filenameToTitle(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  try {
    return decodeURIComponent(base);
  } catch {
    return base;
  }
}

function sortByWeightThenText(a: SidebarItem, b: SidebarItem): number {
  const getWeight = (it: SidebarItem): number => {
    if ("link" in it) {
      const abs = path.join(
        __dirname,
        "..",
        decodeURIComponent(it.link.replace(/^\/posts\//, "posts/"))
      );
      const mdPath = abs.endsWith(".md") ? abs : `${abs}.md`;
      try {
        const raw = fs.readFileSync(mdPath, "utf8");
        const fm = matter(raw);
        const w = fm.data?.sidebarWeight;
        if (typeof w === "number") return w;
        if (typeof w === "string" && w.trim()) return Number(w) || 9999;
      } catch {
        /* ignore */
      }
      return 9999;
    }
    return 9999;
  };
  const wa = getWeight(a);
  const wb = getWeight(b);
  if (wa !== wb) return wa - wb;
  const ta = "link" in a ? a.text : a.text;
  const tb = "link" in b ? b.text : b.text;
  return ta.localeCompare(tb, "zh");
}

const CN_PART_ORDER: Record<string, number> = {
  第一部分: 1,
  第二部分: 2,
  第三部分: 3,
  第四部分: 4,
  第五部分: 5,
  第六部分: 6,
  第七部分: 7,
  第八部分: 8,
  第九部分: 9,
  第十部分: 10,
  附录: 99,
};

function directorySortKey(name: string): string {
  for (const [key, order] of Object.entries(CN_PART_ORDER)) {
    if (name.startsWith(key)) {
      return `${String(order).padStart(2, "0")}-${name}`;
    }
  }
  const numPrefix = name.match(/^(\d+)-/);
  if (numPrefix) {
    return `${numPrefix[1].padStart(2, "0")}-${name}`;
  }
  if (
    name.startsWith("A-") ||
    name.startsWith("B-") ||
    name.startsWith("C-") ||
    name.startsWith("D-")
  ) {
    return name;
  }
  return `50-${name}`;
}

function sortDirectories(a: SidebarItem, b: SidebarItem): number {
  const na = "items" in a ? a.text : "";
  const nb = "items" in b ? b.text : "";
  return directorySortKey(na).localeCompare(directorySortKey(nb), "zh");
}

function generateSidebarFromDir(
  absDir: string,
  baseLink: string
): SidebarItem[] {
  if (!fs.existsSync(absDir)) return [];
  const entries = fs.readdirSync(absDir, { withFileTypes: true });

  const files: SidebarItem[] = [];
  const groups: SidebarItem[] = [];

  for (const e of entries) {
    if (e.name.startsWith("_")) continue;
    const full = path.join(absDir, e.name);
    if (e.isDirectory()) {
      const items = generateSidebarFromDir(
        full,
        baseLink + encodeURIComponent(e.name) + "/"
      );
      if (items.length > 0) {
        groups.push({ text: filenameToTitle(e.name), items, collapsed: true });
      }
      continue;
    }
    if (e.isFile() && e.name.endsWith(".md")) {
      if (e.name.toLowerCase() === "index.md") continue;
      const title = readTitleFromMd(full) || filenameToTitle(e.name);
      const relNoExt = e.name.replace(/\.md$/, "");
      const link = baseLink + encodeURIComponent(relNoExt);
      files.push({ text: title, link });
    }
  }

  files.sort(sortByWeightThenText);
  groups.sort((a, b) => sortDirectories(a, b) || sortByWeightThenText(a, b));
  return [...files, ...groups];
}
