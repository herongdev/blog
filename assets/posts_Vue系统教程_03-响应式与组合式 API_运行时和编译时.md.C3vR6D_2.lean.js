import{_ as a,o as e,c as p,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"运行时和编译时","description":"纯运行时 就上面的实现来说，当我们使用render函数生成dom结构时，提供给函数是数据是一个原生的js对象，render函数直接通过这个js对象生成了dom结构； 运行时+编译时 但在实际开发中，写一个原生js对象来描述dom结构会很困难，而使用html或jsx这种xml式的标。","frontmatter":{"title":"运行时和编译时","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"纯运行时 就上面的实现来说，当我们使用render函数生成dom结构时，提供给函数是数据是一个原生的js对象，render函数直接通过这个js对象生成了dom结构； 运行时+编译时 但在实际开发中，写一个原生js对象来描述dom结构会很困难，而使用html或jsx这种xml式的标。","sidebarWeight":124,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/运行时和编译时.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/运行时和编译时.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/运行时和编译时.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/运行时和编译时.md"};function t(c,s,d,o,u,r){return e(),p("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"运行时和编译时",tabindex:"-1"},[n("运行时和编译时 "),l("a",{class:"header-anchor",href:"#运行时和编译时","aria-label":'Permalink to "运行时和编译时"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“运行时和编译时”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"三种选择：")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"纯运行时")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"运行时+编译时")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"纯编译时")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"假设有以下数据结构：")]),n(`
`),l("span",{class:"line"},[l("span",null,"const obj = {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  tag: 'div',")]),n(`
`),l("span",{class:"line"},[l("span",null,"  children: [")]),n(`
`),l("span",{class:"line"},[l("span",null,"    { tag: 'span', children: 'hello world' }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  ]")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"每个对象都有两个属性：")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"tag代表标签名称")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"children即可是一个数组（代表子节点），又可以是文本（代表文本子节点）")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"写一个Render 方法，它会根据上面的数据结构，渲染成相应的dom元素；")]),n(`
`),l("span",{class:"line"},[l("span",null,"function Render(obj, root) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  const el = document.createElement(obj.tag)")]),n(`
`),l("span",{class:"line"},[l("span",null,"  if (typeof obj.children === 'string') {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    const text = document.createTextNode(obj.children)")]),n(`
`),l("span",{class:"line"},[l("span",null,"    el.appendChild(text)")]),n(`
`),l("span",{class:"line"},[l("span",null,"  } else if (obj.children) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    // array，递归调用 Render，使用 el 作为 root 参数")]),n(`
`),l("span",{class:"line"},[l("span",null,"    obj.children.forEach((child) => Render(child, el))")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  // 将元素添加到 root")]),n(`
`),l("span",{class:"line"},[l("span",null,"  root.appendChild(el)")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"使用方法：")]),n(`
`),l("span",{class:"line"},[l("span",null,"const obj = {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  tag: 'div',")]),n(`
`),l("span",{class:"line"},[l("span",null,"  children: [")]),n(`
`),l("span",{class:"line"},[l("span",null,"    { tag: 'span', children: 'hello world' }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  ]")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"// 渲染到 body 下")]),n(`
`),l("span",{class:"line"},[l("span",null,"Render(obj, document.body)")])])])]),l("p",null,"纯运行时 就上面的实现来说，当我们使用render函数生成dom结构时，提供给函数是数据是一个原生的js对象，render函数直接通过这个js对象生成了dom结构；"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"如果一个框架直接使用js原生对象来生成dom结构，我们认为它是一个纯运行时框架")])])])]),l("p",null,"运行时+编译时 但在实际开发中，写一个原生js对象来描述dom结构会很困难，而使用html或jsx这种xml式的标签嵌套结构来描述dom结构会容易很多，所以我们希望在开发中是写jsx或html模板，而不是直接写原生js对象；"),l("p",null,[n("现在我们的源码是html模板或jsx了，由于我们render函数只如接受js原生对象，所以，我们需要将html模板或jsx转换为js原生对象；我们称这个过程为"),l("strong",null,"编译"),n("；")]),l("p",null,"这时候，我们提供了一个Compiler程序，它能将html字符串编译成树型的js原生对象；"),l("p",null,"我们用户在实际开发中使用呢，最简单的方法是让用户分别调用Compiler函数和Render函数，"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const html = `")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"    <span>hello world</span>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  `")]),n(`
`),l("span",{class:"line"},[l("span",null,"// 调用Compiler编译得到树形结构的数据对象")]),n(`
`),l("span",{class:"line"},[l("span",null,"const obj = Compiler(html);")]),n(`
`),l("span",{class:"line"},[l("span",null,"// 再调用 Render 进行渲染")]),n(`
`),l("span",{class:"line"},[l("span",null,"Render(obj, document.body)")]),n(`
`),l("span",{class:"line"},[l("span",null,"这时，我们的框架就是运行时+编译时；")]),n(`
`),l("span",{class:"line"},[l("span",null,"因为，它即支持运行时，用户可以直接提供数据对象从而无须编译；")]),n(`
`),l("span",{class:"line"},[l("span",null,"又支持编译时，用户可以提供html字符串，然后将其编译为数据对象后再交给运行时处理；")])])])]),l("p",null,"上面的代码其实是运行时编译，意思是代码运行的时候才开始编译，而这会产生一定的性能开销，因此我们也可以在构建的时候就执行Compiler程序 将用户提供的内容编译好，等到运行时就无须编译了，这对性能是非常友好的；"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"纯编译时")]),n(`
`),l("span",{class:"line"},[l("span",null,"既然编译器可以把html字符串编译成数据对象，那么能不能直接编译成命令式代码呢？")]),n(`
`),l("span",{class:"line"},[l("span",null,"如下代码：")]),n(`
`),l("span",{class:"line"},[l("span",null,"模板：")]),n(`
`),l("span",{class:"line"},[l("span",null,"<div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <span>hello world</span>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"编译后的命令式代码：")]),n(`
`),l("span",{class:"line"},[l("span",null,"const div = document.createElement('div');")]),n(`
`),l("span",{class:"line"},[l("span",null,"const span = document.createElement('span');")]),n(`
`),l("span",{class:"line"},[l("span",null,"span.innerText = 'hello world';")]),n(`
`),l("span",{class:"line"},[l("span",null,"div.appendChild(span);")]),n(`
`),l("span",{class:"line"},[l("span",null,"document.body.appendChild(div)")]),n(`
`),l("span",{class:"line"},[l("span",null,"这样，我们只需要一个Compiler函数就可以了，连Render函数都不需要了。其实就变成了一个纯编译时的框架，因为我们不支持任何运行时内容，用户的代码通过编译器编译后才能进行；")])])])]),l("p",null,"三种模式比较 纯运行时框架，由于没有编译的过程，因此我们没法分析用户提供的内容；比如我们实际开发中的html模板中，哪些使用了变量，哪些是写死的模板内容，我们是没法分析的。"),l("p",null,"如果加入编译步骤，我们就可以分析用户提供的内容，看哪些内容未来可能会改变，哪些内容永远不会改变，我们就可以在编译的时候提取这些信息，然后将其传递给Render函数，Render函数得到这些信息之后，就可以做进一步优化了。"),l("p",null,"假如我们设计的框架是纯编译时的，那么它也可以分析用户提供的内容。由于不需要任何运行时，而是直接编译成可执行的javascript代码，因此性能可能会更好，但是这种做法有损灵活性，即用户提供的内容必须编译后才能用。"),l("p",null,"实际上，在这三个方向上业内都有探索，其中svelte就是纯编译时的框架，但是它的真实性能可能达不到理论高度。"),l("p",null,"vue3保持了运行时+ 编译时的架构，在保持灵活性的基础上能够尽可能地去优化。")],-1)])])}const m=a(i,[["render",t]]);export{g as __pageData,m as default};
