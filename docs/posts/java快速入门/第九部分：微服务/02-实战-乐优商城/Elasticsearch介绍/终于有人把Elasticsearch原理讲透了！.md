---
title: 终于有人把Elasticsearch原理讲透了！
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
小史是一个非科班的程序员，虽然学的是电子专业，但是通过自己的努力成功通过了面试，现在要开始迎接新生活了。
![Exported image](Exported%20image%2020260702235152-0.jpeg)

`随着央视诗词大会的热播，小史开始对诗词感兴趣，最喜欢的就是飞花令的环节。`

![kafka docker](Exported%20image%2020260702235154-1.jpeg)
![Exported image](Exported%20image%2020260702235200-2.jpeg)

`但是由于小史很久没有背过诗词了，飞一个字很难说出一句，很多之前很熟悉的诗句也想不起来。`

![Exported image](Exported%20image%2020260702235202-3.jpeg)
![Exported image](Exported%20image%2020260702235204-4.jpeg)
![Exported image](Exported%20image%2020260702235206-5.jpeg)
![Exported image](Exported%20image%2020260702235208-6.jpeg)
![Exported image](Exported%20image%2020260702235211-7.jpeg)
![Exported image](Exported%20image%2020260702235213-8.jpeg)
![Exported image](Exported%20image%2020260702235218-9.jpeg)
![Exported image](Exported%20image%2020260702235220-10.jpeg)
![Exported image](Exported%20image%2020260702235222-11.jpeg)
![Exported image](Exported%20image%2020260702235223-12.jpeg)

`倒排索引`

![Exported image](Exported%20image%2020260702235225-13.jpeg)
![Exported image](Exported%20image%2020260702235227-14.jpeg)
![Exported image](Exported%20image%2020260702235231-15.jpeg)
![value key, value](Exported%20image%2020260702235236-16.jpeg)
![Exported image](Exported%20image%2020260702235237-17.jpeg)
![Exported image](Exported%20image%2020260702235240-18.jpeg)

**吕老师：**但是我让你说出带“前”字的诗句，由于没有索引，你只能遍历脑海中所有诗词，当你的脑海中诗词量大的时候，就很难在短时间内得到结果了。
![Exported image](Exported%20image%2020260702235242-19.jpeg)
![Exported image](Exported%20image%2020260702235244-20.jpeg)
![key, valueo value](Exported%20image%2020260702235247-21.jpeg)
![Exported image](Exported%20image%2020260702235249-22.jpeg)
![Exported image](Exported%20image%2020260702235255-23.jpeg)
![Exported image](Exported%20image%2020260702235259-24.jpeg)
![Exported image](Exported%20image%2020260702235305-25.jpeg)

`索引量爆炸`

![value](Exported%20image%2020260702235307-26.jpeg)
![10](Exported%20image%2020260702235309-27.jpeg)
![value 10](Exported%20image%2020260702235312-28.jpeg)
![1 10](Exported%20image%2020260702235317-29.jpeg)
![Exported image](Exported%20image%2020260702235323-30.jpeg)
![Exported image](Exported%20image%2020260702235325-31.jpeg)
![Exported image](Exported%20image%2020260702235328-32.jpeg)
![Exported image](Exported%20image%2020260702235331-33.jpeg)
![Exported image](Exported%20image%2020260702235333-34.jpeg)
![value va e i i , ,](Exported%20image%2020260702235335-35.jpeg)
![Exported image](Exported%20image%2020260702235338-36.jpeg)
![Exported image](Exported%20image%2020260702235345-37.jpeg)
![Value](Exported%20image%2020260702235348-38.jpeg)
![Exported image](Exported%20image%2020260702235350-39.jpeg)
![Exported image](Exported%20image%2020260702235352-40.jpeg)
![Exported image](Exported%20image%2020260702235355-41.jpeg)
![key value](Exported%20image%2020260702235356-42.jpeg)
![Exported image](Exported%20image%2020260702235358-43.jpeg)

`搜索引擎原理`

