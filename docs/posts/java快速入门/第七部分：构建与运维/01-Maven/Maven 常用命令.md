---
title: Maven 常用命令
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
我们可以在

`cmd`

中通过一系列的 `maven` 命令来对我们的 `maven-helloworld` 工程进行编译、测试、运
行、打包、安装、部署。

- compile
- compile

是 `maven` 工程的编译命令，作用是将 `src/main/java` 下的文件编译为 `class` 文件输出到 `target`
目录下。

`cmd`

进入命令状态，执行 `mvn compile`，如下图提示成功：
查看

`target`

目录，`class` 文件已生成，编译完成。

- test
- test

是 `maven` 工程的测试命令 `mvn test`，会执行 `src/test/java` 下的单元测试类。

`cmd`

执行 `mvn test` 执行 `src/test/java` 下单元测试类，下图为测试结果，运行 `1` 个测试用例，全部成功。

- clean
- clean

是 `maven` 工程的清理命令，执行 `clean` 会删除 `target` 目录及内容。

- package
- package

是 `maven` 工程的打包命令，对于 `java` 工程执行 `package` 打成 `jar` 包，对于 `web` 工程打成 `war`
包。

- install
- install

是 `maven` 工程的安装命令，执行 `install` 将 `maven` 打成 `jar` 包或 `war` 包发布到本地仓库。
从运行结果中，可以看出：
当后面的命令执行时，前面的操作过程也都会自动执行，

`Maven` **指令的生命周期**
`maven` 对项目构建过程分为三套相互独立的生命周期，请注意这里说的是“三套”，而且“相互独立”，
这三套生命周期分别是：

- `Clean Lifecycle` 在进行真正的构建之前进行一些清理工作。
- `Default Lifecycle` 构建的核心部分，编译，测试，打包，部署等等。
- `Site Lifecycle` 生成项目报告，站点，发布站点。

`maven` **的概念模型**
`Maven` 包含了一个项目对象模型 `(Project Object Model)`，一组标准集合，一个项目生命周期

- (Project
- Lifecycle)

，一个依赖管理系统`(Dependency Management System)`，和用来运行定义在生命周期阶段

`(phase)`

中插件`(plugin)`目标`(goal)`的逻辑。

![Maven porn.xrnl O M Dependency Build lifecycle pha...](Exported%20image%2020260702225112-0.png)

项目对象模型 `(Project Object Model)`
一个

`maven`

工程都有一个 `pom.xml` 文件，通过 `pom.xml` 文件定义项目的坐标、项目依赖、项目信息、
插件目标等。

依赖管理系统`(Dependency Management System)`
通过

`maven`

的依赖管理对项目所依赖的 `jar` 包进行统一管理。
比如：项目依赖

`junit4.9`

，通过在 `pom.xml` 中定义 `junit4.9` 的依赖即使用 `junit4.9`，如下所示是 `junit4.9`
的依赖定义：

`\<!--`

依赖关系

- --\>
- \<dependencies\>
- \<!--

此项目运行使用 `junit`，所以此项目依赖

- junit --\>
- \<dependency\>
- \<!-- junit

的项目名称

- --\>
- \<groupId\>junit\</groupId\>
- \<!-- junit

的模块名称

- --\>
- \<artifactId\>junit\</artifactId\>
- \<!-- junit

版本

- --\>
- \<version\>4.9\</version\>
- \<!--

依赖范围：单元测试时使用

- junit --\>
- \<scope\>test\</scope\>
- \</dependency\>

一个项目生命周期`(Project Lifecycle)`
使用

`maven`

完成项目的构建，项目构建包括：清理、编译、测试、部署等过程，`maven` 将这些
过程规范为一个生命周期，如下所示是生命周期的各各阶段：

![Exported image](Exported%20image%2020260702225116-1.png)

`maven` 通过执行一些简单命令即可实现上边生命周期的各各过程，比如执行 `mvn compile` 执行编译、
执行

`mvn clean`

执行清理。

