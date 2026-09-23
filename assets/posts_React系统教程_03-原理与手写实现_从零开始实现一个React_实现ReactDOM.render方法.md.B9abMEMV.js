import{_ as t,o as s,c as l,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const R=JSON.parse('{"title":"实现ReactDOM.render方法","description":"调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。","frontmatter":{"title":"实现ReactDOM.render方法","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/从零开始实现一个React/实现ReactDOM.render方法.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现ReactDOM.render方法.md","filePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现ReactDOM.render方法.md"}'),c={name:"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/实现ReactDOM.render方法.md"};function r(o,a,d,p,i,m){return s(),l("div",null,[...a[0]||(a[0]=[e("div",null,[e("h1",{id:"实现reactdom-render方法",tabindex:"-1"},[n("实现ReactDOM.render方法 "),e("a",{class:"header-anchor",href:"#实现reactdom-render方法","aria-label":'Permalink to "实现ReactDOM.render方法"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“实现ReactDOM.render方法”的核心思路，并能把它用于实际开发或面试表达。 调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"function render(element, container) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    const dom =")]),n(`
`),e("span",{class:"line"},[e("span",null,'        element.type == "TEXT_ELEMENT"')]),n(`
`),e("span",{class:"line"},[e("span",null,'            ? document.createTextNode("")')]),n(`
`),e("span",{class:"line"},[e("span",null,"            : document.createElement(element.type)")]),n(`
`),e("span",{class:"line"},[e("span",null,'    const isProperty = key => key !== "children"')]),n(`
`),e("span",{class:"line"},[e("span",null,"    Object.keys(element.props)")]),n(`
`),e("span",{class:"line"},[e("span",null,"        .filter(isProperty)")]),n(`
`),e("span",{class:"line"},[e("span",null,"        .forEach(name => {")]),n(`
`),e("span",{class:"line"},[e("span",null,"            dom[name] = element.props[name]")]),n(`
`),e("span",{class:"line"},[e("span",null,"        })")]),n(`
`),e("span",{class:"line"},[e("span",null,"    element.props.children.forEach(child =>")]),n(`
`),e("span",{class:"line"},[e("span",null,"        render(child, dom)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    )")]),n(`
`),e("span",{class:"line"},[e("span",null,"    container.appendChild(dom)")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const D=t(c,[["render",r]]);export{R as __pageData,D as default};
