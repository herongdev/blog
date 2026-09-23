import{_ as a,o as p,c as e,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"生成随机数","description":"一、随机浮点数的生成 1 ，生成 0, 1 ) 范围内的随机数（大于等于 0 ，小于 1 ） （1）使用 random() 方法可以返回一个介于 0 1 之间的伪随机数（包括 0 ，不包括 1 ）。 text text [ 2 ，生成 n, m ) 范围内的随机数（大于等于 n。","frontmatter":{"title":"生成随机数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"一、随机浮点数的生成 1 ，生成 0, 1 ) 范围内的随机数（大于等于 0 ，小于 1 ） （1）使用 random() 方法可以返回一个介于 0 1 之间的伪随机数（包括 0 ，不包括 1 ）。 text text [ 2 ，生成 n, m ) 范围内的随机数（大于等于 n。","sidebarWeight":74,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-对象/详解内置对象/生成随机数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/详解内置对象/生成随机数.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/详解内置对象/生成随机数.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/详解内置对象/生成随机数.md"};function c(t,s,u,o,h,r){return p(),e("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"生成随机数",tabindex:"-1"},[l("生成随机数 "),n("a",{class:"header-anchor",href:"#生成随机数","aria-label":'Permalink to "生成随机数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“生成随机数”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[l("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 "),n("strong",null,"一、随机浮点数的生成"),n("strong",null,"1"),l("**，生成** "),n("strong",null,"[ 0, 1 )"),l(),n("strong",null,[l("范围内的随机数（大于等于"),n("strong",null,[n("strong",null,"0")]),l("，小于"),n("strong",null,[n("strong",null,"1")]),l("）")]),l(" （1）使用 "),n("strong",null,"random()"),l(" 方法可以返回一个介于 "),n("strong",null,"0"),l(" ~ "),n("strong",null,"1"),l(" 之间的伪随机数（包括 "),n("strong",null,"0"),l("，不包括 "),n("strong",null,"1"),l("）。")])]),n("p",null,"| |"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Math.random()")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"（2）下面是一个测试样例")])])])]),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,"```"),n("td")]),n("tr",null,[n("td",null,"1"),n("td")]),n("tr",null,[n("td",null,"2"),n("td")])])]),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random = Math.random();")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2****，生成** **[ n, m )** **范围内的随机数（大于等于****n****，小于****m****）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"（1）这种最简单，因为和 **random** 的特点保持一致。只需使用如下公式即可：")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"Math.random()*(m-n)+n"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[l("（2）比如下面生成 "),n("strong",null,"[10,15)"),l(" 范围内的随机浮点数。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random1 = Math.random()*(15-10)+10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random2 = Math.random()*(15-10)+10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random3 = Math.random()*(15-10)+10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random3);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3****，生成** **[n,m]****、****(n,m)****、****(n,m]** **范围内的随机数**")]),l(`
`),n("span",{class:"line"},[n("span",null,"因为 **random** 的特点，要取得这几个区间内的浮点数稍微麻烦些，需要借助一些判断才能满足要求。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"7")]),l(`
`),n("span",{class:"line"},[n("span",null,"8")]),l(`
`),n("span",{class:"line"},[n("span",null,"9")]),l(`
`),n("span",{class:"line"},[n("span",null,"10")]),l(`
`),n("span",{class:"line"},[n("span",null,"11")]),l(`
`),n("span",{class:"line"},[n("span",null,"12")]),l(`
`),n("span",{class:"line"},[n("span",null,"13")]),l(`
`),n("span",{class:"line"},[n("span",null,"14")]),l(`
`),n("span",{class:"line"},[n("span",null,"15")]),l(`
`),n("span",{class:"line"},[n("span",null,"16")]),l(`
`),n("span",{class:"line"},[n("span",null,"17")]),l(`
`),n("span",{class:"line"},[n("span",null,"18")]),l(`
`),n("span",{class:"line"},[n("span",null,"19")]),l(`
`),n("span",{class:"line"},[n("span",null,"20")]),l(`
`),n("span",{class:"line"},[n("span",null,"21")]),l(`
`),n("span",{class:"line"},[n("span",null,"22")]),l(`
`),n("span",{class:"line"},[n("span",null,"23")]),l(`
`),n("span",{class:"line"},[n("span",null,"24")]),l(`
`),n("span",{class:"line"},[n("span",null,"25")]),l(`
`),n("span",{class:"line"},[n("span",null,"26")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"//取得[n,m]范围随机数")]),l(`
`),n("span",{class:"line"},[n("span",null,"**function** fullClose(n,m) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **var** result = Math.random()*(m+1-n)+n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **while**(result>m) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"       result = Math.random()*(m+1-n)+n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   }")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **return** result;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"//取得(n,m)范围随机数")]),l(`
`),n("span",{class:"line"},[n("span",null,"**function** fullOpen(n,m) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **var** result = Math.random()*(m-n)+n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **while**(result == n) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"       result = Math.random()*(m-n)+n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   }")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **return** result;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"//取得(n,m]范围随机数")]),l(`
`),n("span",{class:"line"},[n("span",null,"**function** leftOpen(n,m) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **var** result = Math.random()*(m-n+1)+n-1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **while**(result<n) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"       result = Math.random()*(m-n+1)+n-1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"   }")]),l(`
`),n("span",{class:"line"},[n("span",null,"   **return** result;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**二、随机整数的生成**")]),l(`
`),n("span",{class:"line"},[n("span",null,"要生成随机整数，我们还需要借助如下两个方法：")])])])]),n("p",null,[n("strong",null,"Math.round(num)"),l("：将 "),n("strong",null,"num"),l(" 四舍五入取整")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**Math.floor(num)**：将 **num** 向下取整，即返回 **num** 的整数部分。当然我们也可以使用 **parseInt()** 方法代替。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**1****，随机生成** **0****、****1** **这两个整数**")]),l(`
`),n("span",{class:"line"},[n("span",null,"（1）下面这个方法可以随机获取 **0** 或 **1**，它们获取到的几率是比较均衡的。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"Math.round(Math.random())"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"（2）下面是一个测试样例"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random1 = Math.round(Math.random());")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random2 = Math.round(Math.random());")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random3 = Math.round(Math.random());")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random3);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2****，生成** **[ 0, n )** **范围内的随机整数（大于等于****0****，小于****n****）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"（1）下面方法生成一个 **0** 到 **n-1** 的随机整数（这 **n** 个数获取几率都是均衡的）")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"Math.floor(Math.random()*n)"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[l("（2）比如下面生成几个 "),n("strong",null,"0"),l(" 到 "),n("strong",null,"4"),l(" 的随机整数（包括 "),n("strong",null,"0"),l(" 和 "),n("strong",null,"4"),l("）。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random1 = Math.floor(Math.random()*5);")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random2 = Math.floor(Math.random()*5);")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random3 = Math.floor(Math.random()*5);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random3);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3****，生成** **[ 1, n ]** **范围内的随机整数（大于等于****1****，小于等于****n****）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"（1）下面方法生成一个 **1** 到 **n** 的随机整数（这 **n** 个数获取几率都是均衡的）")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"Math.floor(Math.random()*n)+1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[l("（2）比如下面生成几个 "),n("strong",null,"1"),l(" 到 "),n("strong",null,"5"),l(" 的随机整数（包括 "),n("strong",null,"1"),l(" 和 "),n("strong",null,"5"),l("）。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random1 = Math.floor(Math.random()*5)+1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random2 = Math.floor(Math.random()*5)+1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random3 = Math.floor(Math.random()*5)+1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random3);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**4****，生成** **[ min, max ]** **范围内的随机整数（大于等于****min****，小于等于****max****）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"（1）下面方法生成一个最小值为 **min**，最大值为 **max** 的随机整数。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")])])])]),n("p",null,"1"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,"Math.floor(Math.random()*(max-min+1))+min"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("p",null,[l("（2）比如下面生成几个 "),n("strong",null,"5"),l(" 到 "),n("strong",null,"10"),l(" 的随机整数")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random1 = Math.floor(Math.random()*(10-5+1))+5;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random2 = Math.floor(Math.random()*(10-5+1))+5;")]),l(`
`),n("span",{class:"line"},[n("span",null,"**var** random3 = Math.floor(Math.random()*(10-5+1))+5;")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(random3);")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")])])])]),n("p",null,[n("strong",null,"三、随机字符串的生成"),n("strong",null,"1"),l("**，生成指定位数的纯数字字符串**")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"7")]),l(`
`),n("span",{class:"line"},[n("span",null,"8")]),l(`
`),n("span",{class:"line"},[n("span",null,"9")]),l(`
`),n("span",{class:"line"},[n("span",null,"10")]),l(`
`),n("span",{class:"line"},[n("span",null,"11")]),l(`
`),n("span",{class:"line"},[n("span",null,"12")]),l(`
`),n("span",{class:"line"},[n("span",null,"13")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"//生成n位数字字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,"**function** randomNum(n){")]),l(`
`),n("span",{class:"line"},[n("span",null,'  **var** res = "";')]),l(`
`),n("span",{class:"line"},[n("span",null,"  **for**(**var** i=0;i<n;i++){")]),l(`
`),n("span",{class:"line"},[n("span",null,"    res += Math.floor(Math.random()*10);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  **return** res;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"//测试")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(randomNum(3))")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(randomNum(5))")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(randomNum(7))")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")])])])]),n("p",null,[n("strong",null,"2"),l("**，生成指定位数的数字字母混合的字符串**")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"7")]),l(`
`),n("span",{class:"line"},[n("span",null,"8")]),l(`
`),n("span",{class:"line"},[n("span",null,"9")]),l(`
`),n("span",{class:"line"},[n("span",null,"10")]),l(`
`),n("span",{class:"line"},[n("span",null,"11")]),l(`
`),n("span",{class:"line"},[n("span",null,"12")]),l(`
`),n("span",{class:"line"},[n("span",null,"13")]),l(`
`),n("span",{class:"line"},[n("span",null,"14")]),l(`
`),n("span",{class:"line"},[n("span",null,"15")]),l(`
`),n("span",{class:"line"},[n("span",null,"16")]),l(`
`),n("span",{class:"line"},[n("span",null,"17")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"//生成n位数字字母混合字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,"**function** generateMixed(n) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  **var** chars = ['0','1','2','3','4','5','6','7','8','9',")]),l(`
`),n("span",{class:"line"},[n("span",null,"              'A','B','C','D','E','F','G','H','I','J','K','L','M',")]),l(`
`),n("span",{class:"line"},[n("span",null,"              'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];")]),l(`
`),n("span",{class:"line"},[n("span",null,'  **var** res = "";')]),l(`
`),n("span",{class:"line"},[n("span",null,"  **for**(**var** i = 0; i < n ; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"     **var** id = Math.floor(Math.random()*36);")]),l(`
`),n("span",{class:"line"},[n("span",null,"     res += chars[id];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  **return** res;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"//测试")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(generateMixed(3))")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(generateMixed(5))")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(generateMixed(7))")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," [](https://www.hangge.com/blog/cache/detail_1872.html#)")])])])]),n("p",null,[l("原文出自："),n("a",{href:"https://www.hangge.com/",target:"_blank",rel:"noreferrer"},"www.hangge.com"),l(" 转载请保留原文链接："),n("a",{href:"https://www.hangge.com/blog/cache/detail_1872.html",target:"_blank",rel:"noreferrer"},"https://www.hangge.com/blog/cache/detail_1872.html")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," \\> 来自")])])])]),n("p",null,[n("a",{href:"https://www.hangge.com/blog/cache/detail_1872.html",target:"_blank",rel:"noreferrer"},"https://www.hangge.com/blog/cache/detail_1872.html")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  [](https://www.hangge.com/blog/cache/detail_1872.html#)   [](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](https://www.hangge.com/blog/cache/detail_1872.html#)")]),l(`
`),n("span",{class:"line"},[n("span",null,"\\> 来自")])])])]),n("p",null,[n("a",{href:"https://www.hangge.com/blog/cache/detail_1872.html",target:"_blank",rel:"noreferrer"},"https://www.hangge.com/blog/cache/detail_1872.html")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])])],-1)])])}const m=a(i,[["render",c]]);export{g as __pageData,m as default};
