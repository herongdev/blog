---
title: nginx跨域配置
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
跨域资源共享（CORS）是一种机制，它使用额外的 HTTP 头来告诉浏览器让运行在一个 origin (域, 协议和端口) 上的 Web 应用被允许访问来自不同源服务器选择的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨源 HTTP 请求。出于安全考虑，浏览器禁止从跨源 HTTP 请求中读取 Response。这意味着无法使用 XMLHttpRequest 或 Fetch API 从跨源站点请求网页。然而，某些情况下，服务器可以选择接受跨源请求。CORS 是服务器端对跨源请求的一种支持。

在 Nginx 中，我们可以通过添加一些特定的 HTTP 头来配置 CORS。

以下是在 Nginx 中配置 CORS 的一般步骤：

打开你的 Nginx 配置文件。这通常在 /etc/nginx/nginx.conf 或 /etc/nginx/sites-available/default。

在 server 块内找到你想要进行跨域配置的 location 块。

在 location 块中添加如下跨域配置：

nginx
Copy code
if ($request_method = 'OPTIONS') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
add_header 'Access-Control-Max-Age' 1728000;
add_header 'Content-Type' 'text/plain; charset=utf-8';
add_header 'Content-Length' 0;
return 204;
}
if ($request_method = 'POST') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
}
if ($request_method = 'GET') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
}
上述配置允许了所有源的跨域请求，你也可以替换 * 为你需要允许的特定源。

保存你的 Nginx 配置文件。

使用 sudo nginx -t 检查你的 Nginx 配置文件是否有语法错误。

如果没有错误，使用 sudo service nginx reload 或 sudo systemctl reload nginx 重新加载配置文件使更改生效。

以上就是在 Nginx 中配置 CORS 的一般步骤。如果你有多个 location 块需要配置，只需在每个 location 块中重复以上步骤即可。
