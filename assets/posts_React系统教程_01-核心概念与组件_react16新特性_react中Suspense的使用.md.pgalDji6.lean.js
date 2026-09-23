import{_ as a,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"react中Suspense的使用","description":"OtherComponent是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。 在\\\\<OtherComponent /\\\\ 外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化。","frontmatter":{"title":"react中Suspense的使用","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"OtherComponent是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。 在\\\\<OtherComponent /\\\\ 外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化。","sidebarWeight":8,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/新特性/react16新特性/react中Suspense的使用.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/react16新特性/react中Suspense的使用.md","filePath":"posts/React系统教程/01-核心概念与组件/react16新特性/react中Suspense的使用.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/react16新特性/react中Suspense的使用.md"};function o(c,s,i,u,r,d){return l(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"react中suspense的使用",tabindex:"-1"},[e("react中Suspense的使用 "),n("a",{class:"header-anchor",href:"#react中suspense的使用","aria-label":'Permalink to "react中Suspense的使用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“react中Suspense的使用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"关于Suspense的使用，先来看下示例代码")]),e(`
`),n("span",{class:"line"},[n("span",null,"const OtherComponent = React.lazy(() => import('./OtherComponent'));")]),e(`
`),n("span",{class:"line"},[n("span",null,"function MyComponent() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),e(`
`),n("span",{class:"line"},[n("span",null,"        <div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"            <Suspense fallback={<div>Loading...</div>}>")]),e(`
`),n("span",{class:"line"},[n("span",null,"                <OtherComponent />")]),e(`
`),n("span",{class:"line"},[n("span",null,"            </Suspense>")]),e(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    );")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"OtherComponent是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。"),n("p",null,"在<OtherComponent />外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化整个页面的交互"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。")]),e(`
`),n("span",{class:"line"},[n("span",null,"const OtherComponent = React.lazy(() => import('./OtherComponent'));")]),e(`
`),n("span",{class:"line"},[n("span",null,"const AnotherComponent = React.lazy(() => import('./AnotherComponent'));")]),e(`
`),n("span",{class:"line"},[n("span",null,"function MyComponent() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),e(`
`),n("span",{class:"line"},[n("span",null,"        <div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"            <Suspense fallback={<div>Loading...</div>}>")]),e(`
`),n("span",{class:"line"},[n("span",null,"                <section>")]),e(`
`),n("span",{class:"line"},[n("span",null,"                    <OtherComponent />")]),e(`
`),n("span",{class:"line"},[n("span",null,"                    <AnotherComponent />")]),e(`
`),n("span",{class:"line"},[n("span",null,"                </section>")]),e(`
`),n("span",{class:"line"},[n("span",null,"            </Suspense>")]),e(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    );")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://segmentfault.com/a/1190000020247862?utm_source=tag-newest>")])])])])],-1)])])}const v=a(p,[["render",o]]);export{m as __pageData,v as default};
