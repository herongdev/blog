import { defineConfig } from 'vitepress'

// TODO: 将此处替换为你的站点域名（用于生成 sitemap）
const SITE_HOSTNAME = 'https://example.com'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '记录、积累人气、可被搜索引擎良好收录的个人博客',
  lastUpdated: true,
  cleanUrls: true,
  sitemap: { hostname: SITE_HOSTNAME },
  themeConfig: {
    logo: undefined,
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/hello-world' },
    ],
    socialLinks: [],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
  },
  head: [
    // 如果需要访问统计（如 Umami），取消注释并替换为你的脚本地址
    // [
    //   'script',
    //   { src: 'https://your-umami-domain/script.js', defer: '', 'data-website-id': 'YOUR_ID' }
    // ]
  ],
})


