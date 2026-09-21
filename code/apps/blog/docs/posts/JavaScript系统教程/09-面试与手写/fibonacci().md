---
title: "fibonacci()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "给一个正整数 num ，返回小于或等于 num 的斐波纳契奇数之和 fibonacci 数列定义 n 1,2 时， 时， fib(n) fib(n 2) + fib(n 1) 1 、递归 、数组缓存 、直接使用加法 对比： 如果只使用一次运算，第三种方法速度最快； 如果多次使用。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试题/fibonacci().md"
---
::: v-pre

# fibonacci()

> 本节目标：理解“fibonacci()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
给一个正整数`num`，返回小于或等于`num`的斐波纳契奇数之和

```
function sumFibs(num) {
var fibo = [1, 1],
temp = 0,
sum = 2;
while(true){
temp = fibo[0] + fibo[1];
if(temp > num){
return sum;
}
if(temp % 2 !== 0){
sum += temp;
}
fibo[0] = fibo[1];
fibo[1] = temp;
}
}
sumFibs(4);
function sumFibs(num) {
var arr = [1,1];
if(num>=arr.length){
for(i=arr.length;i<num;i++){
arr[i] = arr[i-2]+arr[i-1];
}
}
arr = arr.filter(function(a){
return a%2!==0&&a<=num;
});
return arr.reduce(function(a,b){
return a+b;
});
}
sumFibs(4);
```

`fibonacci` ==数列定义==
`n = 1,2` ==时，==

```
fib(n) = 1
n > 2
```

==时，==`fib(n) = fib(n-2) + fib(n-1)`

`1`==、递归==

```
function Fib(n) {
```

```
 return n < 2 ? n : (Fib(n - 1) + Fib(n - 2));
}
2
```

==、数组缓存==

```
var IterMemoFib = function() {
```

```
 var cache = [1, 1];
```

```
 return function (n) {
```

```
 if (n >= cache.length) {
```

```
 for (var i = cache.length; i < n ; i++ ) {
```

```
 cache[i] = cache[i - 2] + cache[i - 1];
```

```
 }
```

```
 }
```

```
 return cache[n - 1];
```

```
 }
}();
3
```

==、直接使用加法==

```
function fib(n) {
```

```
 if (n < 2) {
```

```
 return 1;
```

```
 }
```

```
 var a = 1, b = 1;
```

```
 for (var i = 2; i < n - 1 ;i++ ) {
```

```
 b = a + b;
```

```
 a = b - a;
```

```
 }
```

```
 return a + b;
}
```

==对比：==
==如果只使用一次运算，第三种方法速度最快；==
==如果多次使用，第二种方法明显优于其它两种；==
==在==`n`==较大的情况下不推荐使用第一种；==`n`==为==`10*10000`==的时候递归就已经报内存溢出了==

==下面是在==`IE8`==下测试的结果==`(n`==为==`100W)`==：==

```
<script type="text/javascript">

```

```
function Fib(n) {
    return n < 2 ? n : (Fib(n - 1) + Fib(n - 2));
}
```

```
var IterMemoFib = function() {
    var cache = [1, 1];
    return function (n) {
        if (n >= cache.length) {
            for (var i = cache.length; i < n ; i++ ) {
                cache[i] = cache[i - 2] + cache[i - 1];
            }
        }
        return cache[n - 1];
    }
}();
```

```
function fib(n) {
    if (n < 2) {
        return 1;
    }
    var a = 1, b = 1;
    for (var i = 2; i < n - 1 ;i++ ) {
        b = a + b;
        a = b - a;
    }
    return a + b;
}
```

`var num = 10000*100;`

```
function test(fn, n) {
    var date = +new Date();
    fn(n);
    return new Date().getTime() - date;
}
```

`//document.write('`第一种方法，运算时间：

```
' + test(Fib, num) + '<br/>');
document.write('
```

第二种方法，运算时间：

```
' + test(IterMemoFib, num) + '<br/>');
document.write('
```

第三种方法，运算时间：`' + test(fib, num));`

```
document.write('<br/><br/><br/>');
```

`document.write('`第二种方法，运算时间：

```
' + test(IterMemoFib, num) + '<br/>');
document.write('
```

第三种方法，运算时间：

```
' + test(fib, num));
</script>
```

:::
