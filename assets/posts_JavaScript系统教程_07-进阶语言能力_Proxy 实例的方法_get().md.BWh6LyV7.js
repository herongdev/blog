import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const y=JSON.parse('{"title":"get()","description":"围绕“get()”整理的概念、示例与实践笔记。","frontmatter":{"title":"get()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"围绕“get()”整理的概念、示例与实践笔记。","sidebarWeight":9,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Proxy/Proxy 实例的方法/get().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/get().md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/get().md"}'),t={name:"posts/JavaScript系统教程/07-进阶语言能力/Proxy 实例的方法/get().md"};function i(r,s,c,o,u,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"get",tabindex:"-1"},[l("get() "),n("a",{class:"header-anchor",href:"#get","aria-label":'Permalink to "get()"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“get()”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"作用：用于拦截某个属性的读取操作")]),l(`
`),n("span",{class:"line"},[n("span",null,"参数：可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var person = {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    name: "张三"')]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var proxy = new Proxy(person, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    get: function (target, propKey) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (propKey in target) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return target[propKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,'            throw new ReferenceError("Prop name \\"" + propKey + "\\" does not exist.");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,'proxy.name // "张三"')]),l(`
`),n("span",{class:"line"},[n("span",null,"proxy.age // 抛出一个错误")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"get方法可以继承。")]),l(`
`),n("span",{class:"line"},[n("span",null,"let proto = new Proxy({}, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    get(target, propertyKey, receiver) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        console.log('GET ' + propertyKey);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return target[propertyKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"let obj = Object.create(proto);")]),l(`
`),n("span",{class:"line"},[n("span",null,'obj.foo // "GET foo"')]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**应用举例**")]),l(`
`),n("span",{class:"line"},[n("span",null,"下面的例子使用get拦截，实现数组读取负数的索引。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function createArray(...elements) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let handler = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        get(target, propKey, receiver) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            let index = Number(propKey);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (index < 0) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                propKey = String(target.length + index);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return Reflect.get(target, propKey, receiver);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let target = [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    target.push(...elements);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return new Proxy(target, handler);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"let arr = createArray('a', 'b', 'c');")]),l(`
`),n("span",{class:"line"},[n("span",null,"arr[-1] // c")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，数组的位置参数是-1，就会输出数组的倒数第一个成员。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var pipe = function (value) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var funcStack = [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var oproxy = new Proxy({}, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        get: function (pipeObject, fnName) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (fnName === 'get') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                return funcStack.reduce(function (val, fn) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    return fn(val);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                }, value);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            funcStack.push(window[fnName]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return oproxy;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return oproxy;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var double = n => n * 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var pow = n => n * n;")]),l(`
`),n("span",{class:"line"},[n("span",null,'var reverseInt = n => n.toString().split("").reverse().join("") | 0;')]),l(`
`),n("span",{class:"line"},[n("span",null,"pipe(3).double.pow.reverseInt.get; // 63")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。")]),l(`
`),n("span",{class:"line"},[n("span",null,"const dom = new Proxy({}, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    get(target, property) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return function (attrs = {}, ...children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            const el = document.createElement(property);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            for (let prop of Object.keys(attrs)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                el.setAttribute(prop, attrs[prop]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            for (let child of children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                if (typeof child === 'string') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    child = document.createTextNode(child);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"                el.appendChild(child);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return el;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"const el = dom.div({},")]),l(`
`),n("span",{class:"line"},[n("span",null,"    'Hello, my name is ',")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom.a({ href: '//example.com' }, 'Mark'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"    '. I like:',")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dom.ul({},")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.li({}, 'The web'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.li({}, 'Food'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom.li({}, '…actually that\\'s it')")]),l(`
`),n("span",{class:"line"},[n("span",null,"    )")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"document.body.appendChild(el);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。")]),l(`
`),n("span",{class:"line"},[n("span",null,"const proxy = new Proxy({}, {  get: function(target, key, receiver) {    return receiver;  }});proxy.getReceiver === proxy // true")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，proxy对象的getReceiver属性是由proxy对象提供的，所以receiver指向proxy对象。")]),l(`
`),n("span",{class:"line"},[n("span",null,"const proxy = new Proxy({}, {  get: function(target, key, receiver) {    return receiver;  }});")]),l(`
`),n("span",{class:"line"},[n("span",null,"const d = Object.create(proxy);d.a === d // true")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。这时，receiver就指向d，代表原始的读操作所在的那个对象。")]),l(`
`),n("span",{class:"line"},[n("span",null,"如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。")]),l(`
`),n("span",{class:"line"},[n("span",null,"const target = Object.defineProperties({}, {  foo: {    value: 123,    writable: false,    configurable: false  },});")]),l(`
`),n("span",{class:"line"},[n("span",null,"const handler = {  get(target, propKey) {    return 'abc';  }};")]),l(`
`),n("span",{class:"line"},[n("span",null,"const proxy = new Proxy(target, handler);")]),l(`
`),n("span",{class:"line"},[n("span",null,"proxy.foo// TypeError: Invariant check failed")])])])])],-1)])])}const h=a(t,[["render",i]]);export{y as __pageData,h as default};
