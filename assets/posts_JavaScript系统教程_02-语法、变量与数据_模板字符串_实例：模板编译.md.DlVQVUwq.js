import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实例：模板编译","description":"围绕“实例：模板编译”整理的概念、示例与实践笔记。","frontmatter":{"title":"实例：模板编译","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“实例：模板编译”整理的概念、示例与实践笔记。","sidebarWeight":38,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/基本数据类型-字符串/模板字符串/实例：模板编译.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/模板字符串/实例：模板编译.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/模板字符串/实例：模板编译.md"}'),t={name:"posts/JavaScript系统教程/02-语法、变量与数据/模板字符串/实例：模板编译.md"};function i(c,s,u,o,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实例-模板编译",tabindex:"-1"},[l("实例：模板编译 "),n("a",{class:"header-anchor",href:"#实例-模板编译","aria-label":'Permalink to "实例：模板编译"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实例：模板编译”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"下面，我们来看一个通过模板字符串，生成正式模板的实例。")]),l(`
`),n("span",{class:"line"},[n("span",null,"let template = `<ul>  <% for(let i=0; i < data.supplies.length; i++) { %>    <li><%= data.supplies[i] %></li>  <% } %></ul>`;")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"怎么编译这个模板字符串呢？")]),l(`
`),n("span",{class:"line"},[n("span",null,"一种思路是将其转换为 JavaScript 表达式字符串。")]),l(`
`),n("span",{class:"line"},[n("span",null,"echo('<ul>');")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < data.supplies.length; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    echo('<li>');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    echo(data.supplies[i]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    echo('</li>');")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"echo('</ul>');")]),l(`
`),n("span",{class:"line"},[n("span",null,"这个转换使用正则表达式就行了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"let evalExpr = /<%=(.+?)%>/g;")]),l(`
`),n("span",{class:"line"},[n("span",null,"let expr = /<%([\\s\\S]+?)%>/g;")]),l(`
`),n("span",{class:"line"},[n("span",null,"template = template")]),l(`
`),n("span",{class:"line"},[n("span",null,"    .replace(evalExpr, '`); \\n  echo( $1 ); \\n  echo(`')")]),l(`
`),n("span",{class:"line"},[n("span",null,"    .replace(expr, '`); \\n $1 \\n  echo(`');")]),l(`
`),n("span",{class:"line"},[n("span",null,"template = 'echo(`' + template + '`);';")]),l(`
`),n("span",{class:"line"},[n("span",null,"然后，将template封装在一个函数里面返回，就可以了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"let script =")]),l(`
`),n("span",{class:"line"},[n("span",null,"    `(function parse(data){")]),l(`
`),n("span",{class:"line"},[n("span",null,'  let output = "";')]),l(`
`),n("span",{class:"line"},[n("span",null,"function echo(html){")]),l(`
`),n("span",{class:"line"},[n("span",null,"    output += html;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"${ template}")]),l(`
`),n("span",{class:"line"},[n("span",null,"return output;")]),l(`
`),n("span",{class:"line"},[n("span",null,"})`;")]),l(`
`),n("span",{class:"line"},[n("span",null,"return script;")]),l(`
`),n("span",{class:"line"},[n("span",null,"将上面的内容拼装成一个模板编译函数compile。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function compile(template) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const evalExpr = /<%=(.+?)%>/g;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const expr = /<%([\\s\\S]+?)%>/g;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    template = template")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .replace(evalExpr, '`); \\n  echo( $1 ); \\n  echo(`')")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .replace(expr, '`); \\n $1 \\n  echo(`');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    template = 'echo(`' + template + '`);';")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let script =")]),l(`
`),n("span",{class:"line"},[n("span",null,"        `(function parse(data){")]),l(`
`),n("span",{class:"line"},[n("span",null,'      let output = "";')]),l(`
`),n("span",{class:"line"},[n("span",null,"  function echo(html){")]),l(`
`),n("span",{class:"line"},[n("span",null,"        output += html;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  ${ template}")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return output;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    })`;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return script;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"compile函数的用法如下。")]),l(`
`),n("span",{class:"line"},[n("span",null,'let parse = eval(compile(template));div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });//   <ul>//     <li>broom</li>//     <li>mop</li>//     <li>cleaner</li>//   </ul>')])])])])],-1)])])}const v=a(t,[["render",i]]);export{m as __pageData,v as default};
