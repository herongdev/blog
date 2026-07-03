---
title: File类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
```
==Java== ==流====(Stream)==

==Java====文件类以抽象的方式代表文件名和目录路径名。该类主要用于文件和目录的创建、文件的查找和文件的删除等。==
==File====对象代表磁盘中实际存在的文件和目录。通过以下构造方法创建一个====File====对象。==

java.io.File 类是文件和目录路径名的抽象表示，主要用于文件和目录的创建、查找和删除等操作。

**构造方法**
![Ing, FileString, FileString FileString, Choose Dec...](Exported%20image%2020260702223750-0.png)

public File(String pathname) ：通过将给定的文件路径或文件名字符串转换为抽象路径名来创建新的 File实例。

public File(String parent, String child) ：主要是将文件的完整路径名称分为parent(路径名称)字符串和child(文件名）字符串。用户可省略parent字符串部分，如果省略，系统就会以根目录（Root Direction）作为默认工作路径来创建File对象。

当child字符串为null值时，系统会自动抛出NullPointerException异常，交由程序中对应的异常处理部分的catch程序区块来排除。

==File====(====File== ==parent====,== ==String== ==child====);==

==//== ==pa====rent====为已存在的====File====对象==
==// child====：文件名字符串==
==这里主要是引用已存在的====File====对象的文件所在路径作为====parent====字符串。如果省略====parent====参数，就会以系统根目录作为默认工作路径来创建新的====File====对象。==
==当====child====字符串为====null====值时，系统会自动抛出====NullPointerException====异常，交由程序中对应的异常处理部分的====catch====程序区块来排除。==

==通过将给定的== ==file: URI== ==转换成一个抽象路径名来创建一个新的== ==File== ==实例。==

==File====(====URI uri====)==
==// uri====：已存在的====uri====对象==
==使用已存在的====uri====对象作为文件路径，创建一个新的====File====对象。所谓的====URI(Uniform Resource Identifier)====，就是“统一资源标识符”==

构造举例，代码如下：
// 文件路径名
String pathname = "D:\\aaa.txt";
File file1 = new File(pathname);

// 文件路径名
String pathname2 = "D:\\aaa\\bbb.txt";
File file2 = new File(pathname2);

// 通过父路径和子路径字符串
String parent = "d:\\aaa";
String child = "bbb.txt";
File file3 = new File(parent, child);

// 通过父级File对象和子路径字符串
File parentDir = new File("d:\\aaa");
String child = "bbb.txt";
File file4 = new File(parentDir, child);
小贴士：
1. 一个File对象代表硬盘中实际存在的一个文件或者目录。
2. 无论该路径下是否存在文件或者目录，都不影响File对象的创建。

**常用方法**
**获取功能的方法**
public String getAbsolutePath() ：返回此File的绝对路径名字符串。
public String getPath() ：将此File转换为路径名字符串。
public String getName() ：返回由此File表示的文件或目录的名称。
public long length() ：返回由此File表示的文件的长度。
方法演示，代码如下：
public class FileGet {
public static void main(String[] args) {
File f = new File("d:/aaa/bbb.java");
System.out.println("文件绝对路径:"+f.getAbsolutePath());
System.out.println("文件构造路径:"+f.getPath());
System.out.println("文件名称:"+f.getName());
System.out.println("文件长度:"+f.length()+"字节");
File f2 = new File("d:/aaa");
System.out.println("目录绝对路径:"+f2.getAbsolutePath());
System.out.println("目录构造路径:"+f2.getPath());
System.out.println("目录名称:"+f2.getName());
System.out.println("目录长度:"+f2.length());
}
}
输出结果：
文件绝对路径:d:\aaa\bbb.java
文件构造路径:d:\aaa\bbb.java
文件名称:bbb.java
文件长度:636字节
目录绝对路径:d:\aaa
目录构造路径:d:\aaa
目录名称:aaa目录长度:4096
API中说明：length()，表示文件的长度。但是File对象表示目录，则返回值未指定。

**绝对路径和相对路径**
**绝对路径**：从盘符开始的路径，这是一个完整的路径。
**相对路径**：相对于项目目录的路径，这是一个便捷的路径，开发中经常使用。
public class FilePath {
public static void main(String[] args) {
// D盘下的bbb.java文件
File f = new File("D:\\bbb.java");
System.out.println(f.getAbsolutePath());
// 项目下的bbb.java文件
File f2 = new File("bbb.java");
System.out.println(f2.getAbsolutePath());
}
}
输出结果：
D:\bbb.java
D:\idea_project_test4\bbb.java

**判断功能的方法**
public boolean exists() ：此File表示的文件或目录是否实际存在。
public boolean isDirectory() ：此File表示的是否为目录。
public boolean isFile() ：此File表示的是否为文件。
方法演示，代码如下：
public class FileIs {
public static void main(String[] args) {
File f = new File("d:\\aaa\\bbb.java");
File f2 = new File("d:\\aaa");
// 判断是否存在
System.out.println("d:\\aaa\\bbb.java 是否存在:"+f.exists());
System.out.println("d:\\aaa 是否存在:"+f2.exists());
// 判断是文件还是目录
System.out.println("d:\\aaa 文件?:"+f2.isFile());
System.out.println("d:\\aaa 目录?:"+f2.isDirectory());
}
}
输出结果：
d:\aaa\bbb.java 是否存在:true
d:\aaa 是否存在:true
d:\aaa 文件?:false
d:\aaa 目录?:true

**创建删除功能的方法**
**public boolean createNewFile()** **：当且仅当具有该名称的文件尚不存在时，创建一个新的空文件。**
public boolean delete() ：删除由此File表示的文件或目录。
public boolean mkdir() ：创建由此File表示的目录。
public boolean mkdirs() ：创建由此File表示的目录，包括任何必需但不存在的父目录。
方法演示，代码如下：
public class FileCreateDelete {
public static void main(String[] args) throws IOException {
// 文件的创建
File f = new File("aaa.txt");
System.out.println("是否存在:"+f.exists()); // false
System.out.println("是否创建:"+f.createNewFile()); // true
System.out.println("是否存在:"+f.exists()); // true
// 目录的创建
File f2= new File("newDir");
System.out.println("是否存在:"+f2.exists());// false
System.out.println("是否创建:"+f2.mkdir()); // true
System.out.println("是否存在:"+f2.exists());// true
// 创建多级目录
File f3= new File("newDira\\newDirb");
System.out.println(f3.mkdir());// false
File f4= new File("newDira\\newDirb");
System.out.println(f4.mkdirs());// true
// 文件的删除
System.out.println(f.delete());// true
// 目录的删除
System.out.println(f2.delete());// true
System.out.println(f4.delete());// false
}
}
API中说明：delete方法，如果此File表示目录，则目录必须为空才能删除。

**目录的遍历**
public String[] list() ：返回一个String数组，表示该File目录中的所有子文件或目录。
public File[] listFiles() ：返回一个File数组，表示该File目录中的所有的子文件或目录。
public class FileFor {
public static void main(String[] args) {
File dir = new File("d:\\java_code");
//获取当前目录下的文件以及文件夹的名称。
String[] names = dir.list();
for(String name : names){
System.out.println(name);
}}
//获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息
File[] files = dir.listFiles();
for (File file : files) {
System.out.println(file);
}
}
}
小贴士：
调用listFiles方法的File对象，表示的必须是实际存在的目录，否则返回null，无法进行遍历。

文件其它方法
==创建====File====对象成功后，可以使用以下列表中的方法操作文件。==
|
|
**序号**

**方法描述**

1
<br>**public String getName()**  <br>返回由此抽象路径名表示的文件或目录的名称。<br>```|
2
<br>**public String getParent()****、**  <br> 返回此抽象路径名的父路径名的路径名字符串，如果此路径名没有指定父目录，则返回 null。<br>```|
3
<br>**public File getParentFile()**  <br>返回此抽象路径名的父路径名的抽象路径名，如果此路径名没有指定父目录，则返回 null。<br>```|
4
<br>**public String getPath()**  <br>将此抽象路径名转换为一个路径名字符串。<br>```|
5
<br>**public boolean isAbsolute()**  <br>测试此抽象路径名是否为绝对路径名。<br>```|
6
<br>**public String getAbsolutePath()**  <br>返回抽象路径名的绝对路径名字符串。<br>```|
7
<br>**public boolean canRead()**  <br>测试应用程序是否可以读取此抽象路径名表示的文件。<br>```|
8
<br>**public boolean canWrite()**  <br>测试应用程序是否可以修改此抽象路径名表示的文件。<br>```|
9
<br>**public boolean exists()**  <br>测试此抽象路径名表示的文件或目录是否存在。<br>```|
10
<br>**public boolean isDirectory()**  <br>测试此抽象路径名表示的文件是否是一个目录。<br>```|
11
<br>**public boolean isFile()**  <br>测试此抽象路径名表示的文件是否是一个标准文件。<br>```|
12
<br>**public long lastModified()**  <br>返回此抽象路径名表示的文件最后一次被修改的时间。<br>```|
13
<br>**public long length()**  <br>返回由此抽象路径名表示的文件的长度。<br>```|
14
<br>**public boolean createNewFile() throws IOException**  <br>当且仅当不存在具有此抽象路径名指定的名称的文件时，原子地创建由此抽象路径名指定的一个新的空文件。<br>```|
15
<br>**public boolean delete()**  <br> 删除此抽象路径名表示的文件或目录。<br>```|
16
<br>**public void deleteOnExit()**  <br>在虚拟机终止时，请求删除此抽象路径名表示的文件或目录。<br>```|
17
<br>**public String[] list()**  <br>返回由此抽象路径名所表示的目录中的文件和目录的名称所组成字符串数组。<br>```|
18
<br>**public String[] list(FilenameFilter filter)**  <br>返回由包含在目录中的文件和目录的名称所组成的字符串数组，这一目录是通过满足指定过滤器的抽象路径名来表示的。<br>```|
19
<br>**public File[] listFiles()**  <br>  返回一个抽象路径名数组，这些路径名表示此抽象路径名所表示目录中的文件。<br>```|
20
<br>**public File[] listFiles(FileFilter filter)**  <br>返回表示此抽象路径名所表示目录中的文件和目录的抽象路径名数组，这些路径名满足特定过滤器。<br>```|
21
<br>**public boolean mkdir()**  <br>创建此抽象路径名指定的目录。<br>```|
22
<br>**public boolean mkdirs()**  <br>创建此抽象路径名指定的目录，包括创建必需但不存在的父目录。<br>```|
23
<br>**public boolean renameTo(File dest)**  <br> 重新命名此抽象路径名表示的文件。<br>```|
24
<br>**public boolean setLastModified(long time)**  <br>设置由此抽象路径名所指定的文件或目录的最后一次修改时间。<br>```|
25
<br>**public boolean setReadOnly()**  <br>标记此抽象路径名指定的文件或目录，以便只可对其进行读操作。<br>```|
26
<br>**public static File createTempFile(String prefix, String suffix, File directory) throws IOException**  <br>在指定目录中创建一个新的空文件，使用给定的前缀和后缀字符串生成其名称。<br>```|
27
<br>**public static File createTempFile(String prefix, String suffix) throws IOException**  <br>在默认临时文件目录中创建一个空文件，使用给定前缀和后缀生成其名称。<br>```|
28
<br>**public int compareTo(File pathname)**  <br>按字母顺序比较两个抽象路径名。<br>```|
29
<br>**public int compareTo(Object o)**  <br>按字母顺序比较抽象路径名与给定对象。<br>```|
30
<br>**public boolean equals(Object obj)**  <br>测试此抽象路径名与给定对象是否相等。<br>```|
31
<br>**public String toString()**  <br> 返回此抽象路径名的路径名字符串。<br>```|

- **实例**
- ==下面的实例演示了====File====对象的使用：==
- **实例**

![import java.io. File public class DirList public s...](Exported%20image%2020260702223752-1.png)

==以上实例编译运行结果如下：==
==Directory== ==of== ==/====java====￼====bin== ==is== ==a directory====￼====lib== ==is== ==a directory====￼====demo== ==is== ==a directory====￼====test====.====txt== ==is== ==a file====￼====README== ==is== ==a file====￼====index====.====html== ==is== ==a file====￼====include== ==is== ==a directory==
 \> 来自

 \<https://www.runoob.com/java/java-file.html\>
```
