<script setup lang="ts">
defineProps<{ field: string }>()
const captions: Record<string, string> = { 'ai-agent':'从意图到行动', enterprise:'现实与数据的映射', finance:'不同尺度，同一信号', fullstack:'让每个环节形成闭环', 'video-live':'连接内容与此刻', learning:'把经验组织成方法' }
const wave = (scale: number, offset: number) => Array.from({length:81}, (_,i) => `${i?'L':'M'}${40+i*5},${offset+Math.sin(i*.23)*scale+Math.sin(i*.61)*scale*.32}`).join(' ')
</script>

<template>
  <div class="field-preview" :class="`editorial--${field}`" aria-hidden="true">
    <svg class="editorial-drawing" viewBox="0 0 480 230" fill="none">
      <!-- Domain diagrams, not UI icons or simulated product screenshots. -->
      <g v-if="field === 'ai-agent'">
        <path class="ed-grid" d="M40 55H440M40 115H440M40 175H440M120 25V205M240 25V205M360 25V205"/>
        <path class="ed-line" d="M45 115H116C162 115 151 55 196 55H268C311 55 300 115 345 115H435M116 115H345M116 115C162 115 151 175 196 175H268C311 175 300 115 345 115"/>
        <circle class="ed-paper" cx="74" cy="115" r="16"/><circle class="ed-solid" cx="74" cy="115" r="6"/>
        <rect class="ed-solid" x="205" y="38" width="54" height="34" rx="17"/><rect class="ed-paper" x="205" y="98" width="54" height="34" rx="17"/><rect class="ed-paper" x="205" y="158" width="54" height="34" rx="17"/>
        <circle class="ed-soft" cx="400" cy="115" r="30"/><circle class="ed-solid" cx="400" cy="115" r="14"/>
      </g>
      <g v-else-if="field === 'enterprise'">
        <path class="ed-soft" d="M70 152L239 72L410 152L240 225Z"/>
        <path class="ed-grid" d="M70 152L240 225L410 152L239 72ZM112 132L282 207M155 112L325 189M197 92L367 170M112 170L282 92M155 189L325 112M197 207L367 132"/>
        <path class="ed-dashed" d="M70 152V84M240 225V157M410 152V84"/>
        <path class="ed-paper" d="M70 84L239 4L410 84L240 157Z"/>
        <path class="ed-line" d="M99 85L159 80L193 48L244 63L278 40L321 77L380 84M129 99L184 89L223 108L274 74L351 99M171 119L224 122L272 107L311 120"/>
        <path class="ed-dashed" d="M244 63V131"/><circle class="ed-solid" cx="244" cy="63" r="6"/><circle class="ed-solid" cx="244" cy="131" r="4"/>
      </g>
      <g v-else-if="field === 'finance'">
        <path class="ed-grid" d="M40 60H440M40 115H440M40 170H440M100 25V205M170 25V205M240 25V205M310 25V205M380 25V205"/>
        <rect class="ed-soft" x="199" y="25" width="82" height="178"/>
        <path class="ed-line" :d="wave(15,60)"/><path class="ed-line" :d="wave(25,120)"/>
        <path class="ed-line" d="M40 183L70 180L100 186L130 171L160 176L190 154L220 165L250 152L280 163L310 143L340 151L370 134L400 146L440 129"/>
        <path class="ed-dashed" d="M240 25V205"/>
      </g>
      <g v-else-if="field === 'fullstack'">
        <path class="ed-grid" d="M40 115H440M240 20V210"/>
        <path class="ed-line" d="M166 47H314Q378 47 378 111V119Q378 183 314 183H166Q102 183 102 119V111Q102 47 166 47ZM158 115H322M240 65V165"/>
        <circle class="ed-soft" cx="240" cy="115" r="49"/><circle class="ed-solid" cx="240" cy="115" r="31"/>
        <g class="ed-paper"><rect x="205" y="26" width="70" height="42" rx="21"/><rect x="205" y="162" width="70" height="42" rx="21"/><rect x="67" y="94" width="70" height="42" rx="21"/><rect x="343" y="94" width="70" height="42" rx="21"/></g>
        <g class="ed-text"><text x="240" y="53">商品</text><text x="240" y="189">履约</text><text x="102" y="121">库存</text><text x="378" y="121">支付</text></g><text class="ed-inverse" x="240" y="121">订单</text>
      </g>
      <g v-else-if="field === 'video-live'">
        <path class="ed-grid" d="M35 61H445M35 171H445"/>
        <g class="ed-paper"><rect x="48" y="76" width="70" height="80" rx="3"/><rect x="126" y="61" width="92" height="110" rx="3"/><rect x="226" y="43" width="112" height="146" rx="3"/></g>
        <path class="ed-soft" d="M48 138L77 101L118 144V156H48ZM126 145L166 87L218 148V171H126ZM226 156L275 75L338 157V189H226Z"/>
        <path class="ed-line" d="M48 138L77 101L118 144M126 145L166 87L218 148M226 156L275 75L338 157M353 115H364L369 98L375 136L383 68L391 162L399 96L405 127L411 115H442"/>
        <path class="ed-dashed" d="M282 197V215M48 210H442"/>
      </g>
      <g v-else>
        <g class="ed-paper"><path d="M55 53L119 40L132 105L68 118Z"/><path d="M74 137L136 150L125 203L63 190Z"/><path d="M147 81L191 92L176 148L132 137Z"/></g>
        <path class="ed-line" d="M80 67L107 62M84 81L111 76M83 157L119 165M155 102L175 107"/><path class="ed-dashed" d="M196 115H240"/>
        <path class="ed-soft" d="M266 54H424V196H266Z"/><path class="ed-paper" d="M253 42H411V184H253Z"/><path class="ed-solid" d="M253 42H272V184H253Z"/>
        <path class="ed-line" d="M295 77H386M295 117H365M295 157H377"/><g class="ed-text"><text x="306" y="64">01</text><text x="306" y="104">02</text><text x="306" y="144">03</text></g>
      </g>
    </svg>
    <div class="editorial-caption">{{ captions[field] }}<span>FIELD NOTES</span></div>
  </div>
