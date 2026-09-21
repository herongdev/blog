<script setup lang="ts">
import PortfolioShell from './PortfolioShell.vue'
import ProjectCard from './ProjectCard.vue'
import { capabilities, projectMap } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <header class="portfolio-page-hero">
      <div class="portfolio-container portfolio-page-hero__grid">
        <div>
          <p class="portfolio-kicker"><span /> 工程作品集</p>
          <h1>项目不是技术清单，<br>而是问题、判断与交付。</h1>
        </div>
        <p>这里按能力方向整理个人产品与职业项目。每一项都说明我的角色、可公开的证据与边界；没有授权的企业数据和无法核验的指标不会出现在页面中。</p>
      </div>
    </header>

    <section v-for="capability in capabilities" :key="capability.id" class="portfolio-index-group">
      <div class="portfolio-container">
        <div class="portfolio-index-group__heading">
          <span>{{ capability.number }}</span>
          <h2>{{ capability.title }}</h2>
          <p>{{ capability.description }}</p>
        </div>
        <div class="portfolio-project-grid" :class="{ 'portfolio-project-grid--single': capability.projectIds.length === 1 }">
          <ProjectCard v-for="projectId in capability.projectIds" :key="projectId" :project="projectMap[projectId]" />
        </div>
      </div>
    </section>
  </PortfolioShell>
</template>
