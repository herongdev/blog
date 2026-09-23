import{_ as n,o as l,c as t,j as a,a as e}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"数据提交","description":"围绕“数据提交”整理的概念、示例与实践笔记。","frontmatter":{"title":"数据提交","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","性能与实战"],"description":"围绕“数据提交”整理的概念、示例与实践笔记。","sidebarWeight":22,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/应用/数据提交.md"},"headers":[],"relativePath":"posts/React系统教程/05-性能与实战/数据提交.md","filePath":"posts/React系统教程/05-性能与实战/数据提交.md"}'),o={name:"posts/React系统教程/05-性能与实战/数据提交.md"};function c(i,s,p,r,d,u){return l(),t("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"数据提交",tabindex:"-1"},[e("数据提交 "),a("a",{class:"header-anchor",href:"#数据提交","aria-label":'Permalink to "数据提交"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“数据提交”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,'import { debounce, isInteger } from "lodash";')]),e(`
`),a("span",{class:"line"},[a("span",null,"const onSave = debounce(")]),e(`
`),a("span",{class:"line"},[a("span",null,"    async () => {")]),e(`
`),a("span",{class:"line"},[a("span",null,"    const { code, data } = await handlerSaveFormData();")]),e(`
`),a("span",{class:"line"},[a("span",null,'    if (code === "error") {')]),e(`
`),a("span",{class:"line"},[a("span",null,"        message.warning(data?.message);")]),e(`
`),a("span",{class:"line"},[a("span",null,"    } else {")]),e(`
`),a("span",{class:"line"},[a("span",null,"        message.info(data?.message);")]),e(`
`),a("span",{class:"line"},[a("span",null,"    }")]),e(`
`),a("span",{class:"line"},[a("span",null,"    },")]),e(`
`),a("span",{class:"line"},[a("span",null,"    1000,")]),e(`
`),a("span",{class:"line"},[a("span",null,"    { maxWait: 1500 }")]),e(`
`),a("span",{class:"line"},[a("span",null,");")])])])])],-1)])])}const g=n(o,[["render",c]]);export{f as __pageData,g as default};
