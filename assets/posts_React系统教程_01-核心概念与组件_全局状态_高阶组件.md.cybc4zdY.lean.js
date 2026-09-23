import{_ as a,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"高阶组件","description":"高阶组件： 一个组件返回一个组件 这段逻辑可能在Password组件中也要使用，那么从本地存储中获取数据放到输入框内的逻辑应该就是公用逻辑。这时我们就要使用高阶组件，也就是将组件在原有的基础上进行包装。 \\\\ 来自 \\\\<https://zhufengzhufeng.github.i。","frontmatter":{"title":"高阶组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"高阶组件： 一个组件返回一个组件 这段逻辑可能在Password组件中也要使用，那么从本地存储中获取数据放到输入框内的逻辑应该就是公用逻辑。这时我们就要使用高阶组件，也就是将组件在原有的基础上进行包装。 \\\\ 来自 \\\\<https://zhufengzhufeng.github.i。","sidebarWeight":108,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/状态改变/全局状态/高阶组件.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/全局状态/高阶组件.md","filePath":"posts/React系统教程/01-核心概念与组件/全局状态/高阶组件.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/全局状态/高阶组件.md"};function o(i,e,c,r,u,d){return l(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"高阶组件",tabindex:"-1"},[s("高阶组件 "),n("a",{class:"header-anchor",href:"#高阶组件","aria-label":'Permalink to "高阶组件"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“高阶组件”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**高阶函数：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"let fn = () => () => () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//code")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"高阶组件："),s(" 一个组件返回一个组件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**1.****为什么需要高阶组件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==我们先看一个非常常见的例子，一个输入框需要从本地获取数据将获取的数据放到输入框内==")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Username extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.state = { val: '' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"let username = localStorage.getItem('username') || '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"val: username")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return")]),s(`
`),n("span",{class:"line"},[n("span",null,"<div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<input type="text" value={this.state.val} onChange={() => { }} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"这段逻辑可能在Password组件中也要使用，那么从本地存储中获取数据放到输入框内的逻辑应该就是公用逻辑。这时我们就要使用高阶组件，也就是将组件在原有的基础上进行包装。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**2.实现高阶组件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"let local = (key) => (Component) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return class HighOrderComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.state = { [key]: '' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"let val = localStorage.getItem(key) || '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"[key]: val")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <Component {...this.state} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export default local;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Local from './Local'")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Username extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<input type="text" value={this.props.val} onChange={() => { }} />')]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//告诉local将username取出来，以属性的方式传递给username")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Local('username')(Username);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==我们将公共的逻辑拿到外层组件，处理好后以属性的方式传递给原本的组件，为此高阶组件就是一个 React 组件包裹着另外一个 React 组件==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**4.使用react-redux实现todo**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Todos |-> TodoHeader======      ==|-> TodoItems======      ==|-> TodoFooter======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.实现react-redux库**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**react-redux计数器**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==和以前写过的逻辑一致,这回加上react-redux的逻辑==")]),s(`
`),n("span",{class:"line"},[n("span",null,`==import React from 'react';========import ReactDOM from 'react-dom';========import Counter from "./components/Counter";========import store from './store/index';========import {Provider} from 'react-redux';========ReactDOM.render(======  ==<Provider store={store}>======    ==<Counter/>======  ==</Provider>,window.root);======`)]),s(`
`),n("span",{class:"line"},[n("span",null,"==// counter组件========class Counter extends React.Component {======  ==render(){======    ==return <div>======      ==数量:{this.props.number}======      ==<button onClick={()=>{this.props.add(1)}}>+</button>======      ==<button  onClick={()=>{this.props.minus(1)}}>-</button>======      ==</div>======  ==}========}========export default connect(state=>({...state}),dispatch=>({======  ==add:(amount)=>{dispatch(actions.add(amount))},======  ==minus:(amount)=>{dispatch(actions.minus(amount))}========}))(Counter)======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**编写react-redux库**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==import React from 'react';========import PropTypes from 'prop-types';========class Provider extends React.Component{======  ==static childContextTypes = {======    ==store:PropTypes.object======  ==};======  ==getChildContext(){======    ==return {store:this.props.store}======  ==}======  ==constructor(){======    ==super();======  ==}======  ==render(){======    ==return this.props.children;======  ==}========}========let connect = (mapStateToProps,mapDispatchToProps) => (Component) =>{======  ==return class Proxy extends React.Component{======    ==static contextTypes = {======      ==store:PropTypes.object======    ==};======    ==componentDidMount(){======      ==this.unsubscribe = this.context.store.subscribe(()=>{======        ==this.setState(mapStateToProps(this.context.store.getState()))======      ==});======    ==}======    ==componentWillUnmount(){======      ==this.unsubscribe();======    ==}======    ==constructor(props,context){======      ==super();======      ==this.state = mapStateToProps(context.store.getState());======    ==}======    ==render(){======      ==return <Component {...this.state} {...mapDispatchToProps(this.context.store.dispatch)}/>======    ==}======  ==}========};========export {Provider,connect}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**bindActionCreators方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==let bindActionCreators = (actions,dispatch) => {======  ==let obj = {}======  ==for(let key in actions){======    ==obj[key] = (...args)=>{======      ==dispatch(actions[key](...args))======    ==}======  ==}======  ==return obj========};======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==export default connect(state=>({...state}),dispatch=>bindActionCreators(actions,dispatch))(Counter)======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==bindActionCreators是redux中的一个方法，并且这样的逻辑过于复杂，我们依旧希望可以在react-redux中内部可以简化操作==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**简化mapDispatchToProps**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==export default connect(state=>({...state}),actions)(Counter);======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==import {bindActionCreators} from './redux'========render(){======  ==let r ={}======  ==if(typeof mapDispatchToProps === 'object'){======    ==r = bindActionCreators(mapDispatchToProps,this.context.store.dispatch)======  ==}else{======    ==r = mapDispatchToProps(this.context.store.dispatch)======  ==}======  ==return <Component {...this.state} {...r}/>========}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==这样我们在组件中更改状态时可以直接传入actionCreator对象。==")])])])]),n("p",null,[s("> 来自 <"),n("a",{href:"https://zhufengzhufeng.github.io/zhufengreact/html/React-Redux.html#t11.%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6",target:"_blank",rel:"noreferrer"},"https://zhufengzhufeng.github.io/zhufengreact/html/React-Redux.html#t11.%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6"),s(">")])],-1)])])}const g=a(p,[["render",o]]);export{m as __pageData,g as default};
