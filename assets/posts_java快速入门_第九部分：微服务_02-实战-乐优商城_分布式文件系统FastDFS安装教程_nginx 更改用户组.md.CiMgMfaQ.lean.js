import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"nginx 更改用户组","description":"","frontmatter":{"title":"nginx 更改用户组","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx 更改用户组.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx 更改用户组.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx 更改用户组.md"};function t(c,a,o,u,r,g){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"为什么要更改 Nginx 服务的默认用户：就像更改 ssh 的默认 22 端口一样，增加安全性，Nginx 服务的默认用户是 nobody ，我们更改为 nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法一：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"为 nginx 添加用户")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"useradd nginx -s /sbin/nologin -M")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"更改 Nginx 配置文件")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"worker_processes 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"user nginx nginx; # 指定Nginx服务的用户和用户组")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"events {")]),s(`
`),n("span",{class:"line"},[n("span",null,"worker_connections 1024;")]),s(`
`),n("span",{class:"line"},[n("span",null,"http {")]),s(`
`),n("span",{class:"line"},[n("span",null,"include mime.types;")]),s(`
`),n("span",{class:"line"},[n("span",null,"default_type application/octet-stream;")]),s(`
`),n("span",{class:"line"},[n("span",null,"sendfile on;")]),s(`
`),n("span",{class:"line"},[n("span",null,"keepalive_timeout 65;")]),s(`
`),n("span",{class:"line"},[n("span",null,"server_tokens off;")]),s(`
`),n("span",{class:"line"},[n("span",null,"server {")]),s(`
`),n("span",{class:"line"},[n("span",null,"listen 80;")]),s(`
`),n("span",{class:"line"},[n("span",null,"server_name [www.abc.com](http://www.abc.com);")]),s(`
`),n("span",{class:"line"},[n("span",null,"location / {")]),s(`
`),n("span",{class:"line"},[n("span",null,"root html/www;")]),s(`
`),n("span",{class:"line"},[n("span",null,"index index.html index.htm;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法二：在编译Nginx软件时直接指定编译的用户和组，命令如下")]),s(`
`),n("span",{class:"line"},[n("span",null,"./configure --user=nginx --group= nginx --prefix.............")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"最后，重新加载nginx 并且 验证是否生效，可在root用户下操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"启动：")]),s(`
`),n("span",{class:"line"},[n("span",null,"nginx可以通过命令行来启动，操作命令")]),s(`
`),n("span",{class:"line"},[n("span",null,"启动：nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"停止：nginx -s stop")]),s(`
`),n("span",{class:"line"},[n("span",null,"重新加载：nginx -s reload")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看nginx进程信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"ps -ef | grep nginx")])])])])],-1)])])}const m=l(i,[["render",t]]);export{d as __pageData,m as default};
