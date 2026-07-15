---
title: 解决浏览器缩放导致的浮层错位与 Tabs 下划线漂移问题
date: 2026-07-15 20:00:00
categories:
  - Frontend
tags:
  - Vue
  - CSS
  - Floating UI
  - 浏览器兼容
  - 页面缩放
---

## 背景

在 Web 后台系统里，经常会遇到一个问题：页面在浏览器缩放到 75%、80%、90% 之后，原本正常的布局突然错乱。

典型表现有两个：

1. 语言下拉、菜单、Tooltip 等浮层位置偏移。
2. Tabs 的 active 下划线没有对齐当前 Tab，甚至刷新后又恢复。

这类问题本质上不是某一个浏览器的 bug，而是页面缩放后，`viewport`、`devicePixelRatio`、元素布局尺寸、浮层定位坐标之间产生了新的换算关系。如果代码里过度依赖 `getBoundingClientRect()` 或者第三方组件默认的 `body` 挂载策略，就容易出现错位。

---

## 一、浮层问题：不要完全依赖 body 坐标黑盒

很多组件库的 Dropdown、Popover 默认会把浮层挂到 `body` 下，然后通过全局坐标计算位置。

正常缩放时没问题，但在浏览器缩放、页面滚动、容器 transform、RTL、字体变化、视口变化等场景下，全局坐标很容易出现细微误差。

更稳定的思路是：

- 使用专门的浮层定位库；
- 打开时动态计算位置；
- 监听滚动、resize、layout shift；
- 自动处理边界避让；
- 高度不够时再出现滚动条。

这里可以用项目里已有的 `@floating-ui/dom`。

### 最小实现

```vue
<template>
  <div ref="rootRef" class="language-selector">
    <button ref="triggerRef" class="trigger" @click="toggle">
      {{ currentLabel }}
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        ref="floatingRef"
        class="language-menu"
        :style="floatingStyles"
      >
        <div
          v-for="item in languages"
          :key="item.value"
          class="language-item"
          @click="selectLanguage(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue'
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/dom'

const open = ref(false)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)

const floatingStyles = ref({
  position: 'fixed',
  left: '0px',
  top: '0px',
})

let cleanup: (() => void) | null = null

const currentLabel = 'English'

const languages = [
  { label: 'English', value: 'en' },
  { label: '简体中文', value: 'zh-CN' },
  { label: 'Français', value: 'fr' },
  { label: 'Español', value: 'es' },
]

const updatePosition = async () => {
  if (!triggerRef.value || !floatingRef.value) return

  const { x, y } = await computePosition(triggerRef.value, floatingRef.value, {
    placement: 'bottom-end',
    strategy: 'fixed',
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${Math.max(160, availableHeight)}px`
        },
      }),
    ],
  })

  floatingStyles.value = {
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
  }
}

const startAutoUpdate = () => {
  if (!triggerRef.value || !floatingRef.value) return

  cleanup?.()

  cleanup = autoUpdate(triggerRef.value, floatingRef.value, updatePosition, {
    ancestorScroll: true,
    ancestorResize: true,
    elementResize: true,
    layoutShift: true,
    animationFrame: true,
  })
}

const toggle = async () => {
  open.value = !open.value

  if (open.value) {
    await nextTick()
    await updatePosition()
    startAutoUpdate()
  } else {
    cleanup?.()
    cleanup = null
  }
}

const selectLanguage = (item: { label: string; value: string }) => {
  console.log(item)
  open.value = false
  cleanup?.()
  cleanup = null
}

onUnmounted(() => {
  cleanup?.()
})
</script>

<style scoped>
.language-menu {
  z-index: 1000;
  min-width: 160px;
  max-height: calc(100vh - 16px);
  overflow-y: auto;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 12%);
}

.language-item {
  padding: 10px 16px;
  cursor: pointer;
  white-space: nowrap;
}

