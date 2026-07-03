---
title: 获取Get请求参数详解（附样例：非空、默认值、数组、对象）
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
利用 **Spring Boot** 来制作 **Web** 应用，就必定会涉及到前端与后台之间互相传递参数。下面演示 **Controller** 如何接收以 **GET** 方式传递过来的参数。
**一、参数直接在路径中**
（1）假设请求地址是如下这种 **RESTful** 风格，**hangge** 这个参数值直接放在路径里面：

|   |   |
|---|---|
|`1`|- （2）**Controller** 可以这么获取该参数：
- |   |   |
- |---|---|
- |
<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.PathVariable;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello/{name}")<br>    public String hello(@PathVariable("name") String name) {<br>        return "<br>```<br><br>获取到的`name`是：<br><br>```<br>" + name;<br>    }<br>}<br>```|
 [![SpringBoot Get](Exported%20image%2020260702230932-0.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**二、参数跟在** **?** **号后面**
**1****，获取参数的基本方法**
（1）假设请求地址是如下这种传统方式，参数跟在问号后面：

|   |   |
|---|---|
|`1`|```<br>http://localhost:8080/hello?name=hangge<br>- （2）**Controller** 可以这么获取该参数：
- |   |   |
- |---|---|
- |
<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RequestParam;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@RequestParam("name") String name) {<br>        return "<br>```<br><br>获取到的`name`是：<br><br>```<br>" + name;<br>    }<br>}<br>```|
 [![SpringBoot Get](Exported%20image%2020260702231446-1.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**2****，参数没有传递的情况**
（1）如果没有传递参数 **Controller** 将会报错，我们可以使用 **required = false** 标注参数是非必须的。

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RequestParam;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@RequestParam(name = "name", required = false) String name) {<br>        return "<br>```<br><br>获取到的`name`是：<br><br>```<br>" + name;<br>    }<br>}<br>```|
 [![SpringBoot Get](Exported%20image%2020260702231550-2.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

（2）或者可以指定个默认值，当没有传递参数时自动使用默认值：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RequestParam;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@RequestParam(name = "name", defaultValue = "xxx") String name) {<br>        return "<br>```<br><br>获取到的`name`是：<br><br>```<br>" + name;<br>    }<br>}<br>```|
 [![SpringBoot Get](Exported%20image%2020260702231655-3.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**3****，使用** **map** **来接收参数**
（1）**Controller** 还可以直接使用 **map** 来接收所有的请求参数：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RequestParam;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>import java.util.Map;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@RequestParam Map\<String, Object\> params) {<br>        return "name<br>```<br><br>：<br><br>```<br>" + params.get("name") + "\<br\>age<br>```<br><br>：<br><br>```<br>" + params.get("age");<br>    }<br>}<br>```|

（2）下面是一个简单的测试样例：

[![SpringBoot Get](Exported%20image%2020260702231901-4.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

 
**4****，接收一个数组**
（1）假设请求地址是如下这种，有多个同名参数：

|   |   |
|---|---|
|`1`|```<br>http://localhost:8080/hello?name=hangge&name=google<br>- （2）我们可以定义一个数组类型的参数来接收：
- |   |   |
- |---|---|
- |
<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RequestParam;<br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@RequestParam("name") String[] names) {<br>        String result = "";<br>        for(String name:names){<br>            result += name + "\<br\>";<br>        }<br>        return result;<br>    }<br>}<br>```|
 [![SpringBoot Get](Exported%20image%2020260702232212-5.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**附：使用对象来接收参数**
**1****，基本用法**
（1）如果一个 **get** 请求的参数太多，我们构造一个对象来简化参数的接收方式：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.annotation.RestController;<br>import org.springframework.web.bind.annotation.GetMapping;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(User user) {<br>        return "name<br>```<br><br>：<br><br>```<br>" + user.getName() + "\<br\> age<br>```<br><br>：<br><br>```<br>" + user.getAge();<br>    }<br>}<br>```|

