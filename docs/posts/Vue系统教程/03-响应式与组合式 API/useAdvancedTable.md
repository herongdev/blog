---
title: "useAdvancedTable"
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
description: "好，那我们就不“照抄谁”，直接给你一版 更通用、更可控的实现 ，专门解决这几个点： 支持分页 + 加载更多； 支持模糊搜索 / 各种筛选 / 排序，只要你往 query 里塞就行； 支持“哪些参数变化要重置分页”——用可配置的 getIdentityKey； 统一处理请求竞争（旧。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/composable/useAdvancedTable.md"
---
::: v-pre

# useAdvancedTable

> 本节目标：理解“useAdvancedTable”的核心思路，并能把它用于实际开发或面试表达。
好，那我们就不“照抄谁”，直接给你一版**更通用、更可控的实现**，专门解决这几个点：

- 支持分页 + 加载更多；
- 支持模糊搜索 / 各种筛选 / 排序，只要你往 query 里塞就行；
- 支持“哪些参数变化要重置分页”——用可配置的 getIdentityKey；
- 统一处理请求竞争（旧请求返回不覆盖新请求）；
- 内部不依赖你的 useFetch，你只要提供一个 fetcher（axios 或其他都行）。

下面是一个完整的 useAdvancedTable（文件名你随便取），TS + Vue 3：
// useAdvancedTable.tsimport \{ reactive, ref, computed, watch, type Ref, type ComputedRef,\} from 'vue'
/** * 基础分页字段约束 * 约定：page + pageSize 作为前端分页字段，真正发给后端时你可以映射成 page/page_size */export interface BaseQueryState \{ page: number pageSize: number // 其他任意筛选 / 排序字段由你自己扩展 [key: string]: unknown\}
/** * 标准化后的分页返回结构 * 你可以在 mapResponse 里把后端返回结构适配成这个 */export interface NormalizedPageResult\<Item\> \{ items: Item[] total: number page: number pageSize: number\}
/** * useAdvancedTable 的配置项 */export interface UseAdvancedTableOptions\< Item, Q extends BaseQueryState, RawResponse = unknown,\> \{ /** * 复杂逻辑：真正发请求的函数，内部不关心具体用 axios / fetch / 其他库 */ fetcher: (query: Q) =\> Promise\<RawResponse\>
/** * 复杂逻辑：把后端返回数据适配成统一结构，方便内部处理分页 & 追加 */ mapResponse: (raw: RawResponse) =\> NormalizedPageResult\<Item\>
/** * 初始查询参数（包含 page/pageSize 和各种筛选） */ initialQuery: Q
/** * 是否组件挂载后自动请求一次 */ immediate?: boolean
/** * 复杂逻辑：决定“哪些字段变化会被认为是查询身份变化，从而重置分页” * 默认实现：除了 page/pageSize 之外的字段都参与身份计算 */ getIdentityKey?: (query: Q) =\> unknown\}
export type TableStatus = 'idle' | 'loading' | 'success' | 'error'
export interface UseAdvancedTableReturn\<Item, Q extends BaseQueryState\> \{ /** 当前查询参数（响应式，可直接双向绑定各种筛选控件） */ query: Q /** 表格数据源 */ items: Ref\<Item[]\> /** 总条数 */ total: Ref\<number\> /** 加载状态 */ status: Ref\<TableStatus\> /** 是否还有更多（用于“加载更多”按钮或无限滚动） */ hasMore: Ref\<boolean\> /** 最近一次请求错误 */ error: Ref\<Error | null\>
/** 当前页（query.page 的别名） */ currentPage: ComputedRef\<number\> /** 每页数量（query.pageSize 的别名） */ pageSize: ComputedRef\<number\>
/** 修改部分查询参数（自动触发对应的分页/重置逻辑） */ patchQuery: (partial: Partial\<Q\>) =\> void
/** 手动刷新：保留当前筛选条件，从第一页重新请求 */ refresh: () =\> void
/** 重置为初始参数，并从第一页重新请求 */ reset: () =\> void
/** 加载下一页（在 hasMore = true 且非 loading 时才生效） */ loadMore: () =\> void
/** 立即重新请求当前页（不改变 page），例如“当前页刷新” */ refetchCurrentPage: () =\> void
/** * 直接给 Ant Design Vue / Element Plus 表格用的分页配置（可选用） * current / pageSize / total / onChange */ paginationProps: ComputedRef\<\{ current: number pageSize: number total: number onChange: (page: number, pageSize: number) =\> void \}\>\}
/** * 通用表格数据获取 composable： * - 分页 + 加载更多 * - 筛选 / 排序 / 模糊搜索 * - 参数变化自动重置分页或追加 */export function useAdvancedTable\< Item, Q extends BaseQueryState, RawResponse = unknown,\>( options: UseAdvancedTableOptions\<Item, Q, RawResponse\>,): UseAdvancedTableReturn\<Item, Q\> \{ const \{ fetcher, mapResponse, initialQuery, immediate = true, getIdentityKey, \} = options
// 复杂逻辑：内部维护一份可变查询状态，业务侧直接改这个 query 即可 const query = reactive\<Q\>(\{ ...(initialQuery as Q), \})
const items = ref\<Item[]\>([]) const total = ref(0) const status = ref\<TableStatus\>('idle') const error = ref\<Error | null\>(null) const hasMore = ref(false)
// 复杂逻辑：用于强制刷新；即便所有字段相同，只要 refreshToken 变了，也会被认为是新的查询身份 const refreshToken = ref(0)
// 复杂逻辑：默认的身份 key 计算（排除分页字段） const computeDefaultIdentityKey = (q: Q): unknown =\> \{ const \{ page, pageSize, ...rest \} = q return rest \}
// 复杂逻辑：把 query 映射成“查询身份”，只要它变了就意味着结果集合变了 const identityKey = computed(() =\> \{ const extractor = getIdentityKey ?? computeDefaultIdentityKey const identity = extractor(query as Q) return JSON.stringify(\{ identity, rk: refreshToken.value, \}) \})
const currentPage = computed(\{ get: () =\> query.page, set: (val: number) =\> \{ query.page = val \}, \})
const pageSize = computed(\{ get: () =\> query.pageSize, set: (val: number) =\> \{ query.pageSize = val \}, \})
// 复杂逻辑：实际执行请求的函数，append 决定本次结果是替换还是追加 const execute = async (append: boolean) =\> \{ status.value = 'loading' error.value = null
try \{ // 复杂逻辑：复制一份 query，避免请求过程中外部继续修改引发不一致 const payload = \{ ...(query as Q) \}
const raw = await fetcher(payload)
const normalized = mapResponse(raw)
// 复杂逻辑：即使服务端返回的页码不同，也以 normalized 为准更新“事实” currentPage.value = normalized.page pageSize.value = normalized.pageSize total.value = normalized.total
if (append) \{ items.value = [...items.value, ...normalized.items] \} else \{ items.value = [...normalized.items] \}
const pageCount = normalized.pageSize \> 0 ? Math.ceil(normalized.total / normalized.pageSize) : 0 hasMore.value = pageCount \> 0 && normalized.page \< pageCount
status.value = 'success' \} catch (err) \{ status.value = 'error' error.value = err instanceof Error ? err : new Error(String(err)) \} \}
// 复杂逻辑：统一处理 // - 查询身份变化 =\> 如有必要，重置到第一页；再请求（替换数据） // - 同一查询身份下 page 变化 =\> 追加数据（加载更多） watch( () =\> [identityKey.value, currentPage.value] as const, async ( [newKey, newPage], [oldKey, oldPage] = [undefined, undefined], onInvalidate, ) =\> \{ // 首次进入且 immediate=false 时，不自动请求 if (!immediate && oldKey === undefined && oldPage === undefined) \{ return \}
// 复杂逻辑： // 查询身份变了，但当前页不是 1 =\> 先把页重置为 1，由下一次 watch 触发真正请求 if (newKey !== oldKey && newPage !== 1) \{ currentPage.value = 1 return \}
// 复杂逻辑： // 身份相同但页码发生变化 =\> 属于“加载更多”，本次请求 append=true const append = newKey === oldKey && newPage !== oldPage
let cancelled = false onInvalidate(() =\> \{ cancelled = true \})
// 非追加场景先清空，避免旧数据闪烁错误 if (!append) \{ items.value = [] total.value = 0 hasMore.value = false \}
await execute(append)
// 若本次 effect 已失效（期间查询条件被改过），丢弃结果 if (cancelled) return \}, \{ immediate, flush: 'post' \}, )
// 复杂逻辑：只在 hasMore 为真且未在加载时才执行加载更多 const loadMore = () =\> \{ if (!hasMore.value || status.value === 'loading') return currentPage.value += 1 \}
// 复杂逻辑：部分更新 query，只在有实际变化时才触发 watch const patchQuery = (partial: Partial\<Q\>) =\> \{ let changed = false for (const key in partial) \{ if (!Object.prototype.hasOwnProperty.call(partial, key)) continue const next = partial[key] if (next !== query[key]) \{ changed = true // @ts-expect-error 索引访问 query[key] = next as never \} \} if (!changed) return \}
// 复杂逻辑：刷新 = 保留所有筛选，只是从第一页重新请求 const refresh = () =\> \{ items.value = [] hasMore.value = false currentPage.value = 1 refreshToken.value += 1 \}
// 复杂逻辑：重置 = 回到 initialQuery，并从第一页重新请求 const reset = () =\> \{ Object.assign(query, \{ ...(initialQuery as Q), \}) items.value = [] hasMore.value = false refreshToken.value += 1 \}
// 复杂逻辑：在不改变分页/筛选的前提下，重新请求当前页 const refetchCurrentPage = () =\> \{ // 通过刷新 token，让 identityKey 变化，但不动 page refreshToken.value += 1 \}
// 直接给表格组件用的分页配置（例如 Ant Design Vue） const paginationProps = computed(() =\> (\{ current: currentPage.value, pageSize: pageSize.value, total: total.value, // 复杂逻辑：表格分页改变时，只改 query 的分页字段，其他逻辑交给 watch onChange: (page: number, pageSize: number) =\> \{ if (page !== currentPage.value) \{ currentPage.value = page \} if (pageSize !== pageSize.value) \{ pageSize.value = pageSize \} \}, \}))
return \{ query, items, total, status, hasMore, error, currentPage, pageSize, patchQuery, refresh, reset, loadMore, refetchCurrentPage, paginationProps, \}\}

