import{_ as a,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Class 的继承","description":"ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。 ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。","frontmatter":{"title":"Class 的继承","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。 ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。","sidebarWeight":174,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/Class 的继承/Class 的继承.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Class 的继承.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Class 的继承.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Class 的继承.md"};function i(c,l,o,r,u,h){return e(),t("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"class-的继承",tabindex:"-1"},[n("Class 的继承 "),s("a",{class:"header-anchor",href:"#class-的继承","aria-label":'Permalink to "Class 的继承"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“Class 的继承”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**Class****通过****extends****关键字实现继承；**")]),n(`
`),s("span",{class:"line"},[s("span",null,"这比ES5的通过修改原型链实现继承，要清晰和方便很多。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在ColorPoint内部加上代码。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(x, y, color) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(x, y); // 调用父类的constructor(x, y)")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.color = color;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    toString() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return this.color + ' ' + super.toString(); // 调用父类的toString()")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**con****structor()**")]),n(`
`),s("span",{class:"line"},[s("span",null,"如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 等同于")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(...args) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(...args);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**su****per()**")]),n(`
`),s("span",{class:"line"},[s("span",null,"子类必须在constructor方法中调用super方法，否则新建实例时会报错。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Point { /* ... */ }")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let cp = new ColorPoint(); // ReferenceError")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"继承机制：")])])])]),s("p",null,"ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。"),s("p",null,"ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果不调用super方法，子类就得不到this对象。")])])])]),s("p",null,"在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(x, y) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = x;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.y = y;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ColorPoint extends Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(x, y, color) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.color = color; // ReferenceError")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(x, y);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.color = color; // 正确")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面是生成子类实例的代码。")]),n(`
`),s("span",{class:"line"},[s("span",null,"let cp = new ColorPoint(25, 8, 'green');")]),n(`
`),s("span",{class:"line"},[s("span",null,"cp instanceof ColorPoint // truecp instanceof Point // true")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。")])])])])],-1)])])}const v=a(p,[["render",i]]);export{g as __pageData,v as default};
