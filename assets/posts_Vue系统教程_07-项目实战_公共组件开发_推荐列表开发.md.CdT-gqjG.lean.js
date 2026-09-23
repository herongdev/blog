import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"推荐列表开发","description":"首先在 recommend 组件中 数据 朴树、许巍、李健、郑钧、老狼、赵雷 现在来开发 list 这个组件，首先展示 DOM 结构， 推荐歌单 加此参数可以减小请求的图片资源大小 这里需要提醒大家一下， getCount 是一个工具类函数，与我们的业务功能关系不大，我们把它放到。","frontmatter":{"title":"推荐列表开发","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"首先在 recommend 组件中 数据 朴树、许巍、李健、郑钧、老狼、赵雷 现在来开发 list 这个组件，首先展示 DOM 结构， 推荐歌单 加此参数可以减小请求的图片资源大小 这里需要提醒大家一下， getCount 是一个工具类函数，与我们的业务功能关系不大，我们把它放到。","sidebarWeight":28,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/云音乐实例/公共组件开发/推荐列表开发.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/公共组件开发/推荐列表开发.md","filePath":"posts/Vue系统教程/07-项目实战/公共组件开发/推荐列表开发.md"}'),i={name:"posts/Vue系统教程/07-项目实战/公共组件开发/推荐列表开发.md"};function t(c,l,u,o,d,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"推荐列表开发",tabindex:"-1"},[s("推荐列表开发 "),n("a",{class:"header-anchor",href:"#推荐列表开发","aria-label":'Permalink to "推荐列表开发"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“推荐列表开发”的核心思路，并能把它用于实际开发或面试表达。 ==首先在== "),n("code",null,"recommend"),s(" ==组件中==")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Slider from '../../components/slider';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RecommendList from '../../components/list';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Recommend() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //mock")])])])]),n("p",null,"数据"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  const bannerList = [1, 2, 3, 4].map(item => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }')]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      id: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,'      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",')]),s(`
`),n("span",{class:"line"},[n("span",null,"      playCount: 17171122,")]),s(`
`),n("span",{class:"line"},[n("span",null,'      name: "')])])])]),n("p",null,"朴树、许巍、李健、郑钧、老狼、赵雷"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Slider bannerList={bannerList}></Slider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <RecommendList recommendList={recommendList}></RecommendList>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React.memo(Recommend);")])])])]),n("p",null,[s("==现在来开发== "),n("code",null,"list"),s(" ==这个组件，首先展示== "),n("code",null,"DOM"),s(" ==结构，==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ListWrapper,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ListItem,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    List")]),s(`
`),n("span",{class:"line"},[n("span",null,"} from './style';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function RecommendList(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ListWrapper>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <h1 className="title">')])])])]),n("p",null,"推荐歌单"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," </h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <List>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    props.recommendList.map((item, index) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            <ListItem key={item.id + index}>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                                <div className="img_wrapper">')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                    <div className="decorate"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    {/*")])])])]),n("p",null,"加此参数可以减小请求的图片资源大小"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */}")]),s(`
`),n("span",{class:"line"},[n("span",null,'                                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                    <div className="play_count">')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                        <i className="iconfont play">&#xe885;</i>')]),s(`
`),n("span",{class:"line"},[n("span",null,'                                        <span className="count">{getCount(item.playCount)}</span>')]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                                <div className="desc">{item.name}</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"                            </ListItem>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </List>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </ListWrapper>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default React.memo(RecommendList);")])])])]),n("p",null,[s("==这里需要提醒大家一下，=="),n("code",null,"getCount"),s(" ==是一个工具类函数，与我们的业务功能关系不大，我们把它放到专门的目录下去编写：== "),n("code",null,"//"),s(" ==大家按照这个目录层级新建文件==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"//src/api/utils.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const getCount = (count) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (count < 0) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (count < 10000) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return count;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (Math.floor(count / 10000) < 10000) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        return Math.floor(count / 1000) / 10 + "')])])])]),n("p",null,"万"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'";')]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        return Math.floor(count / 10000000) / 10 + "')])])])]),n("p",null,"亿"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'";')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[s("==刚才的== "),n("code",null,"list/index.js"),s(" ==中并没有引入这个函数，现在需要加一行引入代码==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { getCount } from "../../api/utils";')])])])]),n("p",null,[s("==样式部分的== "),n("code",null,"js"),s(" ==代码如下==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import styled from 'styled-components';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import style from '../../assets/global-style';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ListWrapper = styled.div`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  max-width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  .title {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    font-weight: 700;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    padding-left: 6px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    font-size: 14px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    line-height: 60px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const List = styled.div`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  display: flex;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  flex-direction: row;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  flex-wrap: wrap;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  justify-content: space-around;")]),s(`
`),n("span",{class:"line"},[n("span",null,"`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ListItem = styled.div`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  position: relative;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  width: 32%;")]),s(`
`),n("span",{class:"line"},[n("span",null,".img_wrapper {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .decorate {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      top: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      height: 35px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      border-radius: 3px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    position: relative;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    height: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    padding-bottom: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .play_count {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      right: 2px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      top: 2px;")]),s(`
`),n("span",{class:"line"},[n("span",null,'      font-size: ${style["font-size-s"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"      line-height: 15px;")]),s(`
`),n("span",{class:"line"},[n("span",null,'      color: ${style["font-color-light"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"      .play {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        vertical-align: top;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    img {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      border-radius: 3px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  .desc {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      overflow: hidden;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      margin-top: 2px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      padding: 0 2px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      height: 50px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      text-align: left;")]),s(`
`),n("span",{class:"line"},[n("span",null,'      font-size: ${style["font-size-s"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"      line-height: 1.4;")]),s(`
`),n("span",{class:"line"},[n("span",null,'      color: ${style["font-color-desc"]};')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"`;")])])])]),n("p",null,"==值得关注的是：=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<div className="decorate"></div>')])])])]),n("p",null,[s("==上面== "),n("code",null,"style.js"),s(" ==中对应样式==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,".decorate {  position: absolute;  top: 0;  width: 100%;  height: 35px;  border-radius: 3px;  background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));}")])])])]),n("p",null,"==这个标签的样式，它的作用就是给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字，这个细节很容易被忽略，希望大家也能注意一下。== > 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/book/5da96626e51d4524ba0fd237/section/5da9731ef265da5bb252fc6f>")])])])])],-1)])])}const g=a(i,[["render",t]]);export{m as __pageData,g as default};
