---
title: "H5案例分享：移动端touch事件判断滑屏手势的方向 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "移动端 touch 事件判断滑屏手势的方向 方法一 1. 当开始一个 touchstart 事件的时候，获取此刻手指的横坐标 startX 和纵坐标 startY ； 2. 当触发 touchmove 事件时，在获取此时手指的横坐标 moveEndX 和纵坐标 moveEndY。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/H5案例分享：移动端touch事件判断滑屏手势的方向 1.md"
---
::: v-pre

# H5案例分享：移动端touch事件判断滑屏手势的方向 1

> 本节目标：理解“H5案例分享：移动端touch事件判断滑屏手势的方向 1”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
移动端`touch`事件判断滑屏手势的方向
**方法一**

1. 当开始一个`touchstart`事件的时候，获取此刻手指的横坐标`startX`和纵坐标`startY`；
2. 当触发`touchmove`事件时，在获取此时手指的横坐标`moveEndX`和纵坐标`moveEndY;`最后，通过这两次获取的坐标差值来判断手指在手机屏幕上的滑动方向。

**思路**：用`touchmove`的最后坐标减去`touchstart`的起始坐标，`X`的结果如果正数，则说明手指是从左往右划动；`X`的结果如果负数，则说明手指是从右往左划动；`Y`的结果如果正数，则说明手指是从上往下划动；`Y`的结果如果负数，则说明手指是从下往上划动。
**具体代码如下**：

[](javascript:void\(0\);)

```
var mybody = document.getElementsByTagName('body')[0];
//
```

滑动处理

```
var startX, startY, moveEndX, moveEndY, X, Y;
mybody.addEventListener('touchstart', function(e) {
e.preventDefault();
startX = e.touches[0].pageX;
startY = e.touches[0].pageY;
});
mybody.addEventListener('touchmove', function(e) {
e.preventDefault();
moveEndX = e.changedTouches[0].pageX;
moveEndY = e.changedTouches[0].pageY;
X = moveEndX - startX;
Y = moveEndY - startY;
if ( X > 0 ) {alert(
```

‘向右’

```
);}
else if ( X < 0 ) {alert(
```

‘向左’

```
);}
else if ( Y > 0) {alert(
```

‘向下’

```
);}
else if ( Y < 0 ) { alert(
```

‘向上’

```
);}
else{alert(
```

‘没滑动’

```
); }
});
```

[](javascript:void\(0\);)

**然而在实际的操作中，手指的上下滑动很难做到直上直下，只要稍微有点斜，只要稍微有点斜，就会被**`X`**轴的判断先行接管，而与我们实际的操作意愿相背离**。此时就需要添加特殊的判断技巧，**修改代码如下**：

[](javascript:void\(0\);)

```
var mybody = document.getElementsByTagName('body')[0];
//
```

滑动处理

```
var startX, startY, moveEndX, moveEndY, X, Y;
mybody.addEventListener('touchstart', function(e) {
e.preventDefault();
startX = e.touches[0].pageX;
startY = e.touches[0].pageY;
}, false);
mybody.addEventListener('touchmove', function(e) {
e.preventDefault();
moveEndX = e.changedTouches[0].pageX;
moveEndY = e.changedTouches[0].pageY;
X = moveEndX - startX;
Y = moveEndY - startY;
if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
alert("
```

向右

```
");
}
else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
alert("
```

向左

```
");
}
else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
alert("
```

向下

```
");
}
else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
alert("
```

向上

```
");
}
else{
alert("
```

没滑动

```
");
}
});
```

[](javascript:void\(0\);)

以上代码，在测试时仍不能达到预期的效果，因为还有一个问题——`body`**的元素的高仔细查查，发现其值是**`0`；
故还应该在此基础上**添加以下代码**：

```
var mybody = document.getElementsByTagName('body')[0];
var h = document.documentElement.clientHeight;
mybody.style.height = h + 'px';
```
 到此，已实现了手机移动端手指的上滑、下滑、左滑和右滑操作。
**方法二**
`1`、滑动屏幕事件使用`HTML5`中的`touchstart`滑动开始事件和`touchmove`滑动结束事件。
`2`、方向的判断：以起点做平面坐标系，与终点连线做直线，直线与`x`正半轴计算角度；我们以`45`度角为方向分割线，如：只要滑动角度大于等于`45`度且小于`135`度，则判断它方向为向上滑。如图所示：
`3`、使用`Math.atan2`来计算起点与终点形成的直线角度。
注意：标准坐标系与屏幕坐标系并不相同，在屏幕坐标系中，上半轴为负值，要实现转换，只需要调换`Y`坐标起点与终于位置即可。
代码如下：

[](javascript:void\(0\);)

```
var h = document.documentElement.clientHeight,
mybody = document.getElementsByTagName('body')[0];
mybody.style.height = h + 'px';
//
```

返回角度

```
function GetSlideAngle(dx,dy) {
return Math.atan2(dy,dx) * 180 / Math.PI;
}
//
```

根据起点和终点返回方向 `1`：向上，`2`：向下，`3`：向左，`4`：向右`,0`：未滑动

```
function GetSlideDirection(startX,startY, endX, endY) {
var dy = startY - endY;
var dx = endX - startX;
var result = 0;
//
```

如果滑动距离太短

```
if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
return result;
}
var angle = GetSlideAngle(dx, dy);
if (angle >= -45 && angle < 45) {
result = 4;
}else if (angle >= 45 && angle < 135) {
result = 1;
}else if (angle >= -135 && angle < -45) {
result = 2;
}else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
result = 3;
}
return result;
}
//
```

滑动处理

```
var startX, startY;
mybody.addEventListener('touchstart', function (ev){
ev.preventDefault();
startX = ev.touches[0].pageX;
startY = ev.touches[0].pageY;
}, false);
mybody.addEventListener('touchmove', function (ev){
var endX, endY;
ev.preventDefault();
endX = ev.changedTouches[0].pageX;
endY = ev.changedTouches[0].pageY;
var direction = GetSlideDirection(startX, startY, endX, endY);
switch (direction){
case 0:
alert("
```

没滑动

```
");
break;
case 1:
alert("
```

向上

```
");
break;
case 2:
alert("
```

向下

```
");
break;
case 3:
alert("
```

向左

```
");
break;
case 4:
alert("
```

向右

```
");
break;
default:
}
}, false);
```

[](javascript:void\(0\);)

`PS`：**用**`touchmove`**事件获取终点坐标，而不是用**`touchend`**事件，是因为当你只是点击屏幕的时候，就会触发**`touchEnd`**事件，但是不会触发**`touchMove`**事件。这样会造成**`touchEnd`**中取得的**`endX`**，从而造成**`endY`**值不准确。比如先滑动再点击，可能同样会触发滑动事件**。
**另外此代码只是提供了判断滑屏方向的思路，还需要根据具体的项目需求进行修改完善！**
**转自：**`https://www.cnblogs.com/yangmengsheng/p/5973487.html`
 \> 来自

```
 <https://www.cnblogs.com/sky6699/p/11091067.html>
```

:::
