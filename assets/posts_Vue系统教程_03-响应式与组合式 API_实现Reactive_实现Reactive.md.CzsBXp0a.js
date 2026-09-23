import{_ as n,o as l,c as t,j as s,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"实现Reactive","description":"取值时，直接在我们代理对象上取值； 设置值时，直接将新值赋值给对象上的指定属性； 这种实现的问题在于，如果对对象的属性进行取值时，调用的是一个函数如get函数，而这个函数的内部又使用了this，这时，这个this的指向是被代理的对象；这们，当取值函数所依赖的被代理对象的比如，th。","frontmatter":{"title":"实现Reactive","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"取值时，直接在我们代理对象上取值； 设置值时，直接将新值赋值给对象上的指定属性； 这种实现的问题在于，如果对对象的属性进行取值时，调用的是一个函数如get函数，而这个函数的内部又使用了this，这时，这个this的指向是被代理的对象；这们，当取值函数所依赖的被代理对象的比如，th。","sidebarWeight":85,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现Reactive/实现Reactive.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/实现Reactive.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/实现Reactive.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/实现Reactive.md"};function p(c,a,r,u,o,d){return l(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"实现reactive",tabindex:"-1"},[e("实现Reactive "),s("a",{class:"header-anchor",href:"#实现reactive","aria-label":'Permalink to "实现Reactive"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“实现Reactive”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"同个对象缓存处理")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"参数为代理Proxy如何处理")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"新建文件packages/reactivity/dist/index.html，")]),e(`
`),s("span",{class:"line"},[s("span",null,"在文件中引用我们reactivity打包后生成的reactivity.global.js文件，")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"<!DOCTYPE html>")]),e(`
`),s("span",{class:"line"},[s("span",null,'<html lang="en">')]),e(`
`),s("span",{class:"line"},[s("span",null,"<head>")]),e(`
`),s("span",{class:"line"},[s("span",null,'  <meta charset="UTF-8">')]),e(`
`),s("span",{class:"line"},[s("span",null,'  <meta http-equiv="X-UA-Compatible" content="IE=edge">')]),e(`
`),s("span",{class:"line"},[s("span",null,'  <meta name="viewport" content="width=device-width, initial-scale=1.0">')]),e(`
`),s("span",{class:"line"},[s("span",null,"  <title>Document</title>")]),e(`
`),s("span",{class:"line"},[s("span",null,"</head>")]),e(`
`),s("span",{class:"line"},[s("span",null,"<body>")]),e(`
`),s("span",{class:"line"},[s("span",null,'  <script src="../../reactivity/dist/reactivity.global.js"><\/script>')]),e(`
`),s("span",{class:"line"},[s("span",null,"</body>")]),e(`
`),s("span",{class:"line"},[s("span",null,"</html>")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"新建reactivity/src/reactivity.ts")]),e(`
`),s("span",{class:"line"},[s("span",null,"新建reactivity/src/effect.ts")]),e(`
`),s("span",{class:"line"},[s("span",null,"在reactivity/src/index.ts中导出这两个模块；")]),e(`
`),s("span",{class:"line"},[s("span",null,"export { reactivity } from './reactivity'")]),e(`
`),s("span",{class:"line"},[s("span",null,"export { effect } from './effect'")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"reactivity/src/reactivity.ts的主要作用是将数据转换为响应式数据；")]),e(`
`),s("span",{class:"line"},[s("span",null,'import { isObject } from "@vue/shared";')]),e(`
`),s("span",{class:"line"},[s("span",null,"// 只能做对象的代理")]),e(`
`),s("span",{class:"line"},[s("span",null,"export function reactivity(object) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"  if (!isObject) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    return")]),e(`
`),s("span",{class:"line"},[s("span",null,"  }")]),e(`
`),s("span",{class:"line"},[s("span",null,"  const proxy = new Proxy(target, {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    get(target, key, receiver) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"      return target[key]")]),e(`
`),s("span",{class:"line"},[s("span",null,"    },")]),e(`
`),s("span",{class:"line"},[s("span",null,"    set(target, key, value, receiver) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"      target[key] = value;")]),e(`
`),s("span",{class:"line"},[s("span",null,"      return true")]),e(`
`),s("span",{class:"line"},[s("span",null,"    }")]),e(`
`),s("span",{class:"line"},[s("span",null,"  })")]),e(`
`),s("span",{class:"line"},[s("span",null,"  return proxy")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"取值时，直接在我们代理对象上取值； 设置值时，直接将新值赋值给对象上的指定属性；"),s("p",null,"这种实现的问题在于，如果对对象的属性进行取值时，调用的是一个函数如get函数，而这个函数的内部又使用了this，这时，这个this的指向是被代理的对象；这们，当取值函数所依赖的被代理对象的比如，this.name的name变化时，理论上我们的effect要重新执行，但由于对象属性的变化不会触发proxy的get或set方法，所以effect不会重新执行，这样就失去了响应性；如："),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"let target = {")]),e(`
`),s("span",{class:"line"},[s("span",null,"  name: 'zf',")]),e(`
`),s("span",{class:"line"},[s("span",null,"  get alias() {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    return this.name")]),e(`
`),s("span",{class:"line"},[s("span",null,"  }")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"在我们上面的实现中，name变化了，我们希望alias也会变化 ，但实际上，我们只会在读取alias属性时，会触发proxy的get函数；在读取this.name时，我们只是在源对应上去取值，不会触发proxy的get函数，失去响应；")])])])]),s("p",null,"所以，我们希望，对象的取值函数中的this能指向proxy，这们，访问访问器属性是，由于this指向了proxy时，还是会走proxy的get函数 ；")],-1)])])}const g=n(i,[["render",p]]);export{v as __pageData,g as default};
