---
title: SpringBoot 项目解决跨域的几种方案
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
JK凯

于 2023-05-19 14:39:04 发布

206
收藏
分类专栏： SpringBoot 文章标签： spring boot java spring
版权

SpringBoot
专栏收录该内容
1 篇文章0 订阅
订阅专栏
在用SpringBoot开发后端服务时，我们一般是提供接口给前端使用，但前端通过浏览器调我们接口时，浏览器会有个同源策略的限制，即协议，域名，端口任一不一样时都会导致跨域，这篇文章主要介绍跨域的几种常用解决方案。

测试是否跨域
可以在浏览器中随便打开一个页面的控制台，然后在控制台中执行下面这段代码：

var xhr = new XMLHttpRequest()
xhr.open('GET', '[http://localhost:8080/user](http://localhost:8080/user)') // 替换请求的方法和地址
xhr.send()
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200) {
console.log(xhr.responseText)
}
}
1
2
3
4
5
6
7
8
如果出现了如下的输出，代表确实有跨域

一、SpringBoot 配置 CORS 解决跨域
即在我们所有响应头配置允许跨域访问，CORS也已经成为主流的跨域解决方案。

在项目中创建一个新的配置文件
添加@Configuration注解实现WebMvcConfigurer接口
重写addCorsMappings方法并设置允许跨域的代码
具体代码如下：

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
@Override
public void addCorsMappings(CorsRegistry registry) {
registry.addMapping("/**") // 所有接口
.allowCredentials(true) // 是否发送 Cookie
.allowedOriginPatterns("*") // 支持域
.allowedMethods("GET", "POST", "PUT", "DELETE") // 支持方法
.allowedHeaders("*")
.exposedHeaders("*");
}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
二、SpringBoot 通过 CorsFilter 解决跨域
这种方式和上面的方式类似，也是通过Java Config的方式配置跨域访问，具体代码如下:

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class MyCorsFilter {
@Bean
public CorsFilter corsFilter() {
// 1.创建 CORS 配置对象
CorsConfiguration config = new CorsConfiguration();
// 支持域
config.addAllowedOriginPattern("*");
// 是否发送 Cookie
config.setAllowCredentials(true);
// 支持请求方式
config.addAllowedMethod("*");
// 允许的原始请求头部信息
config.addAllowedHeader("*");
// 暴露的头部信息
config.addExposedHeader("*");
// 2.添加地址映射
UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
corsConfigurationSource.registerCorsConfiguration("/**", config);
// 3.返回 CorsFilter 对象
return new CorsFilter(corsConfigurationSource);
}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
三、SpringBoot 通过注解解决跨域
可以在我们的控制器类或控制器方法上添加，添加在类上表示里面所有方法都可跨域，添加在方法上表示指定方法可以跨域，具体代码如下：

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
@GetMapping
public String getAll() {
return "成功";
}
}
1
2
3
4
5
6
7
8
9
10
11
四、通过 nginx 配置 CORS 解决跨域
如果我们项目有用 nginx 做反向代理服务器时，也可以在nginx中配置CORS来解决跨域，配置示例如下：

允许全部域名
server {
...
location / {
#允许 所有头部 所有域 所有方法
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Headers' '*';
add_header 'Access-Control-Allow-Methods' '*';
#OPTIONS 直接返回204
if ($request_method = 'OPTIONS') {
return 204;
}
}
...
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
允许指定域名
map $http_origin $corsHost {
default 0;
"~https://aa.cn" [https://aa.cn](https://aa.cn);
"~https://bb.cn" [https://bb.cn](https://bb.cn);
"~https://cc.cn" [https://cc.cn](https://cc.cn);
}
server {
...
location / {
#允许 所有头部 所有$corsHost域 所有方法
add_header 'Access-Control-Allow-Origin' $corsHost;
add_header 'Access-Control-Allow-Headers' '*';
add_header 'Access-Control-Allow-Methods' '*';
#OPTIONS 直接返回204
if ($request_method = 'OPTIONS') {
return 204;
}
}
...
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20

————————————————
版权声明：本文为CSDN博主「JK凯」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/junkaione/article/details/130766354
