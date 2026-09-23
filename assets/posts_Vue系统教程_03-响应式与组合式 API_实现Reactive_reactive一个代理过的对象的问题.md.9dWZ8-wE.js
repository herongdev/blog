import{_ as s,o as l,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"reactive一个代理过的对象的问题","description":"给已代理过的对象加上一个标识；表示是不是一个已经代理过的对象，如果是一个代理过的对象，即一个proxy，直接返回即可； 简言之，这个 ReactiveFlags . IS REACTIVE 在对象上是不存在的； 但是在proxy实例上取这个属性值时，我们直接让代码返回true使条。","frontmatter":{"title":"reactive一个代理过的对象的问题","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"给已代理过的对象加上一个标识；表示是不是一个已经代理过的对象，如果是一个代理过的对象，即一个proxy，直接返回即可； 简言之，这个 ReactiveFlags . IS REACTIVE 在对象上是不存在的； 但是在proxy实例上取这个属性值时，我们直接让代码返回true使条。","sidebarWeight":83,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现Reactive/reactive一个代理过的对象的问题.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/reactive一个代理过的对象的问题.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/reactive一个代理过的对象的问题.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/reactive一个代理过的对象的问题.md"};function i(r,a,c,u,o,v){return l(),t("div",null,[...a[0]||(a[0]=[e("div",null,[e("h1",{id:"reactive一个代理过的对象的问题",tabindex:"-1"},[n("reactive一个代理过的对象的问题 "),e("a",{class:"header-anchor",href:"#reactive一个代理过的对象的问题","aria-label":'Permalink to "reactive一个代理过的对象的问题"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“reactive一个代理过的对象的问题”的核心思路，并能把它用于实际开发或面试表达。 给已代理过的对象加上一个标识；表示是不是一个已经代理过的对象，如果是一个代理过的对象，即一个proxy，直接返回即可；")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,'import { isObject } from "@vue/shared";')]),n(`
`),e("span",{class:"line"},[e("span",null,"// 1、将数据转化为响应式数据，只能做对象的代理")]),n(`
`),e("span",{class:"line"},[e("span",null,"const reactiveMap = new WeakMap();")]),n(`
`),e("span",{class:"line"},[e("span",null,"const enum ReactiveFlags {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  IS_REACTIVE = '__v_isReactive'")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")]),n(`
`),e("span",{class:"line"},[e("span",null,"export function reactivity(target) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (!isObject) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    return")]),n(`
`),e("span",{class:"line"},[e("span",null,"  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==首次代理一个对象时，对象上肯定没有这个属性，则跳过==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==对象被代理过后是一个====proxy====，这时再取这个属性时==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==会走到====get====方法的====if== ==(key== ======= ==ReactiveFlags.IS_REACTIVE)== ==判断中==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==//== ==条件成立，直接返回====proxy====本身==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==if== ==(====target====[====ReactiveFlags====.====IS_REACTIVE====])== =={==")]),n(`
`),e("span",{class:"line"},[e("span",null,"    ==return== ==target==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  ==}==")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // 有缓存取缓存")]),n(`
`),e("span",{class:"line"},[e("span",null,"  let existingProxy = reactiveMap.get(target);")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (existingProxy) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    return existingProxy;")]),n(`
`),e("span",{class:"line"},[e("span",null,"  };")]),n(`
`),e("span",{class:"line"},[e("span",null,"  const proxy = new Proxy(target, {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    get(target, key, receiver) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      ==if== ==(====key== ======= ==ReactiveFlags====.====IS_REACTIVE====)== =={==")]),n(`
`),e("span",{class:"line"},[e("span",null,"        ==return== ==true==")]),n(`
`),e("span",{class:"line"},[e("span",null,"      ==};==")]),n(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.get(target, key, receiver)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, receiver) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.set(target, key, value, receiver)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"  })")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // 创建缓存")]),n(`
`),e("span",{class:"line"},[e("span",null,"  reactiveMap.set(target, proxy);")]),n(`
`),e("span",{class:"line"},[e("span",null,"  return proxy")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("p",null,"简言之，这个 ==ReactiveFlags====.====IS_REACTIVE==在对象上是不存在的； 但是在proxy实例上取这个属性值时，我们直接让代码返回true使条件成立，从而直接返回proxy本身；所有proxy取这个属性时，直接返回True，从而返回本身；")],-1)])])}const _=s(p,[["render",i]]);export{d as __pageData,_ as default};
