import{_ as e,o as a,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"ref实现","description":"创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 可能是 React 元素对象，也可能是一个字符串 数字 React父组件调用子组件的方法。","frontmatter":{"title":"ref实现","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 可能是 React 元素对象，也可能是一个字符串 数字 React父组件调用子组件的方法。","sidebarWeight":27,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/7.ref /ref实现.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/7.ref/ref实现.md","filePath":"posts/React系统教程/03-原理与手写实现/7.ref/ref实现.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/7.ref/ref实现.md"};function c(i,s,o,r,u,d){return a(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"ref实现",tabindex:"-1"},[l("ref实现 "),n("a",{class:"header-anchor",href:"#ref实现","aria-label":'Permalink to "ref实现"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“ref实现”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\constants.js")]),l(`
`),n("span",{class:"line"},[n("span",null,"export const REACT_TEXT = Symbol('REACT_TEXT');")]),l(`
`),n("span",{class:"line"},[n("span",null,"export const REACT_FORWARD_REF_TYPE = Symbol('react.forward_ref');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import { wrapToVdom } from "./utils";')]),l(`
`),n("span",{class:"line"},[n("span",null,"import { Component } from './Component';")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * createElement('h1',null,'a','b');")]),l(`
`),n("span",{class:"line"},[n("span",null," *")])])])]),n("p",null,[l("创建一个虚拟"),n("code",null,"DOM"),l("，也就是一个"),n("code",null,"React"),l("元素")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," * @param {*} type")])])])]),n("p",null,"元素的类型"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"span div p")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} config")])])])]),n("p",null,"配置对象"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," className style")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} children")])])])]),n("p",null,[l("儿子，有可能独生子"),n("code",null,"("),l("对象"),n("code",null,")"),l("，也可能是多个"),n("code",null,"("),l("数组")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,")")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let ref;//")])])])]),n("p",null,[l("可以通过 "),n("code",null,"ref"),l("引用此元素")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    let key;//")])])])]),n("p",null,"可以唯一标识一个子元素"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (config) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        delete config.__source;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        delete config.__self;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ref = config.ref;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        key = config.key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        delete config.ref;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        delete config.key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let props = { ...config };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (arguments.length > 3) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props.children = wrapToVdom(children);//children")])])])]),n("p",null,[l("可能是"),n("code",null,"React"),l("元素对象，也可能是一个字符串 数字")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," null undefined")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return { type, ref, key, props };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function createRef() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return { current: null };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function forwardRef(render) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var elementType = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_FORWARD_REF_TYPE,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render: render")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return elementType;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const React = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  createElement,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Component,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  createRef")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default React;")]),l(`
`),n("span",{class:"line"},[n("span",null,"src\\react-dom.js")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from './constants';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { addEvent } from './event';")]),l(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  mount(vdom, container);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function mount(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  container.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return mountForwardComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (type === REACT_TEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createTextNode(props.content);")]),l(`
`),n("span",{class:"line"},[n("span",null,'  } else if (typeof type === "function") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (type.isReactComponent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return mountClassComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return mountFunctionComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createElement(type);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(dom, {}, props);")]),l(`
`),n("span",{class:"line"},[n("span",null,'    if (typeof props.children == "object" && props.children.type) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      mount(props.children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (Array.isArray(props.children)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      reconcileChildren(props.children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.dom = dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ref) ref.current = dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountForwardComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = type.render(props, ref);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountClassComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let classInstance = new type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ref) ref.current = classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = classInstance.render();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom = createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountFunctionComponent(vdom) {")]),l(`
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
`),n("span",{class:"line"},[n("span",null,'    } else if (key.startsWith("on")) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function findDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof type === 'function') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = findDOM(vdom.oldRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = vdom.dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function compareTwoVdom(parentDOM, oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let oldDOM = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  parentDOM.replaceChild(newDOM, oldDOM);")]),l(`
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
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])]),n("p",null,[n("strong",null,"React父组件调用子组件的方法")]),n("p",null,[n("strong",null,"前言"),l(" 在React中，我们经常在子组件中调用父组件的方法，一般用props回调即可。但是有时候也需要在父组件中调用子组件的方法，通过这种方法实现高内聚。有多种方法，请按需服用。 "),n("strong",null,"类组件中"),n("strong",null,"React.createRef()")]),n("ul",null,[n("li",null,"优点：通俗易懂，用ref指向。"),n("li",null,"缺点：使用了HOC的子组件不可用，无法指向真是子组件比如一些常用的写法，mobx的@observer包裹的子组件就不适用此方法。")]),n("p",null,"==import React, { Component } from 'react';====== ==class Sub extends Component {====== ==callback() {====== ==console.log('====执行回调====');====== ==}====== ==render() {====== ==return <div>====子组件====</div>;====== ==}========}====== ==class Super extends Component {====== ==constructor(props) {====== ==super(props);====== ==this.sub = React.createRef();====== ==}====== ==handleOnClick() {====== ==this.sub.callback();====== ==}====== ==render() {====== ==return (====== ==<div>====== ==<Sub ref={this.sub}></Sub>====== ==</div>====== ==);====== ==}========}======"),n("ul",null,[n("li",null,"优点：ref写法简洁"),n("li",null,"缺点：使用了HOC的子组件不可用，无法指向真是子组件（同上）")]),n("p",null,"使用方法和上述的一样，就是定义ref的方式不同。 ==...====== ==<Sub ref={ref => this.sub = ref}></Sub>====== ==...======"),n("ul",null,[n("li",null,"优点：假如子组件是嵌套了HOC，也可以指向真实子组件。"),n("li",null,"缺点：需要自定义props属性")]),n("p",null,[l(`==import React, { Component } from 'react';========import { observer } from 'mobx-react'====== ==@observer========class Sub extends Component {====== ==componentDidMount(){====== ==//== ==将子组件指向父组件的变量====== ==this.props.onRef && this.props.onRef(this);====== ==}====== ==callback(){====== ==console.log("====执行我====")====== ==}====== ==render(){====== ==return (<div>====子组件====</div>);====== ==}========}====== ==class Super extends Component {====== ==handleOnClick(){====== ==//== ==可以调用子组件方法====== ==this.Sub.callback();====== ==}====== ==render(){====== ==return (====== ==<div>====== ==<div onClick={this.handleOnClick}>click</div>====== ==<Sub onRef={ node => this.Sub = node }></Sub>== ==== ==</div>)====== ==}========}====== `),n("strong",null,"函数组件、Hook组件")]),n("ul",null,[n("li",null,[n("p",null,"优点："),n("ul",null,[n("li",null,"缺点：")]),n("p",null,[l("1、需要自定义props属性 2、需要自定义暴露的方法 ==import React, { useImperativeHandle } from 'react';========import { observer } from 'mobx-react'====== ==const Parent = () => {====== ==let ChildRef = React.createRef();====== ==function handleOnClick() {====== ==ChildRef.current.func();====== ==}====== ==return (====== ==<div>====== ==<button onClick={handleOnClick}>click</button>====== ==<Child onRef={ChildRef} />====== ==</div>====== ==);========};====== ==const Child = observer(props => {====== ==//====用====useImperativeHandle====暴露一些外部====ref====能访问的属性====== ==useImperativeHandle(props.onRef, () => {====== ==//== ==需要将暴露的接口返回出去====== ==return {====== ==func: func,====== ==};====== ==});====== ==function func() {====== ==console.log('====执行我====');====== ==}====== ==return <div>====子组件====</div>;========});====== ==export default Parent;====== "),n("strong",null,"forwardRef"),l(` 使用forwardRef抛出子组件的ref 这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。 ==import React, { useRef, useImperativeHandle } from 'react';========import ReactDOM from 'react-dom';========import { observer } from 'mobx-react'====== ==const FancyInput = React.forwardRef((props, ref) => {====== ==const inputRef = useRef();====== ==useImperativeHandle(ref, () => ({====== ==focus: () => {====== ==inputRef.current.focus();====== ==}====== ==}));====== ==return <input ref={inputRef} type="text" />========});====== ==const Sub = observer(FancyInput)====== ==const App = props => {====== ==const fancyInputRef = useRef();====== ==return (====== ==<div>====== ==<FancyInput ref={fancyInputRef} />====== ==<button====== ==onClick={() => fancyInputRef.current.focus()}====== ==>====父组件调用子组件的== ==focus</button>====== ==</div>====== ==)========}====== ==export default App;====== `),n("strong",null,"总结")]),n("ul",null,[n("li",null,"子组件无HOC嵌套：推荐使用ref直接调用"),n("li",null,"有HOC嵌套：推荐使用自定义props的方式")])])]),n("p",null,[n("strong",null,"ref的函数式声明"),n("strong",null,"使用props自定义onRef属性"),n("strong",null,"useImperativeHandle"),l(" 1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件 父组件调子组件函数有两种情况")])],-1)])])}const h=e(t,[["render",c]]);export{f as __pageData,h as default};
