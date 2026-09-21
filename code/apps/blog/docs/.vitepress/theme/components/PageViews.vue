<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const props = withDefaults(
  defineProps<{
    mode?: 'page' | 'site'
  }>(),
  { mode: 'page' },
)

const enabled = import.meta.env.VITE_ENABLE_PAGE_VIEWS !== 'false'
const BUSUANZI_SRC = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'

let loading = false

function loadBusuanzi() {
  if (!enabled || typeof window === 'undefined') return
  const w = window as Window & { busuanzi?: { reload?: () => void } }
  if (w.busuanzi?.reload) {
    w.busuanzi.reload()
    return
  }
  if (loading || document.querySelector(`script[src="${BUSUANZI_SRC}"]`)) return
  loading = true
  const script = document.createElement('script')
  script.async = true
  script.src = BUSUANZI_SRC
  script.onload = () => {
    loading = false
    w.busuanzi?.reload?.()
  }
  document.body.appendChild(script)
}

const route = useRoute()
onMounted(loadBusuanzi)
watch(
  () => route.path,
  () => loadBusuanzi(),
)
</script>

<template>
  <p v-if="enabled" class="vp-page-views" aria-label="访问统计">
    <template v-if="mode === 'site'">
      本站总访问
      <span id="busuanzi_container_site_pv">
        <span id="busuanzi_value_site_pv">—</span>
      </span>
      次
    </template>
    <template v-else>
      本页访问
      <span id="busuanzi_container_page_pv">
        <span id="busuanzi_value_page_pv">—</span>
      </span>
      次
      <span class="vp-page-views-hint">（不蒜子统计；全站数据可在百度统计 / Umami 后台查看）</span>
    </template>
  </p>
</template>
