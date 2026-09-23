import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"字符流","description":"","frontmatter":{"title":"字符流","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字符流.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字符流.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/字符流.md"};function c(u,s,t,r,o,f){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当使用字节流读取文本文件时，可能会有一个小问题。就是遇到中文字符时，可能不会显示完整的字符，那是因为一个中文字符可能占用多个字节存储。所以Java提供一些字符流类，以字符为单位读写数据，专门用于处理文本文件。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**字符输入流【****Reader****】**")]),l(`
`),n("span",{class:"line"},[n("span",null,"java.io.Reader 抽象类是表示用于读取字符流的所有类的超类，可以读取字符信息到内存中。它定义了字符输入流的基本共性功能方法。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public void close() ：关闭此流并释放与此流相关联的任何系统资源。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public int read() ： 从输入流读取一个字符。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public int read(char[] cbuf) ： 从输入流中读取一些字符，并将它们存储到字符数组 cbuf中 。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**FileReader****类**")]),l(`
`),n("span",{class:"line"},[n("span",null,"java.io.FileReader 类是读取字符文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：1. 字符编码：字节与字符的对应规则。Windows系统的中文编码默认是GBK编码表。")]),l(`
`),n("span",{class:"line"},[n("span",null,"idea中UTF-8。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. 字节缓冲区：一个字节数组，用来临时存储字节数据。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"FileReader(File file) ： 创建一个新的 FileReader ，给定要读取的File对象。")]),l(`
`),n("span",{class:"line"},[n("span",null,"FileReader(String fileName) ： 创建一个新的 FileReader ，给定要读取的文件的名称。当你创建一个流对象时，必须传入一个文件路径。类似于FileInputStream 。")]),l(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileReaderConstructor throws IOException{")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用File对象创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'File file = new File("a.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"FileReader fr = new FileReader(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileReader fr = new FileReader("b.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**读取字符数据**")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. **读取字符**：read 方法，每次可以读取一个字符的数据，提升为int类型，读取到文件末尾，返回 -1 ，循环读取，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FRRead {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileReader fr = new FileReader("read.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，保存数据")]),l(`
`),n("span",{class:"line"},[n("span",null,"int b ；")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),l(`
`),n("span",{class:"line"},[n("span",null,"while ((b = fr.read())!=‐1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println((char)b);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fr.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"黑")]),l(`
`),n("span",{class:"line"},[n("span",null,"马")]),l(`
`),n("span",{class:"line"},[n("span",null,"程")]),l(`
`),n("span",{class:"line"},[n("span",null,"序")]),l(`
`),n("span",{class:"line"},[n("span",null,"员")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：虽然读取了一个字符，但是会自动提升为int类型。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**使用字符数组读取**： read(char[] cbuf) ，每次读取b的长度个字符到数组中，返回读取到的有效字符个数，读取到末尾时，返回 -1 ，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FRRead {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileReader fr = new FileReader("read.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，保存有效字符个数")]),l(`
`),n("span",{class:"line"},[n("span",null,"int len ；")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 定义字符数组，作为装字符数据的容器")]),l(`
`),n("span",{class:"line"},[n("span",null,"char[] cbuf = new char[2];")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),l(`
`),n("span",{class:"line"},[n("span",null,"while ((len = fr.read(cbuf))!=‐1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(new String(cbuf));")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fr.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"黑马")]),l(`
`),n("span",{class:"line"},[n("span",null,"程序")]),l(`
`),n("span",{class:"line"},[n("span",null,"员序")]),l(`
`),n("span",{class:"line"},[n("span",null,"获取有效的字符改进，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FISRead {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileReader fr = new FileReader("read.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量，保存有效字符个数")]),l(`
`),n("span",{class:"line"},[n("span",null,"int len ；")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 定义字符数组，作为装字符数据的容器")]),l(`
`),n("span",{class:"line"},[n("span",null,"char[] cbuf = new char[2];")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环读取")]),l(`
`),n("span",{class:"line"},[n("span",null,"while ((len = fr.read(cbuf))!=‐1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(new String(cbuf,0,len));")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fr.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"黑马")]),l(`
`),n("span",{class:"line"},[n("span",null,"程序")]),l(`
`),n("span",{class:"line"},[n("span",null,"员")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**字符输出流【****Writer****】**java.io.Writer 抽象类是表示用于写出字符流的所有类的超类，将指定的字符信息写出到目的地。它定义了字节输出流的基本共性功能方法。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void write(int c) 写入单个字符。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void write(char[] cbuf) 写入字符数组。")]),l(`
`),n("span",{class:"line"},[n("span",null,"abstract void write(char[] cbuf, int off, int len) 写入字符数组的某一部分,offff数组的开始索引,len写的字符个数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void write(String str) 写入字符串。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void write(String str, int off, int len) 写入字符串的某一部分,offff字符串的开始索引,len写的字符个数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void flush() 刷新该流的缓冲。")]),l(`
`),n("span",{class:"line"},[n("span",null,"void close() 关闭此流，但要先刷新它。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**FileWriter****类**")]),l(`
`),n("span",{class:"line"},[n("span",null,"java.io.FileWriter 类是写出字符到文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"FileWriter(File file) ： 创建一个新的 FileWriter，给定要读取的File对象。")]),l(`
`),n("span",{class:"line"},[n("span",null,"FileWriter(String fileName) ： 创建一个新的 FileWriter，给定要读取的文件的名称。")]),l(`
`),n("span",{class:"line"},[n("span",null,"当你创建一个流对象时，必须传入一个文件路径，类似于FileOutputStream。")]),l(`
`),n("span",{class:"line"},[n("span",null,"构造举例，代码如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,"**基本写出数据**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**写出字符**： write(int b) 方法，每次可以写出一个字符数据，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FileWriterConstructor {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用File对象创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'File file = new File("a.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"FileWriter fw = new FileWriter(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("b.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FWWrite {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("fw.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(97); // 写出第1个字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('b'); // 写出第2个字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('C'); // 写出第3个字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(30000); // 写出第4个字符，中文编码表中30000对应一个汉字。")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"【注意】关闭资源时,与FileOutputStream不同。")]),l(`
`),n("span",{class:"line"},[n("span",null,"如果不关闭,数据只是保存到缓冲区，并未保存到文件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"// fw.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),l(`
`),n("span",{class:"line"},[n("span",null,"abC田")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. 虽然参数为int类型四个字节，但是只会保留一个字符的信息写出。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. 未调用close方法，数据只是保存到了缓冲区，并未写出到文件中。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**关闭和刷新**")]),l(`
`),n("span",{class:"line"},[n("span",null,"因为内置缓冲区的原因，如果不关闭输出流，无法写出字符到文件中。但是关闭的流对象，是无法继续写出数据的。如果我们既想写出数据，又想继续使用流，就需要 flush 方法了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"flush ：刷新缓冲区，流对象可以继续使用。")]),l(`
`),n("span",{class:"line"},[n("span",null,"close :先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。")]),l(`
`),n("span",{class:"line"},[n("span",null,"代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FWWrite {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("fw.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据，通过flush")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('刷'); // 写出第1个字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.flush();")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('新'); // 继续写出第2个字符，写出成功")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.flush();")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据，通过close")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('关'); // 写出第1个字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write('闭'); // 继续写出第2个字符,【报错】java.io.IOException: Stream closed")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：即便是flush方法写出了数据，操作的最后还是要调用close方法，释放系统资源。")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**写出字符数组** ： write(char[] cbuf) 和 write(char[] cbuf, int off, int len) ，每次可以写出字符数组中的数据，用法类似FileOutputStream，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FWWrite {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("fw.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 字符串转换为字节数组")]),l(`
`),n("span",{class:"line"},[n("span",null,'char[] chars = "黑马程序员".toCharArray();')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出字符数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(chars); // 黑马程序员")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(b,2,2); // 程序")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**写出字符串**： write(String str) 和 write(String str, int off, int len) ，每次可以写出字符串中的数据，更为方便，代码使用演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FWWrite {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("fw.txt");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,'String msg = "黑马程序员";')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出字符数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(msg); //黑马程序员")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.write(msg,2,2); // 程序")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fos.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**续写和换行**：操作类似于FileOutputStream。")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class FWWrite {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 使用文件名称创建流对象，可以续写数据")]),l(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("fw.txt"，true);')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,'fw.write("黑马");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出换行")]),l(`
`),n("span",{class:"line"},[n("span",null,'fw.write("\\r\\n");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 写出字符串")]),l(`
`),n("span",{class:"line"},[n("span",null,'fw.write("程序员");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 关闭资源")]),l(`
`),n("span",{class:"line"},[n("span",null,"fw.close();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"输出结果:")]),l(`
`),n("span",{class:"line"},[n("span",null,"黑马")]),l(`
`),n("span",{class:"line"},[n("span",null,"程序员")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：字符流，只能操作文本文件，不能操作图片，视频等非文本文件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"当我们单纯读或者写文本文件时 使用字符流 其他情况使用字节流")])])])])],-1)])])}const F=a(i,[["render",c]]);export{d as __pageData,F as default};
