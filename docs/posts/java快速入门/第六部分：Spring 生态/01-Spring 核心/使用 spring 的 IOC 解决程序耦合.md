---
title: 使用 spring 的 IOC 解决程序耦合
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
本章我们使用的案例是，账户的业务层和持久层的依赖关系解决。

在开始 `spring` 的配置之前，我们要先准备一下环境。由于我们是使用 `spring` 解决依赖关系，并不是真正的要做增删改查操作，所以此时我们没必要写实体类。并且我们在此处使用的是 `java` 工程，不是`java web` 工程。

**准备** `spring` **的开发包**
官网：`http://spring.io/`
下载地址：

http://repo.springsource.org/libs-release-local/org/springframework/spring
 解压`:(Spring` 目录结构

- :)
- * docs :API

和开发规范

- .
- * libs :jar

包和源码

- .
- * schema :

约束`.`
**我们上课使用的版本是** `spring5.0.2`**。**
**特别说明：**

`spring5`

**版本是用** `jdk8` **编写的，所以要求我们的** `jdk` **版本是** `8` **及以上。**
**同时** `tomcat` **的版本要求** `8.5` **及以上。**

**创建业务层接口和实现类**

/**
*
账户的业务层接口

*/
public interface IAccountService {
/**
*
保存账户（此处只是模拟，并不是真的要保存）

*/
void saveAccount();
}
/**
*
账户的业务层实现类

*/
public class AccountServiceImpl implements IAccountService {
//
**此处的依赖关系有待解决**

private IAccountDao accountDao = new AccountDaoImpl();

public void saveAccount() {
accountDao.saveAccount();
}
}￼
/**
*
账户的持久层接口

*/
public interface IAccountDao {
/**
*
保存账户

*/
void saveAccount();
}

/**
*
账户的持久层实现类

*/
public class AccountDaoImpl implements IAccountDao {

public void saveAccount() {
System.out.println("
保存了账户

");
}
}
**基于** `XML` **的配置（入门案例）**`[`**掌握**`]`
**第一步：拷贝必备的** `jar` **包到工程的** `lib` **目录中**
**第二步：在类的根路径下创建一个任意名称的** `xml` **文件（不能是中文）**
**给配置文件导入约束：**

/spring-framework-5.0.2.RELEASE/docs/spring-framework-reference/html5/core.html
\<?xml version="1.0" encoding="UTF-8"?\>
\<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd"\>
\</beans\>
 **第三步：让** `spring` **管理资源，在配置文件中配置** `service` **和**

- dao
- bean

标签：用于配置让 `spring` 创建对象，并且存入 `ioc` 容器之中
`id` 属性：对象的唯一标识。

`class`

属性：指定要创建对象的全限定类名

`\<!--` 配置

 service --\>
\<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"\>
\</bean\>
\<!--
配置

 dao --\>
\<bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl"\>\</bean\>
**测试配置是否成功**

/**
*
模拟一个表现层

*/
public class Client {
/**
*
使用 `main` 方法获取容器测试执行￼

*/
public static void main(String[] args) {
//1.
使用 `ApplicationContext` 接口，就是在获取 `spring` 容器

ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml");
//2.
根据 `bean` 的 `id` 获取对象

IAccountService aService = (IAccountService) ac.getBean("accountService");
System.out.println(aService);
IAccountDao aDao = (IAccountDao) ac.getBean("accountDao");
System.out.println(aDao);
}
}

`3.3Spring` **基于** `XML` **的** `IOC` **细节**`[`**掌握**

- ]
- spring

**中工厂的类结构图**

![Type hierarchy of ore. springfruevork. beans. fact...](Exported%20image%2020260702230109-0.png)
![00 a 1 6 1X0 0 u00u0 040 u00 q ! 2 09 0 2 q 0 ag 0...](Exported%20image%2020260702230112-1.png)

`BeanFactory` **和** `ApplicationContext` **的区别**

- `BeanFactory` 才是 `Spring` 容器中的顶层接口。
- `ApplicationContext` 是它的子接口。
- 创建对象的时间点不一样。
- `ApplicationContext`：只要一读取配置文件，默认情况下就会创建对象。
- `BeanFactory`：什么使用什么时候创建对象。

`ApplicationContext` **接口的实现类**

- `ClassPathXmlApplicationContext`**：** 它是从类的根路径下加载配置文件 推荐使用这种
- `FileSystemXmlApplicationContext`**：**它是从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置。
- `AnnotationConfigApplicationContext:` 当我们使用注解配置容器对象时，需要使用此类来创建 `spring` 容器。它用来读取注解。

`IOC` **中** `bean` **标签和管理对象细节**
`bean` **标签**
**作用：**
用于配置对象让 `spring` 来创建的。
默认情况下它调用的是类中的无参构造函数。如果没有无参构造函数则不能创建成功。
**属性：**

`id`

：给对象在容器中提供一个唯一标识。用于获取对象。

`class`

：指定类的全限定类名。用于反射创建对象。默认情况下调用无参构造函数。

`scope`

