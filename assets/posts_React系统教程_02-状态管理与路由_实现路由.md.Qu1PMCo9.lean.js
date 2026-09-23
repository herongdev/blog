import{_ as a,o as e,c as t,j as s,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"实现路由","description":"from as from as from React from { Router } from { createHashHistory } from HashRouter extends { history 的 history 实例属性会指向用 hash 实现的历史对象 { re。","frontmatter":{"title":"实现路由","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"from as from as from React from { Router } from { createHashHistory } from HashRouter extends { history 的 history 实例属性会指向用 hash 实现的历史对象 { re。","sidebarWeight":21,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/实现路由.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/实现路由.md","filePath":"posts/React系统教程/02-状态管理与路由/实现路由.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/实现路由.md"};function i(o,n,c,u,r,d){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"实现路由",tabindex:"-1"},[l("实现路由 "),s("a",{class:"header-anchor",href:"#实现路由","aria-label":'Permalink to "实现路由"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“实现路由”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router-dom\\index.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"*"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'../react-router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"{default")])])])]),s("p",null,[s("code",null,"as")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"HashRouter}")])])])]),s("p",null,[s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./HashRouter';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"{default")])])])]),s("p",null,[s("code",null,"as")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"BrowserRouter}")])])])]),s("p",null,[s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'./BrowserRouter';")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router-dom\\HashRouter.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"React"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"Router"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'../react-router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"{"),l(),s("code",null,"createHashHistory"),l(),s("code",null,"}"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'history';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class")])])])]),s("p",null,[s("code",null,"HashRouter"),l(),s("code",null,"extends")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"React.Component")])])])]),s("p",null,[s("code",null,"{"),s("code",null,"history"),l(),s("code",null,"=")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"createHashHistory()//HashRouter")])])])]),s("p",null,[l("的"),s("code",null,"history"),l("实例属性会指向用"),s("code",null,"hash"),l("实现的历史对象")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"render()")])])])]),s("p",null,[s("code",null,"{"),s("code",null,"return"),l(),s("code",null,"(")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"<Router")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"history={this.history}>")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"{this.props.children}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"</Router>")])])])]),s("pre",null,[s("code",null," `)`\n")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"default")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"HashRouter;")]),l(`
`),s("span",{class:"line"},[s("span",null,"/**")])])])]),s("p",null,[s("code",null,"*"),l(),s("code",null,"createHashHistory"),l("和"),s("code",null,"createBrowserHistory"),s("code",null,"*"),l(" 都 会反回一个"),s("code",null,"history"),l("对象，对象的方法和"),s("code",null,"API"),l("是完全相同的，只是内部的实现原理不一样 "),s("code",null,"*/")]),s("p",null,"Src\\react-router\\index.js"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export {default as Router} from './Router';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export {default as Route} from './Route';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export {default as __RouterContext} from './RouterContext';")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\RouterContext.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import")])])])]),s("p",null,[s("code",null,"React"),l(),s("code",null,"from")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"export")])])])]),s("p",null,[s("code",null,"default")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"React.createContext({});")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\Router.js")]),l(`
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
`),s("span",{class:"line"},[s("span",null,"export default Router;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\react-router\\Route.js")]),l(`
`),s("span",{class:"line"},[s("span",null,"import React from 'react';")]),l(`
`),s("span",{class:"line"},[s("span",null,"import RouterContext from './RouterContext';")]),l(`
`),s("span",{class:"line"},[s("span",null,"class Route extends React.Component {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  static contextType = RouterContext;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const { history, location } = this.context;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const { path, component: RouteComponent, exact = false } = this.props;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const match = exact ? location.pathname === path : location.pathname.startsWith(path);// /user /user")]),l(`
`),s("span",{class:"line"},[s("span",null,"    const routeProps = { history, location };")]),l(`
`),s("span",{class:"line"},[s("span",null,"    let renderElement = null;// null")])])])]),s("p",null,[l("也一个合法的"),s("code",null,"react"),l("渲染节点，代表我们"),s("code",null,"render"),l("的返回值，代表此组件将要渲染的内容；")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    if (match) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      //React.createElement(RouteComponent,routeProps);")]),l(`
`),s("span",{class:"line"},[s("span",null,"      renderElement = <RouteComponent {...routeProps} />")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    return renderElement")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default Route;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\history\\createHashHistory")]),l(`
`),s("span",{class:"line"},[s("span",null,"function createHashHistory() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const history = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action: 'POP',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goBack,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goForward,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    push,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listen,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    location: {}")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default createHashHistory;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Src\\history\\createBrowserHistory")]),l(`
`),s("span",{class:"line"},[s("span",null,"function createBrowserHistory() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const globalHistory = window.history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let listeners = [];")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function go(n) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    globalHistory.go(n);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function goBack() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    globalHistory.back();")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  function goForward(n) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    globalHistory.forward()")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const history = {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    action: 'POP',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    go,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goBack,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    goForward,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    push,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    listen,")]),l(`
`),s("span",{class:"line"},[s("span",null,"    location: {}")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return history;")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"export default createBrowserHistory;")])])])])],-1)])])}const v=a(p,[["render",i]]);export{g as __pageData,v as default};
