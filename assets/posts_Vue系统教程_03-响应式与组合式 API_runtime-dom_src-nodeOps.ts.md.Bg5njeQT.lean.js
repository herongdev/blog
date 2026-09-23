import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"src-nodeOps.ts","description":"围绕“src-nodeOps.ts”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-nodeOps.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“src-nodeOps.ts”整理的概念、示例与实践笔记。","sidebarWeight":48,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/src-nodeOps.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-nodeOps.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-nodeOps.ts.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-nodeOps.ts.md"};function c(o,e,r,i,u,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"src-nodeops-ts",tabindex:"-1"},[s("src-nodeOps.ts "),n("a",{class:"header-anchor",href:"#src-nodeops-ts","aria-label":'Permalink to "src-nodeOps.ts"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-nodeOps.ts”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export const nodeOps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 增加 删除 修改 查询")]),s(`
`),n("span",{class:"line"},[n("span",null,"  insert(child, parent, anchor = null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // insertBefore 可以等价于appendChild")]),s(`
`),n("span",{class:"line"},[n("span",null,"    parent.insertBefore(child, anchor);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  remove(child) { // 删除节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const parentNode = child.parentNode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (parentNode) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentNode.removeChild(child)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setElementText(el, text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.textContent = text;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setText(node, text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // document.createTextNode()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    node.nodeValue = text;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  querySelector(selector) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.querySelector(selector)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  parentNode(node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return node.parentNode")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextSibling(node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return node.nextSibling")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createElement(tagName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.createElement(tagName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createText(text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.createTextNode(text);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 文本节点 ， 元素中的内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const x=l(p,[["render",c]]);export{h as __pageData,x as default};
