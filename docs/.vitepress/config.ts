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

const HEAD_LINKS: any[] = [
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

export default {
  lang: "zh-CN",
  title: "我的博客",
  description: "记录、积累人气、可被搜索引擎良好收录的个人博客",
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
  themeConfig: {
    logo: undefined,
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/" },
    ],
    socialLinks: [],
    search: { provider: "local" },
    outline: { level: [2, 3] },
    // 基于 docs/posts 目录结构自动生成多级侧边栏
    sidebar: {
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
  // 权重来自 frontmatter: weight，数值越小越靠前；没有则按文本排序
  const getWeight = (it: SidebarItem): number => {
    if ("link" in it) return 9999;
    return 9999;
  };
  const wa = getWeight(a);
  const wb = getWeight(b);
  if (wa !== wb) return wa - wb;
  const ta = "link" in a ? a.text : a.text;
  const tb = "link" in b ? b.text : b.text;
  return ta.localeCompare(tb, "zh");
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
  groups.sort(sortByWeightThenText);
  return [...files, ...groups];
}
