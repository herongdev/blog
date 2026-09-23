import{_ as e,o as l,c as t,j as s,a}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"设计服务器应用程序","description":"","frontmatter":{"title":"设计服务器应用程序","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","网络编程","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/设计服务器应用程序.md","filePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/设计服务器应用程序.md"}'),p={name:"posts/java快速入门/第八部分：网络编程/01-Java 联网/设计服务器应用程序.md"};function i(c,n,o,r,d,u){return l(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面的Java程序示例使用Socket类来实现一个简单的、基于网络的服务器应用程序。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"应用程序TimeServer与连接到商品4413的客户建立连接，显示当前时间，然后关闭该连接。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"应用程序要充当服务器，必须至少监听主机上一个端口的客户连接。这里监听的端口4415，但也可以监听1024~65535之间的任何一个端口。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"端口0~1023的用途由Internet地址分配机构控制。但编号更大的端口也可能已被占用，只是没有正式通过而已。为自己的客户/服务器应用程序选择端口号时，应了解哪些端口已被他人使用了。为此，可在网上搜索你要使用的端口号，再使用registered port numbers 和well-known port numbers进行搜索，以找到已占用的端口清单。www.sockets.com/services.htm提供了不错的端口使用指南。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"检测到客户后，服务器将创建一个表示当前日期和时间的Date对象，并将其作为String发送给客户。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"服务器和客户之间交换信息时，几乎所有的工作都是由服务器完成的。客户只是负责建立到服务器的连接，并显示从服务器那里收到的信息。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"虽然您可以开发一个简单的客户端，但也可以将任何Telnet应用程序用作客户端，只要它能够连接到指定的端口。Windows包含一个名为Telnet的命令行应用程序，您可以将它作为客户端。")]),a(`
`),s("span",{class:"line"},[s("span",null,"以下为TimeServer类的源代码：")])])])])],-1)])])}const m=e(p,[["render",i]]);export{_ as __pageData,m as default};
