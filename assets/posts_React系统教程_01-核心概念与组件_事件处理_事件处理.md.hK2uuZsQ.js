import{_ as a,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"事件处理","description":"React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同： 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。 在这里， e 是一个合成事件 。 React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。如果。","frontmatter":{"title":"事件处理","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同： 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。 在这里， e 是一个合成事件 。 React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。如果。","sidebarWeight":54,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/事件处理/事件处理.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/事件处理/事件处理.md","filePath":"posts/React系统教程/01-核心概念与组件/事件处理/事件处理.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/事件处理/事件处理.md"};function p(c,l,o,u,r,d){return e(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"事件处理",tabindex:"-1"},[s("事件处理 "),n("a",{class:"header-anchor",href:"#事件处理","aria-label":'Permalink to "事件处理"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“事件处理”的核心思路，并能把它用于实际开发或面试表达。 React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 事件的命名采用小驼峰式（camelCase），而不是纯小写。")])])])]),n("p",null,"使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"例如，传统的 HTML：")]),s(`
`),n("span",{class:"line"},[n("span",null,'<button onclick="activateLasers()">')]),s(`
`),n("span",{class:"line"},[n("span",null,"  Activate Lasers")]),s(`
`),n("span",{class:"line"},[n("span",null,"</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 React 中略微不同：")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button onClick={activateLasers}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Activate Lasers")]),s(`
`),n("span",{class:"line"},[n("span",null,"</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。")]),s(`
`),n("span",{class:"line"},[n("span",null,"你必须显式的使用 preventDefault 。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：")]),s(`
`),n("span",{class:"line"},[n("span",null,'<a href="#"')]),s(`
`),n("span",{class:"line"},[n("span",null,`  onclick="console.log('The link was clicked.'); return false">`)]),s(`
`),n("span",{class:"line"},[n("span",null,"  Click me")]),s(`
`),n("span",{class:"line"},[n("span",null,"</a>")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 React 中，可能是这样的：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ActionLink() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function handleClick(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    e.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('The link was clicked.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <a href="#" onClick={handleClick}>')]),s(`
`),n("span",{class:"line"},[n("span",null,"      Click me")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </a>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[s("在这里，"),n("strong",null,"e"),s(),n("strong",null,"是一个合成事件"),s("。 React 根据 "),n("a",{href:"https://www.w3.org/TR/DOM-Level-3-Events/",target:"_blank",rel:"noreferrer"},"W3C"),s(" 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。如果想了解更多，请查看 "),n("a",{href:"https://react.docschina.org/docs/events.html",target:"_blank",rel:"noreferrer"},"SyntheticEvent"),s(" 参考指南。")]),n("p",null,[n("strong",null,"如何添加事件监听器"),s(" 使用 React 时，你一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当你使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。例如，下面的 Toggle 组件会渲染一个让用户切换开关状态的按钮：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Toggle extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      isToggleOn: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 为了在回调中使用 `this`，这个绑定是必不可少的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleClick = this.handleClick.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState(state => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      isToggleOn: !state.isToggleOn")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }));")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <button onClick={this.handleClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {this.state.isToggleOn ? 'ON' : 'OFF'}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Toggle />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("p",null,[s("你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会"),n("a",{href:"https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind",target:"_blank",rel:"noreferrer"},"绑定"),s(" this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这并不是 React 特有的行为；这其实与 [JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**事件监听器中的****this**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果觉得使用 bind 很麻烦，这里有两种方式可以解决。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你正在使用实验性的 [public class fields](https://babeljs.io/docs/plugins/transform-class-properties/) 语法，你可以使用 class fields 正确的绑定回调函数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class LoggingButton extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 此语法确保 `handleClick` 内的 `this` 已被绑定。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 注意: 这是 *实验性* 语法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleClick = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('this is:', this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <button onClick={this.handleClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Click me")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Create React App](https://github.com/facebookincubator/create-react-app) 默认启用此语法。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果你没有使用 class fields 语法，你可以在回调中使用[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class LoggingButton extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('this is:', this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 此语法确保 `handleClick` 内的 `this` 已被绑定。")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <button onClick={() => this.handleClick()}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Click me")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**此语法问题在于每次渲染** **LoggingButton** **时都会创建不同的回调函数。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在大多数情况下，这没什么问题，但如果该回调函数作为** **prop** **传入子组件时，这些组件可能会进行额外的重新渲染。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**我们通常建议在构造器中绑定或使用** **class fields** **语法来避免这类性能问题。**")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**向事件处理程序传递参数**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button")]),s(`
`),n("span",{class:"line"},[n("span",null,"  onClick={(e) => this.deleteRow(id, e)}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Delete Row")]),s(`
`),n("span",{class:"line"},[n("span",null,"</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<button")]),s(`
`),n("span",{class:"line"},[n("span",null,"  onClick={this.deleteRow.bind(this, id)}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Delete Row")]),s(`
`),n("span",{class:"line"},[n("span",null,"</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。")])])])]),n("p",null,"在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。 > 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/handling-events.html>")])])])])],-1)])])}const b=a(t,[["render",p]]);export{g as __pageData,b as default};
