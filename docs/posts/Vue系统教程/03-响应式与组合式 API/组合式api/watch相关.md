---
title: "watch相关"
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
description: "当然，让我们从基础开始介绍一下 Vue 3 中的 watchEffect 和 watch API。 watchEffect watchEffect 是一个用于追踪响应式依赖的函数，当这些依赖改变时，它会重新执行。它类似于 Vue 2 中的 watch，但是它自动追踪所有被引用的响。"
sidebarWeight: 118
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/组合式api/watch相关.md"
---
::: v-pre

# watch相关

> 本节目标：理解“watch相关”的核心思路，并能把它用于实际开发或面试表达。
当然，让我们从基础开始介绍一下 Vue 3 中的 watchEffect 和 watch API。
**watchEffect**
watchEffect 是一个用于追踪响应式依赖的函数，当这些依赖改变时，它会重新执行。它类似于 Vue 2 中的 watch，但是它自动追踪所有被引用的响应式依赖，你无需明确声明它们。

**基础用法**
下面是一个基本的示例：
import \{ ref, watchEffect \} from 'vue'
const count = ref(0);
watchEffect(() =\> console.log(count.value))
// -\> 输出 0
count.value++
// -\> 输出 1
在这个示例中，watchEffect 函数接收一个函数作为参数（我们叫它"副作用函数"）。在副作用函数中，我们记录 count.value。因为 count 是一个响应式的引用，当 count.value 值改变时，watchEffect 就会重新执行副作用函数。

**停止 watchEffect**
watchEffect 返回一个停止函数，当你不再需要监听时，可以调用这个函数来停止监听：
const stop = watchEffect(() =\> console.log(count.value))
// 当你不再需要监听时
stop()

停止监听的场景
在某些情况下，你可能需要停止监听数据的改变。这通常发生在以下情况：

- 你在组件卸载（例如用户离开了一个页面或关闭了一个模态）时，想要停止监听数据，防止在组件不再存在时尝试更新它的状态，这可能会导致错误或内存泄露。
- 你的监听回调有一些昂贵的操作（例如，API 请求或复杂的计算），你只在特定条件下需要这些操作。一旦条件不再满足，你就可以停止监听。
- 你的监听回调执行某个一次性操作（例如，获取用户的初始位置）。获取到数据之后，你就可以停止监听。

**watch**
// 侦听单个来源
function watch\<T\>(
source: WatchSource\<T\>,
callback: WatchCallback\<T\>,
options?: WatchOptions
): StopHandle

// 侦听多个来源
function watch\<T\>(
sources: WatchSource\<T\>[],
callback: WatchCallback\<T[]\>,
options?: WatchOptions
): StopHandle

type WatchCallback\<T\> = (
value: T,
oldValue: T,
onCleanup: (cleanupFn: () =\> void) =\> void
) =\> void

type WatchSource\<T\> =
| Ref\<T\> // ref
| (() =\> T) // getter
| T extends object
? T
: never // 响应式对象
interface WatchOptions extends WatchEffectOptions \{
immediate?: boolean // 默认：false
deep?: boolean // 默认：false
flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
onTrack?: (event: DebuggerEvent) =\> void
onTrigger?: (event: DebuggerEvent) =\> void
\}

watch 是 watchEffect 的一个更自定义的版本。它允许你：

- 明确地声明需要监听的响应式依赖
- 访问先前的值和当前的值
- 控制监听器何时运行

**基础用法**
下面是一个基本的示例：
import \{ ref, watch \} from 'vue'
const count = ref(0)
watch(count, (newValue, oldValue) =\> \{
console.log(`count changed from ${oldValue} to ${newValue}`)
\})
在这个示例中，watch 函数接收两个参数：被监听的源和一个回调函数。当 count.value 改变时，回调函数会被调用，并接收新值和旧值作为参数。

选项：immediate 和 deep
watch 函数的第三个参数是一个选项对象。这个对象有两个主要的选项：

- immediate：如果设为 true，则回调函数会在 watch 启动时立即执行（而不是等到监听的源改变时才执行）。
- deep：如果设为 true，则 watch 将深度跟踪监听的源（当源是一个对象或数组时）。也就是说，如果源是一个对象或数组，当其内部的任何属性改变时，都会触发回调函数。

watch(count, (newValue, oldValue) =\> \{
console.log(`count changed from ${oldValue} to ${newValue}`)
\}, \{
immediate: true,
deep: true
\})

**停止 watch**
就像 watchEffect，watch 也返回一个停止函数。当你不再需要监听时，可以调用这个函数来停止监听：
const stop = watch(count, (newValue, oldValue) =\> \{
console.log(`count changed from ${oldValue} to ${newValue}`)
\})
// 当你不再需要监听时
stop()

