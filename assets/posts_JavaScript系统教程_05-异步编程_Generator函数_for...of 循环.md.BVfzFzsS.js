import{_ as l,o as a,c as o,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const y=JSON.parse('{"title":"for...of 循环","description":"围绕“for...of 循环”整理的概念、示例与实践笔记。","frontmatter":{"title":"for...of 循环","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"围绕“for...of 循环”整理的概念、示例与实践笔记。","sidebarWeight":15,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator函数/for...of 循环.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/for...of 循环.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/for...of 循环.md"}'),r={name:"posts/JavaScript系统教程/05-异步编程/Generator函数/for...of 循环.md"};function t(p,s,i,c,f,u){return a(),o("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"for-of-循环",tabindex:"-1"},[e("for...of 循环 "),n("a",{class:"header-anchor",href:"#for-of-循环","aria-label":'Permalink to "for...of 循环"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“for...of 循环”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* foo() {  yield 1;  yield 2;  yield 3;  yield 4;  yield 5;  return 6;}")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let v of foo()) {  console.log(v);}// 1 2 3 4 5")]),e(`
`),n("span",{class:"line"},[n("span",null,"注意：一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* fibonacci() {  let [prev, curr] = [0, 1];  for (;;) {    yield curr;    [prev, curr] = [curr, prev + curr];  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let n of fibonacci()) {  if (n > 1000) break;  console.log(n);}")]),e(`
`),n("span",{class:"line"},[n("span",null,"从上面代码可见，使用for...of语句时不需要使用next方法。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* objectEntries(obj) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    let propKeys = Reflect.ownKeys(obj);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    for (let propKey of propKeys) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        yield [propKey, obj[propKey]];")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"let jane = { first: 'Jane', last: 'Doe' };")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let [key, value] of objectEntries(jane)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`${key}: ${value}`);")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"// first: Jane")]),e(`
`),n("span",{class:"line"},[n("span",null,"// last: Doe")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。这时，我们通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* objectEntries() {  let propKeys = Object.keys(this);")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let propKey of propKeys) {    yield [propKey, this[propKey]];  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"let jane = { first: 'Jane', last: 'Doe' };")]),e(`
`),n("span",{class:"line"},[n("span",null,"jane[Symbol.iterator] = objectEntries;")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let [key, value] of jane) {  console.log(`${key}: ${value}`);}// first: Jane// last: Doe")]),e(`
`),n("span",{class:"line"},[n("span",null,"除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* numbers () {  yield 1  yield 2  return 3  yield 4}")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 扩展运算符[...numbers()]"),n("span",null," // [1, 2]")]),e(`
`),n("span",{class:"line"},[n("span",null,"// Array.from 方法Array.from(numbers())"),n("span",null," // [1, 2]")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 解构赋值let [x, y] = numbers();x"),n("span",null," // 1y"),n("span",null," // 2")]),e(`
`),n("span",{class:"line"},[n("span",null,"// for...of 循环for (let n of numbers()) {  console.log(n)}// 1// 2")])])])])],-1)])])}const b=l(r,[["render",t]]);export{y as __pageData,b as default};
