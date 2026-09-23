import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"自定义事件","description":"事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示在该对象生命周期中某个有趣的时刻到了。然后其他对象可以观察该对象，等待这些有趣的时刻到来并通过运行代码来响应。 观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这。","frontmatter":{"title":"自定义事件","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示在该对象生命周期中某个有趣的时刻到了。然后其他对象可以观察该对象，等待这些有趣的时刻到来并通过运行代码来响应。 观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这。","sidebarWeight":68,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/自定义事件.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/自定义事件.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/自定义事件.md"}'),t={name:"posts/JavaScript系统教程/04-浏览器与 Web API/自定义事件.md"};function i(r,a,c,u,o,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"自定义事件",tabindex:"-1"},[s("自定义事件 "),n("a",{class:"header-anchor",href:"#自定义事件","aria-label":'Permalink to "自定义事件"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“自定义事件”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"事件是JavaScript与浏览器交互的主要途径。")])])])]),n("p",null,"事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示在该对象生命周期中某个有趣的时刻到了。然后其他对象可以观察该对象，等待这些有趣的时刻到来并通过运行代码来响应。"),n("p",null,"观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。该模式的一个关键概念是主体并不知道观察者的任何事情，也就是说它可以独自存在并正常运作即使说观察者不存在。从另一方面来说，观察者知道主体并能注册事件的回调函数(事件处理程序)。涉及DoM上时，DOM元素便是主体，你的事件处理代码便是观者。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"事件是与DOM交互的最常见的方式，但它们也可以用于非DoM代码中——通过实现自定义事件。自定义事件背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。实现此功能的基本模式可以如下定义：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function EventTarget() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.handlers = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"EventTarget.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor: EventTarget,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  addHandler: function (type, handler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    if (typeof this.handlers[type] == "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handlers[type] = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handlers[type].push(handler);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  fire: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!event.target) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      event.target = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.handlers[event.type] instanceof Array) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var handlers = this.handlers[event.type];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (var i = 0, len = handlers.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        handlers[i](event);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  removeHandler: function (type, handler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this.handlers[type] instanceof Array) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var handlers = this.handlers[type];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (var i = 0, len = handlers.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (handlers[i] === handler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      handlers.splice(i, 1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("p",null,"EventTarget类型有一个单独的属性handlers，用于储存事件处理程序。还有三个方法： addHandler()，用于注册给定类型事件的事件处理程序；fire()用于触发一个事件；removeHandler()，用于注销某个事件类型的事件处理程序。 如果要发一个事件，要调用fire()函数。该方法接受一个单独的参数，是一个至少包含type 属性的对象。fire()方法先给event对象设置一个target，如果它尚未被指定的话。然后它就 査找对应该事件类型的一组处理程序，调用各个函数，并给出event对象。因为这些都是自定义事件，所以event对象上还需要的额外信息由你自己决定。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"EventTarget类型的自定义事件使用如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function handleMessage(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'  alert("Message received: " + event.message);')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建一个对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"var target = new EventTarget();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 添加一个事件处理程序")]),s(`
`),n("span",{class:"line"},[n("span",null,'target.addHandler("message", handleMessage);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 触发事件")]),s(`
`),n("span",{class:"line"},[n("span",null,'target.fire({ type: "message", message: "Hello world!" });')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 删除事件处理程序")]),s(`
`),n("span",{class:"line"},[n("span",null,'target.removeHandler("message", handleMessage);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 再次，应没有处理程序")]),s(`
`),n("span",{class:"line"},[n("span",null,'target.fire({ type: "message", message: "Hello world!" });')]),s(`
`),n("span",{class:"line"},[n("span",null,"因为这种功能是封装在一种自定义类型中的，其他对象可以继承EventTarget并获得这个行为，如下例所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Person(name, age) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  EventTarget.call(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"inheritPrototype(Person, EventTarget);")]),s(`
`),n("span",{class:"line"},[n("span",null,"Person.prototype.say = function (message) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'  this.fire({ type: "message", message: message });')]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"Person类型使用了寄生组合继承方法来继承EventTarget. 一旦调用了 say()")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法，便触发了事件，它包含了消息的细节。在某种类型的另外的方法中调用£ire()方法是很常见的，同时它通常不是公开调用的。这段代码可以照如下方式使用：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function handleMessage(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'  alert(event.target.name + " says: " + event.message);')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建新person")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = new Person("Nicholas", 29);')]),s(`
`),n("span",{class:"line"},[n("span",null,"//添加一个事件处理程序")]),s(`
`),n("span",{class:"line"},[n("span",null,'person.addHandler("message", handleMessage);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 在该对象上调用1个方法，它触发消息事件")]),s(`
`),n("span",{class:"line"},[n("span",null,'person.say("Hi there.");')])])])]),n("p",null,"当代码中存在多个部分在特定时刻相互交互的情况下，自定义事件就非常有用了。这时，如果每个对象都有对其他所有对象的引用，那么整个代码就会紧密耦合，同时维护也变得很困难，因为对某个对象的修改也会影响到其他对象。使用自定义事件有助于解耦相关对象，保持功能的隔绝。在很多情况中，触发事件的代码和监听事件的代码是完全分离的。")],-1)])])}const v=l(t,[["render",i]]);export{g as __pageData,v as default};
