---
title: Office转pdf
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
要在服务器端将Office文件转换为PDF，你首先需要选择一个合适的转换工具或库。其中，[LibreOffice](https://www.libreoffice.org/)和[Apache POI](https://poi.apache.org/)是两个流行的选择。

对于LibreOffice，它提供了命令行工具，可以方便地将Office文件转换为PDF。Apache POI是一个Java库，专门用于读取和写入Microsoft Office文档。

实施步骤：

1. 设置LibreOffice:
    - 安装LibreOffice。
    - 确保libreoffice命令行工具可以在服务器上访问。
2. 在文件上传后进行转换:
    - 在你的代码中，当用户上传一个Office文件后，立即执行转换。
    - 转换完成后，你可以存储PDF文件，并为用户提供一个链接或预览。

Java开发中Word转PDF文件5种方案横向评测

前段时间接了个项目，需要各种处理Word模板、转PDF、签章等等，非常头疼，其中光是一个word转PDF就折磨我好久，实现转换很简单，但是效果总是达不到满意，于是我把市面上能找到的word转pdf方法都试了个遍。现在把这些方案来做个横向对比，希望对大家能有帮助。

对比的时候我选择了两个指标来进行对比。

格式保真
经过对比我发现对于一些比较简单的word文档，各种方法差别比较小，但一些复杂的word文档差别就太大了，甚至有的转换之后根本就不能用。所以格式保真是最重要的，就是指是否能够100%保留word文档的格式，分为五个等级
五星：肉眼看不出差别，转换方法也不需要特殊的处理
四星：不影响页面呈现，但细节地方或特殊情况下会出现细微差异，通过程序的特殊处理可以解决。
三星：不影响页面呈现，出现明显的跳页的情况。转换的时候word中的表格是最容易跳页了。
二星：影响页面呈现，影响阅读，格式出现明显偏差，已经影响正常阅读。
一星：严重影响阅读和页面呈现，格式混乱、字体错乱、文档内容丢失等。
相素差异度
使用diffimage图片相似度对比工具进行对比，最后得出diff百分比，软件应该是逐相素对比的，拿这个来做为参考不是很科学，不过在同一尺度下还是能提供一定的格式保真度的数据参考
测试方法是把原版WORD文档用PDF打印的方式导出PDF文件，再把原版PDF和各种不同技术方案生成的PDF全部转成JPG文件进行对比。
兼容性
说起word编程不得不提到依赖于office的方法，但是现在服务器一般都是linux兼容也是需要考虑的指标
性能
一般系统用到转换的时候往往对性能也是有一定的要求的，所以这个也是很重要的参考指标。
价格
这一点主要是开源和收费两种，商用的话肯定也是重要参考指标
文件大小
不算太重要，好吧，好像我是拿这个来凑数的。
关于Word转PDF网上能找到的方案大概有六七种，我选了其中的5种，分别是：

aspose-words、docx4j、openoffice、poi、spire.doc

下面先来简单介绍一下这五种方案

aspose-words
Aspose公司旗下的最全的一套office文档管理方案，公司设在澳大利亚。

公司差不多是专做各种文件格式处理插件的，产品系列挺多，有兴趣可以到官网上看看：

[https://www.aspose.com/](https://www.aspose.com/)

收费价格
许可
Developer Small Business - 1 Developer and 1 Deployment Location 开发人员小型企业- 1个开发人员和1个部署位置 29,291 元
Developer OEM - 1 Developer and Unlimited Deployment Locations 开发人员OEM - 1开发人员和无限部署地点 87,874 元
Site Small Business - Up to 10 Developers and up to 10 Deployment Locations 站点小型企业-多达10个开发人员和多达10个部署地点 146,456元
Site OEM - Up to 10 Developers and Unlimited Deployment Locations 站点OEM -多达10个开发人员和无限部署地点 410,077 元
技术支持服务
Developer Small Business 1 Year Developer Support License - up to 3 incidents per year 开发人员小型企业1年开发人员支持许可证-每年最多3起事故 2,923 元
Aspose Business Support 商业服务
Developer Small Business 1 Year Business Support License - up to 6 incidents per year 开发商小型企业1年业务支持许可证-每年最多6起事故 4,387 元
Developer OEM 1 Year Business Support License - up to 6 incidents per year 开发人员OEM 1年业务支持许可证-每年最多发生6起事故 13,162 元
企业支持
Site Small Business 1 Year Enterprise Support License - up to 6 incidents per year 网站小型企业1年企业支持许可证-每年最多6起事故 29,262 元
Site OEM 1 Year Enterprise Support License - up to 6 incidents per year 站点OEM 1年企业支持许可证-每年最多发生6起事故 87,786 元
兼容性
不需要依赖任何组件，不依赖操作系统。

poi
大名鼎鼎的apache的开源组件，应用非常广泛，我想主要原因可能是开源吧。

官网：https://poi.apache.org/

兼容性
组件拆分较细，引用一些类库，但都问题不大，不依赖操作系统。

OpenOffice
Apache旗下又一开源组件，前身是1998年一家德国公司StarDivision所研发出来的一个办公室软件，称之为StarOffice。1999年8月被sun公司收购。2010年团队成员分家，分出来的一批成立了新团队做一个LibreOffice。2011年6月Oracle将其捐赠给Apache基金会。

官网：https://www.openoffice.org/

兼容性
OpenOffice本身就是一套Office软件，该方案需要使用jodconverter组件配合OpenOffice完成转换，当然也可以使用LibreOffice进行转换，这次并没有测试这个方案

jodconverter：https://sourceforge.net/projects/jodconverter/files/

spire.doc
搜到的时候刚刚打开官网猛一看以为是国外的公司，没想到一切到中文版网页才发现是成都冰蓝科技有限公司出品的，真正的国产。刚刚查到官网的时候是非常期待他的表现的。

官网：https://www.e-iceblue.com/ [https://www.e-iceblue.cn/](https://www.e-iceblue.cn/)

兼容性
不需要依赖任何组件，不依赖操作系统。

价格
只截图了spire.doc组件的价格，其它还有很多组件。用公司名和邮箱可以申请一个月的试用license。

docx4j
澳大利亚一公司赞助的开源组件，一查资料才知道作者是这家公司的CEO。刚刚打开官网的时候就一个感觉，官网做的太烂，不太相信这组件能有什么好的表现。下面的图就是官网截图，相信你会有一样的感觉。

有一个开源版，还有一个Docx4j Enterprise Edition。没有仔细研究，只测试了开源版。

官网：https://www.docx4java.org/

兼容性
不依赖其它组件，不依赖操作系统

除了以上几种方案以外，还查到有其它几乎方案，比如IText、document4j等。像IText是依赖于poi的，document4j是依赖于office软件的，所以不测试了。

测试的word文档我选取的是我项目中用到的一个文档，正好是遇到比较容易出现跳页的情况。拿来做横向测试非常合适，先来欣赏一下word文档吧。

文档中标题、表格、页眉页脚、图片、文本框几乎都用到了，准备就绪，开始测试。。

各种组件的代码编写方法
aspose.words
\<dependency\>
\<groupId\>com.aspose\</groupId\>
\<artifactId\>aspose-words\</artifactId\>
\<version\>22.11\</version\>
\<classifier\>jdk17\</classifier\>
\</dependency\>
1
2
3
4
5
6
package com.hawkon.aspose;

import com.aspose.words.*;

public class WordToPdfTest_Aspose {

public static void wordToPdf(String wordFile, String pdfFile) throws Exception {
Document wordDoc = new Document(wordFile);
PdfSaveOptions pso = new PdfSaveOptions();
wordDoc.save(pdfFile, pso);
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
aspose这个组件是商用的，正常的写上如上所示，但是试用版导出的PDF文件是阉割版的，没法进行测试对比，所以我用了网上留传（po jie）的版本，有需要的朋友可以关注我的公众号（姚Sir面试间），回复aspose就可以得到。

本地jar包导入方法

\<dependency\>
\<groupId\>com.aspose\</groupId\>
\<artifactId\>aspose-words\</artifactId\>
\<version\>19.5.0\</version\>
\<scope\>system\</scope\>
\<systemPath\>D:/Code/PdfTest/lib/aspose-words-19.5jdk.jar\</systemPath\>
\</dependency\>
1
2
3
4
5
6
7
docx4j

\<dependency\>
\<groupId\>org.slf4j\</groupId\>
\<artifactId\>slf4j-simple\</artifactId\>
\<version\>1.7.21\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.docx4j\</groupId\>
\<artifactId\>docx4j-JAXB-Internal\</artifactId\>
\<version\>8.2.4\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.docx4j\</groupId\>
\<artifactId\>docx4j-export-fo\</artifactId\>
\<version\>8.2.4\</version\>
\</dependency\>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
package com.hawkon.docx4j;

import org.docx4j.Docx4J;
import org.docx4j.fonts.IdentityPlusMapper;
import org.docx4j.fonts.Mapper;
import org.docx4j.fonts.PhysicalFonts;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;

public class WordToPdfTest_Docx4j {

public static void wordToPdf(String docFile,String pdfFile) throws Exception {
final Logger logger = LoggerFactory.getLogger(Docx4J.class);

WordprocessingMLPackage pkg = Docx4J.load(new File(docFile));
Mapper fontMapper = new IdentityPlusMapper();
fontMapper.put("隶书", PhysicalFonts.get("LiSu"));
fontMapper.put("宋体", PhysicalFonts.get("SimSun"));
fontMapper.put("微软雅黑", PhysicalFonts.get("Microsoft Yahei"));
fontMapper.put("黑体", PhysicalFonts.get("SimHei"));
fontMapper.put("楷体", PhysicalFonts.get("KaiTi"));
fontMapper.put("新宋体", PhysicalFonts.get("NSimSun"));
fontMapper.put("华文行楷", PhysicalFonts.get("STXingkai"));
fontMapper.put("华文仿宋", PhysicalFonts.get("STFangsong"));
fontMapper.put("仿宋", PhysicalFonts.get("FangSong"));
fontMapper.put("幼圆", PhysicalFonts.get("YouYuan"));
fontMapper.put("华文宋体", PhysicalFonts.get("STSong"));
fontMapper.put("华文中宋", PhysicalFonts.get("STZhongsong"));
fontMapper.put("等线", PhysicalFonts.get("SimSun"));
fontMapper.put("等线 Light", PhysicalFonts.get("SimSun"));
fontMapper.put("华文琥珀", PhysicalFonts.get("STHupo"));
fontMapper.put("华文隶书", PhysicalFonts.get("STLiti"));
fontMapper.put("华文新魏", PhysicalFonts.get("STXinwei"));
fontMapper.put("华文彩云", PhysicalFonts.get("STCaiyun"));
fontMapper.put("方正姚体", PhysicalFonts.get("FZYaoti"));
fontMapper.put("方正舒体", PhysicalFonts.get("FZShuTi"));
fontMapper.put("华文细黑", PhysicalFonts.get("STXihei"));
fontMapper.put("宋体扩展", PhysicalFonts.get("simsun-extB"));
fontMapper.put("仿宋_GB2312", PhysicalFonts.get("FangSong_GB2312"));
pkg.setFontMapper(fontMapper);

Docx4J.toPDF(pkg, new FileOutputStream(pdfFile));
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
这个组件按官方提供的写法不行，出来的汉字全成了麻将里的白板，还是得用网上的示例，加上字体映射之后可以了。不知道放到linux服务器上会是什么样。

OpenOffice
该方案的思路其实是OpenOffice提供软件支持，Java代码又利用jodconverter组件调用OpenOffice，其实和以前的程序调用 com组件是一个思路。而OpenOffice还提供了web服务版本，可以用类似tcp的方式调用来完成生成的工作。

本次测试就采用的是这种方法，因此需要安排OpenOffice软件，安装后在安装目录执行以下命令：

soffice.exe -headless -accept="socket,host=127.0.0.1,port=8100;urp;" -nofirststartwizard

1
2
3

\<dependency\>
\<groupId\>org.apache.directory.studio\</groupId\>
\<artifactId\>org.apache.commons.io\</artifactId\>
\<version\>2.4\</version\>
\</dependency\>
\<dependency\>
\<groupId\>com.artofsolving\</groupId\>
\<artifactId\>jodconverter\</artifactId\>
\<version\>2.2.1\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.openoffice\</groupId\>
\<artifactId\>juh\</artifactId\>
\<version\>3.1.0\</version\>
\</dependency\>

\<dependency\>
\<groupId\>org.openoffice\</groupId\>
\<artifactId\>unoil\</artifactId\>
\<version\>3.0.0\</version\>
\</dependency\>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
package com.hawkon.openoffice;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

import java.io.File;
import java.net.ConnectException;

public class WordToPdfTest_openoffice {
public static void wordToPdf(String docFile,String pdfFile) throws ConnectException {
// 源文件目录
File inputFile = new File(docFile);
// 输出文件目录
File outputFile = new File(pdfFile);
if (!outputFile.getParentFile().exists()) {
outputFile.getParentFile().exists();
}
// 连接openoffice服务
OpenOfficeConnection connection = new SocketOpenOfficeConnection(
"127.0.0.1", 8100);
connection.connect();
// 转换word到pdf
DocumentConverter converter = new OpenOfficeDocumentConverter(
connection);
converter.convert(inputFile, outputFile);
// 关闭连接
connection.disconnect();
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
poi
poi虽然很强大，但用起来越是最痛苦的，用的组件多，各种版本冲突，各种缺少组件。不知道网上发贴子的那些大神是怎么研究出来哪个版本对应哪个版本的，非常佩服他们。测试的时候我就在想，有没有什么能查询各种Jar包版本依赖关系的网站。如果有，请看客们告诉我一场。

\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi\</artifactId\>
\<version\>3.10.1\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi-scratchpad\</artifactId\>
\<version\>3.10.1\</version\>
\</dependency\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi-ooxml\</artifactId\>
\<version\>3.10.1\</version\>
\</dependency\>
\<dependency\>
\<groupId\>fr.opensagres.xdocreport\</groupId\>
\<artifactId\>org.apache.poi.xwpf.converter.core\</artifactId\>
\<version\>1.0.6\</version\>
\</dependency\>
\<dependency\>
\<groupId\>fr.opensagres.xdocreport\</groupId\>
\<artifactId\>org.apache.poi.xwpf.converter.pdf\</artifactId\>
\<version\>1.0.6\</version\>
\</dependency\>
\<dependency\>
\<groupId\>fr.opensagres.xdocreport\</groupId\>
\<artifactId\>fr.opensagres.xdocreport.itext.extension\</artifactId\>
\<version\>2.0.1\</version\>
\</dependency\>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
package com.hawkon.poi;

import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.*;

public class WordToPdf_Poi {
public static void wordToPdf(String docFile,String pdfFile) throws IOException {
XWPFDocument document;
InputStream doc = new FileInputStream(docFile);
document = new XWPFDocument(doc);
PdfOptions options = PdfOptions.create();
OutputStream out = new FileOutputStream(pdfFile);
PdfConverter.getInstance().convert(document, out, options);
doc.close();
out.close();
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
spire
\<dependency\>
\<groupId\>e-iceblue\</groupId\>
\<artifactId\>spire.doc\</artifactId\>
\<version\>10.11.6\</version\>
\<scope\>system\</scope\>
\<systemPath\>D:/Code/PdfTest/lib/Spire.Doc.jar\</systemPath\>
\</dependency\>
1
2
3
4
5
6
7
package com.hawkon.spire;
import com.spire.doc.*;

public class WordToPdf_spire {
public static void wordToPdf(String docFile,String pdfFile){
com.spire.license.LicenseProvider.setLicenseFile("D:\\Code\\PdfTest\\license.elic.xml");
//实例化Document类的对象
Document doc = new Document();

//加载Word
doc.loadFromFile(docFile);

//保存为PDF格式
doc.saveToFile(pdfFile,FileFormat.PDF);
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
测试结果
测试的时候有性能指标，所以我觉得还是把我电脑的硬件参数发一下，大家可以作为参考。

处理器 Intel(R) Core(TM) i5-10210U CPU @ 1.60GHz 2.11 GHz
机带 RAM 16.0 GB (15.8 GB 可用)
系统类型 64 位操作系统, 基于 x64 的处理器
1
2
3
转换结果与原版对比
下面依次放出5种方案的转换结果对比，左边为原版，右边为五种方案的转换结果，并且我也给出我的格式保真度评价

aspose.words对比图
从图中可以看出，除表格处有一点错位以外，看出不明显的差别，已经非常厉害了。我给4星。

docx4j
有点惨不忍睹呀，表格严重错位，甚至有7页变8页的趋势。与原版格式严重失真。但勉强能阅读。我给2星

OpenOffice
格式基本保留住了，但是位置错的比较离谱。好在基本不影响阅读。我给3星。

poi
页眉错乱严重，影响阅读，这有跳页的情况出现。我给1星。

spire
和aspose一样，除表格处有一点错位以外，看出不明显的差别，国产软件能做到这种程序非常NICE了。我给4星。

评测结果
最后的评测结果如下，从转换效果的角度来说，比较满意的是aspose和spire.doc，而开源的转换一些比较简单的文章还可以，但企业开发的时候很多时候是要求PDF格式和WORD文档高度保持一致的。其它三种方案的表现肯定是不够的。

值得一提的是，没想到国产软件spire.doc表现还不错，除性能稍差一点，其它都不错，最重要的是价格还是比较亲民的。

而且这家公司的产品应该是已经走出国门了，希望国产软件可以做出更多的精品，也希望大家多多支持国产软件。

最后声明两点：

文中测试样本文档中的公司名、电话纯属虚构，如有累同纯属巧合，如果发生意外涉及到他人隐私，请联系我修改文章，谢谢。
我没有收spire.doc一分钱，确实是没想到国产中间件已经这么优秀了，如果文章起到广告效果了，spire.doc的公司愿意赞助我一点，我丝毫不介意，谁能跟钱有仇呢，哈哈。。。。
————————————————
版权声明：本文为CSDN博主「我是老姚」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/aley/article/details/127914145
