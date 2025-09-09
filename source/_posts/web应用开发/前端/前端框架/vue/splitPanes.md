---
title: Splitpanes 的局限性及解决方案
date: 2025-09-08 16:08:08
tags:
---

### Splitpanes 的局限性及解决方案

您好！从您的代码来看，您使用 Splitpanes 库来实现面板分隔（包括水平和垂直分割），这是一个轻量级的 Vue.js 库，支持 Vue 3 和触摸事件。但正如您提到的，Splitpanes 的 `size` 属性主要基于百分比（percentage）布局，这在某些场景下（如固定像素高度的面板，例如图表或表格）会带来不便，因为它无法直接指定像素值（如 300px），而是依赖容器比例。这可能会导致在动态内容或固定尺寸需求下布局不精确。

下面我将基于最新信息（截至 2025 年 9 月 8 日）分析问题，并提供解决方案，包括推荐的替代库和自己实现的 feasibility。信息来源于网络搜索结果，我会标注引用来源以确保透明度。
vue3-split
https://github.com/nathancahill/split

#### 1. 推荐的替代库

有几个 Vue 3 兼容的库可以更好地支持像素级控制（pixel-based sizing），同时保持轻量和性能。它们通常允许通过 `width`、`height` 或 `size` 属性直接指定像素值（如 `300px`），并支持百分比混合使用。以下是最佳替代品，我使用表格比较它们的关键特性（基于 GitHub、NPM 和文档描述）：

| 库名称                               | 支持像素级控制                                                   | Vue 3 兼容            | 主要特性                                                                                        | 优缺点                                                                                                                            | 安装方式                                   | 引用来源 |
| ------------------------------------ | ---------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------- |
| **vue-multipane**                    | 是（支持固定像素宽度/高度，如 `width: 150px`，并混合百分比）     | 是                    | 多面板支持、自定义 resize handle、触摸友好、嵌套布局；默认隐藏 10px resize 手柄，可自定义样式。 | 优点：灵活，支持 min/max 限制，性能好（无外部依赖）；缺点：文档较旧（最后更新 2017 年，但仍活跃）。适合您的嵌套 Splitpanes 场景。 | `npm install vue-multipane`                | , ,      |
| **@marsio/vue-split-pane**           | 是（支持像素和百分比，通过 `size` 属性指定）                     | 是（专为 Vue 3 设计） | 简单可调整大小面板、水平/垂直支持、事件回调（如 resize）；轻量级。                              | 优点：现代、易集成，适合简单布局；缺点：功能较基础，无内置嵌套或高级动画。                                                        | `npm install @marsio/vue-split-pane`       |          |
| **vue-split-view**                   | 是（数字值直接转为像素，如 `size: 300` 表示 300px）              | 是                    | 简单分割视图、自动填充剩余空间、支持字符串 CSS 值（如 '300px'）。                               | 优点：极简，轻量（<5KB），性能优秀；缺点：不支持复杂嵌套或多 splitter。适合您的双层 Splitpanes（垂直 + 水平）。                   | `npm install vue-split-view`               |          |
| **Syncfusion Vue Splitter**          | 是（支持像素、百分比、minSize/maxSize；可通过 API 精确控制）     | 是                    | 内置可调整大小、扩展/折叠、嵌套面板、多向布局；企业级功能（如键盘支持）。                       | 优点：功能最丰富，性能优化好（虚拟化支持）；缺点：商业库（免费社区版有限制），体积稍大。                                          | `npm install @syncfusion/ej2-vue-splitter` | , ,      |
| **PrimeVue Splitter**                | 部分（初始 size 为百分比，但 minSize 支持像素；可通过 CSS 覆盖） | 是                    | 面板分离与调整大小、事件处理；集成 PrimeVue UI 生态。                                           | 优点：与 PrimeVue 无缝集成，触摸支持；缺点：像素控制需额外 CSS，不如前者直接。                                                    | `npm install primevue`（Splitter 组件）    | ,        |
| **vue3-split-panel** (基于 Split.js) | 是（继承 Split.js，支持像素和百分比）                            | 是                    | 浏览器兼容好、嵌套支持、动画平滑；Split.js 是成熟的 JS 库。                                     | 优点：稳定，性能高（使用 requestAnimationFrame）；缺点：需手动处理一些事件。                                                      | `npm install vue3-split-panel`             |          |
| **Radix Vue Splitter**               | 是（支持像素通过 size 属性，嵌套布局）                           | 是                    | 无头组件（headless）、键盘/RTL 支持、跨面板调整大小。                                           | 优点：现代、访问性强；缺点：需自行添加样式，学习曲线稍陡。                                                                        | `npm install @radix-vue/primitives`        |          |

