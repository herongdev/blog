---
title: IDEA配置Maven
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
`Idea` 自带了`apache maven`，默认使用的是内置`maven`，所以我们可以配置全局`setting`，来调整一下配置，比如远程仓库地址，本地编译环境变量等。

`1.`打开`Settings,`在输入框输入`maven`，如图

![Default Settings q maven Appearance Behavior Notif...](Exported%20image%2020260702225033-0.png)

`2.`如果本地设置了`MAVEN_OPTS` 系统环境变量，这个步骤可以忽略。

![Default Settings Q maven V Appearance Behavior Not...](Exported%20image%2020260702225039-1.png)

 `3.`如果配置了本地`apache-maven setting.xml` 中的软件源，这步骤可以忽略。

![Default Settings Q maven V Appearance Behavior Not...](Exported%20image%2020260702225042-2.png)
**利用**`maven`**骨架建立一个**`webapp`
选择`create new project-Maven-Create from archetype`。找到`maven-archetype-webapp`这个骨架，然后`next`。

![New Project Java Java Enterprise Clouds Spring Jav...](Exported%20image%2020260702225044-3.png)

输入`GroupId`和`ArtifactId`后下一步。

![New project Groupld A rtifactld Vers ion com.examp...](Exported%20image%2020260702225047-4.png)

填写本地的`maven`环境，这里可以选择自己本地的环境，也可以用`idea`自带的`maven3.0.5`。配置相应的配置文件，`idea`自带的`maven`是没有配置文件的，需要单独配置的可以在相应的目录中添加`setting.xml`文件，例如需要配置`jdk`版本或者`maven mirror`的。

![New Project Maven home directory. Bundled Maven 3 ...](Exported%20image%2020260702225049-5.png)

由于`maven`骨架和一些`jar`需要去`maven`的仓库下载，所以创建项目的时候速度会非常慢（外国的服务器你懂得），因此我们可以直接访问`http://repo1.maven.org/maven2/archetype-catalog.xml`，把这个`xml`下载下来放到本地的`maven`目录中，然后在添加一个参数`archetypeCatalog=internal`就可以了。
`next` 填写项目名称，`finish`即可。
建立相应的目录
项目创建完成后，`src-main`下建立`java`目录后，是无法在该目录下创建新的包和`java`类等文件的。在`idea`中需要对目录进行标注。

![pmject Structure Ptojct Settings Libraries Platfor...](Exported%20image%2020260702225051-6.png)

`Sources` 一般用于标注类似 `src` 这种可编译目录。有时候我们不单单项目的 `src` 目录要可编译，还有其他一些特别的目录也许我们也要作为可编译的目录，就需要对该目录进行此标注。只有 `Sources` 这种可编译目录才可以新建 `Java` 类和包，这一点需要牢记。
`Tests` 一般用于标注可编译的单元测试目录。在规范的 `maven` 项目结构中，顶级目录是 `src`，`maven` 的 `src` 我们是不会设置为 `Sources` 的，而是在其子目录 `main` 目录下的 `java` 目录，我们会设置为 `Sources`。而单元测试的目录是 `src - test - java`，这里的 `java` 目录我们就会设置为 `Tests`，表示该目录是作为可编译的单元测试目录。一般这个和后面几个我们都是在 `maven` 项目下进行配置的，但是我这里还是会先说说。从这一点我们也可以看出 `IntelliJ IDEA` 对 `maven` 项目的支持是比较彻底的。
`Resources` 一般用于标注资源文件目录。在 `maven` 项目下，资源目录是单独划分出来的，其目录为：`src - main -resources`，这里的 `resources` 目录我们就会设置为 `Resources`，表示该目录是作为资源目录。资源目录下的文件是会被编译到输出目录下的。
`Test Resources` 一般用于标注单元测试的资源文件目录。在 `maven` 项目下，单元测试的资源目录是单独划分出来的，其目录为：`src - test -resources`，这里的 `resources` 目录我们就会设置为 `Test Resources`，表示该目录是作为单元测试的资源目录。资源目录下的文件是会被编译到输出目录下的。
`Excluded` 一般用于标注排除目录。被排除的目录不会被 `IntelliJ IDEA` 创建索引，相当于被 `IntelliJ IDEA` 废弃，该目录下的代码文件是不具备代码检查和智能提示等常规代码功能。
通过上面的介绍，我们知道对于非 `maven` 项目我们只要会设置 `src` 即可。
（引用自`http://wiki.jikexueyuan.com/project/intellij-idea-tutorial/eclipse-java-web-project-introduce.html`）
标注完后，建立如下的目录。

