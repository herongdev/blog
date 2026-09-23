import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"JS正则表达式之特殊符号","description":"\\\\ 来自 \\\\<https://www.cnblogs.com/devcjq/articles/2920112.html\\\\。","frontmatter":{"title":"JS正则表达式之特殊符号","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"\\\\ 来自 \\\\<https://www.cnblogs.com/devcjq/articles/2920112.html\\\\。","sidebarWeight":106,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-正则/JS正则表达式之特殊符号.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/JS正则表达式之特殊符号.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/JS正则表达式之特殊符号.md"}'),c={name:"posts/JavaScript系统教程/03-对象、数组与函数/JS正则表达式之特殊符号.md"};function t(i,a,o,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"js正则表达式之特殊符号",tabindex:"-1"},[s("JS正则表达式之特殊符号 "),n("a",{class:"header-anchor",href:"#js正则表达式之特殊符号","aria-label":'Permalink to "JS正则表达式之特殊符号"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“JS正则表达式之特殊符号”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在**正则表达式**中，许多标点符号具有特殊含义，比较难记，现归纳备个份：")]),s(`
`),n("span",{class:"line"},[n("span",null,"这些符号有：^ $ . * +  - ? = ! : | \\ / ( ) [ ] { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"1.“[ ]”表示字符类： 即括号里是个字符集：如/[abc]/,表示和含有a,b,c任何一个字母的字符串都匹配。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注：特殊字符类：\\s表示空格符、制表符、Unicode空白符。\\S表示非Unicode空白符。(也可自定义Unicode字符类：如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        /[\\u4E00-\\u9FA5]/表示只匹配中文字符。)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                       \\w 任何单字字符，相当于[a-zA-X0-9_]；\\W与\\w相反。")]),s(`
`),n("span",{class:"line"},[n("span",null,"                       \\d 任何数字，相当于[0-9]；\\D与\\w相反。")]),s(`
`),n("span",{class:"line"},[n("span",null,"                       \\b在字符类中使用表示退格符。[\\b]则表示退格直接量。\\b可以用来指定匹配位置，也可称为锚；如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"                      查找一个句子里的单词 java , 可以使用/\\bjava\\b/；\\B与其相反。")]),s(`
`),n("span",{class:"line"},[n("span",null,'2.“-"表示连字符，如[a-z]；')]),s(`
`),n("span",{class:"line"},[n("span",null,'3."."表示除换行符和其他Unicode行终止符之外的任意字符。')]),s(`
`),n("span",{class:"line"},[n("span",null,'4."^"具有两重含义：开始标记和非，如：/^a/表示以a开始的字符，当在[]中时：/[^a]/表示非a的所有字符。')]),s(`
`),n("span",{class:"line"},[n("span",null,'5."$"表示字符结尾。如：/^abc$/表示以c结束的字符。')]),s(`
`),n("span",{class:"line"},[n("span",null,'6.”{}"表示重复上一项。如/\\d{2,4}/表示数字出现两次，最多出现4次。如/3{2,4}/匹配33...；333....；3333.....;不匹配3和4个3相连以上的了。它的三种格式如下{n,m}表示至少3次，最多m次；{n,}至少n次；{n}恰好n次。')]),s(`
`),n("span",{class:"line"},[n("span",null,'7."?"表示{0,1}。')]),s(`
`),n("span",{class:"line"},[n("span",null,'8."+"表示{1,}。')]),s(`
`),n("span",{class:"line"},[n("span",null,'9."*"表示{0,}。')]),s(`
`),n("span",{class:"line"},[n("span",null,"注：非贪婪的重复（如??,+?,*?,{1,5}?只匹配第一个。）")]),s(`
`),n("span",{class:"line"},[n("span",null,'10."|"表示分割，即或的含义。如：/ab|cd|ef/匹配含有ab或cd或ef的字符串。')]),s(`
`),n("span",{class:"line"},[n("span",null,'11."()"包含三重用途：一是定义子表达式。二是在完整的模式中定义子模式。三是子表达式的引用。')]),s(`
`),n("span",{class:"line"},[n("span",null,"子模式的定义可以从目标串中抽取和括号中的子模式相匹配的部分。")]),s(`
`),n("span",{class:"line"},[n("span",null,"子模式的表达式的引用是指：可识别子模式的编号，提取它。如/(abc)\\sis\\s(string\\w*)/；里面含有两个字表达式：可通过")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\1指(abc)；\\2指(string\\w*)； 应用如：/[&apos;"][^&apos;"]*[&apos;"]/不能取前后同样的引号，可以这样写：/[(&apos;")[^&apos;"]*\\1]/，可起到约束作用。')]),s(`
`),n("span",{class:"line"},[n("span",null,"注：若想()里的不想被记忆，可采用(?:.....)，将不会对其编号。")]),s(`
`),n("span",{class:"line"},[n("span",null,"还有(?=p)，(?!p)如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"如/(javascript)?(?=\\:)/ 表示匹配javascript:，但不包含:；它不匹配javascript，因为他有个条件就是后要接:；")]),s(`
`),n("span",{class:"line"},[n("span",null,"(?!p)反前向声明，要求接下来的字符不与模式p匹配，与(?=p)相反。")])])])]),n("p",null,[s("> 来自 <"),n("a",{href:"https://www.cnblogs.com/devcjq/articles/2920112.html",target:"_blank",rel:"noreferrer"},"https://www.cnblogs.com/devcjq/articles/2920112.html"),s(">")])],-1)])])}const m=l(c,[["render",t]]);export{h as __pageData,m as default};