**监听多个源**
你也可以监听多个源。在这种情况下，你需要将源放在一个数组中，并在回调函数中接收两个数组参数，分别对应新值和旧值：
import \{ ref, watch \} from 'vue'
const count = ref(0)
const anotherCount = ref(0)
watch([count, anotherCount], ([newCount, newAnotherCount], [oldCount, oldAnotherCount]) =\> \{
console.log(`count changed from ${oldCount} to ${newCount}`)
console.log(`anotherCount changed from ${oldAnotherCount} to ${newAnotherCount}`)
\})

**异步和清理**
如果你在回调函数中执行异步操作，你可能需要在源改变和回调函数重新执行之前取消前一个异步操作。这可以通过在回调函数中接收一个 onCleanup 函数并调用它来实现：
import \{ ref, watch \} from 'vue'
const id = ref(0)
const data = ref(null)
watch(id, async (newId, oldId, onCleanup) =\> \{
const \{ response, cancel \} = doAsyncWork(newId)
// 当 `id` 改变时，`cancel` 将被调用，取消前一个未完成的请求
onCleanup(cancel)
data.value = await response
\})
在这个示例中，每次 id 改变，我们都开始一个新的异步工作（可能是一个 API 调用）。如果 id 在异步工作完成之前又改变了，我们会取消前一个异步工作，这样就不会有未完成的请求了。在异步工作完成后，我们将结果赋给 data.value。

这些都是关于 watch 和 watchEffect 的基础知识，这两个 API 都是 Vue 3 中用于监听响应式数据的强大工具。通过这两个 API，你可以轻松地跟踪和响应数据的变化。

**watchEffect**
立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

function watchEffect(
effect: (onCleanup: OnCleanup) =\> void,
options?: WatchEffectOptions
): StopHandle
type OnCleanup = (cleanupFn: () =\> void) =\> void
interface WatchEffectOptions \{
flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
onTrack?: (event: DebuggerEvent) =\> void
onTrigger?: (event: DebuggerEvent) =\> void
\}
type StopHandle = () =\> void

详细信息
第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

默认情况下，侦听器将在组件渲染之前执行。设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。详见回调的触发时机。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 flush: 'sync' 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

返回值是一个用来停止该副作用的函数。

示例
const count = ref(0)

watchEffect(() =\> console.log(count.value))
// -\> 输出 0

count.value++
// -\> 输出 1

副作用清除：
watchEffect(async (onCleanup) =\> \{
const \{ response, cancel \} = doAsyncWork(id.value)
// `cancel` 会在 `id` 更改时调用
// 以便取消之前
// 未完成的请求
onCleanup(cancel)
data.value = await response
\})

停止侦听器：
const stop = watchEffect(() =\> \{\})
// 当不再需要此侦听器时:
stop()

选项：
watchEffect(() =\> \{\}, \{
flush: 'post',
onTrack(e) \{
debugger
\},
onTrigger(e) \{
debugger
\}
\})

参考：
watchPostEffect()​
watchEffect() 使用 flush: 'post' 选项时的别名。

watchSyncEffect()​
watchEffect() 使用 flush: 'sync' 选项时的别名。

watch()​
侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

类型
ts

为了便于阅读，对类型进行了简化。

详细信息
watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的源。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

第三个可选的参数是一个对象，支持以下这些选项：

- immediate：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
- deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考深层侦听器。
- flush：调整回调函数的刷新时机。参考回调的刷新时机及 watchEffect()。
- onTrack / onTrigger：调试侦听器的依赖。参考调试侦听器。

与 watchEffect() 相比，watch() 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

示例
侦听一个 getter 函数：
const state = reactive(\{ count: 0 \})

watch(
() =\> state.count,
(count, prevCount) =\> \{
/* ... */
\}
)

侦听一个 ref：
const count = ref(0)
watch(count, (count, prevCount) =\> \{
/* ... */
\})

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值：
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) =\> \{
/* ... */
\})

当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。如果你想让回调在深层级变更时也能触发，你需要使用 \{ deep: true \} 强制侦听器进入深层级模式。在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。
const state = reactive(\{ count: 0 \})
watch(
() =\> state,
(newValue, oldValue) =\> \{
// newValue === oldValue
\},
\{ deep: true \}
)

当直接侦听一个响应式对象时，侦听器会自动启用深层模式：
const state = reactive(\{ count: 0 \})
watch(state, () =\> \{
/* 深层级变更状态所触发的回调 */
\})
watch() 和 watchEffect() 享有相同的刷新时机和调试选项：

watch(source, callback, \{
flush: 'post',
onTrack(e) \{
debugger
\},
onTrigger(e) \{
debugger
\}
\})

停止侦听器：
const stop = watch(source, callback)
// 当已不再需要该侦听器时：
stop()

副作用清理：
watch(id, async (newId, oldId, onCleanup) =\> \{
const \{ response, cancel \} = doAsyncWork(newId)
// 当 `id` 变化时，`cancel` 将被调用，
// 取消之前的未完成的请求
onCleanup(cancel)
data.value = await response
\})

参考：
指南 - 侦听器
指南 - 侦听器调试

:::
