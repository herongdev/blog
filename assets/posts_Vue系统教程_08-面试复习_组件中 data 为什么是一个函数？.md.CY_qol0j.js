import{_ as s,o as l,c as t,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"组件中 data 为什么是一个函数？","description":"因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响。","frontmatter":{"title":"组件中 data 为什么是一个函数？","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","面试复习"],"description":"因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响。","sidebarWeight":33,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/面试/组件中 data 为什么是一个函数？.md"},"headers":[],"relativePath":"posts/Vue系统教程/08-面试复习/组件中 data 为什么是一个函数？.md","filePath":"posts/Vue系统教程/08-面试复习/组件中 data 为什么是一个函数？.md"}'),p={name:"posts/Vue系统教程/08-面试复习/组件中 data 为什么是一个函数？.md"};function d(i,e,u,c,o,r){return l(),t("div",null,[...e[0]||(e[0]=[a("div",null,[a("h1",{id:"组件中-data-为什么是一个函数",tabindex:"-1"},[n("组件中 data 为什么是一个函数？ "),a("a",{class:"header-anchor",href:"#组件中-data-为什么是一个函数","aria-label":'Permalink to "组件中 data 为什么是一个函数？"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“组件中 data 为什么是一个函数？”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？")]),n(`
`),a("span",{class:"line"},[a("span",null,"// data")]),n(`
`),a("span",{class:"line"},[a("span",null,"data() {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    return {")]),n(`
`),a("span",{class:"line"},[a("span",null,'        message: "子组件",')]),n(`
`),a("span",{class:"line"},[a("span",null,"        childName: this.name")]),n(`
`),a("span",{class:"line"},[a("span",null,"    }")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span",null,"// new Vue")]),n(`
`),a("span",{class:"line"},[a("span",null,"new Vue({")]),n(`
`),a("span",{class:"line"},[a("span",null,"    el: '#app',")]),n(`
`),a("span",{class:"line"},[a("span",null,"    router,")]),n(`
`),a("span",{class:"line"},[a("span",null,"    template: '<App/>',")]),n(`
`),a("span",{class:"line"},[a("span",null,"    components: { App }")]),n(`
`),a("span",{class:"line"},[a("span",null,"})")])])])]),a("p",null,"因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。")],-1)])])}const h=s(p,[["render",d]]);export{m as __pageData,h as default};
