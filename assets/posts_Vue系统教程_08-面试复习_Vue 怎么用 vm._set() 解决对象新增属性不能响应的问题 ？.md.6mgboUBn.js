import{_ as a,o as l,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？","description":"如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动。","frontmatter":{"title":"Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","面试复习"],"description":"如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/面试/Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？.md"},"headers":[],"relativePath":"posts/Vue系统教程/08-面试复习/Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？.md","filePath":"posts/Vue系统教程/08-面试复习/Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？.md"}'),i={name:"posts/Vue系统教程/08-面试复习/Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？.md"};function p(c,s,u,r,o,d){return l(),t("div",null,[...s[0]||(s[0]=[e("div",null,[e("h1",{id:"vue-怎么用-vm-set-解决对象新增属性不能响应的问题",tabindex:"-1"},[n("Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？ "),e("a",{class:"header-anchor",href:"#vue-怎么用-vm-set-解决对象新增属性不能响应的问题","aria-label":'Permalink to "Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"受现代 JavaScript 的限制 ，Vue **无法检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value) 来实现为对象添加响应式属性，那框架本身是如何实现的呢？")]),n(`
`),e("span",{class:"line"},[e("span",null,"我们查看对应的 Vue 源码：vue/src/core/instance/index.js")]),n(`
`),e("span",{class:"line"},[e("span",null,"export function set(target: Array<any> | Object, key: any, val: any): any {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // target 为数组")]),n(`
`),e("span",{class:"line"},[e("span",null,"    if (Array.isArray(target) && isValidArrayIndex(key)) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误")]),n(`
`),e("span",{class:"line"},[e("span",null,"        target.length = Math.max(target.length, key)")]),n(`
`),e("span",{class:"line"},[e("span",null,"        // 利用数组的splice变异方法触发响应式")]),n(`
`),e("span",{class:"line"},[e("span",null,"        target.splice(key, 1, val)")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return val")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // key 已经存在，直接修改属性值")]),n(`
`),e("span",{class:"line"},[e("span",null,"    if (key in target && !(key in Object.prototype)) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        target[key] = val")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return val")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"    const ob = (target: any).__ob__")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // target 本身就不是响应式数据, 直接赋值")]),n(`
`),e("span",{class:"line"},[e("span",null,"    if (!ob) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        target[key] = val")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return val")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // 对属性进行响应式处理")]),n(`
`),e("span",{class:"line"},[e("span",null,"    defineReactive(ob.value, key, val)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    ob.dep.notify()")]),n(`
`),e("span",{class:"line"},[e("span",null,"    return val")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"我们阅读以上源码可知，vm.$set 的实现原理是：")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"如果目标是数组，直接使用数组的 splice 方法触发相应式；")])])])]),e("p",null,"如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）")],-1)])])}const g=a(i,[["render",p]]);export{_ as __pageData,g as default};