一组标准集合
`maven` 将整个项目管理过程定义一组标准，比如：通过 `maven` 构建工程有标准的目录结构，有标准的生命周期阶段、依赖管理有标准的坐标定义等。

插件`(plugin)`目标

- (goal)
- maven

管理项目生命周期过程都是基于插件完成的。

`idea` **开发** `maven` **项目**
在实战的环境中，我们都会使用流行的工具来开发项目。

`idea` **的** `maven` **配置**
**打开****-****\>**`File`**-\>**`Settings`**-\>****配置** `maven`

![maven maver Intelij Edit Navigate Analyze Run VCS ...](Exported%20image%2020260702225118-2.png)

依据图片指示，选择本地

`maven`

安装目录，指定 `maven` 安装目录下 `conf` 文件夹中 `settings` 配置文件。

`idea` **中创建一个** `maven` **的** `web` **工程**
打开

`idea`

，选择创建一个新工程
选择

`idea`

提供好的 `maven` 的`web` 工程模板

![New Project Clouds Spring Java FX Android IntelliJ...](Exported%20image%2020260702225120-3.png)

点击

`Next`

填写项目信息

![0 New Project Groupld f t com.itheima hello maven ...](Exported%20image%2020260702225122-4.png)

点击

`Next`

，此处不做改动。

![New Project Maven home directory user settings fil...](Exported%20image%2020260702225128-5.png)

点击

`Next`

选择项目所在目录

![0 New 0 t Project name he 0 maven project location...](Exported%20image%2020260702225131-6.png)

点击

`Finish`

后开始创建工程，耐心等待，直到出现如下界面。

![hello maven Project hello maven idea main v WEBINF...](Exported%20image%2020260702225133-7.png)

手动添加 `src/main/java` 目录，如下图右键 `main` 文件夹-\>

`NewDirectory`
 创建一个新的文件夹命名为 `java`点击 `OK` 后，在新的文件夹 `java` 上右键-\>`Make Directory as`-\>`Sources Root`

**创建一个** `Servlet`

1. `src/java/main` 创建了一个 `Servlet`，但报错
![Project hello maven . idea v main v com.itheima.se...](Exported%20image%2020260702225135-8.png)3. 要解决问题，就是要将 `servlet-api-xxx.jar` 包放进来，作为 `maven` 工程应当添加 `servlet` 的坐标，从而导入它的 `jar`
4. 在 `pom.xml` 文件添加坐标

直接打开 `hello_maven` 工程的 `pom.xml` 文件，再添加坐标添加 `jar` 包的坐标时，还可以指定这个 `jar` 包将来的作用范围。 每个 `maven` 工程都需要定义本工程的坐标，坐标是 `maven` 对 `jar` 包的身份定义，比如：入门程序的坐标定义如下：
`\<!--`项目名称，定义为组织名`+`项目名，类似包名

- --\>
- \<groupId\>com.itheima\</groupId\>
- \<!--

模块名称

- --\>
- \<artifactId\>hello_maven\</artifactId\>
- \<!--

