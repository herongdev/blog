---
title: "useStorage"
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
description: "useStorage 类别 : State 导出大小 : 1.78 kB 最后更改 : 5天前 相关 : useColorMode, useDark, useLocalStorage, useSessionStorage, useStorageAsync 创建一个可以用来访问和修。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-use/useStorage.md"
---
::: v-pre

# useStorage

> 本节目标：理解“useStorage”的核心思路，并能把它用于实际开发或面试表达。
**useStorage**
**类别**: State
**导出大小**: 1.78 kB
**最后更改**: 5天前
**相关**: useColorMode, useDark, useLocalStorage, useSessionStorage, useStorageAsync
创建一个可以用来访问和修改 LocalStorage 或 SessionStorage 的响应式引用（reactive ref）。

默认使用 localStorage，可以通过第三个参数指定其他存储源。
**示例**
**源代码**
BananaYellowMedium
name: 'Banana'color: 'Yellow'size: 'Medium'count: 0
**使用方法**
**提示**
在使用 Nuxt 3 时，此函数不会被自动导入，因为会优先使用 Nitro 内置的 useStorage()。如果您想使用 VueUse 提供的这个函数，请显式导入。
import \{ useStorage \} from '@vueuse/core'
_// 绑定对象_const state = useStorage('my-store', \{ hello: 'hi', greeting: 'Hello' \})
_// 绑定布尔值_const flag = useStorage('my-flag', true) _// 返回 Ref\<boolean\>_
_// 绑定数字_const count = useStorage('my-count', 0) _// 返回 Ref\<number\>_
_// 使用 SessionStorage 绑定字符串_const id = useStorage('my-id', 'some-string-id', sessionStorage) _// 返回 Ref\<string\>_
_// 从存储中删除数据_state.value = null

**合并默认值**
默认情况下，useStorage 会优先使用存储中的值，而忽略提供的默认值。请注意，当您在默认值中添加更多属性时，如果客户端的存储中没有该键，则该键可能是 undefined。
localStorage.setItem('my-store', '\{"hello": "hello"\}')
const state = useStorage('my-store', \{ hello: 'hi', greeting: 'hello' \}, localStorage)
console.log(state.value.greeting) _// undefined，因为存储中没有该值_

