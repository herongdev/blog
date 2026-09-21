---
title: "blob 协议"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "blob: 协议是一种特殊的 URL 方案，专门用于表示基于 Blob 对象的数据。这种 URL 格式包含一个 blob: 前缀，后面紧跟当前页面的 origin（例如 https://smartgate.changsha.gov.cn），然后是一个唯一标识符（如 2391b59。"
sidebarWeight: 77
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/blob/快速了解/blob 协议.md"
---
::: v-pre

# blob 协议

> 本节目标：理解“blob 协议”的核心思路，并能把它用于实际开发或面试表达。
blob: 协议是一种特殊的 URL 方案，专门用于表示基于 Blob 对象的数据。这种 URL 格式包含一个 blob: 前缀，后面紧跟当前页面的 origin（例如 https://smartgate.changsha.gov.cn），然后是一个唯一标识符（如 2391b596-9458-4501-a215-e4527d6b1f4f）。这里的 origin 起到了限定作用，确保该 Blob 数据的访问符合安全规范。
**1. blob: 协议的作用**

- blob: 协议 URL 是浏览器生成的临时资源定位符，用来引用在客户端创建的 Blob 数据。
- 这种 URL 不对应于服务器上任何实际文件，也不会被服务器直接访问；它只是当前浏览器会话中的一个客户端资源。

**2. blob: 协议 URL 中的 origin**

- blob URL 中的 origin（https://smartgate.changsha.gov.cn）指明了数据的来源页面。浏览器会自动将 Blob URL 的 origin 与创建它的页面 origin 绑定。
- **安全性目的**：将 Blob 与页面 origin 绑定，限制了跨域访问。只能由相同 origin 的页面来访问和使用该 Blob 数据。

**3. Blob URL 和普通 https URL 的区别**

- **数据来源**：https://smartgate.changsha.gov.cn 是一个指向服务器上资源的标准 HTTP/HTTPS URL。而 blob: URL 则是浏览器内存中生成的，数据来源于客户端（例如通过 JavaScript 生成的 Blob 对象）。
- **作用范围**：https URL 可以被其他任何页面引用，只要符合同源策略或跨域请求规则；blob URL 仅在创建它的 origin 页面上有效。
- **生命周期**：Blob URL 是临时的，在页面刷新或手动调用 URL.revokeObjectURL 后将失效，而 https URL 则指向实际的服务器资源，通常不会失效。

**简单总结**
在你的线上环境中，这个 blob:https://smartgate.changsha.gov.cn/2391b596-9458-4501-a215-e4527d6b1f4f URL 是一个临时的 Blob 数据地址，绑定了页面的 origin。https://smartgate.changsha.gov.cn 表示该数据只能被该 origin 页面访问，确保了客户端生成数据的安全性，避免了跨域风险。
这也意味着，即使你看到 [https://smartgate.changsha.gov.cn](https://smartgate.changsha.gov.cn) 出现在 blob: URL 中，这个 URL 并不真正指向服务器资源，只是表明来源和安全作用范围。

:::
