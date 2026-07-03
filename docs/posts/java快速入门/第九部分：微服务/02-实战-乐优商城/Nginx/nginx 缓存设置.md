---
title: nginx 缓存设置
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
[![17106515](Exported%20image%2020260702233637-0.png)](https://img2018.cnblogs.com/blog/1165731/201906/1165731-20190623163943116-1290262811.png)

==Nginx====缓存配置指南==
**1.****如何配置基本缓存设置**
开启简单的缓存配置，只需要两个指令：proxy_cache_path和proxy_cache。proxy_cache_path配置缓存的存放地址和其他的一些常用配置，proxy_cache指令是为了启动缓存。

proxy_cache_path /path/to/cache levels=1:2 keys_zone=mycache:10m max_size=10g inactive=60m use_temp_path=off;￼server {￼# ...￼    location / {￼        proxy_cache mycache;￼        proxy_pass [http://my_upstream](http://my_upstream);￼    }￼}

相关配置说明如下：

**/path/to/cache** 本地路径，用来设置Nginx缓存资源的存放地址

**levels** 默认所有缓存文件都放在同一个/path/to/cache下，但是会影响缓存的性能，因此通常会在/path/to/cache下面建立子目录用来分别存放不同的文件。假设levels=1:2，Nginx为将要缓存的资源生成的key为f4cd0fbc769e94925ec5540b6a4136d0，那么key的最后一位0，以及倒数第2-3位6d作为两级的子目录，也就是该资源最终会被缓存到/path/to/cache/0/6d目录中

**key_zone** 在共享内存中设置一块存储区域来存放缓存的key和metadata（类似使用次数），这样nginx可以快速判断一个request是否命中或者未命中缓存，1m可以存储8000个key，10m可以存储80000个key

**max_size** 最大cache空间，如果不指定，会使用掉所有disk space，当达到配额后，会删除最少使用的cache文件

**inactive** 未被访问文件在缓存中保留时间，本配置中如果60分钟未被访问则不论状态是否为expired，缓存控制程序会删掉文件。inactive默认是10分钟。需要注意的是，inactive和expired配置项的含义是不同的，expired只是缓存过期，但不会被删除，inactive是删除指定时间内未被访问的缓存文件

**use_temp_path** 如果为off，则nginx会将缓存文件直接写入指定的cache文件中，而不是使用temp_path存储，official建议为off，避免文件在不同文件系统中不必要的拷贝

**proxy_cache** 启用proxy cache，并指定key_zone。另外，如果proxy_cache off表示关闭掉缓存。

 **2.proxy_cache****其他相关指令集**
**(1)proxy_no_cache**
Syntax：proxy_no_cache string ...;
Default: —￼Context: http , server , location
该指令用于定义满足条件的响应不会被保存到缓存中。在条件字符串中至少有一个条件不为空或者0，符合这样条件的响应才不会被缓存。举例如下：
proxy_no_cache $cookie_nocache $arg_nocache$arg_comment;￼proxy_no_cache $http_pragma    $http_authorization;
其中，cookie_nocache、arg_nocache...皆为变量，可以根据你访问的匹配策略来设置，其值只有2类，0和非0;
访问匹配策略例如：
if ($request_uri ~ ^/(login|register|password\/reset)/) { set $cookie_nocache 1; }
如果在此链式配置中，只要有一个值不为0，则不会cache；例如：
proxy_no_cache $cookie_nocache(0) $arg_nocache(1) $arg_comment(0)
则不会被cache。`
注：一般会配合proxy_cache_bypass共同使用；
**(2)proxy_cache_bypass**
Syntax: proxy_cache_bypass string ...;￼Default: —￼Context: http , server , location
该指令用于定义哪些情况不从cache读取，直接从backend获取资源；配置方式同proxy_no_cache。
**(3)proxy_cache_key**
Syntax: proxy_cache_key string;￼Default: proxy_cache_key $scheme$proxy_host$request_uri;￼Context: http, server, location
给缓存数据定义一个键，例如
proxy_cache_key “$host$request_uri $cookie_user”;
默认情况下，该指令的值的字符串
proxy_cache_key $scheme$proxy_host$uri$is_args$args;
**(4)proxy_cache_methods** 
Syntax: proxy_cache_methods GET | HEAD | POST ...;￼Default: proxy_cache_methods GET HEAD;￼Context: http, server, location
该指令用于设置缓存哪些HTTP方法,默认缓存HTTP GET/HEAD方法,不缓存HTTP POST 方法.。
**(5)proxy_cache_valid**
Syntax: proxy_cache_valid [code ...] time;￼Default:  —￼Context:  http, server, location
设置不同响应码的缓存时间，当不指定响应码的时候，例如
proxy_cache_valid 5m;
只对响应码为200，301，302的访问请求资源设置缓存时间，此外可以个性化定制，例如：
proxy_cache_valid 200 302 10m;
proxy_cache_valid 301 1h;
proxy_cache_valid 404 1m;
proxy_cache_valid any 1m;
此外，还可以在相应header里设置优先级更高的缓存有效时间：

“X-Accel-Expires”,设置响应的缓存过期时间，以秒为单位；0为不缓存；

如果没有设置“X-Accel-Expires” header，则关于缓存的配置策略可能会在“Expires”或者“Cache-Control” header中；

如果header含有“Set-Cookie”,则响应不会被缓存，类似的配置可以在“proxy_ignore_header”中可见；

header包含“Vary”并且设置为“＊”，则请求不会被缓存，如果“Vary”有具体的值，则对应的请求会被缓存；

**(6)proxy_ignore_headers**
Syntax:  proxy_ignore_headers field ...;￼Default:  —￼Context:  http, server, location
不缓存包含在field的响应header，可以设置的值有：“X-Accel-Redirect”, “X-Accel-Expires”, “X-Accel-Limit-Rate”，“X-Accel-Buffering”, “X-Accel-Charset”, “Expires”, “Cache-Control”, “Set-Cookie” (0.8.44), and “Vary”。
如果上述的header field没有设置为忽略，则header filed中有“X-Accel-Expires”, “Expires”, “Cache-Control”, “Set-Cookie”, and “Vary”的话，响应会被缓存。
(**7)proxy_cache_min_uses****指令**
Syntax:  proxy_cache_min_uses number;￼Default: proxy_cache_min_uses 1;￼Context: http, server, location
该指令用于设置缓存的最小使用次数,默认值为1
**3. nginx****缓存扩展**
**(1)proxy_cache_use_stale****增强站点容错能力**
源站有问题时，nginx可以通过proxy_cache_use_stale指令开启容错能力，即使用缓存内容来响应客户端的请求。举例如下：
location / {  ￼    ...  ￼    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;  ￼}
如上配置表示，当作为cache的NGINX收到源站返回error、timeout或者其他指定的5XX错误，并且在其缓存中有请求文件的陈旧版本，则会将这些陈旧版本的文件而不是错误信息发送给客户端。
**(2)****多磁盘分割缓存**
使用NGINX，不需要建立一个RAID（磁盘阵列）。如果有多个硬盘，NGINX可以用来在多个硬盘之间分割缓存。举例如下：
# 我们假设每块硬盘挂载在相应的目录中：/mnt/disk1、/mnt/disk2、/mnt/disk3￼
proxy_cache_path /mnt/disk1 levels=1:2 keys_zone=cache_1:256m max_size=1024G use_temp_path=off;￼proxy_cache_path /mnt/disk2 levels=1:2 keys_zone=cache_2:256m max_size=1024G use_temp_path=off;￼proxy_cache_path /mnt/disk3 levels=1:2 keys_zone=cache_3:256m max_size=1024G use_temp_path=off;

split_clients $request_uri $disk {￼    33.3%     1;￼    33.3%     2;￼    *         3;￼}￼
location / {￼    proxy_pass [http://backend](http://backend);￼    proxy_cache_key $request_uri;￼    proxy_cache cache_$disk;￼}

在这份配置中，使用了3个独立的缓存，每个缓存专用一块硬盘，另外，3个独立的线程池也各自专用一块硬盘。
缓存之间（其结果就是磁盘之间）的负载均衡使用split_clients模块，split_clients非常适用于这个任务。
在 proxy_cache_path指令中设置**use_temp_path=off**，表示NGINX会将临时文件保存在缓存数据的同一目录中。这是为了避免在更新缓存时，磁盘之间互相复制响应数据。
 \> 来自

 \<https://www.cnblogs.com/bdhk/p/9198499.html\>
```
