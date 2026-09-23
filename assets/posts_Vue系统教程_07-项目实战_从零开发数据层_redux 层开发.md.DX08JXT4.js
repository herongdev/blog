import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"redux 层开发","description":"在 Recommend 目录下，新建 store 文件夹，然后新建以下文件 actionCreators.js// 放不同 action 的地方 常量集合，存放不同 action 的 值 用来导出 reducer ， 存放 initialState 和 reducer 函数 声明。","frontmatter":{"title":"redux 层开发","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"在 Recommend 目录下，新建 store 文件夹，然后新建以下文件 actionCreators.js// 放不同 action 的地方 常量集合，存放不同 action 的 值 用来导出 reducer ， 存放 initialState 和 reducer 函数 声明。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/云音乐实例/从零开发数据层/redux 层开发.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/从零开发数据层/redux 层开发.md","filePath":"posts/Vue系统教程/07-项目实战/从零开发数据层/redux 层开发.md"}'),p={name:"posts/Vue系统教程/07-项目实战/从零开发数据层/redux 层开发.md"};function i(c,l,o,u,d,r){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"redux-层开发",tabindex:"-1"},[s("redux 层开发 "),n("a",{class:"header-anchor",href:"#redux-层开发","aria-label":'Permalink to "redux 层开发"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“redux 层开发”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[s("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 ==在== "),n("code",null,"Recommend"),s(" ==目录下，新建== "),n("code",null,"store"),s(" ==文件夹，然后新建以下文件== "),n("code",null,"actionCreators.js//"),s(" ==放不同== "),n("code",null,"action"),s(" ==的地方==")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"constants.js      //")])])])]),n("p",null,[s("==常量集合，存放不同== "),n("code",null,"action"),s(" ==的==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," type")])])])]),n("p",null,"==值=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"index.js          //")])])])]),n("p",null,[s("==用来导出== "),n("code",null,"reducer"),s("==，==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"actionreducer.js        //")])])])]),n("p",null,[s("==存放== "),n("code",null,"initialState"),s(" ==和== "),n("code",null,"reducer"),s(" ==函数==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"1.")])])])]),n("p",null,[n("strong",null,"声明初始化"),s(),n("code",null,"state"),s(" ==初始化== "),n("code",null,"state"),s(" ==在== "),n("code",null,"reducer"),s(" ==中进行==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//reducer.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import * as actionTypes from './constants';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { fromJS } from 'immutable';//")])])])]),n("p",null,[s("这里用到 "),n("code",null,"fromJS"),s(" 把 "),n("code",null,"JS"),s(" 数据结构转化成")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," immutable")])])])]),n("p",null,"数据结构"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const defaultState = fromJS({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bannerList: [],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    recommendList: [],")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"2.")])])])]),n("p",null,[n("strong",null,"定义")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," constants")]),s(`
`),n("span",{class:"line"},[n("span",null,"//constants.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';")]),s(`
`),n("span",{class:"line"},[n("span",null,"3.")])])])]),n("p",null,[n("strong",null,"定义"),s(),n("code",null,"reducer"),s(),n("strong",null,"函数"),s(" ==在== "),n("code",null,"reducer.js"),s(" ==文件中加入以下处理逻辑，由于存放的是== "),n("code",null,"immutable"),s(" ==数据结构，所以必须用== "),n("code",null,"set"),s(" ==方法来设置新状态，同时取状态用== "),n("code",null,"get"),s(" ==方法。==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export default (state = defaultState, action) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    switch (action.type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        case actionTypes.CHANGE_BANNER:")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return state.set('bannerList', action.data);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        case actionTypes.CHANGE_RECOMMEND_LIST:")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return state.set('recommendList', action.data);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        default:")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"4.")])])])]),n("p",null,[n("strong",null,"编写具体的")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," action")]),s(`
`),n("span",{class:"line"},[n("span",null,"//actionCreators.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import * as actionTypes from './constants';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { fromJS } from 'immutable';//")])])])]),n("p",null,[s("将 "),n("code",null,"JS"),s(" 对象转换成 "),n("code",null,"immutable"),s(" 对象")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { getBannerRequest, getRecommendListRequest } from '../../../api/request';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const changeBannerList = (data) => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: actionTypes.CHANGE_BANNER,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: fromJS(data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const changeRecommendList = (data) => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: actionTypes.CHANGE_RECOMMEND_LIST,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: fromJS(data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const getBannerList = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (dispatch) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getBannerRequest().then(data => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            dispatch(changeBannerList(data.banners));")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }).catch(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            console.log("')])])])]),n("p",null,"轮播图数据传输错误"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const getRecommendList = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (dispatch) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getRecommendListRequest().then(data => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            dispatch(changeRecommendList(data.result));")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }).catch(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            console.log("')])])])]),n("p",null,"推荐歌单数据传输错误"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"5.")])])])]),n("p",null,[n("strong",null,"将相关变量导出")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//index.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import reducer from './reducer'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import * as actionCreators from './actionCreators'")]),s(`
`),n("span",{class:"line"},[n("span",null,"export { reducer, actionCreators };")])])])]),n("p",null,[s("如果以后要加入新状态，或者创建新的 "),n("code",null,"reducer"),s(" 模块，直接走这些步骤即可。 "),n("strong",null,"组件连接"),s(),n("code",null,"Redux"),s(" ==首先，需要将== "),n("code",null,"recommend"),s(" ==下的== "),n("code",null,"reducer"),s(" ==注册到全局== "),n("code",null,"store"),s("==，在== "),n("code",null,"store/reducer.js"),s(" ==中，内容如下==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { combineReducers } from 'redux-immutable';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { reducer as recommendReducer } from '../application/Recommend/store/index';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default combineReducers({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    recommend: recommendReducer,")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,[s("==注册完成！== ==现在在== "),n("code",null,"Recommend/index.js"),s(" ==中，准备连接== "),n("code",null,"Redux"),s("==。组件代码更新如下==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,":")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { useEffect } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Slider from '../../components/slider/';")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { connect } from "react-redux";')]),s(`
`),n("span",{class:"line"},[n("span",null,"import * as actionTypes from './store/actionCreators';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RecommendList from '../../components/list/';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Scroll from '../../baseUI/scroll/index';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Content } from './style';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Recommend(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { bannerList, recommendList } = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  useEffect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getBannerDataDispatch();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getRecommendListDataDispatch();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //eslint-disable-next-line")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }, []);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const bannerListJS = bannerList ? bannerList.toJS() : [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const recommendListJS = recommendList ? recommendList.toJS() : [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Content>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Scroll>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <Slider bannerList={bannerListJS}></Slider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <RecommendList recommendList={recommendListJS}></RecommendList>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </Scroll>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </Content>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("映射 "),n("code",null,"Redux"),s(" 全局的 "),n("code",null,"state"),s(" 到组件的 "),n("code",null,"props"),s(" 上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const mapStateToProps = (state) => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,"不要在这里将数据"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," toJS")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //")])])])]),n("p",null,[s("不然每次 "),n("code",null,"diff"),s(" 比对 "),n("code",null,"props"),s(" 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," immutable")]),s(`
`),n("span",{class:"line"},[n("span",null,"  bannerList: state.getIn(['recommend', 'bannerList']),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  recommendList: state.getIn(['recommend', 'recommendList']),")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("映射 "),n("code",null,"dispatch"),s(" 到 "),n("code",null,"props"),s(" 上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const mapDispatchToProps = (dispatch) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getBannerDataDispatch() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dispatch(actionTypes.getBannerList());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getRecommendListDataDispatch() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dispatch(actionTypes.getRecommendList());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("将 "),n("code",null,"ui"),s(" 组件包装成容器组件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));")])])])]),n("p",null,"==到这里，一个精美的推荐页面就开发完成了。=="),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/book/5da96626e51d4524ba0fd237/section/5da974bb518825104d08d269>")])])])])],-1)])])}const g=a(p,[["render",i]]);export{m as __pageData,g as default};
