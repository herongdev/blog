import{_ as s,o as l,c as t,j as e,a}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"多次代理同一个对象的问题","description":"目前的代码中， state1是不等于state2的，而我们则是希望， 同一个对象进行多次代理时，我们只代理一次，对第一次代理的结果进行缓存； WeakMap 的键名所指向的对象，不计入垃圾回收机制。也就是说 weakmap 键名对对象的引用是弱引用，不计入垃圾回收机制；如果键值所。","frontmatter":{"title":"多次代理同一个对象的问题","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"目前的代码中， state1是不等于state2的，而我们则是希望， 同一个对象进行多次代理时，我们只代理一次，对第一次代理的结果进行缓存； WeakMap 的键名所指向的对象，不计入垃圾回收机制。也就是说 weakmap 键名对对象的引用是弱引用，不计入垃圾回收机制；如果键值所。","sidebarWeight":84,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现Reactive/多次代理同一个对象的问题.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/多次代理同一个对象的问题.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/多次代理同一个对象的问题.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/多次代理同一个对象的问题.md"};function i(c,n,r,u,o,d){return l(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"多次代理同一个对象的问题",tabindex:"-1"},[a("多次代理同一个对象的问题 "),e("a",{class:"header-anchor",href:"#多次代理同一个对象的问题","aria-label":'Permalink to "多次代理同一个对象的问题"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“多次代理同一个对象的问题”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"const data = { name: 'zf' }")]),a(`
`),e("span",{class:"line"},[e("span",null,"const state1 = reactive(data)")]),a(`
`),e("span",{class:"line"},[e("span",null,"const state2 = reactive(data)")])])])]),e("p",null,"目前的代码中， state1是不等于state2的，而我们则是希望， 同一个对象进行多次代理时，我们只代理一次，对第一次代理的结果进行缓存；"),e("p",null,[e("code",null,"WeakMap"),a("的键名所指向的对象，不计入垃圾回收机制。也就是说"),e("code",null,"weakmap"),a("键名对对象的引用是弱引用，不计入垃圾回收机制；如果键值所引用对象的其它引用都清空了，键名所引用的对象所占用的内存会自动释放，不用考虑键名对其的引用； 了解 "),e("a",{href:"./weakMap"},"weakMap")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,'import { isObject } from "@vue/shared";')]),a(`
`),e("span",{class:"line"},[e("span",null,"// 1、将数据转化为响应式数据，只能做对象的代理")]),a(`
`),e("span",{class:"line"},[e("span",null,"==const== ==reactiveMap== ===== ==new== ==WeakMap====();==")]),a(`
`),e("span",{class:"line"},[e("span",null,"export function reactivity(target) {")]),a(`
`),e("span",{class:"line"},[e("span",null,"  if (!isObject) {")]),a(`
`),e("span",{class:"line"},[e("span",null,"    return")]),a(`
`),e("span",{class:"line"},[e("span",null,"  }")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==有缓存取缓存==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==let== ==existingProxy== ===== ==reactiveMap====.====get====(====target====);==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==if== ==(====existingProxy====)== =={==")]),a(`
`),e("span",{class:"line"},[e("span",null,"    ==return== ==existingProxy====;==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==};==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  const proxy = new Proxy(target, {")]),a(`
`),e("span",{class:"line"},[e("span",null,"    get(target, key, receiver) {")]),a(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.get(target, key, receiver)")]),a(`
`),e("span",{class:"line"},[e("span",null,"    },")]),a(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, receiver) {")]),a(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.set(target, key, value, receiver)")]),a(`
`),e("span",{class:"line"},[e("span",null,"    }")]),a(`
`),e("span",{class:"line"},[e("span",null,"  })")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==创建缓存==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  ==reactiveMap====.====set====(====target====,== ==proxy====);==")]),a(`
`),e("span",{class:"line"},[e("span",null,"  return proxy")]),a(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const h=s(p,[["render",i]]);export{g as __pageData,h as default};
