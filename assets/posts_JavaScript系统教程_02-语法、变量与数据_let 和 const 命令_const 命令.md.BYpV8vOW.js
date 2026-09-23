import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"const 命令","description":"围绕“const 命令”整理的概念、示例与实践笔记。","frontmatter":{"title":"const 命令","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“const 命令”整理的概念、示例与实践笔记。","sidebarWeight":1,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/变量和常量/let 和 const 命令/const 命令.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/const 命令.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/const 命令.md"}'),o={name:"posts/JavaScript系统教程/02-语法、变量与数据/let 和 const 命令/const 命令.md"};function c(p,a,i,r,u,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"const-命令",tabindex:"-1"},[s("const 命令 "),n("a",{class:"header-anchor",href:"#const-命令","aria-label":'Permalink to "const 命令"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“const 命令”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const声明一个只读的常量。一旦声明，常量的值就不能改变。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const PI = 3.1415;PI // 3.1415")]),s(`
`),n("span",{class:"line"},[n("span",null,"PI = 3;// TypeError: Assignment to constant variable.")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码表明改变常量的值会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const foo;// SyntaxError: Missing initializer in const declaration")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码表示，对于const来说，只声明不赋值，就会报错。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const的作用域与let命令相同：只在声明所在的块级作用域内有效。")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  const MAX = 5;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"MAX // Uncaught ReferenceError: MAX is not defined")]),s(`
`),n("span",{class:"line"},[n("span",null,"const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  console.log(MAX); // ReferenceError  const MAX = 5;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码在常量MAX声明之前就调用，结果报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const声明的常量，也与let一样不可重复声明。")]),s(`
`),n("span",{class:"line"},[n("span",null,'var message = "Hello!";let age = 25;')]),s(`
`),n("span",{class:"line"},[n("span",null,'// 以下两行都会报错const message = "Goodbye!";const age = 30;')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"本质")]),s(`
`),n("span",{class:"line"},[n("span",null,"const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const foo = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 为 foo 添加一个属性，可以成功foo.prop = 123;foo.prop"),n("span",null," // 123")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 将 foo 指向另一个对象，就会报错foo = {};"),n("span",null,' // TypeError: "foo" is read-only')]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是另一个例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const a = [];a.push('Hello'); // 可执行a.length = 0;   // 可执行a = ['Dave'];   // 报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果真的想将对象冻结，应该使用Object.freeze方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const foo = Object.freeze({});")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 常规模式时，下面一行不起作用；// 严格模式时，该行会报错foo.prop = 123;")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var constantize = (obj) => {  Object.freeze(obj);  Object.keys(obj).forEach( (key, i) => {    if ( typeof obj[key] === 'object' ) {      constantize( obj[key] );    }  });};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**ES6** **声明变量的六种方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。")])])])])],-1)])])}const g=l(o,[["render",c]]);export{h as __pageData,g as default};
