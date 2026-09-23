import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"导航和打开窗口","description":"使用window.open()方法既可以导航到特定的URL,也可以打开一个新的浏览器窗口。这个 方法可以接收4个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况。","frontmatter":{"title":"导航和打开窗口","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"使用window.open()方法既可以导航到特定的URL,也可以打开一个新的浏览器窗口。这个 方法可以接收4个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况。","sidebarWeight":9,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/BOM/window对象/导航和打开窗口.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/window对象/导航和打开窗口.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/window对象/导航和打开窗口.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/window对象/导航和打开窗口.md"};function t(o,s,c,u,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"导航和打开窗口",tabindex:"-1"},[l("导航和打开窗口 "),n("a",{class:"header-anchor",href:"#导航和打开窗口","aria-label":'Permalink to "导航和打开窗口"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“导航和打开窗口”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 使用window.open()方法既可以导航到特定的URL,也可以打开一个新的浏览器窗口。这个 方法可以接收4个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果为window.open()传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具有该名称的窗口或框架中加载第一个参数指定的URJ看下面的例子。")]),l(`
`),n("span",{class:"line"},[n("span",null,'// 等同于 <a href="http://www.wrox.com" target="topFrame"></a>')]),l(`
`),n("span",{class:"line"},[n("span",null,'window.open("http://www.wrox.com/", "topFrame");')]),l(`
`),n("span",{class:"line"},[n("span",null,"调用这行代码，就如同用户单击了href属性为http://www.wroxxom/, target属性为topFrame的链接。如果有一个名叫topFrame窗口或者框架，就会在该窗口或框架加载这个URL;否则,就会创建一个新窗口并将其命名为topFrame此外，第二个参数也可以是下列任何一个特殊的窗口名称：_self，_parent，_top，_blank。")])])])]),n("p",null,"弾出窗口 如果给window.open()传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页—根据浏览器设置）在不打开新窗口的情况下，会忽略第三个參数。 第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示那些特性。下表列出了可以出现在这个字符串中的设置选项。"),n("p",null,[l('表中所列的部分或全部设置选顼，都可以通过逗号分隔的名值对列表来指定。其中，名值对以等号表示（注意，整个特性字符串中不允许出现空格），如下面的例子所示。 window.open("'),n("a",{href:"http://www.wrox.com/",target:"_blank",rel:"noreferrer"},"http://www.wrox.com/"),l('", "wroxWindow", "height=400,width=400,top=10,left=10,resizable=yes"); 这行代码会打开一个新的可以调整大小的窗口，窗口初始大小为400 x 400像素，并且距屏幕上沿和左边各10像素。')]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"window.open()方法会返回一个指向新窗口的引用。引用的对象与其他window对象大致相似，但我们可以对其进行更多控制。例如，有些浏览器在默认情况下可能不允许我们针对主浏览器窗口调整大小或移动位置，但却允许我们针对通过window.open（）创建的窗口调整大小或移动位置。通过这个返回的对象，可以像操作其他窗口一样操作新打开的窗口，如下所示。")]),l(`
`),n("span",{class:"line"},[n("span",null,'var wroxWin = window.open("http://www.wrox.com/", "wroxWindow",')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "height=400,width=400,top=10,left=10,resizable=yes");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 调整大小")]),l(`
`),n("span",{class:"line"},[n("span",null,"wroxWin.resizeTo(500, 500);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 移动位置")]),l(`
`),n("span",{class:"line"},[n("span",null,"wroxWin.moveTo(100, 100);")]),l(`
`),n("span",{class:"line"},[n("span",null,"调用close()方法还可以关闭新打开的窗口")]),l(`
`),n("span",{class:"line"},[n("span",null,"wroxWin.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"但是，这个方法仅适用于通过window.open()打开的弹出窗口。对于浏览器的主窗口，如果没有得到用户的允许是不能关闭它的。不过，弹出窗口倒是可以调用top.close()在不经用户允许的情况下关闭自己。弹出窗口关闭之后，窗口的引用仍然还在，但除了像下面这样检测其closed属性之外，已经没有其他用处了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"wroxWin.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(wroxWin.closed); //true")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新创建的window对象有一个opener属性，其中保存着打开它的原始窗口对象。这个属性只在弹出窗口中的最外层window对象(top)中有定义，而且指向调用window.open()的窗口或框架。例如：")]),l(`
`),n("span",{class:"line"},[n("span",null,'var wroxWin = window.open("http://www.wrox.com/", "wroxWindow",')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "height=400,width=400,top=10,left=10,resizable=yes");')]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(wroxWin.opener == window); //true")]),l(`
`),n("span",{class:"line"},[n("span",null,"虽然弹出窗口中有一个指针指向打开它的原始窗口，但原始窗中并没有这样的指针指向弹出窗")]),l(`
`),n("span",{class:"line"},[n("span",null,"口。窗口并不跟踪记录它们打开的弹出窗口，因此我们只能在必要的时候自己来手动实现跟踪。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"有些浏览器(如IE8和Chrome)会在独立的进程中运行每个标签页。当一个标签页打开另一个标")]),l(`
`),n("span",{class:"line"},[n("span",null,"签页时，如果两个window对象之间需要彼此通信,那么新标签页就不能运行在独立的进程中。在Chrome中，将新创建的标签页的opener属性设置为null,即表示在单独的进程中运行新标签页，如下所示。")]),l(`
`),n("span",{class:"line"},[n("span",null,'var wroxWin = window.open("http://www.wrox.com/", "wroxWindow",')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "height=400,width=400,top=10,left=10,resizable=yes");')]),l(`
`),n("span",{class:"line"},[n("span",null,"wroxWin.opener = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"将opener属性设置为null就是吿诉浏览器新创建的标签页不需要与打开它的标签页通信，因此可以在独立的进程中运行。标签页之间的联系一旦切断，将没有办法恢复。")])])])]),n("p",null,"安全限制 曽经有一段时间，广吿商在网上使用弹出窗口达到了肆无忌惮的程度。他们经常把弹出窗口打扮成系統对话框的模样，引诱用户去点击其中的广吿。由于看起来像是系统对话框，一般用户很难分辨是其是假。为了解决这个间题，有些浏览器开始在弹出窗口配置方面增加限制。 WindowsXPSP2中的IE6对弹出窗口颇了多方面的安全限制，包括不允许在屏幕之外创建弹出窗口、不允许将弹出窗口移动到屏幕以外、不允许关闭状态栏等。IE7则增加了更多的安全限制，如不允许关闭地址栏、默认情况下不允许移动弹出窗口或调整其大小。Firefox 1从一开始就不支持修改状态栏，因此无论window.open()传入什么样的特性字符申，弹出窗口中都会无一例外地显示状态栏。后来的Firefox 3又强制始终在弹出窗口中显示地址栏。Opera只会在主浏览器窗口中打开弹出窗口，但不允许它们出现在可能与系统对话框混淆的地方。 此外，有的浏览器只根据用户操作来创建弹出窗口。这样一来，在页面尚未加载完成时调用 window.openO的语句根本不会执行，而且还可能会将错误消息显示给用户。换句话说，只能通过单击或者击键来打开弹出窗口。对于那些不是用户有意打开的弹出窗口，Chrome采取了不同的处理方式。它不会像其他浏览器那样简单地屏蔽这些弹出窗口，而是只显示它们的标题栏，并把它们放在浏览器窗口的右下角。"),n("p",null,"在打开计算机硬盘中的网页时，IE会解除对弹出窗口的某些限制。但是在服务器上执行这些代码会受到对弹出窗口的限制。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"弹出窗口屏蔽程序")]),l(`
`),n("span",{class:"line"},[n("span",null,"大多数浏览器都内置有弹出窗口屏蔽程序，而没有内置此类程序的浏览器，也可以安装Yahoo!Toolbar等带有内置屏蔽程序的实用工具。结果就是用户可以将绝大多数不想看到弹出窗口屏蔽掉。于是，在弹出窗口被屏蔽时，就应该考虑两种可能性。如果是浏览器内置的屏蔽程序阻止的弹出窗口，那么window.open()很可能会返回null。此时，只要检测这个返回的值就可以确定弹出窗口是否被屏蔽了，如下面的例子所示。")]),l(`
`),n("span",{class:"line"},[n("span",null,'var wroxWin = window.open("http://www.wrox.com", "_blank");')]),l(`
`),n("span",{class:"line"},[n("span",null,"if (wroxWin == null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    alert("The popup was blocked!");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"如果是浏览器扩展或其他程序阻止的弹出窗口，那么window.open()通常会抛出一个错误。因此，要想准确地检测出弹出窗口是否被屏蔽，必须在检测返回值的同时，将对")]),l(`
`),n("span",{class:"line"},[n("span",null,"var blocked = false;")]),l(`
`),n("span",{class:"line"},[n("span",null,"try {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    var wroxWin = window.open("http://www.wrox.com", "_blank");')]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (wroxWin == null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        blocked = true;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"} catch (ex) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    blocked = true;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (blocked) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    alert("The popup was blocked!");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"在任何情况下，以上代码都可以检测出调用window.open()打开的弹出窗口是不是被屏蔽了。但要注意的是，检测弹出窗口是否被屏蔽只是一方面，它并不会阻止浏览器显示与被屏蔽的弹出窗口有关的消息。")])])])]),n("p",null,"间歇调用和超时调用 JavaScript是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。前者是在指定的时间过后执行代码，而后者则是每隔指定的时间就执行一次代码。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"超时调用需要使用window对象的setTimeout()方法，它接受两个参数：要执行的代码和以毫秒表示的时间(即在执行代码前需要等待多少亲秒)。其中，第一个参数可以是一个包含JavaScript代码的字符串(就和在eval()函数中使用的字符串一样)，也可以是一个函数。例如，下面对setTimeout()的两次调用都会在一秒钟后显示一个警吿框。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 不建议传递字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,`setTimeout("alert('Hello world!') ", 1000);`)]),l(`
`),n("span",{class:"line"},[n("span",null,"// 推荐的调用方式")]),l(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    alert("Hello world!");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}, 1000);")]),l(`
`),n("span",{class:"line"},[n("span",null,"虽然这两种调用方式都没有冋题，但由于传递字符串可能导致性能损失，因此不建议以字符申作为第一个分数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。")]),l(`
`),n("span",{class:"line"},[n("span",null,"JavaScript是一个单线程的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就有一个JavaScript任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeoutOW第二个参数告诉JavaScript再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。")]),l(`
`),n("span",{class:"line"},[n("span",null,"调用seEimeout()之后，该方法会返回一个数值ID，表示超时调用。这个超时调用ID是计划执")]),l(`
`),n("span",{class:"line"},[n("span",null,"行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用clearTimeout方法并将相应的超时调用ID作为参数传递给它，如下所示。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 设置超时调用")]),l(`
`),n("span",{class:"line"},[n("span",null,"var timeoutId = setTimeout(function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    alert("Hello world!");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}, 1000);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 注意：把它取消")]),l(`
`),n("span",{class:"line"},[n("span",null,"clearTimeout(timeoutId);")]),l(`
`),n("span",{class:"line"},[n("span",null,"只要是在指定的时间尚未过去之前调用clearTirneout() ,就可以完全取消超时调用。前面的代码在设置超时调用之后马上又调用了clearTimeout() ,结果就跟什么也没有发生一样。")])])])]),n("p",null,"注意：超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模式下指向window对象，在严格模式下是undefined。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"间歇调用与超时调用类似，只不过它会按照指定的时间间隔重复执行代码，直至间歇调用被取消或者页面被卸载。设置间歇调用的方setinterval(),它接受的参数与setTirneout()相同：要执行的代码(字符申或函数)和每次执行之前需要等待的毫秒数。下面来看一个例子。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 不建议传递字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,`setInterval("alert('Hello world!') ", 10000);`)]),l(`
`),n("span",{class:"line"},[n("span",null,"// 推荐的调用方式")]),l(`
`),n("span",{class:"line"},[n("span",null,"setInterval(function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    alert("Hello world!");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}, 10000);")]),l(`
`),n("span",{class:"line"},[n("span",null,"调用setinterval()方法同样也会返回一个间歇调用ID，该ID可用于在将来某个时刻取消间歇调用。要取消尚未执行的间歇调用，可以使用clearinterval()方法并传入相应的间歇调用ID。取消间歇调用的重要性要远远高于取消超时调用，因为在不加干涉的情况下，间歇调用将会一直执行到页面卸载。以下是一个常见的使用间歇调用的例子。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var num = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var max = 10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var intervalId = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"function incrementNumber() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    num++;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果执行次数达到了max设定的值，则取消后续尚未执行的调用")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (num == max) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        clearInterval(intervalId);")]),l(`
`),n("span",{class:"line"},[n("span",null,'        alert("Done");')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"intervalId = setInterval(incrementNumber, 500);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个例子也可以用超时调用来实现，如下所示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"var num = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var max = 10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"function incrementNumber() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    num++;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果执行资料未达到max设定的值，则设置别一次超时调用")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (num < max) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        setTimeout(incrementNumber, 500);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,'        alert("Done");')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(incrementNumber, 500);")]),l(`
`),n("span",{class:"line"},[n("span",null,"可见，在使用超时调用时，没有必要跟踪超时调用ID,因为每次执行代码之后，如果不再设置另一次超时调用，调用就会自行停止。一般认为，使用超时调用来模拟间歇调用的是一种最佳模式。在开发环境下，很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。而像前面示例中那样使用超时调用，则完全可以避免这一点。所以，最好不要使用间歇调用。")])])])])],-1)])])}const m=a(i,[["render",t]]);export{h as __pageData,m as default};
