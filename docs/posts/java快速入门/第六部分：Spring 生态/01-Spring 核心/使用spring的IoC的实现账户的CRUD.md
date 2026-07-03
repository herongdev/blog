---
title: 使用spring的IoC的实现账户的CRUD
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
```
实现账户的 CRUD 操作

**环境搭建**
**拷贝** **jar** **包**￼
create table account(
id int primary key auto_increment,
name varchar(40),
money float
)character set utf8 collate utf8_general_ci;
insert into account(name,money) values('aaa',1000);
insert into account(name,money) values('bbb',1000);
insert into account(name,money) values('ccc',1000);

/**
* 账户的实体类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public class** Account **implements** Serializable {
**private** Integer id;
**private** String name;
**private** Float money;
**public** Integer getId() {
**return** id;
}
**public void** setId(Integer id) {
**this**.id = id;
}
**public** String getName() {
**return** name;
}
**public void** setName(String name) {
**this**.name = name;
}
**public** Float getMoney() {
**return** money;
}
**public void** setMoney(Float money) {
**this**.money = money;
}
}￼
编写持久层代码
/**
* 账户的持久层接口
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public interface** IAccountDao {
/**
* 保存
* **@param** account
*/
**void** save(Account account);
/**
* 更新
* **@param** account
*/
**void** update(Account account);
/**
* 删除
* **@param** accountId
*/
**void** delete(Integer accountId);
/**
* 根据 id 查询
* **@param** accountId
* **@return**
*/
Account findById(Integer accountId);
/**
* 查询所有
* **@return**
*/
List\<Account\> findAll();
}

/**￼* 账户的持久层实现类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public class** AccountDaoImpl **implements** IAccountDao {
**private** DBAssit dbAssit;
**public void** setDbAssit(DBAssit dbAssit) {
**this**.dbAssit = dbAssit;
}
@Override
**public void** save(Account account) {
dbAssit.update("insert into
account(name,money)values(?,?)",account.getName(),account.getMoney());
}
@Override
**public void** update(Account account) {
dbAssit.update("update account set name=?,money=? where
id=?",account.getName(),account.getMoney(),account.getId());
}
@Override
**public void** delete(Integer accountId) {
dbAssit.update("delete from account where id=?",accountId);
}
@Override
**public** Account findById(Integer accountId) {
**return** dbAssit.query("select * from account where id=?",**new**
BeanHandler\<Account\>(Account.**class**),accountId);
}
@Override
**public** List\<Account\> findAll() {
**return** dbAssit.query("select * from account where id=?",**new**
BeanListHandler\<Account\>(Account.**class**));
}
}￼
编写业务层代码
/**
* 账户的业务层接口
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public interface** IAccountService {
/**
* 保存账户
* **@param** account
*/
**void** saveAccount(Account account);
/**
* 更新账户
* **@param** account
*/
**void** updateAccount(Account account);
/**
* 删除账户
* **@param** account
*/
**void** deleteAccount(Integer accountId);
/**
* 根据 id 查询账户
* **@param** accountId
* **@return**
*/
Account findAccountById(Integer accountId);
/**
* 查询所有账户
* **@return**
*/
List\<Account\> findAllAccount();
}

/**￼* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public class** AccountServiceImpl **implements** IAccountService {
**private** IAccountDao accountDao;
**public void** setAccountDao(IAccountDao accountDao) {
**this**.accountDao = accountDao;
}
@Override
**public void** saveAccount(Account account) {
accountDao.save(account);
}
@Override
**public void** updateAccount(Account account) {
accountDao.update(account);
}
@Override
**public void** deleteAccount(Integer accountId) {
accountDao.delete(accountId);
}
@Override
**public** Account findAccountById(Integer accountId) {
**return** accountDao.findById(accountId);
}
@Override
**public** List\<Account\> findAllAccount() {
**return** accountDao.findAll();
}
}￼
创建并编写配置文件
\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\>
\<beans xmlns=_"http://www.springframework.org/schema/beans"_
xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_
xsi:schemaLocation=_"http://www.springframework.org/schema/beans_
_http://www.springframework.org/schema/beans/spring-beans.xsd__"_\>
\</beans\>
**1.3** **配置步骤**
**1.3.1** **配置对象**
\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\>
\<beans xmlns=_"http://www.springframework.org/schema/beans"_
xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_
xsi:schemaLocation=_"http://www.springframework.org/schema/beans_
_http://www.springframework.org/schema/beans/spring-beans.xsd__"_\>
\<!-- 配置 service --\>
\<bean id=_"accountService"_
class=_"com.itheima.service.impl.AccountServiceImpl"_\>
\<property name=_"accountDao"_ ref=_"accountDao"_\>\</property\>
\</bean\>
\<!-- 配置 dao --\>
\<bean id=_"accountDao"_ class=_"com.itheima.dao.impl.AccountDaoImpl"_\>
\<property name=_"dbAssit"_ ref=_"dbAssit"_\>\</property\>
\</bean\>
\<!-- 配置 dbAssit **此处我们只注入了数据源，表明每条语句独立事务**--\>
\<bean id=_"dbAssit"_ class=_"com.itheima.dbassit.DBAssit"_\>￼\<property name=_"dataSource"_ ref=_"dataSource"_\>\</property\>
\</bean\>
\<!-- 配置数据源 --\>
\<bean id=_"dataSource"_ class=_"com.mchange.v2.c3p0.ComboPooledDataSource"_\>
\<property name=_"driverClass"_ value=_"com.mysql.jdbc.Driver"_\>\</property\>
\<property name=_"jdbcUrl"_ value=_"jdbc:mysql:///spring_day02"_\>\</property\>
\<property name=_"user"_ value=_"root"_\>\</property\>
\<property name=_"password"_ value=_"1234"_\>\</property\>
\</bean\>
\</beans\>

**测试案例**
**1.4.1** **测试类代码**
/**
* 测试类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public class** AccountServiceTest {
/**
* 测试保存
*/
@Test
**public void** testSaveAccount() {
Account account = **new** Account();
account.setName("黑马程序员");
account.setMoney(100000f);
ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");
IAccountService as = ac.getBean("accountService",IAccountService.**class**);
as.saveAccount(account);
}
/**
* 测试查询一个
*/
@Test
**public void** testFindAccountById() {
ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");传智播客——专注于 Java、.Net 和Php、网页平面设计工程师的培训
IAccountService as = ac.getBean("accountService",IAccountService.**class**);
Account account = as.findAccountById(1);
System.**out**.println(account);
}
/**
* 测试更新
*/
@Test
**public void** testUpdateAccount() {
ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");
IAccountService as = ac.getBean("accountService",IAccountService.**class**);
Account account = as.findAccountById(1);
account.setMoney(20301050f);
as.updateAccount(account);
}
/**
* 测试删除
*/
@Test
**public void** testDeleteAccount() {
ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");
IAccountService as = ac.getBean("accountService",IAccountService.**class**);
as.deleteAccount(1);
}
/**
* 测试查询所有
*/
@Test
**public void** testFindAllAccount() {
ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");
IAccountService as = ac.getBean("accountService",IAccountService.**class**);
List\<Account\> list = as.findAllAccount();
**for**(Account account : list) {
System.**out**.println(account);
}
}
}
**1.4.2** **分析测试了中的问题**
通过上面的测试类，我们可以看出，每个测试方法都重新获取了一次 spring 的核心容器，造成了不必要的重￼复代码，增加了我们开发的工作量。这种情况，在开发中应该避免发生。
有些同学可能想到了，我们把容器的获取定义到类中去。例如：
/**
* 测试类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
**public class** AccountServiceTest {
**private** ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");
**private** IAccountService as = ac.getBean("accountService",IAccountService.**class**);
}
这种方式虽然能解决问题，但是扔需要我们自己写代码来获取容器。
能不能测试时直接就编写测试方法，而不需要手动编码来获取容器呢？
请在今天的最后一章节找答案。
**第****2****章** **基于注解的** **IOC** **配置**
**2.1****明确：写在最前**
学习基于注解的 IoC 配置，大家脑海里首先得有一个认知，即注解配置和 xml 配置要实现的功能都是一样
的，都是要降低程序间的耦合。只是配置的形式不一样。
关于实际的开发中到底使用xml还是注解，每家公司有着不同的使用习惯。所以这两种配置方式我们都需要掌
握。
我们在讲解注解配置时，采用上一章节的案例，把 spring 的 xml 配置内容改为使用注解逐步实现。
**2.2****环境搭建**
**2.2.1** **第一步：拷贝必备** **jar** **包到工程的** **lib** **目录。**
注意：在基于注解的配置中，我们还要多拷贝一个 aop 的 jar 包。如下图：￼**2.2.2** **第二步：使用****@Component** **注解配置管理的资源**
/**
* 账户的业务层实现类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
@Component("accountService")
**public class** AccountServiceImpl **implements** IAccountService {
**private** IAccountDao accountDao;
**public void** setAccountDao(IAccountDao accountDao) {
**this**.accountDao = accountDao;
}
}
/**
* 账户的持久层实现类
* **@author** 黑马程序员
* **@Company** [http://www.ithiema.com](http://www.ithiema.com)
* **@Version** 1.0
*/
@Component("accountDao")
**public class** AccountDaoImpl **implements** IAccountDao {
**private** DBAssit dbAssit;
}￼
1、当我们使用注解注入时，set 方法不用写
**2.2.3** **第三步：创建** **spring** **的** **xml** **配置文件并开启对注解的支持**
注意：
基于注解整合时，导入约束时需要多导入一个 context 名称空间下的约束。
由于我们使用了注解配置，此时不能在继承 JdbcDaoSupport，需要自己配置一个 JdbcTemplate
\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\>
\<beans xmlns=_"http://www.springframework.org/schema/beans"_
xmlns:context=_"http://www.springframework.org/schema/context"_
xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_
xsi:schemaLocation=_"http://www.springframework.org/schema/beans_
_http://www.springframework.org/schema/beans/spring-beans.xsd_
_http://www.springframework.org/schema/context_
_http://www.springframework.org/schema/context/spring-context.xsd__"_\>
\<!-- 告知 spring 创建容器时要扫描的包 --\>
\<context:component-scan base-package=_"com.itheima"_\>\</context:component-scan\>
\<!-- 配置 dbAssit --\>
\<bean id=_"dbAssit"_ class=_"com.itheima.dbassit.DBAssit"_\>
\<property name=_"dataSource"_ ref=_"dataSource"_\>\</property\>
\</bean\>
\<!-- 配置数据源 --\>
\<bean id=_"dataSource"_ class=_"com.mchange.v2.c3p0.ComboPooledDataSource"_\>
\<property name=_"driverClass"_ value=_"com.mysql.jdbc.Driver"_\>\</property\>
\<property name=_"jdbcUrl"_ value=_"jdbc:mysql:///spring_day02"_\>\</property\>
\<property name=_"user"_ value=_"root"_\>\</property\>
\<property name=_"password"_ value=_"1234"_\>\</property\>
\</bean\>
\</beans\>￼
```
