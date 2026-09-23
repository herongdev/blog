import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"defineModel初始值不同步问题","description":"顶部操作 新增股东 股东表单列表 请输入 删除按钮 删除股东。","frontmatter":{"title":"defineModel初始值不同步问题","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"顶部操作 新增股东 股东表单列表 请输入 删除按钮 删除股东。","sidebarWeight":143,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/响应式问题/defineModel初始值不同步问题.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/defineModel初始值不同步问题.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/defineModel初始值不同步问题.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/defineModel初始值不同步问题.md"};function c(t,s,u,o,d,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"definemodel初始值不同步问题",tabindex:"-1"},[l("defineModel初始值不同步问题 "),n("a",{class:"header-anchor",href:"#definemodel初始值不同步问题","aria-label":'Permalink to "defineModel初始值不同步问题"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“defineModel初始值不同步问题”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<template>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <!--")])])])]),n("p",null,"顶部操作"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," -->")]),l(`
`),n("span",{class:"line"},[n("span",null,'  <div class="group-action" v-if="!readonly && !disabled">')]),l(`
`),n("span",{class:"line"},[n("span",null,"    <a-button")]),l(`
`),n("span",{class:"line"},[n("span",null,'      type="primary"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      ghost")]),l(`
`),n("span",{class:"line"},[n("span",null,'      size="small"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      :disabled="disabled"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      @click="addHolder"')]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <plus-outlined />")])])])]),n("p",null,"新增股东"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    </a-button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <!--")])])])]),n("p",null,"股东表单列表"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," -->")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <a-form")]),l(`
`),n("span",{class:"line"},[n("span",null,'    v-for="(holder, i) in model"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    :key="i"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    :model="holder"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    layout="vertical"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    class="holder-form"')]),l(`
`),n("span",{class:"line"},[n("span",null,"  >")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <a-form-item")]),l(`
`),n("span",{class:"line"},[n("span",null,'      v-for="field in props.formFieldSettings"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      :key="field.name"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      :label="field.label"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      :name="field.name"')]),l(`
`),n("span",{class:"line"},[n("span",null,'      :rules="[')]),l(`
`),n("span",{class:"line"},[n("span",null,"        field.required")]),l(`
`),n("span",{class:"line"},[n("span",null,"          ? { required: true, message: '")])])])]),n("p",null,"请输入"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"' + field.label }")]),l(`
`),n("span",{class:"line"},[n("span",null,"          : {},")]),l(`
`),n("span",{class:"line"},[n("span",null,'      ]"')]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <component")]),l(`
`),n("span",{class:"line"},[n("span",null,'        :is="getComponent(field.controlType).component"')]),l(`
`),n("span",{class:"line"},[n("span",null,'        v-model:value="holder[field.name]"')]),l(`
`),n("span",{class:"line"},[n("span",null,'        v-bind="{')]),l(`
`),n("span",{class:"line"},[n("span",null,"          readonly,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          options: field.options ?? [],")]),l(`
`),n("span",{class:"line"},[n("span",null,'        }"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </a-form-item>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <!--")])])])]),n("p",null,"删除按钮"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," -->")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <div v-if="model.length > 1 && !readonly && !disabled" class="remove-box">')]),l(`
`),n("span",{class:"line"},[n("span",null,'      <a-button danger ghost size="small" @click="removeHolder(i)">')]),l(`
`),n("span",{class:"line"},[n("span",null,"        <delete-outlined />")])])])]),n("p",null,"删除股东"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      </a-button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <a-divider v-if="i !== model.length - 1" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"  </a-form>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<script setup>")]),l(`
`),n("span",{class:"line"},[n("span",null,'import { defineProps, defineModel, watch } from "vue";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import { PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import CONTROL_MAP from "../";')]),l(`
`),n("span",{class:"line"},[n("span",null,"const props = defineProps({")]),l(`
`),n("span",{class:"line"},[n("span",null,"  formFieldSettings: { type: Array, required: true },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  disabled: { type: Boolean, default: false },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  readonly: { type: Boolean, default: false },")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,'const model = defineModel("value", {')]),l(`
`),n("span",{class:"line"},[n("span",null,"  type: Array,")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"watch(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  model,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  (newModel) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (!newModel) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      model.value = [{}];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  { immediate: true }")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"function addHolder() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props.disabled || props.readonly) return;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  model.value.push({});")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function removeHolder(i) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props.disabled || props.readonly) return;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (model.value.length > 1) model.value.splice(i, 1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function getComponent(type, more = {}) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const map = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    text: CONTROL_MAP.MInput,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    phone: CONTROL_MAP.MPhone,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    country: CONTROL_MAP.MCountry,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    number: CONTROL_MAP.MInputNumber,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    password: CONTROL_MAP.MPasswordInput,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    textarea: CONTROL_MAP.MTextarea,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    select: CONTROL_MAP.MSelect,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    multiple_select: CONTROL_MAP.MSelect,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    checkbox: CONTROL_MAP.MCheckbox,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    radio: CONTROL_MAP.MRadio,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    file: CONTROL_MAP.MFileUpload,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    image: CONTROL_MAP.MImageUpload,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    date: CONTROL_MAP.MDatePicker,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    time: CONTROL_MAP.MTimePicker,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    agrement: CONTROL_MAP.MAgreementReader,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    stockholder: CONTROL_MAP.MStockholder,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    percent: CONTROL_MAP.MPercent,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const comp = map[type] || CONTROL_MAP.MInput;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return { component: comp, props: more };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),l(`
`),n("span",{class:"line"},[n("span",null,'<style scoped lang="scss">')]),l(`
`),n("span",{class:"line"},[n("span",null,".group-action {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  display: flex;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  justify-content: flex-end;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  margin-bottom: 16px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,".holder-form {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  border-radius: 4px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  margin-bottom: 24px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,".remove-box {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  text-align: right;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  margin-top: 8px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"</style>")])])])])],-1)])])}const g=a(i,[["render",c]]);export{h as __pageData,g as default};
