import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"使用alloyFinger实现dom双指缩放","description":"围绕“使用alloyFinger实现dom双指缩放”整理的概念、示例与实践笔记。","frontmatter":{"title":"使用alloyFinger实现dom双指缩放","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"围绕“使用alloyFinger实现dom双指缩放”整理的概念、示例与实践笔记。","sidebarWeight":58,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实战/vue手势AlloyFinger用法/使用alloyFinger实现dom双指缩放.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/使用alloyFinger实现dom双指缩放.md","filePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/使用alloyFinger实现dom双指缩放.md"}'),i={name:"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/使用alloyFinger实现dom双指缩放.md"};function c(t,s,o,u,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"使用alloyfinger实现dom双指缩放",tabindex:"-1"},[l("使用alloyFinger实现dom双指缩放 "),n("a",{class:"header-anchor",href:"#使用alloyfinger实现dom双指缩放","aria-label":'Permalink to "使用alloyFinger实现dom双指缩放"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“使用alloyFinger实现dom双指缩放”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<template>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <div")]),l(`
`),n("span",{class:"line"},[n("span",null,'    ref="box"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    class="hello"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    :style="style"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    v-finger:pinch="pinchHandler"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    v-finger:swipe="pinchHandler"')]),l(`
`),n("span",{class:"line"},[n("span",null,'    v-finger:multipoint-end="multipointEnd"')]),l(`
`),n("span",{class:"line"},[n("span",null,"  >")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <p>{{scale}}</p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <p>{{prevScale}}</p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</template>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  name: "HelloWorld",')]),l(`
`),n("span",{class:"line"},[n("span",null,"  data() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      scale: 1,")]),l(`
`),n("span",{class:"line"},[n("span",null,"      prevScale: 1,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  computed: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    style() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return {")]),l(`
`),n("span",{class:"line"},[n("span",null,'        transform: "scale(" + this.scale + ")",')]),l(`
`),n("span",{class:"line"},[n("span",null,"      };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  methods: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    pinchHandler(e) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      this.scale = e.scale * this.prevScale;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    multipointEnd() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      this.prevScale = this.scale;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<style >")]),l(`
`),n("span",{class:"line"},[n("span",null,"* {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  padding: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  margin: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,".hello {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  position: absolute;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  left: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  top: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  right: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  bottom: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  background: red;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"p {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  font-size: 4rem;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  color: #fff;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  margin-top: 2rem;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"</style>")])])])])],-1)])])}const h=a(i,[["render",c]]);export{g as __pageData,h as default};
