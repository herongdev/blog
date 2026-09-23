import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"VMware虚拟机搭建服务器","description":"","frontmatter":{"title":"VMware虚拟机搭建服务器","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/VMware虚拟机搭建服务器.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/VMware虚拟机搭建服务器.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/VMware虚拟机搭建服务器.md"};function c(t,a,u,o,r,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**VMware****的网络连接**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"购买云服务器，不用了就扔还不用担心硬件闲置老化贬值造成损失的问题，这也是云服务器的起源，目前比较流行的是阿里云以及腾讯云，另外还有一些国外的云服务器。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是如果实在不想花一毛钱呢？那就在虚拟机上开干吧。你要记住，虚拟机也是一台实实在在的主机，可以完成正常主机的任务。具体操作可以参考我的另一篇文章：[在](https://blog.csdn.net/weixin_40156933/article/details/79487856)CentOS虚拟机上搭建一个简单的samba服务器。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这里就涉及到一个网络连接的问题了，你有没有想过当你使用虚拟机的时候使用的网络连接从何而来？其实此时你的虚拟机跟你的主机是以同一ip对外访问的。而要搭建服务器肯定需要一个独立有效的ip地址以便在局域网中定位服务器，这就需要使用虚拟机的网络桥接模式了，具体看上面那篇文章，不做重复介绍。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**附：虚拟机安装****CentOS 7**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**安装****Linux****虚拟机的前提条件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"安装VMware 虚拟机")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"VMware WorkStation虚拟机软件是一款桌面计算机虚拟软件，让用户能够在单一主机上同时运行多个不同的操作系统。 ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"百度网盘链接：https://pan.baidu.com/s/1XhfMgN6v-02UggcOOW2eog  密码：862w")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Centos下载链接：https://www.centos.org")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"具体Centos镜像系统下载教程：https://jingyan.baidu.com/article/1876c85279cedd890a13766c.html")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"VMware版本秘钥： VF5XA-FNDDJ-085GZ-4NXZ9-N20E6 （如果失效请自行百度）")]),s(`
`),n("span",{class:"line"},[n("span",null,"- `**VMware虚拟机软件**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `一个可用的Linux系统镜像`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `内存较为充足的盘`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `主板开启CPU虚拟化支持（一般默认支持，不行的需要在BIOS设置开机启动项）`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    [VMware](http://www.jb51.net/softs/60081.html)安装包")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    [CentOS-7-x86_64-Everything-1511.iso](http://vault.centos.org/7.2.1511/isos/x86_64/)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `VMware的安装跳过，一路无脑next就行了。`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `安装完成VMware之后打开软件，点击创建新虚拟机(N)`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    在弹出的窗口中选择“安装程序光盘映像文件(ios)(M)”，点击“浏览”找到下载镜像的位置，双击文件，会识别到这是CentOS 64位系统。")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `下一步，填写用户名以及系统密码，注意一定不要忘记密码！`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `不要装系统C盘就行。`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    最后给这个虚拟系统分配内存空间，参考是20G，选择将虚拟磁盘拆分为多个文件。内存不紧张的可以分配50G，存储单文件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `最后，下一步确认安装信息后点击完成，然后泡上一桶泡面，虔诚地等待安装完成。`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `《鸟哥的Linux私房菜》`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    [菜鸟教程](http://www.runoob.com/linux)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    `LinuxLearning365（Linux知识积累），公众号`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"    [Linux](https://www.linuxidc.com/)公社")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ```")]),s(`
`),n("span",{class:"line"},[n("span",null,"     \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.csdn.net/weixin_40156933/article/details/79940073\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Linux一般用于搭建服务器，我们都是将一台闲置的主机配置成为服务器。但要是手头没有这样的一台主机呢？那么你有两种选择：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**资源下载**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**安装过程**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Reference**")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.csdn.net/weixin_40156933/article/details/79940073\\>")])])])])],-1)])])}const x=l(i,[["render",c]]);export{h as __pageData,x as default};
