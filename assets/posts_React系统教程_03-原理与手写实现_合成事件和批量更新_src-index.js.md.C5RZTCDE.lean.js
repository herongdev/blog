import{_ as l,o as a,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"src-index.js","description":"只有在构造函数中才直接给 this.state 赋值 可通过 setState 修改状态，每次修改后，组件会重新刷新 参数是新的状态对象，这个新状态对象会合并到老状态对象上。 老状态没有的属性会添加，老状态有的属性会被覆盖 状态 的更新是批量的，是异步执行的 先实现同步更新，后面。","frontmatter":{"title":"src-index.js","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"只有在构造函数中才直接给 this.state 赋值 可通过 setState 修改状态，每次修改后，组件会重新刷新 参数是新的状态对象，这个新状态对象会合并到老状态对象上。 老状态没有的属性会添加，老状态有的属性会被覆盖 状态 的更新是批量的，是异步执行的 先实现同步更新，后面。","sidebarWeight":60,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/合成事件和批量更新 /src-index.js.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-index.js.md","filePath":"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-index.js.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/合成事件和批量更新/src-index.js.md"};function p(c,e,u,o,d,r){return a(),t("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"src-index-js",tabindex:"-1"},[n("src-index.js "),s("a",{class:"header-anchor",href:"#src-index-js","aria-label":'Permalink to "src-index.js"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import React from 'react';")]),n(`
`),s("span",{class:"line"},[s("span",null,"import ReactDOM from 'react-dom';")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Counter extends React.Component {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    super(props);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[n("只有在构造函数中才直接给"),s("code",null,"this.state"),n("赋值")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    this.state = { number: 0, age: 10 };")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  handleClick = (syntheticEvent) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //updateQueue.isBatchingUpdate = true;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[n("可通过 "),s("code",null,"setState"),n("修改状态，每次修改后，组件会重新刷新")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    //setState")])])])]),s("p",null,"参数是新的状态对象，这个新状态对象会合并到老状态对象上。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"老状态没有的属性会添加，老状态有的属性会被覆盖"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    //state")])])])]),s("p",null,"状态 的更新是批量的，是异步执行的"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"先实现同步更新，后面再实现异步更新"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Promise.resolve().then(() => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"      console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"      console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    syntheticEvent.stopPropagation();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /*  setTimeout(() => {//")])])])]),s("p",null,[n("在"),s("code",null,"setTimeout"),n("是同步更新的")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"       this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"       console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"       this.setState({ number: this.state.number + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"       console.log(this.state.number);")]),n(`
`),s("span",{class:"line"},[s("span",null,"     }); */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /*   this.setState({ age: this.state.age + 1 });")]),n(`
`),s("span",{class:"line"},[s("span",null,"      console.log(this.state); */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,[n("如果你直接修改"),s("code",null,"state"),n("的话，"),s("code",null,"this.state"),n("的确改变了，但是组件并没有刷新，页面也没有更新，视图不更新")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"    //Cannot assign to read only property 'title' of object 'this.props'")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //this.state.number += 1;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //console.log(this.state);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //updateQueue.batchUpdate();")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  //this.state = {number:1};")]),n(`
`),s("span",{class:"line"},[s("span",null,"  render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"      <div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <p>{this.props.title}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <p>number:{this.state.number}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <p>age:{this.state.age}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <button onClick={this.handleClick}>+</button>")]),n(`
`),s("span",{class:"line"},[s("span",null,"      </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    )")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),n(`
`),s("span",{class:"line"},[s("span",null,'  <Counter title="')])])])]),s("p",null,"老标题"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,`" />, document.getElementById('root')`)]),n(`
`),s("span",{class:"line"},[s("span",null,");")])])])])],-1)])])}const b=l(i,[["render",p]]);export{g as __pageData,b as default};