![mavenspringmvc j avaft6 com.example comtroller dao...](Exported%20image%2020260702225053-7.png)

**配置**`Maven`**和**`SpringMVC`
配置`Maven`的`pom.xml`
完整的配置文件如下。

\<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"\>
    \<modelVersion\>4.0.0\</modelVersion\>
    \<groupId\>com.example\</groupId\>
    \<artifactId\>maven-springmvc\</artifactId\>
    \<packaging\>war\</packaging\>
    \<version\>1.0-SNAPSHOT\</version\>
    \<name\>maven-springmvc Maven Webapp\</name\>
    \<url\>http://maven.apache.org\</url\>
    \<!--
项目依赖

- --\>
- \<dependencies\>
- \<!--

日志包

--\>
        \<dependency\>
            \<groupId\>junit\</groupId\>
            \<artifactId\>junit\</artifactId\>
            \<version\>3.8.1\</version\>
            \<scope\>test\</scope\>
        \</dependency\>
        \<dependency\>
            \<groupId\>org.slf4j\</groupId\>
            \<artifactId\>slf4j-log4j12\</artifactId\>
            \<version\>1.7.21\</version\>
        \</dependency\>

        \<!--j2ee
相关包 `servlet`、`jsp`、

jstl--\>
        \<dependency\>
            \<groupId\>javax.servlet\</groupId\>
            \<artifactId\>javax.servlet-api\</artifactId\>
            \<version\>3.1.0\</version\>
        \</dependency\>
        \<dependency\>
            \<groupId\>javax.servlet.jsp\</groupId\>
            \<artifactId\>jsp-api\</artifactId\>
            \<version\>2.2\</version\>
        \</dependency\>
        \<dependency\>
            \<groupId\>javax.servlet\</groupId\>
            \<artifactId\>jstl\</artifactId\>
            \<version\>1.2\</version\>
        \</dependency\>

        \<!--mysql
驱动包

- --\>
- \<dependency\>
- \<groupId\>mysql\</groupId\>
- \<artifactId\>mysql-connector-java\</artifactId\>
- \<version\>5.1.35\</version\>
- \</dependency\>
- \<!--spring

相关包

--\>
        \<dependency\>
            \<groupId\>org.springframework\</groupId\>
            \<artifactId\>spring-web\</artifactId\>
            \<version\>4.3.1.RELEASE\</version\>
        \</dependency\>
        \<dependency\>
            \<groupId\>org.springframework\</groupId\>
            \<artifactId\>spring-webmvc\</artifactId\>
            \<version\>4.3.1.RELEASE\</version\>
        \</dependency\>

        \<!--
其他需要的包

--\>
        \<dependency\>
            \<groupId\>org.apache.commons\</groupId\>
            \<artifactId\>commons-lang3\</artifactId\>
            \<version\>3.4\</version\>
        \</dependency\>
        \<dependency\>
            \<groupId\>commons-fileupload\</groupId\>
            \<artifactId\>commons-fileupload\</artifactId\>
            \<version\>1.3.1\</version\>
        \</dependency\>
    \</dependencies\>

    \<build\>
        \<finalName\>maven-springmvc\</finalName\>
        \<resources\>
            \<!--
表示把`java`目录下的有关`xml`文件`,properties`文件编译`/`打包的时候放在`resource`目录下

--\>
            \<resource\>
                \<directory\>${basedir}/src/main/java\</directory\>
                \<includes\>
                    \<include\>**/*.properties\</include\>
                    \<include\>**/*.xml\</include\>
                \</includes\>
            \</resource\>
            \<resource\>
                \<directory\>${basedir}/src/main/resources\</directory\>
            \</resource\>
        \</resources\>
        \<plugins\>
            \<!--servlet
容器 `jetty`插件

