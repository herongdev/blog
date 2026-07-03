---
title: Mybatis 传统 DAO 层开发了解
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
使用 `Mybatis` 开发 `Dao`，通常有两个方法，即原始 `Dao` 开发方式和 `Mapper` 接口代理开发方式。而现在主流
的开发方式是接口代理开发方式，这种方式总体上更加简便。我们的课程讲解也主要以接口代理开发方式为主。在
第二章节已经给大家介绍了基于代理方式的 `dao` 开发，现在给大家介绍一下基于传统编写 `Dao` 实现类的开发方式。

`5.1 Mybatis`

**实现** `DAO` **的传统开发方式**

`5.1.1`

**持久层** `Dao` **接口**

/**
*
* \<p\>Title: IUserDao\</p\>
* \<p\>Description:
用户的业务层接口

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public interface IUserDao {
/**
*
查询所有用户

* @return
*/
List\<User\> findAll();
/**
*
根据 `id` 查询

* @param userId
* @return
*/
User findById(Integer userId);
/**
*
保存用户

* @param user
* @return
影响数据库记录的行数

*/
int saveUser(User user);
/**
*
更新用户

* @param user
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
* @return
`影响数据库记录的行数`

*/
int updateUser(User user);
/**
*
`根据 `id` 删除用户`

* @param userId
* @return
*/
int deleteUser(Integer userId);
/**
*
`查询总记录条数`

* @return
*/
int findTotal();
}
5.1.2
`**持久层** `Dao` **实现类**`

/**
*
* \<p\>Title: UserDaoImpl\</p\>
* \<p\>Description: dao
`的实现类`
\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class UserDaoImpl implements IUserDao {
private SqlSessionFactory factory;
public UserDaoImpl(SqlSessionFactory factory) {
this.factory = factory;
}
@Override
public List\<User\> findAll() {
SqlSession session = factory.openSession();
List\<User\> users = session.selectList("com.itheima.dao.IUserDao.findAll");
session.close();
return users;
}
@Override
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
public User findById(Integer userId) {
SqlSession session = factory.openSession();
User user = session.selectOne("com.itheima.dao.IUserDao.findById",userId);
session.close();
return user;
}
@Override
public int saveUser(User user) {
SqlSession session = factory.openSession();
int res = session.insert("com.itheima.dao.IUserDao.saveUser",user);
session.commit();
session.close();
return res;
}
@Override
public int updateUser(User user) {
SqlSession session = factory.openSession();
int res = session.update("com.itheima.dao.IUserDao.updateUser",user);
session.commit();
session.close();
return res;
}
@Override
public int deleteUser(Integer userId) {
SqlSession session = factory.openSession();
int res = session.delete("com.itheima.dao.IUserDao.deleteUser",userId);
session.commit();
session.close();
return res;
}
@Override
public int findTotal() {
SqlSession session = factory.openSession();
int res = session.selectOne("com.itheima.dao.IUserDao.findTotal");
session.close();
return res;
}
}
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
5.1.3
`**持久层映射配置**`

\<?xml version="1.0" encoding="UTF-8"?\>
\<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>
\<mapper namespace="com.itheima.dao.IUserDao"\>
\<!--
`配置查询所有操作`
 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select * from user
\</select\>
\<!--
`根据 `id` 查询`
 --\>
\<select id="findById" resultType="com.itheima.domain.User"
parameterType="int"\>
select * from user where id = #{uid}
\</select\>
\<!--
`保存用户`

ognl
`表达式：它是 `apache` 提供的一种表达式语言，在 `struts2` 中也有应用。`

Object Graphic Navigation Language
对象图导航语言
它是按照一定的语法格式来获取数据的。
语法格式就是使用 `#{`对象`.`对象`}`的方式

#{user.username}
它会先去找 `user` 对象，然后在 `user` 对象中找到 `username` 属性，并把值取
出来

--\>
\<insert id="saveUser" parameterType="com.itheima.domain.User"\>
\<!--
`配置保存时获取插入的`
 id --\>
\<selectKey keyColumn="id" keyProperty="id" resultType="int"\>
select last_insert_id();
\</selectKey\>
insert into user(username,birthday,sex,address)
values(#{username},#{birthday},#{sex},#{address})
\</insert\>
\<!--
`更新用户`
 --\>
\<update id="updateUser" parameterType="com.itheima.domain.User"\>
update user set
username=#{username},birthday=#{birthday},sex=#{sex},address=#{address} where
id=#{id}
\</update\>
\<!--
删除用户 `--\>`传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
\<delete id="deleteUser" parameterType="java.lang.Integer"\>
delete from user where id = #{uid}
\</delete\>
\<!--
查询总记录条数

 --\>
\<select id="findTotal" resultType="int"\>
select count(*) from user;
\</select\>
\</mapper\>
5.1.4
**测试类**

/**
*
* \<p\>Title: MybastisCRUDTest\</p\>
* \<p\>Description:
测试 `mybatis` 的 `crud` 操作

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class MybastisCRUDTest {
private InputStream in ;
private SqlSessionFactory factory;
private IUserDao userDao;
@Test
public void testFindAll() {
List\<User\> users = userDao.findAll();
for(User user : users) {
System.out.println(user);
}
}
@Test
public void testFindOne() {
//6.
执行操作

User user = userDao.findById(56);
System.out.println(user);
}
@Test
public void testSaveUser() throws Exception {
User user = new User();
user.setUsername("mybatis dao user");
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
//6.
`执行操作`

int res = userDao.saveUser(user);
System.out.println(res);
System.out.println(user.getId());
}
@Test
public void testUpdateUser()throws Exception{
//1.
`根据 `id` 查询`

User user = userDao.findById(41);
//2.
`更新操作`

user.setAddress("
`北京市顺义区`
");
int res = userDao.updateUser(user);
System.out.println(res);
}
@Test
public void testDeleteUser() throws Exception {
//6.
`执行操作`

int res = userDao.deleteUser(56);
System.out.println(res);
}
@Test
public void testFindTotal() throws Exception {
//6.
`执行操作`

int res = userDao.findTotal();
System.out.println(res);
}
@Before//
`在测试方法执行之前执行`

public void init()throws Exception {
//1.
`读取配置文件`

in = Resources.getResourceAsStream("SqlMapConfig.xml");
//2.
`创建构建者对象`

SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
//3.
`创建 `SqlSession` 工厂对象`

factory = builder.build(in);
//4.
`创建 `Dao` 接口的实现类`

userDao = new UserDaoImpl(factory);
}
@After//
`在测试方法执行完成之后执行`

public void destroy() throws Exception{
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
//7.
释放资源

in.close();
}
}
```
