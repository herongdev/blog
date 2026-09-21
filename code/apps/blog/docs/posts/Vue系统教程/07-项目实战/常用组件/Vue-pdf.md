---
title: "Vue-pdf"
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
description: "在移动端通过 vue pdf 实现预览 pdf 应用场景： 比赛报表pdf文件需要在线预览跟下载，发现直接使用window.open(url, ' blank')，在pc端是可以实现预览，但是在移动端是直接通过打开浏览器进行下载再预览，经查资料发现可以使用vue pdf组件实现预。"
sidebarWeight: 66
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/常用组件/Vue-pdf.md"
---
::: v-pre

# Vue-pdf

> 本节目标：理解“Vue-pdf”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**在移动端通过****vue-pdf****实现预览****pdf**
**应用场景：**比赛报表pdf文件需要在线预览跟下载，发现直接使用window.open(url, '_blank')，在pc端是可以实现预览，但是在移动端是直接通过打开浏览器进行下载再预览，经查资料发现可以使用vue-pdf组件实现预览！！！
**参考：****https://www.cnblogs.com/steamed-twisted-roll/p/9648255.html**     GitHub地址:https://github.com/FranckFreiburger/vue-pdf#readme
**安装：**
npm install --save vue-pdf
template代码:

[](javascript:void\(0\);)

\<template\>\<div class="pdf" v-show="fileType === 'pdf'"\> \<p class="arrow"\> \<!-- // 上一页 --\> \<span @click="changePdfPage(0)" class="turn" :class="\{grey: currentPage==1\}"\>Preview\</span\> \{\{currentPage\}\} / \{\{pageCount\}\} \<!-- // 下一页 --\> \<span @click="changePdfPage(1)" class="turn" :class="\{grey: currentPage==pageCount\}"\>Next\</span\> \</p\> \<!-- // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 --\> \<pdf :src="pdfSrc" :page="currentPage" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler" \> \</pdf\> \</div\>\</template\>

[](javascript:void\(0\);)

js代码:\<script\>  _//_ _引入__PDF_

[](javascript:void\(0\);)

import pdf from 'vue-pdf' export default \{ metaInfo: \{ title: 'This is the test', meta: [ \{ charset: 'utf-8' \}, \{ name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' \} ] \}, components: \{pdf\}, // props: ['pdfSrc'], data () \{ return \{ currentPage: 0, // pdf文件页码 pageCount: 0, // pdf文件总页数 fileType: 'pdf', // 文件类型pdfSrc: this.$route.query.url // pdf文件地址 \} \},created() \{// 有时PDF文件地址会出现跨域的情况,这里最好处理一下 this.pdfSrc = pdf.createLoadingTask(this.pdfSrc) \}, methods: \{ // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页 changePdfPage (val) \{ // console.log(val) if (val === 0 && this.currentPage \> 1) \{ this.currentPage-- // console.log(this.currentPage) \} if (val === 1 && this.currentPage \< this.pageCount) \{ this.currentPage++ // console.log(this.currentPage) \} \}, // pdf加载时 loadPdfHandler (e) \{ this.currentPage = 1 // 加载的时候先加载第一页 \} \} \}

[](javascript:void\(0\);)

**上面是有实现分页功能的**
**下面是没有分页功能**
**template****代码****:**

[](javascript:void\(0\);)

\<template\> \<div class="pdf-box"\> \<pdf v-for="i in numPages" :key="i" :src="pdfSrc" :page="i"\> \</pdf\> \</div\>\</template\>

[](javascript:void\(0\);)

**js****代码**

[](javascript:void\(0\);)

import pdf from 'vue-pdf'export default \{ metaInfo: \{ meta: [ \{ name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' \} ] \}, components: \{ pdf \}, data () \{ return \{pdfSrc: this.$utils.DecryptUrl(this.$route.query).url, // pdf文件地址 numPages: undefined, \} \}, mounted() \{ // 有时PDF文件地址会出现跨域的情况,这里最好处理一下this.pdfSrc = pdf.createLoadingTask(this.pdfSrc) this.pdfSrc.then(pdf =\> \{ this.numPages = pdf.numPages \}) \}\}\</script\>

[](javascript:void\(0\);)

**css****：**

[](javascript:void\(0\);)

\<style lang="scss" scoped\> .pdf-box \{ -webkit-box-sizing: border-box; box-sizing: border-box; max-width: 1024px; width: 100%; margin: 0 auto; overflow-x: hidden; height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; font-size: .28rem; span \{ width: 100%; \} \}\</style\>

[](javascript:void\(0\);)

**最后：**我们发现了pdf在手机预览的时候，不可以放大，后面发现是因为入口文件设置了禁止用户缩放放大，我们可以借助vue-meta进行单独为这个组件设置动态meta，具体看下vue-meta使用。
 \> 来自 \<[https://www.cnblogs.com/qdlhj/p/11237040.html](https://www.cnblogs.com/qdlhj/p/11237040.html)\>

:::
