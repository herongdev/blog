import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"阻止组件渲染","description":"围绕“阻止组件渲染”整理的概念、示例与实践笔记。","frontmatter":{"title":"阻止组件渲染","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“阻止组件渲染”整理的概念、示例与实践笔记。","sidebarWeight":74,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/条件渲染/阻止组件渲染.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/条件渲染/阻止组件渲染.md","filePath":"posts/React系统教程/01-核心概念与组件/条件渲染/阻止组件渲染.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/条件渲染/阻止组件渲染.md"};function i(c,l,r,u,o,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"阻止组件渲染",tabindex:"-1"},[s("阻止组件渲染 "),n("a",{class:"header-anchor",href:"#阻止组件渲染","aria-label":'Permalink to "阻止组件渲染"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“阻止组件渲染”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的示例中，<WarningBanner /> 会根据 prop 中 warn 的值来进行条件渲染。如果 warn 的值是 false，那么组件则不会渲染:")]),s(`
`),n("span",{class:"line"},[n("span",null,"function WarningBanner(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!props.warn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="warning">')]),s(`
`),n("span",{class:"line"},[n("span",null,"      Warning!")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Page extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { showWarning: true };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleToggleClick")]),s(`
`),n("span",{class:"line"},[n("span",null,"      = this.handleToggleClick.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleToggleClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState(state => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      showWarning: !state.showWarning")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }));")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <WarningBanner warn={this.state.showWarning} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.handleToggleClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {this.state.showWarning ? 'Hide' : 'Show'}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Page />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"在组件的 render 方法中返回 null 并不会影响组件的生命周期。例如，上面这个示例中，componentDidUpdate 依然会被调用。")])])])])],-1)])])}const m=a(t,[["render",i]]);export{g as __pageData,m as default};
