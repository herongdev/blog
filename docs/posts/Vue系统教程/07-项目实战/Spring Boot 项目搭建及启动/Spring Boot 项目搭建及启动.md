---
title: "Spring Boot 项目搭建及启动"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "Spring Boot 项目构建 版本管理工具选择的是 Maven 。 使用 Spring Initializr 构建 Spring 官方提供了 Spring Initializr 来进行 Spring Boot 的快速构建，这是一个在线生成 Spring Boot 基础项目的工。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/Spring Boot 项目搭建及启动/Spring Boot 项目搭建及启动.md"
---
::: v-pre

# Spring Boot 项目搭建及启动

> 本节目标：理解“Spring Boot 项目搭建及启动”的核心思路，并能把它用于实际开发或面试表达。
`Spring Boot` **项目构建**
==版本管理工具选择的是== `Maven`==。==
**使用** `Spring Initializr` **构建**
`Spring` ==官方提供了== `Spring Initializr` ==来进行== `Spring Boot` ==的快速构建，这是一个在线生成== `Spring Boot` ==基础项目的工具，我们可以将其理解为== `Spring Boot` ==的“创建向导”，接下来我们使用这个在线向导来快速的创建一个== `Spring Boot` ==骨架工程。==

- ==首先，打开在浏览器中输入== `Spring Initializr` ==的网站地址：==

    ```
    start.spring.io
    ```

- ==之后可以看到页面上需要我们填写和选择项目的基础信息，依次填写即可==
- ==最后点击页面底部的“==`Generate`==”按钮即可获取到一个== `Spring Boot` ==基础项目的代码压缩包==

**通过** `IDEA` **创建**
==由于== `IDEA` ==编辑器中也集成了== `Spring Initializr` ==工具，也可以使用== `IDEA` ==完成== `Spring Boot` ==项目的初始化创建。==

1. ==点击新建项目，之后弹出新建项目框==
2. ==选择== `Spring Initializr` ==选项，单击== `Next` ==按钮，也会出现上述类似的配置界面==
3. ==填写相关内容后，单击== `Next` ==按钮，选择依赖的包再单击== `Next` ==按钮==
4. ==接下来是选择== `Spring Boot` ==版本选择以及场景导入，选择需要的版本和场景即可，单击== `Next` ==按钮==
5. ==如果确认无误后点击== `Finish` ==按钮即可完成== `Spring Boot` ==项目的创建==

**选择和设置的配置项说明**
`Project Metadata`

- ==“== `GroupID` ==”== ==是项目组织唯一的标识符，实际对应== `Java` ==的包结构，是== `main` ==目录里== `Java` ==的目录结构，本项目就将其设置为== `ltd.newbee.mall`==。==
- ==“== `ArtifactID` ==”== ==是项目的唯一的标识符，实际对应项目的名称，也就是项目根目录的名称，名为== `newbee-mall`==。==
- ==“== `Type` ==”== ==可以简单理解为项目管理工具，可以选择== `Maven` ==构建或者== `Gradle` ==构建，本项目选用的是常用的== `Maven` ==方式。==
- ==“== `Language` ==”== ==表示编程语言的选择，现在支持== `Java` ==、==`Kotlin` ==和== `Groovy`==。==
- ==“== `Packaging` ==”== ==表示项目的打包方式，有两种选择：==`Jar` ==和== `War`==，在== `Spring Boot` ==生成后，如果选用的方式不同，那么导入的打包插件也有区别。==
- ==“== `Java Version` ==”== ==表示== `JDK` ==版本的选择。==
- ==“== `Version` ==”== ==是项目版本号，==`IDEA` ==默认为== `0.0.1-SNAPSHOT`==，也可以自行修改。==

==剩下的就是项目的一些基本信息了，可以自行设置，这些配置项其中几个需要选择，其他的配置都可以根据个人习惯或者公司要求来做，是一个较为主观的事情。==
`Dependencies`
==如图所示，==`Spring Boot` ==版本我们选择的是稳定版本== `2.1.0` ==，当然也可以选择其他的稳定版本，版本的选择视项目要求而定，左侧== ==“==`Dependencies`==”== ==表示添加到项目所依赖的== `Spring Boot` ==组件，也是根据项目要求来选择，需要哪些场景就直接选择相应模块即可，与== `SpringBoot Initializr` ==构建方式类似，也可以多选，本次演示选择了== `Web` ==模块。==
`mvn` **命令行创建** `Spring Boot` **项目**
==打开命令行并将目录切换到对应的文件夹中，之后运行以下命令：==
`mvn archetype:generate -DinteractiveMode=false -DgroupId=ltd.newbee.mall -DartifactId=newbee-mall -Dversion=0.0.1-SNAPSHOT`
==在构建成功后可以生成骨架项目，但是由于生成的项目仅仅是骨架项目，因此== `pom.xml` ==文件中需要自己添加依赖，主方法启动类也需要自行添加，没有以上两种方式方便快捷，因此不是特别推荐。==
**直接打开**
==最后一种方式是直接通过== `IDEA` ==导入== `Spring Boot` ==项目，如果电脑中已经存在== `Spring Boot` ==项目则直接打开即可，点击== ==“== `Import Project` ==”== ==跳出文件选择框，点击选择想要导入的项目目录直接打开，之后一直点击== `next` ==按钮即可，最终导入成功就可以进行== `Spring Boot` ==项目开发了。==

:::
