<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import { selectedArticles } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <header class="works-page-intro works-container">
      <div class="works-page-intro__meta"><span>JOURNAL / SELECTED</span><span>{{ selectedArticles.length }} ENTRIES</span></div>
      <h1>文章与教程</h1>
      <p>AI、实时系统、图表与交付过程中的技术记录。</p>
    </header>

    <section class="journal-index works-container">
      <a v-for="(article, index) in selectedArticles" :key="article.href" :href="withBase(article.href)">
        <span class="journal-index__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <i>{{ article.category }}</i>
        <div><h2>{{ article.title }}</h2><p>{{ article.description }}</p></div>
        <b><ArrowUpRight class="site-icon" aria-hidden="true" /></b>
      </a>
    </section>

    <section class="works-container tutorial-links" aria-labelledby="tutorial-title">
      <h2 id="tutorial-title">专题教程</h2>
      <a :href="withBase('/posts/JavaScript系统教程/README')">JavaScript 系统教程 <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
      <a :href="withBase('/posts/React系统教程/README')">React 系统教程 <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
      <a :href="withBase('/posts/Vue系统教程/README')">Vue 系统教程 <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
    </section>
    <aside class="journal-archive works-container">
      <span>FULL ARCHIVE</span>
      <div><strong>全部技术文章</strong><p>保留原有分类、搜索与文章地址。</p></div>
      <a :href="withBase('/posts/')">打开归档 <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
    </aside>
  </PortfolioShell>
</template>

<style scoped>
.tutorial-links { padding-block:32px; display:grid; gap:16px; }
.tutorial-links h2 { font-size:24px; }
.tutorial-links a { display:flex; align-items:center; gap:8px; width:fit-content; }
</style>
