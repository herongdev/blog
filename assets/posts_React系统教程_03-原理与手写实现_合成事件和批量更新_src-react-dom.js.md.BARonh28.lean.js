import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const O=JSON.parse('{"title":"src-react-dom.js","description":"围绕“src-react-dom.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-react-dom.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-react-dom.js”整理的概念、示例与实践笔记。","sidebarWeight":61,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/合成事件和批量更新 /src-react-dom.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-react-dom.js.md","filePath":"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-react-dom.js.md"}'),c={name:"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-react-dom.js.md"};function o(i,l,t,r,d,u){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-react-dom-js",tabindex:"-1"},[s("src-react-dom.js "),n("a",{class:"header-anchor",href:"#src-react-dom-js","aria-label":'Permalink to "src-react-dom.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { REACT_TEXT } from "./constants";')]),s(`
`),n("span",{class:"line"},[n("span",null,"import { addEvent } from './event';")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 把虚拟DOM变成真实DOM插入到容器内部")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} vdom 虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} container 容器")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, container) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mount(vdom, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function mount(vdom, parentDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (newDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    parentDOM.appendChild(newDOM)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 把虚拟DOM转成真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!vdom) return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let dom;//真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (type === REACT_TEXT) {//如果这个元素是一个文本的话")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createTextNode(props.content);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof type === 'function') {//如果类型是一个函数的话")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (type.isReactComponent) {//说明它是一个类组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return mountClassComponent(vdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return mountFunctionComponent(vdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createElement(type);// div span p")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //处理属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(dom, {}, props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (props.children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let children = props.children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof children === 'object' && children.type) {//说明这是一个React元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"        mount(children, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else if (Array.isArray(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        reconcileChildren(props.children, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  vdom.dom = dom;//让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function mountClassComponent(vdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let { type: ClassComponent, props } = vdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let classInstance = new ClassComponent(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = classInstance.render();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function mountFunctionComponent(vdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = type(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function reconcileChildren(childrenVdom, parentDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  childrenVdom.forEach(childVdom => mount(childVdom, parentDOM));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 把新的属性更新到真实DOM上")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} dom 真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldProps 旧的属性对象")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newProps 新的属性对象")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (key === 'children') {//children")]),s(`
`),n("span",{class:"line"},[n("span",null,"      continue;//此处忽略子节点的处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (key === 'style') {//style")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let styleObj = newProps[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (let attr in styleObj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        dom.style[attr] = styleObj[attr];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } ==else== ==if== ==(====key====.====startsWith====(===='on'====)) {==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==//dom[key.toLocaleLowerCase()] = newProps[key];==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==addEvent====(====dom====,== ==key====.====toLocaleLowerCase====(),== ==newProps====[====key====]);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];//className")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function findDOM(vdom) {// TODO findDOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!vdom) return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (vdom.dom) {//vdom={type:'h1'}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return vdom.dom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //类组件 还是函数组件，他们虚拟DOM身上没有dom属性，但是oldRenderVdom")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return findDOM(vdom.oldRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * dom-diff核心是比较新旧虚拟DOM的差异，然后把差异同步到真实DOM节点上")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function compareTwoVdom(parentDOM, oldVdom, newVdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let oldDOM = findDOM(oldVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //根据新的虚拟DOM得到新的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //把老的真实DOM替换为新的真实DOM replaceChild 原生的DOM操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"  parentDOM.replaceChild(newDOM, oldDOM);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const ReactDOM = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const f=a(c,[["render",o]]);export{O as __pageData,f as default};
