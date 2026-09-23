import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"非受控组件","description":"在大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。 另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。 如果你还是不清楚在某个特殊场景中应该使用哪种组件，那么 这篇关于受控和非受控输入组件的文章。","frontmatter":{"title":"非受控组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"在大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。 另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。 如果你还是不清楚在某个特殊场景中应该使用哪种组件，那么 这篇关于受控和非受控输入组件的文章。","sidebarWeight":71,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/受控组件/非受控组件/非受控组件.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/非受控组件.md","filePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/非受控组件.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/非受控组件.md"};function i(c,s,u,o,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"非受控组件",tabindex:"-1"},[l("非受控组件 "),n("a",{class:"header-anchor",href:"#非受控组件","aria-label":'Permalink to "非受控组件"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“非受控组件”的核心思路，并能把它用于实际开发或面试表达。 在大多数情况下，我们推荐使用 "),n("a",{href:"https://react.docschina.org/docs/forms.html#controlled-components",target:"_blank",rel:"noreferrer"},"受控组件"),l(" 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。")])]),n("p",null,"另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用](https://react.docschina.org/docs/refs-and-the-dom.html) ref 来从 DOM 节点中获取表单数据。")]),l(`
`),n("span",{class:"line"},[n("span",null,"例如，下面的代码使用非受控组件接受一个表单的值：")]),l(`
`),n("span",{class:"line"},[n("span",null,"class NameForm extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.handleSubmit = this.handleSubmit.bind(this);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.input = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  handleSubmit(event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    alert('A name was submitted: ' + this.input.current.value);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    event.preventDefault();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <form onSubmit={this.handleSubmit}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <label>")]),l(`
`),n("span",{class:"line"},[n("span",null,"          Name:")]),l(`
`),n("span",{class:"line"},[n("span",null,'          <input type="text" ref={this.input} />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </label>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <input type="submit" value="Submit" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"      </form>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。")])])])]),n("p",null,[l("如果你还是不清楚在某个特殊场景中应该使用哪种组件，那么 "),n("a",{href:"https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/",target:"_blank",rel:"noreferrer"},"这篇关于受控和非受控输入组件的文章"),l(" 会很有帮助。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**默认值**")]),l(`
`),n("span",{class:"line"},[n("span",null,"在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是 value。")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <form onSubmit={this.handleSubmit}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <label>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        Name:")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),l(`
`),n("span",{class:"line"},[n("span",null,'          defaultValue="Bob"')]),l(`
`),n("span",{class:"line"},[n("span",null,'          type="text"')]),l(`
`),n("span",{class:"line"},[n("span",null,"          ref={this.input}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        />")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </label>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <input")]),l(`
`),n("span",{class:"line"},[n("span",null,'        type="submit"')]),l(`
`),n("span",{class:"line"},[n("span",null,'        value="Submit"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </form>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  );")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,'同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue。')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**文件输入**")]),l(`
`),n("span",{class:"line"},[n("span",null,'在 HTML 中，<input type="file"> 可以让用户选择一个或多个文件上传到服务器，或者通过使用 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行操作。')]),l(`
`),n("span",{class:"line"},[n("span",null,'<input type="file" />')]),l(`
`),n("span",{class:"line"},[n("span",null,'在 React 中，<input type="file" /> 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。')]),l(`
`),n("span",{class:"line"},[n("span",null,"您应该使用 File API 与文件进行交互。下面的例子显示了如何创建一个 [DOM](https://react.docschina.org/docs/refs-and-the-dom.html) 节点的 ref 从而在提交表单时获取文件的信息。")]),l(`
`),n("span",{class:"line"},[n("span",null,"class FileInput extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.handleSubmit = this.handleSubmit.bind(this);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.fileInput = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  handleSubmit(event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    event.preventDefault();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    alert(")]),l(`
`),n("span",{class:"line"},[n("span",null,"      `Selected file - ${this.fileInput.current.files[0].name}`);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <form onSubmit={this.handleSubmit}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <label>")]),l(`
`),n("span",{class:"line"},[n("span",null,"          Upload file:")]),l(`
`),n("span",{class:"line"},[n("span",null,'          <input type="file" ref={this.fileInput} />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </label>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <br />")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <button type="submit">Submit</button>')]),l(`
`),n("span",{class:"line"},[n("span",null,"      </form>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <FileInput />,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),l(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/uncontrolled-components.html>")])])])])],-1)])])}const b=a(t,[["render",i]]);export{m as __pageData,b as default};
