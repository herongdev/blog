import{_ as l,o as e,c as p,j as s,a}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"反向引用","description":"围绕“反向引用”整理的概念、示例与实践笔记。","frontmatter":{"title":"反向引用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“反向引用”整理的概念、示例与实践笔记。","sidebarWeight":120,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-正则/概念/反向引用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/概念/反向引用.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/概念/反向引用.md"}'),t={name:"posts/JavaScript系统教程/03-对象、数组与函数/概念/反向引用.md"};function c(i,n,r,u,o,d){return e(),p("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"反向引用",tabindex:"-1"},[a("反向引用 "),s("a",{class:"header-anchor",href:"#反向引用","aria-label":'Permalink to "反向引用"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“反向引用”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在字符模式中，后面的字符可以引用前面的子表达式。实现方法如下：")]),a(`
`),s("span",{class:"line"},[s("span",null,"==\\+== ==数字==")]),a(`
`),s("span",{class:"line"},[s("span",null,"数字指定了子表达式在字符模式中的顺序。如“\\1”引用的是第 1 个子表达式，“\\2”引用的是第 2 个子表达式。")]),a(`
`),s("span",{class:"line"},[s("span",null,"**示例****1**")]),a(`
`),s("span",{class:"line"},[s("span",null,"在下面代码中，通过引用前面子表达式匹配的文本，实现成组匹配字符串。")]),a(`
`),s("span",{class:"line"},[s("span",null,'**var** s = "<h1>title<h1><p>text<p>";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /(<\\/?\\w+>)\\1/g;")]),a(`
`),s("span",{class:"line"},[s("span",null,'var a = s.match(r);  //返回数组["<h1>title<h1>","<p>text<p>"]')]),a(`
`),s("span",{class:"line"},[s("span",null,"由于子表达式可以相互嵌套，它们的顺序将根据左括号的顺序来确定。例如，下面示例定义匹配模式包含多个子表达式。")]),a(`
`),s("span",{class:"line"},[s("span",null,'**var** s = "abc";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /(a(b(c)))/;")]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** a = s.match(r);"),s("span",null,'  //返回数组["abc","abc","bc","c"]')]),a(`
`),s("span",{class:"line"},[s("span",null,"在这个模式中，共产生了 3 个反向引用，第一个是“(a(b(c)))”，第二个是“(b(c))”，第三个是“(C)”。它们引用的匹配文本分别是字符串“abc”、“bc”和“c”。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"对子表达式的引用，是指引用前面子表达式所匹配的文本，而不是子表达式的匹配模式。如果要引用前面子表达式的匹配模式，则必须使用下面方式，只有这样才能够达到匹配目的。")]),a(`
`),s("span",{class:"line"},[s("span",null,'**var** s = "<h1>title</h1><p>text</p>";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /((<\\/?\\w+>).*(<\\/?\\w+>))/g;")]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** a = s.match(r);"),s("span",null,'  //返回数组["<h1>title</h1>","<p>text</p>"]')]),a(`
`),s("span",{class:"line"},[s("span",null,"反向引用在开发中主要有以下几种常规用法。")]),a(`
`),s("span",{class:"line"},[s("span",null,"**示例****2**")]),a(`
`),s("span",{class:"line"},[s("span",null,"在正则表达式对象的 test() 方法中，以及字符串对象的 match() 和 search() 等方法中使用。在这些方法中，反向引用的值可以从 RegExp() 构造函数中获得。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'**var** s = "abcdefghijklmn";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /(\\w)(\\w)(\\w)/;")]),a(`
`),s("span",{class:"line"},[s("span",null,"r.test(s);")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log(RegExp.$1);  //返回第1个子表达式匹配的字符a")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log(RegExp.$2);  //返回第2个子表达式匹配的字符b")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log(RegExp.$3);  //返回第3个子表达式匹配的字符c")]),a(`
`),s("span",{class:"line"},[s("span",null,"通过上面示例可以看到，正则表达式执行匹配检测后，所有子表达式匹配的文本都被分组存储在 RegExp() 构造函数的属性内，通过前缀符号==$==与正则表达式中子表达式的编号来引用这些临时属性。其中属性 $1 标识符指向第 1 个值引用，属性 $2 标识符指向第 2 个值引用。")]),a(`
`),s("span",{class:"line"},[s("span",null,"**示例****3**")]),a(`
`),s("span",{class:"line"},[s("span",null,"可以直接在定义的字符模式中包含反向引用。这可以通过使用特殊转义序列（如 \\1、\\2 等）来实现。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'**var** s = "abcbcacba";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /(\\w)(\\w)(\\w)\\2\\3\\1\\3\\2\\1/;")]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** b = r.test(s);"),s("span",null,"  //验证正则表达式是否匹配该字符串")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log(b);  //返回true")]),a(`
`),s("span",{class:"line"},[s("span",null,"在上面示例的正则表达式中，“\\1”表示对第 1 个反向引用 (\\w) 所匹配的字符 a 进行引用，“\\2”表示对第 2 个反向引用 (\\w) 所匹配的字符串 b 进行引用，“\\3”表示对第 3 个反向引用 (\\w) 所匹配的字符 c 进行引用。")]),a(`
`),s("span",{class:"line"},[s("span",null,"**示例****4**")]),a(`
`),s("span",{class:"line"},[s("span",null,"可以在字符串对象的 replace() 方法中使用。通过使用特殊字符序列$1、$2、$3 等来实现。例如，在下面的示例中将颠倒相邻字母和数字的位置。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'**var** s = "aa11bb22c3d4e5f6";')]),a(`
`),s("span",{class:"line"},[s("span",null,"**var** r = /(\\w+?)(\\d+)/g;")]),a(`
`),s("span",{class:"line"},[s("span",null,'**var** b = s.replace(r,"$2$1");')]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log(b);  //返回字符串“aa11bb22c3  d4e5f6”")]),a(`
`),s("span",{class:"line"},[s("span",null,"在上面例子中，正则表达式包括两个分组，第 1 个分组匹配任意连续的字母，第 2 个分组匹配任意连续的数字。在 replace() 方法的第 2 个参数中，$1 表示对正则表达式中第 1 个子表达式匹配文本的引用，而 $2 表示对正则表达式中第 2 个子表达式匹配文本的引用，通过颠倒 $1 和 $2 标识符的位置，即可实现字符串的颠倒来替换原字符串。")])])])])],-1)])])}const b=l(t,[["render",c]]);export{v as __pageData,b as default};
