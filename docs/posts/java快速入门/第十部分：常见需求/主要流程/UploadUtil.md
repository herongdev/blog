---
title: UploadUtil
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
package com.ms.web.controller.tool;
// 引入相关的类和库
...
/**
* 文件上传工具类。
*/
@Component // 表示该类是一个Spring组件，可以通过@Autowired进行注入
@EnableConfigurationProperties(FileProperties.class) // 启用配置属性，并绑定FileProperties类
@RequiredArgsConstructor(onConstructor = @__(@Autowired)) // 使用Lombok生成构造函数并自动注入依赖
public class UploadUtil {
private static final Logger log = LoggerFactory.getLogger(UploadUtil.class); // 定义日志对象
private final FileProperties fileProperties; // FileProperties对象注入，用于存储文件配置属性
private static FileProperties configFileProperties; // 静态变量，用于在静态方法中访问文件配置属性
@Resource // 通过名称或类型注入bean
private Scheduler scheduler; // Quartz调度器，可能在后面的代码中用于调度任务
private static final String PATH_SEPARATOR = File.separator; // 文件路径分隔符
@PostConstruct // 初始化方法，在bean创建后自动执行
public void init() {
configFileProperties = this.fileProperties; // 将非静态的fileProperties赋值给静态的configFileProperties，使静态方法可以访问
}
/**
* 文件上传方法
*/
@SuppressWarnings("all")
public static FileVo upload(MultipartFile file) throws IOException {
String localPath = MsConfig.getProfile(); // 获取文件存储的基本路径
String url = "";
// 构造文件的相对路径
String suffix = "/app" + PATH_SEPARATOR + LocalDateTime.now().getYear() + PATH_SEPARATOR + LocalDateTime.now().getMonthValue() + PATH_SEPARATOR;
try {
url = localPath + suffix; // 完整的文件存储路径
} catch (Exception e) {
throw new CustomerException(500, "字节流转化字符流异常!");
}
// 获取文件名和扩展名
String fileName = FilenameUtils.getBaseName(file.getOriginalFilename());
String extension = FilenameUtils.getExtension(file.getOriginalFilename());
// 检查文件扩展名是否合法
if (extension == null || !isFilePattern(extension)) {
throw new CustomerException(500, "文件格式错误!");
}
// 创建目录
File dir = new File(url);
if (!dir.exists()) {
dir.mkdirs();
}
// 保存文件
if (!file.isEmpty()) {
try {
File newFile = new File(url, UuidUtil.get32Uuid() + "." + extension); // 以UUID为文件名保存文件
file.transferTo(newFile); // 将上传的文件保存到指定位置
UploadUtil.changeFolderPermission(newFile); // 修改文件权限，确保能够正常访问
// 返回文件的信息
return new FileVo().builder().fileName(fileName).filePath(suffix + newFile.getName()).fileType(extension.toUpperCase()).fileSize(FileUtils.byteCountToDisplaySize(newFile.length())).dataFlag(0).delFlag(LogicDelFlagEnum.UNDELETE.getValue()).build();
} catch (IOException e) {
e.printStackTrace();
throw new CustomerException(500, "文件上传失败!");
} catch (Exception e) {
throw new RuntimeException(e);
}
} else {
throw new CustomerException(500, "未接收到文件,请重新尝试");
}
}
/**
* 修改文件权限的方法
*/
private static void changeFolderPermission(File file) throws IOException {
// 定义文件权限集合
Set\<PosixFilePermission\> perms = new HashSet\<\>();
...
// 为文件设置权限
try {
Path path = Paths.get(file.getAbsolutePath());
Files.setPosixFilePermissions(path, perms);
} catch (Exception e) {
log.error("文件赋值权限异常：", e);
}
}
/**
* 检查文件扩展名是否合法
*/
private static boolean isFilePattern(String extension) {
for (FilePatternEnum value : FilePatternEnum.values()) {
if (value.getValue().equalsIgnoreCase(extension.toUpperCase())) {
return true;
}
}
return false;
}
}
