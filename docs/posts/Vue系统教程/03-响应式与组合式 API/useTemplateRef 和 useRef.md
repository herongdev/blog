---
title: "useTemplateRef 和 useRef"
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
description: "在 Vue 3 的 Composition API 中，useTemplateRef 和 useRef 是两种用于处理引用的工具，但它们的用途、实现方式和适用场景有显著区别。本文将详细比较 useTemplateRef 和 useRef，包括它们的定义、功能、用法、优缺点以及最佳。"
sidebarWeight: 147
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/useTemplateRef 和 useRef.md"
---
::: v-pre

# useTemplateRef 和 useRef

> 本节目标：理解“useTemplateRef 和 useRef”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 的 Composition API 中，useTemplateRef 和 useRef 是两种用于处理引用的工具，但它们的用途、实现方式和适用场景有显著区别。本文将详细比较 useTemplateRef 和 useRef，包括它们的定义、功能、用法、优缺点以及最佳实践，帮助你理解两者的差异并选择合适的工具。

**1. 定义和基本概念**
**useRef**
useRef 是 Vue 3 Composition API 的核心 API，用于创建**响应式引用**（reactive reference）。它返回一个包含 .value 属性的对象，用于存储任意类型的值，并在值变化时触发组件的响应式更新。

- **来源**：Vue 3 的核心模块 @vue/reactivity 或 vue。
- **用途**：管理响应式数据，通常用于组件的内部状态或需要响应式更新的值。
- **响应性**：通过 ref 创建的引用是响应式的，修改 .value 会触发组件重新渲染（如果该值被模板或计算属性使用）。

