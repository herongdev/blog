---
title: Tomcat：web服务器软件
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
`1.` 下载：`http://tomcat.apache.org/`

`2.` 安装：解压压缩包即可。
`*` 注意：安装目录建议不要有中文和空格

![Exported image](Exported%20image%2020260702233431-0.png)

`3.` 卸载：删除目录就行了

`4.` 启动：
`* bin/startup.bat ,`双击运行该文件即可
`*` 访问：浏览器输入：`http://localhost:8080` 回车访问自己

http://
别人的

`ip:8080`

访问别人
`*` 可能遇到的问题：
`1.` 黑窗口一闪而过：
`*` 原因： 没有正确配置`JAVA_HOME`环境变量
`*` 解决方案：正确配置`JAVA_HOME`环境变量
`2.` 启动报错：
`1.` 暴力：找到占用的端口号，并且找到对应的进程，杀死该进程

- * netstat -ano
- 2.

温柔：修改自身的端口号

- * conf/server.xml
- * \<Connector port="8888" protocol="HTTP/1.1"
- connectionTimeout="20000"
- redirectPort="8445" /\>
- *

一般会将`tomcat`的默认端口号修改为`80`。`80`端口号是`http`协议的默认端口号。
`*` 好处：在访问时，就不用输入端口号

`5.` 关闭：
`1.` 正常关闭：

- * bin/shutdown.bat
- * ctrl+c
- 2.

强制关闭：
`*` 点击启动窗口的×

`6.` 配置

- :
- *

部署项目的方式：
`1.` 直接将项目放到`webapps`目录下即可。
`* /hello`：项目的访问路径`--\>`虚拟目录
`*` 简化部署：将项目打成一个`war`包，再将`war`包放置到`webapps`目录下。
`* war`包会自动解压缩
`2.` 配置`conf/server.xml`文件
在`\<Host\>`标签体中配置

- \<Context docBase="D:\hello" path="/hehe" /\>
- * docBase:

项目存放的路径
`* path`：虚拟目录
`3.` 在`conf\Catalina\localhost`创建任意名称的`xml`文件。在文件中编写

- \<Context docBase="D:\hello" /\>
- *

虚拟目录：`xml`文件的名称

`*` 静态项目和动态项目：
`*` 目录结构
`* java`动态项目的目录结构：
`--` 项目的根目录
`-- WEB-INF`目录：
`-- web.xml`：`web`项目的核心配置文件
`-- classes`目录：放置字节码文件的目录
`-- lib`目录：放置依赖的`jar`包
`*` 将`Tomcat`集成到`IDEA`中，并且创建`JavaEE`的项目，部署项目。
