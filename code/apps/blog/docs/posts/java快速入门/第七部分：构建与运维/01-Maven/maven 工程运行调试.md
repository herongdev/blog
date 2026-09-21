---
title: maven 工程运行调试
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
lastUpdated: false
---
::: v-pre

**端口占用处理**
重新执行 `tomcat:run` 命令重启工程，重启之前需手动停止 `tomcat`，否则报下边的错误：



**断点调试**
点击如图所示选项



在弹出框中点击如图加号按钮找到 `maven` 选项
在弹出窗口中填写如下信息



完成后先 `Apply` 再 `OK` 结束配置后，可以在主界面找到我们刚才配置的操作名称。



如上图红框选中的两个按钮，左侧是正常启动，右侧是 `debug` 启动。

:::
