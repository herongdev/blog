import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"_render方法","description":"获取真实的元素 页面真实元素 模板编译 创建元素型的节点 创建文本的虚拟节点 描述虚拟节点是属于哪个实例的 中有所有的数据 返回虚拟节点 返回虚拟节点。","frontmatter":{"title":"_render方法","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"获取真实的元素 页面真实元素 模板编译 创建元素型的节点 创建文本的虚拟节点 描述虚拟节点是属于哪个实例的 中有所有的数据 返回虚拟节点 返回虚拟节点。","sidebarWeight":68,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/将数据渲染到页面/_render方法.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/将数据渲染到页面/_render方法.md","filePath":"posts/Vue系统教程/05-原理与手写实现/将数据渲染到页面/_render方法.md"}'),p={name:"posts/Vue系统教程/05-原理与手写实现/将数据渲染到页面/_render方法.md"};function i(c,e,u,o,d,r){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"render方法",tabindex:"-1"},[s("_render方法 "),n("a",{class:"header-anchor",href:"#render方法","aria-label":'Permalink to "_render方法"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“_render方法”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Vue.prototype.$mount = function (el) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const vm = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const opts = vm.$options;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  el = document.querySelector(el); //")])])])]),n("p",null,"获取真实的元素"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  vm.$el = el; //")])])])]),n("p",null,"页面真实元素"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (!opts.render) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"模板编译"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    let template = opts.template;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!template) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      template = el.outerHTML;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let render = compileToFunction(template)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    opts.render = render;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mountComponent(vm)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { isObject } from "./utils"')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { createElement, createText } from "./vdom"')]),s(`
`),n("span",{class:"line"},[n("span",null,"export function renderMixin(Vue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Vue.prototype._c = function () { // createElement")])])])]),n("p",null,"创建元素型的节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        const vm = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return createElement(vm, ...arguments)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Vue.prototype._v = function (text) { //")])])])]),n("p",null,"创建文本的虚拟节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        const vm = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return createText(vm, text); //")])])])]),n("p",null,"描述虚拟节点是属于哪个实例的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Vue.prototype._s = function (val) { // JSON.stingfiy()")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (isObject(val)) return JSON.stringify(val);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return val;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Vue.prototype._render = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const vm = this; // vm")])])])]),n("p",null,"中有所有的数据"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," vm.xxx => vm._data.xxx")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let { render } = vm.$options;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let vnode = render.call(vm);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return vnode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function createElement(vm, tag, data = {}, ...children) { //")])])])]),n("p",null,"返回虚拟节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," _c('',{}....)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return vnode(vm, tag, data, children, data.key, undefined)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function createText(vm, text) { //")])])])]),n("p",null,"返回虚拟节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    return vnode(vm, undefined, undefined, undefined, undefined, text)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function vnode(vm, tag, data, children, key, text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        vm,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        tag,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        data,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        children,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        key,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        text,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=l(p,[["render",i]]);export{v as __pageData,g as default};
