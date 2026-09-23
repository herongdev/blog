import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"实现类组件","description":"类组件实现和函数组件类似； 我们会在 createDOM 时新加一个判断； 然后调用 mountClassComponent 方法； 新建 c 新加的判断 主要做以下几件事件： 创建类实例 调用类实例的 render 方法来生成 renderVdom; 同样，将生成的 rende。","frontmatter":{"title":"实现类组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"类组件实现和函数组件类似； 我们会在 createDOM 时新加一个判断； 然后调用 mountClassComponent 方法； 新建 c 新加的判断 主要做以下几件事件： 创建类实例 调用类实例的 render 方法来生成 renderVdom; 同样，将生成的 rende。","sidebarWeight":66,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/实现类组件.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/实现类组件.md","filePath":"posts/React系统教程/03-原理与手写实现/实现类组件.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/实现类组件.md"};function c(t,s,o,u,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实现类组件",tabindex:"-1"},[l("实现类组件 "),n("a",{class:"header-anchor",href:"#实现类组件","aria-label":'Permalink to "实现类组件"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“实现类组件”的核心思路，并能把它用于实际开发或面试表达。 类组件实现和函数组件类似； 我们会在"),n("code",null,"createDOM"),l("时新加一个判断； 然后调用"),n("code",null,"mountClassComponent"),l("==方法；==")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import React from "./react";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import ReactDOM from "./react-dom";')]),l(`
`),n("span",{class:"line"},[n("span",null,"class ClassComponent extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),l(`
`),n("span",{class:"line"},[n("span",null,'        className="title"')]),l(`
`),n("span",{class:"line"},[n("span",null,"        style={{ color: 'red' }}")]),l(`
`),n("span",{class:"line"},[n("span",null,"      >")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <span>{this.props.name}</span>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        {this.props.children}")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,'let element = <ClassComponent name="hello">world</ClassComponent>;')]),l(`
`),n("span",{class:"line"},[n("span",null,'ReactDOM.render(element, document.getElementById("root"));')])])])]),n("p",null,[n("strong",null,"新建")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\component.js")]),l(`
`),n("span",{class:"line"},[n("span",null,"export class Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  static isReactComponent = true")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.props = props;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import { wrapToVdom } from "./utils";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import { wrapToVdom } from "./utils";')]),l(`
`),n("span",{class:"line"},[n("span",null,"import { Component } from './")])])])]),n("p",null,"==c=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"omponent';")]),l(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let ref;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (config) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__source;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    delete config.__self;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ref = config.ref;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    delete config.ref;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    key = config.key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    delete config.key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let props = { ...config };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (arguments.length > 3) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    props.children = Array.prototype")]),l(`
`),n("span",{class:"line"},[n("span",null,"      .slice.call(arguments, 2)")]),l(`
`),n("span",{class:"line"},[n("span",null,"      .map(wrapToVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    props.children = wrapToVdom(children);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    type,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ref,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    key,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    props,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const React = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  createElement,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Component")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default React;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-dom.js")]),l(`
`),n("span",{class:"line"},[n("span",null,'import { REACT_TEXT } from "./constants";')]),l(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  mount(vdom, container);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function mount(vdom, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  container.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"新加的判断"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (type === REACT_TEXT) {")]),l(`
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
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"主要做以下几件事件："),n("ul",null,[n("li",null,"创建类实例"),n("li",null,[l("调用类实例的"),n("code",null,"render"),l("方法来生成"),n("code",null,"renderVdom;")]),n("li",null,[l("同样，将生成的"),n("code",null,"renderVdom"),l("以"),n("code",null,"oldRenderVdom"),l("的属性名挂靠到类组件本身的"),n("code",null,"vdom"),l("上去；")]),n("li",null,[l("使用生成的"),n("code",null,"renderVdom"),l("创建真实"),n("code",null,"dom"),l("，并返回；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function mountClassComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let classInstance = new type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = classInstance.render();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
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
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const g=a(i,[["render",c]]);export{h as __pageData,g as default};
