---
title: VMware虚拟机搭建服务器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
**VMware****的网络连接**

购买云服务器，不用了就扔还不用担心硬件闲置老化贬值造成损失的问题，这也是云服务器的起源，目前比较流行的是阿里云以及腾讯云，另外还有一些国外的云服务器。

但是如果实在不想花一毛钱呢？那就在虚拟机上开干吧。你要记住，虚拟机也是一台实实在在的主机，可以完成正常主机的任务。具体操作可以参考我的另一篇文章：[在](https://blog.csdn.net/weixin_40156933/article/details/79487856)CentOS虚拟机上搭建一个简单的samba服务器。

这里就涉及到一个网络连接的问题了，你有没有想过当你使用虚拟机的时候使用的网络连接从何而来？其实此时你的虚拟机跟你的主机是以同一ip对外访问的。而要搭建服务器肯定需要一个独立有效的ip地址以便在局域网中定位服务器，这就需要使用虚拟机的网络桥接模式了，具体看上面那篇文章，不做重复介绍。
**附：虚拟机安装****CentOS 7**
**安装****Linux****虚拟机的前提条件**
安装VMware 虚拟机

VMware WorkStation虚拟机软件是一款桌面计算机虚拟软件，让用户能够在单一主机上同时运行多个不同的操作系统。 

百度网盘链接：https://pan.baidu.com/s/1XhfMgN6v-02UggcOOW2eog  密码：862w

Centos下载链接：https://www.centos.org

具体Centos镜像系统下载教程：https://jingyan.baidu.com/article/1876c85279cedd890a13766c.html

VMware版本秘钥： VF5XA-FNDDJ-085GZ-4NXZ9-N20E6 （如果失效请自行百度）
- `**VMware虚拟机软件**`

    `一个可用的Linux系统镜像`

    `内存较为充足的盘`

    `主板开启CPU虚拟化支持（一般默认支持，不行的需要在BIOS设置开机启动项）`

    ```
    [VMware](http://www.jb51.net/softs/60081.html)安装包
    ```

    ```
    [CentOS-7-x86_64-Everything-1511.iso](http://vault.centos.org/7.2.1511/isos/x86_64/)
    ```

    `VMware的安装跳过，一路无脑next就行了。`

    `安装完成VMware之后打开软件，点击创建新虚拟机(N)`

    ![Exported image](Exported%20image%2020260702224239-0.png)

    ```
    在弹出的窗口中选择“安装程序光盘映像文件(ios)(M)”，点击“浏览”找到下载镜像的位置，双击文件，会识别到这是CentOS 64位系统。
    ```

    ![Exported image](Exported%20image%2020260702224242-1.png)

    `下一步，填写用户名以及系统密码，注意一定不要忘记密码！`

    ![Exported image](Exported%20image%2020260702224245-2.png)

    `不要装系统C盘就行。`

    ![Exported image](Exported%20image%2020260702224250-3.png)

    ```
    最后给这个虚拟系统分配内存空间，参考是20G，选择将虚拟磁盘拆分为多个文件。内存不紧张的可以分配50G，存储单文件。
    ```

    ![Exported image](Exported%20image%2020260702224253-4.png)

    `最后，下一步确认安装信息后点击完成，然后泡上一桶泡面，虔诚地等待安装完成。`

    `《鸟哥的Linux私房菜》`

    ```
    [菜鸟教程](http://www.runoob.com/linux)
    ```

    `LinuxLearning365（Linux知识积累），公众号`

    ```
    [Linux](https://www.linuxidc.com/)公社
    ```
     \> 来自

 \<https://blog.csdn.net/weixin_40156933/article/details/79940073\>

Linux一般用于搭建服务器，我们都是将一台闲置的主机配置成为服务器。但要是手头没有这样的一台主机呢？那么你有两种选择：

**资源下载**
**安装过程**
**Reference**
 \> 来自

 \<https://blog.csdn.net/weixin_40156933/article/details/79940073\>
```
