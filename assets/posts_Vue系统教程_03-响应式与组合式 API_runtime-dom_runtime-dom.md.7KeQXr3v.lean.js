import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"runtime-dom","description":"围绕“runtime-dom”整理的概念、示例与实践笔记。","frontmatter":{"title":"runtime-dom","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“runtime-dom”整理的概念、示例与实践笔记。","sidebarWeight":45,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/runtime-dom.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-dom.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-dom.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/runtime-dom.md"};function t(u,s,c,o,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"runtime-dom",tabindex:"-1"},[l("runtime-dom "),n("a",{class:"header-anchor",href:"#runtime-dom","aria-label":'Permalink to "runtime-dom"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“runtime-dom”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建包runtime-dom，新建package.json")]),l(`
`),n("span",{class:"line"},[n("span",null,"{")]),l(`
`),n("span",{class:"line"},[n("span",null,'  "name": "@vue/runtime-dom",')]),l(`
`),n("span",{class:"line"},[n("span",null,'  "version": "1.0.0",')]),l(`
`),n("span",{class:"line"},[n("span",null,'  "description": "",')]),l(`
`),n("span",{class:"line"},[n("span",null,'  "main": "index.js",')]),l(`
`),n("span",{class:"line"},[n("span",null,'  "buildOptions": {')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "name": "VueRuntimeDOM",')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "formats": [')]),l(`
`),n("span",{class:"line"},[n("span",null,'      "cjs",')]),l(`
`),n("span",{class:"line"},[n("span",null,'      "esm-bundler",')]),l(`
`),n("span",{class:"line"},[n("span",null,'      "global"')]),l(`
`),n("span",{class:"line"},[n("span",null,"    ]")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"dist/index.html")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<body>")]),l(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'  <script src="./runtime-dom.global.js"><\/script>')]),l(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { createRenderer, h } = VueRuntimeDOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 渲染器渲染的是虚拟dom，接受一个配置，其中有patchProp方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let renderer = createRenderer({")]),l(`
`),n("span",{class:"line"},[n("span",null,"      createElement(element) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // setData()")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return document.createElement(element);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      },")]),l(`
`),n("span",{class:"line"},[n("span",null,"      setElementText(el, text) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        el.innerHTML = text;")]),l(`
`),n("span",{class:"line"},[n("span",null,"      },")]),l(`
`),n("span",{class:"line"},[n("span",null,"      insert(el, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        container.appendChild(el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      },")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patchProp(el, key, prevValue, nextValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        console.log(el, key, nextValue)")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    })")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"      h('h1', { style: {} }, [")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'a' }, 'a'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'b' }, 'b'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'c' }, 'c'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'd' }, 'd'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'e', style: { color: 'red' } }, 'e'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'f' }, 'f'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('li', { key: 'g' }, 'g')")]),l(`
`),n("span",{class:"line"},[n("span",null,"      ]")]),l(`
`),n("span",{class:"line"},[n("span",null,"      ), app);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(() => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"        h('h1', {}, [")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'a' }, 'a'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'b' }, 'b'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'e' }, 'e'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'c' }, 'c'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'd' }, 'd'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'h' }, 'h'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'f' }, 'f'),")]),l(`
`),n("span",{class:"line"},[n("span",null,"          h('li', { key: 'g' }, 'g')")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ]")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ), app);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }, 1000)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</body>")])])])])],-1)])])}const k=a(i,[["render",t]]);export{h as __pageData,k as default};
