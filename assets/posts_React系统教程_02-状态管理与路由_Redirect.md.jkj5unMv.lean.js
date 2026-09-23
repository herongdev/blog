import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Redirect","description":"围绕“Redirect”整理的概念、示例与实践笔记。","frontmatter":{"title":"Redirect","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“Redirect”整理的概念、示例与实践笔记。","sidebarWeight":13,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/Redirect.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/Redirect.md","filePath":"posts/React系统教程/02-状态管理与路由/Redirect.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/Redirect.md"};function i(c,e,o,r,u,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"redirect",tabindex:"-1"},[s("Redirect "),n("a",{class:"header-anchor",href:"#redirect","aria-label":'Permalink to "Redirect"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Redirect”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**新建**src\\react-router\\Redirect.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意在函数组件中使用context的特殊方法：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"要使用RouterContext.Consumer")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"children为一个函数；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Lifecycle from './Lifecycle';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Redirect({ to }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          const { history } = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          /*  history.push(to);")]),s(`
`),n("span",{class:"line"},[n("span",null,"           return null; */")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return <Lifecycle onMount={() => history.push(to)} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Redirect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用Lifecycle比原代码要安全，保证组件至少mounted，再进行跳转；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**新建**src\\react-router\\Lifecycle.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Lifecycle extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.props.onMount)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.props.onMount(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.props.onUnMount)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.props.onUnMount(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Lifecycle;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**react-router\\index.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Route } from './Route';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Router } from './Router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as __RouterContext } from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as matchPath } from './matchPath';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Switch } from './Switch';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Redirect } from './Redirect';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**src\\index.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch, Redirect } from './react-router-dom'; import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      params         <Redirect to="/" /></Switch>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  , document.getElementById('root'));")])])])])],-1)])])}const f=l(p,[["render",i]]);export{m as __pageData,f as default};
