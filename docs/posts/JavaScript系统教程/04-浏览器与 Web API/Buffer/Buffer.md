---
title: "Buffer"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "Buffer代表的是内存，内存是一段“固定空间”， 产生的内存是固定大小，不能随意添加 扩容的概念，需要动态创建一个新的内容，把内容迁移过去； base64“编码”，在后期使用的过程中用的非常多 （base64 没有加密功能），所有人都知道这个规范 封装 buffer.split。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Buffer/Buffer/Buffer.md"
---
::: v-pre

# Buffer

> 本节目标：理解“Buffer”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
Buffer代表的是内存，内存是一段“固定空间”， 产生的内存是固定大小，不能随意添加

扩容的概念，需要动态创建一个新的内容，把内容迁移过去；

```
npm install @types/node 可以支持node提示 (仅仅是安装了ts的提示而已，为了方便)
```

```
**创建****Buffer**
**三种方式：**
let buf1 = Buffer.alloc(6);
let buf2 = Buffer.from('珠峰');
let buf3 = Buffer.from([65, 66, 67]);
Buffer.from(), Buffer.alloc()
都是创建一个buffer， Buffer.from()从字符串或者数组创建一个buffer, Buffer.alloc()是创建一个指定大小的buffer。
// 从字符串创建一个buffer
const buffer1 = Buffer.from('regis');
console.log(buffer1);
// 输出结果
// <Buffer 72 65 67 69 73>

// 从一个数组创建一个buffer
const buffer2 = Buffer.from([1, 2, 3, 4]);
console.log(buffer2);
// 输出结果
// <Buffer 01 02 03 04>

// 创建一个长度20的空buffer
const buffer3 = Buffer.alloc(20);
console.log(buffer3);
// 输出结果
// <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
```

```
一般情况下，我们会alloc来声明一个buffer；
```

```
或者把字符串转换成buffer使用；
```

```
后台获取的数据都是buffer，包括后面的文件操作也都是buffer形式；
```

```
buffer的使用。
```

```
无论是2进制还是16进制他们表现的东西都是一样的;
```

base64“编码”，在后期使用的过程中用的非常多 （base64 没有加密功能），所有人都知道这个规范

```
加密 -》 解密
```

```
base64 可以字符串可以放到任何路径的链接里 （可以减少请求的发送） 文件大小会变大（如果采用base64 他的缓存会依赖文件）， base64转化完毕后会比之前的文件大1/3
```

```
以下举例：把珠字转换为base64；
const r = Buffer.from('珠'); // 可以调用toString转化成指定的编码
// base64 的来源就是将每个字节多转化成 小于64的值
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));
// 11100111 10001111 10100000  3 x 8 =>  6 * 4
// 转换为小于64的四个字节，每个字节前两位都是空的
// 111001  111000 111110  100000
// 即十进制的：57 56  62 32
console.log(parseInt('111001', 2))
console.log(parseInt('111000', 2))
console.log(parseInt('111110', 2))
console.log(parseInt('100000', 2))
// 0-63 取值范围是 64
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLocaleLowerCase();
str += '0123456789+/';
// 取57 56  62 32对应的base64字符：
console.log(str[57] + str[56] + str[62] + str[32]);
//结果为： 54+g
图片或字符转base64有自己的算法
```

```
**buffer****常用方法**
```

```
toString('utf8'/'base64')
```

```
alloc from
```

```
fill
```

```
slice
```

```
copy
```

```
concat
```

```
indexOf
```

```
isBuffer
```

```
buffer.length
```

```
// 内部存的是引用地址
let buffer4 = Buffer.from([1, 2, 3, 4, 5]);
let slicBuffer = buffer4.slice(0, 1);
// 会改变原buffer4
slicBuffer[0] = 100;
console.log(buffer4)
```

```
**slice****的浅拷贝**
let arr = [[1], 2, 3, 4];
// 二维数组的slice 相当于buffer，数组中存的是引用地址，slice是浅拷贝
let newArr = arr.slice(0, 1);
newArr[0][0] = 100;
console.log(arr);
// 实现非递归版本的深拷贝。
```

