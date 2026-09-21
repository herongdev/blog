---
title: "移动端 touchmove高频事件与requestAnimationFrame的结合优化"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "移动端最高频耗内存的的操作 莫属 touchmove 与 scroll 事件 两者需要 微观的 优化； 这里 我们 讲述 touchmove ； touchmove 事件发生很频繁，会比屏幕刷新率快，导致无效的渲染和重绘； 帧数 –显示设备通常的刷新率通常是 50 60Hz –。"
sidebarWeight: 67
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/移动端 touchmove高频事件与requestAnimationFrame的结合优化.md"
---
::: v-pre

# 移动端 touchmove高频事件与requestAnimationFrame的结合优化

> 本节目标：理解“移动端 touchmove高频事件与requestAnimationFrame的结合优化”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**移动端最高频耗内存的的操作**  **莫属** `touchmove` **与**`scroll`**事件**  **两者需要** **微观的** **优化；**
这里 我们 讲述 `touchmove`；`touchmove` 事件发生很频繁，会比屏幕刷新率快，导致无效的渲染和重绘；
帧数 –显示设备通常的刷新率通常是`50~60Hz` –`1000ms / 60` ≈ `16.6ms`（`1`毫秒的优化意味着 `6%`的性能提升）

浏览器对每一帧画面的渲染工作需要在`16`毫秒（`1`秒 `/ 60 = 16.66`毫秒）之内完成 ；如果超过了这个时间限度，页面的渲染就会出现卡顿效果，也就是常说的`jank`；我们需要在  正确的时间  做正确的渲染；
 **拖拽的都会写，先上图看看效果；**

**大概了解一下** `Timeline` **查看看渲染情况**   **旧版如下**

**在看看** **帧模式** **渲染情况；**

**那些没必要的** `move` **什么也不需要做；没必要在**`16.6`**毫秒内多余的**`event`**对象计算；**

关于帧模式：

**附上源代码：**

```
 1 function drag(element){   2          3         var startX=0, 4             startY=0, 5             ticking=false, 6             raf, 7             doc=document; 8              9         element.addEventListener("touchstart",function(e){10              11             12                   var e=e||window.event,13                    touchs = e.touches[0];14                   e.preventDefault();       //
```

低端安卓 `touch`事件 有的导致`touchend`事件时效 必须开始 就加

```
   e.preventDefault();15                                            // text a ipnut textarea
```

几个 等标签除外

```
   16                                             //
```

，另外自定义移动端`touchstart touchend`组合的 `hover`事件，建议不加这个，不然页面无法滚动

```
17                                             //touchmove
```

开始 就加 不然抖动一下，才能`touchmove`， 然后才正常 尤其早些的 三星 系列自带浏览器

```
18                                               19                20                    startX=parseInt(touchs.pageX-(element.lefts||0));21                    startY=parseInt(touchs.pageY-(element.tops||0));22                   23                    doc.addEventListener("touchmove",update,false);24                    doc.addEventListener("touchend",end,false);25                             26         },false);27         28         29         30         31         32         var  update=function (e) {33              34                var e=e||window.event;35                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;36                 e.preventDefault();37                38                //cancelAnimationFrame(raf);39                if(!ticking) {40 41                var touchs = e.changedTouches[0];42                    43                  //1
```

先触摸移动

```
  44                     element.lefts = touchs.pageX - startX;45                     element.tops = touchs.pageY - startY;46                    47                  //2
```

交给`requestAnimationFrame` 更新位置

```
48                 //raf=requestAnimationFrame(function(){draw();});49                  raf=requestAnimationFrame(draw);50 51                 }52               53                  ticking = true;54            };55         56          57          58          59          var draw= function  (){       60                   ticking = false;61                   var nowLeft=parseInt(element.lefts);    //
```

滑动的距离 `touchmove`时候，如果加阻力，可能有细小的抖动；我想应该是移动端 部分支持`0.5px`的缘故； `parseInt`的转化有点牵强；

```
62                   var  nowTop=parseInt (element.tops);    //
```

滑动的距离

```
    63                      64                     element.style.webkitTransform=element.style.transform = "translate3D(" + nowLeft + "px," + nowTop + "px,0px)";65                     66               };67                    68         var end=function(){69                      var endLeft= parseInt(element.lefts);    //
```

滑动的距离

```
    70                      var  endTop= parseInt(element.tops);    //
```

滑动的距离

```
71                     72                      //element.style.webkitTransform=element.style.transform = "translate(" + endLeft+ "px," + endTop + "px)"; 73     74                         doc.removeEventListener("touchmove",update,false);75                         doc.removeEventListener("touchend",end,false);76                         // cancelAnimationFrame(raf);77                          78             }79                 80      };81
```
 **注意点：**`RequestAnimationFrame`**的兼容**

```
;(function(){var lastTime=0;var vendors=["ms","moz","webkit","o"];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id)}}}());
RequestAnimationFrame
```

**的简易动画库**
 `requestAnimationFrame` **节流函数**

|   |   |
|---|---|
|```
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
```text
|```
  var rafThrottle=function(fn){ //touchmove  scroll
```

节流

```
     var ticking=false;
     var update=function () {
         ticking = false;
        fn&&fn.apply(this,arguments);
     }

     function requestTick() {
       if(!ticking) {
         requestAnimationFrame(update);
        }
       ticking = true;
     }
     requestTick();
};
```text
|

 **参考网站：**
谷歌开发者，非常专业：

```
https://developers.google.com/web/fundamentals/getting-started/?hl=zh-cn
```

 需要`FQ`；
`Web`前端性能优化的微观分析

```
http://velocity.oreilly.com.cn/2013/ppts/16_ms_optimization--web_front-end_performance_optimization.pdf
```
 移动端性能调优：

```
ttps://speakerdeck.com/baofen14787/yi-dong-duan-xing-neng-diao-you-ji-16msyou-hua
```
  **总结：做的东西多了，得** **整理一下以；**
移动端 `scroll`，`touchmove`的事件用的还是比较多的；有时间还是要 细细优化的；虽然感觉很微观 ，甚至觉得 优化的几乎看不出来；但是你去优化好，还是费不少时间 的；
`requestAnimationFrame`是个移动端的利器；动画尽量用它或者除集合`css3`实现；
 \> 来自

```
 <https://blog.csdn.net/shenlei19911210/article/details/51265624>
```

:::
