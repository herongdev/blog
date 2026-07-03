---
title: 安装ik分词器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
- 大概过程：下载资源，解压，改名，配置，试运行，纠错，再运行
- 下载或用上传工具获取资源，将文件上传至elasticsearch/plugins/下
- 解压安装包，如果是zip格式，使用unzip 命令
- 将elasticsearch改名为ik-analyzer，并进入ik-analyzer文件夹

![heronglocalhost plugins unzip elasticsearch analys...](Exported%20image%2020260702235655-0.png)

`其中config中包含了众多配置文件：`

![heronglocalhost ik analyzer cd config heronglocalh...](Exported%20image%2020260702235658-1.png)

`其中IKAnalyzer.cfg.xml文件为全局配置文件，其主要内容有：`

![version encodingI UT F 8 DOCTYPE properties SYSTEM...](Exported%20image%2020260702235700-2.png)

`返回到elasticsearch/bin目录，执行./elasticsearch重新执行`

![04, 364j 20191123T17. 40. 10,031 20191123T17 40. 1...](Exported%20image%2020260702235703-3.png)

这表示插件使用成功

试运行：使用kibana客户端进行ik测试，打开面板，复制下图部的命令，点绿色的运行箭头，可以看到右侧的结果 ：
 ![POST analyze analyzer ik max word , text 1 4 6 7 8...](Exported%20image%2020260702235705-4.png)
![POST analyze analyzer ik smart text 1 4 6 7 8 11 1...](Exported%20image%2020260702235712-5.png)
