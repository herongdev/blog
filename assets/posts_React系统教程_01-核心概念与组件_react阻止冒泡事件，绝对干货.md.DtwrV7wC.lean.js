import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"react阻止冒泡事件，绝对干货","description":"\\\\ 来自。","frontmatter":{"title":"react阻止冒泡事件，绝对干货","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"\\\\ 来自。","sidebarWeight":48,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/react阻止冒泡事件，绝对干货.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/react阻止冒泡事件，绝对干货.md","filePath":"posts/React系统教程/01-核心概念与组件/react阻止冒泡事件，绝对干货.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/react阻止冒泡事件，绝对干货.md"};function c(i,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"react阻止冒泡事件-绝对干货",tabindex:"-1"},[s("react阻止冒泡事件，绝对干货 "),n("a",{class:"header-anchor",href:"#react阻止冒泡事件-绝对干货","aria-label":'Permalink to "react阻止冒泡事件，绝对干货"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“react阻止冒泡事件，绝对干货”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"首先，要知道再react中的合成事件和原生事件之间的区别。")]),s(`
`),n("span",{class:"line"},[n("span",null,"1、合成事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"在jsx中直接绑定的事件，如")]),s(`
`),n("span",{class:"line"},[n("span",null,'<a ref="aaa" onClick={(e)=>this.handleClick(e)}>更新</a>')]),s(`
`),n("span",{class:"line"},[n("span",null,"这里的handleClick事件就是合成事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"2、原生事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过js原生代码绑定的事件，如")]),s(`
`),n("span",{class:"line"},[n("span",null,"document.body.addEventListener('click', e => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 通过e.target判断阻止冒泡")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (e.target && e.target.matches('a')) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('body');")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 或")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.refs.update.addEventListener('click', e => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('update');")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"3、阻止冒泡事件分三种情况")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、阻止合成事件间的冒泡，用e.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM, { findDOMNode } from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            count: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 阻止合成事件间的冒泡")]),s(`
`),n("span",{class:"line"},[n("span",null,"        e.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ count: ++this.state.count });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    testClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log('test')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <div ref="test" onClick={() => this.testClick()}>')]),s(`
`),n("span",{class:"line"},[n("span",null,"                <p>{this.state.count}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>')]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var div1 = document.getElementById('content');")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Counter />, div1, () => { });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"B、阻止原生事件与最外层document上的事件间的冒泡，用")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.nativeEvent.stopImmediatePropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM, { findDOMNode } from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            count: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 阻止原生事件与最外层document上的事件间的冒泡")]),s(`
`),n("span",{class:"line"},[n("span",null,"        e.nativeEvent.stopImmediatePropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ count: ++this.state.count });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <div ref="test">')]),s(`
`),n("span",{class:"line"},[n("span",null,"                <p>{this.state.count}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>')]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        document.addEventListener('click', () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            console.log('document');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var div1 = document.getElementById('content');")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Counter />, div1, () => { });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"C、阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM, { findDOMNode } from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            count: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ count: ++this.state.count });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <div ref="test">')]),s(`
`),n("span",{class:"line"},[n("span",null,"                <p>{this.state.count}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>')]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        document.body.addEventListener('click', e => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // 通过e.target判断阻止冒泡")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (e.target && e.target.matches('a')) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            console.log('body');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var div1 = document.getElementById('content');")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Counter />, div1, () => { });")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://www.jianshu.com/p/e0894bd588f4>")])])])])],-1)])])}const g=a(t,[["render",c]]);export{m as __pageData,g as default};
