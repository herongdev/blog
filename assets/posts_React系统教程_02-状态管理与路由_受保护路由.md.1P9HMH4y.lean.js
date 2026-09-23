import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"受保护路由","description":"围绕“受保护路由”整理的概念、示例与实践笔记。","frontmatter":{"title":"受保护路由","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“受保护路由”整理的概念、示例与实践笔记。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/受保护路由.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/受保护路由.md","filePath":"posts/React系统教程/02-状态管理与路由/受保护路由.md"}'),t={name:"posts/React系统教程/02-状态管理与路由/受保护路由.md"};function o(i,l,c,r,u,m){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"受保护路由",tabindex:"-1"},[s("受保护路由 "),n("a",{class:"header-anchor",href:"#受保护路由","aria-label":'Permalink to "受保护路由"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“受保护路由”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"有权限才可以访问：")]),s(`
`),n("span",{class:"line"},[n("span",null,"src\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch, Redirect, Link } from './react-router-dom'; import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Protected from './components/Protected'; import Login from './components/Login'; ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/">首页</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/user" >用户管理</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <li><Link to="/profile" >个人中心</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Protected path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/login" component={Login} /><Redirect to="/" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  , document.getElementById('root'));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\Route.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import matchPath from './matchPath';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Route extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = RouterContext;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { history, location } = this.context;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { component: RouteComponent, computedMatch, render, children } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const routeProps = { history, location };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let renderElement = null;// null也一个合法的react渲染节点 代表我们render的返顺值，代表此组件将要渲染的内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (match) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      routeProps.match = match;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //RouteComponent>render>children")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (RouteComponent) {//如果传递了 component属性，优先渲染component")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = <RouteComponent {...routeProps} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else if (render) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = render(routeProps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else if (children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = children(routeProps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = children(routeProps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        renderElement = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return renderElement")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Route;")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 指定一个route组件如何渲染有三种方式")]),s(`
`),n("span",{class:"line"},[n("span",null," * 1.component 如果你渲染的是一个固定 的组件，确定的组件的话就可以component")]),s(`
`),n("span",{class:"line"},[n("span",null," * 2.render 如果你想自己确认，自定义渲染逻辑就可以用render")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * 1和2都是要求路径匹配才渲染或执行，如果路径不匹配什么不渲染")]),s(`
`),n("span",{class:"line"},[n("span",null," * 3.children")]),s(`
`),n("span",{class:"line"},[n("span",null," * 不管路由是否匹配，都渲染")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\Login.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Login extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  login = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    localStorage.setItem('login', 'true');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let to = '/';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.props.location.state) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      to = this.props.location.state.to || '/';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props.history.push(to);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <button onClick={this.login}>登录</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\Protected.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Redirect, Route } from '../react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const Protected = (props) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { path, component: RouteComponent } = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Route")]),s(`
`),n("span",{class:"line"},[n("span",null,"      path={path}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      render={")]),s(`
`),n("span",{class:"line"},[n("span",null,"        (routeProps) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"          localStorage.getItem('login')")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ? <RouteComponent {...routeProps} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            : <Redirect to={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"              pathname: '/login',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              state: { from: path }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Protected;")])])])])],-1)])])}const g=a(t,[["render",o]]);export{h as __pageData,g as default};
