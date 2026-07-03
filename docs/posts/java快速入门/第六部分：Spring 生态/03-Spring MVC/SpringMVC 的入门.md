---
title: SpringMVC 的入门
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
**前期准备**
**下载开发包：**

 https://spring.io/projects
 其实

`spring mvc`

的 `jar` 包就在之前我们的 `spring` 框架开发包中。

![Exported image](Exported%20image%2020260702233325-0.png)

**创建一个**

- javaweb
- jsp

中的内容：

\<a href="${pageContext.request.contextPath}/hello"\>SpringMVC
入门案例

- \</a\>
- \<br/\>
- \<a href="hello"\>SpringMVC

入门案例

`\</a\>`

**拷贝** `jar` **包**
`spring mvc` 的 `jar` 包就在除了上面两个 `jar` 包之外，还需要拷贝 `spring` 的注解 `ioc` 所需 `jar` 包（包括一个 `aop` 的 `jar` 包）。

配置核心控制器`-`一个

 Servlet
\<?xml version="1.0" encoding="UTF-8"?\>
\<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns="http://java.sun.com/xml/ns/javaee"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
id="WebApp_ID" version="2.5"\>
\<!--
配置 `spring mvc` 的核心控制器

 --\>
\<servlet\>
\<servlet-name\>SpringMVCDispatcherServlet\</servlet-name\>
\<servlet-class\>
org.springframework.web.servlet.DispatcherServlet
\</servlet-class\>
\<!--
配置初始化参数，用于读取 `SpringMVC` 的配置文件

 --\>
\<init-param\>
\<param-name\>contextConfigLocation\</param-name\>
\<param-value\>classpath:SpringMVC.xml\</param-value\>
\</init-param\>
\<!--
配置 `servlet` 的对象的创建时间点：应用加载时创建。
取值只能是非

`0`

正整数，表示启动顺序

 --\>
\<load-on-startup\>1\</load-on-startup\>
\</servlet\>
\<servlet-mapping\>
\<servlet-name\>SpringMVCDispatcherServlet\</servlet-name\>
\<url-pattern\>/\</url-pattern\>
\</servlet-mapping\>
\</web-app\>
**创建** `spring mvc` **的配置文件**

\<?xml version="1.0" encoding="UTF-8"?\>
\<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:mvc="http://www.springframework.org/schema/mvc"
xmlns:context="http://www.springframework.org/schema/context"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/mvc
http://www.springframework.org/schema/mvc/spring-mvc.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd"\>
\<!--
配置创建 `spring` 容器要扫描的包

 --\>
\<context:component-scan base-package="com.itheima"\>\</context:component-scan\>
\<!--
配置视图解析器 `--\>`
\<

bean
class="org.springframework.web.servlet.view.InternalResourceViewResolver"\>
\<property name="prefix" value="/WEB-INF/pages/"\>\</property\>
\<property name="suffix" value=".jsp"\>\</property\>
\</bean\>
\</beans\>
**编写控制器并使用注解配置**

/**
* spring mvc
的入门案例

* @author
黑马程序员

* @Company http://www.ithiema.com
* @Version 1.0
*/
@Controller("helloController")
public class HelloController {
@RequestMapping("/hello")
public String sayHello() {
System.out.println("HelloController
的 `sayHello` 方法执行了。。。。

");
return "success";
}
}
￼
测试

![C localhost 8585 index. j sp zzcat_SSH Tocats. S C...](Exported%20image%2020260702233329-1.png)

**入门案例的执行过程及原理分析**

**案例的执行过程**
`1`、服务器启动，应用被加载。读取到 `web.xml` 中的配置创建 `spring` 容器并且初始化容器中的对象。从入门案例中可以看到的是：`HelloController` 和 `InternalResourceViewResolver`，但是远不
止这些。

`2`

、浏览器发送请求，被 `DispatherServlet` 捕获，该 `Servlet` 并不处理请求，而是把请求转发出去。转发的路径是根据请求 `URL`，匹配`@RequestMapping` 中的内容。
`3`、匹配到了后，执行对应方法。该方法有一个返回值。

`4`

、根据方法的返回值，借助 `InternalResourceViewResolver` 找到对应的结果视图。

`5`

、渲染结果视图，响应浏览器。

`SpringMVC` **的请求响应流程**

![Incoming request Front controller Delegate request...](Exported%20image%2020260702233332-2.png)

**入门案例中涉及的组件**
`DispatcherServlet`**：前端控制器**
用户请求到达前端控制器，它就相当于 `mvc` 模式中的 `c`，`dispatcherServlet` 是整个流程控制的中心，由它调用其它组件处理用户的请求，`dispatcherServlet` 的存在降低了组件之间的耦合性。

`HandlerMapping`**：处理器映射器**
`HandlerMapping` 负责根据用户请求找到 `Handler` 即处理器，`SpringMVC` 提供了不同的映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式等。

`Handler`**：处理器**
它就是我们开发中要编写的具体业务控制器。由

`DispatcherServlet`

把用户请求转发到 `Handler`。由

`Handler`

对具体的用户请求进行处理。

`HandlAdapter`**：处理器适配器**
通过 `HandlerAdapter` 对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。

![Exported image](Exported%20image%2020260702233336-3.png)

`View Resolver`**：视图解析器**
`View Resolver` 负责将处理结果生成 `View` 视图，`View Resolver` 首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成 `View` 视图对象，最后对 `View` 进行渲染将处理结果通过页面展示给用户。

`View`**：视图**
`SpringMVC` 框架提供了很多的 `View` 视图类型的支持，包括：`jstlView`、`freemarkerView`、`pdfView`
等。我们最常用的视图就是

`jsp`

。
一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面。

`\<mvc:annotation-driven\>`**说明**
在

`SpringMVC`

的各个组件中，处理器映射器、处理器适配器、视图解析器称为 `SpringMVC` 的三大组件。
使 用

`\<mvc:annotation-driven\>`

自动加载 `RequestMappingHandlerMapping` （处理映射器） 和

`RequestMappingHandlerAdapter`

（ 处 理 适 配 器 ） ， 可 用 在 `SpringMVC.xml` 配 置 文 件 中 使 用

`\<mvc:annotation-driven\>`

替代注解处理器和适配器的配置。
它就相当于在

`xml`

中配置了：

`\<!--`

上面的标签相当于 如下配置

--\>
\<!-- Begin --\>
\<!-- HandlerMapping --\>
\<bean
class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerM
apping"\>\</bean\>
\<bean
class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"\>\</bean\>
\<!-- HandlerAdapter --\>
\<bean
class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerA
dapter"\>\</bean\>
\<bean
class="org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter"\>\</bean\>
\<bean
class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"\>\</bean\>
\<!-- HadnlerExceptionResolvers --\>
\<bean
class="org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExcept
ionResolver"\>\</bean\>
\<bean
class="org.springframework.web.servlet.mvc.annotation.ResponseStatusExceptionResolv
er"\>\</bean\>
\<bean
class="org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver"
\>\</bean\>
\<!-- End --\>
 **注意：**
**一般开发中，我们都需要写上此标签（虽然从入门案例中看，我们不写也行，随着课程的深入，该标签还**
**有具体的使用场景）。**
**明确：**
我们只需要编写处理具体业务的控制器以及视图。

`RequestMapping` **注解**
**使用说明**
**源码：**

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {
}
 **作用：** 用于建立请求 `URL` 和处理请求方法之间的对应关系。
出现位置： 类上
请求

`URL`

的第一级访问目录。此处不写的话，就相当于应用的根目录。写的话需要以`/`开头。
它出现的目的是为了使我们的

`URL`

可以按照模块化管理`:`
例如：
账户模块：

- /account/add
- /account/update
- /account/delete
- ...

