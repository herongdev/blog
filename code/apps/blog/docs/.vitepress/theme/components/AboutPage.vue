<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import ProjectVisual from './ProjectVisual.vue'
import { capabilities } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <header class="about-canvas works-container">
      <div class="about-canvas__meta"><span>ABOUT / HERONG</span><span>CHANGSHA · CHINA</span></div>
      <div class="about-canvas__title">
        <h1>何荣</h1>
        <p>从界面、数据到完整系统。这里收录我持续构建和维护的项目。</p>
      </div>
      <div class="about-canvas__visuals">
        <ProjectVisual project-id="aurumchart" compact />
        <ProjectVisual project-id="enterprise-platform" compact />
      </div>
    </header>

    <section class="about-index works-container">
      <header><span>DOMAINS</span><h2>项目方向</h2></header>
      <ol>
        <li v-for="capability in capabilities" :key="capability.id">
          <span>{{ capability.number }}</span><strong>{{ capability.title }}</strong>
          <div><i v-for="focus in capability.focus" :key="focus">{{ focus }}</i></div>
        </li>
      </ol>
    </section>

    <section class="about-links works-container">
      <a :href="withBase('/projects/')"><span>01</span><strong>项目索引</strong><i><ArrowUpRight class="site-icon" aria-hidden="true" /></i></a>
      <a :href="withBase('/articles/')"><span>02</span><strong>技术文章</strong><i><ArrowUpRight class="site-icon" aria-hidden="true" /></i></a>
      <a href="https://chat.herong.info/" target="_blank" rel="noopener noreferrer"><span>03</span><strong>知序 · AI 对话</strong><i><ArrowUpRight class="site-icon" aria-hidden="true" /></i></a>
      <a href="https://aurumchart.com/" target="_blank" rel="noopener noreferrer"><span>04</span><strong>AurumChart</strong><i><ArrowUpRight class="site-icon" aria-hidden="true" /></i></a>
    </section>
  </PortfolioShell>
</template>
