import{_ as s,o as l,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"表单","description":"\\\\ 来自。","frontmatter":{"title":"表单","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"\\\\ 来自。","sidebarWeight":70,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/受控组件/非受控组件/表单.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/表单.md","filePath":"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/表单.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/受控组件/非受控组件/表单.md"};function i(u,a,c,o,r,h){return l(),t("div",null,[...a[0]||(a[0]=[e("div",null,[e("h1",{id:"表单",tabindex:"-1"},[n("表单 "),e("a",{class:"header-anchor",href:"#表单","aria-label":'Permalink to "表单"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“表单”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称：")]),n(`
`),e("span",{class:"line"},[e("span",null,"<form>")]),n(`
`),e("span",{class:"line"},[e("span",null,"  <label>")]),n(`
`),e("span",{class:"line"},[e("span",null,"    名字:")]),n(`
`),e("span",{class:"line"},[e("span",null,'    <input type="text" name="name" />')]),n(`
`),e("span",{class:"line"},[e("span",null,"  </label>")]),n(`
`),e("span",{class:"line"},[e("span",null,'  <input type="submit" value="提交" />')]),n(`
`),e("span",{class:"line"},[e("span",null,"</form>")]),n(`
`),e("span",{class:"line"},[e("span",null,"此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**受控组件**")]),n(`
`),e("span",{class:"line"},[e("span",null,"在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [setState()](https://react.docschina.org/docs/react-component.html#setstate)来更新。")]),n(`
`),e("span",{class:"line"},[e("span",null,"我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。")]),n(`
`),e("span",{class:"line"},[e("span",null,"例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：")]),n(`
`),e("span",{class:"line"},[e("span",null,"class NameForm extends React.Component {  constructor(props) {    super(props);    this.state = {value: ''};    this.handleChange = this.handleChange.bind(this);    this.handleSubmit = this.handleSubmit.bind(this);  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"handleChange(event) {    this.setState({value: event.target.value});  }  handleSubmit(event) {    alert('提交的名字: ' + this.state.value);    event.preventDefault();  }")]),n(`
`),e("span",{class:"line"},[e("span",null,'render() {    return (      <form onSubmit={this.handleSubmit}>        <label>          名字:          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>        <input type="submit" value="提交" />      </form>    );  }}')]),n(`
`),e("span",{class:"line"},[e("span",null,"**在** **CodePen** **上尝试**")]),n(`
`),e("span",{class:"line"},[e("span",null,"由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。")]),n(`
`),e("span",{class:"line"},[e("span",null,"对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**textarea** **标签**")]),n(`
`),e("span",{class:"line"},[e("span",null,"在 HTML 中, <textarea> 元素通过其子元素定义其文本:")]),n(`
`),e("span",{class:"line"},[e("span",null,"<textarea>  你好， 这是在 text area 里的文本</textarea>")]),n(`
`),e("span",{class:"line"},[e("span",null,"而在 React 中，<textarea> 使用 value 属性代替。这样，可以使得使用 <textarea> 的表单和使用单行 input 的表单非常类似：")]),n(`
`),e("span",{class:"line"},[e("span",null,"class EssayForm extends React.Component {  constructor(props) {    super(props);    this.state = {      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'    };    this.handleChange = this.handleChange.bind(this);    this.handleSubmit = this.handleSubmit.bind(this);  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"handleChange(event) {    this.setState({value: event.target.value});  }  handleSubmit(event) {    alert('提交的文章: ' + this.state.value);    event.preventDefault();  }")]),n(`
`),e("span",{class:"line"},[e("span",null,'render() {    return (      <form onSubmit={this.handleSubmit}>        <label>          文章:          <textarea value={this.state.value} onChange={this.handleChange} />        </label>        <input type="submit" value="提交" />      </form>    );  }}')]),n(`
`),e("span",{class:"line"},[e("span",null,"请注意，this.state.value 初始化于构造函数中，因此文本区域默认有初值。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**select** **标签**")]),n(`
`),e("span",{class:"line"},[e("span",null,"在 HTML 中，<select> 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：")]),n(`
`),e("span",{class:"line"},[e("span",null,'<select>  <option value="grapefruit">葡萄柚</option>  <option value="lime">酸橙</option>  <option selected value="coconut">椰子</option>  <option value="mango">芒果</option></select>')]),n(`
`),e("span",{class:"line"},[e("span",null,"请注意，由于 selected 属性的缘故，椰子选项默认被选中。React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：")]),n(`
`),e("span",{class:"line"},[e("span",null,"class FlavorForm extends React.Component {  constructor(props) {    super(props);    this.state = {value: 'coconut'};    this.handleChange = this.handleChange.bind(this);    this.handleSubmit = this.handleSubmit.bind(this);  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"handleChange(event) {    this.setState({value: event.target.value});  }  handleSubmit(event) {    alert('你喜欢的风味是: ' + this.state.value);    event.preventDefault();  }")]),n(`
`),e("span",{class:"line"},[e("span",null,'render() {    return (      <form onSubmit={this.handleSubmit}>        <label>          选择你喜欢的风味:          <select value={this.state.value} onChange={this.handleChange}>            <option value="grapefruit">葡萄柚</option>            <option value="lime">酸橙</option>            <option value="coconut">椰子</option>            <option value="mango">芒果</option>          </select>        </label>        <input type="submit" value="提交" />      </form>    );  }}')]),n(`
`),e("span",{class:"line"},[e("span",null,"**在** **CodePen** **上尝试**")]),n(`
`),e("span",{class:"line"},[e("span",null,'总的来说，这使得 <input type="text">, <textarea> 和 <select> 之类的标签都非常相似—它们都接受一个 value 属性，你可以使用它来实现受控组件。')]),n(`
`),e("span",{class:"line"},[e("span",null,"注意")]),n(`
`),e("span",{class:"line"},[e("span",null,"你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项：")]),n(`
`),e("span",{class:"line"},[e("span",null,"<select multiple={true} value={['B', 'C']}>")]),n(`
`),e("span",{class:"line"},[e("span",null,"**文件** **input** **标签**")]),n(`
`),e("span",{class:"line"},[e("span",null,'在 HTML 中，<input type="file"> 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。')]),n(`
`),e("span",{class:"line"},[e("span",null,'<input type="file" />')]),n(`
`),e("span",{class:"line"},[e("span",null,"因为它的 value 只读，所以它是 React 中的一个**非受控**组件。将与其他非受控组件[在后续文档中](https://react.docschina.org/docs/uncontrolled-components.html#the-file-input-tag)一起讨论。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**处理多个输入**")]),n(`
`),e("span",{class:"line"},[e("span",null,"当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。")]),n(`
`),e("span",{class:"line"},[e("span",null,"例如：")]),n(`
`),e("span",{class:"line"},[e("span",null,"class Reservation extends React.Component {  constructor(props) {    super(props);    this.state = {      isGoing: true,      numberOfGuests: 2    };")]),n(`
`),e("span",{class:"line"},[e("span",null,"this.handleInputChange = this.handleInputChange.bind(this);  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"handleInputChange(event) {    const target = event.target;    const value = target.name === 'isGoing' ? target.checked : target.value;    const name = target.name;    this.setState({      [name]: value    });  }")]),n(`
`),e("span",{class:"line"},[e("span",null,'render() {    return (      <form>        <label>          参与:          <input            name="isGoing"            type="checkbox"            checked={this.state.isGoing}            onChange={this.handleInputChange} />        </label>        <br />        <label>          来宾人数:          <input            name="numberOfGuests"            type="number"            value={this.state.numberOfGuests}            onChange={this.handleInputChange} />        </label>      </form>    );  }}')]),n(`
`),e("span",{class:"line"},[e("span",null,"**在** **CodePen** **上尝试**")]),n(`
`),e("span",{class:"line"},[e("span",null,"这里使用了 ES6 [计算属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)的语法更新给定输入名称对应的 state 值：")]),n(`
`),e("span",{class:"line"},[e("span",null,"例如：")]),n(`
`),e("span",{class:"line"},[e("span",null,"this.setState({  [name]: value});")]),n(`
`),e("span",{class:"line"},[e("span",null,"等同 ES5:")]),n(`
`),e("span",{class:"line"},[e("span",null,"var partialState = {};partialState[name] = value;this.setState(partialState);")]),n(`
`),e("span",{class:"line"},[e("span",null,"另外，由于 setState() 自动[将部分](https://react.docschina.org/docs/state-and-lifecycle.html#state-updates-are-merged) state 合并到当前 state, 只需调用它更改部分 state 即可。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**受控输入空值**")]),n(`
`),e("span",{class:"line"},[e("span",null,"在[受控组件](https://react.docschina.org/docs/forms.html#controlled-components)上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。")]),n(`
`),e("span",{class:"line"},[e("span",null,"下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）")]),n(`
`),e("span",{class:"line"},[e("span",null,'ReactDOM.render(<input value="hi" />, mountNode);')]),n(`
`),e("span",{class:"line"},[e("span",null,"setTimeout(function() {  ReactDOM.render(<input value={null} />, mountNode);}, 1000);")]),n(`
`),e("span",{class:"line"},[e("span",null,"**受控组件的替代品**")]),n(`
`),e("span",{class:"line"},[e("span",null,"有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state。当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会令人厌烦。在这些情况下，你可能希望使用[非受控组件](https://react.docschina.org/docs/uncontrolled-components.html), 这是实现输入表单的另一种方式。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**成熟的解决方案**")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果你想寻找包含验证、追踪访问字段以及处理表单提交的完整解决方案，使用 [Formik](https://jaredpalmer.com/formik) 是不错的选择。然而，它也是建立在受控组件和管理 state 的基础之上 —— 所以不要忽视学习它们。")])])])]),e("p",null,"> 来自"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null," <https://react.docschina.org/docs/forms.html>")])])])])],-1)])])}const v=s(p,[["render",i]]);export{m as __pageData,v as default};
