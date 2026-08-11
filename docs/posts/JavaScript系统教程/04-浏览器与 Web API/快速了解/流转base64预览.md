---
title: "流转base64预览"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "在 企业微信（政务微信） 的 ww.previewFile 方法中，url 参数必须是一个可通过网络访问的文件 URL，而不支持直接使用 Blob 数据。因此，不能直接用 Blob 数据作为参数来调用 previewFile。 如果后端只能返回文件流而非 URL，有几个可选的方案。"
sidebarWeight: 81
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/blob/快速了解/流转base64预览.md"
---
::: v-pre

# 流转base64预览

> 本节目标：理解“流转base64预览”的核心思路，并能把它用于实际开发或面试表达。
在 **企业微信（政务微信）** 的 ww.previewFile 方法中，url 参数必须是一个可通过网络访问的文件 URL，而不支持直接使用 Blob 数据。因此，不能直接用 Blob 数据作为参数来调用 previewFile。
如果后端只能返回文件流而非 URL，有几个可选的方案：
**方案一：创建临时 URL 并上传到临时存储服务**
如果你能够使用临时文件存储服务，可以将 Blob 数据上传到该服务并获取 URL。这样可以保持灵活性，但这个方案依赖于外部服务。
**方案二：让后端返回一个文件下载地址**
如果有权限修改后端，建议将文件下载地址作为 URL 返回，而不是直接返回流数据。这样可以避免前端再做处理，直接调用 previewFile 方法即可。
**方案三：将 Blob 转换为 base64 并显示在 iframe 中**
如果只是希望用户查看内容而不是下载文件，可以将 Blob 数据转换为 base64 格式，然后在页面中通过 iframe 或其他方式嵌入显示。这可以满足预览需求，但不适用于 ww.previewFile。
示例代码：

javascript
复制代码
constexportCase= async(item) =\> \{ uni.request(\{ url: urlJoin( sxz.getConfig().api, `/sxz/checkRecord/getRecordFiles?id=${item.id}&type=3`), header: \{ Authorization: uni.getStorageSync("token_type") + " "+ uni.getStorageSync("assess_token"), \}, method: "GET", responseType: "arraybuffer", success: (res) =\>\{ if(res.statusCode=== 200) \{ constblob = newBlob([res.data], \{ type: "application/vnd.ms-word"\}); constreader = newFileReader();  reader.onloadend= () =\>\{ constbase64data = reader.result; constiframe = document.createElement("iframe"); iframe.src= base64data; iframe.style.width= "100%"; iframe.style.height= "100%"; document.body.appendChild(iframe); \};  reader.readAsDataURL(blob); \} else\{ uni.showToast(\{ title: "获取文件失败", icon: "none", \}); \} \}, fail: (err) =\>\{ console.error("网络请求失败", err); uni.showToast(\{ title: "网络请求失败，请检查网络连接", icon: "none", \}); \}, \});\};
这种方式虽然不是调用 ww.previewFile，但适合用来实现文档或图片等内容的简单预览。

:::
