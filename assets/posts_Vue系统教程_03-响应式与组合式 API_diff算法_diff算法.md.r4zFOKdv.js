import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"diff算法","description":"围绕“diff算法”整理的概念、示例与实践笔记。","frontmatter":{"title":"diff算法","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“diff算法”整理的概念、示例与实践笔记。","sidebarWeight":29,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/diff算法/diff算法.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/diff算法.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/diff算法/diff算法.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/diff算法/diff算法.md"};function c(t,s,u,d,f,o){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"diff算法",tabindex:"-1"},[l("diff算法 "),n("a",{class:"header-anchor",href:"#diff算法","aria-label":'Permalink to "diff算法"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“diff算法”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime-core/src/renderer.ts")]),l(`
`),n("span",{class:"line"},[n("span",null,"const patchChildren = (n1, n2, el) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const c1 = n1.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const c2 = n2.children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const prevShapeFlag = n1.shapeFlag; // 之前的")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const shapeFlag = n2.shapeFlag; // 之后的")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // children的可能类型：文本、空的null和数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 现在是文本，之前可能是文本、空的null和数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 之前是数组：删除老儿子，设置文本内容")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      unmountChildren(c1)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (c1 !== c2) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 包括了文本和空：更新文本即可")]),l(`
`),n("span",{class:"line"},[n("span",null,"      hostSetElementText(el, c2)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 现在为数组或者为空都写在else里，然后再通过if-else细分")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 分的时候以之前是不是数组为条件")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 之前是数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 现在是数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // diff算法")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ==patchKeyedChildren====(====c1====,== ==c2====,== ==el====);== ==//== ==全量比对==")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 现在是空：删除所有儿子")]),l(`
`),n("span",{class:"line"},[n("span",null,"        unmountChildren(c1); // 空 数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 之前是文本或空，现在可能是数组或空")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 之前不是空，那就之前是文本，")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 之前是文本和现在是空或数组：清空文本，进行挂载")]),l(`
`),n("span",{class:"line"},[n("span",null,"        hostSetElementText(el, '')   // 数组  文本")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 之前是空，现在是数组：清空文本，进行挂载")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        mountChildren(c2, el)")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      // 之前是空，现在是空：不处理")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(i,[["render",c]]);export{h as __pageData,g as default};
