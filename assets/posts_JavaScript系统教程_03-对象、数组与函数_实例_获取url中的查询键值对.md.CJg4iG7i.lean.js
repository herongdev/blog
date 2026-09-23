import{_ as l,o as s,c as t,j as a,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"获取url中的查询键值对","description":"围绕“获取url中的查询键值对”整理的概念、示例与实践笔记。","frontmatter":{"title":"获取url中的查询键值对","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“获取url中的查询键值对”整理的概念、示例与实践笔记。","sidebarWeight":116,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-正则/实例/获取url中的查询键值对.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/实例/获取url中的查询键值对.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/实例/获取url中的查询键值对.md"}'),r={name:"posts/JavaScript系统教程/03-对象、数组与函数/实例/获取url中的查询键值对.md"};function p(c,n,i,o,u,d){return s(),t("div",null,[...n[0]||(n[0]=[a("div",null,[a("h1",{id:"获取url中的查询键值对",tabindex:"-1"},[e("获取url中的查询键值对 "),a("a",{class:"header-anchor",href:"#获取url中的查询键值对","aria-label":'Permalink to "获取url中的查询键值对"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“获取url中的查询键值对”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"getUrlParam(key, search = window.location.search) {")]),e(`
`),a("span",{class:"line"},[a("span",null,"  if (!key) {")]),e(`
`),a("span",{class:"line"},[a("span",null,"    let params = {};")]),e(`
`),a("span",{class:"line"},[a("span",null,"    search.replace(/([^=?&]*)=([^&]*)/g, (_, key, value) => {")]),e(`
`),a("span",{class:"line"},[a("span",null,"      params[decodeURIComponent(key)] = decodeURIComponent(value);")]),e(`
`),a("span",{class:"line"},[a("span",null,"      return params;")]),e(`
`),a("span",{class:"line"},[a("span",null,"    });")]),e(`
`),a("span",{class:"line"},[a("span",null,"    return params;")]),e(`
`),a("span",{class:"line"},[a("span",null,"  }")]),e(`
`),a("span",{class:"line"},[a("span",null,'  let pattern = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");')]),e(`
`),a("span",{class:"line"},[a("span",null,"  let match = search.substr(1).match(pattern);")]),e(`
`),a("span",{class:"line"},[a("span",null,"  return match !== null ? decodeURIComponent(match[2]) : null;")]),e(`
`),a("span",{class:"line"},[a("span",null,"},")])])])])],-1)])])}const _=l(r,[["render",p]]);export{h as __pageData,_ as default};
