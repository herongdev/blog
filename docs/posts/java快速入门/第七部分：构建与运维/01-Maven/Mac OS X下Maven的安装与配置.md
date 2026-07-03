---
title: Mac OS X下Maven的安装与配置
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
1. 下载最新版 Maven：访问 [Apache Maven 官网](https://maven.apache.org/download.cgi) 下载最新版本的 Maven。
2. 配置环境变量：解压下载的 Maven，并配置系统的环境变量。
    - 设置环境变量，例如在.bash_profile中添加以下行：

    export M2_HOME=/Users/robbie/apache-maven-3.3.3
    export PATH=$PATH:$M2_HOME/bin

    - source ~/.bashrc重新加载配置文件。
    - 关掉是所有终端并重启。
3. 验证安装：运行 mvn -v 来确认 Maven 已正确安装，并显示版本信息。
4. 如果遇到以下异常，重新编辑`bash_profile`文件，增加`export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_11.jdk/Contents/Home`后，并重新运行`$ source ~/.bash_profile`即可。
![Exported image](Exported%20image%2020260702224927-0.png)

exception

![0](Exported%20image%2020260702224935-1.png)

new bash_profile

![j 8114 her .bbieS 83.24 3.3 locle llTF8 to.to.a, 6...](Exported%20image%2020260702224937-2.png)
