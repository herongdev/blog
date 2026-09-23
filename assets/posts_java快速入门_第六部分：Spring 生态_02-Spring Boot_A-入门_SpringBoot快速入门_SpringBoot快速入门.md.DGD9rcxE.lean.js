import{_ as l,o as p,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const S=JSON.parse('{"title":"SpringBoot快速入门","description":"","frontmatter":{"title":"SpringBoot快速入门","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/SpringBoot快速入门.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/SpringBoot快速入门.md"}'),e={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/SpringBoot快速入门.md"};function o(t,a,c,r,u,g){return p(),i("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**代码实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**创建****Maven****工程**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1.使用idea工具创建一个maven工程，该工程为普通的java工程即可")]),s(`
`),n("span",{class:"line"},[n("span",null,"2.添加SpringBoot的起步依赖")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringBoot要求，项目要继承SpringBoot的起步依赖spring-boot-starter-parent")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringBoot要集成SpringMVC进行Controller的开发，所以项目要导入web的启动依赖")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-parent\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-web\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**3.****编写****SpringBoot****引导类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"要通过SpringBoot提供的引导类起步SpringBoot才可以进行访问")]),s(`
`),n("span",{class:"line"},[n("span",null,"package com.itheima;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.boot.SpringApplication;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.boot.autoconfigure.SpringBootApplication;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootApplication")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MySpringBootApplication \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringApplication.run(MySpringBootApplication.class);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**4.****编写****Controller**")]),s(`
`),n("span",{class:"line"},[n("span",null,"package com.itheima.controller;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.stereotype.Controller;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.web.bind.annotation.RequestMapping;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.web.bind.annotation.ResponseBody;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Controller")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class QuickStartController \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'@RequestMapping("/quick")')]),s(`
`),n("span",{class:"line"},[n("span",null,"@ResponseBody")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String quick()\\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'return "springboot 访问成功!";')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在引导类MySpringBootApplication同级包或者子级包中创建QuickStartController")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用****J****ava****配置**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**J****ava****配置主要依靠****java****类和一些注解，比较常用的注解有：**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@configuration:****声明一个类作为配置类，代替****xml****文件**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Bean:****声明在方法上，将方法的返回值加入****B****ean****容器，代替****\\<bean\\>****标签**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Value:****属性注入**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@PropertySource:****指定外部属性文件**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**以配置数据库连接为例**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**先引入****druid****依赖**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\</dependency\\>==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<dependency\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<groupId\\>====com.alibaba====\\</groupId\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<artifactId\\>====druid====\\</artifactId\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<version\\>====1.1.6====\\</version\\>==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**改写****controller**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**打好断点看变量是否定义成功，以****debugger****方式启动项目并访问****/hello**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**可见****java****配置文件生效**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.****测试**")]),s(`
`),n("span",{class:"line"},[n("span",null,"执行SpringBoot起步类的主方法，控制台打印日志如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过日志发现，Tomcat started on port(s): 8080 (http) with context path ''")]),s(`
`),n("span",{class:"line"},[n("span",null,"tomcat已经起步，端口监听8080，web应用的虚拟工程名称为空")]),s(`
`),n("span",{class:"line"},[n("span",null,"打开浏览器访问url地址为：http://localhost:8080/quick")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**快速入门解析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**SpringBoot****代码解析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootApplication：标注SpringBoot的启动类，该注解具备多种功能（后面详细剖析）")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringApplication.run(MySpringBootApplication.class) 代表运行SpringBoot的启动类，参数为SpringBoot启动类的字节码对象")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**SpringBoot****工程热部署**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们在开发中反复修改类、页面等资源，每次修改后都是需要重新启动才生效，这样每次启动都很麻烦，浪费了大量的时间，我们可以在修改代码后不重启就能生效，在 pom.xml 中添加如下配置就可以实现这样的功能，我们称之为热部署。")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<!--热部署配置--\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-devtools\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：IDEA进行SpringBoot热部署失败原因")]),s(`
`),n("span",{class:"line"},[n("span",null,"出现这种情况，并不是热部署配置问题，其根本原因是因为Intellij IEDA默认情况下不会自动编译，需要对IDEA进行自动编译的设置，如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`然后 Shift+Ctrl+Alt+/，选择Registry`")])])])])],-1)])])}const B=l(e,[["render",o]]);export{S as __pageData,B as default};