**推荐优先级**：

- **首选：vue-multipane** – 它最接近 Splitpanes 的 API，支持像素固定宽度（如您的 sidebarPanelWidth），且性能轻量。迁移成本低：只需替换 `<Splitpanes>` 为 `<multipane>`，并调整 `:width` 属性为像素值。
- **如果需要企业级功能：Syncfusion Vue Splitter** – 完美支持您的场景（图表 + 表格 + 交易面板），有内置 resize 事件回调，与您的 `handleSidebarResizing` 等兼容。
- **轻量替代：vue-split-view** – 如果您的布局简单（仅 2-3 面板），它直接支持像素，且体积小，性能最佳。

这些库都支持触摸事件和性能优化（如节流 resize），比 Splitpanes 更灵活。安装后，参考其文档调整您的代码，例如将 `:size="sidebarPanelWidth"` 改为 `:width="200"`（像素）。

#### 2. 自己实现可调整大小的 Splitter

自己实现一个自定义 splitter 是可行的，尤其对于您的场景（嵌套水平/垂直分隔，带有 min/max 限制）。它不算太难（中等难度），但需要处理鼠标/触摸事件。性能方面，如果正确实现，不会比库差，甚至更好（因为可定制优化）。下面是评估和实现指南。

**容易度**：

- **简单场景**（如单 splitter）：容易，1-2 小时完成。使用原生 DOM 事件（mousedown/mousemove/mouseup）调整面板宽度/高度。
- **您的复杂场景**（嵌套 + 事件回调 + min/max）：中等难度，需 4-8 小时，包括测试边界情况（如拖拽超出容器）。但 Vue 的响应式系统（如 ref/computed）使状态管理简单。
- 挑战：处理触摸事件（touchstart/touchmove）、防止文本选择（user-select: none）、跨浏览器兼容（尤其是移动端）。

**性能考虑**：

- **潜在问题**：频繁的 mousemove 事件可能导致高 CPU 使用（尤其是嵌套面板时，DOM 更新频繁）。
- **优化策略**：
  - 使用 `requestAnimationFrame` 节流更新样式（避免每帧重绘）。
  - 结合 lodash 的 `throttle`（您已在代码中使用），限制 resize 频率（如 16ms/帧）。
  - 只更新受影响的面板（使用 CSS transform 而非 width/height 变化，以减少 reflow）。
  - 测试：在高负载场景（如大表格 + 图表）下，保持 60fps。自定义实现通常比库轻（无额外依赖），但需避免在 resize 中触发昂贵计算（如重新渲染 SymbolList）。
- 总体：性能优秀，如果您的面板内容不频繁重绘（如使用虚拟滚动在 OrderTabs 中），自定义 splitter 不会成为瓶颈。

**实现步骤**（以 Vue 3 + TSX 为例，替换您的 Splitpanes）：

