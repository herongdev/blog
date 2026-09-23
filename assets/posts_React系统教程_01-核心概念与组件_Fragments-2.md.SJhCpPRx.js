import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Fragments","description":"\\\\ 来自。","frontmatter":{"title":"Fragments","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"\\\\ 来自。","sidebarWeight":11,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Fragments.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Fragments-2.md","filePath":"posts/React系统教程/01-核心概念与组件/Fragments-2.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/Fragments-2.md"};function i(c,l,u,d,r,o){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"fragments",tabindex:"-1"},[s("Fragments "),n("a",{class:"header-anchor",href:"#fragments","aria-label":'Permalink to "Fragments"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Fragments”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 中的一个常见模式是一个组件返回多个元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <React.Fragment>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ChildA />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ChildB />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <ChildC />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </React.Fragment>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"还有一种新的[短语法](https://react.docschina.org/docs/fragments.html#short-syntax)可用于声明它们。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**动机**")]),s(`
`),n("span",{class:"line"},[n("span",null,"一种常见模式是组件返回一个子元素列表。以此 React 代码片段为例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Table extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Columns />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Columns /> 需要返回多个 <td> 元素以使渲染的 HTML 有效。如果在 <Columns /> 的 render() 中使用了父 div，则生成的 HTML 将无效。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Columns extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>Hello</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>World</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"得到一个 <Table /> 输出：")]),s(`
`),n("span",{class:"line"},[n("span",null,"<table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <td>Hello</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <td>World</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fragments 解决了这个问题。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**用法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Columns extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <React.Fragment>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>Hello</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>World</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </React.Fragment>);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这样可以正确的输出 <Table />：")]),s(`
`),n("span",{class:"line"},[n("span",null,"<table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <td>Hello</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <td>World</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</table>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**短语法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Columns extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>Hello</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>World</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以像使用任何其他元素一样使用 <> </>，除了它不支持 key 或属性。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**带** **key** **的** **Fragments**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用显式 <React.Fragment> 语法声明的片段可能具有 key。")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个使用场景是将一个集合映射到一个 Fragments 数组 - 举个例子，创建一个描述列表：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Glossary(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <dl>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {props.items.map(item => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 没有`key`，React 会发出一个关键警告")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <React.Fragment key={item.id}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <dt>{item.term}</dt>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <dd>{item.description}</dd>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </React.Fragment>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ))}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </dl>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"key 是唯一可以传递给 Fragment 的属性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"未来我们可能会添加对其他属性的支持，例如事件。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/fragments.html>")])])])])],-1)])])}const h=a(t,[["render",i]]);export{m as __pageData,h as default};
