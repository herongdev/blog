---
title: "HJ103 Redraiment的走法最长上升子序列"
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
description: "中等 通过率：27.59% 时间限制：1秒 空间限制：32M 知识点 排序 描述 Redraiment是走梅花桩的高手。Redraiment可以选择任意一个起点，从前到后，但只能从低处往高处的桩子走。他希望走的步数最多，你能替Redraiment研究他最多走的步数吗？ 数据范围：。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/动态规划【中等】/HJ103 Redraiment的走法最长上升子序列.md"
---
::: v-pre

# HJ103 Redraiment的走法最长上升子序列

> 本节目标：理解“HJ103 Redraiment的走法最长上升子序列”的核心思路，并能把它用于实际开发或面试表达。
中等  通过率：27.59%  时间限制：1秒  空间限制：32M
知识点==排序==
**描述**
Redraiment是走梅花桩的高手。Redraiment可以选择任意一个起点，从前到后，但只能从低处往高处的桩子走。他希望走的步数最多，你能替Redraiment研究他最多走的步数吗？
数据范围：每组数据长度满足  1≤_n_≤200  ， 数据大小满足  1≤_val_≤350
**输入描述：**
数据共2行，第1行先输入数组的个数，第2行再输入梅花桩的高度
**输出描述：**
输出一个结果
**示例1**
输入：
62 5 1 5 4 5
==复制==
输出：
3
==复制==
说明：
6个点的高度各为 2 5 1 5 4 5如从第1格开始走,最多为3步, 2 4 5 ，下标分别是 1 5 6从第2格开始走,最多只有1步,5而从第3格开始走最多有3步,1 4 5， 下标分别是 3 5 6从第5格开始走最多有2步,4 5， 下标分别是 5 6所以这个结果是3。

这个问题是经典的“最长上升子序列”（Longest Increasing Subsequence，简称LIS）问题，可以通过动态规划（Dynamic Programming）来解决。

### 思路：
1. 创建一个数组 `dp`，其中 `dp[i]` 表示以第 `i` 个数字结尾的最长上升子序列的长度。
2. 初始化 `dp` 数组，每个位置都为 `1`，因为最短的上升子序列包含它自己。
3. 遍历数组，对于每个 `dp[i]`，都从 `0` 遍历到 `i`，如果 `nums[j] \< nums[i]`，说明 `nums[i]` 可以接在 `nums[j]` 后面形成一个更长的上升子序列，此时更新 `dp[i]` 为 `dp[j] + 1` 的最大值。
4. 遍历完所有元素后，`dp` 数组中的最大值就是最长上升子序列的长度。

### Python 代码实现：
while True:
try:
n = int(input()) # 数组的个数
heights = list(map(int, input().split())) # 梅花桩的高度
# 初始化dp数组
dp = [1] * n
# 动态规划求解LIS
for i in range(1, n):
for j in range(i):
if heights[j] \< heights[i]:
==dp====[====i====] === ==max====(====dp====[====i====],== ==dp====[====j====] +== ==1====)==
# 最长上升子序列的长度
max_length = max(dp)
print(max_length)
except EOFError:
break

### 解释：
- `while True` 循环用于处理多组输入数据。
- `try...except EOFError: break` 用于处理输入结束。
- 使用动态规划的方式更新 `dp[i]`，保证 `dp[i]` 存储的是以 `heights[i]` 结尾的最长上升子序列的长度。
- 最后通过 `max(dp)` 获取 `dp` 数组中的最大值，即为整个序列的最长上升子序列的长度。

- 初始化一个数组，元素个数为n个，值为1；
- 外层的i循环从第二个元素到最后一个元素；
- 里面的j循环从第一个元素到第一个循环所在的元素为止；
- 对于我们选定的每一个位置i，我们都从第一个元素开始，看到这个元素为止，有没有可能的递增序列，即有没有比i小的数，如果有的话，我们在数组中标记一下最长的可能值；
- 当把i加1时，我们又从j的0值开始，看一下有没有递增序列，如果到了某个值，它可以形成递增序列，但这个位置的值之前就记录了到它为止的最长序列，那就意味着，当前值之前的序列形成，是因为它的值前面有比它小的值，现在它又比后面的值小，那我们就把当前i位置的最长子序列再加上1，表示已经形成最长递增子序列的前面的元素比我小，所以最长递增子序列还可以加长一点，如果直到字符最后一位。

def get_longest_increasing_subsequence(sequence_list):
length = len(sequence_list)
result = [1] * length
for i in range(1, length):
for j in range(0, i):
max_length = 1
if sequence_list[j] \< sequence_list[i]:
max_length = max(max_length, result[j] + 1)
result[i] = max(max_length, result[i])
return max(result)

count = input()
sequence_list = list(map(int, input().strip().split()))
print(get_longest_increasing_subsequence(sequence_list))

:::
