import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"Linux入门介绍","description":"","frontmatter":{"title":"Linux入门介绍","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Linux入门介绍.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Linux入门介绍.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Linux入门介绍.md"};function t(u,a,c,r,o,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**从操作系统说起**")]),s(`
`),n("span",{class:"line"},[n("span",null,"说到Linux呢，肯定要知道它是怎么来的，所以要从操作系统讲起。")]),s(`
`),n("span",{class:"line"},[n("span",null,"早期的machine用的是一条记录有数据和程序的卡片punch card，后期用打孔纸带。后来引入了代码库帮助输入输出，这是OS的雏形。大型机时代采用OS/360系统（360 machine由IBM开发），之后小型机时代的巨头是AT&T公司的UNIX系统。个人计算机时代：Apple，DOS，more。随着显示设备和处理器成本的降低，操作系统开始提供用户图形界面。开始出现了X Window，Microsoft的Windows系列，苹果公司的Mac OS和IBM公司的OS/2等。今天，个人计算机的系统基本采用windows和Mac。")]),s(`
`),n("span",{class:"line"},[n("span",null,"综上，UNIX系统是祖宗——被遗忘的祖宗。而Linux就是UNIX家族中的天秀，它的起源也极具传奇色彩。1991年由Linus提出的内核（严格意义上的Linux），加上Linus在网络世界中的各路本着开源思想的大神帮忙编写的应用程序，就成为了Linux操作系统，这是一种自由和开放源代码的类UNIX操作系统（企业及个人可以获得Linux源代码），也是自由软件和开放源代码软件发展中最著名的例子。目前流行的发行版本有：Debian，CentOS，Ubuntu，RedHat。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**从****Windows****到****Linux****体验**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在****Windows****桌面下**")]),s(`
`),n("span",{class:"line"},[n("span",null,"做这几件事情：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"新建一个文件夹，test")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"进入文件夹")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在文件夹中，新建一个文档test.txt")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在文档中写入“ hello windows! ”")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"删除整个文件夹")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**不用多说，半分钟内就可以完成，不会的我真的要怀疑你是不是从原始时代穿越来的。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在****CMD****命令台下**")]),s(`
`),n("span",{class:"line"},[n("span",null,"同样做上面几件事情。")]),s(`
`),n("span",{class:"line"},[n("span",null,"可能还是有人在半分钟内完成了，但绝大部分人只好无奈打开度娘了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么首先，按下win+R ，在弹出的运行窗口中输入CMD 便可以进入Windows系统的命令台啦，也叫终端界面，平时写的C语言黑框程序就是在这里执行显示的啦。")]),s(`
`),n("span",{class:"line"},[n("span",null,"#一般打开CMD之后，你所在的位置是系统盘下的用户主目录，也就是￼C:\\User\\username\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"#输入dir命令可以查看当前目录下的文件夹以及文件，利用cd命令跳转到桌面￼C:\\User\\username\\> cd Desktop")]),s(`
`),n("span",{class:"line"},[n("span",null,"#友情提示：CMD下命令（即系统脚本）不区分大小写，且按tab可自动补全￼#另外，当使用dir命令列出当前目录下文件时，一般头两个文件都是.和..￼#这两个是目录文件，.代表当前目录，..代表上一层目录")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第一件事：新建文件夹test，新建完可以返回桌面查看一下是不是多了一个文件夹￼C:\\User\\username\\Desktop\\> mkdir test")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第二件事：进入文件夹￼C:\\User\\username\\Desktop\\> cd test")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第三件事：新建文档test.txt，使用notepad命令你会发现打开了记事本，写入、保存￼C:\\User\\username\\Desktop\\test\\> notepad test.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第四件事：删除整个文件夹￼C:\\User\\username\\Desktop\\test\\> del test.txt￼C:\\User\\username\\Desktop\\test\\> cd ..￼C:\\User\\username\\Desktop\\> rmdir test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在****Linux****终端下**")]),s(`
`),n("span",{class:"line"},[n("span",null,"同样做以上几件事情。")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先你得有台machine装了Linux啊！那我们先采用虚拟机的方式，centos7安装教程附在文末。")]),s(`
`),n("span",{class:"line"},[n("span",null,"假如你成功进入了Linux系统，假如你能看到下面这个界面：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"centos一共有7个界面，可以按Ctrl+Alt+F1~F7 进行切换，其中F1 是图形界面，其它几个是文字界面，现在看到的这个界面就是默认的F1。为了方便，我们现在像在windows下直接在图形界面打开终端。选择Application\\>Favorites\\>Terminal 便会弹出终端，开始执行命令：")]),s(`
`),n("span",{class:"line"},[n("span",null,"#同理，你所在的位置是系统盘下的用户主目录，在Linux下用符号~表示￼[user_name@machine_name ~]$")]),s(`
`),n("span",{class:"line"},[n("span",null,"#输入ls命令可以查看当前目录下的文件夹以及文件，利用cd命令跳转到桌面￼[user_name@machine_name ~]$ cd Desktop")]),s(`
`),n("span",{class:"line"},[n("span",null,"#注意，在Linux下权限的规定是很严格的，$代表当前登录用户，这也是在安装虚拟机时建立的第一个用户￼#此外，在Linux系统中还有一个默认存在的超级用户root，拥有最高权限，可以读写和执行每一个用户的文件￼#通过命令su可切换至super user即超级用户，这时命令提示符会由$变成#")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第一件事：新建文件夹test￼[user_name@machine_name ~]$ mkdir test")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第二件事：进入文件夹￼[user_name@machine_name Desktop]$ cd test")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第三件事：新建文档test.txt，使用nano编辑器，写入、保存（事实上，Linux下的文件可以不加后缀）￼[user_name@machine_name Desktop]$ notepad test.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"#第四件事：删除整个文件夹￼[user_name@machine_name Desktop]$ rm test.txt￼[user_name@machine_name Desktop]$ cd ..￼[user_name@machine_name ~]$ rmdir test")]),s(`
`),n("span",{class:"line"},[n("span",null,"**小结**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Linux****一般分为****Desktop****版本和****Server****版本，大多数情况下我们是使用文字界面来编程以及管理我们的文件系统。对于****Linux****终端来说，有****100****个左右的命令需要我们随时记住，比如编译程序用的****gcc** **、操作目录用的****cd/mkdir** **、下载安装的****apt-get install** **。。然后剩下的几千个命令呢？你只要学会使用****man** **查询使用方法以及参数配置就行了。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Linux****的优缺点**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Linux有许多windows以及Mac这种主打图形交互界面的系统所无法比拟的优点：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"稳定，Linux主机由于采用了Linux强大的内核，并且采用终端控制，因此更加稳定，适合搭建服务器。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"开源，由于Linux是开源的操作系统，个人及企业可以获取底层源码，按需修改，因此Linux有很多版本。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"安全，Linux更容易查杀系统漏洞。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"多进程多用户，Linux支持大规模的几百人同时工作。多进程的实现在于CPU控制权的交替，windows XP以上版本都支持多用户，但这是假的多用户，同一时间只能有一个用户拥有主机的资源，而Linux实现的多用户是支持很多人同时连接一台终端主机工作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"用户和组的规划，这是Linux在企业管理层面上的部署方案。不同项目组通过同一个主机工作，同一个组内的员工可以可看但不可修改彼此的代码，权限为r-x，而项目组长则拥有组内最高权限，对本项目组rwx，而对其他项目组r-x；而企业老板则有系统最高权限，root。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"耗用资源少，一般一台奔腾100以上的主机就可以供得起Linux。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"适合小核心程序的嵌入式工程。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**当然，****Linux****的致命缺点，命令行的交互方式始终无法流行，使得使用率无法提高，一般只用于搭建家庭服务器，无法普及到每台个人计算机。**")])])])])],-1)])])}const L=l(i,[["render",t]]);export{x as __pageData,L as default};
