import{_ as l,o as e,c as r,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"错误边界(Error Boundaries)","description":"如果当一个组件异步加载下载js文件时，网络错误，无法下载 js 文件 Suspense 无法处理这种错误情况， 在 react 中有一个 错误边界 （Error Boundaries）的概念，用来解决这种问题，它是利用了 react 生命周期的 componentDidCatch。","frontmatter":{"title":"错误边界(Error Boundaries)","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","工程化、质量与性能"],"description":"如果当一个组件异步加载下载js文件时，网络错误，无法下载 js 文件 Suspense 无法处理这种错误情况， 在 react 中有一个 错误边界 （Error Boundaries）的概念，用来解决这种问题，它是利用了 react 生命周期的 componentDidCatch。","sidebarWeight":61,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/性能优化/错误边界(Error Boundaries).md"},"headers":[],"relativePath":"posts/Vue系统教程/06-工程化、质量与性能/错误边界(Error Boundaries).md","filePath":"posts/Vue系统教程/06-工程化、质量与性能/错误边界(Error Boundaries).md"}'),t={name:"posts/Vue系统教程/06-工程化、质量与性能/错误边界(Error Boundaries).md"};function p(i,a,o,c,u,d){return e(),r("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"错误边界-error-boundaries",tabindex:"-1"},[s("错误边界(Error Boundaries) "),n("a",{class:"header-anchor",href:"#错误边界-error-boundaries","aria-label":'Permalink to "错误边界(Error Boundaries)"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“错误边界(Error Boundaries)”的核心思路，并能把它用于实际开发或面试表达。")]),n("ul",null,[n("li",null,"如果当一个组件异步加载下载js文件时，网络错误，无法下载 js 文件 Suspense 无法处理这种错误情况， 在 react 中有一个 错误边界 （Error Boundaries）的概念，用来解决这种问题，它是利用了 react 生命周期的 componentDidCatch 方法来处理"),n("li",null,"有两种方式，一种是 生命周期 componentDidCatch 来处理错误，还有一种 是 静态方法 static getDerivedStateFromError 来处理错误，"),n("li",null,"请使用static getDerivedStateFromError()渲染备用 UI ，使用 componentDidCatch() 打印错误信息。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { Component, Suspense } from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Loading from './components/Loading';")]),s(`
`),n("span",{class:"line"},[n("span",null,`const AppTitle = React.lazy(() => import(/* webpackChunkName: "title" */'./components/Title'))`)]),s(`
`),n("span",{class:"line"},[n("span",null,"class App extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    visible: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    isError: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  show = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ visible: true });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static getDerivedStateFromError(error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return { isError: true };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidCatch(err, info) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(err, info)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.state.isError) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return (<div>error</div>)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          this.state.visible && (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Suspense fallback={<Loading />}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"              <App Title />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </Suspense>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          )")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.show}>")])])])]),n("p",null,"加载"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <App />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.querySelector('#root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])])],-1)])])}const g=l(t,[["render",p]]);export{h as __pageData,g as default};
