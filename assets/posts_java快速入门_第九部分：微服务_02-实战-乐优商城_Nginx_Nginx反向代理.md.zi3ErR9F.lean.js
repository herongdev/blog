import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"Nginx反向代理","description":"","frontmatter":{"title":"Nginx反向代理","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx反向代理.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx反向代理.md"}'),t={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx反向代理.md"};function i(c,a,o,d,r,g){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Nginx只做请求的转发，后台有多个http服务器提供服务，nginx的功能就是把请求转发给后面的服务器，决定把请求转发给谁。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 在一个虚拟机上创建两个tomcat实例，模拟多个服务器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 通过访问不同的域名访问运行在不同端口的tomcat")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 8080.wzf.com 访问运行8080端口的tomcat")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 8081.wzf.com 访问运行8081端口的tomcat")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **1****、域名需要配置****host****文件：**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2****、安装两个****tomcat****，它们的端口号分别为****8080****、****8081****，并修改相应的****index.jsp****加以区分。**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **3****、****Nginx****的配置**")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 修改Nginx的原始配置文件：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**4****、分别启动****2****个****tomcat****和****nginx****服务后，即可看到效果：**")])])])])],-1)])])}const m=l(t,[["render",i]]);export{x as __pageData,m as default};
