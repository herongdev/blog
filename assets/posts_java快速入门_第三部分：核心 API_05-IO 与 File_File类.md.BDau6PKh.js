import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"File类","description":"","frontmatter":{"title":"File类","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/File类.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/File类.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/File类.md"};function c(u,s,t,r,b,o){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==Java== ==流====(Stream)==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==Java====文件类以抽象的方式代表文件名和目录路径名。该类主要用于文件和目录的创建、文件的查找和文件的删除等。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==File====对象代表磁盘中实际存在的文件和目录。通过以下构造方法创建一个====File====对象。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"java.io.File 类是文件和目录路径名的抽象表示，主要用于文件和目录的创建、查找和删除等操作。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"public File(String pathname) ：通过将给定的文件路径或文件名字符串转换为抽象路径名来创建新的 File实例。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"public File(String parent, String child) ：主要是将文件的完整路径名称分为parent(路径名称)字符串和child(文件名）字符串。用户可省略parent字符串部分，如果省略，系统就会以根目录（Root Direction）作为默认工作路径来创建File对象。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"当child字符串为null值时，系统会自动抛出NullPointerException异常，交由程序中对应的异常处理部分的catch程序区块来排除。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==File====(====File== ==parent====,== ==String== ==child====);==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//== ==pa====rent====为已存在的====File====对象==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// child====：文件名字符串==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==这里主要是引用已存在的====File====对象的文件所在路径作为====parent====字符串。如果省略====parent====参数，就会以系统根目录作为默认工作路径来创建新的====File====对象。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==当====child====字符串为====null====值时，系统会自动抛出====NullPointerException====异常，交由程序中对应的异常处理部分的====catch====程序区块来排除。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==通过将给定的== ==file: URI== ==转换成一个抽象路径名来创建一个新的== ==File== ==实例。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==File====(====URI uri====)==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// uri====：已存在的====uri====对象==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==使用已存在的====uri====对象作为文件路径，创建一个新的====File====对象。所谓的====URI(Uniform Resource Identifier)====，就是“统一资源标识符”==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 文件路径名")]),l(`
`),n("span",{class:"line"},[n("span",null,'String pathname = "D:\\\\aaa.txt";')]),l(`
`),n("span",{class:"line"},[n("span",null,"File file1 = new File(pathname);")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 文件路径名")]),l(`
`),n("span",{class:"line"},[n("span",null,'String pathname2 = "D:\\\\aaa\\\\bbb.txt";')]),l(`
`),n("span",{class:"line"},[n("span",null,"File file2 = new File(pathname2);")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 通过父路径和子路径字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,'String parent = "d:\\\\aaa";')]),l(`
`),n("span",{class:"line"},[n("span",null,'String child = "bbb.txt";')]),l(`
`),n("span",{class:"line"},[n("span",null,"File file3 = new File(parent, child);")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 通过父级File对象和子路径字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,'File parentDir = new File("d:\\\\aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,'String child = "bbb.txt";')]),l(`
`),n("span",{class:"line"},[n("span",null,"File file4 = new File(parentDir, child);")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. 一个File对象代表硬盘中实际存在的一个文件或者目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. 无论该路径下是否存在文件或者目录，都不影响File对象的创建。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**常用方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**获取功能的方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"public String getAbsolutePath() ：返回此File的绝对路径名字符串。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public String getPath() ：将此File转换为路径名字符串。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public String getName() ：返回由此File表示的文件或目录的名称。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public long length() ：返回由此File表示的文件的长度。")]),l(`
`),n("span",{class:"line"},[n("span",null,"方法演示，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileGet {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f = new File("d:/aaa/bbb.java");')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件绝对路径:"+f.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件构造路径:"+f.getPath());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件名称:"+f.getName());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件长度:"+f.length()+"字节");')]),l(`
`),n("span",{class:"line"},[n("span",null,'File f2 = new File("d:/aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("目录绝对路径:"+f2.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("目录构造路径:"+f2.getPath());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("目录名称:"+f2.getName());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("目录长度:"+f2.length());')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"文件绝对路径:d:\\aaa\\bbb.java")]),l(`
`),n("span",{class:"line"},[n("span",null,"文件构造路径:d:\\aaa\\bbb.java")]),l(`
`),n("span",{class:"line"},[n("span",null,"文件名称:bbb.java")]),l(`
`),n("span",{class:"line"},[n("span",null,"文件长度:636字节")]),l(`
`),n("span",{class:"line"},[n("span",null,"目录绝对路径:d:\\aaa")]),l(`
`),n("span",{class:"line"},[n("span",null,"目录构造路径:d:\\aaa")]),l(`
`),n("span",{class:"line"},[n("span",null,"目录名称:aaa目录长度:4096")]),l(`
`),n("span",{class:"line"},[n("span",null,"API中说明：length()，表示文件的长度。但是File对象表示目录，则返回值未指定。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**绝对路径和相对路径**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**绝对路径**：从盘符开始的路径，这是一个完整的路径。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**相对路径**：相对于项目目录的路径，这是一个便捷的路径，开发中经常使用。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FilePath {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// D盘下的bbb.java文件")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f = new File("D:\\\\bbb.java");')]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f.getAbsolutePath());")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 项目下的bbb.java文件")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f2 = new File("bbb.java");')]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f2.getAbsolutePath());")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"D:\\bbb.java")]),l(`
`),n("span",{class:"line"},[n("span",null,"D:\\idea_project_test4\\bbb.java")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**判断功能的方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean exists() ：此File表示的文件或目录是否实际存在。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean isDirectory() ：此File表示的是否为目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean isFile() ：此File表示的是否为文件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"方法演示，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileIs {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f = new File("d:\\\\aaa\\\\bbb.java");')]),l(`
`),n("span",{class:"line"},[n("span",null,'File f2 = new File("d:\\\\aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 判断是否存在")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("d:\\\\aaa\\\\bbb.java 是否存在:"+f.exists());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("d:\\\\aaa 是否存在:"+f2.exists());')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 判断是文件还是目录")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("d:\\\\aaa 文件?:"+f2.isFile());')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("d:\\\\aaa 目录?:"+f2.isDirectory());')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"d:\\aaa\\bbb.java 是否存在:true")]),l(`
`),n("span",{class:"line"},[n("span",null,"d:\\aaa 是否存在:true")]),l(`
`),n("span",{class:"line"},[n("span",null,"d:\\aaa 文件?:false")]),l(`
`),n("span",{class:"line"},[n("span",null,"d:\\aaa 目录?:true")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**创建删除功能的方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**public boolean createNewFile()** **：当且仅当具有该名称的文件尚不存在时，创建一个新的空文件。**")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean delete() ：删除由此File表示的文件或目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean mkdir() ：创建由此File表示的目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean mkdirs() ：创建由此File表示的目录，包括任何必需但不存在的父目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"方法演示，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileCreateDelete {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 文件的创建")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f = new File("aaa.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否存在:"+f.exists()); // false')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否创建:"+f.createNewFile()); // true')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否存在:"+f.exists()); // true')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 目录的创建")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f2= new File("newDir");')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否存在:"+f2.exists());// false')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否创建:"+f2.mkdir()); // true')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("是否存在:"+f2.exists());// true')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 创建多级目录")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f3= new File("newDira\\\\newDirb");')]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f3.mkdir());// false")]),l(`
`),n("span",{class:"line"},[n("span",null,'File f4= new File("newDira\\\\newDirb");')]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f4.mkdirs());// true")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 文件的删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f.delete());// true")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 目录的删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f2.delete());// true")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(f4.delete());// false")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"API中说明：delete方法，如果此File表示目录，则目录必须为空才能删除。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**目录的遍历**")]),l(`
`),n("span",{class:"line"},[n("span",null,"public String[] list() ：返回一个String数组，表示该File目录中的所有子文件或目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public File[] listFiles() ：返回一个File数组，表示该File目录中的所有的子文件或目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileFor {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'File dir = new File("d:\\\\java_code");')]),l(`
`),n("span",{class:"line"},[n("span",null,"//获取当前目录下的文件以及文件夹的名称。")]),l(`
`),n("span",{class:"line"},[n("span",null,"String[] names = dir.list();")]),l(`
`),n("span",{class:"line"},[n("span",null,"for(String name : names){")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(name);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息")]),l(`
`),n("span",{class:"line"},[n("span",null,"File[] files = dir.listFiles();")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (File file : files) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),l(`
`),n("span",{class:"line"},[n("span",null,"调用listFiles方法的File对象，表示的必须是实际存在的目录，否则返回null，无法进行遍历。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"文件其它方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"==创建====File====对象成功后，可以使用以下列表中的方法操作文件。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null,"**序号**")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**方法描述**")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"1")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String getName()**  <br>返回由此抽象路径名表示的文件或目录的名称。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"2")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String getParent()****、**  <br> 返回此抽象路径名的父路径名的路径名字符串，如果此路径名没有指定父目录，则返回 null。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public File getParentFile()**  <br>返回此抽象路径名的父路径名的抽象路径名，如果此路径名没有指定父目录，则返回 null。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"4")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String getPath()**  <br>将此抽象路径名转换为一个路径名字符串。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"5")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean isAbsolute()**  <br>测试此抽象路径名是否为绝对路径名。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"6")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String getAbsolutePath()**  <br>返回抽象路径名的绝对路径名字符串。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"7")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean canRead()**  <br>测试应用程序是否可以读取此抽象路径名表示的文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"8")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean canWrite()**  <br>测试应用程序是否可以修改此抽象路径名表示的文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"9")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean exists()**  <br>测试此抽象路径名表示的文件或目录是否存在。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"10")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean isDirectory()**  <br>测试此抽象路径名表示的文件是否是一个目录。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"11")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean isFile()**  <br>测试此抽象路径名表示的文件是否是一个标准文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"12")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public long lastModified()**  <br>返回此抽象路径名表示的文件最后一次被修改的时间。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"13")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public long length()**  <br>返回由此抽象路径名表示的文件的长度。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"14")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean createNewFile() throws IOException**  <br>当且仅当不存在具有此抽象路径名指定的名称的文件时，原子地创建由此抽象路径名指定的一个新的空文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"15")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean delete()**  <br> 删除此抽象路径名表示的文件或目录。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"16")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public void deleteOnExit()**  <br>在虚拟机终止时，请求删除此抽象路径名表示的文件或目录。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"17")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String[] list()**  <br>返回由此抽象路径名所表示的目录中的文件和目录的名称所组成字符串数组。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"18")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String[] list(FilenameFilter filter)**  <br>返回由包含在目录中的文件和目录的名称所组成的字符串数组，这一目录是通过满足指定过滤器的抽象路径名来表示的。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"19")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public File[] listFiles()**  <br>  返回一个抽象路径名数组，这些路径名表示此抽象路径名所表示目录中的文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"20")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public File[] listFiles(FileFilter filter)**  <br>返回表示此抽象路径名所表示目录中的文件和目录的抽象路径名数组，这些路径名满足特定过滤器。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"21")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean mkdir()**  <br>创建此抽象路径名指定的目录。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"22")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean mkdirs()**  <br>创建此抽象路径名指定的目录，包括创建必需但不存在的父目录。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"23")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean renameTo(File dest)**  <br> 重新命名此抽象路径名表示的文件。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"24")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean setLastModified(long time)**  <br>设置由此抽象路径名所指定的文件或目录的最后一次修改时间。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"25")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean setReadOnly()**  <br>标记此抽象路径名指定的文件或目录，以便只可对其进行读操作。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"26")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public static File createTempFile(String prefix, String suffix, File directory) throws IOException**  <br>在指定目录中创建一个新的空文件，使用给定的前缀和后缀字符串生成其名称。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"27")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public static File createTempFile(String prefix, String suffix) throws IOException**  <br>在默认临时文件目录中创建一个空文件，使用给定前缀和后缀生成其名称。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"28")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public int compareTo(File pathname)**  <br>按字母顺序比较两个抽象路径名。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"29")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public int compareTo(Object o)**  <br>按字母顺序比较抽象路径名与给定对象。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"30")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public boolean equals(Object obj)**  <br>测试此抽象路径名与给定对象是否相等。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span",null,"31")]),l(`
`),n("span",{class:"line"},[n("span",null,"<br>**public String toString()**  <br> 返回此抽象路径名的路径名字符串。<br>```|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"- **实例**")]),l(`
`),n("span",{class:"line"},[n("span",null,"- ==下面的实例演示了====File====对象的使用：==")]),l(`
`),n("span",{class:"line"},[n("span",null,"- **实例**")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==以上实例编译运行结果如下：==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==Directory== ==of== ==/====java====￼====bin== ==is== ==a directory====￼====lib== ==is== ==a directory====￼====demo== ==is== ==a directory====￼====test====.====txt== ==is== ==a file====￼====README== ==is== ==a file====￼====index====.====html== ==is== ==a file====￼====include== ==is== ==a directory==")]),l(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.runoob.com/java/java-file.html\\>")])])])])],-1)])])}const f=a(i,[["render",c]]);export{d as __pageData,f as default};
