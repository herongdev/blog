import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"(5)非嵌套组件间通信","description":"非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式： 利用二者共同父组件的 context 对象进行通信 使用自定义事件的方式 全局变量 第一种：如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的。","frontmatter":{"title":"(5)非嵌套组件间通信","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式： 利用二者共同父组件的 context 对象进行通信 使用自定义事件的方式 全局变量 第一种：如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的。","sidebarWeight":115,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/数据流/组件通信/(5)非嵌套组件间通信.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)非嵌套组件间通信.md","filePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)非嵌套组件间通信.md"}'),t={name:"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)非嵌套组件间通信.md"};function i(c,s,u,o,d,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"_5-非嵌套组件间通信",tabindex:"-1"},[l("(5)非嵌套组件间通信 "),n("a",{class:"header-anchor",href:"#_5-非嵌套组件间通信","aria-label":'Permalink to "(5)非嵌套组件间通信"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“(5)非嵌套组件间通信”的核心思路，并能把它用于实际开发或面试表达。 非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式：")]),n("ul",null,[n("li",null,[l("利用二者共同父组件的 "),n("code",null,"context"),l(" 对象进行通信")]),n("li",null,"使用自定义事件的方式"),n("li",null,"全局变量")]),n("p",null,[l("第一种：如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的耦合度，如果组件层次较深的话，找到二者公共的父组件不是一件容易的事，当然还是那句话，也不是不可以"),n("code",null,"...")]),n("p",null,[l("第二种：这里我们采用自定义事件的方式来实现非嵌套组件间的通信。 我们需要使用一个 "),n("code",null,"events"),l(" 包： "),n("code",null,"npm install events --save"),l(" 新建一个 "),n("code",null,"ev.js"),l("，引入 "),n("code",null,"events"),l(" 包，并向外提供一个事件对象，供通信时使用：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { EventEmitter } from "events";')]),l(`
`),n("span",{class:"line"},[n("span",null,"export default new EventEmitter();")]),l(`
`),n("span",{class:"line"},[n("span",null,"// App.js")])])])]),n("p",null,"："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,'import Foo from "./Foo";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import Boo from "./Boo";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import "./App.css";')]),l(`
`),n("span",{class:"line"},[n("span",null,"export default class App extends Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <Foo />")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <Boo />")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// Foo.js")])])])]),n("p",null,"："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import React, { Component } from "react";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import emitter from "./ev"')]),l(`
`),n("span",{class:"line"},[n("span",null,"export default class Foo extends Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      msg: null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"声明一个自定义事件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"在组件装载完成以后"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'    this.eventEmitter = emitter.addListener("callMe", (msg) => {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      this.setState({")]),l(`
`),n("span",{class:"line"},[n("span",null,"        msg")]),l(`
`),n("span",{class:"line"},[n("span",null,"      })")]),l(`
`),n("span",{class:"line"},[n("span",null,"    });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,"组件销毁前移除事件监听"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    emitter.removeListener(this.eventEmitter);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        { this.state.msg}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        {/*")])])])]),n("p",null,[l("我是非嵌套 "),n("code",null,"1"),l(" 号")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */}")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// Boo.js")])])])]),n("p",null,"："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import React, { Component } from "react";')]),l(`
`),n("span",{class:"line"},[n("span",null,'import emitter from "./ev"')]),l(`
`),n("span",{class:"line"},[n("span",null,"export default class Boo extends Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const cb = (msg) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return () => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"触发自定义事件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'        emitter.emit("callMe", "Hello")')]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div>")])])])]),n("p",null,[l("我是非嵌套 "),n("code",null,"2"),l(" 号")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'        <button onClick={cb("blue")}>')])])])]),n("p",null,"点击我"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("自定义事件是典型的发布"),n("code",null,"/"),l("订阅模式，通过向事件对象上添加监听器和触发事件来实现组件间通信。")])],-1)])])}const m=a(t,[["render",i]]);export{v as __pageData,m as default};
