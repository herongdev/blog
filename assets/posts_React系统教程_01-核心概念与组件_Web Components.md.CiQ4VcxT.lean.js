import{_ as a,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"Web Components","description":"Web Components 为可复用组件提供了强大的封装，而 React 则提供了声明式的解决方案，使 DOM 与数据保持同步。两者旨在互补。 作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Component。","frontmatter":{"title":"Web Components","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"Web Components 为可复用组件提供了强大的封装，而 React 则提供了声明式的解决方案，使 DOM 与数据保持同步。两者旨在互补。 作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Component。","sidebarWeight":46,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Web Components.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Web Components.md","filePath":"posts/React系统教程/01-核心概念与组件/Web Components.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Web Components.md"};function o(c,s,i,u,m,d){return l(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"web-components",tabindex:"-1"},[e("Web Components "),n("a",{class:"header-anchor",href:"#web-components","aria-label":'Permalink to "Web Components"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Web Components”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 和 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 为了解决不同的问题而生。")])])])]),n("p",null,"Web Components 为可复用组件提供了强大的封装，而 React 则提供了声明式的解决方案，使 DOM 与数据保持同步。两者旨在互补。"),n("p",null,"作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Components，或者两者共存。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"大多数开发者在使用 React 时，不使用 Web Components，但可能你会需要使用，尤其是在使用 Web Components 编写的第三方 UI 组件时。")]),e(`
`),n("span",{class:"line"},[n("span",null,"**在** **React** **中使用** **Web Components**")]),e(`
`),n("span",{class:"line"},[n("span",null,"class HelloMessage extends React.Component {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return <div>Hello")]),e(`
`),n("span",{class:"line"},[n("span",null,"      <x-search>{this.props.name}</x-search>!")]),e(`
`),n("span",{class:"line"},[n("span",null,"      </div>;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"注意：")]),e(`
`),n("span",{class:"line"},[n("span",null,"Web Components 通常暴露的是命令式 API。例如，Web Components 的组件 video 可能会公开 play() 和 pause() 方法。要访问 Web Components 的命令式 API，你需要使用 ref 直接与 DOM 节点进行交互。")])])])]),n("p",null,"如果你使用的是第三方 Web Components，那么最好的解决方案是编写 React 组件包装该 Web Components。 Web Components 触发的事件可能无法通过 React 渲染树正确的传递。 你需要在 React 组件中手动添加事件处理器来处理这些事件。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"常见的误区是在 Web Components 中使用的是 class 而非 className。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function BrickFlipbox() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),e(`
`),n("span",{class:"line"},[n("span",null,'    <brick-flipbox class="demo">')]),e(`
`),n("span",{class:"line"},[n("span",null,"      <div>front</div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"      <div>back</div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    </brick-flipbox>")]),e(`
`),n("span",{class:"line"},[n("span",null,"  );")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**在** **Web Components** **中使用** **React**")]),e(`
`),n("span",{class:"line"},[n("span",null,"class XSearch extends HTMLElement {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  connectedCallback() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    const mountPoint = document.createElement('span');")]),e(`
`),n("span",{class:"line"},[n("span",null,"    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    const name = this.getAttribute('name');")]),e(`
`),n("span",{class:"line"},[n("span",null,"    const url = '[https://www.google.com/search?q=](https://www.google.com/search?q=)' + encodeURIComponent(name);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    ReactDOM.render(")]),e(`
`),n("span",{class:"line"},[n("span",null,"      <a href={url}>{name}</a>,")]),e(`
`),n("span",{class:"line"},[n("span",null,"      mountPoint")]),e(`
`),n("span",{class:"line"},[n("span",null,"    );")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"customElements.define('x-search', XSearch);")]),e(`
`),n("span",{class:"line"},[n("span",null,"注意：")]),e(`
`),n("span",{class:"line"},[n("span",null,"如果使用 Babel 来转换 class，此代码将**不会**起作用。请查阅该 [issue](https://github.com/w3c/webcomponents/issues/587) 了解相关讨论。 在加载 Web Components 前请引入 [custom-elements-es5-adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs) 来解决该 issue。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/web-components.html>")])])])])],-1)])])}const h=a(p,[["render",o]]);export{b as __pageData,h as default};
