import{_ as e,o as a,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"vue源码","description":"这里有关键的一行，其实就是引入一个已经预处理的Vue构造函数； 从路径上来看，这是一个从运行时导出的Vue构造函数； 注意对 template 属性的判断 无 template 属性时。","frontmatter":{"title":"vue源码","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"这里有关键的一行，其实就是引入一个已经预处理的Vue构造函数； 从路径上来看，这是一个从运行时导出的Vue构造函数； 注意对 template 属性的判断 无 template 属性时。","sidebarWeight":66,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/初始化/vue源码.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/初始化/vue源码.md","filePath":"posts/Vue系统教程/05-原理与手写实现/初始化/vue源码.md"}'),i={name:"posts/Vue系统教程/05-原理与手写实现/初始化/vue源码.md"};function t(u,s,o,c,r,d){return a(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"vue源码",tabindex:"-1"},[l("vue源码 "),n("a",{class:"header-anchor",href:"#vue源码","aria-label":'Permalink to "vue源码"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“vue源码”的核心思路，并能把它用于实际开发或面试表达。 这里有关键的一行，其实就是引入一个已经预处理的Vue构造函数； 从路径上来看，这是一个从运行时导出的Vue构造函数；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import Vue from './runtime/index'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/* @flow */")]),l(`
`),n("span",{class:"line"},[n("span",null,"import config from 'core/config'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { warn, cached } from 'core/util/index'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { mark, measure } from 'core/util/perf'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import Vue from './runtime/index'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { query } from './util/index'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { compileToFunctions } from './compiler/index'")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'")]),l(`
`),n("span",{class:"line"},[n("span",null,"const idToTemplate = cached(id => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const el = query(id)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return el && el.innerHTML")]),l(`
`),n("span",{class:"line"},[n("span",null,"})")]),l(`
`),n("span",{class:"line"},[n("span",null,"const mount = Vue.prototype.$mount")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Vue.prototype.$mount = function (")]),l(`
`),n("span",{class:"line"},[n("span",null,"  el?: string | Element,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  hydrating?: boolean")]),l(`
`),n("span",{class:"line"},[n("span",null,"): Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  el = el && query(el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  /* istanbul ignore if */")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (el === document.body || el === document.documentElement) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    process.env.NODE_ENV !== 'production' && warn(")]),l(`
`),n("span",{class:"line"},[n("span",null,"      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`")]),l(`
`),n("span",{class:"line"},[n("span",null,"    )")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return this")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const options = this.$options")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // resolve template/el and convert to render function")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (!options.render) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let template = options.template")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (template) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("注意对"),n("code",null,"template"),l("属性的判断")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (typeof template === 'string') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (template.charAt(0) === '#') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          template = idToTemplate(template)")]),l(`
`),n("span",{class:"line"},[n("span",null,"          /* istanbul ignore if */")]),l(`
`),n("span",{class:"line"},[n("span",null,"          if (process.env.NODE_ENV !== 'production' && !template) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            warn(")]),l(`
`),n("span",{class:"line"},[n("span",null,"              `Template element not found or is empty: ${options.template}`,")]),l(`
`),n("span",{class:"line"},[n("span",null,"              this")]),l(`
`),n("span",{class:"line"},[n("span",null,"            )")]),l(`
`),n("span",{class:"line"},[n("span",null,"          }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else if (template.nodeType) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        template = template.innerHTML")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (process.env.NODE_ENV !== 'production') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          warn('invalid template option:' + template, this)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return this")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("无"),n("code",null,"template"),l("属性时")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (el) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      template = getOuterHTML(el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (template) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      /* istanbul ignore if */")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        mark('compile')")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      const { render, staticRenderFns } = compileToFunctions(template, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        outputSourceRange: process.env.NODE_ENV !== 'production',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        shouldDecodeNewlines,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        shouldDecodeNewlinesForHref,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        delimiters: options.delimiters,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        comments: options.comments")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }, this)")]),l(`
`),n("span",{class:"line"},[n("span",null,"      options.render = render")]),l(`
`),n("span",{class:"line"},[n("span",null,"      options.staticRenderFns = staticRenderFns")]),l(`
`),n("span",{class:"line"},[n("span",null,"      /* istanbul ignore if */")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        mark('compile end')")]),l(`
`),n("span",{class:"line"},[n("span",null,"        measure(`vue ${this._name} compile`, 'compile', 'compile end')")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return mount.call(this, el, hydrating)")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * Get outerHTML of elements, taking care")]),l(`
`),n("span",{class:"line"},[n("span",null," * of SVG elements in IE as well.")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function getOuterHTML (el: Element): string {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (el.outerHTML) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return el.outerHTML")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const container = document.createElement('div')")]),l(`
`),n("span",{class:"line"},[n("span",null,"    container.appendChild(el.cloneNode(true))")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return container.innerHTML")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Vue.compile = compileToFunctions")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default Vue")])])])])],-1)])])}const f=e(i,[["render",t]]);export{h as __pageData,f as default};
