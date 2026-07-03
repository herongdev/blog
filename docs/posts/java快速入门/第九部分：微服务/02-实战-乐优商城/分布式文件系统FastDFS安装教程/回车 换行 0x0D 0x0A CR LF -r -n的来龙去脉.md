---
title: 回车 换行 0x0D 0x0A CR LF -r -n的来龙去脉
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
**【回车和换行的历史】**
在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意，每秒钟可以打10个字符。但是它有一个问题，就是打完一行，需要回车换行，此过程，要用去0.2秒，正好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。
于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做“回车”，告诉打字机把打印头定位在左边界；另一个叫做“换行”，告诉打字机把纸向下移一行。
 
**【关于回车和换行的更详细的解释】**
首先，打字机打完一行，意味着，从左到右把一行的字打完了，此时打印机的打印头处于最右边，所以，想要继续打字，需要（1）将把打印头移动到最左边，然后（2）打字所用的纸张，换到下一行。
而（1）打印头移动到最左边的动作，称之为回车；
（2）打字所用的纸张换到下一行，称之为换行。其是通过打字机的滚筒滚动，将纸向前滚动，就相当于打印头换了一行，处在新一行的最左边的开始的位置了，即所谓的走纸。
 
这就是“回车”和“换行”的来历，从它们的英语名字上也可以看出一二。
 
对应到计算机系统中：
回车：将当前光标移动到同一行中的最左边（假设是从左到右的输入方式）
换行：保持当前光标的水平位置位置不变，换到下一行。
 
因此，将回车和换行联合起来，才是我们所常理解的含义：
输入完一行后，回车换行到下一行，即光标不仅仅是回到了最左边，而且也换到了下一行。
 
**【不同系统中表示回车换行含义所用字符不同】**
后来，计算机发明了，这两个概念也就被般到了计算机上。那时，存储器很贵，一些科学家认为在每行结尾加两个字符太浪费了，加一个就可以。于是，就出现了分歧。
不同的系统里面，对于同样一个”回车换行”的含义，所用的字符不同：
**Table** **1** **不同系统中回车换行对应的字符**
|
|
**系统类型**

**回车换行所用字符**

**Linux/Unix**

**\n = Newline = 0x0A = 10 = LF =Line Feed =** **换行** **= Ctrl + J**

**Mac**

**\r = Return = 0x0D = 13 = CR = Carriage Return =** **回车** **= Ctrl + M**

**Windows/Dos**

