import{_ as e,o as a,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"js防抖函数","description":"一些高频事件，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。 对这类事件要进行防抖动或者节流处理 高见高频事件： 鼠标的 scroll,resize,mouseomove touchMove input 的 onchange/oninput 防。","frontmatter":{"title":"js防抖函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"一些高频事件，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。 对这类事件要进行防抖动或者节流处理 高见高频事件： 鼠标的 scroll,resize,mouseomove touchMove input 的 onchange/oninput 防。","sidebarWeight":17,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/js防抖函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/js防抖函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/js防抖函数.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/手写/js防抖函数.md"};function p(c,s,u,o,r,d){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"js防抖函数",tabindex:"-1"},[l("js防抖函数 "),n("a",{class:"header-anchor",href:"#js防抖函数","aria-label":'Permalink to "js防抖函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“js防抖函数”的核心思路，并能把它用于实际开发或面试表达。 一些高频事件，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。 对这类事件要进行防抖动或者节流处理 高见高频事件：")]),n("ul",null,[n("li",null,[l("鼠标的"),n("code",null,"scroll,resize,mouseomove")]),n("li",null,[n("code",null,"touchMove")]),n("li",null,[n("code",null,"input"),l("的"),n("code",null,"onchange/oninput")])]),n("p",null,[n("strong",null,"防抖动"),l(" 它的做法是限制下次函数调用之前必须等待的时间间隔。正确实现 "),n("code",null,"debouncing"),l(" 的方法是将若干个函数调用合成一次，并在给定时间过去之后仅被调用一次。 高频事件不断触发时不调用，等高频事件停止触发后，在指定的时间后调用一次。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 函数防抖的实现")]),l(`
`),n("span",{class:"line"},[n("span",null,"function debounce(fn, wait) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let timer = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let context = this,")]),l(`
`),n("span",{class:"line"},[n("span",null,"      args = arguments;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果此时存在定时器的话，则取消之前的定时器重新记时")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (timer) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      clearTimeout(timer);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      timer = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 设置定时器，使事件间隔指定事件后执行")]),l(`
`),n("span",{class:"line"},[n("span",null,"    timer = setTimeout(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      fn.apply(context, args);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }, wait);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"注意对this的处理：")]),l(`
`),n("span",{class:"line"},[n("span",null,"debounce方法返回一个函数，如果这个函数是在特定的环境中执行，我们希望传入的fn函数也是在这个环境下执行，即同this指向；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**箭头函数绑定****this**")]),l(`
`),n("span",{class:"line"},[n("span",null,"function debounce(fn, wait) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let timer = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return function (...args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (timer) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      clearTimeout(timer);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      timer = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    timer = setTimeout(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      fn.apply(this, args);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }, wait);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"测试：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function f() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  console.log(this.name);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const fb = debounce(f, 1000);")]),l(`
`),n("span",{class:"line"},[n("span",null,"fb.call({ name: 'hr' });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 当用户滚动时被调用的函数")]),l(`
`),n("span",{class:"line"},[n("span",null,"function foo() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('You are scrolling!');")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 在 debounce 中包装我们的函数，过 2 秒触发一次")]),l(`
`),n("span",{class:"line"},[n("span",null,"let elem = document.getElementById('container');")]),l(`
`),n("span",{class:"line"},[n("span",null,"elem.addEventListener('scroll', debounce(foo, 2000));")])])])]),n("p",null,[n("a",{href:"https://www.baidu.com/s?wd=%E6%9B%B4%E8%BF%9B%E4%B8%80%E6%AD%A5&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd",target:"_blank",rel:"noreferrer"},"更进一步"),l("，我们不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 "),n("code",null,"n"),l(" 秒后，才可以重新触发执行。 这里增加一个"),n("code",null,"immediate"),l("参数来设置是否要立即执行： function debounce(func, delay, immediate) { var timer = null; return function () { var context = this; var args = arguments; if (timer) clearTimeout(timer); if (immediate) { //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数 var doNow = !timer; //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行 timer = setTimeout(function () { timer = null; }, delay); //立即执行 if (doNow) { func.apply(context, args); } } else { timer = setTimeout(function () { func.apply(context, args); }, delay); } } }")])],-1)])])}const g=e(i,[["render",p]]);export{h as __pageData,g as default};
