import{_ as n,o as r,c as a,j as e,a as t}from"./chunks/framework.DJo0M80U.js";const j=JSON.parse('{"title":"Object.getOwnPropertyDescriptors()","description":"围绕“Object.getOwnPropertyDescriptors()”整理的概念、示例与实践笔记。","frontmatter":{"title":"Object.getOwnPropertyDescriptors()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“Object.getOwnPropertyDescriptors()”整理的概念、示例与实践笔记。","sidebarWeight":41,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.getOwnPropertyDescriptors().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/Object对象方法/Object.getOwnPropertyDescriptors().md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/Object对象方法/Object.getOwnPropertyDescriptors().md"}'),o={name:"posts/JavaScript系统教程/03-对象、数组与函数/Object对象方法/Object.getOwnPropertyDescriptors().md"};function l(c,s,p,i,b,u){return r(),a("div",null,[...s[0]||(s[0]=[e("div",null,[e("h1",{id:"object-getownpropertydescriptors",tabindex:"-1"},[t("Object.getOwnPropertyDescriptors() "),e("a",{class:"header-anchor",href:"#object-getownpropertydescriptors","aria-label":'Permalink to "Object.getOwnPropertyDescriptors()"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Object.getOwnPropertyDescriptors()”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const obj = {  foo: 123,  get bar() { return 'abc' }};")]),t(`
`),e("span",{class:"line"},[e("span",null,"Object.getOwnPropertyDescriptors(obj)// { foo://    { value: 123,//      writable: true,//      enumerable: true,//      configurable: true },//   bar://    { get: [Function: get bar],//      set: undefined,//      enumerable: true,//      configurable: true } }")]),t(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。")]),t(`
`),e("span",{class:"line"},[e("span",null,"该方法的实现非常容易。")]),t(`
`),e("span",{class:"line"},[e("span",null,"function getOwnPropertyDescriptors(obj) {  const result = {};  for (let key of Reflect.ownKeys(obj)) {    result[key] = Object.getOwnPropertyDescriptor(obj, key);  }  return result;}")]),t(`
`),e("span",{class:"line"},[e("span",null,"该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const source = {  set foo(value) {    console.log(value);  }};")]),t(`
`),e("span",{class:"line"},[e("span",null,"const target1 = {};Object.assign(target1, source);")]),t(`
`),e("span",{class:"line"},[e("span",null,"Object.getOwnPropertyDescriptor(target1, 'foo')// { value: undefined,//   writable: true,//   enumerable: true,//   configurable: true }")]),t(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。")]),t(`
`),e("span",{class:"line"},[e("span",null,"这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const source = {  set foo(value) {    console.log(value);  }};")]),t(`
`),e("span",{class:"line"},[e("span",null,"const target2 = {};Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));Object.getOwnPropertyDescriptor(target2, 'foo')// { get: undefined,//   set: [Function: set foo],//   enumerable: true,//   configurable: true }")]),t(`
`),e("span",{class:"line"},[e("span",null,"上面代码中，两个对象合并的逻辑可以写成一个函数。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const shallowMerge = (target, source) => Object.defineProperties(  target,  Object.getOwnPropertyDescriptors(source));")]),t(`
`),e("span",{class:"line"},[e("span",null,"Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const clone = Object.create(Object.getPrototypeOf(obj),  Object.getOwnPropertyDescriptors(obj));")]),t(`
`),e("span",{class:"line"},[e("span",null,"// 或者")]),t(`
`),e("span",{class:"line"},[e("span",null,"const shallowClone = (obj) => Object.create(  Object.getPrototypeOf(obj),  Object.getOwnPropertyDescriptors(obj));")]),t(`
`),e("span",{class:"line"},[e("span",null,"上面代码会克隆对象obj。")]),t(`
`),e("span",{class:"line"},[e("span",null,"另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const obj = {  __proto__: prot,  foo: 123,};")]),t(`
`),e("span",{class:"line"},[e("span",null,"ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const obj = Object.create(prot);obj.foo = 123;")]),t(`
`),e("span",{class:"line"},[e("span",null,"// 或者")]),t(`
`),e("span",{class:"line"},[e("span",null,"const obj = Object.assign(  Object.create(prot),  {    foo: 123,  });")]),t(`
`),e("span",{class:"line"},[e("span",null,"有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。")]),t(`
`),e("span",{class:"line"},[e("span",null,"const obj = Object.create(  prot,  Object.getOwnPropertyDescriptors({    foo: 123,  }));")]),t(`
`),e("span",{class:"line"},[e("span",null,"Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。")]),t(`
`),e("span",{class:"line"},[e("span",null,"let mix = (object) => ({  with: (...mixins) => mixins.reduce(    (c, mixin) => Object.create(      c, Object.getOwnPropertyDescriptors(mixin)    ), object)});")]),t(`
`),e("span",{class:"line"},[e("span",null,"// multiple mixins examplelet a = {a: 'a'};let b = {b: 'b'};let c = {c: 'c'};let d = mix(c).with(a, b);")]),t(`
`),e("span",{class:"line"},[e("span",null,'d.c // "c"d.b // "b"d.a // "a"')]),t(`
`),e("span",{class:"line"},[e("span",null,"上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。")]),t(`
`),e("span",{class:"line"},[e("span",null,"出于完整性的考虑，Object.getOwnPropertyDescriptors()进入标准以后，以后还会新增Reflect.getOwnPropertyDescriptors()方法。")])])])])],-1)])])}const g=n(o,[["render",l]]);export{j as __pageData,g as default};
