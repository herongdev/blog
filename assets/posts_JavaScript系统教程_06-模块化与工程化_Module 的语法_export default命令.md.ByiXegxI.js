import{_ as n,o as e,c as p,j as l,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"export default命令","description":"背景 使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令， 只能默。","frontmatter":{"title":"export default命令","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"背景 使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令， 只能默。","sidebarWeight":21,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/export default命令.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/export default命令.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/export default命令.md"}'),t={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/export default命令.md"};function i(o,a,u,c,d,r){return e(),p("div",null,[...a[0]||(a[0]=[l("div",null,[l("h1",{id:"export-default命令",tabindex:"-1"},[s("export default命令 "),l("a",{class:"header-anchor",href:"#export-default命令","aria-label":'Permalink to "export default命令"'},"​")]),l("blockquote",null,[l("p",null,[s("本节目标：理解“export default命令”的核心思路，并能把它用于实际开发或面试表达。 "),l("strong",null,"背景"),s(" 使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，")])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**export default** **默认导出**")]),s(`
`),l("span",{class:"line"},[l("span",null,"为模块指定默认输出。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// export-default.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default function () {")]),s(`
`),l("span",{class:"line"},[l("span",null,"  console.log('foo');")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"上面代码是一个模块文件export-default.js，它的默认输出是一个函数。")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default命令用在非匿名函数前，也是可以的。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// export-default.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default function foo() {")]),s(`
`),l("span",{class:"line"},[l("span",null,"  console.log('foo');")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 或者写成")]),s(`
`),l("span",{class:"line"},[l("span",null,"function foo() {")]),s(`
`),l("span",{class:"line"},[l("span",null,"  console.log('foo');")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default foo;")]),s(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**默认****import****时的命名**")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"export default 导出的接口，用import命令导入时，可以指定任意名字。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import命令后面，不使用大括号。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"// import-default.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"import customName from './export-default';")]),s(`
`),l("span",{class:"line"},[l("span",null,"customName(); // 'foo'")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"下面比较一下默认输出和正常输出。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 第一组")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default function crc32() { // 输出")]),s(`
`),l("span",{class:"line"},[l("span",null,"  // ...")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")]),s(`
`),l("span",{class:"line"},[l("span",null,"import crc32 from 'crc32'; // 输入")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 第二组")]),s(`
`),l("span",{class:"line"},[l("span",null,"export function crc32() { // 输出")]),s(`
`),l("span",{class:"line"},[l("span",null,"  // ...")]),s(`
`),l("span",{class:"line"},[l("span",null,"};")]),s(`
`),l("span",{class:"line"},[l("span",null,"import { crc32 } from 'crc32'; // 输入")])])])]),l("p",null,[l("strong",null,"只能默认导出一个变量"),s(" 一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**ex****port default** **原理**")]),s(`
`),l("span",{class:"line"},[l("span",null,"本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// modules.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"function add(x, y) {")]),s(`
`),l("span",{class:"line"},[l("span",null,"  return x * y;")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")]),s(`
`),l("span",{class:"line"},[l("span",null,"export { add as default };")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 等同于")]),s(`
`),l("span",{class:"line"},[l("span",null,"// export default add;")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"// app.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"import { default as foo } from 'modules';")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 等同于")]),s(`
`),l("span",{class:"line"},[l("span",null,"// import foo from 'modules';")]),s(`
`),l("span",{class:"line"},[l("span",null,"正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 正确")]),s(`
`),l("span",{class:"line"},[l("span",null,"export var a = 1;")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 正确")]),s(`
`),l("span",{class:"line"},[l("span",null,"var a = 1;")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default a;")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 错误")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default var a = 1;")]),s(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"同样地，因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 正确")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default 42;")]),s(`
`),l("span",{class:"line"},[l("span",null,"// 报错")]),s(`
`),l("span",{class:"line"},[l("span",null,"export 42;")]),s(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"export default也可以用来输出类。")]),s(`
`),l("span",{class:"line"},[l("span",null,"// MyClass.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"export default class { ... }")]),s(`
`),l("span",{class:"line"},[l("span",null,"// main.js")]),s(`
`),l("span",{class:"line"},[l("span",null,"import MyClass from 'MyClass';")]),s(`
`),l("span",{class:"line"},[l("span",null,"let o = new MyClass();")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**具体应用**")]),s(`
`),l("span",{class:"line"},[l("span",null,"有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。")]),s(`
`),l("span",{class:"line"},[l("span",null,"import _ from 'lodash';")])])])])],-1)])])}const g=n(t,[["render",i]]);export{f as __pageData,g as default};
