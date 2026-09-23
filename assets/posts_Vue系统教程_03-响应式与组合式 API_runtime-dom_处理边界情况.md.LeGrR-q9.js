import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"处理边界情况","description":"围绕“处理边界情况”整理的概念、示例与实践笔记。","frontmatter":{"title":"处理边界情况","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“处理边界情况”整理的概念、示例与实践笔记。","sidebarWeight":52,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/处理边界情况.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/处理边界情况.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/处理边界情况.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/处理边界情况.md"};function t(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"处理边界情况",tabindex:"-1"},[s("处理边界情况 "),n("a",{class:"header-anchor",href:"#处理边界情况","aria-label":'Permalink to "处理边界情况"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“处理边界情况”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"文本的处理, 需要自己增加类型。因为不能通过document.createElement('文本')")]),s(`
`),n("span",{class:"line"},[n("span",null,"h(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'h1',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: { color: 'red' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    onClick: () => alert(1)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    h('span', '123'),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    '123'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,")")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"vnode.ts添加一个类型标识Text")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { isArray, isString, ShapeFlags } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Text = Symbol('Text')")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这样的话，")]),s(`
`),n("span",{class:"line"},[n("span",null,"let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"得到shapeFlag为0；之后")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let type = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isArray(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type = ShapeFlags.ARRAY_CHILDREN;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    children = String(children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type = ShapeFlags.TEXT_CHILDREN;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  vnode.shapeFlag |= type")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这里的最终结果是vnode.shapFlag的值为ShapeFlags.ARRAY_CHILDREN或者ShapeFlags.TEXT_CHILDREN，就像没有赋予权限一样的")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来，在renderer.ts的patch方法中，添加一个逻辑：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const patch = (n1, n2, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (n1 === n2) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { type, shapeFlag } = n2")]),s(`
`),n("span",{class:"line"},[n("span",null,"  switch (type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    case Text:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      processText(n1, n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    default:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (shapeFlag & ShapeFlags.ELEMENT) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        processElement(n1, n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const processText = (n1, n2, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (n1 === null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    hostInsert((n2.el = hostCreateText(n2.children)), container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 文本的内容变化了，我可以复用老的节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const el = n2.el = n1.el;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (n1.children !== n2.children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      hostSetText(el, n2.children); // 文本的更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在mountChildren中，还要进行处理：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const mountChildren = (children, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < children.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let child = normalize(children[i])")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patch(null, child, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const normalize = (child) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isString(child)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return createVnode(Text, null, child)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return child")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(i,[["render",t]]);export{g as __pageData,v as default};
