import{_ as a,o as e,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"阮一峰：异步遍历器","description":"同步遍历器的问题 《遍历器》一章说过， Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的 next 方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。 next 方法返回的对象的结构是 {value, done} ，其中 value 表示当前的数据的值。","frontmatter":{"title":"阮一峰：异步遍历器","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"同步遍历器的问题 《遍历器》一章说过， Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的 next 方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。 next 方法返回的对象的结构是 {value, done} ，其中 value 表示当前的数据的值。","sidebarWeight":128,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/阮一峰：异步遍历器/阮一峰：异步遍历器.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/阮一峰：异步遍历器/阮一峰：异步遍历器.md","filePath":"posts/JavaScript系统教程/05-异步编程/阮一峰：异步遍历器/阮一峰：异步遍历器.md"}'),c={name:"posts/JavaScript系统教程/05-异步编程/阮一峰：异步遍历器/阮一峰：异步遍历器.md"};function p(o,s,i,u,r,d){return e(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"阮一峰-异步遍历器",tabindex:"-1"},[l("阮一峰：异步遍历器 "),n("a",{class:"header-anchor",href:"#阮一峰-异步遍历器","aria-label":'Permalink to "阮一峰：异步遍历器"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“阮一峰：异步遍历器”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"同步遍历器的问题"),l(" 《遍历器》一章说过，"),n("code",null,"Iterator"),l(" 接口是一种数据遍历的协议，只要调用遍历器对象的"),n("code",null,"next"),l("方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。"),n("code",null,"next"),l("方法返回的对象的结构是"),n("code",null,"{value, done}"),l("，其中"),n("code",null,"value"),l("表示当前的数据的值，"),n("code",null,"done"),l("是一个布尔值，表示遍历是否结束。")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function idMaker() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let index = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    next: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return { value: index++, done: false };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const it = idMaker();")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value; // 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value; // 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value; // 2")]),l(`
`),n("span",{class:"line"},[n("span",null,"// ...")])])])]),n("p",null,[l("上面代码中，变量"),n("code",null,"it"),l("是一个遍历器（"),n("code",null,"iterator"),l("）。每次调用"),n("code",null,"it.next()"),l("方法，就返回一个对象，表示当前遍历位置的信息。")]),n("p",null,[l("这里隐含着一个规定，"),n("code",null,"it.next()"),l("方法必须是同步的，只要调用就必须立刻返回值。也就是说，一旦执行"),n("code",null,"it.next()"),l("方法，就必须同步地得到"),n("code",null,"value"),l("和"),n("code",null,"done"),l("这两个属性。如果遍历指针正好指向同步操作，当然没有问题，但对于异步操作，就不太合适了。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function idMaker() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let index = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    next: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return new Promise(function (resolve, reject) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        setTimeout(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          resolve({ value: index++, done: false });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }, 1000);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"next()"),l("方法返回的是一个 "),n("code",null,"Promise"),l(" 对象，这样就不行，不符合 "),n("code",null,"Iterator"),l(" 协议，只要代码里面包含异步操作都不行。也就是说，"),n("code",null,"Iterator"),l(" 协议里面"),n("code",null,"next()"),l("方法只能包含同步操作。")]),n("p",null,[l("目前的解决方法是，将异步操作包装成 "),n("code",null,"Thunk"),l(" 函数或者 "),n("code",null,"Promise"),l(" 对象，即"),n("code",null,"next()"),l("方法返回值的"),n("code",null,"value"),l("属性是一个 "),n("code",null,"Thunk"),l(" 函数或者 "),n("code",null,"Promise"),l(" 对象，等待以后返回真正的值，而"),n("code",null,"done"),l("属性则还是同步产生的。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function idMaker() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let index = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    next: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        value: new Promise((resolve) =>")]),l(`
`),n("span",{class:"line"},[n("span",null,"          setTimeout(() => resolve(index++), 1000)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        done: false,")]),l(`
`),n("span",{class:"line"},[n("span",null,"      };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const it = idMaker();")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value.then((o) => console.log(o)); // 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value.then((o) => console.log(o)); // 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"it.next().value.then((o) => console.log(o)); // 2")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"value"),l("属性的返回值是一个 "),n("code",null,"Promise"),l(" 对象，用来放置异步操作。但是这样写很麻烦，不太符合直觉，语义也比较绕。")]),n("p",null,[n("code",null,"ES2018"),l(),n("a",{href:"https://github.com/tc39/proposal-async-iteration",target:"_blank",rel:"noreferrer"},"引入"),l("了“异步遍历器”（"),n("code",null,"Async Iterator"),l("），为异步操作提供原生的遍历器接口，即"),n("code",null,"value"),l("和"),n("code",null,"done"),l("这两个属性都是异步产生。")]),n("p",null,[n("strong",null,"异步遍历的接口"),l(" 异步遍历器的最大的语法特点，就是调用遍历器的"),n("code",null,"next"),l("方法，返回的是一个 "),n("code",null,"Promise"),l(" 对象。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"asyncIterator")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .next()")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .then(")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ({ value, done }) => /* ... */")]),l(`
`),n("span",{class:"line"},[n("span",null,"  );")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"asyncIterator"),l("是一个异步遍历器，调用"),n("code",null,"next"),l("方法以后，返回一个 "),n("code",null,"Promise"),l(" 对象。因此，可以使用"),n("code",null,"then"),l("方法指定，这个 "),n("code",null,"Promise"),l(" 对象的状态变为"),n("code",null,"resolve"),l("以后的回调函数。回调函数的参数，则是一个具有"),n("code",null,"value"),l("和"),n("code",null,"done"),l("两个属性的对象，这个跟同步遍历器是一样的。")]),n("p",null,[l("我们知道，一个对象的同步遍历器的接口，部署在"),n("code",null,"Symbol.iterator"),l("属性上面。同样地，对象的异步遍历器接口，部署在"),n("code",null,"Symbol.asyncIterator"),l("属性上面。不管是什么样的对象，只要它的"),n("code",null,"Symbol.asyncIterator"),l("属性有值，就表示应该对它进行异步遍历。")]),n("p",null,"下面是一个异步遍历器的例子。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'const asyncIterable = createAsyncIterable(["a", "b"]);')]),l(`
`),n("span",{class:"line"},[n("span",null,"const asyncIterator = asyncIterable[Symbol.asyncIterator]();")]),l(`
`),n("span",{class:"line"},[n("span",null,"asyncIterator")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .next()")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .then((iterResult1) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log(iterResult1); // { value: 'a', done: false }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return asyncIterator.next();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  })")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .then((iterResult2) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log(iterResult2); // { value: 'b', done: false }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return asyncIterator.next();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  })")]),l(`
`),n("span",{class:"line"},[n("span",null,"  .then((iterResult3) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log(iterResult3); // { value: undefined, done: true }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")])])])]),n("p",null,[l("上面代码中，异步遍历器其实返回了两次值。第一次调用的时候，返回一个 "),n("code",null,"Promise"),l(" 对象；等到 "),n("code",null,"Promise"),l(" 对象"),n("code",null,"resolve"),l("了，再返回一个表示当前数据成员信息的对象。这就是说，异步遍历器与同步遍历器最终行为是一致的，只是会先返回 "),n("code",null,"Promise"),l(" 对象，作为中介。")]),n("p",null,[l("由于异步遍历器的"),n("code",null,"next"),l("方法，返回的是一个 "),n("code",null,"Promise"),l(" 对象。因此，可以把它放在"),n("code",null,"await"),l("命令后面。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"async function f() {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  const asyncIterable = createAsyncIterable(["a", "b"]);')]),l(`
`),n("span",{class:"line"},[n("span",null,"  const asyncIterator = asyncIterable[Symbol.asyncIterator]();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  console.log(await asyncIterator.next());")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // { value: 'a', done: false }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  console.log(await asyncIterator.next());")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // { value: 'b', done: false }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  console.log(await asyncIterator.next());")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // { value: undefined, done: true }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"next"),l("方法用"),n("code",null,"await"),l("处理以后，就不必使用"),n("code",null,"then"),l("方法了。整个流程已经很接近同步处理了。 注意，异步遍历器的"),n("code",null,"next"),l("方法是可以连续调用的，不必等到上一步产生的 "),n("code",null,"Promise"),l(" 对象"),n("code",null,"resolve"),l("以后再调用。这种情况下，"),n("code",null,"next"),l("方法会累积起来，自动按照每一步的顺序运行下去。下面是一个例子，把所有的"),n("code",null,"next"),l("方法放在"),n("code",null,"Promise.all"),l("方法里面。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'const asyncIterable = createAsyncIterable(["a", "b"]);')]),l(`
`),n("span",{class:"line"},[n("span",null,"const asyncIterator = asyncIterable[Symbol.asyncIterator]();")]),l(`
`),n("span",{class:"line"},[n("span",null,"const [{ value: v1 }, { value: v2 }] = await Promise.all([")]),l(`
`),n("span",{class:"line"},[n("span",null,"  asyncIterator.next(),")]),l(`
`),n("span",{class:"line"},[n("span",null,"  asyncIterator.next(),")]),l(`
`),n("span",{class:"line"},[n("span",null,"]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(v1, v2); // a b")])])])]),n("p",null,[l("另一种用法是一次性调用所有的"),n("code",null,"next"),l("方法，然后"),n("code",null,"await"),l("最后一步操作。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"async function runner() {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  const writer = openFile("someFile.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  writer.next("hello");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  writer.next("world");')]),l(`
`),n("span",{class:"line"},[n("span",null,"  await writer.return();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"runner();")])])])]),n("p",null,[n("code",null,"for await...of"),l(" 前面介绍过，"),n("code",null,"for...of"),l("循环用于遍历同步的 "),n("code",null,"Iterator"),l(" 接口。新引入的"),n("code",null,"for await...of"),l("循环，则是用于遍历异步的 "),n("code",null,"Iterator"),l(" 接口。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"async function f() {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  for await (const x of createAsyncIterable(["a", "b"])) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log(x);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// a")]),l(`
`),n("span",{class:"line"},[n("span",null,"// b")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"createAsyncIterable()"),l("返回一个拥有异步遍历器接口的对象，"),n("code",null,"for...of"),l("循环自动调用这个对象的异步遍历器的"),n("code",null,"next"),l("方法，会得到一个 "),n("code",null,"Promise"),l(" 对象。"),n("code",null,"await"),l("用来处理这个 "),n("code",null,"Promise"),l(" 对象，一旦"),n("code",null,"resolve"),l("，就把得到的值（"),n("code",null,"x"),l("）传入"),n("code",null,"for...of"),l("的循环体。 "),n("code",null,"for await...of"),l("循环的一个用途，是部署了 "),n("code",null,"asyncIterable"),l(" 操作的异步接口，可以直接放入这个循环。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'let body = "";')]),l(`
`),n("span",{class:"line"},[n("span",null,"async function f() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for await (const data of req) body += data;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const parsed = JSON.parse(body);")]),l(`
`),n("span",{class:"line"},[n("span",null,'  console.log("got", parsed);')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("上面代码中，"),n("code",null,"req"),l("是一个 "),n("code",null,"asyncIterable"),l(" 对象，用来异步读取数据。可以看到，使用"),n("code",null,"for await...of"),l("循环以后，代码会非常简洁。")]),n("p",null,[l("如果"),n("code",null,"next"),l("方法返回的 "),n("code",null,"Promise"),l(" 对象被"),n("code",null,"reject"),l("，"),n("code",null,"for await...of"),l("就会报错，要用"),n("code",null,"try...catch"),l("捕捉。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"async function fn() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  try {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for await (const x of createRejectingIterable()) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      console.log(x);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } catch (e) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.error(e);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("注意，"),n("code",null,"for await...of"),l("循环也可以用于同步遍历器。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"(async function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  for await (const x of ["a", "b"]) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log(x);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"})();")]),l(`
`),n("span",{class:"line"},[n("span",null,"// a")]),l(`
`),n("span",{class:"line"},[n("span",null,"// b")])])])]),n("p",null,[n("code",null,"Node v10"),l(" 支持异步遍历器，"),n("code",null,"Stream"),l(" 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。 "),n("code",null,"//"),l(" 传统写法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function main(inputFilePath) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const readStream = fs.createReadStream(inputFilePath, {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    encoding: "utf8",')]),l(`
`),n("span",{class:"line"},[n("span",null,"    highWaterMark: 1024,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,'  readStream.on("data", (chunk) => {')]),l(`
`),n("span",{class:"line"},[n("span",null,'    console.log(">>> " + chunk);')]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,'  readStream.on("end", () => {')]),l(`
`),n("span",{class:"line"},[n("span",null,'    console.log("### DONE ###");')]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"异步遍历器写法"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"async function main(inputFilePath) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const readStream = fs.createReadStream(inputFilePath, {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    encoding: "utf8",')]),l(`
`),n("span",{class:"line"},[n("span",null,"    highWaterMark: 1024,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  for await (const chunk of readStream) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    console.log(">>> " + chunk);')]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,'  console.log("### DONE ###");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(c,[["render",p]]);export{v as __pageData,g as default};
