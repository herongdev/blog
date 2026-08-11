---
title: "Vue3 最长递增子序列详解"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "概念名词 最长递增子序列： 在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大。最长递增子序列中的元素在原序列中不一定是连续的。 比如： 序列 [10, 9, 2, 5, 3, 7, 101, 18] 的最长递增子序列是 [2。"
sidebarWeight: 28
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/diff算法/Vue3 最长递增子序列详解.md"
---
::: v-pre

# Vue3 最长递增子序列详解

> 本节目标：理解“Vue3 最长递增子序列详解”的核心思路，并能把它用于实际开发或面试表达。
概念名词
**最长递增子序列：**在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大。最长递增子序列中的元素在原序列中不一定是连续的。

比如：

序列 [10, 9, 2, 5, 3, 7, 101, 18] 的最长递增子序列是 [2, 3, 7, 101] 或 [2, 3, 7, 18]。

序列 [3, 2, 8, 9, 5, 6, 7, 11, 15, 4] 的最长递增子序列是 [2, 5, 6, 7, 11, 15]

Vue3 使用最长递增子序列的背景
在 《Vue.js 设计与实现》第 11 章我们了解到 Vue3 在进行新子节点和旧子节点 DOM Diff 的方式是，先同步头部节点（处理相同的前置元素），再同步尾部节点（处理相同的后置元素），接下来判断哪些子节点需要移动，并且处理如何移动。

在处理子节点如何移动的问题上，使用了最长递增子序列。

为什么要用最长递增子序列?
（这段描述摘自：黄轶《Vue.js 3.0 核心源码解析》）

举个简单的例子具体看一下

var prev = [1, 2, 3, 4, 5, 6]

var next = [1, 3, 2, 6, 4, 5]
从 prev 变成 next，数组里的一些元素的顺序发生了变化，我们可以把子节点类比为元素，现在问题就简化为我们如何用最少的移动使元素顺序从 prev 变化为 next 。

一种思路是在 next 中找到一个递增子序列，比如 [1, 3, 6] 、[1, 2, 4, 5]。之后对 next 数组进行倒序遍历，移动所有不在递增序列中的元素即可。

如果选择了 [1, 3, 6] 作为递增子序列，那么在倒序遍历的过程中，遇到 6、3、1 不动，遇到 5、4、2 移动即可，如下图所示：

[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-3TXtDhk2-1648818081393)(https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4ba50123-4734-445e-b7b7-48bdbe112546/Untitled.png)]

如果选择了 [1, 2, 4, 5] 作为递增子序列，那么在倒序遍历的过程中，遇到 5、4、2、1 不动，遇到 6、3 移动即可，如下图所示：

[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-DQosxXrD-1648818081395)(https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2ec300e0-659f-4176-bbdd-2f7cc31b5d96/Untitled.png)]

可以看到第一种移动了三次，而第二种只移动了两次，递增子序列越长，所需要移动元素的次数越少，所以如何移动的问题就回到了求解最长递增子序列的问题。

实现最长递增子序列
需要明确的是，我们现在要做的是实现 Vue3 DOM Diff 中的最长递增子序列，这和力扣题库中的 300. 最长递增子序列 有些差别。力扣题求解的是最长递增子序列的长度，我们的 getRequence 函数返回值是一个下标数组。但实现方式上都是采用 贪心 + 二分查找。

给定数组 [3, 2, 8, 9, 5, 6, 7, 11, 15, 4]，求解该数组的最长递增子序列？

肉眼可见，该数组最长递增子序列为 [2, 5, 6, 7, 11, 15]，对应下标数组为 [ 1, 4, 5, 6, 7, 8 ]

再次提醒，我们函数返回值是：下标数组

function getRequence(arr) \{

\}

const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];
const res = getRequence(data);

console.log('下标: ', res); // 期望输出：[ 1, 4, 5, 6, 7, 8 ] 输出的是*最长递增子序列的下标*
console.log('长度: ', res.length); // 期望输出： 6
这道题是一道中等复杂程度题目，但你不用担心，我们理清思路，其实也很简单。

1. 构建一个下标数组，保证下标对应的元素在原数组中是递增的
function getRequence(arr) \{
const length = arr.length;

// 描述最长递增子序列的数组，元素是递增元素对应的下标
const result = [0];
// result 最后一个元素
let resultLast;

for (let i = 0; i \< length; i++) \{
const arrI = arr[i];

// 在 Vue 3 Diff 中，0 表示该新节点不在旧节点的中，是需要进行新增的节点
if (arrI !== 0) \{
resultLast = result[result.length - 1];

if (arrI \> arr[resultLast]) \{
result.push(i);
continue;
\}
\}
\}

return result;
\}

const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];

const res = getRequence(data);

console.log('下标: ', res);
console.log('长度: ', res.length);

// 下标: [ 0, 2, 3, 7, 8 ]
// 长度: 5
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
可以看到，首先定义了一个 result 数组，它是用于描述最长递增子序列元素在原数组对应的下标数组。然后定义了一个循环，循环中排除了元素值为 0 的情况，因为 0 在 dom diff 中是需要新增的子节点，此时我们考虑的是元素移动的情况。接下来，将当前元素与子序列最后一个元素对应的原数组的元素进行比较，如果当前元素更大，则将下标 push 进 result。

这样目前可以保证 result 数组中保存的下标是递增的，[ 0, 2, 3, 7, 8 ]，但是所对应的元素值为 [3, 8, 9, 11, 15]，长度为 5，很明显，2 比 3更小，可以求解更长的递增子序列 [2, 5, 6, 7, 11, 15]，长度为 6

