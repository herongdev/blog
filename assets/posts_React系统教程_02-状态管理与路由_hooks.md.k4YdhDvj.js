import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"hooks","description":"围绕“hooks”整理的概念、示例与实践笔记。","frontmatter":{"title":"hooks","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“hooks”整理的概念、示例与实践笔记。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/hooks.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/hooks.md","filePath":"posts/React系统教程/02-状态管理与路由/hooks.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/hooks.md"};function o(i,a,c,u,r,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"hooks",tabindex:"-1"},[s("hooks "),n("a",{class:"header-anchor",href:"#hooks","aria-label":'Permalink to "hooks"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“hooks”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  BrowserRouter as Router, Route, Link,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  useParams, useHistory, ==useRouteMatch==, useLocation")]),s(`
`),n("span",{class:"line"},[n("span",null,"} from './react-router-dom';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Home() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return <div>Home</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function UserDetail(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let params = useParams();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log('params', params);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let location = useLocation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log('location', location);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let history = useHistory();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log('history', history);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      id:{params.id}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name:{location.state.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Post() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 使用当前浏览器地址栏中的路径和此path路径以及对应的配置信息进行匹配")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let match = useRouteMatch({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    path: '/post/:id',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    strict: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    sensitive: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log('match', match);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return match")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ? <div>id:{match.params.id}</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    : <div>Not Found</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/">首页</Link>')]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Link")]),s(`
`),n("span",{class:"line"},[n("span",null,"          to={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"            pathname: `/user/detail/1`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            state: { id: 1, name: '张三' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          张三")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </Link>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Link")]),s(`
`),n("span",{class:"line"},[n("span",null,"          to={{ pathname: `/post/1` }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        >文章")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </Link>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/" component={Home} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/user/detail/:id" component={UserDetail} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <Route path="/post/:id" component={Post} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\hooks.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import matchPath from './matchPath';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useParams() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let match = React.useContext(RouterContext).match;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return match ? match.params : {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useHistory() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return React.useContext(RouterContext).history;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useLocation() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return React.useContext(RouterContext).location;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useRouteMatch(options) {//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const location = useLocation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return matchPath(location.pathname, options);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Router } from './Router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Route } from './Route';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Switch } from './Switch';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Redirect } from './Redirect';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as withRouter } from './withRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as __RouterContext } from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Prompt } from './Prompt';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { useParams, useHistory, useRouteMatch, useLocation } from './hooks';")])])])])],-1)])])}const g=l(p,[["render",o]]);export{m as __pageData,g as default};