```
copy 可以将buffer的数据拷贝到另一个buffer上 （一般用不到，concat是基于copy的）
let buf0 = Buffer.from('架构')
let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i];
    }
}
let bigBuffer = Buffer.alloc(12); // == new Buffer(12)
buf0.copy(bigBuffer, 6, 0, 6);
buf1.copy(bigBuffer, 0, 0, 3);
buf2.copy(bigBuffer, 3); // 默认后两个参数不用传递
console.log(bigBuffer.toString())
```

```
**concat**
let buf0 = Buffer.from('架构')
let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
Buffer.concat = function (bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
    let bigBuffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf => {
        buf.copy(bigBuffer, offset)
        offset += buf.length
    })
    return bigBuffer
}
// http 数据是分包传递的，把每断数据进行拼接
let bigBuf = Buffer.concat([buf1, buf2, buf0], 100)
//  isBuffer
console.log(Buffer.isBuffer(bigBuf));
// buffer.length
console.log(bigBuf.byteLength, bigBuf.length, Buffer.from('珠峰').length);
```

封装`buffer.split`方法
Buffer.prototype.split = function (sep) \{ // slice + indexOf = split
    let arr = [];
    let len = Buffer.from(sep).length; //  分割符号的长度
    let offset = 0;
    let current;
    while (-1 != (current = this.indexOf(sep, offset))) \{
        // 找到的位置 加上偏移量
        arr.push(this.slice(offset, current));
        offset = current + len;
    \}
    arr.push(this.slice(offset));
    return arr;
\}

```
#
```

**四**`.`**前端二进制对象**
前端最常用的`Blob`对象 `binary large object (`是不可变的`)` 代表的是文件类型

```
# 1.
```

**前端下载**`html`**功能**

```
let str = `<h1>hello world</h1>`;const blob = new Blob([str], {     type: 'text/html'});let a = document.createElement('a');a.setAttribute('download', 'a.html');a.href = URL.createObjectURL(blob);document.body.appendChild(a);
# 2.
```

**前端文件预览**
使用`fileReader`来实现

```
file.addEventListener('change', (e) => {let file = e.target.files[0];let fileReader = new FileReader();fileReader.onload = function () {    let img = document.createElement('img');    img.src = fileReader.result;    document.body.appendChild(img)}fileReader.readAsDataURL(file);
createObjectURL
```

来实现

```
let r = URL.createObjectURL(file);let img = document.createElement('img');img.src = r;document.body.appendChild(img)URL.revokeObjectURL(r);
# 3.arrayBuffer(
```

**浏览器中的二进制**

```
)
let buffer = new ArrayBuffer(4);//
```

创造`4`个字节

```
let x1 = new Uint8Array(buffer);x1[0] = 1; // 00000000 00000000 11111111 00000001x1[1] = 255;console.log(x1); // [1,255,0,0]
let x2 = new Uint16Array(buffer); console.log(x2) // [65281,0]
let x3 = new Uint32Array(buffer);console.log(x3) // [65281]
arraybuffer
```

不能被直接修改

`4.`**字符串和**`arrayBuffer`**转化**
字符串转化成

```
arrayBuffer
function stringToArrayBuffer(str) { // utf16
```

不管是字符还是汉字

```
    let buffer = new ArrayBuffer(str.length * 2);    let view = new Uint16Array(buffer)    for (let i = 0; i < str.length; i++) {        view[i] = str.charCodeAt(i)    }    return buffer}
arrayBuffer
```

转化成字符串

```
function ArrayBufferToString(buf) {    return String.fromCharCode(...new Uint16Array(buf))}
# 5.responseType:'arrayBuffer'
function request(url, method = "get") {    return new Promise((resolve, reject) => {        let xhr = new XMLHttpRequest();        xhr.open(method, url, true);        xhr.responseType = 'arraybuffer';        xhr.onload = function () {            resolve(xhr.response);        }        xhr.send();    })}request('/download').then(arraybuffer => {    let b = new Blob([arraybuffer]);     let blobUrl = URL.createObjectURL(b);    let a = document.createElement('a');    a.href = blobUrl;    a.download = 'a.pdf';    document.body.appendChild(a);    a.click();    a.remove();    URL.revokeObjectURL(blobUrl)})
```
 服务端代码

```
const express = require('express');const app = express();app.listen(4444);app.use(express.static(__dirname));app.get('/download', (req, res) => {    res.download('a.pdf');})
```
 \> 来自

```
 <http://www.zhufengpeixun.com/jg-vue/node/buffer.html#_5-responsetype-arraybuffer>
```

:::