接下来，我们通过二分查找保证最长递增子序列长度正确

2. 构建一个正确长度的最长递增子序列，只需要保证数组长度正确即可
function getRequence(arr) \{
const length = arr.length;

// 描述最长递增子序列的数组，元素是递增元素对应的下标
const result = [0];
// result 最后一个元素
let resultLast;

+ let start;
+ let end;
+ let middle;

for (let i = 0; i \< length; i++) \{
const arrI = arr[i];

// 在 Vue 3 Diff 中，0 表示该新节点不在旧节点的中，是需要进行新增的节点
if (arrI !== 0) \{
resultLast = result[result.length - 1];

if (arrI \> arr[resultLast]) \{
result.push(i);
continue;
\}

+ start = 0;
+ end = result.length - 1;
+
+ while (start \< end) \{
+ middle = ((start + end) / 2) | 0; // 或者 middle = Math.floor((start + end) / 2);
+
+ if (arr[result[middle]] \< arrI) \{
+ start = middle + 1;
+ \} else \{
+ end = middle;
+ \}
+ \}
+
+ // while 循环结束后，start 和 end 会指向同一个元素
+ if (arr[result[end]] \> arrI) \{
+ result[end] = i;
+ \}
\}
\}

return result;
\}

const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];

const res = getRequence(data);

console.log('下标: ', res);
console.log('长度: ', res.length);

// 下标: [ 1, 9, 5, 6, 7, 8 ]，对应的arr中元素是 [2, 4, 6, 7, 11, 15]
// 长度: 6
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
可以看到，我们定义了 start，end 和 middle 三个指针，不断进行二分查询，中间元素 middle 小于 arrI，说明 arrI 较大，区间换成[middle + 1, end]; 否则说明，中间元素 middle 大于等于 arrI，说明 arrI 较小，区间换成 [start, middle]， 如此循环，直至 start ≥ end 为止，二分找到某一项刚好大于当前项，此时 start 和 end 指针应该是指向同一个元素下标，然后用当前元素替换掉二分找到的那一项。

result 数组下标变化过程（使用 arr 数组元素描述，这样更清晰一点）

// 3
// 2
// 2 8
// 2 8 9
// 2 5 9
// 2 5 6
// 2 5 6 7
// 2 5 6 7 11
// 2 5 6 7 11 15
// 2 4 6 7 11 15
1
2
3
4
5
6
7
8
9
10
11
12
在我们的例子中，需要在数组 [2, 5, 6, 7, 11, 15] 中找到 4 应该放入的位置，需要对数组进行二分查找， start: 0, end: 6, middle: 3, 然后使用 while 不断二分查询，最终找到替换元素是 5，然后用 4替换掉 5。

很明显，4 替换 5 明显是错误的，因为最长递增子序列的顺序不能颠倒。

3. 回溯：使用前驱索引纠正最长递增子序列的偏差
回溯这个过程需要定义一个与原数组相同长度的数组 p，数组每一项保存应该排在当前元素前面元素的下标。然后经过逆序遍历数组 p，纠正 result 数组的元素。

可能文字表述有些复杂，我们画个图解释一下：

result 数组下表变化过程（使用 arr 数组元素描述，这样更清晰一点）

// 3
// 2
// 2 8
// 2 8 9
// 2 5 9
// 2 5 6
// 2 5 6 7
// 2 5 6 7 11
// 2 5 6 7 11 15
1
2
3
4
5
6
7
8
9
10
11
在数组 result 组建过程中，我们用 p 数组保存当前 result 的前一项的索引。

function getRequence(arr) \{
const length = arr.length;

// 描述最长递增子序列的数组，元素是递增元素对应的下标
const result = [0];
// result 最后一个元素
let resultLast;

let start;
let end;
let middle;

+ let p = arr.slice();

for (let i = 0; i \< length; i++) \{
const arrI = arr[i];

// 在 Vue 3 Diff 中，0 表示该新节点不在旧节点的中，是需要进行新增的节点
if (arrI !== 0) \{
resultLast = result[result.length - 1];

if (arrI \> arr[resultLast]) \{
result.push(i);
+ p[i] = resultLast;

continue;
\}

start = 0;
end = result.length - 1;

while (start \< end) \{
middle = ((start + end) / 2) | 0; // 或者 middle = Math.floor((start + end) / 2);

if (arr[result[middle]] \< arrI) \{
start = middle + 1;
\} else \{
end = middle;
\}
\}

// while 循环结束后，start 和 end 会指向同一个元素
if (arr[result[end]] \> arrI) \{
result[end] = i;
+ p[i] = result[end - 1];
\}
\}
\}

+ let i = result.length;
+ let last = result[i - 1];
+
+ while (i-- \> 0) \{
+ result[i] = last;
+ last = p[last];
+ \}

return result;
\}

const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];

const res = getRequence(data);

console.log('下标: ', res);
console.log('长度: ', res.length);

// 下标: [ 1, 4, 5, 6, 7, 8 ]
// 长度: 6
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
定义了数组 p 长度与 arr 数组长度保持一致，p[i] 是描述应该在当前元素前面元素的下标，方便回溯时纠正第 2 步生成的有问题的 result 数组。result 数组中最后一项肯定是正确的下标位置，我们通过 p 数组不断迭代，修正 result 中存储下标错误的问题。
————————————————
版权声明：本文为CSDN博主「兰亭古墨」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/hefeng6500/article/details/123907708

:::
