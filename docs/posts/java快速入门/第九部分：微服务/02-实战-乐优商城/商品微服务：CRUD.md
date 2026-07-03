---
title: 商品微服务：CRUD
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
![iJ](Exported%20image%2020260702233743-0.png)
`创建子服务：ly-item`

![Add as module to .O.OSNAPSHOT Pa rent Groupld Arti...](Exported%20image%2020260702233747-1.png)
![New Module Module name Content root Module file lo...](Exported%20image%2020260702233749-2.png)

在pom中将包类型改为pom
\<?xmlversion="1.0"encoding="UTF-8"?\>
\<projectxmlns="http://maven.apache.org/POM/4.0.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd"\>
\<parent\>
\<artifactId\>leyou\</artifactId\>
\<groupId\>com.leyou.parent\</groupId\>
\<version\>1.0.0-SNAPSHOT\</version\>
\</parent\>
\<modelVersion\>4.0.0\</modelVersion\>

\<groupId\>com.leyou.service\</groupId\>
\<artifactId\>ly-Item\</artifactId\>
\<packaging\>pom\</packaging\>
\</project\>

再在ly-item下创建子工程

ly-item-interface

ly-item-service

ly-item实体类基本上不需要什么依赖
ly-item-service中需要依赖，配置pom文件
\<?xmlversion="1.0"encoding="UTF-8"?\>
\<projectxmlns="http://maven.apache.org/POM/4.0.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd"\>
\<parent\>
\<artifactId\>ly-item\</artifactId\>
\<groupId\>com.leyou.service\</groupId\>
\<version\>1.0.0-SNAPSHOT\</version\>
\</parent\>
\<modelVersion\>4.0.0\</modelVersion\>

\<groupId\>com.leyou.service\</groupId\>
\<artifactId\>ly-item-service\</artifactId\>

\<dependencies\>
\<!--web启动器--\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-web\</artifactId\>
\</dependency\>
\<!--Eureka客户端--\>
\<dependency\>
\<groupId\>org.springframework.cloud\</groupId\>
\<artifactId\>spring-cloud-starter-netflix-eureka-client\</artifactId\>
\</dependency\>
\<!--通用Mapper启动器--\>
\<dependency\>
\<groupId\>tk.mybatis\</groupId\>
\<artifactId\>mapper-spring-boot-starter\</artifactId\>
\</dependency\>
\<dependency\>
\<groupId\>com.github.pagehelper\</groupId\>
\<artifactId\>pagehelper-spring-boot-starter\</artifactId\>
\</dependency\>
\<dependency\>
\<groupId\>mysql\</groupId\>
\<artifactId\>mysql-connector-java\</artifactId\>
\</dependency\>
\<dependency\>
\<groupId\>com.leyou.service\</groupId\>
\<artifactId\>ly-item-interface\</artifactId\>
\<version\>1.0.0-SNAPSHOT\</version\>
\</dependency\>
\</dependencies\>
\</project\>

新建启动类
![lyitem lyiteminterface lyitemservice com.leyou Lyl...](Exported%20image%2020260702233755-3.png)

packagecom.leyou;

importorg.springframework.boot.SpringApplication;
importorg.springframework.boot.autoconfigure.SpringBootApplication;
importorg.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
publicclass LyItemApplication{
publicstaticvoid main(String[]args){
SpringApplication._run_(LyItemApplication.class,args);
}
}

新建application.yml
server:
port:8081
spring:
application:
name:item-service
datasource:_#__数据库驱动可自动推断，不用配置_
url:jdbc:mysql://localhost:3306/yun6
username:root
password:123
eureka:
client:
service-url:
defaultZone:http://127.0.0.1:10086/eureka
instance:_#__确定拿到的一定是__ip_
prefer-ip-address:true
ip-address:127.0.0.1

修改ly-gateway配置文件
![name eureka client api gateway service url default...](Exported%20image%2020260702233757-4.png)

至此，微服务搭建完毕
依次启动LyRegistry,LyItemApplication，LyGateway进行测试
在浏览器中打开[http://127.0.0.1:10086/](http://127.0.0.1:10086/)
可以在gateway的配置文件中修改拉取的时间，默认30s
关键字fetch
![server port spring appt i n.e apigateway eureka de...](Exported%20image%2020260702233759-5.png)

`如果不想eruka注册自己，可以在ly-registry中进行配置`

![server port 18886 sprung application name lyregist...](Exported%20image%2020260702233803-6.png)
