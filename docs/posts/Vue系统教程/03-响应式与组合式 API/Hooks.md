---
title: "Hooks"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "意义 将实现同一业务逻辑的代码组织到一起，而不用分散到不同的生命周期中去； 实现同一业务逻辑的利用； 前端页面的两种用法 一、在生命周期中发起请求； 定义一个hooks import \\{ ref, onMounted \\} from 'vue'; export default。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Hooks.md"
---
::: v-pre

# Hooks

> 本节目标：理解“Hooks”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
意义

- 将实现同一业务逻辑的代码组织到一起，而不用分散到不同的生命周期中去；
- 实现同一业务逻辑的利用；

前端页面的两种用法
一、在生命周期中发起请求；
定义一个hooks
import \{ ref, onMounted \} from 'vue';
export default function useFetchData(url) \{
const data = ref(null);
const isLoading = ref(false);
const error = ref(null);
onMounted(async () =\> \{
isLoading.value = true;
try \{
const response = await fetch(url);
if (!response.ok) \{
throw new Error('An error occurred while fetching data');
\}
data.value = await response.json();
\} catch (err) \{
error.value = err.message;
\} finally \{
isLoading.value = false;
\}
\});
return \{ data, isLoading, error \};
\}

在页面中调用：
\<script setup\>
import useFetchData from 'path-to-useFetchData'; // 更新为实际路径

const \{ data: tableData, isLoading, error \} = useFetchData('你的API接口地址');
\</script\>

二、自行调用
定义hooks
import \{ ref \} from 'vue';
export default function useFetchData(url) \{
const data = ref(null);
const isLoading = ref(false);
const error = ref(null);
const fetchData = async () =\> \{
isLoading.value = true;
error.value = null;
try \{
const response = await fetch(url);
if (!response.ok) \{
throw new Error('An error occurred while fetching data');
\}
data.value = await response.json();
\} catch (err) \{
error.value = err.message;
\} finally \{
isLoading.value = false;
\}
\};
return \{ data, isLoading, error, fetchData \};
\}

使用
\<script setup\>
import useFetchData from 'path-to-useFetchData'; // 更新为实际路径

const \{ data: tableData, isLoading, error, fetchData \} = useFetchData('你的API接口地址');

// 当你需要的时候，调用 fetchData
fetchData();
\</script\>

官网示例：
[组合式函数 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/reusability/composables.html) 这个教程值得多读几次；
在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

有状态的逻辑
无状态的逻辑

在任意模块中，可以引入vue3的组合式API，如

可以嵌套多个组合式函数；

**组合式函数的返回值**
在组合式函数中使用 ref() 而不是 reactive()。
我们推荐的约定是组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性：
// x 和 y 是两个 ref
const \{ x, y \} = useMouse()

从组合式函数返回一个响应式对象会导致在对象解构过程中丢失与组合式函数内状态的响应性连接。与之相反，ref 则可以维持这一响应性连接。

如果你更希望以对象属性的形式来使用组合式函数中返回的状态，你可以将返回的对象用 reactive() 包装一次，这样其中的 ref 会被自动解包，例如：
const mouse = reactive(useMouse())

// mouse.x 链接到了原来的 x ref
console.log(mouse.x)

template
Mouse position is at: \{\{ mouse.x \}\}, \{\{ mouse.y \}\}

**副作用****​**
在组合式函数中的确可以执行副作用 (例如：添加 DOM 事件监听器或者请求数据)，但请注意以下规则：

如果你的应用用到了服务端渲染 (SSR)，请确保在组件挂载后才调用的生命周期钩子中执行 DOM 相关的副作用，例如：onMounted()。这些钩子仅会在浏览器中被调用，因此可以确保能访问到 DOM。

确保在 onUnmounted() 时清理副作用。举例来说，如果一个组合式函数设置了一个事件监听器，它就应该在 onUnmounted() 中被移除 (就像我们在 useMouse() 示例中看到的一样)。当然也可以像之前的 useEventListener() 示例那样，使用一个组合式函数来自动帮你做这些事。

**组合式函数应该同步地调用**

:::
