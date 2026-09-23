import{_ as s,o as e,c as p,j as n,a}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"命名函数表达式用途","description":"被函数表达式赋值的那个变量会有一个name属性，如果你把这个变量赋值给另一个变量的话，这个name属性的值也不会改变。 如果函数是一个匿名函数，那name属性的值就是被赋值的变量的名称（隐藏值）。 如果函数不是匿名的话，那name属性的值就是这个函数的名称（显性值）。 这对于箭头。","frontmatter":{"title":"命名函数表达式用途","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"被函数表达式赋值的那个变量会有一个name属性，如果你把这个变量赋值给另一个变量的话，这个name属性的值也不会改变。 如果函数是一个匿名函数，那name属性的值就是被赋值的变量的名称（隐藏值）。 如果函数不是匿名的话，那name属性的值就是这个函数的名称（显性值）。 这对于箭头。","sidebarWeight":25,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/(5m)函数表达式/(5m)命名函数表达式用途.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(5m)函数表达式/(5m)命名函数表达式用途.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(5m)函数表达式/(5m)命名函数表达式用途.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(5m)函数表达式/(5m)命名函数表达式用途.md"};function t(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"命名函数表达式用途",tabindex:"-1"},[a("命名函数表达式用途 "),n("a",{class:"header-anchor",href:"#命名函数表达式用途","aria-label":'Permalink to "命名函数表达式用途"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“命名函数表达式用途”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"命名函数表达式可用于函数内部引用自身的情形。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**比如递归**")]),a(`
`),n("span",{class:"line"},[n("span",null,"如果你想在函数体内部引用当前函数，则需要创建一个命名函数表达式。然后函数名称将会（且只会）作为函数体（作用域内）的本地变量。这样也可以避免使用非标准的 arguments.callee 属性。")]),a(`
`),n("span",{class:"line"},[n("span",null,"var math = {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  'factorial': function factorial(n) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (n <= 1)")]),a(`
`),n("span",{class:"line"},[n("span",null,"      return 1;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return n * factorial(n - 1);")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("p",null,"被函数表达式赋值的那个变量会有一个name属性，如果你把这个变量赋值给另一个变量的话，这个name属性的值也不会改变。"),n("p",null,"如果函数是一个匿名函数，那name属性的值就是被赋值的变量的名称（隐藏值）。"),n("p",null,"如果函数不是匿名的话，那name属性的值就是这个函数的名称（显性值）。"),n("p",null,"这对于箭头函数也同样适用（箭头函数没有名字，所以只能赋予name属性一个隐性名）。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var foo = function() {}")]),a(`
`),n("span",{class:"line"},[n("span",null,'foo.name // "foo"')]),a(`
`),n("span",{class:"line"},[n("span",null,"var foo2 = foo")]),a(`
`),n("span",{class:"line"},[n("span",null,'foo2.name // "foo"')]),a(`
`),n("span",{class:"line"},[n("span",null,"var bar = function baz() {}")]),a(`
`),n("span",{class:"line"},[n("span",null,'bar.name // "baz"')]),a(`
`),n("span",{class:"line"},[n("span",null,"console.log(foo === foo2); //true")]),a(`
`),n("span",{class:"line"},[n("span",null,"console.log(typeof baz);// undefined")]),a(`
`),n("span",{class:"line"},[n("span",null,"console.log(bar === baz); // false (errors because baz == undefined)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**递归**")]),a(`
`),n("span",{class:"line"},[n("span",null,"递归函数是在一个函数通过名字调用自身的情况下构成的，如下所示。")]),a(`
`),n("span",{class:"line"},[n("span",null,"function factorial(num) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (num <= 1) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return 1;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return num * factorial(num - 1);")]),a(`
`),n("span",{class:"line"},[n("span",null,"    }")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"但下面的代码却可能导致它出错。")]),a(`
`),n("span",{class:"line"},[n("span",null,"var anotherFactorial = factorial;")]),a(`
`),n("span",{class:"line"},[n("span",null,"factorial = null;")]),a(`
`),n("span",{class:"line"},[n("span",null,"alert(anotherFactorial(4));")]),a(`
`),n("span",{class:"line"},[n("span",null,"由于必须执行factorial(),而factorial已经不再是函数，所以就会导致错误。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在这种情况下，使用arguments.callee可以解决这个问题。")]),a(`
`),n("span",{class:"line"},[n("span",null,"我们知道，arguments.callee是一个指向正在执行的函数的指针，因此可以用它来实现对函数的递归週用，例如：")]),a(`
`),n("span",{class:"line"},[n("span",null,"function factorial(num) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (num <= 1) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return 1;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return num * arguments.callee(num - 1);")]),a(`
`),n("span",{class:"line"},[n("span",null,"    }")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"但在严格模式下，不能通过脚本访冋arguments.callee，访问这个属性会导致错误。")]),a(`
`),n("span",{class:"line"},[n("span",null,"因此可以使用命名函数表达式来达成相同的结果。例如：")]),a(`
`),n("span",{class:"line"},[n("span",null,"var factorial = (function f(num) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (num <= 1) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return 1;")]),a(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),a(`
`),n("span",{class:"line"},[n("span",null,"        return num * f(num - 1);")]),a(`
`),n("span",{class:"line"},[n("span",null,"    }")]),a(`
`),n("span",{class:"line"},[n("span",null,"})")]),a(`
`),n("span",{class:"line"},[n("span",null,"即便把函数赋值给了另一个变量，函数的名字f仍然有效，所以递归调用能正确完成。")]),a(`
`),n("span",{class:"line"},[n("span",null,"这种方式在严格模式和非严格模式下都行得通。")])])])])],-1)])])}const g=s(i,[["render",t]]);export{h as __pageData,g as default};
