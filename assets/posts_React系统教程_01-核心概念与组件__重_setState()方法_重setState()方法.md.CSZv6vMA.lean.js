import{_ as e,o as l,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"重setState()方法","description":"出于性能考虑，会对多次state对象进行合并，类似于Object.assign()方法，后面对象的同名属性会覆盖前面的。 此方式调用一次后，后面再用此方法setState时就可以取到上一次更新之后的state值。 \\\\ 来自。","frontmatter":{"title":"重setState()方法","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"出于性能考虑，会对多次state对象进行合并，类似于Object.assign()方法，后面对象的同名属性会覆盖前面的。 此方式调用一次后，后面再用此方法setState时就可以取到上一次更新之后的state值。 \\\\ 来自。","sidebarWeight":89,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/状态改变/[重]setState()方法/重setState()方法.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/[重]setState()方法/重setState()方法.md","filePath":"posts/React系统教程/01-核心概念与组件/[重]setState()方法/重setState()方法.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/[重]setState()方法/重setState()方法.md"};function i(c,a,u,o,r,d){return l(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"重setstate-方法",tabindex:"-1"},[n("重setState()方法 "),s("a",{class:"header-anchor",href:"#重setstate-方法","aria-label":'Permalink to "重setState()方法"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“重setState()方法”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"==setState== 方法传参部分：")]),n(`
`),s("span",{class:"line"},[s("span",null,"/**")]),n(`
`),s("span",{class:"line"},[s("span",null," * @param {object|function} partialState Next partial state or function to produce next partial state to be merged with current state.")]),n(`
`),s("span",{class:"line"},[s("span",null," * @param {?function} callback Called after state is updated.")]),n(`
`),s("span",{class:"line"},[s("span",null," */")]),n(`
`),s("span",{class:"line"},[s("span",null,"Component.prototype.setState = function (partialState, callback) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // ...")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"调用 ==setState()== 进行状态，**State** **的更新可能是异步的**")]),n(`
`),s("span",{class:"line"},[s("span",null,"**两种传参方法**")]),n(`
`),s("span",{class:"line"},[s("span",null,"一、传入新的 ==state== 对象")])])])]),s("p",null,"出于性能考虑，会对多次state对象进行合并，类似于Object.assign()方法，后面对象的同名属性会覆盖前面的。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"    age: 2,")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"二、传入回调函数，并在回调函数里面返回新的 ==state== 对象。")])])])]),s("p",null,"此方式调用一次后，后面再用此方法setState时就可以取到上一次更新之后的state值。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"this.setState((prevState, props) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        age: prevState.age + props.age,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    };")]),n(`
`),s("span",{class:"line"},[s("span",null,"});")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**说明**")]),n(`
`),s("span",{class:"line"},[s("span",null,"出于性能方面的考虑，React 可以将多次的 setState() 调用合并为一次")]),n(`
`),s("span",{class:"line"},[s("span",null,"import * as React from 'react';")]),n(`
`),s("span",{class:"line"},[s("span",null,"const { PureComponent, Fragment } = React;")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Test extends PureComponent {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    state = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        age: 0")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"            <Fragment>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <button onClick={this.doClick}>Pass in an object</button>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <button onClick={this.doClick2}>Pase in a function</button>")]),n(`
`),s("span",{class:"line"},[s("span",null,"                <p>age: {this.state.age}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"            </Fragment>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        );")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    doClick = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"            age: this.state.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"        });")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (true) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"                age: this.state.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"            });")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    doClick2 = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.setState((prevState, props) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                age: prevState.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        });")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (true) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.setState((prevState, props) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                    age: prevState.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"                }")]),n(`
`),s("span",{class:"line"},[s("span",null,"            });")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default Test")]),n(`
`),s("span",{class:"line"},[s("span",null,"在上面的这个示例中，若点击按钮 Pass in an object ， ==render== 中的 age 部分的显示结果为：")]),n(`
`),s("span",{class:"line"},[s("span",null,"==age: 1==")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"若点击按钮 Pass in an function ， ==render== 中的 age 部分的显示结果为：")]),n(`
`),s("span",{class:"line"},[s("span",null,"==age: 2==")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**分析**")]),n(`
`),s("span",{class:"line"},[s("span",null,"在上面的 ==doClick== 方法中，调用了两次 ==setState== 方法，且方法里面都是传入的一个新的 ==state== 对象，当出现这种情况 —— 即在一个函数中调用了多次 ==setState== 方法，且传入的是一个新的 ==state== 对象，那么 React 出于性能方面的考虑，并不会直接对每次的调用都进行更新，而是会将多次传入的对象进行合并处理，以产生一个新的最终的 ==state== 对象，这种合并类似于：")]),n(`
`),s("span",{class:"line"},[s("span",null,"const newState = Object.assign(")]),n(`
`),s("span",{class:"line"},[s("span",null,"    {},")]),n(`
`),s("span",{class:"line"},[s("span",null,"    state0,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    state1,")]),n(`
`),s("span",{class:"line"},[s("span",null,"    state2")]),n(`
`),s("span",{class:"line"},[s("span",null,");")]),n(`
`),s("span",{class:"line"},[s("span",null,'然后再将得到的 =="newState"== 通过调用 ==setState== 方法进行更新，所以，如果多次调用 ==setState== 方法时传入的对象有相同的 ==key==，那么最后一次调用时所传入的对象的那个 ==key== 的值将成为最终的更新值，在最后一次调用前的值都将被覆盖。')]),n(`
`),s("span",{class:"line"},[s("span",null,"在上面的 ==doClick2== 方法中，调用了两次 ==setState== 方法，不同的是，传入的不是对象，而是函数，函数里面传入了两个参数，即上一次更新的 ==state== 和当前的 ==props== ，这样在第二次调用 ==setState== 方法时便可以通过 ==prevState.age== 拿到最新的值从而更新本次的\b ==state== 。显然，React 对于传入函数的方式和传入对象的方式进行更新 ==state== 的各自具体理念是不一样的，对于传入函数的方式，在调用 ==setState== 进行更新 ==state== 时，React 会按照各个 ==setState== 的调用顺序，将它们依次放入一个队列，然后，在进行状态更新时，则按照队列中的先后顺序依次调用，并将上一个调用结束时产生的 ==state== 传入到下一个调用的函数中，当然，第一个 ==setState== 调用时，传入的 ==prevState== 则是当前的 ==state== ，如此，便解决了传入对象式调用 ==setState== 方法所存在的不能依赖上一次的 ==state== 去计算本次 ==state== 的问题。思考一下，在使用传入函数的方式进行状态更新\b时，可以在该函数内使用 ==this.state== 拿到最新的状态信息吗？比如这样：")]),n(`
`),s("span",{class:"line"},[s("span",null,"doClick2 = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.setState((prevState, props) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            age: prevState.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    if (true) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.setState((prevState, props) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                age: this.state.age + 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"结果是什么？是这样的：1实际上，函数里面 ==this.state.age== 的值为 ==0== 。为什么在使用函数式 ==setState== 进行状态更新后，在后一个里面还是不能通过 ==this.state.age== 拿到最新的值？React 源码中关于 ==setState== 部分有这样一段说明：==When a function is provided to setState, it will be called at some point in========the future (not synchronously). It will be called with the up to date========component arguments (state, props, context). These values can be different========from this.* because your function may be called after receiveProps but before========shouldComponentUpdate, and this new state, props, and context will not yet be========assigned to this.======结合上面的说明，也就是说，在上面的这段代码中，执行第二个 ==setState== 里面的函数时，由第一个 ==setState== 所产生的最新的 ==state== 并没有合并到 ==this== 对象上面去，所以此时通过 ==this== 获取不到最新的状态，故而拿到 ==this.state.age== 的值为 ==0== 而非 ==1== 。")]),n(`
`),s("span",{class:"line"},[s("span",null,"**此外**")]),n(`
`),s("span",{class:"line"},[s("span",null,"==setState== 方法还提供一个可选的参数 ==callback== ，即一个回调函数，会在当前调用 ==setState== 方法更新状态后进行调用。")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://blog.csdn.net/Mr_28/article/details/84778001>")])])])])],-1)])])}const S=e(p,[["render",i]]);export{g as __pageData,S as default};
