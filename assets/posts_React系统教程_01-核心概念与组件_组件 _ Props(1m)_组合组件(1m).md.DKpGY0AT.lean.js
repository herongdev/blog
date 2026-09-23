import{_ as s,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"组合组件(1m)","description":"通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。","frontmatter":{"title":"组合组件(1m)","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。","sidebarWeight":85,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/组件 & Props(1m)/组合组件(1m).md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/组合组件(1m).md","filePath":"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/组合组件(1m).md"}'),p={name:"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/组合组件(1m).md"};function c(o,a,i,r,u,m){return l(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"组合组件-1m",tabindex:"-1"},[e("组合组件(1m) "),n("a",{class:"header-anchor",href:"#组合组件-1m","aria-label":'Permalink to "组合组件(1m)"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“组合组件(1m)”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。")]),e(`
`),n("span",{class:"line"},[n("span",null,"例如，我们可以创建一个可以多次渲染 Welcome 组件的 App 组件：")]),e(`
`),n("span",{class:"line"},[n("span",null,"function Welcome(props) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return <h1>Hello, {props.name}</h1>;")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),e(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),e(`
`),n("span",{class:"line"},[n("span",null,'      <Welcome name="Sara" />')]),e(`
`),n("span",{class:"line"},[n("span",null,'      <Welcome name="Cahal" />')]),e(`
`),n("span",{class:"line"},[n("span",null,'      <Welcome name="Edite" />')]),e(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"  );")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),e(`
`),n("span",{class:"line"},[n("span",null,"  <App />,")]),e(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),e(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("p",null,"通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。")],-1)])])}const f=s(p,[["render",c]]);export{h as __pageData,f as default};
