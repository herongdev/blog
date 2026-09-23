import{_ as s,o as a,c,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"手写generator核心原理及源码简析","description":"阮一峰在《 es6 标准入门》一书中，对 async 和 await 的讲解中有这样一句话： async 和 await 其实是 generator 的语法糖，所以想真正理解 async 和 await ，深入学习一下 generator 是有必要的，本篇文章会对 generat。","frontmatter":{"title":"手写generator核心原理及源码简析","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"阮一峰在《 es6 标准入门》一书中，对 async 和 await 的讲解中有这样一句话： async 和 await 其实是 generator 的语法糖，所以想真正理解 async 和 await ，深入学习一下 generator 是有必要的，本篇文章会对 generat。","sidebarWeight":112,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/手写generator核心原理及源码简析.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/手写generator核心原理及源码简析.md","filePath":"posts/JavaScript系统教程/05-异步编程/手写generator核心原理及源码简析.md"}'),t={name:"posts/JavaScript系统教程/05-异步编程/手写generator核心原理及源码简析.md"};function u(o,e,p,i,d,r){return a(),c("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"手写generator核心原理及源码简析",tabindex:"-1"},[l("手写generator核心原理及源码简析 "),n("a",{class:"header-anchor",href:"#手写generator核心原理及源码简析","aria-label":'Permalink to "手写generator核心原理及源码简析"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“手写generator核心原理及源码简析”的核心思路，并能把它用于实际开发或面试表达。 阮一峰在《"),n("code",null,"es6"),l("标准入门》一书中，对"),n("code",null,"async"),l("和"),n("code",null,"await"),l("的讲解中有这样一句话："),n("code",null,"async"),l("和"),n("code",null,"await"),l("其实是"),n("code",null,"generator"),l("的语法糖，所以想真正理解"),n("code",null,"async"),l("和"),n("code",null,"await"),l("，深入学习一下"),n("code",null,"generator"),l("是有必要的，本篇文章会对"),n("code",null,"generator"),l("的核心流程手写重现，并分析一下相关源码，了解实现流程。 "),n("code",null,"generator"),l("简介")])]),n("p",null,[l("我们日常开发中，其实对于"),n("code",null,"generator"),l("的应用应该是比较少的，所以先简单介绍一下"),n("code",null,"generator"),l("。 什么是"),n("code",null,"generator")]),n("p",null,[n("code",null,"generator"),l("翻译过来就是发生器、生成器的意思，而实际上"),n("code",null,"generator"),l("就是一个比较特殊的函数。 与普通函数写法上的区别")]),n("p",null,[l("先看一下一个最简单的"),n("code",null,"generator"),l("代码")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function* gen() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result1'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result2'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result3'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return 'ending'")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("从代码中可以看出，与普通函数的写法上的区别主要有两点，一点为"),n("code",null,"function"),l("关键字后有一个星号，另一点为内部使用"),n("code",null,"yield"),l("关键字来声明了一系列的状态")]),n("p",null,"与普通函数使用上的区别 依然先看例子"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function* gen() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result1'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result2'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result3'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return 'ending'")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var demo = gen() //")])])])]),n("p",null,"返回值为迭代器对象"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:'result1',done:false}")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:'result2',done:false}")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:'result3',done:false}")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:'ending',done:true}")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:undefind,done:true}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var demo2 = gen() //")])])])]),n("p",null,"一个全新的对象"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"console.log(demo.next()) // {value:'result1',done:false}")])])])]),n("p",null,[l("从代码中看出，调用定义的"),n("code",null,"generator"),l("，获取到的实际上是一个对象，而且是互相独立的对象，到这可以理解为什么会起这样一个名字，因为每一个"),n("code",null,"generator"),l("（生成器）调用的时候，都可以理解为生成了一个迭代器对象，这个对象中用"),n("code",null,"next"),l("方法，当我们调用"),n("code",null,"next"),l("方法时，代码会分段执行，每次执行到遇到"),n("code",null,"yield"),l("为止，返回值为一个包含"),n("code",null,"value"),l("和"),n("code",null,"done"),l("的对象，"),n("code",null,"value"),l("为我们"),n("code",null,"yield"),l("声明的状态。当全部"),n("code",null,"yield"),l("执行完后，"),n("code",null,"done"),l("会变成"),n("code",null,"true"),l("，如果我们遇到了"),n("code",null,"return"),l("语句，会把返回值作为最终的"),n("code",null,"value"),l("，如果没有就直接返回"),n("code",null,"undefined"),l("。")]),n("p",null,[l("以上就是"),n("code",null,"generator"),l("的主逻辑，通俗的讲，其实就是一个思想，将函数的执行权交给了使用者，分段执行。")]),n("p",null,[l("这一点其实和"),n("code",null,"async"),l("和"),n("code",null,"await"),l("是有一定的相似之处的，"),n("code",null,"async"),l("和"),n("code",null,"await"),l("是把"),n("code",null,"await"),l("后面的代码暂时挂起，等待"),n("code",null,"await"),l("的代码块执行完毕，再执行后面，所以说"),n("code",null,"async"),l("和"),n("code",null,"await"),l("是"),n("code",null,"generator"),l("的语法糖是说得通的。")]),n("p",null,[l("手写"),n("code",null,"generator")]),n("p",null,"接下来，我们从一个最简单的例子开始实现代码的手写。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function* gen() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result1'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result2'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'result3'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return 'ending'")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("首先我们整理一下思路，我们每次调用，都会执行到下一个"),n("code",null,"yield"),l("，并返回我们设定的状态，如果用最基本的逻辑，我们可以选择用一个变量来确认我们执行到了哪一步，然后返回不同的返回值，如果不考虑其他，单纯识别执行步骤和返回结果，这里用"),n("code",null,"switch case"),l("来实现是最简单的。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function gen$(nextStep) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  switch (nextStep) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 0:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result1';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 1:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result2';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 2:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result3';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 3:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'ending'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("我们按最基本的思路，实现了一个简单的识别执行步骤，再进行返回的逻辑。这个函数可以是我们手写"),n("code",null,"generator"),l("的一部分，"),n("code",null,"nextStep"),l("在调用的时候传入，那么这个"),n("code",null,"nextStep"),l("就有了一些说法，我们是让这个变量变成闭包变量，还是变成全局变量，就需要进行选择。")]),n("p",null,[l("我们在这里可以简单思考一下，回想一下之前写的"),n("code",null,"demo"),l("，在"),n("code",null,"yield"),l("语句是否全部执行完，返回的"),n("code",null,"done"),l("状态是不一样的，而"),n("code",null,"done"),l("是根据执行的步骤产生的变化，所以大概率跟"),n("code",null,"nextStep"),l("是同级的变量，如果较多变量变成闭包变量，这肯定是不太合适的，所以这里我们选择用全局变量的方式。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var context = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  prev: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  next: 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"function gen$(context) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  switch (context.prev = context.next) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 0:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result1';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 1:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result2';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 2:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 3;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result3';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 3:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'ending';")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("目前为止，我们只需要上一步、下一步两个变量，但是后续功能逐渐完善之后，我们还可能会继续添加其他的方法、属性等，所以在这里声明一个上下文对象"),n("code",null,"context"),l("，作为后续全局变量、方法的容器。我们用上一步、下一步值更替替代了原本的逻辑。")]),n("p",null,[l("我们回过头再看最开始的"),n("code",null,"generator"),l("例子，我们还有很多不一致的，首先，第一次调用"),n("code",null,"gen"),l("函数的时候，返回值应该是一个对象，这个对象包含一个"),n("code",null,"next"),l("方法。调用这个"),n("code",null,"next"),l("方法，返回值是一个对象，对象包含我们对每一步定义的结果"),n("code",null,"value"),l("，以及当前运行状态"),n("code",null,"done"),l("。我们按照这个思路来升级代码")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var context = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  prev: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  next: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  done: false,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  stop: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.done = true")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function gen$(context) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  switch (context.prev = context.next) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 0:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result1';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 1:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result2';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 2:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.next = 3;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'result3';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    case 3:")]),l(`
`),n("span",{class:"line"},[n("span",null,"      context.stop();")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return 'ending';")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function foo() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    next: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      var value = gen$(context);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      var done = context.done")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        value,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        done")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("对代码进行如下升级后，我们基本上已经达成了"),n("code",null,"generator"),l("最核心的逻辑，调用"),n("code",null,"foo"),l("返回一个对象，对象包含"),n("code",null,"next"),l("方法，调用"),n("code",null,"next"),l("方法返回了我们设定的结果值和执行状态，但是还有另外一个较为核心的问题没有解决，就是现在只有一个"),n("code",null,"context"),l("上下文对象，如果我们用"),n("code",null,"foo"),l("函数生成了多个对象，这些对象其实是共用了这一个"),n("code",null,"context"),l("，我们要做的最后一件事，就是要确保"),n("code",null,"foo"),l("返回的不同对象里跟随独立的"),n("code",null,"context"),l("，这里我们参考开发模式之一的单例模式来处理。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class Context {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.prev = 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.next = 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.done = false")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  stop() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.done = true")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function foo() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var context = new Context")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    next: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      var value = gen$(context);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      var done = context.done")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        value,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        done")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("我们把"),n("code",null,"context"),l("变成一个类，每一次调用"),n("code",null,"foo"),l("都实例化一个"),n("code",null,"context"),l("来跟随对象，至此我们算是手写了"),n("code",null,"generator"),l("最核心部分的原理。 "),n("code",null,"generator"),l("源码简析 "),n("code",null,"babel"),l("编译")]),n("p",null,[l("我们虽然手写并实现了"),n("code",null,"generator"),l("的核心原理，但是我们还需要确认我们的思路究竟是否正确，所以研究一下源码是有必要的，下面我们来看一下"),n("code",null,"babel"),l("对一个最简单"),n("code",null,"generator"),l("的编译结果 "),n("code",null,"//"),l(" 示例")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function* helloWorldGenerator() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'hello';")]),l(`
`),n("span",{class:"line"},[n("span",null,"  yield 'world';")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return 'ending';")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var hw = helloWorldGenerator();")]),l(`
`),n("span",{class:"line"},[n("span",null,'console.log(hw.next()); // {value: "hello", done: false}')]),l(`
`),n("span",{class:"line"},[n("span",null,'console.log(hw.next()); // {value: "world", done: false}')]),l(`
`),n("span",{class:"line"},[n("span",null,'console.log(hw.next()); // {value: "ending", done: true}')]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(hw.next()); // {value: undefined, done: true}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"编译结果"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator)")]),l(`
`),n("span",{class:"line"},[n("span",null,"function helloWorldGenerator() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return regeneratorRuntime.wrap(")]),l(`
`),n("span",{class:"line"},[n("span",null,"    function helloWorldGenerator$(_context) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      while (1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        switch ((_context.prev = _context.next)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          case 0:")]),l(`
`),n("span",{class:"line"},[n("span",null,"            _context.next = 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,'            return "hello";')]),l(`
`),n("span",{class:"line"},[n("span",null,"          case 2:")]),l(`
`),n("span",{class:"line"},[n("span",null,"            _context.next = 4;")]),l(`
`),n("span",{class:"line"},[n("span",null,'            return "world";')]),l(`
`),n("span",{class:"line"},[n("span",null,"          case 4:")]),l(`
`),n("span",{class:"line"},[n("span",null,'            return _context.abrupt("return", "ending");')]),l(`
`),n("span",{class:"line"},[n("span",null,"          case 5:")]),l(`
`),n("span",{class:"line"},[n("span",null,'          case "end":')]),l(`
`),n("span",{class:"line"},[n("span",null,"            return _context.stop();")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    _marked);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("以上就是"),n("code",null,"generator"),l("的编译结果，乍一看代码并不多，看内部的逻辑也是用"),n("code",null,"switch case"),l("实现的，大体和我们的思路相同，但是细看会发现，有几个东西不认识，"),n("code",null,"regeneratorRuntime"),l("是个什么鬼，"),n("code",null,"mark"),l("和"),n("code",null,"wrap"),l("又是个啥？想要弄懂原理，我们有必要搞清楚这些东西都是什么。")]),n("p",null,[l("先说一下"),n("code",null,"regenerator"),l("，这个是"),n("code",null,"facebook"),l("旗下的一个工具，用来编译"),n("code",null,"es6"),l("的"),n("code",null,"generator"),l("，如果想看到完整的"),n("code",null,"generator"),l("代码，需要去这个工具里去看源码。 "),n("code",null,"mark"),l("函数")]),n("p",null,[l("我们先查看完整的"),n("code",null,"mark"),l("函数源码")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime.mark = function (genFun) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  genFun.__proto__ = GeneratorFunctionPrototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  genFun.prototype = Object.create(Gp);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return genFun;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("p",null,[l("这部分代码比较少，虽然又牵扯到了我们两个不知道的东西，"),n("code",null,"GeneratorFunctionPrototype"),l("和"),n("code",null,"Gp"),l("，但是其实也无关紧要，从这部分代码中我们可以看出，"),n("code",null,"mark"),l("函数其实就是对我们传入的"),n("code",null,"genFun"),l("绑定了一系列的原型，继承了一些属性方法（想查看具体继承了什么可以查阅上面提到的"),n("code",null,"regenerator"),l("）。 "),n("code",null,"wrap"),l("函数")]),n("p",null,[l("接下来我们再看看"),n("code",null,"wrap"),l("函数究竟做了什么")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function wrap(innerFn, outerFn, self) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var generator = Object.create(outerFn.prototype);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var context = new Context([]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  generator._invoke = makeInvokeMethod(innerFn, self, context);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return generator;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("从这段代码中可以看出，"),n("code",null,"wrap"),l("做的东西比较简单，创建了一个"),n("code",null,"generator"),l("，"),n("code",null,"new"),l("了一个"),n("code",null,"context"),l("对象，再给"),n("code",null,"generator"),l("绑定了一个"),n("code",null,"invoke"),l("方法，该方法是"),n("code",null,"makeInvokeMethod"),l("，接收了三个参数，"),n("code",null,"innerFn"),l("，"),n("code",null,"self"),l("以及"),n("code",null,"context"),l("，最后再把"),n("code",null,"generator"),l("返回。")]),n("p",null,[l("到这里我们先联系一下最开始我们用"),n("code",null,"babel"),l("编译的结果，"),n("code",null,"helloWorldGenerator"),l("被分成了两部分，一部分是外层的"),n("code",null,"helloWorldGenerator"),l("函数，另一部分是用"),n("code",null,"wrap"),l("包裹的"),n("code",null,"helloWorldGenerator$"),l("函数，而"),n("code",null,"wrap"),l("函数接受的是内层函数，所以在"),n("code",null,"wrap"),l("定义中，第一个参数是"),n("code",null,"innerFn"),l("，也就是内层函数的意思。")]),n("p",null,[l("但是这部分代码里，我们还有一些东西不知道，"),n("code",null,"Context"),l("类和"),n("code",null,"makeInvokeMethod"),l("函数还需要继续阅读源码，我们先看"),n("code",null,"context"),l("。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ContinueSentinel = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var context = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  done: false,")]),l(`
`),n("span",{class:"line"},[n("span",null,'  method: "next",')]),l(`
`),n("span",{class:"line"},[n("span",null,"  next: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  prev: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  abrupt: function (type, arg) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var record = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"    record.type = type;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    record.arg = arg;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return this.complete(record);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  complete: function (record, afterLoc) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    if (record.type === "return") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"      this.rval = this.arg = record.arg;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      this.method = "return";')]),l(`
`),n("span",{class:"line"},[n("span",null,'      this.next = "end";')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return ContinueSentinel;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  stop: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.done = true;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return this.rval;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("p",null,[l("以上就是"),n("code",null,"generator"),l("中，对于"),n("code",null,"context"),l("的定义，这部分可以联系我们之前手写那部分中的"),n("code",null,"context"),l("，功能大体相同，存储了上下步"),n("code",null,"next"),l("和"),n("code",null,"prev"),l("，是否完成的"),n("code",null,"done"),l("，还有一些方法。只是单纯看这部分代码，还是不是很好理解，我们接下来联系"),n("code",null,"makeInvokeMethod"),l("方法的源码来一起理解。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ContinueSentinel = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"function makeInvokeMethod(innerFn, self, context) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,"状态设置为"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"start")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var state = 'start';")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return function invoke(method, arg) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"已完成"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (state === 'completed') {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return { value: undefined, done: true };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    context.method = method;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    context.arg = arg;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"执行中"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    while (true) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      state = 'executing';")]),l(`
`),n("span",{class:"line"},[n("span",null,"      var record = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        type: 'normal',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        arg: innerFn.call(self, context) //")])])])]),n("p",null,[l("执行下一步，并获取状态（其实就是"),n("code",null,"switch"),l("里"),n("code",null,"return"),l("的值）")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      };")]),l(`
`),n("span",{class:"line"},[n("span",null,'      if (record.type === "normal") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"判断是否已经执行完成"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        state = context.done")]),l(`
`),n("span",{class:"line"},[n("span",null,"          ? 'completed'")]),l(`
`),n("span",{class:"line"},[n("span",null,"          : 'yield';")]),l(`
`),n("span",{class:"line"},[n("span",null,"        //  ContinueSentinel")])])])]),n("p",null,[l("其实是一个空对象，"),n("code",null,"record.arg === {}"),l("则跳过"),n("code",null,"return"),l("进入下一个循环，那什么什么"),n("code",null,"record.arg"),l("会为空对象呢，答案是没有后续"),n("code",null,"yield"),l("语句或已经"),n("code",null,"return"),l(" 的时候，也就是"),n("code",null,"switch"),l("反悔了空值的情况")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (record.arg === ContinueSentinel) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          continue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          value: record.arg,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          done: context.done")]),l(`
`),n("span",{class:"line"},[n("span",null,"        };")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("我们把这两部分代码连着解读，当函数一开始执行的时候，我们把状态设置为"),n("code",null,"start"),l("，该状态被内部返回的"),n("code",null,"invoke"),l("方法占用，所以不会被销毁，"),n("code",null,"invoke"),l("内部先判定"),n("code",null,"state"),l("是否是"),n("code",null,"completed"),l("状态，如果是直接返回最终状态，如果不是我们把"),n("code",null,"invoke"),l("方法传入"),n("code",null,"method"),l("和"),n("code",null,"arg"),l("赋值给上下文对象"),n("code",null,"context"),l("。状态不为结束时，会进入下面的循环，在这里状态被改成了"),n("code",null,"executing"),l("，在循环中最终的结果就是返回了"),n("code",null,"value"),l("和"),n("code",null,"done"),l("，只是在循环中，增加了运行状态的一些判定。")]),n("p",null,[l("现在整片源码，我们剩下的只有循环中的数据处理，以及联系"),n("code",null,"context"),l("上下文方法解读这两个部分没有分析完毕，我们再继续看这两个部分。")]),n("p",null,[l("先看循环内部，循环的一开始，我们声明了"),n("code",null,"record"),l("对象，定义了"),n("code",null,"type"),l("为"),n("code",null,"normal"),l("，"),n("code",null,"arg"),l("为"),n("code",null,"innerFn"),l("的返回值，也就是"),n("code",null,"switch case"),l("那部分函数的返回值，而"),n("code",null,"innerFn"),l("的返回值就是我们设定的每一步的结果。")]),n("p",null,[l("再联系"),n("code",null,"helloWorldGenerator$"),l("，也就是"),n("code",null,"innerFn"),l("的内部逻辑，只有在倒数第二步的时候才通过调用"),n("code",null,"context"),l("中的"),n("code",null,"abrupt"),l("修改了"),n("code",null,"record"),l("的"),n("code",null,"type"),l("，把"),n("code",null,"type"),l("修改为了"),n("code",null,"return"),l("，"),n("code",null,"abrupt"),l("又调用了"),n("code",null,"complete"),l("方法，"),n("code",null,"complete"),l("方法把"),n("code",null,"record"),l("里面的"),n("code",null,"arg"),l("，也就是我们设定的状态赋值给了"),n("code",null,"context"),l("内部的"),n("code",null,"rval"),l("和自己的"),n("code",null,"arg"),l("，然后返回了"),n("code",null,"ContinueSentinel"),l("这个空对象。这里我们连起来看，就是在没有执行到倒数第二步的时候，循环内声明的"),n("code",null,"record"),l("的"),n("code",null,"type"),l("一直是"),n("code",null,"normal"),l("，"),n("code",null,"arg"),l("一直是我们已经写好了的结果，到了倒数第二步的时候会有一些不同，这里我们的"),n("code",null,"type"),l("变成了"),n("code",null,"return"),l("，"),n("code",null,"arg"),l("变成了"),n("code",null,"ContinueSentinel"),l("这个空对象。然后在循环内部，"),n("code",null,"record.arg === ContinueSentinel"),l("这个判定生效，没有执行到"),n("code",null,"return"),l("，直接"),n("code",null,"continue"),l("进入下一轮的循环。")]),n("p",null,[l("而最后一轮的循环就很清晰了，调用了"),n("code",null,"stop"),l("方法，"),n("code",null,"stop"),l("把"),n("code",null,"done"),l("变成了"),n("code",null,"true"),l("，把我们在上一轮存起来的"),n("code",null,"arg"),l("返回，形成了最终的结果，在最后一轮循环中，"),n("code",null,"state"),l("因为"),n("code",null,"context.done"),l("的值发生了变化， "),n("code",null,"context.done ?"),l(" ‘"),n("code",null,"completed"),l("’ "),n("code",null,": 'yield"),l("的三元运算符也将取到"),n("code",null,"completed"),l("的值，这样保证了在最后一次执行结束后，再进行调用的时候再函数的上层就直接"),n("code",null,"return"),l("了"),n("code",null,"{ value: undefined, done: true }"),l("这个结果，而且在"),n("code",null,"complete"),l("调用时，也修改了"),n("code",null,"next"),l("为"),n("code",null,"end"),l("，同时保证了在拿到最终结果多次调用的时候也会走"),n("code",null,"invoke"),l("函数。")]),n("p",null,[l("至此为止，对源码的分析已经结束了，但是我们回过头看，这个"),n("code",null,"invoke"),l("的功能是不是觉得有几分熟悉？这不就是调用"),n("code",null,"generator"),l("后，返回的对象的"),n("code",null,"next"),l("方法吗？可是为什么变了个名字？我们再查阅源码可以看出，其实"),n("code",null,"invoke"),l("就是"),n("code",null,"next"),l("方法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// Helper for defining the .next, .throw, and .return methods of the")]),l(`
`),n("span",{class:"line"},[n("span",null,"// Iterator interface in terms of a single ._invoke method.")]),l(`
`),n("span",{class:"line"},[n("span",null,"function defineIteratorMethods(prototype) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  ["next", "throw", "return"].forEach(function (method) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"    prototype[method] = function (arg) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return this._invoke(method, arg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"defineIteratorMethods(Gp);")])])])]),n("p",null,[l("这是在"),n("code",null,"facebook"),l("的"),n("code",null,"runtime"),l("中的一段代码，为"),n("code",null,"generator"),l("生成迭代器对象绑定了"),n("code",null,"next"),l("，"),n("code",null,"throw"),l("，"),n("code",null,"return"),l("三个方法，而这三个方法的原型上都绑定了"),n("code",null,"_invoke"),l("，所以实际上我们在使用的时候，调用的"),n("code",null,"next"),l("就是"),n("code",null,"invoke"),l(" 总结")]),n("p",null,[l("我们现在回到开始，重新考虑，其实"),n("code",null,"generator"),l("的核心部分和我们手写的代码模式差不多，都分成了三部分，上下文对象，函数主体，还有逻辑处理这三个部分。")]),n("p",null,[l("其实"),n("code",null,"generator"),l("的核心就是在于上下文的保存，函数并没有真的被挂起，每一次"),n("code",null,"yield"),l("，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个"),n("code",null,"context"),l("对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样。")]),n("p",null,[l("那么再看，"),n("code",null,"async"),l("和"),n("code",null,"await"),l("其实是"),n("code",null,"generator"),l("的语法糖这一句话也就可以理解了，我们把两者互相比对不难发现，"),n("code",null,"async"),l("和"),n("code",null,"await"),l("给人的感觉也是类似挂起的感觉，把后面代码挂起，等"),n("code",null,"await"),l("的代码有了结果再向后执行，从挂起的思路来看，这两者是一致的。 ———————————————— 版权声明：本文为"),n("code",null,"CSDN"),l("博主「碍人"),n("code",null,"i"),l("」的原创文章，遵循"),n("code",null,"CC 4.0 BY-SA"),l("版权协议，转载请附上原文出处链接及本声明。 原文链接："),n("code",null,"https://blog.csdn.net/qq_46193451/article/details/110064977")])],-1)])])}const v=s(t,[["render",u]]);export{h as __pageData,v as default};
