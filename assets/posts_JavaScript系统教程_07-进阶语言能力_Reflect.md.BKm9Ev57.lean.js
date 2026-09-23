import{_ as s,o as a,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Reflect","description":"Reflect对象的设计目的有这样几个。 一、将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就。","frontmatter":{"title":"Reflect","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"Reflect对象的设计目的有这样几个。 一、将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就。","sidebarWeight":20,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Reflect/Reflect.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/Reflect.md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/Reflect.md"}'),c={name:"posts/JavaScript系统教程/07-进阶语言能力/Reflect.md"};function p(i,l,r,o,u,f){return a(),t("div",null,[...l[0]||(l[0]=[e("div",null,[e("h1",{id:"reflect",tabindex:"-1"},[n("Reflect "),e("a",{class:"header-anchor",href:"#reflect","aria-label":'Permalink to "Reflect"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Reflect”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。")])])])]),e("p",null,"Reflect对象的设计目的有这样几个。 一、将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"二、修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 老写法")]),n(`
`),e("span",{class:"line"},[e("span",null,"try {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    Object.defineProperty(target, property, attributes);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // success")]),n(`
`),e("span",{class:"line"},[e("span",null,"} catch (e) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // failure")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 新写法")]),n(`
`),e("span",{class:"line"},[e("span",null,"if (Reflect.defineProperty(target, property, attributes)) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // success")]),n(`
`),e("span",{class:"line"},[e("span",null,"} else {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // failure")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("p",null,"三、让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。 // 老写法 'assign' in Object // true // 新写法 Reflect.has(Object, 'assign') // true"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"四、Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。")]),n(`
`),e("span",{class:"line"},[e("span",null,"Proxy(target, {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    set: function (target, name, value, receiver) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        var success = Reflect.set(target, name, value, receiver);")]),n(`
`),e("span",{class:"line"},[e("span",null,"        if (success) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"            console.log('property ' + name + ' on ' + target + ' set to ' + value);")]),n(`
`),e("span",{class:"line"},[e("span",null,"        }")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return success;")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"});")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。")]),n(`
`),e("span",{class:"line"},[e("span",null,"下面是另一个例子。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var loggedObj = new Proxy(obj, {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    get(target, name) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('get', target, name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return Reflect.get(target, name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"    deleteProperty(target, name) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('delete' + name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return Reflect.deleteProperty(target, name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    },")]),n(`
`),e("span",{class:"line"},[e("span",null,"    has(target, name) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"        console.log('has' + name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"        return Reflect.has(target, name);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"});")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，每一个Proxy对象的拦截操作（get、delete、has），内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。")]),n(`
`),e("span",{class:"line"},[e("span",null,"有了Reflect对象以后，很多操作会更易读。")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 老写法")]),n(`
`),e("span",{class:"line"},[e("span",null,"Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 新写法")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.apply(Math.floor, undefined, [1.75]) // 1")])])])])],-1)])])}const b=s(c,[["render",p]]);export{g as __pageData,b as default};