.language-item:hover {
  background: #f5f7fa;
}
</style>
```

关键点是：

```ts
computePosition()
autoUpdate()
flip()
shift()
size()
```

`size()` 只在屏幕高度不够时限制最大高度，所以正常情况下不会出现滚动条。

---

## 二、Tabs 下划线问题：动画线和最终态分离

Tabs 下划线常见写法是：

```ts
const rect = tab.getBoundingClientRect()
```

然后用 `rect.left`、`rect.width` 去算下划线位置。

这个方案在浏览器缩放后容易漂，因为它拿的是 viewport 坐标。缩放、滚动、字体渲染、浏览器像素取整都会影响最终结果。

更稳的方案是：

- 点击切换时，用一条临时 `.tab-line` 做动画；
- 动画结束后隐藏临时线；
- 最终下划线由 active tab 自己的 `::after` 渲染；
- 最终态不再依赖 JS 坐标。

这样即使动画过程有一点误差，最终状态也一定贴在当前 Tab 上。

### 最小实现

```vue
<template>
  <div
    ref="tabsRef"
    class="tabs"
    :class="{ 'is-moving': moving }"
  >
    <div
      v-for="tab in tabs"
      :key="tab.value"
      ref="tabRefs"
      class="tab"
      :class="{ active: active === tab.value }"
      @click="changeTab(tab.value)"
    >
      {{ tab.label }}
    </div>

    <div
      v-if="moving"
      class="tab-line"
      :style="lineStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { label: '当前跟单', value: 'current' },
  { label: '我的订阅', value: 'subscribe' },
  { label: '我的分享/推荐', value: 'share' },
]

const active = ref('current')
const moving = ref(false)
const tabRefs = ref<HTMLElement[]>([])

const lineStyle = ref<Record<string, string>>({})

const lineWidth = 26
let timer: ReturnType<typeof setTimeout> | null = null

const getTabX = (value: string) => {
  const index = tabs.findIndex(item => item.value === value)
  const el = tabRefs.value[index]

  if (!el) return 0

  return el.offsetLeft + el.offsetWidth / 2 - lineWidth / 2
}

const changeTab = (next: string) => {
  if (next === active.value) return

  const fromX = getTabX(active.value)
  const toX = getTabX(next)

  moving.value = true

  lineStyle.value = {
    width: `${lineWidth}px`,
    transform: `translateX(${fromX}px)`,
    transition: 'none',
  }

  requestAnimationFrame(() => {
    lineStyle.value = {
      width: `${lineWidth}px`,
      transform: `translateX(${toX}px)`,
      transition: 'transform 0.24s ease',
    }
  })

  active.value = next

  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    moving.value = false
  }, 260)
}
</script>

<style scoped>
.tabs {
  position: relative;
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #edf0f5;
}

.tab {
  position: relative;
  padding: 12px 0;
  color: #7b8494;
  cursor: pointer;
  font-weight: 500;
}

.tab.active {
  color: #17233d;
}

.tab::after {
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 26px;
  height: 2px;
  content: '';
  background: #c58a48;
  border-radius: 1px;
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tab.active::after {
  opacity: 1;
  transform: translateX(-50%) scaleX(1);
}

.tabs.is-moving .tab.active::after {
  opacity: 0;
}

.tab-line {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  background: #c58a48;
  border-radius: 1px;
  pointer-events: none;
}
</style>
```

---

## 三、核心原则

### 1. 浮层交给专业库

Dropdown、Popover、Tooltip 不建议自己用 `getBoundingClientRect()` 硬算一套完整定位系统。

更推荐使用：

```ts
@floating-ui/dom
```

它可以统一处理：

- 滚动；
- resize；
- 视口边界；
- 缩放；
- 元素尺寸变化；
- 自动翻转；
- 自动偏移。

### 2. Tabs 最终态交给 CSS

Tabs 下划线不要让 JS 长期负责最终位置。

JS 可以负责动画，但最终对齐最好交给当前 active 元素本身：

```css
.tab.active::after
```

因为它天然处在当前 Tab 的局部布局坐标里，不容易被 viewport 坐标影响。

### 3. 少用 viewport 坐标做长期状态

`getBoundingClientRect()` 拿到的是 viewport 坐标，适合临时计算，不适合在缩放场景里保存为长期状态。

更稳定的选择是：

```ts
offsetLeft
offsetWidth
```

或者直接让 CSS 自己完成最终布局。

---

## 总结

这类浏览器缩放问题，不要靠刷新、监听缩放后强行重置，也不要禁用用户缩放。

更合理的方案是：

- 浮层：使用 `Floating UI`，打开时动态定位，自动跟随布局变化。
- Tabs：动画和最终态分离，动画用临时线，最终态用 active tab 自身的 `::after`。

这样既保留了交互体验，也能避免缩放后位置漂移。
