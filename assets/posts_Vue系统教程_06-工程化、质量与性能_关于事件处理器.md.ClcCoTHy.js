import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"关于事件处理器","description":"错误边界 无法 捕获事件处理器内部的错误。 React 不需要错误边界来捕获事件处理器中的错误。 与 render 方法和生命周期方法不同，事件处理器不会在渲染期间触发。 因此，如果它们抛出异常， React 仍然能够知道需要在屏幕上显示什么。 如果你需要在事件处理器内部捕获错误。","frontmatter":{"title":"关于事件处理器","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","工程化、质量与性能"],"description":"错误边界 无法 捕获事件处理器内部的错误。 React 不需要错误边界来捕获事件处理器中的错误。 与 render 方法和生命周期方法不同，事件处理器不会在渲染期间触发。 因此，如果它们抛出异常， React 仍然能够知道需要在屏幕上显示什么。 如果你需要在事件处理器内部捕获错误。","sidebarWeight":71,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/错误处理/关于事件处理器.md"},"headers":[],"relativePath":"posts/Vue系统教程/06-工程化、质量与性能/关于事件处理器.md","filePath":"posts/Vue系统教程/06-工程化、质量与性能/关于事件处理器.md"}'),p={name:"posts/Vue系统教程/06-工程化、质量与性能/关于事件处理器.md"};function c(i,l,r,o,u,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"关于事件处理器",tabindex:"-1"},[s("关于事件处理器 "),n("a",{class:"header-anchor",href:"#关于事件处理器","aria-label":'Permalink to "关于事件处理器"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“关于事件处理器”的核心思路，并能把它用于实际开发或面试表达。 错误边界"),n("strong",null,"无法"),s("捕获事件处理器内部的错误。 "),n("code",null,"React"),s(" 不需要错误边界来捕获事件处理器中的错误。 与 "),n("code",null,"render"),s(" 方法和生命周期方法不同，事件处理器不会在渲染期间触发。 因此，如果它们抛出异常，"),n("code",null,"React"),s(" 仍然能够知道需要在屏幕上显示什么。")])]),n("p",null,[s("如果你需要在事件处理器内部捕获错误，使用普通的 "),n("code",null,"JavaScript try / catch"),s(" 语句：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { error: null };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleClick = this.handleClick.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,"执行操作，如有错误则会抛出"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } catch (error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.setState({ error });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.state.error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return <h1>Caught an error.</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <button")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onClick={this.handleClick}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      >Click Me")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=a(p,[["render",c]]);export{g as __pageData,m as default};
