import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"then的链式调用","description":"要想实现链式调用，我们要返回一个promise对象，然后就可以继续调用.then方法来添加事件回调函数； 的这些操作逻辑放入到我们新创建的promise2的executor函数中； 这样，这些逻辑会立即执行； 但此时，我们通过.then添加的回调函数，是： 在promise2状态。","frontmatter":{"title":"then的链式调用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"要想实现链式调用，我们要返回一个promise对象，然后就可以继续调用.then方法来添加事件回调函数； 的这些操作逻辑放入到我们新创建的promise2的executor函数中； 这样，这些逻辑会立即执行； 但此时，我们通过.then添加的回调函数，是： 在promise2状态。","sidebarWeight":84,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/promise实现/then的链式调用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/promise实现/then的链式调用.md","filePath":"posts/JavaScript系统教程/05-异步编程/promise实现/then的链式调用.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/promise实现/then的链式调用.md"};function c(t,l,u,o,r,h){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"then的链式调用",tabindex:"-1"},[s("then的链式调用 "),n("a",{class:"header-anchor",href:"#then的链式调用","aria-label":'Permalink to "then的链式调用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“then的链式调用”的核心思路，并能把它用于实际开发或面试表达。 要想实现链式调用，我们要返回一个promise对象，然后就可以继续调用.then方法来添加事件回调函数；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"对于之前：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"异步已完成，状态已凝固就立即执行回调函数；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"异步未完成，状态未凝固就将回调函数放入到回调数组；")])])])]),n("p",null,"的这些操作逻辑放入到我们新创建的promise2的executor函数中； 这样，这些逻辑会立即执行；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const PENDING = 'PENDING';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const FULFILLED = 'FUFILLED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const REJECTED = 'REJECTED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyPromise {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(excutor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = PENDING;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.value = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.reason = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.resolveCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.rejectedCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const resolve = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = FULFILLED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.value = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const reject = (reason) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = REJECTED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.reason = reason;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      excutor(resolve, resolve)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      reject(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  then(onResolve, onReject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const promise2 = new Promise((resolve, reject) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === FULFILLED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onResolve(this.value)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === REJECTED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onReject(this.reason)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onResolve(this.value)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onReject(this.reason)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return promise2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"但此时，我们通过.then添加的回调函数，是： 在promise2状态已凝固时立即调用； 在promise2状态未凝固时，将回调函数放入promise2的回调数组中，不再是放入之前的那个promise实例中保存；"),n("p",null,"所以，要接下来的then回调要能执行，我们必须调用新promise2的resolve或reject方法，这样才能触发状态的凝固，从而结束异步状态，进而执行回调函数；如果是这样的话，我们必须把之前then回调的结果取到，再把这个结果，也就是成功值或失败原因resolve或reject出去；"),n("p",null,"这样算是一个链式调用了，先等待第一个promise状态凝固，从而触发then的回调函数； 当then中的回调执行有了结果，也就是异步结束，promise2的状态也凝固了，也会执行promise2中使用then链式回调添加进去的回调函数；如果再使用.then链式调用，也就是不断创建新的promise，并且在之前promise的状态凝固后，执行此次then添加给新promise的回调函数；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const PENDING = 'PENDING';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const FULFILLED = 'FUFILLED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const REJECTED = 'REJECTED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyPromise {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(excutor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = PENDING;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.value = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.reason = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.resolveCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.rejectedCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const resolve = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = FULFILLED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.value = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const reject = (reason) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = REJECTED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.reason = reason;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      excutor(resolve, resolve)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      reject(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  then(onResolve, onReject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const promise2 = new Promise((resolve, reject) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === FULFILLED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let x = onResolve(this.value);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        resolve(x)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === REJECTED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let y = onReject(this.reason);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        resolve(y);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let x = onResolve(this.value)")]),s(`
`),n("span",{class:"line"},[n("span",null,"          resolve(x);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let y = onReject(this.reason);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          resolve(y);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return promise2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"这里要特别注意的一点是： 失败回调函数的返回结果，将作为状态成功的值resolve出去； 这时，如果成功或失败回调函数出现错误，也就是抛出了错误，这个错误是要作为状态失败的值reject出去的，我们加上出错的逻辑"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const PENDING = 'PENDING';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const FULFILLED = 'FUFILLED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const REJECTED = 'REJECTED';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyPromise {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(excutor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = PENDING;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.value = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.reason = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.resolveCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.rejectedCallbacks = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const resolve = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = FULFILLED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.value = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const reject = (reason) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.state = REJECTED;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.reason = reason;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.forEach(fn => fn());")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      excutor(resolve, resolve)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      reject(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  then(onResolve, onReject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const promise2 = new Promise((resolve, reject) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === FULFILLED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let x = onResolve(this.value);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          resolve(x)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          reject(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === REJECTED) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          let x = onReject(this.reason);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          reject(x);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          reject(e)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.state === PENDING) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.resolveCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            let x = onResolve(this.value)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            resolve(x);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            reject(e)")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.rejectedCallbacks.push(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            let y = onReject(this.reason);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            reject(y);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            reject(e)")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return promise2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const E=a(i,[["render",c]]);export{d as __pageData,E as default};
