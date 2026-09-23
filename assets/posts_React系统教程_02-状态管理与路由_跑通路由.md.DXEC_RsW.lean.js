import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"跑通路由","description":"npm i react router dom @types/react router dom path to regexp S 当你安装了 react router dom 适用于浏览器端的库，会自动安装以下库： react router 才是真正的路由库跨平台，可以应用浏览器。","frontmatter":{"title":"跑通路由","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"npm i react router dom @types/react router dom path to regexp S 当你安装了 react router dom 适用于浏览器端的库，会自动安装以下库： react router 才是真正的路由库跨平台，可以应用浏览器。","sidebarWeight":23,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/跑通路由.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/跑通路由.md","filePath":"posts/React系统教程/02-状态管理与路由/跑通路由.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/跑通路由.md"};function o(r,l,c,i,u,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"跑通路由",tabindex:"-1"},[s("跑通路由 "),n("a",{class:"header-anchor",href:"#跑通路由","aria-label":'Permalink to "跑通路由"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“跑通路由”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("ul",null,[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  createBrowserHistory")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  createHashHistory.js")])])])])])]),n("p",null,[n("code",null,"npm i react-router-dom @types/react-router-dom path-to-regexp -S")]),n("p",null,[s("当你安装了"),n("code",null,"react-router-dom"),s(" 适用于浏览器端的库，会自动安装以下库：")]),n("ul",null,[n("li",null,[n("code",null,"react-router"),s(" 才是真正的路由库跨平台，可以应用浏览器 "),n("code",null,"canvas"),s(),n("code",null,"vr"),s("；")]),n("li",null,[n("code",null,"history"),s(" 底层实现模拟历史对象的库 内部写了二套，一套是使用"),n("code",null,"hash,"),s("一套是使用"),n("code",null,"window.history"),s("；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.tsx")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route } from './react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"debugger")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/" exact={true} component={Home} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"src\\components\\Home.tsx")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Home extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(this.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>Home</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"User.tsx")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class User extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(this.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>User</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"src\\components\\Profile.tsx")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Profile extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>Profile</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  history: H.History;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  location: H.Location < S >;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  match: match < Params >;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  staticContext ?: C;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export interface Location<S = LocationState> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pathname: Pathname;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state: S;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export interface match<Params extends { [K in keyof Params]?: string } = {}> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  params: Params;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isExact: boolean;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  path: string;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  url: string;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"以上打印结果：")],-1)])])}const f=a(p,[["render",o]]);export{h as __pageData,f as default};
