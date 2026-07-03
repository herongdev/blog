---
title: Maven：Maven Profile
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
不同环境的构建很可能是不同的，典型的情况就是数据库的配置。除此之外，有些环境可能需要配置插件使用本地文件，或者使用特殊版本的依赖，或者需要一个特殊的构建名称。要想使得一个构建不做任何修改就能在任何环境下运行，往往是不可能的。为了能让构建在各个环境下方便的移植，`Maven`引入了`profile`的概念。`profile`能够在构建的时候修改`POM`的一个子集，或者添加额外的配置元素。用户可以使用很多方式激活`profile`，以实现构建在不同环境下的移植。
**针对不同环境的**`profile`
下面为测试环境和产品环境的`profile`，如下所示。

\<profiles\>
\<profile\>
\<id\>dev\</id\>
\<properties\>
\<db.driver\>com.mysql.jdbc.Driver\</db.driver\>
\<db.url\>jdbc:mysql://localhost:3306/test\</db.url\>
\<db.username\>dev\</db.username\>
\<db.password\>dev-pwd\</db/password\>
\</properties\>
\</profile\>
\<profile\>
\<id\>test\</id\>
\<properties\>
\<db.driver\>com.mysql.jdbc.Driver\</db.driver\>
\<db.url\>jdbc:mysql://localhost:3306/test\</db.url\>
\<db.username\>test\</db.username\>
\<db.password\>test-pwd\</db/password\>
\</properties\>
\</profile\>
\</profiles\>
 同样的属性在两个`profile`中的值是不一样的，`dev profile` 提供了开发环境数据库的配置，而`test profile`提供的是测试环境数据库的配置。
现在，开发人员可以在使用`mvn`命令的时候在后面加上`-Pdev`激活`dev profile`，而测试人员可以使用`-Ptest`激活`test profile`。
**激活**`profile`
为了尽可能方便用户，`Maven`支持很多种激活`Profile`的方式。
**命令行激活**
用户可以使用`mvn`命令行参数`-P`加上`profile`的`id`来激活`profile,`多个`id`之间以逗号分隔。例如，下面的命令激活了`dev-x`和`dev-y`两个`profile`：

- mvn clean install -Pdev -x,dev -y
- settings

**文件显式激活**
如果用户希望某个`profile`默认一直处于激活状态，就可以配置`settings.xml`文件的`activeProfiles`元素，表示其配置的`profile`对于所有项目都处于激活状态，如下所示。

- \<settings\>
- ...
- \<activeProfiles\>
- \<activeProfile\>dev-x\</activeProfile\>
- \</activeProfiles\>
- ...
- \</settings\>

 **系统属性激活**
用户可以配置当某系统属性存在的时候，自动激活`profile`，如下所示。

\<profiles\>
\<profile\>
\<activation\>
\<property\>
\<name\>test\</name\>
\</property\>
\</activation\>
\</profile\>
...
\</profiles\>
 可以进一步配置当某系统属性`test`存在，且值等于`x`的时候激活`profile`，如下所示。

\<profiles\>
\<profile\>
\<activation\>
\<property\>
\<name\>test\</name\>
\<value\>x\</value\>
\</property\>
\</activation\>
\</profile\>
...
\</profiles\>
 不要忘了，用户可以在命令行声明系统属性。例如：

`mvn clean install -Dtest=x`
 因此，这其实也是一种从命令行激活`profile`的方法，而且多个`profile`完全可以使用同一个系统属性来激活。
**操作系统环境激活**
`Profile`还可以自动根据操作系统环境激活，如果构建在不同的操作系统有差异，用户完全可以将这些差异写进`profile`，然后配置他们自动基于操作系统环境激活，如下所示。

\<profiles\>
\<profile\>
\<activation\>
\<os\>
\<name\>Windows XP\</name\>
\<family\>Windows\</family\>
\<arch\>x86\</arch\>
\<version\>5.1.2600\</version\>
\</os\>
\</activation\>
...
\</profile\>
\</profiles\>
 这里`family`的值包括`Windows`、`UNIX`和`Mac`等，而其他几项`name`、`arch`、`version`，用户可以通过查看环境中的系统属性`os.name`、`os.arch`、`os.version`获得。
**文件存在与否激活**
`Maven`能够根据项目中某个文件存在与否来决定是否激活`profile`，如下所示。

\<profiles\>
\<profile\>
\<activation\>
\<file\>
\<missing\>x.properties\</missing\>
\<exists\>y.properties\</exists\>
\</file\>
\</activation\>
...
\</profile\>
\</profiles\>
 **默认激活**
用户可以在定义`profile`的时候指定其默认激活，如下所示。

\<profiles\>
\<profile\>
\<id\>dev\</id\>
\<activation\>
\<activeByDefault\>true\</activeByDefault\>
\</activation\>
...
\</profile\>
\</profiles\>
 使用`activeByDefault`元素用户可以指定`profile`自动激活。不过需要注意的是，如果`POM`中有任何一个`profile`通过以上其他任意一种方式被激活了，所有的默认激活配置都会失效。
如果项目中有很多的`profile,`他们的激活方式各异，用户怎么知道哪些`profile`被激活了呢？`maven-help-plugin`提供了一个目标帮助用户了解当前激活的`profile`：

- mvn help:active-profile
- maven-help-plugin

还有另外一个目标用来列出当前所有的`profile`：

- mvn help:all-profiles
- profile

**的种类**
根据具体的需要，可以在以下位置声明`profile`：

- `pom.xml`：很显然，`pom.xml`中声明的`profile`只对当前项目有效。
- 用户`settings.xml`：用户目录下`.m2/settings.xml`中的`profile`对本机上该用户所有的`Maven`项目有效。
- 全局`settings.xml`：`Maven`安装目录下`conf/settings.xml`中的`profile`对本机上所有的`Maven`项目有效。

为了不影响其他用户且方便升级`Maven`，用户应该选择配置用户范围的`settings.xml`，避免修改全局范围的`settings.xml`文件。也正是因为这个原因，一般不会在全局的`settings.xml`文件中添加`profile`。
 \> 来自

 \<https://blog.csdn.net/en_joker/article/details/84232449\>
```
