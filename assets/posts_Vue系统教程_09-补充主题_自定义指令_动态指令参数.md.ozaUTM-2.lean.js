import{_ as e,o as a,c as i,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"动态指令参数","description":"指令的参数可以是动态的。例如，在 v mydirective:[argument] \\"value\\" 中， argument 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。 例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。 我们可以像这。","frontmatter":{"title":"动态指令参数","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","补充主题"],"description":"指令的参数可以是动态的。例如，在 v mydirective:[argument] \\"value\\" 中， argument 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。 例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。 我们可以像这。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/可复用和组合/自定义指令/动态指令参数.md"},"headers":[],"relativePath":"posts/Vue系统教程/09-补充主题/自定义指令/动态指令参数.md","filePath":"posts/Vue系统教程/09-补充主题/自定义指令/动态指令参数.md"}'),p={name:"posts/Vue系统教程/09-补充主题/自定义指令/动态指令参数.md"};function t(c,s,u,o,d,r){return a(),i("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"动态指令参数",tabindex:"-1"},[l("动态指令参数 "),n("a",{class:"header-anchor",href:"#动态指令参数","aria-label":'Permalink to "动态指令参数"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“动态指令参数”的核心思路，并能把它用于实际开发或面试表达。 指令的参数可以是动态的。例如，在 "),n("code",null,'v-mydirective:[argument]="value"'),l(" 中，"),n("code",null,"argument"),l(" 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。")])]),n("p",null,"例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。 我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<div id="baseexample">')]),l(`
`),n("span",{class:"line"},[n("span",null,"  <p>Scroll down the page</p>")]),l(`
`),n("span",{class:"line"},[n("span",null,'  <p v-pin="200">Stick me 200px from the top of the page</p>')]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'Vue.directive("pin", {')]),l(`
`),n("span",{class:"line"},[n("span",null,"  bind: function (el, binding, vnode) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    el.style.position = "fixed";')]),l(`
`),n("span",{class:"line"},[n("span",null,'    el.style.top = binding.value + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"new Vue({")]),l(`
`),n("span",{class:"line"},[n("span",null,'  el: "#baseexample",')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,[l("这会把该元素固定在距离页面顶部 "),n("code",null,"200"),l(" 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<div id="dynamicexample">')]),l(`
`),n("span",{class:"line"},[n("span",null,"  <h3>Scroll down inside this section ↓</h3>")]),l(`
`),n("span",{class:"line"},[n("span",null,'  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>')]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'Vue.directive("pin", {')]),l(`
`),n("span",{class:"line"},[n("span",null,"  bind: function (el, binding, vnode) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    el.style.position = "fixed";')]),l(`
`),n("span",{class:"line"},[n("span",null,'    var s = binding.arg == "left" ? "left" : "top";')]),l(`
`),n("span",{class:"line"},[n("span",null,'    el.style[s] = binding.value + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"new Vue({")]),l(`
`),n("span",{class:"line"},[n("span",null,'  el: "#dynamicexample",')]),l(`
`),n("span",{class:"line"},[n("span",null,"  data: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      direction: "left",')]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,"结果： 这样这个自定义指令现在的灵活性就足以支持一些不同的用例了。 > 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://cn.vuejs.org/v2/guide/custom-directive.html>")])])])])],-1)])])}const h=e(p,[["render",t]]);export{g as __pageData,h as default};
