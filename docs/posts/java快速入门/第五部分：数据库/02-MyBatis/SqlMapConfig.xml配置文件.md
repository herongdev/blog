---
title: SqlMapConfig.xml配置文件
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
**6.1** **配置内容**
**6.1.1 SqlMapConfig.xml** **中配置的内容和顺序**
**-properties****（属性）**
**--property**
-settings（全局配置参数）
--setting
**-typeAliases****（类型别名）**
**--typeAliase**
**--package**
-typeHandlers（类型处理器）
-objectFactory（对象工厂）
-plugins（插件）
-environments（环境集合属性对象）
--environment（环境子属性对象）
---transactionManager（事务管理）
---dataSource（数据源）
**-mappers****（映射器）**
**--mapper**
**--package**
**6.2 properties****（属性）**
在使用 properties 标签配置时，我们可以采用两种方式指定属性配置。
**6.2.1** **第一种**
\<properties\>
\<property name=_"jdbc.driver"_ value=_"com.mysql.jdbc.Driver"_/\>
\<property name=_"jdbc.url"_ value=_"jdbc:mysql://localhost:3306/eesy"_/\>传智播客——专注于 Java、.Net 和 Php、网页平面设计工程师的培训
\<property name=_"jdbc.username"_ value=_"root"_/\>
\<property name=_"jdbc.password"_ value=_"1234"_/\>
\</properties\>
**6.2.2** **第二种**
**6.2.2.1** **在** **classpath** **下定义** **db.properties** **文件**
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/eesy
jdbc.username=root
jdbc.password=1234
**6.2.2.2 properties** **标签配置**
\<!-- 配置连接数据库的信息
resource 属性：用于指定 properties 配置文件的位置，要求配置文件必须在类路径下
resource="jdbcConfig.properties"
url 属性：
URL： Uniform Resource Locator 统一资源定位符
[http://localhost:8080/mystroe/CategoryServlet](http://localhost:8080/mystroe/CategoryServlet) URL
协议 主机 端口 URI
URI：Uniform Resource Identifier 统一资源标识符
/mystroe/CategoryServlet
它是可以在 web 应用中唯一定位一个资源的路径
--\>
\<properties url=
_file:///D:/IdeaProjects/day02_eesy_01mybatisCRUD/src/main/resources/jdbcConfig.prop_
_erties"_\>
\</properties\>
**6.2.3** **此时我们的** **dataSource** **标签就变成了引用上面的配置**
\<dataSource type=_"POOLED"_\>
\<property name=_"driver"_ value=_"__${jdbc.driver}__"_/\>
\<property name=_"url"_ value=_"__${jdbc.url}__"_/\>
\<property name=_"username"_ value=_"__${jdbc.username}__"_/\>
\<property name=_"password"_ value=_"__${jdbc.password}__"_/\>
\</dataSource\>传智播客——专注于 Java、.Net 和 Php、网页平面设计工程师的培训
**6.3 typeAliases****（类型别名）**
在前面我们讲的 Mybatis 支持的默认别名，我们也可以采用自定义别名方式来开发。
**6.3.1** **自定义别名：**
在 SqlMapConfig.xml 中配置：
\<typeAliases\>
\<!-- 单个别名定义 --\>
\<typeAlias alias=_"user"_ type=_"com.itheima.domain.User"_/\>
\<!-- 批量别名定义，扫描整个包下的类，别名为类名（首字母大写或小写都可以） --\>
\<package name=_"com.itheima.domain"_/\>
\<package name=_"__其它包__"_/\>
\</typeAliases\>
**6.4 mappers****（映射器）**
**6.4.1 \<mapper resource=" " /\>**
使用相对于类路径的资源
如：\<mapper resource="com/itheima/dao/IUserDao.xml" /\>
**6.4.2 \<mapper class=" " /\>**
使用 mapper 接口类路径
如：\<mapper class="com.itheima.dao.UserDao"/\>
**注意：此种方法要求** **mapper** **接口名称和** **mapper** **映射文件名称相同，且放在同一个目录中。**
**6.4.3 \<package name=""/\>**
注册指定包下的所有 mapper 接口
如：\<package name="cn.itcast.mybatis.mapper"/\>
**注意：此种方法要求** **mapper** **接口名称和** **mapper** **映射文件名称相同，且放在同一个目录中。**
