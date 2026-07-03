---
title: 二）springboot整合redis，基于注解快速实现缓存功能
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
隐 风

已于 2022-06-21 08:33:41 修改

2356
收藏 43
分类专栏： springboot企业级实战 文章标签： java spring boot 缓存 云原生 微服务 原力计划
版权

华为云开发者联盟
文章已被华为云开发者联盟社区收录
加入社区

springboot企业级实战
专栏收录该内容
5 篇文章4 订阅
已订阅
前言
对于咱们程序员而言，在考虑使用一个新功能的框架式，我们首先需要弄懂它的定义是什么？为什么要用它？应该怎样用才能更好的实现它的价值？

无论在使用什么框架或者学习新东西的时候都需要遵循这三个问题原则。

1、什么是缓存
缓存主要是将数据存在计算机的内存当中，以便于在使用的时候是可以实现快速读取使用，它的快也是相对于硬盘读取而言。

Redis 是一个开源(BSD 许可)的内存中数据结构存储，用作数据库、缓存、消息代理和流引擎。Redis 提供数据结构，例如字符串、散列、列表、集合、带有范围查询的排序集、位图、超日志、地理空间索引和流。Redis 具有内置复制、 Lua 脚本编写、 LRU 垃圾清理、事务处理和不同级别的磁盘持久性，并通过 Redis Sentinel 提供高可用性和使用 Redis Cluster 自动分区。
为了实现最佳性能，Redis 使用内存中的数据集。根据用例的不同，Redis 可以通过定期将数据集转储到磁盘或将每个命令附加到基于磁盘的日志来持久化数据。如果您只是需要一个功能丰富的、联网的、内存中的缓存，也可以禁用持久性。

redis是一种使用比较广泛、性能强悍的缓存框架，在国内公司的使用量也是很多的。

2、为什么要用缓存
缓存主要是针对读多写少、高并发的应用场景，来实现对数据的快速响应。

使用缓存后的好处如下：

1、提高读取吞吐量

2、提升应用程序性能

3、降低数据库成本

4、减少后端负载

5、消除数据库热点

6、可预测的性能

既然使用缓存的好处那么明显，我们怎么会拒绝这么好的东西呢？

3、怎么使用缓存
整合redis前需要把本地redis或者远程的redis服务先启动起来，可通过点击下载redis到本地运行起来，点击redis-server运行后界面如下图

我们主要是基于springboot进行使用redis，在使用之前你需要先搭建好springboot的项目，如果不会搭建的朋友可参考这篇博客（一）还不会用springboot写接口？快看这里，手把手操作，一发入魂~

之后咱们所有的功能都是基于该项目进行深层开发，尽可能的让每一为同学都会使用java的框架进行项目开发，入门程序猿领域。

废话不多说，咱们开始干吧。

3.1 引入redis依赖
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-data-redis\</artifactId\>
\</dependency\>
1
2
3
4
项目完整的pom.xml文件如下：

