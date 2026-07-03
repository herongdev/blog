---
title: SpringBoot - 多模块项目的搭建教程
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
注意：

- 根为pom，其它为jar
- web保留启动类，其它都可以删除启动类和配置文件
- 至少有base，dao，service，web四个模块
- 在根pom中parent为spring-boot-starter-parent，它的版本由本机jdk版本决定，而它又决定了其它spring模块的版本
- 根pom中还要声明所有modules，models中的还要在dependence中声明，运行clean和install都在根目录统一处理。根pom中声明的依赖，子模块要使用也要声明，但是可以不再给出版本号，如果不是pom中统一管理的依赖，要配置version。
-

  **Maven** 多模块项目通常由一个父模块和若干个子模块构成，每个模块都对应着一个 **pom.xml**。它们之间通过继承和聚合（也称作多模块）相互关联。多模块适用于一些比较大的项目，通过合理的模块拆分，实现代码的复用，便于维护和管理。
    本文通过构建一个包含 **4** 个子模块的项目，来演示 **SpringBoot** 在 **Maven** 环境的多模块构建过程。
**1，创建父工程**
（1）首先，先创建一个 **Spring Initializr** 工程 **hangge** 作为 父工程（不添加任何依赖）：

[![SpringBoot](Exported%20image%2020260702233046-0.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（2）删除刚创建工程里不需要的文件， 只保留：**.idea** 文件夹 、项目 **pom** 文件、以及一个 ***.iml** 文件。
**注意**： 因为父模块只做依赖管理，不需要编写代码，所以 **src** 文件夹可以直接删除。

[![SpringBoot](Exported%20image%2020260702233049-1.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（3）删除后结果如下：

[![SpringBoot](Exported%20image%2020260702233052-2.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

**2，创建子模块**
（1）右键点击父工程，选择 **New** -\> **Module...** 创建子模块。这里依次创建 **hangge-base**、**hangge-dao**、**hangge-service** 和 **hangge-web** 共 **4** 个模块。
**注意**：除了 **hangge-web** 子模块创建时选择添加 **Spring Web** 依赖（当然也可以创建时不添加，等后面再手动编辑 **pom.xml** 文件添加），其他模块暂时不添加依赖。

[![SpringBoot](Exported%20image%2020260702233054-3.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（2）将 **4** 个子模块的 **mvnw**、**mvnw.cmd** 文件及 **.mvn** 文件夹全部删除。

[![SpringBoot](Exported%20image%2020260702233057-4.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（3）对于 **src** 里的内容，只保留 **hangge-web** 的启动类和配置文件，其他子模块的的启动类和配置文件都删除：

[![SpringBoot](Exported%20image%2020260702233100-5.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（4）删除后结果如下：

[![SpringBoot](Exported%20image%2020260702233107-6.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

**3，编辑父工程 pom.xml 文件**
    将父工程 **pom.xml** 文件修改成如下内容，里面声明该父工程包含的子模块，同时抽取统一的配置信息和依赖版本控制，这样可以方便子 **pom** 直接引用，简化子 **pom** 的配置。

- 多模块项目中，父模块打包类型必须是 **pom**。
- 因为开发框架是 **spring boot**，父模块默认继承 **spring-boot-starter-parent**，因此可以删除 **spring-boot-starter** 和 **spring-boot-starter-test** 依赖（祖先已经包含了）

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>45<br>46<br>47<br>48<br>49<br>50<br>51<br>52<br>53<br>54<br>55<br>56<br>57<br>58<br>59<br>60<br>61<br>62<br>```|```<br>\<?xml version="1.0" encoding="UTF-8"?\><br>\<project xmlns=" http://maven.apache.org/POM/4.0.0"<br>         xmlns:xsi=" http://www.w3.org/2001/XMLSchema-instance"<br>         xsi:schemaLocation=" http://maven.apache.org/POM/4.0.0<br>          https://maven.apache.org/xsd/maven-4.0.0.xsd"\><br>    \<modelVersion\>4.0.0\</modelVersion\><br> <br>    \<groupId\>com.example\</groupId\><br>    \<artifactId\>hangge\</artifactId\><br>    \<version\>0.0.1-SNAPSHOT\</version\><br>    \<name\>hangge\</name\><br>    \<description\>Demo project for Spring Boot\</description\><br> <br>    \<!-- <br>```<br><br>父模块打包类型必须为<br><br>```<br>pom --\><br>    \<packaging\>pom\</packaging\><br> <br>    \<!-- parent<br>```<br><br>指明继承关系，给出被继承的父项目的具体信息<br><br>```<br>--\><br>    \<parent\><br>        \<groupId\>org.springframework.boot\</groupId\><br>        \<artifactId\>spring-boot-starter-parent\</artifactId\><br>        \<version\>2.2.5.RELEASE\</version\><br>        \<relativePath/\> \<!-- lookup parent from repository --\><br>    \</parent\><br> <br>    \<properties\><br>        \<java.version\>1.8\</java.version\><br>    \</properties\><br> <br>    \<!-- <br>```<br><br>模块说明：这里声明多个子模块<br><br>```<br> --\><br>    \<modules\><br>        \<module\>hangge-base\</module\><br>        \<module\>hangge-dao\</module\><br>        \<module\>hangge-service\</module\><br>        \<module\>hangge-web\</module\><br>    \</modules\><br> <br>    \<!-- <br>```<br><br>版本说明：这里统一管理依赖的版本号<br><br>```<br> --\><br>    \<dependencyManagement\><br>        \<dependencies\><br>            \<dependency\><br>                \<groupId\>com.example\</groupId\><br>                \<artifactId\>hangge-base\</artifactId\><br>                \<version\>0.0.1-SNAPSHOT\</version\><br>            \</dependency\><br>            \<dependency\><br>                \<groupId\>com.example\</groupId\><br>                \<artifactId\>hangge-dao\</artifactId\><br>                \<version\>0.0.1-SNAPSHOT\</version\><br>            \</dependency\><br>            \<dependency\><br>                \<groupId\>com.example\</groupId\><br>                \<artifactId\>hangge-service\</artifactId\><br>                \<version\>0.0.1-SNAPSHOT\</version\><br>            \</dependency\><br>            \<dependency\><br>                \<groupId\>com.example\</groupId\><br>                \<artifactId\>hangge-web\</artifactId\><br>                \<version\>0.0.1-SNAPSHOT\</version\><br>            \</dependency\><br>        \</dependencies\><br>    \</dependencyManagement\><br>\</project\><br>```|

**4，编辑子模块 pom.xml 文件**
（1）子模块 **hangge-base** 的 **pom.xml** 文件内容如下，其中 **parent** 要使用顶层的父模块，同时由于我们项目用到了 **Lombok** ，所以还添加了 **lombok** 依赖：
**注意**：由于子模块的配置信息会继承父模块的，所以子模块原来的 **properties** 可删掉。

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>```|```<br>\<?xml version="1.0" encoding="UTF-8"?\><br>\<project xmlns=" http://maven.apache.org/POM/4.0.0"<br>         xmlns:xsi=" http://www.w3.org/2001/XMLSchema-instance"<br>         xsi:schemaLocation=" http://maven.apache.org/POM/4.0.0<br>          https://maven.apache.org/xsd/maven-4.0.0.xsd"\><br>    \<modelVersion\>4.0.0\</modelVersion\><br> <br>    \<groupId\>com.example\</groupId\><br>    \<artifactId\>hangge-base\</artifactId\><br>    \<version\>0.0.1-SNAPSHOT\</version\><br>    \<name\>hangge-base\</name\><br>    \<description\>Demo project for Spring Boot\</description\><br> <br>    \<!-- <br>```<br><br>继承本项目的父工程<br><br>```<br> --\><br>    \<parent\><br>        \<groupId\>com.example\</groupId\><br>        \<artifactId\>hangge\</artifactId\><br>        \<version\>0.0.1-SNAPSHOT\</version\><br>    \</parent\><br> <br>    \<dependencies\><br>        \<dependency\><br>            \<groupId\>org.projectlombok\</groupId\><br>            \<artifactId\>lombok\</artifactId\><br>            \<version\>1.18.6\</version\><br>        \</dependency\><br>    \</dependencies\><br>\</project\><br>```|

（2）子模块 **hangge-dao** 的 **pom.xml** 文件内容如下，同样 **parent** 要使用顶层的父模块，并添加 **hangge-base** 子模块，以及数据库相关依赖：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>```|```<br>\<?xml version="1.0" encoding="UTF-8"?\><br>\<project xmlns=" http://maven.apache.org/POM/4.0.0"<br>         xmlns:xsi=" http://www.w3.org/2001/XMLSchema-instance"<br>         xsi:schemaLocation=" http://maven.apache.org/POM/4.0.0<br>          https://maven.apache.org/xsd/maven-4.0.0.xsd"\><br>    \<modelVersion\>4.0.0\</modelVersion\><br> <br>    \<groupId\>com.example\</groupId\><br>    \<artifactId\>hangge-dao\</artifactId\><br>    \<version\>0.0.1-SNAPSHOT\</version\><br>    \<name\>hangge-dao\</name\><br>    \<description\>Demo project for Spring Boot\</description\><br> <br>    \<!-- <br>```<br><br>继承本项目的父工程<br><br>```<br> --\><br>    \<parent\><br>        \<groupId\>com.example\</groupId\><br>        \<artifactId\>hangge\</artifactId\><br>        \<version\>0.0.1-SNAPSHOT\</version\><br>    \</parent\><br> <br>    \<dependencies\><br>        \<!-- dao <br>```<br><br>子模块又依赖 `base` 子模块<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>com.example\</groupId\><br>            \<artifactId\>hangge-base\</artifactId\><br>        \</dependency\><br>        \<!-- Spring Data JPA <br>```<br><br>依赖<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>org.springframework.boot\</groupId\><br>            \<artifactId\>spring-boot-starter-data-jpa\</artifactId\><br>        \</dependency\><br>        \<!-- <br>```<br><br>数据库驱动依赖<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>mysql\</groupId\><br>            \<artifactId\>mysql-connector-java\</artifactId\><br>        \</dependency\><br>        \<!-- <br>```<br><br>数据库连接池<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>com.alibaba\</groupId\><br>            \<artifactId\>druid\</artifactId\><br>            \<version\>1.1.9\</version\><br>        \</dependency\><br>    \</dependencies\><br>\</project\><br>```|

（3）子模块 **hangge-service** 的 **pom.xml** 文件内容如下，同样 **parent** 要使用顶层的父模块，并添加 **hangge-dao** 子模块依赖：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>```|```<br>\<?xml version="1.0" encoding="UTF-8"?\><br>\<project xmlns=" http://maven.apache.org/POM/4.0.0"<br>         xmlns:xsi=" http://www.w3.org/2001/XMLSchema-instance"<br>         xsi:schemaLocation=" http://maven.apache.org/POM/4.0.0<br>           https://maven.apache.org/xsd/maven-4.0.0.xsd"\><br>    \<modelVersion\>4.0.0\</modelVersion\><br> <br>    \<groupId\>com.example\</groupId\><br>    \<artifactId\>hangge-service\</artifactId\><br>    \<version\>0.0.1-SNAPSHOT\</version\><br>    \<name\>hangge-service\</name\><br>    \<description\>Demo project for Spring Boot\</description\><br> <br>    \<!-- <br>```<br><br>继承本项目的父工程<br><br>```<br> --\><br>    \<parent\><br>        \<groupId\>com.example\</groupId\><br>        \<artifactId\>hangge\</artifactId\><br>        \<version\>0.0.1-SNAPSHOT\</version\><br>    \</parent\><br> <br>    \<dependencies\><br>        \<!-- service <br>```<br><br>子模块又依赖 `dao` 子模块<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>com.example\</groupId\><br>            \<artifactId\>hangge-dao\</artifactId\><br>        \</dependency\><br>    \</dependencies\><br>\</project\><br>```|

（4）子模块 **hangge-web** 的 **pom.xml** 文件内容如下，同样 **parent** 要使用顶层的父模块，并添加 **hangge-service** 子模块依赖：
**注意**： 之前创建这个子模块的时候已经添加了 **spring-boot-starter-web** 依赖，如果没有则手动添加。

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>```|```<br>\<?xml version="1.0" encoding="UTF-8"?\><br>\<project xmlns=" http://maven.apache.org/POM/4.0.0"<br>         xmlns:xsi=" http://www.w3.org/2001/XMLSchema-instance"<br>         xsi:schemaLocation=" http://maven.apache.org/POM/4.0.0<br>          https://maven.apache.org/xsd/maven-4.0.0.xsd"\><br>    \<modelVersion\>4.0.0\</modelVersion\><br> <br>    \<groupId\>com.example\</groupId\><br>    \<artifactId\>hangge-web\</artifactId\><br>    \<version\>0.0.1-SNAPSHOT\</version\><br>    \<name\>hangge-web\</name\><br>    \<description\>Demo project for Spring Boot\</description\><br> <br>    \<!-- <br>```<br><br>继承本项目的父工程<br><br>```<br> --\><br>    \<parent\><br>        \<groupId\>com.example\</groupId\><br>        \<artifactId\>hangge\</artifactId\><br>        \<version\>0.0.1-SNAPSHOT\</version\><br>    \</parent\><br> <br>    \<dependencies\><br>        \<!-- web <br>```<br><br>子模块又依赖 `service` 子模块<br><br>```<br> --\><br>        \<dependency\><br>            \<groupId\>com.example\</groupId\><br>            \<artifactId\>hangge-service\</artifactId\><br>        \</dependency\><br> <br>        \<dependency\><br>            \<groupId\>org.springframework.boot\</groupId\><br>            \<artifactId\>spring-boot-starter-web\</artifactId\><br>        \</dependency\><br>    \</dependencies\><br> <br>    \<build\><br>        \<plugins\><br>            \<plugin\><br>                \<groupId\>org.springframework.boot\</groupId\><br>                \<artifactId\>spring-boot-maven-plugin\</artifactId\><br>            \</plugin\><br>        \</plugins\><br>    \</build\><br>\</project\><br>```|

**5，移动项目启动类所在的包**
（1）目前项目启动类 **HanggeWebApplication** 在 **com.example.hanggeweb** 包下面，我们需要将其移动移动到 **com.example** 包下。
    如果不移动启动类的话，在多模块项目中会可能会碰到一个模块无法通过 **@Autowired** 注入其他模块里的对象的问题。启动时会报类似如下的错误：

- **Field bookService in com.example.hanggeweb.controller.HelloController required a bean of type 'com.example.hanggeservice.BookService' that could not be found.**

（2）移动的方式就是右键点击 **HanggeWebApplication** 选择 **Refactor** -\> **Move...**

[![SpringBoot](Exported%20image%2020260702233212-7.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（3）在弹出框中将 **To package** 设置成 **com.example** 后点击 **Refactor** 按钮移动：

[![SpringBoot](Exported%20image%2020260702233215-8.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

**6，开始编码**
（1）首先在 **hangge-dao** 模块中添加一个 **Book** 实体类：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>```|```<br>@Entity(name = "book")<br>@Setter<br>@Getter<br>@NoArgsConstructor<br>public class Book {<br>    @Id<br>    @GeneratedValue(strategy = GenerationType.IDENTITY)<br>    private Integer id;<br>    private String name;<br>    private String author;<br>    private Float price;<br>}<br>```|

（2）接着在 **hangge-dao** 模块中添加 **BookDao** 接口，继承 **JpaRepository**：

|   |   |
|---|---|
|```<br>1<br>2<br>```|```<br>public interface BookDao extends JpaRepository\<Book, Integer\> {<br>}<br>```|

（3）接着在 **hangge-service** 模块中添加一个业务实现类 **BookService**，注入 **BookDao** 并调用：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>```|```<br>@Service<br>public class BookService {<br>    @Autowired<br>    BookDao bookDao;<br> <br>    public List\<Book\> allBooks() {<br>        return bookDao.findAll();<br>    }<br>}<br>```|

（4）然后在 **hangge-web** 模块中创建一个 **Controller**，注入 **BookService** 并调用：

|   |   |
|---|---|
|```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>```|```<br>@RestController<br>public class HelloController {<br> <br>    @Autowired<br>    BookService bookService;<br> <br>    @GetMapping("test")<br>    public List\<Book\> test() {<br>        return bookService.allBooks();<br>    }<br>}<br>```|

（5）最后在 **hangge-web** 模块的 **application.properties** 中配置数据库基本信息以及 **JPA** 相关配置：
==spring.datasource.type=========com====.====alibaba====.====druid====.====pool====.====DruidDataSource==
==spring.datasource.url=========jdbc:mysql://localhost:3306/hangge2====?serverTimezone=Asia/Shanghai==
==spring.datasource.username=========root==
==spring.datasource.password=========hangge1234==
==#====是否在控制台打印====JPA====执行过程生成的====SQL==
==spring.jpa.show-sql=========true==
==#====表示====JPA====对应的数据库是====MySQL==
==spring.jpa.database=======_mysql_
==#====表示在项目启动时根据实体类更新数据库中的表==
==spring.jpa.hibernate.ddl-auto=========update==
==#====表示使用的数据库方言是====MySQL57Dialect==
==spring.jpa.properties.hibernate.dialect=========org.hibernate.dialect.MySQL57Dialect==
**7，运行测试**
（1）运行 **hangge-web** 模块下的 **Application** 的启动类：

[![SpringBoot](Exported%20image%2020260702233217-9.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

（2）使用浏览器访问 **http://localhost:8080/test** 便可查询到相关的数据信息：

[![SpringBoot](Exported%20image%2020260702233219-10.png)](https://www.hangge.com/blog/cache/detail_2833.html#)

原文出自：[www.hangge.com](https://www.hangge.com/)  转载请保留原文链接： [https://www.hangge.com/blog/cache/detail_2833.html](https://www.hangge.com/blog/cache/detail_2833.html)

 [![SpringBoot](Exported%20image%2020260702233221-11.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233224-12.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233231-13.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233232-14.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233235-15.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233237-16.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233241-17.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233244-18.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233248-19.png)](https://www.hangge.com/blog/cache/detail_2833.html#)
 [![SpringBoot](Exported%20image%2020260702233254-20.png)](https://www.hangge.com/blog/cache/detail_2833.html#)[![SpringBoot](Exported%20image%2020260702233256-21.png)](https://www.hangge.com/blog/cache/detail_2833.html#)
