---
title: 利用本机Office软件转换
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
使用java实现word转pdf，亲测有效，完美保留样式

网上了很多方法，要么转换速度慢，要么转换出来的格式不一样，遇到了各种问题，无法完美完成转换，在stackoverflow发现完美答案。

依赖
\<dependency\>
\<groupId\>com.documents4j\</groupId\>
\<artifactId\>documents4j-local\</artifactId\>
\<version\>1.0.3\</version\>
\</dependency\>
\<dependency\>
\<groupId\>com.documents4j\</groupId\>
\<artifactId\>documents4j-transformer-msoffice-word\</artifactId\>
\<version\>1.0.3\</version\>
\</dependency\>
￼public static void main(String[] args) {
File inputWord = new File("D:/test.docx");
File outputFile = new File("D:/test.pdf");
try {
InputStream docxInputStream = new FileInputStream(inputWord);
OutputStream outputStream = new FileOutputStream(outputFile);
IConverter converter = LocalConverter.builder().build();
converter.convert(docxInputStream).as(DocumentType.DOCX).to(outputStream).as(DocumentType.PDF).execute();
outputStream.close();
System.out.println("success");
} catch (Exception e) {
e.printStackTrace();
}
}
————————————————
版权声明：本文为CSDN博主「輝太郎」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_38405202/article/details/120499141
