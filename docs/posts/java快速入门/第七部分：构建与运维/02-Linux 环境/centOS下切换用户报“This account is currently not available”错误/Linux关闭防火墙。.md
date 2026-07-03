---
title: Linux关闭防火墙。
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
==按理说通过虚拟机====ip + web====服务端口，即可在浏览器访问虚拟机的====web====服务。==
==但是由于====CentOS====的防火墙问题，对应====web====端口无法访问。通过配置====CentOS====防火墙来解决。==
==CentOS 7====使用====firewalld====来管理防火墙。==

==运行==**systemctl status firewalld**==命令查看当前防火墙的状态。==
[![Exported image](Exported%20image%2020260702224804-0.png)](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)

==如果防火墙的状态参数是====inactive====，则防火墙为关闭状态。==

==如果防火墙的状态参数是====active====，则防火墙为开启状态。本示例中防火墙为开启状态，因此需要关闭防火墙。==

==关闭防火墙。如果防火墙为关闭状态可以忽略此步骤。==

==如果您想临时关闭防火墙，运行命令==**systemctl stop firewalld**==。====￼==**说明** ==这只是暂时关闭防火墙，下次重启====Linux====后，防火墙还会开启。==

==如果您想永久关闭防火墙，运行命令==**systemctl disable firewalld**==。====￼==**说明** ==如果您想重新开启防火墙，具体操作，请参见====firewalld====官网信息====。==
[![Exported image](Exported%20image%2020260702224806-1.png)](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)
\> 来自

 \<https://help.aliyun.com/document_detail/51376.html?spm=a2c4g.11186623.2.9.cdb85672PTuHBv#concept-51376-zh\>
```
