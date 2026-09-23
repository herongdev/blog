import{_ as a,o as t,c as l,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"正确地使用 State(5m)","description":"围绕“正确地使用 State(5m)”整理的概念、示例与实践笔记。","frontmatter":{"title":"正确地使用 State(5m)","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“正确地使用 State(5m)”整理的概念、示例与实践笔记。","sidebarWeight":44,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/State & 生命周期/正确地使用 State(5m).md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/State & 生命周期/正确地使用 State(5m).md","filePath":"posts/React系统教程/01-核心概念与组件/State & 生命周期/正确地使用 State(5m).md"}'),p={name:"posts/React系统教程/01-核心概念与组件/State & 生命周期/正确地使用 State(5m).md"};function i(c,e,o,r,u,m){return t(),l("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"正确地使用-state-5m",tabindex:"-1"},[n("正确地使用 State(5m) "),s("a",{class:"header-anchor",href:"#正确地使用-state-5m","aria-label":'Permalink to "正确地使用 State(5m)"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“正确地使用 State(5m)”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**一、不要直接修改** **State**")]),n(`
`),s("span",{class:"line"},[s("span",null,"例如，此代码不会重新渲染组件：")]),n(`
`),s("span",{class:"line"},[s("span",null,"// Wrongthis.state.comment = 'Hello';")]),n(`
`),s("span",{class:"line"},[s("span",null,"而是应该使用 setState():")]),n(`
`),s("span",{class:"line"},[s("span",null,"// Correctthis.setState({comment: 'Hello'});")]),n(`
`),s("span",{class:"line"},[s("span",null,"构造函数是唯一可以给 this.state 直接赋值的地方：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**二、****State** **的更新可能是异步的**")]),n(`
`),s("span",{class:"line"},[s("span",null,"出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。")]),n(`
`),s("span",{class:"line"},[s("span",null,"因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。")]),n(`
`),s("span",{class:"line"},[s("span",null,"例如，此代码可能会无法更新计数器：")]),n(`
`),s("span",{class:"line"},[s("span",null,"// Wrongthis.setState({  counter: this.state.counter + this.props.increment,});")]),n(`
`),s("span",{class:"line"},[s("span",null,"要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。")]),n(`
`),s("span",{class:"line"},[s("span",null,"这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：")]),n(`
`),s("span",{class:"line"},[s("span",null,"// Correctthis.setState((prevState, NextProps) => ({  counter: prevState.counter + NextProps.increment}));")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面使用了[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，不过使用普通的函数也同样可以：")]),n(`
`),s("span",{class:"line"},[s("span",null,"// Correctthis.setState(function(state, props) {  return {    counter: state.counter + props.increment  };});")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**三、****State** **的更新会被合并**")]),n(`
`),s("span",{class:"line"},[s("span",null,"当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。")]),n(`
`),s("span",{class:"line"},[s("span",null,"例如，你的 state 包含几个独立的变量：")]),n(`
`),s("span",{class:"line"},[s("span",null,"constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  super(props);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  this.state = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    posts: [],")]),n(`
`),s("span",{class:"line"},[s("span",null,"    comments: []")]),n(`
`),s("span",{class:"line"},[s("span",null,"  };")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"然后你可以分别调用 setState() 来单独地更新它们：")]),n(`
`),s("span",{class:"line"},[s("span",null,"componentDidMount() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  fetchPosts().then(response => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"      posts: response.posts")]),n(`
`),s("span",{class:"line"},[s("span",null,"    });")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")]),n(`
`),s("span",{class:"line"},[s("span",null,"  fetchComments().then(response => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"      comments: response.comments")]),n(`
`),s("span",{class:"line"},[s("span",null,"    });")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts， 但是完全替换了 this.state.comments。")])])])])],-1)])])}const S=a(p,[["render",i]]);export{d as __pageData,S as default};
