import{_ as a,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"轮播组件开发","description":"现在来开发 recommend 组件，首先进入到 src 目录下 application/Recommend/index.js 中 数据 现在就可以着手编写 slider 组件的具体内容了。首先安装一个插件 接下来，在 slider/index.js 中： 推荐 对应的 styl。","frontmatter":{"title":"轮播组件开发","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"现在来开发 recommend 组件，首先进入到 src 目录下 application/Recommend/index.js 中 数据 现在就可以着手编写 slider 组件的具体内容了。首先安装一个插件 接下来，在 slider/index.js 中： 推荐 对应的 styl。","sidebarWeight":29,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/云音乐实例/公共组件开发/轮播组件开发.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/公共组件开发/轮播组件开发.md","filePath":"posts/Vue系统教程/07-项目实战/公共组件开发/轮播组件开发.md"}'),p={name:"posts/Vue系统教程/07-项目实战/公共组件开发/轮播组件开发.md"};function t(c,l,u,o,d,r){return e(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"轮播组件开发",tabindex:"-1"},[s("轮播组件开发 "),n("a",{class:"header-anchor",href:"#轮播组件开发","aria-label":'Permalink to "轮播组件开发"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“轮播组件开发”的核心思路，并能把它用于实际开发或面试表达。 ==现在来开发== "),n("code",null,"recommend"),s(" ==组件，首先进入到== "),n("code",null,"src"),s(" ==目录下== "),n("code",null,"application/Recommend/index.js"),s(" ==中==")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Slider from '../../components/slider';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Recommend() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //mock")])])])]),n("p",null,"数据"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  const bannerList = [1, 2, 3, 4].map(item => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }')]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Slider bannerList={bannerList}></Slider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React.memo(Recommend);")])])])]),n("p",null,[s("==现在就可以着手编写== "),n("code",null,"slider"),s(" ==组件的具体内容了。首先安装一个插件==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"npm install swiper --save")])])])]),n("p",null,[s("==接下来，在== "),n("code",null,"slider/index.js"),s(" ==中：==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//components/slider/index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { useEffect, useState } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { SliderContainer } from './style';")]),s(`
`),n("span",{class:"line"},[n("span",null,'import "swiper/css/swiper.css";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import Swiper from "swiper";')]),s(`
`),n("span",{class:"line"},[n("span",null,"function Slider(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const [sliderSwiper, setSliderSwiper] = useState(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { bannerList } = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    useEffect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (bannerList.length && !sliderSwiper) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            let sliderSwiper = new Swiper(".slider-container", {')]),s(`
`),n("span",{class:"line"},[n("span",null,"                loop: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                autoplay: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    delay: 3000,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    disableOnInteraction: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                },")]),s(`
`),n("span",{class:"line"},[n("span",null,"                pagination: { el: '.swiper-pagination' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            });")]),s(`
`),n("span",{class:"line"},[n("span",null,"            setSliderSwiper(sliderSwiper);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, [bannerList.length, sliderSwiper]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <SliderContainer>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <div className="slider-container">')]),s(`
`),n("span",{class:"line"},[n("span",null,'                <div className="swiper-wrapper">')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        bannerList.map(slider => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'                                <div className="swiper-slide" key={slider.imageUrl}>')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                    <div className="slider-nav">')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                        <img src={slider.imageUrl} width="100%" height="100%" alt="')])])])]),n("p",null,"推荐"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            );")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <div className="swiper-pagination"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </SliderContainer>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React.memo(Slider);")])])])]),n("p",null,[s("==对应的== "),n("code",null,"style.js"),s(" ==文件==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import styled from 'styled-components';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import style from '../../assets/global-style';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const SliderContainer = styled.div`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  position: relative;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  box-sizing: border-box;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  margin: auto;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  background: white;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  .before {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    top: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    height: 60%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,'    background: ${style["theme-color"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  .slider-container {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    position: relative;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    width: 98%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    height: 160px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    overflow: hidden;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    margin: auto;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    border-radius: 6px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .slider-nav {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      display: block;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .swiper-pagination-bullet-active {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      background: ${style["theme-color"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"`")])])])]),n("p",null,[s("==现在打开页面可以看到这个效果=="),n("code",null,":")]),n("p",null,[s("==轮播的功能已经具备，但是这个效果并不是我们想要的，我们希望它是两边并不是完全空白，而是有一部分红色做衬托，如图=="),n("code",null,":")]),n("p",null,[s("==这个效果如何来实现？如果说单纯去增加== "),n("code",null,"Home"),s(" ==组件的高度，那么其他的组件并不需要下面的这些红色背景，显然不合适，我们只能在== "),n("code",null,"slider"),s(" ==组件上做一些手脚。== ==我们在== "),n("code",null,"SliderContainer"),s(" ==标签内新建一个==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," div:")]),s(`
`),n("span",{class:"line"},[n("span",null,'<div className="before"></div>')])])])]),n("p",null,[s("==样式已经写在上面的== "),n("code",null,"style.js"),s(" ==中了，大家可以翻到上面看看，还是比较== "),n("code",null,"tricky"),s(" ==的一个操作，相当于另外做了一层遮罩，我们之后开发歌手详情页同样会用到这个方法。== > 来自")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/book/5da96626e51d4524ba0fd237/section/5da9731ef265da5bb252fc6f>")])])])])],-1)])])}const g=a(p,[["render",t]]);export{h as __pageData,g as default};
