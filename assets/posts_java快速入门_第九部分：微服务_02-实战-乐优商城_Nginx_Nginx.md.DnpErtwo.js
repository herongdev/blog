import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"title":"Nginx","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx/Nginx.md"};function t(c,a,o,g,u,x){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**什么是****Nginx**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Nginx是一款高性能的http 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。由俄罗斯的程序设计师Igor Sysoev所开发，官方测试nginx能够支支撑5万并发链接，并且cpu、内存等资源消耗却非常低，运行非常稳定。开源、免费。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Nginx****的应用场景**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1、http服务器。Nginx是一个http服务，可以独立提供http服务。可以做网页静态服务器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2、虚拟主机。可以实现在一台服务器虚拟出多个网站。例如个人网站使用的虚拟主机。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3、反向代理，负载均衡。当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Nginx****负载均衡**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**什么是负载均衡**")]),s(`
`),n("span",{class:"line"},[n("span",null,"负载均衡 建立在现有网络结构之上，它提供了一种廉价有效透明的方法扩展网络设备和服务器的带宽、增加吞吐量、加强网络数据处理能力、提高网络的灵活性和可用性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"负载均衡，英文名称为Load Balance，其意思就是分摊到多个操作单元上进行执行，例如Web服务器、FTP服务器、企业关键应用服务器和其它关键任务服务器等，从而共同完成工作任务。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果在同一个域名下有多台服务器提供服务，此时需要nginx负载均衡。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置****Nginx****负载均衡**")]),s(`
`),n("span",{class:"line"},[n("span",null,"nginx作为负载均衡服务器，用户请求先到达nginx，再由nginx根据负载配置将请求转发至 tomcat服务器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"nginx负载均衡服务器：10.10.1.146")]),s(`
`),n("span",{class:"line"},[n("span",null,"tomcat1服务器：10.10.1.146:8080")]),s(`
`),n("span",{class:"line"},[n("span",null,"tomcat2服务器：10.10.1.146:8081")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- image.png")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 启动2个tomcat和nginx服务后即可看到效果：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.jianshu.com/p/4f7d17a7ccbb\\>")])])])])],-1)])])}const N=l(i,[["render",t]]);export{r as __pageData,N as default};
