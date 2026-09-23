import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"常见情况处理","description":"围绕“常见情况处理”整理的概念、示例与实践笔记。","frontmatter":{"title":"常见情况处理","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“常见情况处理”整理的概念、示例与实践笔记。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/diff算法/常见情况处理.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/常见情况处理.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/常见情况处理.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/diff算法/常见情况处理.md"};function c(u,l,t,o,d,h){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"常见情况处理",tabindex:"-1"},[s("常见情况处理 "),n("a",{class:"header-anchor",href:"#常见情况处理","aria-label":'Permalink to "常见情况处理"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“常见情况处理”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 几种常见的特殊处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 不妨思考一下，新旧列表的常见变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 新增：头部插入，尾部插入，中间插入")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 删除：头部删除，尾部删除，中间删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 修改：头部修改，尾部修改，中间修改")]),s(`
`),n("span",{class:"line"},[n("span",null,"// sync from start")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 比如一个列表，前面几项没有变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (i <= e1 && i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 有任何一方停止循环则直接跳出")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const n1 = c1[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const n2 = c2[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isSameVnode(n1, n2)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 比较两个节点的属性和子节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patch(n1, n2, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  i++")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// sync from end")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 比如一个列表，后面几项没有变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (i <= e1 && i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const n1 = c1[e1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const n2 = c2[e2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isSameVnode(n1, n2)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patch(n1, n2, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  e1--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  e2--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (i > e1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    while (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const nextPos = e2 + 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 根据下一个人的索引来看参照物")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const anchor = nextPos < c2.length ? c2[nextPos].el : null")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(null, c2[i], el, anchor); // 创建新节点 扔到容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"      i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (i > e1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    while (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const nextPos = e2 + 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 根据下一个人的索引来看参照物")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const anchor = nextPos < c2.length ? c2[nextPos].el : null")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(null, c2[i], el, anchor); // 创建新节点 扔到容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"      i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"} ==else== ==if== ==(====i== ==>== ==e2====)== =={====//== ==旧的多==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==//== ==common== ==sequence== ==+== ==unmount==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==//== ==i====比====e2====大说明有要卸载的==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==//== ==i====到====e1====之间的就是要卸载的==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==if== ==(====i== ==<=== ==e1====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==while== ==(====i== ==<=== ==e1====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==unmount====(====c1====[====i====])==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==i====++;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==}==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const patchKeyedChildren = (c1, c2, el) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比较两个儿子的差异")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let i = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let e1 = c1.length - 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let e2 = c2.length - 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 几种常见的特殊处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 不妨思考一下，新旧列表的常见变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 新增：头部插入，尾部插入，中间插入")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 删除：头部删除，尾部删除，中间删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 修改：头部修改，尾部修改，中间修改")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // sync from start")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比如一个列表，前面几项没有变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"  while (i <= e1 && i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 有任何一方停止循环则直接跳出")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n1 = c1[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n2 = c2[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isSameVnode(n1, n2)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 比较两个节点的属性和子节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(n1, n2, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    i++")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // sync from end")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比如一个列表，后面几项没有变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"  while (i <= e1 && i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n1 = c1[e1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n2 = c2[e2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isSameVnode(n1, n2)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      patch(n1, n2, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    e1--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    e2--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 列表前面或后面几项相同的处理完了")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果后面有相同的元素，说明新旧列表长度一样?")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 没有新增或删除，但有可能是修改了?")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 现在到了!isSameVnode的情况了")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 有一方全部比较完毕了，要么就删除，要么就添加")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // common sequence + mount")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比如新旧列表，新增几项")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // i表示由前往后，子元素开始!isSameVnode的位置")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 后面的元素有可能是一样多，或旧的多，或新的多")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // i要比e1大说明有新增的：新的多")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // i和e2之间的是新增的部分")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (i > e1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      while (i <= e2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const nextPos = e2 + 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 根据下一个人的索引来看参照物")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const anchor = nextPos < c2.length ? c2[nextPos].el : null")]),s(`
`),n("span",{class:"line"},[n("span",null,"        patch(null, c2[i], el, anchor); // 创建新节点 扔到容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"        i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (i > e2) {// 旧的多")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // common sequence + unmount")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // i比e2大说明有要卸载的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // i到e1之间的就是要卸载的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (i <= e1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      while (i <= e1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        unmount(c1[i])")]),s(`
`),n("span",{class:"line"},[n("span",null,"        i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 优化完毕")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 乱序比对")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=a(i,[["render",c]]);export{m as __pageData,f as default};