要解决这个问题，可以启用 mergeDefaults 选项。
**TypeScript 示例**
localStorage.setItem('my-store', '\{"hello": "nihao"\}')
const state = useStorage( 'my-store', \{ hello: 'hi', greeting: 'hello' \}, localStorage, \{ mergeDefaults: true \} _// \<--_)
console.log(state.value.hello) _// 'nihao'，来自存储_console.log(state.value.greeting) _// 'hello'，来自合并的默认值_

当将其设置为 true 时，它会对对象执行浅合并（shallow merge）。您还可以传递一个函数来自定义合并逻辑（例如深度合并）：
**TypeScript 示例**
const state = useStorage( 'my-store', \{ hello: 'hi', greeting: 'hello' \}, localStorage, \{ mergeDefaults: (storageValue, defaults) =\> deepMerge(defaults, storageValue) \} _// \<--_)

**自定义序列化**
默认情况下，useStorage 会根据提供的默认值的数据类型智能选择对应的序列化器。例如，对象使用 JSON.stringify / JSON.parse，数字使用 Number.toString / parseFloat 等。
您也可以为 useStorage 提供自定义序列化函数：
**TypeScript 示例**
import \{ useStorage \} from '@vueuse/core'
useStorage( 'key', \{\}, undefined, \{ serializer: \{ read: (v: any) =\> v ? JSON.parse(v) : null, write: (v: any) =\> JSON.stringify(v), \}, \},)

请注意，如果您将默认值设置为 null，useStorage 无法从中推断数据类型。在这种情况下，您可以提供自定义序列化器，或者显式重用内置的序列化器：
import \{ StorageSerializers, useStorage \} from '@vueuse/core'
const objectLike = useStorage('key', null, undefined, \{ serializer: StorageSerializers.object \})objectLike.value = \{ foo: 'bar' \}

**类型声明**
（此处原文未提供具体的类型声明内容，通常会包含 useStorage 的 TypeScript 类型定义，例如参数和返回值的类型。以下是一个可能的示例：）
function useStorage\<T\>( key: string, defaultValue: T, storage?: Storage, options?: \{ mergeDefaults?: boolean | ((storageValue: T, defaults: T) =\> T); serializer?: \{ read: (v: string) =\> T; write: (v: T) =\> string; \}; \}): Ref\<T\>

**翻译说明**

1. **技术术语保留原文**：如 LocalStorage、SessionStorage、Ref 等，保持英文以符合开发者的习惯。
2. **代码示例翻译**：代码部分保留原文，仅翻译注释和说明文字。
3. **逻辑清晰**：按照原文结构逐段翻译，确保内容连贯。
4. **缺失部分补充**：原文中提到的“Type Declarations”未提供具体内容，我根据上下文推测补充了一个可能的类型声明示例。

如果您需要进一步调整或补充，请告诉我！

useStorage 是由 VueUse 提供的一个工具函数（composition function），它的主要作用是**在 Vue 应用中创建一个与浏览器存储（如 localStorage 或 sessionStorage）绑定的响应式引用（reactive ref）**。通过这个函数，你可以方便地将数据存储到浏览器的本地存储中，并在数据发生变化时自动同步，同时保持 Vue 的响应式特性。
以下是它的作用和使用方法的详细说明：

**作用**

1. **数据持久化******useStorage 允许你将 Vue 的响应式数据与浏览器的 localStorage 或 sessionStorage 绑定，实现数据的持久化存储。即便用户刷新页面或关闭浏览器（对于 localStorage），数据也不会丢失。
2. **响应式同步******当你修改 useStorage 返回的 ref 值时，它会自动更新存储中的数据；反过来，如果存储中的数据被外部修改（例如通过开发者工具或另一个标签页），ref 的值也会同步更新（在某些条件下需要监听存储事件）。
3. **类型支持******支持多种数据类型（如对象、布尔值、数字、字符串等），并通过内置或自定义序列化器自动处理数据的读写。
4. **灵活性******你可以选择使用 localStorage（默认）或 sessionStorage，还可以自定义序列化逻辑或默认值合并策略。

**应该怎么用**
useStorage 的使用场景非常广泛，尤其适合需要持久化存储状态的场景，例如用户设置、表单数据、计数器等。以下是具体的使用方法和步骤：
**基本用法**

1. **安装 VueUse******确保你的项目中已安装 @vueuse/core：bashCollapseWrapCopynpm install @vueuse/core
2. **导入并使用******在你的 Vue 组件中导入 useStorage，然后创建一个绑定到存储的响应式变量：javascriptCollapseWrapCopyimport \{ useStorage \} from '@vueuse/core'export default \{ setup() \{ _// 创建一个绑定到 localStorage 的响应式对象_ const state = useStorage('my-store', \{ name: 'John', age: 25 \}) _// 创建一个绑定到 sessionStorage 的响应式字符串_ const id = useStorage('my-id', 'user-123', sessionStorage) return \{ state, id \} \}\}
3. **在模板中使用******因为 state 和 id 是响应式的，你可以直接在模板中使用它们：htmlCollapseWrapCopy\<template\> \<div\> \<p\>Name: \{\{ state.name \}\}\</p\> \<p\>ID: \{\{ id \}\}\</p\> \<button @click="state.name = 'Jane'"\>Change Name\</button\> \</div\>\</template\>当你点击按钮修改 state.name 时，localStorage 中的值会自动更新为 \{"name": "Jane", "age": 25\}。

**高级用法**

1. **绑定不同类型的数据******useStorage 支持多种数据类型，默认会根据类型选择合适的序列化方式： javascriptCollapseWrapCopyconst flag = useStorage('my-flag', true) _// 布尔值_const count = useStorage('my-count', 0) _// 数字_const text = useStorage('my-text', 'hello') _// 字符串_
2. **删除存储数据******将值设置为 null 会删除对应的存储项： javascriptCollapseWrapCopystate.value = null _// 删除 'my-store' 键对应的数据_
3. **合并默认值******如果存储中的数据不完整，可以使用 mergeDefaults 选项补全默认值： javascriptCollapseWrapCopylocalStorage.setItem('my-store', '\{"name": "Alice"\}')const state = useStorage( 'my-store', \{ name: 'Bob', age: 30 \}, localStorage, \{ mergeDefaults: true \})console.log(state.value) _// \{ name: 'Alice', age: 30 \}_
4. **自定义序列化******如果默认的序列化方式不满足需求，可以自定义： javascriptCollapseWrapCopyconst customState = useStorage( 'custom-key', \{ data: 'test' \}, localStorage, \{ serializer: \{ read: (v) =\> v ? JSON.parse(v) : null, write: (v) =\> JSON.stringify(v), \}, \})
5. **Nuxt 3 注意事项******如果使用 Nuxt 3，默认会优先使用 Nitro 的 useStorage，需要显式导入 VueUse 的版本： javascriptCollapseWrapCopyimport \{ useStorage \} from '@vueuse/core'

**使用场景**

1. **保存用户偏好设置******例如主题模式（暗黑/明亮）、语言选择等： javascriptCollapseWrapCopyconst theme = useStorage('theme', 'light')
2. **表单数据暂存******用户填写表单时，实时保存到 localStorage，防止刷新丢失： javascriptCollapseWrapCopyconst form = useStorage('form-data', \{ username: '', email: '' \})
3. **计数器或状态管理******记录页面访问次数或某些操作的状态： javascriptCollapseWrapCopyconst visitCount = useStorage('visit-count', 0)visitCount.value++

**注意事项**

1. **存储限制******localStorage 和 sessionStorage 都有大小限制（通常为 5-10MB），不适合存储大数据。
2. **跨标签页同步******useStorage 的响应式更新仅在当前页面有效。如果需要在多个标签页间同步，可以结合 storage 事件监听。
3. **序列化问题******如果存储的值不是有效的 JSON 格式（例如手动修改了存储），可能导致解析错误。使用自定义序列化器可以缓解这个问题。

**总结**
useStorage 是一个简单而强大的工具，帮助你在 Vue 项目中实现数据持久化和响应式管理。使用时，只需明确存储的键名、默认值和存储类型（localStorage 或 sessionStorage），即可快速上手。根据需求，还可以通过选项自定义其行为。

:::
