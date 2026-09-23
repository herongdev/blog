import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"set()","description":"set方法用来拦截某个属性的赋值操作； 参数：可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选。 应用举例 一、利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。","frontmatter":{"title":"set()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"set方法用来拦截某个属性的赋值操作； 参数：可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选。 应用举例 一、利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。","sidebarWeight":16,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Proxy/Proxy 实例的方法/set().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/set().md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/set().md"}'),t={name:"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/set().md"};function r(o,a,i,c,u,y){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"set",tabindex:"-1"},[s("set() "),n("a",{class:"header-anchor",href:"#set","aria-label":'Permalink to "set()"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“set()”的核心思路，并能把它用于实际开发或面试表达。 set方法用来拦截某个属性的赋值操作； 参数：可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。")]),s(`
`),n("span",{class:"line"},[n("span",null,"let validator = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    set: function (obj, prop, value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (prop === 'age') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (!Number.isInteger(value)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                throw new TypeError('The age is not an integer');")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (value > 200) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                throw new RangeError('The age seems invalid');")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 对于满足条件的 age 属性以及其他属性，直接保存")]),s(`
`),n("span",{class:"line"},[n("span",null,"        obj[prop] = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"let person = new Proxy({}, validator);")]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age = 100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age // 100")]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age = 'young' // 报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age = 300 // 报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。")])])])]),n("p",null,[n("strong",null,"应用举例"),s(" 一、利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"二、定义内部属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        invariant(key, 'get');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return target[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    set(target, key, value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        invariant(key, 'set');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        target[key] = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"function invariant(key, action) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (key[0] === '_') {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        throw new Error(`Invalid attempt to ${action} private "${key}" property`);')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const target = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"const proxy = new Proxy(target, handler);")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy._prop")]),s(`
`),n("span",{class:"line"},[n("span",null,'// Error: Invalid attempt to get private "_prop" property')]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy._prop = 'c'")]),s(`
`),n("span",{class:"line"},[n("span",null,'  // Error: Invalid attempt to set private "_prop" property')]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**第四个参数**")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是set方法第四个参数的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;  }};const proxy = new Proxy({}, handler);proxy.foo = 'bar';proxy.foo === proxy // true")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身，请看下面的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;  }};const proxy = new Proxy({}, handler);const myObj = {};Object.setPrototypeOf(myObj, proxy);")]),s(`
`),n("span",{class:"line"},[n("span",null,"myObj.foo = 'bar';myObj.foo === myObj // true")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，设置myObj.foo属性的值时，myObj并没有foo属性，因此引擎会到myObj的原型链去找foo属性。myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const obj = {};Object.defineProperty(obj, 'foo', {  value: 'bar',  writable: false,});")]),s(`
`),n("span",{class:"line"},[n("span",null,"const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = 'baz';  }};")]),s(`
`),n("span",{class:"line"},[n("span",null,`const proxy = new Proxy(obj, handler);proxy.foo = 'baz';proxy.foo // "bar"`)]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，obj.foo属性不可写，Proxy 对这个属性的set代理将不会生效。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意，严格模式下，set代理如果没有返回true，就会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"'use strict';const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;"),n("span",null,"   // 无论有没有下面这一行，都会报错    return false;  }};const proxy = new Proxy({}, handler);proxy.foo = 'bar';// TypeError: 'set' on proxy: trap returned falsish for property 'foo'")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，严格模式下，set代理返回false或者undefined，都会报错。")])])])])],-1)])])}const b=l(t,[["render",r]]);export{v as __pageData,b as default};
