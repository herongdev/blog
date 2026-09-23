import{_ as s,o as a,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"Reflect.get()","description":"围绕“Reflect.get()”整理的概念、示例与实践笔记。","frontmatter":{"title":"Reflect.get()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"围绕“Reflect.get()”整理的概念、示例与实践笔记。","sidebarWeight":25,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Reflect/静态方法/Reflect.get().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.get().md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.get().md"}'),c={name:"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.get().md"};function p(i,l,r,o,u,f){return a(),t("div",null,[...l[0]||(l[0]=[e("div",null,[e("h1",{id:"reflect-get",tabindex:"-1"},[n("Reflect.get() "),e("a",{class:"header-anchor",href:"#reflect-get","aria-label":'Permalink to "Reflect.get()"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Reflect.get()”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"**Reflect.get(target, name, receiver)**")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 1,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    bar: 2,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    get baz() {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return this.foo + this.bar;")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(myObject, 'foo') // 1")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(myObject, 'bar') // 2")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(myObject, 'baz') // 3")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 1,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    bar: 2,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    get baz() {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return this.foo + this.bar;")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myReceiverObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 4,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    bar: 4,")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(myObject, 'baz', myReceiverObject) // 8")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果第一个参数不是对象，Reflect.get方法会报错。")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(1, 'foo') // 报错")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.get(false, 'foo') // 报错")])])])])],-1)])])}const b=s(c,[["render",p]]);export{d as __pageData,b as default};
