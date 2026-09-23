import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"super 关键字","description":"super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。 ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向。","frontmatter":{"title":"super 关键字","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。 ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向。","sidebarWeight":177,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/Class 的继承/super 关键字.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/super 关键字.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/super 关键字.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/super 关键字.md"};function c(u,l,t,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"super-关键字",tabindex:"-1"},[n("super 关键字 "),s("a",{class:"header-anchor",href:"#super-关键字","aria-label":'Permalink to "super 关键字"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“super 关键字”的核心思路，并能把它用于实际开发或面试表达。 super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"一、super作为函数调用时，代表父类的构造函数。")]),n(`
`),s("span",{class:"line"},[s("span",null,"ES6 要求，子类的构造函数必须执行一次super函数。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A { }")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"注意：")]),n(`
`),s("span",{class:"line"},[s("span",null,"1、super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例；")]),n(`
`),s("span",{class:"line"},[s("span",null,"因此super()在这里相当于A.prototype.constructor.call(this)。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(new.target.name);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"new A() // A")]),n(`
`),s("span",{class:"line"},[s("span",null,"new B() // B")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"2、作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A {}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {  m() {    super(); // 报错  }}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"二、super作为对象时：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在普通方法中，指向父类的原型对象；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在静态方法中，指向父类。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    p() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(super.p()); // 2")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"p是父类A实例的属性，super.p就引用不到它。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.p = 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    get m() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return super.p;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")]),n(`
`),s("span",{class:"line"},[s("span",null,"b.m // undefined")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果属性定义在父类的原型对象上，super就可以取到。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A {}")]),n(`
`),s("span",{class:"line"},[s("span",null,"A.prototype.x = 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(super.x) // 2")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")]),n(`
`),s("span",{class:"line"},[s("span",null,"注意：")])])])]),s("p",null,"由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。"),s("p",null,"ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 1;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    print() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(this.x);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    m() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super.print();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")]),n(`
`),s("span",{class:"line"},[s("span",null,"b.m() // 2")]),n(`
`),s("span",{class:"line"},[s("span",null,"实际上执行的是super.print.call(this)。")])])])]),s("p",null,"由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 1;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super.x = 3;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(super.x); // undefined")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(this.x); // 3")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")])])])]),s("p",null,"上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**super****用在静态方法中**")]),n(`
`),s("span",{class:"line"},[s("span",null,"super指向：super作为对象用在静态方法之中，这时super将指向父类，而不是父类的原型对象。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Parent {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    static myMethod(msg) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log('static', msg);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    myMethod(msg) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log('instance', msg);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Child extends Parent {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    static myMethod(msg) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super.myMethod(msg);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    myMethod(msg) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super.myMethod(msg);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"Child.myMethod(1); // static 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"var child = new Child();")]),n(`
`),s("span",{class:"line"},[s("span",null,"child.myMethod(2); // instance 2")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"this指向：在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 1;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    static print() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(this.x);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.x = 2;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    static m() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super.print();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"B.x = 3;")]),n(`
`),s("span",{class:"line"},[s("span",null,"B.m() // 3")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**注意：**")]),n(`
`),s("span",{class:"line"},[s("span",null,"使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。也就是说super不能单独使用")]),n(`
`),s("span",{class:"line"},[s("span",null,"class A { }")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(super); // 报错")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明super的数据类型，就不会报错。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class A { }")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(super.valueOf() instanceof B); // true")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let b = new B();")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。")]),n(`
`),s("span",{class:"line"},[s("span",null,"同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。")]),n(`
`),s("span",{class:"line"},[s("span",null,'var obj = {  toString() {    return "MyObject: " + super.toString();  }};')]),n(`
`),s("span",{class:"line"},[s("span",null,"obj.toString(); // MyObject: [object Object]")])])])])],-1)])])}const v=a(i,[["render",c]]);export{g as __pageData,v as default};
