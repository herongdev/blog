---
title: "HJ51 输出单向链表中倒数第k个结点"
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
description: "简单 通过率：26.28% 时间限制：1秒 空间限制：32M 知识点 链表 双指针 描述 输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。 链表结点定义如下： struct ListNode\\{ int m nKey; ListNode m pN。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为简单[31个]/HJ51 输出单向链表中倒数第k个结点.md"
---
::: v-pre

# HJ51 输出单向链表中倒数第k个结点

> 本节目标：理解“HJ51 输出单向链表中倒数第k个结点”的核心思路，并能把它用于实际开发或面试表达。
简单  通过率：26.28%  时间限制：1秒  空间限制：32M
知识点==链表====双指针==
**描述**
输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。
链表结点定义如下：
struct ListNode\{    int m_nKey;    ListNode* m_pNext;\};
正常返回倒数第k个结点指针，异常返回空指针.
要求：
(1)正序构建链表;
(2)构建后要忘记链表长度。
数据范围：链表长度满足 1≤�≤1000 1≤_n_≤1000  ， �≤� _k_≤_n_  ，链表中数据满足 0≤���≤10000 0≤_val_≤10000

本题有多组样例输入。
**输入描述：**
输入说明
1 输入链表结点个数
2 输入链表的值
3 输入k的值
**输出描述：**
输出一个整数
**示例1**
输入：
81 2 3 4 5 6 7 84
==复制==
输出：
5

以下是这个方法的Python实现：
class ListNode:
# 定义链表的节点类
def __init__(self, val=0):
self.val = val
self.next = None

def read_ints():
# 辅助函数，用于读取一行的多个整数
return list(map(int, input().split()))

def find_kth_to_tail(head, k):
# 双指针方法找到倒数第k个节点
fast = slow = head
for _ in range(k): # 先移动快指针k步
if fast is None: # 若快指针走过头了，说明k值大于链表长度
return None
fast = fast.next
while fast: # 同时移动快慢指针，直到快指针走到尽头
fast = fast.next
slow = slow.next
return slow # 慢指针即为所求的倒数第k个节点

while True:
try:
n = int(input()) # 读取链表节点个数
values = read_ints() # 读取链表的值
k = int(input()) # 读取k的值
head = ListNode(0) # 创建一个哑节点作为链表的起始
cur = head # 初始化当前节点为头节点
for val in values: # 遍历读入的值并构建链表
cur.next = ListNode(val) # 为每个值创建一个节点，并链接到当前节点
cur = cur.next # 更新当前节点
result_node = find_kth_to_tail(head.next, k) # 获取倒数第k个节点
if result_node: # 如果节点存在，打印节点值
print(result_node.val)
else: # 如果节点不存在，可能因为输入的k大于链表长度
break # 跳出循环，因为题设说明输入总是有效的，所以不应该出现这种情况
except EOFError: # 捕捉到文件末尾异常，说明输入结束
break # 跳出循环，结束程序

这个方法是处理找到单链表中倒数第k个节点的问题的一种有效方法，它遵循了以下步骤：

1. **链表节点类定义**：首先，定义了一个`ListNode`类，用于创建链表的节点。每个节点包含一个整数值`val`和一个指向下一个节点的指针`next`。

2. **读取整数输入**：定义了一个辅助函数`read_ints()`，用于读取一行的多个整数并返回它们的列表。这使得读取链表节点的值变得简单。

3. **双指针法查找倒数第k个节点**：主要逻辑包含在`find_kth_to_tail`函数中，它使用了双指针技术来找到链表中的倒数第k个节点。具体来说：
- **快慢指针初始化**：定义两个指针`fast`和`slow`，都初始化为指向链表的头节点。
- **快指针先行**：将快指针`fast`向前移动k步。这是为了创建快慢指针之间k个节点的距离。
- **同时移动快慢指针**：然后同时移动快慢指针，直到快指针`fast`到达链表末尾（`fast`为`None`）。此时，慢指针`slow`所指向的节点就是链表中倒数第k个节点。

4. **链表构建**：主循环中，首先读取链表的节点个数`n`，然后读取n个节点的值，以及要找的倒数第k个节点的位置`k`。使用一个哑节点作为链表的头，这样可以简化链表的头部插入操作。然后遍历读入的节点值，为每个值创建一个新的`ListNode`实例，并将其加入到链表的末尾。

5. **结果输出**：使用`find_kth_to_tail`函数获取倒数第k个节点，如果这个节点存在（即输入的k没有超出链表的长度），则输出这个节点的值。

6. **异常处理**：使用`try-except`结构来捕获输入的结束（EOFError），这对于处理多组输入直到输入结束是非常常见的模式。

这个方法的优点是不需要预先知道链表的长度，只需一次遍历即可找到倒数第k个节点，空间复杂度低，且易于理解和实现。

:::
