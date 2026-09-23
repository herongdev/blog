import{_ as l,o as a,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const S=JSON.parse('{"title":"Servlet的体系结构","description":"","frontmatter":{"title":"Servlet的体系结构","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Web基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Servlet的体系结构.md","filePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Servlet的体系结构.md"}'),p={name:"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Servlet的体系结构.md"};function r(i,s,c,v,o,d){return a(),t("div",null,[...s[0]||(s[0]=[e("div",null,[e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"Servlet -- 接口")]),n(`
`),e("span",{class:"line"},[e("span",null,"|")]),n(`
`),e("span",{class:"line"},[e("span",null,"GenericServlet -- 抽象类")]),n(`
`),e("span",{class:"line"},[e("span",null,"|")]),n(`
`),e("span",{class:"line"},[e("span",null,"HttpServlet  -- 抽象类")]),n(`
`),e("span",{class:"line"},[e("span")]),n(`
`),e("span",{class:"line"},[e("span",null,"GenericServlet：将Servlet接口中其他的方法做了默认空实现，只将service()方法作为抽象，将来定义Servlet类时，可以继承GenericServlet，实现service()方法即可。")]),n(`
`),e("span",{class:"line"},[e("span")]),n(`
`),e("span",{class:"line"},[e("span",null,"HttpServlet：对http协议的一种封装，简化操作")]),n(`
`),e("span",{class:"line"},[e("span",null,"1. 定义类继承HttpServlet")]),n(`
`),e("span",{class:"line"},[e("span",null,"2. 复写doGet/doPost方法")]),n(`
`),e("span",{class:"line"},[e("span")]),n(`
`),e("span",{class:"line"},[e("span")]),n(`
`),e("span",{class:"line"},[e("span",null,"**Servlet****相关配置**")]),n(`
`),e("span",{class:"line"},[e("span",null,"urlpartten:Servlet访问路径")]),n(`
`),e("span",{class:"line"},[e("span",null,'1. 一个Servlet可以定义多个访问路径 ： @WebServlet({"/d4","/dd4","/ddd4"})')]),n(`
`),e("span",{class:"line"},[e("span",null,"2. 路径定义规则：")]),n(`
`),e("span",{class:"line"},[e("span",null,"1. /xxx：路径匹配")]),n(`
`),e("span",{class:"line"},[e("span",null,"2. /xxx/xxx:多层路径，目录结构")]),n(`
`),e("span",{class:"line"},[e("span",null,"3. *.do：扩展名匹配")]),n(`
`),e("span",{class:"line"},[e("span",null,"4.  使用通配符优先级最低")])])])])],-1)])])}const x=l(p,[["render",r]]);export{S as __pageData,x as default};
