import{_ as s,o as e,c as i,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Profiler API","description":"它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。 注意： Profiling 增加了额外的开支，所以 它在 生产构建 中会被禁用 。 为了将 profiling 功能加入生产环境中，React 提供了使 profil。","frontmatter":{"title":"Profiler API","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。 注意： Profiling 增加了额外的开支，所以 它在 生产构建 中会被禁用 。 为了将 profiling 功能加入生产环境中，React 提供了使 profil。","sidebarWeight":27,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Profiler API.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Profiler API-2.md","filePath":"posts/React系统教程/01-核心概念与组件/Profiler API-2.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Profiler API-2.md"};function r(t,a,o,c,u,d){return e(),i("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"profiler-api",tabindex:"-1"},[l("Profiler API "),n("a",{class:"header-anchor",href:"#profiler-api","aria-label":'Permalink to "Profiler API"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Profiler API”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。")])])])]),n("p",null,[l("它的目的是识别出应用中渲染较慢的部分，或是可以使用"),n("a",{href:"https://react.docschina.org/docs/hooks-faq.html#how-to-memoize-calculations",target:"_blank",rel:"noreferrer"},"类似"),l(" memoization 优化的部分，并从相关优化中获益。")]),n("p",null,[n("strong",null,"注意："),l(" Profiling 增加了额外的开支，所以"),n("strong",null,[l("它在"),n("strong",null,[n("strong",null,"生产构建")]),l("中会被禁用")]),l("。 为了将 profiling 功能加入生产环境中，React 提供了使 profiling 可用的特殊的生产构建环境。 从 "),n("a",{href:"https://fb.me/react-profiling",target:"_blank",rel:"noreferrer"},"fb.me/react-profiling"),l("了解更多关于如何使用这个构建环境的信息。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**用法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 它需要两个 prop ：一个是 id(string)，一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。")]),l(`
`),n("span",{class:"line"},[n("span",null,"例如，为了分析 Navigation 组件和它的子代：")]),l(`
`),n("span",{class:"line"},[n("span",null,"render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <App>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <Profiler")]),l(`
`),n("span",{class:"line"},[n("span",null,'      id="Navigation"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      onRender={callback}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <Navigation {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <Main {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"  </App>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"多个 Profiler 组件能测量应用中的不同部分：")]),l(`
`),n("span",{class:"line"},[n("span",null,"render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <App>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <Profiler")]),l(`
`),n("span",{class:"line"},[n("span",null,'      id="Navigation"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      onRender={callback}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <Navigation {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <Profiler")]),l(`
`),n("span",{class:"line"},[n("span",null,'      id="Main"')]),l(`
`),n("span",{class:"line"},[n("span",null,"      onRender={callback}")]),l(`
`),n("span",{class:"line"},[n("span",null,"    >")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <Main {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  </App>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 嵌套使用 Profiler 组件来测量相同一个子树下的不同组件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <App>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <Profiler id="Panel" onRender={callback}>')]),l(`
`),n("span",{class:"line"},[n("span",null,"      <Panel {...props}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <Profiler")]),l(`
`),n("span",{class:"line"},[n("span",null,'          id="Content"')]),l(`
`),n("span",{class:"line"},[n("span",null,"          onRender={callback}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"          <Content {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <Profiler")]),l(`
`),n("span",{class:"line"},[n("span",null,'          id="PreviewPane"')]),l(`
`),n("span",{class:"line"},[n("span",null,"          onRender={callback}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        >")]),l(`
`),n("span",{class:"line"},[n("span",null,"          <PreviewPane {...props} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </Panel>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </Profiler>")]),l(`
`),n("span",{class:"line"},[n("span",null,"  </App>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"注意")]),l(`
`),n("span",{class:"line"},[n("span",null,"尽管 Profiler 是一个轻量级组件，我们依然应该在需要时才去使用它。对一个应用来说，每添加一些都会给 CPU 和内存带来一些负担。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**onRender** **回调**")]),l(`
`),n("span",{class:"line"},[n("span",null,"Profiler 需要一个 onRender 函数作为参数。 React 会在 profile 包含的组件树中任何组件 “提交” 一个更新的时候调用这个函数。")]),l(`
`),n("span",{class:"line"},[n("span",null,"它的参数描述了渲染了什么和花费了多久。")]),l(`
`),n("span",{class:"line"},[n("span",null,"function onRenderCallback(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  id, // 发生提交的 Profiler 树的 “id”")]),l(`
`),n("span",{class:"line"},[n("span",null,'  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一')]),l(`
`),n("span",{class:"line"},[n("span",null,"  actualDuration, // 本次更新 committed 花费的渲染时间")]),l(`
`),n("span",{class:"line"},[n("span",null,"  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间")]),l(`
`),n("span",{class:"line"},[n("span",null,"  startTime, // 本次更新中 React 开始渲染的时间")]),l(`
`),n("span",{class:"line"},[n("span",null,"  commitTime, // 本次更新中 React committed 的时间")]),l(`
`),n("span",{class:"line"},[n("span",null,"  interactions // 属于本次更新的 interactions 的集合")]),l(`
`),n("span",{class:"line"},[n("span",null,") {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 合计或记录渲染时间。。。")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"让我们来仔细研究一下各个 prop:")])])])]),n("p",null,[n("strong",null,"id: string"),l(" - 发生提交的 Profiler 树的 id。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。")]),n("p",null,[n("strong",null,'phase: "mount" | "update"'),l(" - 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。")]),n("p",null,[n("strong",null,"actualDuration: number"),l(" - 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 "),n("a",{href:"https://react.docschina.org/docs/react-api.html#reactmemo",target:"_blank",rel:"noreferrer"},"React.memo"),l("，"),n("a",{href:"https://react.docschina.org/docs/hooks-reference.html#usememo",target:"_blank",rel:"noreferrer"},"useMemo"),l("，"),n("a",{href:"https://react.docschina.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate",target:"_blank",rel:"noreferrer"},"shouldComponentUpdate"),l("）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。")]),n("p",null,[n("strong",null,"baseDuration: number"),l(" - 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**startTime: number** - 本次更新中 React 开始渲染的时间戳。")])])])]),n("p",null,[n("strong",null,"commitTime: number"),l(" - 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**interactions: Set** - 当更新被制定时，[“](https://fb.me/react-interaction-tracing)interactions” 的集合会被追踪。（例如当 render 或者 setState 被调用时）。")])])])]),n("p",null,[l("注意 Interactions 能用来识别更新是由什么引起的，尽管这个追踪更新的 API 依然是实验性质的。 从 "),n("a",{href:"https://fb.me/react-interaction-tracing",target:"_blank",rel:"noreferrer"},"fb.me/react-interaction-tracing"),l(" 了解更多 > 来自")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/profiler.html>")])])])])],-1)])])}const m=s(p,[["render",r]]);export{h as __pageData,m as default};