**怎么用？给你一个对照你现有** **useClosePosition** **的例子**
你原来是这样的参数：

- page / page_size
- symbol
- orderBy: \{ field, order \}
- serverName / loginId
- dateRange（Dayjs 数组，映射成 start/end）

可以这样包一层业务 hook（示意）：
// useClosePosition.ts（示例）import dayjs, \{ type Dayjs \} from 'dayjs'import utc from 'dayjs/plugin/utc'import axios from 'axios'import \{ useAdvancedTable, type BaseQueryState, type NormalizedPageResult,\} from '@/composables/useAdvancedTable'import type \{ ClosedPosition \} from '../types'
dayjs.extend(utc)
type SortOrder = 'asc' | 'desc'
interface OrderBy \{ field?: string order?: SortOrder\}
interface ClosePositionQuery extends BaseQueryState \{ page: number pageSize: number symbol: string dateRange: (string | Dayjs)[] orderBy: OrderBy serverName?: string loginId?: string\}
interface ClosePositionApiResponse \{ current_page: number data: ClosedPosition[] per_page: number total: number\}
export function useClosePosition() \{ const \{ query, items, status, hasMore, error, loadMore, refresh, reset, patchQuery, paginationProps, \} = useAdvancedTable\<ClosedPosition, ClosePositionQuery, ClosePositionApiResponse\>(\{ initialQuery: \{ page: 1, pageSize: 20, symbol: '', dateRange: [], orderBy: \{ field: undefined, order: undefined \}, serverName: undefined, loginId: undefined, \}, // 复杂逻辑：fetcher 里把前端 query 映射成后端需要的参数 async fetcher(q) \{ const [start, end] = (q.dateRange || []).map((d) =\> dayjs.utc(d).unix()) const params: Record\<string, unknown\> = \{ page: q.page, page_size: q.pageSize, start, end, exchange_name: q.serverName, loginid: q.loginId, symbol: q.symbol || undefined, \} if (q.orderBy.field && q.orderBy.order) \{ params.order_by = \{ [q.orderBy.field]: q.orderBy.order \} \} const \{ data \} = await axios.get\<ClosePositionApiResponse\>('/api/trade/order_close', \{ params, \}) return data \}, // 复杂逻辑：把接口返回结构适配成统一的 NormalizedPageResult mapResponse(raw) \{ const result: NormalizedPageResult\<ClosedPosition\> = \{ items: raw.data ?? [], total: raw.total ?? 0, page: raw.current_page ?? 1, pageSize: raw.per_page ?? 20, \} return result \}, // 可选：仅当 symbol / dateRange / orderBy / 账户信息变化时重置分页 getIdentityKey(q) \{ const [start, end] = (q.dateRange || []).map((d) =\> dayjs.utc(d).unix()) return \{ symbol: q.symbol || '', orderField: q.orderBy.field || '', order: q.orderBy.order || '', serverName: q.serverName || '', loginId: q.loginId || '', start, end, \} \}, \})
return \{ query, dataSource: items, loading: computed(() =\> status.value === 'loading'), hasMore, error, loadMore, refresh, reset, patchQuery, pagination: paginationProps, \}\}

**这版比之前那版****“****更好****”****的点在哪？**

- **职责更清晰**
    - useAdvancedTable 只管“状态机 + 分页行为”；
    - 业务 hook（如 useClosePosition）只管“字段映射 + 请求”。
- **分页重置行为可控**
    - 默认：除了 page/pageSize 外所有字段变化都会让它自动回第一页。
    - 想更细？自己实现 getIdentityKey，只把“真正影响结果集合”的字段塞进去。
- **不会出现请求乱序覆盖**
    - 通过 watch 的 onInvalidate，旧请求返回也不会把新请求结果覆盖掉。
- **统一出口**
    - loadMore 只加 page，
    - 表格分页只改 page / pageSize，
    - 真正请求 + 追加/重置逻辑只有一处。
- **和** **UI** **解耦**
    - 返回一个 paginationProps，你可以直接塞进 Ant Design Vue / Element Plus 的分页属性里，也可以完全不用。

后面如果你在接入的时候遇到具体问题（比如要把 page/pageSize 改成后端的 page/page_size 或者要加“关键字防抖搜索”），你把那块调用代码贴出来，我只改那一小段，在复杂逻辑上一行加注释就行。

你这个质疑是对的 👍：
append = newKey === oldKey && newPage !== oldPage
只能代表“同一查询身份下页码变了”，但**到底是****“****翻页覆盖****”****还是****“****加载更多追加****”**，确实只有业务（或者调用方）知道。
我们要做的是：

- **不再自动****“****聪明猜测****” append**；
- 把“这次分页是 replace 还是 append”明确交给调用方（loadMore / 分页 onChange / 业务手动改）。

下面我只给你需要修改的几处代码。

**1️⃣** **增加一个****“****下一次分页模式****”****的标记**
在你定义完 hasMore 后面，加一个 ref：
const hasMore = ref(false)
// 复杂逻辑：下一次分页请求的模式，默认“替换”，只有 loadMore 或业务显式标记为“追加” const nextPageMode = ref\<'replace' | 'append'\>('replace')

**2️⃣** **删掉原来的组合** **watch****，换成「身份变化」****+****「页码变化」两个** **watch**
👉 把原来的这一整段：
watch( () =\> [identityKey.value, currentPage.value] as const, async ([newKey, newPage], [oldKey, oldPage] = [undefined, undefined], onInvalidate) =\> \{ // ... \}, \{ immediate, flush: 'post' \}, )
**全部删掉**，换成下面两段。
**2.1** **先** **watch “****查询身份****”****变化（筛选****/****排序****/****搜索** **等）**
watch( identityKey, async (newKey, oldKey, onInvalidate) =\> \{ // 复杂逻辑：immediate=false 且是第一次执行时，不自动请求 if (!immediate && oldKey === undefined) \{ return \}
// 复杂逻辑：筛选条件变化，视为“新的查询”，使用替换模式 nextPageMode.value = 'replace'
// 复杂逻辑：如果当前不是第一页，先跳到第一页，由 page watcher 负责真正发请求 if (currentPage.value !== 1) \{ currentPage.value = 1 return \}
let cancelled = false onInvalidate(() =\> \{ cancelled = true \})
// 复杂逻辑：条件变化时清空旧数据，重新拉第一页 items.value = [] total.value = 0 hasMore.value = false
await execute(false) if (cancelled) return \}, \{ immediate, flush: 'post' \}, )
**2.2** **再** **watch “****页码****”****变化（谁改页码，谁决定模式）**
watch( currentPage, async (newPage, oldPage, onInvalidate) =\> \{ // 复杂逻辑：第一次执行（oldPage 为 undefined）不处理，首请求由 identityKey 的 watch 控制 if (oldPage === undefined) return
let cancelled = false onInvalidate(() =\> \{ cancelled = true \})
// 复杂逻辑：由 nextPageMode 决定本次是“追加”还是“替换” const append = nextPageMode.value === 'append' // 用过一次就恢复成“替换模式”，避免被意外复用 nextPageMode.value = 'replace'
// 复杂逻辑：非追加场景先清空，再拉新数据 if (!append) \{ items.value = [] total.value = 0 hasMore.value = false \}
await execute(append) if (cancelled) return \}, \{ flush: 'post' \}, )
这样就变成：

- “条件变动”（identityKey 变）：统一视为替换，自动回第一页。
- “页码变动”：根据 nextPageMode 判定是 append 还是 replace。

**3️⃣** **loadMore** **显式标记****“****下一页是** **append”**
把原来的 loadMore 替换成：
// 复杂逻辑：只有 loadMore 才把下一次分页标记为“追加模式” const loadMore = () =\> \{ if (!hasMore.value || status.value === 'loading') return nextPageMode.value = 'append' currentPage.value += 1 \}
之后，“加载更多”就是唯一会触发 append 的入口（当然你也可以在业务里手动改 nextPageMode）。

**4️⃣** **分页组件** **onChange** **明确表态：我是****“****普通分页****”****，要** **replace**
在 paginationProps 那里，把 onChange 换成这样：
const paginationProps = computed(() =\> (\{ current: currentPage.value, pageSize: pageSize.value, total: total.value, // 表格分页改变时，视为“普通分页”，使用替换模式 onChange: (_page: number, _pageSize: number) =\> \{ // 复杂逻辑：分页点击默认走“替换”，不拼接 nextPageMode.value = 'replace' if (_page !== currentPage.value) \{ currentPage.value = _page \} if (_pageSize !== pageSize.value) \{ pageSize.value = _pageSize \} \}, \}))

**5️⃣** **refresh / reset** **时也归位成****“****替换模式****”**
稍微补一笔，让语义更清晰：
// 刷新 = 保留筛选，回到第一页，用“替换模式”重新请求 const refresh = () =\> \{ items.value = [] hasMore.value = false nextPageMode.value = 'replace' currentPage.value = 1 refreshToken.value += 1 \}
// 重置 = 恢复初始参数，用“替换模式”重新请求第一页 const reset = () =\> \{ Object.assign(query, \{ ...(initialQuery as Q), \}) items.value = [] hasMore.value = false nextPageMode.value = 'replace' refreshToken.value += 1 \}

**最终行为总结一下**

- **普通分页场景（表格分页控件）**
    - 每次点击页码：nextPageMode = 'replace' → currentPage++
    - page watcher：append = false → 覆盖数据，只保留当前页那 10/20 条。
- **加载更多场景**
    - 调用 loadMore()：nextPageMode = 'append' → currentPage++
    - page watcher：append = true → items = [...items, ...normalized.items]。
- **筛选** **/** **排序** **/** **搜索** **/** **其他** **query** **变化**
    - identityKey 变 → 自动回第一页，用“替换模式”请求。

如果以后某个业务真的有“我手动改 page，但想 append”的特殊需求，也可以在外面：
nextPageMode.value = 'append'currentPage.value = currentPage.value + 1
显式控制。这样就完全符合你说的：**append** **由业务决定，而不是库自己瞎猜**。

:::
