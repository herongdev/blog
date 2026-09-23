import{_ as l,o as e,c as i,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Yielding Processes","description":"运行在浏览器中的JavaScript都被分配了一个确定数最的资源。不同于桌面应用往往能够随意控制他们要的内存大小和处理器时间，JavaScript被严格限制了，以防止恶意的Web程序员把用户的计算机搞挂了。 其中一个限制是长时间运行脚本的制约，如果代码运行超过特定的时间或者特定语。","frontmatter":{"title":"Yielding Processes","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","实战与性能"],"description":"运行在浏览器中的JavaScript都被分配了一个确定数最的资源。不同于桌面应用往往能够随意控制他们要的内存大小和处理器时间，JavaScript被严格限制了，以防止恶意的Web程序员把用户的计算机搞挂了。 其中一个限制是长时间运行脚本的制约，如果代码运行超过特定的时间或者特定语。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/经典方法/Yielding Processes.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/08-实战与性能/Yielding Processes.md","filePath":"posts/JavaScript系统教程/08-实战与性能/Yielding Processes.md"}'),p={name:"posts/JavaScript系统教程/08-实战与性能/Yielding Processes.md"};function t(c,a,r,u,o,d){return e(),i("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"yielding-processes",tabindex:"-1"},[n("Yielding Processes "),s("a",{class:"header-anchor",href:"#yielding-processes","aria-label":'Permalink to "Yielding Processes"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“Yielding Processes”的核心思路，并能把它用于实际开发或面试表达。 运行在浏览器中的JavaScript都被分配了一个确定数最的资源。不同于桌面应用往往能够随意控制他们要的内存大小和处理器时间，JavaScript被严格限制了，以防止恶意的Web程序员把用户的计算机搞挂了。")]),s("p",null,"其中一个限制是长时间运行脚本的制约，如果代码运行超过特定的时间或者特定语句数量，就不让它继续执行。如果代码达到了这个限制，会弹出一个浏览器错误的对话框，吿诉用户某个脚本会用过长的时间执行，询何是允许其继续执行还是停止它。所有JavaScript开发人员的目标就是，确保用户永远不会在浏览器中看到这个令人费解的对话框。定时器是绕开此限制的方法之一。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"脚本长时间运行的问题通常是由两个原因之一造成的：过长的、过深嵌套的函数调用或者是进行大量处理的循环。这两者中，后者是较为容易解决的冋题。长时间运行的循环通常遵循以下模式：")]),n(`
`),s("span",{class:"line"},[s("span",null,"for (var i = 0, len = data.length; i < len; i++) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    process(data[i]);")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"这个模式的问题在于要处理的项目的数量在运行前是不可知的。如果完成processor()要花100ms，只有2个项目的数组可能不会造成影响，但是10个的数组可能会导致脚本要运行一秒钟才能完成。数组中的项目数最直接关系到执行完该循环的时间长度。同时由于JavaScript的执行是一个阻塞操作，脚本运行所花时间越久，用户无法与页面交互的时间也越久。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在展开该循环之前，你需要回答以下两个重要的问题。")])])])]),s("p",null,"该处理是否必须同步完成？如果这个数据的处理会造成其他运行的阻塞，那么最好不要改动它。不过，如果你对这个何题的回答确定为“否”，那么将某些处理推迟到以后是个不错的备选项。"),s("p",null,"数据是否必须按顺序完成？通常，数组只是对项目的组合和迭代的一种简便的方法而无所谓顺序。如果项目的顺序不是非常重要，那么可能可以将某些处理推迟到以后。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"当你发现某个循环占用了大量时间，同时对于上述两个问题，你的回答都是“否”，那么你就可以使用定时器分割这个循环。这是一种叫做数组分块(array chunking)的技术，小块小块地处理数组，通常每次一小块。基本的思路是为要处理的项目创建一个队列，然后使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。基本的模式如下：")]),n(`
`),s("span",{class:"line"},[s("span",null,"setTimeout(function () {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 取出下一个条目并处理")]),n(`
`),s("span",{class:"line"},[s("span",null,"    var item = array.shift();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    process(item);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 若还有条目，再设置另一个定时器")]),n(`
`),s("span",{class:"line"},[s("span",null,"    if (array.length > 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        setTimeout(arguments.callee, 100);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}, 100);")]),n(`
`),s("span",{class:"line"},[s("span",null,'在数组分块模式中，array变量本质上就是一个“待办事宜"列表，它包含了要处理的项目。使用shift()方法可以获取队列中下一个要处理的项目，然后将其传递给某个函数。如果在队列中还有其他项目，则设置另一个定时器，并通过arguments.callee调用同一个匿名函数。要实现数组分块非常简单，可以使用以下函数。')]),n(`
`),s("span",{class:"line"},[s("span",null,"function chunk(array, process, context) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    setTimeout(function () {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        var item = array.shift();")]),n(`
`),s("span",{class:"line"},[s("span",null,"        process.call(context, item);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (array.length > 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            setTimeout(arguments.callee, 100);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }, 100);")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"chunk方法接受三个参数：要处理的项目的数组，用于处理项目的函数，以及可选的运行该函数的环境。函数内部用了之前描述过的基本模式，通过call()调用的process()函数，这样可以设置一个合适的执行环境(如果必须)。定时器的时间间隔设置为了100ms，使得JavaScript进程有时间在处理项目的事件之间转入空闲。你可以根据你的需要更改这个间隔大小，不过100ms在大多数情况下效果不错。可以按如下所示使用该函数：")]),n(`
`),s("span",{class:"line"},[s("span",null,"var data = [12, 123, 1234, 453, 436, 23, 23, 5, 4123, 45, 346, 5634, 2234, 345, 342];")]),n(`
`),s("span",{class:"line"},[s("span",null,"function printValue(item) {")]),n(`
`),s("span",{class:"line"},[s("span",null,'    var div = document.getElementById("myDiv");')]),n(`
`),s("span",{class:"line"},[s("span",null,'    div.innerHTML += item + "<br>";')]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"chunk(data, printValue);")]),n(`
`),s("span",{class:"line"},[s("span",null,"个例子使用printvalue ()函数将data数组中的每个值输出到一个<div>元素。由于函数处在")]),n(`
`),s("span",{class:"line"},[s("span",null,"全局作用域内，因此无需给chunk传递context对象。")]),n(`
`),s("span",{class:"line"},[s("span",null,"必须当心的地方是，传递给chunk的数组是用作一个队列的，因此当处理数据的同时，数组中的条目也在改变。如果你想保持原数组不变，则应该将该数组的克隆传递给chunk()，如下例所示：")]),n(`
`),s("span",{class:"line"},[s("span",null,"chunk(data.concat(), printValue);")]),n(`
`),s("span",{class:"line"},[s("span",null,"当不传递任何参数调用某个数组的concat()方法时，将返回和原来数组中项目一样的数组。这样你就可以保证原数组不会被该函数更改。数组分块的重要性在于它可以将多个项目的处理在执行队列上分开，在每个项目处理之后，给予其他的浏览器处理机会运行，这样就可能避免长时间运行脚本的错误。")])])])]),s("p",null,"一旦某个函教需要花50ms以上的时间完成，那么最好看看能否将任务分割为一系列可以使用定时器的小任务。")],-1)])])}const v=l(p,[["render",t]]);export{h as __pageData,v as default};
