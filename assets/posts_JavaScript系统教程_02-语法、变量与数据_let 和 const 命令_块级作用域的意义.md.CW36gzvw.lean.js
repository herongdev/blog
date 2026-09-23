import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"块级作用域的意义","description":"围绕“块级作用域的意义”整理的概念、示例与实践笔记。","frontmatter":{"title":"块级作用域的意义","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“块级作用域的意义”整理的概念、示例与实践笔记。","sidebarWeight":5,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/变量和常量/let 和 const 命令/块级作用域的意义.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/块级作用域的意义.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/块级作用域的意义.md"}'),i={name:"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/块级作用域的意义.md"};function p(c,l,o,u,r,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"块级作用域的意义",tabindex:"-1"},[s("块级作用域的意义 "),n("a",{class:"header-anchor",href:"#块级作用域的意义","aria-label":'Permalink to "块级作用域的意义"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“块级作用域的意义”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**背景：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、内层变量可能会覆盖外层变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var tmp = new Date();")]),s(`
`),n("span",{class:"line"},[n("span",null,"function f() {  console.log(tmp);  if (false) {    var tmp = 'hello world';  }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"f(); // undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"二、用来计数的循环变量泄露为全局变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var s = 'hello';")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (var i = 0; i < s.length; i++) {  console.log(s[i]);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i); // 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**ES6** **的块级作用域**")]),s(`
`),n("span",{class:"line"},[n("span",null,"let实际上为 JavaScript 新增了块级作用域。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function f1() {  let n = 5;  if (true) {    let n = 10;  }  console.log(n); // 5}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的函数有两个代码块，都声明了变量n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES6 允许块级作用域的任意嵌套。")]),s(`
`),n("span",{class:"line"},[n("span",null,"{{{{  {let insane = 'Hello World'}  console.log(insane); // 报错}}}};")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"内层作用域可以定义外层作用域的同名变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"{{{{  let insane = 'Hello World';  {let insane = 'Hello World'}}}}};")]),s(`
`),n("span",{class:"line"},[n("span",null,"块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// IIFE 写法(function () {  var tmp = ...;  ...}());")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 块级作用域写法{  let tmp = ...;  ...}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**注意：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第一种写法，报错if (true) let x = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第二种写法，不报错if (true) {  let x = 1;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，第一种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 不报错'use strict';if (true) {  function f() {}}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 报错'use strict';if (true)  function f() {}")])])])])],-1)])])}const f=a(i,[["render",p]]);export{v as __pageData,f as default};
