<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import ProjectVisual from './ProjectVisual.vue'
import ProjectCard from './ProjectCard.vue'
import { projectMap, projects } from '../data/portfolio'

const { frontmatter } = useData()
const project = computed(() => projectMap[String(frontmatter.value.projectId || '')])
const nextProject = computed(() => {
  if (!project.value) return projects[0]
  const index = projects.findIndex((item) => item.id === project.value.id)
  return projects[(index + 1) % projects.length]
})
</script>

<template>
  <PortfolioShell>
    <template v-if="project">
      <article class="case-page">
        <header class="case-page__hero works-container">
          <nav class="case-page__breadcrumb" aria-label="面包屑">
            <a :href="withBase('/projects/')">PROJECT INDEX</a><span>/</span><span>{{ project.number }}</span>
          </nav>
          <div class="case-page__title">
            <div>
              <span>{{ project.eyebrow }}</span>
              <h1>{{ project.title }}</h1>
            </div>
            <div class="case-page__status">
              <span>{{ project.status }}</span>
              <span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
            </div>
          </div>
          <ProjectVisual :project-id="project.id" />
        </header>

        <section class="case-page__overview works-container">
          <div class="case-page__lead">
            <span>CASE / {{ project.number }}</span>
            <h2>{{ project.lead }}</h2>
          </div>
          <dl>
            <div><dt>场景</dt><dd>{{ project.context }}</dd></div>
            <div><dt>核心问题</dt><dd>{{ project.challenge }}</dd></div>
          </dl>
        </section>

        <section class="case-page__build">
          <div class="works-container">
            <header><span>SYSTEM / BUILD</span><h2>项目构成</h2></header>
            <ol>
              <li v-for="(item, index) in project.approach" :key="item">
                <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p>
              </li>
            </ol>
          </div>
        </section>

        <section v-if="project.flow" class="case-page__flow works-container">
          <header><span>FLOW</span><h2>工作链路</h2></header>
          <ol>
            <li v-for="(item, index) in project.flow" :key="item"><span>{{ index + 1 }}</span><strong>{{ item }}</strong></li>
          </ol>
        </section>

        <section class="case-page__evidence works-container">
          <header><span>LINKS / NOTES</span><h2>相关入口</h2></header>
          <div>
            <article v-for="item in project.evidence" :key="item.title">
              <span>{{ item.title }}</span>
              <p>{{ item.description }}</p>
              <a
                v-if="item.link"
                :href="item.link.external ? item.link.href : withBase(item.link.href)"
                :target="item.link.external ? '_blank' : undefined"
                :rel="item.link.external ? 'noopener noreferrer' : undefined"
              >{{ item.link.label }} <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
            </article>
            <article v-if="project.relatedArticles?.length">
              <span>技术记录</span>
              <a v-for="article in project.relatedArticles" :key="article.href" :href="withBase(article.href)">{{ article.label }} <ArrowUpRight class="site-icon" aria-hidden="true" /></a>
            </article>
          </div>
        </section>

        <aside class="case-page__next works-container">
          <span>NEXT CASE</span>
          <ProjectCard :project="nextProject" />
        </aside>
      </article>
    </template>
  </PortfolioShell>
</template>
