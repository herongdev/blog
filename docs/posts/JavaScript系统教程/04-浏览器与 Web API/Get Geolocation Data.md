---
title: "Get Geolocation Data"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "我们还可以通过浏览器 navigator 获得我们当前所在的位置 geolocation 。 位置的信息包括经度 longitude 和纬度 latitude 。 你将会看到一个是否允许获取当前位置的提示。不管你选择允许或者禁止，只要代码正确，这关就能过了。 如果你选择允许，你将。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/Get Geolocation Data.md"
---
::: v-pre

# Get Geolocation Data

> 本节目标：理解“Get Geolocation Data”的核心思路，并能把它用于实际开发或面试表达。
我们还可以通过浏览器==navigator==获得我们当前所在的位置==geolocation==。
位置的信息包括经度==longitude==和纬度==latitude==。
你将会看到一个是否允许获取当前位置的提示。不管你选择允许或者禁止，只要代码正确，这关就能过了。
如果你选择允许，你将会看到右侧手机输出的文字为你当前所在位置的经纬度。
代码如下：
==if (navigator.geolocation) \{==
==navigator.geolocation.getCurrentPosition(function(position) \{==
==$("#data").html("latitude: " + position.coords.latitude + "\<br\>longitude: " + position.coords.longitude);==
==\});==
==\}==

:::
