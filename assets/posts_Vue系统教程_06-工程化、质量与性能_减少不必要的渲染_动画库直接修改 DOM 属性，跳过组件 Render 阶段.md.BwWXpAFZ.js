import{_ as e,o as l,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"动画库直接修改 DOM 属性，跳过组件 Render 阶段","description":"这个优化在业务中应该用不上，但还是非常值得学习的，将来可以应用到组件库中。","frontmatter":{"title":"动画库直接修改 DOM 属性，跳过组件 Render 阶段","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","工程化、质量与性能"],"description":"这个优化在业务中应该用不上，但还是非常值得学习的，将来可以应用到组件库中。","sidebarWeight":42,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/性能优化/减少不必要的渲染/动画库直接修改 DOM 属性，跳过组件 Render 阶段.md"},"headers":[],"relativePath":"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/动画库直接修改 DOM 属性，跳过组件 Render 阶段.md","filePath":"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/动画库直接修改 DOM 属性，跳过组件 Render 阶段.md"}'),t={name:"posts/Vue系统教程/06-工程化、质量与性能/减少不必要的渲染/动画库直接修改 DOM 属性，跳过组件 Render 阶段.md"};function i(r,a,o,c,d,u){return l(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"动画库直接修改-dom-属性-跳过组件-render-阶段",tabindex:"-1"},[s("动画库直接修改 DOM 属性，跳过组件 Render 阶段 "),n("a",{class:"header-anchor",href:"#动画库直接修改-dom-属性-跳过组件-render-阶段","aria-label":'Permalink to "动画库直接修改 DOM 属性，跳过组件 Render 阶段"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“动画库直接修改 DOM 属性，跳过组件 Render 阶段”的核心思路，并能把它用于实际开发或面试表达。 这个优化在业务中应该用不上，但还是非常值得学习的，将来可以应用到组件库中。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"参考 [react-spring](https://github.com/pmndrs/react-spring)  的动画实现，当一个动画启动后，每次动画属性改变不会引起组件重新 Render ，而是直接修改了 dom 上相关属性值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"例子演示：[CodeSandbox](https://codesandbox.io/s/donghuakuzhijiexiugai-domtiaoguoxuanranjieduan-ij7px) 在线 Demo")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useState } from "react"')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { useSpring, animated as a } from "react-spring"')]),s(`
`),n("span",{class:"line"},[n("span",null,'import "./styles.css"')]),s(`
`),n("span",{class:"line"},[n("span",null,"let renderCount = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function Card() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const [flipped, setFlipped] = useState(false)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { transform, opacity } = useSpring({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    opacity: flipped ? 1 : 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    config: { mass: 5, tension: 500, friction: 80 },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 尽管 opacity 和 transform 的值在动画期间一直变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 但是并没有组件的重新 Render")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div onClick={() => setFlipped(state => !state)}>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div style={{ position: "fixed", top: 10, left: 10 }}>')]),s(`
`),n("span",{class:"line"},[n("span",null,"        Render 次数：{++renderCount}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <a.div")]),s(`
`),n("span",{class:"line"},[n("span",null,'        class="c back"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <a.div")]),s(`
`),n("span",{class:"line"},[n("span",null,'        class="c front"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"          opacity,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          transform: transform.interpolate(t => `${t} rotateX(180deg)`),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default Card")])])])])],-1)])])}const _=e(t,[["render",i]]);export{f as __pageData,_ as default};
