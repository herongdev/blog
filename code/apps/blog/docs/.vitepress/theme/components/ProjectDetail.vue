<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import { projectMap } from '../data/portfolio'

const { frontmatter } = useData()
const project = computed(() => projectMap[String(frontmatter.value.projectId || '')])
</script>

<template>
  <PortfolioShell>
    <template v-if="project">
      <header class="portfolio-project-hero">
        <div class="portfolio-container">
          <nav class="portfolio-breadcrumb" aria-label="面包屑">
            <a :href="withBase('/projects/')">工程项目</a>
            <span aria-hidden="true">/</span>
            <span>{{ project.title }}</span>
          </nav>
          <div class="portfolio-project-hero__grid">
            <div>
              <p class="portfolio-kicker"><span /> {{ project.eyebrow }}</p>
              <h1>{{ project.title }}</h1>
              <p class="portfolio-project-hero__lead">{{ project.lead }}</p>
              <div class="portfolio-button-row">
                <a v-if="project.external" class="portfolio-button portfolio-button--primary" :href="project.external.href" target="_blank" rel="noopener noreferrer">
                  {{ project.external.label }} <span aria-hidden="true">↗</span>
                </a>
                <a class="portfolio-button portfolio-button--secondary" :href="withBase('/projects/')">返回项目总览</a>
              </div>
            </div>
            <aside class="portfolio-project-facts" aria-label="项目概要">
              <div><span>状态</span><strong>{{ project.status }}</strong></div>
              <div><span>我的角色</span><strong>{{ project.role }}</strong></div>
              <div v-if="project.period"><span>时间</span><strong>{{ project.period }}</strong></div>
              <div><span>方向</span><strong>{{ project.tags.slice(0, 3).join(' · ') }}</strong></div>
            </aside>
          </div>
        </div>
      </header>

      <section class="portfolio-project-story">
        <div class="portfolio-container portfolio-project-story__grid">
          <div class="portfolio-project-story__main">
            <section>
              <p class="portfolio-section-label">01 / 项目背景</p>
              <h2>为什么要做</h2>
              <p>{{ project.context }}</p>
            </section>
            <section>
              <p class="portfolio-section-label">02 / 核心问题</p>
              <h2>真正需要解决的难点</h2>
              <p>{{ project.challenge }}</p>
            </section>
            <section>
              <p class="portfolio-section-label">03 / 工程方法</p>
              <h2>我的处理方式</h2>
              <ol class="portfolio-approach-list">
                <li v-for="(item, index) in project.approach" :key="item">
                  <span>{{ String(index + 1).padStart(2, '0') }}</span>
                  <p>{{ item }}</p>
                </li>
              </ol>
            </section>
          </div>

          <aside class="portfolio-boundary-note">
            <p class="portfolio-eyebrow">角色与边界</p>
            <h2>只陈述能够负责的部分。</h2>
            <ul>
              <li v-for="item in project.boundaries" :key="item">{{ item }}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section v-if="project.flow" class="portfolio-project-flow">
        <div class="portfolio-container">
          <p class="portfolio-section-label">04 / 工作链路</p>
          <h2>从输入到可验证结果</h2>
          <ol>
            <li v-for="(item, index) in project.flow" :key="item">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <strong>{{ item }}</strong>
            </li>
          </ol>
        </div>
      </section>

      <section class="portfolio-evidence-section">
        <div class="portfolio-container">
          <div class="portfolio-section-heading portfolio-section-heading--compact">
            <p class="portfolio-section-number">05</p>
            <div>
              <p class="portfolio-eyebrow">Evidence</p>
              <h2>可核对的项目证据</h2>
            </div>
            <p>在线产品、公开课程或真实工程复盘；没有证据的内容不会被包装成成果。</p>
          </div>
          <div class="portfolio-evidence-grid">
            <article v-for="item in project.evidence" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <a
                v-if="item.link"
                class="portfolio-text-link"
                :href="item.link.external ? item.link.href : withBase(item.link.href)"
                :target="item.link.external ? '_blank' : undefined"
                :rel="item.link.external ? 'noopener noreferrer' : undefined"
              >{{ item.link.label }} <span aria-hidden="true">{{ item.link.external ? '↗' : '→' }}</span></a>
            </article>
          </div>
          <div v-if="project.relatedArticles?.length" class="portfolio-related-links">
            <p>相关技术文章</p>
            <a v-for="article in project.relatedArticles" :key="article.href" :href="withBase(article.href)">{{ article.label }} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="portfolio-empty-state">
      <div class="portfolio-container">
        <p class="portfolio-eyebrow">项目未找到</p>
        <h1>这份项目说明暂时不可用。</h1>
        <a class="portfolio-button portfolio-button--primary" :href="withBase('/projects/')">返回项目总览</a>
      </div>
    </section>
  </PortfolioShell>
</template>
