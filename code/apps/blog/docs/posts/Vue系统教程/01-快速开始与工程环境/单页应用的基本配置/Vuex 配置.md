---
title: "Vuex 配置"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "围绕“Vuex 配置”整理的概念、示例与实践笔记。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/安装配置/单页应用的基本配置/Vuex 配置.md"
---
::: v-pre

# Vuex 配置

> 本节目标：理解“Vuex 配置”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
这里我们先来看一下使用 CLI 生成的配置文件 store.js 中的内容：
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
该配置文件便是 Vuex 的配置文件，主要有 4 个核心点：state、mutations、actions 及 getter，详细的介绍大家可以参考官方文档：[核心概念](https://vuex.vuejs.org/zh/guide/state.html)，这里我用一句话介绍它们之间的关系就是：**我们可以通过** **actions** **异步提交** **mutations** **去** **修改** **state** **的值并通过** **getter** **获取**。
需要注意的是不是每一个项目都适合使用 Vuex，如果你的项目是中大型项目，那么使用 Vuex 来管理错综复杂的状态数据是很有帮助的，而为了后期的拓展性和可维护性，这里不建议使用 CLI 生成的一份配置文件来管理所有的状态操作，我们可以把它拆分为以下目录：
==└──== ==store======    ==├──== ==index.js==          ==#== ==我们组装模块并导出== ==store== ==的地方======    ==├──== ==actions.js==        ==#== ==根级别的== ==action======    ==├──== ==mutations.js==      ==#== ==根级别的== ==mutation======    ==└──== ==modules======        ==├──== ==moduleA.js==    ==# A====模块======        ==└──== ==moduleB.js==    ==# B====模块==
```

```
与单个 store.js 文件不同的是，我们按模块进行了划分，每个模块中都可以包含自己 4 个核心功能。比如模块 A 中：
/* moduleA.js */
const moduleA = {
  state: {
    text: 'hello'
  },
  mutations: {
    addText(state, txt) {
      // 这里的 `state` 对象是模块的局部状态
      state.text += txt
    }
  },
  actions: {
    setText({ commit }) {
      commit('addText', ' world')
    }
  },
  getters: {
    getText(state) {
      return state.text + '!'
    }
  }
}
export default moduleA
上方我们导出 A 模块，并在 index.js 中引入：
/* index.js */
import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'
import { mutations } from './mutations'
import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    groups: [1]
  },
  modules: {
    moduleA, // 引入 A 模块
    moduleB, // 引入 B 模块
  },
  actions, // 根级别的 action
  mutations, // 根级别的 mutations
  // 根级别的 getters
  getters: {
    getGroups(state) {
      return state.groups
    }
  }
})
这样项目中状态的模块划分就更加清晰，对应模块的状态我们只需要修改相应模块文件即可。详细的案例代码可参考文末 github 地址。
```

:::