**\r \n = 0x0D 0x0A = CR LF =** **回车 换行**

 
提示：
1. 对应的，在Linux中通过键盘输入Enter回车键，输入的是\n=0x0A, 而Windows中的Enter键则是输入的是0x0D 0x0A。
2.其中关于0x0A对应的着Ctrl + J，0x0D对应着Ctrl + M等等相关的ASCII的控制字符及输入方式，可参见：
==ASCII====字符集中的功能====/====控制字符==
[https://www.crifan.com/files/doc/docbook/char_encoding/release/html/char_encoding.html#ascii_ctrl_char](https://www.crifan.com/files/doc/docbook/char_encoding/release/html/char_encoding.html#ascii_ctrl_char)
3.后来看到[How to use regular expressions in Notepad++ (tutorial)](https://sourceforge.net/apps/mediawiki/notepad-plus/index.php?title=Regular_Expressions)中的解释得知，原来Mac 9及之前版本，是用EOL字符作为换行符的，OSX及之后，才开始用\n表示换行。
 
**【由于回车换行在不同系统中所用不同字符所导致的问题及解决办法】**
**1. Linux****中打开****Windows****中的文件**
由于Linux用\n=0x0A=10=LF来表示换行，所以，打开Windows中的文件的时候，如果其中有换行，即其中有\r \n= 0x0D 0x0A，此时，就会被处理为，只将n理解为换行，而把r看作为一个单独的字符，此r字符，对应ASCII的值是0x0D=13,是个控制字符，对应的是用Ctrl+M=一个Ctrl加上一个大写的M字符，在Linux中的文本编辑器中，如Vi中，对应显示为一个“^M“。
 
解决办法：
（1）Linux下，用命令：
[?](https://www.crifan.com/detailed_carriage_return_0x0d_0x0a_cr_lf__r__n_the_context/#)
|
|
1

tr -d "15" \< myfile.txt \> myfile_new.txt

将其中^M去除掉。其中15中的015是八进制的15=十进制的13=十六进制的0x0D。
（2）或者用dos2unix工具处理：
[?](https://www.crifan.com/detailed_carriage_return_0x0d_0x0a_cr_lf__r__n_the_context/#)
|
|
1

dos2unix file_name

详情参见：
==【整理】如何取消====Linux====下，====vi====中显示的====^M====符号==
[https://www.crifan.com/order_how_to_cancel_under_linux_vi__m_symbol_in_the_display/](https://www.crifan.com/order_how_to_cancel_under_linux_vi__m_symbol_in_the_display/)
**2. Mac****中打开****Windows****中的文件**
同理，Mac中打开Windows中的文件，如果有回车换行的话，只会识别其中的\r=0x0D,而将余下的\n=0xA=LF看成一个单独的字符，显示出“^J”。
 
**3. Windows****中打开****Mac****或****Linux****中的文件**
经过测试，发现，在windows中，估计把原先的0x0D 0x0A去掉其中任何一个的话，然后用windows下的文本类编辑器再去打开，发现：
除了最简单的Windows自带的Notepad，无法正常识别回车换行，内容被显示到同一行中之外；其他一些编辑器，如Notepad2，Notepad++，Windows自带的记事本WordPad，都可以正常识别成回车换行，不会将内容都输出在同一行。
对应的，也可以通过Notepad++来实现在Linux，Windows，Mac这三种格式中来回转换，详情参考：
==Notepad++====中====Windows,Unix,Mac====三种格式之间的转换==
[https://www.crifan.com/files/doc/docbook/crifan_rec_soft/release/html/crifan_rec_soft.html#npp_func_windows_unix_mac](https://www.crifan.com/files/doc/docbook/crifan_rec_soft/release/html/crifan_rec_soft.html#npp_func_windows_unix_mac)
 
 
**【引用】**
1.  回车与换行的故事
[http://huangyunbin.iteye.com/blog/1112171](http://huangyunbin.iteye.com/blog/1112171)
 
2. Carriage return
[http://en.wikipedia.org/wiki/Carriage_return](http://en.wikipedia.org/wiki/Carriage_return)
 
3. 回车和换行的区别
[http://bbs.chinaunix.net/thread-393307-1-1.html](http://bbs.chinaunix.net/thread-393307-1-1.html)
 
4. 回车和换行有什么区别？我们平时按下的Enter键是回车还是换行？[原创]
[http://www.52rd.com/blog/Detail_RD.Blog_imjacob_12317.html](http://www.52rd.com/blog/Detail_RD.Blog_imjacob_12317.html)
 
5. 【整理】回车（\r, return, CR, Carriage Return）和换行（\n, newline, LF, Line Feed)有什么区别
[https://www.crifan.com/order_return__r_return_cr_carriage_return_and_line_feed__n_newline_lf_line_feed_what_is_the_difference/](https://www.crifan.com/order_return__r_return_cr_carriage_return_and_line_feed__n_newline_lf_line_feed_what_is_the_difference/)
转载请注明：[在路上](https://www.crifan.com/) » [【详解】回车](https://www.crifan.com/detailed_carriage_return_0x0d_0x0a_cr_lf__r__n_the_context/) 换行 0x0D 0x0A CR LF \r \n的来龙去脉
 \> 来自

 \<https://www.crifan.com/detailed_carriage_return_0x0d_0x0a_cr_lf__r__n_the_context/\>
```
