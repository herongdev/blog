---
title: 集成Swagger2
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
现在公司中都使用前后端分离的方式进行开发，比如该项目就是一个纯后端框架。为了前后端更好的对接，就需要编写`API`文档。
然而手写`API`文档有如下几个痛点：

- 功能修改后要及时更新文档，很容易出现功能文档不匹配
- 文档更新后，需要及时通知使用的人，很容易造成沟通不及时
- 接口参数和返回结果不明确
- 不能在线直接测试，需要借助工具，如`Postman`
- 接口文档太多，不好进行管理

这时我们今天的主角——`Swagger2`，顺利登场，说：这一些都不是问题。
那它到底为什么能够这么嚣张，它的效果又是怎么样的，我们下面来实际操作下。
**具体实现**
**添加**`Maven`**依赖**

\<!--swagger2--\>
\<dependency\>
\<groupId\>io.springfox\</groupId\>
\<artifactId\>springfox-swagger2\</artifactId\>
\<version\>2.9.2\</version\>
\</dependency\>
\<dependency\>
\<groupId\>io.springfox\</groupId\>
\<artifactId\>springfox-swagger-ui\</artifactId\>
\<version\>2.9.2\</version\>
\</dependency\>
**创建**`Swagger`**配置**
新建 config 包，在 config 包中新增 SwaggerConfig.java，代码如下：

package ltd.newbee.mall.config;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.service.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
@Configuration
@EnableSwagger2
public class SwaggerConfig {

 @Bean

 public Docket docket() {

 return new Docket(DocumentationType.SWAGGER_2)

 .select()

 // apis
指定生成`API`的扫描条件
       

 .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))

 //
扫描包
       

 // .apis(RequestHandlerSelectors.basePackage("com.zhuqc.framework.controller"))

 // paths
指定生成`API`的`path`
       

 .paths(PathSelectors.any())

 .build()

 //
文档信息
       

 .apiInfo(apiInfo());
   `}`
 

 private ApiInfo apiInfo() {

 return new ApiInfoBuilder()

 .title("
从零搭建后端框架

- ")
- .description("API

接口文档

")

 .termsOfServiceUrl("https://github.com/zhuqianchang/framework")

 .contact(new Contact("zhuqianchang", "", ""))

 .version("0.0.1")

 .build();

 }
}
- `@EnableSwagger2` 开启`Swagger2`
- `apis` 用来指定扫描的条件
- `RequestHandlerSelectors.basePackage("com.zhuqc.framework.controller")`，扫描指定包
- `RequestHandlerSelectors.withClassAnnotation((Api.class)`，扫描`@Api`标注的类
- `RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class)`，扫描`@ApiOperation`标注的方法
- `RequestHandlerSelectors.any()`，总是`true`
- `RequestHandlerSelectors.none()`，总是`false`
- 默认配置是没有`@ApiIgnore`标注的类和方法
- `paths` 用来指定生成`API`的`path`
- `PathSelectors.any()`，总是`true`
- `PathSelectors.none()`，总是`false`
- `PathSelectors.regex()`，正则表达式匹配
- `PathSelectors.ant()`，`Ant`表达式匹配
- `apiInfo` 用来指定文档信息

打开[Swagger UI](http://localhost:8080/swagger-ui.html)

![swagger localhost8080swaggerui.html Bing mincheng ...](Exported%20image%2020260703003036-0.png)
