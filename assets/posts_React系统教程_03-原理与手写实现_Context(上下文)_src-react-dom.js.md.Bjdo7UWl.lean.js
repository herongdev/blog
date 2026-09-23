import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const V=JSON.parse('{"title":"src-react-dom.js","description":"围绕“src-react-dom.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-react-dom.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-react-dom.js”整理的概念、示例与实践笔记。","sidebarWeight":40,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Context(上下文)/src-react-dom.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react-dom.js.md","filePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react-dom.js.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-react-dom.js.md"};function c(o,s,d,t,u,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"src-react-dom-js",tabindex:"-1"},[l("src-react-dom.js "),n("a",{class:"header-anchor",href:"#src-react-dom-js","aria-label":'Permalink to "src-react-dom.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  REACT_TEXT,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  REACT_FORWARD_REF,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  REACT_FRAGMENT,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  MOVE, PLACEMENT,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  REACT_PROVIDER,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  REACT_CONTEXT")]),l(`
`),n("span",{class:"line"},[n("span",null,'} from "./constants";')]),l(`
`),n("span",{class:"line"},[n("span",null,"import { addEvent } from './event';")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 把虚拟DOM变成真实DOM插入到容器内部")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} vdom 虚拟DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} container 容器")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newDOM = createDOM(vdom)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (newDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    parentDOM.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 把虚拟DOM转成真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (!vdom) return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom;//真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (type && type.$$typeof === REACT_PROVIDER) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return mountProvider(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (type && type.$$typeof === REACT_CONTEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return mountContext(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (type && type.$$typeof === REACT_FORWARD_REF) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return mountForwardComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (type === REACT_FRAGMENT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createDocumentFragment();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (type === REACT_TEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createTextNode(props.content);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof type === 'function') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (type.isReactComponent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return mountClassComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return mountFunctionComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom = document.createElement(type);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 处理属性")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(dom, {}, props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (props.children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let children = props.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (typeof children === 'object' && children.type) {// 说明这是一个React元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"        children._mountIndex = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        render(children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else if (Array.isArray(children)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        reconcileChildren(props.children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.dom = dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 如果把虚拟DOM转成真实DOM，就让ref.current=真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ref) ref.current = dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 渲染Provder组件")]),l(`
`),n("span",{class:"line"},[n("span",null," * 1.真正要渲染的是它的儿子children")]),l(`
`),n("span",{class:"line"},[n("span",null," * 2.把Provider组件自己收到的value属性赋值给context._currentValue")]),l(`
`),n("span",{class:"line"},[n("span",null," * 供应者的children是正常的jsx")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} vdom")]),l(`
`),n("span",{class:"line"},[n("span",null," * @returns")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountProvider(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let context = type._context;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 取值，属性名为value")]),l(`
`),n("span",{class:"line"},[n("span",null,"  context._currentValue = props.value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = props.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 这个操作就是让当前的虚拟DOM的oldRenderVdom指向要渲染的虚拟DOm")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 当使用组件形式的Consumer时，子元素必须是一个函数，用来接受provider的value")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountContext(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let context = type._context;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let currentValue = context._currentValue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 使用函数的方式接受provider的value")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = props.children(currentValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 这个操作就是让当前的虚拟DOM的oldRenderVdom指向要渲染的虚拟DOm")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function mountForwardComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = type.render(props, ref);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 类组件中context使用不需要组件Consumer")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountClassComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type: ClassComponent, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let classInstance = new ClassComponent(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ClassComponent.contextType) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.context = ClassComponent.contextType._currentValue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //如果类组件的虚拟DOM有ref属性，那么就把类的实例赋给ref.current属性")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ref) ref.current = classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (classInstance.componentWillMount) {//组件将要挂载")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.componentWillMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //把类组件的实例挂载到它对应的vdom上")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.classInstance = classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = classInstance.render();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //把类组件的实例的render方法返回的虚拟DOM转成真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let dom = createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (classInstance.componentDidMount) {//组件已经挂载")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom._componentDidMount = classInstance.componentDidMount.bind(classInstance);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountFunctionComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let oldRenderVdom = type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  vdom.oldRenderVdom = oldRenderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return createDOM(oldRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function reconcileChildren(childrenVdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  childrenVdom.forEach((childVdom, index) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    childVdom._mountIndex = index; // TODO")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render(childVdom, parentDOM)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 把新的属性更新到真实DOM上")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} dom 真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldProps 旧的属性对象")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newProps 新的属性对象")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (key === 'children') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 此处忽略子节点的处理")]),l(`
`),n("span",{class:"line"},[n("span",null,"      continue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (key === 'style') {//style")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let styleObj = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      for (let attr in styleObj) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.style[attr] = styleObj[attr];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (key.startsWith('on')) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      //dom[key.toLocaleLowerCase()] = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];//className")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function findDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (!vdom) return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (vdom.dom) {//vdom={type:'h1'}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return vdom.dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let renderVdom = vdom.classInstance")]),l(`
`),n("span",{class:"line"},[n("span",null,"      ? vdom.classInstance.oldRenderVdom")]),l(`
`),n("span",{class:"line"},[n("span",null,"      : vdom.oldRenderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return findDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * dom-diff核心是比较新旧虚拟DOM的差异，然后把差异同步到真实DOM节点上")]),l(`
`),n("span",{class:"line"},[n("span",null," * 1 老新都没有")]),l(`
`),n("span",{class:"line"},[n("span",null," * 2 老有新没有")]),l(`
`),n("span",{class:"line"},[n("span",null," * 3.老没有新有")]),l(`
`),n("span",{class:"line"},[n("span",null," * 4.老新都有")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //老新都没有,什么都不需要做")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (!oldVdom && !newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的没有 卸载老节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom && !newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    unMountVdom(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的没有，新有的")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (!oldVdom && newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.insertBefore(newDOM, nextDOM)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.appendChild(newDOM);//添加到父节点上")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的也有，但是类型不同")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    unMountVdom(oldVdom);//删除老的节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.insertBefore(newDOM, nextDOM)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.appendChild(newDOM);//添加到父节点上")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的也有，并且类型也一样，只需要更新就可以，就可以复用老的节点了")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {//进入 深度对比子节点的流程")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateElement(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 深度更新节点")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {} oldVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateElement(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //Provider更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (oldVdom.type.$$typeof === REACT_PROVIDER) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateProvider(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // Consumer的更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type.$$typeof === REACT_CONTEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateContext(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type === REACT_TEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果新老节点都是纯文本节点的")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVdom.props.content !== newVdom.props.content) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 更新文本节点的内容为新的文本内容")]),l(`
`),n("span",{class:"line"},[n("span",null,"      currentDOM.textContent = newVdom.props.content;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type === REACT_FRAGMENT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 此节点是下原生组件 span div而且 类型一样，说明可以复用老的dom节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof oldVdom.type === 'string') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取老的真实DOM，准备复用")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 直接用新的属性更新老的DOM节点即可")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(currentDOM, oldVdom.props, newVdom.props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof oldVdom.type === 'function') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVdom.type.isReactComponent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      updateClassComponent(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      updateFunctionComponent(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function updateProvider(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let currentDOM = findDOM(oldVdom);//<div style={{margin:'10px'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let parentDOM = currentDOM.parentNode;//div#root")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = newVdom;//type ={$$typeof:REACT_PROVIDER,_context:context }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let context = type._context;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  context._currentValue = props.value;//给context赋上新的_currentValue")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = props.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function updateContext(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let currentDOM = findDOM(oldVdom);//<div style={{margin:'10px'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let parentDOM = currentDOM.parentNode;//div#root")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = newVdom;//type ={$$typeof:REACT_PROVIDER,_context:context }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let context = type._context;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let renderVdom = props.children(context._currentValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function updateClassComponent(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let classInstance = newVdom.classInstance = oldVdom.classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (classInstance.componentWillReceiveProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.componentWillReceiveProps(newVdom.props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.updater.emitUpdate(newVdom.props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function updateFunctionComponent(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let currentDOM = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let parentDOM = currentDOM.parentNode;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props } = newVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newRenderVdom = type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVdom.oldRenderVdom = newRenderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 实现完整的DOM-DIFF算法")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM 父DOM节点")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVChildren 老的虚拟DOM儿子的数组")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVChildren 新的虚拟DOM儿子的数组")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateChildren(parentDOM, oldVChildren, newVChildren) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let keyedOldMap = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 上一个不需要移动的老DOM节点的索引")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let lastPlacedIndex = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  oldVChildren.forEach((oldVChild, index) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果提供了key,会使用key作为唯一标识，如果没有提供，会使用索引")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let oldKey = oldVChild.key || index;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    keyedOldMap[oldKey] = oldVChild;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 存着将要进行的操作")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let patch = [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 循环新数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVChildren.forEach((newVChild, index) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 设置虚拟DOM的挂载索引为index")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newVChild._mountIndex = index;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newKey = newVChild.key || index;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let oldVChild = keyedOldMap[newKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVChild) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 如果找到了，按理应该在此判断类型，省略....")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 先执行更新虚拟DOM元素 在React15里 DOM的更新和DOM-DIFF放在一起进行的。")]),l(`
`),n("span",{class:"line"},[n("span",null,"      updateElement(oldVChild, newVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (oldVChild._mountIndex < lastPlacedIndex) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"          type: MOVE,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          oldVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          newVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          fromIndex: oldVChild._mountIndex,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          toIndex: index")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 如果此节点被复用了，把它从map中删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"      delete keyedOldMap[newKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild._mountIndex);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 没有找到可复用老节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"        type: PLACEMENT,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        newVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        toIndex: index")]),l(`
`),n("span",{class:"line"},[n("span",null,"      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  /* Object.values(keyedOldMap).forEach(oldVChild=>{")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"          type:DELETION,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          oldVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          fromIndex:oldVChild._mountIndex")]),l(`
`),n("span",{class:"line"},[n("span",null,"      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }); */")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 获取要移动 的元素 这里面只有B")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 此处我只是把B从界面中移动了，但是B还在是内存里的，B 这个DOM元素并没有被 销毁")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const moveChilds = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 现在keyedOldMap放着所有的剩下的元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Object.values(keyedOldMap).concat(moveChilds).forEach(oldVChild => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = findDOM(oldVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取到B D F三个真实DOM元素，然后从界面中删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"    currentDOM.parentNode.removeChild(currentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (patch.length > 0) console.log(patch);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  patch.forEach(action => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, oldVChild, newVChild, fromIndex, toIndex } = action;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取真实的子DOM元素的集合[A,C,E]")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let childNodes = parentDOM.childNodes;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (type === PLACEMENT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 根据虚拟DOM创建真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let newDOM = createDOM(newVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 找一下目标索引现在对应的真实DOM元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let childDOMNode = childNodes[toIndex];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (childDOMNode) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 如果此位置 上已经 有DOM元素的，插入到它前面是")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.insertBefore(newDOM, childDOMNode);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 添加到最后就可以了")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type === MOVE) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 找到老的真实DOM 还可以把内存中的B取到，插入到指定的位置 B")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let oldDOM = findDOM(oldVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 找一下目标索引现在对应的真实DOM元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let childDOMNode = childNodes[toIndex];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (childDOMNode) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 如果此位置 上已经 有DOM元素的，插入到它前面是")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.insertBefore(oldDOM, childDOMNode);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 添加到最后就可以了")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.appendChild(oldDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  /*  let maxChildrenLength = Math.max(oldVChildren.length, newVChildren.length);")]),l(`
`),n("span",{class:"line"},[n("span",null,"   //oldChildren=3 newChildren=2   oldChildren=2 newChildren=3")]),l(`
`),n("span",{class:"line"},[n("span",null,"   for (let i = 0; i < maxChildrenLength; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"       //试图取出当前的节点的下一个，最近的弟弟真实DOM节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"       let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));")]),l(`
`),n("span",{class:"line"},[n("span",null,"       compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], findDOM(nextVdom));")]),l(`
`),n("span",{class:"line"},[n("span",null,"   } */")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function unMountVdom(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 获取此虚拟DOM对应的真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let currentDOM = findDOM(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // vdom可能是原生组件span 类组件 classComponent 也可能是函数组件Function")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    vdom.classInstance.componentWillUnmount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (ref) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ref.current = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 取消监听函数")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Object.keys(props).forEach(propName => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果你是把事件监听绑定在真实DOM上")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (propName.slice(0, 2) === 'on') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (currentDOM) delete currentDOM._store;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      /*")]),l(`
`),n("span",{class:"line"},[n("span",null,"      const eventName = propName.slice(2).toLowerCase();//onClick  click")]),l(`
`),n("span",{class:"line"},[n("span",null,"       currentDOM.removeEventListener(eventName, props[propName]); */")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 我们现在用了合成事件")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 如果此虚拟DOM有子节点的话，递归全部删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (props.children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 得到儿子的数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let children = Array.isArray(props.children) ? props.children : [props.children];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    children.forEach(unMountVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 把自己这个虚拟DOM对应的真实DOM从界面删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (currentDOM) currentDOM.parentNode.removeChild(currentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const ReactDOM = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const h=a(i,[["render",c]]);export{V as __pageData,h as default};
