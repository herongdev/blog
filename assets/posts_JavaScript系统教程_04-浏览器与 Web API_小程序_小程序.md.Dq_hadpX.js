import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"小程序","description":"判断是否是滑动，根据touchend时的坐标相对于开始时的坐标变化，并判断滑动方向 图片数量 最后一张左拉的情况 第一张往右拉的情况。","frontmatter":{"title":"小程序","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"判断是否是滑动，根据touchend时的坐标相对于开始时的坐标变化，并判断滑动方向 图片数量 最后一张左拉的情况 第一张往右拉的情况。","sidebarWeight":61,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/小程序/小程序.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/小程序/小程序.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/小程序/小程序.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/小程序/小程序.md"};function t(c,l,u,r,d,o){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"小程序",tabindex:"-1"},[s("小程序 "),n("a",{class:"header-anchor",href:"#小程序","aria-label":'Permalink to "小程序"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“小程序”的核心思路，并能把它用于实际开发或面试表达。 判断是否是滑动，根据touchend时的坐标相对于开始时的坐标变化，并判断滑动方向")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," swiperDirection = Math.abs(startX - endX) > Math.abs(startY - endY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ? (startX - endX > 0 ? 'left' : 'right')")]),s(`
`),n("span",{class:"line"},[n("span",null,"            : (startY - endY > 0 ? 'top' : 'bottom')")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { Component } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import styles from './index.less';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class index extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        startX: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        startY: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        left: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        imgNum: 0,//")])])])]),n("p",null,"图片数量"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        currImgIndex: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { imgs } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.swiper.addEventListener('touchstart', this.handleTouchStart, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.swiper.addEventListener('touchend', this.handleTouchEnd, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ imgNum: imgs.length });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleTouchStart = (evt) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // evt.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (evt.touches.length > 1) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"            startX: evt.touches[0].pageX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            startY: evt.touches[0].pageY,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    handleTouchEnd = (evt) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // evt.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (evt.changedTouches.length > 1) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let currImgIndex = parseInt(evt.target.id) || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { startX, startY, imgNum, left: rawLeft } = this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const endX = evt.changedTouches[0].pageX;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const endY = evt.changedTouches[0].pageY;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log('touchend', imgNum, startX, endX, startY, endY, rawLeft);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const swiperDirection = Math.abs(startX - endX) > Math.abs(startY - endY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ? (startX - endX > 0 ? 'left' : 'right')")]),s(`
`),n("span",{class:"line"},[n("span",null,"            : (startY - endY > 0 ? 'top' : 'bottom')")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (swiperDirection === 'left') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //")])])])]),n("p",null,"最后一张左拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            if (Math.abs(rawLeft) >= 100 * (imgNum - 1)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                left = rawLeft;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            left = rawLeft - 100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            currImgIndex++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (swiperDirection === 'right') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //")])])])]),n("p",null,"第一张往右拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            if (rawLeft === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            left = rawLeft + 100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            currImgIndex--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.setState({ left, currImgIndex });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { imgs, handleClick } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { left, currImgIndex } = this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <div className={styles.imgsViewer} onClick={handleClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        position: 'absolute',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        top: '50%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        left: `${left}vw`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        transition: 'all 0.5s ease-out 0s',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    ref={node => this.swiper = node}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    className={styles.imgsWrap}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    {imgs.map((imgUrl, index) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            <div key={index} className={styles.imgWrap}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                <img id={index} src={imgUrl} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    })}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        position: 'fixed',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        bottom: '20px',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        left: '50vw',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        transform: 'translate(-50%)',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        padding: 5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        zIndex: 99,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                >")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    {imgs.map((_, index) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            key={index}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            style={{")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                display: 'inline-block',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                width: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                height: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                background: '#ddd',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                borderRadius: '50%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                marginLeft: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                                boxShadow: currImgIndex === index ? '0 0 4px 2px #fff' : ''")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            }}></div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    ))}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,".imgsViewer {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    width          : 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    height         : 100vh;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    background     : #000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    overflow       : hidden;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    position       : relative;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    display        : flex;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    justify-content: center;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    align-items    : center;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .imgsWrap {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        transform: translateY(-50%);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        overflow : scroll;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        display  : flex;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    .imgWrap {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        width  : 100vw;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        display: inline-block;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        >img {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            display   : block;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            max-width : 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            max-height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=a(i,[["render",t]]);export{g as __pageData,m as default};
