---
title: Mybatis 的参数深入
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`3.1 parameterType` **配置参数**

`3.1.1`

**使用说明**
我们在上一章节中已经介绍了 `SQL` 语句传参，使用标签的 `parameterType` 属性来设定。该属性的取值可以
是基本类型，引用类型（例如`:String` 类型），还可以是实体类类型（`POJO` 类）。同时也可以使用实体类的包装
类，本章节将介绍如何使用实体类的包装类作为参数传递。传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
3.1.2
**注意事项**
基 本 类 型 和 `String` 我 们 可 以 直 接 写 类 型 名 称 ， 也 可 以 使 用 包 名 `.` 类 名 的 方 式 ， 例 如 ：

java.lang.String
。
实体类类型，目前我们只能使用全限定类名。
究其原因，是 `mybaits` 在加载时已经把常用的数据类型注册了别名，从而我们在使用时可以不写包名，
而我们的是实体类并没有注册别名，所以必须写全限定类名。在今天课程的最后一个章节中将讲解如何注册实体类
的别名。
在 `mybatis` 的官方文档的说明`(`第 `19` 页`)`
这些都是支持的默认别名。我们也可以从源码角度来看它们分别都是如何定义出来的。
可以参考 `TypeAliasRegistery.class` 的源码。传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
3.2
**传递** `pojo` **包装对象**
开发中通过 `pojo` 传递查询条件 ，查询条件是综合的查询条件，不仅包括用户查询条件还包括其它的查
询条件（比如将用户购买商品信息也作为查询条件），这时可以使用包装对象传递输入参数。

`Pojo`

类中包含 `pojo`。
需求：根据用户名查询用户信息，查询条件放到 `QueryVo` 的 `user` 属性中。

`3.2.1`

**编写**

 QueryVo
/**
*
* \<p\>Title: QueryVo\</p\>
* \<p\>Description:
查询条件对象

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class QueryVo implements Serializable {
private User user;
public User getUser() {
return user;
}
public void setUser(User user) {
this.user = user;
}
}
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
3.2.2
`**编写持久层接口**`

/**
*
* \<p\>Title: IUserDao\</p\>
* \<p\>Description:
`用户的业务层接口`
\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public interface IUserDao {
/**
*
`根据 `QueryVo` 中的条件查询用户`

* @param vo
* @return
*/
List\<User\> findByVo(QueryVo vo);
}
3.2.3
`**持久层接口的映射文件**`

\<!--
`根据用户名称模糊查询，参数变成一个 `QueryVo` 对象了`
 --\>
\<select id="findByVo" resultType="com.itheima.domain.User"
parameterType="com.itheima.domain.QueryVo"\>
select * from user where username like #{user.username};
\</select\>
3.2.4
`**测试包装类作为参数**`

@Test
public void testFindByQueryVo() {
QueryVo vo = new QueryVo();
User user = new User();
user.setUserName("%
`王`
%");
vo.setUser(user);
List\<User\> users = userDao.findByVo(vo);
for(User u : users) {
System.out.println(u);
}
}
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
`
