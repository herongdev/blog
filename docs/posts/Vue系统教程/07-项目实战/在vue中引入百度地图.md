---
title: "在vue中引入百度地图"
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
description: "百度开发者平台已经封装了基于 vue 的地图组件，详细使用，请参考官网： 网上有一些是直接在 index.html 页面全部引用的，本人强烈反对此种使用方式，因为我们项目是组件化的单页应用，强行引入多页应用的开发方式，会破坏整个项目的框架，严重影响性能。有些甚至还在 vue 单页。"
sidebarWeight: 62
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/在vue中引入百度地图.md"
---
::: v-pre

# 在vue中引入百度地图

> 本节目标：理解“在vue中引入百度地图”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==百度开发者平台已经封装了基于==`vue`==的地图组件，详细使用，请参考官网：==

```
https://dafrok.github.io/vue-baidu-map/#/zh/start/installation
```
 ==网上有一些是直接在==`index.html`==页面全部引用的，本人强烈反对此种使用方式，因为我们项目是组件化的单页应用，强行引入多页应用的开发方式，会破坏整个项目的框架，严重影响性能。有些甚至还在==`vue`==单页应用中引入==`jquery`==，感觉这都是一些反人类的骚操作，不到万不得已，不建议使用。==
**使用方式**
==我这里只演示单页应用的开发方式。==
`1.`**安装组件**

```
$ npm install vue-baidu-map --save
2.
```

**注册组件**
==组件的注册可以分为全局注册和局部注册，我这里采用的是局部注册。因为整个项目中仅此一个界面使用。引入官方的说明：==
==如果有按需引入组件的需要，可以选择局部注册百度地图组件，这将减少工程打包后的容量尺寸。局部注册的== `BaiduMap` ==组件==**必须**==声明== `ak` ==属性。== ==所有的独立组件均存放在== `vue-baidu-map/components` ==文件夹下，按需引用即可。== ==由于未编译的== `ES` ==模块不能在大多数浏览器中直接运行，如果引入组件时发生运行时错误，请检查== `webpack` ==的== `loader` ==配置，确认== `include` ==和== `exclude` ==选项命中了组件库。==
==引入组件代码如下：==

[](javascript:void\(0\);)

`//`百度地图

```
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'    import BmScale from 'vue-baidu-map/components/controls/Scale'    import BmNavigation from 'vue-baidu-map/components/controls/Navigation'    import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer'    import BmMarker from 'vue-baidu-map/components/overlays/Marker'    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
```

[](javascript:void\(0\);)

==组件注册：==

[](javascript:void\(0\);)

```
    export default {        name: "pm-distribution",        components: {            BaiduMap,            BmScale,            BmNavigation,            BmMarkerClusterer,            BmMarker,            BmInfoWindow        },......
```

[](javascript:void\(0\);)

`3.HTML`**部分：**

[](javascript:void\(0\);)

`\<baidu-map :style="{width:map.width,height:map.height}" class="map" ak="`你的百度地图秘钥

```
" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}"
@ready="handler" :scroll-wheel-zoom="true">                    <!--
```

比例尺控件

```
-->                    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>                    <!--
```

缩放控件

```
-->                    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>                    <!--
```

聚合动态添加的点坐标

```
-->                    <bm-marker-clusterer :averageCenter="true">                        <bm-marker v-for="marker of markers" :key="marker.code" :position="{lng: marker.lng, lat: marker.lat}" @click="lookDetail(marker)"></bm-marker>                    </bm-marker-clusterer>                    <!--
```

信息窗体

```
-->                    <bm-info-window :position="{lng: infoWindow.info.lng, lat: infoWindow.info.lat}" :title="infoWindow.info.name" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">                        <p><span class="left">
```

单位面积能耗：`\</span\>\<span class="right"\>{{infoWindow.info.areaEnergy}}kWh/`㎡

```
</span></p>                        <p><span class="left">
```

建筑面积：`\</span\>\<span class="right"\>{{infoWindow.info.area}}`㎡

```
</span></p>                        <p><span class="left">
```

电耗：

```
</span><span class="right">{{infoWindow.info.energy}}kWh</span></p>                        <p><span class="left">
```

水耗：`\</span\>\<span class="right"\>{{infoWindow.info.water}}m`³

```
</span></p>                        <p><span class="left">
```

气耗：`\</span\>\<span class="right"\>{{infoWindow.info.air}}m`³

```
</span></p>                    </bm-info-window>                </baidu-map>
```

