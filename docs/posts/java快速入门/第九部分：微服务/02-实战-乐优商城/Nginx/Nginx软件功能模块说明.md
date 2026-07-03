---
title: Nginx软件功能模块说明
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
1）Nginx核心功能模块（Coer functionality）,主要负责Nginx的全局应用，针对主配置文件Main区块和Events区块，[http://nginx.org/en/docs/ngx_core_module.html](http://nginx.org/en/docs/ngx_core_module.html%E3%80%82)（更多查看）
2）标准的http功能模块集合，[http://nginx.org/en/docs](http://nginx.org/en/docs)（可以查看更多的功能模块）
     企业应用场景功能模块汇总            
![ngx ngx ngx ngx ngx ngx ngx ngx ngx ngx ngx ngx ng...](Exported%20image%2020260702233545-0.jpeg)

[回到顶部](https://www.cnblogs.com/liang-io/p/9340335.html#_labelTop)
**Nginx****目录结构**
执行命令 tree /application/nginx   ;如果tree命令找不到就执行 yum install tree -y安装
![4 14 tree applicationnginx application nginx c I _...](Exported%20image%2020260702233551-1.png)

**Nginx****主配置文件****nginx.conf**
1.Nginx主配置文件nginx.conf是一个纯文本类型的文件（其他配置文件也是如此）Nginx整个配置文件nginx.conf主题框架：
![1 2 3 4 5 6 7 8 9 10 13 21 19 20 21 22 23 24 25 26...](Exported%20image%2020260702233558-2.jpeg)

`查看Nginx配置文件`

![egreg worker _ processes I events ezrker connectio...](Exported%20image%2020260702233603-3.png)

`Nginx配置文件`

![I user nginx nginx 2 worker_processes I 3 error _ ...](Exported%20image%2020260702233606-4.png) ![31 34 41 42 43 44 45 46 47 48 53 54 56 58 59 61 62...](Exported%20image%2020260702233612-5.png) ![66 location . 1. gifljpglipegl pnglbmplswfS 67 68 ...](Exported%20image%2020260702233616-6.png) ![102 103 104 105 107 leg lla 111 112 113 114 116 11...](Exported%20image%2020260702233623-7.png)

`与人善言，暖于布锦，伤人之言，深于矛戟`
 \> 来自

 \<https://www.cnblogs.com/liang-io/p/9340335.html\>
```