：指定对象的作用范围。

`* singleton :`

默认值，单例的

- .
- * prototype :

多例的

- .
- * request :WEB

项目中`,Spring` 创建一个 `Bean` 的对象`,`将对象存入到 `request` 域中

- .
- * session :WEB

项目中`,Spring` 创建一个 `Bean` 的对象`,`将对象存入到 `session` 域中

- .
- * global session :WEB

项目中`,`应用在 `Portlet` 环境`.`如果没有

`Portlet`

环境那么

`globalSession`

相当于 `session.`

`init-method`：指定类中的初始化方法名称。

`destroy-method`

：指定类中销毁方法名称。

`bean` **的作用范围和生命周期**
单例对象：`scope="singleton"`
一个应用只有一个对象的实例。它的作用范围就是整个引用。
生命周期：
对象出生：当应用加载，创建容器时，对象就被创建了。
对象活着：只要容器在，对象一直活着。
对象死亡：当应用卸载，销毁容器时，对象就被销毁了。
多例对象：`scope="prototype"`
每次访问对象时，都会重新创建对象实例。
生命周期：
对象出生：当使用对象时，创建新的对象实例。
对象活着：只要对象在使用中，就一直活着。
对象死亡：当对象长时间不用时，被 `java` 的垃圾回收器回收了。

**实例化** `Bean` **的三种方式**
**第一种方式：使用默认无参构造函数**

`\<!--`

在默认情况下：
它会根据默认无参构造函数来创建类对象。如果 `bean` 中没有默认无参构造函数，将会创建失败。￼

--\>
\<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"/\>
**第二种方式：**`spring` **管理静态工厂**`-`**使用静态工厂的方法创建对象**

/**
*
模拟一个静态工厂，创建业务层实现类

*/
public class StaticFactory {
public static IAccountService createAccountService(){
return new AccountServiceImpl();
}
}
\<!--
此种方式是`:`
使用 `StaticFactory` 类中的静态方法 `createAccountService` 创建对象，并存入 `spring` 容器

`id`

属性：指定 `bean` 的 `id`，用于从容器中获取

`class`

属性：指定静态工厂的全限定类名

`factory-method`

属性：指定生产对象的静态方法

- --\>
- \<bean id="accountService"
- class="com.itheima.factory.StaticFactory"
- factory-method="createAccountService"\>\</bean\>

**第三种方式：**`spring` **管理实例工厂**`-`**使用实例工厂的方法创建对象**

/**
*
模拟一个实例工厂，创建业务层实现类

`*`

此工厂创建对象，必须现有工厂实例对象，再调用方法

*/
public class InstanceFactory {
public IAccountService createAccountService(){
return new AccountServiceImpl();
}
}
\<!--
此种方式是：
先把工厂的创建交给 `spring` 来管理。
然后在使用工厂的 `bean` 来调用里面的方法

`factory-bean`

属性：用于指定实例工厂 `bean` 的 `id`。

`factory-method`

属性：用于指定实例工厂中创建对象的方法。

--\>
\<bean id="instancFactory" class="com.itheima.factory.InstanceFactory"\>\</bean\>
\<bean id="accountService"
factory-bean="instancFactory"
factory-method="createAccountService"\>\</bean\>
￼
**依赖注入的概念**
依赖注入：`Dependency Injection`。它是 `spring` 框架核心 `ioc` 的具体实现。
我们的程序在编写时，通过控制反转，把对象的创建交给了 `spring`，但是代码中不可能出现没有依赖的情况。

`ioc`

解耦只是降低他们的依赖关系，但不会消除。例如：我们的业务层仍会调用持久层的方法。
那这种业务层和持久层的依赖关系，在使用 `spring` 之后，就让 `spring` 来维护了。
简单的说，就是坐等框架把持久层对象传入业务层，而不用我们自己去获取。

**构造函数注入**
顾名思义，就是使用类中的构造函数，给成员变量赋值。注意，赋值的操作不是我们自己做的，而是通过配置的方式，让 `spring` 框架来为我们注入。具体代码如下：

/**
*/
public class AccountServiceImpl implements IAccountService {
private String name;
private Integer age;
private Date birthday;
public AccountServiceImpl(String name, Integer age, Date birthday) {
this.name = name;
this.age = age;
this.birthday = birthday;
}

@Override
public void saveAccount() {
System.out.println(name+","+age+","+birthday);
}
}
 使用构造函数的方式，给 `service` 中的属性传值
要求：
类中需要提供一个对应参数列表的构造函数。
涉及的标签：

`constructor-arg`
 属性：

`index:`

指定参数在构造函数参数列表的索引位置

`type:`

指定参数在构造函数中的数据类型￼

`name:`

指定参数在构造函数中的名称 用这个找给谁赋值
`=======`上面三个都是找给谁赋值，下面两个指的是赋什么值的

- ==============
- value:

它能赋的值是基本数据类型和 `String` 类型

`ref:`

它能赋的值是其他 `bean` 类型，也就是说，必须得是在配置文件中配置过的

 bean
