<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { withBase } from 'vitepress'
import type { PortfolioProject } from '../data/portfolio'
import ProjectVisual from './ProjectVisual.vue'

defineProps<{ project: PortfolioProject; index?: number }>()
</script>

<template>
  <article class="case-tile" :class="`case-tile--${project.area}`">
    <a class="case-tile__link" :href="withBase(project.detail)" :aria-label="`查看 ${project.title} 项目案例`">
      <ProjectVisual :project-id="project.id" />
      <div class="case-tile__caption">
        <div>
          <span>{{ project.number }} / {{ project.eyebrow }}</span>
          <h3>{{ project.title }}</h3>
        </div>
        <span class="case-tile__arrow" aria-hidden="true"><ArrowUpRight class="site-icon" aria-hidden="true" /></span>
      </div>
      <div class="case-tile__tags">
        <span v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
      </div>
    </a>
  </article>
</template>
