import{_ as e,o as l,c as t,j as a,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"JavaScript 表达式作为子元素","description":"围绕“JavaScript 表达式作为子元素”整理的概念、示例与实践笔记。","frontmatter":{"title":"JavaScript 表达式作为子元素","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“JavaScript 表达式作为子元素”整理的概念、示例与实践笔记。","sidebarWeight":12,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/JSX 中的子元素/JavaScript 表达式作为子元素.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/JavaScript 表达式作为子元素.md","filePath":"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/JavaScript 表达式作为子元素.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/JSX 中的子元素/JavaScript 表达式作为子元素.md"};function i(c,n,o,r,u,d){return l(),t("div",null,[...n[0]||(n[0]=[a("div",null,[a("h1",{id:"javascript-表达式作为子元素",tabindex:"-1"},[s("JavaScript 表达式作为子元素 "),a("a",{class:"header-anchor",href:"#javascript-表达式作为子元素","aria-label":'Permalink to "JavaScript 表达式作为子元素"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“JavaScript 表达式作为子元素”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"JavaScript 表达式可以被包裹在 {} 中作为子元素。例如，以下表达式是等价的：")]),s(`
`),a("span",{class:"line"},[a("span",null,"<MyComponent>foo</MyComponent>")]),s(`
`),a("span",{class:"line"},[a("span",null,"<MyComponent>{'foo'}</MyComponent>")]),s(`
`),a("span",{class:"line"},[a("span",null,"这对于展示任意长度的列表非常有用。例如，渲染 HTML 列表：")]),s(`
`),a("span",{class:"line"},[a("span",null,"function Item(props) {")]),s(`
`),a("span",{class:"line"},[a("span",null,"    return <li>{props.message}</li>;")]),s(`
`),a("span",{class:"line"},[a("span",null,"}")]),s(`
`),a("span",{class:"line"},[a("span",null,"function TodoList() {")]),s(`
`),a("span",{class:"line"},[a("span",null,"    const todos = ['finish doc', 'submit pr', 'nag dan to review'];")]),s(`
`),a("span",{class:"line"},[a("span",null,"    return (")]),s(`
`),a("span",{class:"line"},[a("span",null,"        <ul>")]),s(`
`),a("span",{class:"line"},[a("span",null,"            {todos.map((message) => <Item")]),s(`
`),a("span",{class:"line"},[a("span",null,"                key={message}")]),s(`
`),a("span",{class:"line"},[a("span",null,"                message={message}")]),s(`
`),a("span",{class:"line"},[a("span",null,"            />)}")]),s(`
`),a("span",{class:"line"},[a("span",null,"        </ul>")]),s(`
`),a("span",{class:"line"},[a("span",null,"    );")]),s(`
`),a("span",{class:"line"},[a("span",null,"}")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"JavaScript 表达式也可以和其他类型的子元素组合。这种做法可以方便地替代模板字符串：")]),s(`
`),a("span",{class:"line"},[a("span",null,"function Hello(props) {  return <div>Hello {props.addressee}!</div>;")]),s(`
`),a("span",{class:"line"},[a("span",null,"}")])])])])],-1)])])}const g=e(p,[["render",i]]);export{m as __pageData,g as default};
