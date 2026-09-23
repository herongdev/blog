import{_ as e,o as l,c as t,j as n,a}from"./chunks/framework.DJo0M80U.js";const S=JSON.parse('{"title":"套接字","description":"","frontmatter":{"title":"套接字","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","网络编程","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/套接字.md","filePath":"posts/java快速入门/第八部分：网络编程/01-Java 联网/套接字.md"}'),p={name:"posts/java快速入门/第八部分：网络编程/01-Java 联网/套接字.md"};function c(i,s,o,u,r,m){return l(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"对于URL和URLConnection类的功能不能满足其要求的网络应用程序（例如，使用其他协议或更通用的网络应用程序），Java提供了Socket和ServerSorcket类，它们是标准的传输控制协议（TCP）套接字编程技术的抽象。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"Socket类提供了一个类似于标准UNIX套接字的客户端套接字接口。要建立连接，可创建一个Socket实例（其中hostName）是要连接的主机，portNumber是端口号）：")]),a(`
`),n("span",{class:"line"},[n("span",null,"Socket connetion = new Socket(hostName,portNumber);")]),a(`
`),n("span",{class:"line"},[n("span",null,"创建套接字后，应设置其超时值，这个值决定了应用程序将为数据的到来等待多长时间。为此，可调用套接字的setSoTimeOut(int)方法，该方法接受一个参数：等待时间（单位为毫秒）：")]),a(`
`),n("span",{class:"line"},[n("span",null,"connection.setSoTimeOut(50000);")]),a(`
`),n("span",{class:"line"},[n("span",null,"调用上述方法后，从connetion表示的套餐字中读取数据时，将只等待50000s（即50s)。如果超时，将引发InterruptedIOException异常，因此您可以在try-catch块关闭套接字或再次读取数据。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"如果使用套接字的程序没有设置超时，它可能一直等待下雲 ，直到数据到来。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"提示：为了避免这种问题，通常将网络操作放在单独的线程中，并让它和程序的其他部分分开运行，这种技术也可用于动画。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"建立套餐接字后，可以使用输入/输出流来读写它：")]),a(`
`),n("span",{class:"line"},[n("span",null,"BufferedInputStream bis = new BufferedInputStream(connection.getInputStream());")]),a(`
`),n("span",{class:"line"},[n("span",null,"DataInputStream in = new DataInputStream(bis);")]),a(`
`),n("span",{class:"line"},[n("span",null,"BufferedOutputStream bos = new BufferedOutputStream(connection.getOutputStream());")]),a(`
`),n("span",{class:"line"},[n("span",null,"DataOutputSteam out = new DataOutputStream(bos);")]),a(`
`),n("span",{class:"line"},[n("span",null,"实际上并不需要给这些对象命名，因为它们只用于创建流或流阅读器。为了提高效率，可使用一个名为sock的Socket对象来将上述多条语句并为一条：")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"在这条语句中，sock.getInputStream()调用返回一个与套接字相关联的输入流；然后使用该输入流创建了BufferedInputStream，而后者被用来创建一个DataInputSteam。这样，只使用了变量sock和in,从连接中接收数据然后关闭该连接时需要使用这两个变量。中间对象（BufferedInputSteam和InputStream）只被使用一次。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"使用完套接字后，另忘了调用close()方法来关闭它，这也将关闭您为套接字建立的所有输入/输出流。例如：")]),a(`
`),n("span",{class:"line"},[n("span",null,"connection.close();")]),a(`
`),n("span",{class:"line"},[n("span",null,"套接字编程可用于使用TCP/IP联网技术提供的众多服务中，包括Telnet、简单邮件协议（SMTP，用于接收邮件）、WHOIS协议（用于请求域名记录）和Finger。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"其中Finger是向系统查询其用户的协议。通过建立Finger服务器，系统管理员让连接到Internet的机器能够回答有关用户信息的查询。用户可以通过创建.plan文件来提供有关自己的信息，这些信息将被发送给使用Finger来询问的用户。")]),a(`
`),n("span",{class:"line"},[n("span",null,"虽然由于安全方面的原因，近几年来Finger已不再使用。")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"以下是一个套接字编程练习，应用程序Finger是一个基本的Finger客户端。")])])])])],-1)])])}const f=e(p,[["render",c]]);export{S as __pageData,f as default};
