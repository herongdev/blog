import{_ as a,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"试写h5手势 1","description":"两点的距离 两点的夹角 获取中点 缩放样式 缩放原点 图片数量 单指 双指或多指 手势触点集合 监听基本事件 手势操作，记录触点中心 点击或滑动操作，记录开始坐标和开始时间 滑动 , 记录最终位置并计算时间间隔 快速滑动并且滑动达到一定距离才有效 判断滑动方向 保存最终位置 最后。","frontmatter":{"title":"试写h5手势 1","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"两点的距离 两点的夹角 获取中点 缩放样式 缩放原点 图片数量 单指 双指或多指 手势触点集合 监听基本事件 手势操作，记录触点中心 点击或滑动操作，记录开始坐标和开始时间 滑动 , 记录最终位置并计算时间间隔 快速滑动并且滑动达到一定距离才有效 判断滑动方向 保存最终位置 最后。","sidebarWeight":70,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/试写h5手势 1.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/试写h5手势 1.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/试写h5手势 1.md"}'),p={name:"posts/JavaScript系统教程/04-浏览器与 Web API/试写h5手势 1.md"};function t(c,l,u,o,d,r){return e(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"试写h5手势-1",tabindex:"-1"},[s("试写h5手势 1 "),n("a",{class:"header-anchor",href:"#试写h5手势-1","aria-label":'Permalink to "试写h5手势 1"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“试写h5手势 1”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import styles from './index.less';")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"两点的距离"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getDistance(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let x = p2.pageX - p1.pageX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        y = p2.pageY - p1.pageY;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return Math.sqrt(x * x + y * y);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"两点的夹角"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getAngle(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let x = p1.pageX - p2.pageX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        y = p1.pageY - p2.pageY;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (Math.atan2(y, x) * 180) / Math.PI;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"获取中点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getMidPoint(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let x = (p1.pageX + p2.pageX) / 2,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        y = (p1.pageY + p2.pageY) / 2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return [x, y];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class index extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        startX: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        startY: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        left: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        scaleStyle: [1, 0, 0, 1, 0, 0],//")])])])]),n("p",null,"缩放样式"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        originPoint: [0, 0],//")])])])]),n("p",null,"缩放原点"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        imgNum: 0,//")])])])]),n("p",null,"图片数量"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        currImgIndex: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        currImgWidth: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        visible: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { imgs } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // console.log('imgs', imgs);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (imgs.length > 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.setState({ imgNum: imgs.length });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { imgs } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { currImgIndex, currImgWidth: oldCurrImgWidth } = this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (imgs.length > 0 && this.swiperNode) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.createEvent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const currImgWidth = this.swiperNode.children[`${currImgIndex}`].clientWidth;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // console.log('ref', currImgWidth);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (oldCurrImgWidth !== currImgWidth) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.setState({ currImgWidth })")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    createEvent = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let isTouch = false; //")])])])]),n("p",null,"单指"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let isDoubleTouch = false; //")])])])]),n("p",null,"双指或多指"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let isMove = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let start = [];//")])])])]),n("p",null,"手势触点集合"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        let timer = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let now, delta;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let startPosition, movePosition, endPosition;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const _this = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,"监听基本事件"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        this.swiperNode.addEventListener('touchstart', handleTouchStart, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.swiperNode.addEventListener('touchmove', handleTouchMove, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.swiperNode.addEventListener('touchend', handleTouchEnd, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        function handleTouchStart(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // e.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (e.touches.length >= 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                //")])])])]),n("p",null,"手势操作，记录触点中心"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                isDoubleTouch = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                start = e.touches;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                let screenMidPoint = getMidPoint(start[0], start[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                let midPoint = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    screenMidPoint[0] - e.target.offsetLeft,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    screenMidPoint[1] - e.target.offsetTop")]),s(`
`),n("span",{class:"line"},[n("span",null,"                ];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                _this.setState({ originPoint: midPoint });")]),s(`
`),n("span",{class:"line"},[n("span",null,"            } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                //")])])])]),n("p",null,"点击或滑动操作，记录开始坐标和开始时间"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                isTouch = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                startPosition = [e.touches[0].pageX, e.touches[0].pageY];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                now = Date.now();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        function handleTouchMove(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // clearTimeout(timer);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // e.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            let currImgIndex = parseInt(e.target.id) || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const { imgNum, left: rawLeft, currImgWidth } = _this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (e.touches.length >= 2 && isDoubleTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // timer = setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    let scale = parseFloat(getDistance(e.touches[0], e.touches[1]) / getDistance(start[0], start[1]));")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    let tMatrix = [1, 0, 0, 1, 0, 0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    tMatrix[0] = tMatrix[0] * scale;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    tMatrix[3] = tMatrix[3] * scale;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    console.log('tMatrix:', tMatrix);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    _this.setState({ scaleStyle: tMatrix.join(',') });")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // }, 17);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            } else if (isTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                //")])])])]),n("p",null,[s("滑动"),n("code",null,","),s("记录最终位置并计算时间间隔")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                timer = setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    delta = Date.now() - now;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    movePosition = [e.touches[0].pageX, e.touches[0].pageY];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    const hd = Math.abs(startPosition[0] - movePosition[0]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    const vd = Math.abs(startPosition[1] - movePosition[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    //")])])])]),n("p",null,"快速滑动并且滑动达到一定距离才有效"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                    if ((delta > 0 && delta < 350) && (hd > 10 || vd > 10)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        clearTimeout(timer);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        console.log('object');")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //")])])])]),n("p",null,"判断滑动方向"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                        const swiperDirection = hd > vd")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            ? (startPosition[0] - movePosition[0] > 0 ? 'left' : 'right')")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            : (startPosition[1] - movePosition[1] > 0 ? 'top' : 'bottom')")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //")])])])]),n("p",null,"保存最终位置"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                        endPosition = movePosition;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        if (swiperDirection === 'left') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            //")])])])]),n("p",null,"最后一张左拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                            if (currImgIndex * 1 === imgNum - 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                left = rawLeft;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            left = rawLeft - currImgWidth;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            currImgIndex++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        if (swiperDirection === 'right') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            //")])])])]),n("p",null,"第一张右拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                            if (rawLeft === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            left = rawLeft + currImgWidth;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            currImgIndex--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        _this.setState({ left, currImgIndex });")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }, 100);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // this.swiperNode.addEventListener('touchend', handleTouchEnd, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // this.swiperNode.addEventListener('touchcancel', handleTouchCancel, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        function handleTouchEnd(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (isDoubleTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                isDoubleTouch = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        function handleTouchCancel(e) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleVisible = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState(state => ({")]),s(`
`),n("span",{class:"line"},[n("span",null,"            visible: !state.visible")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }))")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { imgs, width = '100%', height } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { left, originPoint, scaleStyle, currImgIndex, visible } = this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <div className={styles.imgsViewer} onClick={this.handleVisible}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {!visible && imgs.length > 0 && <div className={styles.coverWrap} >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <img")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        style={{ width, height }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        src={`${imgs[0]}?x-image-process=image/resize,m_fill,h_550`}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <div className={styles.count}>{`1/${imgs.length}`}</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </div>}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {/*")])])])]),n("p",null,"有图片数据才显示"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {visible && imgs.length > 0 &&")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <div className={styles.swiperWrap}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                position: 'absolute',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                top: '50%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                left: `${left}px`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                transform: 'translateY(-50%)',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                display: 'flex',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                transition: 'all 0.5s ease-out 0s',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            ref={node => this.swiperNode = node}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            {imgs.map((imgUrl, index) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        key={index}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        className={styles.imgWrap}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        <img")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                            id={index}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                            src={imgUrl}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                            style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                                transformOrigin: `${originPoint[0]}px ${originPoint[1]}px`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                                transform: `matrix(${scaleStyle})`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                            }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                )")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            })}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        {/*")])])])]),n("p",null,"指示器"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," */}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                position: 'fixed',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                bottom: '20px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                left: '50vw',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                transform: 'translate(-50%)',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                padding: 5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                zIndex: 99,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            {imgs.map((_, index) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    key={index}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        display: 'inline-block',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        width: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        height: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        background: '#ddd',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        borderRadius: '50%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        marginLeft: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                        boxShadow: currImgIndex === index ? '0 0 4px 2px #fff' : ''")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                    }}></div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            ))}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    </div>}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(p,[["render",t]]);export{g as __pageData,v as default};
