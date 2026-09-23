<script setup lang="ts">
import { Sun, Moon, Menu, X } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

const menuOpen = ref(false)
const route = useRoute()
const { isDark, theme } = useData()

const navItems = computed(() => theme.value.nav.map((item: { text: string; link: string }) => ({ label: item.text, href: item.link })))

function closeMenu() {
  menuOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

watch(() => route.path, closeMenu)
onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="works-site" :class="{ 'works-site--compact': compact }">
    <a class="works-skip" href="#works-main">跳到主要内容</a>
    <header class="works-header">
      <div class="works-header__inner">
        <a class="works-brand" :href="withBase('/')" aria-label="何荣项目档案首页">
          <img class="works-brand__logo" :src="withBase('/logo.png')" alt="Harbor & Route" width="46" height="46" />
          <span class="works-brand__name">何荣</span>
          <span class="works-brand__edition">PROJECT ARCHIVE · 26</span>
        </a>

        <nav class="works-nav" aria-label="主导航">
          <a v-for="item in navItems" :key="item.href" :href="withBase(item.href)">{{ item.label }}</a>
        </nav>

        <div class="works-header__controls">
          <button class="works-theme" type="button" aria-label="切换深浅色模式" @click="isDark = !isDark">
            <Sun class="works-theme__sun" aria-hidden="true" />
            <Moon class="works-theme__moon" aria-hidden="true" />
          </button>
          <button
            class="works-menu"
            type="button"
            :aria-label="menuOpen ? '关闭导航' : '打开导航'"
            :aria-expanded="menuOpen"
            aria-controls="works-mobile-nav"
            @click="menuOpen = !menuOpen"
          >
            <X v-if="menuOpen" class="site-icon" aria-hidden="true" />
            <Menu v-else class="site-icon" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav v-show="menuOpen" id="works-mobile-nav" class="works-mobile-nav" aria-label="移动端导航">
        <a v-for="item in navItems" :key="item.href" :href="withBase(item.href)" @click="closeMenu">{{ item.label }}</a>
      </nav>
    </header>

    <main id="works-main" class="works-main"><slot /></main>

    <footer class="works-footer">
      <div class="works-container works-footer__inner">
        <div class="works-footer__brand">
          <img class="works-brand__logo" :src="withBase('/logo.png')" alt="Harbor & Route" width="32" height="32" />
          <strong>项目、产品与工程记录。</strong>
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
