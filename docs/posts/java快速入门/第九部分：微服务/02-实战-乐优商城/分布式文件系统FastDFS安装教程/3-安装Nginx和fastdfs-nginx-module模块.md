---
title: 3-安装Nginx和fastdfs-nginx-module模块
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`**安装****Nginx****所需依赖**`

`yum -y install pcre pcre-devel`  
`yum -y install zlib zlib-devel`  
`yum -y install openssl openssl-devel`

==解压====nginx====：====tar -zxvf nginx-1.15.2.tar.gz==

==解压====fastdfs-nginx-module====：====tar -xvf V1.20.tar.gz==

- 配置mod_fastdfs.conf
    # 将src目录下的mod_fastdfs.conf复制到 /etc/fdfs目录：
  sudo cp mod_fastdfs.conf /etc/fdfs/
  # 编辑该文件
  sudo vim /etc/fdfs/mod_fastdfs.conf
  
- 修改一下配置：
  connect_timeout=10                        # 客户端访问文件连接超时时长（单位：秒）
  tracker_server=192.168.56.101:22122   # tracker服务IP和端口
  url_have_group_name=true                  # 访问链接前缀加上组名
  store_path0=/home/dfs               # 文件存储路径

==进入====nginx====目录：====cd nginx-1.10.1==

==配置，并加载====fastdfs-nginx-module====模块：====￼====./configure --prefix=/usr/local/nginx --add-module=/home/herong/fastdfs-nginx-module-1.20/src==

==./configure --prefix=====/usr/local/nginx --add-module=/usr/muyou/dev/nginx/fastdfs====-nginx-====module====-====master====/====src==    _#__解压后__fastdfs-nginx-module__所在的位置_
==执行====./configure --prefix=/opt/nginx --sbin-path=/usr/bin/nginx --add-module=/home/leyou/fdfs/fastdfs-nginx-module/src==
==在编译====Nginx====软件时====可====直接指定编译的用户和组，命令如下：==
==./configure --user=nginx --group= nginx --prefix.............==

==编译安装：====￼====make====￼====make install====￼==

==查看安装路径：====whereis nginx==
![whereis nginx nginx usrlocalnginx](Exported%20image%2020260702234623-0.jpeg)

==启动、停止：====￼====cd /usr/local/nginx/sbin/====￼====./nginx== ==￼====./nginx -s stop== ==#====此方式相当于先查出====nginx====进程====id====再使用====kill====命令强制杀掉进程====￼====./nginx -s quit #====此方式停止步骤是待====nginx====进程处理任务完毕进行停止====￼====./nginx -s reload====￼==

==验证启动状态：====wget "====http://127.0.0.1===="==
![roothzabj mind204 usrlocalsrc wget http127...1 201...](Exported%20image%2020260702234625-1.jpeg)

`==查看此时的====nginx====版本：发现====fastdfs====模块已经安装好了==`

![roothzabj usrlocalnginxsbinnginx V nginx version n...](Exported%20image%2020260702234628-2.jpeg)

**8.****配置****Nginx****和****fastdfs-nginx-module****模块**
**配置****nginx****，****80****端口****server****增加****location****如图：****￼****vim /usr/local/nginx/conf/nginx.conf**
==#====添加如下配置==
==server {==
    ==listen       8888====;==    ==##== ==该端口为====storage.conf====中的====http.server_port====相同==
    ==server_name  localhost====;==
    ==location== ==~====/group[0-9]/ {==
        ==ngx_fastdfs_module====;==
    ==}==
    ==error_page   500 502 503 504  /50x.html====;==
    ==location = /50x.html {==
    ==root   html====;==
    ==}==
==}==
==#====测试下载，用外部浏览器访问刚才已传过的====nginx====安装包====,====引用返回的====ID==
==http://192.168.52.1:8888/group1/M00/00/00/wKgAQ1pysxmAaqhAAA76tz-dVgg.tar.gz==
==#====弹出下载单机部署全部跑通==
```
