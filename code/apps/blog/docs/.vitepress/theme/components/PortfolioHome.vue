<script setup lang="ts">
import { withBase } from 'vitepress'
import PortfolioShell from './PortfolioShell.vue'
import InteractiveBackdrop from './InteractiveBackdrop.vue'
import FieldPreview from './FieldPreview.vue'
import { capabilities } from '../data/portfolio'
import { ArrowUpRight } from 'lucide-vue-next'
const homeCards = capabilities.map(field => ({ ...field, href: `/projects/fields/${field.id}/`, action: field.projectIds.length ? '查看项目' : '了解领域', kind: field.projectIds.length ? '项目案例' : '领域方向' }))
homeCards.push({ id: 'learning', number: '06', title: '文章与教程', description: '', focus: ['技术文章', '专题教程', '工程实践'], projectIds: [], href: '/articles/', action: '阅读与学习', kind: '技术内容' })
</script>

<template>
  <PortfolioShell compact>
    <InteractiveBackdrop />
    <section class="project-grid-home" aria-labelledby="project-grid-title">
      <header class="project-grid-home__intro">
        <h1 id="project-grid-title">技术落地的<span class="home-title-accent">不同现场</span></h1>
      </header>

      <div class="project-grid-home__grid field-grid">
        <a
          v-for="field in homeCards"
          :key="field.id"
          class="project-grid-card"
          :class="`field-card--${field.id}`"
          :href="withBase(field.href)"
          :aria-label="`${field.title}：${field.action}`"
        >
          <FieldPreview :field="field.id" />
          <h2>{{ field.title }}</h2>
          <p>{{ field.focus.join(' · ') }}</p>
          <div class="field-card__footer"><span class="field-card__kind">{{ field.kind }}</span><span class="field-card__link">{{ field.action }} <ArrowUpRight :size="17" aria-hidden="true" /></span></div>
        </a>
      </div>
    </section>
  </PortfolioShell>
</template>

<style>
.works-brand__logo { object-fit: contain; flex-shrink: 0; border-radius: 5px; }
.works-site--compact .project-grid-home { padding-top: 24px; gap: 22px; }
.works-site--compact .project-grid-home__intro h1 { font-size: clamp(32px, 3.4vw, 48px); }
.works-site--compact .project-grid-home .field-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap:30px; }
.field-grid .field-card--video-live { --field-color: #d75c86; }
.field-grid .field-card--learning { --field-color: #408b9d; }
@media(min-width:601px) and (max-width:1000px) {
  .works-site--compact .project-grid-home .field-grid { grid-template-columns:repeat(2,minmax(0,1fr)); grid-template-rows:repeat(3,auto); gap:24px; }
}
.works-site--compact .project-grid-home .field-grid .project-grid-card { padding: 14px 14px 18px; background: var(--home-card); border: 1px solid var(--home-line); box-shadow: none; }
.works-site--compact .project-grid-home .field-grid .project-grid-card:hover { background: var(--home-card-hover); border-color: color-mix(in srgb, var(--home-ink) 30%, var(--home-line)); }
.works-site--compact .project-grid-home .field-grid .project-grid-card h2 { margin: 16px 10px 0; font-size: 21px; }
.works-site--compact .project-grid-home .field-grid .project-grid-card p { margin: 8px 10px 0; font-size: 13px; }
.field-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: auto 10px 0; padding-top: 18px; }
.field-card__kind { font-size: 11px; color: var(--home-muted); letter-spacing: .04em; }
.works-site--compact .project-grid-home .field-card__link { padding: 0; color: var(--home-ink); font-weight: 500; }
.works-site--compact .project-grid-home .field-grid .project-grid-card p { display: block; overflow: visible; line-height: 1.65; }
.works-site--compact .project-grid-home .field-grid .project-grid-card { min-width: 0; height: auto; }
@media(max-width:600px) {
  .works-site--compact .project-grid-home .field-grid { grid-template-columns: 1fr; grid-template-rows: none; gap:16px; }
  .works-site--compact .project-grid-home .field-grid .project-grid-card h2 { font-size:20px; }
  .works-site--compact .project-grid-home .field-grid .project-grid-card p { font-size:13px; }
}
@media(min-width:801px) and (max-height:800px) {
  .works-site--compact .field-preview { height:180px; }
  .works-site--compact .project-grid-home { padding-block:18px; gap:16px; }
  .works-site--compact .project-grid-home .field-grid .project-grid-card h2 { margin-top:12px; }
}
</style>
