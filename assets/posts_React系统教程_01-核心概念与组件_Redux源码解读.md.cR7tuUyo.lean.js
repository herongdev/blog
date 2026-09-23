import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Redux源码解读","description":"前言 作为 React 全家桶的一份子， MVVM 中的 VM ， Redux 为 react 提供了严谨周密的状态管理。但 Redux 本身是有点难度的，虽然学习了 React 也有一段时间了，自我感觉算是入了门，也知道 redux 的大概流程。但其背后诸如 createsto。","frontmatter":{"title":"Redux源码解读","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"前言 作为 React 全家桶的一份子， MVVM 中的 VM ， Redux 为 react 提供了严谨周密的状态管理。但 Redux 本身是有点难度的，虽然学习了 React 也有一段时间了，自我感觉算是入了门，也知道 redux 的大概流程。但其背后诸如 createsto。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Redux源码解读.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Redux源码解读.md","filePath":"posts/React系统教程/01-核心概念与组件/Redux源码解读.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/Redux源码解读.md"};function c(t,l,u,d,o,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"redux源码解读",tabindex:"-1"},[s("Redux源码解读 "),n("a",{class:"header-anchor",href:"#redux源码解读","aria-label":'Permalink to "Redux源码解读"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Redux源码解读”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[s("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 "),n("strong",null,"前言"),s(" 作为"),n("code",null,"React"),s("全家桶的一份子，"),n("code",null,"MVVM"),s("中的"),n("code",null,"VM"),s("，"),n("code",null,"Redux"),s("为"),n("code",null,"react"),s("提供了严谨周密的状态管理。但"),n("code",null,"Redux"),s("本身是有点难度的，虽然学习了"),n("code",null,"React"),s("也有一段时间了，自我感觉算是入了门，也知道"),n("code",null,"redux"),s("的大概流程。但其背后诸如"),n("code",null,"createstore,applymiddleware"),s("等"),n("code",null,"API"),s("背后到底发生了什么事情，我其实还是不怎么了解的，因此最近花了几天时间阅读了"),n("code",null,"Redux"),s("的源码，写下文章纪录一下自己看源码的一些理解。"),n("code",null,"("),s("此文章会随着自己对"),n("code",null,"redux"),s("的理解的加深持续更新改进"),n("code",null,")"),n("strong",null,"一、源码结构（"),n("code",null,"redux4.0"),n("strong",null,"版本）"),n("code",null,"Redux"),s("是出了名的短小精悍（恩，这个形容很贴切），只有"),n("code",null,"2kb"),s("大小，且没有任何依赖。它将所有的脏活累活都交给了中间件去处理，自己保持着很好的纯洁性。再加上"),n("code",null,"redux"),s("作者在"),n("code",null,"redux"),s("的源码上，也附加了大量的注释，因此"),n("code",null,"redux"),s("的源码读起来还是不算难的。 先来看看"),n("code",null,"redux"),s("的源码结构，也就是"),n("code",null,"src"),s("目录下的代码：")])]),n("p",null,[n("a",{href:"https://gitee.com/uploads/images/2018/0602/103801_e16b3fc7_1575229.png",target:"_blank",rel:"noreferrer"})]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Redux")])])])]),n("p",null,[n("strong",null,"源码结构图"),n("code",null,".PNG"),s(" 其中"),n("code",null,"utils"),s("是工具函数，主要是作为辅助几个核心"),n("code",null,"API"),s("，因此不作讨论。 （注：由于篇幅的问题，下面代码很多都删除了官方注释，和较长的"),n("code",null,"warn"),s("） "),n("strong",null,"二、具体组成"),n("code",null,"index.js"),s("是"),n("code",null,"redux"),s("的入口函数具体代码如下： "),n("code",null,"2.1 index.js")]),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,"```"),n("td")]),n("tr",null,[n("td",null,"1"),n("td")]),n("tr",null,[n("td",null,"2"),n("td")]),n("tr",null,[n("td",null,"3"),n("td")]),n("tr",null,[n("td",null,"4"),n("td")]),n("tr",null,[n("td",null,"5"),n("td")]),n("tr",null,[n("td",null,"6"),n("td")]),n("tr",null,[n("td",null,"7"),n("td")]),n("tr",null,[n("td",null,"8"),n("td")]),n("tr",null,[n("td",null,"9"),n("td")]),n("tr",null,[n("td",null,"10"),n("td")]),n("tr",null,[n("td",null,"11"),n("td")]),n("tr",null,[n("td",null,"12"),n("td")]),n("tr",null,[n("td",null,"13"),n("td")]),n("tr",null,[n("td",null,"14"),n("td")]),n("tr",null,[n("td",null,"15"),n("td")]),n("tr",null,[n("td",null,"16"),n("td")]),n("tr",null,[n("td",null,"17"),n("td")]),n("tr",null,[n("td",null,"18"),n("td")]),n("tr",null,[n("td",null,"19"),n("td")]),n("tr",null,[n("td",null,"20"),n("td")]),n("tr",null,[n("td",null,"21"),n("td")]),n("tr",null,[n("td",null,"22"),n("td")]),n("tr",null,[n("td",null,"23"),n("td")]),n("tr",null,[n("td",null,"24"),n("td")]),n("tr",null,[n("td",null,"25"),n("td")]),n("tr",null,[n("td",null,"26"),n("td")])])]),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"import createStore from './createStore'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import combineReducers from './combineReducers'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import bindActionCreators from './bindActionCreators'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import applyMiddleware from './applyMiddleware'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import compose from './compose'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import warning from './utils/warning'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import __DO_NOT_USE__ActionTypes from './utils/actionTypes'")]),s(`
`),n("span",{class:"line"},[n("span",null,"function isCrushed() {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (")]),s(`
`),n("span",{class:"line"},[n("span",null,"process.env.NODE_ENV !== 'production' &&")]),s(`
`),n("span",{class:"line"},[n("span",null,"typeof isCrushed.name === 'string' &&")]),s(`
`),n("span",{class:"line"},[n("span",null,"isCrushed.name !== 'isCrushed'")]),s(`
`),n("span",{class:"line"},[n("span",null,") {")]),s(`
`),n("span",{class:"line"},[n("span",null,"warning(")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export {")]),s(`
`),n("span",{class:"line"},[n("span",null,"createStore,")]),s(`
`),n("span",{class:"line"},[n("span",null,"combineReducers,")]),s(`
`),n("span",{class:"line"},[n("span",null,"bindActionCreators,")]),s(`
`),n("span",{class:"line"},[n("span",null,"applyMiddleware,")]),s(`
`),n("span",{class:"line"},[n("span",null,"compose,")]),s(`
`),n("span",{class:"line"},[n("span",null,"__DO_NOT_USE__ActionTypes")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中`isCrushed`函数是用于验证在非生产环境下 `Redux` 是否被压缩，如果被压缩就会给开发者一个 `warn` 的提示。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在最后`index.js` 会暴露 `createStore, combineReducers, bindActionCreators, applyMiddleware, compose` 这几个`redux`最主要的`API`以供大家使用。")])])])]),n("p",null,"2.2 creatStore createStore"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"函数接受三个参数：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `reducer`：是一个函数，返回下一个状态，接受两个参数：当前状态 和 触发的 `action`；")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `preloadedState`：初始状态对象，可以很随意指定，比如服务端渲染的初始状态，但是如果使用 `combineReducers` 来生成 `reducer`，那必须保持状态对象的 `key` 和 `combineReducers` 中的 `key` 相对应；")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `enhancer`：是`store` 的增强器函数，可以指定为中间件，持久化 等，但是这个函数只能用 `Redux` 提供的 `applyMiddleware` 函数来进行生成")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面就是`creactStore`的源码，由于整体源码过长，且 `subscribe` 和 `dispatch` 函数也挺长的，所以就将 `subscribe` 和 `dispatch` 单独提出来细讲。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"24")]),s(`
`),n("span",{class:"line"},[n("span",null,"25")]),s(`
`),n("span",{class:"line"},[n("span",null,"26")]),s(`
`),n("span",{class:"line"},[n("span",null,"27")]),s(`
`),n("span",{class:"line"},[n("span",null,"28")]),s(`
`),n("span",{class:"line"},[n("span",null,"29")]),s(`
`),n("span",{class:"line"},[n("span",null,"30")]),s(`
`),n("span",{class:"line"},[n("span",null,"31")]),s(`
`),n("span",{class:"line"},[n("span",null,"32")]),s(`
`),n("span",{class:"line"},[n("span",null,"33")]),s(`
`),n("span",{class:"line"},[n("span",null,"34")]),s(`
`),n("span",{class:"line"},[n("span",null,"35")]),s(`
`),n("span",{class:"line"},[n("span",null,"36")]),s(`
`),n("span",{class:"line"},[n("span",null,"37")]),s(`
`),n("span",{class:"line"},[n("span",null,"38")]),s(`
`),n("span",{class:"line"},[n("span",null,"39")]),s(`
`),n("span",{class:"line"},[n("span",null,"40")]),s(`
`),n("span",{class:"line"},[n("span",null,"41")]),s(`
`),n("span",{class:"line"},[n("span",null,"42")]),s(`
`),n("span",{class:"line"},[n("span",null,"43")]),s(`
`),n("span",{class:"line"},[n("span",null,"44")]),s(`
`),n("span",{class:"line"},[n("span",null,"45")]),s(`
`),n("span",{class:"line"},[n("span",null,"46")]),s(`
`),n("span",{class:"line"},[n("span",null,"47")]),s(`
`),n("span",{class:"line"},[n("span",null,"48")]),s(`
`),n("span",{class:"line"},[n("span",null,"49")]),s(`
`),n("span",{class:"line"},[n("span",null,"50")]),s(`
`),n("span",{class:"line"},[n("span",null,"51")]),s(`
`),n("span",{class:"line"},[n("span",null,"52")]),s(`
`),n("span",{class:"line"},[n("span",null,"53")]),s(`
`),n("span",{class:"line"},[n("span",null,"54")]),s(`
`),n("span",{class:"line"},[n("span",null,"55")]),s(`
`),n("span",{class:"line"},[n("span",null,"56")]),s(`
`),n("span",{class:"line"},[n("span",null,"57")]),s(`
`),n("span",{class:"line"},[n("span",null,"58")]),s(`
`),n("span",{class:"line"},[n("span",null,"59")]),s(`
`),n("span",{class:"line"},[n("span",null,"60")]),s(`
`),n("span",{class:"line"},[n("span",null,"61")]),s(`
`),n("span",{class:"line"},[n("span",null,"62")]),s(`
`),n("span",{class:"line"},[n("span",null,"63")]),s(`
`),n("span",{class:"line"},[n("span",null,"64")]),s(`
`),n("span",{class:"line"},[n("span",null,"65")]),s(`
`),n("span",{class:"line"},[n("span",null,"66")]),s(`
`),n("span",{class:"line"},[n("span",null,"67")]),s(`
`),n("span",{class:"line"},[n("span",null,"68")]),s(`
`),n("span",{class:"line"},[n("span",null,"69")]),s(`
`),n("span",{class:"line"},[n("span",null,"70")]),s(`
`),n("span",{class:"line"},[n("span",null,"71")]),s(`
`),n("span",{class:"line"},[n("span",null,"72")]),s(`
`),n("span",{class:"line"},[n("span",null,"73")]),s(`
`),n("span",{class:"line"},[n("span",null,"74")]),s(`
`),n("span",{class:"line"},[n("span",null,"75")]),s(`
`),n("span",{class:"line"},[n("span",null,"76")]),s(`
`),n("span",{class:"line"},[n("span",null,"77")]),s(`
`),n("span",{class:"line"},[n("span",null,"78")]),s(`
`),n("span",{class:"line"},[n("span",null,"79")]),s(`
`),n("span",{class:"line"},[n("span",null,"80")]),s(`
`),n("span",{class:"line"},[n("span",null,"81")]),s(`
`),n("span",{class:"line"},[n("span",null,"82")]),s(`
`),n("span",{class:"line"},[n("span",null,"83")]),s(`
`),n("span",{class:"line"},[n("span",null,"84")]),s(`
`),n("span",{class:"line"},[n("span",null,"85")]),s(`
`),n("span",{class:"line"},[n("span",null,"86")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"import $$observable from 'symbol-observable'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ActionTypes from './utils/actionTypes'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import isPlainObject from './utils/isPlainObject'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export default function createStore(reducer, preloadedState, enhancer) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"enhancer = preloadedState")]),s(`
`),n("span",{class:"line"},[n("span",null,"preloadedState = undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// enhancer")])])])]),n("p",null,"==应该为一个函数=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (typeof enhancer !== 'undefined') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof enhancer !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error('Expected the enhancer to be a function.')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//enhancer")])])])]),n("p",null,[s("==接受== "),n("code",null,"createStore"),s(" ==作为参数，对== "),n("code",null,"createStore"),s(" ==的能力进行增强，并返回增强后的== "),n("code",null,"createStore"),s(" ==。== "),n("code",null,"//"),s(" ==然后再将== "),n("code",null,"reducer"),s(" ==和== "),n("code",null,"preloadedState"),s(" ==作为参数传给增强后的== "),n("code",null,"createStore"),s(" ==，最终得到生成的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," store")]),s(`
`),n("span",{class:"line"},[n("span",null,"return enhancer(createStore)(reducer, preloadedState)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// reducer")])])])]),n("p",null,"==必须是函数=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (typeof reducer !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error('Expected the reducer to be a function.')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s(" ==初始化参数==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let currentReducer = reducer   //")])])])]),n("p",null,"==当前整个=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"reducer")]),s(`
`),n("span",{class:"line"},[n("span",null,"let currentState = preloadedState   //")])])])]),n("p",null,[s("==当前的=="),n("code",null,"state,"),s("==也就是=="),n("code",null,"getState"),s("==返回的值==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let currentListeners = []  //")])])])]),n("p",null,[s("==当前的订阅=="),n("code",null,"store"),s("==的监听器==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let nextListeners = currentListeners //")])])])]),n("p",null,"==下一次的订阅=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let isDispatching = false //")])])])]),n("p",null,[s("==是否处于== "),n("code",null,"dispatch action"),s(" ==状态中=="),n("code",null,","),s(" ==默认为=="),n("code",null,"false")]),n("p",null,[n("code",null,"//"),s(" ==这个函数用于确保=="),n("code",null,"currentListeners"),s(" ==和== "),n("code",null,"nextListeners"),s(" ==是不同的引用==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function ensureCanMutateNextListeners() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (nextListeners === currentListeners) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"nextListeners = currentListeners.slice()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s(" ==返回==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"state")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (isDispatching) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return currentState")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s(" ==添加订阅==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function subscribe(listener) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==分发=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"action")]),s(`
`),n("span",{class:"line"},[n("span",null,"function dispatch(action) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s("==这个函数主要用于== "),n("code",null,"reducer"),s(" ==的热替换，用的少==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function replaceReducer(nextReducer) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof nextReducer !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error('Expected the nextReducer to be a function.')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==替换=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"reducer")]),s(`
`),n("span",{class:"line"},[n("span",null,"currentReducer = nextReducer")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==重新进行初始化=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"dispatch({ type: ActionTypes.REPLACE })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s(" ==没有研究，暂且放着，它是不直接暴露给开发者的，提供了给其他一些像观察者模式库的交互操作。==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function observable() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("code",null,"//"),s(" ==创建一个=="),n("code",null,"store"),s("==时的默认==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"state")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==用于填充初始的状态树== "),n("code",null,"dispatch({ type: ActionTypes.INIT })")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"dispatch,")]),s(`
`),n("span",{class:"line"},[n("span",null,"subscribe,")]),s(`
`),n("span",{class:"line"},[n("span",null,"getState,")]),s(`
`),n("span",{class:"line"},[n("span",null,"replaceReducer,")]),s(`
`),n("span",{class:"line"},[n("span",null,"[$$observable]: observable")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`subscribe`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"24")]),s(`
`),n("span",{class:"line"},[n("span",null,"25")]),s(`
`),n("span",{class:"line"},[n("span",null,"26")]),s(`
`),n("span",{class:"line"},[n("span",null,"27")]),s(`
`),n("span",{class:"line"},[n("span",null,"28")]),s(`
`),n("span",{class:"line"},[n("span",null,"29")]),s(`
`),n("span",{class:"line"},[n("span",null,"30")]),s(`
`),n("span",{class:"line"},[n("span",null,"31")]),s(`
`),n("span",{class:"line"},[n("span",null,"32")]),s(`
`),n("span",{class:"line"},[n("span",null,"33")]),s(`
`),n("span",{class:"line"},[n("span",null,"34")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"function subscribe(listener) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof listener !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error('Expected the listener to be a function.')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (isDispatching) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let isSubscribed = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==如果== "),n("code",null,"nextListeners"),s(" ==和== "),n("code",null,"currentListeners"),s(" ==是一个引用，重新复制一个新的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ensureCanMutateNextListeners()")]),s(`
`),n("span",{class:"line"},[n("span",null,"nextListeners.push(listener)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"return function unsubscribe() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (!isSubscribed) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (isDispatching) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,".......")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"isSubscribed = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"ensureCanMutateNextListeners()")]),s(`
`),n("span",{class:"line"},[n("span",null,"const index = nextListeners.indexOf(listener)")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==从=="),n("code",null,"nextListeners"),s("==里面删除，会在下次=="),n("code",null,"dispatch"),s("==生效==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nextListeners.splice(index, 1)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"有时候有些人会觉得 `store.subscribe` 用的很少`,`其实不然，是 `react-redux` 隐式的为我们帮我们完成了这方面的工作。`subscribe` 函数可以给 `store` 的状态添加订阅监听，一旦我们调用了 `dispatch` 来分发 `action` ，所有的监听函数就会执行。而 `nextListeners` 就是储存当前监听函数的列表，当调用 `subscribe`，传入一个函数作为参数时，就会给 `nextListeners` 列表 `push` 这个函数。同时调用 `subscribe` 函数会返回一个 `unsubscribe` 函数，用来解绑当前传入的函数，同时在 `subscribe` 函数定义了一个 `isSubscribed` 标志变量来判断当前的订阅是否已经被解绑，解绑的操作就是从 `nextListeners` 列表中删除当前的监听函数。")])])])]),n("p",null,"dispatch dispatch"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"是`redux`中一个非常核心的方法，也是我们在日常开发中最常用的方法之一。`dispatch`函数是用来触发状态改变的，他接受一个 `action` 对象作为参数，然后 `reducer` 就可以根据 `action` 的属性以及当前 `store` 的状态，来生成一个新的状态，从而改变 `store` 的状态；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"24")]),s(`
`),n("span",{class:"line"},[n("span",null,"25")]),s(`
`),n("span",{class:"line"},[n("span",null,"26")]),s(`
`),n("span",{class:"line"},[n("span",null,"27")]),s(`
`),n("span",{class:"line"},[n("span",null,"28")]),s(`
`),n("span",{class:"line"},[n("span",null,"29")]),s(`
`),n("span",{class:"line"},[n("span",null,"30")]),s(`
`),n("span",{class:"line"},[n("span",null,"31")]),s(`
`),n("span",{class:"line"},[n("span",null,"32")]),s(`
`),n("span",{class:"line"},[n("span",null,"33")]),s(`
`),n("span",{class:"line"},[n("span",null,"34")]),s(`
`),n("span",{class:"line"},[n("span",null,"35")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"function dispatch(action) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// action")])])])]),n("p",null,"==必须是一个对象=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (!isPlainObject(action)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// type")])])])]),n("p",null,"==必须要有属性，不能是=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof action.type === 'undefined') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"......")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==禁止在=="),n("code",null,"reducers"),s("==中进行=="),n("code",null,"dispatch"),s("==，因为这样做可能导致分发死循环，同时也增加了数据流动的复杂度==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (isDispatching) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error('Reducers may not dispatch actions.')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"isDispatching = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==将当前的状态和== "),n("code",null,"action"),s(" ==传给当前的=="),n("code",null,"reducer"),s("==，用于生成最新的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," state")]),s(`
`),n("span",{class:"line"},[n("span",null,"currentState = currentReducer(currentState, action)")]),s(`
`),n("span",{class:"line"},[n("span",null,"} finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==派发完毕=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"isDispatching = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==将=="),n("code",null,"nextListeners"),s("==交给==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"listeners")]),s(`
`),n("span",{class:"line"},[n("span",null,"const listeners = (currentListeners = nextListeners)")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==在得到新的状态后，依次调用所有的监听器，通知状态的变更=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for (let i = 0; i < listeners.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"const listener = listeners[i]")]),s(`
`),n("span",{class:"line"},[n("span",null,"listener()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return action")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"2.3 compose.js compose"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以接受一组函数参数，从右到左来组合多个函数，然后返回一个组合函数。它的源码并不长，但设计的十分巧妙：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function compose(...funcs) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (funcs.length === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return arg => arg")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (funcs.length === 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return funcs[0]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return funcs.reduce((a, b) => (...args) => a(b(...args)))")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`compose`函数的作用其实其源码的注释里讲的很清楚了，比如下面这样：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|`1`|`compose(funcA, funcB, funcC)`|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"其实它与这样是等价的：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|`1`|`compose(funcA(funcB(funcC())))`|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`ompose` 做的只是让我们在写深度嵌套的函数时，避免了代码的向右偏移。")])])])]),n("p",null,"2.4 applyMiddleware applyMiddleware"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"也是`redux`中非常重要的一个函数，设计的也非常巧妙，让人叹为观止。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function applyMiddleware(...middlewares) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return createStore => (...args) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==利用传入的=="),n("code",null,"createStore"),s("==和=="),n("code",null,"reducer"),s("==和创建一个==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"store")]),s(`
`),n("span",{class:"line"},[n("span",null,"const store = createStore(...args)")]),s(`
`),n("span",{class:"line"},[n("span",null,"let dispatch = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"throw new Error(")]),s(`
`),n("span",{class:"line"},[n("span",null,"`Dispatching while constructing your middleware is not allowed. ` +")]),s(`
`),n("span",{class:"line"},[n("span",null,"`Other middleware would not be applied to this dispatch.`")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const middlewareAPI = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"getState: store.getState,")]),s(`
`),n("span",{class:"line"},[n("span",null,"dispatch: (...args) => dispatch(...args)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==让每个== "),n("code",null,"middleware"),s(" ==带着== "),n("code",null,"middlewareAPI"),s(" ==这个参数分别执行一遍==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const chain = middlewares.map(middleware => middleware(middlewareAPI))")]),s(`
`),n("span",{class:"line"},[n("span",null,"dispatch = compose(...chain)(store.dispatch)")]),s(`
`),n("span",{class:"line"},[n("span",null,"return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"...store,")]),s(`
`),n("span",{class:"line"},[n("span",null,"dispatch")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过上面的代码，我们可以看出 `applyMiddleware` 是个三级**柯里化**的函数。它将陆续的获得三个参数：第一个是 `middlewares` 数组，第二个是 `Redux` 原生的 `createStore`，最后一个是 `reducer`，也就是上面的…`args`；")]),s(`
`),n("span",{class:"line"},[n("span",null,"`applyMiddleware` 利用 `createStore` 和 `reducer` 创建了一个 `store`，然后 `store` 的 `getState` 方法和 `dispatch` 方法又分别被直接和间接地赋值给 `middlewareAPI` 变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中这一句我感觉是最核心的：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|`1`|`dispatch = compose(...chain)(store.dispatch)`|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我特意将`compose`与`applyMiddleware`放在一块，就是为了解释这段代码。因此上面那段核心代码中，本质上就是这样的`(`假设…`chain`有三个函数`)`：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|`1`|`dispatch = f1(f2(f3(store.dispatch))))`|")])])])]),n("p",null,"2.5 combineReducers combineReducers"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个辅助函数的作用就是，将一个由多个不同 `reducer` 函数作为 `value` 的 `object` 合并成一个最终的 `reducer` 函数，然后我们就可以对这个 `reducer` 调用 `createStore` 方法了。这在`createStore`的源码的注释中也有提到过。")]),s(`
`),n("span",{class:"line"},[n("span",null,"并且合并后的 `reducer` 可以调用各个子 `reducer`，并把它们返回的结果合并成一个 `state` 对象。 由 `combineReducers()` 返回的 `state` 对象，会将传入的每个 `reducer` 返回的 `state` 按其传递给 `combineReducers()` 时对应的 `key` 进行命名。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面我们来看源码，下面的源码删除了一些的检查判断，只保留最主要的源码：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"24")]),s(`
`),n("span",{class:"line"},[n("span",null,"25")]),s(`
`),n("span",{class:"line"},[n("span",null,"26")]),s(`
`),n("span",{class:"line"},[n("span",null,"27")]),s(`
`),n("span",{class:"line"},[n("span",null,"28")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function combineReducers(reducers) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"const reducerKeys = Object.keys(reducers)")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==有效的== "),n("code",null,"reducer"),s(" ==列表==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const finalReducers = {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < reducerKeys.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"const key = reducerKeys[i]")]),s(`
`),n("span",{class:"line"},[n("span",null,"const finalReducerKeys = Object.keys(finalReducers)")])])])]),n("p",null,[n("code",null,"//"),s(" ==返回最终生成的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," reducer")]),s(`
`),n("span",{class:"line"},[n("span",null,"return function combination(state = {}, action) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"let hasChanged = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==定义新的=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nextState")]),s(`
`),n("span",{class:"line"},[n("span",null,"const nextState = {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1")])])])]),n("p",null,[s("==，遍历=="),n("code",null,"reducers"),s("==对象中的有效=="),n("code",null,"key"),s("==，== "),n("code",null,"// 2"),s("==，执行该=="),n("code",null,"key"),s("==对应的=="),n("code",null,"value"),s("==函数，即子=="),n("code",null,"reducer"),s("==函数，并得到对应的=="),n("code",null,"state"),s("==对象== "),n("code",null,"// 3"),s("==，将新的子=="),n("code",null,"state"),s("==挂到新的=="),n("code",null,"nextState"),s("==对象上，而=="),n("code",null,"key"),s("==不变==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for (let i = 0; i < finalReducerKeys.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"const key = finalReducerKeys[i]")]),s(`
`),n("span",{class:"line"},[n("span",null,"const reducer = finalReducers[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"const previousStateForKey = state[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"const nextStateForKey = reducer(previousStateForKey, action)")]),s(`
`),n("span",{class:"line"},[n("span",null,"nextState[key] = nextStateForKey")]),s(`
`),n("span",{class:"line"},[n("span",null,"hasChanged = hasChanged \\| nextStateForKey !== previousStateForKey")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("==遍历一遍看是否发生改变，发生改变了返回新的=="),n("code",null,"state"),s("==，否则返回原先的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"state")]),s(`
`),n("span",{class:"line"},[n("span",null,"return hasChanged ? nextState : state")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"2.6 bindActionCreators bindActionCreators"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以把一个 `value` 为不同 `action creator` 的对象，转成拥有同名 `key` 的对象。同时使用 `dispatch` 对每个 `action creator` 进行包装，以便可以直接调用它们。")]),s(`
`),n("span",{class:"line"},[n("span",null,"`bindActionCreators`函数并不常用（反正我还没有怎么用过），惟一会使用到 `bindActionCreators` 的场景就是我们需要把 `action creator` 往下传到一个组件上，却不想让这个组件觉察到 `Redux` 的存在，并且不希望把 `dispatch` 或 `Redux store` 传给它。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"24")]),s(`
`),n("span",{class:"line"},[n("span",null,"25")]),s(`
`),n("span",{class:"line"},[n("span",null,"26")]),s(`
`),n("span",{class:"line"},[n("span",null,"27")]),s(`
`),n("span",{class:"line"},[n("span",null,"28")]),s(`
`),n("span",{class:"line"},[n("span",null,"29")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|`//` ==核心代码，并通过==`apply`==将==`this`==绑定起来==")])])])]),n("p",null,"function bindActionCreator(actionCreator, dispatch) { return function() { return dispatch(actionCreator.apply(this, arguments)) } } //"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==这个函数只是把==`actionCreators`==这个对象里面包含的每一个==`actionCreator`==按照原来的==`key`==的方式全部都封装了一遍，核心代码还是上面的==")])])])]),n("p",null,"export default function bindActionCreators(actionCreators, dispatch) { //"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果==`actionCreators`==是一个函数，则说明只有一个==`actionCreator`==，就直接调用==")])])])]),n("p",null,"bindActionCreator if (typeof actionCreators === 'function') { return bindActionCreator(actionCreators, dispatch) } //"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果是==`actionCreator`==是对象或者==`null`==的话，就会报错==")])])])]),n("p",null,"if (typeof actionCreators !== 'object' | actionCreators === null) { throw new Error( ... ... } //"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==遍历对象，然后对每个遍历项的== `actionCreator` ==生成函数，将函数按照原来的== `key` ==值放到一个对象中，最后返回这个对象==")])])])]),n("p",null,"const keys = Object.keys(actionCreators) const boundActionCreators = {} for (let i = 0; i < keys.length; i++) { const key = keys[i] const actionCreator = actionCreators[key] if (typeof actionCreator === 'function') { boundActionCreators[key] = bindActionCreator(actionCreator, dispatch) } } return boundActionCreators }"),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**小节**")]),s(`
`),n("span",{class:"line"},[n("span",null,"看一遍`redux`，感觉设计十分巧秒，不愧是大佬的作品。这次看代码只是初看，往后随着自己学习的不断深入，还需多加研究，绝对还能得到更多的体会。")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")])])])]),n("p",null,[n("a",{href:"https://srtian96.gitee.io/blog/2018/06/02/%E8%A7%A3%E8%AF%BBRedux%E6%BA%90%E7%A0%81/",target:"_blank",rel:"noreferrer"},"https://srtian96.gitee.io/blog/2018/06/02/解读Redux源码/")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])])],-1)])])}const b=a(i,[["render",c]]);export{g as __pageData,b as default};
