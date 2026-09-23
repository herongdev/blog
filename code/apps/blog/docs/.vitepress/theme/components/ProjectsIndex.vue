<script setup lang="ts">
import PortfolioShell from './PortfolioShell.vue'
import ProjectCard from './ProjectCard.vue'
import { capabilities, projectMap, projects } from '../data/portfolio'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
const activeField = computed(() => capabilities.find(field => field.id === frontmatter.value.field))
const visibleFields = computed(() => activeField.value ? [activeField.value] : capabilities)
</script>

<template>
  <PortfolioShell>
    <header v-if="activeField" class="works-container" style="padding-block: 36px">
      <a :href="withBase('/')">返回首页</a>
      <h1 style="font-size: clamp(28px, 4vw, 48px); line-height: 1.3; margin-top: 24px">{{ activeField.title }}</h1>
    </header>
    <header v-else class="works-page-intro works-container">
      <div class="works-page-intro__meta"><span>INDEX / {{ projects.length }} CASES</span><span>2020—2026</span></div>
      <h1>Project<br>Index</h1>
      <nav aria-label="项目分类索引">
        <a v-for="capability in capabilities" :key="capability.id" :href="`#index-${capability.id}`">
          <span>{{ capability.number }}</span>{{ capability.title }}
        </a>
      </nav>
    </header>

    <section
      v-for="capability in visibleFields"
      :id="`index-${capability.id}`"
      :key="capability.id"
      class="works-category works-category--index"
      :class="`works-category--${capability.id}`"
    >
      <div class="works-container">
        <header class="works-category__header">
          <span>{{ capability.number }}</span>
          <h2>{{ capability.title }}</h2>
          <div><i v-for="focus in capability.focus" :key="focus">{{ focus }}</i></div>
        </header>
        <div class="works-case-grid" :class="{ 'works-case-grid--single': capability.projectIds.length === 1 }">
          <p v-if="!capability.projectIds.length">暂无公开案例。</p>
          <ProjectCard v-for="projectId in capability.projectIds" :key="projectId" :project="projectMap[projectId]" />
        </div>
      </div>
    </section>
  </PortfolioShell>
</template>