[](javascript:void\(0\);)

==寻找共性，提取公共部分，左侧点击项目和地图中点击项目，效果大体一致，都是弹出一个信息框，提取方法：==

[](javascript:void\(0\);)

`//`查看详情

```
            lookDetail(data, target){                this.infoWindow.show =true;                this.infoWindow.info=data;                this.activeName = data.name;                //
```

为弹窗口标题添加

```
title                this.$nextTick(()=>{                    var win=document.querySelector(".BMap_bubble_title");                    win.title = this.activeName;                })                if(target=='left'){ //
```

点击的是左侧列表项，则不需要滚动

```
                    this.map.center={lng: data.lng, lat: data.lat};                    this.map.zoom = 15;                    return;                }                //
```

滚动到指定元素位置

```
                this.$nextTick(()=>{                    var obj=document.querySelector(".active");                    var scrollTop=obj.offsetTop;                    this.$refs.box.scrollTop=scrollTop-180;                })            },
```

[](javascript:void\(0\);)

==注意看上述代码，用到了==`this.$nextTick`==，这是在==`vue`==中如果要对==`dom`==进行操作，在此方法中可以保证==`dom`==节点已加载完成，==`vue`==中是以数据驱动的形式来渲染==`dom`==的，也就是说数据修改后，==`dom`==不会马上改变，它会排队等待修改。再演示某些程序员的骚操作：==

```
                setTimeout(function () {                     var win=document.querySelector(".BMap_bubble_title");                     win.title = This.activeName;                 },300);
```
 **注意看：**==上述代码使用了==`setTimeout`==进行延时，来避免数据改变了，但是获取的==`dom`==中数据不是最新的情况，虽然大部分情况下可以解决问题，但是存在缺陷。==`1`==、你如何确定刚好==`300`==毫秒就可以读取到最新的==`dom`==数据了。（经验值）==`2.`==万一你设置的这个延时时间小了呢？或者数据变更得慢了一些呢？可能你设置了==`300ms`==，可实际==`100ms`==就已经变更了呢？是不是存在==`200ms`==的效率差？等等==`.....`
 **左侧项目名称超出自动显示省略号**
==单行文本的溢出显示省略号同学们应该都知道用==`text-overflow:ellipsis`==属性来，当然还需要加宽度==`width`==属来兼容部分浏览。==
==实现方法==**，**==直接通过==`css`==样式控制：==

```
overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
```
 **左侧项目列表选中项高亮，其它项正常显示**
==通过定义一个变量==`activeName` ==，记录当前选中的项目名称（此处项目名称不可能重复），如果当前项目的名称和==`activeName`  ==的值一致时，添加一个==`css`==样式名称==`active`==，然后设置这个样式==`active`==高亮====（设置背景色啊等等）==
==如下代码所示：==
`\<div class="row" v-for="marker of markers" :key="marker.code" @click="lookDetail(marker,'left')" :class="{active: activeName == marker.name}"\>`
**点击地图中项目，自动定位到左侧项目选中位置**
==左侧选中的==`dom`==，有一个激活样式==`active`==，获取到它的==`offsetTop`==属性，然后设置列表容器的==`scrollTop`==属性即可。==

[](javascript:void\(0\);)

`//`滚动到指定元素位置

```
                this.$nextTick(()=>{                    var obj=document.querySelector(".active");                    var scrollTop=obj.offsetTop;                    this.$refs.box.scrollTop=scrollTop-180;                })
```

[](javascript:void\(0\);)

**注意：**==点击左侧项目，不需要滚动，只有点击地图中的项目才去滚动。==
**关于项目信息框中标题超出添加省略号，添加**`title`**完整提示**

==通常我们添加了超出部分省略号，一般都会给其添加一个完整的==`title`==显示。在现有的百度提供的==`InfoWindow`==组件中是没有封装这个属性的，所以我们通常有两种办法：==`1.`==扩展组件源码（耗时）==`2.`==直接==`dom`==操作。==
==这里我选择第二种，因为快。浏览器中按==`F12`==，可以发现这个标题的==`HTML`==代码部分：==
`\<div class="BMap_bubble_title" style="overflow: hidden; height: auto; line-height: 24px; white-space: nowrap; width: auto;" title="`南京高新区管委会行政办公大楼`"\>`南京高新区管委会行政办公大楼`\</div\>`
==我们看到有一个==`BMap_bubble_title`==样式，我们可以直接操作这个==`dom`==。==
==代码如下：==
`//`为弹窗口标题添加

