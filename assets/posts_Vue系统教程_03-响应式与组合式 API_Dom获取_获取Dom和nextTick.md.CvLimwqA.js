import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"获取Dom和nextTick","description":"Vue3 中获取单个 dom 方法一：原生方法 原生js获取dom元素： document.querySelector(选择器) document.getElementById(id选择器) document.getElementsByClassName(class选择器) 在。","frontmatter":{"title":"获取Dom和nextTick","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"Vue3 中获取单个 dom 方法一：原生方法 原生js获取dom元素： document.querySelector(选择器) document.getElementById(id选择器) document.getElementsByClassName(class选择器) 在。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/Dom获取/获取Dom和nextTick.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/Dom获取/获取Dom和nextTick.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/Dom获取/获取Dom和nextTick.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/Dom获取/获取Dom和nextTick.md"};function t(c,l,u,o,r,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"获取dom和nexttick",tabindex:"-1"},[s("获取Dom和nextTick "),n("a",{class:"header-anchor",href:"#获取dom和nexttick","aria-label":'Permalink to "获取Dom和nextTick"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“获取Dom和nextTick”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在vue2中可以使用this.$refs获取一个dom或者多个dom, 但在vue3中获取dom和vue2有些不同")])])])]),n("p",null,[n("strong",null,[s("Vue3"),n("strong",null,[n("strong",null,"中获取单个")]),s("dom")]),s(" 方法一：原生方法 原生js获取dom元素： document.querySelector(选择器) document.getElementById(id选择器) document.getElementsByClassName(class选择器)")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"setup相当于create, 此时页面还没有初始化, 因此在nextTick中获取dom")]),s(`
`),n("span",{class:"line"},[n("span",null,"<template>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div ref="name">张三</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'<script setup lang="ts">')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { nextTick, ref } from "vue";')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建一个Ref，并赋值给dom的ref值")]),s(`
`),n("span",{class:"line"},[n("span",null,'let name = ref<any>("");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 可以在mounted生命周期中获取")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 在更改了一些数据后，dom不一定会马上更新，")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用nextTick以等待 DOM 更新后立即调用作为参数的回调函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"nextTick(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这个回调会等到下一个dom更新周期后才执行")]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value, "dom");')]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value.innerHTML, "内容");')]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**vue3****中获取多个****dom****的方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**方法一**")]),s(`
`),n("span",{class:"line"},[n("span",null,"<template>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div ref="name">张三</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">香蕉</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">梨子</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">菠萝</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'<script setup lang="ts">')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { nextTick, ref } from "vue";')]),s(`
`),n("span",{class:"line"},[n("span",null,'let name = ref<any>("");')]),s(`
`),n("span",{class:"line"},[n("span",null,"nextTick(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value, "dom");')]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value.innerHTML, "内容");')]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 将dom中ref的值赋值为一个函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 在dom挂载的时候，会依次调用这个函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 参数e为dom引用")]),s(`
`),n("span",{class:"line"},[n("span",null,"let getFruit = (e: any) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"方法二：使用nextTick来获取")]),s(`
`),n("span",{class:"line"},[n("span",null,"<template>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div ref="name">张三</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">香蕉</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">梨子</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div :ref="getFruit">菠萝</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'<script setup lang="ts">')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { nextTick, ref } from "vue";')]),s(`
`),n("span",{class:"line"},[n("span",null,'let name = ref<any>("");')]),s(`
`),n("span",{class:"line"},[n("span",null,"let fruitArr: any[] = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 这个函数会在dom挂载的时候被调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"let getFruit = (el: any) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  fruitArr.push(el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"nextTick(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这个回调函数是数据发生变化后的第一个dom更新周期后")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 马上被调用")]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value, "dom");')]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(name.value.innerHTML, "内容");')]),s(`
`),n("span",{class:"line"},[n("span",null,"  // getFruit函数在dom挂载时被执行，所以现在fruitArr有值")]),s(`
`),n("span",{class:"line"},[n("span",null,'  console.log(fruitArr, "fruitArr数据..");')]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"方法三：在v-for中赋值，在nextTick中获取")]),s(`
`),n("span",{class:"line"},[n("span",null,"<template>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <div ref="getDivDom" v-for="item in list" :data-id="item.id" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<script setup>")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { ref } from "vue";')]),s(`
`),n("span",{class:"line"},[n("span",null,"const divDomList = ref(new Map());")]),s(`
`),n("span",{class:"line"},[n("span",null,"const getDivDom = (el) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (el) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    divDomList.set(el.dataset["id"], el);')]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("p",null,[s("在"),n("code",null,"swiper"),s("中获取"),n("code",null,"swiper"),s("的"),n("code",null,"dom"),s('元素： <template> <swiper @swiper="getSwiper"></swiper> </template> <script setup> import swiper from "swiper"; import { ref } from "vue"; const swiperDom = ref(null); const getSwiper = (el) => { swiperDom.value = el; }; <\/script>')])],-1)])])}const g=e(i,[["render",t]]);export{v as __pageData,g as default};
