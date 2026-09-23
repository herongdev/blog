import{_ as l,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"runtime-core-createRender","description":"围绕“runtime-core-createRender”整理的概念、示例与实践笔记。","frontmatter":{"title":"runtime-core-createRender","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“runtime-core-createRender”整理的概念、示例与实践笔记。","sidebarWeight":44,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/runtime-core-createRender.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-core-createRender.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-core-createRender.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-core-createRender.md"};function i(c,e,r,o,u,d){return a(),p("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"runtime-core-createrender",tabindex:"-1"},[s("runtime-core-createRender "),n("a",{class:"header-anchor",href:"#runtime-core-createrender","aria-label":'Permalink to "runtime-core-createRender"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“runtime-core-createRender”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime-core/packages/runtime-core/src/renderer.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、创建元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"二、创建属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"三、处理子元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"四、将元素插入到容器")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { ShapeFlags } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export function createRenderer(renderOptions) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 增加 删除 修改 查询")]),s(`
`),n("span",{class:"line"},[n("span",null,"    insert: hostInsert,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    remove: hostRemove,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setElementText: hostSetElementText,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setText: hostSetText,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    parentNode: hostParentNode,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    nextSibling: hostNextSibling,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    createElement: hostCreateElement,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    createText: hostCreateText,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patchProp: hostPatchProp")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 文本节点 ， 元素中的内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } = renderOptions")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," //  核心的patch方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const patch = (n1, n2, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // n2 可能是一个文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (n1 === n2) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (n1 == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 初次渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 后续还有组件的初次渲染，目前是元素的初始化渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"      mountElement(n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 更新流程")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const mountElement = (vnode, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { type, props, children, shapeFlag } = vnode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let el = vnode.el = hostCreateElement(type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 将真实元素挂载到这个虚拟节点上，后续用于复用节点和更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (let key in props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        hostPatchProp(el, key, null, props[key])")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 在vnode.ts中，let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 最后还会进行|运行，即：")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // vnode.shapeFlag | （ShapeFlags.ARRAY_CHILDREN或者ShapeFlags.TEXT_CHILDREN）")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // shapeFlag中包含了children的类型，就像权限管理赋予权限一样")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) { // 文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"      hostSetElementText(el, children)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"      mountChildren(children, el)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    hostInsert(el, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  const mountChildren = (children, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let i = 0; i < children.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(null, children[i], container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  // vnode 虚拟dom")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const render = (vnode, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 渲染过程是用你传入的renderOptions来渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (vnode == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 卸载逻辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 这里既有初始化的逻辑，又有更新的逻辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(container._vnode || null, vnode, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    container._vnode = vnode")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果当前vnode是空的话")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=l(t,[["render",i]]);export{m as __pageData,g as default};
