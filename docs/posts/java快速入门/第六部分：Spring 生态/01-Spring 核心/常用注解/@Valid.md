---
title: @Valid
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
在Java中，特别是在Spring框架中，@Valid是一个注解，用于触发参数校验。它常常与Java的Bean Validation API一起使用，例如Hibernate Validator。

当你在方法参数前加上@Valid注解时，Spring会检查该参数是否满足你定义的验证规则。如果参数违反了任何验证规则，Spring会抛出一个异常。

在你给出的代码示例中：
public CommonResult\<AuthLoginRespVO\> login(@RequestBody @Valid AuthLoginReqVO reqVO) {...}
@RequestBody: 告诉Spring从请求体中解析参数。
@Valid: 通知Spring进行参数校验。

假设AuthLoginReqVO类定义如下：
public class AuthLoginReqVO {

@NotBlank
private String username;

@NotBlank
private String password;
// getters and setters
}
在上面的示例中，@NotBlank注解确保了username和password字段在请求时都不能为空或者只含有空白字符。

如果一个请求试图发送一个不含username或password的AuthLoginReqVO对象，或者这两个字段只包含空白字符，那么Spring会抛出一个MethodArgumentNotValidException异常，你可以捕获这个异常并返回一个相应的错误消息给用户。

这种机制可以帮助你保证进入方法体的数据都是合法的，从而减少了手动检查参数的需要。
