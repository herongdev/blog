import{_ as e,o as a,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Component & PureComponent","description":"纯组件是通过控制 shouldComponentUpdate 生命周期函数，减少 render 调用次数来优化性能的。 优点： 减少了手动判断 state 变化的繁琐操作 缺点： 浅比较：它只能进行一层浅比较，只比较 props 和 state 的内存地址，如果内存地址相同，则。","frontmatter":{"title":"Component & PureComponent","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"纯组件是通过控制 shouldComponentUpdate 生命周期函数，减少 render 调用次数来优化性能的。 优点： 减少了手动判断 state 变化的繁琐操作 缺点： 浅比较：它只能进行一层浅比较，只比较 props 和 state 的内存地址，如果内存地址相同，则。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Component & PureComponent.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Component & PureComponent.md","filePath":"posts/React系统教程/01-核心概念与组件/Component & PureComponent.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Component & PureComponent.md"};function o(i,s,u,c,r,d){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"component-purecomponent",tabindex:"-1"},[l("Component & PureComponent "),n("a",{class:"header-anchor",href:"#component-purecomponent","aria-label":'Permalink to "Component & PureComponent"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Component & PureComponent”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[l("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 纯组件是通过控制"),n("code",null,"shouldComponentUpdate"),l("生命周期函数，减少"),n("code",null,"render"),l("调用次数来优化性能的。")])]),n("p",null,[n("strong",null,"优点：")]),n("ul",null,[n("li",null,[l("减少了手动判断"),n("code",null,"state"),l("变化的繁琐操作")])]),n("p",null,[n("strong",null,"缺点：")]),n("ul",null,[n("li",null,[l("浅比较：它只能进行一层浅比较，只比较"),n("code",null,"props"),l("和"),n("code",null,"state"),l("的内存地址，如果内存地址相同，则"),n("code",null,"shouldComponentUpdate"),l("生命周期就返回"),n("code",null,"false"),l("。")])]),n("p",null,[n("strong",null,"应用："),n("code",null,"PureComponent"),l("的使用场景应该是局部数据发生改变的场景，比如带有输入框、"),n("code",null,"switch"),l("开关等的"),n("code",null,"UI"),l("组件就可以使用"),n("code",null,"PureComponent"),l("组件封装。"),n("code",null,"PureComponent"),l("如果有数据操作最好配合"),n("code",null,"Immutable"),l("一起使用，因为"),n("code",null,"Immutable"),l("可以保证数据的不变性。"),n("code",null,"Immutable"),l("需要使用"),n("code",null,"npm"),l("安装方可以使用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Component & PureComponent**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==这两个类基本相同，唯一的区别是====PureComponent====的原型上多了一个标识==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(ctor.prototype && ctor.prototype.isPureReactComponent) {======  ==return== ==(======    ==!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)======  ==);========}==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==这是检查组件是否需要更新的一个判断，====ctor====就是你声明的继承自====Component or PureComponent====的类，他会判断你是否继承自====PureComponent====，如果是的话就====shallowEqual====比较====state====和====props====。==")])])])]),n("p",null,[l("==顺便说一下：=="),n("strong",null,[l("React"),n("strong",null,[n("strong",null,"中对比一个")]),l("ClassComponent"),n("strong",null,[n("strong",null,"是否需要更新，只有两个地方。一是看有没有")]),l("shouldComponentUpdate"),n("strong",null,[n("strong",null,"方法，二就是这里的")]),l("PureComponent****判断")])]),n("p",null,[l("**示例：**将输入框组件使用"),n("code",null,"PureComponent"),l("进行了封装。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'use strict';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    StyleSheet,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    View,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    Text,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    TextInput,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    TouchableOpacity,")]),l(`
`),n("span",{class:"line"},[n("span",null,"} from 'react-native';")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default class Test extends Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.state = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            accountNum: '',")]),l(`
`),n("span",{class:"line"},[n("span",null,"            initPassword: '',")]),l(`
`),n("span",{class:"line"},[n("span",null,"            userName: '',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        };")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    onChangeText = (text, label) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ [label]: text });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),l(`
`),n("span",{class:"line"},[n("span",null,'            <View style={{ flex: 1, backgroundColor: "#faf7f7" }}>')]),l(`
`),n("span",{class:"line"},[n("span",null,"                <InputItem label={'")])])])]),n("p",null,"账号"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":'} holder={'")])])])]),n("p",null,"请输入账号"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'} itemValue={this.state.accountNum} handleChangeText={this.onChangeText} keyboardType={'default'} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <InputItem label={'")])])])]),n("p",null,"初始密码"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":'} holder={'")])])])]),n("p",null,"请输入初始密码"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'} itemValue={this.state.initPassword} handleChangeText={this.onChangeText} keyboardType={'numeric'} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <InputItem label={'")])])])]),n("p",null,"姓名"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":'} holder={'")])])])]),n("p",null,"请输入姓名"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'} itemValue={this.state.userName} handleChangeText={this.onChangeText} keyboardType={'default'} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </View>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        )")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class InputItem extends React.PureComponent {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        let { label, holder, itemValue, handleChangeText, keyboardType } = this.props;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        console.log('renderInputItem', itemValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"            <View style={styles.inputItemContainer}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <Text style={{ fontSize: 14, color: '#000' }}>{label}</Text>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <TextInput")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    style={styles.customerInput}")]),l(`
`),n("span",{class:"line"},[n("span",null,'                    underlineColorAndroid={"transparent"}')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    placeholderTextColor={"#cdcdcd"}')]),l(`
`),n("span",{class:"line"},[n("span",null,"                    placeholder={holder}")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    defaultValue={itemValue}")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    keyboardType={keyboardType}")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    onChangeText={(text) => handleChangeText(text, itemValue)}")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    numberOfLines={1} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </View>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        )")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const styles = StyleSheet.create({")]),l(`
`),n("span",{class:"line"},[n("span",null,"    inputItemContainer: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        backgroundColor: '#fff',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        paddingHorizontal: 10,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        paddingVertical: 14,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        marginBottom: 5,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        flexDirection: 'row',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        alignItems: 'center'")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    customerInput: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        flex: 1,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        minHeight: 25,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        paddingHorizontal: 10,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        paddingVertical: 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        textAlign: 'right',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        fontSize: 14,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        color: '#333',")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,[l("我们都对在输入框中输入内容，==InputItem==也没有进行重绘。"),n("strong",null,"运行效果图如下：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**控制台打印如下：**")])])])]),n("p",null,"这里如果我们不使用==PureComponent==，则会多次调用render函数，造成无意义的资源浪费。如果我们封装的是其它的组件，比如==Switch==，则也只有state被修改的那一项被修改，感兴趣的童鞋可以动手自己试一下。")],-1)])])}const g=e(p,[["render",o]]);export{m as __pageData,g as default};
