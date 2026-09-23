import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Link","description":"围绕“Link”整理的概念、示例与实践笔记。","frontmatter":{"title":"Link","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“Link”整理的概念、示例与实践笔记。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/Link.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/Link.md","filePath":"posts/React系统教程/02-状态管理与路由/Link.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/Link.md"};function i(o,l,r,c,u,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"link",tabindex:"-1"},[s("Link "),n("a",{class:"header-anchor",href:"#link","aria-label":'Permalink to "Link"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Link”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**src\\index.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch, Redirect, Link } from './react-router-dom'; import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/">首页</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/user" >用户管理</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/profile" >个人中心</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Redirect to="/" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  , document.getElementById('root'));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**新建**src\\react-router-dom\\Link.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { __RouterContext as RouterContext } from '../react-router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function Link(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <a")]),s(`
`),n("span",{class:"line"},[n("span",null,"              {...props}")]),s(`
`),n("span",{class:"line"},[n("span",null,"              onClick={(event) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                event.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"                value.history.push(props.to);")]),s(`
`),n("span",{class:"line"},[n("span",null,"              }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            >{props.children}</a>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          )")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**react-router-dom\\index.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"export * from '../react-router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as HashRouter } from './HashRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as BrowserRouter } from './BrowserRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Link } from './Link';")])])])])],-1)])])}const k=a(p,[["render",i]]);export{h as __pageData,k as default};
