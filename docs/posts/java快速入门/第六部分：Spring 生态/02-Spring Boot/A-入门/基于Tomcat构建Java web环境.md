---
title: 基于Tomcat构建Java web环境
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
**应用场景**
`Tomcat`是一个被广泛使用的`Java Web`应用服务器。本文介绍了在华为云弹性云服务器上部署`Java Web`环境的操作步骤。首先需要下载部署`Java Web`环境所需的安装包，并将安装包上传至云服务器，然后设置弹性云服务器安全组规则，再安装并配置相关软件，完成开发环境的配置。
本文使用的云服务器以华为云`CentOS 7.3 64bit`操作系统云服务器为例。
**方案架构**
图`1` 基于`Tomcat`构建`Java web`环境示意图

![P 1 tmIC.MP 0 000 2 0 CP 8080 0 000 ava Web IP IP](Exported%20image%2020260702230652-0.png)

**资源和成本规划**

|   |   |   |
|---|---|---|
|**资源**|**资源说明**|**成本说明**|
|虚拟私有云`VPC`|`VPC`网段：`192.168.0.0/16`|免费|
|虚拟私有云子网|- 可用区：可用区`1`<br>- 子网网段：`192.168.0.0/24`|免费|
|安全组|入方向规则`1`：<br><br>- 协议`/`应用：`ICMP`<br>- 端口：全部<br>- 源地址：`0.0.0.0/0`<br><br>入方向规则`2`：<br><br>- 协议`/`应用：`TCP`<br>- 端口：`8080`<br>- 源地址：`0.0.0.0/0`|免费|
|弹性云服务器|- 计费模式：包年`/`包月<br>- 可用区：可用区`1`<br>- 规格：`s6.large.2`<br>- 镜像：`CentOS 7.3 64bit`<br>- 系统盘：`40G`<br>- 弹性公网`IP`：现在购买<br>- 线路：全动态`BGP`<br>- 公网带宽：按流量计费<br>- 带宽大小：`5 Mbit/s`|`ECS`涉及以下几项费用：<br><br>- 云服务器<br>- 云硬盘<br>- 弹性公网`IP`<br><br>具体的计费方式及标准请参考[计费说明](https://support.huaweicloud.com/productdesc-ecs/ecs_01_0065.html)。|
|`jdk`|`Java`开发工具软件。  <br>获取方式：  <br><br>`|`tomcat`|是一款开源的`Web`应用服务器。  <br>获取方式：  <br><br>`<br>http://tomcat.apache.org/download-80.cgi<br>```|免费|
|`PuTTY`|跨平台远程访问工具。用于在软件安装过程中在`Windows`系统上访问云服务器。  <br>获取方式：  <br><br>```<br>http://www.putty.org/<br>```|免费|
|`WinSCP`|跨平台文件传输工具。用于在`Windows`系统和`Linux`系统间传输文件。  <br>获取方式：  <br><br>```<br>http://winscp.net/<br>```|免费|

表`1` 资源和成本规划
说明：
[表](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0114925482.html#ZH-CN_TOPIC_0114925482__table1538816307558)`1`中为`jdk`和`tomcat`官方获取地址，您还可以参考其他开源镜像地址获取安装包。
 安装流程

![i va web JDK Tomcat](Exported%20image%2020260702230654-1.png)

**实施步骤**
**安装前准备**

- 创建弹性云服务器，且弹性云服务器已绑定弹性公网`IP`。
- 登录弹性云服务器，执行如下命令，新建`jdk`目录和`tomcat`目录。

    ```
    ￼cd /home/￼mkdir webDemo￼cd

    webDemo/￼mkdir jdk￼mkdir tomcat
    ```

- 您可以选择将安装包下载至本地后使用文件传输工具将安装包上传至云服务器。或者选择使用`wget`命令直接下载安装包至云服务器。
- 方法一：使用文件传输工具上传安装包至云服务器。
- 使用`WinSCP`工具上传`jdk`软件包至云服务器`jdk`文件夹。
- 使用`WinSCP`工具上传`tomcat`软件包至云服务器`tomcat`文件夹。
- 方法二：使用`wget`命令直接下载安装包至云服务器。

具体操作

1. 执行如下命令，进入`jdk`目录。

    ```
    ￼cd /home/webDemo/jdk
    `2. 执行如下命令，下载`jdk`软件包。`
    ￼wget
    ```

     `jdk`**软件包下载地址**`￼`请参考[表](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0114925482.html#ZH-CN_TOPIC_0114925482__table1538816307558)`1`查询`jdk`下载地址，或者使用其他开源镜像地址获取安装包。`￼`例如：我们以

    ```
    jdk17
    ```

    为例，在列表中查看可用的`JDK`软件包版本，以`jdk-17_linux-x64_bin.tar.gz`安装包为例，执行以下命令。

    ```
    ￼wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz
    `3. 执行如下命令，进入`tomcat`目录。`
    ￼cd /home/webDemo/tomcat
    ```

4. 执行如下命令，下载`tomcat`软件包。`￼`请参考[表](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0114925482.html#ZH-CN_TOPIC_0114925482__table1538816307558)`1`查询`tomcat`下载地址，或者使用其他开源镜像地址获取安装包。

    ```
    ￼wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-x/vx.x.xx/bin/apache-tomcat-x.x.xx.tar.gz￼
    ```

    例如：单击[开源镜像地址](https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/)，查询当前可用版本，以`v8.5.78`版本安装包为例，执行以下命令。

    ```
    ￼wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.78/bin/apache-tomcat-8.5.78.tar.gz
    ```

     `--no-check-certificate`

**设置弹性云服务器安全组规则**

1. 单击弹性云服务器名称，查看弹性云服务器详情，在弹性云服务器详情页面，选择“安全组”。
2. 在“安全组”界面，单击“更改安全组规则”，进入安全组详情界面。
3. 在安全组详情界面，单击“添加规则”，弹出添加规则窗口。
4. 根据界面提示配置安全组规则。

部署`JavaWeb`环境需为弹性云服务器添加两个安全组规则。

1. 为云服务器添加`ICMP`安全组规则。`￼`如果云服务器默认设置是禁止`ICMP`规则，当`ping`弹性服务器`IP`时会显示超时。因此首先为云服务器添加`ICMP`规则。`￼`图`3` 添加`ICMP`规则

![O default 1 O 0](Exported%20image%2020260702230658-2.png)

1. 为云服务器添加`web`项目分配端口的访问规则，以`8080` 端口为例。`￼`图`4` 添加`8080`端口

![O default 808D 1 O 0](Exported%20image%2020260702230703-3.png)

**安装**`jdk`

1. 执行如下命令，进入`jdk`目录。

    ```
    ￼cd /home/webDemo/jdk
    `2. 解压`jdk`安装包到`jdk`目录下。`
    ￼tar -xvf jdk-17_linux-x64_bin.tar.gz -C
    - `/home/webDemo/jdk/`
- 3. 配置环境变量。

    ￼vi /etc/profile
    `4. 在底部添加以下内容。`
    ￼#set java environment￼JAVA_HOME=/home/webDemo/jdk/jdk-17.0.x￼JRE_HOME=$JAVA_HOME￼PATH=$JAVA_HOME/bin:$PATH￼CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JRE_HOME/lib/tools.jar￼export JAVA_HOME JRE_HOME PATH CLASSPATH
    - 说明：`￼`“`jdk-17.0.x`”表示`jdk`安装包的具体版本，实际值需要从步骤
- `2`
- 的返回值中获取。`￼`例如：`jdk-17.0.3`
- 6. 执行以下命令保存并退出。

    ￼:wq
    `7. 执行以下命令使`/etc/profile`里的配置生效。`
    ￼source /etc/profile
    `8. 验证安装。`
    ￼java -version￼
    `回显信息如下所示验证安装`jdk`成功。`
    ￼[root@ecs-c525-web ~]# java -version￼java version "17.0.3" 2022-01-18 LTS￼Java(TM) SE Runtime Environment (build 17.0.3+8-LTS-86)￼Java HotSpot(TM) 64-Bit Server VM (build 17.0.3+8-LTS-86, mixed mode, sharing)
    - 安装`tomcat`
- 1. 执行如下命令，进入`tomcat`目录。

    ￼cd /home/webDemo/tomcat
    `2. 解压`tomcat`安装包到`tomcat`目录下。`
    ￼tar -xvf apache-tomcat-x.x.xx.tar.gz -C /home/webDemo/tomcat/￼
    `例如：以`v8.5.78`版本安装包为例，执行以下命令。`
    ￼tar -xvf apache-tomcat-8.5.78.tar.gz -C /home/webDemo/tomcat/
    `3. 进入`tomcat`的`bin`目录，执行以下命令安装`tomcat`。`
    ￼cd

    /home/webDemo/tomcat/apache-tomcat-x.x.xx/￼cd bin/￼
    `例如：以`v8.5.78`版本安装包为例，执行以下命令。`
    ￼cd

    /home/webDemo/tomcat/apache-tomcat-8.5.78/￼cd bin/
    `4. 执行如下命令编辑`setclasspath.sh`脚本。`
    ￼vi setclasspath.sh￼
    ```

    并在`setclasspath.sh`脚本底部添加以下内容。`￼`请根据[资源和成本规划](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0114925482.html#ZH-CN_TOPIC_0114925482__section29791646185815)中`jdk`的版本号替换如下内容中的`jdk`版本号。

    ```
    ￼export JAVA_HOME=/home/webDemo/jdk/jdk-17.0.3￼export JRE_HOME=$JAVA_HOME
    `5. 执行如下命令保存后退出。`
    ￼:wq
    `6. 可输入以下命令启动`tomcat`。`
    ￼./startup.sh
    `7. 执行如下命令查看`tomcat`进程。`
    ￼ps -ef | grep tomcat￼
    ```

    若返回如下图所示，表示`tomcat`启动成功。`￼`图`5` 查看`tomcat`进程

![rootecs5deZ bin ps ef grep tormdt 1 4 1652 ttyl .3...](Exported%20image%2020260702230705-4.png)

**验证**`JavaWeb`**环境搭建完成**
在浏览器输入以下内容。

http://
`**云服务器弹性公网**`
IP:8080
 如果界面跳转至默认的`Tomcat`界面，证明`JavaWeb`环境搭建完成。我们就可以在公网访问云服务器的`8080`端口了。
图`6` 访问云服务器的`8080`端口

![Apache Tomcat,8.5.78 Home Documentation Configurat...](Exported%20image%2020260702230707-5.png)
\> 来自

 \<https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0114925482.html\>
```
