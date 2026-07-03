---
title: java word转pdf
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
引入信赖
我放入了百度网盘中；
引入依赖 (maven仓库是没有的，需要在项目中引用)
然后在pom里面引入下面这段，依赖我们就搭建好了
\<dependency\>
\<groupId\>com.aspose\</groupId\>
\<artifactId\>aspose-words\</artifactId\>
\<version\>15.12.0\</version\>
\<scope\>system\</scope\>
\<systemPath\>${project.basedir}/src/main/resources/lib/aspose-words-15.12.0-jdk16.jar\</systemPath\>
\</dependency\>
使用以下命令将 JAR 文件安装到你的本地 Maven 仓库（将 path/to/aspose-words-XX.X.X-jdkXX.jar 替换为你下载的 JAR 文件的实际路径）：
mvn install:install-file -Dfile=/Users/hr/softProjects/hunanminsheng/ms-app-back/ms-admin/src/main/resources/lib/aspose-words-15.12.0-jdk16.jar -DgroupId=com.aspose -DartifactId=aspose-words -Dversion=15.12.0 -Dpackaging=jar
然后再点击同步依赖即可；

这是一个 Maven 依赖声明，用于在 Maven 项目中添加外部库。我们逐行解析这个声明：

1. groupId, artifactId, version：
    - groupId、artifactId 和 version 一起定义了一个 Maven 依赖的坐标。在 Maven 中心仓库中，这三个坐标用来唯一地标识一个特定的库或插件。
    - 在这里，它们表示了 Aspose 的 Word 处理库，版本号为 15.12.0。
2. scope：
    - scope 定义了依赖的范围。它指定了这个依赖在项目的不同阶段（如编译、测试、运行时等）应该如何使用。
    - system 是一个特殊的依赖范围，表示该依赖不来自 Maven 的中心仓库，而是从文件系统的某个位置取得。这与其他常见的范围（如 compile, runtime, test, provided）不同。
3. systemPath：
    - systemPath 是与 scope 为 system 相关的元素。它指定了系统中该依赖的具体位置。
    - 在这里，它使用了 ${project.basedir} 变量，这是一个 Maven 内置的属性，代表项目的基础目录（通常是包含 pom.xml 文件的目录）。
    - 综合来看，该路径指向的是项目基础目录下的 src/main/resources/lib/aspose-words-15.12.0-jdk16.jar。这意味着，这个 JAR 文件需要手动放在这个指定的位置。

使用 system 范围和 systemPath 是一种非常不推荐的做法，因为它使得项目的构建依赖于特定的文件系统布局，从而降低了可移植性。更好的方法是将这些 JAR 文件放入一个私有的 Maven 仓库（如 Nexus 或 Artifactory），或者如果有许可的话，上传到 Maven 中心仓库。如果这些都不可行，至少应该确保所有开发人员和构建系统都可以访问到这个 JAR 文件的确切位置。

resource下添加license.xml文件
\<License\>
\<Data\>
\<Products\>
\<Product\>Aspose.TotalforJava\</Product\>
\<Product\>Aspose.WordsforJava\</Product\>
\</Products\>
\<EditionType\>Enterprise\</EditionType\>
\<SubscriptionExpiry\>20991231\</SubscriptionExpiry\>
\<LicenseExpiry\>20991231\</LicenseExpiry\>
\<SerialNumber\>8bfe198c-7f0c-4ef8-8ff0-acc3237bf0d7\</SerialNumber\>
\</Data\>
\<Signature\>
sNLLKGMUdF0r8O1kKilWAGdgfs2BvJb/2Xp8p5iuDVfZXmhppo+d0Ran1P9TKdjV4ABwAgKXxJ3jcQTqE/2IRfqwnPf8itN8aFZlV3TJPYeD3yWE7IT55Gz6EijUpC7aKeoohTb4w2fpox58wWoF3SNp6sK6jDfiAUGEHYJ9pjU=
\</Signature\>
\</License\>

核心代码
package com.zylc.bixiang.business.order.domain.example;   import com.aspose.words.Document;
import com.aspose.words.License;
import com.aspose.words.SaveFormat;
import org.springframework.core.io.ClassPathResource;   import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;   public class wordTest {
private static boolean license = false;   public String wordToPdf() throws Exception {
FileOutputStream os = null;
try {
//凭证 不然切换后有水印
InputStream is = new ClassPathResource("/license.xml").getInputStream();
License aposeLic = new License();
aposeLic.setLicense(is);
license = true;
if (!license) {
System.out.println("License验证不通过...");
return null;
}
//生成一个空的PDF文件
File file = new File("D:\\a.pdf");
os = new FileOutputStream(file);
//要转换的word文件
Document doc = new Document("D:\\aa.word");
doc.save(os, SaveFormat.PDF);
} catch (Exception e) {
e.printStackTrace();
} finally {
if (os != null) {
try {
os.close();
} catch (IOException e) {
e.printStackTrace();
}
}
}   }
