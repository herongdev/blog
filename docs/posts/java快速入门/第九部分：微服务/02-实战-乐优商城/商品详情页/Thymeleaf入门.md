---
title: Thymeleaf入门
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`新建一个微服务项目：`

![Project leyou New Module uml lyupload x Add as mod...](Exported%20image%2020260703000155-0.png)
![New M Module name Content root Module file locatio...](Exported%20image%2020260703000157-1.png)

`引入依赖`

![leyou lycommon lygateway lyitem lypage lypage.iml ...](Exported%20image%2020260703000159-2.png)

默认配置
默认不需要做任何配置，启动器已经帮我们把Thymeleaf的视图器配置完成了。
使用的是ThymeleafViewResolver类实现的，它有一个叫做ThymeleafAutoConfiguration配置类
![eConf iqurat ionPropert les prefix Spring. thy.ete...](Exported%20image%2020260703000201-3.png)

它会自动寻找resource/templates/xxx.html的文件；

比如我们新建一个HelloController.java文件，其中代码如下，主要是返回文件名和一些变量，然后，它就会自动找到resource/templates/hello.html，并在这个文件中，可以使用我们定义的变量。
HelloController代码：
![CO. teyOu. import org.springf ramevork. stereotype...](Exported%20image%2020260703000208-4.png)

`hello.html代码：`

![OOCTYPE htt 0 t000 en n thehttp thyeteaf 0 00t cha...](Exported%20image%2020260703000210-5.png)

`建立启动类：`

![6 8 9 package coo. teyou iport org.springfraework....](Exported%20image%2020260703000213-6.png)

- 测试一下，访问一下localhost:8080/hello.html就可以显示出文件内容
- 文件如果再做修改，默认修改内容不会生效，我们需要配置一下才可以让修改实时更新：

![Exported image](Exported%20image%2020260703000214-7.png)

`此时重新编译ctrl+shift+f一下文件，再刷新浏览器就可以看到新内容了，而不用重启服务`
