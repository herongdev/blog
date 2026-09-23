import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"src-modules","description":"围绕“src-modules”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-modules","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“src-modules”整理的概念、示例与实践笔记。","sidebarWeight":47,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/src-modules.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-modules.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-modules.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/src-modules.md"};function i(u,l,c,o,r,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-modules",tabindex:"-1"},[s("src-modules "),n("a",{class:"header-anchor",href:"#src-modules","aria-label":'Permalink to "src-modules"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-modules”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"attr.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchAttr(el, key, nextValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (nextValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.setAttribute(key, nextValue);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.removeAttribute(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchClass(el, nextValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (nextValue == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果不需要class直接移除")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.removeAttribute('class');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.className = nextValue")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"style.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchStyle(el, prevValue, nextValue = {}) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 样式需要比对差异")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in nextValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 用新的直接覆盖即可")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.style[key] = nextValue[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (prevValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let key in prevValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (nextValue[key] == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el.style[key] = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"event.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createInvoker(callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const invoker = (e) => invoker.value(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  invoker.value = callback;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return invoker")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果之前有且现在还有同名事件，就更新事件回调函数即可；")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果之前存在同名事件，现在没有同名事件，要移除事件绑定；")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果之前不存在此名称事件，现在有了，则增加事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchEvent(el, eventName, nextValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 事件绑定都缓存到了当前dom上")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以先移除掉事件，再重新绑定事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 但 add + 自定义事件 （里面调用绑定的方法）更佳")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let invokers = el._vei || (el._vei = {});")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let exits = invokers[eventName]; // 先看有没有缓存过")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果绑定的是一个空")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (exits && nextValue) { // 已经绑定过事件了")]),s(`
`),n("span",{class:"line"},[n("span",null,"    exits.value = nextValue; // 没有卸载函数，只是改了invoker.value 属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 有!exits&&nextValue和exist&&!nextValue两种情况")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let event = eventName.slice(2).toLowerCase();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (nextValue) { // 只能是!exits才可以满足,不存在则创建事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const invoker = invokers[eventName] = createInvoker(nextValue);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      el.addEventListener(event, invoker)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (exits) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"     // 只有!nextValue满足，如果有老值，需要将老的绑定事件移除掉")]),s(`
`),n("span",{class:"line"},[n("span",null,"      el.removeEventListener(event, exits);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      invokers[eventName] = undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=e(t,[["render",i]]);export{m as __pageData,h as default};
