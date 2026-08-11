---
title: "ip检查"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "算法训练"
description: "def is valid ip(ip): parts ip.split(\".\") if len(parts) ! 4: IP地址必须有四个部分 return False for part in parts: if not part.isdigit(): 每一部分必须是数字 ret。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/HJ18 识别有效的IP地址和掩码并进行分类统计/ip检查.md"
---
::: v-pre

# ip检查

> 本节目标：理解“ip检查”的核心思路，并能把它用于实际开发或面试表达。
def is_valid_ip(ip):
parts = ip.split(".")
if len(parts) != 4: # IP地址必须有四个部分
return False
for part in parts:
if not part.isdigit(): # 每一部分必须是数字
return False
if not 0 \<= int(part) \<= 255: # 每一部分的值必须在0到255之间
return False
return True

:::
