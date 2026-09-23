import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const R=JSON.parse('{"title":"src-react.js","description":"围绕“src-react.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-react.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-react.js”整理的概念、示例与实践笔记。","sidebarWeight":41,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Context(上下文)/src-react.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react.js.md","filePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react.js.md"}'),c={name:"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react.js.md"};function t(i,l,r,u,o,f){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-react-js",tabindex:"-1"},[s("src-react.js "),n("a",{class:"header-anchor",href:"#src-react-js","aria-label":'Permalink to "src-react.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-react.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { wrapToVdom } from './utils';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Component from './Component';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_FRAGMENT, REACT_PROVIDER, REACT_CONTEXT } from './constants';")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * createElement('h1',null,'a','b');")]),s(`
`),n("span",{class:"line"},[n("span",null," * 创建一个虚拟DOM，也就是一个React元素")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} type  元素的类型span div p")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} config 配置对象 className style")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} children  儿子，有可能独生子(对象)，也可能是多个(数组)")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以通过 ref引用此元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以唯一标识一个子元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__source;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__self;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ref = config.ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key = config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // props里没有ref属性的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    delete config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //props里没有key的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let props = { ...config };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (arguments.length > 3) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // children可能是React元素对象，也可能是一个字符串 数字 null undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = wrapToVdom(children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_ELEMENT,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ref,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createRef() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return { current: null };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function forwardRef(render) {//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_FORWARD_REF,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 函数组件:如TextInput(props, forwardRef)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"==function== ==createContext====()== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==let== ==context== ===== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==$$typeof:== ==REACT_CONTEXT====,==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==_currentValue:== ==null==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==};==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==context====.====Provider== ===== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==$$typeof:== ==REACT_PROVIDER====,==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==_context:== ==context==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==context====.====Consumer== ===== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==$$typeof:== ==REACT_CONTEXT====,==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==_context:== ==context==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==return== ==context====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"const React = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createElement,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Component,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createRef,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  forwardRef,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Fragment: REACT_FRAGMENT,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React;")])])])])],-1)])])}const m=a(c,[["render",t]]);export{R as __pageData,m as default};
