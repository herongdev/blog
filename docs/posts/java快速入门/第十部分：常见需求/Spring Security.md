---
title: Spring Security
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
Spring Security，如何查找呢
ChatGPT
Spring Security配置通常在一个或多个Java配置类中定义，这些类通常会用@Configuration注解标注，并且还会使用@EnableWebSecurity注解。这些配置类通常会继承WebSecurityConfigurerAdapter类（对于较旧的Spring Security版本）或者实现SecurityConfigurer\<DefaultSecurityFilterChain, HttpSecurity\>接口（对于较新的Spring Security版本）。

你可以在你的项目中搜索这些类或接口，或者直接搜索"Spring Security"，"WebSecurityConfigurerAdapter"，"HttpSecurity"等关键字。

如果你找到了这样的类，你可以查看configure(HttpSecurity http)方法（如果你的类继承了WebSecurityConfigurerAdapter，则这个方法名可能会有所不同），看看是否已经有了跨域配置。如果没有，你可以在这个方法中添加如下代码：

java
Copy code
http.cors();
你还需要提供一个CorsConfigurationSource的bean，这个bean用于定义跨域配置。你可以在你的Spring Security配置类中或者在其他任何@Configuration类中定义这个bean。例如：

java
Copy code
@Bean
public CorsConfigurationSource corsConfigurationSource() {
CorsConfiguration configuration = new CorsConfiguration();
configuration.setAllowedOrigins(Arrays.asList("*"));
configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
configuration.setAllowCredentials(true);
UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
source.registerCorsConfiguration("/**", configuration);
return source;
}
这段代码与前面提供的Spring MVC的跨域配置代码非常相似，但是它使用了CorsConfigurationSource而不是WebMvcConfigurer。

您可以通过重写WebSecurityConfigurerAdapter的configure(HttpSecurity http)方法来添加跨域支持。具体代码如下：

java
Copy code
package com.dhcc.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

@Override
protected void configure(HttpSecurity http) throws Exception {
http.cors().and()
// your existing http configuration goes here
// for example: http.authorizeRequests().anyRequest().permitAll();
;
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
CorsConfiguration configuration = new CorsConfiguration();
configuration.setAllowedOrigins(Arrays.asList("*")); // or your preferred origins
configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")); // or your preferred methods
configuration.setAllowCredentials(true);
configuration.addAllowedHeader("*");

UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
source.registerCorsConfiguration("/**", configuration);
return source;
}

@Override
public void configure(WebSecurity web) throws Exception {
// allow Swagger URL to be accessed without authentication
web.ignoring().antMatchers(
"/swagger-ui.html",
"/v2/api-docs", // swagger api json
"/swagger-resources/configuration/ui", // 用来获取支持的动作
"/swagger-resources", // 用来获取api-docs的URI
"/swagger-resources/configuration/security", // 安全选项
"/swagger-resources/**",
//补充路径，近期在搭建swagger接口文档时，通过浏览器控制台发现该/webjars路径下的文件被拦截，故加上此过滤条件即可。(2020-10-23)
"/webjars/**",
"/doc.html"
);
}
}
在这个代码示例中，我们通过调用http.cors().and()来启用跨域支持。然后我们提供了一个CorsConfigurationSource类型的bean，它返回一个定义了跨域配置的CorsConfiguration对象。这个配置对象告诉Spring Security允许来自任何源（"*"）的请求，允许任何HTTP方法，并允许任何头部。

如果你的应用需要更细粒度的控制，你可以根据需要修改这个配置。
