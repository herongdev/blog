import{_ as e,o as l,c as o,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"循环加载","description":"通常，循环加载表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。 对于 JavaSc。","frontmatter":{"title":"循环加载","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"通常，循环加载表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。 对于 JavaSc。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的加载实现/循环加载.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/循环加载.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/循环加载.md"}'),p={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/循环加载.md"};function r(i,a,t,c,u,d){return l(),o("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"循环加载",tabindex:"-1"},[s("循环加载 "),n("a",{class:"header-anchor",href:"#循环加载","aria-label":'Permalink to "循环加载"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“循环加载”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"循环加载（circular dependency）指的是a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// a.jsvar b = require('b');")]),s(`
`),n("span",{class:"line"},[n("span",null,"// b.jsvar a = require('a');")])])])]),n("p",null,"通常，循环加载表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。"),n("p",null,"但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。"),n("p",null,"对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**CommonJS** **模块的加载原理**")]),s(`
`),n("span",{class:"line"},[n("span",null,"CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"{  id: '...',  exports: { ... },  loaded: true,  ...}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**CommonJS** **模块的循环加载**")]),s(`
`),n("span",{class:"line"},[n("span",null,'CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。')]),s(`
`),n("span",{class:"line"},[n("span",null,"让我们来看，Node [官方文档](https://nodejs.org/api/modules.html#modules_cycles)里面的例子。脚本文件a.js代码如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.done = false;var b = require('./b.js');console.log('在 a.js 之中，b.done = %j', b.done);exports.done = true;console.log('a.js 执行完毕');")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。")]),s(`
`),n("span",{class:"line"},[n("span",null,"再看b.js的代码。")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.done = false;var a = require('./a.js');console.log('在 b.js 之中，a.done = %j', a.done);exports.done = true;console.log('b.js 执行完毕');")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码之中，b.js执行到第二行，就会去加载a.js，这时，就发生了“循环加载”。系统会去a.js模块对应对象的exports属性取值，可是因为a.js还没有执行完，从exports属性只能取回已经执行的部分，而不是最后的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.js已经执行的部分，只有一行。")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.done = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"因此，对于b.js来说，它从a.js只输入一个变量done，值为false。")]),s(`
`),n("span",{class:"line"},[n("span",null,"然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。于是，a.js接着往下执行，直到执行完毕。我们写一个脚本main.js，验证这个过程。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var a = require('./a.js');var b = require('./b.js');console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);")]),s(`
`),n("span",{class:"line"},[n("span",null,"执行main.js，运行结果如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ node main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 b.js 之中，a.done = falseb.js 执行完毕在 a.js 之中，b.done = truea.js 执行完毕在 main.js 之中, a.done=true, b.done=true")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的代码证明了两件事。一是，在b.js之中，a.js没有执行完毕，只执行了第一行。二是，main.js执行到第二行时，不会再次执行b.js，而是输出缓存的b.js的执行结果，即它的第四行。")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.done = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"总之，CommonJS 输入的是被输出值的拷贝，不是引用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var a = require('a'); // 安全的写法var foo = require('a').foo; // 危险的写法")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.good = function (arg) {  return a.foo('good', arg); // 使用的是 a.foo 的最新值};")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.bad = function (arg) {  return foo('bad', arg); // 使用的是一个部分加载时的值};")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**ES6** **模块的循环加载**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"请看下面这个例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// a.mjsimport {bar} from './b';console.log('a.mjs');console.log(bar);export let foo = 'foo';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// b.mjsimport {foo} from './a';console.log('b.mjs');console.log(foo);export let bar = 'bar';")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ node --experimental-modules a.mjsb.mjsReferenceError: foo is not defined")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，执行a.mjs以后会报错，foo变量未定义，这是为什么？")]),s(`
`),n("span",{class:"line"},[n("span",null,"让我们一行行来看，ES6 循环加载是怎么处理的。首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将foo写成函数来解决。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// a.mjsimport {bar} from './b';console.log('a.mjs');console.log(bar());function foo() { return 'foo' }export {foo};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// b.mjsimport {foo} from './a';console.log('b.mjs');console.log(foo());function bar() { return 'bar' }export {bar};")]),s(`
`),n("span",{class:"line"},[n("span",null,"这时再执行a.mjs就可以得到预期结果。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ node --experimental-modules a.mjsb.mjsfooa.mjsbar")]),s(`
`),n("span",{class:"line"},[n("span",null,"这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，所以b.mjs加载的时候不会报错。这也意味着，如果把函数foo改写成函数表达式，也会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// a.mjsimport {bar} from './b';console.log('a.mjs');console.log(bar());const foo = () => 'foo';export {foo};")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们再来看 ES6 模块加载器[SystemJS](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/circular-references-bindings.md)给出的一个例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// even.jsimport { odd } from './odd'export var counter = 0;export function even(n) {  counter++;  return n === 0 || odd(n - 1);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// odd.jsimport { even } from './even';export function odd(n) {  return n !== 0 && even(n - 1);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，even.js里面的函数even有一个参数n，只要不等于 0，就会减去 1，传入加载的odd()。odd.js也会做类似操作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"运行上面这段代码，结果如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ babel-node> import * as m from './even.js';> m.even(10);true> m.counter6> m.even(20)true> m.counter17")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，参数n从 10 变为 0 的过程中，even()一共会执行 6 次，所以变量counter等于 6。第二次调用even()时，参数n从 20 变为 0，even()一共会执行 11 次，加上前面的 6 次，所以变量counter等于 17。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个例子要是改写成 CommonJS，就根本无法执行，会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// even.jsvar odd = require('./odd');var counter = 0;exports.counter = counter;exports.even = function (n) {  counter++;  return n == 0 || odd(n - 1);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// odd.jsvar even = require('./even').even;module.exports = function (n) {  return n != 0 && even(n - 1);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，even.js加载odd.js，而odd.js又去加载even.js，形成“循环加载”。这时，执行引擎就会输出even.js已经执行的部分（不存在任何结果），所以在odd.js之中，变量even等于undefined，等到后面调用even(n - 1)就会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ node> var m = require('./even');> m.even(10)TypeError: even is not a function")]),s(`
`),n("span",{class:"line"},[n("span",null,"**留言**")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://es6.ruanyifeng.com/#docs/module-loader>")])])])])],-1)])])}const j=e(p,[["render",r]]);export{b as __pageData,j as default};
