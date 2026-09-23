import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实现src-react-dom.js","description":"把虚拟 DOM 变成真实 DOM 插入到容器内部 虚拟 容器 把虚拟 DOM 转成真实 真实 说明它是一个转发过的函数组件 如果这个元素是一个文本的话 如果类型是一个函数的话 说明它是一个类组件 处理属性 说明这是一个 React 元素 让虚拟 DOM 的 dom 属性指向这个虚。","frontmatter":{"title":"实现src-react-dom.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"把虚拟 DOM 变成真实 DOM 插入到容器内部 虚拟 容器 把虚拟 DOM 转成真实 真实 说明它是一个转发过的函数组件 如果这个元素是一个文本的话 如果类型是一个函数的话 说明它是一个类组件 处理属性 说明这是一个 React 元素 让虚拟 DOM 的 dom 属性指向这个虚。","sidebarWeight":33,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/8.基本生命周期 /实现src-react-dom.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/8.基本生命周期/实现src-react-dom.js.md","filePath":"posts/React系统教程/03-原理与手写实现/8.基本生命周期/实现src-react-dom.js.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/8.基本生命周期/实现src-react-dom.js.md"};function t(c,s,o,d,u,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实现src-react-dom-js",tabindex:"-1"},[l("实现src-react-dom.js "),n("a",{class:"header-anchor",href:"#实现src-react-dom-js","aria-label":'Permalink to "实现src-react-dom.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { REACT_TEXT, REACT_FORWARD_REF } from "./constants";')]),l(`
`),n("span",{class:"line"},[n("span",null,"import { addEvent } from './event';")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," *")])])])]),n("p",null,[l("把虚拟"),n("code",null,"DOM"),l("变成真实"),n("code",null,"DOM"),l("插入到容器内部")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," * @param {*} vdom")])])])]),n("p",null,"虚拟"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} container")])])])]),n("p",null,"容器"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function render(vdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newDOM = createDOM(vdom)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.appendChild(newDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," *")])])])]),n("p",null,[l("把虚拟"),n("code",null,"DOM"),l("转成真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function createDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (!vdom) return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let dom;//")])])])]),n("p",null,"真实"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (type && type.$$typeof === REACT_FORWARD_REF) {//")])])])]),n("p",null,"说明它是一个转发过的函数组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        return mountForwardComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type === REACT_TEXT) {//")])])])]),n("p",null,"如果这个元素是一个文本的话"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        dom = document.createTextNode(props.content);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (typeof type === 'function') {//")])])])]),n("p",null,"如果类型是一个函数的话"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (type.isReactComponent) {//")])])])]),n("p",null,"说明它是一个类组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            return mountClassComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return mountFunctionComponent(vdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom = document.createElement(type);// div span p")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"处理属性"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        updateProps(dom, {}, props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (props.children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            let children = props.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (typeof children === 'object' && children.type) {//")])])])]),n("p",null,[l("说明这是一个"),n("code",null,"React"),l("元素")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                render(children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            } else if (Array.isArray(children)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                reconcileChildren(props.children, dom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    vdom.dom = dom;//")])])])]),n("p",null,[l("让虚拟"),n("code",null,"DOM"),l("的"),n("code",null,"dom"),l("属性指向这个虚拟"),n("code",null,"DOM"),l("对应的真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (ref) ref.current = dom;//")])])])]),n("p",null,[l("如果把虚拟"),n("code",null,"DOM"),l("转成真实"),n("code",null,"DOM"),l("，就让"),n("code",null,"ref.current ="),l("真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountForwardComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let renderVdom = type.render(props, ref);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountClassComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type: ClassComponent, props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let classInstance = new ClassComponent(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("如果类组件的虚拟"),n("code",null,"DOM"),l("有"),n("code",null,"ref"),l("属性，那么就把类的实例赋给"),n("code",null,"ref.current"),l("属性")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (ref) ref.current = classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (classInstance.componentWillMount) {//")])])])]),n("p",null,"组件将要挂载"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        classInstance.componentWillMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("把类组件的实例挂载到它对应的"),n("code",null,"vdom"),l("上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    vdom.classInstance = classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let renderVdom = classInstance.render();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("把类组件的实例的"),n("code",null,"render"),l("方法返回的虚拟"),n("code",null,"DOM"),l("转成真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let dom = createDOM(renderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (classInstance.componentDidMount) {//")])])])]),n("p",null,"组件已经挂载"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom._componentDidMount = classInstance.componentDidMount.bind(classInstance);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountFunctionComponent(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, props } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let oldRenderVdom = type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    vdom.oldRenderVdom = oldRenderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return createDOM(oldRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function reconcileChildren(childrenVdom, parentDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    childrenVdom.forEach(childVdom => render(childVdom, parentDOM));")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," *")])])])]),n("p",null,[l("把新的属性更新到真实"),n("code",null,"DOM"),l("上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," * @param {*} dom")])])])]),n("p",null,"真实"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldProps")])])])]),n("p",null,"旧的属性对象"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," * @param {*} newProps")])])])]),n("p",null,"新的属性对象"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (let key in newProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (key === 'children') {//children")]),l(`
`),n("span",{class:"line"},[n("span",null,"            continue;//")])])])]),n("p",null,"此处忽略子节点的处理"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        } else if (key === 'style') {//style")]),l(`
`),n("span",{class:"line"},[n("span",null,"            let styleObj = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"            for (let attr in styleObj) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                dom.style[attr] = styleObj[attr];")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else if (key.startsWith('on')) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            //dom[key.toLocaleLowerCase()] = newProps[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"            addEvent(dom, key.toLocaleLowerCase(), newProps[key]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            dom[key] = newProps[key];//className")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function findDOM(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (!vdom) return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (vdom.dom) {//vdom={type:'h1'}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return vdom.dom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[l("类组件 还是函数组件，他们虚拟"),n("code",null,"DOM"),l("身上没有"),n("code",null,"dom"),l("属性，但是")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"oldRenderVdom")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return findDOM(vdom.oldRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * dom-diff")])])])]),n("p",null,[l("核心是比较新旧虚拟"),n("code",null,"DOM"),l("的差异，然后把差异同步到真实"),n("code",null,"DOM"),l("节点上 "),n("code",null,"* 1"),l(" 老新都没有 "),n("code",null,"* 2"),l(" 老有新没有 "),n("code",null,"* 3."),l("老没有新有 "),n("code",null,"* 4."),l("老新都有")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("老新都没有"),n("code",null,","),l("什么都不需要做")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (!oldVdom && !newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"如果老的有，新的没有 卸载老节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (oldVdom && !newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        unMountVdom(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"如果老的没有，新有的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (!oldVdom && newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        let newDOM = createDOM(newVdom);//")])])])]),n("p",null,[l("根据新的虚拟"),n("code",null,"DOm"),l("创建新的真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            parentDOM.insertBefore(newDOM, nextDOM)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            parentDOM.appendChild(newDOM);//")])])])]),n("p",null,"添加到父节点上"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"如果老的有，新的也有，但是类型不同"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        unMountVdom(oldVdom);//")])])])]),n("p",null,"删除老的节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let newDOM = createDOM(newVdom);//")])])])]),n("p",null,[l("根据新的虚拟"),n("code",null,"DOm"),l("创建新的真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (nextDOM) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            parentDOM.insertBefore(newDOM, nextDOM)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            parentDOM.appendChild(newDOM);//")])])])]),n("p",null,"添加到父节点上"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (newDOM._componentDidMount) newDOM._componentDidMount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"如果老的有，新的也有，并且类型也一样，只需要更新就可以，就可以复用老的节点了"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else {//")])])])]),n("p",null,"进入 深度对比子节点的流程"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        updateElement(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," *")])])])]),n("p",null,"深度更新节点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," * @param {} oldVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateElement(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"如果新老节点都是纯文本节点的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (oldVdom.type === REACT_TEXT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (oldVdom.props.content !== newVdom.props.content) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            let currentDOM = newVdom.dom = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            currentDOM.textContent = newVdom.props.content;//")])])])]),n("p",null,"更新文本节点的内容为新的文本内容"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[l("此节点是下原生组件 "),n("code",null,"span div"),l("而且 类型一样，说明可以复用老的"),n("code",null,"dom"),l("节点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (typeof oldVdom.type === 'string') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        let currentDOM = newVdom.dom = findDOM(oldVdom);//")])])])]),n("p",null,[l("获取老的真实"),n("code",null,"DOM"),l("，准备复用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        updateProps(currentDOM, oldVdom.props, newVdom.props);//")])])])]),n("p",null,[l("直接用新的属性更新老的"),n("code",null,"DOM"),l("节点即可")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (typeof oldVdom.type === 'function') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (oldVdom.type.isReactComponent) {//")])])])]),n("p",null,"类组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            updateClassComponent(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {//")])])])]),n("p",null,"函数组件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            updateFunctionComponent(oldVdom, newVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateClassComponent(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let classInstance = newVdom.classInstance = oldVdom.classInstance;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (classInstance.componentWillReceiveProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        classInstance.componentWillReceiveProps(newVdom.props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.updater.emitUpdate(newVdom.props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newVdom.oldRenderVdom = classInstance.oldRenderVdom;//")])])])]),n("p",null,[l("是用来找真实"),n("code",null,"DOM"),l("时有用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateFunctionComponent(oldVdom, newVdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = findDOM(oldVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let parentDOM = currentDOM.parentNode;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, props } = newVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newRenderVdom = type(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newVdom.oldRenderVdom = newRenderVdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateChildren(parentDOM, oldVChildren, newVChildren) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let maxChildrenLength = Math.max(oldVChildren.length, newVChildren.length);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //oldChildren=3 newChildren=2   oldChildren=2 newChildren=3")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (let i = 0; i < maxChildrenLength; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[l("试图取出当前的节点的下一个，最近的弟弟真实"),n("code",null,"DOM"),l("节点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));")]),l(`
`),n("span",{class:"line"},[n("span",null,"        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], findDOM(nextVdom));")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function unMountVdom(vdom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { props, ref } = vdom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = findDOM(vdom);//")])])])]),n("p",null,[l("获取此虚拟"),n("code",null,"DOM"),l("对应的真实")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //vdom")])])])]),n("p",null,[l("可能是原生组件"),n("code",null,"span"),l(" 类组件 "),n("code",null,"classComponent"),l(" 也可能是函数组件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Function")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        vdom.classInstance.componentWillUnmount();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (ref) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ref.current = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"取消监听函数"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.keys(props).forEach(propName => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[l("如果你是把事件监听绑定在真实"),n("code",null,"DOM"),l("上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (propName.slice(0, 2) === 'on') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (currentDOM) delete currentDOM._store;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            /*")]),l(`
`),n("span",{class:"line"},[n("span",null,"            const eventName = propName.slice(2).toLowerCase();//onClick  click")]),l(`
`),n("span",{class:"line"},[n("span",null,"             currentDOM.removeEventListener(eventName, props[propName]); */")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"我们现在用了合成事件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("如果此虚拟"),n("code",null,"DOM"),l("有子节点的话，递归全部删除")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (props.children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"得到儿子的数组"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let children = Array.isArray(props.children) ? props.children : [props.children];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        children.forEach(unMountVdom);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[l("把自己这个虚拟"),n("code",null,"DOM"),l("对应的真实"),n("code",null,"DOM"),l("从界面删除")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (currentDOM) currentDOM.parentNode.removeChild(currentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const ReactDOM = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default ReactDOM;")])])])])],-1)])])}const g=a(i,[["render",t]]);export{m as __pageData,g as default};
