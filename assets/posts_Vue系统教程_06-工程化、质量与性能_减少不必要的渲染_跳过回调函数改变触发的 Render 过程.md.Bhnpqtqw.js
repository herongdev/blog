import{_ as l,o as a,c as p,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"跳过回调函数改变触发的 Render 过程","description":"另一类是组件 Render 后的回调函数，如：onClick、onVisibleChange。 这类属性并不参与到组件的 Render 过程，因为可以对这类属性进行优化。当这类属性发生改变时，不触发组件的重新 Render ，而是在回调触发时调用最新的回调函数。 Dan Abra。","frontmatter":{"title":"跳过回调函数改变触发的 Render 过程","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","工程化、质量与性能"],"description":"另一类是组件 Render 后的回调函数，如：onClick、onVisibleChange。 这类属性并不参与到组件的 Render 过程，因为可以对这类属性进行优化。当这类属性发生改变时，不触发组件的重新 Render ，而是在回调触发时调用最新的回调函数。 Dan Abra。","sidebarWeight":43,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/性能优化/减少不必要的渲染/跳过回调函数改变触发的 Render 过程.md"},"headers":[],"relativePath":"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/跳过回调函数改变触发的 Render 过程.md","filePath":"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/跳过回调函数改变触发的 Render 过程.md"}'),i={name:"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/跳过回调函数改变触发的 Render 过程.md"};function r(t,s,o,c,u,d){return a(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"跳过回调函数改变触发的-render-过程",tabindex:"-1"},[e("跳过回调函数改变触发的 Render 过程 "),n("a",{class:"header-anchor",href:"#跳过回调函数改变触发的-render-过程","aria-label":'Permalink to "跳过回调函数改变触发的 Render 过程"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“跳过回调函数改变触发的 Render 过程”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 组件的 Props 可以分为两类。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一类是在对组件 Render 有影响的属性，如：页面数据、[getPopupContainer](https://ant.design/components/dropdown/) 和 enderProps 函数。")])])])]),n("p",null,[e("另一类是组件 Render 后的回调函数，如：onClick、"),n("a",{href:"https://ant.design/components/dropdown/",target:"_blank",rel:"noreferrer"},"onVisibleChange"),e("。 这类属性并不参与到组件的 Render 过程，因为可以对这类属性进行优化。当这类属性发生改变时，不触发组件的重新 Render ，而是在回调触发时调用最新的回调函数。")]),n("p",null,[e("Dan Abramov 在 "),n("a",{href:"https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers",target:"_blank",rel:"noreferrer"},"A Complete Guide to useEffect"),e(" 文章中认为，每次 Render 都有自己的事件回调是一件很酷的特性。但该特性要求每次回调函数改变就触发组件的重新 Render ，这在性能优化过程中是可以取舍的。")]),n("p",null,[e("例子参考："),n("a",{href:"https://codesandbox.io/s/tiaoguohuidiaohanshugaibianhongfade-render-guocheng-3i59n",target:"_blank",rel:"noreferrer"},"跳过回调函数改变触发的"),e(" Render 过程。以下代码比较难以理解，可通过调试该例子，帮助理解消化。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { Children, cloneElement, memo, useEffect, useRef } from "react"')]),e(`
`),n("span",{class:"line"},[n("span",null,'import { useDeepCompareMemo } from "use-deep-compare"')]),e(`
`),n("span",{class:"line"},[n("span",null,'import omit from "lodash.omit"')]),e(`
`),n("span",{class:"line"},[n("span",null,"let renderCnt = 0")]),e(`
`),n("span",{class:"line"},[n("span",null,"export function SkipNotRenderProps({ children, skips }) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  if (!skips) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 默认跳过所有回调函数")]),e(`
`),n("span",{class:"line"},[n("span",null,'    skips = prop => prop.startsWith("on")')]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const child = Children.only(children)")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const childProps = child.props")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const propsRef = useRef({})")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const nextSkippedPropsRef = useRef({})")]),e(`
`),n("span",{class:"line"},[n("span",null,"  Object.keys(childProps)")]),e(`
`),n("span",{class:"line"},[n("span",null,"    .filter(it => skips(it))")]),e(`
`),n("span",{class:"line"},[n("span",null,"    .forEach(key => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 代理函数只会生成一次，其值始终不变")]),e(`
`),n("span",{class:"line"},[n("span",null,"      nextSkippedPropsRef.current[key] =")]),e(`
`),n("span",{class:"line"},[n("span",null,"        nextSkippedPropsRef.current[key] ||")]),e(`
`),n("span",{class:"line"},[n("span",null,"        function skipNonRenderPropsProxy(...args) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"          propsRef.current[key].apply(this, args)")]),e(`
`),n("span",{class:"line"},[n("span",null,"        }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    })")]),e(`
`),n("span",{class:"line"},[n("span",null,"  useEffect(() => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    propsRef.current = childProps")]),e(`
`),n("span",{class:"line"},[n("span",null,"  })")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 这里使用 useMemo 优化技巧")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 除去回调函数，其他属性改变生成新的 React.Element")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return useDeepCompareMemo(() => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return cloneElement(child, {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ...child.props,")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ...nextSkippedPropsRef.current,")]),e(`
`),n("span",{class:"line"},[n("span",null,"    })")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }, [omit(childProps, Object.keys(nextSkippedPropsRef.current))])")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"// SkipNotRenderPropsComp 组件内容和 Normal 内容一样")]),e(`
`),n("span",{class:"line"},[n("span",null,"export function SkipNotRenderPropsComp({ onClick }) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),e(`
`),n("span",{class:"line"},[n("span",null,'    <div className="case">')]),e(`
`),n("span",{class:"line"},[n("span",null,'      <div className="caseHeader">')]),e(`
`),n("span",{class:"line"},[n("span",null,"        跳过『与 Render 无关的 Props』改变触发的重新 Render")]),e(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"      Render 次数为：{++renderCnt}")]),e(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),e(`
`),n("span",{class:"line"},[n("span",null,'        <button onClick={onClick} style={{ color: "blue" }}>')]),e(`
`),n("span",{class:"line"},[n("span",null,"          点我回调，回调弹出值为 1000（优化成功）")]),e(`
`),n("span",{class:"line"},[n("span",null,"        </button>")]),e(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"  )")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"export default SkipNotRenderPropsComp")])])])])],-1)])])}const m=l(i,[["render",r]]);export{f as __pageData,m as default};
