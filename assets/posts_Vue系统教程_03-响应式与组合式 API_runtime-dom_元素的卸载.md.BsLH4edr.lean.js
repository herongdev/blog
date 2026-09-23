import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"元素的卸载","description":"我们如果传入null的时候在渲染时，则是卸载逻辑，需要将dom节点删掉 render(null, container)。","frontmatter":{"title":"元素的卸载","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"我们如果传入null的时候在渲染时，则是卸载逻辑，需要将dom节点删掉 render(null, container)。","sidebarWeight":51,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/元素的卸载.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/元素的卸载.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/元素的卸载.md"}'),o={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/元素的卸载.md"};function i(p,s,c,d,r,u){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"元素的卸载",tabindex:"-1"},[e("元素的卸载 "),n("a",{class:"header-anchor",href:"#元素的卸载","aria-label":'Permalink to "元素的卸载"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“元素的卸载”的核心思路，并能把它用于实际开发或面试表达。 我们如果传入null的时候在渲染时，则是卸载逻辑，需要将dom节点删掉 render(null, container)")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在renderer.ts的createRenderer的render方法中：")]),e(`
`),n("span",{class:"line"},[n("span",null,"// vnode 虚拟dom")]),e(`
`),n("span",{class:"line"},[n("span",null,"const render = (vnode, container) => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  ==if== ==(====vnode== ====== ==null====)== =={==")]),e(`
`),n("span",{class:"line"},[n("span",null,"    ==//== ==卸载逻辑==")]),e(`
`),n("span",{class:"line"},[n("span",null,"    ==if== ==(====container====.====_vnode====)== =={==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==之前确实渲染过了，那么就卸载掉====dom==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==unmount====(====container====.====_vnode====);==")]),e(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"  ==}== else {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 这里既有初始化的逻辑，又有更新的逻辑")]),e(`
`),n("span",{class:"line"},[n("span",null,"    patch(container._vnode || null, vnode, container)")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  container._vnode = vnode")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 如果当前vnode是空的话")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const unmount = (vnode) => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  hostRemove(vnode.el);")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=l(o,[["render",i]]);export{v as __pageData,h as default};
