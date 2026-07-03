---
title: 在ly-common中的com.leyou.common.advice下新建CommonExceptionHandler类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
在ly-common中的com.leyou.common.advice下新建CommonExceptionHandler类
![leyou lycommon com.leyou.common advice e CommonExc...](Exported%20image%2020260702233907-0.png)

`修改ly-common的pom文件，引入spring-webmvc`

![groupldorg.springframework.boot groupld artifactld...](Exported%20image%2020260702233909-1.png)

CommonExceptionHandler内容如下
==package====com.leyou.common.advice====;==

==import====org.springframework.http.HttpStatus====;==
==import====org.springframework.http.ResponseEntity====;==
==import====org.springframework.web.bind.annotation.====ControllerAdvice====;==
==import====org.springframework.web.bind.annotation.====ExceptionHandler====;==

==//====拦截所有加了====Controller====注解的类==
==@ControllerAdvice==
==publicclass====CommonExceptionHandler{==
==////====处理异常==
==//@ExceptionHandler(RuntimeException.class)==
==//publicResponseEntity\<String\>handleException(RuntimeExceptione){==
==//returnResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());==
==//}==

==//====处理异常==
==@ExceptionHandler====(LyException.====class====)==
==public====ResponseEntity\<ExceptionResult\>====handleException====(LyExceptione){==
==return====ResponseEntity.==_status_==(e.getExceptionEnum().getCode())==
==.body(====new====ExceptionResult(e.getExceptionEnum()))====;==
==}==
==}==

在ly-item-service的pom文件中引入ly-common包
![dependency groupldmysqlgroupld artifactldmysql con...](Exported%20image%2020260702233911-2.png)

- 启动类只能扫描同目录下的所有包，所以要注意层级关系
- 由于原生异常类只能接收空参或字符串参数，所以，我们自定义异常处理
- 在ly-common包下新建包和类exception.LyException

![leyou lycommon com.leyou.common advice exception e...](Exported%20image%2020260702233912-3.png)

`先新建异常的枚举包和类enums.ExceptionEnums，注意类型选enum`

![leyou lycommon com.leyou.common advice enums Excep...](Exported%20image%2020260702233915-4.png)

LyException类代码如下：
==package====com.leyou.common.exception====;==

==import====com.leyou.common.enums.ExceptionEnum====;==
==import====lombok.====AllArgsConstructor====;==
==import====lombok.====Getter====;==
==import====lombok.====NoArgsConstructor====;==

==@NoArgsConstructor==
==@AllArgsConstructor==
==@Getter==
==public== ==class== ==LyException== ==extends== ==RuntimeException{==
==private== ==ExceptionEnum== ==exceptionEnum====;==
==}==

创建异常结果对象
在ly-common下新建com.leyou.common.vo.ExceptionResult
==package====com.leyou.common.vo====;==

==import====com.leyou.common.enums.ExceptionEnum====;==
==import====lombok.====Data====;==

==@Data==
==publicclass====ExceptionResult{==
==privateint====status====;==
==private====String====message====;==
==private====Long====timestamp====;==

==public====ExceptionResult====(ExceptionEnumem){==
==this====.====status=====em.getCode()====;==
==this====.====message=====em.getMsg()====;==
==this====.====timestamp=====System.==_currentTimeMillis_==()====;==
==}==
==}==

最后CommonExceptionHandler的代码如下：
==package====com.leyou.common.advice====;==

==import====com.leyou.common.enums.ExceptionEnum====;==
==import====com.leyou.common.exception.LyException====;==
==import====com.leyou.common.vo.ExceptionResult====;==
==import====org.springframework.http.HttpStatus====;==
==import====org.springframework.http.ResponseEntity====;==
==import====org.springframework.web.bind.annotation.====ControllerAdvice====;==
==import====org.springframework.web.bind.annotation.====ExceptionHandler====;==

==//====拦截所有加了====Controller====注解的类==
==@ControllerAdvice==
==publicclass====CommonExceptionHandler{==
==////====处理异常==
==//@ExceptionHandler(RuntimeException.class)==
==//publicResponseEntity\<String\>handleException(RuntimeExceptione){==
==//returnResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());==
==//}==
==@ExceptionHandler====(LyException.====class====)==
==public====ResponseEntity\<ExceptionResult\>====handleException====(LyExceptione){==
==return====ResponseEntity.==_status_==(e.getExceptionEnum().getCode())==
==.body(====new====ExceptionResult(e.getExceptionEnum()))====;==
==}==
==}==

最终ItemController代码如下，我们可以封装自己的异常
==import====com.leyou.common.enums.ExceptionEnum====;==
==import====com.leyou.common.exception.LyException====;==
==import====com.leyou.item.pojo.Item====;==
==import====com.leyou.item.service.ItemService====;==
==import====lombok.====val====;==
==import====org.springframework.beans.factory.annotation.====Autowired====;==
==import====org.springframework.http.HttpStatus====;==
==import====org.springframework.http.ResponseEntity====;==
==import====org.springframework.web.bind.annotation.====PostMapping====;==
==import====org.springframework.web.bind.annotation.====RequestMapping====;==
==import====org.springframework.web.bind.annotation.====RestController====;==

==@RestController==
==@RequestMapping====(===="item"====)==
==publicclass====ItemController{==
==@Autowired==
==private====ItemService====itemService====;==

==@PostMapping==
==public====ResponseEntity\<Item\>====saveItem====(Itemitem){==
==//====校验价格==
==if====(item.getPrice()======null====){==
==//returnResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);==
==//returnResponseEntity.status(HttpStatus.BAD_REQUEST).body("====价格不能为空====");==
==//thrownewRuntimeException("====价格不能为空====");//====不合逻辑==
==//====进行统一的异常处理，对所有====controller====进行处理==
==thrownew====LyException(ExceptionEnum.==_PRICE_CANNOT_BE_NULL_==)====;==
==}==
==item=====itemService====.saveItem(item)====;==
==return====ResponseEntity.==_status_==(HttpStatus.==_CREATED_==).body(item)====;==
==}==
==}==
```
