---
title: Mybatis 框架快速入门
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`Mybatis` **框架开发的准备**

**官网下载** `Mybatis` **框架**
从百度中“`mybatis download`”可以下载最新的 `Mybatis` 开发包。
进入选择语言的界面，进入中文版本的开发文档。
下载相关的

`jar`

包或 `maven` 开发的坐标。
下载的

`zip`

文件如下（ 我们的资料文件夹）：
我们所使用的

`Mybatis`

版本是 `3.4.5` 版本。

**搭建** `Mybatis` **开发环境**

![mybatis maven da Mybatis Sq IMapConi fg. xml Itser...](Exported%20image%2020260702225320-0.png)
![J21CserDao. xml IUserDao. java Mybatis Mapper ICse...](Exported%20image%2020260702225323-1.png)

**当我们遵从了第三、四、五点之后，我们在开发中就无须再写****dao****的实现类**

**创建** `maven` **工程**
创建

`mybatis01`

的工程，工程信息如下：

- Groupid:com.itheima
- ArtifactId:mybatis01
- Packing:jar

添加 `Mybatis3.4.5` 的坐标
在

`pom.xml`

文件中添加 `Mybatis3.4.5` 的坐标，如下：

\<dependencies\>
\<dependency\>
\<groupId\>org.mybatis\</groupId\>
\<artifactId\>mybatis\</artifactId\>
\<version\>3.4.5\</version\>
\</dependency\>
\<dependency\>
\<groupId\>junit\</groupId\>
\<artifactId\>junit\</artifactId\>
\<version\>4.10\</version\>
\<scope\>test\</scope\>
\</dependency\>
\<dependency\>
\<groupId\>mysql\</groupId\>
\<artifactId\>mysql-connector-java\</artifactId\>
\<version\>5.1.6\</version\>
\<scope\>runtime\</scope\>
\</dependency\>
\<dependency\>
\<groupId\>log4j\</groupId\>
\<artifactId\>log4j\</artifactId\>
\<version\>1.2.12\</version\>
\</dependency\>
\</dependencies\>
2.2.3
**编写** `User` **实体类**

/**
*
* \<p\>Title: User\</p\>
* \<p\>Description:
用户的实体类

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class User implements Serializable {
private Integer id;
private String username;
private Date birthday;
private String sex;
private String address;
￼

public Integer getId() {
return id;
}
public void setId(Integer id) {
this.id = id;
}
public String getUsername() {
return username;
}
public void setUsername(String username) {
this.username = username;
}
public Date getBirthday() {
return birthday;
}
public void setBirthday(Date birthday) {
this.birthday = birthday;
}
public String getSex() {
return sex;
}
public void setSex(String sex) {
this.sex = sex;
}
public String getAddress() {
return address;
}
public void setAddress(String address) {
this.address = address;
}
@Override
public String toString() {
return "User [id=" + id + ", username=" + username + ", birthday=" + birthday
+ ", sex=" + sex + ", address="
+ address + "]";
}
}
**编写持久层接口**

- IUserDao
- IUserDao

接口就是我们的持久层接口（也可以写成 `UserDao` 或者

`UserMapper`

）`,`具体代码如下：

/**
* \<p\>Title: IUserDao\</p\>
* \<p\>Description:
用户的持久层操作

\</p\>
*/
public interface IUserDao {
/**
*
查询所有用户

* @return
*/
List\<User\> findAll();
}
**编写持久层接口的映射文件** `IUserDao.xml`
**要求：**
**创建位置：**必须和持久层接口在相同的包中。
**名称：**必须以持久层接口名称命名文件名，扩展名是`.xml`

![xml](Exported%20image%2020260702225330-2.png)

\<?xml version="1.0" encoding="UTF-8"?\>
\<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>
\<mapper namespace="com.itheima.dao.IUserDao"\>
\<!--
配置查询所有操作

 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select * from user
\</select\>
\</mapper\>
**编写** `SqlMapConfig.xml` **配置文件**

\<?xml version="1.0" encoding="UTF-8"?\>
\<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd"\>
\<configuration\>
\<!--
配置 `mybatis` 的环境

