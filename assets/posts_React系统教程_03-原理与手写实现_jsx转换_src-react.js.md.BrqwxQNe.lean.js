import{_ as l,o as a,c,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"src-react.js","description":"主要是创建了一个 createElement 方法。","frontmatter":{"title":"src-react.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"主要是创建了一个 createElement 方法。","sidebarWeight":51,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/jsx转换/src-react.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/jsx转换/src-react.js.md","filePath":"posts/React系统教程/03-原理与手写实现/jsx转换/src-react.js.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/jsx转换/src-react.js.md"};function p(r,e,i,o,u,d){return a(),c("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"src-react-js",tabindex:"-1"},[s("src-react.js "),n("a",{class:"header-anchor",href:"#src-react-js","aria-label":'Permalink to "src-react.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-react.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("ul",null,[n("li",null,[s("主要是创建了一个"),n("code",null,"createElement"),s("方法；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { wrapToVdom } from './utils';")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * createElement('h1',null,'a','b');")]),s(`
`),n("span",{class:"line"},[n("span",null," * 创建一个虚拟DOM，也就是一个React元素")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} type  元素的类型span div p")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} config 配置对象 className style")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} children  儿子，有可能独生子(对象)，也可能是多个(数组)")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let ref;//可以通过 ref引用此元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let key;//可以唯一标识一个子元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__source;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__self;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ref = config.ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key = config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let props = { ...config };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (arguments.length > 3) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = wrapToVdom(children);//children可能是React元素对象，也可能是一个字符串 数字 null undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return { type, ref, key, props };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const React = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createElement,")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React;")])])])])],-1)])])}const g=l(t,[["render",p]]);export{m as __pageData,g as default};
