---
title: 十四、数据库版本管理工具Flyway
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
前言
在项目中，经常会进行版本的升级。在版本升级时，就会牵扯到数据库的升级。 平时可能我们有一个文件系统保存`SQL`脚本，需要升到哪个版本就执行对应的`SQL`脚本。这样很麻烦，并且容易出错。

`Flyway`是独立于数据库的应用、管理并跟踪数据库变更的数据库版本管理工具。 用通俗的话讲，`Flyway`可以像`Git`管理不同人的代码那样，管理不同人的`SQL`脚本，从而做到数据库同步。

**具体实现**
`Maven`依赖

- \<dependencies\>
- \<dependency\>
- \<groupId\>org.flywaydb\</groupId\>
- \<artifactId\>flyway-core\</artifactId\>
- \<version\>6.0.8\</version\>
- \</dependency\>
- \</dependencies\>

插件依赖：

- \<plugins\>
- \<plugin\>
- \<groupId\>org.flywaydb\</groupId\>
- \<artifactId\>flyway-maven-plugin\</artifactId\>
- \<version\>6.0.8\</version\>
- \</plugin\>
- \</plugins\>

**文件位置**
`SQL`文件存放的目录默认为：`db/migration`

也可以通过配置`spring.flyway.locations=classpath:db/migration`修改。

**命名规范**
`SQL`文件命名规范：前缀 `+` 版本号 `+` 双下划线 `+` 描述 `+` 后缀

![Exported image](Exported%20image%2020260702230415-0.png)

也可以通过配置对命名规范进行修改，如下：

- flyway:
- #

前缀，默认

- V
- sql-migration-prefix: V
- #

文件分隔符，默认

- __
- sql-migration-separator: __
- #

后缀，默认

- .sql
- sql-migration-suffixes: .sql

版本号可以使用如下结构：

- `1`
- `001`
- `5.2`
- `1.2.3.4.5.6.7.8.9`
- `205.68`
- `20200616113556`
- `2020.6.16.11.35.56`
- `2020.06.16.11.35.56`

`SQL`**文件**
`SQL`文件里的内容就是需要更新的`SQL`脚本。比如：

DROPTABLEIF EXISTS`sys_user`;
CREATETABLE`sys_user` (
`id` INT(11) NOTNULLAUTO_INCREMENT,
`account` VARCHAR(40) NOTNULLCOMMENT '
用户名

- ',
- `password` VARCHAR(255) NOTNULLCOMMENT '

密码

- ',
- `nickname` VARCHAR(60) DEFAULTNULLCOMMENT '

昵称

- ',
- `email` VARCHAR(40) DEFAULTNULLCOMMENT '

邮箱

- ',
- `phone` VARCHAR(11) DEFAULTNULLCOMMENT '

电话

- ',
- `create_time` datetime DEFAULTNULLCOMMENT '

创建时间

- ',
- `create_user` VARCHAR(11) DEFAULTNULLCOMMENT '

创建人

- ',
- `modify_time` datetime DEFAULTNULLCOMMENT '

修改时间

- ',
- `modify_user` VARCHAR(11) DEFAULTNULLCOMMENT '

修改人

',
PRIMARYKEY (`id`)
) ENGINE =INNODB AUTO_INCREMENT =1DEFAULTCHARSET =utf8mb4;
**启动项目**
添加`Maven`配置和`SQL`脚本后，即可启动项目。
若启动成功，则出现如下信息：

![Exported image](Exported%20image%2020260702230417-1.png)

查看数据库，生成了`flyway-schema-history`表，该表用于记录执行的`SQL`信息。如下：

![Exported image](Exported%20image%2020260702230418-2.png)

该表名可以通过配置`spring.flyway.table=flyway_schema_history`修改。
除该表外还执行了配置的`SQL`脚本，生成了业务表，如下：

![Exported image](Exported%20image%2020260702230421-3.png)

若初始数据库非空，则会出现如下错误：

![Exported image](Exported%20image%2020260702230422-4.png)

可以通过配置`spring.flyway.baseline-on-migrate=true`，将当前的数据库结构设为基线版本，`SQL`脚本在基线版本上执行。

常用配置

- spring:
- flyway:
- #

开启

- flyway
- enabled: true
- #

数据库非空时，是否执行基线

- baseline-on-migrate: false
- #

执行基线版本号

- baseline-version: 1
- #

校验`SQL`文件是否存在

- check-location: true
- # SQL

文件位置

- locations: classpath:db/migration
- # SQL

文件前缀

- sql-migration-prefix: V
- # SQL

文件分隔符

- sql-migration-separator: __
- # SQL

文件后缀

- sql-migration-suffixes: .sql
- #

记录表名称

- table: flyway_schema_history
- #

目标版本
`target:`

总结
至此，我们成功的通过`Flyway`对数据库版本进行管理。
