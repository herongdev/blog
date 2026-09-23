import{_ as s,o,c as a,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"9.子组件生命周期","description":"父子生命周期顺序 他会比较两个状态相等就不会刷新视图 PureComponent 是浅比较 珠峰架构 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次 可以 shouldComponentUpdate 方法中优化 PureComponent 可以帮我们做这件事 代表的是。","frontmatter":{"title":"9.子组件生命周期","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"父子生命周期顺序 他会比较两个状态相等就不会刷新视图 PureComponent 是浅比较 珠峰架构 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次 可以 shouldComponentUpdate 方法中优化 PureComponent 可以帮我们做这件事 代表的是。","sidebarWeight":34,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/9.子组件生命周期.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/9.子组件生命周期.md","filePath":"posts/React系统教程/03-原理与手写实现/9.子组件生命周期.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/9.子组件生命周期.md"};function p(i,l,d,c,r,u){return o(),a("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"_9-子组件生命周期",tabindex:"-1"},[e("9.子组件生命周期 "),n("a",{class:"header-anchor",href:"#_9-子组件生命周期","aria-label":'Permalink to "9.子组件生命周期"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“9.子组件生命周期”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 父子生命周期顺序")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"src\\index.js")]),e(`
`),n("span",{class:"line"},[n("span",null,"import React from './react';")]),e(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from './react-dom';")]),e(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends React.Component { //")])])])]),n("p",null,[e("他会比较两个状态相等就不会刷新视图 "),n("code",null,"PureComponent"),e("是浅比较")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  static defaultProps = {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    name: '")])])])]),n("p",null,"珠峰架构"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'")]),e(`
`),n("span",{class:"line"},[n("span",null,"  };")]),e(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { number: 0 }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 1.constructor')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentWillMount() { //")])])])]),n("p",null,"取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    console.log('Counter 2.componentWillMount');")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 4.componentDidMount');")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  handleClick = () => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ number: this.state.number + 1 });")]),e(`
`),n("span",{class:"line"},[n("span",null,"  };")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // react")])])])]),n("p",null,[e("可以"),n("code",null,"shouldComponentUpdate"),e("方法中优化 "),n("code",null,"PureComponent"),e(" 可以帮我们做这件事")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  shouldComponentUpdate(nextProps, nextState) { //")])])])]),n("p",null,"代表的是下一次的属性 和 下一次的状态"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    console.log('Counter 5.shouldComponentUpdate');")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return nextState.number % 2 === 0;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // return nextState.number!==this.state.number;"),n("span",null," //")])])])]),n("p",null,[e("如果此函数种返回了"),n("code",null,"false"),e(" 就不会调用"),n("code",null,"render"),e("方法了")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  } //")])])])]),n("p",null,[e("不要随便用"),n("code",null,"setState"),e(" 可能会死循环")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  componentWillUpdate() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 6.componentWillUpdate');")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentDidUpdate() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 7.componentDidUpdate');")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 3.render');")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),e(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"        <p>{this.state.number}</p>")]),e(`
`),n("span",{class:"line"},[n("span",null,"        {this.state.number === 4 ? null : <ChildCounter count={this.state.number} />}")]),e(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.handleClick}>+</button>")]),e(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    )")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"class ChildCounter extends React.Component {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(' ChildCounter 6.componentWillUnmount')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentWillMount() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 1.componentWillMount')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 2.render')")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return (<div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"      {this.props.count}")]),e(`
`),n("span",{class:"line"},[n("span",null,"    </div>)")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 3.componentDidMount')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  componentWillReceiveProps(newProps) { //")])])])]),n("p",null,"第一次不会执行，之后属性更新时才会执行"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 4.componentWillReceiveProps')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  shouldComponentUpdate(nextProps, nextState) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 5.shouldComponentUpdate')")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return nextProps.n % 3 === 0; //")])])])]),n("p",null,[e("子组件判断接收的属性 是否满足更新条件 为"),n("code",null,"true"),e("则更新")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Counter />, document.getElementById('root'));")]),e(`
`),n("span",{class:"line"},[n("span",null,"/**")]),e(`
`),n("span",{class:"line"},[n("span",null,"click 1")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 1.constructor")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 2.componentWillMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 1.componentWillMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 2.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 3.componentDidMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 4.componentDidMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"click 2")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click 3")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 6.componentWillUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 4.componentWillReceiveProps")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 7.componentDidUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click3")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click4")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 6.componentWillUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 6.componentWillUnmount")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 7.componentDidUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click5")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click6")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 6.componentWillUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 1.componentWillMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 2.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 3.componentDidMount")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 7.componentDidUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click7")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"click8")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 6.componentWillUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),e(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 4.componentWillReceiveProps")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null,"Counter 7.componentDidUpdate")]),e(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"9.2 src\\react-dom.js")]),e(`
`),n("span",{class:"line"},[n("span",null,"src\\react-dom.js")]),e(`
`),n("span",{class:"line"},[n("span",null,'+import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from "./constants";+import { addEvent } from "./event";')]),e(`
`),n("span",{class:"line"},[n("span",null,'function render(vdom, container) {  mount(vdom, container);}export function mount(vdom, container) {  let newDOM = createDOM(vdom);  container.appendChild(newDOM);  if (newDOM.componentDidMount) newDOM.componentDidMount();}export function createDOM(vdom) { let { type, props, ref } = vdom;  let dom;  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {    return mountForwardComponent(vdom);  } else if (type === REACT_TEXT) {    dom = document.createTextNode(props.content);  } else if (typeof type === "function") {    if (type.isReactComponent) {      return mountClassComponent(vdom);    } else {      return mountFunctionComponent(vdom);    }  } else {    dom = document.createElement(type);  }  if (props) {    updateProps(dom, {}, props);    if (typeof props.children == "object" && props.children.type) {      mount(props.children, dom);    } else if (Array.isArray(props.children)) {      reconcileChildren(props.children, dom);    }  }  vdom.dom = dom;  if (ref) ref.current = dom;  return dom;}function mountForwardComponent(vdom) {  let { type, props, ref } = vdom;  let renderVdom = type.render(props, ref);  vdom.oldRenderVdom = renderVdom;  return createDOM(renderVdom);}function mountClassComponent(vdom) {  let { type, props, ref } = vdom;  let classInstance = new type(props);+ vdom.classInstance = classInstance;  if (ref) ref.current = classInstance;  if (classInstance.componentWillMount) classInstance.componentWillMount();  let renderVdom = classInstance.render();+ classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;  let dom = createDOM(renderVdom);  if (classInstance.componentDidMount)    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);  return dom;}function mountFunctionComponent(vdom) {  let { type, props } = vdom;  let renderVdom = type(props);  vdom.oldRenderVdom = renderVdom;  return createDOM(renderVdom);}function updateProps(dom, oldProps, newProps) {  for (let key in newProps) {    if (key === "children") {      continue;    }    if (key === "style") {      let style = newProps[key];      for (let attr in style) {        dom.style[attr] = style[attr];      }    } else if (key.startsWith("on")) {      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);    } else {      dom[key] = newProps[key];    }  }}export function findDOM(vdom) {  let { type } = vdom;  let dom;  if (typeof type === "function") {    dom = findDOM(vdom.oldRenderVdom);  } else {    dom = vdom.dom;  }  return dom;}+function unMount(vdom) {+  let currentDOM = findDOM(vdom);+  if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {+    vdom.classInstance.componentWillUnmount();+  }+  if (vdom.props && vdom.props.ref) {+    vdom.props.ref.current = null;+  }+  Object.keys(vdom.props).forEach((propName) => {+    if (propName.slice(0, 2) === "on") {+      const eventName = propName.toLowerCase().slice(0, 2);+      currentDOM.removeEventListener(eventName, vdom.props[propName]);+    }+  });+  if (vdom.props.children) {+    let children = Array.isArray(vdom.props.children) ? vdom.props.children : [vdom.props.children];+    children.forEach(unMount);+  }+  currentDOM.parentNode.removeChild(currentDOM);+}+export function compareTwoVdom(parentDOM, oldVdom, newVdom,nextDOM) {+  if (!oldVdom && !newVdom) {+    //')])])])]),n("p",null,"老和新都是没有"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"+    return;+  } else if (!!oldVdom && !newVdom) {+    //")])])])]),n("p",null,"老有新没有"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"+    unMount(oldVdom);+  } else if (!oldVdom && !!newVdom) {+    //")])])])]),n("p",null,"老没有新的有"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"+    let newDOM = createDOM(newVdom);+    if (nextDOM) parentDOM.insertBefore(newDOM, nextDOM);+    else parentDOM.appendChild(newDOM);+    if (newDOM.componentDidMount) newDOM.componentDidMount();+    return;+  } else if (!!oldVdom && !!newVdom && oldVdom.type !== newVdom.type) {+    //")])])])]),n("p",null,"新老都有，但类型不同"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"+    let newDOM = createDOM(newVdom);+    unMount(oldVdom);+    if (newDOM.componentDidMount) newDOM.componentDidMount();+  } else {+    updateElement(oldVdom, newVdom);+  }+}+function updateElement(oldVdom, newVdom) {+    if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {+       let currentDOM = newVdom.dom = findDOM(oldVdom);+       if (oldVdom.props.content !== newVdom.props.content) {+           currentDOM.textContent = newVdom.props.content;+       }+       return;+    }else if (typeof oldVdom.type === 'string') {+        let currentDOM = newVdom.dom = findDOM(oldVdom);+        updateProps(currentDOM, oldVdom.props, newVdom.props);+        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);+    } else if (typeof oldVdom.type === 'function') {+        if (oldVdom.type.isReactComponent) {+            newVdom.classInstance = oldVdom.classInstance;+            updateClassInstance(oldVdom, newVdom);+        } else {+            updateFunctionComponent(oldVdom, newVdom);+        }+    }+}+function updateFunctionComponent(oldVdom, newVdom) {+    let parentDOM = findDOM(oldVdom).parentNode;+    let { type, props } = newVdom;+    let newRenderVdom = type(props);+    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);+    newVdom.oldRenderVdom = newRenderVdom;+}+function updateClassInstance(oldVdom, newVdom) {+    let classInstance = newVdom.classInstance = oldVdom.classInstance;+    newVdom.oldRenderVdom = oldVdom.oldRenderVdom;+    if (classInstance.componentWillReceiveProps) {+        classInstance.componentWillReceiveProps();+    }+    classInstance.updater.emitUpdate(newVdom.props);+}+function updateChildren(parentDOM, oldVChildren, newVChildren) {+    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];+    newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];+    let maxLength = Math.max(oldVChildren.length, newVChildren.length);+    for (let i = 0; i < maxLength; i++) {+       let nextVNode = oldVChildren.find((item,index)=>index>i&&item&&findDOM(item));+       compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i],nextVNode&&findDOM(nextVNode));+    }+}function reconcileChildren(childrenVdom, parentDOM) {  for (let i = 0; i < childrenVdom.length; i++) {    let childVdom = childrenVdom[i];    mount(childVdom, parentDOM);  }}const ReactDOM = {  render,};export default ReactDOM;")])])])])],-1)])])}const C=s(t,[["render",p]]);export{h as __pageData,C as default};
