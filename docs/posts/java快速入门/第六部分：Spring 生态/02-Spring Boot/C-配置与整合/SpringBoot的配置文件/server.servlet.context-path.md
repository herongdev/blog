---
title: server.servlet.context-path
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
server.servlet.context-path=/samples-springboot-back，这个配置起什么作用

在 Spring Boot 应用中，server.servlet.context-path 是用来设置应用的上下文路径（Context Path）的。简单来说，这就是你的应用在 URL 中的基础路径。
例如，如果你设置了：
server.servlet.context-path=/samples-springboot-back
那么，所有的应用路由都会在这个基础路径下。假设你有一个处理 GET 请求的方法，映射到 /hello，那么完整的访问路径将会是：http://\<your-server\>:\<port\>/samples-springboot-back/hello。
没有这个上下文路径的话，访问路径通常会是 [http://\<your-server\>:\<port\>/hello](http://<your-server>:<port>/hello)。

这在以下几种情况下特别有用：

1. 当你想把多个应用都部署在同一个服务器上，但又想避免路径冲突时。
2. 当你的应用是一个微服务，并且你想通过一个网关来统一地管理访问路径时。
3. 当你想在某个基路径下对外提供 API，使得这些 API 的路径更符合逻辑或更易于管理时。

注意：这个配置项在 Spring Boot 2.x 中适用。在早期版本的 Spring Boot 和传统的 Spring 应用中，这个配置可能不适用或有所不同。
