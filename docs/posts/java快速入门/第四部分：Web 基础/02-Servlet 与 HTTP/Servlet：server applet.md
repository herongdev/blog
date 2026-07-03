---
title: Servlet：server applet
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**概念：**运行在服务器端的小程序
`* Servlet`就是一个接口，定义了`Java`类被浏览器访问到`(tomcat`识别`)`的规则。
`*` 将来我们自定义一个类，实现`Servlet`接口，复写方法。

**快速入门：**
`1.` 创建`JavaEE`项目
`2.` 定义一个类，实现`Servlet`接口

* public class ServletDemo1 implements Servlet
3.
实现接口中的抽象方法
`4.` 配置

`Servlet`

在`web.xml`中配置：
`\<!--`配置

Servlet --\>
    \<servlet\>
        \<servlet-name\>demo1\</servlet-name\>
        \<servlet-class\>cn.itcast.web.servlet.ServletDemo1\</servlet-class\>
    \</servlet\>

    \<servlet-mapping\>
        \<servlet-name\>demo1\</servlet-name\>
        \<url-pattern\>/demo1\</url-pattern\>
    \</servlet-mapping\>
**执行原理：**
`1.` 当服务器接受到客户端浏览器的请求后，会解析请求`URL`路径，获取访问的`Servlet`的资源路径
`2.` 查找`web.xml`文件，是否有对应的`\<url-pattern\>`标签体内容。
`3.` 如果有，则在找到对应的`\<servlet-class\>`全类名
`4. tomcat`会将字节码文件加载进内存，并且创建其对象
`5.` 调用其方法

![public class Serv1etDem01 Override public void ser...](Exported%20image%2020260702225914-0.png)

`Servlet`**中的生命周期方法：**

![public class Serv1etDem01 implements Servlet Overr...](Exported%20image%2020260702225917-1.png)

`1.` 被创建：执行`init`方法，只执行一次。
`Servlet`什么时候被创建：默认情况下，第一次被访问时，`Servlet`被创建；可以配置执行`Servlet`的创建时机，在`\<servlet\>`标签下配置：

![servlet servlet name servlet name servlet class . ...](Exported%20image%2020260702225920-2.png)

`1.` 第一次被访问时，创建`\<load-on-startup\>`的值为负数
`2.` 在服务器启动时，创建`\<load-on-startup\>`的值为`0`或正整数
`* Servlet`的`init`方法，只执行一次，说明一个`Servlet`在内存中只存在一个对象，`Servlet`是单例的：
`*` 多个用户同时访问时，可能存在线程安全问题。
`*` 解决：尽量不要在`Servlet`中定义成员变量。即使定义了成员变量，也不要对修改值

`2.` 提供服务：执行`service`方法，执行多次
`*` 每次访问`Servlet`时，`Service`方法都会被调用一次。

`3.` 被销毁：执行`destroy`方法，只执行一次
`* Servlet`被销毁时执行。服务器关闭时，`Servlet`被销毁
`*` 只有服务器正常关闭时，才会执行`destroy`方法。
`* destroy`方法在`Servlet`被销毁之前执行，一般用于释放资源

`Servlet3.0`**：**
`*` 好处：
`*` 支持注解配置。可以不需要`web.xml`了。
`*` 步骤：
`1.` 创建`JavaEE`项目，选择`Servlet`的版本`3.0`以上，可以不创建

- web.xml
- 2.

定义一个类，实现`Servlet`接口
`3.` 复写方法
`4.` 在类上使用`@WebServlet`注解，进行配置：`@WebServlet("`资源路径`")`

`IDEA`**与**`tomcat`**的相关配置**
`1. IDEA`会为每一个`tomcat`部署的项目单独建立一份配置文件

![G run 20190813 100347 96Artifact servletwar explod...](Exported%20image%2020260702225921-3.png)

`2.` 工作空间项目和`tomcat`部署的`web`项目
`* tomcat`真正访问的是“`tomcat`部署的`web`项目”，`"tomcat`部署的`web`项目`"`对应`"`工作空间项目`"` 的`web`目录下的所有资源
`* WEB-INF`目录下的资源不能被浏览器直接访问。
`3.` 断点调试：使用`"`小虫子`"`启动 `dubug` 启动
