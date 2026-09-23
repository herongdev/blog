import{_ as e,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"context","description":"context 的用法 react 是单向数据流，我们想传递数据需要一层层向下传递，数据传递变得非常麻烦 , 我们可以用 context 实现数据的交互 1) 父 childContextTypes getChildContext 函数 2) 子 contextTypes App。","frontmatter":{"title":"context","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"context 的用法 react 是单向数据流，我们想传递数据需要一层层向下传递，数据传递变得非常麻烦 , 我们可以用 context 实现数据的交互 1) 父 childContextTypes getChildContext 函数 2) 子 contextTypes App。","sidebarWeight":100,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/状态改变/全局状态/context.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/全局状态/context.md","filePath":"posts/React系统教程/01-核心概念与组件/全局状态/context.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/全局状态/context.md"};function c(o,l,i,r,u,d){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"context",tabindex:"-1"},[s("context "),n("a",{class:"header-anchor",href:"#context","aria-label":'Permalink to "context"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“context”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"context****的用法"),s(" ==react====是单向数据流，我们想传递数据需要一层层向下传递，数据传递变得非常麻烦====,====我们可以用====context====实现数据的交互== ==1)== ==父== ==childContextTypes getChildContext====函数== ==2)== ==子== ==contextTypes== ==App |-> header -> title==")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**跨组件交互**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**//1****在父级上要定义上下文，先要标名上下文的类型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**//2****在父级中获取所有后代的上下文**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"==import== ==PropTypes== ==from== =='prop-types'==//类型验证")]),s(`
`),n("span",{class:"line"},[n("span",null,'import Header from "./Header";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class App extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.state = { color: 'red' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"static childContextTypes = { //定义子组件上下文的类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"color: PropTypes.string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"setColor: PropTypes.func")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"setColor = (color) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"color")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"getChildContext() { // 定义子组件上下文的数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"return { color: this.state.color, setColor: this.setColor }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Header />")]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Header extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"static contextTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"setColor: PropTypes.func")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button onClick={() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.context.setColor('green');")]),s(`
`),n("span",{class:"line"},[n("span",null,"}}>变绿</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Title />")]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Title extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"static contextTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"color: PropTypes.string")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() { // 通过context获取父组件定义的数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <div style={{ color: this.context.color }}>Title</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const C=e(p,[["render",c]]);export{h as __pageData,C as default};
