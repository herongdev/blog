import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse(`{"title":"最流畅的更新","description":"数量 交易类型，假设可能的值为 'lots' 或 是否挂单 挂单数量 是否设置止盈 止盈数量 止盈类型，假设可能的值为 'price' 或 是否设置止损 止损数量 止损类型，假设可能的值为 'price' 或 买价格 卖价 交易状态 止盈 止损 买价格 卖价 只取最新一条 清空队。","frontmatter":{"title":"最流畅的更新","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"数量 交易类型，假设可能的值为 'lots' 或 是否挂单 挂单数量 是否设置止盈 止盈数量 止盈类型，假设可能的值为 'price' 或 是否设置止损 止损数量 止损类型，假设可能的值为 'price' 或 买价格 卖价 交易状态 止盈 止损 买价格 卖价 只取最新一条 清空队。","sidebarWeight":101,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/requestAnimationFrame/最流畅的更新.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/requestAnimationFrame/最流畅的更新.md","filePath":"posts/JavaScript系统教程/05-异步编程/requestAnimationFrame/最流畅的更新.md"}`),i={name:"posts/JavaScript系统教程/05-异步编程/requestAnimationFrame/最流畅的更新.md"};function t(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"最流畅的更新",tabindex:"-1"},[n("最流畅的更新 "),s("a",{class:"header-anchor",href:"#最流畅的更新","aria-label":'Permalink to "最流畅的更新"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“最流畅的更新”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import { ref, computed } from 'vue'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import { defineStore } from 'pinia'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import WebSocketService from '@/services/websocketService'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import { getToken } from '@/utils/auth'")]),n(`
`),s("span",{class:"line"},[s("span",null,"export interface SymbolSvg {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  svg: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  svgb: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"export interface ForexSymbol {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  id: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  symbol: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  contact_size: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  digits: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  description: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  type: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"  add: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  symbol_svg: SymbolSvg")]),n(`
`),s("span",{class:"line"},[s("span",null,"  is_favorite: boolean")]),n(`
`),s("span",{class:"line"},[s("span",null,"  sort: string")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"export interface TradeForm {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  number: string //")])])])]),s("p",null,"数量"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  type: 'lots' | 'shares' //")])])])]),s("p",null,[n("交易类型，假设可能的值为 "),s("code",null,"'lots'"),n(" 或")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," 'shares'")]),n(`
`),s("span",{class:"line"},[s("span",null,"  pending: boolean //")])])])]),s("p",null,"是否挂单"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  pending_number: string //")])])])]),s("p",null,"挂单数量"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  take: boolean //")])])])]),s("p",null,"是否设置止盈"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  take_number: string //")])])])]),s("p",null,"止盈数量"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  take_type: 'price' | 'percent' //")])])])]),s("p",null,[n("止盈类型，假设可能的值为 "),s("code",null,"'price'"),n(" 或")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," 'percent'")]),n(`
`),s("span",{class:"line"},[s("span",null,"  stop: boolean //")])])])]),s("p",null,"是否设置止损"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  stop_number: string //")])])])]),s("p",null,"止损数量"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  stop_type: 'price' | 'percent' //")])])])]),s("p",null,[n("止损类型，假设可能的值为 "),s("code",null,"'price'"),n(" 或")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," 'percent'")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ask: number //")])])])]),s("p",null,"买价格"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  bid: number //")])])])]),s("p",null,"卖价"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"  status: 'buy' | 'sell' //")])])])]),s("p",null,"交易状态"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"export interface PricePayload {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ask: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  bid: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ts: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  dayOpen: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  dayHigh: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  dayLow: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"  preClose: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"const useTradeViewStore = defineStore(")]),n(`
`),s("span",{class:"line"},[s("span",null,"  'tradeView',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const tabs = ref<ForexSymbol[]>([])")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const currentTab = ref<ForexSymbol | null>(null)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const wsSubList = ref<string[]>([])")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const cData = ref<unknown>(null)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const tradeForm = ref<TradeForm>({")]),n(`
`),s("span",{class:"line"},[s("span",null,"      number: '',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      type: 'lots',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      pending: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      pending_number: '',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      take: false, //")])])])]),s("p",null,"止盈"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      take_number: '',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      take_type: 'price',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      stop: false, //")])])])]),s("p",null,"止损"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      stop_number: '',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      stop_type: 'price',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ask: 0, //")])])])]),s("p",null,"买价格"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      bid: 0, //")])])])]),s("p",null,"卖价"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      status: 'buy', // buy / sell")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const rowMap = computed(() => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const _map = new Map<string, ForexSymbol>()")]),n(`
`),s("span",{class:"line"},[s("span",null,"      for (const item of fullDataList.value) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        _map.set(item.symbol, item)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return _map")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const fullDataList = ref<ForexSymbol[]>([])")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const priceQueue = new Map<string, PricePayload[]>()")]),n(`
`),s("span",{class:"line"},[s("span",null,"    let rafId: number | null = null")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function scheduleFlush() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (rafId === null) rafId = requestAnimationFrame(flushQueue)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function flushQueue() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      priceQueue.forEach((queue, symbol) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        const last = queue[queue.length - 1] //")])])])]),s("p",null,"只取最新一条"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        queue.length = 0 //")])])])]),s("p",null,"清空队列"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        const row = rowMap.value.get(symbol)")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (!row) return")]),n(`
`),s("span",{class:"line"},[s("span",null,"        //")])])])]),s("p",null,[n("对比旧值 "),s("code",null,"──"),n(" 只改动真的发生变化的字段")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"        if (last.bid !== row.bid) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          row.bidTrend = last.bid > row.bid ? 'up' : 'down'")]),n(`
`),s("span",{class:"line"},[s("span",null,"          row.bid = last.bid")]),n(`
`),s("span",{class:"line"},[s("span",null,"          clearTrendLater(row, 'bidTrend')")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (last.ask !== row.ask) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          row.askTrend = last.ask > row.ask ? 'up' : 'down'")]),n(`
`),s("span",{class:"line"},[s("span",null,"          row.ask = last.ask")]),n(`
`),s("span",{class:"line"},[s("span",null,"          clearTrendLater(row, 'askTrend')")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        /* ===")])])])]),s("p",null,[n("如果还需写入 "),s("code",null,"dayOpen/dayHigh"),n(" 等，可同理赋值")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," === */")]),n(`
`),s("span",{class:"line"},[s("span",null,"      })")]),n(`
`),s("span",{class:"line"},[s("span",null,"      rafId = null")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* ======== 500 ms")])])])]),s("p",null,"后自动移除闪烁类"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," ======== */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function clearTrendLater(row: TableRow, key: 'bidTrend' | 'askTrend') {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      setTimeout(() => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        row[key] = null")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }, 500)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    async function initNavTabs(list: ForexSymbol[], favoritesTop4: ForexSymbol[]) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (!tabs.value.length) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (favoritesTop4.length) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          tabs.value = favoritesTop4")]),n(`
`),s("span",{class:"line"},[s("span",null,"        } else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          tabs.value = list.slice(0, 4)")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        currentTab.value =")]),n(`
`),s("span",{class:"line"},[s("span",null,"          tabs.value.find((t) => t.symbol === currentTab.value?.symbol) ?? tabs.value[0] ?? null")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function initWebSocket(host: string, srv: string, loginid: string) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const token = getToken()")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // const url = `${host}?auth=${token}&servername=${srv}&loginid=${loginid}`")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const url = `ws://122.51.27.47:8099/ws?auth=${token}&servername=${srv}&loginid=${loginid}`")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const svc = WebSocketService.getInstance()")]),n(`
`),s("span",{class:"line"},[s("span",null,"      svc.connect(url)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      svc.addEventListener('message', handleIncomingData)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function handleIncomingData(raw: unknown) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      let txt = ''")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (typeof raw === 'string') txt = raw.trim()")]),n(`
`),s("span",{class:"line"},[s("span",null,"      else if (raw instanceof ArrayBuffer) txt = new TextDecoder().decode(raw)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      else return //")])])])]),s("p",null,"非文本忽略"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      const parts = txt.split(/\\s+/)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (parts.length !== 8) return //")])])])]),s("p",null,"非行情消息忽略"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      const [symbol, askStr, bidStr, tsStr, open, high, low, pre] = parts")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const payload: PricePayload = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ask: +askStr,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        bid: +bidStr,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ts: +tsStr,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        dayOpen: +open,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        dayHigh: +high,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        dayLow: +low,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        preClose: +pre,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (!priceQueue.has(symbol)) priceQueue.set(symbol, [])")]),n(`
`),s("span",{class:"line"},[s("span",null,"      priceQueue.get(symbol)!.push(payload)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      scheduleFlush()")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[n("订阅或更新订阅："),s("code",null,"mode='append'"),n(" 追加，"),s("code",null,"'update'"),n(" 覆盖")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    function subscribe(symbols: string[], mode: 'append' | 'update' = 'update') {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const svc = WebSocketService.getInstance()")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const currentSubscribedSymbols = wsSubList.value //")])])])]),s("p",null,"当前已订阅的列表"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      const currentSubscribedSet = new Set(currentSubscribedSymbols) //")])])])]),s("p",null,[n("当前已订阅的 "),s("code",null,"Set"),n(" 形式，用于高效查找")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      const effectiveTargetSymbolsSet = new Set(symbols)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const currentActiveSymbol = currentTab.value?.symbol")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (currentActiveSymbol) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        effectiveTargetSymbolsSet.add(currentActiveSymbol)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      let symbolsToActuallySubscribe: string[] = []")]),n(`
`),s("span",{class:"line"},[s("span",null,"      let symbolsToActuallyUnsubscribe: string[] = []")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (mode === 'append') {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        symbolsToActuallySubscribe = Array.from(effectiveTargetSymbolsSet).filter(")]),n(`
`),s("span",{class:"line"},[s("span",null,"          (s) => !currentSubscribedSet.has(s),")]),n(`
`),s("span",{class:"line"},[s("span",null,"        )")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (symbolsToActuallySubscribe.length > 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          wsSubList.value.push(...symbolsToActuallySubscribe)")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      } else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        symbolsToActuallyUnsubscribe = currentSubscribedSymbols.filter(")]),n(`
`),s("span",{class:"line"},[s("span",null,"          (s) => !effectiveTargetSymbolsSet.has(s),")]),n(`
`),s("span",{class:"line"},[s("span",null,"        )")]),n(`
`),s("span",{class:"line"},[s("span",null,"        symbolsToActuallySubscribe = Array.from(effectiveTargetSymbolsSet).filter(")]),n(`
`),s("span",{class:"line"},[s("span",null,"          (s) => !currentSubscribedSet.has(s),")]),n(`
`),s("span",{class:"line"},[s("span",null,"        )")]),n(`
`),s("span",{class:"line"},[s("span",null,"        wsSubList.value = Array.from(effectiveTargetSymbolsSet)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (symbolsToActuallyUnsubscribe.length > 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        svc.send(`unsub:${symbolsToActuallyUnsubscribe.join(';')};`)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (symbolsToActuallySubscribe.length > 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        svc.send(`sub:${symbolsToActuallySubscribe.join(';')};`)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (symbolsToActuallyUnsubscribe.length === 0 && symbolsToActuallySubscribe.length === 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"取消所有订阅"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    function unsubscribeAll() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      WebSocketService.getInstance().send('unsuball')")]),n(`
`),s("span",{class:"line"},[s("span",null,"      wsSubList.value = []")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"更新当前激活的标签"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    function updateCurrentTab(tab: ForexSymbol) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      currentTab.value = tab")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    function delTab(tab: ForexSymbol) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      tabs.value = tabs.value.filter((t) => t.symbol !== tab.symbol)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"更新标签数组并持久化"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    function updateTradingTabs(tabsOrTab: ForexSymbol | ForexSymbol[]) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const arr = Array.isArray(tabsOrTab) ? tabsOrTab : [tabsOrTab]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      tabs.value = arr")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      tabs,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      currentTab,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      wsSubList,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      cData,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      tradeForm,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      fullDataList,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      initNavTabs,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      initWebSocket,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      handleIncomingData,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      subscribe,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      unsubscribeAll,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      updateCurrentTab,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      updateTradingTabs,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      delTab,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    persist: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      key: 'trade-view', // localStorage")])])])]),s("p",null,"键"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      pick: ['tabs', 'currentTab', 'tradeForm'], //")])])])]),s("p",null,"只持久化这两个字段"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      debug: import.meta.env.DEV, //")])])])]),s("p",null,"调试环境下输出错误"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,")")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default useTradeViewStore")])])])])],-1)])])}const g=a(i,[["render",t]]);export{h as __pageData,g as default};
