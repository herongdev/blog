<script setup lang="ts">
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import { capabilities, experienceTimeline } from '../data/portfolio'
</script>

<template>
  <PortfolioShell>
    <header class="portfolio-page-hero portfolio-page-hero--about">
      <div class="portfolio-container portfolio-page-hero__grid">
        <div>
          <p class="portfolio-kicker"><span /> 关于何荣</p>
          <h1>工程深度，<br>也要通向业务结果。</h1>
        </div>
        <div>
          <p>我是一名拥有十余年经验的全栈工程师，职业起点和长期优势在前端，也持续向服务端、数据和 AI 延伸。</p>
          <p>我希望加入需要高级前端 / 全栈能力的团队，承担复杂产品的架构、核心实现与长期交付。</p>
        </div>
      </div>
    </header>

    <section class="portfolio-about-body">
      <div class="portfolio-container">
        <div class="portfolio-about-principles">
          <div>
            <p class="portfolio-section-label">01 / 工作方式</p>
            <h2>我怎样参与一个项目</h2>
          </div>
          <div class="portfolio-principle-grid">
            <article>
              <span>01</span>
              <h3>先把问题说清楚</h3>
              <p>确认目标、边界、依赖和验收方式，再决定采用什么技术。</p>
            </article>
            <article>
              <span>02</span>
              <h3>建立可维护的结构</h3>
              <p>让状态、模块和数据流有清楚边界，方便团队继续迭代和排障。</p>
            </article>
            <article>
              <span>03</span>
              <h3>用证据做判断</h3>
              <p>通过日志、复现、检查和真实运行结果验证问题，而不是停在直觉。</p>
            </article>
            <article>
              <span>04</span>
              <h3>对上线之后负责</h3>
              <p>交付不是合并代码；稳定性、维护成本和后续演进同样属于工程结果。</p>
            </article>
          </div>
        </div>

        <div class="portfolio-about-capabilities">
          <div>
            <p class="portfolio-section-label">02 / 能力结构</p>
            <h2>四条相互支撑的方向</h2>
          </div>
          <ol>
            <li v-for="capability in capabilities" :key="capability.id">
              <span>{{ capability.number }}</span>
              <div>
                <h3>{{ capability.title }}</h3>
                <p>{{ capability.description }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="portfolio-timeline">
          <div>
            <p class="portfolio-section-label">03 / 近期经历</p>
            <h2>从复杂业务，到实时系统与 AI</h2>
          </div>
          <ol>
            <li v-for="item in experienceTimeline" :key="item.period">
              <time>{{ item.period }}</time>
              <div>
                <p>{{ item.role }}</p>
                <h3>{{ item.title }}</h3>
                <span>{{ item.description }}</span>
              </div>
            </li>
          </ol>
        </div>

        <div class="portfolio-about-cta">
          <div>
            <p class="portfolio-eyebrow">继续了解</p>
            <h2>从真实项目和技术复盘开始。</h2>
          </div>
          <div class="portfolio-button-row">
            <a class="portfolio-button portfolio-button--primary" :href="withBase('/projects/')">查看工程项目 <span aria-hidden="true">→</span></a>
            <a class="portfolio-button portfolio-button--secondary" :href="withBase('/articles/')">阅读技术文章</a>
          </div>
        </div>
      </div>
    </section>
  </PortfolioShell>
</template>
