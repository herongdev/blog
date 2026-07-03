---
title: Cookie
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**会话技术**
  `1.` 会话：一次会话中包含多次请求和响应。
     `*` 一次会话：浏览器第一次给服务器资源发送请求，会话建立，直到有一方断开为止
  `2.` 功能：在一次会话的范围内的多次请求间，共享数据
  `3.` 方式：
     `1.` 客户端会话技术：

- Cookie
- 2.

服务器端会话技术：`Session`

`Cookie`**：**
概念：客户端会话技术，将数据保存到客户端

**快速入门：**
   `*` 使用步骤：
   `1.` 创建`Cookie`对象，绑定数据

- * new Cookie(String name, String value)
- 2.

发送`Cookie`对象

`* response.addCookie(Cookie cookie)`

`3.` 获取`Cookie`，拿到数据
      `* Cookie[] request.getCookies()`

**实现原理**
   `*` 基于响应头`set-cookie`和请求头`cookie`实现

![set e o cookie o CookieDem01 Rcookie CookieDem02 d...](Exported%20image%2020260702223636-0.png)

`cookie`**的细节**
`1.` 一次可不可以发送多个

- cookie?
- *

可以
`*` 可以创建多个`Cookie`对象，然后多次调用`response`.`addCookie`方法发送`cookie`即可。

`2. cookie`在浏览器中保存多长时间？
`1.` 默认情况下，当浏览器关闭后，`Cookie`数据被销毁
`2.` 持久化存储：
`* setMaxAge(int seconds)`

![public CookieDem04 HttpServIet protected void doPo...](Exported%20image%2020260702223639-1.png)

`1.` 正数：将`Cookie`数据写到硬盘的文件中。持久化存储。并指定`cookie`存活时间，时间到后，`cookie`文件自动失效
`2.` 负数：默认值，浏览器关闭后销毁`Cookie`；
`3.` 零：删除`cookie`信息

`3. cookie`

能不能存中文？
   `*` 在`tomcat 8` 之前 `cookie`中不能直接存储中文数据。
   `*` 需要将中文数据转码`---`一般采用`URL`编码

`(%E3)`

，即用`%`加两个`16`进制数字表示一个字节。
   `*` 在`tomcat 8` 之后，`cookie`支持中文数据。特殊字符还是不支持，建议使用`URL`编码存储，`URL`解码解析。

`4. cookie`

共享问题？
   `1.` 假设在一个`tomcat`服务器中，部署了多个`web`项目，那么在这些`web`项目中`cookie`能不能共享？
    `*` 默认情况下`cookie`不能共享
    `* setPath(String path)`：设置`cookie`的获取范围。默认情况下，设置当前的虚拟目录
    `*` 如果要共享，则可以将`path`设置为`"/"`  

![Cookie cl n. Cookie name value 13. ECookie respons...](Exported%20image%2020260702223643-2.png)

`2.`

不同的`tomcat`服务器间`cookie`共享问题？
    `* setDomain(String path)`：如果设置一级域名相同，那么多个服务器之间`cookie`可以共享
    `* setDomain(".baidu.com")`，那么`tieba.baidu.com`和`news.baidu.com`中`cookie`可以共享

`5. Cookie`

的特点和作用
  `1. cookie`存储数据在客户端浏览器
  `2.` 浏览器对于单个`cookie` 的大小有限制`(4kb)` 以及 对同一个域名下的总`cookie`数量也有限制`(20`个

- )
- *

作用：
    `1. cookie`一般用于存出少量的不太敏感的数据
    `2.` 在不登录的情况下，完成服务器对客户端的身份识别
