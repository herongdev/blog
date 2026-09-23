import{_ as e,o as a,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"src-vnode.ts","description":"围绕“src-vnode.ts”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-vnode.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“src-vnode.ts”整理的概念、示例与实践笔记。","sidebarWeight":50,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/src-vnode.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-vnode.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-vnode.ts.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-vnode.ts.md"};function i(c,l,o,u,d,r){return a(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"src-vnode-ts",tabindex:"-1"},[n("src-vnode.ts "),s("a",{class:"header-anchor",href:"#src-vnode-ts","aria-label":'Permalink to "src-vnode.ts"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“src-vnode.ts”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'import { isArray, isString, ShapeFlags } from "@vue/shared";')])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export const Text = Symbol('Text');")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export function isVnode(value) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  return !!(value && value.__v_isVnode)")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export function isSameVnode(n1, n2) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 判断两个虚拟节点是否是相同节点，套路是：")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 一要标签名相同，二要key是一样的")]),n(`
`),s("span",{class:"line"},[s("span",null,"  return (n1.type === n2.type) && (n1.key === n2.key)")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// 虚拟节点有很多：组件的、元素的、文本的")]),n(`
`),s("span",{class:"line"},[s("span",null,"export function createVnode(type, props, children = null) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 组合方案 shapeFlag")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 我想知道一个元素中包含的是多个儿子还是一个儿子，用标识")]),n(`
`),s("span",{class:"line"},[s("span",null,"  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 虚拟dom就是一个对象，好处有二：跨平台和便于diff算法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 真实dom的属性比较多，创建和删除费性能")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const vnode = { // key")]),n(`
`),s("span",{class:"line"},[s("span",null,"    type,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    props,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    children,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    el: null, // 虚拟节点上对应的真实节点，后续diff算法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    key: props?.['key'],")]),n(`
`),s("span",{class:"line"},[s("span",null,"    __v_isVnode: true,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    shapeFlag")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  if (children) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    let type = 0;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    if (isArray(children)) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      type = ShapeFlags.ARRAY_CHILDREN;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      children = String(children);")]),n(`
`),s("span",{class:"line"},[s("span",null,"      type = ShapeFlags.TEXT_CHILDREN;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // |操作得到的结果是，即是组件或元素，同时还是文本子元素或数组子元素")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 之后就可以用&操作来判断是文本子元素还是数组子元素了，同权限一个道理")]),n(`
`),s("span",{class:"line"},[s("span",null,"    vnode.shapeFlag |= type")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  return vnode")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const g=e(t,[["render",i]]);export{v as __pageData,g as default};
