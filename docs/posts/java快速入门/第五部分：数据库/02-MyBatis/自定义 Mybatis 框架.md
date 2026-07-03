---
title: 自定义 Mybatis 框架
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
**知识点：**

- （`Factory` 工厂模式）
- 构造者模式（`Builder` 模式）
- 代理模式
- 反射
- 自定义注解
- 注解的反射
- xml 解析数据库元数据
- 元数据的反射等。
**分析流程**

![, AyCistCr](Exported%20image%2020260702225344-0.png)

**前期准备**

**创建** `Maven` **工程**
创建

`mybatis02`

的工程，工程信息如下：

- Groupid:com.itheima
- ArtifactId:mybatis02
- Packing:jar

![day01_eesy_04mybatis_design com.itheima O IUserDao...](Exported%20image%2020260702225348-1.png)

**引入相关坐标**

- \<dependencies\>
- \<!--

日志坐标

- --\>
- \<dependency\>
- \<groupId\>log4j\</groupId\>
- \<artifactId\>log4j\</artifactId\>
- \<version\>1.2.12\</version\>
- \</dependency\>
- \<!--

解析 `xml` 的

- dom4j --\>
- \<dependency\>
- \<groupId\>dom4j\</groupId\>
- \<artifactId\>dom4j\</artifactId\>
- \<version\>1.6.1\</version\>
- \</dependency\>
- \<!-- mysql

驱动

- --\>
- \<dependency\>
- \<groupId\>mysql\</groupId\>
- \<artifactId\>mysql-connector-java\</artifactId\>
- \<version\>5.1.6\</version\>
- \</dependency\>
- \<!-- dom4j

的依赖包

 jaxen --\>
\<dependency\>
\<groupId\>jaxen\</groupId\>
\<artifactId\>jaxen\</artifactId\>
\<version\>1.1.6\</version\>
\</dependency\>
\<dependency\>
\<groupId\>junit\</groupId\>
\<artifactId\>junit\</artifactId\>
\<version\>4.10\</version\>
\</dependency\>
\</dependencies\>
**引入工具类到项目中**

![public class Configuration private private private...](Exported%20image%2020260702225351-2.png)
![gauthor httpwww.ithiema.com public class mapper pr...](Exported%20image%2020260702225353-3.png)

