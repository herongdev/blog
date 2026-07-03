---
title: springmvc自定义参数解析器-类型转换器 1
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
好大的月亮

已于 2022-06-24 16:15:43 修改

1410
收藏 3
分类专栏： JAVA spring 文章标签： java spring spring boot
版权

JAVA
同时被 2 个专栏收录
226 篇文章7 订阅
订阅专栏

spring
32 篇文章0 订阅
订阅专栏
概述
有些时候我们需要对GET请求的入参做自定义的处理，比较常见的就是字符串反序列化时间类型了，常用的像@DateTimeFormat注解，但是这需要在每个入参的属性上都加上这个注解，比较费手，那么我们就可以注册一个通用的自定义类型转换器来做这个时间的转换。如果是post请求则可以自定义一个参数解析器来处理

@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime startTime;
1
2
(GET请求)自定义类型转换器demo入门认识
使用类型转换器org.springframework.core.convert.converter.Converter做统一时间处理

一个普通的get请求

package com.fchan.controller;

import com.fchan.params.TestDateParams;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("selfSpringMVC")
public class SelfSpringMVCController {

@GetMapping("testDate")
public Object testDate(TestDateParams params){
System.out.println(params);
return null;
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
一个普通的入参

package com.fchan.params;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TestDateParams implements Serializable {

private static final long serialVersionUID = -6513336502447867393L;

private Date date;

private LocalDateTime localDateTime;

private LocalDate localDate;

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
自定义类型转换

package com.fchan.convert;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class SelfDateConvert implements Converter\<String, Date\> {

@Override
public Date convert(String source) {
Assert.notNull(source, "时间不能为空");

SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
try {
return df.parse(source);
} catch (ParseException e) {
e.printStackTrace();
return null;
}
}
}

package com.fchan.convert;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Component
public class SelfLocalDateConvert implements Converter\<String, LocalDate\> {

@Override
public LocalDate convert(String source) {
Assert.notNull(source, "时间不能为空");

DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
return LocalDate.parse(source, df);
}
}

package com.fchan.convert;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class SelfLocalDateTimeConvert implements Converter\<String, LocalDateTime\> {

@Override
public LocalDateTime convert(String source) {
Assert.notNull(source, "时间不能为空");

DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
return LocalDateTime.parse(source, df);
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
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
将我们的自定义参数转换添加到spring的参数解析链中

package com.fchan.config;

import com.fchan.convert.SelfDateConvert;
import com.fchan.convert.SelfLocalDateConvert;
import com.fchan.convert.SelfLocalDateTimeConvert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Configuration
public class WebMvcConfigurerAdapter implements WebMvcConfigurer {

@Autowired
private SelfDateConvert selfDateConvert;
@Autowired
private SelfLocalDateConvert selfLocalDateConvert;
@Autowired
private SelfLocalDateTimeConvert selfLocalDateTimeConvert;

@Override
public void addFormatters(FormatterRegistry registry) {
registry.addConverter(selfDateConvert);
registry.addConverter(selfLocalDateConvert);
registry.addConverter(selfLocalDateTimeConvert);
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
30
31
32
33
34
35
36
37
SpringMVC 执行流程
套用一张网图

POST请求参数解析器
所有的参数解析器都实现了HandlerMethodArgumentResolver这个接口

这是一个典型的策略模式接口，判断当前的方法形参类型是否支持，如果支持就使用该实现类的参数解析器对其解析.

在org.springframework.web.servlet.DispatcherServlet调用方法前肯定需要解析一下请求中的参数，转成实际controller中的类型

自定义参数解析器demo
平时接收post请求我们都是用的@requestBody接收的请求体，但有些时候想对请求体中的参数在进入controller之前做一些自定义的转换，这个时候我们就可以自己实现一个注解来解析请求体中的参数。

还是以上面类型转换器中的入参为例，只是这回把入参放入http body中去.

自定义注解

package com.fchan.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentTime {
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
自定义解析器解析http body

package com.fchan.methodArgumentResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fchan.annotation.CurrentTime;
import com.fchan.params.TestDateParams;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class CurrentTestTimeHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

@Autowired
private ObjectMapper myObjectMapper;

/**
* 用于判定是否需要处理该参数分解，返回 true 为需要，并会去调用下面的方法resolveArgument。
*/
@Override
public boolean supportsParameter(MethodParameter parameter) {
return parameter.hasParameterAnnotation(CurrentTime.class)
&&
parameter.getParameterType().isAssignableFrom(TestDateParams.class);
}

/**
* 真正用于处理参数分解的方法，返回的 Object 就是 controller 方法上的形参对象。
*/
@Override
public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

//webRequest.getHeader("xxx")
//Map\<String, String[]\> parameterMap = webRequest.getParameterMap();

String requestBody = getRequestBody(webRequest);

return myObjectMapper.readValue(requestBody, TestDateParams.class);
}

private static final String JSONBODYATTRIBUTE = "JSON_REQUEST_BODY";

private String getRequestBody(NativeWebRequest webRequest){
HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
String jsonBody = (String) webRequest.getAttribute(JSONBODYATTRIBUTE, NativeWebRequest.SCOPE_REQUEST);
if (jsonBody == null) {
try {
jsonBody = IOUtils.toString(servletRequest.getInputStream());
webRequest.setAttribute(JSONBODYATTRIBUTE, jsonBody, NativeWebRequest.SCOPE_REQUEST);
} catch (IOException e) {
throw new RuntimeException(e);
}
}
return jsonBody;
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
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
注册解析器

成功解析

————————————————
版权声明：本文为CSDN博主「好大的月亮」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43944305/article/details/123330230
