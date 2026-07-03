---
title: SpringBoot 项目解决跨域的几种方案 1
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
对于 CORS的跨域请求，主要有以下几种方式可供选择：

- 返回新的CorsFilter
- 重写 WebMvcConfigurer
- 使用注解 @CrossOrigin
- 手动设置响应头 (HttpServletResponse)
- 自定web filter 实现跨域

注意
CorFilter / WebMvConfigurer / @CrossOrigin 需要 SpringMVC 4.2以上版本才支持，对应springBoot 1.3版本以上

上面前两种方式属于全局 CORS 配置，后两种属于局部 CORS配置。如果使用了局部跨域是会覆盖全局跨域的规则，所以可以通过 @CrossOrigin 注解来进行细粒度更高的跨域资源控制。

其实无论哪种方案，最终目的都是修改响应头，向响应头中添加浏览器所要求的数据，进而实现跨域
1.返回新的 CorsFilter(全局跨域)
在任意配置类，返回一个 新的 CorsFIlter Bean ，并添加映射路径和具体的CORS配置路径。

@Configuration
public class GlobalCorsConfig {
@Bean
public CorsFilter corsFilter() {
//1. 添加 CORS配置信息
CorsConfiguration config = new CorsConfiguration();
//放行哪些原始域
config.addAllowedOrigin("*");
//是否发送 Cookie
config.setAllowCredentials(true);
//放行哪些请求方式
config.addAllowedMethod("*");
//放行哪些原始请求头部信息
config.addAllowedHeader("*");
//暴露哪些头部信息
config.addExposedHeader("*");
//2. 添加映射路径
UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
corsConfigurationSource.registerCorsConfiguration("/**",config);
//3. 返回新的CorsFilter
return new CorsFilter(corsConfigurationSource);
}
}
2. 重写 WebMvcConfigurer(全局跨域)
@Configuration
public class CorsConfig implements WebMvcConfigurer {
@Override
public void addCorsMappings(CorsRegistry registry) {
registry.addMapping("/**")
//是否发送Cookie
.allowCredentials(true)
//放行哪些原始域
.allowedOrigins("*")
.allowedMethods(new String[]{"GET", "POST", "PUT", "DELETE"})
.allowedHeaders("*")
.exposedHeaders("*");
}
}
￼3.使用注解 (局部跨域)
在控制器(类上)上使用注解 @CrossOrigin:，表示该类的所有方法允许跨域。

@RestController
@CrossOrigin(origins = "*")
public class HelloController {
@RequestMapping("/hello")
public String hello() {
return "hello world";
}
}
￼在方法上使用注解 @CrossOrigin:

@RequestMapping("/hello")
@CrossOrigin(origins = "*")
//@CrossOrigin(value = "[http://localhost:8081](http://localhost:8081)") //指定具体ip允许跨域
public String hello() {
return "hello world";
}

4. 手动设置响应头(局部跨域)
使用 HttpServletResponse 对象添加响应头(Access-Control-Allow-Origin)来授权原始域，这里 Origin的值也可以设置为 “*”,表示全部放行。

@RequestMapping("/index")
public String index(HttpServletResponse response) {
response.addHeader("Access-Allow-Control-Origin","*");
return "index";
}
￼5. 使用自定义filter实现跨域
ssm种的写法
首先编写一个过滤器，可以起名字为MyCorsFilter.java

package com.mesnac.aop;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
@Component
public class MyCorsFilter implements Filter {
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
HttpServletResponse response = (HttpServletResponse) res;
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
response.setHeader("Access-Control-Max-Age", "3600");
response.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
chain.doFilter(req, res);
}
public void init(FilterConfig filterConfig) {}
public void destroy() {}
}
在web.xml中配置这个过滤器，使其生效

\<!-- 跨域访问 START--\>
\<filter\>
\<filter-name\>CorsFilter\</filter-name\>
\<filter-class\>com.mesnac.aop.MyCorsFilter\</filter-class\>
\</filter\>
\<filter-mapping\>
\<filter-name\>CorsFilter\</filter-name\>
\<url-pattern\>/*\</url-pattern\>
\</filter-mapping\>
\<!-- 跨域访问 END --\>

springboot可以简化
import org.springframework.context.annotation.Configuration;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebFilter(filterName = "CorsFilter ")
@Configuration
public class CorsFilter implements Filter {
@Override
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
HttpServletResponse response = (HttpServletResponse) res;
response.setHeader("Access-Control-Allow-Origin","*");
response.setHeader("Access-Control-Allow-Credentials", "true");
response.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
response.setHeader("Access-Control-Max-Age", "3600");
response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
chain.doFilter(req, res);
}
}
￼esponse.setHeader(“Access-Control-Max-Age”, “3600”);
response.setHeader(“Access-Control-Allow-Headers”, “Origin, X-Requested-With, Content-Type, Accept”);
chain.doFilter(req, res);
}
}