/**
*
用于解析配置文件

*/
public class XMLConfigBuilder {
/**
*
解析主配置文件，把里面的内容填充到 `DefaultSqlSession` 所需要的地方

`*`

使用的技术：

dom4j+xpath
* @param session
*/
public static void loadConfiguration(DefaultSqlSession session,InputStream
config){
try{
//
定义封装连接信息的配置对象（`mybatis` 的配置对象）

Configuration cfg = new Configuration();
//1.
获取 `SAXReader` 对象

SAXReader reader = new SAXReader();
//2.
根据字节输入流获取 `Document` 对象

Document document = reader.read(config);
￼

Element root = document.getRootElement();
//4.
使用 `xpath` 中选择指定节点的方式，获取所有 `property` 节点

List\<Element\> propertyElements = root.selectNodes("//property");
//5.
遍历节点

for(Element propertyElement : propertyElements){
//
判断节点是连接数据库的哪部分信息

//
取出 `name` 属性的值

String name = propertyElement.attributeValue("name");
if("driver".equals(name)){
//
表示驱动

//
获取 `property` 标签 `value` 属性的值

String driver = propertyElement.attributeValue("value");
cfg.setDriver(driver);
}
if("url".equals(name)){
//
表示连接字符串

//
获取 `property` 标签 `value` 属性的值

String url = propertyElement.attributeValue("value");
cfg.setUrl(url);
}
if("username".equals(name)){
//
表示用户名

//
获取 `property` 标签 `value` 属性的值

String username = propertyElement.attributeValue("value");
cfg.setUsername(username);
}
if("password".equals(name)){
//
表示密码

//
获取 `property` 标签 `value` 属性的值

String password = propertyElement.attributeValue("value");
cfg.setPassword(password);
}
}
//
取出 `mappers` 中的所有 `mapper` 标签，判断他们使用了 `resource` 还是 `class` 属性

List\<Element\> mapperElements = root.selectNodes("//mappers/mapper");
//
遍历集合

for(Element mapperElement : mapperElements){
//
判断 `mapperElement` 使用的是哪个属性

Attribute attribute = mapperElement.attribute("resource");
if(attribute != null){
System.out.println("
使用的是

 XML");
//
表示有 `resource` 属性，用的是

 XML
//
取出属性的值

String mapperPath = attribute.getValue();//
获 取 属 性 的 值

"com/itheima/dao/IUserDao.xml"
//
把映射配置文件的内容获取出来，封装成一个

 map
Map\<String,Mapper\> mappers = loadMapperConfiguration(mapperPath);
//
给 `configuration` 中的 `mappers` 赋值

cfg.setMappers(mappers);
}else{
System.out.println("
使用的是注解

");
//
表示没有 `resource` 属性，用的是注解

//
获取 `class` 属性的值

String daoClassPath = mapperElement.attributeValue("class");
//
根据 `daoClassPath` 获取封装的必要信息

Map\<String,Mapper\> mappers = loadMapperAnnotation(daoClassPath);
//
给 `configuration` 中的 `mappers` 赋值

cfg.setMappers(mappers);
}
}
//
把配置对象传递给

 DefaultSqlSession
session.setCfg(cfg);
}catch(Exception e){
throw new RuntimeException(e);
}finally{
try {
config.close();
}catch(Exception e){
e.printStackTrace();
}
}
}
![ffUHAFJU, mapperpath return valuemapperXtq, privat...](Exported%20image%2020260702225355-4.png)
![param daoCLasspath e tur private static mapString,...](Exported%20image%2020260702225358-5.png)

}

/**
*
负责执行 `SQL` 语句，并且封装结果集

*/
public class Executor {
public \<E\> List\<E\> selectList(Mapper mapper, Connection conn) {
PreparedStatement pstm = null;
ResultSet rs = null;
try {
//1.
取出 `mapper` 中的数据

String queryString = mapper.getQueryString();//select * from user
String resultType = mapper.getResultType();//com.itheima.domain.User
Class domainClass = Class.forName(resultType);//User.class
//2.
获取 `PreparedStatement` 对象

pstm = conn.prepareStatement(queryString);
//3.
执行 `SQL` 语句，获取结果集

rs = pstm.executeQuery();
//4.
封装结果集

List\<E\> list = new ArrayList\<E\>();//
定义返回值

while(rs.next()) {
//
实例化要封装的实体类对象

E obj = (E)domainClass.newInstance();//User
对象

//
取出结果集的元信息：

ResultSetMetaData
ResultSetMetaData rsmd = rs.getMetaData();
//
取出总列数

int columnCount = rsmd.getColumnCount();
//
遍历总列数

for (int i = 1; i \<= columnCount; i++) {
//
获取每列的名称，列名的序号是从 `1` 开始的

String columnName = rsmd.getColumnName(i);
//
根据得到列名，获取每列的值

Object columnValue = rs.getObject(columnName);
//
给 `obj` 赋值：使用 `Java` 内省机制（借助 `PropertyDescriptor` 实现属性的封装）

PropertyDescriptor pd = new
PropertyDescriptor(columnName,domainClass);//
要求：实体类的属性和数据库表的列名保持一种

//
获取它的写入方法

Method writeMethod = pd.getWriteMethod();//setUsername(String
username);
//
把获取的列的值，给对象赋值

writeMethod.invoke(obj,columnValue);
}
//
把赋好值的对象加入到集合中

list.add(obj);
}
return list;
} catch (Exception e) {
throw new RuntimeException(e);
} finally {
release(pstm,rs);
}
}

private void release(PreparedStatement pstm,ResultSet rs){
if(rs != null){
try {
rs.close();
}catch(Exception e){
e.printStackTrace();
}
}
if(pstm != null){
try {
pstm.close();
}catch(Exception e){
e.printStackTrace();
}
}
}
}

/**
*
用于创建数据源的工具类

\</p\>
*/
public class DataSourceUtil {
/**
*
获取连接

* @param cfg
* @return
*/
public static Connection getConnection(Configuration cfg) {
try {
Class.forName(cfg.getDriver());
Connection conn =
DriverManager.getConnection(cfg.getUrl(),cfg.getUsername() , cfg.getPassword());
return conn;
} catch (Exception e) {
throw new RuntimeException(e);
}
}
}
**编写**

- SqlMapConfig.xml
- \<?xmlversion="1.0"encoding="UTF-8"?\>
- \<!--mybatis

==的主配置文件==

- --\>
- \<configuration\>
- \<!--

==配置环境==

- --\>
- \<environmentsdefault="mysql"\>
- \<!--

==配置==`mysql`==的环境==

- --\>
- \<environmentid="mysql"\>
- \<!--

==配置事务的类型==

--\>
\<transactionManagertype="JDBC"\>\</transactionManager\>
\<!--
==配置数据源（连接池）==

- --\>
- \<dataSourcetype="POOLED"\>
- \<!--

==配置连接数据库的==`4`==个基本信息==

--\>
\<propertyname="driver"value="com.mysql.jdbc.Driver"/\>
\<propertyname="url"value="jdbc:mysql://localhost:3306/eesy_mybatis"/\>
\<propertyname="username"value="root"/\>
\<propertyname="password"value="1234"/\>
\</dataSource\>
\</environment\>
\</environments\>
\<!--
==指定映射配置文件的位置，映射配置文件指的是每个==`dao`==独立的配置文件==

--\>
\<mappers\>
\<!--\<mapperresource="com/itheima/dao/IUserDao.xml"/\>--\>
\<mapperclass="com.itheima.dao.IUserDao"/\>
\</mappers\>
\</configuration\>
**注意：**
此处我们直接使用的是 `mybatis` 的配置文件，但是由于我们没有使用 `mybatis` 的 `jar` 包，所以要把配置文件的约束删掉否则会报错（如果电脑能接入互联网，不删也行）￼
编写读取配置文件类

/**
*
_使用类加载器读取配置文件的类_

- */
- public

`class` `Resources`

{
/**
*
_根据传入的参数，获取一个字节输入流_

*@param

filePath
*@return
*/
public

`static` `InputStream` `getResourceAsStream(String`

filePath){
return

Resources.class.getClassLoader().getResourceAsStream(filePath);
}
}
**编写** `Mapper` **类**

