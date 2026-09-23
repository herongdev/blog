import{_ as l,o as a,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"数据变化时的逻辑","description":"围绕“数据变化时的逻辑”整理的概念、示例与实践笔记。","frontmatter":{"title":"数据变化时的逻辑","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“数据变化时的逻辑”整理的概念、示例与实践笔记。","sidebarWeight":93,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/数据变化时的逻辑.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/数据变化时的逻辑.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/数据变化时的逻辑.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/数据变化时的逻辑.md"};function c(i,n,u,r,o,d){return a(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"数据变化时的逻辑",tabindex:"-1"},[s("数据变化时的逻辑 "),e("a",{class:"header-anchor",href:"#数据变化时的逻辑","aria-label":'Permalink to "数据变化时的逻辑"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“数据变化时的逻辑”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"修改baseHandle中的set方法：")]),s(`
`),e("span",{class:"line"},[e("span",null,"export const mutableHandlers = {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  get(target, key, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    if (key === ReactiveFlags.IS_REACTIVE) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      return true")]),s(`
`),e("span",{class:"line"},[e("span",null,"    };")]),s(`
`),e("span",{class:"line"},[e("span",null,"    track(target, 'get', key)")]),s(`
`),e("span",{class:"line"},[e("span",null,"    return Reflect.get(target, key, receiver)")]),s(`
`),e("span",{class:"line"},[e("span",null,"  },")]),s(`
`),e("span",{class:"line"},[e("span",null,"  set(target, key, value, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==let== ==oldValue== ===== ==target====[====key====];==")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==let== ==result== ===== ==Reflect====.====set====(====target====,== ==key====,== ==value====,== ==receiver====);==")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==if== ==(====oldValue== ==!==== ==value====)== =={==")]),s(`
`),e("span",{class:"line"},[e("span",null,"      ==//== ==要更新==")]),s(`
`),e("span",{class:"line"},[e("span",null,"      ==trigger====(====target====,== =='set'====,== ==key====,== ==value====,== ==oldValue====);==")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==}==")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==return== ==result====;==")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"在effect.ts中实现trigger方法：")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function trigger(target, type, key, value, oldValue) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  const depsMap = targetMap.get(target);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  // 触发的值不在模板中使用")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (!depsMap) return;")]),s(`
`),e("span",{class:"line"},[e("span",null,"  // 找到了属性对应的effcts")]),s(`
`),e("span",{class:"line"},[e("span",null,"  const effects = depsMap.get(key);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  effects && effects.forEach(effect => {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    effect.run();")]),s(`
`),e("span",{class:"line"},[e("span",null,"  });")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const v=l(p,[["render",c]]);export{g as __pageData,v as default};
