import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"src-react-dom.js","description":"最主要方法是 render 方法； 引外还有： mount createDom 方法； 难点在 createDom 方法上； // 处理style。","frontmatter":{"title":"src-react-dom.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"最主要方法是 render 方法； 引外还有： mount createDom 方法； 难点在 createDom 方法上； // 处理style。","sidebarWeight":50,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/jsx转换/src-react-dom.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/jsx转换/src-react-dom.js.md","filePath":"posts/React系统教程/03-原理与手写实现/jsx转换/src-react-dom.js.md"}'),c={name:"posts/React系统教程/03-原理与手写实现/jsx转换/src-react-dom.js.md"};function t(i,s,o,r,u,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"src-react-dom-js",tabindex:"-1"},[l("src-react-dom.js "),n("a",{class:"header-anchor",href:"#src-react-dom-js","aria-label":'Permalink to "src-react-dom.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("ul",null,[n("li",null,[l("最主要方法是"),n("code",null,"render"),l("方法；")]),n("li",null,[l("引外还有： "),n("ul",null,[n("li",null,[n("code",null,"mount")]),n("li",null,[n("code",null,"createDom")])])])]),n("p",null,"方法；"),n("ul",null,[n("li",null,[l("难点在"),n("code",null,"createDom"),l("方法上；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { REACT_TEXT } from "./constants";')]),l(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  mount(vdom, container);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function mount(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  container.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 把虚拟DOM转成真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (!vdom) return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom;//真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (type === REACT_TEXT) {//如果这个元素是一个文本的话")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createTextNode(props.content);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createElement(type);// div span p")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //处理属性")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(dom, {}, props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"       // 处理children")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (props.children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let children = props.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof children === 'object' && children.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //说明这是一个React元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"        mount(children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else if (Array.isArray(children)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        reconcileChildren(props.children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.dom = dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    if (key === "children") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      continue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("p",null,"// 处理style"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'    if (key === "style") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      let style = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      for (let attr in style) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.style[attr] = style[attr];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function reconcileChildren(childrenVdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < childrenVdom.length; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let childVdom = childrenVdom[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    mount(childVdom, parentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const ReactDOM = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render,")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const v=a(c,[["render",t]]);export{h as __pageData,v as default};