</template>

<style>
.field-preview { --ed-hue:155; --ed-bg:hsl(var(--ed-hue) 22% 93%); --ed-accent:hsl(var(--ed-hue) 34% 39%); --ed-soft:hsl(var(--ed-hue) 24% 84%); --ed-grid:hsl(var(--ed-hue) 15% 80%); --ed-paper:hsl(var(--ed-hue) 25% 97%); --ed-text:hsl(var(--ed-hue) 24% 28%); position:relative; height:clamp(180px,21vh,225px); overflow:hidden; border-radius:8px; flex-shrink:0; background:var(--ed-bg); color:var(--ed-text); }
.editorial--ai-agent { --ed-hue:258; }.editorial--finance { --ed-hue:212; }.editorial--fullstack { --ed-hue:34; }.editorial--video-live { --ed-hue:334; }.editorial--learning { --ed-hue:190; }
.dark .field-preview { --ed-bg:hsl(var(--ed-hue) 20% 16%); --ed-accent:hsl(var(--ed-hue) 42% 68%); --ed-soft:hsl(var(--ed-hue) 25% 26%); --ed-grid:hsl(var(--ed-hue) 18% 27%); --ed-paper:hsl(var(--ed-hue) 22% 19%); --ed-text:hsl(var(--ed-hue) 25% 81%); }
.editorial-drawing { display:block; width:100%; height:100%; padding:12px 14px 34px; }
.ed-grid { stroke:var(--ed-grid); stroke-width:1; }.ed-line { stroke:var(--ed-accent); stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }.ed-dashed { stroke:var(--ed-accent); stroke-width:1; stroke-dasharray:3 5; }.ed-paper { fill:var(--ed-paper); stroke:var(--ed-accent); stroke-width:1.5; }.ed-solid { fill:var(--ed-accent); }.ed-soft { fill:var(--ed-soft); }
.ed-text,.ed-inverse { fill:var(--ed-text); font:16px sans-serif; text-anchor:middle; }.ed-inverse { fill:var(--ed-paper); }
.editorial-caption { position:absolute; bottom:12px; left:17px; right:17px; display:flex; justify-content:space-between; align-items:center; font-size:11px; letter-spacing:.06em; }.editorial-caption span { font:8px ui-monospace,monospace; letter-spacing:.12em; opacity:.6; }
@media(max-width:600px) { .field-preview { height:210px; } }
</style>
