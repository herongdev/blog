import{_ as a,o as e,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"(5)跨级组件通信","description":"所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层的子组件通信。跨级组件通信可以采用下面两种方式： 中间组件层层传递 props 使用 context 对象 全局变量 第一种方式：如果父组件结构较深，那么中间的每一层组件都要去传递 props ，增加了复杂度，并且这些 p。","frontmatter":{"title":"(5)跨级组件通信","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层的子组件通信。跨级组件通信可以采用下面两种方式： 中间组件层层传递 props 使用 context 对象 全局变量 第一种方式：如果父组件结构较深，那么中间的每一层组件都要去传递 props ，增加了复杂度，并且这些 p。","sidebarWeight":114,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/数据流/组件通信/(5)跨级组件通信.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)跨级组件通信.md","filePath":"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)跨级组件通信.md"}'),p={name:"posts/Vue系统教程/04-路由与状态管理/组件通信/(5)跨级组件通信.md"};function i(c,s,o,u,d,r){return e(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"_5-跨级组件通信",tabindex:"-1"},[l("(5)跨级组件通信 "),n("a",{class:"header-anchor",href:"#_5-跨级组件通信","aria-label":'Permalink to "(5)跨级组件通信"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“(5)跨级组件通信”的核心思路，并能把它用于实际开发或面试表达。 所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层的子组件通信。跨级组件通信可以采用下面两种方式：")]),n("ul",null,[n("li",null,[l("中间组件层层传递 "),n("code",null,"props")]),n("li",null,[l("使用 "),n("code",null,"context"),l(" 对象")]),n("li",null,"全局变量")]),n("p",null,[l("第一种方式：如果父组件结构较深，那么中间的每一层组件都要去传递 "),n("code",null,"props"),l("，增加了复杂度，并且这些 "),n("code",null,"props"),l(" 并不是这些中间组件自己所需要的。不过这种方式也是可行的，当组件层次在三层以内可以采用这种方式，当组件嵌套过深时，采用这种方式就需要斟酌了。")]),n("p",null,[l("第二种方式：使用 "),n("code",null,"context"),l(" 是另一种可行的方式，"),n("code",null,"context"),l(" 相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。 使用 "),n("code",null,"context"),l(" 也很简单，需要满足两个条件：")]),n("ul",null,[n("li",null,[l("上级组件要声明自己支持 "),n("code",null,"context"),l("，并提供一个函数来返回相应的 "),n("code",null,"context"),l(" 对象")]),n("li",null,[l("子组件要声明自己需要使用 "),n("code",null,"context")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"全局"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"context")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { createContext } from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"创建一个"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," context")]),l(`
`),n("span",{class:"line"},[n("span",null,"export const MyContext = createContext();")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"父组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { useState } from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { MyContext } from './myContext';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import Child from './Child';")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Parent() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const [name, setName] = useState('zhangsan');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <MyContext.Provider value={name}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <h1>Parent {name}</h1>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <Child setName={setName} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </MyContext.Provider>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  )")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default Parent;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"子组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import SubChild from './SubChild';")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Child({ setName }) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <h1>Child</h1>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <button onClick={() => setName('lisi')}>Change Name</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <SubChild />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  )")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default Child;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"孙组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { useContext } from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { MyContext } from './myContext';")]),l(`
`),n("span",{class:"line"},[n("span",null,"function SubChild() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const name = useContext(MyContext);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <h1>SubChild {name}</h1>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  )")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default SubChild;")])])])])],-1)])])}const g=a(p,[["render",i]]);export{m as __pageData,g as default};
