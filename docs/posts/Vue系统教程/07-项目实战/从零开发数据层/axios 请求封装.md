---
title: "axios 请求封装"
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
description: "首先安装 大家先去 网易云音乐接口 clone 这个 nodejs 项目然后运行在其他端口上，保证不和前端服务端口冲突。 ( 在 本项目 仓库的 readme 文档也有详细说明 ) 现在在 src/api 目录下新建 config.js 文件，里面编写 axios 的配置 自己填。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/云音乐实例/从零开发数据层/axios 请求封装.md"
---
::: v-pre

# axios 请求封装

> 本节目标：理解“axios 请求封装”的核心思路，并能把它用于实际开发或面试表达。
==首先安装==

```
:
npm install axios --save
```
 ==大家先去==

```
GitHub
```

==网易云音乐接口== `clone` ==这个== `nodejs` ==项目然后运行在其他端口上，保证不和前端服务端口冲突。==`(`==在====本项目====仓库的==`readme`==文档也有详细说明==`)`
==现在在== `src/api` ==目录下新建== `config.js` ==文件，里面编写== `axios` ==的配置==

```
:
import axios from 'axios';
export const baseUrl = 'http://xxx
```

自己填

```
';
//axios
```

的实例及拦截器配置

```
const axiosInstance = axios.create({
    baseURL: baseUrl
});
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, "
```

网络错误

```
");
    }
);
export {
    axiosInstance
};
```
 ==然后在同一个目录下新建== `request.js` ==用来封装不同的网络请求，内容如下==

```
:
import { axiosInstance } from "./config";
export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
}
export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}
```
 ==即需要的两个接口，到时候直接调这些函数即可。==

:::
