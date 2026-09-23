import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"函数柯里化","description":"函数柯里化（Currying）是一种将多个参数的函数转换为一系列使用一个参数的函数的技术。它是函数式编程中的一个重要概念，通过柯里化，可以将函数的调用进行部分应用，从而生成新的函数。这对于函数复用和构建更灵活的函数有很大帮助。 基本概念 假设有一个函数 f，它接收多个参数。通过柯。","frontmatter":{"title":"函数柯里化","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"函数柯里化（Currying）是一种将多个参数的函数转换为一系列使用一个参数的函数的技术。它是函数式编程中的一个重要概念，通过柯里化，可以将函数的调用进行部分应用，从而生成新的函数。这对于函数复用和构建更灵活的函数有很大帮助。 基本概念 假设有一个函数 f，它接收多个参数。通过柯。","sidebarWeight":9,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/(20m)[重]this对象/(20m)函数柯里化.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(20m)[重]this对象/(20m)函数柯里化.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(20m)[重]this对象/(20m)函数柯里化.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(20m)[重]this对象/(20m)函数柯里化.md"};function u(r,s,c,t,d,o){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"函数柯里化",tabindex:"-1"},[l("函数柯里化 "),n("a",{class:"header-anchor",href:"#函数柯里化","aria-label":'Permalink to "函数柯里化"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“函数柯里化”的核心思路，并能把它用于实际开发或面试表达。 函数柯里化（Currying）是一种将多个参数的函数转换为一系列使用一个参数的函数的技术。它是函数式编程中的一个重要概念，通过柯里化，可以将函数的调用进行部分应用，从而生成新的函数。这对于函数复用和构建更灵活的函数有很大帮助。")]),n("p",null,"基本概念 假设有一个函数 f，它接收多个参数。通过柯里化，函数 f 可以被转换为一系列嵌套的函数，每个嵌套的函数只接收一个参数，然后返回一个新的函数，直到所有的参数都被接收并处理。"),n("p",null,"示例 下面是一个简单的例子，展示了如何将一个接收两个参数的函数进行柯里化。 function add(x, y) { return x + y; } console.log(add(2, 3)); // 输出: 5"),n("p",null,"柯里化函数 function curryAdd(x) { return function(y) { return x + y; }; } let addTwo = curryAdd(2); console.log(addTwo(3)); // 输出: 5 console.log(curryAdd(2)(3)); // 输出: 5"),n("p",null,"通用柯里化函数 为了更方便地对任意函数进行柯里化，可以实现一个通用的柯里化函数。 function curry(func) { return function curried(...args) { if (args.length >= func.length) { return func.apply(this, args); } else { return function(...nextArgs) { return curried.apply(this, args.concat(nextArgs)); }; } }; } // 示例 function multiply(a, b, c) { return a * b * c; } let curriedMultiply = curry(multiply); console.log(curriedMultiply(2)(3)(4)); // 输出: 24 console.log(curriedMultiply(2, 3)(4)); // 输出: 24 console.log(curriedMultiply(2)(3, 4)); // 输出: 24"),n("p",null,"实现解释"),n("ol",null,[n("li",null,"curry 函数：接受一个普通函数 func 作为参数。"),n("li",null,"curried 函数：返回一个新的函数 curried，该函数接收任意数量的参数。"),n("li",null,"参数长度检查：如果传入的参数数量大于或等于原始函数 func 的参数长度，则直接调用 func 并返回结果。"),n("li",null,"参数收集：如果传入的参数数量不足，则返回一个新的函数，该函数继续收集剩余的参数，直到参数数量足够为止。")]),n("p",null,"柯里化的应用"),n("ol",null,[n("li",null,"参数复用：可以固定一些参数，生成新的函数，简化后续的调用。"),n("li",null,"延迟计算：通过柯里化，可以在不同的时间点传递参数，延迟函数的执行。"),n("li",null,"函数组合：柯里化可以与其他函数式编程技巧结合，构建更复杂的功能。")]),n("p",null,"总结 柯里化是一种强大的技术，可以将函数的参数进行分步传递，生成新的函数。这种技术在函数式编程中非常常见，有助于构建更灵活和可复用的代码。通过实现一个通用的柯里化函数，可以轻松地将任意函数转换为柯里化函数，充分利用柯里化的优势。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"创建柯里化函数的通用方式。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function curry(fn) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var args = Array.prototype.slice.call(arguments, 1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var innerArgs = Array.prototype.slice.call(arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var finalArgs = args.concat(innerArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return fn.apply(null, finalArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"curry()函数的主要工作就是将被返回函数的参数进行排序。注意这个函数并没有考虑到执行环境，所以调用apply()时第一个参数是null。curry()函数可以按以下方式应用：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function add(num1, num2) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return num1 + num2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var curriedAdd = curry(add, 5);")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(curriedAdd(3)); //8")]),l(`
`),n("span",{class:"line"},[n("span",null,"你也可以像下面例子这样给出所有的函数参数：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function add(num1, num2) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return num1 + num2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"var curriedAdd = curry(add, 5, 12);")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(curriedAdd()); //17")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"函数柯里化还常常作为函数绑定的一部分包含在其中，构造出更为复杂的bind()函数。例如：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function bind(fn, context) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var args = Array.prototype.slice.call(arguments, 2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var innerArgs = Array.prototype.slice.call(arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var finalArgs = args.concat(innerArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return fn.apply(context, finalArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    };")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"对curry函数的主要更改在于传入的参数个数，以及它如何影响代码的结果。")]),l(`
`),n("span",{class:"line"},[n("span",null,"curry()仅仅接受要包裹的函数作为参数，而bind同时接受函数和一个object对象。这表示给被绑定的函数的参数是从第三个开始而不是第二个。另一处更改是在倒数第3行将")]),l(`
`),n("span",{class:"line"},[n("span",null,"object对象传给apply。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当使用bind()时，它会返回绑定到给定环境的函数，并且可能它其中某些函数參数已经被设好。当你想除了event对象再额外给事件处理程序传递参数时，这非常有用，例如：")]),l(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),l(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (name, event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'        alert(this.message + ":" + name + ":" + event.type);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),l(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler, "my-btn"));')]),l(`
`),n("span",{class:"line"},[n("span",null,"ECMAScript5的bind方法也实现函数柯里化，只要在this的值之后再传入另一个参数即可。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var handler = {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    message: "Event handled",')]),l(`
`),n("span",{class:"line"},[n("span",null,"    handleClick: function (name, event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'        alert(this.message + ":" + name + ":" + event.type);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,'var btn = document.getElementById("my-btn");')]),l(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler, "my-btn"));')]),l(`
`),n("span",{class:"line"},[n("span",null,"JavaScript中的柯里化函数和绑定函数提供了强大的动态函数创建功能。使用bind()还是curry要根据是否需要object对象响应来决定。它们都能用于创建复杂算法和功能，当然两者都不应滥用，因为每个函数都会带来额外的开销。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==函数柯里化指的是一种技术，可以将多参数函数转换单参数函数。==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==我们写一个工厂方法，可将多参数函数转成单参数函数。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"function curry(fn, args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取函数需要的参数长度")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let length = fn.length;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    args = args || [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        let subArgs = args.slice(0);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 拼接得到现有的所有参数")]),l(`
`),n("span",{class:"line"},[n("span",null,"        for (let i = 0; i < arguments.length; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            subArgs.push(arguments[i]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 判断参数的长度是否已经满足函数所需参数的长度")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (subArgs.length >= length) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            // 如果满足，执行函数")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return fn.apply(this, subArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            // 如果不满足，递归返回科里化的函数，等待参数的传入")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return curry.call(this, fn, subArgs);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// es6 实现")]),l(`
`),n("span",{class:"line"},[n("span",null,"function curry(fn, ...args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const y=a(i,[["render",u]]);export{h as __pageData,y as default};
