import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"Prompt","description":"围绕“Prompt”整理的概念、示例与实践笔记。","frontmatter":{"title":"Prompt","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“Prompt”整理的概念、示例与实践笔记。","sidebarWeight":12,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/Prompt.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/Prompt.md","filePath":"posts/React系统教程/02-状态管理与路由/Prompt.md"}'),t={name:"posts/React系统教程/02-状态管理与路由/Prompt.md"};function i(c,l,o,u,r,m){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"prompt",tabindex:"-1"},[s("Prompt "),n("a",{class:"header-anchor",href:"#prompt","aria-label":'Permalink to "Prompt"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Prompt”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom'; import Home from './components/Home';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import User from './components/User';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Profile from './components/Profile';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Protected from './components/Protected';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Login from './components/Login';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import NavHeader from './components/NavHeader';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Router ==getUserConfirmation========={====()== ===>== ==window====.====confirm====}==>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <NavHeader title="欢迎光临" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <NavLink")]),s(`
`),n("span",{class:"line"},[n("span",null,'            className="strong"')]),s(`
`),n("span",{class:"line"},[n("span",null,"            style={{ textDecoration: 'line-through' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            activeStyle={{ color: 'red' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,'            to="/"')]),s(`
`),n("span",{class:"line"},[n("span",null,"            exact>")]),s(`
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
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\UserAdd.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { UserAPI } from '../utils';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Prompt } from '../react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class UserAdd extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state = { isBlocking: false } //是否阻止跳转，默认值是不阻止")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nameRef = React.createRef()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleSubmit = (event) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    event.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ isBlocking: false }, () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let name = this.nameRef.current.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,'      UserAPI.add({ id: Date.now() + "", name });')]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.props.history.push('/user/list');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleChange = (event) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ isBlocking: event.target.value.length > 0 });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <form onSubmit={this.handleSubmit}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Prompt")]),s(`
`),n("span",{class:"line"},[n("span",null,"          when={this.state.isBlocking}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          message={(location) => `请问你是确定要离开当前页面，跳转到${location.pathname}吗?`}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="text"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          ref={this.nameRef}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onChange={this.handleChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <button type="submit">添加</button>')]),s(`
`),n("span",{class:"line"},[n("span",null,"      </form>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"先添加block方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"src\\history\\createBrowserHistory.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createBrowserHistory() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const globalHistory = window.history;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let listeners = [];//存放所有的监听函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==let== ==message====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function listen(listener) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        listeners.push(listener);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            listeners = listeners.filter(item => item !== listener);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function go(n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        globalHistory.go(n);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    window.addEventListener('popstate', () => {//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let location = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            state: globalHistory.state,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            pathname: window.location.pathname")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //当路径改变之后应该让history的监听函数执行，重新刷新组件")]),s(`
`),n("span",{class:"line"},[n("span",null,'        notify({ action: "POP", location });')]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function goBack() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        go(-1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function goForward() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        go(1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function notify(newState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //把newState上的属性赋值到history对象上")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object.assign(history, newState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        history.length = globalHistory.length;//路由历史栈中历史条目的长度")]),s(`
`),n("span",{class:"line"},[n("span",null,"        listeners.forEach(listener => listener(history.location));//通知监听函数执行,参数是新的location")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function push(pathname, nextState) {//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const action = 'PUSH';//action表示是由于什么样的动作引起了路径的变更")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (typeof pathname === 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            state = pathname.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            pathname = pathname.pathname;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            state = nextState;//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==if== ==(====message====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ==let== ==confirmMessage== ===== ==message====({== ==pathname== ==});==")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ==let== ==allow== ===== ==window====.====confirm====(====confirmMessage====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ==if== ==(!====allow====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"                ==return====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        globalHistory.pushState(state, null, pathname);//我们已经 跳转路径")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let location = { state, pathname };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        notify({ action, location });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==function== ==block====(====newMessage====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==message== ===== ==newMessage====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==return== ==()== ===>== ==message== ===== ==null====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const history = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        action: 'POP',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        go,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        goBack,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        goForward,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        push,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        listen,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        block,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        location: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            pathname: window.location.pathname,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            state: window.location.state")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return history;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default createBrowserHistory;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\Prompt.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Lifecycle from './Lifecycle';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RouterContext from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第一种实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Prompt({ when, message }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let value = React.useContext(RouterContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  React.useEffect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (when)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return value.history.block(message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Prompt;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第二种实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Prompt({ when, message }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (!when) return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          const block = value.history.block;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Lifecycle")]),s(`
`),n("span",{class:"line"},[n("span",null,"              onMount={inst => inst.release = block(message)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"              onUnMount={inst => inst.release()}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            />")]),s(`
`),n("span",{class:"line"},[n("span",null,"          )")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </RouterContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Prompt;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第三种实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Prompt extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = RouterContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.props.when)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.release = this.context.history.block(this.props.message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.props.when)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.release = this.context.history.block(this.props.message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.release && this.release();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\react-router\\index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Router } from './Router';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Route } from './Route';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Switch } from './Switch';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Redirect } from './Redirect';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as withRouter } from './withRouter';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as __RouterContext } from './RouterContext';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { default as Prompt } from './Prompt';")])])])])],-1)])])}const f=a(t,[["render",i]]);export{d as __pageData,f as default};
