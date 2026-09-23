import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"getDerivedStateFromProps","description":"static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的 props 映射到 state 上面； 珠峰架构 当传入的 type 发生变化的时候，更新。","frontmatter":{"title":"getDerivedStateFromProps","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的 props 映射到 state 上面； 珠峰架构 当传入的 type 发生变化的时候，更新。","sidebarWeight":68,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/新的生命周期 /getDerivedStateFromProps.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/新的生命周期/getDerivedStateFromProps.md","filePath":"posts/React系统教程/03-原理与手写实现/新的生命周期/getDerivedStateFromProps.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/新的生命周期/getDerivedStateFromProps.md"};function r(i,e,o,c,u,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"getderivedstatefromprops",tabindex:"-1"},[s("getDerivedStateFromProps "),n("a",{class:"header-anchor",href:"#getderivedstatefromprops","aria-label":'Permalink to "getDerivedStateFromProps"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“getDerivedStateFromProps”的核心思路，并能把它用于实际开发或面试表达。 "),n("code",null,"static getDerivedStateFromProps(props, state)"),s(" 这个生命周期的功能实际上就是将传入的"),n("code",null,"props"),s("映射到"),n("code",null,"state"),s("上面；")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from 'react-dom';")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static defaultProps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    name: '")])])])]),n("p",null,"珠峰架构"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { number: 0 }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleClick = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ number: this.state.number + 1 });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('3.render');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>{this.state.number}</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ChildCounter number={this.state.number} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.handleClick}>+</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ChildCounter extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { number: 0 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static getDerivedStateFromProps(nextProps, prevState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { number } = nextProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[s("当传入的"),n("code",null,"type"),s("发生变化的时候，更新")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"state")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (number % 2 === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return { number: number * 2 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return { number: number * 3 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('child-render', this.state)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (<div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {this.state.number}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Counter />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])])],-1)])])}const g=l(p,[["render",r]]);export{h as __pageData,g as default};
