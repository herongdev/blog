import{_ as a,o as t,c as l,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"effect的fn中设置属性值","description":"围绕“effect的fn中设置属性值”整理的概念、示例与实践笔记。","frontmatter":{"title":"effect的fn中设置属性值","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“effect的fn中设置属性值”整理的概念、示例与实践笔记。","sidebarWeight":88,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/effect的fn中设置属性值.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/effect的fn中设置属性值.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/effect的fn中设置属性值.md"}'),f={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/effect的fn中设置属性值.md"};function c(p,s,i,o,u,r){return t(),l("div",null,[...s[0]||(s[0]=[e("div",null,[e("h1",{id:"effect的fn中设置属性值",tabindex:"-1"},[n("effect的fn中设置属性值 "),e("a",{class:"header-anchor",href:"#effect的fn中设置属性值","aria-label":'Permalink to "effect的fn中设置属性值"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“effect的fn中设置属性值”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"effect(() => {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==state====.====aget== ===== ==Math====.====random====();==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  document.getElementById('app').innerHTML = state.name + '今年' + state.age + '岁了' + state.n")]),n(`
`),e("span",{class:"line"},[e("span",null,"});")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"会死循环；")]),n(`
`),e("span",{class:"line"},[e("span",null,"我们在执行Effect的时候，又要执行自己，那我们需要屏蔽掉，不要无限调用；")]),n(`
`),e("span",{class:"line"},[e("span",null,"export function trigger(target, type, key, value, oldValue) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  const depsMap = targetMap.get(target);")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // 触发的值不在模板中使用")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (!depsMap) return;")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // 找到了属性对应的effcts")]),n(`
`),e("span",{class:"line"},[e("span",null,"  const effects = depsMap.get(key);")]),n(`
`),e("span",{class:"line"},[e("span",null,"  effects && effects.forEach(effect => {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    ==if== ==(====effect== ==!==== ==activeEffect====)== =={==")]),n(`
`),e("span",{class:"line"},[e("span",null,"      ==effect====.====run====();==")]),n(`
`),e("span",{class:"line"},[e("span",null,"    ==}==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  });")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const h=a(f,[["render",c]]);export{g as __pageData,h as default};
