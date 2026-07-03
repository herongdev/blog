---
title: 二、集成Swagger2
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
具体实现
添加`Maven`依赖

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
创建`Swagger`配置

package com.minchengjianshe.organizationalandpersonal.configuration;
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
指定生成`API`的

path
        .paths(PathSelectors.any())
        .build()
        //
文档信息

        .apiInfo(apiInfo());
  }
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

`Swagger`使用
`@Api(description = "Hello`服务

")
@RestControllerpublic class HelloController {
@ApiOperation(value = "
打招呼`", notes = "`打招呼详情描述

")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "
用户名

", required = true)
    })
    @GetMapping("/hello/{name}")
    public String hello(@PathVariableString name) {
        returnString.format("Hello %s!", name);
    }
}
常见注解

- `@Api` 修饰整个类，描述整个`Controller`的作用
- `@ApiOperation` 修饰方法，描述方法的作用
- `@ApiParam` 修饰参数，描述参数的作用
- `@ApiIgnore` 表示忽略当前`API`
- `@ApiImplicitParams` 描述多个请求参数
- `@ApiImplicitParam` 描述一个请求参数
- `@ApiModel` 如果参数是对象，则在对象所在类上标注，用于描述对象
- `@ApiModelProperty` 如果参数是对象，则在对象所在类的属性上标注，用于描述对象的属性

启动项目
准备工作已完成，启动项目后访问`Swagger`地址：`http://localhost:8080/swagger-ui.html`