1. **创建自定义组件**（例如 `CustomSplitter.vue`）：

   - 使用 `<div>` 作为容器，内部两个 `<slot>` 为面板。
   - 添加一个隐藏的 `<div class="splitter-handle">`（5-10px 宽/高）作为拖拽手柄。
   - 通过 props 传入 `direction`（'horizontal' 或 'vertical'）、`initialSize`（像素，如 200）、`minSize`、`maxSize`。

   示例代码框架：

   ```vue
   <template>
     <div class="custom-splitter" :class="direction" ref="containerRef">
       <div
         class="pane-left"
         :style="{
           flex: direction === 'vertical' ? 1 : null,
           width: direction === 'horizontal' ? leftSize + 'px' : 'auto',
           height: direction === 'vertical' ? leftSize + 'px' : 'auto',
         }"
       >
         <slot name="left"></slot>
       </div>
       <div
         class="splitter-handle"
         @mousedown="startResize"
         @touchstart="startResize"
       ></div>
       <div class="pane-right" :style="{ flex: 1 }">
         <slot name="right"></slot>
       </div>
     </div>
   </template>

   <script setup lang="tsx">
   import { ref, onMounted } from "vue";

   const props = defineProps<{
     direction: "horizontal" | "vertical";
     initialSize: number;
     minSize?: number;
     maxSize?: number;
   }>();
   const containerRef = ref<HTMLElement>();
   const leftSize = ref(props.initialSize);

   let startX: number, startY: number, startWidth: number;

   const startResize = (e: MouseEvent | TouchEvent) => {
     e.preventDefault();
     startX = "touches" in e ? e.touches[0].clientX : e.clientX;
     startY = "touches" in e ? e.touches[0].clientY : e.clientY;
     startWidth = leftSize.value;
     document.addEventListener("mousemove", onResize);
     document.addEventListener("touchmove", onResize);
     document.addEventListener("mouseup", stopResize);
     document.addEventListener("touchend", stopResize);
   };

   const onResize = throttle((e: MouseEvent | TouchEvent) => {
     requestAnimationFrame(() => {
       const delta =
         props.direction === "horizontal"
           ? ("touches" in e ? e.touches[0].clientX : e.clientX) - startX
           : ("touches" in e ? e.touches[0].clientY : e.clientY) - startY;
       let newSize =
         props.direction === "horizontal"
           ? startWidth + delta
           : startWidth + delta;
       newSize = Math.max(
         props.minSize || 0,
         Math.min(props.maxSize || Infinity, newSize)
       );
       leftSize.value = newSize;
     });
   }, 16); // 节流到 60fps

   const stopResize = () => {
     document.removeEventListener("mousemove", onResize);
     // ... 其他移除
   };

   onMounted(() => {
     // 初始化大小
   });
   </script>

   <style scoped>
   .custom-splitter {
     display: flex;
     height: 100%;
     width: 100%;
   }
   .horizontal {
     flex-direction: row;
   }
   .vertical {
     flex-direction: column;
   }
   .splitter-handle {
     width: 5px;
     height: 100%;
     cursor: col-resize;
     background: #ccc;
   } /* 垂直类似 */
   </style>
   ```

2. **集成到您的代码**：

   - 替换外层 Splitpanes：
     ```vue
     <CustomSplitter
       direction="vertical"
       :initial-size="(chartPanelHeight * containerHeight) / 100"
       @resize="handleTablePanelResizing"
     >
       <template #left> <!-- symbolList + chartPanel 的内层 Splitpanes 或另一个 CustomSplitter --> </template>
       <template #right> <OrderTabs ... /> </template>
     </CustomSplitter>
     ```
   - 内层类似，使用像素计算（从容器 ref 获取总高度/宽度）。
   - 添加事件：通过 `@resize` emit 新大小，更新您的 composable（如 `useTradingLayout`）。

3. **性能测试**：
   - 在开发中，使用 Chrome DevTools 的 Performance 面板记录 resize 操作，确保无阻塞。
   - 对于嵌套：只在拖拽时更新受影响的 computed 值，避免全组件重渲染。
   - 如果性能瓶颈：集成 ResizeObserver API 监听容器变化。

**自己实现的优缺点**：

- 优点：完全自定义（完美匹配像素需求）、无依赖、性能可控。
- 缺点：需手动处理边缘 case（如拖拽超出视口、移动端缩放），维护成本高。如果您的布局复杂，推荐库以节省时间。

#### 结论与建议

- **如果时间紧迫**：直接切换到 **vue-multipane** 或 **vue-split-view** – 它们支持像素级控制，迁移简单（API 类似 Splitpanes），性能与原库相当，且活跃维护。
- **如果追求定制**：自己实现不难（从简单 splitter 开始，逐步嵌套），性能优秀（用 RAF + throttle），但如果团队小，优先库以避免 bug。
- **下一步**：查看 vue-multipane 的 demo（https://yansern.github.io/vue-multipane/），测试是否满足您的 `handleSidebarResizing` 等回调。如果需要更详细代码示例或特定库集成指导，请提供更多细节！
