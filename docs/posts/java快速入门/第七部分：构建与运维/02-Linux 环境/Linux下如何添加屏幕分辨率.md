---
title: Linux下如何添加屏幕分辨率
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
服务器在`linux`环境下的屏幕分辨率可能会出现不适用的情况，在终端也没有合适的分辨率选项。这个时候就需要使用命令添加新的分辨率。详细步骤如下：
`step1`：找到合适显示器的分辨率
`step2`：打开命令窗口，输入`cvt 1920 1024`（假设屏幕合适的分辨率为`1920*1024`）
`step3`：会输出一段英文，在`modeline`后面会有一长段`#`￥！`@`  复制这一长段内容，在命令里输入  `xrandr --newmode`  （复制的内容）
`step4`：这个时候添加这个分辨率，输入

- xrandr --addmode VGA-1 "1920x1080_60.00"
- step5

：这时候就已经添加了分辨率，可在可视化界面上设置分辨率啦～
 \> 来自

 \<https://blog.csdn.net/iamzxxing/article/details/87859492\>
```
