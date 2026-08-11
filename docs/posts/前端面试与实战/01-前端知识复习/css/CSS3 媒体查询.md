---
title: "CSS3 媒体查询"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "前端知识复习"
description: "媒体查询（Media Queries）是 CSS3 中的一项强大功能，用于根据不同的设备特性（如屏幕宽度、高度、分辨率等）应用不同的样式。以下是一个全面的媒体查询示例，展示了如何针对不同设备尺寸进行响应式设计。 HTML 文件（index.html） \\<!DOCTYPE htm。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/复习大纲/css/CSS3 媒体查询.md"
---
::: v-pre

# CSS3 媒体查询

> 本节目标：理解“CSS3 媒体查询”的核心思路，并能把它用于实际开发或面试表达。
媒体查询（Media Queries）是 CSS3 中的一项强大功能，用于根据不同的设备特性（如屏幕宽度、高度、分辨率等）应用不同的样式。以下是一个全面的媒体查询示例，展示了如何针对不同设备尺寸进行响应式设计。

HTML 文件（index.html）
\<!DOCTYPE html\>
\<html lang="en"\>
\<head\>
\<meta charset="UTF-8"\>
\<meta name="viewport" content="width=device-width, initial-scale=1.0"\>
\<title\>CSS3 Media Queries Example\</title\>
\<link rel="stylesheet" href="styles.css"\>
\</head\>
\<body\>
\<header\>
\<h1\>Responsive Design with Media Queries\</h1\>
\</header\>
\<nav\>
\<ul\>
\<li\>\<a href="#"\>Home\</a\>\</li\>
\<li\>\<a href="#"\>About\</a\>\</li\>
\<li\>\<a href="#"\>Services\</a\>\</li\>
\<li\>\<a href="#"\>Contact\</a\>\</li\>
\</ul\>
\</nav\>
\<main\>
\<section\>
\<h2\>Welcome to Our Website\</h2\>
\<p\>This is a sample responsive webpage using CSS3 media queries.\</p\>
\</section\>
\<aside\>
\<h3\>Side Content\</h3\>
\<p\>This is some additional content that will be positioned differently based on the screen size.\</p\>
\</aside\>
\</main\>
\<footer\>
\<p\>&copy; 2024 Responsive Design Example\</p\>
\</footer\>
\</body\>
\</html\>

**CSS 文件（styles.css）**
/* Basic styles for all devices */
body \{
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
\}
header, nav, main, aside, footer \{
padding: 20px;
margin: 10px;
border: 1px solid #ccc;
\}
header \{
background-color: #f4f4f4;
text-align: center;
\}
nav ul \{
list-style: none;
padding: 0;
display: flex;
justify-content: center;
background-color: #333;
\}
nav ul li \{
margin: 0 10px;
\}
nav ul li a \{
color: white;
text-decoration: none;
padding: 10px 15px;
display: block;
\}
nav ul li a:hover \{
background-color: #575757;
\}
main \{
display: flex;
flex-wrap: wrap;
\}
main section, main aside \{
flex: 1;
min-width: 300px;
\}
footer \{
text-align: center;
background-color: #f4f4f4;
\}

/* Media Queries */
/* Tablets in landscape and larger */
@media (min-width: 768px) \{
nav ul \{
justify-content: space-around;
\}
main \{
flex-wrap: nowrap;
\}
main section \{
flex: 2;
\}
main aside \{
flex: 1;
\}
\}

/* Desktops and larger screens */
@media (min-width: 1024px) \{
body \{
margin: 0 auto;
max-width: 1200px;
\}
header \{
text-align: left;
\}
nav ul \{
justify-content: flex-start;
\}
nav ul li \{
margin: 0;
\}
main \{
display: flex;
\}
main section, main aside \{
margin: 10px;
\}
main section \{
flex: 3;
\}
main aside \{
flex: 1;
\}
\}

/* Large screens and up */
@media (min-width: 1440px) \{
body \{
max-width: 1400px;
\}
nav ul \{
justify-content: flex-start;
\}
main \{
margin: 20px 0;
\}
main section, main aside \{
padding: 30px;
\}
\}

### 解释
- **基本样式**：对所有设备应用的基础样式，包括基本的排版、间距和布局设置。
- **媒体查询**：
- **平板设备及以上**（最小宽度 768px）：调整导航栏的布局，使导航项之间有更多间距，并将主内容区域和侧边栏布局为横向排列。
- **桌面设备及以上**（最小宽度 1024px）：进一步优化布局，使内容在更大屏幕上展示更好，同时限制页面的最大宽度，并调整文本对齐方式和内容间距。
- **大屏幕设备及以上**（最小宽度 1440px）：为更大屏幕增加额外的间距和填充，以提升视觉效果和可读性。
通过这些媒体查询，可以确保网页在不同设备和屏幕尺寸上都有良好的用户体验。

:::
