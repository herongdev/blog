import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"src-index.js","description":"围绕“src-index.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-index.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-index.js”整理的概念、示例与实践笔记。","sidebarWeight":39,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Context(上下文)/src-index.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-index.js.md","filePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-index.js.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-index.js.md"};function c(t,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-index-js",tabindex:"-1"},[s("src-index.js "),n("a",{class:"header-anchor",href:"#src-index-js","aria-label":'Permalink to "src-index.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from './react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from './react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"let ThememContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 如果类组件的话，可以通过给它添加contextType静态属性来取到this.context")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Header() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ThememContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <div style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"            margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            border: `5px solid ${value.color}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            padding: '5px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            header")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Title />")]),s(`
`),n("span",{class:"line"},[n("span",null,"          </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ThememContext.Consumer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Header extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = ThememContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"          margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          border: `5px solid ${this.context.color}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          padding: '5px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        header")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Title />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Title extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = ThememContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"          margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          border: `5px solid ${this.context.color}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          padding: '5px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        title")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Main extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = ThememContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"          margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          border: `5px solid ${this.context.color}`, padding: '5px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        main")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Content />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Content extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static contextType = ThememContext")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"          margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          border: `5px solid ${this.context.color}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          padding: '5px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Content")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={() => this.context.changeColor('red')}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          style={{ color: 'red' }}>红色</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={() => this.context.changeColor('green')}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          style={{ color: 'green' }}>绿色</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Page extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { color: 'red' };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  changeColor = (color) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ color });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let value = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      color: this.state.color,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      changeColor: this.changeColor")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ThememContext.Provider value={value}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"          style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"            margin: '10px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            border: `5px solid ${this.state.color}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            padding: '5px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            width: '250px'")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          page")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Header />")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Main />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </ThememContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Page />, document.getElementById('root'));")])])])])],-1)])])}const h=a(i,[["render",c]]);export{m as __pageData,h as default};
