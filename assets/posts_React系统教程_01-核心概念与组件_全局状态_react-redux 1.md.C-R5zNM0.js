import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"react-redux 1","description":"围绕“react-redux 1”整理的概念、示例与实践笔记。","frontmatter":{"title":"react-redux 1","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“react-redux 1”整理的概念、示例与实践笔记。","sidebarWeight":103,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/状态改变/全局状态/react-redux 1.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/全局状态/react-redux 1.md","filePath":"posts/React系统教程/01-核心概念与组件/全局状态/react-redux 1.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/全局状态/react-redux 1.md"};function i(c,a,o,r,u,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"react-redux-1",tabindex:"-1"},[s("react-redux 1 "),n("a",{class:"header-anchor",href:"#react-redux-1","aria-label":'Permalink to "react-redux 1"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“react-redux 1”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**5.****实现****react-redux****库**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**react-redux****计数器**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==和以前写过的逻辑一致====,====这回加上====react-redux====的逻辑==")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,'import Counter from "./components/Counter";')]),s(`
`),n("span",{class:"line"},[n("span",null,"import store from './store/index';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Provider } from 'react-redux';")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Provider store={store}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Counter />")]),s(`
`),n("span",{class:"line"},[n("span",null,"</Provider>, window.root);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// counter组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"数量:{this.props.number}")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button onClick={() => { this.props.add(1) }}>+</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button onClick={() => { this.props.minus(1) }}>-</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default connect(state => ({ ...state }), dispatch => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"add: (amount) => { dispatch(actions.add(amount)) },")]),s(`
`),n("span",{class:"line"},[n("span",null,"minus: (amount) => { dispatch(actions.minus(amount)) }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}))(Counter)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**编写****react-redux****库**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import PropTypes from 'prop-types';")]),s(`
`),n("span",{class:"line"},[n("span",null,"**//****Pri****vider****方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Provider extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"static childContextTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"store: PropTypes.object")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"getChildContext() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return { store: this.props.store }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return this.props.children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**//****Connect****方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return class Proxy extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"static contextTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"store: PropTypes.object")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.unsubscribe = this.context.store.subscribe(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.setState(mapStateToProps(this.context.store.getState()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"componentWillUnmount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.unsubscribe();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor(props, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.state = mapStateToProps(context.store.getState());")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <Component {...this.state} {...mapDispatchToProps(this.context.store.dispatch)} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export { Provider, connect }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**//bindActionCreators****方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"let bindActionCreators = (actions, dispatch) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"let obj = {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let key in actions) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj[key] = (...args) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"dispatch(actions[key](...args))")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return obj")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default connect(state => ({ ...state }), dispatch => bindActionCreators(actions, dispatch))(Counter)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==bindActionCreators====是====redux====中的一个方法，并且这样的逻辑过于复杂，我们依旧希望可以在====react-redux====中内部可以简化操作==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**简化****mapDispatchToProps**")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default connect(state => ({ ...state }), actions)(Counter);")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { bindActionCreators } from './redux'")]),s(`
`),n("span",{class:"line"},[n("span",null,"render(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"let r = {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof mapDispatchToProps === 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"r = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"r = mapDispatchToProps(this.context.store.dispatch)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <Component {...this.state} {...r} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==这样我们在组件中更改状态时可以直接传入====actionCreator====对象。==")])])])])],-1)])])}const b=l(p,[["render",i]]);export{m as __pageData,b as default};