```
title                this.$nextTick(()=>{                    var win=document.querySelector(".BMap_bubble_title");                    win.title = this.activeName;                })
```
 **从左侧树点击项目要修改**`Zoom`**，直接定位到项目信息**
**百度地图中**`Zoom`**的详细说明：**

 **地图自动铺满右侧，并且高度全屏且和左侧高度基本一致**
 ==但凡这种情况，首先就考虑要计算浏览器的宽高了，当然你也可以使用一些自适应的==`UI`==库，我这里直接自己计算的。这个也很简单，获取浏览器可是部分高度，减去一些固定==`px`==的长度部分即可。==
**关于单页应用中的样式问题**
==我发现一些以前做惯了多页应用开发的人，现在来做单页应用，他会很迷糊，因为在多页应用的世界，每个界面是独立的，每个界面中的样式是互不影响的。而单页应用，通常是一个入口，其它组件（页面）都是按需加载，样式命名相同就冲突了，也就是合并覆盖。避免的方式呢，组件中只自己用的，添加==`scoped`==，如果需要覆盖其它的，就在组件容器的最外层添加一个==`class`==或者==`ID`==（这个在项目中唯一命名），然后覆盖的样式都写在这个容器样式之下。==
==如局部样式：==
`\<style lang="scss" scoped\>`
==全局样式：==

```
<style lang="scss">    .pm-distribution{        .BMap_bubble_title {......
```
 ==完整代码：==

[](javascript:void\(0\);)

```
<template>    <div class="pm-distribution">        <h3 class="title">
```

项目分布

```
</h3>        <div class="container" id="container" :style="{height:containerHeight}">            <div class="left">                <div class="top">                    <!--
```

行政区域

```
-->                    <div class="item fl">                        <el-select filterable clearable v-model="districtType" style="width: 140px;margin-left: 5px;">                            <el-option v-for="item in districtTypeOptions" :key="item.value" :label="item.label"                                       :value="item.value">                            </el-option>                        </el-select>                    </div>                    <!--
```

项目类型

```
-->                    <div class="item fl">                        <el-select filterable clearable v-model="buildType" style="width: 140px;">                            <el-option v-for="item in buildTypeOptions" :key="item.id" :label="item.name"                                       :value="item.id">                            </el-option>                        </el-select>                    </div>                    <div class="item fl" style="margin-left: 10px">                        <el-select filterable clearable v-model="buildId" style="width: 190px;">                            <el-option v-for="item in buildOptions" :key="item.code" :label="item.name"                                       :value="item.code">                            </el-option>                        </el-select>                    </div>                    <!--
```

查询

```
-->                    <div class="item query-submit fl" @click="search">                        <i class="el-icon-search"></i>
```

查 询

```
                    </div>                </div>                <div class="header">
```

共`{{markers.length}}`个项目`\<span style="float: right;margin-right: 15px;"\>`今日能耗

```
</span></div>                <div class="list" :style="{height:leftHeight}">                    <div class="list-context">                        <div ref="box" class="list-scroll bmr-y-scroll":style="{height:leftHeight}">                            <!--
```

项目列表

```
-->                            <div class="listItemDIV">                          <div class="row" v-for="marker of markers" :key="marker.code" @click="lookDetail(marker,'left')" :class="{active: activeName == marker.name}">                              <div                                 class="head-title" v-text="marker.name" :title="marker.name"></div>                              <div class="row-content">                                  <span class="item fl"><i class="iconfont nhjc-dianli electricity"></i>{{marker.energy}}kWh</span>                                  <span class="item fl"><i class="iconfont nhjc-shui water"></i>{{marker.water}}m
```

³

```
</span>                                  <span class="item fl"><i class="iconfont nhjc-qi air"></i>{{marker.air}}m
```

³

```
</span>                              </div>                          </div>                          <div style="clear:both;"></div>                            </div>                      </div>                    </div>                </div>            </div>            <div class="right-context" id="right-context">                <baidu-map :style="{width:map.width,height:map.height}" class="map" ak="
```

这里填你的百度秘钥

```
" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}" @ready="handler" :scroll-wheel-zoom="true">                    <!--
```

比例尺控件

```
-->                    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>                    <!--
```

缩放控件

```
-->                    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>                    <!--
```

聚合动态添加的点坐标

