---
title: SpringBoot快速入门
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
```
**代码实现**
**创建****Maven****工程**
1.使用idea工具创建一个maven工程，该工程为普通的java工程即可
2.添加SpringBoot的起步依赖
SpringBoot要求，项目要继承SpringBoot的起步依赖spring-boot-starter-parent
SpringBoot要集成SpringMVC进行Controller的开发，所以项目要导入web的启动依赖
\<parent\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-parent\</artifactId\>
\<version\>2.0.1.RELEASE\</version\>
\</parent\>
\<dependencies\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-web\</artifactId\>
\</dependency\>
\</dependencies\>

**3.****编写****SpringBoot****引导类**
要通过SpringBoot提供的引导类起步SpringBoot才可以进行访问
package com.itheima;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class MySpringBootApplication {
public static void main(String[] args) {
SpringApplication.run(MySpringBootApplication.class);
}
}

**4.****编写****Controller**
package com.itheima.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class QuickStartController {
@RequestMapping("/quick")
@ResponseBody
public String quick(){
return "springboot 访问成功!";
}
}
在引导类MySpringBootApplication同级包或者子级包中创建QuickStartController

**使用****J****ava****配置**

**J****ava****配置主要依靠****java****类和一些注解，比较常用的注解有：**

**@configuration:****声明一个类作为配置类，代替****xml****文件**

**@Bean:****声明在方法上，将方法的返回值加入****B****ean****容器，代替****\<bean\>****标签**

**@Value:****属性注入**

**@PropertySource:****指定外部属性文件**

**以配置数据库连接为例**

**先引入****druid****依赖**

==\</dependency\>==

==\<dependency\>==
==\<groupId\>====com.alibaba====\</groupId\>==
==\<artifactId\>====druid====\</artifactId\>==
==\<version\>====1.1.6====\</version\>==
![Configuration PropertySource classpath jdbc . prop...](Exported%20image%2020260702230214-0.png)

`**改写****controller**`

![import javax. sql . DataSource RestContr011er publ...](Exported%20image%2020260702230219-1.png)

**打好断点看变量是否定义成功，以****debugger****方式启动项目并访问****/hello**
![lariables O killWhenSocketReadTimeout instanceKey ...](Exported%20image%2020260702230222-2.png)

**可见****java****配置文件生效**

**5.****测试**
执行SpringBoot起步类的主方法，控制台打印日志如下：
通过日志发现，Tomcat started on port(s): 8080 (http) with context path ''
tomcat已经起步，端口监听8080，web应用的虚拟工程名称为空
打开浏览器访问url地址为：http://localhost:8080/quick

**快速入门解析**
**SpringBoot****代码解析**
@SpringBootApplication：标注SpringBoot的启动类，该注解具备多种功能（后面详细剖析）
SpringApplication.run(MySpringBootApplication.class) 代表运行SpringBoot的启动类，参数为SpringBoot启动类的字节码对象

**SpringBoot****工程热部署**
我们在开发中反复修改类、页面等资源，每次修改后都是需要重新启动才生效，这样每次启动都很麻烦，浪费了大量的时间，我们可以在修改代码后不重启就能生效，在 pom.xml 中添加如下配置就可以实现这样的功能，我们称之为热部署。
 \<!--热部署配置--\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-devtools\</artifactId\>
\</dependency\>
注意：IDEA进行SpringBoot热部署失败原因
出现这种情况，并不是热部署配置问题，其根本原因是因为Intellij IEDA默认情况下不会自动编译，需要对IDEA进行自动编译的设置，如下：
![Tes Sdit Qpen. View de aproiectsv Navigate Code An...](Exported%20image%2020260702230224-3.png)

`然后 Shift+Ctrl+Alt+/，选择Registry`

![Maintenance I. Registry. 2. Switch Boot JDK 3. UI ...](Exported%20image%2020260702230226-4.png)
