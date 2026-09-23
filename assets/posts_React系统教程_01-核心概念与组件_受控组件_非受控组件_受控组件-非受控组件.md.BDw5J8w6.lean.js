import{_ as a,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"受控组件-非受控组件","description":"变化更新state：当表单的值发生变化时，组件对应的state或props也发生变化； 在大多数情况下，推荐使用 受控组件 来处理表单数据。 替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。 可以让用户选择一个或多个文件上传到服务器，或者通过使用 File AP。","frontmatter":{"title":"受控组件-非受控组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"变化更新state：当表单的值发生变化时，组件对应的state或props也发生变化； 在大多数情况下，推荐使用 受控组件 来处理表单数据。 替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。 可以让用户选择一个或多个文件上传到服务器，或者通过使用 File AP。","sidebarWeight":69,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/受控组件/非受控组件/受控组件-非受控组件.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/受控组件-非受控组件.md","filePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/受控组件-非受控组件.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/受控组件-非受控组件.md"};function i(c,l,u,o,r,d){return e(),t("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"受控组件-非受控组件",tabindex:"-1"},[n("受控组件-非受控组件 "),s("a",{class:"header-anchor",href:"#受控组件-非受控组件","aria-label":'Permalink to "受控组件-非受控组件"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“受控组件-非受控组件”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**受控组件是指：**")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"双向绑定：表单的值和props或state进行了双向绑定；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"表单的值由组件的props或state控制；")])])])]),s("p",null,"变化更新state：当表单的值发生变化时，组件对应的state或props也发生变化；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**非受控组件**")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"组件的props或state只设置表单项的初始值；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"表单值的变化不会引起props或state的变化；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"不编写表单状态更新的数据处理函数；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"通过ref从Dom节点中来获取表单数据，比如：ref.current.value或ref.current.files[0](文件表单)")])])])]),s("p",null,[n("在大多数情况下，推荐使用 "),s("a",{href:"https://react.docschina.org/docs/forms.html#controlled-components",target:"_blank",rel:"noreferrer"},"受控组件"),n(" 来处理表单数据。 替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**应用举例**")]),n(`
`),s("span",{class:"line"},[s("span",null,"例如，下面的代码使用非受控组件接受一个表单的值：")]),n(`
`),s("span",{class:"line"},[s("span",null,"class NameForm extends React.Component {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(props);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.handleSubmit = this.handleSubmit.bind(this);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.input = React.createRef();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    handleSubmit(event) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        alert('A name was submitted: ' + this.input.current.value);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        event.preventDefault();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"            <form onSubmit={this.handleSubmit}>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <label>Name:")]),n(`
`),s("span",{class:"line"},[s("span",null,'                    <input type="text" ref={this.input} />')]),n(`
`),s("span",{class:"line"},[s("span",null,"                </label>")]),n(`
`),s("span",{class:"line"},[s("span",null,'                <input type="submit" value="Submit" />')]),n(`
`),s("span",{class:"line"},[s("span",null,"            </form>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        );")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**默认值**")]),n(`
`),s("span",{class:"line"},[s("span",null,"在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是 value。")]),n(`
`),s("span",{class:"line"},[s("span",null,'render() {  return (    <form onSubmit={this.handleSubmit}>      <label>        Name:        <input          defaultValue="Bob"          type="text"          ref={this.input} />      </label>      <input type="submit" value="Submit" />    </form>  );}')]),n(`
`),s("span",{class:"line"},[s("span",null,'同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue。')])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**文件输入**")]),n(`
`),s("span",{class:"line"},[s("span",null,' **<****input** **type****="****file****" />**')])])])]),s("p",null,[s("strong",null,"可以让用户选择一个或多个文件上传到服务器，或者通过使用"),n(),s("strong",null,"File API"),n(),s("strong",null,"进行操作。")]),s("p",null,[s("strong",null,"在"),n(),s("strong",null,"React"),n(),s("strong",null,'中，****<input type="file" />'),n(),s("strong",null,"始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"您应该使用 File API 与文件进行交互。下面的例子显示了如何创建一个 [DOM](https://react.docschina.org/docs/refs-and-the-dom.html) 节点的 ref 从而在提交表单时获取文件的信息。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class FileInput extends React.Component {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(props);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.handleSubmit = this.handleSubmit.bind(this);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.fileInput = React.createRef();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    handleSubmit(event) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        event.preventDefault();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        alert(")]),n(`
`),s("span",{class:"line"},[s("span",null,"            `Selected file - ${this.fileInput.current.files[0].name}`);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"            <form onSubmit={this.handleSubmit}>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <label>Upload file:")]),n(`
`),s("span",{class:"line"},[s("span",null,'                    <input type="file" ref={this.fileInput} />')]),n(`
`),s("span",{class:"line"},[s("span",null,"                </label>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <br />")]),n(`
`),s("span",{class:"line"},[s("span",null,'                <button type="submit">Submit</button>')]),n(`
`),s("span",{class:"line"},[s("span",null,"            </form>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        );")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),n(`
`),s("span",{class:"line"},[s("span",null,"    <FileInput />,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    document.getElementById('root')")]),n(`
`),s("span",{class:"line"},[s("span",null,");")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://react.docschina.org/docs/uncontrolled-components.html>")])])])])],-1)])])}const b=a(p,[["render",i]]);export{g as __pageData,b as default};
