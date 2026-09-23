import{_ as a,o as e,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"let 和 const 命令","description":"围绕“let 和 const 命令”整理的概念、示例与实践笔记。","frontmatter":{"title":"let 和 const 命令","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“let 和 const 命令”整理的概念、示例与实践笔记。","sidebarWeight":3,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/变量和常量/let 和 const 命令/let 和 const 命令.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/let 和 const 命令.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/let 和 const 命令.md"}'),i={name:"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/let 和 const 命令.md"};function p(c,s,o,r,u,d){return e(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"let-和-const-命令",tabindex:"-1"},[l("let 和 const 命令 "),n("a",{class:"header-anchor",href:"#let-和-const-命令","aria-label":'Permalink to "let 和 const 命令"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“let 和 const 命令”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一、块级作用域：let所声明的变量，只在let命令所在的代码块内有效。")]),l(`
`),n("span",{class:"line"},[n("span",null,"{  let a = 10;  var b = 1;}")]),l(`
`),n("span",{class:"line"},[n("span",null,"a // ReferenceError: a is not defined.b // 1")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for循环的计数器，就很合适使用let命令。")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < 10; i++) {  // ...}")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);// ReferenceError: i is not defined")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,"下面的代码如果使用var，最后输出的是10。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var a = [];for (var i = 0; i < 10; i++) {  a[i] = function () {    console.log(i);  };}a[6](); // 10")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var a = [];for (let i = 0; i < 10; i++) {  a[i] = function () {    console.log(i);  };}a[6](); // 6")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < 3; i++) {  let i = 'abc';  console.log(i);}// abc// abc// abc")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"二、不存在变量提升")]),l(`
`),n("span",{class:"line"},[n("span",null,"var命令会发生“变量提升”现象，let所声明的变量一定要在声明后使用，否则报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// var 的情况console.log(foo);"),n("span",null," // 输出undefinedvar foo = 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"// let 的情况console.log(bar);"),n("span",null," // 报错ReferenceErrorlet bar = 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"三、暂时性死区")]),l(`
`),n("span",{class:"line"},[n("span",null,"只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响，也就是说外部的同名变量不会影响到内部。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var tmp = 123;")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  tmp = 'abc'; // ReferenceError  let tmp;}")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,"总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  // TDZ开始  tmp = 'abc'; // ReferenceError  console.log(tmp); // ReferenceError")]),l(`
`),n("span",{class:"line"},[n("span",null,"let tmp; // TDZ结束  console.log(tmp); // undefined")]),l(`
`),n("span",{class:"line"},[n("span",null,"tmp = 123;  console.log(tmp); // 123}")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。")]),l(`
`),n("span",{class:"line"},[n("span",null,"“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。")]),l(`
`),n("span",{class:"line"},[n("span",null,"typeof x; // ReferenceErrorlet x;")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。")]),l(`
`),n("span",{class:"line"},[n("span",null,"作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,'typeof undeclared_variable // "undefined"')]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,"有些“死区”比较隐蔽，不太容易发现。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function bar(x = y, y = 2) {  return [x, y];}")]),l(`
`),n("span",{class:"line"},[n("span",null,"bar(); // 报错")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。如果y的默认值是x，就不会报错，因为此时x已经声明了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function bar(x = 2, y = x) {  return [x, y];}bar(); // [2, 2]")]),l(`
`),n("span",{class:"line"},[n("span",null,"另外，下面的代码也会报错，与var的行为不同。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 不报错var x = x;")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 报错let x = x;// ReferenceError: x is not defined")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。")]),l(`
`),n("span",{class:"line"},[n("span",null,"ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"四、不允许重复声明")]),l(`
`),n("span",{class:"line"},[n("span",null,"let不允许在相同作用域内，重复声明同一个变量。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 报错function func() {  let a = 10;  var a = 1;}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 报错function func() {  let a = 10;  let a = 1;}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"因此，不能在函数内部重新声明参数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function func(arg) {  let arg;}func() // 报错")]),l(`
`),n("span",{class:"line"},[n("span",null,"function func(arg) {  {    let arg;  }}func() // 不报错")])])])])],-1)])])}const v=a(i,[["render",p]]);export{h as __pageData,v as default};
