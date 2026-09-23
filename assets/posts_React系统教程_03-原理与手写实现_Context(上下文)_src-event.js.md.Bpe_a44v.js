import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"src-event.js","description":"围绕“src-event.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"src-event.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“src-event.js”整理的概念、示例与实践笔记。","sidebarWeight":38,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/Context(上下文)/src-event.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-event.js.md","filePath":"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-event.js.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/Context(上下文)/src-event.js.md"};function c(i,e,u,r,o,v){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"src-event-js",tabindex:"-1"},[s("src-event.js "),n("a",{class:"header-anchor",href:"#src-event-js","aria-label":'Permalink to "src-event.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-event.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { updateQueue } from './Component';")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 实现合成事件或者说事件委托")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} dom 绑定事件的DOM元素 button")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} eventType  事件类型")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} eventHandler  事件的处理函数")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function addEvent(dom, eventType, eventHandler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let store;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // _store是给原生DOM对象上添加的自定义属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (dom._store) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        store = dom._store;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        dom._store = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"        store = dom._store;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // store.onclick=handleClick")]),s(`
`),n("span",{class:"line"},[n("span",null,"    store[eventType] = eventHandler;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // document.onclick=dispatchEvent")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!document[eventType]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        document[eventType] = dispatchEvent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 不管点什么按钮，触发什么事件，最终执行的都是dispatchEvent")]),s(`
`),n("span",{class:"line"},[n("span",null," * 在合成事件的处理函数里，状态的更新是批量的")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} event 原生的事件对象 不同的浏览可能是不一样")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function dispatchEvent(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // target =button type ==click")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { target, type } = event;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let eventType = 'on' + type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 先把批量更新 全局变量设置为true")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateQueue.isBatchingUpdate = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 先创建一个合成事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let syntheticEvent = createSyntheticEvent(event);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let currentTarget = target;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 是在模拟向上冒泡的过程")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 第一次  button -> div")]),s(`
`),n("span",{class:"line"},[n("span",null,"    while (currentTarget) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 获取事件源DOM对象上的store属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let { _store } = currentTarget;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let eventHandler = _store && _store[eventType];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // react事件处理函数，浏览器不知道，也不识别")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (eventHandler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            syntheticEvent.target = target;// button")]),s(`
`),n("span",{class:"line"},[n("span",null,"            syntheticEvent.currentTarget = currentTarget;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // handleClick(syntheticEvent);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            eventHandler && eventHandler.call(target, syntheticEvent);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        currentTarget = currentTarget.parentNode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateQueue.isBatchingUpdate = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 进行真正的更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateQueue.batchUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createSyntheticEvent(nativeEvent) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let syntheticEvent = { nativeEvent };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let key in nativeEvent) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        syntheticEvent[key] = nativeEvent[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 此处会有一些兼容性处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return syntheticEvent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=l(p,[["render",c]]);export{h as __pageData,m as default};
