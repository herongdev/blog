import{_ as l,o as a,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Reflect.set","description":"围绕“Reflect.set”整理的概念、示例与实践笔记。","frontmatter":{"title":"Reflect.set","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"围绕“Reflect.set”整理的概念、示例与实践笔记。","sidebarWeight":32,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Reflect/静态方法/Reflect.set.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.set.md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.set.md"}'),p={name:"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.set.md"};function c(i,s,r,o,u,f){return a(),t("div",null,[...s[0]||(s[0]=[e("div",null,[e("h1",{id:"reflect-set",tabindex:"-1"},[n("Reflect.set "),e("a",{class:"header-anchor",href:"#reflect-set","aria-label":'Permalink to "Reflect.set"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Reflect.set”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"**Reflect.set(target, name, value, receiver)**")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set方法设置target对象的name属性等于value。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 1,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set bar(value) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return this.foo = value;")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")]),n(`
`),e("span",{class:"line"},[e("span",null,"myObject.foo // 1")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set(myObject, 'foo', 2);")]),n(`
`),e("span",{class:"line"},[e("span",null,"myObject.foo // 2")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set(myObject, 'bar', 3)")]),n(`
`),e("span",{class:"line"},[e("span",null,"myObject.foo // 3")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"**this****绑定**")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果name属性设置了赋值函数，则赋值函数的this绑定receiver。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 4,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set bar(value) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return this.foo = value;")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myReceiverObject = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    foo: 0,")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set(myObject, 'bar', 1, myReceiverObject);")]),n(`
`),e("span",{class:"line"},[e("span",null,"myObject.foo // 4")]),n(`
`),e("span",{class:"line"},[e("span",null,"myReceiverObject.foo // 1")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。")]),n(`
`),e("span",{class:"line"},[e("span",null,"let p = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    a: 'a'")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"let handler = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, receiver) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('set');")]),n(`
`),e("span",{class:"line"},[e("span",null,"        Reflect.set(target, key, value, receiver)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"    defineProperty(target, key, attribute) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('defineProperty');")]),n(`
`),e("span",{class:"line"},[e("span",null,"        Reflect.defineProperty(target, key, attribute);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"let obj = new Proxy(p, handler);")]),n(`
`),e("span",{class:"line"},[e("span",null,"obj.a = 'A';")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // set")]),n(`
`),e("span",{class:"line"},[e("span",null,"  // defineProperty")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。")]),n(`
`),e("span",{class:"line"},[e("span",null,"let p = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    a: 'a'")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"let handler = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, receiver) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('set');")]),n(`
`),e("span",{class:"line"},[e("span",null,"        Reflect.set(target, key, value)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"    defineProperty(target, key, attribute) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('defineProperty');")]),n(`
`),e("span",{class:"line"},[e("span",null,"        Reflect.defineProperty(target, key, attribute);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")]),n(`
`),e("span",{class:"line"},[e("span",null,"let obj = new Proxy(p, handler);")]),n(`
`),e("span",{class:"line"},[e("span",null,"obj.a = 'A';")]),n(`
`),e("span",{class:"line"},[e("span",null,"// set")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果第一个参数不是对象，Reflect.set会报错。")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set(1, 'foo', {}) // 报错")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.set(false, 'foo', {}) // 报错")])])])])],-1)])])}const y=l(p,[["render",c]]);export{v as __pageData,y as default};