/**
*
_用于封装执行的_`SQL`_语句和结果类型的全限定类名_

- */
- public

`class` `Mapper{`

`private` `String`

queryString;//SQL
private

`String`

resultType;//
_实体类的全限定类名_

`public` `String`

getQueryString(){
return

queryString;
}

`public` `void`

setQueryString(StringqueryString){
this.queryString=queryString;
}

`public` `String`

getResultType(){
return

resultType;
}

`public` `void`

setResultType(StringresultType){
this.resultType=resultType;
}
}
**编写** `Configuration` **配置类**

/**
*
_自定义_`mybatis`_的配置类_

- */
- public

`class` `Configuration`

{
private

`String`

driver;
private

`String`

url;
private

`String`

username;
private

`String`

password;

`private` `Map\<String,Mapper\>`

`mappers=new`

`HashMap\<String,Mapper\>();`

`public` `Map\<String,Mapper\>`

getMappers(){
return

mappers;
}

`public` `void`

setMappers(Map\<String,Mapper\>mappers){
this.mappers.putAll(mappers);//
_此处需要使用追加的方式_
`}`

`public` `String`

getDriver(){
return

driver;
}

`public` `void` `setDriver(String`

driver){
this.driver=driver;
}

`public` `String`

getUrl(){
return

url;
}

`public` `void` `setUrl(String`

url){
this.url=url;
}

