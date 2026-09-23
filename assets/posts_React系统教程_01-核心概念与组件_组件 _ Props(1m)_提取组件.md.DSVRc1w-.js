import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"提取组件","description":"Avatar 不需知道它在 Comment 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：user，而不是 author。 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。","frontmatter":{"title":"提取组件","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"Avatar 不需知道它在 Comment 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：user，而不是 author。 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。","sidebarWeight":82,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/组件 & Props(1m)/提取组件.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/提取组件.md","filePath":"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/提取组件.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/组件 & Props(1m)/提取组件.md"};function t(c,a,u,r,o,m){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"提取组件",tabindex:"-1"},[s("提取组件 "),n("a",{class:"header-anchor",href:"#提取组件","aria-label":'Permalink to "提取组件"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“提取组件”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"将组件拆分为更小的组件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，参考如下 Comment 组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Comment(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="Comment">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="UserInfo">')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <img className="Avatar"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          src={props.author.avatarUrl}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          alt={props.author.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <div className="UserInfo-name">')]),s(`
`),n("span",{class:"line"},[n("span",null,"          {props.author.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-text">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.text}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-date">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {formatDate(props.date)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"该组件用于描述一个社交媒体网站上的评论功能，它接收 author（对象），text （字符串）以及 date（日期）作为 props。")]),s(`
`),n("span",{class:"line"},[n("span",null,"该组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来。")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先，我们将提取 Avatar 组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Avatar(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <img")]),s(`
`),n("span",{class:"line"},[n("span",null,'      className="Avatar"')]),s(`
`),n("span",{class:"line"},[n("span",null,"      src={props.user.avatarUrl}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      alt={props.user.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"Avatar 不需知道它在 Comment 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：user，而不是 author。 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们现在针对 Comment 做些微小调整：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Comment(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="Comment">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="UserInfo">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Avatar user={props.author} />")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <div className="UserInfo-name">')]),s(`
`),n("span",{class:"line"},[n("span",null,"          {props.author.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-text">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.text}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-date">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {formatDate(props.date)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"接下来，我们将提取 UserInfo 组件，该组件在用户名旁渲染 Avatar 组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function UserInfo(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="UserInfo">')]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Avatar user={props.user} />")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="UserInfo-name">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.user.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//进一步简化 Comment 组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Comment(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="Comment">')]),s(`
`),n("span",{class:"line"},[n("span",null,"      <UserInfo user={props.author} />")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-text">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.text}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="Comment-date">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {formatDate(props.date)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（Button，Panel，Avatar），或者组件本身就足够复杂（App，FeedStory，Comment），那么它就是一个可复用组件的候选项。")])])])])],-1)])])}const h=l(i,[["render",t]]);export{v as __pageData,h as default};
