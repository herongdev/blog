import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"SpringBoot与整合其他技术","description":"","frontmatter":{"title":"SpringBoot与整合其他技术","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot与整合其他技术.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot与整合其他技术.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot与整合其他技术.md"};function r(t,l,u,c,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**5.1 SpringBoot****整合****Mybatis**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.1** **添加****Mybatis****的起步依赖**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.2** **添加数据库驱动坐标**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.3** **添加数据库连接信息**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在application.properties中添加数据量的连接信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.4** **创建****user****表**")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--mybatis起步依赖--\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.mybatis.spring.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>mybatis-spring-boot-starter\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>1.1.1\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- MySQL连接驱动 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>mysql\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>mysql-connector-java\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"#DB Configuration:")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.driverClassName=com.mysql.jdbc.Driver")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test?")]),s(`
`),n("span",{class:"line"},[n("span",null,"useUnicode=true&characterEncoding=utf8")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.username=root")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.password=root")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在test数据库中创建user表")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.5** **创建实体****Bean**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.6** **编写****Mapper**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：@Mapper标记该类是一个mybatis的mapper接口，可以被spring boot自动扫描到spring上下文中")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.7** **配置****Mapper****映射文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,'在src\\main\\resources\\mapper路径下加入UserMapper.xml配置文件"')]),s(`
`),n("span",{class:"line"},[n("span",null,"-- ----------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- Table structure for `user`")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- ----------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"DROP TABLE IF EXISTS `user`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"CREATE TABLE `user` (")]),s(`
`),n("span",{class:"line"},[n("span",null,"`id` int(11) NOT NULL AUTO_INCREMENT,")]),s(`
`),n("span",{class:"line"},[n("span",null,"`username` varchar(50) DEFAULT NULL,")]),s(`
`),n("span",{class:"line"},[n("span",null,"`password` varchar(50) DEFAULT NULL,")]),s(`
`),n("span",{class:"line"},[n("span",null,"`name` varchar(50) DEFAULT NULL,")]),s(`
`),n("span",{class:"line"},[n("span",null,"PRIMARY KEY (`id`)")]),s(`
`),n("span",{class:"line"},[n("span",null,") ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- ----------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- Records of user")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- ----------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"INSERT INTO `user` VALUES ('1', 'zhangsan', '123', '张三');")]),s(`
`),n("span",{class:"line"},[n("span",null,"INSERT INTO `user` VALUES ('2', 'lisi', '123', '李四');")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class User {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 主键")]),s(`
`),n("span",{class:"line"},[n("span",null,"private Long id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 用户名")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String username;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 密码")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String password;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 姓名")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//此处省略getter和setter方法 .. ..")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Mapper")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface UserMapper {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public List\\<User\\> queryUserList();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.8** **在****application.properties****中添加****mybatis****的信息**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.9** **编写测试****Controller**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.1.10** **测试**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.2 SpringBoot****整合****Junit**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.2.1** **添加****Junit****的起步依赖**")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<?xml version="1.0" encoding="utf-8" ?\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"')]),s(`
`),n("span",{class:"line"},[n("span",null,'"[http://mybatis.org/dtd/mybatis-3-mapper.dtd](http://mybatis.org/dtd/mybatis-3-mapper.dtd)" \\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<mapper namespace="com.itheima.mapper.UserMapper"\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<select id="queryUserList" resultType="user"\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"select * from user")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</select\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</mapper\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"#spring集成Mybatis环境")]),s(`
`),n("span",{class:"line"},[n("span",null,"#pojo别名扫描包")]),s(`
`),n("span",{class:"line"},[n("span",null,"mybatis.type-aliases-package=com.itheima.domain")]),s(`
`),n("span",{class:"line"},[n("span",null,"#加载Mybatis映射文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"mybatis.mapper-locations=classpath:mapper/*Mapper.xml")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Controller")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MapperController {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowired")]),s(`
`),n("span",{class:"line"},[n("span",null,"private UserMapper userMapper;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@RequestMapping("/queryUser")')]),s(`
`),n("span",{class:"line"},[n("span",null,"@ResponseBody")]),s(`
`),n("span",{class:"line"},[n("span",null,"public List\\<User\\> queryUser(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<User\\> users = userMapper.queryUserList();")]),s(`
`),n("span",{class:"line"},[n("span",null,"return users;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼**5.2.2** **编写测试类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中，")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringRunner继承自SpringJUnit4ClassRunner，使用哪一个Spring提供的测试测试引擎都可以")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootTest的属性指定的是引导类的字节码对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.2.3** **控制台打印信息**")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--测试的起步依赖--\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-test\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>test\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"package com.itheima.test;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.itheima.MySpringBootApplication;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.itheima.domain.User;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.itheima.mapper.UserMapper;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.junit.Test;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.junit.runner.RunWith;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.beans.factory.annotation.Autowired;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.boot.test.context.SpringBootTest;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.test.context.junit4.SpringRunner;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import java.util.List;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@RunWith(SpringRunner.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootTest(classes = MySpringBootApplication.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MapperTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowired")]),s(`
`),n("span",{class:"line"},[n("span",null,"private UserMapper userMapper;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<User\\> users = userMapper.queryUserList();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(users);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public final class SpringRunner extends SpringJUnit4ClassRunner")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼**5.3 SpringBoot****整合****Spring Data JPA**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.1** **添加****Spring Data JPA****的起步依赖**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.2** **添加数据库驱动依赖**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.3** **在****application.properties****中配置数据库和****jpa****的相关属性**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.4** **创建实体配置实体**")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- springBoot JPA的起步依赖 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-data-jpa\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- MySQL连接驱动 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>mysql\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>mysql-connector-java\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"#DB Configuration:")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.driverClassName=com.mysql.jdbc.Driver")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test?")]),s(`
`),n("span",{class:"line"},[n("span",null,"useUnicode=true&characterEncoding=utf8")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.username=root")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.password=root")]),s(`
`),n("span",{class:"line"},[n("span",null,"#JPA Configuration:")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jpa.database=MySQL")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jpa.show-sql=true")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jpa.generate-ddl=true")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jpa.hibernate.ddl-auto=update")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jpa.hibernate.naming_strategy=org.hibernate.cfg.ImprovedNamingStrategy")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Entity")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼**5.3.5** **编写****UserRepository**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.6** **编写测试类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.3.7** **控制台打印信息**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：如果是jdk9，执行报错如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class User {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 主键")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Id")]),s(`
`),n("span",{class:"line"},[n("span",null,"@GeneratedValue(strategy = GenerationType.IDENTITY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"private Long id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 用户名")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String username;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 密码")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String password;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 姓名")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//此处省略setter和getter方法... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface UserRepository extends JpaRepository\\<User,Long\\>{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public List\\<User\\> findAll();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@RunWith(SpringRunner.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootTest(classes=MySpringBootApplication.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class JpaTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowired")]),s(`
`),n("span",{class:"line"},[n("span",null,"private UserRepository userRepository;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<User\\> users = userRepository.findAll();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(users);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼原因：jdk缺少相应的jar")]),s(`
`),n("span",{class:"line"},[n("span",null,"解决方案：手动导入对应的maven坐标，如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.4 SpringBoot****整合****Redis**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.4.1** **添加****redis****的起步依赖**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.4.2** **配置****redis****的连接信息**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5.4.3** **注入****RedisTemplate****测试****redis****操作**")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--jdk9需要导入如下坐标--\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>javax.xml.bind\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>jaxb-api\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.3.0\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置使用redis启动器 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-data-redis\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"#Redis")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.redis.host=127.0.0.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.redis.port=6379")]),s(`
`),n("span",{class:"line"},[n("span",null,"@RunWith(SpringRunner.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootTest(classes = SpringbootJpaApplication.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedisTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowired")]),s(`
`),n("span",{class:"line"},[n("span",null,"private UserRepository userRepository;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowired")]),s(`
`),n("span",{class:"line"},[n("span",null,"private RedisTemplate\\<String, String\\> redisTemplate;")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test() throws JsonProcessingException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//从redis缓存中获得指定的数据")]),s(`
`),n("span",{class:"line"},[n("span",null,'￼String userListData = redisTemplate.boundValueOps("user.findAll").get();')]),s(`
`),n("span",{class:"line"},[n("span",null,"//如果redis中没有数据的话")]),s(`
`),n("span",{class:"line"},[n("span",null,"if(null==userListData){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//查询数据库获得数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<User\\> all = userRepository.findAll();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//转换成json格式字符串")]),s(`
`),n("span",{class:"line"},[n("span",null,"ObjectMapper om = new ObjectMapper();")]),s(`
`),n("span",{class:"line"},[n("span",null,"userListData = om.writeValueAsString(all);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//将数据存储到redis中，下次在查询直接从redis中获得数据，不用在查询数据库")]),s(`
`),n("span",{class:"line"},[n("span",null,'redisTemplate.boundValueOps("user.findAll").set(userListData);')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("===============从数据库获得数据===============");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}else{")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("===============从redis缓存中获得数据===============");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(userListData);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const y=a(i,[["render",r]]);export{m as __pageData,y as default};
