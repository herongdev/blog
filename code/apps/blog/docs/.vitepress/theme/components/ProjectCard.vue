<script setup lang="ts">
import { withBase } from 'vitepress'
import type { PortfolioProject } from '../data/portfolio'

defineProps<{
  project: PortfolioProject
  featured?: boolean
}>()
</script>

<template>
  <article class="portfolio-project-card" :class="{ 'portfolio-project-card--featured': featured }">
    <div class="portfolio-project-card__topline">
      <span>{{ project.number }}</span>
      <span>{{ project.status }}</span>
    </div>
    <p class="portfolio-eyebrow">{{ project.eyebrow }}</p>
    <h3>{{ project.title }}</h3>
    <p class="portfolio-project-card__summary">{{ project.summary }}</p>
    <dl class="portfolio-project-card__meta">
      <div>
        <dt>我的角色</dt>
        <dd>{{ project.role }}</dd>
      </div>
      <div v-if="project.period">
        <dt>时间</dt>
        <dd>{{ project.period }}</dd>
      </div>
    </dl>
    <ul class="portfolio-tag-list" aria-label="技术与能力标签">
      <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
    </ul>
    <div class="portfolio-project-card__actions">
      <a class="portfolio-text-link" :href="withBase(project.detail)">查看项目说明 <span aria-hidden="true">→</span></a>
      <a
        v-if="project.external"
        class="portfolio-text-link portfolio-text-link--muted"
        :href="project.external.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ project.external.label }} <span aria-hidden="true">↗</span>
      </a>
    </div>
  </article>
</template>
