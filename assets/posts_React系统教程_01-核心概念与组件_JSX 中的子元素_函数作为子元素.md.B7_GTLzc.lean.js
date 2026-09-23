import{_ as a,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"函数作为子元素","description":"围绕“函数作为子元素”整理的概念、示例与实践笔记。","frontmatter":{"title":"函数作为子元素","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“函数作为子元素”整理的概念、示例与实践笔记。","sidebarWeight":13,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/JSX 中的子元素/函数作为子元素.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/函数作为子元素.md","filePath":"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/函数作为子元素.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/函数作为子元素.md"};function p(c,e,o,r,u,d){return l(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"函数作为子元素",tabindex:"-1"},[s("函数作为子元素 "),n("a",{class:"header-anchor",href:"#函数作为子元素","aria-label":'Permalink to "函数作为子元素"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“函数作为子元素”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"通常，JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。不过，props.children 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。例如，如果你有一个自定义组件，你可以把回调函数作为 props.children 进行传递：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用子元素回调 numTimes 次，来重复生成组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Repeat(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let items = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let i = 0; i < props.numTimes; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        items.push(props.children(i));")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>{items}</div>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ListOfTenThings() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Repeat numTimes={10}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {(index) => <div key={index}>This is item {index} in the list</div>}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </Repeat>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX。")])])])])],-1)])])}const f=a(i,[["render",p]]);export{h as __pageData,f as default};
