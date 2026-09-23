import{_ as s,o as e,c as t,j as n,a}from"./chunks/framework.DJo0M80U.js";const w=JSON.parse('{"title":"解除上一次watch","description":"当用户在输入框中输入内容的时候，我们要根据输入的内容返回ajax结果； 如果watch输入的内容，输入框的内容一变化就可以访问接口，渲染页面可能会出现什么问题呢？ 光加上防抖不够； 因为每次请求返回的时间是不一样的，可能后面的请求先返回，显示了后面的结果； 实现： 给watch的。","frontmatter":{"title":"解除上一次watch","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"当用户在输入框中输入内容的时候，我们要根据输入的内容返回ajax结果； 如果watch输入的内容，输入框的内容一变化就可以访问接口，渲染页面可能会出现什么问题呢？ 光加上防抖不够； 因为每次请求返回的时间是不一样的，可能后面的请求先返回，显示了后面的结果； 实现： 给watch的。","sidebarWeight":122,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/解除上一次watch.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/解除上一次watch.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/解除上一次watch.md"}'),c={name:"posts/Vue系统教程/03-响应式与组合式 API/解除上一次watch.md"};function p(u,l,i,o,r,h){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"解除上一次watch",tabindex:"-1"},[a("解除上一次watch "),n("a",{class:"header-anchor",href:"#解除上一次watch","aria-label":'Permalink to "解除上一次watch"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“解除上一次watch”的核心思路，并能把它用于实际开发或面试表达。 当用户在输入框中输入内容的时候，我们要根据输入的内容返回ajax结果；")]),n("p",null,"如果watch输入的内容，输入框的内容一变化就可以访问接口，渲染页面可能会出现什么问题呢？ 光加上防抖不够； 因为每次请求返回的时间是不一样的，可能后面的请求先返回，显示了后面的结果；"),n("p",null,"实现： 给watch的第二个参数即调度函数传入第三个参数：onCleanup，每次执行本次调度函数的时候，会执行上一次watch的onCleanup；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const state = reactive({ flag: true, name: 'jw', age: 30 })")]),a(`
`),n("span",{class:"line"},[n("span",null,"let i = 2000;")]),a(`
`),n("span",{class:"line"},[n("span",null,"function getData(timer) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return new Promise((resolve, reject) => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        setTimeout(() => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"            resolve(timer)")]),a(`
`),n("span",{class:"line"},[n("span",null,"        }, timer);")]),a(`
`),n("span",{class:"line"},[n("span",null,"    })")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")]),a(`
`),n("span",{class:"line"},[n("span",null,"watch(() => state.age, async (newValue, oldValue, onCleanup) => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    let clear = false;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    onCleanup(() => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        clear = true;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    })")]),a(`
`),n("span",{class:"line"},[n("span",null,"    i -= 1000;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    let r = await getData(i); // 第一次执行1s后渲染1000， 第二次执行0s后渲染0， 最终应该是0")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (!clear) { document.body.innerHTML = r; }")]),a(`
`),n("span",{class:"line"},[n("span",null,"}, { flush: 'sync' });")]),a(`
`),n("span",{class:"line"},[n("span",null,"state.age = 31;")]),a(`
`),n("span",{class:"line"},[n("span",null,"state.age = 32;")]),a(`
`),n("span",{class:"line"},[n("span",null,"// 第一次调用watch的时候传入一个回调， 第二次调用watch的时候执行上一次传入的回调")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在上例中：")]),a(`
`),n("span",{class:"line"},[n("span",null,"// 1) 第一次调用watch的时候用户注入一个取消的回调")]),a(`
`),n("span",{class:"line"},[n("span",null,"// 2) 第二次调用watch的时候会执行第一次用户注入的回调")]),a(`
`),n("span",{class:"line"},[n("span",null,"// 3) 第三次调用watch会执行第二次注入的回调")]),a(`
`),n("span",{class:"line"},[n("span",null,"// 后面的watch触发会将上次watch中的clear 置为true")]),a(`
`),n("span",{class:"line"},[n("span",null,"export function watch(source, cb) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  let getter;")]),a(`
`),n("span",{class:"line"},[n("span",null,"  if (isReactive(source)) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    getter = () => traversal(source)")]),a(`
`),n("span",{class:"line"},[n("span",null,"  } else if (isFunction(source)) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    getter = source")]),a(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"  let cleanup;")]),a(`
`),n("span",{class:"line"},[n("span",null,"  const onCleanup = (fn) => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    cleanup = fn; // 保存用户的函数")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"  let oldValue;")]),a(`
`),n("span",{class:"line"},[n("span",null,"  const job = () => {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (cleanup) cleanup(); // 下一次watch开始触发上一次watch的清理")]),a(`
`),n("span",{class:"line"},[n("span",null,"    const newValue = effect.run();")]),a(`
`),n("span",{class:"line"},[n("span",null,"    cb(newValue, oldValue, onCleanup);")]),a(`
`),n("span",{class:"line"},[n("span",null,"    oldValue = newValue")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 在effect中访问属性就会依赖收集")]),a(`
`),n("span",{class:"line"},[n("span",null,"  const effect = new ReactiveEffect(getter, job);")]),a(`
`),n("span",{class:"line"},[n("span",null,"  oldValue = effect.run();")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=s(c,[["render",p]]);export{w as __pageData,f as default};
