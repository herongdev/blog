---
title: 报错：Failed to start bean ‘documentationPluginsBootstrapper’
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
两种解决办法

1. 配置`WebMvcConfigurer.java`
2. 配置文件添加`spring.mvc.pathmatch.matching-strategy=ant_path_matcher`
3. 项目启动
4. `swagger`访问，`http://localhost:8080/doc.html`

具体操作如下：
一、配置

WebMvcConfigurer.java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebMvcConfigurer extends WebMvcConfigurationSupport {

    /**
     *
发现如果继承了`WebMvcConfigurationSupport`，则在`yml`中配置的相关内容会失效。 需要重新指定静态资源

     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations(
                "classpath:/static/");
        registry.addResourceHandler("swagger-ui.html", "doc.html").addResourceLocations(
                "classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations(
                "classpath:/META-INF/resources/webjars/");
        super.addResourceHandlers(registry);
    }

`}`

二、配置文件添加

spring.mvc.pathmatch.matching-strategy=ant_path_matcher
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```
