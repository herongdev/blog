---
title: ngnix配置
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
找到ngnix目录，找到
F:\nginx-1.16.1\conf下的nginx.conf文件，修改配置
修改如下server内容
    server {
        listen       80;
        server_name  manage.leyou.com;

proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Server $host;
proxy_set_header X-Forwarded-For $proxy_add_X_forwarded_for;

        location / {
            proxy_pass [http://192.168.1.10:9001](http://192.168.1.10:9001);
proxy_connect_timeout 600;
proxy_read_timeout 600;
        }
    }
server {
        listen       80;
        server_name  api.leyou.com;

proxy_set_header X-Forworded-Host $host;
proxy_set_header X-Forworded-Server $host;
proxy_set_header X-Forworded-For $proxy_add_X_forwarded_for;

        location / {
            proxy_pass [http://192.168.1.10:10010](http://192.168.1.10:10010);
proxy_connect_timeout 600;
proxy_read_timeout 600;
        }
    }

访问流程
本机在使用浏览器访问域名时，通过修改本地hosts文件，定向到了虚拟机的ip地址，虚拟机nginx在得到请求后，监听默认的80端口号，根据来源域名，反向代理到了本机服务器不同端口的服务。
 ![Exported image](Exported%20image%2020260702233945-0.png)

不同域名都定向到了虚拟机的ip地址

对于所有域名的访问，先要经过微服务ly-gateway，在它的配置文件application.yml中，我们配置了不同域名对应的服务，比如监听本地服务器的10010端口，对所有/api前缀开头的域名，使其定向到/item/**微服务
![Iserver port 18818 sprung application name api gat...](Exported%20image%2020260702233948-1.png)

`也可以利用谷歌浏览器的XShost来实现这种域名到本地服务器不同商品服务的对应`

![v Current Jiayx Jinpq td wan g zy leyou 11 proxy ....](Exported%20image%2020260702233950-2.png)