 订单模块：

- /order/add
- /order/update
- /order/delete

 红色的部分就是把

`RequsetMappding`

写在类上，使我们的 `URL` 更加精细。
方法上：
请求

`URL`

的第二级访问目录。
**属性：**

`value`

：用于指定请求的 `URL`。它和 `path` 属性的作用是一样的。

`method`

：用于指定请求的方式。

`params`

：用于指定限制请求参数的条件。它支持简单的表达式。要求请求参数的 `key` 和 `value` 必须和
配置的一模一样。
例如：

params = {"accountName"}
，表示请求参数必须有

 accountName
params = {"moeny!100"}
，表示请求参数中 `money` 不能是 `100`。

`headers`

：用于指定限制请求消息头的条件。
注意：
以上四个属性只要出现

`2`

个或以上时，他们的关系是与的关系。

**使用示例**
**出现位置的示例：**
**控制器代码**

:
/**
* RequestMapping
注解出现的位置

*/
@Controller("accountController")
@RequestMapping("/account")
public class AccountController {
￼

public String findAccount() {
System.out.println("
查询了账户。。。。

");
return "success";
}
}

`jsp` **中的代码：**

\<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%\>
\<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd"\>
\<html\>
\<head\>
\<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"\>
\<title\>requestmapping
的使用

- \</title\>
- \</head\>
- \<body\>
- \<!--

第一种访问方式

 --\>
\<a href="${pageContext.request.contextPath}/account/findAccount"\>
 查询账户

- \</a\>
- \<br/\>
- \<!--

第二种访问方式

- --\>
- \<a href="account/findAccount"\>

查询账户

- \</a\>
- \</body\>
- \</html\>

 **注意：**
**当我们使用此种方式配置时，在**

`jsp`

**中第二种写法时，不要在访问** `URL` **前面加**`/`**，否则无法找到资源。**

`method` **属性的示例：**
**控制器代码：**

/**
*
保存账户

* @return
*/
@RequestMapping(value="/saveAccount",method=RequestMethod.POST)
public String saveAccount() {
System.out.println("
保存了账户

");
return "success";
}
￼
jsp 代码：
`\<!--` 请求方式的示例

- --\>
- \<a href="account/saveAccount"\>

保存账户，`get` 请求

\</a\>
\<br/\>
\<form action="account/saveAccount" method="post"\>
\<input type="submit" value="
_保存账户，_`post` _请求_

- "\>
- \</form\>

 **注意：**
当使用

`get`

请求时，提示错误信息是 `405`，信息是方法不支持 `get` 方式请求

![HTTP Status 405 Status Report Method Not Allowed u...](Exported%20image%2020260702233342-4.png)

`params` **属性的示例：**
**控制器的代码：**

/**
*
删除账户

* @return
*/
@RequestMapping(value="/removeAccount",params= {"accountName","money\>100"})
public String removeAccount() {
System.out.println("
删除了账户

");
return "success";
}
jsp
**中的代码：**

`\<!--`

请求参数的示例

 --\>
\<a href="account/removeAccount?accountName=aaa&money\>100"\>
删除账户，金额

 100\</a\>
\<br/\>
\<a href="account/removeAccount?accountName=aaa&money\>150"\>
删除账户，金额

`150\</a\>`
 **注意：**
当我们点击第一个超链接时`,`可以访问成功。
当我们点击第二个超链接时，无法访问。如下图：

![HTTP Status 400 Bad Request Status Report Paramete...](Exported%20image%2020260702233345-5.png)
![SpringXUC Jspe hello 1. Request 11. response ViewR...](Exported%20image%2020260702233348-6.png)
