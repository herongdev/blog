---
title: 九、MyBatis使用和不足思考
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
在项目的数据库开发中，不可避免地会使用到持久层框架。 当前主流的持久层框架有`Spring Data`、`Hibernate`、`MyBatis`等，这里使用`MyBatis`。
本文，集成`MyBatis`并实现了简单的增删改查。在使用过程中，指出`MyBatis`和项目的不足，并思考解决方案。
如果对`MyBaits`的使用很熟悉的，可以直接跳到总结。
**具体实现**
`Maven`**依赖**

\<dependencies\>
    \<dependency\>
        \<groupId\>org.springframework.boot\</groupId\>
        \<artifactId\>spring-boot-starter-jdbc\</artifactId\>
    \</dependency\>

    \<!-- mybatis --\>
    \<dependency\>
        \<groupId\>org.mybatis.spring.boot\</groupId\>
        \<artifactId\>mybatis-spring-boot-starter\</artifactId\>
        \<version\>2.1.1\</version\>
    \</dependency\>
    \<!-- mysql --\>
    \<dependency\>
        \<groupId\>mysql\</groupId\>
        \<artifactId\>mysql-connector-java\</artifactId\>
        \<scope\>runtime\</scope\>
    \</dependency\>
\</dependencies\>
**参数配置：位置在****resource/application.yml**

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://xxxxxxxx:3306/framework?useUnicode=true&characterEncoding=utf-8
    username: xxxxxxxx
    password: xxxxxxxx
