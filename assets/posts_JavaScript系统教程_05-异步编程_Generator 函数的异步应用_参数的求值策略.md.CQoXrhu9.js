import{_ as e,o as l,c as t,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"参数的求值策略","description":"围绕“参数的求值策略”整理的概念、示例与实践笔记。","frontmatter":{"title":"参数的求值策略","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"围绕“参数的求值策略”整理的概念、示例与实践笔记。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator 函数的异步应用/参数的求值策略.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator 函数的异步应用/参数的求值策略.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator 函数的异步应用/参数的求值策略.md"}'),p={name:"posts/JavaScript系统教程/05-异步编程/Generator 函数的异步应用/参数的求值策略.md"};function i(c,s,r,o,u,d){return l(),t("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"参数的求值策略",tabindex:"-1"},[n("参数的求值策略 "),a("a",{class:"header-anchor",href:"#参数的求值策略","aria-label":'Permalink to "参数的求值策略"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“参数的求值策略”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"Thunk 函数早在上个世纪 60 年代就诞生了。")]),n(`
`),a("span",{class:"line"},[a("span",null,'那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。')]),n(`
`),a("span",{class:"line"},[a("span",null,"var x = 1;")]),n(`
`),a("span",{class:"line"},[a("span",null,"function f(m) {  return m * 2;}")]),n(`
`),a("span",{class:"line"},[a("span",null,"f(x + 5)")]),n(`
`),a("span",{class:"line"},[a("span",null,"上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？")]),n(`
`),a("span",{class:"line"},[a("span",null,'一种意见是"传值调用"（call by value），即在进入函数体之前，就计算x + 5的值（等于 6），再将这个值传入函数f。C 语言就采用这种策略。')]),n(`
`),a("span",{class:"line"},[a("span",null,"f(x + 5)// 传值调用时，等同于f(6)")]),n(`
`),a("span",{class:"line"},[a("span",null,"另一种意见是“传名调用”（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。")]),n(`
`),a("span",{class:"line"},[a("span",null,"f(x + 5)// 传名调用时，等同于(x + 5) * 2")]),n(`
`),a("span",{class:"line"},[a("span",null,"传值调用和传名调用，哪一种比较好？")]),n(`
`),a("span",{class:"line"},[a("span",null,"回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。")]),n(`
`),a("span",{class:"line"},[a("span",null,"function f(a, b){  return b;}")]),n(`
`),a("span",{class:"line"},[a("span",null,"f(3 * x * x - 2 * x - 1, x);")]),n(`
`),a("span",{class:"line"},[a("span",null,'上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。对这个参数求值，实际上是不必要的。因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。')])])])])],-1)])])}const m=e(p,[["render",i]]);export{x as __pageData,m as default};
