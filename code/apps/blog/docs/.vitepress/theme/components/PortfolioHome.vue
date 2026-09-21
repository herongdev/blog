<script setup lang="ts">
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import ProjectCard from './ProjectCard.vue'
import { capabilities, projectMap, selectedArticles } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <section class="portfolio-hero">
      <div class="portfolio-container portfolio-hero__grid">
        <div class="portfolio-hero__copy">
          <p class="portfolio-kicker"><span /> 高级全栈开发工程师</p>
          <h1>何荣</h1>
          <p class="portfolio-hero__headline">AI 应用与 Agent 编程，<br>复杂业务系统与全栈交付。</p>
          <p class="portfolio-hero__intro">
            从前端架构出发，持续深入服务端、数据与 AI。十余年工程经验，做过政企数字孪生、实时交易平台和商业系统，也在独立建设可直接使用的 AI 产品与开发者工具。
          </p>
          <div class="portfolio-button-row">
            <a class="portfolio-button portfolio-button--primary" href="https://chat.herong.info/" target="_blank" rel="noopener noreferrer">
              体验 AI 对话 <span aria-hidden="true">↗</span>
            </a>
            <a class="portfolio-button portfolio-button--secondary" :href="withBase('/projects/')">
              查看工程项目 <span aria-hidden="true">→</span>
            </a>
          </div>
          <p class="portfolio-hero__note">正在寻找高级前端 / 全栈方向的长期机会</p>
        </div>

        <aside class="portfolio-capability-map" aria-label="能力概览">
          <div class="portfolio-capability-map__header">
            <span>能力概览</span>
            <span>2026</span>
          </div>
          <ol>
            <li v-for="capability in capabilities" :key="capability.id">
              <a :href="withBase(`/#${capability.id}`)">
                <span>{{ capability.number }}</span>
                <strong>{{ capability.title }}</strong>
                <small>{{ capability.focus[0] }}</small>
              </a>
            </li>
          </ol>
          <div class="portfolio-capability-map__footer">
            <span>产品</span><span>架构</span><span>交付</span><span>维护</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="portfolio-proof-strip" aria-label="工作方式">
      <div class="portfolio-container">
        <p>可工作的产品</p>
        <span />
        <p>明确的角色边界</p>
        <span />
        <p>可核对的工程证据</p>
      </div>
    </section>

    <section
      v-for="(capability, capabilityIndex) in capabilities"
      :id="capability.id"
      :key="capability.id"
      class="portfolio-capability-section"
      :class="`portfolio-capability-section--${capability.id}`"
    >
      <div class="portfolio-container">
        <div class="portfolio-section-heading">
          <p class="portfolio-section-number">{{ capability.number }}</p>
          <div>
            <p class="portfolio-eyebrow">能力方向</p>
            <h2>{{ capability.title }}</h2>
          </div>
          <p>{{ capability.description }}</p>
        </div>

        <ul class="portfolio-focus-list" aria-label="重点能力">
          <li v-for="focus in capability.focus" :key="focus">{{ focus }}</li>
        </ul>

        <div class="portfolio-project-grid" :class="{ 'portfolio-project-grid--single': capability.projectIds.length === 1 }">
          <ProjectCard
            v-for="projectId in capability.projectIds"
            :key="projectId"
            :project="projectMap[projectId]"
            :featured="capabilityIndex === 0"
          />
        </div>

        <div v-if="capability.id === 'ai-agent'" class="portfolio-practice-note">
          <p class="portfolio-eyebrow">AI 辅助交付实践</p>
          <h3>让 AI 加速实现，但不转移工程责任。</h3>
          <p>在需求拆解、实现、测试与排障中使用 AI；我负责边界判断、架构取舍、代码审查和最终验收。对外只展示经过核对的结果，不把生成量等同于交付质量。</p>
        </div>
      </div>
    </section>

    <section class="portfolio-articles-preview">
      <div class="portfolio-container">
        <div class="portfolio-section-heading portfolio-section-heading--compact">
          <p class="portfolio-section-number">05</p>
          <div>
            <p class="portfolio-eyebrow">写作与复盘</p>
            <h2>精选技术文章</h2>
          </div>
          <p>不只呈现结果，也记录判断过程、工程边界和问题如何被验证。</p>
        </div>
        <div class="portfolio-article-list">
          <a v-for="(article, index) in selectedArticles.slice(0, 4)" :key="article.href" :href="withBase(article.href)">
            <span class="portfolio-article-list__index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span>
              <small>{{ article.category }}</small>
              <strong>{{ article.title }}</strong>
              <em>{{ article.description }}</em>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <a class="portfolio-button portfolio-button--secondary" :href="withBase('/articles/')">浏览精选与全部文章 <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section class="portfolio-about-preview">
      <div class="portfolio-container portfolio-about-preview__grid">
        <div>
          <p class="portfolio-eyebrow">关于我</p>
          <h2>从前端深水区，走向完整产品交付。</h2>
        </div>
        <div>
          <p>我擅长在复杂约束里建立清楚的工程结构：既能深入交互、性能与图表，也能向服务端、数据和 AI 延伸。比起堆叠技术名词，我更关心系统能否上线、问题能否定位、团队能否继续维护。</p>
          <a class="portfolio-text-link" :href="withBase('/about/')">了解经历与工作方式 <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </PortfolioShell>
</template>
