import{_ as a,o as e,c as i,j as l,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"请求缓存composable","description":"⚠️ 监听 loginid 变化 1. 若缓存已有数据，直接复用，避免重复请求 2. 若无数据，则发请求拉取，并在返回时写入缓存 先占位，防止并发场景下同一 loginid 多次请求 当接口返回后同步更新缓存 始终取当前 loginid 对应记录，保证响应式 ⚠️ 组合首尾固定选。","frontmatter":{"title":"请求缓存composable","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"⚠️ 监听 loginid 变化 1. 若缓存已有数据，直接复用，避免重复请求 2. 若无数据，则发请求拉取，并在返回时写入缓存 先占位，防止并发场景下同一 loginid 多次请求 当接口返回后同步更新缓存 始终取当前 loginid 对应记录，保证响应式 ⚠️ 组合首尾固定选。","sidebarWeight":158,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/响应式问题/请求缓存composable.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/请求缓存composable.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/请求缓存composable.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/请求缓存composable.md"};function t(c,n,o,u,d,r){return e(),i("div",null,[...n[0]||(n[0]=[l("div",null,[l("h1",{id:"请求缓存composable",tabindex:"-1"},[s("请求缓存composable "),l("a",{class:"header-anchor",href:"#请求缓存composable","aria-label":'Permalink to "请求缓存composable"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“请求缓存composable”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { shallowRef, computed, watchEffect, watch, unref, type MaybeRef } from 'vue'")]),s(`
`),l("span",{class:"line"},[l("span",null,"import { useFetchListData } from '@/composables'")]),s(`
`),l("span",{class:"line"},[l("span",null,"export const firstOption = { label: 'Favorites', value: 'favorites' }")]),s(`
`),l("span",{class:"line"},[l("span",null,"export const lastOption = { label: 'All', value: '' }")]),s(`
`),l("span",{class:"line"},[l("span",null,"const cache = shallowRef<")]),s(`
`),l("span",{class:"line"},[l("span",null,"  Record<string, { loading: boolean; list: { label: string; value: string }[] }>")]),s(`
`),l("span",{class:"line"},[l("span",null,">({})")]),s(`
`),l("span",{class:"line"},[l("span",null,"export function useSymbolType(loginid: MaybeRef<string>) {")]),s(`
`),l("span",{class:"line"},[l("span",null,"  const idRef = computed(() => unref(loginid))")]),s(`
`),l("span",{class:"line"},[l("span",null,"  /*")]),s(`
`),l("span",{class:"line"},[l("span",null,"   *")])])])]),l("p",null,[s("⚠️ 监听 "),l("code",null,"loginid"),s(" 变化 "),l("code",null,"* 1."),s(" 若缓存已有数据，直接复用，避免重复请求 "),l("code",null,"* 2."),s(" 若无数据，则发请求拉取，并在返回时写入缓存")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"   */")]),s(`
`),l("span",{class:"line"},[l("span",null,"  watch(")]),s(`
`),l("span",{class:"line"},[l("span",null,"    idRef,")]),s(`
`),l("span",{class:"line"},[l("span",null,"    (id) => {")]),s(`
`),l("span",{class:"line"},[l("span",null,"      if (!cache.value[id]) {")]),s(`
`),l("span",{class:"line"},[l("span",null,"        //")])])])]),l("p",null,[s("先占位，防止并发场景下同一 "),l("code",null,"loginid"),s(" 多次请求")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"        cache.value[id] = { loading: true, list: [] }")]),s(`
`),l("span",{class:"line"},[l("span",null,"        const { data, loading } = useFetchListData<{ id: number; title: string }[]>({")]),s(`
`),l("span",{class:"line"},[l("span",null,"          url: '/api/trade/get_type_list',")]),s(`
`),l("span",{class:"line"},[l("span",null,"          params: { loginid: id },")]),s(`
`),l("span",{class:"line"},[l("span",null,"        })")]),s(`
`),l("span",{class:"line"},[l("span",null,"        //")])])])]),l("p",null,"当接口返回后同步更新缓存"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"        watchEffect(() => {")]),s(`
`),l("span",{class:"line"},[l("span",null,"          if (data.value) {")]),s(`
`),l("span",{class:"line"},[l("span",null,"            cache.value[id] = {")]),s(`
`),l("span",{class:"line"},[l("span",null,"              loading: loading.value,")]),s(`
`),l("span",{class:"line"},[l("span",null,"              list: data.value.map(({ title }) => ({ label: title, value: title })),")]),s(`
`),l("span",{class:"line"},[l("span",null,"            }")]),s(`
`),l("span",{class:"line"},[l("span",null,"          }")]),s(`
`),l("span",{class:"line"},[l("span",null,"        })")]),s(`
`),l("span",{class:"line"},[l("span",null,"      }")]),s(`
`),l("span",{class:"line"},[l("span",null,"    },")]),s(`
`),l("span",{class:"line"},[l("span",null,"    { immediate: true },")]),s(`
`),l("span",{class:"line"},[l("span",null,"  )")]),s(`
`),l("span",{class:"line"},[l("span",null,"  //")])])])]),l("p",null,[s("始终取当前 "),l("code",null,"loginid"),s(" 对应记录，保证响应式")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"  const record = computed(() => cache.value[idRef.value])")]),s(`
`),l("span",{class:"line"},[l("span",null,"  return {")]),s(`
`),l("span",{class:"line"},[l("span",null,"    loading: computed(() => record.value.loading),")]),s(`
`),l("span",{class:"line"},[l("span",null,"    //")])])])]),l("p",null,"⚠️ 组合首尾固定选项，形成完整下拉列表"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"    options: computed(() => [firstOption, ...record.value.list, lastOption]),")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")])])])])],-1)])])}const m=a(p,[["render",t]]);export{h as __pageData,m as default};
