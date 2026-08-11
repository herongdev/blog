---
title: "useDynamicHeight"
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
description: "高度偏移量 高度单位， '' 表示无单位（纯数字） 初始高度 最小高度 防抖延迟 立即计算初始高度 容器引用 响应式高度 手动触发高度更新 export function useDynamicHeight(options: UseDynamicHeightOptions \\{\\}。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/composable/useDynamicHeight/useDynamicHeight.md"
---
::: v-pre

# useDynamicHeight

> 本节目标：理解“useDynamicHeight”的核心思路，并能把它用于实际开发或面试表达。
```
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash'
interface UseDynamicHeightOptions {
  offset?: number //
```

高度偏移量

```
  unit?: 'px' | 'rem' | 'vh' | '%' | '' //
```

高度单位，`''` 表示无单位（纯数字）

```
  initialHeight?: string | number //
```

初始高度

```
  minHeight?: number //
```

最小高度

```
  debounceDelay?: number //
```

防抖延迟

```
}
/**
 * Dynamically adjusts height based on containerRef size, optimized for responsive layouts.
 * @param options - Configuration options for height calculation
 * @returns An object containing containerRef ref, height ref, and updateHeight function
 */
export function useDynamicHeight(options: UseDynamicHeightOptions = {}) {
  const {
    offset = 0,
    unit = 'px',
    initialHeight = unit === '' ? 500 : `500${unit}`,
    minHeight = 0,
    debounceDelay = 100,
  } = options
  const containerRef = ref<HTMLElement | null>(null)
  const height = ref<string | number>(initialHeight)
  const updateHeight = debounce(() => {
    if (!containerRef.value) {
      console.warn('useDynamicHeight: Container ref is not set')
      return
    }
    const calculatedHeight = containerRef.value.clientHeight - offset
    const finalHeight = Math.max(minHeight, calculatedHeight)
    height.value = unit === '' ? finalHeight : `${finalHeight}${unit}`
  }, debounceDelay)
  let observer: ResizeObserver | null = null
  onMounted(() => {
    if (containerRef.value) {
      observer = new ResizeObserver(updateHeight)
      observer.observe(containerRef.value)
      updateHeight() //
```

立即计算初始高度

```
    } else {
      console.warn('useDynamicHeight: Container ref is not available on mount')
    }
  })
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    updateHeight.cancel()
  })
  return {
    containerRef, //
```

容器引用

```
    height, //
```

响应式高度

```
    updateHeight, //
```

手动触发高度更新

```
  }
}
```

export function useDynamicHeight(options: UseDynamicHeightOptions = \{\}) \{
const containers = ref\<HTMLElement[]\>([])
const heights = ref\<(string | number)[]\>([])

const updateHeight = debounce((index: number) =\> \{
if (!containers.value[index]) return
const calculatedHeight = containers.value[index].clientHeight - options.offset
const finalHeight = Math.max(options.minHeight || 0, calculatedHeight)
heights.value[index] = options.unit === '' ? finalHeight : `${finalHeight}${options.unit}`
\}, options.debounceDelay || 100)

const addContainer = (el: HTMLElement, index: number) =\> \{
containers.value[index] = el
const observer = new ResizeObserver(() =\> updateHeight(index))
observer.observe(el)
updateHeight(index)
return () =\> observer.disconnect() // 返回清理函数
\}

onUnmounted(() =\> \{
containers.value.forEach((_, index) =\> \{
updateHeight.cancel()
\})
\})

return \{ containers, heights, addContainer \}
\}
是的，您的 useDynamicTableHeight 已经是一个非常好的可复用的 Vue Composable，它可以通过简单的参数配置（如 offset）动态计算表格高度，并且使用 ResizeObserver 监听容器尺寸变化，结合防抖机制优化性能。这种设计非常适合作为通用的 Composable，用于任何需要动态调整高度的场景（如表格、虚拟列表、容器等）。以下是对其通用性的分析、改进建议以及如何进一步优化以增强其通用性。
**1. 当前设计的通用性分析**
**现有优点的通用性**：

- **灵活的 offset 参数**：
    - 允许用户传入一个偏移量（默认 60），可以适配不同的场景（如包含头部、工具栏或其他固定高度元素）。
    - 适用性广，无论是表格、列表还是其他容器，都可能需要类似的偏移调整。
- **响应式高度**：
    - tableHeight 是一个 ref，返回字符串（如 '500px'），适合直接绑定到 CSS 样式（如 height）或组件属性。
    - 支持虚拟化组件（如 MVirtualizedTable）或其他需要动态高度的场景。
- **ResizeObserver 监听**：
    - 使用 ResizeObserver 自动监听容器尺寸变化，适配窗口调整、容器切换等动态场景。
    - 比传统的 window.addEventListener('resize') 更高效，因为它只监听特定元素的变化。
- **防抖优化**：
    - 使用 lodash 的 debounce 限制高度更新频率，避免频繁调整窗口大小导致性能问题。
