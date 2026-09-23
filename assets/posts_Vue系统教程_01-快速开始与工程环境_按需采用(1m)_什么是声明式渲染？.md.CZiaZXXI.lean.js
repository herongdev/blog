import{_ as a,o as e,c as t,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"什么是声明式渲染？","description":"命令式：一步一步告诉程序如何去做，能否达成结果取决于开发者的设计。 声明式：只告诉程序想要什么结果，如何达成由程序保证，开发者不用关心。 从代码看区别需求： 展示今天的日期，如果是周日就用粉色的字，否则用蓝色。命令式渲染通常意味着手动操作 DOM。这里用 jQuery 实现上述功。","frontmatter":{"title":"什么是声明式渲染？","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"命令式：一步一步告诉程序如何去做，能否达成结果取决于开发者的设计。 声明式：只告诉程序想要什么结果，如何达成由程序保证，开发者不用关心。 从代码看区别需求： 展示今天的日期，如果是周日就用粉色的字，否则用蓝色。命令式渲染通常意味着手动操作 DOM。这里用 jQuery 实现上述功。","sidebarWeight":32,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/安装/按需采用(1m)/什么是声明式渲染？.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/按需采用(1m)/什么是声明式渲染？.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/按需采用(1m)/什么是声明式渲染？.md"}'),p={name:"posts/Vue系统教程/01-快速开始与工程环境/按需采用(1m)/什么是声明式渲染？.md"};function i(o,s,c,u,d,r){return e(),t("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"什么是声明式渲染",tabindex:"-1"},[n("什么是声明式渲染？ "),l("a",{class:"header-anchor",href:"#什么是声明式渲染","aria-label":'Permalink to "什么是声明式渲染？"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“什么是声明式渲染？”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"声明式渲染的理解?")]),n(`
`),l("span",{class:"line"},[l("span",null,"1.DOM状态只是数据状态的一个映射")]),n(`
`),l("span",{class:"line"},[l("span",null,"2.所有的逻辑尽可能在状态的层面去进行")]),n(`
`),l("span",{class:"line"},[l("span",null,"3.当状态改变了，view会被框架自动更新到合理的状态")])])])]),l("p",null,"命令式：一步一步告诉程序如何去做，能否达成结果取决于开发者的设计。 声明式：只告诉程序想要什么结果，如何达成由程序保证，开发者不用关心。"),l("p",null,'从代码看区别需求： 展示今天的日期，如果是周日就用粉色的字，否则用蓝色。命令式渲染通常意味着手动操作 DOM。这里用 jQuery 实现上述功能，代码如下： // HTML <div class="box"></div>'),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"// JS")]),n(`
`),l("span",{class:"line"},[l("span",null,"let today = new Date();")]),n(`
`),l("span",{class:"line"},[l("span",null,"let color = today.getDay() === 0 ? 'pink' : 'lightBlue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"let box = $('.box');")]),n(`
`),l("span",{class:"line"},[l("span",null,"box.text(today.toLocaleDateString());")]),n(`
`),l("span",{class:"line"},[l("span",null,"box.css('color', color);")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"声明式渲染实现的是，DOM 随状态（数据）更新而更新。用 Vue 实现上述功能，代码如下：")]),n(`
`),l("span",{class:"line"},[l("span",null,"// HTML")]),n(`
`),l("span",{class:"line"},[l("span",null,'<div id="root">')]),n(`
`),l("span",{class:"line"},[l("span",null,'  <div :style="boxStyle">{{today}}</div>')]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"// JS")]),n(`
`),l("span",{class:"line"},[l("span",null,"new Vue({")]),n(`
`),l("span",{class:"line"},[l("span",null,"  el: '#root',")]),n(`
`),l("span",{class:"line"},[l("span",null,"  data: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    today: '',")]),n(`
`),l("span",{class:"line"},[l("span",null,"    boxStyle: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      color: ''")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  mounted() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    let now = new Date();")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.today = now.toLocaleDateString();")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.boxStyle.color = now.getDay() === 0 ? 'pink' : 'lightBlue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"});")])])])]),l("p",null,"两相对比，声明式代码中没有查找、操作DOM 对象的语句，只更新数据。")],-1)])])}const v=a(p,[["render",i]]);export{g as __pageData,v as default};
