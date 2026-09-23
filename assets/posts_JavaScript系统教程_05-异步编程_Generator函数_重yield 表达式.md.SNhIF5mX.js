import{_ as a,o as s,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"重yield 表达式","description":"背景 ES6 提供了 yield 表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。","frontmatter":{"title":"重yield 表达式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"背景 ES6 提供了 yield 表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。","sidebarWeight":21,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator函数/重yield 表达式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/重yield 表达式.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/重yield 表达式.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/Generator函数/重yield 表达式.md"};function r(o,l,u,d,p,c){return s(),t("div",null,[...l[0]||(l[0]=[e("div",null,[e("h1",{id:"重yield-表达式",tabindex:"-1"},[n("重yield 表达式 "),e("a",{class:"header-anchor",href:"#重yield-表达式","aria-label":'Permalink to "重yield 表达式"'},"​")]),e("blockquote",null,[e("p",null,[n("本节目标：理解“重yield 表达式”的核心思路，并能把它用于实际开发或面试表达。 "),e("strong",null,"背景"),e("code",null,"ES6"),n(" 提供了"),e("code",null,"yield*"),n("表达式，作为解决办法，用来在一个 "),e("code",null,"Generator"),n(" 函数里面执行另一个 "),e("code",null,"Generator"),n(" 函数。")])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* foo() {  yield 'a';  yield 'b';}")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* bar() {  yield 'x'; // 手动遍历 foo()  for (let i of foo()) {    console.log(i);  }  yield 'y';}")]),n(`
`),e("span",{class:"line"},[e("span",null,"for (let v of bar()){  console.log(v);}// x// a// b// y")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，foo和bar都是 Generator 函数，在bar里面调用foo，就需要手动遍历foo。如果有多个 Generator 函数嵌套，写起来就非常麻烦。")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"yield*表达式：用来在一个 Generator 函数里面执行另一个 Generator 函数。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* bar() {  yield 'x';  yield* foo();  yield 'y';}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 等同于function* bar() {  yield 'x';  yield 'a';  yield 'b';  yield 'y';}")]),n(`
`),e("span",{class:"line"},[e("span",null,"再来看一个对比的例子。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* inner() {  yield 'hello!';}")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* outer1() {  yield 'open';  yield inner();  yield 'close';}")]),n(`
`),e("span",{class:"line"},[e("span",null,'var gen = outer1()gen.next().value // "open"gen.next().value // 返回一个遍历器对象gen.next().value // "close"')]),n(`
`),e("span",{class:"line"},[e("span",null,"function* outer2() {  yield 'open'  yield* inner()  yield 'close'}")]),n(`
`),e("span",{class:"line"},[e("span",null,'var gen = outer2()gen.next().value // "open"gen.next().value // "hello!"gen.next().value // "close"')]),n(`
`),e("span",{class:"line"},[e("span",null,"上面例子中，outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。")]),n(`
`),e("span",{class:"line"},[e("span",null,"从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。")]),n(`
`),e("span",{class:"line"},[e("span",null,"let delegatedIterator = (function* () {  yield 'Hello!';  yield 'Bye!';}());")]),n(`
`),e("span",{class:"line"},[e("span",null,"let delegatingIterator = (function* () {  yield 'Greetings!';  yield* delegatedIterator;  yield 'Ok, bye.';}());")]),n(`
`),e("span",{class:"line"},[e("span",null,'for(let value of delegatingIterator) {  console.log(value);}// "Greetings!// "Hello!"// "Bye!"// "Ok, bye."')]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。由于yield* delegatedIterator语句得到的值，是一个遍历器，所以要用星号表示。运行结果就是使用一个遍历器，遍历了多个 Generator 函数，有递归的效果。")]),n(`
`),e("span",{class:"line"},[e("span",null,"yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* concat(iter1, iter2) {  yield* iter1;  yield* iter2;}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 等同于")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* concat(iter1, iter2) {  for (var value of iter1) {    yield value;  }  for (var value of iter2) {    yield value;  }}")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码说明，yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值。")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。")]),n(`
`),e("span",{class:"line"},[e("span",null,'function* gen(){  yield* ["a", "b", "c"];}')]),n(`
`),e("span",{class:"line"},[e("span",null,'gen().next() // { value:"a", done:false }')]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。")]),n(`
`),e("span",{class:"line"},[e("span",null,"实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。")]),n(`
`),e("span",{class:"line"},[e("span",null,"let read = (function* () {  yield 'hello';  yield* 'hello';})();")]),n(`
`),e("span",{class:"line"},[e("span",null,'read.next().value // "hello"read.next().value // "h"')]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，yield表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，所以被yield*遍历。")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。")]),n(`
`),e("span",{class:"line"},[e("span",null,'function* foo() {  yield 2;  yield 3;  return "foo";}')]),n(`
`),e("span",{class:"line"},[e("span",null,'function* bar() {  yield 1;  var v = yield* foo();  console.log("v: " + v);  yield 4;}')]),n(`
`),e("span",{class:"line"},[e("span",null,"var it = bar();")]),n(`
`),e("span",{class:"line"},[e("span",null,'it.next()// {value: 1, done: false}it.next()// {value: 2, done: false}it.next()// {value: 3, done: false}it.next();// "v: foo"// {value: 4, done: false}it.next()// {value: undefined, done: true}')]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。")]),n(`
`),e("span",{class:"line"},[e("span",null,"再看一个例子。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* genFuncWithReturn() {  yield 'a';  yield 'b';  return 'The result';}function* logReturned(genObj) {  let result = yield* genObj;  console.log(result);}")]),n(`
`),e("span",{class:"line"},[e("span",null,"[...logReturned(genFuncWithReturn())]// The result// 值为 [ 'a', 'b' ]")]),n(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，存在两次遍历。第一次是扩展运算符遍历函数logReturned返回的遍历器对象，第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象。这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象。所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。但是，函数genFuncWithReturn的return语句的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出。")]),n(`
`),e("span",{class:"line"},[e("span",null,"yield*命令可以很方便地取出嵌套数组的所有成员。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function* iterTree(tree) {  if (Array.isArray(tree)) {    for(let i=0; i < tree.length; i++) {      yield* iterTree(tree[i]);    }  } else {    yield tree;  }}")]),n(`
`),e("span",{class:"line"},[e("span",null,"const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];")]),n(`
`),e("span",{class:"line"},[e("span",null,"for(let x of iterTree(tree)) {  console.log(x);}// a// b// c// d// e")]),n(`
`),e("span",{class:"line"},[e("span",null,"由于扩展运算符...默认调用 Iterator 接口，所以上面这个函数也可以用于嵌套数组的平铺。")]),n(`
`),e("span",{class:"line"},[e("span",null,'[...iterTree(tree)] // ["a", "b", "c", "d", "e"]')]),n(`
`),e("span",{class:"line"},[e("span",null,"下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 下面是二叉树的构造函数，// 三个参数分别是左树、当前节点和右树function Tree(left, label, right) {  this.left = left;  this.label = label;  this.right = right;}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 下面是中序（inorder）遍历函数。// 由于返回的是一个遍历器，所以要用generator函数。// 函数体内采用递归算法，所以左树和右树要用yield*遍历function* inorder(t) {  if (t) {    yield* inorder(t.left);    yield t.label;    yield* inorder(t.right);  }}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 下面生成二叉树function make(array) {"),e("span",null," // 判断是否为叶节点  if (array.length == 1) return new Tree(null, array[0], null);  return new Tree(make(array[0]), array[1], make(array[2]));}let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 遍历二叉树var result = [];for (let node of inorder(tree)) {  result.push(node);}")]),n(`
`),e("span",{class:"line"},[e("span",null,"result// ['a', 'b', 'c', 'd', 'e', 'f', 'g']")])])])])],-1)])])}const g=a(i,[["render",r]]);export{f as __pageData,g as default};
