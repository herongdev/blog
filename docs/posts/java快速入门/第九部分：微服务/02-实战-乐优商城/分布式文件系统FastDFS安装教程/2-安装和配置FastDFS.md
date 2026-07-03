---
title: 2-安装和配置FastDFS
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
- ==进入目录：====cd fastdfs-5.11==
- ==执行编译：====./make.sh==
- ==安装：====./make.sh install==

![roothzabj mind204 us r local s rcfastdfs 5 .11 mkd...](Exported%20image%2020260702234524-0.jpeg)

`==查看可执行命令：====ls -la /usr/bin/fdfs*==`

![Is la usrbinfdfs rwxrxr rwxrxr rwxrxr rwxrxr rwxrx...](Exported%20image%2020260702234533-1.jpeg)

- 校验安装结果
1）安装完成，我们应该能在`/etc/init.d/`目录，通过命令`ll /etc/init.d/ | grep fdfs`看到FastDFS提供的启动脚本：
![rootloca Ihost Il . d grep fdfs rwxrxrx. 1 root ro...](Exported%20image%2020260702234540-2.png)

- 其中：
- - `fdfs_trackerd` 是tracker启动脚本
- - `fdfs_storaged` 是storage启动脚本
- 2）我们可以在 `/etc/fdfs`目录，通过命令查看到以下配置文件模板：

![rootlocalhost init.dtt cd vetczfdfs rootloca Ihost...](Exported%20image%2020260702234542-3.png)

其中：
- `tarcker.conf.sample` 是tracker的配置文件模板
- `storage.conf.sample` 是storage的配置文件模板
- `client.conf.sample` 是客户端的配置文件模板
将以下两个文件进行复制操作：
cp /usr/local/src/fastdfs/conf/http.conf /etc/fdfs/ #供nginx访问使用￼cp /usr/local/src/fastdfs/conf/mime.types /etc/fdfs/ #供nginx访问使用

**一、配置****Tracker****服务**

==进入====/etc/fdfs====目录，通过====cp====命令拷贝====tracker.conf.sample====，删除====.sample====后缀作为正式文件：==

==编辑====tracker.conf====：====vi tracker.conf====，修改相关参数====￼====#====需要修改的内容如下==

==port=22122==  ==# tracker====服务器端口（默认====22122,====一般不修改）==
==base_path=/home/dfs==  ==#== ==存储日志和数据的根目录==

==如需启动====tracker====，可使用以下方法：（支持====start|stop|restart====）：====￼====使用：====/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf start==

或使用 `sh /etc/init.d/fdfs_trackerd` 启动；；不过安装过程中，fdfs已经被设置为系统服务，我们可以采用熟悉的服务启动方式：
sudo service fdfs_trackerd start # 启动fdfs_trackerd服务，停止用stop
 ![rootloca Ihost fdfstt service fdfs_trackerd start ...](Exported%20image%2020260702234548-4.png)

- 另外，我们可以通过以下命令，设置tracker开机启动：
- sudo chkconfig fdfs_trackerd on

根据需要可为启动脚本创建软引用，因为`fdfs_trackerd`等命令在`/usr/local/bin`中并没有，而是在`/usr/bin`路径下：
`ln -s /usr/bin/fdfs_trackerd`  

- /usr/local/bin
- ln -s /usr/bin/stop.sh
- /usr/local/bin
- ln -s /usr/bin/restart.sh

 `/usr/local/bin`

`其它命令：查看端口情况：netstat -apn|grep fdfs`

![roothzabjmind204etcfdfs netstat 0 0.0.0.022122 o t...](Exported%20image%2020260702234550-5.jpeg)

==可能遇到的报错：==
==/usr/bin/fdfs_trackerd:== ==error== ==while loading shared libraries: libfastcommon.so: cannot open shared object file: No such file or directory====￼==
==解决方案：建立====libfastcommon.so====软链接==
==ln -s /usr/lib64/libfastcommon.so /usr/local/====lib/====libfastcommon.so====￼====ln -s /usr/lib64/libfastcommon.so /usr/====lib/====libfastcommon.so==

**二、配置****Storage****服务**

==进入====/etc/fdfs====目录，有====cp====命令拷贝====storage.conf.sample====，删除====.sample====后缀作为正式文件；==

==编辑====storage.conf====：====vi storage.conf====，修改相关参数，====需要修改的内容如下：====￼====port=23000==  ==# storage====服务端口（默认====23000,====一般不修改）==

==base_path=/home/dfs==  ==#== ==数据和日志文件存储根目录==
==store_path0=/home/dfs==  ==#== ==第一个存储目录==
==tracker_server=192.168.52.1:22122==  ==# tracker====服务器====IP====和端口==
==http.server_port=8888==  ==# http====访问文件的端口====(====默认====8888,====看情况修改====,====和====nginx====中保持一致====)==

==如需启动====storage====，可执行以下操作（支持====start|stop|restart====）：====￼====/usr/bin/fdfs_storaged /etc/fdfs/storage.conf start==

也可以使用 `sh /etc/init.d/fdfs_storaged` 启动，同样我们可以用服务启动方式：
sudo service fdfs_storaged start  # 启动fdfs_storaged服务，停止用stop

另外，我们可以通过以下命令，设置tracker开机启动：

sudo chkconfig fdfs_storaged on

==查看====storage====启动日志：进入刚刚指定的====base_path(/home/mm/fastdfs/storage)====中有个====logs====目录，查看====storage.log====文件==
![mkdir mkdir mkdir mkdir mkdir storage_func.c, data...](Exported%20image%2020260702234557-6.jpeg)

==此时再查看====tracker====日志：发现已经开始选举，并且作为唯一的一个====tracker====，被选举为====leader==
![20180808 INFO FastDFS v5.11, base_pathhomemmfastdf...](Exported%20image%2020260702234604-7.jpeg)

`==查看端口情况：====netstat -apn|grep fdfs==`

![roothzabjmind204etcfdfs netstat apnlgrep fdfs tcp ...](Exported%20image%2020260702234611-8.jpeg)

==通过====monitor====来查看====storage====是否成功绑定：====￼====/usr/bin/fdfs_monitor /etc/fdfs/storage.conf====￼==
![roothzabjmind204etcfdfs usrbinfdfs_monitor storage...](Exported%20image%2020260702234615-9.jpeg)
