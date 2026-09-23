<script setup lang="ts">
defineProps<{ projectId: string; compact?: boolean }>()
</script>

<template>
  <div class="case-visual" :class="[`case-visual--${projectId}`, { 'case-visual--compact': compact }]" aria-hidden="true">
    <template v-if="projectId === 'ai-chat'">
      <div class="visual-topline"><span>ZHIXU / LIVE</span><span>STREAM 01</span></div>
      <div class="visual-orbit visual-orbit--one" />
      <div class="visual-orbit visual-orbit--two" />
      <div class="chat-stack">
        <div class="chat-stack__prompt"><span />如何组织一条可追溯的回答？</div>
        <div class="chat-stack__answer">
          <i /><i /><i />
          <div><span>01</span><b /></div>
          <div><span>02</span><b /></div>
          <div><span>03</span><b /></div>
        </div>
      </div>
      <div class="visual-citations"><span>SOURCE 01</span><span>SOURCE 02</span><span>ACTIVITY</span></div>
    </template>

    <template v-else-if="projectId === 'minicodex'">
      <div class="visual-topline"><span>MINI CODEX</span><span>TRACE / 006</span></div>
      <div class="agent-pipeline">
        <div><span>01</span><strong>TASK</strong></div>
        <i />
        <div><span>02</span><strong>PLAN</strong></div>
        <i />
        <div class="is-active"><span>03</span><strong>APPROVE</strong></div>
        <i />
        <div><span>04</span><strong>BUILD</strong></div>
        <i />
        <div><span>05</span><strong>VERIFY</strong></div>
      </div>
      <div class="trace-lines"><span /><span /><span /><span /><span /></div>
      <div class="visual-terminal"><span>$ tool.run</span><b>permission granted</b><i>verification passed</i></div>
    </template>

    <template v-else-if="projectId === 'enterprise-platform'">
      <div class="visual-topline"><span>DIGITAL TWIN / GIS</span><span>27°51′N</span></div>
      <div class="map-grid" />
      <svg class="map-river" viewBox="0 0 1000 460" preserveAspectRatio="none">
        <path d="M-20 380 C130 300, 210 410, 345 300 S540 170, 650 230 S830 380, 1020 90" />
        <path d="M-20 410 C140 330, 215 440, 360 330 S550 205, 665 260 S840 410, 1020 120" />
      </svg>
      <div class="map-node map-node--a"><span>GATE 01</span></div>
      <div class="map-node map-node--b"><span>CAM 08</span></div>
      <div class="map-node map-node--c"><span>LEVEL</span></div>
      <div class="map-blocks"><i /><i /><i /><i /><i /><i /></div>
    </template>

    <template v-else-if="projectId === 'aurumchart'">
      <div class="visual-topline"><span>AURUM CHART / SDK</span><span>WEB · NATIVE · CROSS</span></div>
      <div class="chart-scale"><span>1M</span><span>5M</span><span>1H</span><span>1D</span></div>
      <svg class="chart-line" viewBox="0 0 1000 440" preserveAspectRatio="none">
        <path d="M0 360 L70 325 L130 345 L200 245 L265 270 L340 185 L405 220 L485 135 L550 175 L625 95 L700 145 L770 80 L840 118 L910 42 L1000 75" />
        <path class="chart-area" d="M0 360 L70 325 L130 345 L200 245 L265 270 L340 185 L405 220 L485 135 L550 175 L625 95 L700 145 L770 80 L840 118 L910 42 L1000 75 L1000 440 L0 440 Z" />
      </svg>
      <div class="candles"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div class="chart-crosshair" />
    </template>

    <template v-else-if="projectId === 'trading-system'">
      <div class="visual-topline"><span>MARKET / REALTIME</span><span>WS CONNECTED</span></div>
      <div class="market-columns">
        <div class="market-book market-book--sell"><span v-for="n in 7" :key="`s${n}`"><i :style="{ width: `${28 + n * 7}%` }" /><b>SELL {{ 8 - n }}</b></span></div>
        <div class="market-center"><strong>ORDER</strong><span>POSITION</span><span>ACCOUNT</span><i /></div>
        <div class="market-book market-book--buy"><span v-for="n in 7" :key="`b${n}`"><i :style="{ width: `${76 - n * 6}%` }" /><b>BUY {{ n }}</b></span></div>
      </div>
      <div class="market-pulse"><span /><span /><span /><span /><span /></div>
    </template>

    <template v-else-if="projectId === 'shopthrive'">
      <div class="visual-topline"><span>SHOPTHRIVE / COMMERCE</span><span>ORDER FLOW</span></div>
      <div class="commerce-grid">
        <div class="commerce-product"><i /><span>CATALOG</span><b>01—06</b></div>
        <div class="commerce-product"><i /><span>PRODUCT</span><b>DETAIL</b></div>
        <div class="commerce-order">
          <span><i>01</i><b>ORDER</b><em>RECEIVED</em></span>
          <span><i>02</i><b>PROCESS</b><em>READY</em></span>
          <span><i>03</i><b>FULFIL</b><em>DONE</em></span>
        </div>
      </div>
      <div class="commerce-stamp">S / T</div>
    </template>
  </div>
</template>
