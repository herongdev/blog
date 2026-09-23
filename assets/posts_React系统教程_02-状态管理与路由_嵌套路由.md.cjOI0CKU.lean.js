import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"嵌套路由","description":"围绕“嵌套路由”整理的概念、示例与实践笔记。","frontmatter":{"title":"嵌套路由","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"围绕“嵌套路由”整理的概念、示例与实践笔记。","sidebarWeight":22,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/嵌套路由.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/嵌套路由.md","filePath":"posts/React系统教程/02-状态管理与路由/嵌套路由.md"}'),i={name:"posts/React系统教程/02-状态管理与路由/嵌套路由.md"};function t(u,l,c,r,o,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"嵌套路由",tabindex:"-1"},[s("嵌套路由 "),n("a",{class:"header-anchor",href:"#嵌套路由","aria-label":'Permalink to "嵌套路由"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“嵌套路由”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\utils.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const UserAPI = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  list() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let usersStr = localStorage.getItem('users');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let users = usersStr ? JSON.parse(usersStr) : [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return users;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  add(user) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let users = UserAPI.list();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    users.push(user);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    localStorage.setItem('users', JSON.stringify(users));")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  find(id) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let users = UserAPI.list();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return users.find(user => user.id === id)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//[{id:1,name:'zhangsan'}]")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\User.js")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"import UserList from './UserList';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import UserAdd from './UserAdd';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import UserDetail from './UserDetail';")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { Route, Link } from "../react-router-dom";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class User extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(this.props.location.state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'          <li><Link to="/user/list" >用户列表</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,'          <li><Link to="/user/add">添加用户</Link></li>')]),s(`
`),n("span",{class:"line"},[n("span",null,"        </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/user/list" component={UserList} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/user/add" component={UserAdd} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <Route path="/user/detail/:id" component={UserDetail} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\UserAdd.js")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
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
`),n("span",{class:"line"},[n("span",null,'        <input type="text" ref={this.nameRef} onChange={this.handleChange} />')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <button type="submit">添加</button>')]),s(`
`),n("span",{class:"line"},[n("span",null,"      </form>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\UserList.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { UserAPI } from '../utils';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Link } from '../react-router-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class UserList extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state = { users: [] }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let users = UserAPI.list();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ users });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          this.state.users.map((user) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <li key={user.id}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"              <Link to={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                pathname: `/user/detail/${user.id}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                state: user")]),s(`
`),n("span",{class:"line"},[n("span",null,"              }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {user.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"              </Link>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          ))")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\components\\UserDetail.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { UserAPI } from '../utils';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class UserDetail extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state = { user: {} }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let user = this.props.location.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!user) {//如果不是从列表页跳转的，而是直接刷新的话，user就是undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let id = this.props.match.params.id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      user = UserAPI.find(id);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (user) this.setState({ user });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let user = this.state.user;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>id:{user.id}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>name:{user.name}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(i,[["render",t]]);export{h as __pageData,g as default};