`public` `String`

getUsername(){
returnusername;
}

`public` `void` `setUsername(String`

username){
this.username=username;
}

`public` `String`

getPassword(){
return

password;
}

`public` `void` `setPassword(String`

password){
this.password=password;
}
}
**编写** `User` **实体类**
`User` 实体类：

`public`

`class` `User` `implements` `Serializable{`

`private` `Integer`

id;
private

`String`

username;
private

`Date`

birthday;
private

`String`

sex;
private

`String`

address;

`public` `Integer`

getId(){
return

id;
}

`public` `void`

setId(Integerid){
this.id=id;
}

publicStringgetUsername(){
return

username;
}

`public` `void`

setUsername(Stringusername){
this.username=username;
}

`public` `Date`

getBirthday(){
return

birthday;
}

`public` `void`

setBirthday(Datebirthday){
this.birthday=birthday;
}

`public` `String`

getSex(){
return

sex;
}

`public` `void`

setSex(Stringsex){
this.sex=sex;
}

`public` `String`

getAddress(){
return

address;
}

`public` `void`

setAddress(Stringaddress){
this.address=address;
}

@Override
publicStringtoString(){
return

"User{"+
"id="+id+
",username='"+username+'\''+
",birthday="+birthday+
",sex='"+sex+'\''+
",address='"+address+'\''+
'}';
}
}
**基于** `XML` **的自定义** `mybatis` **框架**
**编写持久层接口和**

 IUserDao.xml
/**
*
* \<p\>Description:
用户的持久层操作

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
}
\<?xml version="1.0" encoding="UTF-8"?\>
\<mapper namespace="com.itheima.dao.IUserDao"\>
\<!--
配置查询所有操作

 --\>
\<select id="findAll" resultType="com.itheima.domain.User"\>
select * from user
\</select\>
\</mapper\>
 **注意：**
此处我们使用的也是

`mybatis`

的配置文件，所以也要把约束删除了

**编写构建者类**

/**
*
* \<p\>Title: SqlSessionFactoryBuilder\</p\>
* \<p\>Description:
用于构建 `SqlSessionFactory` 的

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class SqlSessionFactoryBuilder {
/**
*
根据传入的流，实现对 `SqlSessionFactory` 的创建

* @param in
它就是 `SqlMapConfig.xml` 的配置以及里面包含的 `IUserDao.xml` 的配置

* @return
*/
public SqlSessionFactory build(InputStream in) {
DefaultSqlSessionFactory factory = new DefaultSqlSessionFactory();
//
给 `factory` 中 `config` 赋值

factory.setConfig(in);
return factory;
}
}
编写 `SqlSessionFactory` 接口和实现类

