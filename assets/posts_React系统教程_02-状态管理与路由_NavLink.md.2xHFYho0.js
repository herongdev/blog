import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"NavLink","description":"围绕“NavLink”整理的概念、示例与实践笔记。","frontmatter":{"title":"NavLink","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“NavLink”整理的概念、示例与实践笔记。","sidebarWeight":11,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/NavLink.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/NavLink.md","filePath":"posts/React系统教程/02-状态管理与路由/NavLink.md"}'),i={name:"posts/React系统教程/02-状态管理与路由/NavLink.md"};function t(c,l,o,u,r,m){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"navlink",tabindex:"-1"},[s("NavLink "),n("a",{class:"header-anchor",href:"#navlink","aria-label":'Permalink to "NavLink"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“NavLink”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"public\\index.html")]),s(`
`),n("span",{class:"line"},[n("span",null,"<!DOCTYPE html>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<html lang="en">')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <head>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <meta charset="utf-8" />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <meta name="viewport" content="width=device-width, initial-scale=1" />')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <meta name="theme-color" content="#000000" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"    <style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .basic{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        font-size:20px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .active{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        font-size:25px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </head>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div id="root"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  </body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom'; import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Protected from './components/Protected';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Login from './components/Login';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,'          className="strong"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          style={{ textDecoration: 'line-through' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'          to="/" exact>')]),s(`
`),n("span",{class:"line"},[n("span",null,"          Home")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,"          activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'          to="/user">')]),s(`
`),n("span",{class:"line"},[n("span",null,"          User")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,"          activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'          to="/profile">')]),s(`
`),n("span",{class:"line"},[n("span",null,"          Profile")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Protected path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/login" component={Login} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Redirect to="/" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router-dom\\NavLink.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Route, Link } from './';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function NavLink(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    to: path,//点击时要跳转换路径")]),s(`
`),n("span",{class:"line"},[n("span",null,"    className: classNameprop = '',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: styleProp = {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"    activeClassName = 'active',//激活类名")]),s(`
`),n("span",{class:"line"},[n("span",null,"    activeStyle = {},//激活行内样式")]),s(`
`),n("span",{class:"line"},[n("span",null,"    children,//子节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    exact//是否精确匹配")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Route path={path} exact={exact}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ({ match }) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let className = match")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ? joinClassName(classNameprop, activeClassName)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            : classNameprop;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let style = match ? { ...styleProp, ...activeStyle } : styleProp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let linkProps = { className, style, to: path, children };")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return <Link {...linkProps} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Route>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'// joinClassName(basic,active)=> "basic active"')]),s(`
`),n("span",{class:"line"},[n("span",null,"function joinClassName(...classNames) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return classNames.filter(c => c).join(' ');")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router-dom\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export * from '../react-router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as HashRouter } from './HashRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as BrowserRouter } from './BrowserRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Link } from './Link';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as NavLink } from './NavLink';")])])])])],-1)])])}const v=a(i,[["render",t]]);export{h as __pageData,v as default};
