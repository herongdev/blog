import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"乱序比对","description":"s2到e2之间的为新旧列表有差异的元素的元素； 我们建立一个map，然后遍历旧列表，取出每个元素，在map中看一下是否存在： 由于之前我们得到了5,3,4,0，可知3，4顺序没变化，可以整体，即最长递增子序列。","frontmatter":{"title":"乱序比对","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"s2到e2之间的为新旧列表有差异的元素的元素； 我们建立一个map，然后遍历旧列表，取出每个元素，在map中看一下是否存在： 由于之前我们得到了5,3,4,0，可知3，4顺序没变化，可以整体，即最长递增子序列。","sidebarWeight":30,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/diff算法/乱序比对.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/乱序比对.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/乱序比对.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/diff算法/乱序比对.md"};function c(t,s,u,d,o,h){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"乱序比对",tabindex:"-1"},[l("乱序比对 "),n("a",{class:"header-anchor",href:"#乱序比对","aria-label":'Permalink to "乱序比对"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“乱序比对”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 s2到e2之间的为新旧列表有差异的元素的元素； 我们建立一个map，然后遍历旧列表，取出每个元素，在map中看一下是否存在：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果存在，即可复用，要比较差异；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果新列表中不存在，即为删除的元素；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"此外还有的情况是新列表中有，旧列表中没有，即新增 ；")]),l(`
`),n("span",{class:"line"},[n("span",null,"let s1 = i;")]),l(`
`),n("span",{class:"line"},[n("span",null,"let s2 = i;")]),l(`
`),n("span",{class:"line"},[n("span",null,"const keyToNewIndexMap = new Map(); // key -> newIndex")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = s2; i <= e2; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  keyToNewIndexMap.set(c2[i].key, i)")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for (let i = s1; i <= e1; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 老的孩子")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const oldChild = c1[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 用老的孩子去新的里面找")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newIndex = keyToNewIndexMap.get(oldChild.key);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (newIndex === void (0)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 多余的删掉")]),l(`
`),n("span",{class:"line"},[n("span",null,"    unmount(oldChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    patch(oldChild, c2[newIndex], el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 新的总个数")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==toBePatched== ===== ==e2== ==-== ==s2== ==+== ==1====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 一个记录是否比对过的映射表")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==newIndexToOldIndexMap== ===== ==new== ==Array====(====toBePatched====).====fill====(====0====);==")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = s1; i <= e1; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 老的孩子")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const oldChild = c1[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 用老的孩子去新的里面找")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newIndex = keyToNewIndexMap.get(oldChild.key);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (newIndex === void (0)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 多余的删掉")]),l(`
`),n("span",{class:"line"},[n("span",null,"    unmount(oldChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 新的位置对应的老的位置, 如果数组里放的值>0说明 已经pactch过了")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 用来标记当前所patch过的结果")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ==newIndexToOldIndexMap====[====newIndex== ==-== ==s2====]== ===== ==i== ==+== ==1====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"    patch(oldChild, c2[newIndex], el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 到这只是新老属性和儿子的比对，没有移动位置")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 乱序比对")]),l(`
`),n("span",{class:"line"},[n("span",null,"let s1 = i;")]),l(`
`),n("span",{class:"line"},[n("span",null,"let s2 = i;")]),l(`
`),n("span",{class:"line"},[n("span",null,"const keyToNewIndexMap = new Map(); // key -> newIndex")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = s2; i <= e2; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  keyToNewIndexMap.set(c2[i].key, i)")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 新的总个数")]),l(`
`),n("span",{class:"line"},[n("span",null,"const toBePatched = e2 - s2 + 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 一个记录是否比对过的映射表")]),l(`
`),n("span",{class:"line"},[n("span",null,"const newIndexToOldIndexMap = new Array(toBePatched).fill(0);")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = s1; i <= e1; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 老的孩子")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const oldChild = c1[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 用老的孩子去新的里面找")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let newIndex = keyToNewIndexMap.get(oldChild.key);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (newIndex === void (0)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 多余的删掉")]),l(`
`),n("span",{class:"line"},[n("span",null,"    unmount(oldChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 用来标记当前所patch过的结果")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // i是在老列表中的索引，可能是0，加1跳过0")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果不加0，即新老列表首元素就不同，但0表示没有patch所以加1")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 如果是老列表中没有的新元素，其值为fill的0值；")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 新老列表索引映射，如果数组里放的值>0说明 已经pactch过了")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newIndexToOldIndexMap[newIndex - s2] = i + 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    patch(oldChild, c2[newIndex], el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 到这只是新老属性和儿子的比对，没有移动位置")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 需要移动位置")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 从最后一个元素往前倒序插入")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (let i = toBePatched - 1; i >= 0; i--) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 找到h，即最末元素，i表示的是差异列表的索引，我们倒序来")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // i+s2的话，表示加上了之前相同元素的部分，index则为新列表中真实索引")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let index = i + s2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let current = c2[index];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 找到参照物，即最末元素后的第一个元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let anchor = index + 1 < c2.length ? c2[index + 1].el : null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 如果已经patch过了，就不用创建元素了，可以复用")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 如果为0，表示新列表新增的元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (newIndexToOldIndexMap[i] === 0) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 没有patch过，创建元素，  5 3 4 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"    patch(null, current, el, anchor)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 不是0，说明是已经比对过属性和儿子的了")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 目前无论如何都做了一遍倒叙插入，其实可以不用的")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 可以根据刚才的数组来减少插入次数")]),l(`
`),n("span",{class:"line"},[n("span",null,"    hostInsert(current.el, el, anchor);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 这里发现缺失逻辑 我需要看一下current有没有el。如果没有el说明是新增的逻辑")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 最长递增子序列来实现，vue2在移动元素的时候会有浪费，需优化")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"需要优化的部分，列表项整体插入：")])])])]),n("p",null,"由于之前我们得到了5,3,4,0，可知3，4顺序没变化，可以整体，即最长递增子序列")],-1)])])}const x=a(i,[["render",c]]);export{g as __pageData,x as default};
