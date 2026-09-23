import{_ as e,o as a,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"src-index.tsx","description":"点击第2次，这个时候父组件Counter.state.number 2 偶数要更新 Counter 5.shouldComponentUpdate Counter 6.componentWillUpdate Counter 3.render ChildCounter 4.comp。","frontmatter":{"title":"src-index.tsx","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"点击第2次，这个时候父组件Counter.state.number 2 偶数要更新 Counter 5.shouldComponentUpdate Counter 6.componentWillUpdate Counter 3.render ChildCounter 4.comp。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/10.DOM-DIFF算法 /src-index.tsx.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/10.DOM-DIFF算法/src-index.tsx.md","filePath":"posts/React系统教程/03-原理与手写实现/10.DOM-DIFF算法/src-index.tsx.md"}'),o={name:"posts/React系统教程/03-原理与手写实现/10.DOM-DIFF算法/src-index.tsx.md"};function p(u,s,i,c,r,d){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"src-index-tsx",tabindex:"-1"},[l("src-index.tsx "),n("a",{class:"header-anchor",href:"#src-index-tsx","aria-label":'Permalink to "src-index.tsx"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“src-index.tsx”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from './react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import ReactDOM from './react-dom';")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Counter extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //1.设置默认属性和初始状态")]),l(`
`),n("span",{class:"line"},[n("span",null,"  static defaultProps = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    name: '珠峰架构'")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //设置默认状态")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { number: 0 };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 1.constructor');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 2.componentWillMount');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  handleClick = (event) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({ number: this.state.number + 1 });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  shouldComponentUpdate(nextProps, nextState) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 5.shouldComponentUpdate');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //奇数不更新，偶数更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //return nextState.number % 2 === 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return true;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUpdate() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 6.componentWillUpdate');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 3.render');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div id={`div${this.state.number}`}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <p>{this.state.number}</p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <ChildCounter count={this.state.number} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.handleClick}>+</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    )")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentDidUpdate() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 7.componentDidUpdate');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Counter 4.componentDidMount');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"class ChildCounter extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillUnmount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 6.componentWillUnmount');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 1.componentWillMount');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 3.componentDidMount');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  componentWillReceiveProps(nextProps) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 4.componentWillReceiveProps');")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  shouldComponentUpdate(nextProps, nextState) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 5.shouldComponentUpdate');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //只有属性中有count值是3的倍数的话才更新，否则不更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //0 3 6 9更新，其它的数不更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //return nextProps.count % 3 === 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return true;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    console.log('ChildCounter 2.render');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        {this.props.count == 3 ? <div>1</div> : <div>2</div>}")]),l(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    )")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),l(`
`),n("span",{class:"line"},[n("span",null,"  <Counter />,")]),l(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null,"Counter 1.constructor")]),l(`
`),n("span",{class:"line"},[n("span",null,"Counter 2.componentWillMount")]),l(`
`),n("span",{class:"line"},[n("span",null,"Counter 3.render")]),l(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 1.componentWillMount")]),l(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 2.render")]),l(`
`),n("span",{class:"line"},[n("span",null,"ChildCounter 3.componentDidMount")]),l(`
`),n("span",{class:"line"},[n("span",null,"Counter 4.componentDidMount")]),l(`
`),n("span",{class:"line"},[n("span",null,"点击一次，这个时候父组件Counter.state.number=1")]),l(`
`),n("span",{class:"line"},[n("span",null,"奇数不更新，偶数更新")]),l(`
`),n("span",{class:"line"},[n("span",null,"Counter 5.shouldComponentUpdate")])])])]),n("p",null,"点击第2次，这个时候父组件Counter.state.number=2 偶数要更新 Counter 5.shouldComponentUpdate Counter 6.componentWillUpdate Counter 3.render ChildCounter 4.componentWillReceiveProps 父组件更新的时候 ，要更新子组件，子组件要收到新的属性 ChildCounter 5.shouldComponentUpdate 子组件也判断一下要不要更新 子组件说只有属性中有count值是3的倍数的话才更新，否则不更新，现在是2，不更新，返回值为false Counter 7.componentDidUpdate"),n("p",null,"再点第3次这个时候父组件Counter.state.number=3 奇数不更新 Counter 5.shouldComponentUpdate 再点第4次，这个时候父组件Counter.state.number=4 偶数要更新 Counter 5.shouldComponentUpdate Counter 6.componentWillUpdate Counter 3.render 得到新的虚拟DOM 上一次 p ChildCounter button,这一次p button ChildCounter 6.componentWillUnmount 子且件将要被卸载 Counter 7.componentDidUpdate 父组件更新完成 再点第5次 这个时候父组件Counter.state.number=5 奇数不更新 Counter 5.shouldComponentUpdate 再点第6次，这个父组件Counter.state.number=6 Counter 5.shouldComponentUpdate Counter 6.componentWillUpdate Counter 3.render ChildCounter 1.componentWillMount 上一次 p button,这一次p ChildCounter button ChildCounter 2.render ChildCounter 3.componentDidMount Counter 7.componentDidUpdate 实现DOM-DIFF 分成两个阶段 第1个阶段就是优化前，直接 按索引比较"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */")])])])])],-1)])])}const h=e(o,[["render",p]]);export{m as __pageData,h as default};
