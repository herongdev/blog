---
title: Elasticsearch介绍
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
lastUpdated: false
---
::: v-pre

```
商城类网站商品的数量非常多而杂。如果快速展示出用户想要的商品，并进行合理的过滤，尽快促成交易，是搜索系统要研究的核心。

面对这样复杂的寻索业务和数据量，使用传统数据库搜索就显得力不从心，一般我们都会使用全文搜索技术，比如之前大家学习过的Solr。

还有：Elasticsearch。相比solr而言，速度更快是其主要优势。

主要过程：
下载，解压（免安装），重命名/修改权限，修改配置，试运行，报错，解决，重运行

先下载，下载地址：[https://www.elastic.co/cn/downloads/elasticsearch](https://www.elastic.co/cn/downloads/elasticsearch)

我们安装在centerOs虚拟机上安装：
一、上传到虚拟机上/home/herong目录下，解压
tar -zxvf elasticsearch-6.2.4

出于安全原因，elasticsearch不能使用root用户运行，只能使用普通用户，所以要修改文件夹普通用户运行的权限，先可使用 id herong，来查看当前用户的uid gid 和组


`目前这个文件夹的权限属于root帐户`



赋予leyou用户对这个文件夹的权限：
chown leyou:leyou elasticsearch-6.2.4/  -R(全局递归进行更改)

输入ll命令，可以看到现在这个文件属于leyou即我们指定的帐户了


`修改一下文件夹的名字，并进入，然后可以看到文件目录及文件`



`bin为运行目录，config就是配置文件目录，我们进行一下配置`



`vim jvm.options进行修改`



- 主要修改内存，因为我们的虚拟机总内存才2G，然后退出保存：Wq
- 再修改vim elasticsearch.yml文件，主要修改了路径和ip



- 保存并退出:wq
- 由于data目录没有，我们cd到elasticsearch目录下并mkdir data；
- 试启动：注意不用使用root帐户
- cd到bin目录下，并使用elasticsearch启动
- cd bin
- ./elasticsearch



- 出现三个错误，依次解决掉才行
- 可能报错:




- ==解决办法：==
- # 在最后面追加下面内容
- *** hard nofile 65536
- *** soft nofile 65536
- ***  是启动herong的用户
- 线程数量不够



`改虚拟内存`



所有的错误修改完毕后，一定要重启你的xshell终端，否则配置无效。
输入exit，断开连接，然后再输入
ssh root@192.168.199.130
进行重新连接，再次./elasticsearch命令，输出


上面是前台启动方式，一旦关闭Linux shell，ES服务就会停止。所以是实际使用过程中，绝对不会使用这种方式去启动ES。除了上面的启动方式外，还可以加上一定的启动参数。例如：
 ==./elasticsearch== ==–====d== ==#====在后台运行====Elasticsearch==
 ==./elasticsearch -d -Xmx2g -Xms2g== ==#====后台启动，启动时指定内存大小（====2G====）==
 ==./elasticsearch -d -Des.logger.level=DEBUG  #====可以在日志中打印出更加详细的信息。==

**再运行：**在浏览器中输入上图所示地址：192.168.199.130:9200，可见如下界面：


原始数据为：
{
  "name" : "9foS8uk",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "O2AYgqL6R8KcsPOBTZotKA",
  "version" : {
    "number" : "6.2.4",
    "build_hash" : "ccec39f",
    "build_date" : "2018-04-12T20:37:28.497551Z",
    "build_snapshot" : false,
    "lucene_version" : "7.2.1",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

:::
