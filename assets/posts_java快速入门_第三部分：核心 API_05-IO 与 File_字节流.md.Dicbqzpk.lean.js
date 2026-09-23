import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const S=JSON.parse('{"title":"字节流","description":"","frontmatter":{"title":"字节流","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字节流.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字节流.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字节流.md"};function c(u,l,t,r,o,b){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**一切皆为字节**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**一切文件数据****(****文本、图片、视频等****)****在存储时，都是以二进制数字的形式保存，都一个一个的字节，那么传输时一样如此。所以，字节流可以传输任意文件数据。在操作流的时候，我们要时刻明确，无论使用什么样的流对象，底层传输的始终为二进制数据。**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**字节输出流【****OutputStream****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.io.OutputStream 抽象类是表示字节输出流的所有类的超类，将指定的字节信息写出到目的地。它定义了字节输出流的基本共性功能方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void close() ：关闭此输出流并释放与此流相关联的任何系统资源。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void flush() ：刷新此输出流并强制任何缓冲的输出字节被写出。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void write(byte[] b) ：将 b.length字节从指定的字节数组写入此输出流。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void write(byte[] b, int off, int len) ：从指定的字节数组写入 len字节，从偏移量 offff开始输出到此输出流。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void write(int b) ：将指定的字节输出流。")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"close方法，当完成流的操作时，必须调用此方法，释放系统资源。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**FileOutputStream****类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"OutputStream 有很多子类，我们从最简单的一个子类开始。")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.io.FileOutputStream 类是文件输出流，用于将数据写出到文件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public FileOutputStream(File file) ：创建文件输出流以写入由指定的 File对象表示的文件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public FileOutputStream(String name) ： 创建文件输出流以指定的名称写入文件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"当你创建一个流对象时，必须传入一个文件路径。该路径下，如果没有这个文件，会创建该文件。如果有这个文件，会清空这个文件的数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FileOutputStreamConstructor throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用File对象创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'File file = new File("a.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"FileOutputStream fos = new FileOutputStream(file);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("b.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**写出字节数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. **写出字节**： write(int b) 方法，每次可以写出一个字节数据，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FOSWrite {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("fos.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(97); // 写出第1个字节")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(98); // 写出第2个字节")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(99); // 写出第3个字节")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果会在项目根目录下生成一个fos.txt文件，打开后内容为：abc")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"位（bit）：音译为“比特”，表示二进制位。位是计算机内部数据储存的最小单位。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'Byte（字节）：它的简写为大写字母 “B"。是的。英文字符通常是一个字节，也就是 1B，中文字符通常是两个字节，也就是 2B。')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"字节 Byte 和比特 bit 的换算关系是 1 Byte = 8 bit 。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"虽然参数为int类型四个字节，但是只会保留一个字节的信息写出。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"流操作完毕后，必须释放系统资源，调用close方法，千万记得。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. **写出字节数组**： write(byte[] b) ，每次可以写出数组中的数据，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FOSWrite {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("fos.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 字符串转换为字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,'byte[] b = "黑马程序员".getBytes();')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出字节数组数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(b);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"黑马程序员")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. **写出指定长度字节数组**： write(byte[] b, int off, int len) ,每次写出从off索引开始，len个字节，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FOSWrite {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("fos.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 字符串转换为字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,'byte[] b = "abcde".getBytes();')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(b,2,2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"cd")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数据追加续写**")]),s(`
`),n("span",{class:"line"},[n("span",null,"经过以上的演示，每次程序运行，创建输出流对象，都会清空目标文件中的数据。如何保留目标文件中数据，还能继续添加新数据呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"public FileOutputStream(File file, boolean append) ： 创建文件输出流以写入由指定的 File对象表示的文件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public FileOutputStream(String name, boolean append) ： 创建文件输出流以指定的名称写入文件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这两个构造方法，参数中都需要传入一个boolean类型的值， true 表示追加数据， false 表示清空原有数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这样创建的输出流对象，就可以指定是否追加续写了，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FOSWrite {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("fos.txt"，true);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 字符串转换为字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,'byte[] b = "abcde".getBytes();')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(b);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"文件操作前：cd")]),s(`
`),n("span",{class:"line"},[n("span",null,"文件操作后：cdabcde")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**写出换行**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Windows系统里，换行符号是 \\r\\n 。把以指定是否追加续写了，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FOSWrite {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("fos.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义字节数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] words = {97,98,99,100,101};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< words.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出一个字节")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(words[i]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出一个换行, 换行符号转成数组写出")]),s(`
`),n("span",{class:"line"},[n("span",null,'fos.write("\\r\\n".getBytes());')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"a")]),s(`
`),n("span",{class:"line"},[n("span",null,"b")]),s(`
`),n("span",{class:"line"},[n("span",null,"c")]),s(`
`),n("span",{class:"line"},[n("span",null,"d")]),s(`
`),n("span",{class:"line"},[n("span",null,"e")]),s(`
`),n("span",{class:"line"},[n("span",null,"回车符 \\r 和换行符 \\n ：")]),s(`
`),n("span",{class:"line"},[n("span",null,"回车符：回到一行的开头（return）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"换行符：下一行（newline）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"系统中的换行：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Windows系统里，每行结尾是 回车+换行 ，即 \\r\\n ；")]),s(`
`),n("span",{class:"line"},[n("span",null,"Unix系统里，每行结尾只有 换行 ，即 \\n ；")]),s(`
`),n("span",{class:"line"},[n("span",null,"Mac系统里，每行结尾是 回车 ，即 \\r 。从 Mac OS X开始与Linux统一。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**字节输入流【****InputStream****】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.io.InputStream 抽象类是表示字节输入流的所有类的超类，可以读取字节信息到内存中。它定义了字节输入流的基本共性功能方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void close() ：关闭此输入流并释放与此流相关联的任何系统资源。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract int read() ： 从输入流读取数据的下一个字节。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int read(byte[] b) ： 从输入流中读取一些字节数，并将它们存储到字节数组 b中 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"close方法，当完成流的操作时，必须调用此方法，释放系统资源。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**FileInputStream****类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.io.FileInputStream 类是文件输入流，从文件中读取字节。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"FileInputStream(File file) ： 通过打开与实际文件的连接来创建一个FileInputStream ，该文件由文件系统中的 File对象file命名。")]),s(`
`),n("span",{class:"line"},[n("span",null,"FileInputStream(String name) ： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的路径名 name命名。")]),s(`
`),n("span",{class:"line"},[n("span",null,"当你创建一个流对象时，必须传入一个文件路径。该路径下，如果没有该文件,会抛出 FileNotFoundException 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FileInputStreamConstructor throws IOException{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用File对象创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'File file = new File("a.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"FileInputStream fos = new FileInputStream(file);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fos = new FileInputStream("b.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**读取字节数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. **读取字节**： read 方法，每次可以读取一个字节的数据，提升为int类型，读取到文件末尾，返回 -1 ，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FISRead {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("read.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 读取数据，返回一个字节")]),s(`
`),n("span",{class:"line"},[n("span",null,"int read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char) read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char) read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char) read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char) read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char) read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 读取到末尾,返回‐1")]),s(`
`),n("span",{class:"line"},[n("span",null,"read = fis.read();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println( read);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fis.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"a")]),s(`
`),n("span",{class:"line"},[n("span",null,"b")]),s(`
`),n("span",{class:"line"},[n("span",null,"c")]),s(`
`),n("span",{class:"line"},[n("span",null,"d")]),s(`
`),n("span",{class:"line"},[n("span",null,"e")]),s(`
`),n("span",{class:"line"},[n("span",null,"‐1")]),s(`
`),n("span",{class:"line"},[n("span",null,"循环改进读取方式，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FISRead {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("read.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("read.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，保存数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"int b ；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),s(`
`),n("span",{class:"line"},[n("span",null,"while ((b = fis.read())!=‐1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char)b);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fis.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"a")]),s(`
`),n("span",{class:"line"},[n("span",null,"b")]),s(`
`),n("span",{class:"line"},[n("span",null,"c")]),s(`
`),n("span",{class:"line"},[n("span",null,"d")]),s(`
`),n("span",{class:"line"},[n("span",null,"e")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 虽然读取了一个字节，但是会自动提升为int类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 流操作完毕后，必须释放系统资源，调用close方法，千万记得。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用字节数组读取**： read(byte[] b) ，每次读取b的长度个字节到数组中，返回读取到的有效字节个数，读取到末尾时，返回 -1 ，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FISRead {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象.")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，作为有效个数")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len ；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义字节数组，作为装字节数据的容器")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (( len= fis.read(b))!=‐1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 每次读取后,把数组变成字符串打印")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(new String(b));")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fis.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ab")]),s(`
`),n("span",{class:"line"},[n("span",null,"cd")]),s(`
`),n("span",{class:"line"},[n("span",null,"ed")]),s(`
`),n("span",{class:"line"},[n("span",null,"错误数据 d ，是由于最后一次读取时，只读取一个字节 e ，数组中，上次读取的数据没有被完全替换，所以要通过 len ，获取有效的字节，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FISRead {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象.")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，作为有效个数")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len ；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义字节数组，作为装字节数据的容器")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (( len= fis.read(b))!=‐1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 每次读取后,把数组的有效字节部分，变成字符串打印")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(new String(b，0，len));// len 每次读取的有效字节个数")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fis.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ab")]),s(`
`),n("span",{class:"line"},[n("span",null,"cd")]),s(`
`),n("span",{class:"line"},[n("span",null,"e")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用数组读取，每次读取多个字节，减少了系统间的IO操作次数，从而提高了读写的效率，建议开发中使用。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**字节流练习：图片复制**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**复制原理图解**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例实现**复制图片文件，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Copy {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.1 指定数据源")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileInputStream fis = new FileInputStream("D:\\\\test.jpg");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 1.2 指定目的地")]),s(`
`),n("span",{class:"line"},[n("span",null,'FileOutputStream fos = new FileOutputStream("test_copy.jpg");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.读写数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.1 定义数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte[] b = new byte[1024];")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.2 定义长度")]),s(`
`),n("span",{class:"line"},[n("span",null,"int len;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.3 循环读取")]),s(`
`),n("span",{class:"line"},[n("span",null,"while ((len = fis.read(b))!=‐1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 2.4 写出数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.write(b, 0 , len);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 3.关闭资源")]),s(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"fis.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"流的关闭原则：先开后关，后开先关。")])])])])],-1)])])}const m=a(i,[["render",c]]);export{S as __pageData,m as default};
