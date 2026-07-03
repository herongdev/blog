---
title: 一、构建SpringBoot项目
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
最常用的两种方式：
一、使用`Spring Initializr`构建项目

1. 访问`start.spring.io/`
2. 选择`Maven Project`、`Java`、`Spring Boot`版本以及一些工程基本信息，参考下图所示：
3. 点击`GENERATE`下载项目压缩包
4. 解压后，使用`Idea`导入项目，`File -\> New -\> Model from Existing Source... -\>` 选择解压后的文件夹即可

二、使用`Idea`开发工具构建项目

1. 选择`File -\> New -\> Project...` 弹出构建项目的框
2. 选择`Spring Initializr`，点击`Next`
3. 填写工程基本信息之后，点击`Next`
4. 选择依赖的模块之后，点击`Next`
5. 填写工程名和存储目录，点击`Finish`即可

项目结构
构建项目后可以看到，基础结构共三个文件夹：

- `src/main/java` 项目源代码
- `src/main/resources` 配置文件
- `src/test/java` 单元测试代码

编写`Web`接口
项目构建后，我们来开发简单的后端`Web`接口

引入`Web`模块
在构建项目时，我们已经引用了`Web`模块。如果没用引用，可以手动在`pom.xml`添加引用。

\<!-- web --\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-web\</artifactId\>
\</dependency\>
编写

controller
@RestController
Public class IndexController{
@GetMapping("/index")
    publicStringindex() {
        return "Hello World";
    }
}
- `@RestController`注解，相当于`@Controller`和`@ResponseBody`的结合，用于返回`json`数据。
- `@GetMapping("/index")`，相当于`@RequestMapping(value = "/index", method = RequestMethod.GET)`，用于接收`GET`请求

启动项目
`Spring Boot`内嵌`Tomcat`，可以直接启动：
`@SpringBootApplication`注解是下面三个注解的总和

- `@Configuration` 用于定义一个配置类
- `@EnableAutoConfiguration Spring Boot`会自动根据你`jar`包的依赖来自动配置项目
- `@ComponentScan` 指定`Spring`自动扫描并且装入`bean`容器的包路径

测试接口
在浏览器上访问：`http://localhost:8080/index`。页面成功返回：`Hello World`

至此，我们成功的看到了返回的信息。虽然它返回的信息很简单，但我们成功的访问了服务器并获得了数据。
我们其实只是引用了`Web`模块，并编写了一个`controller`。这证明了`Spring Boot`极大的简化了我们的开发。

来自

 \<https://juejin.cn/post/6844904159917899783\>
```
