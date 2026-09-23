import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"模仿块级作用域","description":"围绕“模仿块级作用域”整理的概念、示例与实践笔记。","frontmatter":{"title":"模仿块级作用域","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“模仿块级作用域”整理的概念、示例与实践笔记。","sidebarWeight":7,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/(15m)模仿块级作用域.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模仿块级作用域.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模仿块级作用域.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(15m)模仿块级作用域.md"};function t(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"模仿块级作用域",tabindex:"-1"},[s("模仿块级作用域 "),n("a",{class:"header-anchor",href:"#模仿块级作用域","aria-label":'Permalink to "模仿块级作用域"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“模仿块级作用域”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如前所述，JavaScript没有块级作用域的概念。这意味着在块语句中定义的变量，实际上是在包含函数中而非语句中创建的，来看下面的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function outputNumbers(count) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < count; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        alert(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    alert(i); // 计数")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个函数中定义了一个for循环，而的初始值被设置为0。在Java、C++等语言中，变量i")]),s(`
`),n("span",{class:"line"},[n("span",null,"只会在for循环的语句块中有定义，循环一旦结束，变量i就会被销毁。可是在JavaScript,变量i是定义在ouputNumbers()的活动对象中的，因此从它有定义开始，就可以在函数内部随处访问它。即使像下面这样错误地重新声明同一个变量，也不会改变它的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function outputNumbers(count) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < count; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        alert(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var i; // 重新声明变量")]),s(`
`),n("span",{class:"line"},[n("span",null,"    alert(i); // 计数")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"JavaScript从来不会告诉你是否多次声明了同一个变量；遇到这种情况，它只会对后续的声明视而不见（不过，它会执行后续声明中的变量初始化，匿名函数可以用来模仿块级作用域并避免这个问题。")]),s(`
`),n("span",{class:"line"},[n("span",null,"用作块级作用域（通常称为私有作用域）的匿名函数的语法如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //这里是块级作用域")]),s(`
`),n("span",{class:"line"},[n("span",null,"})()")]),s(`
`),n("span",{class:"line"},[n("span",null,"以上代码定义并立即调用了一个匿名函数。将函数声明包含在一对圈括号中，表示它实际上是一个函数表达式。而紧随其后的另一对圆括号会立即调用这个函数。如果有读者感觉这种语法不太好理解，可以再看看下面这个例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var count = 5;")]),s(`
`),n("span",{class:"line"},[n("span",null,"outputNumber(count）;")]),s(`
`),n("span",{class:"line"},[n("span",null,"这里初始化了变量count,将其值设置为5。当然，这里的变量是没有必要的，因为可以把值直接传给函数。为了让代码更简洁，我们在调用函数时用5来代替变量count,如下所示。")]),s(`
`),n("span",{class:"line"},[n("span",null,"outputNumbers(5）;")]),s(`
`),n("span",{class:"line"},[n("span",null,"这样做之所以可行，是因为变最只不过是值的另一种表现形式，因此用实际的值替换变量没有间题。再看下面的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"var someFunction = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这里是块级作用域")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"someFunction();")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个例子先定义了一个函数，然后立即调用了它。定义函数的方式是创建一个匿名函数，并把匿名函数赋值给变量someFunction,而调用函数的方式是在函数名称后面添加一对圆括号，即")]),s(`
`),n("span",{class:"line"},[n("span",null,"scneFunctionOo通过前面的例子我们知道，可以使用实际的值来取代变童count,那在这里是不是也可以用函数的值直接取代函数名呢？然而，下面的代码却会导致错误。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这里是块级作用域")]),s(`
`),n("span",{class:"line"},[n("span",null,"}(); // 出错")]),s(`
`),n("span",{class:"line"},[n("span",null,"这段代码会导致语法错误，是因为JavaScript将function关键字当作一个函数声明的开始，而函数声明后面不能跟圆括号。然而，函数表达式的后面可以跟圆括号。要将函数声明转换成函数表达式，只要像下面这样给它加上一对圆括号即可。")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这里是块级作用域")]),s(`
`),n("span",{class:"line"},[n("span",null,"})(); // 出错")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"无论在什么地方，只要临时需要一些变量，就可以使用私有作用域，例如:")]),s(`
`),n("span",{class:"line"},[n("span",null,"function outputNumbers(count) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    (function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for (var i = 0; i < count; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            alert(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    alert(i); // 导致一个错误")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在这个重写后的outputNumbers函数中，我们在for循环外部插入了一个私有作用域。在匿名函数中定义的任何变量，都会在执行结束时被销毁。因此，变量i只能在循环中使用，使用后即被销毁。")]),s(`
`),n("span",{class:"line"},[n("span",null,"而在私有作用域中能够访count,是因为这个匿名函数是一个闭包，它能够访问包含作用域中的所有变量。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这种技术常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变最和函数。一般来说，我们都应该尽量少向全局作用域中添加变量和函数。在一个由很多开发人员共同参与的大型应用程序中，过多的全局变量和函数很容易导致命名冲突。而通过创建私有作用域，每个开发人员既可以使用自己的变量，又不必担心搞乱全局作用域。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var now = new Date();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (now.getMonth() == 0 && now.getDate() == 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        alert("Happy new year!");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"把上面这段代码放在全局作用域中，可以用来确定哪一天是1月1日；如果到了这一天，就会向用户显示一条祝贺新年的消息。其中的变最now现在是匿名函数中的局部变最，而我们不必在全局作用域中创建它。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了。")])])])])],-1)])])}const m=a(i,[["render",t]]);export{h as __pageData,m as default};
