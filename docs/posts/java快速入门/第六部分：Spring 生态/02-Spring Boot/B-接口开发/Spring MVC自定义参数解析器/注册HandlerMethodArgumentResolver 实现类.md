---
title: 注册HandlerMethodArgumentResolver 实现类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
package cn.iocoder.yudao.framework.common.resolver;// 导入所需的库和类
import com.fasterxml.jackson.databind.ObjectMapper;
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
// 通过 @Component 注解标记这个类为一个 Spring 管理的组件
@Component
public class FetchFormSettingArgumentResolver implements HandlerMethodArgumentResolver {
// 自动注入 ObjectMapper，用于 JSON 和对象之间的转换
@Autowired
private ObjectMapper objectMapper;
/**
* 此方法用于检查当前参数是否支持自定义解析. 如果参数有 @FetchFormSettingArgumentRequestParam 注解, 则返回 true
*/
@Override
public boolean supportsParameter(MethodParameter parameter) {
return parameter.hasParameterAnnotation(FetchFormSettingArgumentRequestParam.class);
}
/**
* 此方法用于实际解析参数. 它会从请求中获取 JSON 字符串, 然后使用 ObjectMapper 将其转换为 TestDateParams 对象
*/
@Override
public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
// 从请求中获取 JSON 字符串
String requestBody = getRequestBody(webRequest);
// 使用 ObjectMapper 将 JSON 字符串转换为 TestDateParams 对象并返回
return objectMapper.readValue(requestBody, TestDateParams.class);
}
// 定义一个常量，用于在请求作用域中存储和检索 JSON 请求体
private static final String JSONBODYATTRIBUTE = "JSON_REQUEST_BODY";
/**
* 此方法用于从请求中获取 JSON 字符串. 如果 JSON 字符串已经被读取, 它将从请求作用域中检索，否则它将从输入流中读取并存储在请求作用域中
*/
private String getRequestBody(NativeWebRequest webRequest) {
// 获取原生的 HttpServletRequest 对象
HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
// 从请求作用域中尝试获取 JSON 字符串
String jsonBody = (String) webRequest.getAttribute(JSONBODYATTRIBUTE, NativeWebRequest.SCOPE_REQUEST);
if (jsonBody == null) {
try {
// 如果 JSON 字符串不存在，从输入流中读取并存储在请求作用域中
jsonBody = IOUtils.toString(servletRequest.getInputStream());
webRequest.setAttribute(JSONBODYATTRIBUTE, jsonBody, NativeWebRequest.SCOPE_REQUEST);
} catch (IOException e) {
// 在读取输入流时发生异常，抛出 RuntimeException
throw new RuntimeException(e);
}
}
// 返回 JSON 字符串
return jsonBody;
}
}
