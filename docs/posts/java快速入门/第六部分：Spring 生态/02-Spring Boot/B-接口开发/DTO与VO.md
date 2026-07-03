---
title: DTO与VO
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
在常见的命名约定中：

- DTO (Data Transfer Object) 通常用于在层之间（如控制层、服务层、持久层）传输数据。
- VO (View Object) 通常用于表示视图层的数据对象，即数据从服务层返回到前端的对象。
-

因此，对于描述请求参数：

- 如果该对象只在控制层与服务层之间传递（例如，由控制器接收并传给服务层进行处理），则使用 DTO 会更合适。
- 如果该对象用于控制层返回给前端的响应，那么 VO 更合适。

基于上述情况，既然您正在描述的是请求参数，FetchFormSettingsDTO 是更合适的命名。
