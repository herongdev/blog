---
title: "HJ18 识别有效的IP地址和掩码并进行分类统计"
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
description: "较难 通过率：16.46% 时间限制：1秒 空间限制：32M 知识点 字符串 查找 描述 请解析IP地址和对应的掩码，进行分类识别。要求按照A/B/C/D/E类地址归类，不合法的地址和掩码单独归类。 所有的IP地址划分为 A,B,C,D,E五类 A类地址从1.0.0.0到126.。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为较难题/HJ18 识别有效的IP地址和掩码并进行分类统计.md"
---
::: v-pre

# HJ18 识别有效的IP地址和掩码并进行分类统计

> 本节目标：理解“HJ18 识别有效的IP地址和掩码并进行分类统计”的核心思路，并能把它用于实际开发或面试表达。
较难  通过率：16.46%  时间限制：1秒  空间限制：32M
知识点==字符串====查找==
**描述**
请解析IP地址和对应的掩码，进行分类识别。要求按照A/B/C/D/E类地址归类，不合法的地址和掩码单独归类。
所有的IP地址划分为 A,B,C,D,E五类
A类地址从1.0.0.0到126.255.255.255;
B类地址从128.0.0.0到191.255.255.255;
C类地址从192.0.0.0到223.255.255.255;
D类地址从224.0.0.0到239.255.255.255；
E类地址从240.0.0.0到255.255.255.255

私网IP范围是：
从10.0.0.0到10.255.255.255
从172.16.0.0到172.31.255.255
从192.168.0.0到192.168.255.255
子网掩码为二进制下前面是连续的1，然后全是0。（例如：255.255.255.32就是一个非法的掩码）
（注意二进制下全是1或者全是0均为非法子网掩码）
注意：
1. 类似于【0.*.*.*】和【127.*.*.*】的IP地址不属于上述输入的任意一类，也不属于不合法ip地址，计数时请忽略
2. 私有IP地址和A,B,C,D,E类地址是不冲突的
**输入描述：**
多行字符串。每行一个IP地址和掩码，用~隔开。
请参考帖子https://www.nowcoder.com/discuss/276处理循环输入的问题。
**输出描述：**
统计A、B、C、D、E、错误IP地址或错误掩码、私有IP的个数，之间以空格隔开。
**示例1**
输入：
10.70.44.68~255.254.255.01.0.0.1~255.0.0.0192.168.0.2~255.255.255.019..0.~255.255.255.0
==复制==
输出：
1 0 1 0 0 2 1
==复制==
说明：
10.70.44.68~255.254.255.0的子网掩码非法，19..0.~255.255.255.0的IP地址非法，所以错误IP地址或错误掩码的计数为2；1.0.0.1~255.0.0.0是无误的A类地址；192.168.0.2~255.255.255.0是无误的C类地址且是私有IP；所以最终的结果为1 0 1 0 0 2 1
**示例2**
输入：
0.201.56.50~255.255.111.255127.201.56.50~255.255.111.255
==复制==
输出：
0 0 0 0 0 0 0
==复制==
说明：
类似于【0.*.*.*】和【127.*.*.*】的IP地址不属于上述输入的任意一类，也不属于不合法ip地址，计数时请忽略

import sys
# 建一个"篮子"来记住我们数过的各种IP地址的数量
stats = \{'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'Error': 0, 'Private': 0\}

def is_valid_ip(ip):
parts = ip.split(".")
if len(parts) != 4: # IP地址必须有四个部分
return False
for part in parts:
if not part.isdigit(): # 每一部分必须是数字
return False
if not 0 \<= int(part) \<= 255: # 每一部分的值必须在0到255之间
return False
return True

def is_valid_mask(mask):
parts = mask.split(".") # 把掩码分成四个小部分，就像把苹果切成四块
if len(parts) != 4: # 如果不是四块，那就不对
return False
try:
# 把每块变成一串0和1的形式，看看它们是不是按顺序排列的
binary_mask = ''.join(['\{:08b\}'.format(int(part)) for part in parts])
except ValueError: # 如果变不了，说明里面有些奇怪的东西，不是我们想要的
return False
found_zero_after_one = False # 我们开始还没在1后面找到0
seen_one = False # 我们开始还没看到1
for bit in binary_mask: # 现在我们来一点点检查
if bit == '1':
if found_zero_after_one: # 如果我们已经在1后面找到了0，然后又看到1，那就不对
return False
seen_one = True
else: # 如果是0
if seen_one: # 而且之前看到了1
found_zero_after_one = True # 那我们就在1后面找到了0
return seen_one and found_zero_after_one # 只有在至少看到一个1后面跟着0，我们才说这掩码是对的

def is_private_ip(ip):
parts = [int(part) for part in ip.split(".")] # 把IP地址分成四部分来看
# 然后检查它是不是特别的私有IP地址
if parts[0] == 10 or \
(parts[0] == 172 and 16 \<= parts[1] \<= 31) or \
(parts[0] == 192 and parts[1] == 168):
return True
return False

def process_line(line):
ip, mask = line.split("~") # 分开IP地址和掩码
# 先检查IP地址是不是特殊的【0.*.*.*】和【127.*.*.*】，如果是，我们就不管它
first_octet = int(ip.split(".")[0])
if first_octet == 0 or first_octet == 127:
return
# 检查掩码是否合法
if not is_valid_ip(ip) or not is_valid_mask(mask):
stats['Error'] += 1
return
if is_private_ip(ip):
stats['Private'] += 1 # 如果是，就记一次私有IP
# 然后根据IP地址的第一个数字判断它是A、B、C、D还是E类
if first_octet in range(1, 127):
stats['A'] += 1
elif first_octet in range(128, 192):
stats['B'] += 1
elif first_octet in range(192, 224):
stats['C'] += 1
elif first_octet in range(224, 240):
stats['D'] += 1
elif first_octet in range(240, 256):
stats['E'] += 1

# 开始读取大家提供的信息，直到大家都不说话了
for line in sys.stdin:
if not line.strip(): # 如果大家都安静了，就是没东西要说了
break
process_line(line.strip()) # 指挥官开始处理每一条信息
print(' '.join([str(value) for value in stats.values()]))

:::