mybatis:
  mapper-locations: classpath:sql-mappers/*.xml
  configuration:
    map-underscore-to-camel-case: true
- `mybatis.mapper-locations` 用于指定`mapper`文件的位置
- `mybatis.configuration.map-underscore-to-camel-case` 用于开启驼峰功能`￼`比如：数据库列名：

    `create_time`

    转成 实体类属性：`createTime`

**数据库表**

DROPTABLEIF EXISTS`sys_user`;￼CREATETABLE`sys_user` (￼	`id` INT(11) NOTNULLAUTO_INCREMENT,￼	`account` VARCHAR(40) NOTNULLCOMMENT '
==用户名==

`',￼	`password` VARCHAR(255) NOTNULLCOMMENT '`

==密码==

`',￼	`nickname` VARCHAR(60) DEFAULTNULLCOMMENT '`

==昵称==

`',￼	`email` VARCHAR(40) DEFAULTNULLCOMMENT '`

==邮箱==

`',￼	`phone` VARCHAR(11) DEFAULTNULLCOMMENT '`

==电话==

`',￼	`create_time` datetime DEFAULTNULLCOMMENT '`

==创建时间==

`',￼	`create_user` VARCHAR(11) DEFAULTNULLCOMMENT '`

==创建人==

`',￼	`modify_time` datetime DEFAULTNULLCOMMENT '`

==修改时间==

`',￼	`modify_user` VARCHAR(11) DEFAULTNULLCOMMENT '`

==修改人==

',￼	PRIMARYKEY (`id`)￼) ENGINE =INNODB AUTO_INCREMENT =1DEFAULTCHARSET =utf8mb4;￼
 ==保存路径：==`classpath`==：==`resources/sqls/sys.sql`
**实体类**

@Getter@Setterpublic classUserextendsCommon{￼
privateLongid;￼
@NotNull(message = "
==用户账号不能为空==

")￼    @Size(min = 6, max = 11, message = "
==账号长度必须是==`6-11`==个字符==

")￼    privateStringaccount;￼
@NotNull(message = "
==用户密码不能为空==

")￼    @Size(min = 6, max = 11, message = "
==密码长度必须是==`6-16`==个字符==

")￼    privateStringpassword;￼
@Size(max = 40, message = "
==用户昵称不能超过==`40`==个字符==

")￼    privateStringnickname;￼
@Email(message = "
==邮箱格式不正确==

")￼    privateStringemail;￼
@Phone(message = "
==手机号格式不正确==

")￼    privateStringphone;￼}￼
Mapper
**文件**

\<?xml version="1.0"encoding="UTF-8"?\>\<!DOCTYPE mapperPUBLIC"-//mybatis.org//DTD Mapper 3.0//EN""http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>\<mappernamespace="com.zhuqc.framework.dao.UserDao"\>\<selectid="getUser"resultType="com.zhuqc.framework.entity.User"\>select * from sys_user where id = #{id, jdbcType = NUMERIC}￼    \</select\>\<insertid="addUser"parameterType="com.zhuqc.framework.entity.User"\>insert into sys_user￼          (account,￼           password,￼           nickname,￼           email,￼           phone,￼           create_user,￼           create_time,￼           modify_user,￼           modify_time)￼        values￼          (#{account, jdbcType = VARCHAR},￼           #{password, jdbcType = VARCHAR},￼           #{nickname, jdbcType = VARCHAR},￼           #{email, jdbcType = VARCHAR},￼           #{phone, jdbcType = VARCHAR},￼           #{createUser, jdbcType = VARCHAR},￼           #{createTime, jdbcType = TIMESTAMP},￼           #{modifyUser, jdbcType = VARCHAR},￼           #{modifyTime, jdbcType = TIMESTAMP})￼    \</insert\>\<deleteid="deleteUser"\>delete from sys_user￼         where id = #{id, jdbcType = NUMERIC}￼    \</delete\>\<updateid="updateUser"parameterType="com.zhuqc.framework.entity.User"\>update sys_user￼           set nickname       = #{nickname, jdbcType = VARCHAR},￼               email          = #{email, jdbcType = VARCHAR},￼               phone          = #{phone, jdbcType = VARCHAR},￼               modify_user    = #{modifyUser, jdbcType = VARCHAR},￼               modify_time    = #{modifyTime, jdbcType = TIMESTAMP}￼         where id = #{id, jdbcType = NUMERIC}￼    \</update\>\</mapper\>
==复制代码==
**持久层**

UserDao
@Mapperpublic interface UserDao {￼
UsergetUser(@Param("id") Long id);￼
intaddUser(User user);￼
intdeleteUser(@Param("id") Long id);￼
intupdateUser(User user);￼}￼
==复制代码==
`Mapper`文件与`Dao`类需要一一对应

- `Mapper`文件中的`namespace`对应`DAO`接口的全路径
- `Mapper`文件中`statement`的`id`对应`DAO`接口中的方法名
- `Mapper`文件中`statement`的`parameterType`对应`DAO`接口中方法的输入参数类型
- `Mapper`文件中`statement`的`resultType`对应`DAO`接口中方法的返回类型

**服务层**

 UserService
publicinterfaceUserService{￼
User getUser(Long id);￼
intaddUser(User user);￼
intdeleteUser(Long id);￼
intupdateUser(User user);￼}￼
==复制代码==

@Service@TransactionalpublicclassUserServiceImplimplementsUserService{￼
@AutowiredprivateUserDaouserDao;￼
@OverridepublicUsergetUser(Long id) {￼        returnuserDao.getUser(id);￼    }￼
@Overridepublicint addUser(User user) {￼        returnuserDao.addUser(user);￼    }￼
@Overridepublicint deleteUser(Long id) {￼        returnuserDao.deleteUser(id);￼    }￼
@Overridepublicint updateUser(User user) {￼        returnuserDao.updateUser(user);￼    }￼}￼
==复制代码==
**控制层**

 UserController
@RestController@RequestMapping("/user")￼public class UserController extends BaseController {￼
@Autowiredprivate UserService userService;￼
@GetMapping("/{id}")￼    public ApiResult getUser(@PathVariable("id") Long id) {￼        returnApiResult.success(userService.getUser(id));￼    }￼
@PostMapping("/add")￼    publicApiResultaddUser(@RequestBody@ValidUser user) {￼        setCreateInfo(user);￼        returnApiResult.success(userService.addUser(user));￼    }￼
@DeleteMapping("/{id}")￼    publicApiResultdeleteUser(@PathVariable("id") Long id) {￼        returnApiResult.success(userService.deleteUser(id));￼    }￼
@PutMapping("/{id}")￼    publicApiResultupdateUser(@RequestBody@ValidUser user) {￼        setModifyInfo(user);￼        returnApiResult.success(userService.updateUser(user));￼    }￼}￼
==复制代码==
编写完成后，访问

`Swagger`

地址对接口进行测试，如下：

![Exported image](Exported%20image%2020260702230356-0.png)

**总结**
至此，成功的集成了`MyBatis`并实现了简单的增删改查。

1. 每个实体都需要写增删改查`SQL`，感觉重复劳动
2. 没有`SQL`监控，不能统计`SQL`的运行情况
3. 没有分页插件，分页查询比较麻烦
4. 没有单元测试，接口测试比较麻烦

1. 使用代码生成器、集成`MyBatis-plus`。
2. 使用阿里数据源`Druid`
3. 集成分页插件`PageHelper`
4. 单元测试通过`MockMvc`类调用`Controller`接口

解决方案均会在后面的文章中实现。
以上，感谢阅读。如果感觉有帮助的话，不妨随手点个赞！
 \> 来自

 \<https://juejin.cn/post/6844904177752080397\>
但是在使用过程中我们很容易发现一些问题：
以上问题的解决方案：
 \> 来自

 \<https://juejin.cn/post/6844904177752080397\>
```
