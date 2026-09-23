import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"模块模式","description":"前面的模式是用于为自定义类型创建私有变量和特权方法的。而道格拉斯所说的模块模式(module pattern)则是为单例创建私有变量和特权方法。 简言之，如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。以这种模式。","frontmatter":{"title":"模块模式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"前面的模式是用于为自定义类型创建私有变量和特权方法的。而道格拉斯所说的模块模式(module pattern)则是为单例创建私有变量和特权方法。 简言之，如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。以这种模式。","sidebarWeight":8,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/(15m)模块模式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模块模式.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模块模式.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模块模式.md"};function t(c,l,o,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"模块模式",tabindex:"-1"},[s("模块模式 "),n("a",{class:"header-anchor",href:"#模块模式","aria-label":'Permalink to "模块模式"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“模块模式”的核心思路，并能把它用于实际开发或面试表达。 前面的模式是用于为自定义类型创建私有变量和特权方法的。而道格拉斯所说的模块模式(module pattern)则是为单例创建私有变量和特权方法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"所谓单例(singleton)，指的就是只有一个实例的对象。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"按照惯例，JavaScript是以对象字面量的方式来创建单例对象的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var singleton = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    name: value,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    method: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 这里是方法的代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"模块模式通过为单例添加私有变量和特权方法能够使其得到增强，其语法形式如下:")]),s(`
`),n("span",{class:"line"},[n("span",null,"var singleton = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和私有函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var privateVariable = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function privateFunction() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 特权/仅有方法和属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        publicProperty: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        publicMethod: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            privateVariable++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return privateFunction();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个模块模式使用了一个返回对象的匿名函数。在这个匿名函数内部，首先定义了私有变量和函数。然后，将一个对象字面量作为函数的值返回。返回的对象字面量中只包含可以公开的属性和方法。由于这个对象是在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。从本质上来讲，这个对象字面量定义的是单例的公共接口。这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的，例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var application = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var components = new Array();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 初始化")]),s(`
`),n("span",{class:"line"},[n("span",null,"    components.push(new BaseComponent());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 公共")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getComponentCount: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return components.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        registerComponent: function (component) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            if (typeof component == "object") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"                components.push(component);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}();")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Web应用程序中，经常需要使用一个单例来管理应用程序级的信息。这个简单的例子创建了一个用于管理组件的application对象。在创建这个对象的过程中，首先声明了一个私有的components数组，并向数组中添加了一个BaseComponent的新实例(在这里不需要关心BaseComponent的代码，我们只是用它来展示初始化，而返回对象的getComponentCount()和registerComponent()方法，都是有权访何数组components的特权方法。前者只是返回已注册的组件数目，后者用于注册新组件。")])])])]),n("p",null,"简言之，如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。以这种模式创建的每个单例都是Object的实例，因为最终要通过对象字面最来表示它。事实上，这也没有什么；毕竟，单例通常都是作为全局对象存在的，我们不会将它传递给一个函数。因此，也就没有什么必要使用instanceof操作符来检査其对象类型了。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**增****强的模块模式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"有人进一步改进了模块模式，即在返回对象之前加入对其増强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和(或)方法对其加以增强的情况。来看下面的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var singleton = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和私有函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var privateVariable = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function privateFunction() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var object = new CustomType();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 添加特权/仅有属性和方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"    object.publicProperty = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    object.publicMethod = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        privateVariable++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return privateFunction();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 返回这个对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return object;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}();")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果前面演示模块模式的例子中的application对象必须是BaseComponent的实例，那么就可以使用以下代码。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var application = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var components = new Array();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 初始化")]),s(`
`),n("span",{class:"line"},[n("span",null,"    components.push(new BaseComponent());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 创建application的一个局部副本")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var app = new BaseComponent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 公共接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"    app.getComponentCount = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return components.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    app.registerComponent = function (component) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        if (typeof component == "object") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"            components.push(component);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return app;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}();")]),s(`
`),n("span",{class:"line"},[n("span",null,"在这个重写后的应用程序（application）单例中，首先也是像前面例子中一样定义了私有变量。主要的不同之处在于命名变最app的创建过程，因为它必须是Basecompoent的实例。这个实例实际上是application对象的局部变量版。此后，我们又为app对象添加了能够访何私有变量的公有方法。最后一步是返回app对象，结果仍然是将它赋值给全局变量application。")])])])])],-1)])])}const h=a(i,[["render",t]]);export{v as __pageData,h as default};
