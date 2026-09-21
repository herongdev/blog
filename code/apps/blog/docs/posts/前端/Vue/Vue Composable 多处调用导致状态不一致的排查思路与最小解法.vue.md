---
title: Vue Composable 多处调用导致状态不一致的排查思路与最小解法
date: 2026-04-29 16:00:00
tags:
  - Vue3
  - Composable
  - 状态管理
categories:
  - 前端工程
---

## 思路

在 Vue 3 里，`composable` 本质上只是一个普通函数。

如果在函数内部写了 `ref`、`computed`、`watch` 等状态逻辑，那么每调用一次这个 composable，就会创建一份新的状态。

例如：

```ts
export function useList() {
  const keyword = ref('')
  const list = ref([])

  function refresh() {
    // ...
  }

  return {
    keyword,
    list,
    refresh,
  }
}
```

如果父组件和子组件都调用：

```ts
// Parent.vue
const { refresh } = useList()

// Child.vue
const { keyword, list } = useList()
```

这里的 `refresh` 和 `keyword/list` 不是同一份状态。父组件刷新的是父组件自己的 `list`，子组件展示的是子组件自己的 `list`。

这类问题常见表现是：

- 父组件点击刷新，子组件列表没有按预期更新。
- 子组件输入搜索词，本地过滤是对的，但父组件刷新时拿不到这个搜索词。
- 清空搜索词后列表无法恢复，因为基础数据源已经被某一次带条件请求污染了。
- worker、socket、事件监听器是共享的，但组件状态不是共享的，导致数据顺序、过滤结果或订阅内容错乱。

排查时先问三个问题：

1. 这个 composable 是“每个组件独立一份状态”，还是“多个组件必须共享一份状态”？
2. 当前调用方是不是只需要触发子组件动作，而不是自己持有一份完整状态？
3. 远端请求拿到的是基础数据源，还是已经带了本地过滤条件的子集？

原则是：

- 如果状态只属于一个组件，就只在这个组件里调用 composable。
- 如果父组件只是想触发子组件刷新，不要在父组件再调用一次 composable，应该调用子组件暴露的方法。
- 如果多个无父子关系组件确实要共享状态，才考虑 Pinia 或模块级单例状态。
- 如果是“远端刷新 + 本地搜索”，远端刷新应该拉基础数据，本地搜索只作用在前端数据源上。

## 最简单代码解决方案

### 场景一：父组件只想触发子组件刷新

这是最常见、也最简单的解法。父组件不要再调用 composable，而是通过 `ref + defineExpose` 调用子组件方法。

子组件：

```vue
<script setup lang="ts">
import { useList } from './useList'

const { loading, keyword, tableData, refresh } = useList()

defineExpose({
  refresh,
})
</script>
```

父组件：

```vue
<template>
  <button :disabled="loading" @click="handleRefresh">刷新</button>
  <ListContent ref="listContentRef" @loading-change="loading = $event" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListContent from './ListContent.vue'

const listContentRef = ref<InstanceType<typeof ListContent> | null>(null)
const loading = ref(false)

function handleRefresh() {
  listContentRef.value?.refresh()
}
</script>
```

子组件如果需要把 loading 同步给父组件：

```ts
const emit = defineEmits<{
  'loading-change': [loading: boolean]
}>()

watch(
  loading,
  (value) => {
    emit('loading-change', value)
  },
  { immediate: true },
)
```

这种方式的好处是：列表状态仍然只有一份，谁展示列表，谁管理列表。父组件只是触发动作。

### 场景二：刷新远端数据，但搜索是本地搜索

远端请求不要带本地搜索词，否则刷新后基础数据源会变成过滤后的子集，清空关键词也恢复不了完整列表。

推荐写法：

```ts
const keyword = ref('')
const sourceList = ref<Item[]>([])

const tableData = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return sourceList.value

  return sourceList.value.filter((item) => {
    return item.name.toLowerCase().includes(kw)
  })
})

async function refresh() {
  sourceList.value = await fetchList({
    keyword: '',
    type: 'all',
  })
}
```

错误写法：

```ts
async function refresh() {
  sourceList.value = await fetchList({
    keyword: keyword.value,
  })
}
```

如果 `keyword.value` 是 `gold`，那么 `sourceList` 就只剩服务端返回的 `gold` 相关数据。之后清空输入框，本地过滤虽然放行了全部数据，但“全部数据”本身已经不完整。

### 场景三：确实需要多个组件共享同一份状态

如果多个组件没有明显父子关系，或者很多地方都要读写同一份数据，优先用 Pinia。

如果只是一个小范围共享，也可以使用模块级状态：

```ts
const keyword = ref('')
const sourceList = ref<Item[]>([])

export function useSharedList() {
  const tableData = computed(() => {
    // ...
  })

  return {
    keyword,
    sourceList,
    tableData,
  }
}
```

注意：模块级状态是全局单例。它适合真的全局共享，不适合弹窗、多个列表实例、不同账号同时存在的场景。

如果只是父子组件之间共享，也可以用 `provide/inject`，但不要把它当成默认方案。很多时候父组件并不需要持有完整状态，只需要调用子组件方法。

## 总结

遇到 composable 多处调用状态不一致时，不要先急着加同步逻辑。

先判断状态应该归谁：

- 只展示在子组件里：状态放子组件，父组件通过 `defineExpose` 触发动作。
- 多个无关组件共享：用 Pinia 或明确的单例 composable。
- 父子局部共享：可以考虑 `provide/inject`。

同时要区分“基础数据源”和“视图过滤结果”。刷新接口应该更新基础数据源，本地搜索、分类筛选应该从基础数据源派生出展示数据。
