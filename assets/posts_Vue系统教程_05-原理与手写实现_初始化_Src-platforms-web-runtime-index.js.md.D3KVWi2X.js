import{_ as s,o as a,c as i,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Src-platforms-web-runtime-index.js","description":"继续从core/index中导入Vue构造函数： 不妨先看 src/core/index.js 中的代码，看它导出的 Vue 构造函数是什么样的： 可以看到，它在内部也引入了另外一个 Vue 构造函数（ src/core/instance/index.js ），可以先看它的代码。","frontmatter":{"title":"Src-platforms-web-runtime-index.js","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"继续从core/index中导入Vue构造函数： 不妨先看 src/core/index.js 中的代码，看它导出的 Vue 构造函数是什么样的： 可以看到，它在内部也引入了另外一个 Vue 构造函数（ src/core/instance/index.js ），可以先看它的代码。","sidebarWeight":64,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/初始化/Src-platforms-web-runtime-index.js.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/初始化/Src-platforms-web-runtime-index.js.md","filePath":"posts/Vue系统教程/05-原理与手写实现/初始化/Src-platforms-web-runtime-index.js.md"}'),t={name:"posts/Vue系统教程/05-原理与手写实现/初始化/Src-platforms-web-runtime-index.js.md"};function p(u,l,c,o,r,d){return a(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-platforms-web-runtime-index-js",tabindex:"-1"},[e("Src-platforms-web-runtime-index.js "),n("a",{class:"header-anchor",href:"#src-platforms-web-runtime-index-js","aria-label":'Permalink to "Src-platforms-web-runtime-index.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Src-platforms-web-runtime-index.js”的核心思路，并能把它用于实际开发或面试表达。 继续从core/index中导入Vue构造函数：")]),n("p",null,[e("不妨先看"),n("code",null,"src/core/index.js"),e("中的代码，看它导出的"),n("code",null,"Vue"),e("构造函数是什么样的：")]),n("p",null,[e("可以看到，它在内部也引入了另外一个"),n("code",null,"Vue"),e("构造函数（"),n("code",null,"src/core/instance/index.js"),e("），可以先看它的代码，回头再看自身的代码：")]),n("p",null,[n("code",null,"src/core/instance/index.js"),e(" 主要逻辑：")]),n("ul",null,[n("li",null,[n("p",null,"创建一个Vue构造函数"),n("ul",null,[n("li",null,[e("在创建实例时会： "),n("ul",null,[n("li",null,[e("判断是不是用"),n("code",null,"new"),e("调用的；")]),n("li",null,[e("调用实例的"),n("code",null,"_init"),e("方法；")])])])])]),n("li",null,[n("p",null,"再依次在它的原型上拓展各种方法："),n("ul",null,[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  initMixin(Vue)")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  stateMixin(Vue)")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  eventsMixin(Vue)")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  lifecycleMixin(Vue)")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  renderMixin(Vue)")])])])])])])]),n("li",null,[n("p",null,"导出Vue构造函数")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { initMixin } from './init'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { stateMixin } from './state'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { renderMixin } from './render'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { eventsMixin } from './events'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { lifecycleMixin } from './lifecycle'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { warn } from '../util/index'")]),e(`
`),n("span",{class:"line"},[n("span",null,"function Vue (options) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  if (process.env.NODE_ENV !== 'production' &&")]),e(`
`),n("span",{class:"line"},[n("span",null,"    !(this instanceof Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"  ) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    warn('Vue is a constructor and should be called with the `new` keyword')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  this._init(options)")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"initMixin(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"stateMixin(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"eventsMixin(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"lifecycleMixin(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"renderMixin(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"export default Vue")]),e(`
`),n("span",{class:"line"},[n("span",null,"./init.js")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src/core/index.js")]),e(`
`),n("span",{class:"line"},[n("span",null,"import Vue from './instance/index'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { initGlobalAPI } from './global-api/index'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { isServerRendering } from 'core/util/env'")]),e(`
`),n("span",{class:"line"},[n("span",null,"import { FunctionalRenderContext } from 'core/vdom/create-functional-component'")]),e(`
`),n("span",{class:"line"},[n("span",null,"initGlobalAPI(Vue)")]),e(`
`),n("span",{class:"line"},[n("span",null,"Object.defineProperty(Vue.prototype, '$isServer', {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  get: isServerRendering")]),e(`
`),n("span",{class:"line"},[n("span",null,"})")]),e(`
`),n("span",{class:"line"},[n("span",null,"Object.defineProperty(Vue.prototype, '$ssrContext', {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  get () {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    /* istanbul ignore next */")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return this.$vnode && this.$vnode.ssrContext")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"})")]),e(`
`),n("span",{class:"line"},[n("span",null,"// expose FunctionalRenderContext for ssr runtime helper installation")]),e(`
`),n("span",{class:"line"},[n("span",null,"Object.defineProperty(Vue, 'FunctionalRenderContext', {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  value: FunctionalRenderContext")]),e(`
`),n("span",{class:"line"},[n("span",null,"})")]),e(`
`),n("span",{class:"line"},[n("span",null,"Vue.version = '__VERSION__'")]),e(`
`),n("span",{class:"line"},[n("span",null,"export default Vue")])])])])],-1)])])}const x=s(t,[["render",p]]);export{h as __pageData,x as default};
