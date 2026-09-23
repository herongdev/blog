import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"闭包","description":"在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含 自身活动对象和全局变量对象。 因此： 更为重要的是，createComparisonFunction()函数在执行完毕后，其执行环境的作用域链会被销毁，但其活动对象也不会被销毁。","frontmatter":{"title":"闭包","date":"2026-08-11T00:00:00.000Z","categories":["前端面试与实战"],"tags":["前端面试","算法","求职","教程","OneNote","前端知识复习"],"description":"在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含 自身活动对象和全局变量对象。 因此： 更为重要的是，createComparisonFunction()函数在执行完毕后，其执行环境的作用域链会被销毁，但其活动对象也不会被销毁。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/a-吊打面试官/考点难点/(15m)闭包.md"},"headers":[],"relativePath":"posts/前端面试与实战/01-前端知识复习/(15m)闭包.md","filePath":"posts/前端面试与实战/01-前端知识复习/(15m)闭包.md"}'),i={name:"posts/前端面试与实战/01-前端知识复习/(15m)闭包.md"};function t(c,a,u,o,r,m){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"闭包",tabindex:"-1"},[s("闭包 "),n("a",{class:"header-anchor",href:"#闭包","aria-label":'Permalink to "闭包"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“闭包”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**概念**")]),s(`
`),n("span",{class:"line"},[n("span",null,"闭包是指有权访问另一个函数作用域中的变量的函数。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**创建闭包**")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建闭包的常见方式，就是在一个函数内部创建另一个函数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createComparisonFunction(propertyName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return function (object1, object2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==var== ==value1== ===== ==object1====[====propertyName====];==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==var== ==value2== ===== ==object2====[====propertyName====];==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (value1 < value2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else if (value1 > value2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**闭包的原理**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在一个函数outfn内部定义的函数innerfn，会将函数outfn的活动对象添加到它的作用域链中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"因此，在createComparisonFunction()函数内部定义的匿名函数的作用域链中，实际上将会包含外部函数createComparisonFunction ()的活动对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,'var compare = createComparisonFunction("name");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var result = compare({ name: "Nicholas" }, { name: "Greg" });')])])])]),n("p",null,"在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含 自身活动对象和全局变量对象。 因此："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"匿名函数就可以访问在createComparisonFunction()中定义的所有变量；")])])])]),n("p",null,"更为重要的是，createComparisonFunction()函数在执行完毕后，其执行环境的作用域链会被销毁，但其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**消除闭包**")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建函数")]),s(`
`),n("span",{class:"line"},[n("span",null,'var compareNames = createComparisonFunction("name");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用函数")]),s(`
`),n("span",{class:"line"},[n("span",null,'var result = compareNames({ name: "Nicholas" }, { name: "Greg" });')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 解除对匿名函数的引用（以便释放内存）")]),s(`
`),n("span",{class:"line"},[n("span",null,"compareNames = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先，创建的比较函数被保存在变量compareNames中，而通过将compareNames设置为等于null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域(除了全局作用域)也都可以安全地销毁了。")])])])]),n("p",null,[n("strong",null,"闭包的缺点"),s(" 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多，我们建议读者只在绝对必要时再考虑使用闭包。虽然像V8等优化后的JavaScript引孳会尝试回收被闭包占用的内存，但请大家还是要慎重使用闭包。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**闭包与变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"闭包只能取得包含函数中任何变量的最后一个值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"闭包所保存的是整个变量对象，而不是某个特殊的变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如下例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createFunctions() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var result = new Array();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < 10; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        result[i] = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返自己的索引值，即位置0的函数返回0，位置1的函数返回1，以此类推。但实际上，每个函数都返回10。因为每个函数的作用域链中都保存着createFunctions函数的活动对象，所以它们引用的都是同一个变量i。当createFunctions数返回后，变量i的值是10，此时每个函数都引用着保存变量i的同一个变量对象，所以在每个函数内部i的值都是10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期，如下所示。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createFunctions() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var result = new Array();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < 10; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        result[i] = function (num) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return num;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"在重写了前面的createFunctions函数后，每个函数就会返回各自不同的索引值了。 在这个版本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋给数组。这里的匿名函数有一个参数num，也就是最终的函数要返回的值。在调用每个匿名函数时，我们传入了变量num，由于函数参数是按值传递的，所以就会将变量i的当前值复制给参数num。而在这个匿名函数内部，又创建并返回了一个访何num的闭包。这样一来，result数组中的每个函数都有自己num变量的一个副本，因此就可以返回各自不同的数值了。"),n("p",null,[n("strong",null,"注意："),s(" 由于V8引擎的优化，如果闭包作用域链中所有变量对象中的变量，未在闭包的代码中引用，则这些变量对象中未被引用的变量甚至整个变量对象都会被销毁。 如下图：图中inner函数的变量对象中未被引用的变量c被销毁了。")])],-1)])])}const v=l(i,[["render",t]]);export{h as __pageData,v as default};
