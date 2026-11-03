<script setup lang="ts">
import SiteChromeHeader from './SiteChromeHeader.vue'
import SiteChromeFooter from './SiteChromeFooter.vue'
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <div class="works-site" :class="{ 'works-site--compact': compact }">
    <a class="works-skip" href="#works-main">跳到主要内容</a>
    <SiteChromeHeader />

    <main id="works-main" class="works-main"><slot /></main>

    <SiteChromeFooter />
  </div>
</template>