![Exported image](Exported%20image%2020260702235403-44.jpeg)
![Exported image](Exported%20image%2020260702235405-45.jpeg)
![Exported image](Exported%20image%2020260702235407-46.jpeg)
![Exported image](Exported%20image%2020260702235409-47.jpeg)
![Exported image](Exported%20image%2020260702235411-48.jpeg)
![Exported image](Exported%20image%2020260702235413-49.jpeg)
![Exported image](Exported%20image%2020260702235415-50.jpeg)
![Exported image](Exported%20image%2020260702235420-51.jpeg)
![Exported image](Exported%20image%2020260702235423-52.jpeg)
![Exported image](Exported%20image%2020260702235425-53.jpeg)
![0](Exported%20image%2020260702235427-54.jpeg)
![Exported image](Exported%20image%2020260702235430-55.jpeg)
![Exported image](Exported%20image%2020260702235432-56.jpeg)
![2 3](Exported%20image%2020260702235436-57.jpeg)
![Exported image](Exported%20image%2020260702235443-58.jpeg)

`Elasticsearch 简介`

![Exported image](Exported%20image%2020260702235445-59.jpeg)
![Exported image](Exported%20image%2020260702235448-60.jpeg)
![Exported image](Exported%20image%2020260702235450-61.jpeg)
![ucen](Exported%20image%2020260702235451-62.jpeg)
![ucene ucene](Exported%20image%2020260702235453-63.jpeg)

**吕老师：**但是 Lucene 还是一个库，必须要懂一点搜索引擎原理的人才能用的好，所以后来又有人基于 Lucene 进行封装，写出了 Elasticsearch。
![elasticsea h](Exported%20image%2020260702235456-64.jpeg)
![e asticsea h restful api http](Exported%20image%2020260702235501-65.jpeg)
![Exported image](Exported%20image%2020260702235503-66.jpeg)
![hd](Exported%20image%2020260702235505-67.jpeg)
![elasticsea h hadoop](Exported%20image%2020260702235507-68.jpeg)
![Exported image](Exported%20image%2020260702235509-69.jpeg)

`Elasticsearch 基本概念`

![elasticsea h](Exported%20image%2020260702235511-70.jpeg)
![key](Exported%20image%2020260702235512-71.jpeg)
![elasticsea h n sq](Exported%20image%2020260702235517-72.jpeg)
![elasticsea h](Exported%20image%2020260702235519-73.jpeg)
![mysq](Exported%20image%2020260702235522-74.jpeg)

**吕老师：**类型是用来定义数据结构的，你可以认为是 MySQL 中的一张表。文档就是最终的数据了，你可以认为一个文档就是一条记录。
![elasticsea h mysql I I I elasticsea h mysq 0](Exported%20image%2020260702235524-75.jpeg)
![elasticsea h](Exported%20image%2020260702235525-76.jpeg)
![poems](Exported%20image%2020260702235528-77.jpeg)

**吕老师：**比如一首诗，有诗题、作者、朝代、字数、诗内容等字段，那么首先，我们可以建立一个名叫 Poems 的索引，然后创建一个名叫 Poem 的类型，类型是通过 Mapping 来定义每个字段的类型。
比如诗题、作者、朝代都是 Keyword 类型，诗内容是 Text 类型，而字数是 Integer 类型，最后就是把数据组织成 Json 格式存放进去了。
![poems poem properties title type keyword, authod t...](Exported%20image%2020260702235529-78.jpeg)
![keyw d te](Exported%20image%2020260702235536-79.jpeg)
![keyword te](Exported%20image%2020260702235537-80.jpeg)

**吕老师：**这个问题问得好，这涉及到分词的问题，Keyword 类型是不会分词的，直接根据字符串内容建立反向索引，Text 类型在存入 Elasticsearch 的时候，会先分词，然后根据分词后的内容建立反向索引。
![keyword text keyword text elasticsearch](Exported%20image%2020260702235540-81.jpeg)
![e asticsea h](Exported%20image%2020260702235541-82.jpeg)
![elasticsea h http api elasticsea h httpv](Exported%20image%2020260702235543-83.jpeg)

