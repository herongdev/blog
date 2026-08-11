---
title: "redux 层开发"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "在 Recommend 目录下，新建 store 文件夹，然后新建以下文件 actionCreators.js// 放不同 action 的地方 常量集合，存放不同 action 的 值 用来导出 reducer ， 存放 initialState 和 reducer 函数 声明。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/云音乐实例/从零开发数据层/redux 层开发.md"
---
::: v-pre

# redux 层开发

> 本节目标：理解“redux 层开发”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==在== `Recommend` ==目录下，新建== `store` ==文件夹，然后新建以下文件==
`actionCreators.js//` ==放不同== `action` ==的地方==

```
constants.js      //
```

==常量集合，存放不同== `action` ==的==

```
 type
```

==值==

```
index.js          //
```

==用来导出== `reducer`==，==

```
actionreducer.js        //
```

==存放== `initialState` ==和== `reducer` ==函数==

```

1.
```

**声明初始化** `state`
==初始化== `state` ==在== `reducer` ==中进行==

```
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';//
```

这里用到 `fromJS` 把 `JS` 数据结构转化成

```
 immutable
```

数据结构

```
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
});
2.
```

**定义**

```
 constants
//constants.js
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';
export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';
3.
```

**定义** `reducer` **函数**
==在== `reducer.js` ==文件中加入以下处理逻辑，由于存放的是== `immutable` ==数据结构，所以必须用== `set` ==方法来设置新状态，同时取状态用== `get` ==方法。==

```
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        default:
            return state;
    }
}
4.
```

**编写具体的**

```
 action
//actionCreators.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';//
```

将 `JS` 对象转换成 `immutable` 对象

```
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';
export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});
export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});
export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("
```

轮播图数据传输错误

```
");
        })
    }
};
export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result));
        }).catch(() => {
            console.log("
```

推荐歌单数据传输错误

```
");
        });
    }
};
5.
```

**将相关变量导出**

```
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'
export { reducer, actionCreators };
```

如果以后要加入新状态，或者创建新的 `reducer` 模块，直接走这些步骤即可。
**组件连接** `Redux`
==首先，需要将== `recommend` ==下的== `reducer` ==注册到全局== `store`==，在== `store/reducer.js` ==中，内容如下==

```
:
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
export default combineReducers({
    recommend: recommendReducer,
});
```
 ==注册完成！==
==现在在== `Recommend/index.js` ==中，准备连接== `Redux`==。组件代码更新如下==

```
:
import React, { useEffect } from 'react';
import Slider from '../../components/slider/';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
function Recommend(props) {
  const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
    //eslint-disable-next-line
  }, []);
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
}
//
```

映射 `Redux` 全局的 `state` 到组件的 `props` 上

```
const mapStateToProps = (state) => ({
  //
```

不要在这里将数据

```
 toJS
  //
```

不然每次 `diff` 比对 `props` 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用

```
 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
});
//
```

映射 `dispatch` 到 `props` 上

```
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};
//
```

将 `ui` 组件包装成容器组件

```
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
```
 ==到这里，一个精美的推荐页面就开发完成了。==

\> 来自

```
 <https://juejin.im/book/5da96626e51d4524ba0fd237/section/5da974bb518825104d08d269>
```

:::