当前项目版本号，`snapshot` 为快照版本即非正式版本，`release` 为正式发布版本 `--\>`
`传智播客——专注于 `Java`、`.Net` 和 `Php`、网页平面设计工程师的培训

- \<version\>0.0.1-SNAPSHOT\</version\>
- \<packaging \>

：打包类型

`jar`

：执行 `package` 会打成 `jar` 包

`war`

：执行 `package` 会打成 `war` 包

`pom`

：用于 `maven` 工程的继承，通常父工程设置为 `pom`

**坐标的来源方式**
添加依赖需要指定依赖 `jar` 包的坐标，但是很多情况我们是不知道 `jar` 包的的坐标，可以通过如下方式查询：

**从互联网搜索**

http://search.maven.org/
http://mvnrepository.com/
 网站搜索示例：

![Found results SMng Spring Context org.spnnqframewo...](Exported%20image%2020260702225137-9.png)

**依赖范围**
`A` 依赖 `B`，需要在 `A` 的 `pom.xml` 文件中添加 `B` 的坐标，添加坐标时需要指定依赖范围，依赖范围包括：

- `compile`：编译范围，指 `A` 在编译时依赖 `B`，此范围为默认依赖范围。编译范围的依赖会用在编译、测试、运行，由于运行时需要所以编译范围的依赖会被打包。
- `provided`：`provided` 依赖只有在当 `JDK` 或者一个容器已提供该依赖之后才使用， `provided` 依赖在编译和测试时需要，在运行时不需要，比如：`servlet api` 被 `tomcat` 容器提供。
- `runtime`：`runtime` 依赖在运行和测试系统的时候需要，但在编译的时候不需要。比如：`jdbc`的驱动包。由于运行时需要所以 `runtime` 范围的依赖会被打包。
- `test`：`test` 范围依赖 在编译和运行时都不需要，它们只有在测试编译和测试运行阶段可用，比如：`junit`。由于运行时不需要所以 `test`范围依赖不会被打包。
- `system`：`system` 范围依赖与 `provided` 类似，但是你必须显式的提供一个对于本地系统中 `JAR`文件的路径，需要指定 `systemPath` 磁盘路径，`system`依赖不推荐使用。
![classpath classpath classpath compile Y Y spnngcor...](Exported%20image%2020260702225139-10.png)

在

`maven-web`

工程中测试各各 `scop`。
测试总结：

- 默认引入 的 `jar` 包 `------- compile` 【默认范围 可以不写】（编译、测试、运行 都有效 ）
- `servlet-api` 、`jsp-api ------- provided` （编译、测试 有效， 运行时无效 防止和 `tomcat` 下 `jar` 冲突）
- `jdbc` 驱动 `jar` 包 `---- runtime` （测试、运行 有效 ）
- `junit ----- test` （测试有效）

依赖范围由强到弱的顺序是：`compile\>provided\>runtime\>test`

**项目中添加的坐标**

![dependencies dependency group version4. scopetests...](Exported%20image%2020260702225140-11.png)

**设置** `jdk` **编译版本**
本教程使用

`jdk1.8`

，需要设置编译版本为 `1.8`，这里需要使用 `maven` 的插件来设置：
在

`pom.xml`

中加入：

\<build\>
\<plugins\>
\<plugin\>
\<groupId\>org.apache.maven.plugins\</groupId\>
\<artifactId\>maven-compiler-plugin\</artifactId\>
\<configuration\>
\<source\>1.8\</source\>
\<target\>1.8\</target\>
\<encoding\>UTF-8\</encoding\>
\</configuration\>
\</plugin\>
\</plugins\>
\</build\>
**编写** `servlet`
在 `src/main/java` 中创建 `ServletTest`，￼

![srcmainjava cn.itca st. maven. servlet t ServletTe...](Exported%20image%2020260702225146-12.png)

编写 jsp

![Project hello maven .idea src main v java com.ithe...](Exported%20image%2020260702225148-13.png)

**在** `web.xml` **中配置** `servlet` **访问路径**

![itheima. servlet. servlet servletmapping url patte...](Exported%20image%2020260702225151-14.png)

**添加** `tomcat7` **插件**
在

`pom`

文件中添加如下内容

![lug in apache. tomcat. artifact version2. conf igu...](Exported%20image%2020260702225155-15.png)

此时点击

`idea`

最右侧 `Maven Projects`，
就可以看到我们新添加的

`tomcat7`

插件
双击

`tomcat7`

插件下 `tomcat7:run` 命令直接运行项目

![Maven Projects Profiles hello maven Lifecycle Plug...](Exported%20image%2020260702225157-16.png)

也可以直接点击如图按钮，手动输入 `tomc7:run` 命令运行项目

![Maven Projects Profiles Execute Maven Goal m v hel...](Exported%20image%2020260702225207-17.png)

点击后弹出如下图窗口

![OK Indent 4 spaces Show Settings Match Case 2 Word...](Exported%20image%2020260702225210-18.png)

`3.2.10`**运行结果**

![i localhost8080maven 0](Exported%20image%2020260702225216-19.png)
