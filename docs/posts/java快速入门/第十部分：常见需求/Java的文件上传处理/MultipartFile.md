---
title: MultipartFile
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
`MultipartFile` 是 Spring Framework 中处理文件上传的一个接口，它是用来处理由 HTTP 请求上传的文件。这个接口提供了一些方法来帮助开发者在后端轻松地获取和处理这些文件。下面是 `MultipartFile` 的一些主要方法和属性的介绍：

1. **获取文件名**:
- `String getOriginalFilename()`：返回客户端文件系统中的原始文件名。

2. **获取文件内容**:
- `byte[] getBytes()`：返回文件的内容为字节数组。
- `InputStream getInputStream()`：返回一个 `InputStream`，可以用来读取文件的内容。

3. **获取文件大小**:
- `long getSize()`：返回文件的大小，以字节为单位。

4. **获取文件的MIME类型**:
- `String getContentType()`：返回文件的MIME类型，例如 "image/jpeg"。

5. **文件是否为空**:
- `boolean isEmpty()`：检查上传的文件是否为空，即没有内容。

6. **保存文件**:
- `void transferTo(File dest)`：将上传的文件保存到服务器上指定的路径。
- `void transferTo(Path dest)`：Java 8 及以上版本，可以直接传递 `Path` 类型的参数来保存文件。

这些方法使得 `MultipartFile` 成为处理上传文件时一个非常实用的工具。例如，你可以通过 `getOriginalFilename()` 获取上传文件的原始名称，通过 `getBytes()` 或 `getInputStream()` 读取文件的内容，使用 `getSize()` 来获取文件的大小，利用 `getContentType()` 检查文件类型，以及使用 `transferTo()` 方法将文件保存在服务器上的指定位置。

使用这些方法，开发者可以方便地集成文件上传功能到他们的应用中，而无需担心文件的接收和存储的底层细节。
