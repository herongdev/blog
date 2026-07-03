---
title: VMWare在Windows 10 不能使用问题
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
最近在Windows 10上折腾虚拟机。安装了VMWare Workstation 15后又想试试微软自家的Hyper-v。结果安装完Hyper-v后发现VMWare不能用了，提示：在启用了Credential Guard/Device Guard的设备上不能使用。
VMWare 官方的问题页面[https://kb.vmware.com/s/article/2146361](https://kb.vmware.com/s/article/2146361)。
最初想的是干脆将Hyper-v卸载掉了事，后来发现不管用。于是又不得已去详细查询官方的问题页面，VMWare官方又提供了一个微软官方的解决方法链接[https://docs.microsoft.com/en-us/windows/security/identity-protection/credential-guard/credential-guard-manage](https://docs.microsoft.com/en-us/windows/security/identity-protection/credential-guard/credential-guard-manage)。
微软提供的方法很多，先试过了在组策略中禁用虚拟化安全，也没起作用。最后是用Windows Defender Device Guard and Windows Defender Credential Guard hardware readiness tool 才成功。
1.先去微软给的链接去下载Windows Defender Device Guard and Windows Defender Credential Guard hardware readiness tool 。我下的是3.6版本。
2.解压后，用命令行执行 DG_Readiness_Tool_v3.6.ps1 -Disable -AutoReboot
3.执行完毕后会自动重启，重启后Vmware就可以正常使用了。
由于我是通过Windows远程桌面操作的，在执行脚步前还需要执行一下 set-ExecutionPolicy RemoteSigned 修改一下脚本的安全权限。
 \> 来自

 \<https://www.jianshu.com/p/9f1782657060\>
```
