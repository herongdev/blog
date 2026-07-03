---
title: Mybatis 的输出结果封装
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`4.1 resultType` **配置结果类型**

`resultType`

属性可以指定结果集的类型，它支持基本类型和实体类类型。
我们在前面的 `CRUD` 案例中已经对此属性进行过应用了。
需要注意的是，它和 `parameterType` 一样，如果注册过类型别名的，可以直接使用别名。没有注册过的必须
使用全限定类名。例如：我们的实体类此时必须是全限定类名（今天最后一个章节会讲解如何配置实体类的别名）
同时，当是实体类名称是，还有一个要求，实体类中的属性名称必须和查询语句中的列名保持一致，否则无法
实现封装。

`4.1.1`

**基本类型示例**

`4.1.1.1 Dao`

**接口**

/**
*
查询总记录条数

* @return
*/
int findTotal();
4.1.1.2
**映射配置**

`\<!--`

查询总记录条数

 --\>
\<select id="findTotal" resultType="int"\>
select count(*) from user;
\</select\>
4.1.2
**实体类类型示例**

`4.1.2.1 Dao`

**接口**

/**
*
查询所有用户

* @return
*/
List\<User\> findAll();
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
4.1.2.2
`**映射配置**`

\<!--
`配置查询所有操作`
 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select * from user
\</select\>
4.1.3
`**特殊情况示例**`

4.1.3.1
- **修改实体类**
- 实体类代码如下：`(`**此时的实体类属性和数据库表的列名已经不一致了**

)
/**
*
* \<p\>Title: User\</p\>
* \<p\>Description:
`用户的实体类`
\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class User implements Serializable {
private Integer userId;
private String userName;
private Date userBirthday;
private String userSex;
private String userAddress;
public Integer getUserId() {
return userId;
}
public void setUserId(Integer userId) {
this.userId = userId;
}
public String getUserName() {
return userName;
}
public void setUserName(String userName) {
this.userName = userName;
}
public Date getUserBirthday() {
return userBirthday;
}
public void setUserBirthday(Date userBirthday) {
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
this.userBirthday = userBirthday;
}
public String getUserSex() {
return userSex;
}
public void setUserSex(String userSex) {
this.userSex = userSex;
}
public String getUserAddress() {
return userAddress;
}
public void setUserAddress(String userAddress) {
this.userAddress = userAddress;
}
@Override
public String toString() {
return "User [userId=" + userId + ", userName=" + userName + ", userBirthday="
+ userBirthday + ", userSex="
+ userSex + ", userAddress=" + userAddress + "]";
}
}
4.1.3.2 Dao
**接口**

/**
*
查询所有用户

* @return
*/
List\<User\> findAll();
4.1.3.3
**映射配置**

`\<!--`

配置查询所有操作

 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select * from user
\</select\>
4.1.3.4
**测试查询结果**

@Test
public void testFindAll() {
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
List\<User\> users = userDao.findAll();
for(User user : users) {
System.out.println(user);
}
}
- **为什么名称会有值呢？**
- **因为：**`mysql` **在** `windows` **系统中不区分大小写！**

4.1.3.5
- **修改映射配置**
- **使用别名查询**

\<!--
`配置查询所有操作`
 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select id as userId,username as userName,birthday as userBirthday,
sex as userSex,address as userAddress from user
\</select\>
- **运行结果：**
- **思考：**
- **如果我们的查询很多，都使用别名的话写起来岂不是很麻烦，有没有别的解决办法呢？**
- **请看下一小节。**

4.2 resultMap
`**结果类型**`

resultMap
标签可以建立查询的列名和实体类的属性名称不一致时建立对应关系。从而实现封装。
在 `select` 标签中使用 `resultMap` 属性指定引用即可。同时 `resultMap` 可以实现将查询结果映射为复杂类
型的 `pojo`，比如在查询结果映射对象中包括 `pojo` 和 `list` 实现一对一查询和一对多查询。

4.2.1
`**定义**`
 resultMap
\<!--
建立 `User` 实体和数据库表的对应关系传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
type
属性：指定实体类的全限定类名

`id`

属性：给定一个唯一标识，是给查询 `select` 标签引用用的。

--\>
\<resultMap type="com.itheima.domain.User" id="userMap"\>
\<id column="id" property="userId"/\>
\<result column="username" property="userName"/\>
\<result column="sex" property="userSex"/\>
\<result column="address" property="userAddress"/\>
\<result column="birthday" property="userBirthday"/\>
\</resultMap\>
id
标签：用于指定主键字段

`result`

标签：用于指定非主键字段

`column`

属性：用于指定数据库列名

`property`

属性：用于指定实体类属性名称

`4.2.2`

**映射配置**

`\<!--`

配置查询所有操作

- --\>
- \<select id="findAll" resultMap="userMap"\>
- select * from user
- \</select\>
- 4.2.3

**测试结果**

@Test
public void testFindAll() {
List\<User\> users = userDao.findAll();
for(User user : users) {
System.out.println(user);
}
}
 **运行结果：**传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
`
