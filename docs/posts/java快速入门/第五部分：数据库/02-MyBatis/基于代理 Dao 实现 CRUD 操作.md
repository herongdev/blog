---
title: 基于代理 Dao 实现 CRUD 操作
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`mybatis` **环境搭建步骤**
第一步：创建 `maven` 工程
第二步：导入坐标
第三步：编写必要代码（实体类和持久层接口）
第四步：编写 `SqlMapConfig.xml`
第五步：编写映射配置文件
第六步：编写测试类

**使用要求：**
`1`、持久层接口和持久层接口的映射配置必须在相同的包下
`2`、持久层映射配置中 `mapper` 标签的 `namespace` 属性取值必须是持久层接口的全限定类名
`3`、`SQL` 语句的配置标签`\<select\>,\<insert\>,\<delete\>,\<update\>`的 `id` 属性必须和持久层接口的
方法名相同。

**根据** `ID` **查询**
`1` **在持久层接口中添加** `findById` **方法**

/**
*
根据 `id` 查询

* @param userId
* @return
*/
User findById(Integer userId);

`2` **在用户的映射配置文件中配置**
`\<!--` 根据 `id` 查询

 --\>
\<select id="findById" resultType="com.itheima.domain.User" parameterType="int"\>
select * from user where id = #{uid}
\</select\>
 **细节：**
`resultType` **属性：**用于指定结果集的类型。
`parameterType` **属性**：用于指定传入参数的类型。
`sql` **语句中使用**`#{}`**字符：**它代表占位符，相当于原来 `jdbc` 部分所学的`?`，都是用于执行语句时替换实际的数据。具体的数据是由`#{}`里面的内容决定的。
`#{}`**中内容的写法：**由于数据类型是基本类型，所以此处可以随意写。

`3` **在测试类添加测试**

public class MybastisCRUDTest {
private InputStream in ;
private SqlSessionFactory factory;
private SqlSession session;
private IUserDao userDao;
@Test
public void testFindOne() {
//6.
执行操作

User user = userDao.findById(41);
System.out.println(user);
}
@Before//
在测试方法执行之前执行

public void init()throws Exception {
//1.
读取配置文件

in = Resources.getResourceAsStream("SqlMapConfig.xml");
//2.
创建构建者对象

SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
//3.
创建 `SqlSession` 工厂对象

factory = builder.build(in);
//4.
创建 `SqlSession` 对象

session = factory.openSession();
//5.
创建 `Dao` 的代理对象

userDao = session.getMapper(IUserDao.class);
}
@After//
在测试方法执行完成之后执行

public void destroy() throws Exception{
session.commit();
//7.
释放资源

session.close();
in.close();
}
}

`2.2` **保存操作**
`2.2.1` **在持久层接口中添加新增方法**

/**
*
保存用户

* @param user
* @return
影响数据库记录的行数

*/
int saveUser(User user);
2.2.2
**在用户的映射配置文件中配置**
`\<!--` 保存用户

