import{_ as l,o as s,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"重next 方法的参数","description":"注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。","frontmatter":{"title":"重next 方法的参数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。","sidebarWeight":20,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator函数/重next 方法的参数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/重next 方法的参数.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/重next 方法的参数.md"}'),p={name:"posts/JavaScript系统教程/05-异步编程/Generator函数/重next 方法的参数.md"};function i(r,a,o,c,u,d){return s(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"重next-方法的参数",tabindex:"-1"},[e("重next 方法的参数 "),n("a",{class:"header-anchor",href:"#重next-方法的参数","aria-label":'Permalink to "重next 方法的参数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“重next 方法的参数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"yield表达式本身没有返回值，或者说总是返回undefined。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* f() {  for(var i = 0; true; i++) {    var reset = yield i;    if(reset) { i = -1; }  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var g = f();")]),e(`
`),n("span",{class:"line"},[n("span",null,"g.next() // { value: 0, done: false }g.next() // { value: 1, done: false }g.next(true) // { value: 0, done: false }")]),e(`
`),n("span",{class:"line"},[n("span",null,"当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。如：")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* foo(x) {  var y = 2 * (yield (x + 1));  var z = yield (y / 3);  return (x + y + z);}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var a = foo(5);a.next() // Object{value:6, done:false}a.next() // Object{value:NaN, done:false}a.next() // Object{value:NaN, done:true}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var b = foo(5);b.next() // { value:6, done:false }b.next(12) // { value:8, done:false }b.next(13) // { value:42, done:true }")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。")]),e(`
`),n("span",{class:"line"},[n("span",null,"如果向next方法提供参数，上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。")])])])]),n("p",null,"注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"V8 引擎直接忽略第一次使用next方法时的参数，从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* dataConsumer() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Started');")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`1. ${yield}`);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`2. ${yield}`);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return 'result';")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"let genObj = dataConsumer();")]),e(`
`),n("span",{class:"line"},[n("span",null,"genObj.next();")]),e(`
`),n("span",{class:"line"},[n("span",null,"// Started")]),e(`
`),n("span",{class:"line"},[n("span",null,"genObj.next('a')")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 1. a")]),e(`
`),n("span",{class:"line"},[n("span",null,"genObj.next('b')")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 2. b")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码是一个很直观的例子，每次通过next方法向 Generator 函数输入值，然后打印出来。")]),e(`
`),n("span",{class:"line"},[n("span",null,"如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function wrapper(generatorFunction) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return function (...args) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        let generatorObject = generatorFunction(...args);")]),e(`
`),n("span",{class:"line"},[n("span",null,"        generatorObject.next();")]),e(`
`),n("span",{class:"line"},[n("span",null,"        return generatorObject;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    };")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"const wrapped = wrapper(function* () {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`First input: ${yield}`);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return 'DONE';")]),e(`
`),n("span",{class:"line"},[n("span",null,"});")]),e(`
`),n("span",{class:"line"},[n("span",null,"wrapped().next('hello!')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // First input: hello!")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。")])])])])],-1)])])}const v=l(p,[["render",i]]);export{g as __pageData,v as default};
