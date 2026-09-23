import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"HTTP","description":"","frontmatter":{"title":"HTTP","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Web基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/HTTP.md","filePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/HTTP.md"}'),i={name:"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/HTTP.md"};function c(t,l,u,o,r,T){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"概念：Hyper Text Transfer Protocol 超文本传输协议")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 传输协议：定义了，客户端和服务器端通信时，发送数据的格式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 特点：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 基于TCP/IP的高级协议")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 默认端口号:80")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 基于请求/响应模型的:一次请求对应一次响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 无状态的：每次请求之间相互独立，不能交互数据")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 历史版本：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 1.0：每一次请求响应都会建立新的连接")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 1.1：复用连接")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**请求消息数据格式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 请求行")]),s(`
`),n("span",{class:"line"},[n("span",null,"请求方式     请求url    请求协议/版本")]),s(`
`),n("span",{class:"line"},[n("span",null,"GET /login.html   HTTP/1.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 请求方式：HTTP协议有7中请求方式，常用的有2种")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `GET：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `1. 请求参数在请求行中，在url后。`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `2. 请求的url长度有限制的`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `3. 不太安全`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `POST：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `1. 请求参数在请求体中`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `2. 请求的url长度没有限制的`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    - 3. 相对安全")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 2. 请求头：客户端浏览器告诉服务器一些信息。格式为：==请求头名称====:== ==请求头值==")]),s(`
`),n("span",{class:"line"},[n("span",null,"- * 常见的请求头：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. User-Agent：浏览器告诉服务器，我访问你使用的浏览器版本信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 可以在服务器端获取该头的信息，解决浏览器的兼容性问题")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. Referer：http://localhost/login.html")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 告诉服务器，我(当前请求)从哪里来？")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 作用：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 防盗链：")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 统计工作：")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 请求空行")]),s(`
`),n("span",{class:"line"},[n("span",null,"空行，就是用于分割POST请求的请求头，和请求体的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 请求体(正文)：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 封装POST请求消息的请求参数的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 字符串格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"POST /login.html	HTTP/1.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"Host: localhost")]),s(`
`),n("span",{class:"line"},[n("span",null,"User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")]),s(`
`),n("span",{class:"line"},[n("span",null,"Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2")]),s(`
`),n("span",{class:"line"},[n("span",null,"Accept-Encoding: gzip, deflate")]),s(`
`),n("span",{class:"line"},[n("span",null,"Referer: [http://localhost/login.html](http://localhost/login.html)")]),s(`
`),n("span",{class:"line"},[n("span",null,"Connection: keep-alive")]),s(`
`),n("span",{class:"line"},[n("span",null,"Upgrade-Insecure-Requests: 1")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"username=zhangsan")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 响应消息数据格式")])])])])],-1)])])}const g=a(i,[["render",c]]);export{d as __pageData,g as default};
