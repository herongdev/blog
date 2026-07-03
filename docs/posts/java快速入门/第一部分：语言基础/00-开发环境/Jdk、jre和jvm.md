---
title: Jdk、jre和jvm
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
`Java`**虚拟机——**

- JVM
- JVM

（`Java Virtual Machine` ）：`Java`虚拟机，简称`JVM`，是运行所有`Java`程序的假想计算机，是`Java`程序的
运行环境，是`Java` 最具吸引力的特性之一。我们编写的`Java`代码，都运行在 `JVM` 之上。

**跨平台**：任何软件的运行，都必须要运行在操作系统之上，而我们用`Java`编写的软件可以运行在任何的操作系
统上，这个特性称为`Java`**语言的跨平台特性**。该特性是由`JVM`实现的，我们编写的程序运行在`JVM`上，而`JVM`
运行在操作系统上。

![winfiMJJVM Windows linfifrtJJVM Linux macFfi MJJVM...](Exported%20image%2020260703000624-0.png)

如图所示，`Java`的虚拟机本身不具备跨平台功能的，每个操作系统下都有不同版本的虚拟机。

`JRE` **和**

- JDK
- JRE (Java Runtime Environment)

：是`Java`程序的运行时环境，包含 `JVM` 和运行时所需要的 核心类库 。

`JDK (Java Development Kit)`

：是`Java`程序开发工具包，包含 `JRE` 和开发人员使用的工具。

`JDK`

是整个 `JAVA` 的核心，包括了 `Java` 运行环 境（`Java Runtime Environment`），一堆 `Java` 工具（`javac/java/jdb` 等）和 `Java` 基础的类库（即 `Java API` 包括 `rt.jar`）。 它不提供具体的开发软件，它提供的是无论你用何种开发软件写 `Java` 程序都必须用到的类库和 `Java` 语言规范。

我们想要运行一个已有的`Java`程序，那么只需安装 `JRE` 即可。
我们想要开发一个全新的`Java`程序，那么必须安装 `JDK` 。

![IQQLAPlsEJPN AmAet Java Plugin Java HotSpot Cuent ...](Exported%20image%2020260703000632-1.png)

小贴士：
三者关系： `JDK \> JRE \> JVM`

`2.3 JDK9`**安装之后**`JAVA_HOME`**环境变量的配置**
**配置环境变量作用**
开发`Java`程序，需要使用`JDK`中提供的工具，工具在`JDK9`安装目录的 `bin` 目录下。

![Javas jdk9.o.1 iava.dll java.exe javaaccessbridge....](Exported%20image%2020260703000639-2.png)

在`DOS`命令行下使用这些工具，就要先进入到`JDK`的`bin`目录下，这个过程就会非常的麻烦。

![SEN NUsers cd java9 jdk9..l bin jauac javac option...](Exported%20image%2020260703000645-3.png)

不进入`JDK`的 `bin` 目录，这些工具就不能使用，会报错。

![0 CWindowssystem32 cmd.exe jauac](Exported%20image%2020260703000652-4.png)

为了开发方便，我们想**在任意的目录下都可以使用**`JDK`**的开发工具**，则必须要配置环境变量，配置环境变量的意义
在于告诉操作系统，我们使用的`JDK`开发工具在哪个目录下。

**配置环境变量步骤**

`Windows 7,8`

**版本**

`1.`

计算机鼠标右键`,`选择 属性

`2.`

选择 高级系统设置

`3.`

高级 选项卡，点击 环境变量

`4.`

点击 新建 ，创建新的环境变量

`5.`

变量名输入 `JAVA_HOME` ，变量值输入`JDK9`的安装目录

- c:\Java9\jdk-9.0.1
- 6.

选中 `Path` 环境变量， 双击 或者 点击编辑

`7.`

在变量值的最前面，键入 `%JAVA_HOME%\bin;` 分号必须要写，必须是英文格式。

`8.`

环境变量配置完成，重新开启`DOS`命令行，在任意目录下输入 `javac` 命令，运行成功。

`Windows 10` **版本**

`1.`

文件资源管理器 `--\>` 此电脑鼠标右键 `--\>` 选择 属性

`2.`

选择 高级系统设置 `--\>` 选择 环境变量

`3.`

点击下方系统变量的 新建 ，创建新的环境变量，变量名输入 `JAVA_HOME` ，变量值输入`JDK9`的安装目录

- D:\02_DevelopTools\Java\jdk-9.0.1
- 4.

选中 `Path` 环境变量， 双击 或者 点击编辑

`5.`

点击 新建 ，键入 `%JAVA_HOME%\bin` ，必须是英文格式。选中该行，上移到最上方，点击确定。

`6.`

环境变量配置完成，重新开启`DOS`命令行，在任意目录下输入 `javac` 命令。