--\>
\<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"\>
\<constructor-arg name="name" value="
_张三_

"\>\</constructor-arg\>
\<constructor-arg name="age" value="18"\>\</constructor-arg\>
\<constructor-arg name="birthday" ref="now"\>\</constructor-arg\>
\</bean\>
\<bean id="now" class="java.util.Date"\>\</bean\>

`set` **方法注入**
顾名思义，就是在类中提供需要注入成员的 `set` 方法。具体代码如下：

/** */
public class AccountServiceImpl implements IAccountService {
private String name;
private Integer age;
private Date birthday;
public void setName(String name) {
this.name = name;
}
public void setAge(Integer age) {
this.age = age;
}
public void setBirthday(Date birthday) {
this.birthday = birthday;
}
@Override
public void saveAccount() {
System.out.println(name+","+age+","+birthday);
}
}
\<!--
通过配置文件给 `bean` 中的属性传值：使用 `set` 方法的方式
涉及的标签：

`property`
 **属性：**

`name`

：找的是类中 `set` 方法后面的部分

`ref`

：给属性赋值是其他 `bean` 类型的

`value`

：给属性赋值是基本数据类型和 `string` 类型的
实际开发中，此种方式用的较多。

--\>
\<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"\>
\<property name="name" value="test"\>\</property\>
\<property name="age" value="21"\>\</property\>
\<property name="birthday" ref="now"\>\</property\>
\</bean\>
\<bean id="now" class="java.util.Date"\>\</bean\>
**使用** `p` **名称空间注入数据（本质还是调用** `set` **方法）**
此种方式是通过在 `xml` 中导入 `p` 名称空间，使用 `p:propertyName` 来注入数据，它的本质仍然是调用类中的`set` 方法实现注入功能。
`Java` **类代码：**

/**
*
使用 `p` 名称空间注入，本质还是调用类中的 `set` 方法

*/
public class AccountServiceImpl4 implements IAccountService {
private String name;
private Integer age;
private Date birthday;
public void setName(String name) {
this.name = name;
}
public void setAge(Integer age) {
this.age = age;
}
public void setBirthday(Date birthday) {
this.birthday = birthday;
}
@Override
public void saveAccount() {
System.out.println(name+","+age+","+birthday);
}
}
 **配置文件代码：**

\<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:p="http://www.springframework.org/schema/p"
￼

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation=" http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd"\>
\<bean id="accountService"
class="com.itheima.service.impl.AccountServiceImpl4"
p:name="test" p:age="21" p:birthday-ref="now"/\>
\</beans\>
**注入集合属性**
顾名思义，就是给类中的集合成员传值，它用的也是`set`方法注入的方式，只不过变量的数据类型都是集合。我们这里介绍注入数组，`List,Set,Map,Properties`。具体代码如下：

/***/
public class AccountServiceImpl implements IAccountService {
private String[] myStrs;
private List\<String\> myList;
private Set\<String\> mySet;
private Map\<String,String\> myMap;
private Properties myProps;
public void setMyStrs(String[] myStrs) {
this.myStrs = myStrs;
}
public void setMyList(List\<String\> myList) {
this.myList = myList;
}
public void setMySet(Set\<String\> mySet) {
this.mySet = mySet;
}
public void setMyMap(Map\<String, String\> myMap) {
this.myMap = myMap;
}
public void setMyProps(Properties myProps) {
this.myProps = myProps;
}
@Override
public void saveAccount() {
System.out.println(Arrays.toString(myStrs));
System.out.println(myList);
System.out.println(mySet);
System.out.println(myMap);
}
}
\<!--
注入集合数据

`List`

结构的：

- array,list,set
- Map

结构的

map,entry,props,prop
--\>
\<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"\>
\<!--
在注入集合数据时，只要结构相同，标签可以互换

- --\>
- \<!--

给数组注入数据

 --\>
\<property name="myStrs"\>
\<set\>
\<value\>AAA\</value\>
\<value\>BBB\</value\>
\<value\>CCC\</value\>
\</set\>
\</property\>
\<!--
注入 `list` 集合数据

 --\>
\<property name="myList"\>
\<array\>
\<value\>AAA\</value\>
\<value\>BBB\</value\>
\<value\>CCC\</value\>
\</array\>
\</property\>
\<!--
注入 `set` 集合数据

 --\>
\<property name="mySet"\>
\<list\>
\<value\>AAA\</value\>
\<value\>BBB\</value\>
\<value\>CCC\</value\>
\</list\>
\</property\>
\<!--
注入 `Map` 数据

- --\>
- \<property name="myMap"\>
- \<props\>
- \<prop key="testA"\>aaa\</prop\>
- \<prop key="testB"\>bbb\</prop\>
- \</props\>
- \</property\>
- \<!--

注入 `properties` 数据

 --\>
\<map\>
\<entry key="testA" value="aaa"\>\</entry\>
\<entry key="testB"\>
\<value\>bbb\</value\>
\</entry\>
\</map\>
\</property\>
\</bean\>
```
