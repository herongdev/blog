<script setup lang="ts">
import { ArrowUpRight, MessageSquare, Workflow, Building2, ChartCandlestick, ChartNoAxesCombined, Store } from 'lucide-vue-next'
import { withBase } from 'vitepress'
import { projectMap } from '../data/portfolio'

const icons = { 'ai-chat': MessageSquare, minicodex: Workflow, 'enterprise-platform': Building2, aurumchart: ChartCandlestick, 'trading-system': ChartNoAxesCombined, shopthrive: Store }

const nodes = [
  { id: 'ai-chat', label: '知序', x: 15, y: 25, tone: 'blue' },
  { id: 'minicodex', label: 'MiniCodex', x: 18, y: 72, tone: 'blue' },
  { id: 'enterprise-platform', label: '数字孪生', x: 49, y: 18, tone: 'green' },
  { id: 'aurumchart', label: 'AurumChart', x: 83, y: 26, tone: 'amber' },
  { id: 'trading-system', label: '交易平台', x: 81, y: 72, tone: 'amber' },
  { id: 'shopthrive', label: '商通', x: 51, y: 84, tone: 'violet' },
] as const

const edges = [
  [50, 50, 15, 25], [50, 50, 18, 72], [50, 50, 49, 18],
  [50, 50, 83, 26], [50, 50, 81, 72], [50, 50, 51, 84],
] as const
</script>

<template>
  <div class="project-network project-network--visual" aria-label="项目作品地图">
    <svg class="project-network__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line v-for="(edge, index) in edges" :key="index" :x1="edge[0]" :y1="edge[1]" :x2="edge[2]" :y2="edge[3]" />
    </svg>

    <div class="project-network__core" aria-hidden="true">
      <span>H/R</span>
    </div>

    <a
      v-for="node in nodes"
      :key="node.id"
      class="project-node"
      :class="[`project-node--${node.tone}`, `project-node--${node.id}`]"
      :href="withBase(projectMap[node.id].detail)"
      :style="{ '--node-x': `${node.x}%`, '--node-y': `${node.y}%` }"
      :aria-label="`查看${projectMap[node.id].title}案例`"
    >
      <span class="project-node__card">
        <span class="project-node__index">{{ projectMap[node.id].number }}</span>
        <component :is="icons[node.id]" class="project-node__art" aria-hidden="true" />
        <i aria-hidden="true"><ArrowUpRight class="site-icon" aria-hidden="true" /></i>
      </span>
      <strong>{{ node.label }}</strong>
    </a>
  </div>
</template>