（2）**User** 类的定义如下，到时可以直接将多个参数通过 **getter**、**setter** 方法注入到对象中去：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>```|```<br>package com.example.demo;<br> <br>public class User {<br>    private String name;<br>    private Integer age;<br> <br>    public String getName() {<br>        return name;<br>    }<br> <br>    public void setName(String name) {<br>        this.name = name;<br>    }<br> <br>    public Integer getAge() {<br>        return age;<br>    }<br> <br>    public void setAge(Integer age) {<br>        this.age = age;<br>    }<br>}<br>```|

（3）下面是一个简单的测试样例：

[![SpringBoot Get](Exported%20image%2020260702232216-6.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

（4）如果传递的参数有前缀，且前缀与接收实体类的名称相同，那么参数也是可以正常传递的：

[![SpringBoot Get](Exported%20image%2020260702232542-7.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**2****，指定参数前缀**
（1）如果传递的参数有前缀，且前缀与接收实体类的名称不同相，那么参数无法正常传递：

[![SpringBoot Get](Exported%20image%2020260702232650-8.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

（2）我们可以结合 **@InitBinder** 解决这个问题，通过参数预处理来指定使用的前缀为 **u**.
    除了在 **Controller** 里单独定义预处理方法外，我们还可以通过 **@ControllerAdvice** 结合 **@InitBinder** 来定义全局的参数预处理方法，方便各个 **Controller** 使用。具体做法参考我之前的文章：

- [SpringBoot - @ControllerAdvice](https://www.hangge.com/blog/cache/detail_2483.html)的使用详解3（请求参数预处理 @InitBinder）

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>```|```<br>package com.example.demo;<br> <br>import org.springframework.web.bind.WebDataBinder;<br>import org.springframework.web.bind.annotation.*;<br> <br>@RestController<br>public class HelloController {<br>    @GetMapping("/hello")<br>    public String hello(@ModelAttribute("u") User user) {<br>        return "name<br>```<br><br>：<br><br>```<br>" + user.getName() + "\<br\> age<br>```<br><br>：<br><br>```<br>" + user.getAge();<br>    }<br> <br>    @InitBinder("u")<br>    private void initBinder(WebDataBinder binder) {<br>        binder.setFieldDefaultPrefix("u.");<br>    }<br>}<br>```|

（3）重启程序可以看到参数以及成功接收了：

[![SpringBoot Get](Exported%20image%2020260702232759-9.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

**3****，构造多个对象来接收参数**
（1）如果一个 **get** 请求的参数分属不同的对象，也可以使用多个对象来接收参数：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>- （2）新增的 **Phone** 类定义如下：
- |   |   |
- |---|---|
- |
<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>```|```<br>package com.example.demo;<br> <br>public class Phone {<br>    private String number;<br> <br>    public String getNumber() {<br>        return number;<br>    }<br> <br>    public void setNumber(String number) {<br>        this.number = number;<br>    }<br>}<br>```|

（3）下面是一个简单的测试样例：

[![SpringBoot Get](Exported%20image%2020260702232802-10.png)](https://www.hangge.com/blog/cache/detail_2484.html#)

原文出自：[www.hangge.com](https://www.hangge.com/)  转载请保留原文链接： [https://www.hangge.com/blog/cache/detail_2484.html](https://www.hangge.com/blog/cache/detail_2484.html)
 \> 来自 \<[https://www.hangge.com/blog/cache/detail_2484.html](https://www.hangge.com/blog/cache/detail_2484.html)\>
 [![SpringBoot Get](Exported%20image%2020260702232905-11.png)](https://www.hangge.com/blog/cache/detail_2484.html#)
[![SpringBoot Get](Exported%20image%2020260702232908-12.png)](https://www.hangge.com/blog/cache/detail_2484.html#)
[![SpringBoot Get](Exported%20image%2020260702232911-13.png)](https://www.hangge.com/blog/cache/detail_2484.html#)
 [![SpringBoot Get](Exported%20image%2020260702232913-14.png)](https://www.hangge.com/blog/cache/detail_2484.html#)[![SpringBoot Get](Exported%20image%2020260702232918-15.png)](https://www.hangge.com/blog/cache/detail_2484.html#)    [![SpringBoot Get](Exported%20image%2020260702232920-16.png)](https://www.hangge.com/blog/cache/detail_2484.html#)[![SpringBoot Get](Exported%20image%2020260702232922-17.png)](https://www.hangge.com/blog/cache/detail_2484.html#)
 [![SpringBoot Get](Exported%20image%2020260702232924-18.png)](https://www.hangge.com/blog/cache/detail_2484.html#)[![SpringBoot Get](Exported%20image%2020260702232926-19.png)](https://www.hangge.com/blog/cache/detail_2484.html#)[![SpringBoot Get](Exported%20image%2020260702232928-20.png)](https://www.hangge.com/blog/cache/detail_2484.html#)[![SpringBoot Get](Exported%20image%2020260702232930-21.png)](https://www.hangge.com/blog/cache/detail_2484.html#)
\> 来自 \<[https://www.hangge.com/blog/cache/detail_2484.html](https://www.hangge.com/blog/cache/detail_2484.html)\>
