import{_ as e,o as a,c,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"期约取消","description":"一、设置超时时间，在设置的时间后，如果期约状态未冻结，调用resolve或reject函数进行冻结； 二、如果使用计时器来resolve一个期约，我们如果想提前结束期约，可以清除这个计时器；此时，可使用cancelToken，这个类返回一个实例，实例上有个promise，这个pr。","frontmatter":{"title":"期约取消","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"一、设置超时时间，在设置的时间后，如果期约状态未冻结，调用resolve或reject函数进行冻结； 二、如果使用计时器来resolve一个期约，我们如果想提前结束期约，可以清除这个计时器；此时，可使用cancelToken，这个类返回一个实例，实例上有个promise，这个pr。","sidebarWeight":113,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/期约取消.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/期约取消.md","filePath":"posts/JavaScript系统教程/05-异步编程/期约取消.md"}'),t={name:"posts/JavaScript系统教程/05-异步编程/期约取消.md"};function p(o,s,i,r,u,d){return a(),c("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"期约取消",tabindex:"-1"},[l("期约取消 "),n("a",{class:"header-anchor",href:"#期约取消","aria-label":'Permalink to "期约取消"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“期约取消”的核心思路，并能把它用于实际开发或面试表达。 一、设置超时时间，在设置的时间后，如果期约状态未冻结，调用resolve或reject函数进行冻结；")]),n("p",null,"二、如果使用计时器来resolve一个期约，我们如果想提前结束期约，可以清除这个计时器；此时，可使用cancelToken，这个类返回一个实例，实例上有个promise，这个promise可以执行一些期约取消后的操作；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<!DOCTYPE html>")]),l(`
`),n("span",{class:"line"},[n("span",null,'<html lang="en">')]),l(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <button id='start'>Start</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <button id='cancel'>Cancel</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    class CancelToken {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      constructor(cancelFn) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.promise = new Promise((resolve, reject) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          cancelFn(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            setTimeout(console.log, 0, 'delay cancelled');")]),l(`
`),n("span",{class:"line"},[n("span",null,"            resolve();")]),l(`
`),n("span",{class:"line"},[n("span",null,"          })")]),l(`
`),n("span",{class:"line"},[n("span",null,"        })")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const startButton = document.querySelector('#start');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const cancelButton = document.querySelector('#cancel');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    function cancellableDelayedResolve(delay) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      setTimeout(console.log, 0, 'set delay');")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return new Promise((resolve, reject) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        const id = setTimeout(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          setTimeout(console.log, 0, 'delayed resolve');")]),l(`
`),n("span",{class:"line"},[n("span",null,"          resolve();")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }, delay);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        const cancelToken = new CancelToken((cancelCallback) =>")]),l(`
`),n("span",{class:"line"},[n("span",null,"          cancelButton.addEventListener('click', cancelCallback)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        );")]),l(`
`),n("span",{class:"line"},[n("span",null,"        cancelToken.promise.then(() => clearTimeout(id));")]),l(`
`),n("span",{class:"line"},[n("span",null,"      })")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    startButton.addEventListener('click', () => cancellableDelayedResolve(1000));")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</html>")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面的cacelToken接受一个cancelFn，这个函数是在创建类实例时立即执行的，它的主要使用时在特定的事件发生时，调用它的参数cancelCallback函数；")])])])]),n("p",null,"这个函数cancelCallback中包装了resolve函数，cancelCallback的执行会调用Resolve函数，从而使用cancelToken实例上的promise状态凝固，我们便在实例promise的then方法中添加回调函数，比如清除计时器；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"三、请求发出后的取消和超时处理；")])])])])],-1)])])}const h=e(t,[["render",p]]);export{v as __pageData,h as default};
