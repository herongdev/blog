import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"使用 PropTypes 进行类型检查","description":"PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。 出于性能方面的考虑，propTypes 仅在开发模式下进行检查。","frontmatter":{"title":"使用 PropTypes 进行类型检查","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。 出于性能方面的考虑，propTypes 仅在开发模式下进行检查。","sidebarWeight":61,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/使用 PropTypes 进行类型检查.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/使用 PropTypes 进行类型检查.md","filePath":"posts/React系统教程/01-核心概念与组件/使用 PropTypes 进行类型检查.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/使用 PropTypes 进行类型检查.md"};function o(t,l,c,r,u,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"使用-proptypes-进行类型检查",tabindex:"-1"},[s("使用 PropTypes 进行类型检查 "),n("a",{class:"header-anchor",href:"#使用-proptypes-进行类型检查","aria-label":'Permalink to "使用 PropTypes 进行类型检查"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“使用 PropTypes 进行类型检查”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"注意：")]),s(`
`),n("span",{class:"line"},[n("span",null,"自 React v15.5 起，React.PropTypes 已移入另一个包中。请使用 [prop-types](https://www.npmjs.com/package/prop-types) 库 代替。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们提供了一个 [codemod](https://react.docschina.org/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes) 脚本来做自动转换。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"随着你的应用程序不断增长，你可以通过类型检查捕获大量错误。对于某些应用程序来说，你可以使用 [Flow](https://flow.org/) 或 [TypeScript](https://www.typescriptlang.org/) 等 JavaScript 扩展来对整个应用程序做类型检查。但即使你不使用这些扩展，React 也内置了一些类型检查的功能。要在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性：")]),s(`
`),n("span",{class:"line"},[n("span",null,"import PropTypes from 'prop-types';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Greeting extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <h1>Hello, {this.props.name}</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Greeting.propTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  name: PropTypes.string")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("p",null,"PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。 出于性能方面的考虑，propTypes 仅在开发模式下进行检查。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**PropTypes**")]),s(`
`),n("span",{class:"line"},[n("span",null,"以下提供了使用不同验证器的例子：")]),s(`
`),n("span",{class:"line"},[n("span",null,"import PropTypes from 'prop-types';")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyComponent.propTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你可以将属性声明为 JS 原生类型，默认情况下")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这些属性都是可选的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalArray: PropTypes.array,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalBool: PropTypes.bool,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalFunc: PropTypes.func,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalNumber: PropTypes.number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalObject: PropTypes.object,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalString: PropTypes.string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalSymbol: PropTypes.symbol,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 任何可被渲染的元素（包括数字、字符串、元素或数组）")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // (或 Fragment) 也包含这些类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalNode: PropTypes.node,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 一个 React 元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalElement: PropTypes.element,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 一个 React 元素类型（即，MyComponent）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalElementType: PropTypes.elementType,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你也可以声明 prop 为类的实例，这里使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // JS 的 instanceof 操作符。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalMessage: PropTypes.instanceOf(Message),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你可以让你的 prop 只能是特定的值，指定它为")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 枚举类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalEnum: PropTypes.oneOf(['News', 'Photos']),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 一个对象可以是几种类型中的任意一个类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalUnion: PropTypes.oneOfType([")]),s(`
`),n("span",{class:"line"},[n("span",null,"    PropTypes.string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    PropTypes.number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    PropTypes.instanceOf(Message)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以指定一个数组由某一类型的元素组成")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以指定一个对象由某一类型的值组成")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalObjectOf: PropTypes.objectOf(PropTypes.number),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 可以指定一个对象由特定的类型值组成")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalObjectWithShape: PropTypes.shape({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    color: PropTypes.string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    fontSize: PropTypes.number")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // An object with warnings on extra properties")]),s(`
`),n("span",{class:"line"},[n("span",null,"  optionalObjectWithStrictShape: PropTypes.exact({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    name: PropTypes.string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    quantity: PropTypes.number")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这个 prop 没有被提供时，会打印警告信息。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  requiredFunc: PropTypes.func.isRequired,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 任意类型的数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"  requiredAny: PropTypes.any.isRequired,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  customProp: function (props, propName, componentName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!/matchme/.test(props[propName])) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"        'Invalid prop `' + propName + '` supplied to' +")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ' `' + componentName + '`. Validation failed.'")]),s(`
`),n("span",{class:"line"},[n("span",null,"      );")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 它应该在验证失败时返回一个 Error 对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 验证器将验证数组或对象中的每个值。验证器的前两个参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 第一个是数组或对象本身")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 第二个是他们当前的键。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  customArrayProp: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!/matchme/.test(propValue[key])) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"        'Invalid prop `' + propFullName + '` supplied to' +")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ' `' + componentName + '`. Validation failed.'")]),s(`
`),n("span",{class:"line"},[n("span",null,"      );")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**限制单个元素**")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"import PropTypes from 'prop-types';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这必须只有一个元素，否则控制台会打印警告。")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const children = this.props.children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyComponent.propTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  children: PropTypes.element.isRequired")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**默认** **Prop** **值**")]),s(`
`),n("span",{class:"line"},[n("span",null,"您可以通过配置特定的 defaultProps 属性来定义 props 的默认值：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Greeting extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <h1>Hello, {this.props.name}</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 指定 props 的默认值：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Greeting.defaultProps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  name: 'Stranger'")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'// 渲染出 "Hello, Stranger"：')]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Greeting />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('example')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你正在使用像 [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/) 的 Babel 转换工具，你也可以在 React 组件类中声明 defaultProps 作为静态属性。此语法提案还没有最终确定，需要进行编译后才能在浏览器中运行。要了解更多信息，请查阅 [class fields proposal](https://github.com/tc39/proposal-class-fields)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Greeting extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static defaultProps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    name: 'stranger'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>Hello, {this.props.name}</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"defaultProps 用于确保 this.props.name 在父组件没有\b指定其值时，有一个默认值。propTypes 类型检查发生在 defaultProps 赋值后，所以类型检查也适用于 defaultProps。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/typechecking-with-proptypes.html>")])])])])],-1)])])}const h=a(i,[["render",o]]);export{m as __pageData,h as default};
