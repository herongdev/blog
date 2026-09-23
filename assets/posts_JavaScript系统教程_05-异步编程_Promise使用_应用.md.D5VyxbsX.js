import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"应用","description":"\\\\ 来自。","frontmatter":{"title":"应用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"\\\\ 来自。","sidebarWeight":43,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Promise使用/应用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Promise使用/应用.md","filePath":"posts/JavaScript系统教程/05-异步编程/Promise使用/应用.md"}'),o={name:"posts/JavaScript系统教程/05-异步编程/Promise使用/应用.md"};function i(p,e,c,r,u,h){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"应用",tabindex:"-1"},[s("应用 "),n("a",{class:"header-anchor",href:"#应用","aria-label":'Permalink to "应用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“应用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**加载图片**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const preloadImage = function (path) {  return new Promise(function (resolve, reject) {    const image = new Image();    image.onload  = resolve;    image.onerror = reject;    image.src = path;  });};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Generator 函数与 Promise 的结合")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getFoo() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return new Promise(function (resolve, reject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        resolve('foo');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const g = function* () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const foo = yield getFoo();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log(foo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"function run(generator) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const it = generator();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function go(result) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (result.done) return result.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return result.value.then(function (value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return go(it.next(value));")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }, function (error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return go(it.throw(error));")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    go(it.next());")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"run(g);")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Promise.try()**")]),s(`
`),n("span",{class:"line"},[n("span",null,"实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Promise.resolve().then(f)")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const f = () => console.log('now');Promise.resolve().then(f);console.log('next');// next// now")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用async函数来写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const f = () => console.log('now');(async () => f())();console.log('next');// now// next")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的async函数，因此如果f是同步的，就会得到同步的结果；如果f是异步的，就可以用then指定下一步，就像下面的写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"(async () => f())().then(...)")]),s(`
`),n("span",{class:"line"},[n("span",null,"需要注意的是，async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"(async () => f())().then(...).catch(...)")]),s(`
`),n("span",{class:"line"},[n("span",null,"第二种写法是使用new Promise()。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const f = () => console.log('now');(  () => new Promise(    resolve => resolve(f())  ))();console.log('next');// now// next")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码也是使用立即执行的匿名函数，执行new Promise()。这种情况下，同步函数也是同步执行的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"鉴于这是一个很常见的需求，所以现在有一个[提案](https://github.com/ljharb/proposal-promise-try)，提供Promise.try方法替代上面的写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const f = () => console.log('now');Promise.try(f);console.log('next');// now// next")]),s(`
`),n("span",{class:"line"},[n("span",null,"事实上，Promise.try存在已久，Promise 库[Bluebird](http://bluebirdjs.com/docs/api/promise.try.html)、[Q](https://github.com/kriskowal/q/wiki/API-Reference#promisefcallargs)和[when](https://github.com/cujojs/when/blob/master/docs/api.md#whentry)，早就提供了这个方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于Promise.try为所有操作提供了统一的处理机制，所以如果想用then方法管理流程，最好都用Promise.try包装一下。这样有[许多好处](http://cryto.net/~joepie91/blog/2016/05/11/what-is-promise-try-and-why-does-it-matter/)，其中一点就是可以更好地管理异常。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getUsername(userId) {  return database.users.get({id: userId})  .then(function(user) {    return user.name;  });}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，database.users.get()返回一个 Promise 对象，如果抛出异步错误，可以用catch方法捕获，就像下面这样写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"database.users.get({id: userId}).then(...).catch(...)")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是database.users.get()可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用try...catch去捕获。")]),s(`
`),n("span",{class:"line"},[n("span",null,"try {  database.users.get({id: userId})  .then(...)  .catch(...)} catch (e) {  // ...}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Promise.try(() => database.users.get({id: userId}))  .then(...)  .catch(...)")]),s(`
`),n("span",{class:"line"},[n("span",null,"事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://es6.ruanyifeng.com/#docs/promise>")])])])])],-1)])])}const g=l(o,[["render",i]]);export{m as __pageData,g as default};
