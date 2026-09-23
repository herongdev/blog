import{_ as l,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"期约进度通知","description":"执行中的期约可以有会有不少离散的”阶段“，在最终解决之前必须依次经过。在某些情况下，监控期约的执行进度会很有用。 总体来看，这还是一个比较粗糙的实现，但应该可以演示出如何使用通知报告进度了。","frontmatter":{"title":"期约进度通知","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"执行中的期约可以有会有不少离散的”阶段“，在最终解决之前必须依次经过。在某些情况下，监控期约的执行进度会很有用。 总体来看，这还是一个比较粗糙的实现，但应该可以演示出如何使用通知报告进度了。","sidebarWeight":114,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/期约进度通知.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/期约进度通知.md","filePath":"posts/JavaScript系统教程/05-异步编程/期约进度通知.md"}'),t={name:"posts/JavaScript系统教程/05-异步编程/期约进度通知.md"};function p(c,a,o,r,u,d){return e(),i("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"期约进度通知",tabindex:"-1"},[s("期约进度通知 "),n("a",{class:"header-anchor",href:"#期约进度通知","aria-label":'Permalink to "期约进度通知"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“期约进度通知”的核心思路，并能把它用于实际开发或面试表达。 执行中的期约可以有会有不少离散的”阶段“，在最终解决之前必须依次经过。在某些情况下，监控期约的执行进度会很有用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ECMAScript6期约并不支持进度追踪，但可以通过扩展来实现；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一种实现方式是扩展Promise类，为它添加notify()方法，如下所示：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class TrackablePromise extends Promise {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(executor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const notifyHandlers = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super((resolve, reject) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return executor(resolve, reject, (status) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        notifyHandlers.map((handler) => handler(status));")]),s(`
`),n("span",{class:"line"},[n("span",null,"      });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.notifyHandlers = notifyHandlers;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  notify(notifyHandler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.notifyHandlers.push(notifyHandler);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这样，TrackablePromise就可以在执行函数中使用notify()函数了。可以像下面这样使用这个函数来实例化一个期约：")]),s(`
`),n("span",{class:"line"},[n("span",null,"let p = new TrackablePromise((resolve, reject, notify) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function countdown(x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (x > 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      notify(`${20 * x}% remaining`);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setTimeout(() => countdown(x - 1), 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      resolve();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  countdown(5);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个期约会连续5次递归地设置1000毫秒的超时。每个超时回调都会调用nofify()并传入状态值。假设通知处理程序 简单地这样写：")]),s(`
`),n("span",{class:"line"},[n("span",null,"p.notify((x) => setTimeout(console.log, 0, 'progress:', x));")]),s(`
`),n("span",{class:"line"},[n("span",null,"p.then(() => setTimeout(console.log, 0, 'completed'));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// (after 1s) 80% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 2s) 60% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 3s) 40% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 4s) 20% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 5s) completed")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nofity()函数会返回期约，所以可以链式调用，连续添加处理程序。多个处理程序会针对每条消息分别执行一遍，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"p.notify((x) => setTimeout(console.log, 0, 'a:', x))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  .notify((x) => setTimeout(console.log, 0, 'b:', x));")]),s(`
`),n("span",{class:"line"},[n("span",null,"p.then(() => setTimeout(console.log, 0, 'completed'));")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 1s) a: 80% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 1s) b: 80% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 2s) a: 60% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 2s) b: 60% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 3s) a: 40% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 3s) b: 40% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 4s) a: 20% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 4s) b: 20% remaining")]),s(`
`),n("span",{class:"line"},[n("span",null,"// (after 5s) completed")])])])]),n("p",null,"总体来看，这还是一个比较粗糙的实现，但应该可以演示出如何使用通知报告进度了；")],-1)])])}const m=l(t,[["render",p]]);export{h as __pageData,m as default};
