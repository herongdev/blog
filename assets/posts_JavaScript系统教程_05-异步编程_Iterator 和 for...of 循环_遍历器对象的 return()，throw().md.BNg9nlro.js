import{_ as t,o as a,c as s,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"遍历器对象的 return()，throw()","description":"遍历器对象除了具有next方法，还可以具有可选的return方法和throw方法。","frontmatter":{"title":"遍历器对象的 return()，throw()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"遍历器对象除了具有next方法，还可以具有可选的return方法和throw方法。","sidebarWeight":27,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/遍历器对象的 return()，throw().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Iterator 和 for...of 循环/遍历器对象的 return()，throw().md","filePath":"posts/JavaScript系统教程/05-异步编程/Iterator 和 for...of 循环/遍历器对象的 return()，throw().md"}'),l={name:"posts/JavaScript系统教程/05-异步编程/Iterator 和 for...of 循环/遍历器对象的 return()，throw().md"};function o(i,r,p,u,c,d){return a(),s("div",null,[...r[0]||(r[0]=[n("div",null,[n("h1",{id:"遍历器对象的-return-throw",tabindex:"-1"},[e("遍历器对象的 return()，throw() "),n("a",{class:"header-anchor",href:"#遍历器对象的-return-throw","aria-label":'Permalink to "遍历器对象的 return()，throw()"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“遍历器对象的 return()，throw()”的核心思路，并能把它用于实际开发或面试表达。 遍历器对象除了具有next方法，还可以具有可选的return方法和throw方法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function readLinesSync(file) {  return {    [Symbol.iterator]() {      return {        next() {          return { done: false };        },        return() {          file.close();          return { done: true };        }      };    },  };}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next方法，还部署了return方法。下面的两种情况，都会触发执行return方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 情况一")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let line of readLinesSync(fileName)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(line);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    break;")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 情况二")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let line of readLinesSync(fileName)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(line);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    throw new Error();")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，情况一输出文件的第一行以后，就会执行return方法，关闭这个文件；情况二会在执行return方法关闭文件之后，再抛出错误。")]),e(`
`),n("span",{class:"line"},[n("span",null,"注意，return方法必须返回一个对象，这是 Generator 规格决定的。")]),e(`
`),n("span",{class:"line"},[n("span",null,"throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator 函数》一章。")])])])])],-1)])])}const _=t(l,[["render",o]]);export{h as __pageData,_ as default};
