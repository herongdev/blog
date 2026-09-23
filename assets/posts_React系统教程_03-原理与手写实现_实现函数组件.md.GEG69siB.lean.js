import{_ as s,o as a,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"实现函数组件","description":"由于函数组件是通过函数声明或表达式声明的，又加上名字为大写的约定，所以 babel 在分析 jsx 时，就会将 type 值设置为这个变量所代表函数，这时 typeof 这个变量肯定是函数； 修改 在 createDOM 的时候多加一个判断，即 type 为 function 时。","frontmatter":{"title":"实现函数组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"由于函数组件是通过函数声明或表达式声明的，又加上名字为大写的约定，所以 babel 在分析 jsx 时，就会将 type 值设置为这个变量所代表函数，这时 typeof 这个变量肯定是函数； 修改 在 createDOM 的时候多加一个判断，即 type 为 function 时。","sidebarWeight":65,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/实现函数组件.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/实现函数组件.md","filePath":"posts/React系统教程/03-原理与手写实现/实现函数组件.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/实现函数组件.md"};function o(c,e,i,d,u,r){return a(),p("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"实现函数组件",tabindex:"-1"},[l("实现函数组件 "),n("a",{class:"header-anchor",href:"#实现函数组件","aria-label":'Permalink to "实现函数组件"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现函数组件”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import React from "./react";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import ReactDOM from "./react-dom";')]),l(`
`),n("span",{class:"line"},[n("span",null,"function FunctionComponent(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <div")]),l(`
`),n("span",{class:"line"},[n("span",null,'      className="title"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      style={{ color: 'red' }}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <span>{props.name}</span>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      {props.children}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  );")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,'let element = <FunctionComponent name="hello">world</FunctionComponent>;')]),l(`
`),n("span",{class:"line"},[n("span",null,'ReactDOM.render(element, document.getElementById("root"));')])])])]),n("p",null,[l("由于函数组件是通过函数声明或表达式声明的，又加上名字为大写的约定，所以"),n("code",null,"babel"),l("在分析"),n("code",null,"jsx"),l("时，就会将"),n("code",null,"type"),l("值设置为这个变量所代表函数，这时"),n("code",null,"typeof"),l("这个变量肯定是函数； "),n("strong",null,"修改")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-dom.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import { REACT_TEXT } from "./constants";')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function render(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  mount(vdom, container);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function mount(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  container.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("在"),n("code",null,"createDOM"),l("的时候多加一个判断，即"),n("code",null,"type"),l("为"),n("code",null,"function"),l("时，进行特殊处理 /**")]),n("ul",null,[n("li",null,"把虚拟DOM转成真实DOM */ export function createDOM(vdom) { if (!vdom) return null; let { type, props } = vdom; let dom;//真实DOM if (type === REACT_TEXT) {//如果这个元素是一个文本的话 dom = document.createTextNode(props.content); } ==else== ==if== ==(====typeof== ==type== ======= =='function'====) {====//====如果类型是一个函数的话== ==if== ==(====type====.====isReactComponent====) {====//====说明它是一个类组件== ==return== ==mountClassComponent====(====vdom====);== ==}== ==else== =={== ==return== ==mountFunctionComponent====(====vdom====);== ==}== ==}== else { dom = document.createElement(type);// div span p } //处理属性 if (props) { updateProps(dom, {}, props); if (props.children) { let children = props.children; if (typeof children === 'object' && children.type) {//说明这是一个React元素 mount(children, dom); } else if (Array.isArray(children)) { reconcileChildren(props.children, dom); } } } vdom.dom = dom;//让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM return dom; }")]),n("p",null,"主要是做以下事件："),n("ul",null,[n("li",null,[l("调用函数，并传入"),n("code",null,"props"),l("值，这样取得函数的返回值；")]),n("li",null,[l("这个函数的返回值就是函数组件的"),n("code",null,"vdom"),l("；")]),n("li",null,[l("将"),n("code",null,"vdom"),l("以属性名"),n("code",null,"oldRenderVdom"),l("挂靠到函数组件自身的"),n("code",null,"vdom"),l("上；")]),n("li",null,[l("使用函数组件返回的"),n("code",null,"renderVdom"),l("创建真实"),n("code",null,"dom"),l("，并将其返回；")]),n("li",null,[l("这个返回的"),n("code",null,"dom"),l("会被挂载到父"),n("code",null,"dom"),l("下；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function mountFunctionComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    if (key === "children") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      continue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,'    if (key === "style") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      let style = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      for (let attr in style) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.style[attr] = style[attr];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function reconcileChildren(childrenVdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < childrenVdom.length; i) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let childVdom = childrenVdom[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    mount(childVdom, parentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const ReactDOM = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render,")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const f=s(t,[["render",o]]);export{h as __pageData,f as default};
