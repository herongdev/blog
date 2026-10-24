import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import './responsive.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }) {
    if (import.meta.env.VITE_ARCHIVE_BUILD !== 'true' || typeof window === 'undefined') return
    router.onBeforeRouteChange = (href) => {
      const target = new URL(href, window.location.href)
      const base = import.meta.env.BASE_URL
      const localPath = target.pathname.startsWith(base)
        ? `/${target.pathname.slice(base.length)}` : target.pathname
      const archivePage = localPath.startsWith('/posts/') || localPath === '/posts'
        || /^\/articles\/?$/.test(localPath) || /^\/vue-progress-scroll-tutorial(?:\.html)?$/.test(localPath)
      if (target.origin !== window.location.origin || !archivePage) {
        // Astro and sibling applications have independent routers and runtimes.
        window.location.assign(target.href)
        return false
      }
    }
  },
} satisfies Theme
