import{_ as a,o as e,c as t,j as s,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"实现history","description":"其中， react router dom 中导出了两种 router ， HashRouter 和 { default as HashRouter } from { default as BrowserRouter } from 对于第一行代码，我们导出了 react route。","frontmatter":{"title":"实现history","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"其中， react router dom 中导出了两种 router ， HashRouter 和 { default as HashRouter } from { default as BrowserRouter } from 对于第一行代码，我们导出了 react route。","sidebarWeight":20,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/实现history.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/实现history.md","filePath":"posts/React系统教程/02-状态管理与路由/实现history.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/实现history.md"};function i(c,n,o,u,r,h){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"实现history",tabindex:"-1"},[l("实现history "),s("a",{class:"header-anchor",href:"#实现history","aria-label":'Permalink to "实现history"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“实现history”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\index.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import ReactDOM from 'react-dom';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import { BrowserRouter as Router, Route } from './react-router-dom';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import Home from './components/Home';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import User from './components/User';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import Profile from './components/Profile';")]),l(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),l(`
`),s("span",{class:"line"},[s("span",null,"  <Router>")]),l(`
`),s("span",{class:"line"},[s("span",null,'    <Route path="/" component={Home} />')]),l(`
`),s("span",{class:"line"},[s("span",null,'    <Route path="/user" component={User} />')]),l(`
`),s("span",{class:"line"},[s("span",null,'    <Route path="/profile" component={Profile} />')]),l(`
`),s("span",{class:"line"},[s("span",null,"  </Router>,")]),l(`
`),s("span",{class:"line"},[s("span",null,"  document.getElementById('root')")]),l(`
`),s("span",{class:"line"},[s("span",null,");")])])])]),s("p",null,[l("其中，"),s("code",null,"react-router-dom"),l("中导出了两种"),s("code",null,"router"),l("，"),s("code",null,"HashRouter"),l("和")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"BrowserRouter:")]),l(`
`),s("span",{class:"line"},[s("span",null,"Src\\react-router-dom\\index.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"export * from '../react-router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"default"),l(),s("code",null,"as"),l(),s("code",null,"HashRouter"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./HashRouter';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"default"),l(),s("code",null,"as"),l(),s("code",null,"BrowserRouter"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./BrowserRouter';")])])])]),s("p",null,[l("对于第一行代码，我们导出了"),s("code",null,"react-router"),l("中的所有导出：")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\index.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"default"),l(),s("code",null,"as"),l(),s("code",null,"Router"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./Router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"default"),l(),s("code",null,"as"),l(),s("code",null,"Route"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./Route';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"default"),l(),s("code",null,"as"),l(),s("code",null,"__RouterContext"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./RouterContext';")])])])]),s("p",null,[l("所以，"),s("code",null,"react-router-dom"),l("中包含了"),s("code",null,"react-router"),l("的内容； 在入口文件的render方法中，我们使用了Router和Route组件；")]),s("p",null,"我们看一下"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router-dom\\BrowserRouter.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"React"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"Router"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'../react-router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"createHashHistory"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'../history';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class")])])])]),s("p",null,[s("code",null,"HashRouter"),l(),s("code",null,"extends")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"React.Component")])])])]),s("p",null,[s("code",null,"{"),s("code",null,"history"),l(),s("code",null,"=")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"createHashHistory()//HashRouter")])])])]),s("p",null,[l("的"),s("code",null,"history"),l("实例属性会指向用"),s("code",null,"hash"),l("实现的历史对象")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"render()")])])])]),s("p",null,[s("code",null,"{"),s("code",null,"return"),l(),s("code",null,"(")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"<Router")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"history={this.history}>")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"{this.props.children}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"</Router>")])])])]),s("pre",null,[s("code",null," `)`\n")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"default")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"HashRouter;")]),l(`
`),s("span",{class:"line"},[s("span",null,"/**")])])])]),s("p",null,[s("code",null,"*"),l(),s("code",null,"createHashHistory"),l("和"),s("code",null,"createBrowserHistory"),s("code",null,"*"),l(" 都 会反回一个"),s("code",null,"history"),l("对象，对象的方法和"),s("code",null,"API"),l("是完全 相同 的，只是内闻的实现原理不一样 "),s("code",null,"*/")]),s("p",null,"这里面又用到了"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\Router.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import RouterContext from './RouterContext';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class Router extends React.Component {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  constructor(props) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    super(props);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    this.state = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      location: props.history.location")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"监听历史对象路径变化，如果路径发生变化的话执行回调"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    this.unlisten = props.history.listen((location) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      this.setState({ location })")]),l(`
`),s("span",{class:"line"},[s("span",null,"    });")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  componentWillUnmount() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    this.unlisten && this.unlisten();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    let value = { history: this.props.history, location: this.state.location };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),l(`
`),s("span",{class:"line"},[s("span",null,"      <RouterContext.Provider value={value}>")]),l(`
`),s("span",{class:"line"},[s("span",null,"        {this.props.children}")]),l(`
`),s("span",{class:"line"},[s("span",null,"      </RouterContext.Provider>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    )")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default Router;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"react-router-dom\\HashRouter.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import { Router } from '../react-router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import { createBrowserHistory } from '../history';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class BrowserRouter extends React.Component {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  history = createBrowserHistory()//HashRouter")])])])]),s("p",null,[l("的"),s("code",null,"history"),l("实例属性会指向用"),s("code",null,"hash"),l("实现的历史对象")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  render() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),l(`
`),s("span",{class:"line"},[s("span",null,"      <Router history={this.history}>")]),l(`
`),s("span",{class:"line"},[s("span",null,"        {this.props.children}")]),l(`
`),s("span",{class:"line"},[s("span",null,"      </Router>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    )")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default BrowserRouter;")])])])]),s("p",null,[l("我们要使用"),s("code",null,"Router"),l("时，会给它传入的"),s("code",null,"props"),l("中，存在一个"),s("code",null,"history"),l("属性，它是由我们的"),s("code",null,"createBrowserHistory()"),l("方法创建的； 其实"),s("code",null,"BrowserRouter"),l("和"),s("code",null,"HashRouter"),l("的区别在于，它们"),s("code",null,"render"),l("返回中的"),s("code",null,"Router"),l("的"),s("code",null,"props"),l("中的"),s("code",null,"history"),l("是由不同的方法创建的，分别是"),s("code",null,"createBrowserHistory"),l("和"),s("code",null,"createHashHistory"),l("；")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\RouterContent.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default React.createContext({});")])])])]),s("p",null,[l("分别了解一下这两个方法返回的"),s("code",null,"history"),l("的异同； 进入到")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\history\\createBrowserHistory.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"function createBrowserHistory() {")])])])]),s("p",null,"// react-router-dom用于浏览器环境，利用浏览器的location对象和history对象进行页面前进后退及跳转，及手动修改location值；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const globalHistory = window.history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let listeners = [];//")])])])]),s("p",null,"存放所有的监听函数"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  let state;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function listen(listener) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listeners.push(listener);")])])])]),s("p",null,"// 返回取消监听的函数"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    return () => {")])])])]),s("p",null,"// 过滤掉当时监听的回调函数"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      listeners = listeners.filter(item => item != listener);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function go(n) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    globalHistory.go(n);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function goBack() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go(-1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function goForward() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go(1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("p",null,"// 按前进后退按钮或使用js调用以上3个跳转方法，都会触发popState事件"),s("p",null,"// 默认情况下state值为空，如果使用pushState或replaceState方法，可以定制State"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  window.addEventListener('popstate', () => {//TODO")]),l(`
`),s("span",{class:"line"},[s("span",null,"    let location = { state: globalHistory.state, pathname: window.location.pathname };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[l("当路径改变之后应该让"),s("code",null,"history"),l("的监听函数执行，重新刷新组件")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'    notify({ action: "POP", location });')]),l(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function notify(newState) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[l("把"),s("code",null,"newState"),l("上的属性赋值到"),s("code",null,"history"),l("对象上")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    Object.assign(history, newState);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    history.length = globalHistory.length;//")])])])]),s("p",null,"路由历史栈中历史条目的长度"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    listeners.forEach(listener => listener(history.location));//")])])])]),s("p",null,[l("通知监听函数执行"),s("code",null,","),l("参数是新的")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"location")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function push(pathname, nextState) {//TODO")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const action = 'PUSH';//action")])])])]),s("p",null,"表示是由于什么样的动作引起了路径的变更"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    if (typeof pathname === 'object') {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      state = pathname.state;")]),l(`
`),s("span",{class:"line"},[s("span",null,"      pathname = pathname.pathname;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    } else {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      state = nextState;//TODO")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    globalHistory.pushState(state, null, pathname);//")])])])]),s("p",null,"我们已经跳转路径"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    let location = { state, pathname };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    notify({ action, location });")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const history = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action: 'POP',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goBack,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goForward,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    push,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listen,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    location: { pathname: window.location.pathname, state: window.location.state }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default createBrowserHistory;")])])])]),s("p",null,"新建"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," src\\history\\index.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"export { default as createHashHistory } from './createHashHistory';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export { default as createBrowserHistory } from './createBrowserHistory';")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\history\\createHashHistory.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"/**")]),l(`
`),s("span",{class:"line"},[s("span",null," * hash")])])])]),s("p",null,[l("不能使用 浏览器的"),s("code",null,"history"),l("对象了")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," * @returns")]),l(`
`),s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"function createHashHistory() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let stack = [];//")])])])]),s("p",null,"类似于历史栈 里面存放都是路径"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  let index = -1;//")])])])]),s("p",null,"栈的指针，默认是"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"-1")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let action = 'POP';//")])])])]),s("p",null,"动作"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  let state;//")])])])]),s("p",null,"最新的状态"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let listeners = [];//")])])])]),s("p",null,"监听函数的数组"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function listen(listener) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listeners.push(listener);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return () => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      listeners = listeners.filter(item => item != listener);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  //")])])])]),s("p",null,[l("当"),s("code",null,"hash"),l("发生变化的话，会执行回调")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  window.addEventListener('hashchange', hashChangeHandler);")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  let hashChangeHandler = () => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[l("取出最新的"),s("code",null,"hash"),l("值")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    let pathname = window.location.hash.slice(1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    Object.assign(history, { action, location: { pathname, state } });")]),l(`
`),s("span",{class:"line"},[s("span",null,"    if (action === 'PUSH') {//")])])])]),s("p",null,[l("说明是调用"),s("code",null,"push"),l("方法，需要往历史栈中添加新的条目")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"      stack[++index] = history.location;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listeners.forEach(listener => listener(history.location));")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function go(n) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action = 'POP';")]),l(`
`),s("span",{class:"line"},[s("span",null,"    index += n;//")])])])]),s("p",null,"更改栈顶的指针"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    let nextLocation = stack[index];//")])])])]),s("p",null,"取出指定索引对应的路径对象"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    state = nextLocation.state;//")])])])]),s("p",null,[l("取出此"),s("code",null,"location"),l("对应的状态 "),s("code",null,"//"),l(" 以下语句可直接修改"),s("code",null,"hash"),l("值，从而触发"),s("code",null,"onhashchange"),l("事件 "),s("code",null,"//"),l(" 网址也可以通过"),s("code",null,"window.location=xx"),l("来进行修改")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    window.location.hash = nextLocation.pathname;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function push(pathname, nextState) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action = 'PUSH';")]),l(`
`),s("span",{class:"line"},[s("span",null,"    if (typeof pathname === 'object') {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      state = pathname.state;")]),l(`
`),s("span",{class:"line"},[s("span",null,"      pathname = pathname.pathname")]),l(`
`),s("span",{class:"line"},[s("span",null,"    } else {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      state = nextState;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    window.location.hash = pathname;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  function goBack() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go(-1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function goForward() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go(1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  const history = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action: 'POP',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goBack,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goForward,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    push,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listen,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    location: {},")]),l(`
`),s("span",{class:"line"},[s("span",null,"    location: { pathname: '/', state: undefined }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  if (window.location.hash) {//")])])])]),s("p",null,[l("如果初始的情况下，如果"),s("code",null,"hash"),l("是有值的")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    action = 'PUSH';")]),l(`
`),s("span",{class:"line"},[s("span",null,"    hashChangeHandler();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  } else {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    window.location.hash = '/';")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default createHashHistory;")])])])]),s("p",null,[l("再看看我们的 "),s("code",null,"Src\\react-router\\Router.js"),l(" 在构造函数中，我们已经进行了"),s("code",null,"location"),l("的监听；")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import RouterContext from './RouterContext';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class Router extends React.Component {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  constructor(props) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    super(props);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    this.state = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      location: props.history.location")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"监听历史对象路径变化，如果路径发生变化的话执行回调"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    this.unlisten = props.history.listen((location) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      this.setState({ location })")]),l(`
`),s("span",{class:"line"},[s("span",null,"    });")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  componentWillUnmount() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    this.unlisten && this.unlisten();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    let value = { history: this.props.history, location: this.state.location };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),l(`
`),s("span",{class:"line"},[s("span",null,"      <RouterContext.Provider value={value}>")]),l(`
`),s("span",{class:"line"},[s("span",null,"        {this.props.children}")]),l(`
`),s("span",{class:"line"},[s("span",null,"      </RouterContext.Provider>")]),l(`
`),s("span",{class:"line"},[s("span",null,"    )")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default Router;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\route.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import RouterContext from './RouterContext';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import matchPath from './matchPath';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class Route extends React.Component {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  static contextType = RouterContext;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const { history, location } = this.context;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const { path, component: RouteComponent, exact = false } = this.props;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    //const match = exact?location.pathname===path:location.pathname.startsWith(path);// /user /user")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const match = matchPath(location.pathname, this.props);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const routeProps = { history, location };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    let renderElement = null;// null")])])])]),s("p",null,[l("也一个合法的"),s("code",null,"react"),l("渲染节点 代表我们"),s("code",null,"render"),l("的返顺值，代表此组件将要渲染的内容")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    if (match) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      routeProps.match = match;")]),l(`
`),s("span",{class:"line"},[s("span",null,"      //React.createElement(RouteComponent,routeProps);")]),l(`
`),s("span",{class:"line"},[s("span",null,"      renderElement = <RouteComponent {...routeProps} />")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return renderElement")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default Route;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\matchPath.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import pathToRegexp from 'path-to-regexp';")]),l(`
`),s("span",{class:"line"},[s("span",null,"function compilePath(path, options) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const keys = [];")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const regexp = pathToRegexp(path, keys, options);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return { regexp, keys };")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"function matchPath(pathname, options = {}) {")]),l(`
`),s("span",{class:"line"},[s("span",null,'    const { path = "/", exact = false, strict = false, sensitive = false } = options;')]),l(`
`),s("span",{class:"line"},[s("span",null,"    const { regexp, keys } = compilePath(path, { end: exact, strict, sensitive });")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const match = regexp.exec(pathname);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    if (!match) return null;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const [url, ...values] = match;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const isExact = pathname === url;//")]),l(`
`),s("span",{class:"line"},[s("span",null,"    if (exact && !isExact) return null;//")])])])]),s("p",null,"如果希望精确，但其实不精确返回确"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    return {")]),l(`
`),s("span",{class:"line"},[s("span",null,"        path,//Route")])])])]),s("p",null,[l("里的"),s("code",null,"path"),l("属性")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        url,//")])])])]),s("p",null,[l("正则匹配到的浏览器的"),s("code",null,"pathname"),l("部分")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        isExact,//")])])])]),s("p",null,"是否实现了精确匹配"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        params: keys.reduce((memo, key, index) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"            memo[key.name] = values[index]")]),l(`
`),s("span",{class:"line"},[s("span",null,"            return memo;")]),l(`
`),s("span",{class:"line"},[s("span",null,"        }, {})")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"/**")]),l(`
`),s("span",{class:"line"},[s("span",null," *")])])])]),s("p",null,"浏览器的"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"pathname  /user/1")]),l(`
`),s("span",{class:"line"},[s("span",null," * path /user")]),l(`
`),s("span",{class:"line"},[s("span",null," * match")])])])]),s("p",null,"是能匹配上的"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," * exact=true;")]),l(`
`),s("span",{class:"line"},[s("span",null," * /user/1")])])])]),s("p",null,"不完全 相等"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"/user")])])])]),s("p",null,"表示非精确匹配"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," *")]),l(`
`),s("span",{class:"line"},[s("span",null," *")]),l(`
`),s("span",{class:"line"},[s("span",null," *")]),l(`
`),s("span",{class:"line"},[s("span",null," *")]),l(`
`),s("span",{class:"line"},[s("span",null," * Home   path = /")]),l(`
`),s("span",{class:"line"},[s("span",null," * location.pathname /user")]),l(`
`),s("span",{class:"line"},[s("span",null," *")])])])]),s("p",null,"匹配的部分就是"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," /")]),l(`
`),s("span",{class:"line"},[s("span",null," * / === /user")])])])]),s("p",null,"不相等就是"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"false")]),l(`
`),s("span",{class:"line"},[s("span",null," */")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default matchPath;")])])])])],-1)])])}const v=a(p,[["render",i]]);export{g as __pageData,v as default};