**示例**：
javascript
Copy
import \{ ref \} from 'vue';
export default \{ setup() \{ const count = ref(0); _// 创建响应式引用_
function increment() \{ count.value++; _// 修改值，触发重新渲染_ \}
return \{ count, increment \}; \},\};
**useTemplateRef**
useTemplateRef 是 Vue 3.5 引入的新 API，用于直接访问模板中的 DOM 元素或组件实例。它取代了传统的 ref 属性与 setup 中的 ref 变量手动绑定的方式，提供了更简洁的模板引用获取方式。

- **来源**：Vue 3.5 的 @vue/runtime-dom 或 vue。
- **用途**：专门用于获取模板中通过 ref 属性标记的 DOM 元素或组件实例。
- **响应性**：useTemplateRef 返回的引用是响应式的，指向模板中的元素或组件，当模板重新渲染或元素发生变化时，引用会自动更新。

**示例**：
javascript
Copy
import \{ useTemplateRef \} from 'vue';
export default \{ setup() \{ const inputEl = useTemplateRef('inputRef'); _// 引用模板中的 ref="inputRef"_
function focusInput() \{ inputEl.value?.focus(); _// 访问 DOM 元素并调用方法_ \}
return \{ focusInput \}; \},\};
**模板**：
vue
Copy
\<template\> \<input ref="inputRef" type="text" /\> \<button @click="focusInput"\>Focus Input\</button\>\</template\>

**2. 主要区别**
以下是从功能、用法、响应性、适用场景等方面对 useRef 和 useTemplateRef 的详细比较：

|   |   |   |
|---|---|---|
|**特性**|**useRef**|**useTemplateRef**|
|**定义**|创建一个通用的响应式引用，存储任意类型的值。|获取模板中通过 ref 属性标记的 DOM 元素或组件实例。|
|**返回值**|Ref\<T\> 对象，包含 .value 属性，值可以是任意类型。|Ref\<HTMLElement \| ComponentPublicInstance \| null\>，指向模板中的引用。|
|**响应性**|响应式，修改 .value 触发组件重新渲染。|响应式，自动跟踪模板中 ref 的 DOM 元素或组件，渲染变化时更新。|
|**主要用途**|管理组件内部的响应式状态（例如计数器、表单数据）。|直接访问模板中的 DOM 元素或组件实例（例如操作 DOM、调用组件方法）。|
|**与模板的关系**|不直接与模板绑定，需手动在模板中使用（例如 v-model 或 \{\{ value \}\}）。|直接绑定到模板中的 ref 属性，自动获取对应的元素或组件。|
|**创建方式**|const value = ref(initialValue)|const el = useTemplateRef('refName')|
|**适用场景**|通用状态管理、逻辑处理。|DOM 操作、组件实例调用、模板引用管理。|
|**Vue 版本要求**|Vue 3.0+|Vue 3.5+|

**3. 详细比较**
**(1) 功能和用途**

- **useRef**：
    - **通用性强**：可以存储任何类型的值（数字、字符串、对象、数组等），用于组件的逻辑状态管理。
    - **灵活性高**：不限于 DOM 或组件引用，可用于计数器、表单输入、API 数据等场景。
    - **手动绑定**：如果需要用 useRef 获取 DOM 元素，必须在 setup 中手动声明并在模板中绑定 ref 属性。**示例（手动绑定 DOM）**：javascriptCopyimport \{ ref \} from 'vue';export default \{ setup() \{ const inputEl = ref(null); _// 初始值为 null_ function focusInput() \{ inputEl.value?.focus(); \} return \{ inputEl, focusInput \}; \},\};vueCopy\<template\> \<input ref="inputEl" type="text" /\> \<button @click="focusInput"\>Focus Input\</button\>\</template\>
- **useTemplateRef**：
    - **专为模板引用设计**：直接获取模板中 ref 属性的 DOM 元素或组件实例，无需手动声明变量并绑定。
    - **简化代码**：省去手动赋值的步骤，代码更简洁，减少出错可能。
    - **限制性**：只能用于模板中的 ref 引用，无法存储其他类型的数据。**示例**：javascriptCopyimport \{ useTemplateRef \} from 'vue';export default \{ setup() \{ const inputEl = useTemplateRef('inputRef'); function focusInput() \{ inputEl.value?.focus(); \} return \{ focusInput \}; \},\};vueCopy\<template\> \<input ref="inputRef" type="text" /\> \<button @click="focusInput"\>Focus Input\</button\>\</template\>**对比**：useTemplateRef 消除了手动声明 ref(null) 和模板绑定的步骤，使代码更简洁直观。

**(2) 响应性**

- **useRef**：
    - 响应式是通过 Vue 的 reactivity 系统实现的。修改 ref 的 .value 会触发依赖该值的模板或计算属性的更新。
    - 对于 DOM 引用，useRef 的 .value 在组件挂载后会更新为 DOM 元素，但后续模板变化不会自动更新引用（除非手动处理）。**示例（非自动更新）**：javascriptCopyimport \{ ref \} from 'vue';export default \{ setup() \{ const inputEl = ref(null); const showInput = ref(true); return \{ inputEl, showInput \}; \},\};vueCopy\<template\> \<input v-if="showInput" ref="inputEl" type="text" /\> \<button @click="showInput = false"\>Hide Input\</button\>\</template\>如果 showInput 变为 false，inputEl.value 不会自动变为 null，需要手动处理。
- **useTemplateRef**：
    - 响应式是针对模板引用的，useTemplateRef 自动跟踪模板中 ref 属性的变化。如果模板中的元素被移除或替换，useTemplateRef 的 .value 会自动更新为新的元素或 null。
    - 这种自动跟踪使得 useTemplateRef 更适合动态模板场景。**示例（自动更新）**：javascriptCopyimport \{ useTemplateRef, ref \} from 'vue';export default \{ setup() \{ const inputEl = useTemplateRef('inputRef'); const showInput = ref(true); return \{ inputEl, showInput \}; \},\};vueCopy\<template\> \<input v-if="showInput" ref="inputRef" type="text" /\> \<button @click="showInput = false"\>Hide Input\</button\>\</template\>当 showInput 变为 false 时，inputEl.value 自动变为 null，无需额外处理。

**(3) 代码简洁性**

- **useRef**：
    - 需要显式声明 ref(null) 并在模板中绑定 ref 属性，代码稍显冗长。
    - 在复杂组件中，管理多个 DOM 引用可能导致代码分散，增加维护成本。
- **useTemplateRef**：
    - 直接通过字符串引用模板中的 ref 属性，省去手动声明和绑定步骤。
    - 代码更简洁，尤其在需要管理多个模板引用时，减少样板代码。

**(4) 适用场景**

- **useRef**：
    - **状态管理**：计数器、表单数据、API 响应等。
    - **通用逻辑**：需要响应式跟踪的任意值。
    - **手动 DOM 操作**：在 Vue 3.4 及以下版本中，用于获取 DOM 元素或组件实例。**示例（状态管理）**：javascriptCopyimport \{ ref \} from 'vue';export default \{ setup() \{ const username = ref(''); function updateUsername(event) \{ username.value = event.target.value; \} return \{ username, updateUsername \}; \},\};vueCopy\<template\> \<input :value="username" @input="updateUsername" /\>\</template\>
- **useTemplateRef**：
    - **DOM 操作**：聚焦输入框、获取元素尺寸、操作 Canvas 等。
    - **组件实例调用**：调用子组件的公开方法或访问其属性。
    - **动态模板**：处理模板中动态渲染的元素引用。**示例（调用组件方法）**：javascriptCopyimport \{ useTemplateRef \} from 'vue';export default \{ setup() \{ const childComponent = useTemplateRef('childRef'); function callChildMethod() \{ childComponent.value?.someMethod(); \} return \{ callChildMethod \}; \},\};vueCopy\<template\> \<ChildComponent ref="childRef" /\> \<button @click="callChildMethod"\>Call Child Method\</button\>\</template\>

**(5) 版本兼容性**

- **useRef**：自 Vue 3.0 起可用，是 Composition API 的核心功能，适用于所有 Vue 3 项目。
- **useTemplateRef**：自 Vue 3.5 起引入，仅在 Vue 3.5+ 项目中可用。如果你的项目使用旧版本（如 3.4 或更早），需要继续使用 useRef 手动绑定。

**4. 优缺点对比**
**useRef**
**优点**：

- **通用性**：可存储任意类型的值，适用于各种场景。
- **灵活性**：可以手动控制引用行为，适合复杂逻辑。
- **兼容性**：支持所有 Vue 3 版本。

**缺点**：

- **冗长**：获取模板引用需要手动声明和绑定，代码较多。
- **手动管理**：模板变化（例如元素移除）不会自动更新引用，需要额外逻辑。
- **易出错**：多个引用时，容易混淆或遗漏绑定。

**useTemplateRef**
**优点**：

- **简洁**：自动绑定模板引用，减少样板代码。
- **自动更新**：动态模板变化时，引用自动同步（例如元素移除或替换）。
- **直观**：直接使用模板中的 ref 名称，代码更易读。

**缺点**：

- **局限性**：仅用于模板引用，无法存储其他类型的数据。
- **版本限制**：需要 Vue 3.5+，旧项目无法使用。
- **依赖模板**：必须在模板中定义 ref 属性，无法独立使用。

**5. 实际示例：结合你的场景**
假设你的项目中有一个表格组件（基于你之前的代码上下文），需要操作表格头部的 DOM 元素（例如调整样式或获取尺寸）。以下是使用 useRef 和 useTemplateRef 的对比实现。
**使用 useRef**
javascript
Copy
import \{ ref, computed \} from 'vue';
export default \{ props: \{ tableHeight: Number, \}, setup(props) \{ const headerRef = ref(null); _// 手动声明 ref_ const listHeight = ref(500);
const headerStyle = computed(() =\> (\{ position: 'absolute', top: '0', left: '0', right: '0', display: 'flex', paddingRight: listHeight.value \> props.tableHeight ? '15px' : '0', overflowX: 'hidden', willChange: 'transform', \}));
function logHeaderWidth() \{ console.log(headerRef.value?.offsetWidth); _// 访问 DOM 属性_ \}
return \{ headerRef, headerStyle, logHeaderWidth \}; \},\};
vue
Copy
\<template\> \<div ref="headerRef" :style="headerStyle"\> _\<!-- 表格头部内容 --\>_ \</div\> \<button @click="logHeaderWidth"\>Log Header Width\</button\>\</template\>
**使用 useTemplateRef**
javascript
Copy
import \{ useTemplateRef, computed, ref \} from 'vue';
export default \{ props: \{ tableHeight: Number, \}, setup(props) \{ const headerRef = useTemplateRef('header'); _// 直接引用模板中的 ref_ const listHeight = ref(500);
const headerStyle = computed(() =\> (\{ position: 'absolute', top: '0', left: '0', right: '0', display: 'flex', paddingRight: listHeight.value \> props.tableHeight ? '15px' : '0', overflowX: 'hidden', willChange: 'transform', \}));
function logHeaderWidth() \{ console.log(headerRef.value?.offsetWidth); \}
return \{ headerStyle, logHeaderWidth \}; \},\};
vue
Copy
\<template\> \<div ref="header" :style="headerStyle"\> _\<!-- 表格头部内容 --\>_ \</div\> \<button @click="logHeaderWidth"\>Log Header Width\</button\>\</template\>
**对比分析**：

- **useRef**：需要显式声明 headerRef 并在模板中绑定 ref="headerRef"，多一步手动操作。
- **useTemplateRef**：直接使用 useTemplateRef('header')，无需声明变量，代码更简洁。
- **动态场景**：如果表格头部可能被条件渲染（例如 v-if），useTemplateRef 会自动更新 headerRef.value 为 null，而 useRef 需要手动处理。

**6. 最佳实践和选择建议**
**什么时候使用 useRef？**

- **状态管理**：需要管理响应式数据（例如计数器、表单输入、API 数据）。
- **通用逻辑**：处理非模板相关的值（例如定时器 ID、临时变量）。
- **旧版本兼容**：项目使用 Vue 3.4 或更早版本，无法使用 useTemplateRef。
- **复杂 DOM 操作**：需要手动控制引用行为或处理非标准模板引用。

**示例场景**：

- 管理用户输入的表单数据。
- 存储 API 调用的结果。
- 在 Vue 3.4 及以下版本中获取 DOM 元素。

**什么时候使用 useTemplateRef？**

- **模板引用**：需要直接操作模板中的 DOM 元素或组件实例。
- **动态模板**：处理动态渲染的元素（例如通过 v-if 或 v-for 生成）。
- **代码简洁**：希望减少样板代码，提升开发效率。
- **Vue 3.5+ 项目**：项目已经升级到 Vue 3.5，支持新 API。

**示例场景**：

- 聚焦输入框、调整元素样式、获取元素尺寸。
- 调用子组件的公开方法。
- 管理动态生成的表格行或组件引用。

**选择建议**

- 如果你的项目使用 **Vue 3.5+** 并且需要操作模板引用，优先选择 useTemplateRef，因为它更简洁且自动处理模板变化。
- 如果你需要管理 **非模板相关的响应式状态** 或项目使用 **Vue 3.4 及以下**，使用 useRef。
- 在混合场景中，可以结合两者：用 useRef 管理状态，用 useTemplateRef 获取模板引用。

**结合示例**：
javascript
Copy
import \{ ref, useTemplateRef, computed \} from 'vue';
export default \{ props: \{ tableHeight: Number, \}, setup(props) \{ _// useRef 管理状态_ const listHeight = ref(500); const isHeaderVisible = ref(true);
_// useTemplateRef 获取模板引用_ const headerRef = useTemplateRef('header');
const headerStyle = computed(() =\> (\{ position: 'absolute', top: '0', left: '0', right: '0', display: 'flex', paddingRight: listHeight.value \> props.tableHeight ? '15px' : '0', overflowX: 'hidden', willChange: 'transform', \}));
function toggleHeader() \{ isHeaderVisible.value = !isHeaderVisible.value; console.log('Header element:', headerRef.value); _// 自动更新为 null 或元素_ \}
return \{ headerStyle, toggleHeader, isHeaderVisible \}; \},\};
vue
Copy
\<template\> \<div v-if="isHeaderVisible" ref="header" :style="headerStyle"\> _\<!-- 表格头部内容 --\>_ \</div\> \<button @click="toggleHeader"\>Toggle Header\</button\>\</template\>

**7. 总结**

- **useRef**：
    - **功能**：创建通用的响应式引用，适合状态管理和手动 DOM 引用。
    - **优点**：灵活、通用、兼容所有 Vue 3 版本。
    - **缺点**：模板引用需要手动绑定，代码稍冗长。
    - **场景**：状态管理、旧版本项目、复杂逻辑。
- **useTemplateRef**：
    - **功能**：直接获取模板中的 DOM 元素或组件实例，专为模板引用设计。
    - **优点**：简洁、自动更新、适合动态模板。
    - **缺点**：仅限 Vue 3.5+，只能用于模板引用。
    - **场景**：DOM 操作、组件实例调用、现代 Vue 项目。
- **选择建议**：
    - 在 Vue 3.5+ 项目中，优先使用 useTemplateRef 处理模板引用。
    - 使用 useRef 管理状态或在旧版本中获取引用。
    - 根据项目需求结合使用两者，保持代码简洁和高效。

如果你有更具体的场景（例如表格组件中的复杂 DOM 操作或动态引用管理），可以提供更多细节，我可以进一步优化建议！

:::