--\>
\<insert id="saveUser" parameterType="com.itheima.domain.User"\>
insert into user(username,birthday,sex,address)
values(#{username},#{birthday},#{sex},#{address})
\</insert\>
 **细节：**
`parameterType` 属性：
代表参数的类型，因为我们要传入的是一个类的对象，所以类型就写类的全名称。
`sql` 语句中使用`#{}`字符：
它代表占位符，相当于原来 `jdbc` 部分所学的`?`，都是用于执行语句时替换实际的数据。
具体的数据是由`#{}`里面的内容决定的。
`#{}`中内容的写法：
由于我们保存方法的参数是 一个 `User` 对象，此处要写 `User` 对象中的属性名称。
它用的是 `ognl` 表达式。
`ognl` 表达式：
它是 `apache` 提供的一种表达式语言，全称是：
`Object Graphic Navigation Language` 对象图导航语言
它是按照一定的语法格式来获取数据的。
语法格式就是使用 `#{`对象`.`对象`}`的方式传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
#{user.username}
它会先去找 `user` 对象，然后在 `user` 对象中找到 `username` 属性，并调用
`getUsername()`方法把值取出来。但是我们在 `parameterType` 属性上指定了实体类名称，所以可以省略 `user.`
而直接写 `username`。
`2.2.3` **添加测试类中的测试方法**

@Test
public void testSave(){
User user = new User();
user.setUsername("modify User property");
user.setAddress("
`北京市顺义区`
");
user.setSex("
`男`
");
user.setBirthday(new Date());
System.out.println("
`保存操作之前：`
"+user);
//5.
`执行保存方法`
userDao.saveUser(user);
System.out.println("
`保存操作之后：`
"+user);
}
 打开 `Mysql` 数据库发现并没有添加任何记录，原因是什么？
这一点和 `jdbc` 是一样的，我们在实现增删改时一定要去控制事务的提交，那么在 `mybatis` 中如何控制事务
提交呢？
可以使用`:session.commit();`来实现事务提交。加入事务提交后的代码如下：

@After//
`在测试方法执行完成之后执行`
public void destroy() throws Exception{
session.commit();
//7.
`释放资源`
session.close();
in.close();
}
2.2.4
**问题扩展：新增用户** `id` **的返回值**
新增用户后，同时还要返回当前新增用户的 `id` 值，因为 `id` 是由数据库的自动增长来实现的，所以就相
当于我们要在新增后将自动增长 `auto_increment` 的值返回。

\<insert id="saveUser" parameterType="USER"\>
\<!--
`**配置保存时获取插入的**`
 id --\>
\<selectKey keyColumn="id" keyProperty="id" resultType="int"\>
select last_insert_id();
\</selectKey\>
insert into user(username,birthday,sex,address)
values(#{username},#{birthday},#{sex},#{address})
\</insert\>
- 传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
- `
- `2.3` **用户更新**
- `2.3.1` **在持久层接口中添加更新方法**

/**
*
`更新用户`
* @param user
* @return
`影响数据库记录的行数`
*/
int updateUser(User user);
2.3.2
- **在用户的映射配置文件中配置**
- `\<!--` 更新用户

 --\>
\<update id="updateUser" parameterType="com.itheima.domain.User"\>
update user set username=#{username},birthday=#{birthday},sex=#{sex},
address=#{address} where id=#{id}
\</update\>
2.3.3
`**加入更新的测试方法**`
@Test
public void testUpdateUser()throws Exception{
//1.
`根据 `id` 查询`
User user = userDao.findById(52);
//2.
`更新操作`
user.setAddress("
`北京市顺义区`
");
int res = userDao.updateUser(user);
System.out.println(res);
}
- `2.4` **用户删除**
- `2.4.1` **在持久层接口中添加删除方法**

/**
*
`根据 `id` 删除用户`
* @param userId
* @return
*/
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
int deleteUser(Integer userId);
2.4.2
**在用户的映射配置文件中配置**
`\<!--` 删除用户

 --\>
\<delete id="deleteUser" parameterType="java.lang.Integer"\>
delete from user where id = #{uid}
\</delete\>
2.4.3
**加入删除的测试方法**

@Test
public void testDeleteUser() throws Exception {
//6.
执行操作

int res = userDao.deleteUser(52);
System.out.println(res);
}

`2.5` **用户模糊查询**
`2.5.1` **在持久层接口中添加模糊查询方法**

/**
*
根据名称模糊查询

* @param username
* @return
*/
List\<User\> findByName(String username);
2.5.2
**在用户的映射配置文件中配置**
`\<!--` 根据名称模糊查询

 --\>
\<select id="findByName" resultType="com.itheima.domain.User" parameterType="String"\>
select * from user where username like #{username}
\</select\>
2.5.3
**加入模糊查询的测试方法**

@Test
public void testFindByName(){
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
//5.
`执行查询一个方法`
List\<User\> users = userDao.findByName("%
`王`
%");
for(User user : users){
System.out.println(user);
}
}
 在控制台输出的执行 `SQL` 语句如下：
我们在配置文件中没有加入`%`来作为模糊查询的条件，所以在传入字符串实参时，就需要给定模糊查询的标
识`%`。配置文件中的`#{username}`也只是一个占位符，所以 `SQL` 语句显示为“？”。
`2.5.4` **模糊查询的另一种配置方式**
第一步：修改 `SQL` 语句的配置，配置如下：
`\<!--` 根据名称模糊查询

 --\>
\<select id="findByName" parameterType="string" resultType="com.itheima.domain.User"\>
select * from user where username like '%${value}%'
\</select\>
 我们在上面将原来的`#{}`占位符，改成了`${value}`。注意如果用模糊查询的这种写法，那么`${value}`的写
法就是固定的，不能写成其它名字。
第二步：测试，如下：

/**
*
`测试模糊查询操作`
*/
@Test
public void testFindByName(){
//5.
`执行查询一个方法`
List\<User\> users = userDao.findByName("
`王`
");
for(User user : users){
System.out.println(user);
}
}
 在控制台输出的执行 `SQL` 语句如下：
可以发现，我们在程序代码中就不需要加入模糊查询的匹配符`%`了，这两种方式的实现效果是一样的，但执行
的语句是不一样的。传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
2.5.5 #{}
**与**`${}`**的区别**
`#{}`**表示一个占位符号**
通过`#{}`可以实现 `preparedStatement` 向占位符中设置值，自动进行 `java` 类型和 `jdbc` 类型转换，
`#{}`可以有效防止 `sql` 注入。 `#{}`可以接收简单类型值或 `pojo` 属性值。 如果 `parameterType` 传输单个简单类
型值，`#{}`括号中可以是 `value` 或其它名称。
`${}`**表示拼接** `sql` **串**
通过`${}`可以将 `parameterType` 传入的内容拼接在 `sql` 中且不进行 `jdbc` 类型转换， `${}`可以接收简
单类型值或 `pojo` 属性值，如果 `parameterType` 传输单个简单类型值，`${}`括号中只能是 `value`。
`2.5.6` **模糊查询的**`${value}`**源码分析**
我们一起来看 `TextSqlNode` 类的源码：
这就说明了源码中指定了读取的 `key` 的名字就是”`value`”，所以我们在绑定参数时就只能叫 `value` 的名字
了。

`2.6` **查询使用聚合函数**
`2.6.1` **在持久层接口中添加模糊查询方法**

/**
*
查询总记录条数

* @return
*/
int findTotal();
2.6.2
**在用户的映射配置文件中配置**
`\<!--` 查询总记录条数

 --\>
\<select id="findTotal" resultType="int"\>
select count(*) from user;
传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训
\</select\>
2.6.3
`**加入聚合查询的测试方法**`
@Test
public void testFindTotal() throws Exception {
//6.
`执行操作`
int res = userDao.findTotal();
System.out.println(res);
}

`2.7 Mybatis` **与** `JDBC` **编程的比较**
`1.`数据库链接创建、释放频繁造成系统资源浪费从而影响系统性能，如果使用数据库链接池可解决此问题。
解决：
在 `SqlMapConfig.xml` 中配置数据链接池，使用连接池管理数据库链接。
`2.Sql` 语句写在代码中造成代码不易维护，实际应用 `sql` 变化的可能较大，`sql` 变动需要改变 `java` 代码。
解决：
将 `Sql` 语句配置在 `XXXXmapper.xml` 文件中与 `java` 代码分离。
`3.`向 `sql` 语句传参数麻烦，因为 `sql` 语句的 `where` 条件不一定，可能多也可能少，占位符需要和参数对应。
解决：
`Mybatis` 自动将 `java` 对象映射至 `sql` 语句，通过 `statement` 中的 `parameterType` 定义输入参数的
类型。
`4.`对结果集解析麻烦，`sql` 变化导致解析代码变化，且解析前需要遍历，如果能将数据库记录封装成 `pojo` 对
象解析比较方便。
解决：
`Mybatis` 自动将 `sql` 执行结果映射至 `java` 对象，通过 `statement` 中的 `resultType` 定义输出结果的
类型。
