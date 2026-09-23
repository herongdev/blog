import{_ as a,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"高级函数","description":"它们本质上是十分简单和过程化的，但也可以是非常复杂和动态的。一些额外的功能可以通过使用闭包来实现。此外，由于所有的函数都是对象，所以使用函数指针非常简单。这些令JavaScript函数不仅有趣而且强大。 在存在多个全局作用域（像—页面包含多个frame）的情况下，也会出现问题，如。","frontmatter":{"title":"高级函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"它们本质上是十分简单和过程化的，但也可以是非常复杂和动态的。一些额外的功能可以通过使用闭包来实现。此外，由于所有的函数都是对象，所以使用函数指针非常简单。这些令JavaScript函数不仅有趣而且强大。 在存在多个全局作用域（像—页面包含多个frame）的情况下，也会出现问题，如。","sidebarWeight":30,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/高级函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/高级函数.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/高级函数.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/高级函数.md"};function t(c,l,u,r,o,d){return e(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"高级函数",tabindex:"-1"},[s("高级函数 "),n("a",{class:"header-anchor",href:"#高级函数","aria-label":'Permalink to "高级函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“高级函数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"函数是JavaScript中最有趣的部分之一。")])])])]),n("p",null,"它们本质上是十分简单和过程化的，但也可以是非常复杂和动态的。一些额外的功能可以通过使用闭包来实现。此外，由于所有的函数都是对象，所以使用函数指针非常简单。这些令JavaScript函数不仅有趣而且强大。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**安全的类型检****测**")]),s(`
`),n("span",{class:"line"},[n("span",null,"JavaScript内置的类型检测机制并非完全可靠，")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**typeof****操作符**")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"typeof null ：'object'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"typeof 数组：'object'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"typeof 函数：'function'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**instanceof****操作符**")])])])]),n("p",null,"在存在多个全局作用域（像—页面包含多个frame）的情况下，也会出现问题，如："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var isArray = value instanceof Array;")]),s(`
`),n("span",{class:"line"},[n("span",null,"以上代码要返回true, value必须是一个数组，而且还必须与Array构造函数在同个全局作用域中（Array是window的属性），如果value是在另个frame中定义的数组，那么以上代码就会返回false。")])])])]),n("p",null,"在检测某个对象到底是原生对象还是开发人员自定义的对象的时候，也会有何题。出现这个问题的原因是浏览器开始原生支持JSON对象了。因为很多人一直在使用Douglas Crockford的JSON库，而该库定义了一个全局JSON对象。于是开发人员很难确定页面中的JSON对象到底是不是原生的。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Object****.prototype.toString.call()**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在任何值上调用Object原生的tostring()方法，都会返回一个")]),s(`
`),n("span",{class:"line"},[n("span",null,"[object NativeConstructorName]")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式的字符串，每个类在内部都有一个[[Class]]性，这个属性中就指定了上述字符串中的构造函数名。如：")]),s(`
`),n("span",{class:"line"},[n("span",null,'Object.prototype.toString.call(value); //"[object Array]"')]),s(`
`),n("span",{class:"line"},[n("span",null,"由于原生数组的构造函数名与全局作用域无关，因此使用tostring()就能保证返回一致的值。利用这一点，可以创建如下函数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function isArray(value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return Object.prototype.toString.call(value) == "[object Array]";')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"同样也可以测试某个值是不是原生函数或正则表达式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function isFunction(value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return Object.prototype.toString.call(value) == "[object Function]";')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function isRegExp(value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return Object.prototype.toString.call(value) == "[object RegExp]";')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**注意：**对于在IE中以COM对象形式实现的任何函数，isFunction都将返回false (因为它们并非原生的JavaScript函数)。这一技巧也广泛应用于检测原生JSON对象。Object的tostring()方法不能检测非原生构造函数的构造函数名。因此，开发人员定义的任何构造函数都将返回[object Object]。有些JavaScript库会包含与下面类似的代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) ==")]),s(`
`),n("span",{class:"line"},[n("span",null,'    "[object JSON]";')]),s(`
`),n("span",{class:"line"},[n("span",null,"在Web开发中能够区分原生与非原生JavaScript对象非常重要。只有这样才能确切知道某个对象到底有哪些功能。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**注意****：**Object.prototpye.tostring()本身也可能会被修改。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**作用域安全的构造函数**")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造函数其实就是一个使用new操作符调用的函数。当使用new调用时，构造函数内用到的this对象会指向新创建的对象实例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造函数的问题出在当没有使用new操作符来调用该构造函数的情况上。由于该this对象是在运行时绑定的，所以直接调用构造函数，this会映射到全局对象window上，导致错误对象属性的意外增加。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Person(name, age, job) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.job = job;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = Person("Nicholas", 29, "Software Engineer");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(window.name); //"Nicholas"')]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(window.age); //29")]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(window.job); //"Software Engineer"')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个问题的解决方法就是创建一个作用域安全的构造函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"作用域安全的构造函数在进行任何更改前，首先确认this对象是正确类型的实例。如果不是，那么会创建新的实例并返回。如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Person(name, age, job) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this instanceof Person) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.job = job;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return new Person(name, age, job);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person1 = Person("Nicholas", 29, "Software Engineer");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(window.name); //""')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person1.name); //"Nicholas"')]),s(`
`),n("span",{class:"line"},[n("span",null,'var person2 = new Person("Shelby", 34, "Ergonomist");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person2.name); //"Shelby"')]),s(`
`),n("span",{class:"line"},[n("span",null,"这就避免了在全局对象上意外设置属性性。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"实现这个模式后，你就锁定了可以调用构造函数的环境。如果你使用构造函数窃取模式的继承且不使用原型链，那么这个继承很可能被破坏。如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Polygon(sides) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this instanceof Polygon) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.sides = sides;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.getArea = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return new Polygon(sides);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Rectangle(width, height) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Polygon.call(this, 2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.width = width;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.height = height;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.getArea = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return this.width * this.height;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var rect = new Rectangle(5, 10);")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(rect.sides); //undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于Polygon构造函数是作用域安全的，this对象并非Polygon的实例，所以会创建并返回一个新的Polygon对象, Rectangle构造函数中的this对象并没有得到增长，同时Polygon.call()返回的值也没有用到，所以Rectangle实例中就不会有sides属性。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果构造函数窃取结合使用原型链或者寄生组合则可以解决这个问题，如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Polygon(sides) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this instanceof Polygon) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.sides = sides;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.getArea = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return new Polygon(sides);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Rectangle(width, height) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Polygon.call(this, 2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.width = width;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.height = height;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.getArea = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return this.width * this.height;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Rectangle.prototype = new Polygon();")]),s(`
`),n("span",{class:"line"},[n("span",null,"var rect = new Rectangle(5, 10);")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(rect.sides); //2")])])])]),n("p",null,"多个程序员在同一个页面上写JavaScript代码的环境中，作用域安全构造函数就很有用了。届时，对全局对象意外的更改可能会导致一些常常难以追踪的错误。除非你单纯基于构造函数窃取来实现继承，推荐作用域安全的构造函数作为最佳实践。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**情性****载****入函数**（首次判断来确定执行哪个函数）")]),s(`
`),n("span",{class:"line"},[n("span",null,"因为浏览器之间行为的姜异，多数JavaScript代码包含了大量的if语句，将执行引导到正确的代码中。如下的createXHR()函数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createXHR() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    if (typeof XMLHttpRequest != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"        return new XMLHttpRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,'    } else if (typeof ActiveXObject != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        if (typeof arguments.callee.activeXString != "string") {')]),s(`
`),n("span",{class:"line"},[n("span",null,'            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",')]),s(`
`),n("span",{class:"line"},[n("span",null,'                "MSXML2.XMLHttp"],')]),s(`
`),n("span",{class:"line"},[n("span",null,"                i, len;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            for (i = 0, len = versions.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    new ActiveXObject(versions[i]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    arguments.callee.activeXString = versions[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                } catch (ex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    // 跳过")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return new ActiveXObject(arguments.callee.activeXString);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        throw new Error("No XHR object available.");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"每次调用createXHR()的时候，它都要对浏览器所支持的能力仔细检査。首先检査内置的XHR,")]),s(`
`),n("span",{class:"line"},[n("span",null,"然后测试有没有基于ActiveX的XHR，最后如果都没有发现的话就抛出一个错误。每次调用该函数都是这样，即使每次调用时分支的结果都不变：如果浏览器支持内置XHR,那么它就一直支持了，那么这种测试就变得没必要了。即使只有一个if语句的代码，也肯定要比没有if语句的慢，所以如果if语句不必每次执行，那么代码可以运行地更快一些。解决方案就是称之为惰性载人的技巧。惰性载入表示函数执行的分支仅会发生一次。有两种实现惰性载入的方式，第一种就是在函数被调用时再处理函数。在第一次调用的过程中，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。例如，可以用下面的方式使用情性载入重写：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createXHR() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    if (typeof XMLHttpRequest != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"        createXHR = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return new XMLHttpRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,'    } else if (typeof ActiveXObject != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"        createXHR = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            if (typeof arguments.callee.activeXString != "string") {')]),s(`
`),n("span",{class:"line"},[n("span",null,'                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",')]),s(`
`),n("span",{class:"line"},[n("span",null,'                    "MSXML2.XMLHttp"],')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    i, len;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                for (i = 0, len = versions.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        new ActiveXObject(versions[i]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        arguments.callee.activeXString = versions[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    } catch (ex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //skip")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return new ActiveXObject(arguments.callee.activeXString);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        createXHR = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            throw new Error("No XHR object available.");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return createXHR();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"在这个惰性载入的createXHR()中，语句的每一个分支都会为createXHR变量赋值，有效覆 盖了原有的函数。最后一步便是调用新赋的函数。下一次调用createXHR()的时候，就会直接调用被分配的函数，这样就不用再次执行”语句了。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"第二种实现情性载入的方式是在声明函数时就指定适当的函数。这样，第一次调用函数时就不会损失性能了，而在代码首次加载时会损失一点性能。如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var createXHR = (function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    if (typeof XMLHttpRequest != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"        return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return new XMLHttpRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,'    } else if (typeof ActiveXObject != "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"        return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            if (typeof arguments.callee.activeXString != "string") {')]),s(`
`),n("span",{class:"line"},[n("span",null,'                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",')]),s(`
`),n("span",{class:"line"},[n("span",null,'                    "MSXML2.XMLHttp"],')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    i, len;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                for (i = 0, len = versions.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        new ActiveXObject(versions[i]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        arguments.callee.activeXString = versions[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    } catch (ex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //skip")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return new ActiveXObject(arguments.callee.activeXString);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            throw new Error("No XHR object available.");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"情性载入函数的优点是只在执行分支代码时牺牲一点儿性能。至于那种方式更合适，就要看你的具体需求而定了。不过这两种方式都能避免执行不必要的代码。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**函数绑定**")]),s(`
`),n("span",{class:"line"},[n("span",null,"函数绑定要创建一个函数，可以在特定的this环境中以指定参数调用另一个函数。该技巧常常和回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境。请看以下例子：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        alert(this.message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),s(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", handler.handleClick);')]),s(`
`),n("span",{class:"line"},[n("span",null,"在上面这个例子中，创建了一个叫做handler的对象。handler.handleClick()方法被分配为一个DOM按钮的事件处理程序。当按下该按钮时，就调用该函数，显示一个警吿框。虽然貌似警吿框应该显示Event handled ,然而实际上显示的是undefiend。这个问题在于没有保存handler.handledick()的环境，所以this对象最后是指向了DOM按钮而非handler。可以如下面例子所示，使用一个闭包来修正这个问题。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        alert(this.message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),s(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", function (event) {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handler.handleClick(event);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个解决方案在onclick事件处理程序内使用了一个闭包直接调用handler.handleclick()。当然，这是特定于这段代码的解决方案。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"创建多个闭包可能会令代码变得难于理解和调试，因此，很多JavaScript库实现了—可以将函数绑定到指定环境的函数。这个函数一般都叫bind()。一个简单的bind()函数接受一个函数和一个环境，并返回一个在给定环境中调用给定函数的函数，并且将所有参数原封不动传递过去。语法如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function bind(fn, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return fn.apply(context, arguments);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个函数似乎简单，但其功能是非常强大的。在bind中创建了一个闭包，闭包使用apply()调")]),s(`
`),n("span",{class:"line"},[n("span",null,"用传入的函数，并给apply()传递context对象和参数。注意这里使用的arguments对象是内部函数的，而非bind的。当调用返回的函数时，它会在给定环境中执行被传入的函数并给出所有参数。bind ()函数按如下方式使用:")]),s(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        alert(this.message);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),s(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));')]),s(`
`),n("span",{class:"line"},[n("span",null,"在这个例子中，我们用bindO函数创建了保持了执行环境的函数，并将其传给Eventutil.")]),s(`
`),n("span",{class:"line"},[n("span",null,"addHandler。event对象也被传给了该函数，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        alert(this.message + ":" + event.type);')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),s(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));')]),s(`
`),n("span",{class:"line"},[n("span",null,"handler.handleclick()方法和平时一样获得了event对象，因为所有的参数都通过被绑定的函数直接传给了它。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ECMAScript5为所有函数定义了一个原生的bind方法，进一步简单了操作。换句话说，你不用再自己定义bind函数了，而是可以直接在函数上调用这个方法。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        alert(this.message + ":" + event.type);')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),s(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler));')]),s(`
`),n("span",{class:"line"},[n("span",null,"原生的bind()方法与前面介绍的自定义bind()方法类似，都是要传入作为this值的对象。")])])])]),n("p",null,"只要是将某个函数指针以值的形式进行传递，同时该函数必须在特定环境中执行，被绑定函数的效用就突显出来了。它们主要用于事件处理程序以及setTimeout()和setinterval()。然而，被绑定函数与普通函数相比有更多的开销，它们需要更多内存，同时也因为多重函数调用稍微慢一点，所以最好只在必要时使用。")],-1)])])}const v=a(p,[["render",t]]);export{g as __pageData,v as default};
