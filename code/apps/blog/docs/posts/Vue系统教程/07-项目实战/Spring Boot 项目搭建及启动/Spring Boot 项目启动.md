---
title: "Spring Boot 项目启动"
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
description: "IDEA 中启动 在 IDEA 编辑器中，有两种方式可以启动 Spring Boot 项目： 工具栏中的 Run / Debug 按钮 右键运行 Spring Boot 的主程序类 如下图所示： 由于 IDEA 编辑器对于 Spring Boot 项目的支持非常友好，在项目导入成。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/Spring Boot 项目搭建及启动/Spring Boot 项目启动.md"
---
::: v-pre

# Spring Boot 项目启动

> 本节目标：理解“Spring Boot 项目启动”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
`IDEA` **中启动**
==在== `IDEA` ==编辑器中，有两种方式可以启动== `Spring Boot` ==项目：==

- ==工具栏中的== `Run / Debug` ==按钮==
- ==右键运行== `Spring Boot` ==的主程序类==

==如下图所示：==
==由于== `IDEA` ==编辑器对于== `Spring Boot` ==项目的支持非常友好，在项目导入成功后会被自动识别为== `Spring Boot` ==项目并进行相关配置，以上图片中的所呈现的配置效果都是== `IDEA` ==编辑自动配置的，并没有进行任何的人为设置，此时可以点击工具栏中的== `Run / Debug` ==按钮== ==来启动项目，在代码编辑栏目中，可以看到== `main()` ==方法的左侧也有一个启动图标，点击这个图标或者直接右键== `Run` ==也可以直接启动项目。==
==与普通的== `Web` ==项目相比，启动项目减少了几个中间步骤，不用去配置== `Servlet` ==容器，也不用打包并且发布到== `Servlet` ==容器再去启动，而是直接运行主方法即可启动项目，开发调试都十分方便也节省开发时间。==
`Maven`**插件启动**
==由于== `pom.xml` ==文件中引入了== `spring-boot-maven-plugin` ==插件依赖，也可以直接使用== `Maven` ==命令来启动== `Spring Boot` ==项目。==
==插件配置如下，如果== `pom.xml` ==文件中没有该== `Maven` ==插件，是无法通过这种方式启动==`Spring Boot` ==项目的，这一点需要注意。==

```
<build>    <plugins>        <plugin>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-maven-plugin</artifactId>        </plugin>    </plugins></build>
```
 ==启动过程过程如下图所示，首先点击下方工具栏中的== `Terminal` ==打开命令行窗口，之后在命令行中输入命令== `mvn spring-boot`==：==`run`==并执行该命令即可启动项目，效果与上面两种方式一样。==

`java -jar` **命令行启动**
==项目初始化时我们选择的打包方式为== `Jar` ==，因此项目开发完成进行打包时的结果是一个== `Jar` ==包，== `Java` ==运行== `Jar` ==包的命令为== `java -jar xxx.jar` ==，结合以上两个原因我们可以使用这种方式启动== `Spring Boot` ==项目，接下来我们来演示这一过程。==

- ==首先，点击下方工具栏中的== `Terminal` ==打开命令行窗口（或者打开== `CMD` ==窗口并切换到当前的代码目录）==
- ==之后使用== `Maven` ==命令将项目打包，执行命令为==

    ```
    :mvn clean package -Dmaven.test.skip=true
    ```

    ==，等待打包结果即可==
- ==打包成功后进入== `target` ==目录，==`cd target`
- ==最后就是启动已经生成的== `Jar` ==包，执行命令为==`java -jar newbee-mall-0.0.1-SNAPSHOT.jar`

==完整过程如下==`:`

==这种方式也是== `Spring Boot` ==上线时常用的启动流程，希望不熟悉的朋友都按照以上过程练习几次。==
`this is a spring boot project from idea`
==项目成功启动后，打开浏览器访问== `8080` ==端口，可以看到一个== `white label error` ==页面，这个页面是== `Spring Boot` ==的默认错误页面，由页面内容可以看出报错为== `404` ==，访问其他地址也都会是这个页面，此时的== `web` ==服务中并没有任何可访问资源，因为我们并没有在项目中增加任何一行代码，没有接口，也没有页面。==
==因此我们需要自行实现一个== `Controller` ==来测试一下== `Spring Boot` ==如何处理== `web` ==请求，接下来使用== `Spring Boot` ==做一个简单的接口实现。==
==在根目录（启动类的同级目录，不是== `src` ==目录）下新建== `controller` ==包，之后在包里新建一个== `Controller` ==类，编码如下==

```
:
import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.ResponseBody;@Controllerpublic class IdeaController {
```

==​==

```
    @GetMapping("/info")
```

==​==

```
    @ResponseBody
```

==​==

```
    public String getInfoFromIdea() {
```

==​==

```
        return "this is a spring boot project from idea";
```

==​==

```
    }}
```
 ==这段代码大家应该很熟悉，写法与== `Spring` ==项目开发的写法是相同的，这段代码的含义就是处理请求路径为== `/info` ==的== `get` ==请求，之后返回一段字符串，编码完成后重新启动项目并在浏览器中输入地址==`http://localhost:8080/info`==，可以看到已经没有错误页面，而是== `Controller` ==中的正确返回，咱们的第一个== `Spring Boot` ==项目实例就完成了！==
**总结**
==本篇文章主要是介绍如何使用== `IDEA` ==编辑器开发== `Spring Boot` ==项目，首先是== `Spring Boot` ==项目的创建，主要有以下方式：==

- `SpringBoot Initializr` ==向导构建==
- `Maven` ==命令行构建==
- ==直接导入==

==根据个人开发经验，在新建== `Spring Boot` ==项目时建议使用向导构建的方式，不要采取其他方式新建，因为向导构建的方式生成的代码比较齐全，可以直接使用，而人为采用== `Maven` ==构建的方式则需要进行== `pom.xml` ==文件配置和主程序类的编写，采用向导构建方式可以尽可能的避免人为错误的出现，也更加节省时间。==
`Spring Boot` ==项目的调试和启动方式也列举了三种：==

- `IDEA` ==直接启动==
- `Maven` ==插件启动==
- ==命令行启动==

==三种方式都很简单，在日常开发中通常是使用== `IDEA` ==上的按钮或者快捷键直接启动项目，这也比较符合大家的开发习惯，==`Maven` ==插件启动也是一种启动方式，直接运行== `mvn` ==命令或者点击== `Maven`==插件运行即可启动项目，最后是命令行启动项目的方式，这个方式一般是在服务器上部署项目时使用，因为项目上线时通常是在生产环境的服务器上，上线时直接将== `Jar` ==包传上去之后再运行== `java -jar xxx.jar`==即可。==
 \> 来自

```
 <https://juejin.im/book/6844733826191589390/section/6844733826275475469>
```
  \> 来自

```
 <https://juejin.im/book/6844733826191589390/section/6844733826275475469>
```

:::
