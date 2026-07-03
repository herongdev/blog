---
title: 七、在网关中加入熔断器Hystrix
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
在微服务中，各个系统之间相互调用，难免出现某个服务挂掉的情况，此时熔断器机制就很重要，我们可以利用熔断器，将超时的请求予以异常处理，避免形成死循环的调用链。

由于我们刚才在搭建网关时没用选择熔断器依赖，所以在网关项目的`pom.xml`手动添加以下依赖：

\<dependency\>
  \<groupId\>org.springframework.cloud\</groupId\>
  \<artifactId\>spring-cloud-starter-netflix-hystrix\</artifactId\>
\</dependency\>
如果报错：`Could not find artifact org.springframework.cloud:spring-cloud-starter-netflix-eureka-client:pom`
请加上版本信息即可；
\<dependency\>
\<groupId\>org.springframework.cloud\</groupId\>
\<artifactId\>spring-cloud-starter-netflix-hystrix\</artifactId\>
\<version\>2.2.5.RELEASE\</version\>
\</dependency\>

_如果报错：__SpringCloud_ _集成_ _Hystrix_ _报错__: Unable to find GatewayFilterFactory with name Hystrix_
_解决：_
_这个包是使用的 Gateway 2.2.5 之后的版本（不包括2.2.5），这个版本里面是没有 Hystrix 这个过滤器的；换到 Gateway 2.2.5（包括2.2.5）以下的版本就有了；_

然后修改配置文件：

- server:
- #

网关端口

- 8083
- port: 8083
- spring:
- application:
- #

在服务中心的应用名称

- name: gateway
- cloud:
- gateway:
- discovery:
- locator:
- #

自动映射`eureka`下的服务路由

- enabled: true
- #

开启服务名称小写

- lower-case-service-id: true
- #

服务熔断，降级

      default-filters:
        - name: Hystrix
          args:
            name: fallbackcmd
            fallbackUri: forward:/fallback

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8080/eureka/

# hystrix
熔断器，`3`秒后自动超时

- hystrix:
- command:
- fallbackcmd:
- execution:
- isolation:
- thread:
- timeoutInMilliseconds: 3000

 上面配置里的`fallbackUri`，是指熔断时的回调地址，也就是说一旦服务响应超过了`3`秒，会转发到这个地址，执行自定义的业务操作，我们往往是返回一个错误码。注意，这个回调的`controller`，是要写到网关里的，所以我们在网关项目里新建如下：

package com.blog.wang.cloudgateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ErrorController {

    /**
     *
服务响应超时的回调
`* @return` 错误码

     * */
    @RequestMapping(value = "/fallback")
    public Object fallback () {
        Map\<String , Object\> result = new HashMap\<\>();
        result.put("code" , 0);
        result.put("msg" , "
服务器繁忙

");
        result.put("state" , false);
        return result;
    }
}
 ![micro gateway java v com.mincheng.gateway v contro...](Exported%20image%2020260703001058-0.png)

然后我们在第一个服务节点里，添加如下代码，模拟超时：

![RestContr011er RequestMappingva1ue student public ...](Exported%20image%2020260703001102-1.png)

再通过我们的网关访问`API`接口，发现每当请求到达第一个服务节点时，就会提示服务器繁忙：

![local host8083clientstudentdetail G 0 GitHub JSON ...](Exported%20image%2020260703001104-2.png)

小结
以上就是基本的`Spring Cloud`脚手架，相信还是可以满足大多数人的开发需求的。不足的地方有很多，比如处理跨域、线上环境的注册中心配置、`Gateway`网关的多种配置、熔断器的各种配置，以后都会慢慢地补上，还请大家海涵吧！

原文链接：`https://blog.csdn.net/wzy18210825916/article/details/103444346`
