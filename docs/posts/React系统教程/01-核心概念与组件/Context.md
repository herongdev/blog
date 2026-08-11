---
title: "Context"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。 在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这是应用程。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/新特性/Context.md"
---
::: v-pre

# Context

> 本节目标：理解“Context”的核心思路，并能把它用于实际开发或面试表达。
Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props 。

```
**何时使用** **Context**
Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。例如，在下面的代码中，我们通过一个“theme”属性手动调整一个按钮组件的样式：
function ThemedButton(props) {  ==return== ==<====Button== ==theme====={====props====.====theme====} />;======}
// 中间组件function Toolbar(props) {  ==// Toolbar== ==组件必须添加一个额外的== ==theme== ==属性======  ==//== ==然后传递它给== ==ThemedButton== ==组件======  return (    <div>      ==<====ThemedButton== ==theme====={====props====.====theme====} />======    </div>  );}
class App extends React.Component {  render() {    ==return== ==<====Toolbar== ==theme====="====dark====" />;======  }}
使用 context, 我可以避免通过中间元素传递 props：
// 创建一个 theme Context,  默认 theme 的值为 light==const== ==ThemeContext== ===== ==React====.====createContext====(===='light'====);==
function ThemedButton(props) {  ==// ThemedButton== ==组件从== ==context== ==接收== ==theme======  return (    ==<====ThemeContext.Consumer====>======      =={====theme== ===>== ==<====Button== =={...====props====}== ==theme====={====theme====} />}======    ==</====ThemeContext.Consumer====>======  );}
// 中间组件function Toolbar(props) {  return (    <div>      <ThemedButton />    </div>  );}
class App extends React.Component {  render() {    return (      ==<====ThemeContext.Provider== ==value====="====dark====">======        <Toolbar />      ==</====ThemeContext.Provider====>======    );  }}
**注意**
不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。
```

```
**API**
**React.createContext**
const {Provider, Consumer} = React.createContext(defaultValue);
创建一对 { Provider, Consumer }。当 React 渲染 context 组件 Consumer 时，它将从组件树的上层中最接近的匹配的 Provider 读取当前的 context 值。
```

如果上层的组件树没有一个匹配的 Provider，而此时你需要渲染一个 Consumer 组件，那么你可以用到 defaultValue 。这有助于在不封装它们的情况下对组件进行测试。

```
**Provider**
<Provider value={/* some value */}>
React 组件允许 Consumers 订阅 context 的改变。
接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。Providers 可以被嵌套以覆盖组件树内更深层次的值。
```

```
**Consumer**
<Consumer>  {value => /* render something based on the context value */}</Consumer>
一个可以订阅 context 变化的 React 组件。
接收一个 [函数作为子节点](https://react.docschina.org/docs/render-props.html#using-props-other-than-render). 函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue 。
**注意**
关于此案例的更多信息, 请看 [render props](https://react.docschina.org/docs/render-props.html).
每当Provider的值发生改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。通过使用与[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)相同的算法比较新值和旧值来确定变化。
```

```
**注意**
（这在传递对象作为 value 时会引发一些问题[Caveats](https://react.docschina.org/docs/context.html#caveats).）
**例子**
**动态** **Context**
主题的动态值，一个更加复杂的例子：
**theme-context.js**
export const themes = {  light: {    foreground: '#ffffff',    background: '#222222',  },  dark: {    foreground: '#000000',    background: '#eeeeee',  },};
==export const== ==ThemeContext== ===== ==React====.====createContext====(======  ==themes====.====dark== ==//== ==默认值========);==
**themed-button.js**
import {ThemeContext} from './theme-context';
function ThemedButton(props) {  return (    ==<====ThemeContext.Consumer====>======      =={====theme== ===>== ==(======        ==<====button======          =={...====props====}======          ==style====={{====backgroundColor====:== ==theme====.====background====}}======        ==/>======      ==)}======    ==</====ThemeContext.Consumer====>======  );}
export default ThemedButton;
**app.js**
import {ThemeContext, themes} from './theme-context';import ThemedButton from './themed-button';
// 一个使用到ThemedButton组件的中间组件function Toolbar(props) {  return (    <ThemedButton onClick={props.changeTheme}>      Change Theme    </ThemedButton>  );}
class App extends React.Component {  constructor(props) {    super(props);    this.state = {      theme: themes.light,    };
this.toggleTheme = () => {      this.setState(state => ({        theme:          state.theme === themes.dark            ? themes.light            : themes.dark,      }));    };  }
render() {    ==// ThemedButton== ==位于== ==ThemeProvider== ==内======    ==//== ==在外部使用时使用来自== ==state== ==里面的== ==theme======    ==//== ==默认== ==dark theme======    return (      <Page>        ==<====ThemeContext.Provider== ==value====={====this====.====state====.====theme====}>======          ==<====Toolbar== ==changeTheme====={====this====.====toggleTheme====} />======        ==</====ThemeContext.Provider====>======        <Section>          ==<====ThemedButton== ==/>======        </Section>      </Page>    );  }}
ReactDOM.render(<App />, document.root);
```

