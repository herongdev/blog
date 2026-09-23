import{_ as l,o as a,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"src-index.js","description":"// 只有在构造函数中，才可以给 this.state 赋值 计数器 注意： 如果通过 this.state xxx 来直接修改 state 的值， state 本身也会改变，但视图不会更新； 如果在子组件中修改 props 的值，则会报错。","frontmatter":{"title":"src-index.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"// 只有在构造函数中，才可以给 this.state 赋值 计数器 注意： 如果通过 this.state xxx 来直接修改 state 的值， state 本身也会改变，但视图不会更新； 如果在子组件中修改 props 的值，则会报错。","sidebarWeight":75,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/类组件的更新 /src-index.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/类组件的更新/src-index.js.md","filePath":"posts/React系统教程/03-原理与手写实现/类组件的更新/src-index.js.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/类组件的更新/src-index.js.md"};function i(c,e,o,r,u,d){return a(),t("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"src-index-js",tabindex:"-1"},[n("src-index.js "),s("a",{class:"header-anchor",href:"#src-index-js","aria-label":'Permalink to "src-index.js"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'import React from "./react";')]),n(`
`),s("span",{class:"line"},[s("span",null,'import ReactDOM from "./react-dom";')]),n(`
`),s("span",{class:"line"},[s("span",null,"class Counter extends React.Component {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    super(props);")])])])]),s("p",null,[s("code",null,"//"),n(" 只有在构造函数中，才可以给"),s("code",null,"this.state"),n("赋值")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    this.state = { number: 0 };")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  handleClick = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(this.state);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"      <div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <p>{this.props.title}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <p>number:{this.state.number}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <button onClick={this.handleClick}>+</button>")]),n(`
`),s("span",{class:"line"},[s("span",null,"      </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    )")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),n(`
`),s("span",{class:"line"},[s("span",null,'  <Counter title="')])])])]),s("p",null,"计数器"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'" />,')]),n(`
`),s("span",{class:"line"},[s("span",null,'  document.getElementById("root")')]),n(`
`),s("span",{class:"line"},[s("span",null,");")])])])]),s("p",null,[n("注意： 如果通过"),s("code",null,"this.state=xxx"),n("来直接修改"),s("code",null,"state"),n("的值，"),s("code",null,"state"),n("本身也会改变，但视图不会更新； 如果在子组件中修改"),s("code",null,"props"),n("的值，则会报错；")])],-1)])])}const m=l(p,[["render",i]]);export{x as __pageData,m as default};
