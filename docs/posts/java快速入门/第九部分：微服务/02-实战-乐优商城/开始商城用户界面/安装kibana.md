---
title: 安装kibana
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
大概过程：下载，解压，配置，试运行，在浏览器中运行

下载地址：https://www.elastic.co/cn/downloads/kibana，下载时注意与elasticsearch的版本匹配，

解压到合适目录，

先修改一下配置

进入kibana/config/目录，vim kibana.yml，主要修改：
![The Kibana server server. name your elasticsearch....](Exported%20image%2020260702235641-0.png)

- 试运行，使用bin文件中的命令打开：
- ./bin/kibana
- 提示：

![rootlocalhost bin klbana 09 5613.642 info log Read...](Exported%20image%2020260702235647-1.png)

`在浏览器中打开上述地址即可进入页面`

![kibana Discover Visualize Dashboard Timelion Dev T...](Exported%20image%2020260702235650-2.png)

kibana发请求是对我们普通请求方式的简化，如POST _analyze
实际上相当于方法为POST，地址为http://192.168.199.130:9200/_analyze，其中的主机地址，我们在安装Elasticsearch时配置过了。
```
