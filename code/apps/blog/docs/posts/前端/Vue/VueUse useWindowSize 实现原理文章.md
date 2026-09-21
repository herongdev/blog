我来为你解析 `@vueuse/core` 中 `useWindowSize` 的实现原理，以 hexo 技术分享的方式呈现：
Ran tool
Ran tool
基于我的了解和搜索结果，让我为你创建一篇关于 VueUse useWindowSize 实现原理的 Hexo 风格技术分享文章：

---

# VueUse useWindowSize 实现原理深度解析

> 探索 Vue 3 生态中最流行的工具库之一 VueUse 是如何优雅地处理窗口尺寸监听的

## 前言

在现代前端开发中，响应式设计是必不可少的。`@vueuse/core` 提供的 `useWindowSize` 函数让我们能够轻松获取和监听窗口尺寸变化。但你是否好奇过它的内部实现原理？今天我们就来深入探索一下。

## 核心实现原理

### 1. 基础结构

```typescript
import { ref, Ref } from "vue";
import { useEventListener } from "@vueuse/core";

export interface UseWindowSizeOptions {
  initialWidth?: number;
  initialHeight?: number;
  listenOrientation?: boolean;
  includeScrollbar?: boolean;
}

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true,
  } = options;

  // 创建响应式引用
  const width = ref(initialWidth);
  const height = ref(initialHeight);

  // 实现逻辑...

  return { width, height };
}
```

### 2. 获取窗口尺寸的核心逻辑

```typescript
function update() {
  if (window) {
    if (includeScrollbar) {
      // 包含滚动条的尺寸
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    } else {
      // 不包含滚动条的尺寸
      width.value = window.document.documentElement.clientWidth;
      height.value = window.document.documentElement.clientHeight;
    }
  }
}
```

### 3. 事件监听机制

```typescript
// 监听窗口大小变化
useEventListener("resize", update, { passive: true });

// 可选：监听屏幕方向变化（移动端）
if (listenOrientation) {
  useEventListener("orientationchange", update, { passive: true });
}

// 初始化时获取一次尺寸
update();
```

## 完整实现示例

```typescript
import { ref, Ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { ConfigurableWindow, defaultWindow } from "../_configurable";

export interface UseWindowSizeOptions extends ConfigurableWindow {
  initialWidth?: number;
  initialHeight?: number;
  listenOrientation?: boolean;
  includeScrollbar?: boolean;
}

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    window = defaultWindow,
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true,
  } = options;

  const width = ref(initialWidth);
  const height = ref(initialHeight);

  const update = () => {
    if (window) {
      if (includeScrollbar) {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      } else {
        width.value = window.document.documentElement.clientWidth;
        height.value = window.document.documentElement.clientHeight;
      }
    }
  };

  update();

  useEventListener("resize", update, { passive: true });

  if (listenOrientation && window) {
    useEventListener("orientationchange", update, { passive: true });
  }

  return { width, height };
}
```

## 关键技术点解析

### 1. 响应式系统集成

VueUse 巧妙地利用了 Vue 3 的响应式系统：

```typescript
// 使用 ref 创建响应式引用
const width = ref(initialWidth);
const height = ref(initialHeight);

// 当这些值发生变化时，所有依赖它们的组件都会自动更新
```

### 2. 事件监听优化

```typescript
// 使用 passive 选项优化性能
useEventListener("resize", update, { passive: true });

// passive: true 告诉浏览器事件处理器不会调用 preventDefault()
// 这样可以让浏览器优化滚动性能
```

### 3. 服务端渲染 (SSR) 兼容

```typescript
// 通过检查 window 对象的存在来确保 SSR 兼容性
if (window) {
  // 只在客户端执行
  width.value = window.innerWidth;
  height.value = window.innerHeight;
}
```

### 4. 配置灵活性

```typescript
// 支持多种配置选项
export interface UseWindowSizeOptions {
  initialWidth?: number; // 初始宽度
  initialHeight?: number; // 初始高度
  listenOrientation?: boolean; // 是否监听屏幕方向变化
  includeScrollbar?: boolean; // 是否包含滚动条
}
```

## 实际应用场景

### 1. 响应式布局判断

```vue
<template>
  <div>
    <MobileLayout v-if="isMobile" />
    <DesktopLayout v-else />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
</script>
```

### 2. 动态样式调整

```vue
<template>
  <div :style="containerStyle">响应式容器</div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const containerStyle = computed(() => ({
  width: `${Math.min(width.value * 0.8, 1200)}px`,
  height: `${height.value * 0.6}px`,
}));
</script>
```

## 性能考虑

### 1. 防抖处理

虽然 VueUse 的基础实现没有包含防抖，但你可以轻松添加：

```typescript
import { debounce } from "lodash-es";

const debouncedUpdate = debounce(update, 100);
useEventListener("resize", debouncedUpdate, { passive: true });
```

### 2. 内存泄漏预防

VueUse 通过 `useEventListener` 自动处理事件监听器的清理：

```typescript
// 当组件卸载时，事件监听器会自动移除
// 无需手动调用 removeEventListener
```

## 总结

`useWindowSize` 的实现虽然看起来简单，但其中蕴含了许多优秀的设计思想：

1. **响应式集成**：完美融入 Vue 3 的响应式系统
2. **性能优化**：使用 passive 事件监听器
3. **SSR 兼容**：考虑服务端渲染场景
4. **自动清理**：防止内存泄漏
5. **配置灵活**：支持多种使用场景

这就是为什么 VueUse 能够成为 Vue 生态中如此受欢迎的工具库的原因 —— 它不仅解决了实际问题，还以优雅和高效的方式实现了解决方案。

---

_希望这篇文章能帮助你更好地理解 VueUse 的设计哲学和实现细节。在下次使用 `useWindowSize` 时，你就能更加自信地知道它在背后为你做了什么！_