/**
*
* \<p\>Title: SqlSessionFactory\</p\>
* \<p\>Description: SqlSessionFactory
的接口

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public interface SqlSessionFactory {
/**
*
创建一个新的 `SqlSession` 对象

* @return
*/
SqlSession openSession();
}
/**
*
* \<p\>Title: DefaultSqlSessionFactory\</p\>
* \<p\>Description:SqlSessionFactory
的默认实现

 \</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class DefaultSqlSessionFactory implements SqlSessionFactory {
private InputStream config = null;
public void setConfig(InputStream config) {
this.config = config;
}
@Override
public SqlSession openSession() {
DefaultSqlSession session = new DefaultSqlSession();
//
调用工具类解析 `xml` 文件

XMLConfigBuilder.loadConfiguration(session, config);
return session;
}
}
编写 SqlSession 接口和实现类

/**
*
* \<p\>Title: SqlSession\</p\>
* \<p\>Description:
操作数据库的核心对象

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public interface SqlSession {
/**
*
创建 `Dao` 接口的代理对象

* @param daoClass
* @return
*/
\<T\> T getMapper(Class\<T\> daoClass);
/**
*
释放资源

*/
void close();
}
/**
*
* \<p\>Title: DefaultSqlSession\</p\>
* \<p\>Description: SqlSession
的具体实现

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class DefaultSqlSession implements SqlSession {
//
核心配置对象

private Configuration cfg;
public void setCfg(Configuration cfg) {
this.cfg = cfg;
}
//
连接对象

private Connection conn;
//
调用 `DataSourceUtils` 工具类获取连接

public Connection getConn() {
￼

conn = DataSourceUtil.getDataSource(cfg).getConnection();
return conn;
} catch (Exception e) {
throw new RuntimeException(e);
}
}
/**
*
动态代理：

`*`

涉及的类：

- Proxy
- *

使用的方法：

- newProxyInstance
- *

方法的参数：

`* ClassLoader`

：和被代理对象使用相同的类加载器`,`通常都是固定的

`* Class[]`

：代理对象和被代理对象要求有相同的行为。（具有相同的方法）

`* InvocationHandler`

：如何代理。需要我们自己提供的增强部分的代码

*/
@Override
public \<T\> T getMapper(Class\<T\> daoClass) {
conn = getConn();
System.out.println(conn);
T daoProxy = (T) Proxy.newProxyInstance(daoClass.getClassLoader(),new
Class[] {daoClass}, new MapperProxyFactory(cfg.getMappers(),conn));
return daoProxy;
}
//
释放资源

@Override
public void close() {
try {
System.out.println(conn);
conn.close();
} catch (SQLException e) {
e.printStackTrace();
}
}
//
查询所有方法

public \<E\> List\<E\> selectList(String statement){
Mapper mapper = cfg.getMappers().get(statement);
return new Executor().selectList(mapper,conn);
}
}
￼

/**
*
* \<p\>Title: MapperProxyFactory\</p\>
* \<p\>Description:
用于创建代理对象是增强方法

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
public class MapperProxyFactory implements InvocationHandler {
private Map\<String,Mapper\> mappers;
private Connection conn;
public MapperProxyFactory(Map\<String, Mapper\> mappers,Connection conn) {
this.mappers = mappers;
this.conn = conn;
}
/**
*
对当前正在执行的方法进行增强

`*`

取出当前执行的方法名称

`*`

取出当前执行的方法所在类

`*`

拼接成

- key
- *

去 `Map` 中获取 `Value`（

- Mapper)
- *

使用工具类 `Executor` 的 `selectList` 方法

*/
@Override
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
{
//1.
取出方法名

String methodName = method.getName();
//2.
取出方法所在类名

String className = method.getDeclaringClass().getName();
//3.
拼接成

 Key
String key = className+"."+methodName;
//4.
使用 `key` 取出

 mapper
Mapper mapper = mappers.get(key);
if(mapper == null) {
throw new IllegalArgumentException("
传入的参数有误，无法获取执行的必要条件

");
}
//5.
创建 `Executor` 对象

Executor executor = new Executor();
￼

}
}
**运行测试类**

/**
*
* \<p\>Title: MybatisTest\</p\>
* \<p\>Description:
测试 `mybatis` 的环境

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
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
使用构建者创建工厂对象

 SqlSessionFactory
SqlSessionFactory factory = builder.build(in);
//4.
使用 `SqlSessionFactory` 生产 `SqlSession` 对象

SqlSession session = factory.openSession();
//5.
使用 `SqlSession` 创建 `dao` 接口的代理对象

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
**基于注解方式定义** `Mybatis` **框架**
**自定义**`@Select` **注解**

/***
* \<p\>Title: Select\</p\>
* \<p\>Description:
自定义查询注解

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
*/
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Select {
String value();
}
**修改持久层接口**