```
-->                    <bm-marker-clusterer :averageCenter="true">                        <bm-marker v-for="marker of markers" :key="marker.code" :position="{lng: marker.lng, lat: marker.lat}" @click="lookDetail(marker)"></bm-marker>                    </bm-marker-clusterer>                    <!--
```

信息窗体

```
-->                    <bm-info-window :position="{lng: infoWindow.info.lng, lat: infoWindow.info.lat}" :title="infoWindow.info.name" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">                        <p><span class="left">
```

单位面积能耗：`\</span\>\<span class="right"\>{{infoWindow.info.areaEnergy}}kWh/`㎡

```
</span></p>                        <p><span class="left">
```

建筑面积：`\</span\>\<span class="right"\>{{infoWindow.info.area}}`㎡

```
</span></p>                        <p><span class="left">
```

电耗：

```
</span><span class="right">{{infoWindow.info.energy}}kWh</span></p>                        <p><span class="left">
```

水耗：`\</span\>\<span class="right"\>{{infoWindow.info.water}}m`³

```
</span></p>                        <p><span class="left">
```

气耗：`\</span\>\<span class="right"\>{{infoWindow.info.air}}m`³

```
</span></p>                    </bm-info-window>                </baidu-map>            </div>        </div>    </div></template>
<script>    import {        buildTypeOptionsData,        districtTypeOptionsData,        buildOptionsData    } from "../views/energyAnalysis/energyConsumptionRanking/energyConsumptionRanking"    import {        getProgramsType    } from "../assets/js/bmr-request";    import GlobalUtil from "../utils/globalUtil";    import PmDistributionService from "../services/pmDistributionService"
//
```

百度地图

```
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'    import BmScale from 'vue-baidu-map/components/controls/Scale'    import BmNavigation from 'vue-baidu-map/components/controls/Navigation'    import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer'    import BmMarker from 'vue-baidu-map/components/overlays/Marker'    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
export default {        name: "pm-distribution",        components: {            BaiduMap,            BmScale,            BmNavigation,            BmMarkerClusterer,            BmMarker,            BmInfoWindow        },        data() {            return {                districtType: 0,//
```

行政区域

```
                districtTypeOptions: GlobalUtil.deepCopy(districtTypeOptionsData),//
```

行政区域选项

```
                buildType: 0,//
```

项目类型

```
                buildTypeOptions: buildTypeOptionsData,//
```

项目类型选项

```
                buildId: '',//
```

项目

```
ID                buildOptions: buildOptionsData, //
```

项目列表

```
                searchParams:{                    regions:0,//
```

区域编号

```
                    proType:0,//
```

项目类型

```
                    proCode:'',//
```

项目编号

```
                },                map:{                    center: {lng: 118.802422,lat:32.065631},//'
```

南京市

```
',                    zoom: 12,                    width:'1000px',                    height:'710px'                },                markers:[],                infoWindow: {                    lng: 0,                    lat: 0,                    show: false,                    info:{                        air: 0,                        area: 12313,                        areaEnergy: 0.64,                        code: "440300A055",                        energy: 7922.66,                        lat: "32.043433",                        lng: "118.784107",                        name: "
```

市人民检察院

```
",                        water: 0                    },                },                activeName: '',                leftHeight:'540px',                containerHeight:'700px'            }        },        created() {            this.districtTypeOptions[0].label = '
```

请选择行政区域

```
';            this.getBuildTypes();            this.getSelectPro();        },        mounted() {            this.leftHeight=document.body.clientHeight-300+'px';            this.containerHeight=document.body.clientHeight-150+'px';        },        methods: {            //
```

查询

```
            search() {                this.searchParams.regions=this.districtType;                this.searchParams.proType=this.buildType;                this.searchParams.proCode=this.buildId;                this.getProPositionMap();            },            infoWindowClose (e) {                this.infoWindow.show = false            },            infoWindowOpen (e) {                this.infoWindow.show = true            },            //
```

查看详情

```
            lookDetail(data, target){                // console.log('data',data)                this.infoWindow.show =true;                this.infoWindow.info=data;                this.activeName = data.name;                // let This=this;                //
```

为弹窗口标题添加

```
title                this.$nextTick(()=>{                    var win=document.querySelector(".BMap_bubble_title");                    win.title = this.activeName;                })                if(target=='left'){ //
```

点击的是左侧列表项，则不需要滚动

```
                    this.map.center={lng: data.lng, lat: data.lat};                    this.map.zoom = 15;                    return;                }                //
```

