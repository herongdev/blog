---
title: 虚拟机CenterOS 7.X安装过程
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
**Cent OS 7** **安装****(****基于****VMware Workstation 14.0)**
**Linux****操作系统是具有可移植性的**

[Cent OS](https://links.jianshu.com/go?to=http%3A%2F%2Fvault.centos.org)官网（境外服务器）

[阿里云（仅支持下载最新版本的](https://links.jianshu.com/go?to=https%3A%2F%2Fopsx.alibaba.com%2Fmirror)Cent OS）

**下载镜像** **（本文以阿里云下载****Cent OS 7.6.1810****为例）**
![Exported image](Exported%20image%2020260702224256-0.png)

1.登录网站后选择镜像后，直接点击右侧的下载镜像按钮；
2.单击Cent OS进入选择版本界面；
3.选择需要下载的版本；
4.选择isos（镜像文件目录）；
6.选择需要下载的操作系统（建议下载DVD版）；

DVD是普通的光盘版，类似于标准版

Everything是包含全部软件和内容的版本

LiveGNOME/KDE是演示版

Minimal是最小安装版（不建议新手使用）

NetInstall是网络安装版

_.iso__是镜像文件可以直接下载，__.torrent__是磁力链接文件，通过磁力下载器下载镜像文件，__1810__代表是该镜像文件发布于__2018__年__10__月份_

**创建虚拟机**
1.打开软件后选择文件，选择新建虚拟机，选择自定义安装，单击下一步；
2.在虚拟机兼容性界面，直接单击下一步；（默认配置即可）
![Exported image](Exported%20image%2020260702224307-1.png)

`3.选择稍后安装操作系统，单击下一步；`

![Exported image](Exported%20image%2020260702224309-2.png)

`4.客户机操作系统选择Linux，版本在下拉菜单中选择Cent OS 7 64位，单击下一步；`

![Exported image](Exported%20image%2020260702224313-3.png)

`5.编辑虚拟机名称和位置，单击下一步；`

![Exported image](Exported%20image%2020260702224316-4.png)

`6.选择处理器的数量，新手建议默认即可；`

![Exported image](Exported%20image%2020260702224322-5.png)

7.选择内存容量，建议安装系统时选择2G；安装好系统后，可以调整为1G；￼_据说当内存＜__1G__时，安装__Cent OS 6__或__7__会失败，本人没试验过。_
![Exported image](Exported%20image%2020260702224325-6.png)

8.网络类型，选择默认的NAT即可；理解其他选项可能需要些网络知识，暂时保证虚拟机能借助宿主机能上网即可；
![Exported image](Exported%20image%2020260702224327-7.png)

`9.I/O控制器类型和磁盘类型，均使用默认的推荐值即可；`

![Exported image](Exported%20image%2020260702224329-8.png) ![Exported image](Exported%20image%2020260702224331-9.png)

`10.选择创建新的虚拟磁盘，然后单击下一步；`

![Exported image](Exported%20image%2020260702224332-10.png)

11.选择磁盘容量，默认值20G就够新手学习使用；选择将虚拟磁盘存储为单个文件，这样便于虚拟机系统文件的移植和管理；
![Exported image](Exported%20image%2020260702224335-11.png)

`12.编辑磁盘文件名称，选择下一步；`

![Exported image](Exported%20image%2020260702224342-12.png)

13.在新建虚拟机向导的最后界面，检查所配置的硬件信息，确认后可以单击完成；当然单击完成后，需要更改虚拟机硬件可以在虚拟机—\>设置中更改；
![Exported image](Exported%20image%2020260702224344-13.png)

`14.创建好虚拟机后，单击光驱；在弹出的界面中选择启动时连接，并为光驱指定ISO镜像文件的位置；`

![Exported image](Exported%20image%2020260702224346-14.png) ![Exported image](Exported%20image%2020260702224350-15.png)

`15.上述步骤操作完成，一切准备就绪后，单击开启此虚拟机，准备开始安装系统；`

![Exported image](Exported%20image%2020260702224352-16.png)

**3.****安装系统**
1.用方向键选择“Install Cent OS 7”，并按下“Tab”键，在光标闪烁处输入“net.ifnames=0和biosdevname=0”；最后单击“回车”键启动光盘安装程序；￼_net.ifnames=0__和__biosdevname=0__是禁止系统初始化设备名称_
![Exported image](Exported%20image%2020260702224357-17.png) ![Exported image](Exported%20image%2020260702224359-18.png)
![Exported image](Exported%20image%2020260702224405-19.png)

2.选择安装系统时所用的语言；建议选择英语；￼_我的老师告诉我，学习__Linux__要尽量的去熟悉英语，虽然学了__20__多年都没学会，但是也不要放弃接近它的机会；_
![Exported image](Exported%20image%2020260702224407-20.png)
3.Cent OS 7与Cent OS 6不同的地方，就是Cent OS 7不是按照流程设置，而是根据选项进行逐项设置；
![Exported image](Exported%20image%2020260702224411-21.png)
![Exported image](Exported%20image%2020260702224415-22.png)

4.我们首先来设置主机网络和主机名；首先设置一个主机名（刚开始时主机名可能不是很重要），设置好主机名并应用后选择要配置的网卡，进行配置；第11步标识代表设置网卡开机启动，第14步代表手动设置网卡地址，第16步代表手动指定主机的IP地址、网络掩码以及主机网关，第17步代表指定主机的DNS地址；
![Exported image](Exported%20image%2020260702224420-23.png)
![Exported image](Exported%20image%2020260702224425-24.png)

￼_如果__net.ifnames=0__和__biosdevname=0__设置错误，那么这时你的主机名应该是__ens33__而不是__eth0,ens33__默认是__Cent OS 7__中主机第一块网卡的名称__￼__设置网络是为了后期你可以远程访问你的虚拟机，为了要保证的你主机可以__Ping__通你的虚拟机，此处设置的__IP__地址应该参照虚拟机中编辑__-\>__虚拟网络编辑器__-\>VMnet8-\>NAT__和__DHCP__设置；并保证你的虚拟机网络地址和你电脑的__VMnet8__网卡所获取的地址在同一网段，可以互相访问_
![Exported image](Exported%20image%2020260702224428-25.png)
![Exported image](Exported%20image%2020260702224433-26.png)
![Exported image](Exported%20image%2020260702224435-27.png)

_为了保证你的主机可以顺利__Ping__通你的虚拟机，还需要在你的主机上查看关于虚拟机服务的启动状态，主要是图中三项服务必须处于运行__/__启动状态_
![Exported image](Exported%20image%2020260702224436-28.png)

￼_DNS__如果设置错误，访问不了百度的域名，只能访问百度的主机地址，如果你能记住所有网站的__IP__地址，可以不用设置哦_
5.设置硬盘分区；新手建议使用懒人分区法，将硬盘分为“/boot”、“swap”、“/”三个分区，/boot可分配200MB~1GB的空间，/boot分区在系统安装完成后，据说大小就不会变了哦；swap分区类似于Windows下的虚拟内存概念，一般设为内存大小的1.5倍或2倍，但一般不大于8GB；剩余的空间可以分配给根分区；分配好后，系统会提示你磁盘更改，你选择接受更改后，当系统启动安装流程时会格式化你的硬盘；￼_老师说__Swap__分区的大小以后可以通过命令更改，所以现设置满足目前使用就好_
![Exported image](Exported%20image%2020260702224438-29.png) ![Exported image](Exported%20image%2020260702224441-30.png) ![Exported image](Exported%20image%2020260702224445-31.png) ![Exported image](Exported%20image%2020260702224447-32.png)

6.关闭KDUMP；KDUMP的作用是当系统内核出现错误的时候，是否要将内存的消息写到文件中，而这个文件能够给**内核开发者**研究为什么会宕机，而我作为小白，很显然不是内核开发者，所以自然关闭这个功能啦！~￼_内存的数据量很大，经常进行KDUMP会造成硬盘空间的浪费_
![Exported image](Exported%20image%2020260702224453-33.png)

7.关闭系统安全策略；（目前主机不发布公网，可以关闭安全策略，否则可能会出发一些我现阶段解决不了的莫名其妙的问题）
![Exported image](Exported%20image%2020260702224458-34.png)

￼_没有连接上__Internet__时，可尝试关闭防火墙，但是__SELinux__最好处于“强制”状态_
8.选择需要安装的软件；如果是想学好Linux网络服务方面的技术，建议不要安装Linux桌面，会养成依赖习惯哦；建议选择最小化安装，然后安装一些必要的软件，如调试工具、开发工具、链接库文件和系统管理工具等；否则一些常见的命令会找不到哦。其实所有的东西都可以根据需要然后通过网络和光盘安装；
![Exported image](Exported%20image%2020260702224503-35.png)

9.选择主机所在时区，并对照好手表，设置正确时间。如果需要使用NTP服务器来校准主机时间，需要开启Network Time服务。后续很多服务都跟主机时间有关系的。
![Exported image](Exported%20image%2020260702224510-36.png)

_系统默认提供的__NTP__服务器都在境外，为了加速校正时间，可使用上海地区的__NTP__：__tock.stdtime.gov_

10.以上选项都配置完成后，我么就可以选择开始安装了；启动安装流程，这时候会启动系统会格式化你的硬盘哦。
![Exported image](Exported%20image%2020260702224517-37.png)

11.设置Linux系统的root账户的密码，root就相当于Windows的Administrator；但是我个人认为它其实相当于Windows的TrustInstaller；当你使用root用户时，建议先学习一下删根与跑路教程；￼_在实际生产环境中，尽量使用一般用户来操作__Linux__，有必要再将身份切换为__root__即可_
![Exported image](Exported%20image%2020260702224520-38.png)
![Exported image](Exported%20image%2020260702224522-39.png)

￼_这里注意一下哦，如果你跟我设置都一样，那你的安装进程也应该提示你有__471__个包需要安装_

12.创建普通用户，并为普通用户设置密码；在实际使用中我们不建议使用root用户，因为root的权限太强大了，仅当我们需要执行root命令时切换到root用户就好；但是介于我们目前起步阶段，一些用户权限分配的问题还搞不定，所以使用root用户就好了；普通用户可以后期进到系统中在添加；
![Exported image](Exported%20image%2020260702224527-40.png)
![Exported image](Exported%20image%2020260702224529-41.png)

`13.当安装过程执行完毕后，系统会提示你重启系统以完成安装；一共66步很顺利哦；`

![Exported image](Exported%20image%2020260702224534-42.png)

14.当你重启系统后，进入到如下界面，输入你的用户名和密码能进入到系统时，就说明你成功的安装了Cent OS 7系统；
![Exported image](Exported%20image%2020260702224536-43.png)

**4.****通过****Xshell****连接到系统**
**Xshell****下载地址**
官网：[https://www.netsarang.com/zh/xshell/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.netsarang.com%2Fzh%2Fxshell%2F)
目前是官网最新版本是Xshell 6（2019年3月27日）
_Xshell__拥有免费版，免费版的功能也很强大，足够我们目前使用；建议不要使用破解版链接软件，老师说被人修改过的软件，可能被人留了后门，做运维一定要注意数据安全哦！__~_
1.首先先打开Xshell软件，在默认界面下执行Windows下的PING命令，测试主机与虚拟机的连通性；返回TTL值和时间，表示主机与虚拟机可以连通；如果PING不通，可以检查一下虚拟机的网络设置、VMnet8的网卡设置、Windows关于虚拟机的服务；可以尝试重启网卡和重启Linux操作系统。
![Exported image](Exported%20image%2020260702224538-44.png)

￼**在****Linux****中可以通过****ip address****查看****Linux****的地址，如果反复重启****Linux****系统后，****Linux****仍无法获取到地址，那么可能就需要重装系统了，可能是虚拟机出****Bug****了，我遇见过两次，都没能解决，看来以我目前的能力，还解决不了这个问题。**
[root@Aspen ~ 23:27:39]# ip address ￼1: lo: \<LOOPBACK,UP,LOWER_UP\> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000￼    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00￼    inet 127.0.0.1/8 scope host lo￼       valid_lft forever preferred_lft forever￼    inet6 ::1/128 scope host ￼       valid_lft forever preferred_lft forever￼2: eth0: \<BROADCAST,MULTICAST,UP,LOWER_UP\> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000￼    link/ether 00:0c:29:51:1b:b8 brd ff:ff:ff:ff:ff:ff￼    inet 10.0.0.200/24 brd 10.0.0.255 scope global eth0￼       valid_lft forever preferred_lft forever￼    inet6 fe80::20c:29ff:fe51:1bb8/64 scope link ￼       valid_lft forever preferred_lft forever

2.单击新建，设置一个名称提示你连接到主机；设置主机IP地址，就是刚才你PING的IP地址哦；默认是通过SSH服务连接到Linux系统，设置完成后单击确定；￼_sshd__服务的默认端口是__22_
- ![Exported image](Exported%20image%2020260702224545-45.png)

￼_端口：用来区分不同的服务__￼__IP__地址：用来标记服务器在网络中的位置__￼__协议：共同遵守的通信的制度_
3.双击要连接的名称后，输入用户名并记住用户名，单击确定；再接下来的弹出框中选择密码认证并填写密码，记住密码单击确定。当出现你的登录地址时，表示你的远程连接成功，可以通过Xshell操作Linux的系统；
![Exported image](Exported%20image%2020260702224550-46.png)
![Exported image](Exported%20image%2020260702224556-47.png)

￼**如果你的****Windows****可以****PING****通服务器地址，但是提示连接失败，则可以在****Windows****下使用****Telnet****命令来测试基于****TCP****协议提供的服务是否开启**
![Exported image](Exported%20image%2020260702224559-48.png)

Connection established #标致服务开启￼Could not connect to IP地址 #标致服务关闭
**4.****磁盘**
**磁盘分区的作用**
1.善用分区，可以让系统数据更安全；
2.分区有助于系统读取数据的速度与性能；
**磁盘**
1.磁盘的组成：由MBR（446B）和分区表组成（64B）；￼_现在有__GPT__可以替代__MBR__了，我们这里不讨论__GPT__，只讨论__MBR_
2.MBR（主引导分区）这个仅有446B的硬盘容量里会放置最基本的**引导加载程序（****Boot Loader****）**，这个引导加载程序目的是加载**内核**文件；引导加载程序是操作系统在安装的时候所提供的，所以他会识别硬盘内的文件系统格式，因此能够读取内核文件；￼**Boot Loader****的主要任务****￼**a)提供菜单：用户可以选择不同的开机选项，这也是多重引导的重要功能；￼b)载入内核文件：直接指向可开机的程序区段来启动操作系统；￼c)转交给loader：将引导加载功能转交给其他loader负责；￼_由于__MBR__仅有__446B__的空间，所以__Boot Loader__是一个非常小而且完美的程序；__￼_**引导加载程序除了可以安装在****MBR****之外，还可以安装在每个分区的引导扇区**_（这个特色才能实现多重引导功能，有助于理解__C__）_

