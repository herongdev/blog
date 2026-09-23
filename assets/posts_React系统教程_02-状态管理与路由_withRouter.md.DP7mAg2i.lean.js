import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"withRouter","description":"围绕“withRouter”整理的概念、示例与实践笔记。","frontmatter":{"title":"withRouter","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“withRouter”整理的概念、示例与实践笔记。","sidebarWeight":16,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/withRouter.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/withRouter.md","filePath":"posts/React系统教程/02-状态管理与路由/withRouter.md"}'),t={name:"posts/React系统教程/02-状态管理与路由/withRouter.md"};function i(o,l,u,c,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"withrouter",tabindex:"-1"},[s("withRouter "),n("a",{class:"header-anchor",href:"#withrouter","aria-label":'Permalink to "withRouter"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“withRouter”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Protected from './components/Protected';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Login from './components/Login';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import NavHeader from './components/NavHeader'; ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <NavHeader title="欢迎光临" /><ul>')]),s(`
`),n("span",{class:"line"},[n("span",null,"        <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,'            className="strong"')]),s(`
`),n("span",{class:"line"},[n("span",null,"            style={{ textDecoration: 'line-through' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'            to="/" exact>')]),s(`
`),n("span",{class:"line"},[n("span",null,"            Home")]),s(`
`),n("span",{class:"line"},[n("span",null,"          </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,"            activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'            to="/user">')]),s(`
`),n("span",{class:"line"},[n("span",null,"            User")]),s(`
`),n("span",{class:"line"},[n("span",null,"          </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,"            activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'            to="/profile">')]),s(`
`),n("span",{class:"line"},[n("span",null,"            Profile")]),s(`
`),n("span",{class:"line"},[n("span",null,"          </NavLink>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Protected path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/login" component={Login} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Redirect to="/" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"      </Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\NavHeader.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { withRouter } from '../react-router-dom'")]),s(`
`),n("span",{class:"line"},[n("span",null,"class NavHeader extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div onClick={() => this.props.history.push('/')}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {this.props.title}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default withRouter(NavHeader);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\withRouter.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 高阶组件React中最重要的设计模式，没有之一")]),s(`
`),n("span",{class:"line"},[n("span",null,"function withRouter(OldComponent) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function NewComponent(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return <OldComponent {...value} {...props} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return NewComponent")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default withRouter;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"另外的实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Route } from './';")]),s(`
`),n("span",{class:"line"},[n("span",null,"//高阶组件 属性代理")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function withRouter(OldComponent) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    (props) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Route")]),s(`
`),n("span",{class:"line"},[n("span",null,"        render={")]),s(`
`),n("span",{class:"line"},[n("span",null,"          routeProps => <OldComponent {...routeProps} {...props} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Router } from './Router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Route } from './Route';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Switch } from './Switch';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Redirect } from './Redirect';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as withRouter } from './withRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as __RouterContext } from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Prompt } from './Prompt';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { useParams, useHistory, useRouteMatch, useLocation } from './hooks';")])])])])],-1)])])}const R=a(t,[["render",i]]);export{h as __pageData,R as default};
