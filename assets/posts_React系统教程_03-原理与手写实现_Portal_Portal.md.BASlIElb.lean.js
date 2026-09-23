import{_ as a,o as e,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Portal","description":"React v16 增加了对 Portal 的直接支持 它可以把 JSX 渲染到一个单独的 DOM 节点中 模态窗。","frontmatter":{"title":"Portal","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"React v16 增加了对 Portal 的直接支持 它可以把 JSX 渲染到一个单独的 DOM 节点中 模态窗。","sidebarWeight":43,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Portal /Portal.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Portal/Portal.md","filePath":"posts/React系统教程/03-原理与手写实现/Portal/Portal.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/Portal/Portal.md"};function o(c,s,i,r,u,d){return e(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"portal",tabindex:"-1"},[l("Portal "),n("a",{class:"header-anchor",href:"#portal","aria-label":'Permalink to "Portal"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Portal”的核心思路，并能把它用于实际开发或面试表达。")]),n("ul",null,[n("li",null,[n("code",null,"React v16"),l("增加了对"),n("code",null,"Portal"),l("的直接支持")]),n("li",null,[l("它可以把"),n("code",null,"JSX"),l("渲染到一个单独的"),n("code",null,"DOM"),l("节点中")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),l(`
`),n("span",{class:"line"},[n("span",null,"import React from './react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from './react-dom';")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Dialog extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.node = document.createElement('div');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    document.body.appendChild(this.node);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ReactDOM.createPortal(")]),l(`
`),n("span",{class:"line"},[n("span",null,'      <div className="dialog">')]),l(`
`),n("span",{class:"line"},[n("span",null,"        {this.props.children}")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>,")]),l(`
`),n("span",{class:"line"},[n("span",null,"      this.node")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    window.document.body.removeChild(this.node);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"class App extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <Dialog>")])])])]),n("p",null,"模态窗"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"</Dialog>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    )")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <App />, document.getElementById('root'));")])])])])],-1)])])}const v=a(p,[["render",o]]);export{h as __pageData,v as default};
