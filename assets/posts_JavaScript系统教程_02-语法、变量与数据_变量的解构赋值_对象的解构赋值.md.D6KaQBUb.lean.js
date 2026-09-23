import{_ as s,o as e,c as o,j as l,a}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"对象的解构赋值","description":"数组的元素是按次序排列的，变量的取值由它的位置决定； 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。 上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等。","frontmatter":{"title":"对象的解构赋值","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"数组的元素是按次序排列的，变量的取值由它的位置决定； 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。 上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等。","sidebarWeight":13,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/变量和常量/变量的解构赋值/对象的解构赋值.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/变量的解构赋值/对象的解构赋值.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/变量的解构赋值/对象的解构赋值.md"}'),p={name:"posts/JavaScript系统教程/02-语法、变量与数据/变量的解构赋值/对象的解构赋值.md"};function t(i,n,c,b,r,u){return e(),o("div",null,[...n[0]||(n[0]=[l("div",null,[l("h1",{id:"对象的解构赋值",tabindex:"-1"},[a("对象的解构赋值 "),l("a",{class:"header-anchor",href:"#对象的解构赋值","aria-label":'Permalink to "对象的解构赋值"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“对象的解构赋值”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"对象的解构与数组有一个重要的不同：")])])])]),l("p",null,"数组的元素是按次序排列的，变量的取值由它的位置决定；"),l("p",null,"而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,`let { foo, bar } = { foo: 'aaa', bar: 'bbb' };foo // "aaa"bar // "bbb"`)]),a(`
`),l("span",{class:"line"},[l("span",null,`let { bar, foo } = { foo: 'aaa', bar: 'bbb' };foo // "aaa"bar // "bbb"`)]),a(`
`),l("span",{class:"line"},[l("span",null,"let { baz } = { foo: 'aaa', bar: 'bbb' };baz // undefined")])])])]),l("p",null,"上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**解构失败**")]),a(`
`),l("span",{class:"line"},[l("span",null,"如果解构失败，变量的值等于undefined。")]),a(`
`),l("span",{class:"line"},[l("span",null,"let {foo} = {bar: 'baz'};foo // undefined")]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，等号右边的对象没有foo属性，所以变量foo取不到值，所以等于undefined。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**解构对象的方法**")]),a(`
`),l("span",{class:"line"},[l("span",null,"对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。")]),a(`
`),l("span",{class:"line"},[l("span",null,"// 例一let { log, sin, cos } = Math;")]),a(`
`),l("span",{class:"line"},[l("span",null,"// 例二const { log } = console;log('hello')"),l("span",null," // hello")]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码的例一将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将console.log赋值到log变量。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"变量名与属性名不同")]),a(`
`),l("span",{class:"line"},[l("span",null,"必须写成下面这样。")]),a(`
`),l("span",{class:"line"},[l("span",null,`let { foo: baz } = { foo: 'aaa', bar: 'bbb' };baz // "aaa"`)]),a(`
`),l("span",{class:"line"},[l("span",null,"let obj = { first: 'hello', last: 'world' };let { first: f, last: l } = obj;f // 'hello'l // 'world'")]),a(`
`),l("span",{class:"line"},[l("span",null,"这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。")]),a(`
`),l("span",{class:"line"},[l("span",null,"let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };")]),a(`
`),l("span",{class:"line"},[l("span",null,"也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。")]),a(`
`),l("span",{class:"line"},[l("span",null,`let { foo: baz } = { foo: 'aaa', bar: 'bbb' };baz // "aaa"foo // error: foo is not defined`)]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"**嵌套解构**")]),a(`
`),l("span",{class:"line"},[l("span",null,"与数组一样，解构也可以用于嵌套结构的对象。")]),a(`
`),l("span",{class:"line"},[l("span",null,"let obj = {  p: [    'Hello',    { y: 'World' }  ]};")]),a(`
`),l("span",{class:"line"},[l("span",null,'let { p: [x, { y }] } = obj;x // "Hello"y // "World"')]),a(`
`),l("span",{class:"line"},[l("span",null,"注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。")]),a(`
`),l("span",{class:"line"},[l("span",null,"let obj = {  p: [    'Hello',    { y: 'World' }  ]};")]),a(`
`),l("span",{class:"line"},[l("span",null,'let { p, p: [x, { y }] } = obj;x // "Hello"y // "World"p // ["Hello", {y: "World"}]')]),a(`
`),l("span",{class:"line"},[l("span",null,"下面是另一个例子。")]),a(`
`),l("span",{class:"line"},[l("span",null,"const node = {  loc: {    start: {      line: 1,      column: 5    }  }};")]),a(`
`),l("span",{class:"line"},[l("span",null,"let { loc, loc: { start }, loc: { start: { line }} } = node;line // 1loc  // Object {start: Object}start // Object {line: 1, column: 5}")]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。")]),a(`
`),l("span",{class:"line"},[l("span",null,"下面是嵌套赋值的例子。")]),a(`
`),l("span",{class:"line"},[l("span",null,"let obj = {};let arr = [];")]),a(`
`),l("span",{class:"line"},[l("span",null,"({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });")]),a(`
`),l("span",{class:"line"},[l("span",null,"obj // {prop:123}arr // [true]")]),a(`
`),l("span",{class:"line"},[l("span",null,"如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。")]),a(`
`),l("span",{class:"line"},[l("span",null,"// 报错let {foo: {bar}} = {baz: 'baz'};")]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错。")]),a(`
`),l("span",{class:"line"},[l("span",null,"注意，对象的解构赋值可以取到继承的属性。")]),a(`
`),l("span",{class:"line"},[l("span",null,"const obj1 = {};const obj2 = { foo: 'bar' };Object.setPrototypeOf(obj1, obj2);")]),a(`
`),l("span",{class:"line"},[l("span",null,'const { foo } = obj1;foo // "bar"')]),a(`
`),l("span",{class:"line"},[l("span",null,"上面代码中，对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。")])])])])],-1)])])}const h=s(p,[["render",t]]);export{f as __pageData,h as default};
