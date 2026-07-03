---
title: VMware虚拟机中Linux分辨率的调整
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
默认情况下，VMware虚拟机中Linux的分辨率为800x600,看起来非常不舒服可以用以下方法调整虚拟机的分辨率。

（1）启动linux 进入到图形界面

（2）点击VM下来菜单中的Install vmare tools

(3)此时在桌面弹出一个文件夹VMware Tools,里面有VMwareTools-8.4.6-385536.tar.gz这个软件包

（4）将此软件包拷贝到/root目录下

（5）打开终端切换到/root目录下解压软件包，tar -zxvf VMwareTools-8.4.6-385536.tar.gz 的到一个目录vmware-tools-distrib

（6）切换到目录vmware-tools-distrib，运行里面的文件vmware-install.pl，./vmware-install.pl

(7)然后根据提示一路enter,最后会有一个分辨率的列表出来，根据自己显示器的分辨率给虚拟机选择合适的分辨率

（8）然后reboot即可
```
