<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import PageViews from './components/PageViews.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before>
      <PageViews mode="page" />
    </template>
    <template #layout-bottom>
      <div class="vp-site-views-wrap">
        <PageViews mode="site" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
