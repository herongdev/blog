import{_ as l,o as e,c as t,j as n,a}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"如何查找一篇英文文章中出现频率最高的单词？","description":"围绕“如何查找一篇英文文章中出现频率最高的单词？”整理的概念、示例与实践笔记。","frontmatter":{"title":"如何查找一篇英文文章中出现频率最高的单词？","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"围绕“如何查找一篇英文文章中出现频率最高的单词？”整理的概念、示例与实践笔记。","sidebarWeight":59,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/如何查找一篇英文文章中出现频率最高的单词？.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/如何查找一篇英文文章中出现频率最高的单词？.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/如何查找一篇英文文章中出现频率最高的单词？.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/如何查找一篇英文文章中出现频率最高的单词？.md"};function p(c,s,r,o,u,d){return e(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"如何查找一篇英文文章中出现频率最高的单词",tabindex:"-1"},[a("如何查找一篇英文文章中出现频率最高的单词？ "),n("a",{class:"header-anchor",href:"#如何查找一篇英文文章中出现频率最高的单词","aria-label":'Permalink to "如何查找一篇英文文章中出现频率最高的单词？"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“如何查找一篇英文文章中出现频率最高的单词？”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function findMostWord(article) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    // 合法性判断")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (!article) return;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    // 参数处理")]),a(`
`),n("span",{class:"line"},[n("span",null,"    article = article.trim().toLowerCase();")]),a(`
`),n("span",{class:"line"},[n("span",null,"    let wordList = article.match(/[a-z]+/g),")]),a(`
`),n("span",{class:"line"},[n("span",null,"        visited = [],")]),a(`
`),n("span",{class:"line"},[n("span",null,"        maxNum = 0,")]),a(`
`),n("span",{class:"line"},[n("span",null,'        maxWord = "";')]),a(`
`),n("span",{class:"line"},[n("span",null,'    article = " " + wordList.join("  ") + " ";')]),a(`
`),n("span",{class:"line"},[n("span",null,"    // 遍历判断单词出现次数")]),a(`
`),n("span",{class:"line"},[n("span",null,"    wordList.forEach(function (item) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        if (visited.indexOf(item) < 0) {")]),a(`
`),n("span",{class:"line"},[n("span",null,'            let word = new RegExp(" " + item + " ", "g"),')]),a(`
`),n("span",{class:"line"},[n("span",null,"                num = article.match(word).length;")]),a(`
`),n("span",{class:"line"},[n("span",null,"            if (num > maxNum) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"                maxNum = num;")]),a(`
`),n("span",{class:"line"},[n("span",null,"                maxWord = item;")]),a(`
`),n("span",{class:"line"},[n("span",null,"            }")]),a(`
`),n("span",{class:"line"},[n("span",null,"        }")]),a(`
`),n("span",{class:"line"},[n("span",null,"    });")]),a(`
`),n("span",{class:"line"},[n("span",null,'    return maxWord + "  " + maxNum;')]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=l(i,[["render",p]]);export{_ as __pageData,f as default};
