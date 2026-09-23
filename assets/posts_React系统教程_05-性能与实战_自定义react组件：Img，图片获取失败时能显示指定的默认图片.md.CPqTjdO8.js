import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"自定义react组件：Img，图片获取失败时能显示指定的默认图片","description":"自定义 react 组件， Img ，图片获取失败时能显示指定的默认图片。 图片加载失败就显示默认图片。","frontmatter":{"title":"自定义react组件：Img，图片获取失败时能显示指定的默认图片","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","性能与实战"],"description":"自定义 react 组件， Img ，图片获取失败时能显示指定的默认图片。 图片加载失败就显示默认图片。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/应用/自定义react组件：Img，图片获取失败时能显示指定的默认图片.md"},"headers":[],"relativePath":"posts/React系统教程/05-性能与实战/自定义react组件：Img，图片获取失败时能显示指定的默认图片.md","filePath":"posts/React系统教程/05-性能与实战/自定义react组件：Img，图片获取失败时能显示指定的默认图片.md"}'),p={name:"posts/React系统教程/05-性能与实战/自定义react组件：Img，图片获取失败时能显示指定的默认图片.md"};function c(i,a,r,o,u,d){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"自定义react组件-img-图片获取失败时能显示指定的默认图片",tabindex:"-1"},[n("自定义react组件：Img，图片获取失败时能显示指定的默认图片 "),s("a",{class:"header-anchor",href:"#自定义react组件-img-图片获取失败时能显示指定的默认图片","aria-label":'Permalink to "自定义react组件：Img，图片获取失败时能显示指定的默认图片"'},"​")]),s("blockquote",null,[s("p",null,[n("本节目标：理解“自定义react组件：Img，图片获取失败时能显示指定的默认图片”的核心思路，并能把它用于实际开发或面试表达。 自定义"),s("code",null,"react"),n("组件，"),s("code",null,"Img"),n("，图片获取失败时能显示指定的默认图片。")])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import React from 'react';")]),n(`
`),s("span",{class:"line"},[s("span",null,"import ReactDOM from 'react-dom';")]),n(`
`),s("span",{class:"line"},[s("span",null,"/**")]),n(`
`),s("span",{class:"line"},[s("span",null," *")])])])]),s("p",null,"图片加载失败就显示默认图片"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," */")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Img extends React.Component {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        super(props);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.state = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            imageUrl: this.props.imageUrl")]),n(`
`),s("span",{class:"line"},[s("span",null,"        };")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    handleImageLoaded() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    handleImageErrored() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.setState({")]),n(`
`),s("span",{class:"line"},[s("span",null,"            imageUrl: this.props.defaultImg")]),n(`
`),s("span",{class:"line"},[s("span",null,"        });")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    render() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"            <img style={this.props.style}")]),n(`
`),s("span",{class:"line"},[s("span",null,"                src={this.state.imageUrl}")]),n(`
`),s("span",{class:"line"},[s("span",null,"                onLoad={this.handleImageLoaded.bind(this)}")]),n(`
`),s("span",{class:"line"},[s("span",null,"                onError={this.handleImageErrored.bind(this)}")]),n(`
`),s("span",{class:"line"},[s("span",null,"            />")]),n(`
`),s("span",{class:"line"},[s("span",null,"        );")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default Img;")])])])])],-1)])])}const h=l(p,[["render",c]]);export{g as __pageData,h as default};
