---
title: "@vue-composition-api"
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
description: "vuejs/composition api: Composition API plugin for Vue 2 (github.com) @vue/composition api 用于提供 组合式 API 的 Vue 2 插件. English 中文 ・ 组合式 API 文档 安。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-cli/创建一个项目/@vue-composition-api.md"
---
::: v-pre

# @vue-composition-api

> 本节目标：理解“@vue-composition-api”的核心思路，并能把它用于实际开发或面试表达。
[vuejs/composition-api: Composition API plugin for Vue 2 (github.com)](https://github.com/vuejs/composition-api)
**@vue/composition-api**
==用于提供 组合式 API 的 Vue 2 插件.==

==English== ==| 中文 ・== ==组合式 API 文档==
==安装==
==NPM==
npm install @vue/composition-api#oryarn add @vue/composition-api
==在使用== ==@vue/composition-api== ==前，必须先通过== ==Vue.use()== ==进行安装。之后才可使用新的== ==组合式 API== ==进行组件开发。==
importVuefrom'vue'importVueCompositionAPIfrom'@vue/composition-api'Vue.use(VueCompositionAPI)
// 使用 APIimport\{ref,reactive\}from'@vue/composition-api'
==💡 当迁移到 Vue 3 时，只需简单的将== ==@vue/composition-api== ==替换成== ==vue== ==即可。你现有的代码几乎无需进行额外的改动。==
==CDN==
==在 Vue 之后引入== ==@vue/composition-api== ==，插件将会自动完成安装。==
\<scriptsrc="https://cdn.jsdelivr.net/npm/vue@2.6"\>\</script\>\<scriptsrc="https://cdn.jsdelivr.net/npm/@vue/composition-api@1.4.3"\>\</script\>
==@vue/composition-api== ==将会暴露在全局变量== ==window.VueCompositionAPI== ==中。==
const\{ref,reactive \}=VueCompositionAPI
==TypeScript 支持==
==本插件要求使用 TypeScript 4.2 或以上版本==
==为了让 TypeScript 在 Vue 组件选项中正确地进行类型推导，我们必须使用== ==defineComponent== ==来定义组件:==
import\{defineComponent\}from'@vue/composition-api'exportdefaultdefineComponent(\{// 类型推断启用\})
==JSX/TSX==
==JSX 现已在== ==vuejs/jsx== ==中官方支持。你可以根据====这篇文档====开启支持。你也可以使用由== ==@luwanquan== ==维护的社区版本== ==babel-preset-vca-jsx====。==
==对于 TSX 支持，请在你的项目中创建如下声明文件：==
// file: shim-tsx.d.tsimportVue,\{VNode\}from'vue';import\{ComponentRenderProxy\}from'@vue/composition-api';declareglobal \{namespaceJSX\{interfaceElementextendsVNode\{\}interfaceElementClassextendsComponentRenderProxy\{\}interfaceElementAttributesProperty\{$props: any;// specify the property name to use\}interfaceIntrinsicElements\{[elem: string]: any;\}\}\}
==SSR==
==尽管 Vue 3 暂时没有给出确定的 SSR 的 API，这个插件实现了== ==onServerPrefetch== ==生命周期钩子函数。这个钩子允许你使用传统 API 中的== ==serverPrefetch== ==函数。==
import\{onServerPrefetch\}from'@vue/composition-api'exportdefault\{setup(props,\{ssrContext \})\{constresult=ref()onServerPrefetch(async()=\>\{result.value=awaitcallApi(ssrContext.someId)\})return\{result,\}\},\}
==浏览器兼容性==
==@vue/composition-api== ==支持所有现代浏览器以及IE11+。对于更低版本的IE浏览器你需要安装====WeakMap== ==polyfill (例如使用== ==core-js====库)。==
==限制==
==✅ 支持     ❌ 不支持==
==Ref== ==自动展开 (unwrap)==
❌ 不要 在数组中使用含有 ref 的普通对象✅ 在数组中，应该 总是将 ref 存放到 reactive 对象中⚠️ set 和 del 添加与刪除响应式属性变通方案
==模板 Refs==
✅ 字符串 ref && 从 setup() 返回 ref✅ 字符串 ref && 从 setup() 返回 ref && 渲染函数 / JSX❌ 函数 ref❌ 在 setup() 中的渲染函数 / JSX⚠️ $refs 访问的变通方案
==Reactive==
⚠️ reactive() 会返回一个修改过的原始的对象
==Watch==
❌ 不支持 onTrack 和 onTrigger 选项
==createApp==
⚠️ createApp() 是全局的
==shallowReadonly==
⚠️ shallowReadonly() 会返回一个新的浅拷贝对象，在此之后新加的字段将不会获得只读或响应式状态。
==readonly==
⚠️ readonly() 只提供类型层面的只读。
==props==
⚠️ 当使用 toRefs 访问深层属性对象 （如 toRefs(props.foo) 时将会得到不正确的警告。
     ⚠️ isReactive(props.foo) 将会返回 false。
==computed().effect==
⚠️ computed() 拥有一个被设置为 true 的 effect 属性，用来代替 ReactiveEffect。
==缺失的 API==
==以下在 Vue 3 新引入的 API ，在本插件中暂不适用：==

- ==onRenderTracked==
- ==onRenderTriggered==
- ==isProxy==

==在== ==data()== ==中使用组合式 API==
❌ 在 data() 中使用 ref, reactive 或其他组合式 API 将不会生效
==emit== ==选项==
❌ emit 仅因在类型定义中对齐 Vue3 的选项而提供，不会有任何效果。
==性能影响==
==由于 Vue 2 的公共 API 的限制，====@vue/composition-api== ==不可避免地引入了额外的性能开销。除非在极端情况下，否则这并不会对你造成影响。==
你可以查看这个 [跑分结果](https://antfu.github.io/vue-composition-api-benchmark-results/) 了解更多信息。
 \> 来自 \<[https://github.com/vuejs/composition-api/blob/main/README.zh-CN.md](https://github.com/vuejs/composition-api/blob/main/README.zh-CN.md)\>

:::
