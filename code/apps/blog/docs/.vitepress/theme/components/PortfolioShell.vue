<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const menuOpen = ref(false)
const route = useRoute()
const { isDark } = useData()

const navItems = [
  { label: 'AI 与 Agent', href: '/#ai-agent' },
  { label: '政企与数字孪生', href: '/#enterprise' },
  { label: '金融与图表', href: '/#finance' },
  { label: '商通与全栈', href: '/#fullstack' },
  { label: '技术文章', href: '/articles/' },
  { label: '关于我', href: '/about/' },
]

function closeMenu() {
  menuOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(() => route.path, closeMenu)
onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="portfolio-site">
    <a class="portfolio-skip-link" href="#portfolio-main">跳到主要内容</a>

    <header class="portfolio-header">
      <div class="portfolio-header__inner">
        <a class="portfolio-brand" :href="withBase('/')" aria-label="何荣工程作品集首页">
          <span class="portfolio-brand__mark" aria-hidden="true">HR</span>
          <span>
            <strong>何荣</strong>
            <small>工程作品集</small>
          </span>
        </a>

        <nav class="portfolio-nav" aria-label="主导航">
          <a v-for="item in navItems" :key="item.href" :href="withBase(item.href)">{{ item.label }}</a>
        </nav>

        <div class="portfolio-header__actions">
          <button
            class="portfolio-icon-button"
            type="button"
            :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
            :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
            @click="toggleTheme"
          >
            <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
            </svg>
          </button>
          <button
            class="portfolio-menu-button"
            type="button"
            aria-label="打开导航"
            :aria-expanded="menuOpen"
            aria-controls="portfolio-mobile-nav"
            @click="menuOpen = !menuOpen"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        v-show="menuOpen"
        id="portfolio-mobile-nav"
        class="portfolio-mobile-nav"
        aria-label="移动端导航"
      >
        <a v-for="item in navItems" :key="item.href" :href="withBase(item.href)" @click="closeMenu">
          {{ item.label }}
        </a>
      </nav>
    </header>

    <main id="portfolio-main">
      <slot />
    </main>

    <footer class="portfolio-footer">
      <div class="portfolio-container portfolio-footer__inner">
        <div>
          <strong>何荣 · 高级全栈开发工程师</strong>
          <p>AI 应用与 Agent 编程，复杂业务系统与全栈交付。</p>
        </div>
        <nav aria-label="页脚导航">
          <a :href="withBase('/projects/')">项目</a>
          <a :href="withBase('/posts/')">文章归档</a>
          <a :href="withBase('/rss.xml')">RSS</a>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">湘ICP备2024071383号-6</a>
        </nav>
      </div>
    </footer>
  </div>
</template>
