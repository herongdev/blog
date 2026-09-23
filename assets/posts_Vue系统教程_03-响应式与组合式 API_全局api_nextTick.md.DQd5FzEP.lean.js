import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const k=JSON.parse('{"title":"nextTick","description":"可以看出 nextTick 接受一个函数为参数，同时会创建一个微任务 在我们页面调用 nextTick 的时候，会执行该函数，把我们的参数 fn 赋值给 p.then(fn)，在队列的任务完成后，fn 就执行了 由于加了几个维护队列的方法，所以执行顺序是这样的： queueJob。","frontmatter":{"title":"nextTick","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"可以看出 nextTick 接受一个函数为参数，同时会创建一个微任务 在我们页面调用 nextTick 的时候，会执行该函数，把我们的参数 fn 赋值给 p.then(fn)，在队列的任务完成后，fn 就执行了 由于加了几个维护队列的方法，所以执行顺序是这样的： queueJob。","sidebarWeight":64,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/全局api/nextTick.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/全局api/nextTick.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/全局api/nextTick.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/全局api/nextTick.md"};function p(c,s,u,o,r,d){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"nexttick",tabindex:"-1"},[e("nextTick "),n("a",{class:"header-anchor",href:"#nexttick","aria-label":'Permalink to "nextTick"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“nextTick”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"举例：")]),e(`
`),n("span",{class:"line"},[n("span",null,"<template>")]),e(`
`),n("span",{class:"line"},[n("span",null,'  <div ref="test">{{ name }}</div>')]),e(`
`),n("span",{class:"line"},[n("span",null,'  <el-button @click="handleClick">按钮</el-button>')]),e(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),e(`
`),n("span",{class:"line"},[n("span",null," <script setup>")]),e(`
`),n("span",{class:"line"},[n("span",null,'import { ref, nextTick } from "vue";')]),e(`
`),n("span",{class:"line"},[n("span",null,'const name = ref("沐华");')]),e(`
`),n("span",{class:"line"},[n("span",null,"const test = ref(null);")]),e(`
`),n("span",{class:"line"},[n("span",null,"async function handleClick() {")]),e(`
`),n("span",{class:"line"},[n("span",null,'  name.value = "掘金";')]),e(`
`),n("span",{class:"line"},[n("span",null,"  console.log(test.value.innerText); // 沐华")]),e(`
`),n("span",{class:"line"},[n("span",null,"  await nextTick();")]),e(`
`),n("span",{class:"line"},[n("span",null,"  console.log(test.value.innerText); // 掘金")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),e(`
`),n("span",{class:"line"},[n("span",null,"Vue3 里这一块有大改，不过事件循环的原理还是一样，只是加了几个专门维护队列的方法，以及关联到 effect，不过好在这里源码的代码不多，所以不如直接看源码会更容易理解")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**nextTick 源码剖析**")]),e(`
`),n("span",{class:"line"},[n("span",null,"源码版本：3.2.11，源码地址：packages/runtime-core/src/sheduler.ts")]),e(`
`),n("span",{class:"line"},[n("span",null,"const resolvedPromise: Promise<any> = Promise.resolve()")]),e(`
`),n("span",{class:"line"},[n("span",null,"let currentFlushPromise: Promise<void> | null = null")]),e(`
`),n("span",{class:"line"},[n("span",null,"export function nextTick<T = void>(this: T, fn?: (this: T) => void): Promise<void> {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const p = currentFlushPromise || resolvedPromise")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return fn")]),e(`
`),n("span",{class:"line"},[n("span",null,"    ? p.then(this ? fn.bind(this) : fn)")]),e(`
`),n("span",{class:"line"},[n("span",null,"    : p")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"可以看出 nextTick 接受一个函数为参数，同时会创建一个微任务 在我们页面调用 nextTick 的时候，会执行该函数，把我们的参数 fn 赋值给 p.then(fn)，在队列的任务完成后，fn 就执行了"),n("p",null,"由于加了几个维护队列的方法，所以执行顺序是这样的： queueJob -> queueFlush -> flushJobs -> nextTick参数的 fn"),n("p",null,"现在不知道都是干嘛的不要紧，几分钟后你就会清楚了 我们按顺序来，先看一下入口函数 queueJob 是在哪里调用的，看代码")],-1)])])}const f=l(i,[["render",p]]);export{k as __pageData,f as default};