图37.png
3.分区表（Partition Table）拥有64B的容量，主要用于记录硬盘分区的状态；总共分为四组记录区，每组记录区记录了该区段的起始与结束柱面号码；￼a)磁盘默认的分区表仅能写入四组分区信息，这是硬盘（MBR）的限制；￼b)每块硬盘至多可以拥有一个扩展分区；逻辑分区是由扩展分区持续切割出来的分去，这样就代表一旦扩展分区被破坏，则所有逻辑分区都会被删除。￼c)创建扩展分区的目的是使用额外的扇区空间来记录分区信息，扩展分区本身不能被格式化，能够格式化后作为数据访问的分区只有主分区和逻辑分区；￼d)逻辑分区的数量依据操作系统而不同，在Linux系统中，IDE硬盘最多可支持59个逻辑分区（5号-63号），而SATA盘则仅有11个逻辑分区（5号-15号）；
**主机硬盘的分区规划**
_硬盘分区技巧需要对于__Linux__文件结构有相当程度的认知后，才能作出比较完善的规划_
/：根分区，系统必要分区
/boot：引导分区，用于引导系统启动；系统必要分区；
Swap：交换分区，当系统内存不足时，用于充当系统内存；系统必要分区；
/usr：存放Linux命令的分区，根据实际情况可选择分配2~5GB的空间；
/var：如果该主机作为Mail服务器，可以单独为该目录分区，并指定一定的空间；
/home：如果该主机用于提供SMABA服务，可以单独为该目录分区，并指定一定的空间；￼_磁盘分区大小必须是磁盘柱面大小的整数倍_
**开机流程**
1.开机主动执行BIOS固件程序，识别第一个可开机设备；
2.读取第一个可开机设备的MBR，找到引导加载程序；￼_只有第一个可开机设备内的__MBR__会被系统主动识别并读取_
3.执行引导加载程序，读取系统内核；
4.加载内核，启动操作系统；
**磁盘名称**
在Linux中，不同的存储介质，有不同的命名规则；
1.IDE硬盘的名称为/dev/hd[a-d]；￼_系统识别的第一块硬盘为__/dev/hda;_ _系统识别的第一块硬盘为__/dev/hdb_
2.SCSI/SATA/USB硬盘的名称为/dev/sd[a-p]；￼_系统识别的第一块硬盘为__/dev/sda;_ _系统识别的第一块硬盘为__/dev/sdb_
3.RAID阵列的名称为/dev/md;￼**硬盘的主分区（包括扩展分区）设备号码为****1~4****，硬盘的逻辑分区设备号码从****5****开始****￼**_例：主机仅拥有一块__SATA__硬盘，该盘拥有__2__个主分区，一个扩展分区，扩展分区中包含三个逻辑分区，则系统中的设备名称为：__￼__第一个主分区：__/dev/sda1__￼__第二个主分区：__/dev/sda2__￼__第一个扩展分区：__/dev/sda3__￼__第一个逻辑分区：__/dev/sda5__￼__第二个逻辑分区：__/dev/sda6__￼__第三个逻辑分区：__/dev/sda7_ ￼**同属于逻辑分区或主分区的磁盘空间，可以在不影响其他分区的情况下，合并磁盘空间，若分区模式不同，可不能合并分区，除非重新规划磁盘空间**
 \> 来自

 \<https://www.jianshu.com/p/1ff25dee16fc\>

