---
title: "Vue 生命周期方法详解"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "生命周期 : 从创建到发展到消亡的过程 分为 4 个阶段 : create mount update destroy 生命周期方法 触发时机 主要事件 可访问值 不可访问值 实际应用中一般做什么事件 beforeCreate 实例初始化之后，数据观测 (data observer。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue 生命周期方法详解/Vue 生命周期方法详解.md"
---
::: v-pre

# Vue 生命周期方法详解

> 本节目标：理解“Vue 生命周期方法详解”的核心思路，并能把它用于实际开发或面试表达。
生命周期`:`从创建到发展到消亡的过程
分为`4`个阶段`:`

- `create`
- `mount`
- `update`
- `destroy`

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**生命周期方法**|**触发时机**|**主要事件**|**可访问值**|**不可访问值**|**实际应用中一般做什么事件**|
|beforeCreate|实例初始化之后，数据观测 (data observer) 和事件配置之前|初始化 events 和 lifecycle|无|data、computed、methods 中的数据和方法|很少使用，可以在此处添加全局混入或插件|
|created|实例创建完成后，数据观测 (data observer) 和事件配置已经完成|完成 data、methods、computed 和 watch 设置|data、methods、computed、watch 中的数据和方法|DOM 未生成|可以进行初始化数据的获取、事件监听的设置等|
|beforeMount|在挂载开始之前被调用，相关的 render 函数首次被调用|初次渲染之前执行|data、methods、computed、watch 中的数据和方法|DOM 尚未挂载|很少使用，可以在此处修改数据以影响初次渲染|
|mounted|el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用|实例已挂载到 DOM|data、methods、computed、watch 中的数据和方法|-|可以进行 DOM 操作，通常用于获取或操作 DOM 元素|
|beforeUpdate|组件数据更新之前被调用|数据更新之前执行|data、methods、computed、watch 中的数据和方法|-|可以在数据更新前执行操作，如手动修改状态|
|updated|由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用|DOM 已根据数据变化更新|data、methods、computed、watch 中的数据和方法|-|可以进行 DOM 操作，通常用于操作更新后的 DOM 元素|
|beforeDestroy|实例销毁之前调用|实例销毁之前执行|data、methods、computed、watch 中的数据和方法|-|可以在此处执行清理任务，如清除定时器、事件监听器|
|destroyed|Vue 实例销毁后调用|实例销毁后执行|无|data、methods、computed、watch 中的数据和方法|清理操作，如解除绑定、清理内存等|

**Vue 3**

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**生命周期方法**|**触发时机**|**主要事件**|**可访问值**|**不可访问值**|**实际应用中一般做什么事件**|
|beforeCreate|实例初始化之后，数据观测 (data observer) 和事件配置之前|初始化 events 和 lifecycle|无|data、computed、methods 中的数据和方法|很少使用，可以在此处添加全局混入或插件|
|created|实例创建完成后，数据观测 (data observer) 和事件配置已经完成|完成 data、methods、computed 和 watch 设置|data、methods、computed、watch 中的数据和方法|DOM 未生成|可以进行初始化数据的获取、事件监听的设置等|
|beforeMount|在挂载开始之前被调用，相关的 render 函数首次被调用|初次渲染之前执行|data、methods、computed、watch 中的数据和方法|DOM 尚未挂载|很少使用，可以在此处修改数据以影响初次渲染|
|mounted|el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用|实例已挂载到 DOM|data、methods、computed、watch 中的数据和方法|-|可以进行 DOM 操作，通常用于获取或操作 DOM 元素|
|beforeUpdate|组件数据更新之前被调用|数据更新之前执行|data、methods、computed、watch 中的数据和方法|-|可以在数据更新前执行操作，如手动修改状态|
|updated|由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用|DOM 已根据数据变化更新|data、methods、computed、watch 中的数据和方法|-|可以进行 DOM 操作，通常用于操作更新后的 DOM 元素|
|beforeUnmount|实例卸载之前调用|实例卸载之前执行|data、methods、computed、watch 中的数据和方法|-|可以在此处执行清理任务，如清除定时器、事件监听器|
|unmounted|Vue 实例卸载后调用|实例卸载后执行|无|data、methods、computed、watch 中的数据和方法|清理操作，如解除绑定、清理内存等|
|setup|组件实例创建时调用|初始化组件状态|props|其他生命周期方法和 this 上的属性|定义响应式状态，计算属性，方法等|

:::
