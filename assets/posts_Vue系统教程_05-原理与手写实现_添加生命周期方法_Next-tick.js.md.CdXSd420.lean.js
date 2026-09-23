import{_ as e,o as a,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"Next-tick.js","description":"用到的方法： 当原生 Promise 不可用时，使用 不可靠的 如果不传回调函数，也会执行一个函数 这个函数将第二个参数 resolve 出去 然后我们可以这样使用 这样相当于异步获取 obj 对象 返回一个 promise ，用来处理调用时不传回调函数的情况。","frontmatter":{"title":"Next-tick.js","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"用到的方法： 当原生 Promise 不可用时，使用 不可靠的 如果不传回调函数，也会执行一个函数 这个函数将第二个参数 resolve 出去 然后我们可以这样使用 这样相当于异步获取 obj 对象 返回一个 promise ，用来处理调用时不传回调函数的情况。","sidebarWeight":77,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/添加生命周期方法/Next-tick.js.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/添加生命周期方法/Next-tick.js.md","filePath":"posts/Vue系统教程/05-原理与手写实现/添加生命周期方法/Next-tick.js.md"}'),t={name:"posts/Vue系统教程/05-原理与手写实现/添加生命周期方法/Next-tick.js.md"};function p(c,l,u,o,r,d){return a(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"next-tick-js",tabindex:"-1"},[s("Next-tick.js "),n("a",{class:"header-anchor",href:"#next-tick-js","aria-label":'Permalink to "Next-tick.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Next-tick.js”的核心思路，并能把它用于实际开发或面试表达。 用到的方法：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/* istanbul ignore next */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function isNative (Ctor: any): boolean {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/* @flow */")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* globals MutationObserver */")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { noop } from 'shared/util'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { handleError } from './error'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { isIE, isIOS, isNative } from './env'")]),s(`
`),n("span",{class:"line"},[n("span",null,"export let isUsingMicroTask = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"const callbacks = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"let pending = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"function flushCallbacks() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pending = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const copies = callbacks.slice(0)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  callbacks.length = 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < copies.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    copies[i]()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Here we have async deferring wrappers using microtasks.")]),s(`
`),n("span",{class:"line"},[n("span",null,"// In 2.5 we used (macro) tasks (in combination with microtasks).")]),s(`
`),n("span",{class:"line"},[n("span",null,"// However, it has subtle problems when state is changed right before repaint")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (e.g. #6813, out-in transitions).")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Also, using (macro) tasks in event handler would cause some weird behaviors")]),s(`
`),n("span",{class:"line"},[n("span",null,"// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).")]),s(`
`),n("span",{class:"line"},[n("span",null,"// So we now use microtasks everywhere, again.")]),s(`
`),n("span",{class:"line"},[n("span",null,"// A major drawback of this tradeoff is that there are some scenarios")]),s(`
`),n("span",{class:"line"},[n("span",null,"// where microtasks have too high a priority and fire in between supposedly")]),s(`
`),n("span",{class:"line"},[n("span",null,"// sequential events (e.g. #4521, #6690, which have workarounds)")]),s(`
`),n("span",{class:"line"},[n("span",null,"// or even between bubbling of the same event (#6566).")]),s(`
`),n("span",{class:"line"},[n("span",null,"let timerFunc")]),s(`
`),n("span",{class:"line"},[n("span",null,"// The nextTick behavior leverages the microtask queue, which can be accessed")]),s(`
`),n("span",{class:"line"},[n("span",null,"// via either native Promise.then or MutationObserver.")]),s(`
`),n("span",{class:"line"},[n("span",null,"// MutationObserver has wider support, however it is seriously bugged in")]),s(`
`),n("span",{class:"line"},[n("span",null,"// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It")]),s(`
`),n("span",{class:"line"},[n("span",null,"// completely stops working after triggering a few times... so, if native")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Promise is available, we will use it:")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* istanbul ignore next, $flow-disable-line */")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof Promise !== 'undefined' && isNative(Promise)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const p = Promise.resolve()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  timerFunc = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    p.then(flushCallbacks)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // In problematic UIWebViews, Promise.then doesn't completely break, but")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // it can get stuck in a weird state where callbacks are pushed into the")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // microtask queue but the queue isn't being flushed, until the browser")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // needs to do some other work, e.g. handle a timer. Therefore we can")]),s(`
`),n("span",{class:"line"},[n("span",null,'    // "force" the microtask queue to be flushed by adding an empty timer.')]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isIOS) setTimeout(noop)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isUsingMicroTask = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else if (!isIE && typeof MutationObserver !== 'undefined' && (")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isNative(MutationObserver) ||")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // PhantomJS and iOS 7.x")]),s(`
`),n("span",{class:"line"},[n("span",null,"  MutationObserver.toString() === '[object MutationObserverConstructor]'")]),s(`
`),n("span",{class:"line"},[n("span",null,")) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Use MutationObserver where native Promise is not available,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,[s("当原生"),n("code",null,"Promise"),s("不可用时，使用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"MutationObserver")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // e.g. PhantomJS, iOS7, Android 4.4")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // (#6466 MutationObserver is unreliable(")])])])]),n("p",null,"不可靠的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,") in IE11)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let counter = 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const observer = new MutationObserver(flushCallbacks)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const textNode = document.createTextNode(String(counter))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  observer.observe(textNode, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    characterData: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  timerFunc = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    counter = (counter + 1) % 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"    textNode.data = String(counter)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isUsingMicroTask = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Fallback to setImmediate.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Technically it leverages the (macro) task queue,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // but it is still a better choice than setTimeout.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  timerFunc = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setImmediate(flushCallbacks)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Fallback to setTimeout.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  timerFunc = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(flushCallbacks, 0)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function nextTick(cb?: Function, ctx?: Object) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let _resolve")]),s(`
`),n("span",{class:"line"},[n("span",null,"  callbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (cb) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cb.call(ctx)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        handleError(e, ctx, 'nextTick')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,"如果不传回调函数，也会执行一个函数"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,[s("这个函数将第二个参数"),n("code",null,"resolve"),s("出去")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,"然后我们可以这样使用"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nextTick(undefined,obj).then()")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,[s("这样相当于异步获取"),n("code",null,"obj"),s("对象")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    } else if (_resolve) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _resolve(ctx)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!pending) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pending = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"    timerFunc()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // $flow-disable-line")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,[s("返回一个"),n("code",null,"promise"),s("，用来处理调用时不传回调函数的情况")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (!cb && typeof Promise !== 'undefined') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return new Promise(resolve => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _resolve = resolve")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=e(t,[["render",p]]);export{b as __pageData,v as default};
