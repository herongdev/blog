---
title: 根据MultipartFile在服务器创建文件
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
@Override
@SneakyThrows
public String createFile(String name, String path, byte[] content) {
// 根据文件内容和名称获取MIME类型
String type = FileTypeUtils.getMineType(content, name);
// 如果path为空，则使用文件内容和名称生成默认路径
if (StrUtil.isEmpty(path)) {
path = FileUtils.generatePath(content, name);
}
// 如果name为空，则使用生成的路径作为文件名
if (StrUtil.isEmpty(name)) {
name = path;
}
// 从文件配置服务中获取主文件客户端
FileClient client = fileConfigService.getMasterFileClient();
// 确保获取的文件客户端不为空
Assert.notNull(client, "客户端(master) 不能为空");
// 使用客户端上传文件，并返回URL地址
String url = client.upload(content, path, type);
// 创建文件对象，并设置相关属性
FileDO file = new FileDO();
file.setConfigId(client.getId()); // 设置文件配置ID
file.setName(name); // 设置文件名
file.setPath(path); // 设置文件路径
file.setUrl(url); // 设置文件URL
file.setType(type); // 设置文件类型
file.setSize(content.length); // 设置文件大小
// 将文件对象插入到数据库中
fileMapper.insert(file);
// 返回上传文件的URL
return url;
}
