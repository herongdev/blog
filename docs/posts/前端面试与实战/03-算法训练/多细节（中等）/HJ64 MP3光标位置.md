---
title: "HJ64 MP3光标位置"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "算法训练"
description: "中等 通过率：23.65% 时间限制：1秒 空间限制：32M 知识点 数组 描述 MP3 Player因为屏幕较小，显示歌曲列表的时候每屏只能显示几首歌曲，用户要通过上下键才能浏览所有的歌曲。为了简化处理，假设每屏只能显示4首歌曲，光标初始的位置为第1首歌。 现在要实现通过上下键。"
sidebarWeight: 99
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/多细节（中等）/HJ64 MP3光标位置.md"
---
::: v-pre

# HJ64 MP3光标位置

> 本节目标：理解“HJ64 MP3光标位置”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
中等  通过率：23.65%  时间限制：1秒  空间限制：32M
知识点==数组==
**描述**
MP3 Player因为屏幕较小，显示歌曲列表的时候每屏只能显示几首歌曲，用户要通过上下键才能浏览所有的歌曲。为了简化处理，假设每屏只能显示4首歌曲，光标初始的位置为第1首歌。

现在要实现通过上下键控制光标移动来浏览歌曲列表，控制逻辑如下：

1. 歌曲总数\<=4的时候，不需要翻页，只是挪动光标位置。

光标在第一首歌曲上时，按Up键光标挪到最后一首歌曲；光标在最后一首歌曲时，按Down键光标挪到第一首歌曲。

其他情况下用户按Up键，光标挪到上一首歌曲；用户按Down键，光标挪到下一首歌曲。

2. 歌曲总数大于4的时候（以一共有10首歌为例）：
特殊翻页：屏幕显示的是第一页（即显示第1 – 4首）时，光标在第一首歌曲上，用户按Up键后，屏幕要显示最后一页（即显示第7-10首歌），同时光标放到最后一首歌上。同样的，屏幕显示最后一页时，光标在最后一首歌曲上，用户按Down键，屏幕要显示第一页，光标挪到第一首歌上。

一般翻页：屏幕显示的不是第一页时，光标在当前屏幕显示的第一首歌曲时，用户按Up键后，屏幕从当前歌曲的上一首开始显示，光标也挪到上一首歌曲。光标当前屏幕的最后一首歌时的Down键处理也类似。

其他情况，不用翻页，只是挪动光标就行。
数据范围：命令长度1≤�≤100 1≤_s_≤100 ，歌曲数量1≤�≤150 1≤_n_≤150
进阶：时间复杂度：�(�) _O_(_n_) ，空间复杂度：�(�) _O_(_n_)
**输入描述：**
输入说明：
1 输入歌曲数量
2 输入命令 U或者D
**输出描述：**
输出说明
1 输出当前列表
2 输出当前选中歌曲
**示例1**
输入：
10UUUU
==复制==
输出：
7 8 9 107

这个问题是一个经典的循环列表问题。玩家有一个包含歌曲列表的MP3播放器，播放器的屏幕每次只能显示一定数量的歌曲，用户可以通过上（U）和下（D）键来控制屏幕显示的歌曲列表的部分和当前选中的歌曲。

这里，我们需要编写一个程序来模拟这个逻辑。我们将按照输入的命令移动当前选中的歌曲，如果必要，翻页显示不同的歌曲列表部分。下面的代码模拟了这个过程，并为每行代码添加了注释。
def mp3_player(song_count, commands):
# 当前屏幕显示的歌曲范围
screen = list(range(1, min(song_count, 4) + 1))
# 当前选中的歌曲索引
current_song = 1
# 执行每个命令
for command in commands:
if command == 'U': # 向上移动
if current_song == 1: # 特殊翻页逻辑
current_song = song_count
if song_count \> 4:
screen = list(range(song_count-3, song_count+1))
else: # 一般移动逻辑
current_song -= 1
if current_song \< screen[0]: # 一般翻页逻辑
screen = [x-1 for x in screen]
elif command == 'D': # 向下移动
if current_song == song_count: # 特殊翻页逻辑
current_song = 1
screen = list(range(1, min(song_count, 4) + 1))
else: # 一般移动逻辑
current_song += 1
if current_song \> screen[-1] and song_count \> 4: # 一般翻页逻辑
screen = [x+1 for x in screen]
return screen, current_song

# 输入歌曲数量和命令
song_count = int(input())
commands = input()
# 获取输出结果
screen, current_song = mp3_player(song_count, commands)
# 输出当前列表和选中歌曲
print(' '.join(map(str, screen)))
print(current_song)
当你运行这段代码时，它会根据用户输入的歌曲数量和一系列命令来模拟MP3播放器的行为。最后，它会输出最终的屏幕上显示的歌曲列表和当前选中的歌曲编号。

每个命令执行后，都会根据歌曲总数、当前选中的歌曲和当前屏幕显示的歌曲来更新状态。如果需要翻页，列表`screen`会更新以显示新的一组歌曲。如果只是移动光标，只有`current_song`的值会改变。

:::
