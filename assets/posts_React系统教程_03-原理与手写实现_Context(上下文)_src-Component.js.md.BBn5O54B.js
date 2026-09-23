import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"src-Component.js","description":"围绕“src-Component.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-Component.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-Component.js”整理的概念、示例与实践笔记。","sidebarWeight":36,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Context(上下文)/src-Component.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-Component.js.md","filePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-Component.js.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-Component.js.md"};function i(c,l,o,u,d,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-component-js",tabindex:"-1"},[s("src-Component.js "),n("a",{class:"header-anchor",href:"#src-component-js","aria-label":'Permalink to "src-Component.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-Component.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在这个文件中，实现了组件更新的所有生命周期钩子；")]),s(`
`),n("span",{class:"line"},[n("span",null,"初始化的生命周期在react-dom中统一实现；")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { createDOM, findDOM, compareTwoVdom } from './react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 更新队列")]),s(`
`),n("span",{class:"line"},[n("span",null,"export let updateQueue = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 默认值是非批量的，同步的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isBatchingUpdate: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 更新器的数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"  updaters: [],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  batchUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let updater of updateQueue.updaters) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      updater.updateComponent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateQueue.updaters.length = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateQueue.isBatchingUpdate = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 主要是加入了shouldComponentUpdate生命周期来进行优化")]),s(`
`),n("span",{class:"line"},[n("span",null," * 真正的更新逻辑在forceUpdate中")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} classInstance 类的实例")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} nextProps 新的属性对象")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} nextState 新的状态对象")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function shouldUpdate(classInstance, nextProps, nextState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 表示组件是否要更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let willUpdate = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果有shouldComponentUpdate方法并且shouldComponentUpdate方法返回了false")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // shouldComponentUpdate生命周期")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (classInstance.shouldComponentUpdate && !classInstance.==shouldComponentUpdate==(nextProps, nextState)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 表示不需要更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    willUpdate = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果要更新，并且有componentWillUpdate方法，就执行它")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // componentWillUpdate 生命周期")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (willUpdate && classInstance.==componentWillUpdate==) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.componentWillUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 不管要不要更新组件，属性和状态都要更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (nextProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.props = nextProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.state = nextState;//先把新状态赋值给实例的state")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (willUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.forceUpdate();//强制更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class Updater {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(classInstance) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.classInstance = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 等待生效的数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.pendingStates = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // this.callbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  addState(partialState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.pendingStates.push(partialState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 触发更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.emitUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 触发更新，状态和属性变化都可能会执行这个方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"  emitUpdate(nextProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.nextProps = nextProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 有可能是批量异步更新，也有可能是同步更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (updateQueue.isBatchingUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 批量异步更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 不刷新组件视图了，只是把自己这个updater实例添加到updateQueue等待生效")]),s(`
`),n("span",{class:"line"},[n("span",null,"      updateQueue.updaters.push(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 同步直接更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.updateComponent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  updateComponent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { classInstance, nextProps, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果属性变了或者状态变了都 会进入更新逻辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (nextProps || pendingStates.length > 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      shouldUpdate(classInstance, nextProps, this.getState());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  getState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { classInstance, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { state } = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pendingStates.forEach((partialState) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof partialState === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        partialState = partialState(state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state = { ...state, ...partialState }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 清空等待生效的状态 的数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pendingStates.length = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当子类继承父类的时候 ，父类的静态属性也是可以继承的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static isReactComponent = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater = new Updater(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  setState(partialState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater.addState(partialState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  // 根据新的属性状态计算新的要渲染的虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  forceUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 上一次类组件render方法计算得到的虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldRenderVdom = this.oldRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // let oldDOM = oldRenderVdom.dom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 获取 oldRenderVdom对应的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldDOM = findDOM(oldRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // context取值")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.constructor.contextType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.context = this.constructor.contextType._currentValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // getDerivedStateFromProps生命周期")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.constructor.==getDerivedStateFromProps==) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (newState)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = newState;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // getSnapshotBeforeUpdate生命周期")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let snapshot = this.==getSnapshotBeforeUpdate== && this.getSnapshotBeforeUpdate();//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 然后基于新的属性和状态，计算新的虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newRenderVdom = this.render();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.oldRenderVdom = newRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.componentDidUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // componentDidUpdate生命周期")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.==componentDidUpdate==(this.props, this.state, snapshot);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Component;")])])])])],-1)])])}const g=a(t,[["render",i]]);export{m as __pageData,g as default};
