---
title: 如何在 Windows 和 Linux 上查找哪个线程 CPU 利用率最高
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
**Windows**
在 Windows 系统上，可以使用任务管理器查看 CPU 利用率最高的线程。具体步骤如下：

1. 打开任务管理器（Ctrl + Shift + Esc 或 Ctrl + Alt + Delete 后选择任务管理器）。
2. 进入“性能”选项卡，点击“打开资源监视器”。
3. 在资源监视器中，选择“CPU”选项卡。
4. 在“进程”列表中查看各个进程的 CPU 使用情况。
5. 选中某个 CPU 使用率高的进程，展开查看其线程的 CPU 使用情况。

**Linux**
在 Linux 系统上，可以使用 top 命令和 jstack 工具来查找 CPU 利用率最高的线程。具体步骤如下：

1. **使用 top 命令查找 CPU 利用率最高的进程** 打开终端，输入以下命令并按下回车：￼top￼然后按下 Shift + p 键（Shift + m 是查看内存使用率最高的进程），查找出 CPU 利用率最高的进程的 PID 号。
2. **查找该进程中 CPU 利用率最高的线程** 使用如下命令查看该进程中的线程，并按下 Shift + p 键：￼top -H -p \<pid\>￼然后，按下 Shift + p 键，查找出 CPU 利用率最高的线程号。
3. **将线程号转换成 16 进制** 可以使用在线工具或命令将线程号转换为 16 进制格式。例如：￼printf"%x\n"\<thread_id\>￼**使用 jstack 工具输出进程信息** 使用 jstack 工具输出进程信息并重定向到文件中：￼jstack \<pid\> \> /tmp/t.dat￼jstack 31365 \> /tmp/t.dat
4. **查找线程号对应的信息** 打开 /tmp/t.dat 文件，查找 16 进制线程号对应的线程栈信息。例如：￼grep -A 20 "0x4d2"/tmp/t.dat
5. **使用 JDK 自带工具** 可以使用 JDK 自带的 jconsole 或 visualvm 工具查看线程的 CPU 利用率。这些工具可以在 JDK 的 bin 目录下找到，直接运行即可。

**总结**
通过以上步骤，您可以在 Windows 和 Linux 系统上查找 CPU 利用率最高的线程，并进行详细分析。任务管理器和资源监视器在 Windows 上非常方便，而在 Linux 上，top 命令和 jstack 工具可以帮助您深入分析进程和线程的性能表现。
