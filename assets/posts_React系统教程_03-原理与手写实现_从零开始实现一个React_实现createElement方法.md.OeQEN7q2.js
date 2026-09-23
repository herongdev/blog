import{_ as e,o as a,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"实现createElement方法","description":"围绕“实现createElement方法”整理的概念、示例与实践笔记。","frontmatter":{"title":"实现createElement方法","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“实现createElement方法”整理的概念、示例与实践笔记。","sidebarWeight":15,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/从零开始实现一个React/实现createElement方法.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现createElement方法.md","filePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现createElement方法.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现createElement方法.md"};function c(i,s,r,u,o,d){return a(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实现createelement方法",tabindex:"-1"},[l("实现createElement方法 "),n("a",{class:"header-anchor",href:"#实现createelement方法","aria-label":'Permalink to "实现createElement方法"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现createElement方法”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"babel会对代码进行转译，发现jsx语法，即按照编译指示，比如调用react.createElement方法将其转化为一个对象。比如：")]),l(`
`),n("span",{class:"line"},[n("span",null,"const element = (")]),l(`
`),n("span",{class:"line"},[n("span",null,'<div id="foo">')]),l(`
`),n("span",{class:"line"},[n("span",null,"<a>bar</a>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<b />")]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,")")]),l(`
`),n("span",{class:"line"},[n("span",null,"会被babel转译成：")]),l(`
`),n("span",{class:"line"},[n("span",null,"const element = React.createElement(")]),l(`
`),n("span",{class:"line"},[n("span",null,'"div",')]),l(`
`),n("span",{class:"line"},[n("span",null,'{ id: "foo" },')]),l(`
`),n("span",{class:"line"},[n("span",null,'React.createElement("a", null, "bar"),')]),l(`
`),n("span",{class:"line"},[n("span",null,'React.createElement("b")')]),l(`
`),n("span",{class:"line"},[n("span",null,")")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"以下是createElement方法：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, props, ...children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"type,")]),l(`
`),n("span",{class:"line"},[n("span",null,"props: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"...props,")]),l(`
`),n("span",{class:"line"},[n("span",null,"children,")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,'==We use the== _spread operator_ ==for the== ==props== ==and the== _rest parameter syntax_ ==for the== ==children, this way the== ==children== ==prop will always be an array====。==For example, createElement("div") returns:')]),l(`
`),n("span",{class:"line"},[n("span",null,"=={==")]),l(`
`),n("span",{class:"line"},[n("span",null,'=="type"====: "div",==')]),l(`
`),n("span",{class:"line"},[n("span",null,'=="props"====: {== =="children"====: [] }==')]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),l(`
`),n("span",{class:"line"},[n("span",null,'createElement("div", null, a) returns:')]),l(`
`),n("span",{class:"line"},[n("span",null,"=={==")]),l(`
`),n("span",{class:"line"},[n("span",null,'=="type"====: "div",==')]),l(`
`),n("span",{class:"line"},[n("span",null,'=="props"====: {== =="children"====: [====a====] }==')]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),l(`
`),n("span",{class:"line"},[n("span",null,'and createElement("div", null, a, b) returns:')]),l(`
`),n("span",{class:"line"},[n("span",null,"=={==")]),l(`
`),n("span",{class:"line"},[n("span",null,'=="type"====: "div",==')]),l(`
`),n("span",{class:"line"},[n("span",null,'=="props"====: {== =="children"====: [====a====,== ==b====] }==')]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==如上所示，====createElement====方法返回的对象有两个属性：==")]),l(`
`),n("span",{class:"line"},[n("span",null,"一为type，表示虚拟dom的类型，可能是原生类型，也可能是我们自定义的组件类型，原生类型用字符串来表示，自定义类型则为一个函数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"二为props，这就是jsx中的属性键值对，属性中还有一个重要children属性，")]),l(`
`),n("span",{class:"line"},[n("span",null,"children的值有可能是原始值（true,false,数字，字符串，null等），也有可能是对象（jsx对象会被createElement方法递归转换成对象）， 分开对待，修改createElement方法：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function createElement(type, props, ...children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"type,")]),l(`
`),n("span",{class:"line"},[n("span",null,"props: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"...props,")]),l(`
`),n("span",{class:"line"},[n("span",null,"children: children.map(child =>")]),l(`
`),n("span",{class:"line"},[n("span",null,'typeof child === "object"')]),l(`
`),n("span",{class:"line"},[n("span",null,"? child")]),l(`
`),n("span",{class:"line"},[n("span",null,": createTextElement(child)")]),l(`
`),n("span",{class:"line"},[n("span",null,"),")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createTextElement(text) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return {")]),l(`
`),n("span",{class:"line"},[n("span",null,'type: "TEXT_ELEMENT",')]),l(`
`),n("span",{class:"line"},[n("span",null,"props: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"nodeValue: text,")]),l(`
`),n("span",{class:"line"},[n("span",null,"children: [],")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const E=e(t,[["render",c]]);export{h as __pageData,E as default};
