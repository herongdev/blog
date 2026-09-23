import{_ as a,o as l,c as t,j as s,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"createStore.js","description":"围绕“createStore.js”整理的概念、示例与实践笔记。","frontmatter":{"title":"createStore.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“createStore.js”整理的概念、示例与实践笔记。","sidebarWeight":101,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/状态改变/全局状态/createStore.js.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/全局状态/createStore.js.md","filePath":"posts/React系统教程/01-核心概念与组件/全局状态/createStore.js.md"}'),c={name:"posts/React系统教程/01-核心概念与组件/全局状态/createStore.js.md"};function p(i,n,r,u,o,d){return l(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"createstore-js",tabindex:"-1"},[e("createStore.js "),s("a",{class:"header-anchor",href:"#createstore-js","aria-label":'Permalink to "createStore.js"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“createStore.js”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"let createStore = reducer => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"let state;")]),e(`
`),s("span",{class:"line"},[s("span",null,"//观察者模式")]),e(`
`),s("span",{class:"line"},[s("span",null,"let observer = {")]),e(`
`),s("span",{class:"line"},[s("span",null,"subscribers: [],")]),e(`
`),s("span",{class:"line"},[s("span",null,"addSubscriber = callback => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"if (typeof callback === 'function') {")]),e(`
`),s("span",{class:"line"},[s("span",null,"subscribers.push(callback);")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"},")]),e(`
`),s("span",{class:"line"},[s("span",null,"removeSubscriber = callback => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"subscribers.filter(item => item !== callback);")]),e(`
`),s("span",{class:"line"},[s("span",null,"},")]),e(`
`),s("span",{class:"line"},[s("span",null,"publish = what => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"subscribers.forEach(item => item(what));")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"let dispatch = action => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"state = reducer(state, action);")]),e(`
`),s("span",{class:"line"},[s("span",null,"//通知订阅者")]),e(`
`),s("span",{class:"line"},[s("span",null,"observer.publish();")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"//执行一次")]),e(`
`),s("span",{class:"line"},[s("span",null,"dispatch({});")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"let combineReducers = reducers => (state = {}, action) => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"let obj;")]),e(`
`),s("span",{class:"line"},[s("span",null,"for (let r in reducers) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"//分别执行每一个reducer,然后将相应的state结果放到以reducer为键名的对象中。")]),e(`
`),s("span",{class:"line"},[s("span",null,"obj[r] = reducers[r](state[r], action);")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"return obj;")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"//深拷贝state对象，注意JSON系列方式不拷贝function对象")]),e(`
`),s("span",{class:"line"},[s("span",null,"let getState = () => JSON.parse(JSON.stringify(state));")]),e(`
`),s("span",{class:"line"},[s("span",null,"return {")]),e(`
`),s("span",{class:"line"},[s("span",null,"getState,")]),e(`
`),s("span",{class:"line"},[s("span",null,"dispatch,")]),e(`
`),s("span",{class:"line"},[s("span",null,"observer,")]),e(`
`),s("span",{class:"line"},[s("span",null,"combineReducers,")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const g=a(c,[["render",p]]);export{h as __pageData,g as default};
