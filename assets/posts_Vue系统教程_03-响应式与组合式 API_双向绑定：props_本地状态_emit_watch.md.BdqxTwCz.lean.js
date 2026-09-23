import{_ as a,o as e,c as p,j as s,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"双向绑定：props+本地状态+emit+watch","description":"标签 + 描述 数值输入 + 模式下拉 校验错误 库的完整配置 双向绑定：数值 双向绑定：模式 是止损 (true) 还是止盈 显示标签 提示文案 本地状态，同步到外层 监听本地改动，通知父组件 如果外部修改了 v model ，也同步回来 计算输入控件需要的 校验所有规则，取出。","frontmatter":{"title":"双向绑定：props+本地状态+emit+watch","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"标签 + 描述 数值输入 + 模式下拉 校验错误 库的完整配置 双向绑定：数值 双向绑定：模式 是止损 (true) 还是止盈 显示标签 提示文案 本地状态，同步到外层 监听本地改动，通知父组件 如果外部修改了 v model ，也同步回来 计算输入控件需要的 校验所有规则，取出。","sidebarWeight":130,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/双向绑定/双向绑定：props+本地状态+emit+watch.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/双向绑定：props+本地状态+emit+watch.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/双向绑定：props+本地状态+emit+watch.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/双向绑定：props+本地状态+emit+watch.md"};function t(c,n,u,o,d,r){return e(),p("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"双向绑定-props-本地状态-emit-watch",tabindex:"-1"},[l("双向绑定：props+本地状态+emit+watch "),s("a",{class:"header-anchor",href:"#双向绑定-props-本地状态-emit-watch","aria-label":'Permalink to "双向绑定：props+本地状态+emit+watch"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“双向绑定：props+本地状态+emit+watch”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"<template>")]),l(`
`),s("span",{class:"line"},[s("span",null,'  <div class="sltp-field">')]),l(`
`),s("span",{class:"line"},[s("span",null,"    <!--")])])])]),s("p",null,[l("标签 "),s("code",null,"+"),l(" 描述")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," Tooltip -->")]),l(`
`),s("span",{class:"line"},[s("span",null,'    <p class="flex items-center justify-between mb-1 font-medium">')]),l(`
`),s("span",{class:"line"},[s("span",null,"      <span>{{ label }}</span>")]),l(`
`),s("span",{class:"line"},[s("span",null,'      <a-tooltip placement="top">')]),l(`
`),s("span",{class:"line"},[s("span",null,"        <template #content>")]),l(`
`),s("span",{class:"line"},[s("span",null,"          <div>{{ desc }}</div>")]),l(`
`),s("span",{class:"line"},[s("span",null,"        </template>")]),l(`
`),s("span",{class:"line"},[s("span",null,'        <icon-question-circle size="16" class="cursor-pointer ml-1" />')]),l(`
`),s("span",{class:"line"},[s("span",null,"      </a-tooltip>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    </p>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    <!--")])])])]),s("p",null,[l("数值输入 "),s("code",null,"+"),l(" 模式下拉")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," -->")]),l(`
`),s("span",{class:"line"},[s("span",null,'    <div class="flex gap-2 mb-1">')]),l(`
`),s("span",{class:"line"},[s("span",null,"      <NumberInput")]),l(`
`),s("span",{class:"line"},[s("span",null,'        v-model="localValue"')]),l(`
`),s("span",{class:"line"},[s("span",null,'        :step="fieldMeta.step"')]),l(`
`),s("span",{class:"line"},[s("span",null,'        :fixed="fieldMeta.precision"')]),l(`
`),s("span",{class:"line"},[s("span",null,'        :min="fieldMeta.min"')]),l(`
`),s("span",{class:"line"},[s("span",null,'        :max="fieldMeta.max"')]),l(`
`),s("span",{class:"line"},[s("span",null,'        class="flex-1"')]),l(`
`),s("span",{class:"line"},[s("span",null,"      />")]),l(`
`),s("span",{class:"line"},[s("span",null,'      <a-select v-model="localMode" class="w-20">')]),l(`
`),s("span",{class:"line"},[s("span",null,'        <a-option v-for="m in modes" :key="m" :value="m">')]),l(`
`),s("span",{class:"line"},[s("span",null,"          {{ m }}")]),l(`
`),s("span",{class:"line"},[s("span",null,"        </a-option>")]),l(`
`),s("span",{class:"line"},[s("span",null,"      </a-select>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    </div>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    <!--")])])])]),s("p",null,"校验错误"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," -->")]),l(`
`),s("span",{class:"line"},[s("span",null,'    <p v-if="errorMsg" class="text-red-500 text-xs">')]),l(`
`),s("span",{class:"line"},[s("span",null,"      {{ errorMsg }}")]),l(`
`),s("span",{class:"line"},[s("span",null,"    </p>")]),l(`
`),s("span",{class:"line"},[s("span",null,"  </div>")]),l(`
`),s("span",{class:"line"},[s("span",null,"</template>")]),l(`
`),s("span",{class:"line"},[s("span",null,'<script setup lang="ts">')]),l(`
`),s("span",{class:"line"},[s("span",null,"  import { ref, computed, watch } from 'vue';")]),l(`
`),s("span",{class:"line"},[s("span",null,"  import { useI18n } from 'vue-i18n';")]),l(`
`),s("span",{class:"line"},[s("span",null,"  import {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    getStopLossMeta,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    getTakeProfitMeta,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    validateCombined,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ErrorMessageKeys,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ValueModeOptions,")]),l(`
`),s("span",{class:"line"},[s("span",null,"  } from './SLTP';")]),l(`
`),s("span",{class:"line"},[s("span",null,"  import type { SLTPConfig, ValueMode } from './SLTP';")]),l(`
`),s("span",{class:"line"},[s("span",null,"  interface Props {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /** SLTP")])])])]),s("p",null,"库的完整配置"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    config: SLTPConfig;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /**")])])])]),s("p",null,"双向绑定：数值"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    modelValue: number;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /**")])])])]),s("p",null,"双向绑定：模式"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    modeValue: ValueMode;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /**")])])])]),s("p",null,[l("是止损"),s("code",null,"(true)"),l("还是止盈")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"(false) */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    isStop: boolean;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /**")])])])]),s("p",null,"显示标签"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    label: string;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    /**")])])])]),s("p",null,"提示文案"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"    desc: string;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const props = defineProps<Props>();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const emit = defineEmits<{")]),l(`
`),s("span",{class:"line"},[s("span",null,"    (e: 'update:modelValue', v: number): void;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    (e: 'update:modeValue', v: ValueMode): void;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }>();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,"本地状态，同步到外层"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," v-model")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const localValue = ref(props.modelValue);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const localMode = ref(props.modeValue);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,"监听本地改动，通知父组件"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  watch(localValue, (v) => emit('update:modelValue', v));")]),l(`
`),s("span",{class:"line"},[s("span",null,"  watch(localMode, (v) => emit('update:modeValue', v));")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,[l("如果外部修改了 "),s("code",null,"v-model"),l("，也同步回来")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  watch(")]),l(`
`),s("span",{class:"line"},[s("span",null,"    () => props.modelValue,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    (v) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      if (v !== localValue.value) localValue.value = v;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  );")]),l(`
`),s("span",{class:"line"},[s("span",null,"  watch(")]),l(`
`),s("span",{class:"line"},[s("span",null,"    () => props.modeValue,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    (v) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      if (v !== localMode.value) localMode.value = v;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  );")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,"计算输入控件需要的"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," min/max/step/precision")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const fieldMeta = computed(() =>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    props.isStop")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ? getStopLossMeta(props.config)")]),l(`
`),s("span",{class:"line"},[s("span",null,"      : getTakeProfitMeta(props.config)")]),l(`
`),s("span",{class:"line"},[s("span",null,"  );")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,[l("校验所有规则，取出当前的 "),s("code",null,"“StopLoss...”"),l(" 或 "),s("code",null,"“TakeProfit...”"),l(" 错误")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const allErrors = computed(() => validateCombined(props.config));")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const currentError = computed(() => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const prefix = props.isStop ? 'StopLoss' : 'TakeProfit';")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return allErrors.value.find((e) => e.startsWith(prefix)) ?? null;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  });")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,[l("按照 "),s("code",null,"i18n key"),l(" 映射成用户可见文案")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const { t } = useI18n();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const errorMsg = computed(() =>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    currentError.value ? t(ErrorMessageKeys[currentError.value]) : ''")]),l(`
`),s("span",{class:"line"},[s("span",null,"  );")]),l(`
`),s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,"下拉可选项"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const modes = ValueModeOptions;")]),l(`
`),s("span",{class:"line"},[s("span",null,"<\/script>")])])])])],-1)])])}const g=a(i,[["render",t]]);export{v as __pageData,g as default};
