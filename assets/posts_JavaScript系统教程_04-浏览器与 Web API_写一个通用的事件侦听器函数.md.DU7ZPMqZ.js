import{_ as s,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"写一个通用的事件侦听器函数","description":"围绕“写一个通用的事件侦听器函数”整理的概念、示例与实践笔记。","frontmatter":{"title":"写一个通用的事件侦听器函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"围绕“写一个通用的事件侦听器函数”整理的概念、示例与实践笔记。","sidebarWeight":53,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/写一个通用的事件侦听器函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/写一个通用的事件侦听器函数.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/写一个通用的事件侦听器函数.md"}'),p={name:"posts/JavaScript系统教程/04-浏览器与 Web API/写一个通用的事件侦听器函数.md"};function i(c,l,u,r,o,d){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"写一个通用的事件侦听器函数",tabindex:"-1"},[e("写一个通用的事件侦听器函数 "),n("a",{class:"header-anchor",href:"#写一个通用的事件侦听器函数","aria-label":'Permalink to "写一个通用的事件侦听器函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“写一个通用的事件侦听器函数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const EventUtils = {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 视能力分别使用dom0||dom2||IE方式 来绑定事件")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 添加事件")]),e(`
`),n("span",{class:"line"},[n("span",null,"    addEvent: function (element, type, handler) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        if (element.addEventListener) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            element.addEventListener(type, handler, false);")]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else if (element.attachEvent) {")]),e(`
`),n("span",{class:"line"},[n("span",null,'            element.attachEvent("on" + type, handler);')]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),e(`
`),n("span",{class:"line"},[n("span",null,'            element["on" + type] = handler;')]),e(`
`),n("span",{class:"line"},[n("span",null,"        }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    },")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 移除事件")]),e(`
`),n("span",{class:"line"},[n("span",null,"    removeEvent: function (element, type, handler) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        if (element.removeEventListener) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            element.removeEventListener(type, handler, false);")]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else if (element.detachEvent) {")]),e(`
`),n("span",{class:"line"},[n("span",null,'            element.detachEvent("on" + type, handler);')]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),e(`
`),n("span",{class:"line"},[n("span",null,'            element["on" + type] = null;')]),e(`
`),n("span",{class:"line"},[n("span",null,"        }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    },")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 获取事件目标")]),e(`
`),n("span",{class:"line"},[n("span",null,"    getTarget: function (event) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        return event.target || event.srcElement;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    },")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event")]),e(`
`),n("span",{class:"line"},[n("span",null,"    getEvent: function (event) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        return event || window.event;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    },")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）")]),e(`
`),n("span",{class:"line"},[n("span",null,"    stopPropagation: function (event) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        if (event.stopPropagation) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            event.stopPropagation();")]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            event.cancelBubble = true;")]),e(`
`),n("span",{class:"line"},[n("span",null,"        }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    },")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 取消事件的默认行为")]),e(`
`),n("span",{class:"line"},[n("span",null,"    preventDefault: function (event) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        if (event.preventDefault) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            event.preventDefault();")]),e(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),e(`
`),n("span",{class:"line"},[n("span",null,"            event.returnValue = false;")]),e(`
`),n("span",{class:"line"},[n("span",null,"        }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=s(p,[["render",i]]);export{m as __pageData,f as default};
