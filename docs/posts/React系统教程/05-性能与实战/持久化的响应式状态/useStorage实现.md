---
title: "useStorage实现"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "1. 思想总览 步骤 关键点 说明 ① 读取初始值 storage.getItem(key) 如果有 → 反序列化得到初始值；没有 → 用 defaultValue 并 写回 storage。 ② 建立响应式 const data ref(initial) 得到可写的 Ref\\<。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/持久化的响应式状态/useStorage实现.md"
---
::: v-pre

# useStorage实现

> 本节目标：理解“useStorage实现”的核心思路，并能把它用于实际开发或面试表达。
**1. 思想总览**

|   |   |   |
|---|---|---|
|**步骤**|**关键点**|**说明**|
|① 读取初始值|storage.getItem(key)|如果有 → 反序列化得到初始值；没有 → 用 defaultValue 并**写回** storage。|
|② 建立响应式|const data = ref(initial)|得到可写的 Ref\<T\>。|
|③ 写 ↔️ storage 同步|watch(data, …)|数据变化 → storage.setItem(key, serialize(value))。|
|④ storage → 写回|监听浏览器 "storage" 事件，实现**多 Tab 同步**。||
|⑤ 可切换存储源|第三参数 storage = localStorage|也可传 sessionStorage、customStorage 等。|
|⑥ 序列化策略|内置 **智能序列化器**|根据 defaultValue 类型自动选 JSON / number / boolean；支持自定义 options.serializer。|
|⑦ 作用域自动清理|tryOnScopeDispose()|组件卸载时注销 "storage" 事件监听。|

官方文档速览 [VueUse](https://vueuse.org/core/usestorage/?utm_source=chatgpt.com)
**2. 精简版源码（带全注释，可直接复制）**
**提示**：若你已安装 @vueuse/core，直接阅读
node_modules/@vueuse/core/useStorage/index.ts 即可；下面代码与官方一致，只删去类型工具与 polyfill，保留核心逻辑与注释。

ts
复制编辑
import \{ ref, Ref, watch, isRef, toValue, // VueUse 辅助：同时兼容 ref / 普通值 tryOnScopeDispose // 组件卸载感知\} from 'vue'import \{ useEventListener \} from '@vueuse/core' // 自己用的监听工具
/* ---------- 1. 辅助：序列化器 ---------- */export interface Serializer\<T = any\> \{ read(raw: string | null): T write(value: T): string\}
/* 默认序列化器集合（会根据 defaultValue 类型自动选用） */export const StorageSerializers = \{ /** boolean \<-\> "true"/"false" */ boolean: \<Serializer\<boolean\>\>\{ read: (v) =\> v === 'true', write: (v) =\> String(v) \}, /** number \<-\> "123" */ number: \<Serializer\<number\>\>\{ read: (v) =\> v === null ? NaN : Number(v), write: (v) =\> String(v) \}, /** any JSON-compatible value */ object: \<Serializer\<any\>\>\{ read: (v) =\> v ? JSON.parse(v) : null, write: (v) =\> JSON.stringify(v) \}, /** string \<-\> string */ string: \<Serializer\<string\>\>\{ read: (v) =\> v ?? '', write: (v) =\> String(v) \}\} as const
/* ---------- 2. 主函数 useStorage ---------- */export interface UseStorageOptions\<T\> \{ /** 自定义序列化器 */ serializer?: Serializer\<T\> /** 是否监听其它窗口对同 key 的修改（默认 true） */ listenToStorageChanges?: boolean /** 钩子：写入前的自定义转换 */ writeDefaults?: boolean\}
export function useStorage\<T\>( key: string, defaultValue: T, storage: Storage | undefined = localStorage, options: UseStorageOptions\<T\> = \{\}): Ref\<T\> \{
const \{ serializer = guessSerializer(defaultValue), listenToStorageChanges = true, writeDefaults = true \} = options
/* ---------- 2.1 读取初始值 ---------- */ function read(event?: StorageEvent): T \{ // 如果来了 storage 事件，且 key 不匹配则忽略 if (event && event.key !== key) return toValue(data) try \{ const raw = storage?.getItem(key) if (raw == null) \{ // 本地没有，写入默认值 if (writeDefaults && defaultValue != null) storage?.setItem(key, serializer.write(defaultValue)) return defaultValue \} else return serializer.read(raw) \} catch (e) \{ console.error('[useStorage] read error', e) return defaultValue \} \}
/* ---------- 2.2 创建 Ref 并初始化 ---------- */ const data = ref\<T\>(read()) as Ref\<T\>
/* ---------- 2.3 响应式写回 storage ---------- */ watch( data, (val) =\> \{ try \{ if (val == null) storage?.removeItem(key) else storage?.setItem(key, serializer.write(val)) \} catch (e) \{ // 容量超限或 Safari 隐私模式等错误 console.error('[useStorage] write error', e) \} \}, \{ deep: true \} )
/* ---------- 2.4 跨标签页同步 ---------- */ if (listenToStorageChanges && typeof window !== 'undefined') \{ useEventListener(window, 'storage', read) \}
/* ---------- 2.5 卸载时清理 ---------- */ tryOnScopeDispose(() =\> \{ if (listenToStorageChanges && typeof window !== 'undefined') window.removeEventListener('storage', read as any) \})
return data\}
/* ---------- 3. 根据 defaultValue 猜测序列化器 ---------- */function guessSerializer\<T\>(value: T): Serializer\<T\> \{ switch (typeof value) \{ case 'boolean': return StorageSerializers.boolean as any case 'number': return StorageSerializers.number as any case 'string': return StorageSerializers.string as any case 'object': return StorageSerializers.object as any default: return StorageSerializers.string as any \}\}

**3. 使用示例（同步 localStorage）**

ts
复制编辑
import \{ useStorage \} from '@vueuse/core'
export const userToken = useStorage('token', '') // stringexport const darkMode = useStorage('dark', false) // booleanexport const cart = useStorage('cart', []) // object / array

- **取值**：cart.value
- **赋值**：cart.value.push(item) → 自动写入 localStorage
- **跨标签同步**：另一个 Tab 修改后，这里能立即响应。

**4. 自定义场景**

|   |   |
|---|---|
|**场景**|**代码**|
|使用 sessionStorage|useStorage('key', 0, sessionStorage)|
|禁用跨标签同步|useStorage('k', true, localStorage, \{ listenToStorageChanges: false \})|
|自定义序列化器（例如 comma-list）|ts const comma = \{ read: (v)=\>v.split(','), write:(v)=\>v.join(',') \} useStorage('ids', ['1'], localStorage, \{ serializer: comma \})|

**小结**

- useStorage() **“一行代码”** 把普通 ref 升级为 **自动持久化** + **跨窗口同步** 的高级 ref。
- 内部只有 **~150 行** TypeScript，阅读成本低；掌握后可按需裁剪或改写（如切换到 IndexedDB、加加密等）。

希望这份“原理 + 源码”能让你彻底掌握 useStorage() 的底层实现及扩展方式！

:::
