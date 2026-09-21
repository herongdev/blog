---
title: "处理iOS端橡皮回弹"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "处理 iOS 端橡皮回弹效果 近期开发的项目有一部分是与微信公众号相关的 H5 页面，在 Android 端微信上页面效果展示无异常，但是在 端 微信多多少少会出现一些意想不到的 bug 。此次主要针对移动端 H5 页面在 iOS 端产生的 橡皮回弹 （ 橡皮筋效果 ）问题做一下。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/事件/处理iOS端橡皮回弹.md"
---
::: v-pre

# 处理iOS端橡皮回弹

> 本节目标：理解“处理iOS端橡皮回弹”的核心思路，并能把它用于实际开发或面试表达。
**处理**`iOS`**端橡皮回弹效果**
近期开发的项目有一部分是与微信公众号相关的`H5`页面，在`Android`端微信上页面效果展示无异常，但是在

```
 iOS
```

**端**微信多多少少会出现一些意想不到的`bug`。此次主要针对移动端`H5`页面在`iOS`端产生的 **橡皮回弹**（**橡皮筋效果**）问题做一下相关记录，希望对遇到类似问题的同学有所帮助。
**方案一：使用** `inobounce.js`

- ```
    inobounce.js github
    ```

    地址

在

```
 html
```

**主页面**的

```
 header
```

标签中引入`inbounce.js`，即 。当引入此文件之后，`iOS`端整个页面都无法滑动或滚动，若想滚动的元素能够实现滚动效果，则需要对滚动区域设置固定的高度，即

```
 height
```

、`max-height`，同时也要设置

```
 overflow: auto
```

，实现页面滑动。为防止`iOS`端页面滚动发生卡顿现象，需要对滚动区域设置

```
 -webkit-overflow-scrolling: touch
```

属性。

```
<!DOCTYPE html><html lang="en">	<head>		<meta charset="UTF-8" />		<meta name="viewport" content="width=device-width, initial-scale=1.0" />		<title>inobounce</title>		<script src="inobounce.js"></script>		<style>			ul {				height: 115px;				border: 1px solid gray;				overflow: auto;				-webkit-overflow-scrolling: touch;			}		</style>	</head>	<body>		<ul>			<li>List Item 1</li>			<li>List Item 2</li>			<li>List Item 3</li>			<li>List Item 4</li>			<li>List Item 5</li>			<li>List Item 6</li>			<li>List Item 7</li>			<li>List Item 8</li>			<li>List Item 9</li>			<li>List Item 10</li>		</ul>	</body></html>
```

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`
- `24`
- `25`
- `26`
- `27`
- `28`
- `29`
- `30`
- `31`

**方案二：**`CSS`**样式处理（推荐）**
偶然间在`iOS`端打开一些公众号的`H5`活动页，没有产生所谓的橡皮回弹效果，于是就想着是否可以采用此效果来解决`iOS`端网页产生的橡皮回弹效果。最终尝试此方法可以实现`iOS`端页面固定，不产生橡皮回弹效果。在系统版本`iOS13+`上的设备上已解决橡皮筋效果，系统版本`iOS12+`的设备上没有尝试，后续准备找`iOS12+`的苹果手机进行进一步的测试，其次再将测试结果进行补充。

```
<!DOCTYPE html><html lang="en">	<head>		<meta charset="UTF-8" />		<meta name="viewport" content="width=device-width, initial-scale=1.0" />		<title>iOS
```

橡皮回弹

```
</title>	</head>	<body>		<!--
```

内容区

```
 -->		<div id="app"></div>	</body></html>
```

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`

主要`CSS`代码：
`/*` 初始化

```
 */* {	margin: 0;	padding: 0;}/*
```

基本样式

```
 */html,body {	width: 100%;	height: 100%;	overflow: hidden;}body {	box-sizing: border-box;	position: relative;}/*
```

超出滚动

```
 */#app {	width: 100%;	height: 100%;	overflow-y: auto;}
```

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`

**总结：**
总的来说，两种方案我在实际开发中都进行了尝试。**方案一**在微信中浏览`H5`网页时可以完美解决橡皮回弹效果；当`H5`页面在`iOS`端微信授权跳转时，底部会有一个导航条，此时导航条也有可能被遮盖，点击导航条两端的按钮没有反应。在`Safari`浏览器打开`H5`页面时，网页的顶端地址栏和底部菜单栏会有一定的遮挡，体验效果不是很理想，最终此方案被`pass`掉了。方案二是我实际工作中使用的，回弹效果得到了一定的改善。体验效果较方案一有了很大的提升。
如果页面有微信授权，以及页面路径的跳转，此时`iOS`端微信打开的网页底部会多出一个导航条，同样`Android`端微信不会出现类似导航条。若没有微信授权以及页面跳转，则两方案均可选；若有微信授权，**推荐使用** **方案二**。
 \> 来自

```
 <https://blog.csdn.net/SK_21/article/details/109235704>
```

:::
