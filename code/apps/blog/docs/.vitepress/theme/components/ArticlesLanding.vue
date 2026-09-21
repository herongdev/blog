<script setup lang="ts">
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import { selectedArticles } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <header class="portfolio-page-hero">
      <div class="portfolio-container portfolio-page-hero__grid">
        <div>
          <p class="portfolio-kicker"><span /> 技术写作</p>
          <h1>把复杂问题，<br>写成可复用的判断。</h1>
        </div>
        <p>精选内容集中在 AI 与 Agent、实时系统、图表调试和工程交付。原有技术博客与全部文章地址继续保留，并可通过本地搜索和分类侧栏查找。</p>
      </div>
    </header>

    <section class="portfolio-articles-page">
      <div class="portfolio-container">
        <div class="portfolio-articles-page__heading">
          <h2>精选文章</h2>
          <span>{{ selectedArticles.length }} 篇</span>
        </div>
        <div class="portfolio-article-list portfolio-article-list--large">
          <a v-for="(article, index) in selectedArticles" :key="article.href" :href="withBase(article.href)">
            <span class="portfolio-article-list__index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span>
              <small>{{ article.category }}</small>
              <strong>{{ article.title }}</strong>
              <em>{{ article.description }}</em>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div class="portfolio-archive-callout">
          <div>
            <p class="portfolio-eyebrow">完整归档</p>
            <h2>继续浏览原技术博客</h2>
            <p>JavaScript、Vue、React、Java、工程实践等历史内容均保留原路径。</p>
          </div>
          <a class="portfolio-button portfolio-button--primary" :href="withBase('/posts/')">进入全部文章 <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </PortfolioShell>
</template>
