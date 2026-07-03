---
title: Apache POI
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
Apache POI 是一个用于读取和写入 Microsoft Office 文件格式的 Java 库。以下是使用 Apache POI 进行操作的详细步骤：

1. 添加依赖
考虑到您需要处理的所有文件格式，我们需要确保 Apache POI 的所有相关库都被包含。另外，要处理 PDF，您可能需要另一个库，如 Apache PDFBox。让我们来调整您的 Maven 依赖。

以下是一个更完整的依赖列表：
\<!-- Apache POI 核心库，支持 .xls 和 .doc --\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi\</artifactId\>
\<version\>5.1.0\</version\>
\</dependency\>

\<!-- 支持 .xlsx, .docx, .pptx 等 OOXML 文件 --\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi-ooxml\</artifactId\>
\<version\>5.1.0\</version\>
\</dependency\>

\<!-- 支持 .doc 和 .ppt --\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi-scratchpad\</artifactId\>
\<version\>5.1.0\</version\>
\</dependency\>

\<!-- Apache PDFBox 用于处理 PDF 文件 --\>
\<dependency\>
\<groupId\>org.apache.pdfbox\</groupId\>
\<artifactId\>pdfbox\</artifactId\>
\<version\>2.0.24\</version\> \<!-- 注意检查此版本，可能会有更新 --\>
\</dependency\>
现在，您应该已经具备了处理所有提到的文件格式的能力。如果在处理时遇到特定的 OOXML 功能需求或问题，您还可以考虑添加 poi-ooxml-full，但目前看来，上述的依赖应该足够满足大多数常见需求。

此外，根据你需要处理的文件类型，你可能还需要考虑以下依赖：

对于 .doc：poi-scratchpad
对于 .ppt：poi-scratchpad
对于图像处理和一些特殊的功能：poi-ooxml-full
但基于你目前的需求，我认为上面的两个依赖应该足够了。如果在开发过程中遇到问题，你可以根据需要添加更多的依赖。

2. 读取和写入 Excel 文件
读取 Excel 文件：

java
Copy code
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class ExcelReader {
public static void main(String[] args) throws IOException {
FileInputStream fis = new FileInputStream(new File("path_to_your_file.xlsx"));
Workbook workbook = new XSSFWorkbook(fis);
Sheet firstSheet = workbook.getSheetAt(0);
for (Row row : firstSheet) {
for (Cell cell : row) {
String cellValue = new DataFormatter().formatCellValue(cell);
System.out.print(cellValue + "\t");
}
System.out.println();
}
workbook.close();
fis.close();
}
}
写入 Excel 文件：

java
Copy code
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ExcelWriter {
public static void main(String[] args) throws IOException {
Workbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("FirstSheet");
Row row = sheet.createRow(0);
Cell cell = row.createCell(0);
cell.setCellValue("Hello, World!");

FileOutputStream fos = new FileOutputStream(new File("output.xlsx"));
workbook.write(fos);
fos.close();
workbook.close();
}
}
3. 读取和写入 Word 文件
读取 Word 文件：

java
Copy code
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

public class WordReader {
public static void main(String[] args) throws IOException {
FileInputStream fis = new FileInputStream(new File("path_to_your_file.docx"));
XWPFDocument document = new XWPFDocument(fis);
List\<XWPFParagraph\> paragraphs = document.getParagraphs();
for (XWPFParagraph paragraph : paragraphs) {
System.out.println(paragraph.getText());
}
document.close();
fis.close();
}
}
写入 Word 文件：

java
Copy code
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class WordWriter {
public static void main(String[] args) throws IOException {
XWPFDocument document = new XWPFDocument();
XWPFParagraph paragraph = document.createParagraph();
paragraph.createRun().setText("Hello, World!");

FileOutputStream fos = new FileOutputStream(new File("output.docx"));
document.write(fos);
fos.close();
document.close();
}
}
请注意，Apache POI 支持多种 Office 文件格式，上面的示例仅展示了 .xlsx 和 .docx 格式的基本操作。对于其他格式，例如 .xls 和 .doc，你需要稍微调整代码。此外，Apache POI 还提供了众多的高级功能，如样式、公式、图片等。如果需要，你可以查阅Apache POI 的官方文档以获取更多信息。