--\>
            \<plugin\>
                \<groupId\>org.eclipse.jetty\</groupId\>
                \<artifactId\>jetty-maven-plugin\</artifactId\>
                \<version\>9.3.10.v20160621\</version\>
            \</plugin\>
        \</plugins\>
    \</build\>
\</project\>
 更新完`pom.xml`文件后，`idea`应该会自动下载相应的`jar`包（可能需要`vpn`），如果没有自动下载的话，可以点击“`Reimport All Maven Projects`”按钮进行项目的重新载入。如图所示。

![Maven Projects mavenspringmvc Maven Webapp Lifecyc...](Exported%20image%2020260702225058-8.png)

`jar`下载完成后，所有项目所需的依赖就已经添加完成了。

配置

- web.xml
- maven

默认生成的`web.xml`版本是`2.3`的，所以有些配置节点`idea`会识别不出来，因此我们重新添加一个`3.0`的。

\<?xml version="1.0" encoding="UTF-8"?\>
\<web-app xmlns="http://java.sun.com/xml/ns/javaee"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
          http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
           version="3.0"\>
    \<!--welcome pages--\>
    \<welcome-file-list\>
        \<welcome-file\>index.jsp\</welcome-file\>
    \</welcome-file-list\>

    \<!--
配置

springmvc DispatcherServlet--\>
    \<servlet\>
        \<servlet-name\>springMVC\</servlet-name\>
        \<servlet-class\>org.springframework.web.servlet.DispatcherServlet\</servlet-class\>
        \<init-param\>
            \<!--Sources
标注的文件夹下需要新建一个`spring`文件夹

--\>
            \<param-name\>contextConfigLocation\</param-name\>
            \<param-value\>classpath:spring/spring-mvc.xml\</param-value\>
        \</init-param\>
        \<load-on-startup\>1\</load-on-startup\>
        \<async-supported\>true\</async-supported\>
    \</servlet\>
    \<servlet-mapping\>
        \<servlet-name\>springMVC\</servlet-name\>
        \<url-pattern\>/\</url-pattern\>
    \</servlet-mapping\>
\</web-app\>
 接收到的`http`请求通过`DispatcherServlet`进行分发。

配置`contextConfigLocation`文件

\<?xml version="1.0" encoding="UTF-8"?\>
\<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                        http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
                         http://www.springframework.org/schema/context
                        http://www.springframework.org/schema/context/spring-context-3.2.xsd
                        http://www.springframework.org/schema/mvc
                        http://www.springframework.org/schema/mvc/spring-mvc.xsd"\>
    \<!--
启用`spring`的一些

- annotation --\>
- \<context:annotation-config/\>
- \<!--

自动扫描该包，使`SpringMVC`认为包下用了`@controller`注解的类是控制器

 --\>
    \<context:component-scan base-package="com.zjut.ssm.controller"\>
        \<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/\>
    \</context:component-scan\>

    \<!--HandlerMapping
无需配置，`springmvc`可以默认启动

- --\>
- \<!--

静态资源映射

- --\>
- \<!--

本项目把静态资源放在了`WEB-INF`的`statics`目录下，资源映射如下

--\>
    \<mvc:resources mapping="/css/**" location="/WEB-INF/statics/css/"/\>
    \<mvc:resources mapping="/js/**" location="/WEB-INF/statics/js/"/\>
    \<mvc:resources mapping="/image/**" location="/WEB-INF/statics/image/"/\>

    \<!--
但是项目部署到`linux`下发现`WEB-INF`的静态资源会出现无法解析的情况，但是本地`tomcat`访问正常，因此建议还是直接把静态资源放在`webapp`的`statics`下，映射配置如下

--\>
    \<!--\<mvc:resources mapping="/css/**" location="/statics/css/"/\>--\>
    \<!--\<mvc:resources mapping="/js/**" location="/statics/js/"/\>--\>
    \<!--\<mvc:resources mapping="/image/**" location="/statics/images/"/\>--\>

    \<!--
配置注解驱动 可以将`request`参数与绑定到`controller`参数上

- --\>
- \<mvc:annotation-driven/\>
- \<!--

对模型视图名称的解析，即在模型视图名称添加前后缀`(`如果最后一个还是表示文件夹`,`则最后的斜杠不要漏了`)` 使用

