---
title: IO异常的处理
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
```
**JDK7****前处理**
之前的入门练习，我们一直把异常抛出，而实际开发中并不能这样处理，建议使用 try...catch...finally 代码块，处理异常部分，代码使用演示：
public class HandleException1 {
public static void main(String[] args) {
// 声明变量
FileWriter fw = null;
try {
//创建流对象
fw = new FileWriter("fw.txt");
// 写出数据
fw.write("黑马程序员"); //黑马程序员
} catch (IOException e) {
e.printStackTrace();
} finally {
try {
if (fw != null) {
fw.close();
}
} catch (IOException e) {
e.printStackTrace();
}
}
}
}

**JDK7****的处理****(****扩展知识点了解内容****)**
还可以使用JDK7优化后的 try-with-resource 语句，该语句确保了每个资源在语句结束时关闭。所谓的资源（resource）是指在程序完成后，必须关闭的对象。
格式：
try (创建流对象语句，如果多个,使用';'隔开) {
// 读写数据
} catch (IOException e) {
e.printStackTrace();
}

**代码使用演示：**
public class HandleException2 {
public static void main(String[] args) {
// 创建流对象
try ( FileWriter fw = new FileWriter("fw.txt"); ) {
// 写出数据
fw.write("黑马程序员"); //黑马程序员
} catch (IOException e) {
e.printStackTrace();
}
}
}
**JDK9****的改进****(****扩展知识点了解内容****)**
JDK9中 try-with-resource 的改进，对于**引入对象**的方式，支持的更加简洁。被引入的对象，同样可以自动关闭，无需手动close，我们来了解一下格式。
改进前格式：
// 被final修饰的对象
final Resource resource1 = new Resource("resource1");
// 普通对象
Resource resource2 = new Resource("resource2");
// 引入方式：创建新的变量保存
try (Resource r1 = resource1;
Resource r2 = resource2) {
// 使用对象
}

改进后格式：
// 被final修饰的对象
final Resource resource1 = new Resource("resource1");
// 普通对象
Resource resource2 = new Resource("resource2");
// 引入方式：直接引入
try (resource1; resource2) {
// 使用对象
}
改进后，代码使用演示：
public class TryDemo {
public static void main(String[] args) throws IOException {
// 创建流对象
final FileReader fr = new FileReader("in.txt");
FileWriter fw = new FileWriter("out.txt");
// 引入到try中
 try (fr; fw) {
// 定义变量
int b;
// 读取数据
while ((b = fr.read())!=‐1) {
// 写出数据
fw.write(b);
}
} catch (IOException e) {
e.printStackTrace();
}
}
}
```
