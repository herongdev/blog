import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"ES6的运用","description":"多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 Airbnb 公司的 JavaScript 风格规范。 \\\\ 来自。","frontmatter":{"title":"ES6的运用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 Airbnb 公司的 JavaScript 风格规范。 \\\\ 来自。","sidebarWeight":6,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/ES6的运用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/ES6的运用.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/ES6的运用.md"}'),p={name:"posts/JavaScript系统教程/06-模块化与工程化/ES6的运用.md"};function i(c,l,o,u,r,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"es6的运用",tabindex:"-1"},[s("ES6的运用 "),n("a",{class:"header-anchor",href:"#es6的运用","aria-label":'Permalink to "ES6的运用"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“ES6的运用”的核心思路，并能把它用于实际开发或面试表达。 多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 "),n("a",{href:"https://github.com/airbnb/javascript",target:"_blank",rel:"noreferrer"},"Airbnb"),s(" 公司的 JavaScript 风格规范。")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**块级作用域**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**（****1****）****let** **取代** **var**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES6 提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"'use strict';")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  let x = 'hello';}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < 10; i++) {  console.log(i);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码如果用var替代let，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，var命令做不到这一点。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var命令存在变量提升效用，let命令没有这个问题。")]),s(`
`),n("span",{class:"line"},[n("span",null,"'use strict';")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (true) {  console.log(x); // ReferenceError  let x = 'hello';}")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码如果使用var替代let，console.log那一行就不会报错，而是会输出undefined，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以，建议不再使用var命令，而是使用let命令取代。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**（****2****）全局常量和线程安全**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const优于let有几个原因。一个是const可以提醒阅读程序的人，这个变量不应该改变；另一个是const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript 编译器会对const进行优化，所以多使用const，有利于提高程序的运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badvar a = 1, b = 2, c = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst a = 1;const b = 2;const c = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// bestconst [a, b, c] = [1, 2, 3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有的函数都应该设置为常量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"长远来看，JavaScript 可能会有多线程的实现（比如 Intel 公司的 River Trail 那一类的项目），这时let表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**字符串**")]),s(`
`),n("span",{class:"line"},[n("span",null,"静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。")]),s(`
`),n("span",{class:"line"},[n("span",null,`// badconst a = "foobar";const b = 'foo' + a + 'bar';`)]),s(`
`),n("span",{class:"line"},[n("span",null,"// acceptableconst c = `foobar`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst a = 'foobar';const b = `foo${a}bar`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**解构赋值**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用数组成员对变量赋值时，优先使用解构赋值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const arr = [1, 2, 3, 4];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst first = arr[0];const second = arr[1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst [first, second] = arr;")]),s(`
`),n("span",{class:"line"},[n("span",null,"函数的参数如果是对象的成员，优先使用解构赋值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction getFullName(user) {  const firstName = user.firstName;  const lastName = user.lastName;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodfunction getFullName(obj) {  const { firstName, lastName } = obj;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// bestfunction getFullName({ firstName, lastName }) {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction processInput(input) {  return [left, right, top, bottom];}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodfunction processInput(input) {  return { left, right, top, bottom };}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const { left, right } = processInput(input);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**对象**")]),s(`
`),n("span",{class:"line"},[n("span",null,"单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst a = { k1: v1, k2: v2, };const b = {  k1: v1,  k2: v2};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst a = { k1: v1, k2: v2 };const b = {  k1: v1,  k2: v2,};")]),s(`
`),n("span",{class:"line"},[n("span",null,"对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst a = {};a.x = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// if reshape unavoidableconst a = {};Object.assign(a, { x: 3 });")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst a = { x: null };a.x = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst obj = {  id: 5,  name: 'San Francisco',};obj[getKey('enabled')] = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst obj = {  id: 5,  name: 'San Francisco',  [getKey('enabled')]: true,};")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，对象obj的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建obj的时候，将该属性与其他属性定义在一起。这样一来，所有属性就在一个地方定义了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ref = 'some value';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst atom = {  ref: ref,")]),s(`
`),n("span",{class:"line"},[n("span",null,"value: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"addValue: function (value) {    return atom.value + value;  },};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst atom = {  ref,")]),s(`
`),n("span",{class:"line"},[n("span",null,"value: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"addValue(value) {    return atom.value + value;  },};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用扩展运算符（...）拷贝数组。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst len = items.length;const itemsCopy = [];let i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (i = 0; i < len; i++) {  itemsCopy[i] = items[i];}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodconst itemsCopy = [...items];")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 Array.from 方法，将类似数组的对象转为数组。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const foo = document.querySelectorAll('.foo');const nodes = Array.from(foo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**函数**")]),s(`
`),n("span",{class:"line"},[n("span",null,"立即执行函数可以写成箭头函数的形式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"(() => {  console.log('Welcome to the Internet.');})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"那些使用匿名函数当作参数的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// bad[1, 2, 3].map(function (x) {  return x * x;});")]),s(`
`),n("span",{class:"line"},[n("span",null,"// good[1, 2, 3].map((x) => {  return x * x;});")]),s(`
`),n("span",{class:"line"},[n("span",null,"// best[1, 2, 3].map(x => x * x);")]),s(`
`),n("span",{class:"line"},[n("span",null,"箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst self = this;const boundMethod = function(...params) {  return method.apply(self, params);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// acceptableconst boundMethod = method.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// bestconst boundMethod = (...params) => method.apply(this, params);")]),s(`
`),n("span",{class:"line"},[n("span",null,"简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction divide(a, b, option = false ) {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodfunction divide(a, b, { option = false } = {}) {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction concatenateAll() {  const args = Array.prototype.slice.call(arguments);  return args.join('');}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodfunction concatenateAll(...args) {  return args.join('');}")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用默认值语法设置函数参数的默认值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction handleThings(opts) {  opts = opts || {};}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodfunction handleThings(opts = {}) {"),n("span",null,"  // ...}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map** **结构**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。")]),s(`
`),n("span",{class:"line"},[n("span",null,"let map = new Map(arr);")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let key of map.keys()) {  console.log(key);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let value of map.values()) {  console.log(value);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let item of map.entries()) {  console.log(item[0], item[1]);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Class**")]),s(`
`),n("span",{class:"line"},[n("span",null,"总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badfunction Queue(contents = []) {  this._queue = [...contents];}Queue.prototype.pop = function() {  const value = this._queue[0];  this._queue.splice(0, 1);  return value;}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodclass Queue {  constructor(contents = []) {    this._queue = [...contents];  }  pop() {    const value = this._queue[0];    this._queue.splice(0, 1);    return value;  }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst inherits = require('inherits');function PeekableQueue(contents) {  Queue.apply(this, contents);}inherits(PeekableQueue, Queue);PeekableQueue.prototype.peek = function() {  return this._queue[0];}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodclass PeekableQueue extends Queue {  peek() {    return this._queue[0];  }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**模块**")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badconst moduleA = require('moduleA');const func1 = moduleA.func1;const func2 = moduleA.func2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodimport { func1, func2 } from 'moduleA';")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用export取代module.exports。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// commonJS的写法var React = require('react');")]),s(`
`),n("span",{class:"line"},[n("span",null,"var Breadcrumbs = React.createClass({  render() {    return <nav />;  }});")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = Breadcrumbs;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// ES6的写法import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Breadcrumbs extends React.Component {  render() {    return <nav />;  }};")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Breadcrumbs;")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，export default与普通的export不要同时使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// badimport * as myObject from './importModule';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// goodimport myObject from './importModule';")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果模块默认输出一个函数，函数名的首字母应该小写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function makeStyleGuide() {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default makeStyleGuide;")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果模块默认输出一个对象，对象名的首字母应该大写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const StyleGuide = {  es6: {  }};")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default StyleGuide;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**ESLint** **的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先，安装 ESLint。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ npm i -g eslint")]),s(`
`),n("span",{class:"line"},[n("span",null,"然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ npm i -g eslint-config-airbnb$ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react")]),s(`
`),n("span",{class:"line"},[n("span",null,"最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。")]),s(`
`),n("span",{class:"line"},[n("span",null,'{  "extends": "eslint-config-airbnb"}')]),s(`
`),n("span",{class:"line"},[n("span",null,"现在就可以检查，当前项目的代码是否符合预设的规则。")]),s(`
`),n("span",{class:"line"},[n("span",null,"index.js文件的代码如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var unusued = 'I have no purpose!';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function greet() {    var message = 'Hello, World!';    alert(message);}")]),s(`
`),n("span",{class:"line"},[n("span",null,"greet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 ESLint 检查这个文件，就会报出错误。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ eslint index.jsindex.js  1:1  error  Unexpected var, use let or const instead          no-var  1:5  error  unusued is defined but never used                 no-unused-vars  4:5  error  Expected indentation of 2 characters but found 4  indent  4:5  error  Unexpected var, use let or const instead          no-var  5:5  error  Expected indentation of 2 characters but found 4  indent")]),s(`
`),n("span",{class:"line"},[n("span",null,"✖ 5 problems (5 errors, 0 warnings)")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码说明，原文件有五个错误，其中两个是不应该使用var命令，而要使用let或const；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://es6.ruanyifeng.com/#docs/style>")])])])])],-1)])])}const f=a(p,[["render",i]]);export{m as __pageData,f as default};