- **生命周期管理**：
    - 在 onMounted 中初始化 ResizeObserver，在 onUnmounted 中清理，确保没有内存泄漏。
    - 提供了 updateHeight.cancel()，清理防抖任务。

**适用场景**：

- 虚拟化表格（如 MVirtualizedTable）的动态高度计算。
- 任何需要基于容器高度动态调整的 UI 组件（如列表、面板、画布）。
- 响应式布局中，容器高度随窗口或父元素变化的场景。

**当前局限性**：

- **硬编码单位**：tableHeight 固定返回像素单位（px），可能不适合需要其他单位（如 rem、vh）或无单位的场景（如某些组件接受纯数字）。
- **单一容器**：当前设计只支持单个 tableWrapper 容器。如果需要同时管理多个容器，需多次调用。
- **固定命名**：命名为 useDynamicTableHeight，暗示专为表格设计，可能限制其在其他场景的直观使用。
- **错误处理**：如果 tableWrapper.value 不存在或高度计算异常（如负值），可能需要更健壮的处理。

**2. 优化为更通用的 Composable**
为了让 useDynamicTableHeight 成为更通用的 Composable，可以进行以下改进，增强灵活性和复用性。
**改进目标**

- **通用命名**：将名称改为更通用的 useDynamicHeight，以反映其适用性（不仅仅是表格）。
- **支持多种单位**：允许用户指定高度单位（如 px、rem、%）或返回纯数字。
- **多容器支持**：支持监听多个容器的高度变化。
- **默认值配置**：允许用户自定义初始高度或其他默认行为。
- **错误处理**：添加健壮的边界检查和错误日志。
- **类型安全**：使用 TypeScript 提供更强的类型支持。

