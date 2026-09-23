import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const U=JSON.parse('{"title":"联网技术","description":"","frontmatter":{"title":"联网技术","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","网络编程","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/联网技术.md","filePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/联网技术.md"}'),t={name:"posts/java快速入门/第八部分：网络编程/01-Java 联网/联网技术.md"};function i(c,a,r,o,u,R){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"联网技术让不同的计算机能够彼此连接并交换信息。在Java中，基本的联网技术是由java.net包中的类支持，这包括支持通过超文本传输协议（HTTP)和文件传输协议（FTP)和文件传输协议（FTP)进行连接和检索文件以及在底层处理基本的UNIX式套接字。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要同网络上的系统进行通信，可以采取3种简单的方式：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在小程序中使用统一资源定位符（URL）加载网页和其他资源；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用套接字类Socket和ServerSocket，它们建立到主机的标准套接字连接，并通过这种连接执行读写；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"调用getInputSteam（）,该方法建立到URL的连接，并通过该连接来获取数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**打开跨越网络的流**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Java程序中，可以访问的资源之一是Web上的文本文档，这可能是HTML文件，XML文件或其他类型的纯文本文档。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要加载Web上的文本文档并逐行读取其中的内容，可以通过4步来实现。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建一个表示资源的网络地址的URL对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建一个HttpURLConnection对象，它能够加载URL并连接到相应的站点。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用HttpURLConnection对象的getContent()方法来创建一个InputStreamReader，用于读取来自URL的数据流。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用输入流阅读器来创建一个BufferedReader对象，后者能够高效地从输入流中读取字符。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Web文档和Java程序之间将进行大量交互。URL用于建立URL连接，后者用于建立输入流阅读器，而输入流阅读器用于建立缓冲输入流阅读器。由于需要处理可能发生的任何异常。这增加了复杂程度。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要加载资源，首先必须创建URL类的一个实例，它表示要加载的资源的地址。")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL是Uniform Resource Locator （统一资源定位器）的缩写，它是可 通过Internet进行访问的文件或其他资源的唯一地址。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL类位于java.net包中，因此您必须在程序中导入这个包或使用全名来引用这个类。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要创建新的URL对象，可使用下述4个构造函数之一。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL(String)：使用完整的网络地址创建一个URL对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL(URL,String)：将指定的URL作为基本地址，指定String作为相对路径来创建一个URL对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL(String,String,int,String)：要招协议（如http或ftp）、主机名、端口号和文件名或路径名创建一个新的URL对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL(String,String,String)：与前一个构造函数相同，只是没有端口号。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用构造函数URL（String）时，必须处理MalformedURLException异常，该异常在指定字符串不是有效URL时引发。可以在try-catch块处理这些异常：")]),s(`
`),n("span",{class:"line"},[n("span",null,"try\\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'URL load=new URL("http://www.sample.com")')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}catch\\{ MalformedURLException e） \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'system.out.println("Bad URL);')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"程序清单所示的应用程序WebReader通过前面介绍的4个步骤连接到一个网站，并读取其中的一个文本文档。加载该文档后，将其内容显示到一个文本区域中。代码如下：")])])])])],-1)])])}const d=l(t,[["render",i]]);export{U as __pageData,d as default};