- JSP--\>
- \<!--

默认的视图解析器 在上边的解析错误时使用 `(`默认使用

html)- --\>
    \<bean id="defaultViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver"\>
        \<property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/\>
        \<property name="prefix" value="/WEB-INF/views/"/\>\<!--
设置`JSP`文件的目录位置

- --\>
- \<property name="suffix" value=".jsp"/\>
- \</bean\>
- \<!-- springmvc

文件上传需要配置的节点

--\>
    \<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"\>
        \<property name="maxUploadSize" value="20971500"/\>
        \<property name="defaultEncoding" value="UTF-8"/\>
        \<property name="resolveLazily" value="true"/\>
    \</bean\>
\</beans\>
 配置`log4j.properties`
日志文件是`debug`中一个必不可少的工具，因此添加了`log4j`日志包。配置文件如下。

`#`配置根`Logger` 后面是若干个

- Appender
- log4j.rootLogger=DEBUG,A1,R
- #log4j.rootLogger=INFO,A1,R
- # ConsoleAppender

输出

log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss,SSS} [%c]-[%p] %m%n

# File
输出 一天一个文件`,`输出路径可以定制`,`一般在根路径下

log4j.appender.R=org.apache.log4j.DailyRollingFileAppender
log4j.appender.R.File=log.txt
log4j.appender.R.MaxFileSize=500KB
log4j.appender.R.MaxBackupIndex=10
log4j.appender.R.layout=org.apache.log4j.PatternLayout
log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} [%t] [%c] [%p] - %m%n
controller
和`view`的编写
在`controller`下新建一个“`HomeController`”。编写如下代码。

package com.zjut.ssm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Chingyu Mo
 * @create 2016-07-23-20:20
 */
//
注解标注此类为`springmvc`的`controller`，`url`映射为

"/home"
@Controller
@RequestMapping("/home")
public class HomeController {
    //
添加一个日志器

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    //
映射一个

action
    @RequestMapping("/index")
    public  String index(){
        //
输出日志文件

        logger.info("the first jsp pages");
        //
返回一个`index.jsp`这个视图

        return "index";
    }
}
 在`views`文件夹下建立一个`jsp`文件，名为“`index.jsp`”

基本的代码编写就完成了。

`servlet`容器的配置和运行
`servlet`容器有两种配置方式。

配置本地的`tomcat`服务器
配置`maven`插件
配置本地的`tomcat`服务器

根据上图配置`tomcat`服务器，如果用这种方法，本地需要下载`tomcat`并配置好环境变量。

主要有以下几个要点

`1.`选择本地的`tomcat`容器。
`2.`可以选择修改访问路径。
`3.On Update action` 当我们按 `Ctrl + F10` 进行容器更新的时候，可以根据我们配置的这个事件内容进行容器更新。其中我选择的 `Update classes and resources` 事件是最常用的，表示我们在按 `Ctrl + F10` 进行容器更新的时候，我们触发更新编译的类和资源文件到容器中。
`4.`默认 `Tomcat` 的 `HTTP` 端口是 `8080`，如果你需要改其端口可以在这里设置。
`5.`在 `Deployment` 选项卡中添加了 `Artifact`。
配置`maven`插件
`maven`插件的话有`tomcat`和`jetty`，两者都是`servlet`的容器。我这里配置的是`jetty`。插件已经在`pom.xml`中配置完成了。

- \<plugins\>
- \<!--servlet

容器 `jetty`插件

- --\>
- \<plugin\>
- \<groupId\>org.eclipse.jetty\</groupId\>
- \<artifactId\>jetty-maven-plugin\</artifactId\>
- \<version\>9.3.10.v20160621\</version\>
- \</plugin\>
- \</plugins\>

 再在`idea`中配置`jetty`。

运行第一个`Spring MVC`应用
点击`Run`，运行。

以上就是一个简单的`Spring MVC`应用在`idea`中的创建方式。
————————————————
版权声明：本文为`CSDN`博主「`Jimmy-`尹」的原创文章，遵循 `CC 4.0 BY-SA` 版权协议，转载请附上原文出处链接及本声明。
原文链接：`https://blog.csdn.net/jason201710/article/details/101757687`