**优化后的代码**
以下是优化后的 useDynamicHeight Composable，支持更广泛的场景：
typescript
Copy
import \{ ref, onMounted, onUnmounted, type Ref \} from 'vue'import \{ debounce \} from 'lodash'
interface UseDynamicHeightOptions \{ offset?: number _// 高度偏移量_ unit?: 'px' | 'rem' | 'vh' | '%' | '' _// 高度单位，'' 表示无单位（纯数字）_ initialHeight?: string | number _// 初始高度_ minHeight?: number _// 最小高度_ debounceDelay?: number _// 防抖延迟_\}
_/**___ _* Dynamically adjusts height based on container size, optimized for responsive layouts.___ _*_ _@param_ _options_ _- Configuration options for height calculation___ _*_ _@returns_ _An object containing container ref, height ref, and updateHeight function___ _*/_export function useDynamicHeight(options: UseDynamicHeightOptions = \{\}) \{ const \{ offset = 0, unit = 'px', initialHeight = unit === '' ? 500 : `500${unit}`, minHeight = 0, debounceDelay = 100, \} = options
const container = ref\<HTMLElement | null\>(null) const height = ref\<string | number\>(initialHeight)
const updateHeight = debounce(() =\> \{ if (!container.value) \{ console.warn('useDynamicHeight: Container ref is not set') return \}
const calculatedHeight = container.value.clientHeight - offset const finalHeight = Math.max(minHeight, calculatedHeight)
height.value = unit === '' ? finalHeight : `${finalHeight}${unit}` \}, debounceDelay)
let observer: ResizeObserver | null = null
onMounted(() =\> \{ if (container.value) \{ observer = new ResizeObserver(updateHeight) observer.observe(container.value) updateHeight() _// 立即计算初始高度_ \} else \{ console.warn('useDynamicHeight: Container ref is not available on mount') \} \})
onUnmounted(() =\> \{ if (observer) \{ observer.disconnect() observer = null \} updateHeight.cancel() \})
return \{ container, _// 容器引用_ height, _// 响应式高度_ updateHeight, _// 手动触发高度更新_ \}\}
**3. 优化点说明**

1. **通用命名**：
    - 将 useDynamicTableHeight 重命名为 useDynamicHeight，更能反映其通用性，适用于表格、列表、面板等场景。
2. **灵活的单位支持**：
    - 新增 unit 选项，支持 px、rem、vh、% 或无单位（纯数字，适合某些组件）。
    - 当 unit 为 '' 时，height 返回数字类型（number），否则返回字符串（如 '500px'）。
    - TypeScript 类型推断支持： typescriptCopyheight: Ref\<string | number\>
3. **可配置选项**：
    - offset：保持原有偏移量，默认为 0。
    - unit：高度单位，默认为 px。
    - initialHeight：初始高度，默认为 500px（或根据 unit 调整）。
    - minHeight：最小高度，防止计算出负值或过小值，默认为 0。
    - debounceDelay：防抖延迟，默认为 100ms，允许用户调整。
4. **错误处理**：
    - 如果 container.value 不存在，打印警告日志，避免静默失败。
    - 使用 Math.max(minHeight, calculatedHeight) 确保高度不低于最小值。
5. **初始高度灵活性**：
    - initialHeight 根据 unit 自动适配（例如无单位时为 500，有单位时为 '500px'）。
    - 用户可以传入自定义值（如 '100vh' 或 300）。
6. **多容器支持**：
    - 当前设计支持单个容器。如果需要监听多个容器，可以扩展为： typescriptCopyexport function useDynamicHeight(options: UseDynamicHeightOptions = \{\}) \{ const containers = ref\<HTMLElement[]\>([]) const heights = ref\<(string | number)[]\>([]) const updateHeight = debounce((index: number) =\> \{ if (!containers.value[index]) return const calculatedHeight = containers.value[index].clientHeight - options.offset const finalHeight = Math.max(options.minHeight || 0, calculatedHeight) heights.value[index] = options.unit === '' ? finalHeight : `${finalHeight}${options.unit}` \}, options.debounceDelay || 100) const addContainer = (el: HTMLElement, index: number) =\> \{ containers.value[index] = el const observer = new ResizeObserver(() =\> updateHeight(index)) observer.observe(el) updateHeight(index) return () =\> observer.disconnect() _// 返回清理函数_ \} onUnmounted(() =\> \{ containers.value.forEach((_, index) =\> \{ updateHeight.cancel() \}) \}) return \{ containers, heights, addContainer \}\}
    - 但对于大多数场景，单个容器已足够，复杂场景可按需扩展。

**4. 使用示例**
**示例 1：表格动态高度**
vue
Copy
\<script setup\>import \{ useDynamicHeight \} from '@/composables/useDynamicHeight'
const \{ container, height \} = useDynamicHeight(\{ offset: 60, unit: 'px', initialHeight: '500px', minHeight: 200, debounceDelay: 200,\})\</script\>
\<template\> \<div ref="container" class="w-full h-full"\> \<MVirtualizedTable :table-height="height" :data-source="data" /\> \</div\>\</template\>
**示例 2：无单位（纯数字）**
vue
Copy
\<script setup\>import \{ useDynamicHeight \} from '@/composables/useDynamicHeight'
const \{ container, height \} = useDynamicHeight(\{ offset: 20, unit: '', initialHeight: 500, minHeight: 100,\})\</script\>
\<template\> \<div ref="container" class="w-full h-full"\> \<CustomComponent :height="height" /\> \</div\>\</template\>
**示例 3：不同单位**
vue
Copy
\<script setup\>import \{ useDynamicHeight \} from '@/composables/useDynamicHeight'
const \{ container, height \} = useDynamicHeight(\{ offset: 10, unit: 'rem', initialHeight: '30rem', minHeight: 10,\})\</script\>
\<template\> \<div ref="container" class="w-full h-full"\> \<div :style="\{ height \}"\>\</div\> \</div\>\</template\>
**5. 进一步优化的可能性**

1. **支持宽度或其他尺寸**：
    - 扩展为 useDynamicSize，支持宽度（width）或自定义尺寸计算： typescriptCopyinterface UseDynamicSizeOptions \{ offset?: \{ width?: number; height?: number \} unit?: \{ width?: string; height?: string \} _// ..._\}
2. **支持父容器**：
    - 允许传入父容器引用，计算相对于父容器的高度： typescriptCopyinterface UseDynamicHeightOptions \{ parent?: Ref\<HTMLElement | null\> _// ..._\}
3. **事件回调**：
    - 添加回调函数，在高度变化时通知用户： typescriptCopyinterface UseDynamicHeightOptions \{ onHeightChange?: (newHeight: string | number) =\> void\}
4. **支持非 DOM 元素**：
    - 如果需要在非 DOM 场景（如 canvas 或第三方库）计算高度，可以扩展为支持 getBoundingClientRect 或其他测量方式。
5. **兼容 SSR**：
    - 当前代码依赖 ResizeObserver，在服务器端渲染（SSR）中不可用。可以通过检查 typeof window !== 'undefined' 添加兼容性： typescriptCopyonMounted(() =\> \{ if (typeof window === 'undefined' || !container.value) return observer = new ResizeObserver(updateHeight) observer.observe(container.value) updateHeight()\})

**6. 总结**

- **通用性**：当前的 useDynamicTableHeight 已具备很好的通用性，通过简单的重命名（如 useDynamicHeight）和增强配置（如单位、最小高度等），可以成为通用的 Composable，适用于表格、列表、面板等场景。
- **优化后的优势**：
    - 支持多种单位（px、rem、纯数字等）。
    - 可配置初始高度、最小高度、防抖延迟等。
    - 健壮的错误处理和生命周期管理。
    - 易于扩展到多容器或其他尺寸。
- **使用建议**：
    - 直接替换现有 useDynamicTableHeight，在新项目中使用 useDynamicHeight。
    - 根据项目需求调整默认配置（如 offset、minHeight）。
    - 如果需要多容器支持，可按需扩展。

如果您有具体场景需要进一步调整（例如与 MVirtualizedTable 的集成、特定单位需求，或其他功能扩展），请提供更多细节，我可以继续优化代码！

:::