/**
*
* \<p\>Title: IUserDao\</p\>
* \<p\>Description:
用户的持久层操作

\</p\>
* \<p\>Company: http://www.itheima.com/ \</p\>
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
- \<?xml version="1.0" encoding="UTF-8"?\>
- \<configuration\>
- \<!--

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

- ) --\>
- \<dataSource type="POOLED"\>

￼

\<property name="url" value="jdbc:mysql://localhost:3306/ee50"/\>
\<property name="username" value="root"/\>
\<property name="password" value="1234"/\>
\</dataSource\>
\</environment\>
\</environments\>
\<!--
告知 `mybatis` 映射配置的位置

- --\>
- \<mappers\>
- \<mapper class="com.itheima.dao.IUserDao"/\>
- \</mappers\>
- \</configuration\>

**自定义** `Mybatis` **的设计模式说明**
**工厂模式（**`SqlSessionFactory`**）**
工厂模式是我们最常用的实例化对象模式了，是用工厂方法代替new操作的一种模式。工厂模式可能多做一些工作，但会给你系统 带来更大的可扩展性和尽量少的修改量。

工厂模式的原理如下图：

![O Fro duct function O int Product_A function O int...](Exported%20image%2020260702225402-6.png)

代理模式(MapperProxyFactory)
**组成：**
抽象角色：通过接口或抽象类声明真实角色实现的业务方法。
代理角色：实现抽象角色，是真实角色的代理，通过真实角色的业务逻辑方法来实现抽象方法，并可以附加自己的操作。
真实角色：实现抽象角色，定义真实角色所要实现的业务逻辑，供代理角色调用。
代理模式分为静态和动态代理。
静态代理，我们通常都很熟悉。有一个写好的代理类，实现与要代理的类的一个共同的接口，目的是为了约束也为了安全。具体不再多说。
这里主要想说的是关于动态代理。我们知道静态代理若想代理多个类，实现扩展功能，那么它必须具有多个代理类分别取代理不同的实现类。这样做的后果是造成太多的代码冗余。那么我们会思考如果做，才能既满足需求，又没有太多的冗余代码呢？——————动态代理。通过前面的课程我们已经学过了基于 `JDK` 的动态代理实现方式，今
天我们就会使用

`JDK`

动态代理方式来编写 `MapperProxyFactory` 类。
动态代理模型图：

![Cinterface dosomething void realSubject RealSubjec...](Exported%20image%2020260702225405-7.png)

**构建者模式**`(SqlSessionFactoryBuilder)`
其核心思想是将一个“复杂对象的构建算法”与它的“部件及组装方式”分离，使得构件算法和组装方式可以独立应对变化；利用同样的构建算法可以创建不同的表示，不同的构建过程可以利用相同的部件组装方式。

首先我们一起来学习构建者模式，通过百度百科如下：
具体设计模式的模型图如下：

![Drector0 P ct Product Abstr](Exported%20image%2020260702225406-8.png)

从图中我们可以看出，创建者模式由四部分组成。
**抽象创建者角色**：给出一个抽象接口，以规范产品对象的各个组成成分的建造。一般而言，此接口独立于应用程序的商业逻辑。模式中直接创建产品对象的是具体创建者角色。具体创建者必须实现这个接口的两种方法：一是建造方法，比如图中的 `buildPart1` 和 `buildPart2` 方法；另一种是结果返回方法，即图中的 `getProduct` 方法。一般来说，产品所包含的零件数目与建造方法的数目相符。换言之，有多少零件，就有多少相应的建造方法。
**具体创建者角色：**他们在应用程序中负责创建产品的实例。这个角色要完成的任务包括：

`1`

、实现抽象创建者所声明的抽象方法，给出一步一步的完成产品创建实例的操作。

`2`

、在创建完成后，提供产品的实例。
**导演者角色：**这个类调用具体创建者角色以创建产品对象。但是导演者并没有产品类的具体知识，真正拥有产品类的具体知识的是具体创建者角色。
**产品角色：**产品便是建造中的复杂对象。一般说来，一个系统中会有多于一个的产品类，而且这些产品类并不一定有共同的接口，而完全可以使不相关联的。

**小结**
通过自定义

`Mybatis`

框架的学习，我们将前面的基础知识很好的结合在一起，并且强化了我们的设计模式及
使用。希望大家能够抽时间多练习，这也是系统架构师的必由之路。
