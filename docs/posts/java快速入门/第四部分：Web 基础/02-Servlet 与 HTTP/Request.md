---
title: Request
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
```
request对象和response对象的原理
1. request和response对象是由服务器创建的。我们来使用它们
2. request对象是来获取请求消息，response对象是来设置响应消息

request对象继承体系结构：
ServletRequest	-- 接口
|	继承
HttpServletRequest	-- 接口
|	实现
org.apache.catalina.connector.RequestFacade 类(tomcat)
 ![0 day 14demo 1. t rv t 1 2 t r u t r p n r u t 3 t...](Exported%20image%2020260702225940-0.png)

**request****功能：**
一、获取请求消息数据
1. 获取请求行数据
* GET /day14/demo1?name=zhangsan HTTP/1.1
* 方法：
1. 获取请求方式 ：GET
* String getMethod()
2. (*)获取虚拟目录：/day14
* String getContextPath()
3. 获取Servlet路径: /demo1
* String getServletPath()
4. 获取get方式请求参数：name=zhangsan
* String getQueryString()
5. (*)获取请求URI：/day14/demo1
* String getRequestURI():/day14/demo1
* StringBuffer getRequestURL():http://localhost/day14/demo1
* URL:统一资源定位符 ： [http://localhost/day14/demo1](http://localhost/day14/demo1)
* URI：统一资源标识符 : /day14/demo1
6. 获取协议及版本：HTTP/1.1
* String getProtocol()
7. 获取客户机的IP地址：
* String getRemoteAddr()

2. 获取请求头数据
* 方法：
* (*)String getHeader(String name):通过请求头的名称获取请求头的值
* Enumeration\<String\> getHeaderNames():获取所有的请求头名称

3. 获取请求体数据:
* 请求体：只有POST请求方式，才有请求体，在请求体中封装了POST请求的请求参数
* 步骤：
1. 获取流对象
*  BufferedReader getReader()：获取字符输入流，只能操作字符数据
*  ServletInputStream getInputStream()：获取字节输入流，可以操作所有类型数据
* 在文件上传知识点后讲解
2. 再从流对象中拿数据

二、其他功能：
1. 获取请求参数通用方式：不论get还是post请求方式都可以使用下列方法来获取请求参数
1. String getParameter(String name):根据参数名称获取参数值    username=zs&password=123
2. String[] getParameterValues(String name):根据参数名称获取参数值的数组  hobby=xx&hobby=game
3. Enumeration\<String\> getParameterNames():获取所有请求的参数名称
4. Map\<String,String[]\> getParameterMap():获取所有参数的map集合
* 中文乱码问题：
* get方式：tomcat 8 已经将get方式乱码问题解决了
* post方式：会乱码
* 解决：在获取参数前，设置request的编码request.setCharacterEncoding("utf-8");

2. 请求转发：一种在服务器内部的资源跳转方式
1. 步骤：
1. 通过request对象获取请求转发器对象：RequestDispatcher getRequestDispatcher(String path)
2. 使用RequestDispatcher对象来进行转发：forward(ServletRequest request, ServletResponse response)
2. 特点：
1. 浏览器地址栏路径不发生变化
2. 只能转发到当前服务器内部资源中。
3. 转发是一次请求

3. 共享数据：
* 域对象：一个有作用范围的对象，可以在范围内共享数据
* request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
* 方法：
1. void setAttribute(String name,Object obj):存储数据
2. Object getAttitude(String name):通过键获取值
3. void removeAttribute(String name):通过键移除键值对

4. 获取ServletContext：
* ServletContext getServletContext()
```
