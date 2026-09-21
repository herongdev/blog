---
title: "HJ63 DNA序列"
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
description: "中等 通过率：38.68% 时间限制：1秒 空间限制：32M 知识点 字符串 描述 一个 DNA 序列由 A/C/G/T 四个字母的排列组合组成。 G 和 C 的比例（定义为 GC Ratio ）是序列中 G 和 C 两个字母的总的出现次数除以总的字母数目（也就是序列长度）。在基。"
sidebarWeight: 62
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为简单[31个]/HJ63 DNA序列.md"
---
::: v-pre

# HJ63 DNA序列

> 本节目标：理解“HJ63 DNA序列”的核心思路，并能把它用于实际开发或面试表达。
中等  通过率：38.68%  时间限制：1秒  空间限制：32M
知识点==字符串==
**描述**
一个 DNA 序列由 A/C/G/T 四个字母的排列组合组成。 G 和 C 的比例（定义为 GC-Ratio ）是序列中 G 和 C 两个字母的总的出现次数除以总的字母数目（也就是序列长度）。在基因工程中，这个比例非常重要。因为高的 GC-Ratio 可能是基因的起始点。
给定一个很长的 DNA 序列，以及限定的子串长度 N ，请帮助研究人员在给出的 DNA 序列中从左往右找出 GC-Ratio 最高且长度为 N 的第一个子串。
DNA序列为 ACGT 的子串有: ACG , CG , CGT 等等，但是没有 AGT ， CT 等等
数据范围：字符串长度满足 11≤_n_≤1000  ，输入的字符串只包含 A/C/G/T 字母
**输入描述：**
输入一个string型基因序列，和int型子串的长度
**输出描述：**
找出GC比例最高的子串,如果有多个则输出第一个的子串
**示例1**
输入：
ACGT2

输出：
CG

说明：
ACGT长度为2的子串有AC,CG,GT3个，其中AC和GT2个的GC-Ratio都为0.5，CG为1，故输出CG
**示例2**
输入：
AACTGTGCACGACCTGA5
输出：
GCACG
说明：
虽然CGACC的GC-Ratio也是最高，但它是从左往右找到的GC-Ratio最高的第2个子串，所以只能输出GCACG。

要找出给定长度N的GC-Ratio最高的子串，我们可以遍历整个DNA序列，计算每个长度为N的子串的GC-Ratio，并记录下最高比例及其对应的子串。GC-Ratio是G和C字符在子串中出现的次数除以子串的长度。

这个问题的关键在于高效地计算每个子串的GC-Ratio。一种直接的方法是对于序列中的每个起始点，检查接下来的N个字符，计算G和C的数量，然后计算GC-Ratio。但是，我们可以通过只计算一次整个序列中每个位置的累积G和C数量来优化这个过程，这样对于每个子串，GC-Ratio的计算就变得非常快速。

下面是一种简单且直接的方法，适合理解基本逻辑和处理问题：
# 定义一个函数来找到具有最高GC比例的子串
def find_highest_gc_ratio_substring(dna_sequence, n):
# 初始化最大的GC比例为-1，这样任何有效的比例都会更大
max_ratio = -1
# 初始化最高GC比例对应的子串为空字符串
substring = ''
# 遍历序列，检查每个长度为n的子串
for i in range(len(dna_sequence) - n + 1):
# 获取当前位置开始的长度为n的子串
current_substring = dna_sequence[i:i+n]
# 计算当前子串中G和C的总数
gc_count = current_substring.count('G') + current_substring.count('C')
# 计算当前子串的GC比例
gc_ratio = gc_count / n
# 如果当前子串的GC比例高于之前记录的最高比例，则更新最高比例和对应的子串
if gc_ratio \> max_ratio:
max_ratio = gc_ratio
substring = current_substring
# 返回具有最高GC比例的子串
return substring

# 主程序开始
# 从用户那里接收DNA序列输入
dna_sequence = input()
# 从用户那里接收子串长度的输入，并转换为整数
n = int(input())
# 调用函数，并打印出具有最高GC比例的子串
print(find_highest_gc_ratio_substring(dna_sequence, n))

这段代码首先定义了一个函数`find_highest_gc_ratio_substring`，它接受DNA序列和子串长度N作为输入。然后，它通过遍历序列中的每个可能的起始点，计算每个长度为N的子串的GC比例，并记录下最高的GC-Ratio及其对应的子串。最后，函数返回GC-Ratio最高的子串。

注意：虽然这个方法直观且容易实现，但在处理非常长的DNA序列时可能不是最高效的解决方案。针对大数据集，可能需要考虑更高效的算法（如使用滑动窗口技术）来减少重复计算。

滑动窗口技术
滑动窗口技术是一种有效的方法，用于避免在每个新子串中重新计算GC数量。这项技术的核心思想是维护一个固定长度的窗口（在这个问题中，窗口的长度就是子串的长度N），窗口沿着DNA序列滑动，每次只需更新窗口进入和离开位置的计数，而不是重新计算整个窗口的GC比例。

以下是使用滑动窗口技术实现的代码及其详细解释：
# 定义函数，寻找最高GC-Ratio的子串
def find_highest_gc_ratio_substring(dna_sequence, n):
# 初始化最高GC-Ratio和对应的子串
max_ratio = -1
substring = ''
# 初始化GC计数和当前GC-Ratio
gc_count = dna_sequence[:n].count('G') + dna_sequence[:n].count('C')   # 遍历序列，更新GC计数和比例
for i in range(len(dna_sequence) - n + 1):
# 如果不是第一次循环，更新GC计数：减去窗口左侧的字符，加上窗口右侧的新字符
if i \> 0:
left_char = dna_sequence[i - 1]
right_char = dna_sequence[i + n - 1]
if left_char in "GC":
gc_count -= 1
if right_char in "GC":
gc_count += 1
# 计算当前子串的GC-Ratio
gc_ratio = gc_count / n
# 更新最高GC-Ratio和对应的子串
if gc_ratio \> max_ratio:
max_ratio = gc_ratio
substring = dna_sequence[i:i+n]
return substring
# 使用用户输入
dna_sequence = input()
n = int(input())
# 输出结果
print(find_highest_gc_ratio_substring(dna_sequence, n))

### 解释
1. **初始化**：计算初始窗口（即序列的前N个字符）的GC数量，并设定最高GC比例和对应的子串。
2. **滑动窗口**：通过遍历序列的每个位置，更新当前窗口的GC计数。当窗口向右移动时，我们只需考虑左侧即将离开窗口的字符和右侧新进入窗口的字符对GC计数的影响。
3. **更新GC计数**：如果左侧的字符是G或C，GC计数减1；如果右侧新进入的字符是G或C，GC计数加1。
4. **计算和比较GC比例**：在每次窗口移动后，计算当前GC比例，并与之前的最高比例进行比较，如有必要，更新最高比例和对应的子串。
5. **用户输入**：最后，代码接收用户输入的DNA序列和子串长度，然后调用函数输出GC比例最高的子串。

这种方法显著减少了重复计算，尤其是在处理大型DNA序列时，提高了效率。

:::
