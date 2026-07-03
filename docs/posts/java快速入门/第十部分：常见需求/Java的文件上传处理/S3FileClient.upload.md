---
title: S3FileClient.upload
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
// 上传到文件存储器
FileClient client = fileConfigService.getMasterFileClient();
Assert.notNull(client, "客户端(master) 不能为空");
String url = client.upload(content, path, type);

@Override
public String upload(byte[] content, String path, String type) throws Exception {
// 方法签名：上传文件，接受文件内容（byte数组），文件存储路径，和内容类型
// 使用 MinioClient 的 putObject 方法，配置上传参数
client.putObject(PutObjectArgs.builder()
.bucket(config.getBucket()) // 设置存储桶名称，必须指定，因为每个对象必须存储在某个桶中
.contentType(type) // 设置内容类型，如 image/jpeg 或 application/pdf，根据传入的文件类型参数
.object(path) // 设置对象键（文件存储的路径），这里作为对象在存储桶中的唯一标识
.stream(new ByteArrayInputStream(content), content.length, -1) // 设置文件内容的输入流，content.length 是文件大小，-1 表示不限制上传速率
.build()); // 构建 PutObjectArgs 对象
// 拼接并返回文件的访问 URL，通过拼接域名和文件路径
return config.getDomain() + "/" + path;
// 返回值是文件的完整访问 URL，例如 [https://your-bucket.your-endpoint.com/path/to/your/file](https://your-bucket.your-endpoint.com/path/to/your/file)
}
