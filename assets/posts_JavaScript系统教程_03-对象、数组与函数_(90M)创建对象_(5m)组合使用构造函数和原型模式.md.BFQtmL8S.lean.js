import{_ as e,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"组合使用构造函数和原型模式","description":"思路：实例差异化的同名不同值的属性，通过给构造函数传参，在构造函数中指定；实例公共的属性和方法放在构造函数的原型对象定义。 这种方式目前在 ECMAScript 中使用最广泛，认同度最高，是默认模式。如下：。","frontmatter":{"title":"组合使用构造函数和原型模式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"思路：实例差异化的同名不同值的属性，通过给构造函数传参，在构造函数中指定；实例公共的属性和方法放在构造函数的原型对象定义。 这种方式目前在 ECMAScript 中使用最广泛，认同度最高，是默认模式。如下：。","sidebarWeight":172,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/(90M)创建对象/(5m)组合使用构造函数和原型模式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(90M)创建对象/(5m)组合使用构造函数和原型模式.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(90M)创建对象/(5m)组合使用构造函数和原型模式.md"}'),o={name:"posts/JavaScript系统教程/03-对象、数组与函数/(90M)创建对象/(5m)组合使用构造函数和原型模式.md"};function p(i,a,r,c,u,d){return l(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"组合使用构造函数和原型模式",tabindex:"-1"},[s("组合使用构造函数和原型模式 "),n("a",{class:"header-anchor",href:"#组合使用构造函数和原型模式","aria-label":'Permalink to "组合使用构造函数和原型模式"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“组合使用构造函数和原型模式”的核心思路，并能把它用于实际开发或面试表达。 思路：实例差异化的同名不同值的属性，通过给构造函数传参，在构造函数中指定；实例公共的属性和方法放在构造函数的原型对象定义。")]),n("p",null,[s("这种方式目前在"),n("code",null,"ECMAScript"),s("中使用最广泛，认同度最高，是默认模式。如下：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Person(name, age, job) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.job = job;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.friends = ['Shelby', 'Court'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Person.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor: Person,")]),s(`
`),n("span",{class:"line"},[n("span",null,"sayName: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(this.name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var person1 = new Person('Nichlas', 29, 'Software Engineer');")]),s(`
`),n("span",{class:"line"},[n("span",null,"var person2 = new Person('Greg', 27, 'Doctor');")]),s(`
`),n("span",{class:"line"},[n("span",null,"person1.friends.push('Van');")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(person1.friends);//'Shelby,Count,Van'")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(person2.friends);//'Shelby,Court'")])])])])],-1)])])}const m=e(o,[["render",p]]);export{_ as __pageData,m as default};
