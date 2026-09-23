import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"使用spring的IoC的实现账户的CRUD","description":"","frontmatter":{"title":"使用spring的IoC的实现账户的CRUD","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/使用spring的IoC的实现账户的CRUD.md","filePath":"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/使用spring的IoC的实现账户的CRUD.md"}'),c={name:"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/使用spring的IoC的实现账户的CRUD.md"};function i(u,l,t,o,r,m){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"实现账户的 CRUD 操作")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**环境搭建**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**拷贝** **jar** **包**￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"create table account(")]),s(`
`),n("span",{class:"line"},[n("span",null,"id int primary key auto_increment,")]),s(`
`),n("span",{class:"line"},[n("span",null,"name varchar(40),")]),s(`
`),n("span",{class:"line"},[n("span",null,"money float")]),s(`
`),n("span",{class:"line"},[n("span",null,")character set utf8 collate utf8_general_ci;")]),s(`
`),n("span",{class:"line"},[n("span",null,"insert into account(name,money) values('aaa',1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"insert into account(name,money) values('bbb',1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"insert into account(name,money) values('ccc',1000);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 账户的实体类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** Account **implements** Serializable {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** Integer id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** Float money;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** Integer getId() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setId(Integer id) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.id = id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** String getName() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setName(String name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** Float getMoney() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** money;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setMoney(Float money) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.money = money;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写持久层代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 账户的持久层接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public interface** IAccountDao {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 保存")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** account")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** save(Account account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** account")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** update(Account account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** accountId")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** delete(Integer accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 根据 id 查询")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** accountId")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"Account findById(Integer accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 查询所有")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<Account\\> findAll();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**￼* 账户的持久层实现类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountDaoImpl **implements** IAccountDao {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** DBAssit dbAssit;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setDbAssit(DBAssit dbAssit) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.dbAssit = dbAssit;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** save(Account account) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'dbAssit.update("insert into')]),s(`
`),n("span",{class:"line"},[n("span",null,'account(name,money)values(?,?)",account.getName(),account.getMoney());')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** update(Account account) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'dbAssit.update("update account set name=?,money=? where')]),s(`
`),n("span",{class:"line"},[n("span",null,'id=?",account.getName(),account.getMoney(),account.getId());')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** delete(Integer accountId) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'dbAssit.update("delete from account where id=?",accountId);')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** Account findById(Integer accountId) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'**return** dbAssit.query("select * from account where id=?",**new**')]),s(`
`),n("span",{class:"line"},[n("span",null,"BeanHandler\\<Account\\>(Account.**class**),accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** List\\<Account\\> findAll() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'**return** dbAssit.query("select * from account where id=?",**new**')]),s(`
`),n("span",{class:"line"},[n("span",null,"BeanListHandler\\<Account\\>(Account.**class**));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写业务层代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 账户的业务层接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public interface** IAccountService {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 保存账户")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** account")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** saveAccount(Account account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 更新账户")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** account")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** updateAccount(Account account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 删除账户")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** account")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**void** deleteAccount(Integer accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 根据 id 查询账户")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** accountId")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"Account findAccountById(Integer accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 查询所有账户")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<Account\\> findAllAccount();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**￼* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceImpl **implements** IAccountService {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** IAccountDao accountDao;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setAccountDao(IAccountDao accountDao) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.accountDao = accountDao;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** saveAccount(Account account) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"accountDao.save(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** updateAccount(Account account) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"accountDao.update(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** deleteAccount(Integer accountId) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"accountDao.delete(accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** Account findAccountById(Integer accountId) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** accountDao.findById(accountId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** List\\<Account\\> findAllAccount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** accountDao.findAll();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建并编写配置文件")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<beans xmlns=_"http://www.springframework.org/schema/beans"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xsi:schemaLocation=_"http://www.springframework.org/schema/beans_')]),s(`
`),n("span",{class:"line"},[n("span",null,'_http://www.springframework.org/schema/beans/spring-beans.xsd__"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</beans\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.3** **配置步骤**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.3.1** **配置对象**")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<beans xmlns=_"http://www.springframework.org/schema/beans"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xsi:schemaLocation=_"http://www.springframework.org/schema/beans_')]),s(`
`),n("span",{class:"line"},[n("span",null,'_http://www.springframework.org/schema/beans/spring-beans.xsd__"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置 service --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"accountService"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'class=_"com.itheima.service.impl.AccountServiceImpl"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"accountDao"_ ref=_"accountDao"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置 dao --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"accountDao"_ class=_"com.itheima.dao.impl.AccountDaoImpl"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"dbAssit"_ ref=_"dbAssit"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置 dbAssit **此处我们只注入了数据源，表明每条语句独立事务**--\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dbAssit"_ class=_"com.itheima.dbassit.DBAssit"_\\>￼\\<property name=_"dataSource"_ ref=_"dataSource"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置数据源 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dataSource"_ class=_"com.mchange.v2.c3p0.ComboPooledDataSource"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"driverClass"_ value=_"com.mysql.jdbc.Driver"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"jdbcUrl"_ value=_"jdbc:mysql:///spring_day02"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"user"_ value=_"root"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"password"_ value=_"1234"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</beans\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**测试案例**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.4.1** **测试类代码**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试保存")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** testSaveAccount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Account account = **new** Account();")]),s(`
`),n("span",{class:"line"},[n("span",null,'account.setName("黑马程序员");')]),s(`
`),n("span",{class:"line"},[n("span",null,"account.setMoney(100000f);")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"as.saveAccount(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试查询一个")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** testFindAccountById() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");传智播客——专注于 Java、.Net 和Php、网页平面设计工程师的培训')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"Account account = as.findAccountById(1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.**out**.println(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** testUpdateAccount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"Account account = as.findAccountById(1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"account.setMoney(20301050f);")]),s(`
`),n("span",{class:"line"},[n("span",null,"as.updateAccount(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** testDeleteAccount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"as.deleteAccount(1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试查询所有")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** testFindAllAccount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<Account\\> list = as.findAllAccount();")]),s(`
`),n("span",{class:"line"},[n("span",null,"**for**(Account account : list) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.**out**.println(account);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.4.2** **分析测试了中的问题**")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过上面的测试类，我们可以看出，每个测试方法都重新获取了一次 spring 的核心容器，造成了不必要的重￼复代码，增加了我们开发的工作量。这种情况，在开发中应该避免发生。")]),s(`
`),n("span",{class:"line"},[n("span",null,"有些同学可能想到了，我们把容器的获取定义到类中去。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,'**private** ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'**private** IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这种方式虽然能解决问题，但是扔需要我们自己写代码来获取容器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"能不能测试时直接就编写测试方法，而不需要手动编码来获取容器呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"请在今天的最后一章节找答案。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**第****2****章** **基于注解的** **IOC** **配置**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.1****明确：写在最前**")]),s(`
`),n("span",{class:"line"},[n("span",null,"学习基于注解的 IoC 配置，大家脑海里首先得有一个认知，即注解配置和 xml 配置要实现的功能都是一样")]),s(`
`),n("span",{class:"line"},[n("span",null,"的，都是要降低程序间的耦合。只是配置的形式不一样。")]),s(`
`),n("span",{class:"line"},[n("span",null,"关于实际的开发中到底使用xml还是注解，每家公司有着不同的使用习惯。所以这两种配置方式我们都需要掌")]),s(`
`),n("span",{class:"line"},[n("span",null,"握。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们在讲解注解配置时，采用上一章节的案例，把 spring 的 xml 配置内容改为使用注解逐步实现。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.2****环境搭建**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.2.1** **第一步：拷贝必备** **jar** **包到工程的** **lib** **目录。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：在基于注解的配置中，我们还要多拷贝一个 aop 的 jar 包。如下图：￼**2.2.2** **第二步：使用****@Component** **注解配置管理的资源**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 账户的业务层实现类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Component("accountService")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceImpl **implements** IAccountService {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** IAccountDao accountDao;")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public void** setAccountDao(IAccountDao accountDao) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this**.accountDao = accountDao;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 账户的持久层实现类")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@author** 黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Company** [http://www.ithiema.com](http://www.ithiema.com)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@Version** 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Component("accountDao")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountDaoImpl **implements** IAccountDao {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** DBAssit dbAssit;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"1、当我们使用注解注入时，set 方法不用写")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.2.3** **第三步：创建** **spring** **的** **xml** **配置文件并开启对注解的支持**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：")]),s(`
`),n("span",{class:"line"},[n("span",null,"基于注解整合时，导入约束时需要多导入一个 context 名称空间下的约束。")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于我们使用了注解配置，此时不能在继承 JdbcDaoSupport，需要自己配置一个 JdbcTemplate")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<?xml version=_"1.0"_ encoding=_"UTF-8"_?\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<beans xmlns=_"http://www.springframework.org/schema/beans"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns:context=_"http://www.springframework.org/schema/context"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns:xsi=_"http://www.w3.org/2001/XMLSchema-instance"_')]),s(`
`),n("span",{class:"line"},[n("span",null,'xsi:schemaLocation=_"http://www.springframework.org/schema/beans_')]),s(`
`),n("span",{class:"line"},[n("span",null,"_http://www.springframework.org/schema/beans/spring-beans.xsd_")]),s(`
`),n("span",{class:"line"},[n("span",null,"_http://www.springframework.org/schema/context_")]),s(`
`),n("span",{class:"line"},[n("span",null,'_http://www.springframework.org/schema/context/spring-context.xsd__"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 告知 spring 创建容器时要扫描的包 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<context:component-scan base-package=_"com.itheima"_\\>\\</context:component-scan\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置 dbAssit --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dbAssit"_ class=_"com.itheima.dbassit.DBAssit"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"dataSource"_ ref=_"dataSource"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置数据源 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dataSource"_ class=_"com.mchange.v2.c3p0.ComboPooledDataSource"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"driverClass"_ value=_"com.mysql.jdbc.Driver"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"jdbcUrl"_ value=_"jdbc:mysql:///spring_day02"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"user"_ value=_"root"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"password"_ value=_"1234"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</beans\\>￼")])])])])],-1)])])}const w=a(c,[["render",i]]);export{_ as __pageData,w as default};
