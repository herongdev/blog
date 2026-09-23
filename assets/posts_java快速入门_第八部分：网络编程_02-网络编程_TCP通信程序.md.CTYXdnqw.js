import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"TCP通信程序","description":"","frontmatter":{"title":"TCP通信程序","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","网络编程","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第八部分：网络编程/02-网络编程/TCP通信程序.md","filePath":"posts/java快速入门/第八部分：网络编程/02-网络编程/TCP通信程序.md"}'),c={name:"posts/java快速入门/第八部分：网络编程/02-网络编程/TCP通信程序.md"};function t(i,l,u,r,o,S){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"TCP通信能实现两台计算机之间的数据交互，通信的两端，要严格区分为客户端（Client）与服务端（Server）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**两端通信时步骤：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 服务端程序，需要事先启动，等待客户端的连接。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 客户端主动连接服务器端，连接成功才能通信。服务端不可以主动连接客户端。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在****Java****中，提供了两个类用于实现****TCP****通信程序：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 客户端： java.net.Socket 类表示。创建 Socket 对象，向服务端发出连接请求，服务端响应请求，两者建立连接开始通信。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 服务端： java.net.ServerSocket 类表示。创建 ServerSocket 对象，相当于开启一个服务，并等待客户端的连接。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Socket****类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Socket 类：该类实现客户端套接字，套接字指的是两台设备之间通讯的端点。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Socket(String host, int port) :**创建套接字对象并将其连接到指定主机上的指定端口号。如果指定的****host****是****null** **，则相当于指定地址为回送地址。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：回送地址(127.x.x.x) 是本机回送地址（Loopback Address），主要用于网络软件测试以及本地机进程间通信，无论什么程序，一旦使用回送地址发送数据，立即返回，不进行任何网络传输。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,'Socket client = new Socket("127.0.0.1", 6666);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public InputStream getInputStream() ： 返回此套接字的输入流。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果此Scoket具有相关联的通道，则生成的InputStream 的所有操作也关联该通道。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"关闭生成的InputStream也将关闭相关的Socket。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public OutputStream getOutputStream() ： 返回此套接字的输出流。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果此Scoket具有相关联的通道，则生成的OutputStream 的所有操作也关联该通道。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"关闭生成的OutputStream也将关闭相关的Socket。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void close() ：关闭此套接字。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"一旦一个socket被关闭，它不可再使用。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"关闭此socket也将关闭相关的InputStream和OutputStream 。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void shutdownOutput() ： 禁用此套接字的输出流。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"任何先前写出的数据将被发送，随后终止输出流。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**ServerSocket****类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServerSocket 类：这个类实现了服务器套接字，该对象等待通过网络的请求。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public ServerSocket(int port) ：使用该构造方法在创建ServerSocket对象时，就可以将其绑定到一个指 定的端口号上，参数port就是端口号。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServerSocket server = new ServerSocket(6666);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Socket accept() ：侦听并接受连接，返回一个新的Socket对象，用于和客户端实现通信。该方法会一直阻塞直到建立连接。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**简单的****TCP****网络程序**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**TCP****通信分析图解**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 【服务端】启动,创建ServerSocket对象，等待连接。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 【客户端】启动,创建Socket对象，请求连接。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 【服务端】接收连接,调用accept方法，并返回一个Socket对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 【客户端】Socket对象，获取OutputStream，向服务端写出数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"5. 【服务端】Scoket对象，获取InputStream，读取客户端发送的数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"到此，客户端向服务端发送数据成功。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"自此，服务端向客户端回写数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"6. 【服务端】Socket对象，获取OutputStream，向客户端回写数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"7. 【客户端】Scoket对象，获取InputStream，解析回写数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"8. 【客户端】释放资源，断开连接。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**客户端向服务器发送数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**服务端实现：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ServerTCP {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("服务端启动 , 等待连接 .... ");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.创建 ServerSocket对象，绑定端口，开始等待连接")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServerSocket ss = new ServerSocket(6666);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.接收连接 accept 方法, 返回 socket 对象.")]),s(`
`),n("span",{class:"line"},[n("span",null,"Socket server = ss.accept();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3.通过socket 获取输入流")]),s(`
`),n("span",{class:"line"},[n("span",null,"InputStream is = server.getInputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.一次性读取数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.1 创建字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[1024];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.2 据读取到字节数组中.")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len = is.read(b)；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.3 解析数组,打印字符串信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"String msg = new String(b, 0, len);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(msg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//5.关闭资源.")]),s(`
`),n("span",{class:"line"},[n("span",null,"is.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**客户端实现：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ClientTCP {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws Exception {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("客户端 发送数据");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.创建 Socket ( ip , port ) , 确定连接到哪里.")]),s(`
`),n("span",{class:"line"},[n("span",null,'Socket client = new Socket("localhost", 6666);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.获取流对象 . 输出流")]),s(`
`),n("span",{class:"line"},[n("span",null,"OutputStream os = client.getOutputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3.写出数据.")]),s(`
`),n("span",{class:"line"},[n("span",null,'os.write("你好么? tcp ,我来了".getBytes());')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4. 关闭资源 .")]),s(`
`),n("span",{class:"line"},[n("span",null,"os.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"client.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**服务器向客户端回写数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**服务端实现：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ServerTCP {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("服务端启动 , 等待连接 .... ");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.创建 ServerSocket对象，绑定端口，开始等待连接")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServerSocket ss = new ServerSocket(6666);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.接收连接 accept 方法, 返回 socket 对象.")]),s(`
`),n("span",{class:"line"},[n("span",null,"Socket server = ss.accept();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3.通过socket 获取输入流")]),s(`
`),n("span",{class:"line"},[n("span",null,"InputStream is = server.getInputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.一次性读取数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.1 创建字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[1024];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.2 据读取到字节数组中.")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len = is.read(b)；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4.3 解析数组,打印字符串信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"String msg = new String(b, 0, len);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(msg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// =================回写数据=======================")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 5. 通过 socket 获取输出流")]),s(`
`),n("span",{class:"line"},[n("span",null,"OutputStream out = server.getOutputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 6. 回写数据")]),s(`
`),n("span",{class:"line"},[n("span",null,'out.write("我很好,谢谢你".getBytes());')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 7.关闭资源.")]),s(`
`),n("span",{class:"line"},[n("span",null,"out.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"is.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**客户端实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ClientTCP {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws Exception {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("客户端 发送数据");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.创建 Socket ( ip , port ) , 确定连接到哪里.")]),s(`
`),n("span",{class:"line"},[n("span",null,'Socket client = new Socket("localhost", 6666);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.通过Scoket,获取输出流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"OutputStream os = client.getOutputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3.写出数据.")]),s(`
`),n("span",{class:"line"},[n("span",null,'os.write("你好么? tcp ,我来了".getBytes());')]),s(`
`),n("span",{class:"line"},[n("span",null,"// ==============解析回写=========================")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 4. 通过Scoket,获取 输入流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"InputStream in = client.getInputStream();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 5. 读取数据数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[100];")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len = in.read(b);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(new String(b, 0, len));")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 6. 关闭资源 .")]),s(`
`),n("span",{class:"line"},[n("span",null,"in.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"os.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"client.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(c,[["render",t]]);export{m as __pageData,v as default};
