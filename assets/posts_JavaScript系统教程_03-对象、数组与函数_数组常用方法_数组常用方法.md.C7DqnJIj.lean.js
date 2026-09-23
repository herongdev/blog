import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"数组常用方法","description":"数组共有 10 类 22种方法： 对象继承方法 数组是一种特殊的对象，继承了对象 Object 的 toString() 、 toLocaleString() 和 valueOf() 方法 【 toString() 】 如果需要转换的元素是数组，则继续将数组中的每个元素调用 to。","frontmatter":{"title":"数组常用方法","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"数组共有 10 类 22种方法： 对象继承方法 数组是一种特殊的对象，继承了对象 Object 的 toString() 、 toLocaleString() 和 valueOf() 方法 【 toString() 】 如果需要转换的元素是数组，则继续将数组中的每个元素调用 to。","sidebarWeight":97,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-数组/数组常用方法/数组常用方法.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/数组常用方法/数组常用方法.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/数组常用方法/数组常用方法.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/数组常用方法/数组常用方法.md"};function c(u,l,t,r,o,h){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"数组常用方法",tabindex:"-1"},[s("数组常用方法 "),n("a",{class:"header-anchor",href:"#数组常用方法","aria-label":'Permalink to "数组常用方法"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“数组常用方法”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[s("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 ==数组共有====10====类====22种方法：== "),n("strong",null,"对象继承方法"),s(" ==数组是一种特殊的对象，继承了对象====Object====的====toString()====、====toLocaleString()====和====valueOf()====方法== "),n("strong",null,[s("【"),n("strong",null,[n("strong",null,"toString()")]),s("】")])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==先将数组中的每个元素调用====toString()====方法转换成字符串；==")])])])]),n("p",null,"==如果需要转换的元素是数组，则继续将数组中的每个元素调用====toString()====方法转换成字符串，直到全部元素都为字符串为止。=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==最后将字符串拼接起来。==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==该方法的返回值与不传参数调用join()方法返回的字符串相同。==")])])])]),n("p",null,"==由于alert()要接收字符串参数，它会在后台调用toString()方法，会得到与toString()方法相同的结果=="),n("p",null,"| |"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"alert([1,2,3]);//'1,2,3'")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**【****toLocaleString()****】**")])])])]),n("p",null,"==toLocaleString()====是====toString()====方法的本地化版本，它经常也会返回与====toString()====方法相同的值，但也不总是如此。因为，它调用元素的是====toLocaleString()====方法将每个数组元素转化为字符串=="),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,"```"),n("td")]),n("tr",null,[n("td",null,"1"),n("td")]),n("tr",null,[n("td",null,"2"),n("td")]),n("tr",null,[n("td",null,"3"),n("td")]),n("tr",null,[n("td",null,"4"),n("td")]),n("tr",null,[n("td",null,"5"),n("td")]),n("tr",null,[n("td",null,"6"),n("td")]),n("tr",null,[n("td",null,"7"),n("td")]),n("tr",null,[n("td",null,"8"),n("td")]),n("tr",null,[n("td",null,"9"),n("td")]),n("tr",null,[n("td",null,"10"),n("td")]),n("tr",null,[n("td",null,"11"),n("td")]),n("tr",null,[n("td",null,"12"),n("td")]),n("tr",null,[n("td",null,"13"),n("td")]),n("tr",null,[n("td",null,"14"),n("td")]),n("tr",null,[n("td",null,"15"),n("td")]),n("tr",null,[n("td",null,"16"),n("td")]),n("tr",null,[n("td",null,"17"),n("td")]),n("tr",null,[n("td",null,"18"),n("td")]),n("tr",null,[n("td",null,"19"),n("td")])])]),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** person1 = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"toLocaleString: **function**(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 'Nikolaos';")]),s(`
`),n("span",{class:"line"},[n("span",null,"},")]),s(`
`),n("span",{class:"line"},[n("span",null,"toString: **function**(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 'Nicholas';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** person2 = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"toLocaleString: **function**(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 'Grigorios';")]),s(`
`),n("span",{class:"line"},[n("span",null,"},")]),s(`
`),n("span",{class:"line"},[n("span",null,"toString: **function**(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 'Greg';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** people = [person1,person2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(people.toString());//'Nicholas,Greg'")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(people.toLocaleString());//'Nikolaos,Grigorios'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==如果数组中的某一项的值是====null====或者====undefined====，则该值在====toLocaleString()====和====toString()====方法返回的结果中以空字符串表示=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** colors = [1,undefined,2,**null**,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(colors.toString());//'1,,2,,3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(colors.toLocaleString());//'1,,2,,3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[n("strong",null,[s("【"),n("strong",null,[n("strong",null,"valueOf()")]),s("】")]),s(" ==valueOf()====方法返回数组对象本身==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1, 2, 3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.valueOf());// [1, 2, 3]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.valueOf() **instanceof** Array);//true")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组转换方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****join()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Array.join()====方法是====String.split()====方法的逆向操作，数组继承的====toLocaleString()====和====toString()====方法，在默认情况下都会以逗号分隔的字符形式返回数组项；而====join()====方法可以使用不同的分隔符来构建这个字符串，====join()====方法只接收一个参数，用作分隔符的字符串，然后返回包含所有数组项的字符串==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果不给====join()====方法传入任何值，则使用逗号作为分隔符==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.join());//'1,2,3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.join(' '));//'1 2 3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.join(''));//'123'")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** b = **new** Array(10);")]),s(`
`),n("span",{class:"line"},[n("span",null,"b.join('-');//'---------'，9个连字符组成的字符串")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==若====join()====方法的参数是====undefined====，标准浏览器以逗号为分隔符返回字符串，而====IE7-====浏览器以===='undefined'====为分隔符返回字符串==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"//标准浏览器为'1,2,3';IE7-浏览器为'1undefined2undefined3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.join(undefined));")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==如果数组中的某一项的值是====null====或者====undefined====，则该值在====join()====方法返回的结果中以空字符串表示=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** colors = [1,undefined,2,**null**,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(colors.join());//'1,,2,,3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==该方法也可以用于类数组对象上=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,`console.log(Array.prototype.join.call('hello', '-'));// "h-e-l-l-o"`)]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** obj = { 0: 'a', 1: 'b', length: 2 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(Array.prototype.join.call(obj, '-'));// 'a-b'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==[====注意====]====若对象没有====length====属性，就不是类数组，也就不能调用数组的方法==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** obj = { 0: 'a', 1: 'b' };")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(**typeof** Array.prototype.join.call(obj, '-'));//''")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**栈和队列方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==JS====为数组提供了====push()====和====pop()====方法，实现类似栈的行为；==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==结合使用====shift()====和====push()====方法，实现类似队列的行为，结合====unshift()====和====pop()====方法则实现了队列的反向操作。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**push()****方法**")])])])]),n("p",null,"==可以接收任意数量的参数，把它们逐个添加到数组末尾；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==并返回修改后数组的长度；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==该方法会改变原数组。=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.push(1));//[1] 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.push('a'));//[1,'a'] 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.push(**true**, {}));//[1,'a',true,{}] 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.push([5,6]));//[1,'a',true,{},[5,6]] 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==如果需要合并两个数组，可以使用====apply====方法=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1, 2, 3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** b = [4, 5, 6];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,Array.prototype.push.apply(a, b));//[1,2,3,4,5,6] 6")]),s(`
`),n("span",{class:"line"},[n("span",null,"==[====注意====]====如果使用====call====方法，则会把数组====b====整体看成一个参数==")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1, 2, 3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** b = [4, 5, 6];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,Array.prototype.push.call(a, b));//[1,2,3,[4,5,6]] 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==push()====方法也可以向对象中添加元素，添加后的对象变成类数组对象，即新加入元素的键对应数组的索引，并且对象有一个====length====属性==")])])])]),n("p",null,[s("**pop()**"),n("strong",null,"方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==无参数=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==从数组末尾移除最后一项；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==然后返回移除的项；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==数组====length====减====1====；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==对其它元素无影响；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==会改变原数组；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = ['a', 'b', 'c'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.pop()); // ['a', 'b'] 'c'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==对空数组使用====pop()====方法，不会报错，而是返回====undefined=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.pop()); // [] undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**shift()**"),n("strong",null,"方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==无参数=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==移除数组中的第一个项；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==返回该移除的项；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==其它元素会向前移动，即索引减====1====；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==数组的长度减====1====；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==会改变原数组。=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = ['a', 'b', 'c'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.shift());//['b', 'c'] 'a'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==对空数组使用====shift()====方法，不会报错，而是返回====undefined=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.shift());// [] undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**unshift()**"),n("strong",null,"方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==任意多个参数；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==在数组前端添加任意个项；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==返回新数组长度；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==数组长度加====1====；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==其它数组元素往后移动，即索引加====1====；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==改变原数组。=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = ['a', 'b', 'c'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.unshift('x')); //['x', 'a', 'b', 'c'] 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==unshift()====传入多个参数时，参数是一次性插入的而非一次一个地插入。这意味着数组中元素的顺序和它们在参数列表中的顺序一致。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = ['a', 'b', 'c'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.unshift('x','y','z')); //['x','y','z','a', 'b', 'c'] 6")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==[====注意====]====在====IE7-====浏览器中，====unshift()====方法返回的总是====undefined=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"//标准浏览器下，返回[1] 1；而IE7-浏览器下，返回[1] undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.unshift(1));")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[n("strong",null,"数组排序方法"),s(" **reverse()**"),n("strong",null,"方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==无参数；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==用于反转数组的顺序；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==返回经过排序之后的数组；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==数组元素索引改变（正中间元素不变）；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==原数组顺序发生改变；=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = [1,2,4,3,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(array,array.reverse());//[5,3,4,2,1] [5,3,4,2,1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**sort()**"),n("strong",null,"方法")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==默认情况下，按字符串升序排列数组项，====sort====方法会调用每个数组项的====toString()====方法，然后比较得到的字符串排序；==")])])])]),n("p",null,"==返回经过排序之后的数组=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==而原数组顺序也发生改变=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"==如果数组包含====undefined====元素，则被排到数组的尾部=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = ['3',3,undefined,2,'2'];")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(array,array.sort());//["2", 2, "3", 3, undefined] ["2", 2, "3", 3, undefined]')]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==sort()====方法可以接受一个比较函数作为参数，以便指定哪个值在哪个值的前面。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**function** compare(value1,value2){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(value1 < value2){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}**else** **if**(value1 > value2){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}**else**{")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = ['5px',50,1,10];")]),s(`
`),n("span",{class:"line"},[n("span",null,"//当数字与字符串比较大小时，字符串'5px'会被转换成NaN，这样结果就是false")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(array.sort(compare));//["5px",1, 10, 50]')]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==对于数值类型或====valueOf()====方法会返回数值类型的对象类型，比较函数可以简化=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**function** compare(value1,value2){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** value1 - value2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = ['5px',50,1,10];")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(array.sort(compare));//["5px",1,10,50]')]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = [5,50,1,10];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(array.sort(compare));//[1,5,10,50]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"==如果对一个字符串数组执行不区分大小写的字母表排序，比较函数首先将参数转化为小写字符串再开始比较=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"a = ['ant','Bug','cat','Dog'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.sort();//['Bug','Dog','ant','cat'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.sort(**function**(s,t){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = s.toLowerCase();")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** b = t.toLowerCase();")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(a < b)**return** -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(a > b)**return** 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});//['ant','bug','cat','dog']")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组拼接方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****concat()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==concat()====方法基于当前数组中的所有项创建一个新数组，先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。所以====concat()====不影响原数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果不给====concat()====方法传递参数时，它只是复制当前的数组；如果参数是一个或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中；如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [1,2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,numbers.concat(3,4));//[1,2] [1,2,3,4]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,numbers.concat([5,4,3],[3,4,5],1,2));//[1,2] [1,2,5,4,3,3,4,5,1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,numbers.concat(4,[5,[6,7]]));//[1,2] [1,2,4,5,[6,7]]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果不提供参数，====concat()====方法返回当前数组的一个浅拷贝。所谓====“====浅拷贝====”====，指的是如果数组成员包括复合类型的值（比如对象），则新数组拷贝的是该值的引用==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [1,2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** newNumbers = numbers.concat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[1,2] [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"numbers[0] = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[0,2] [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [[1,2]];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** newNumbers = numbers.concat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[[1,2]] [[1,2]]")]),s(`
`),n("span",{class:"line"},[n("span",null,"numbers[0][0] = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[[0,2]] [[0,2]]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==concat()====方法也可以用于将对象合并为数组，但是必须借助====call()====方法== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** newArray = Array.prototype.concat.call({ a: 1 }, { b: 2 })")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(newArray);// [{ a: 1 }, { b: 2 }]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(newArray[0].a);//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**创建子数组方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****slice()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==slice()====方法基于当前数组中的一个或多个项创建一个新数组，接受一个或两个参数，即要返回项的起始和结束位置，最后返回新数组，所以====slice()====不影响原数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==slice(start,end)====方法需要两个参数====start====和====end====，返回这个数组中从====start====位置到====(====但不包含====)end====位置的一个子数组；如果====end====为====undefined====或不存在，则返回从====start====位置到数组结尾的所有项==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果====start====是负数，则====start = max(length + start,0)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果====end====是负数，则====end = max(length + end,0)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==start====和====end====无法交换位置==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果没有参数，则返回原数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(2));//[3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(2,undefined));//[3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(2,3));//[3]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(2,1));//[]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(-3));//-3+5=2 -> [3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(-8));//max(5 + -8,0)=0 -> [1,2,3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(0,-3));//-3+5=2 -> [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(-2,-1));//-2+5=3;-1+5=4; -> [4]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==如果不提供参数，====slice()====方法返回当前数组的一个浅拷贝== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [1,2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** newNumbers = numbers.slice();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[1,2] [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"numbers[0] = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[0,2] [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [[1,2]];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** newNumbers = numbers.slice();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[[1,2]] [[1,2]]")]),s(`
`),n("span",{class:"line"},[n("span",null,"numbers[0][0] = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers,newNumbers);//[[0,2]] [[0,2]]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==slice()====方法涉及到====Number()====转型函数的隐式类型转换，当====start====被转换为====NaN====时，相当于====start = 0====；当====end====被转换为====NaN====时====(end====为====undefined====除外====)====，则输出空数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** numbers = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(NaN));//[1,2,3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(0,NaN));//[]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(**true**,[3]));//[2,3]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice(**null**,undefined));//[1,2,3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice({}));//[1,2,3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(numbers.slice('2',[5]));//[3,4,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==可以使用====slice()====方法将类数组对象变成真正的数组== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = Array.prototype.slice.call(arrayLike);")]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })// ['a', 'b']")]),s(`
`),n("span",{class:"line"},[n("span",null,'Array.prototype.slice.call(document.querySelectorAll("div"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.slice.call(arguments);")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组删改方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****splice()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==splice()====和====slice()====拥有非常相似的名字，但它们的功能却有本质的区别。====splice()====方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，该方法会改变原数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==splice()====返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==splice()====的第一个参数====start====指定了插入或删除的起始位置。如果====start====是负数，则====start = max(length + start,0)====；如果====start====是====NaN====，则相当于====start = 0==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果只提供一个元素，相当于将原数组在指定位置拆分成两个数组==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice());// [1,2,3,4,5,6,7,8] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(4));// [1,2,3,4] [5,6,7,8]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(-4));//-4+8=4; [1,2,3,4] [5,6,7,8]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(-9));//max(-9+8,0)=0 [] [1,2,3,4,5,6,7,8]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(NaN));//[] [1,2,3,4,5,6,7,8]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==第二个参数====number====指定了应该从数组中删除的元素的个数。如果省略第二个参数，从起始点开始到数组结尾的所有元素都将被删除。如果====number====是负数或====NaN====或====undefined====，则====number=0====，因此不删除元素==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(0,2));// [3,4,5,6,7,8] [1,2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(10,2));// [1,2,3,4,5,6,7,8] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(1,100));// [1] [2,3,4,5,6,7,8]")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(1,-5));//[1,2,3,4,5,6,7,8] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(1,NaN));//[1,2,3,4,5,6,7,8] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5,6,7,8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(1,undefined));//[1,2,3,4,5,6,7,8] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==如果后面还有更多的参数，则表示这些就是要被插入数组的新元素== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(2,0,'a','b'));//[1,2,'a','b',3,4,5] []")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a,a.splice(2,2,[1,2],3));//[1,2,[1,2],3,3,4,5] ['a','b']")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组位置方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==ES5====为数组实例添加了两个位置方法：====indexOf()====、====lastIndexOf()==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****indexOf()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==indexOf(search,start)====方法接收====search====和====start====两个参数，返回====search====首次出现的位置，如果没有找到则返回====-1==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==search====参数表示要搜索的项；使用严格相等运算符（===========）进行比较==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [1,2,3,'1','2','3'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('2'));//4")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf(3));//2")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf(0));//-1")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==start====参数表示该搜索的开始位置，该方法会隐式调用====Number()====转型函数，将====start====非数字值====(undefined====除外====)====转换为数字。若忽略该参数或该参数为====undefined====或====NaN====时，====start = 0==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = ['a','b','c','d','e','a','b'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',undefined));//0")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',NaN));//0")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',1));//5")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',**true**));//5")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',-1));//max(0,-1+7)=6; -1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',-5));//max(0,-5+7)=2; 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.indexOf('a',-50));//max(0,-50+7)=0; 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** person = {name: 'Nicholas'};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** people = [{name: 'Nicholas'}];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** morePeople = [person];")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(people.indexOf(person));//-1,因为person和people[0]虽然值相同，但是是两个引用")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(morePeople.indexOf(person));//0，因为person和morepeople[0]是同一个引用")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(morePeople.indexOf({name: 'Nicholas'}));//-1,因为不是同一个引用")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**indexOf()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.indexOf != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.indexOf = **function** (searchElement, fromIndex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** index = -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"fromIndex = fromIndex * 1 \\| 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = **this**.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if** (k >= fromIndex && **this**[k] === searchElement) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"index = k;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**break**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** index;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****lastIndexOf()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==与====indexOf()====不同，====lastIndexOf()====从右向左查找==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==lastIndexOf(search,start)====方法接收====search====和====start====两个参数，返回====search====第一次出现的位置，如果没有找到则返回====-1==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==search====参数表示要搜索的项；使用严格相等运算符（===========）进行比较==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [1,2,3,'1','2','3'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('2'));//4")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf(3));//2")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf(0));//-1")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==start====表示该搜索的开始位置，该方法会隐式调用====Number()====转型函数，将====start====非数字值====(undefined====除外====)====转换为数。若忽略该参数或该参数为====undefined====或====NaN====时，====start = 0==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==与字符串的====lastIndexOf()====方法不同，当====search====方法为负数时，====search = max(0,length+search)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = ['a','b','c','d','e','a','b'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b'));//6")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',undefined));//-1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('a',undefined));//0")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',NaN));//-1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',1));//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',-1));//max(0,-1+7)=6; 6")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',-5));//max(0,-5+7)=2; 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(arr.lastIndexOf('b',-50));//max(0,-50+7)=0; -1")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==【====tips====】返回满足条件的项的所有索引值== ==可以通过循环调用====indexOf()====或====lastIndexOf()====来找到所有匹配的项== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**function** allIndexOf(array,value){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** result = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** pos = array.indexOf(value);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(pos === -1){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**while**(pos > -1){")]),s(`
`),n("span",{class:"line"},[n("span",null,"result.push(pos);")]),s(`
`),n("span",{class:"line"},[n("span",null,"pos = array.indexOf(value,pos+1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = [1,2,3,3,2,1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(allIndexOf(array,1));//[0,5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**lastIndexOf()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.lastIndexOf != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.lastIndexOf = **function** (searchElement, fromIndex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** index = -1, length = **this**.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,"fromIndex = fromIndex * 1 \\| length - 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = length - 1; k > -1; k-=1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if** (k <= fromIndex && **this**[k] === searchElement) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"index = k;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**break**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** index;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组归并方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==数组归并方法包括====reduce()====和====reduceRight()====方法两种，它们使用指定的函数将数组元素进行组合，生成单个值。这在函数式编程中是常见的操作，也可以称为====“====注入====”====和====“====折叠====”==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****reduce()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==reduce()====方法需要两个参数。第一个是执行化简操作的函数。化简函数的任务就是用某种方法把两个值组合或化简为一个值，并返回化简后的值==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==化简函数接受四个参数，分别是：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==【====1====】初始变量，默认为数组的第一个元素值。函数第一次执行后的返回值作为函数第二次执行的初始变量，依次类推==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==【====2====】当前变量，如果指定了第二个参数，则该变量为数组的第一个元素的值，否则，为第二个元素的值==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==【====3====】当前变量对应的元素在数组中的索引====(====从====0====开始====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==【====4====】原数组对象==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==化简函数的这四个参数之中，只有前两个是必须的，后两个则是可选的==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"values.reduce(**function**(prev, cur, index, array){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//todo")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==reduce()====方法第二个====(====可选====)====的参数是一个传递给函数的初始值== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"17")]),s(`
`),n("span",{class:"line"},[n("span",null,"18")]),s(`
`),n("span",{class:"line"},[n("span",null,"19")]),s(`
`),n("span",{class:"line"},[n("span",null,"20")]),s(`
`),n("span",{class:"line"},[n("span",null,"21")]),s(`
`),n("span",{class:"line"},[n("span",null,"22")]),s(`
`),n("span",{class:"line"},[n("span",null,"23")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** sum = a.reduce(**function**(x,y){**return** x+y},0);//数组求和")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** product = a.reduce(**function**(x,y){**return** x*y},1);//数组求积")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** max = a.reduce(**function**(x,y){**return** (x>y)?x:y;});//求最大值")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4, 5].reduce(**function**(prev, cur){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(prev, cur)")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev+ cur;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 6 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 10 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"//最后结果：15")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4, 5].reduce(**function**(prev, cur){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(prev, cur);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev + cur;")]),s(`
`),n("span",{class:"line"},[n("span",null,"},0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 0 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 6 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 10 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"//最后结果：15")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==[====注意====]====reduce()====方法的返回结果类型和传入的初始值相同== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4, 5].reduce(**function**(prev, cur){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(prev.sum, cur);")]),s(`
`),n("span",{class:"line"},[n("span",null,"prev.sum = prev.sum + cur;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev;")]),s(`
`),n("span",{class:"line"},[n("span",null,"},{sum:0});")]),s(`
`),n("span",{class:"line"},[n("span",null,"//0 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"//6 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"//10 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"//Object {sum: 15}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==利用====reduce()====方法，可以写一个数组求和的====sum====方法== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.sum = **function** (){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** **this**.reduce(**function** (prev, cur){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev + cur;")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"[3,4,5,6,10].sum();// 28")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==由于====reduce====方法依次处理每个元素，所以实际上还可以用它来搜索某个元素。比如，找出长度最长的数组元素==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**function** findLongest(entries) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** entries.reduce(**function** (prev, cur) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** cur.length > prev.length ? cur : prev;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, '');")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(findLongest([1,2,3,'ab',4,'bcd',5,6785,4]));//'bcd'")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==可以利用====reduce()====方法，实现二维数组的扁平化== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** matrix = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2],")]),s(`
`),n("span",{class:"line"},[n("span",null,"[3, 4],")]),s(`
`),n("span",{class:"line"},[n("span",null,"[5, 6]")]),s(`
`),n("span",{class:"line"},[n("span",null,"];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 二维数组扁平化")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** flatten = matrix.reduce(**function** (prev, cur) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev.concat(cur);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(flatten); // [1, 2, 3, 4, 5, 6]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==在空数组上，不带初始值参数调用====reduce()====将导致类型错误异常。如果调用它的时候只有一个值====——====数组只有一个元素并且没有指定初始值，或者有一个空数组并且指定一个初始值====——reduce()====只是简单地返回那个值而不会调用化简函数==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr.reduce(**function**(){});//Uncaught TypeError: Reduce of empty array with no initial value")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr.reduce(**function**(){},1);//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**reduce()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.reduce != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.reduce = **function** (callback, initialValue ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** previous = initialValue, k = 0, length = **this**.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** initialValue === "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"previous = **this**[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"k = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** callback === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (k; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.hasOwnProperty(k) && (previous = callback(previous, **this**[k], k, **this**));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** previous;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****reduceRight()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==reduceRight()====的工作原理和====reduce()====一样，不同的是它按照数组索引从高到低（从右到左）处理数组，而不是从低到高==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** values = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** sum = values.reduceRight(**function**(prev, cur, index, array){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(prev,cur);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** prev + cur;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(sum);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//5 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"//9 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"//12 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"//14 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//15")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**reduceRight()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.reduceRight != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.reduceRight = **function** (callback, initialValue ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** length = **this**.length, k = length - 1, previous = initialValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** initialValue === "undefined") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"previous = **this**[length - 1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"k--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** callback === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (k; k > -1; k-=1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.hasOwnProperty(k) && (previous = callback(previous, **this**[k], k, **this**));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** previous;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组迭代方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==ECMAScript5====为数组定义了====5====个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象====——====影响====this====的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响访问的返回值==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**function**(item,index,array){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//todo")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[n("strong",null,[s("【"),n("strong",null,[n("strong",null,"map()")]),s("】")]),s(" ==map()====方法对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"//f是array的每一个元素调用的函数。它的返回值成为返回数组的元素；o是f调用时的可选this值")]),s(`
`),n("span",{class:"line"},[n("span",null,"array.map(f,o);")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1,2,3].map(**function**(item,index,arr){**return** item*item});//[1,4,9]")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1,2,3].map(**function**(item,index,arr){**return** item*index});//[0,2,6]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==map()====方法还可以接受第二个参数，表示回调函数执行时====this====所指向的对象== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = ['a','b','c'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1,2].map(**function**(item,index,arr){**return** **this**[item]},arr);//['b','c']")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==在实际使用的时候，可以利用====map()====方法方便获得对象数组中的特定属性值== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** users = [{name:'t1',email:'t1@qq.com'},{name:'t2',email:'t2@qq.com'},{name:'t3',email:'t3@qq.com'}];")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(users.map(**function**(item,index,arr){**return** item.email}));//["t1@qq.com", "t2@qq.com", "t3@qq.com"]')]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**map()**"),n("strong",null,"方法还可以用于类数组对象"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("Array.prototype.map.call('abc',"),n("strong",null,"function"),s("(item,index,arr){"),n("strong",null,"return"),s(' item.toUpperCase()});//["A", "B", "C"]')]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("==对于稀疏数组，====map()====方法不会在实际上不存在元素的序号上调用函数== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.map(**function**(item,index,arr){**return** item*2;}));//[2, 2: 6]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**map()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.map != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.map = **function** (fn, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** fn === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = **this**.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr.push(fn.call(context, **this**[k], k, **this**));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** arr;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****forEach()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==forEach()====方法对数组中的每一项运行给定函数，这个方法没有返回值。本质上与====for====循环迭代数组一样。如果需要有返回值，一般使用====map====方法==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1,2,3,4].forEach(**function**(item,index,arr){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(item)")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//2")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3")]),s(`
`),n("span",{class:"line"},[n("span",null,"//4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==类似于如下的====for====循环== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** array = [1, 2, 3, 4];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = array.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(array[k]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**使用****forEach()**"),n("strong",null,"方法实现简单的加法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** sum = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4].forEach(**function** (item, index, array) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"sum += item;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(sum);//10")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==forEach()====方法除了接受一个必须的回调函数参数，第二个参数还可以接受一个可选的上下文参数====(====改变回调函数里面的====this====指向====)== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** out = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3].forEach(**function**(elem){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.push(elem * elem);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, out);")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(out);// [1, 4, 9]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==第二个参数对于多层====this====非常有用，因为多层====this====通常指向是不一致的，可以使用====forEach()====方法的第二个参数固定====this==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** obj = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: '张三',")]),s(`
`),n("span",{class:"line"},[n("span",null,"times: [1, 2, 3],")]),s(`
`),n("span",{class:"line"},[n("span",null,"print: **function** () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该this指向obj")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.times.forEach(**function** (n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该this指向window")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj.print();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** obj = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: '张三',")]),s(`
`),n("span",{class:"line"},[n("span",null,"times: [1, 2, 3],")]),s(`
`),n("span",{class:"line"},[n("span",null,"print: **function** () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该this指向obj")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.times.forEach(**function** (n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//该this同样指向obj")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"},**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj.print();")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**forEach()**"),n("strong",null,"循环可以用于类数组对象"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** str = 'abc';")]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.forEach.call(str, **function**(item, index, array) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log( item + ':' + index);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"//a:0")]),s(`
`),n("span",{class:"line"},[n("span",null,"//b:1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//c:2")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==与====for====循环不同，对于稀疏数组，====forEach()====方法不会在实际上不存在元素的序号上调用函数==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**delete** a[1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for**(**var** i = 0; i < a.length; i++){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a[i]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.forEach(**function**(item,index,arr){console.log(item)});")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==forEach()====方法无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有像====for====循环中使用的相应的====break====语句。如果要提前终止，必须把====forEach()====方法放在一个====try====块中，并能抛出一个异常==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"13")]),s(`
`),n("span",{class:"line"},[n("span",null,"14")]),s(`
`),n("span",{class:"line"},[n("span",null,"15")]),s(`
`),n("span",{class:"line"},[n("span",null,"16")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for**(**var** i = 0; i < 5; i++){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(i == 2) **break**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);//2")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.forEach(**function**(item,index,arr){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(index == 2) **break**;//Uncaught SyntaxError: Illegal break statement")]),s(`
`),n("span",{class:"line"},[n("span",null,"}));")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.forEach(**function**(item,index,arr){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**try**{")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(item == 2) **throw** **new** Error;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}**catch**(e){")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(item);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**forEach()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(**typeof** Array.prototype.forEach != 'function'){")]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.forEach = **function**(fn,context){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for**(**var** k = 0,length = **this**.length; k < length; k++){")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if**(**typeof** fn === 'function' && Object.prototype.hasOwnProperty.call(**this**,k)){")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn.call(context,**this**[k],k,**this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****filter()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==filter()====方法对数组中的每一项运行给定函数，返回该函数会返回====true====的项组成的数组。该方法常用于查询符合条件的所有数组项==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4, 5].filter(**function** (elem) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** (elem > 3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});// [4, 5]")]),s(`
`),n("span",{class:"line"},[n("span",null,`[0, 1, 'a', **false**].filter(Boolean);// [1, "a"]`)]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 3, 4, 5].filter(**function** (elem, index, arr) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** index % 2 === 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});// [1, 3, 5]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==filter()====方法还可以接受第二个参数，指定测试函数所在的上下文对象====(this====对象====)== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** Obj = **function** () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.MAX = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** myFilter = **function** (item) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if** (item > **this**.MAX) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** **true**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [2, 8, 3, 4, 1, 3, 2, 9];")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr.filter(myFilter, **new** Obj());// [8, 4, 9]")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==filter()====会跳过稀疏数组中缺少的元素，它的返回数组总是稠密的，所以可以压缩稀疏数组的空缺==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,,,,3,,,,4];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.length);//10")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** dense = a.filter(**function**(){**return** **true**;})")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(dense,dense.length);//[1,2,3,4] 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==如果要压缩空缺并删除====undefined====和====null====元素，可以这样使用====filter()====方法== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** a = [1,2,,undefined,,3,,**null**,,4];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(a.length);//10")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** dense = a.filter(**function**(item){**return** item!= undefined;})")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(dense,dense.length);//[1,2,3,4] 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("**filter()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.filter != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.filter = **function** (fn, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** fn === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = **this**.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn.call(context, **this**[k], k, **this**) && arr.push(**this**[k]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** arr;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****some()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==some()====方法对数组中的每一项运行给定函数，如果该函数对任一项返回====true====，则返回====true====。并且当且仅当数值中的所有元素调用判定函数都返回====false====，它才返回====false==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.some(**function**(elem, index, arr){**return** elem%2===0;})//true")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.some(isNaN);//false")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==在空数组上调用====some()====方法会返回====false== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("[].some("),n("strong",null,"function"),s("(){});//false")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("**some()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.some != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.some = **function** (fn, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** passed = **false**;")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** fn === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = **this**.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if** (passed === **true**) **break**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"passed = !!fn.call(context, **this**[k], k, **this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** passed;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**【****every()****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==every()====方法对数组中的每一项运行给定函数，如果该函数对每一项都返回====true====，则返回====true====；只要有一项返回====false====，则返回====false==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[?](https://www.jb51.net/article/88899.htm#)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"a = [1,2,3,4,5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.every(**function**(elem, index, arr){elem < 10;})//true")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.every(**function**(elem, index, arr){**return** elem%2 ===0;});//false")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,[s("==在空数组上调用====every()====方法会返回====true== "),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("[].every("),n("strong",null,"function"),s("(){});//true")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[s("**every()**"),n("strong",null,"方法兼容写法"),n("a",{href:"https://www.jb51.net/article/88899.htm#",target:"_blank",rel:"noreferrer"},"?")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),s(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")]),s(`
`),n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"3")]),s(`
`),n("span",{class:"line"},[n("span",null,"4")]),s(`
`),n("span",{class:"line"},[n("span",null,"5")]),s(`
`),n("span",{class:"line"},[n("span",null,"6")]),s(`
`),n("span",{class:"line"},[n("span",null,"7")]),s(`
`),n("span",{class:"line"},[n("span",null,"8")]),s(`
`),n("span",{class:"line"},[n("span",null,"9")]),s(`
`),n("span",{class:"line"},[n("span",null,"10")]),s(`
`),n("span",{class:"line"},[n("span",null,"11")]),s(`
`),n("span",{class:"line"},[n("span",null,"12")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|```")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** Array.prototype.every != "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"Array.prototype.every = **function** (fn, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**var** passed = **true**;")]),s(`
`),n("span",{class:"line"},[n("span",null,'**if** (**typeof** fn === "function") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"**for** (**var** k = 0, length = **this**.length; k < length; k++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**if** (passed === **false**) **break**;")]),s(`
`),n("span",{class:"line"},[n("span",null,"passed = !!fn.call(context, **this**[k], k, **this**);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** passed;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```text")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**总结**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==javascript====数组方法特意定义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正确工作。这====22====种方法中，除了====toString()====和====toLocaleString()====以外的所有方法都是通用的==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==可以改变原数组的方法总共有====7====种：包括====unshift()====、====shift()====、====push()====、====pop()====这====4====种栈和队列方法，====reverse()====和====sort()====这====2====种数组排列方法，数组删改方法====splice()==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==以上所述是小编给大家介绍的====JavaScript====中数组的====22====种方法必学====(====推荐====)====，希望对大家有所帮助，如果大家有任何疑问请给我留言，小编会及时回复大家的。在此也非常感谢大家对脚本之家网站的支持！==")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自 \\<[https://www.jb51.net/article/88899.htm](https://www.jb51.net/article/88899.htm)\\>")])])])])],-1)])])}const v=a(i,[["render",c]]);export{g as __pageData,v as default};