- --\>
- \<environments default="mysql"\>
- \<!--

配置 `mysql` 的环境

- --\>
- \<environment id="mysql"\>
- \<!--

配置事务的类型

 --\>
\<transactionManager type="JDBC"\>\</transactionManager\>
\<!--
配置连接数据库的信息：用的是数据源`(`连接池

) --\>
\<dataSource type="POOLED"\>
\<property name="driver" value="com.mysql.jdbc.Driver"/\>
\<property name="url" value="jdbc:mysql://localhost:3306/ee50"/\>
\<property name="username" value="root"/\>
\<property name="password" value="1234"/\>
\</dataSource\>
\</environment\>
\</environments\>
\<!--
告知 `mybatis` 映射配置的位置

 --\>
\<mappers\>
\<mapper resource="com/itheima/dao/IUserDao.xml"/\>
\</mappers\>
\</configuration\>
**编写测试类**

/**
*
* \<p\>Title: MybatisTest\</p\>
* \<p\>Description:
测试 `mybatis` 的环境

\</p\>
*/
public class MybatisTest {
public static void main(String[] args)throws Exception {
//1.
读取配置文件

InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
//2.
创建 `SqlSessionFactory` 的构建者对象

SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
//3.
使用构建者创建工厂对象 `SqlSessionFactory`
// 使用了构建者模式，这个模式把对象的创建细节隐藏，
// 使使用者直接调用方法即可拿到对象

SqlSessionFactory factory = builder.build(in);
//4.
使用 `SqlSessionFactory` 生产 `SqlSession` 对象
// 工厂模式：优势在解耦（降低类之间的依赖关系）

SqlSession session = factory.openSession();
//5.
使用 `SqlSession` 创建 `dao` 接口的代理对象
// 创建Dao接口实现类使用了代理模式
// 优势：不修改源码的基础上对已有方法增强

IUserDao userDao = session.getMapper(IUserDao.class);
//6.
使用代理对象执行查询所有方法

List\<User\> users = userDao.findAll();
for(User user : users) {
System.out.println(user);
}
//7.
释放资源

session.close();
in.close();
}
}
**小结**
通过快速入门示例，我们发现使用 `mybatis` 是非常容易的一件事情，因为只需要编写 `Dao` 接口并且按照`mybatis` 要求编写两个配置文件，就可以实现功能。远比我们之前的 `jdbc` 方便多了。（我们使用注解之后，将变得更为简单，只需要编写一个 `mybatis` 配置文件就够了。）

但是，这里面包含了许多细节，比如为什么会有工厂对象（`SqlSessionFactory`）`,`为什么有了工厂之后还要有构建者对象（`SqlSessionFactoryBuilder`），为什么 `IUserDao.xml` 在创建时有位置和文件名的要求等等。
这些问题我们在自定义

`mybatis`

框架的章节，通过层层剥离的方式，给大家讲解。
请注意：我们讲解自定义 `Mybatis` 框架，不是让大家回去自己去写个 `mybatis`，而是让我们能更好了了解`mybatis` 内部是怎么执行的，在以后的开发中能更好的使用 `mybatis` 框架，同时对它的设计理念（设计模式）有一个认识。

**补充（基于注解的** `mybatis` **使用）**

**在持久层接口中添加注解**

/**
*
* \<p\>Title: IUserDao\</p\>
* \<p\>Description:
用户的持久层操作

\</p\>
*/
public interface IUserDao {
/**
*
查询所有用户

* @return
*/
@Select("select * from user")
List\<User\> findAll();
}
**修改**

- SqlMapConfig.xml
- \<!--

告知 `mybatis` 映射配置的位置

- --\>
- \<mappers\>
- \<mapper class="com.itheima.dao.IUserDao"/\>
- \</mappers\>

**注意事项：**
在使用基于注解的

`Mybatis`

配置时，请移除 `xml` 的映射配置（`IUserDao.xml`）。

使用实现类操作数据

![gauthor Company hCCz www.iChiema.com public class ...](Exported%20image%2020260702225331-3.png)
![gauthor Company www.iChiema.com public class MybaC...](Exported%20image%2020260702225337-4.png)
