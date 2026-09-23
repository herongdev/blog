import{_ as a,o as e,c as p,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"(5)子组件向父组件通信","description":"父组件传递值为函数的 props 给子组件，子组件通过调用该函数向父组件通信。 事件冒泡：子组件触发一个事件，并带上数据，父组件捕获这个事件，在事件回调函数中获得数据。 演示代码： 一、使用函数 ： 我们通信把 点击我 ： 二、事件冒泡 事件冒泡并非 React 的概念，而是浏览。","frontmatter":{"title":"(5)子组件向父组件通信","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"父组件传递值为函数的 props 给子组件，子组件通过调用该函数向父组件通信。 事件冒泡：子组件触发一个事件，并带上数据，父组件捕获这个事件，在事件回调函数中获得数据。 演示代码： 一、使用函数 ： 我们通信把 点击我 ： 二、事件冒泡 事件冒泡并非 React 的概念，而是浏览。","sidebarWeight":111,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/数据流/组件通信/(5)子组件向父组件通信.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)子组件向父组件通信.md","filePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)子组件向父组件通信.md"}'),t={name:"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)子组件向父组件通信.md"};function i(c,s,u,o,d,r){return e(),p("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"_5-子组件向父组件通信",tabindex:"-1"},[n("(5)子组件向父组件通信 "),l("a",{class:"header-anchor",href:"#_5-子组件向父组件通信","aria-label":'Permalink to "(5)子组件向父组件通信"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“(5)子组件向父组件通信”的核心思路，并能把它用于实际开发或面试表达。")]),l("blockquote",null,[l("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),l("ul",null,[l("li",null,[n("父组件传递值为函数的 "),l("code",null,"props"),n(" 给子组件，子组件通过调用该函数向父组件通信。")]),l("li",null,"事件冒泡：子组件触发一个事件，并带上数据，父组件捕获这个事件，在事件回调函数中获得数据。")]),l("p",null,"演示代码： 一、使用函数"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"props")]),n(`
`),l("span",{class:"line"},[l("span",null,"// SubComponent.js")])])])]),l("p",null,"："),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'import React from "react";')]),n(`
`),l("span",{class:"line"},[l("span",null,"const Sub = (props) => {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    const cb = (msg) => {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        return () => {")]),n(`
`),l("span",{class:"line"},[l("span",null,"            props.callback(msg)")]),n(`
`),l("span",{class:"line"},[l("span",null,"        }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return (")]),n(`
`),l("span",{class:"line"},[l("span",null,"        <div>")]),n(`
`),l("span",{class:"line"},[l("span",null,'            <button onClick={cb("')])])])]),l("p",null,"我们通信把"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'")}>')])])])]),l("p",null,"点击我"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</button>")]),n(`
`),l("span",{class:"line"},[l("span",null,"        </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"    )")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default Sub;")]),n(`
`),l("span",{class:"line"},[l("span",null,"// App.js")])])])]),l("p",null,"："),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'import React, { Component } from "react";')]),n(`
`),l("span",{class:"line"},[l("span",null,'import Sub from "./SubComponent.js";')]),n(`
`),l("span",{class:"line"},[l("span",null,'import "./App.css";')]),n(`
`),l("span",{class:"line"},[l("span",null,"export default class App extends Component {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    callback(msg) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        console.log(msg);")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    render() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        return (")]),n(`
`),l("span",{class:"line"},[l("span",null,"            <div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"                <Sub callback={this.callback.bind(this)} />")]),n(`
`),l("span",{class:"line"},[l("span",null,"            </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"        )")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("二、事件冒泡 事件冒泡并非 "),l("code",null,"React"),n(" 的概念，而是浏览器中 "),l("code",null,"DOM"),n(" 的事件机制。 和回调函数类似，它也可以把数据从子组件发送到父组件。 当你想在父组件中捕获来自子组件中的 "),l("code",null,"DOM"),n(" 事件时，可以采用此方法。")])],-1)])])}const g=a(t,[["render",i]]);export{b as __pageData,g as default};
