import{_ as a,o as r,c as l,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"定义全局默认的错误边界(Error Boundaries) 处理函数","description":"考虑到整个应用的健壮性，针对每个主要组件设计错误边界(Error Boundaries)策略在 React 16 以后是有必要的。 2.1 定义用于 Error Boundaries 处理的 HOC 组件 一种简单的方式是设计一个 HOC 组件，然后用装饰器模式应用于要包裹的业务。","frontmatter":{"title":"定义全局默认的错误边界(Error Boundaries) 处理函数","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","工程化、质量与性能"],"description":"考虑到整个应用的健壮性，针对每个主要组件设计错误边界(Error Boundaries)策略在 React 16 以后是有必要的。 2.1 定义用于 Error Boundaries 处理的 HOC 组件 一种简单的方式是设计一个 HOC 组件，然后用装饰器模式应用于要包裹的业务。","sidebarWeight":72,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/错误处理/定义全局默认的错误边界(Error Boundaries) 处理函数.md"},"headers":[],"relativePath":"posts/Vue系统教程/06-工程化、质量与性能/定义全局默认的错误边界(Error Boundaries) 处理函数.md","filePath":"posts/Vue系统教程/06-工程化、质量与性能/定义全局默认的错误边界(Error Boundaries) 处理函数.md"}'),o={name:"posts/Vue系统教程/06-工程化、质量与性能/定义全局默认的错误边界(Error Boundaries) 处理函数.md"};function t(p,e,i,u,c,d){return r(),l("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"定义全局默认的错误边界-error-boundaries-处理函数",tabindex:"-1"},[s("定义全局默认的错误边界(Error Boundaries) 处理函数 "),n("a",{class:"header-anchor",href:"#定义全局默认的错误边界-error-boundaries-处理函数","aria-label":'Permalink to "定义全局默认的错误边界(Error Boundaries) 处理函数"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“定义全局默认的错误边界(Error Boundaries) 处理函数”的核心思路，并能把它用于实际开发或面试表达。 考虑到整个应用的健壮性，针对每个主要组件设计错误边界(Error Boundaries)策略在 React 16 以后是有必要的。 "),n("strong",null,"2.1 定义用于 Error Boundaries 处理的 HOC 组件"),s(" 一种简单的方式是设计一个 HOC 组件，然后用装饰器模式应用于要包裹的业务组件：")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export default tip => EBWrapComponent => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return class ErrorBoundary extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.state = { hasError: false };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        static getDerivedStateFromError(error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return { hasError: true };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        componentDidCatch(error, info) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            console.error(error, info.componentStack);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (this.state.hasError) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (!tip) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return <h2>{tip}</h2>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return <EBWrapComponent />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"应用示例："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"@ErrorBoundary('i am not ok')")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class LzwmeTestComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[s("> 来自 <"),n("a",{href:"http://lzw.me/a/react-16-error-boundaries.html",target:"_blank",rel:"noreferrer"},"http://lzw.me/a/react-16-error-boundaries.html"),s(">")])],-1)])])}const _=a(o,[["render",t]]);export{m as __pageData,_ as default};
