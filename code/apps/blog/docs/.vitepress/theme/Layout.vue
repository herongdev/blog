<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme, { VPNavBarSearch } from 'vitepress/theme'
import SiteChromeHeader from './components/SiteChromeHeader.vue'
import SiteChromeFooter from './components/SiteChromeFooter.vue'
import PageViews from './components/PageViews.vue'
import PortfolioHome from './components/PortfolioHome.vue'
import ProjectsIndex from './components/ProjectsIndex.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import ArticlesLanding from './components/ArticlesLanding.vue'
import AboutPage from './components/AboutPage.vue'

const { frontmatter } = useData()
const pageLayout = computed(() => String(frontmatter.value.layout || ''))
</script>

<template>
  <PortfolioHome v-if="pageLayout === 'portfolio-home'" />
  <ProjectsIndex v-else-if="pageLayout === 'portfolio-projects'" />
  <ProjectDetail v-else-if="pageLayout === 'portfolio-project'" />
  <ArticlesLanding v-else-if="pageLayout === 'portfolio-articles'" />
  <AboutPage v-else-if="pageLayout === 'portfolio-about'" />
  <div v-else class="hr-blog-shell">
    <SiteChromeHeader />
    <DefaultTheme.Layout>
    <template #doc-top><div class="hr-blog-tools" aria-label="文章搜索"><VPNavBarSearch /></div></template>
    <template #doc-footer-before>
      <PageViews mode="page" />
    </template>
    <template #layout-bottom>
      <div class="vp-site-views-wrap">
        <PageViews mode="site" />
      </div>
      <SiteChromeFooter />
    </template>
    </DefaultTheme.Layout>
  </div>
</template>
