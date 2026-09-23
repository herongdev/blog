import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"与其他异步处理方法的比较","description":"我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。 首先是 Promise 的写法。","frontmatter":{"title":"与其他异步处理方法的比较","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。 首先是 Promise 的写法。","sidebarWeight":54,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/async 函数/与其他异步处理方法的比较.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/async 函数/与其他异步处理方法的比较.md","filePath":"posts/JavaScript系统教程/05-异步编程/async 函数/与其他异步处理方法的比较.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/async 函数/与其他异步处理方法的比较.md"};function o(p,a,u,c,r,m){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"与其他异步处理方法的比较",tabindex:"-1"},[s("与其他异步处理方法的比较 "),n("a",{class:"header-anchor",href:"#与其他异步处理方法的比较","aria-label":'Permalink to "与其他异步处理方法的比较"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“与其他异步处理方法的比较”的核心思路，并能把它用于实际开发或面试表达。 我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。 首先是 Promise 的写法。 function chainAnimationsPromise(elem, animations) { //")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"变量`ret`用来保存上一个动画的返回值")])])])]),n("pre",null,[n("code",null,`let ret = null;
//
`)]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"新建一个空的")])])])]),n("p",null,"Promise let p = Promise.resolve(); //"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用`then`方法，添加所有动画")])])])]),n("pre",null,[n("code",null,`for (let anim of animations) \\{
    p = p.then(function (val) \\{
        ret = val;
        return anim(elem);
    \\});
\\}
//
`)]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"返回一个部署了错误捕捉机制的")])])])]),n("p",null,"Promise return p.catch(function (e) { /*"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"忽略错误，继续执行")])])])]),n("p",null,[n("em",null,"/ }).then(function () { return ret; }); } 虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（then、catch等等），操作本身的语义反而不容易看出来。 接着是 Generator 函数的写法。 function chainAnimationsGenerator(elem, animations) { return spawn(function"),s(" () { let ret = null; try { for (let anim of animations) { ret = yield anim(elem); } } catch (e) { /*")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"忽略错误，继续执行")])])])]),n("p",null,[n("em",null,"/ } return ret; }); } 上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在spawn函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就是自动执行器，它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个 Promise。 最后是 async 函数的写法。 async function chainAnimationsAsync(elem, animations) { let ret = null; try { for (let anim of animations) { ret = await anim(elem); } } catch (e) { /")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"忽略错误，继续执行")])])])]),n("p",null,"*/ } return ret; }"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," 可以看到 Async 函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将 Generator 写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用 Generator 写法，自动执行器需要用户自己提供。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**实例：按顺序完成异步操作**")]),s(`
`),n("span",{class:"line"},[n("span",null,"实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Promise 的写法如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function logInOrder(urls) { // 远程读取所有URL  const textPromises = urls.map(url => {    return fetch(url).then(response => response.text());  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 按次序输出  textPromises.reduce((chain, textPromise) => {    return chain.then(() => textPromise)      .then(text => console.log(text));  }, Promise.resolve());}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码使用fetch方法，同时远程读取一组 URL。每个fetch操作都返回一个 Promise 对象，放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，将所有 Promise 对象连起来，因此就可以依次输出结果。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这种写法不太直观，可读性比较差。下面是 async 函数实现。")]),s(`
`),n("span",{class:"line"},[n("span",null,"async function logInOrder(urls) {  for (const url of urls) {    const response = await fetch(url);    console.log(await response.text());  }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。")]),s(`
`),n("span",{class:"line"},[n("span",null,"async function logInOrder(urls) { // 并发读取远程URL  const textPromises = urls.map(async url => {    const response = await fetch(url);    return response.text();  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 按次序输出  for (const textPromise of textPromises) {    console.log(await textPromise);  }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**顶层** **await**")]),s(`
`),n("span",{class:"line"},[n("span",null,"根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 报错const data = await fetch('https://api.example.com');")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，await命令独立使用，没有放在 async 函数里面，就会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"目前，有一个[语法提案](https://github.com/tc39/proposal-top-level-await)，允许在模块的顶层独立使用await命令，使得上面那行代码不会报错了。这个提案的目的，是借用await解决模块异步加载的问题。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// awaiting.jslet output;async function main() {  const dynamic = await import(someMission);  const data = await fetch(url);  output = someProcess(dynamic.default, data);}main();export { output };")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，模块awaiting.js的输出值output，取决于异步操作。我们把异步操作包装在一个 async 函数里面，然后调用这个函数，只有等里面的异步操作都执行，变量output才会有值，否则就返回undefined。")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的代码也可以写成立即执行函数的形式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// awaiting.jslet output;(async function1 main() {  const dynamic = await import(someMission);  const data = await fetch(url);  output = someProcess(dynamic.default, data);})();export { output };")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是加载这个模块的写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,'// usage.jsimport { output } from "./awaiting.js";')]),s(`
`),n("span",{class:"line"},[n("span",null,"function outputPlusValue(value) { return output + value }")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(outputPlusValue(100));setTimeout(() => console.log(outputPlusValue(100), 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，outputPlusValue()的执行结果，完全取决于执行的时间。如果awaiting.js里面的异步操作没执行完，加载进来的output的值就是undefined。")]),s(`
`),n("span",{class:"line"},[n("span",null,"目前的解决方法，就是让原始模块输出一个 Promise 对象，从这个 Promise 对象判断异步操作有没有结束。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// awaiting.jslet output;export default (async function main() {  const dynamic = await import(someMission);  const data = await fetch(url);  output = someProcess(dynamic.default, data);})();export { output };")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，awaiting.js除了输出output，还默认输出一个 Promise 对象（async 函数立即执行后，返回一个 Promise 对象），从这个对象判断异步操作是否结束。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是加载这个模块的新的写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,'// usage.jsimport promise, { output } from "./awaiting.js";')]),s(`
`),n("span",{class:"line"},[n("span",null,"function outputPlusValue(value) { return output + value }")]),s(`
`),n("span",{class:"line"},[n("span",null,"promise.then(() => {  console.log(outputPlusValue(100));  setTimeout(() => console.log(outputPlusValue(100), 1000);});")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，将awaiting.js对象的输出，放在promise.then()里面，这样就能保证异步操作完成以后，才去读取output。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这种写法比较麻烦，等于要求模块的使用者遵守一个额外的使用协议，按照特殊的方法使用这个模块。一旦你忘了要用 Promise 加载，只使用正常的加载方法，依赖这个模块的代码就可能出错。而且，如果上面的usage.js又有对外的输出，等于这个依赖链的所有模块都要使用 Promise 加载。")]),s(`
`),n("span",{class:"line"},[n("span",null,"顶层的await命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// awaiting.jsconst dynamic = import(someMission);const data = fetch(url);export const output = someProcess((await dynamic).default, await data);")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，两个异步操作在输出的时候，都加上了await命令。只有等到异步操作完成，这个模块才会输出值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"加载这个模块的写法如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,'// usage.jsimport { output } from "./awaiting.js";function outputPlusValue(value) { return output + value }')]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(outputPlusValue(100));setTimeout(() => console.log(outputPlusValue(100), 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码的写法，与普通的模块加载完全一样。也就是说，模块的使用者完全不用关心，依赖模块的内部有没有异步操作，正常加载即可。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这时，模块的加载会等待依赖模块（上例是awaiting.js）的异步操作完成，才执行后面的代码，有点像暂停在那里。所以，它总是会得到正确的output，不会因为加载时机的不同，而得到不一样的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是顶层await的一些使用场景。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// import() 方法加载const strings = await import(`/i18n/${navigator.language}`);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 数据库操作const connection = await dbConnector();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 依赖回滚let jQuery;try {  jQuery = await import('https://cdn-a.com/jQuery');} catch {  jQuery = await import('https://cdn-b.com/jQuery');}")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意，如果加载多个包含顶层await命令的模块，加载命令是同步执行的。")]),s(`
`),n("span",{class:"line"},[n("span",null,'// x.jsconsole.log("X1");await new Promise(r => setTimeout(r, 1000));console.log("X2");')]),s(`
`),n("span",{class:"line"},[n("span",null,'// y.jsconsole.log("Y");')]),s(`
`),n("span",{class:"line"},[n("span",null,'// z.jsimport "./x.js";import "./y.js";console.log("Z");')]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码有三个模块，最后的z.js加载x.js和y.js，打印结果是X1、Y、X2、Z。这说明，z.js并没有等待x.js加载完成，再去加载y.js。")]),s(`
`),n("span",{class:"line"},[n("span",null,"顶层的await命令有点像，交出代码的执行权给其他的模块加载，等异步操作完成后，再拿回执行权，继续向下执行。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://es6.ruanyifeng.com/#docs/async>")])])])])],-1)])])}const g=l(i,[["render",o]]);export{h as __pageData,g as default};