**吕老师：**之前我们说过，Elasticsearch 把操作都封装成了 HTTP 的 API，我们只要给 Elasticsearch 发送 HTTP 请求就行。
比如使用 curl -XPUT '[http://ip:port/poems'](http://ip:port/poems'，就能建立一个名为)，就能建立一个名为 Poems 的索引，其他操作也是类似的。
![elasticsea h http api elasticsea h](Exported%20image%2020260702235545-84.jpeg)

`Elasticsearch 分布式原理`

![elasticsea h hdfs](Exported%20image%2020260702235547-85.jpeg)
![elasticsea h hdfs](Exported%20image%2020260702235553-86.jpeg)

**吕老师：**没错，Elasticsearch 也是会对数据进行切分，同时每一个分片会保存多个副本，其原因和 HDFS 是一样的，都是为了保证分布式环境下的高可用。
![master slavel slave2 elasticsea h](Exported%20image%2020260702235555-87.jpeg)
![elasticsea h masterslave](Exported%20image%2020260702235556-88.jpeg)
![elasticsearch aster master](Exported%20image%2020260702235558-89.jpeg)

**吕老师：**没错，在 Elasticsearch 中，节点是对等的，节点间会通过自己的一些规则选取集群的 Master，Master 会负责集群状态信息的改变，并同步给其他节点。
![master](Exported%20image%2020260702235600-90.jpeg)
![Slave master, master Slave master Slave](Exported%20image%2020260702235603-91.jpeg)
![mapping](Exported%20image%2020260702235604-92.jpeg)
![Exported image](Exported%20image%2020260702235610-93.jpeg)
![master, routing route](Exported%20image%2020260702235612-94.jpeg)

**吕老师：**注意，只有建立索引和类型需要经过 Master，数据的写入有一个简单的 Routing 规则，可以 Route 到集群中的任意节点，所以数据写入压力是分散在整个集群的。
![Exported image](Exported%20image%2020260702235614-95.jpeg)

`ELK 系统`

![e asticsea h](Exported%20image%2020260702235616-96.jpeg)
![elasticsearch elk e elasticsea h logstash](Exported%20image%2020260702235618-97.jpeg)

**吕老师：**其实很多公司都用 Elasticsearch 搭建 ELK 系统，也就是日志分析系统。其中 E 就是 Elasticsearch，L 是 Logstash，是一个日志收集系统，K 是 Kibana，是一个数据可视化平台。
![logstash logstash logstash kibana imm](Exported%20image%2020260702235619-98.jpeg)
![Exported image](Exported%20image%2020260702235621-99.jpeg)
![1m0](Exported%20image%2020260702235627-100.jpeg)

**吕老师：**分析日志的用处可大了，你想，假如一个分布式系统有 1000 台机器，系统出现故障时，我要看下日志，还得一台一台登录上去查看，是不是非常麻烦？
![Exported image](Exported%20image%2020260702235630-101.jpeg)
![elk](Exported%20image%2020260702235632-102.jpeg)

**吕老师：**但是如果日志接入了 ELK 系统就不一样。比如系统运行过程中，突然出现了异常，在日志中就能及时反馈，日志进入 ELK 系统中，我们直接在 Kibana 就能看到日志情况。如果再接入一些实时计算模块，还能做实时报警功能。
![elasticsea h](Exported%20image%2020260702235633-103.jpeg)
![Exported image](Exported%20image%2020260702235635-104.jpeg)
![Exported image](Exported%20image%2020260702235637-105.jpeg)

总结
小史学完了 Elasticsearch，在笔记本上写下了如下记录：

反向索引又叫倒排索引，是根据文章内容中的关键字建立索引。

搜索引擎原理就是建立反向索引。

Elasticsearch 在 Lucene 的基础上进行封装，实现了分布式搜索引擎。

Elasticsearch 中的索引、类型和文档的概念比较重要，类似于 MySQL 中的数据库、表和行。

Elasticsearch 也是 Master-slave 架构，也实现了数据的分片和备份。

Elasticsearch 一个典型应用就是 ELK 日志分析系统。

写完，又高高兴兴背诗去了。
**观书有感（朱熹）**
半亩方塘一鉴开，天光云影共徘徊。
问渠那得清如许？为有源头活水来。
作者：channingbreeze
 \> 来自

 \<http://www.sohu.com/a/306244095_463994\>
                                                                                                                                \> 来自

 \<http://www.sohu.com/a/306244095_463994\>
```
