import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实现Switch","description":"围绕“实现Switch”整理的概念、示例与实践笔记。","frontmatter":{"title":"实现Switch","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“实现Switch”整理的概念、示例与实践笔记。","sidebarWeight":19,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/实现Switch.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/实现Switch.md","filePath":"posts/React系统教程/02-状态管理与路由/实现Switch.md"}'),p={name:"posts/React系统教程/02-状态管理与路由/实现Switch.md"};function c(i,l,o,r,u,h){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"实现switch",tabindex:"-1"},[s("实现Switch "),n("a",{class:"header-anchor",href:"#实现switch","aria-label":'Permalink to "实现Switch"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现Switch”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**只要匹配了其中一个，就不再往下继续匹配了；**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**src\\index.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { HashRouter as Router, Route, Switch } from './react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/" component={Home} exact />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/user" component={User} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <Route path="/profile" component={Profile} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Switch>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </Router>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  , document.getElementById('root'));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**src/react-router/s****witch.js**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import matchPath from './matchPath';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Swith extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = RouterContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { context } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { children } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { location } = context;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let element, match;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    React.Children.forEach(children, child => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //child $$typeof == Symbol('react.element')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (React.isValidElement(child)) {//如果此节点是一个React元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (!match) {//如果尚未有任何元素匹配")]),s(`
`),n("span",{class:"line"},[n("span",null,"          element = child;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          match = matchPath(location.pathname, child.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return match ? React.cloneElement(element, { computedMatch: match }) : null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"children=[Route,Route,Route]")]),s(`
`),n("span",{class:"line"},[n("span",null,"React.Children.forEach = function(children,callback){")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let array = Array.isArray(children)?children:[children]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    array.filter(Boolean).forEach(callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Swith;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\Route.js")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
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
`),n("span",{class:"line"},[n("span",null," * 不管路由是否匹配，都渲染，如果匹配match属性值为True，否则为false")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Router } from './Router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Route } from './Route';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Switch } from './Switch';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Redirect } from './Redirect';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as withRouter } from './withRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as __RouterContext } from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Prompt } from './Prompt';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { useParams, useHistory, useRouteMatch, useLocation } from './hooks';")])])])])],-1)])])}const f=a(p,[["render",c]]);export{m as __pageData,f as default};
