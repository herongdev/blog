import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Src-component.js","description":"类组件有三个重要属性： 有两个重要实例方法： setState; forceUpdate; 类 updater 有三个重要属性： classInstance: 要更新的组件实例 pendingStates ：组件要更新的状态数组 callbacks ：更新组件状态时的回调，是一个。","frontmatter":{"title":"Src-component.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"类组件有三个重要属性： 有两个重要实例方法： setState; forceUpdate; 类 updater 有三个重要属性： classInstance: 要更新的组件实例 pendingStates ：组件要更新的状态数组 callbacks ：更新组件状态时的回调，是一个。","sidebarWeight":74,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/类组件的更新 /Src-component.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/类组件的更新/Src-component.js.md","filePath":"posts/React系统教程/03-原理与手写实现/类组件的更新/Src-component.js.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/类组件的更新/Src-component.js.md"};function i(c,l,u,o,d,h){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"src-component-js",tabindex:"-1"},[s("Src-component.js "),n("a",{class:"header-anchor",href:"#src-component-js","aria-label":'Permalink to "Src-component.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Src-component.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 类组件有三个重要属性：")]),n("ul",null,[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  props;")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  state = {};")])])])])]),n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  updater = new Updater(this);")])])])])])]),n("p",null,"有两个重要实例方法："),n("ul",null,[n("li",null,[n("code",null,"setState;")]),n("li",null,[n("code",null,"forceUpdate;")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { findDOM, compareTwoVdom } from './react-dom';")])])])]),n("p",null,[s("类"),n("code",null,"updater"),s("有三个重要属性：")]),n("ul",null,[n("li",null,[n("code",null,"classInstance:"),s("要更新的组件实例")]),n("li",null,[n("code",null,"pendingStates"),s("：组件要更新的状态数组")]),n("li",null,[n("code",null,"callbacks"),s("：更新组件状态时的回调，是一个数组，合并更新时会一一调用")])]),n("p",null,"有几个重要方法："),n("ul",null,[n("li",null,[n("code",null,"addState")]),n("li",null,[n("code",null,"emitUpdate")]),n("li",null,[n("code",null,"updateComponent")]),n("li",null,[n("code",null,"getState")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class Updater {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(classInstance) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.classInstance = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.pendingStates = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.callbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  addState(partialState, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ///")])])])]),n("p",null,"等待更新的或者说等待生效的状态"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    this.pendingStates.push(partialState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof callback === 'function')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,"状态更新后的回调"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      this.callbacks.push(callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.emitUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  emitUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updateComponent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  updateComponent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { classInstance, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (pendingStates.length > 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      shouldUpdate(classInstance, this.getState());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  getState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { classInstance, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { state } = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pendingStates.forEach((nextState) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof nextState === 'function') {")])])])]),n("p",null,[n("code",null,"//"),s(" 如果是函数的话，每次调用取了上次的")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"State")]),s(`
`),n("span",{class:"line"},[n("span",null,"        nextState = nextState(state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state = { ...state, ...nextState };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"清空等待生效的状态的数组"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    pendingStates.length = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[s("这两个打印的值是相同的； 在"),n("code",null,"setTimeout"),s("中是同步的； "),n("code",null,"//"),s(" 内部方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function shouldUpdate(classInstance, nextState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.state = nextState;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.forceUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export class Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static isReactComponent = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater = new Updater(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("p",null,[n("code",null,"// partialState"),s("部分的状态")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  setState(partialState, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater.addState(partialState, callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  forceUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldRenderVdom = this.oldRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldDOM = findDOM(oldRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newRenderVdom = this.render();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.oldRenderVdom = newRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { findDOM, compareTwoVdom } from './react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Updater {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(classInstance) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.classInstance = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.pendingStates = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.callbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  addState(partialState, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ///")])])])]),n("p",null,"等待更新的或者说等待生效的状态"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    this.pendingStates.push(partialState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof callback === 'function')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,"状态更新后的回调"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      this.callbacks.push(callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.emitUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  emitUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updateComponent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  updateComponent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { classInstance, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (pendingStates.length > 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      shouldUpdate(classInstance, this.getState());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  getState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { classInstance, pendingStates } = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { state } = classInstance;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pendingStates.forEach((nextState) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof nextState === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"如果是函数的话，每次调用取了上次的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"State")]),s(`
`),n("span",{class:"line"},[n("span",null,"        nextState = nextState(state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state = { ...state, ...nextState };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"清空等待生效的状态的数组"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    pendingStates.length = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"内部方法"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function shouldUpdate(classInstance, nextState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.state = nextState;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.forceUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export class Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static isReactComponent = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater = new Updater(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // partialState")])])])]),n("p",null,"部分的状态"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  setState(partialState, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.updater.addState(partialState, callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  forceUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldRenderVdom = this.oldRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldDOM = findDOM(oldRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newRenderVdom = this.render();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.oldRenderVdom = newRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=a(p,[["render",i]]);export{g as __pageData,m as default};