\<?xml version="1.0" encoding="UTF-8"?\>
\<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 [https://maven.apache.org/xsd/maven-4.0.0.xsd](https://maven.apache.org/xsd/maven-4.0.0.xsd)"\>
\<modelVersion\>4.0.0\</modelVersion\>
\<parent\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-parent\</artifactId\>
\<version\>2.6.4\</version\>
\<relativePath/\> \<!-- lookup parent from repository --\>
\</parent\>
\<groupId\>com.yinfeng\</groupId\>
\<artifactId\>test\</artifactId\>
\<version\>0.0.1-SNAPSHOT\</version\>
\<name\>test\</name\>
\<description\>test\</description\>
\<properties\>
\<java.version\>1.8\</java.version\>
\</properties\>
\<dependencies\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-web\</artifactId\>
\</dependency\>

\<dependency\>
\<groupId\>org.projectlombok\</groupId\>
\<artifactId\>lombok\</artifactId\>
\<optional\>true\</optional\>
\</dependency\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-test\</artifactId\>
\<scope\>test\</scope\>
\</dependency\>

\<dependency\>
\<groupId\>mysql\</groupId\>
\<artifactId\>mysql-connector-java\</artifactId\>
\</dependency\>

\<dependency\>
\<groupId\>com.baomidou\</groupId\>
\<artifactId\>mybatis-plus-boot-starter\</artifactId\>
\<version\>3.5.1\</version\>
\</dependency\>
\<dependency\>
\<groupId\>com.github.xiaoymin\</groupId\>
\<artifactId\>knife4j-spring-boot-starter\</artifactId\>
\<version\>3.0.3\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-data-redis\</artifactId\>
\</dependency\>
\</dependencies\>

\<build\>
\<plugins\>
\<plugin\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-maven-plugin\</artifactId\>
\<configuration\>
\<excludes\>
\<exclude\>
\<groupId\>org.projectlombok\</groupId\>
\<artifactId\>lombok\</artifactId\>
\</exclude\>
\</excludes\>
\</configuration\>
\</plugin\>
\</plugins\>
\</build\>

\</project\>

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
3.2 配置redis连接信息并创建redis配置类
在application.yml文件配置redis链接信息，我这里使用的是本地redis服务，所以链接信息是127.0.0.1

spring:
redis:
host: 127.0.0.1
port: 6379
1
2
3
4
完整的yml文件配置如下

server:
# 服务端口
port: 8888
servlet:
context-path: /test
spring:
application:
name: yinfeng-test
# 数据库相关配置
datasource:
url: jdbc:mysql://127.0.0.1:3306/test?useSSL=false&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
username: root
password: yinfeng
driver-class-name: com.mysql.cj.jdbc.Driver
redis:
host: 127.0.0.1
port: 6379

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
创建redis配置类，一定要注意打上@EnableCaching注解，否则spring自带的缓存注解功能将不会自动启用

/**
* @author yinfeng
* @description redis配置类
* @since 2022/5/29 0:03
*/
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {

/**
* 自定义配置 RedisTemplate
* @Primary注解 默认加载此配置 忽略 RedisAutoConfiguration 的 stringRedisTemplate 配置
* @param factory
* @return
*/
@Bean
@Primary
@SuppressWarnings("all")
public RedisTemplate\<String, Object\> redisTemplate(RedisConnectionFactory factory) {
// 我们为了自己开发方便，一般直接使用 \<String, Object\>
RedisTemplate\<String, Object\> template = new RedisTemplate\<String, Object\>();
template.setConnectionFactory(factory);
// Json序列化配置
Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
ObjectMapper om = new ObjectMapper();
om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
jackson2JsonRedisSerializer.setObjectMapper(om);
// String 的序列化
StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
// key采用String的序列化方式
template.setKeySerializer(stringRedisSerializer);
// hash的key也采用String的序列化方式
template.setHashKeySerializer(stringRedisSerializer);
// value序列化方式采用jackson
template.setValueSerializer(jackson2JsonRedisSerializer);
// hash的value序列化方式采用jackson
template.setHashValueSerializer(jackson2JsonRedisSerializer);
template.afterPropertiesSet();
return template;
}

/**
* 修改 Cacheable 默认序列化方式 使用Redis配置的序列化
* 解决 @Cacheable 序列化失败 而 RedisUtil可以成功 问题
* @param redisTemplate RedisTemplate
* @return RedisCacheManager
*/
@Bean
public RedisCacheManager redisCacheManager(RedisTemplate redisTemplate) {
RedisCacheWriter redisCacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(redisTemplate.getConnectionFactory());
RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
// 设置默认的超时时间为2小时
.entryTtl(Duration.ofHours(2))
.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(redisTemplate.getValueSerializer()))
// 设置默认的缓存前缀
.prefixCacheNameWith("CACHE_");
return new RedisCacheManager(redisCacheWriter, redisCacheConfiguration);
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
3.3 在controller接口方法上使用注解
使用缓存查询注解。在这里，我们主要是通过获取菜单详情的接口上打了一个缓存查询的注解，然后即可以实现每次查询的时候先判断缓存里面有没有值，有值就直接从缓存里面去，否则再去查数据库
为了方便测试，我把注解直接打在controller层上面。但是大家要注意，在项目中一般要写在service层(实现类上的)。

/**
* @author yinfeng
* @since 2022年3月12日 下午9:40:48
* @description 菜单表
*/
@Api(tags = "菜单表")
@RestController
@RequestMapping("/menus")
@Slf4j
public class MenusController{
@Resource
private MenusService menusService;   @PostMapping("/getOne")
@ApiOperation(value = "单个查询", notes = "菜单表")
@Cacheable(value = "MenusController", key = "'menus-' + #menus.id")
public Menus getOne(@RequestBody Menus menus) {
log.info("从数据库读取数据");
return menusService.getOne(menus);
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
使用缓存更新注解，主要包含新增、更新和删除数据。该缓存更新和删除的原理主要是是在每次接口调用的时候都去更新对应缓存里面key，删除也是通过重新设置一个新的值实现的，等下通过测试，咱们可以很明显的看到结果

/**
* @author yinfeng
* @since 2022年3月12日 下午9:40:48
* @description 菜单表
*/
@Api(tags = "菜单表")
@RestController
@RequestMapping("/menus")
@Slf4j
public class MenusController{
@Resource
private MenusService menusService;   @PostMapping("/save")
@ApiOperation(value = "新增或编辑", notes = "菜单表")
@CachePut(value = "MenusController", key = "'menus-' + #menus.id")
public Menus save(@RequestBody Menus menus) {
return menusService.saveData(menus);
}

@PostMapping("/delete")
@ApiOperation(value = "删除", notes = "菜单表")
@CacheEvict(value = "MenusController", key = "'menus-' + #menus.id")
public boolean delete(@RequestBody Menus menus) {
return menusService.delete(menus);
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
3.4 测试一下
我们通过knife4j接口文档工具调用一下接口进行测试

查询详情接口测试
我们先通过调用菜单详情的接口，然后可以看到正常返回数据，同时日志里面因为是第一次请求所以直接去查数据库，当第二次请求，打过来的时候，可以看到那个日志已经没了，所以该请求通过缓存取到的数据

同时，我们通过redis客户端也可以很清晰的看到，已经有一个对应的key和value了，因此可以说明咱们的注解已经生效了

更新接口测试
我们首先调用保存的方法去更新咱们这条测试数据，将name改为首页2，通过页面可以看到，咱们已经成功更新了。接下来咱们主要是看缓存里面的数据有没有更新

当我们再次调用详情接口去查询数据的时候，可以看到数据已经成功更新了，因为咱们的缓存已经有了这个key，而且这个返回的数据是更新后的数据，所以说明咱们缓存里面的数据也已经更新成功了

删除接口测试
接下来我们测试一下删除注解，调用接口之后，可以看到放了一个true，说明咱们已经删除数据库的数据成功了。

再次调用一下详情接口，可以看到该数据已经没有了

然后再通过redis客户端去查一下该key还在不在，可以很清晰的看到，该key是存在的，但是值已经变了

上面就是咱们测试的一个全流程，如果有什么疑问和建议欢迎大家留言

4、源码地址
[https://gitee.com/yinfeng-code/test.git](https://gitee.com/yinfeng-code/test.git)
1
5、总结
这篇博客主要是通过springboot简单快捷使用redis，后面咱们可根据该项目逐步开发更多高深的企业级功能，包括starter的封装、数据操作变更日志、响应体包装等，欢迎老铁们追更。

肝文不易，最后希望老铁们给波三连（点赞、收藏、评论）加关注，非常感谢大家支持~~
————————————————
版权声明：本文为CSDN博主「隐 风」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/a1774381324/article/details/125362883
