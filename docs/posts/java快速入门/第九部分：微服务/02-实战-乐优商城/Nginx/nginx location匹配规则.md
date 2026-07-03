---
title: nginx location匹配规则
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`1.1 Location`**规则**
语法规则： `location [=|~|~*|^~] /uri/ {`… `}`
首先匹配 `=`，其次匹配`^~,`其次是按文件中顺序的正则匹配，最后是交给 `/`通用匹配。当有匹配成功时候，停止匹配，按当前匹配规则处理请求。

|   |   |
|---|---|
|符号|含义|
|`=`|`=` 开头表示精确匹配|
|`^~`|`^~`开头表示`uri`以某个常规字符串开头，理解为匹配 `url`路径即可。`nginx`不对`url`做编码，因此请求为`/static/20%/aa`，可以被规则`^~ /static/ /aa`匹配到（注意是空格）|
|`~`|`~` 开头表示区分大小写的正则匹配|
|`~*`|`~*` 开头表示不区分大小写的正则匹配|
|`!~`和`!~*`|`!~`和`!~*`分别为区分大小写不匹配及不区分大小写不匹配的正则|
|`/`|用户所使用的代理（一般为浏览器）|
|`$http_x_forwarded_for`|可以记录客户端`IP`，通过代理服务器来记录客户端的`ip`地址|
|`$http_referer`|可以记录用户是从哪个链接访问过来的|

匹配规则示例：

location = / {
#
规则

A
}
location = /login {
#
规则

B
}
location ^~ /static/ {
#
规则

C
}
location ~ \.(gif|jpg|png|js|css)$ {
#
规则

D
}
location ~* \.png$ {
#
规则

E
}
location !~ \.xhtml$ {
#
规则

F
}
location !~* \.xhtml$ {
#
规则

G
}
location / {
#
规则

H
}
 那么产生的效果如下：
`1.` 访问根目录`/`，比如`http://localhost/`将匹配规则

- A
- 2.

 访问

 http://localhost/login
将匹配规则`B`，`http://localhost/register`则匹配规则

- H
- 3.

 访问

 http://localhost/static/a.html
将匹配规则

- C
- 4.

 访问

 http://localhost/a.gif,http://localhost/b.jpg
将匹配规则`D`和规则`E`，但是规则`D`顺序优先，规则`E`不起作用，而`http://localhost/static/c.png`则优先匹配到规则

- C
- 5.

 访问

 http://localhost/a.PNG
则匹配规则`E`，而不会匹配规则`D`，因为规则`E`不区分大小写。
`6.` 访问

 http://localhost/a.xhtml
不会匹配规则`F`和规则`G`，`http://localhost/a.XHTML`不会匹配规则`G`，因为不区分大小写。规则`F`，规则`G`属于排除法，符合匹配规则但是不会匹配到，所以想想看实际应用中哪里会用到。
`7.` 访问

 http://localhost/category/id/1111
则最终匹配到规则`H`，因为以上规则都不匹配，这个时候应该是`nginx`转发请求给后端应用服务器，比如`FastCGI`（

`PHP`

），`tomcat`（`jsp`），`nginx`作为方向代理服务器存在。
 `1.2` **实际常用规则**
`#`直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理。
`#`这里是直接转发给后端应用服务器了，也可以是一个静态首页
`#` 第一个必选规则

location = / {
proxy_pass

http://tomcat:8080/index
}
#
第二个必选规则是处理静态文件请求，这是`nginx`作为`http`服务器的强项
`#` 有两种配置模式，目录匹配或后缀匹配`,`任选其一或搭配使用

location ^~ /static/ {
#
请求`/static/a.txt` 将被映射到实际目录文件

:/webroot/res/static/a.txt
root /webroot/res/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)${
root /webroot/res/;
 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
`#`非静态文件请求就默认是动态请求，自己根据实际把握
`#`毕竟目前的一些框架的流行，带`.php,.jsp`后缀的情况很少了

location / {
proxy_pass http://tomcat:8080/
}
1.3
 `Location`**解析过程**

![IJRlEtfi](Exported%20image%2020260702233632-0.png)

  总结：
`1`、    先判断精准命中，如果命中，立即返回结果并结束解析过程。
`2`、    判断普通命中，如果有多个命中，“记录”下来“最长”的命中结果（记录但不结束，最长的为准）。
`3`、    继续判断正则表达式的解析结果，按配置里的正则表达式顺序为准，由上至下开始匹配，一旦匹配成功`1`个，立即返回结果，并结束解析过程。
`4`、    普通命中顺序无所谓，是因为按命中的长短来确定。正则命中，顺序有所谓，因为是从前入往后命中的。
 \> 来自

 \<https://blog.csdn.net/zwl18210851801/article/details/81699977\>
```