**下载地址：**
5.选择操作系统版本（32位/64位）；
32位：根据CPU类别的规范等级，分为：i386，i486，i586，i686；（向下兼容）
64位：统一称为X86_64等级；（据说诞生于2003年）
_32__位__/64__位代表了__CPU__每次能够处理数据量的字组大小_
CentOS-7-x86_64-DVD-1810.iso                              ￼CentOS-7-x86_64-DVD-1810.torrent                       ￼CentOS-7-x86_64-Everything-1810.iso                   ￼CentOS-7-x86_64-Everything-1810.torrent               ￼CentOS-7-x86_64-LiveGNOME-1810.iso                    ￼CentOS-7-x86_64-LiveGNOME-1810.torrent            ￼CentOS-7-x86_64-LiveKDE-1810.iso                       ￼CentOS-7-x86_64-LiveKDE-1810.torrent                   ￼CentOS-7-x86_64-Minimal-1810.iso                   ￼CentOS-7-x86_64-Minimal-1810.torrent               ￼CentOS-7-x86_64-NetInstall-1810.iso                ￼CentOS-7-x86_64-NetInstall-1810.torrent

￼_Test this media & install CentOS 7__选项用于测试安装媒介的资料完整性（主要避免镜像在烧录过程中发生错误导致的安装问题），避免中途安装失败，我们在虚拟机中使用镜像文件安装系统，不需要进行测试__￼__Troubleshooting__选项主要用于进入已安装系统的救援（__Rescue__）模式（该模式下可以修改忘记的__root__密码，人工干预修复系统启动不了等问题）_
\> 来自

 \<https://www.jianshu.com/p/1ff25dee16fc\>
```
