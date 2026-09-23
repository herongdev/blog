import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Render Props","description":"其实就是在A组件的内部去渲染B，C，D等组件，我们先在A组件内部处理好数据和逻辑，然后再将相应数据以属性的方式传给B,C,D等组件，这样就相当于利用了业务逻辑，但实际渲染的还是B,C,D等组件。 其中这个Render属性往往是一个函数，我们在组件里只要调用一下这个render属性。","frontmatter":{"title":"Render Props","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"其实就是在A组件的内部去渲染B，C，D等组件，我们先在A组件内部处理好数据和逻辑，然后再将相应数据以属性的方式传给B,C,D等组件，这样就相当于利用了业务逻辑，但实际渲染的还是B,C,D等组件。 其中这个Render属性往往是一个函数，我们在组件里只要调用一下这个render属性。","sidebarWeight":40,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Render Props.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Render Props.md","filePath":"posts/React系统教程/01-核心概念与组件/Render Props.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/Render Props.md"};function t(u,l,c,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"render-props",tabindex:"-1"},[s("Render Props "),n("a",{class:"header-anchor",href:"#render-props","aria-label":'Permalink to "Render Props"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Render Props”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"术语 [“](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)render prop” 是指一种在 React 组件之间使用一个值为函数的属性共享代码的简单技术。")])])])]),n("p",null,"其实就是在A组件的内部去渲染B，C，D等组件，我们先在A组件内部处理好数据和逻辑，然后再将相应数据以属性的方式传给B,C,D等组件，这样就相当于利用了业务逻辑，但实际渲染的还是B,C,D等组件。 其中这个Render属性往往是一个函数，我们在组件里只要调用一下这个render属性的函数，并传入要传的值作为属性就可以了。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"具有 render 属性的组件接受一个函数，该函数：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"返回一个 React 元素；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"调用它而不是实现自己的渲染逻辑。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<DataProvider")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render={data => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <h1>Hello {data.target}</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/>")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 render 属性的库有 [React Router](https://reacttraining.com/react-router/web/api/Route/render-func)、[Downshift](https://github.com/paypal/downshift) 以及 [Formik](https://github.com/jaredpalmer/formik)。")])])])]),n("p",null,"在这个文档中，我们将讨论为什么 render prop 是有用的，以及如何写一个自己的 render 属性组件。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**使用** **Render Props** **来解决横切关注点（****Cross-Cutting Concerns****）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"组件是 React 代码复用的主要单元，但如何分享一个组件封装到其他需要相同 state 组件的状态或行为并不总是很容易。")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，以下组件跟踪 Web 应用程序中的鼠标位置：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleMouseMove = this.handleMouseMove.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      x: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      y: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleMouseMove(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      x: event.clientX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      y: event.clientY")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{ height: '100vh' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onMouseMove={this.handleMouseMove}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>移动鼠标!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"现在的问题是：我们如何在另一个组件中复用这个行为？换个说法，若另一个组件需要知道鼠标位置，我们能否封装这一行为，以便轻松地与其他组件共享它？？"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"由于组件是 React 中最基础的代码复用单元，现在尝试重构一部分代码使其能够在 <Mouse> 组件中封装我们需要共享的行为。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// <Mouse> 组件封装了我们需要的行为...")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Mouse extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleMouseMove =")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handleMouseMove.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { x: 0, y: 0 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleMouseMove(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      x: event.clientX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      y: event.clientY")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{ height: '100vh' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onMouseMove={this.handleMouseMove}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {/* ...但我们如何渲染 <p> 以外的东西? */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>鼠标位置： ({this.state.x}, {this.state.y})</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>移动鼠标!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Mouse />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"现在 <Mouse> 组件封装了所有关于监听 mousemove 事件和存储鼠标 (x, y) 位置的行为，但其仍不是真正的可复用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"举个例子，假设我们有一个 <Cat> 组件，它可以呈现一张在屏幕上追逐鼠标的猫的图片。我们或许会使用 <Cat mouse={{ x, y }} prop 来告诉组件鼠标的坐标以让它知道图片应该在屏幕哪个位置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先, 你或许会像这样，尝试在 <Mouse> 内部的渲染方法渲染 <Cat> 组件：:")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Cat extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const mouse = this.props.mouse;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,`      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />`)]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseWithCat extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleMouseMove = this.handleMouseMove.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { x: 0, y: 0 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleMouseMove(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      x: event.clientX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      y: event.clientY")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{ height: '100vh' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onMouseMove={this.handleMouseMove}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"          我们可以在这里换掉 <p> 的 <Cat>   ......")]),s(`
`),n("span",{class:"line"},[n("span",null,"          但是接着我们需要创建一个单独的 <MouseWithSomethingElse>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          每次我们需要使用它时，<MouseWithCat> 是不是真的可以重复使用.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Cat mouse={this.state} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>移动鼠标!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <MouseWithCat />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这种方法适用于我们的特定用例，但我们还没有达到以可复用的方式真正封装行为的目标。现在，每当我们想要鼠标位置用于不同的用例时，我们必须创建一个新的组件（本质上是另一个 <MouseWithCat> ），它专门为该用例呈现一些东西.")]),s(`
`),n("span",{class:"line"},[n("span",null,"这也是 render prop 的来历：我们可以提供一个带有函数属性 的 <Mouse> 组件，它能够动态决定什么需要渲染的，而不是将 <Cat> 硬编码到 <Mouse> 组件里，并有效地改变它的渲染结果。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Mouse extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleMouseMove = this.handleMouseMove.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { x: 0, y: 0 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleMouseMove(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      x: event.clientX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      y: event.clientY")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{ height: '100vh' }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onMouseMove={this.handleMouseMove}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"          Instead of providing a static representation of what <Mouse> renders,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          use the `render` prop to dynamically determine what to render.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {this.props.render(this.state)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>移动鼠标!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Mouse render={mouse => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Cat mouse={mouse} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"现在，我们提供了一个 render 方法 让 <Mouse> 能够动态决定什么需要渲染，而不是克隆 <Mouse> 组件然后硬编码来解决特定的用例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"更具体地说，**render** **属性是一个用于告知组件需要渲染什么内容的函数** **prop****。**")])])])]),n("p",null,"这项技术使我们共享行为非常容易。要获得这个行为，只要渲染一个带有 render 属性的 <Mouse> 组件就能够告诉它当前鼠标坐标 (x, y) 要渲染什么。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"关于 render prop 一个有趣的事情是你可以使用带有 render 属性的常规组件来实现大多数[高阶组件](https://react.docschina.org/docs/higher-order-components.html) (HOC)。 例如，如果你更喜欢使用 withMouse HOC而不是 <Mouse> 组件，你可以使用带有 render 属性的常规 <Mouse> 轻松创建一个：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 如果你出于某种原因真的想要 HOC，那么你可以轻松实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用具有 render prop 的普通组件创建一个！")]),s(`
`),n("span",{class:"line"},[n("span",null,"function withMouse(Component) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return class extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Mouse render={mouse => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Component {...this.props} mouse={mouse} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      );")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"因此，你可以将任一模式与 render prop 一起使用。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**使用** **Props** **而非** **render**")]),s(`
`),n("span",{class:"line"},[n("span",null,"重要的是要记住，render 属性是因为模式才被称为 _render_ prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， _任何_被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.")]),s(`
`),n("span",{class:"line"},[n("span",null,"尽管之前的例子使用了 render，我们也可以简单地使用 children prop！")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Mouse")]),s(`
`),n("span",{class:"line"},[n("span",null,"  children={mouse => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/>")]),s(`
`),n("span",{class:"line"},[n("span",null,"记住，children 属性并不真正需要添加到 JSX 元素的 “attributes” 列表中。相反，你可以直接放置到元素的_内部_！")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Mouse>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {mouse => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )}")]),s(`
`),n("span",{class:"line"},[n("span",null,"</Mouse>")]),s(`
`),n("span",{class:"line"},[n("span",null,"你将在 [react-motion](https://github.com/chenglou/react-motion) 的 API 中看到此技术。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"由于这一技术的特殊性，当你在设计一个类似的 API 时，你或许会要直接地在你的 propTypes 里声明 children 的类型应为一个函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Mouse.propTypes = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  children: PropTypes.func.isRequired")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**注意事项**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**将** **Render Props** **与** **React.PureComponent** **一起使用时要小心**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 [React.PureComponent](https://react.docschina.org/docs/react-api.html#reactpurecomponent) 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，继续我们之前使用的 <Mouse> 组件，如果 Mouse 继承自 React.PureComponent 而不是 React.Component，我们的例子看起来就像这样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Mouse extends React.PureComponent {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 与上面相同的代码......")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>Move the mouse around!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"          这是不好的！")]),s(`
`),n("span",{class:"line"},[n("span",null,"          每个渲染的 `render` prop的值将会是不同的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"        */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Mouse render={mouse => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Cat mouse={mouse} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在这样例子中，每次 <MouseTracker> 渲染，它会生成一个新的函数作为 <Mouse render> 的 prop，因而在同时也抵消了继承自 React.PureComponent 的 <Mouse> 组件的效果！")]),s(`
`),n("span",{class:"line"},[n("span",null,"为了绕过这一问题，有时你可以定义一个 prop 作为实例方法，类似这样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MouseTracker extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 定义为实例方法，`this.renderTheCat`始终")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当我们在渲染中使用它时，它指的是相同的函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  renderTheCat(mouse) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <Cat mouse={mouse} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <h1>Move the mouse around!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Mouse render={this.renderTheCat} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你无法静态定义 prop（例如，因为你需要关闭组件的 props 和/或 state），则 <Mouse> 应该扩展 React.Component。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/render-props.html>")])])])])],-1)])])}const m=a(i,[["render",t]]);export{v as __pageData,m as default};
