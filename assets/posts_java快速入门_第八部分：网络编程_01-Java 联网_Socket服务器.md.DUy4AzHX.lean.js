import{_ as n,o as l,c as t,j as a,a as s}from"./chunks/framework.DJo0M80U.js";const S=JSON.parse('{"title":"Socket服务器","description":"","frontmatter":{"title":"Socket服务器","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","网络编程","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/Socket服务器.md","filePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/Socket服务器.md"}'),c={name:"posts/java快速入门/第八部分：网络编程/01-Java 联网/Socket服务器.md"};function p(o,e,i,r,d,v){return l(),t("div",null,[...e[0]||(e[0]=[a("div",null,[a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"服务器端套接字的工作原理与客户端套接字类似，只是它还包含accept()方法。服务器套接字监听TCP端口上的客户连接；服务器套接字监听TCP端口上的客户连接；当客户连接到该端口时，accept()方法将接收该连接。通过使用客户套接字和服务器套接字，可以创建通过网络进行通信的应用程序。")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"要创建服务器套接字，并将其绑定到某个端口，可创建一个ServerSocket实例，并将该端口作为参数传递给构造函数，如下所示：")]),s(`
`),a("span",{class:"line"},[a("span",null,"ServerSocket servo = new ServerSocket(8888);")]),s(`
`),a("span",{class:"line"},[a("span",null,"然后，使用方法accept()来监听该端口（并接收来自客户的连接）：")]),s(`
`),a("span",{class:"line"},[a("span",null,"servo.accept();")]),s(`
`),a("span",{class:"line"},[a("span",null,"建立套接字连接后，可以分别使用输入流和输出流来从客户端读取数据和将数据写入客户端。")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"要扩展套接字类的行为——如允许网络连接跨越防火墙或代理，可以使用抽象类Socketlmpl和接口SocketlmplFactory来创建一个新的传输层套接字实现。")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"这种方法让这些类能够被移植到使用不同传输机制的系统中。这种机制存在的问题是，虽然在简单情况下管用，但它不允许您将其他协议添加到TCP上（例如，以实现诸如安全套接字层[SSL]等加密机制），也不允许单个Java运行环境包含多个套接字实现。")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"由于Socket和ServerSocket类不是final的，您可以创建这些类的子类，并使用默认套接字实现或自己的实现。这使得网络功能灵活得多。")])])])])],-1)])])}const k=n(c,[["render",p]]);export{S as __pageData,k as default};