```
**父子耦合**
经常需要从组件树中某个深度嵌套的组件中更新 context。在这种情况下，可以通过 context 向下传递一个函数，以允许 Consumer 更新 context ：
**theme-context.js**
// 确保默认值按类型传递// createContext() 匹配的属性是 Consumers 所期望的export const ThemeContext = React.createContext({  theme: themes.dark,  toggleTheme: () => {},});
```

```
**theme-toggler-button.js**
import {ThemeContext} from './theme-context';
function ThemeTogglerButton() {  // Theme Toggler 按钮不仅接收 theme 属性  // 也接收了一个来自 context 的 toggleTheme 函数  return (    <ThemeContext.Consumer>      {({theme, toggleTheme}) => (        <button          onClick={toggleTheme}          style={{backgroundColor: theme.background}}>          Toggle Theme        </button>      )}    </ThemeContext.Consumer>  );}
export default ThemeTogglerButton;
**app.js**
import {ThemeContext, themes} from './theme-context';import ThemeTogglerButton from './theme-toggler-button';
class App extends React.Component {  constructor(props) {    super(props);
this.toggleTheme = () => {      this.setState(state => ({        theme:          state.theme === themes.dark            ? themes.light            : themes.dark,      }));    };    // State 包含了 updater 函数 所以它可以传递给底层的 context Provider    this.state = {      theme: themes.light,      toggleTheme: this.toggleTheme,    };  }
render() {    // 入口 state 传递给 provider    return (      <ThemeContext.Provider value={this.state}>        <Content />      </ThemeContext.Provider>    );  }}
function Content() {  return (    <div>      <ThemeTogglerButton />    </div>  );}
ReactDOM.render(<App />, document.root);
```

```
**作用于多个上下文**
为了保持 context 快速进行二次渲染， React 需要使每一个 Consumer 在组件树中成为一个单独的节点。
// 主题上下文, 默认light==const== ==ThemeContext== ===== ==React====.====createContext====(===='light'====);==
// 登陆用户上下文==const== ==UserContext== ===== ==React====.====createContext====();==
// 一个依赖于两个上下文的中间组件function Toolbar(props) {  return (    ==<====ThemeContext.Consumer====>======      =={====theme== ===>== ==(======        ==<====UserContext.Consumer====>======          =={====user== ===>== ==(======            ==<====ProfilePage== ==user====={====user====}== ==theme====={====theme====} />======          ==)}======        ==</====UserContext.Consumer====>======      ==)}======    ==</====ThemeContext.Consumer====>======  );}
class App extends React.Component {  render() {    const {signedInUser, theme} = this.props;
// App组件提供上下文的初始值    return (      ==<====ThemeContext.Provider== ==value====={====theme====}>======        ==<====UserContext.Provider== ==value====={====signedInUser====}>======          <Toolbar />        ==</====UserContext.Provider====>======      ==</====ThemeContext.Provider====>======    );  }}
如果两个或者多个上下文的值经常被一起使用，也许你需要考虑你自己渲染属性的组件提供给它们。
```

```
**在生命周期方法中访问** **Context**
在生命周期方法中从上下文访问值是一种相对常见的用例。而不是将上下文添加到每个生命周期方法中，只需要将它作为一个 props 传递，然后像通常使用 props 一样去使用它。
class Button extends React.Component {  componentDidMount() {    ==// ThemeContext value is this.props.theme======  }
componentDidUpdate(prevProps, prevState) {    ==// Previous ThemeContext value is prevProps.theme======    ==// New ThemeContext value is this.props.theme======  }
render() {    const {theme, children} = this.props;    return (      <button className={theme ? 'dark' : 'light'}>        {children}      </button>    );  }}
export default props => (  <ThemeContext.Consumer>    =={====theme== ===>== ==<====Button== =={...====props====}== ==theme====={====theme====} />}======  </ThemeContext.Consumer>);
```

