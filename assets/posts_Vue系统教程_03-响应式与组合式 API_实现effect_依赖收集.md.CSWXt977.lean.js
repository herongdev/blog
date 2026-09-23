import{_ as a,o as l,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"依赖收集","description":"围绕“依赖收集”整理的概念、示例与实践笔记。","frontmatter":{"title":"依赖收集","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“依赖收集”整理的概念、示例与实践笔记。","sidebarWeight":89,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/依赖收集.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/依赖收集.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/依赖收集.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/依赖收集.md"};function c(i,n,u,r,o,d){return l(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"依赖收集",tabindex:"-1"},[s("依赖收集 "),e("a",{class:"header-anchor",href:"#依赖收集","aria-label":'Permalink to "依赖收集"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“依赖收集”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"添加一个方法:")]),s(`
`),e("span",{class:"line"},[e("span",null,"track：跟踪依赖")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"对象的某个属性可能对应多个effect;")]),s(`
`),e("span",{class:"line"},[e("span",null,"{对象：{name:[]}")]),s(`
`),e("span",{class:"line"},[e("span",null,"weakMap={对象：Map{name:Set[]}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"export const mutableHandlers = {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  get(target, key, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    if (key === ReactiveFlags.IS_REACTIVE) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      return true")]),s(`
`),e("span",{class:"line"},[e("span",null,"    };")]),s(`
`),e("span",{class:"line"},[e("span",null,"    ==track====(====target====,== =='get'====,== ==key====)==")]),s(`
`),e("span",{class:"line"},[e("span",null,"    return Reflect.get(target, key, receiver)")]),s(`
`),e("span",{class:"line"},[e("span",null,"  },")]),s(`
`),e("span",{class:"line"},[e("span",null,"  set(target, key, value, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    return Reflect.set(target, key, value, receiver)")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"在effect.ts中添加track方法：")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function track(target, type, key) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"要注意的是，只有在effect的fn中读取属性时，我们才要进行依赖收集；所以，模板中没有用到的计算属性（effect的一种）,或者没有被其它effect用到的计算属性，是不会执行的；")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function track(target, type, key) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==如果不是在====effect====中获取属性，是不跟踪的；==")]),s(`
`),e("span",{class:"line"},[e("span",null,"  ==if== ==(!====activeEffect====)== ==return==")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"完整的Track代码：")]),s(`
`),e("span",{class:"line"},[e("span",null,"const targetMap = new WeakMap();")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function track(target, type, key) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  // 如果不是在effect中获取属性，是不跟踪的；")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (!activeEffect) return;")]),s(`
`),e("span",{class:"line"},[e("span",null,"  let depsMap = targetMap.get(target);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (!depsMap) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    // 将源对象与一个map关联起来；")]),s(`
`),e("span",{class:"line"},[e("span",null,"    // 这个map的键是属性名，值是一个set，set中放置的是effect实例")]),s(`
`),e("span",{class:"line"},[e("span",null,"    // 当map中的属性变化时，我们把对应的set中的effect实例拿出来，调用其run方法；")]),s(`
`),e("span",{class:"line"},[e("span",null,"    // 从而又执行了一次effect的fn函数；")]),s(`
`),e("span",{class:"line"},[e("span",null,"    targetMap.set(target, (depsMap = new Map()));")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  // 再到这个depsMap中查找当前属性对应的Set;")]),s(`
`),e("span",{class:"line"},[e("span",null,"  let dep = depsMap.get(key);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (!dep) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    depsMap.set(key, (dep = new Set()));")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  // 看set中是否存在当前的effect")]),s(`
`),e("span",{class:"line"},[e("span",null,"  let shouldTrack = !dep.has(activeEffect);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (shouldTrack) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    dep.add(activeEffect);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const h=a(p,[["render",c]]);export{g as __pageData,h as default};
