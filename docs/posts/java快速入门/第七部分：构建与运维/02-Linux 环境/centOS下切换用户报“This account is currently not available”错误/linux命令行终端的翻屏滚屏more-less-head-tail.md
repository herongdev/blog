---
title: linux命令行终端的翻屏滚屏more-less-head-tail
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
`(2018-05-03 14:17:27)`

[![Exported image](Exported%20image%2020260702224810-0.gif)](javascript:;)

[转载▼](http://javascript:;)
分类： [LAMP/LNMP](http://blog.sina.com.cn/s/articlelist_1890348012_4_1.html)开发
屏幕翻页快捷键
 
shift+PgUp    向前翻看,一般翻13页左右。
shift+PgDown  向后翻看,一般翻13页左右。
 
 
我们翻阅目录和打开文件后，经常会由于输出内容太多，使一屏无法显示，所以我们要经常用到这些命令,下面我们尝试下这些命令：
 
ls -l /etc |more
less -N /etc/profile 显示行号
less的动作命令:
j 向下移动一行；同vi
k 向上移动一行；同vi
f 向下滚动一屏；forword
b 向上滚动一屏；backword
head -n 10 /etc/profile  显示/etc/profile的前10行内容
tail -n 5 /etc/profile   显示/etc/profile的最后5行内容
 
以上部分命令，请使用q退出。
 
 
下面我们就细说下这几个命令
 
**more**
 
more 是我们最常用的工具之一，最常用的就是显示输出的内容，然后根据窗口的大小进行分页显示，然后还能提示文件的百分比；
 
# more /etc/profile
 
more 的语法、参数和命令；
more [参数选项] [文件]
 
参数如下：
+num                    从第num行开始显示；
-num                    定义屏幕大小，为num行；
+/pattern               从pattern 前两行开始显示；
-c                      从顶部清屏然后显示；
-d                      提示Press space to continue, 'q' to quit.（按空 键继续，按q键退出），禁用响铃功能；
-l                      忽略Ctrl+l （换页）字符；
-p                      通过清除窗口而不是滚屏来对文件进行换页。和-c参数有点相似； 
-s                      把连续的多个空行显示为一行；
-u                      把文件内容中的下划线去掉
 
退出more的动作指令是q
 
more 的参数应用举例；
# more -dc /etc/profile    注：显示提示，并从终端或控制台顶部显示；
# more +4 /etc/profile      注：从profile的第4行开始显示；
# more -4 /etc/profile      注：每屏显示4行；
# more +/MAIL /etc/profile     注：从profile中的第一个MAIL单词的前两行开始显示；
 
more 的动作指令；
 
我们查看一个内容较大的文件时，要用到more的动作指令，比如ctrl+f（或空格键）是向下显示一屏，ctrl+b是返回上一屏； Enter键可以向下滚动显示n行，要通过定，默认为1行；
 
以下几个常用的；
Enter         向下n行，需要定义，默认为1行；
Ctrl+f        向下滚动一屏；
空 键         向下滚动一屏；
Ctrl+b        返回上一屏；
=             输出当前行的行号；
:f            输出文件名和当前行的行号；
v             调用vi编辑器；
! 命令        调用Shell，并执行命令；
q             退出more
 
当我们查看某一文件时，想调用vi来编辑它，不要忘记了v动作指令，这是比较方便的；
 
其它命令通过管道和more结合的运用例子；
比如我们列一个目录下的文件，由于内容太多，我们应该学会用more来分页显示。这得和管道 | 结合起来，比如：
# ls -l /etc  |more
 
 
**less** 
 
less 查看文件内容 工具；
less 工具也是对文件或其它输出进行分页显示的工具，应该说是linux正统查看文件内容的工具，功能极其强大；您是初学者，我建议您用less。由于less的内容太多，我们把最常用的介绍一下；
 
less的语法格式；
less [参数]  文件 
 
常用参数
-c 从顶部（从上到下）刷新屏幕，并显示文件内容。而不是通过底部滚动完成刷新；
-f 强制打开文件，二进制文件显示时，不提示警告；
-i 搜索时忽略大小写；除非搜索串中包含大写字母；
-I 搜索时忽略大小写，除非搜索串中包含小写字母；
-m 显示读取文件的百分比；
-M 显法读取文件的百分比、行号及总行数；
-N 在每行前输出行号；
-p  pattern 搜索pattern；比如在/etc/profile搜索单词MAIL，就用 less -p MAIL /etc/profile
-s 把连续多个空白行作为一个空白行显示；
-Q 在终端下不响铃；
 
比如：我们在显示/etc/profile的内容时，让其显示行号；
# less -N    /etc/profile
 
less的动作命令；
进入less后，我们得学几个动作，这样更方便我们查阅文件内容；最应该记住的命令就是q，这个能让less终止查看文件退出；
 
动作
回车键 向下移动一行；
y 向上移动一行；
空格键 向下滚动一屏；
b 向上滚动一屏；
d 向下滚动半屏；
h less的帮助；
u 向上洋动半屏；
w 可以指定显示哪行开始显示，是从指定数字的下一行显示；比如指定的是6，那就从第7行显示；
g 跳到第一行；
G 跳到最后一行；
p n% 跳到n%，比如 10%，也就是说比整个文件内容的10%处开始显示；
/pattern 搜索pattern ，比如 /MAIL表示在文件中搜索MAIL单词；
v 调用vi编辑器；
q 退出less
!command 调用SHELL，可以运行命令；比如!ls 显示当前列当前目录下的所有文件；
 
就less的动作来说，内容太多了，用的时候查一查man less是最好的。在这里就不举例子了；
 
**head**
 
head 是显示一个文件的内容的前多少行；
 
用法比较简单；
head  -n  行数值  文件名；
 
比如我们显示/etc/profile的前10行内容，应该是：
# head -n 10 /etc/profile
 
**tail**
 
tail 是显示一个文件的内容的后多少行；
用法比较简单；
tail   -n  行数值  文件名；
 
比如我们显示/etc/profile的最后5行内容，应该是：
# tail  -n 5 /etc/profile
 \> 来自

 \<http://blog.sina.com.cn/s/blog_70ac6bec0102yxf7.html\>
```
