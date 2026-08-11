---
title: "elemntUI"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "补充主题"
description: "ElementUI中input回车触发页面刷新问题及其解决方法 在日常的开发过程中，你可能会遇到一个问题：在ElementUI的el form表单中，如果只存在一个el input输入框，当你输入值后按下回车，页面会发生刷新。这是因为当form元素中只有一个输入框时，按下回车将触。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/ui/elemntUI.md"
---
::: v-pre

# elemntUI

> 本节目标：理解“elemntUI”的核心思路，并能把它用于实际开发或面试表达。
ElementUI中input回车触发页面刷新问题及其解决方法

在日常的开发过程中，你可能会遇到一个问题：在ElementUI的el-form表单中，如果只存在一个el-input输入框，当你输入值后按下回车，页面会发生刷新。这是因为当form元素中只有一个输入框时，按下回车将触发表单的默认提交事件，这是W3C标准的规定。

解决方法：
ElementUI也给出了解决方法。如果你希望阻止这一默认行为，可以在\<el-form\>标签上添加@submit.native.prevent。例如：

\<el-form
:model="form"
ref="form"
label-width="200px"
class="form"
@submit.native.prevent
\>
\<el-form-item
label="姓名"
prop="name"
\>
\<el-input v-model.number="form.name"\>\</el-input\>
\</el-form-item\>
\<el-form-item\>
\<el-button type="primary" @click="submit('form')"\>提交\</el-button\>
\<el-button @click="reset('form')"\>重置\</el-button\>
\</el-form-item\>
\</el-form\>
然而，上述方法只是阻止了默认行为，如果你仍需要回车来提交表单，你可以通过以下方式解决：

\<el-form
:model="form"
ref="form"
label-width="200px"
class="form"
==@submit.native.prevent="() =\> submit('form')"==
\>
\<el-form-item
label="姓名"
prop="name"
\>
\<el-input v-model.number="form.name"\>\</el-input\>
\</el-form-item\>
\<el-form-item\>
\<el-button type="primary" ==native-type="submit"==\>提交\</el-button\>
\<el-button @click="reset('form')"\>重置\</el-button\>
\</el-form-item\>
\</el-form\>
请注意以下几点：

- 确保使用 @submit.native.prevent 阻止原生事件，执行方法为搜索按钮按click事件
- 搜索按钮需要被包裹在 el-form 中
- 移除搜索按钮的click事件
- 确保增加 native-type="submit" 属性

此外，原生的form表单的单input和form包裹el-input回车刷新的问题也可以解决，有以下几种方法：

- 在form表单内再增加一个隐藏的input框，可以通过hidden定义隐藏的输入字段，或者通过CSS样式进行隐藏。
- 去掉输入框的回车事件（根据需求来定，有的需要回车事件提交表单来查询或者执行其他操作则该方法不适用）。
- 阻止表单默认提交事件。例如，使用onsubmit句柄返回false来阻止原生form内的input的默认提交事件。

为了帮助大家更好地理解和解决这个问题，你可以参考ElementUI的官方解决这个回车刷新页面的方案，其开源地址为：

[https://github.com/ElemeFE/element/blob/a0e82aa8ac58d68e66992a5632b779a901436879/examples/docs/zh-CN/form.md](https://github.com/ElemeFE/element/blob/a0e82aa8ac58d68e66992a5632b779a901436879/examples/docs/zh-CN/form.md)

希望这些方法能够帮助你解决ElementUI中input回车触发页面刷新的问题。如果你有任何进一步的问题或需要其他帮助，欢迎随时提问。
————————————————
版权声明：本文为CSDN博主「Terence全栈开发」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_39997939/article/details/131048775

:::
