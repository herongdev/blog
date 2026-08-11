---
title: "MutationObserver 用法总结( 监听节点、DOM变化 )"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "MutationObserver 用法总结( 监听节点、DOM变化 ) 壳子i 于 2020 07 07 22:25:33 发布 11226 收藏 19 分类专栏： js 文章标签： javascript js html html5 前端 版权 js 专栏收录该内容 17 篇文章。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/MutationObserver 用法总结( 监听节点、DOM变化 ).md"
---
::: v-pre

# MutationObserver 用法总结( 监听节点、DOM变化 )

> 本节目标：理解“MutationObserver 用法总结( 监听节点、DOM变化 )”的核心思路，并能把它用于实际开发或面试表达。
MutationObserver 用法总结( 监听节点、DOM变化 )

壳子i

于 2020-07-07 22:25:33 发布

11226
收藏 19
分类专栏： js 文章标签： javascript js html html5 前端
版权

js
专栏收录该内容
17 篇文章0 订阅
订阅专栏
一、认识MutationObserver
今天在查看Event Loop相关的文章的时候，看见了MutationObserver类，然后自己看了一下，在这做下总结

MutationObserver：原生api中用来监听node节点变化的一个类，用来代替Mutation Events
我们先来看看MutationObserver中有哪些方法 我们使用dir函数输出一下

我们可以看到MutationObserver中有三个方法，我们一一来看
1、observe

observe(target, config)：
target：需要监听的元素 [element]
config：需要监听的属性 [Object] 例如 attributes \ childList等 后期会详细讲到

我们来尝试一下这个方法，作者只写了js代码，你们需要自己在页面添加box这个元素

let box = document.querySelector('#box'),
config = \{ attributes: true \};

/*
* 在我们创建MutationObserver对象的时候可以传入一个函数，
*
*/
let observer = new MutationObserver(mutations =\> \{
console.log(mutations)
// =\> 返回一个我们监听到的MutationRecord对象
// MutationRecord对象 是我们每修改一个就会在数组里面追加一个
\})

observer.observe(box, config) // 监听的 元素 和 配置项
box.setAttribute('name','张三')// 修改属性
box.style.background = 'black'// 修改样式
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
我们运行上面代码，可以看到输出结果，返回了一个集合 集合中有两个MutationRecord对象

我们再来展开看看里面有什么

我们现在先关心有值的几项
attributeName：我们设置 属性 的 属性名
type：我们修改的类型

我们再来看看第二个 ，除了属性名

2、disconnect

停止MutationObserver对象的观察，且清空所有的MutationRecord对象

let observer = new MutationObserver(mutations =\> \{
console.log(mutations)
\})

observer.observe(box, config)
box.setAttribute('name','张三')

observer.disconnect() // 我们将方法disconnect在这里进行执行

box.style.background = 'black'
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
可以看到我们在设置 name 属性后再执行的 disconnect 我们应该会输出得到含有一个MutationRecord对象的数组

但是我们查看控制台 上面什么都没有输出，这是为什么呢？
这是因为我们在new MutationObserver传入的函数并不会监听到修改了就立即执行，而是等到同步代码都执行完了，才会去调用我们传入的回调函数
三、takeRecords

从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中

我们直接看代码

let observer = new MutationObserver(mutations =\> \{
console.log(mutations)
\})

observer.observe(box, config)
box.setAttribute('name', '张三')

let arr = observer.takeRecords()
// 获取队列中未处理的，
// 这个方法是同步执行，可以即时获取
console.log(arr)

box.style.background = 'black'
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

二、MutationObserver可以监听的属性(配置)
MutationObserver配置项也叫MutationObserverInit字典

属性 说明 默认值
attributes 设为 true 以观察受监视元素的属性值变更。 默认值为 false。
attributeFilter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。 无默认值。
characterData 设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。 无默认值
childList 设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。 默认值为 false。
subtree 的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。 默认值为 false。
作者这里把大家可能会用到的列举了出来，如果大家要查看全部，可在 MutationObserverInit 查看.
————————————————
版权声明：本文为CSDN博主「壳子i」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45412353/article/details/107176246

:::