滚动到指定元素位置

```
                this.$nextTick(()=>{                    var obj=document.querySelector(".active");                    var scrollTop=obj.offsetTop;                    this.$refs.box.scrollTop=scrollTop-180;                })            },            //
```

地图初始化

```
            handler ({BMap, map}) {                console.log(BMap, map)                // this.map.center.lng = 118.802422                // this.map.center.lat = 32.065631                // this.map.zoom = 12;                this.map.width= document.getElementById("container").clientWidth-330+'px';                this.map.height=document.body.clientHeight -160+'px';                this.getProPositionMap();            },            //
```

获取项目列表

```
            getSelectPro(){                 PmDistributionService.instance().getSelectPro({}).then((res) => {                    if (res.code === 200) {                       console.log('res',res)                        res.data.list.unshift({code:'',name:'
```

请输入项目名称

```
'})                        this.buildOptions=res.data.list;                    } else {                        this.$message({                            message: "
```

获取数据失败

```
",                            type: "error"                        });                    }                })            },            //
```

项目分布地图

```
            getProPositionMap(){                PmDistributionService.instance().getProPositionMap(this.searchParams).then((res) => {                    if (res.code === 200) {                        // console.log('res',res)                        this.markers=res.data.list;                    } else {                        this.$message({                            message: "
```

获取数据失败

```
",                            type: "error"                        });                    }                })            },            //
```

获取项目类型

```
            getBuildTypes() {                getProgramsType().then(res => {                    //
```

获取楼建筑下拉框

```
                    let temArr = new Array();                    temArr.push({name: '
```

请选择项目类型

```
', id: 0, type: 10})                    res.array.forEach(function (item, index) {                        temArr.push(item);                    })                    console.log('res.array', res.array)                    this.buildTypeOptions = temArr;                });            },        }    }</script>
<style lang="scss" scoped>    $bgBlueColor: #1881bf;    h3.title {        box-sizing: border-box;        height: 34px;        line-height: 34px;        font-size: 16px;        font-weight: 600;        padding: 0 0 0 30px;        border: 1px #E5EEF3 solid;        color: #2274A4;        background: #F5F9F9;        width: 100%;        text-align: left;    }    .container {        margin: 0 auto;        min-width: 1366px;        padding: 0px;        min-height: 710px;        .left {            width: 320px;            float: left;            .header {                width: 300px;                clear: left;                height: 34px;                line-height: 34px;                color: black;                background: #F5F9F9;                padding-left: 20px;            }            .top {                height: 70px;                padding: 8px 5px 12px 5px;            }        }        .right-context {            float: left;        }        .item {            margin: 5px;            height: 28px;            line-height: 28px;            .electricity{                color: #FFD670;            }            .water{                color:#4EB9DB;            }            .air{                color:#F39795;            }            .iconfont{                font-size: 22px;            }        }        .query-submit {            width: 90px;            border-radius: 28px;            background: $bgBlueColor;            color: #fff;            text-align: center;            cursor: pointer;        }        .list{            .item{                width: 93px;                height: 30px;                line-height: 30px;                display: block;            }            .item.fl{                float: left;            }            .list-context{                border-radius:5px;margin-top:10px;background:white;                .list-scroll{                    margin-top:10px;overflow-y:auto;min-height:537px;overflow-x: hidden;                    .row{                        float:left;width:320px;                        cursor: pointer;                        .head-title{                            overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:16px;color:#1781BF;font-weight:400; padding-left: 20px;                            height: 30px;                            line-height: 30px;                        }                        .row-content{                            overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-bottom:10px;font-size:12px;color:rgb(128, 128, 128);                            border-bottom: 1px solid #eee; padding-left: 10px;                        }                    }                    .row.active{                        background-color: #CFDDF3;                    }                }            }        }        .map{           min-width: 800px; width:1000px;height:710px;float:left;background:white;border-radius:5px;margin-left:10px;            .right{               text-align: left;            }            .left{                width: 100px;            }        }
}</style><style lang="scss">    .pm-distribution{        .BMap_bubble_title {            color: #2DB7F5 !important;            font-size: 16px;            font-weight: 400;            margin-bottom: 8px;            overflow: hidden;            text-overflow:ellipsis;            white-space: nowrap;            width: 220px !important;        }    }</style>
```

[](javascript:void\(0\);)
\> 来自

```
 <https://www.cnblogs.com/jiekzou/p/10485604.html>
```

:::