```
**高阶组件中的** **Context**
某些类型的上下文被许多组件（例如主题或者地点信息）共用。使用 <Context.Consumer> 元素显示地封装每个依赖项是冗余的。这里[higher-order component](https://react.docschina.org/docs/higher-order-components.html)可以帮助我们解决这个问题。例如，一个按钮组件也许被作用于一个主题 context：
const ThemeContext = React.createContext('light');
function ThemedButton(props) {  return (    ==<====ThemeContext.Consumer====>======      =={====theme== ===>== ==<====button== ==className====={====theme====} {...====props====} />}======    ==</====ThemeContext.Consumer====>======  );}
```

```
这对于少量组件来说并没有毛病，但是如果我们想在很多地方使用主题上下文呢？
我们可以创建一个命名为 withTheme 高阶组件：
const ThemeContext = React.createContext('light');
// 在函数中引入组件==export function== ==withTheme====(====Component====) {======  // 然后返回另一个组件  ==return function== ==ThemedComponent====(====props====) {======    // 最后使用context theme渲染这个被封装组件    // 注意我们照常引用了被添加的属性    return (      ==<====ThemeContext.Consumer====>======        =={====theme== ===>== ==<====Component== =={...====props====}== ==theme====={====theme====} />}======      ==</====ThemeContext.Consumer====>======    );  };}
目前任何组件都依赖于主题 context，它们都可以很容易的使用我们创建的 withTheme 函数进行订阅。
function Button({theme, ...rest}) {  ==return== ==<====button== ==className====={====theme====} {...====rest====} />;======}
==const== ==ThemedButton== ===== ==withTheme====(====Button====);==
```

```
**转发** **Refs**
一个关于渲染属性API的问题是 refs 不会自动的传递给被封装的元素。为了解决这个问题，使用 React.forwardRef：
**fancy-button.js**
class FancyButton extends React.Component {  focus() {    // ...  }
// ...}
// 使用 context 传递当前的 "theme" 给 FancyButton.// 使用 forwardRef 传递 refs 给 FancyButton 也是可以的.==export default== ==React====.====forwardRef====((====props====,== ==ref====)== ===>== ==(======  <ThemeContext.Consumer>    =={====theme== ===>== ==(======      <FancyButton {...props} theme={theme} ref={ref} />    )}  </ThemeContext.Consumer>));
**app.js**
import FancyButton from './fancy-button';
const ref = React.createRef();
// ref属性将指向 FancyButton 组件,// ThemeContext.Consumer 没有包裹它// 这意味着我们可以调用 FancyButton 的方法就像这样 ref.current.focus()==<====FancyButton== ==ref====={====ref====}== ==onClick====={====handleClick====}>======  Click me!</FancyButton>;
**告诫**
因为 context 使用 reference identity 确定何时重新渲染，在 Consumer 中，当一个 Provider 的父节点重新渲染的时候，有一些问题可能触发意外的渲染。例如下面的代码，所有的 Consumner 在 Provider 重新渲染之时，每次都将重新渲染，因为一个新的对象总是被创建对应 Provider 里的 value：
class App extends React.Component {  render() {    return (      ==<====Provider== ==value====={{====something====:== =='something'====}}>======        <Toolbar />      </Provider>    );  }}
为了防止这样, 提升 value 到父节点的 state里:
class App extends React.Component {  constructor(props) {    this.state = {      ==value====: {====something====:== =='something'====},======    };  }
render() {    return (      ==<====Provider== ==value====={====this====.====state====.====value====}>======        <Toolbar />      </Provider>    );  }}
```

**遗留** **API**
**注意**
React 以前使用实验性的 context API运行，旧的API将会在16.x版本中得到支持，但使用到它的应用应该迁移到新版本。遗留的API将在未来的 React 版本中被移除。阅读[legacy context docs here](https://react.docschina.org/docs/legacy-context.html)。
 \> 来自

```
 <https://react.docschina.org/docs/context.html>
```

:::
