import{_ as s,o as a,c as i,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"1.Render Phase","description":"围绕“1.Render Phase”整理的概念、示例与实践笔记。","frontmatter":{"title":"1.Render Phase","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"围绕“1.Render Phase”整理的概念、示例与实践笔记。","sidebarWeight":8,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/min-vue/六、实现渲染函数/1.Render Phase.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/六、实现渲染函数/1.Render Phase.md","filePath":"posts/Vue系统教程/05-原理与手写实现/六、实现渲染函数/1.Render Phase.md"}'),p={name:"posts/Vue系统教程/05-原理与手写实现/六、实现渲染函数/1.Render Phase.md"};function t(o,e,r,c,d,u){return a(),i("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"_1-render-phase",tabindex:"-1"},[l("1.Render Phase "),n("a",{class:"header-anchor",href:"#_1-render-phase","aria-label":'Permalink to "1.Render Phase"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“1.Render Phase”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"渲染模块使用渲染函数根据初始化数据生成虚拟Dom")]),l(`
`),n("span",{class:"line"},[n("span",null,"render(content) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'  return h("div", null, [')]),l(`
`),n("span",{class:"line"},[n("span",null,'    h("div", null, String(content.state.message)),')]),l(`
`),n("span",{class:"line"},[n("span",null,"    h(")]),l(`
`),n("span",{class:"line"},[n("span",null,'      "button",')]),l(`
`),n("span",{class:"line"},[n("span",null,"      {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        onClick: content.click,")]),l(`
`),n("span",{class:"line"},[n("span",null,"      },")]),l(`
`),n("span",{class:"line"},[n("span",null,'      "click"')]),l(`
`),n("span",{class:"line"},[n("span",null,"    ),")]),l(`
`),n("span",{class:"line"},[n("span",null,"  ]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**2. Mount Phase**")]),l(`
`),n("span",{class:"line"},[n("span",null,"利用虚拟Dom创建视图页面Html")]),l(`
`),n("span",{class:"line"},[n("span",null,"function mountElement(vnode, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 渲染成真实的 dom 节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const el = (vnode.el = createElement(vnode.type));")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 props")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (vnode.props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (const key in vnode.props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      const val = vnode.props[key];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patchProp(vnode.el, key, null, val);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 要处理 children")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (Array.isArray(vnode.children)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    vnode.children.forEach((v) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      mountElement(v, el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    insert(createText(vnode.children), el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 插入到视图内")]),l(`
`),n("span",{class:"line"},[n("span",null,"  insert(el, container);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**3. Patch Phase(Dom diff)**")]),l(`
`),n("span",{class:"line"},[n("span",null,"数据模型一旦变化渲染函数将再次被调用生成新的虚拟Dom，然后做Dom Diff更新视图Html")]),l(`
`),n("span",{class:"line"},[n("span",null,"function patchProp(el, key, prevValue, nextValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // onClick")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 1. 如果前面2个值是 on 的话")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 2. 就认为它是一个事件")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 3. on 后面的就是对应的事件名")]),l(`
`),n("span",{class:"line"},[n("span",null,'  if (key.startsWith("on")) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"    const eventName = key.slice(2).toLocaleLowerCase();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    el.addEventListener(eventName, nextValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (nextValue === null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      el.removeAttribute(key, nextValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      el.setAttribute(key, nextValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"通过DomDiff - 高效更新视图")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function diff(v1, v2) {  // 1. 如果 tag 都不一样的话，直接替换  // 2. 如果 tag 一样的话  //    1. 要检测 props 哪些有变化  //    2. 要检测 children  -》 特别复杂的  const { props: oldProps, children: oldChildren = [] } = v1;  const { props: newProps, children: newChildren = [] } = v2;  if (v1.tag !== v2.tag) {    v1.replaceWith(createElement(v2.tag));  } else {    const el = (v2.el = v1.el);    // 对比 props    // 1. 新的节点不等于老节点的值 -> 直接赋值    // 2. 把老节点里面新节点不存在的 key 都删除掉    if (newProps) {      Object.keys(newProps).forEach((key) => {        if (newProps[key] !== oldProps[key]) {          patchProp(el, key, oldProps[key], newProps[key]);        }      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 遍历老节点 -》 新节点里面没有的话，那么都删除掉      Object.keys(oldProps).forEach((key) => {        if (!newProps[key]) {          patchProp(el, key, oldProps[key], null);        }      });    }"),n("span",null,"    // 对比 children")]),l(`
`),n("span",{class:"line"},[n("span",null,"// \bnewChildren -> string"),n("span",null,"    // oldChildren -> string   oldChildren -> array")]),l(`
`),n("span",{class:"line"},[n("span",null,"// newChildren -> array"),n("span",null,'    // oldChildren -> string   oldChildren -> array    if (typeof newChildren === "string") {      if (typeof oldChildren === "string") {        if (newChildren !== oldChildren) {          setText(el, newChildren);        }      } else if (Array.isArray(oldChildren)) {'),n("span",null,'        // 把之前的元素都替换掉        v1.el.textContent = newChildren;      }    } else if (Array.isArray(newChildren)) {      if (typeof oldChildren === "string") {'),n("span",null,'        // 清空之前的数据        n1.el.innerHTML = "";'),n("span",null,"        // 把所有的 children mount 出来        newChildren.forEach((vnode) => {          mountElement(vnode, el);        });      } else if (Array.isArray(oldChildren)) {"),n("span",null,"        // a, b, c, d, e -> new"),n("span",null,"        // a1,b1,c1,d1 -> old"),n("span",null,"        // 如果 new 的多的话，那么创建一个新的")]),l(`
`),n("span",{class:"line"},[n("span",null,"// a, b, c -> new"),n("span",null,"        // a1,b1,c1,d1 -> old"),n("span",null,"        // 如果 old 的多的话，那么把多的都删除掉        const length = Math.min(newChildren.length, oldChildren.length);        for (let i = 0; i < length; i++) {          const oldVnode = oldChildren[i];          const newVnode = newChildren[i];"),n("span",null,"          // 可以十分复杂          diff(oldVnode, newVnode);        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (oldChildren.length > length) {          // 说明老的节点多          // 都删除掉          for (let i = length; i < oldChildren.length; i++) {            remove(oldChildren[i], el);          }        } else if (newChildren.length > length) {          // 说明 new 的节点多          // 那么需要创建对应的节点          for (let i = length; i < newChildren.length; i++) {            mountElement(newChildren[i], el);          }        }      }    }  }}")]),l(`
`),n("span",{class:"line"},[n("span",null,"作者：全栈然叔")]),l(`
`),n("span",{class:"line"},[n("span",null,"链接：https://juejin.cn/post/6911897255087702030")]),l(`
`),n("span",{class:"line"},[n("span",null,"来源：掘金")]),l(`
`),n("span",{class:"line"},[n("span",null,"著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。")])])])])],-1)])])}const g=s(p,[["render",t]]);export{v as __pageData,g as default};
