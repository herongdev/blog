---
title: "vue-pdf.js 在线预览问题"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "最近修改公司 vue 项目中使用 pdf.js 来实现在线预览上传的各类文件 . 由于使用 pdf.js 在预览时是直接在标签内将 src 属性赋值为要请求的地址 . 这就导致一个问题 , 会直接请求服务器的文件路径地址 , 而这个服务器文件路径就会暴露出来。处于安全性考虑在预览。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/Vue-pdf/vue-pdf.js 在线预览问题.md"
---
::: v-pre

# vue-pdf.js 在线预览问题

> 本节目标：理解“vue-pdf.js 在线预览问题”的核心思路，并能把它用于实际开发或面试表达。
最近修改公司`vue`项目中使用`pdf.js`来实现在线预览上传的各类文件`.`由于使用`pdf.js`在预览时是直接在标签内将`src`属性赋值为要请求的地址`.`这就导致一个问题`,`会直接请求服务器的文件路径地址`,`而这个服务器文件路径就会暴露出来。处于安全性考虑在预览请求时不再返回地址，改为通过调用普通接口`,`而是统一返回流（`word,pdf`）或者`base64(jpg,png...)`。`.`前端再进行解析并实现在线预览`.`
_此时遇到第一个问题：_
        这个请求是在插件中进行的无法携带项目中封装的各类请求头信息（`token..`等）。翻看`pdf.js`源码及网上总结`.`发现一个底层方法
`pdf.createLoadingTask();`
        该方法可传一个对象作为参数`,`对象内可以添加`url(`所请求的接口`),headers(`请求头信息`)`等`.... .`有了这个方法就好处理了`.`
        最后在将该方法当做变量赋值给`pdf`的`src.`大功告成`.`
        最后再补充一些 `: @loaded="docLoaded" @page-loaded ="pageLoaded"` 这两个方法为加载预览文件时的`loading`事件`,`

最后引一波示例

```
,
import pdf from 'vue-pdf'
var headers = {
```
     `'Authorization': 'Bearer SOME_TOKEN',`
    `'x-ipp-device-uuid': 'SOME_UUID',`
    `'x-ipp-client': 'SOME_ID',`

```
'x-ipp-client-version': 'SOME_VERSION'
};
var loadingTask = pdf.createLoadingTask({
```
     `url:'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',`

```
httpHeaders:headers
});
export default {
components: { pdf },
data() {
return {
```
     `src: loadingTask,`

```
numPages: undefined,
} },
mounted() {
```

```
this.src.then(pdf => { this.numPages = pdf.numPages; });
} }
```
 \> 来自

```
 <https://www.jianshu.com/p/059ce399c671>
```

:::
