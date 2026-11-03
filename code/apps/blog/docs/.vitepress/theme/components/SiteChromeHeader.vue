<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { renderHeader, type Section } from '@herong/site-chrome'
import { initSiteChrome } from '@herong/site-chrome/client'

const route = useRoute()
const { theme, isDark } = useData()
const header = computed(() => {
  const pathname = route.path.slice(withBase('/').replace(/\/$/, '').length)
  const active: Section | undefined = pathname.startsWith('/posts') || pathname.startsWith('/articles') ? 'articles'
    : pathname.startsWith('/projects') ? 'projects' : pathname.startsWith('/products') ? 'apps'
    : pathname.startsWith('/about') ? 'about' : undefined
  return renderHeader({ homeUrl: withBase('/'), ...theme.value.siteChrome, active })
})
let cleanup: (() => void) | undefined
let observer: MutationObserver | undefined
onMounted(() => {
  cleanup = initSiteChrome(document)
  // VitePress appearance is disabled. Its content components can still read
  // the shared controller's resolved theme without becoming a second owner.
  const sync = () => { isDark.value = document.documentElement.classList.contains('dark') }
  sync()
  observer = new MutationObserver(sync)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
watch(() => route.path, async () => {
  await nextTick()
  if (typeof document !== 'undefined') cleanup = initSiteChrome(document)
})
onBeforeUnmount(() => { observer?.disconnect(); cleanup?.() })
</script>

<template><div class="hr-blog-header" v-html="header" /></template>
