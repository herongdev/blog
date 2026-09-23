import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"原生手势控制 1","description":"思路： 1. 先创建自定义的手势事件 手势开始 手势变化，缩放，旋转等 手势结束 滑动 双击 点击 3. 再给对象绑定原生事件处理方法，当这些原生事件发生时，处理方法中主要是根据touches属性来区分手势，然后保存一些关键数据到自定义事件中，并触发dispatch相应的手势事件。","frontmatter":{"title":"原生手势控制 1","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"思路： 1. 先创建自定义的手势事件 手势开始 手势变化，缩放，旋转等 手势结束 滑动 双击 点击 3. 再给对象绑定原生事件处理方法，当这些原生事件发生时，处理方法中主要是根据touches属性来区分手势，然后保存一些关键数据到自定义事件中，并触发dispatch相应的手势事件。","sidebarWeight":56,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/原生手势控制 1.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/原生手势控制 1.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/原生手势控制 1.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/原生手势控制 1.md"};function t(c,l,u,o,d,g){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"原生手势控制-1",tabindex:"-1"},[s("原生手势控制 1 "),n("a",{class:"header-anchor",href:"#原生手势控制-1","aria-label":'Permalink to "原生手势控制 1"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“原生手势控制 1”的核心思路，并能把它用于实际开发或面试表达。 思路：")]),n("ol",null,[n("li",null,"先创建自定义的手势事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let gesturestart = new CustomEvent('gesturestart'); //")])])])]),n("p",null,"手势开始"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let gesturechange = new CustomEvent('gesturechange'); //")])])])]),n("p",null,"手势变化，缩放，旋转等"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let gestureend = new CustomEvent('gestureend'); //")])])])]),n("p",null,"手势结束"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let swipeMove = new CustomEvent('swipemove'); //")])])])]),n("p",null,"滑动"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let doubleTouch = new CustomEvent('doubletouch'); //")])])])]),n("p",null,"双击"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let oneTouch = new CustomEvent('onetouch'); //")])])])]),n("p",null,"点击"),n("ol",{start:"3"},[n("li",null,"再给对象绑定原生事件处理方法，当这些原生事件发生时，处理方法中主要是根据touches属性来区分手势，然后保存一些关键数据到自定义事件中，并触发dispatch相应的手势事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"this.imgRef.addEventListener('touchstart', handleTouchStart, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.imgRef.addEventListener('touchmove', handleTouchMove, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.imgRef.addEventListener('touchend', handleTouchEnd, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.imgRef.addEventListener('touchcancel', handleTouchCancel, false);")])])])]),n("ol",{start:"5"},[n("li",null,"再调用一个方法，让事件对象监听我们的自定义手势事件，这些手势事件会触发一个统一的手势处事件处理方法，主要根据event.type来进行相应的业务逻辑操作")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"previewImgs = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('gestureStart', gestureFun, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('gesturechange', gestureFun, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('gestureEnd', gestureFun, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('swipemove', gestureFun, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('doubletouch', gestureFun, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.imgRef.addEventListener('onetouch', gestureFun, false);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," function gestureFun(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            let currImgIndex = parseInt(e.target.id) || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const { startX, startY, imgNum, left: rawLeft } = this.state;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            let left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            switch (e.type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'                case "gesturestart":')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'                case "gesturechange":')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'                case "swipemove":')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    if (e.direction === 'left') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //")])])])]),n("p",null,"最后一张左拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                        if (Math.abs(rawLeft) >= 100 * (imgNum - 1)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            left = rawLeft;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        left = rawLeft - 100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        currImgIndex++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    if (e.direction === 'right') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        //")])])])]),n("p",null,"第一张右拉的情况"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                        if (rawLeft === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            left = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                            return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        left = rawLeft + 100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        currImgIndex--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    this.setState({ left, currImgIndex });")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                default:")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("p",null,[n("code",null,"}")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<!DOCTYPE html>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<html>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<head>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<title>Parcel Sandbox</title>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<meta charset="UTF-8" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"<style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"body {")]),s(`
`),n("span",{class:"line"},[n("span",null,"position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"margin: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"text-align: center;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,".img1 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"width: 60%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"margin: auto;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,".bgM {")]),s(`
`),n("span",{class:"line"},[n("span",null,"width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"height: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"top: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"left: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"right: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"bottom: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"z-index: 1000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"background-color: rgba(0, 0, 0, 0.85);")]),s(`
`),n("span",{class:"line"},[n("span",null,"overflow: hidden;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,".bgM img {")]),s(`
`),n("span",{class:"line"},[n("span",null,"width: 100%;")]),s(`
`),n("span",{class:"line"},[n("span",null,"position: absolute;")]),s(`
`),n("span",{class:"line"},[n("span",null,"top: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"left: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"right: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"bottom: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"z-index: 1001;")]),s(`
`),n("span",{class:"line"},[n("span",null,"margin: auto;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"</style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</head>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<h4>")])])])]),n("p",null,"点击图片预览"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"</h4>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<img")]),s(`
`),n("span",{class:"line"},[n("span",null,'class="img1 preview"')]),s(`
`),n("span",{class:"line"},[n("span",null,'src="http://lc-yee5xnhu.cn-n1.lcfile.com/56ac839df83d3bcdc63b.jpg"')]),s(`
`),n("span",{class:"line"},[n("span",null,'alt=""')]),s(`
`),n("span",{class:"line"},[n("span",null,"/>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"window.onload = function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"点击图片进入预览")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'var $Dom = document.querySelector(".preview");')]),s(`
`),n("span",{class:"line"},[n("span",null,"$Dom.onclick = function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var temp = this.src;")]),s(`
`),n("span",{class:"line"},[n("span",null,'var objE = document.createElement("div");')]),s(`
`),n("span",{class:"line"},[n("span",null,"objE.innerHTML =")]),s(`
`),n("span",{class:"line"},[n("span",null,`'<div class="bgM" >' +`)]),s(`
`),n("span",{class:"line"},[n("span",null,`'<img src="' +`)]),s(`
`),n("span",{class:"line"},[n("span",null,"temp +")]),s(`
`),n("span",{class:"line"},[n("span",null,`'" id="img_scan" class="img-custom-img2"/>' +`)]),s(`
`),n("span",{class:"line"},[n("span",null,'"</div>";')]),s(`
`),n("span",{class:"line"},[n("span",null,"document.body.appendChild(objE.children[0]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"退出图片预览事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'var $bg = document.querySelector(".bgM");')]),s(`
`),n("span",{class:"line"},[n("span",null,"$bg.onclick = function(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"event.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,'var dm = document.querySelector(".bgM");')]),s(`
`),n("span",{class:"line"},[n("span",null,"document.body.removeChild(dm);")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'// var $img = document.querySelector(".img-custom-img2");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// $img.onclick = function(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// debugger")]),s(`
`),n("span",{class:"line"},[n("span",null,"// event.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// };")]),s(`
`),n("span",{class:"line"},[n("span",null,"createEvent(); //")])])])]),n("p",null,[n("em",null,"自定义事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"previewImg(); //")])])])]),n("p",null,[n("em",null,"图片预览事件监听")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")])])])]),n("p",null,[n("em",null,"自定义移动端手势事件"),n("code",null,"*"),s(),n("em",null,"事件："),n("code",null,"* - gesturestart"),s(),n("em",null,"手势事件开始"),n("code",null,"* - gesturechange"),s(),n("em",null,"手势缩放"),n("code",null,"* - gestureend"),s(),n("em",null,"手势事件结束"),n("code",null,"* - swipeMove"),s(),n("em",null,"单指滑动"),n("code",null,"* - doubleTouch"),s(),n("em",null,"双击"),n("code",null,"* - oneTouch"),s(),n("em",null,"单击")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"var createEvent = function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'var $bm = document.querySelector(".bgM");')]),s(`
`),n("span",{class:"line"},[n("span",null,"var isTouch = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var isDoubleTouch = false; //")])])])]),n("p",null,[n("em",null,"是否为多触点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var start = []; //")])])])]),n("p",null,[n("em",null,"存放触点坐标")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var now, delta; //")])])])]),n("p",null,[n("em",null,"当前时间，两次触发事件时间差")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var timer = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var startPosition, movePosition, endPosition; //")])])])]),n("p",null,[n("em",null,"滑动起点，移动，结束点坐标"),n("code",null,"//"),n("em",null,"事件声明")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'var gesturestart = new CustomEvent("gesturestart");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var gesturechange = new CustomEvent("gesturechange");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var gestureend = new CustomEvent("gestureend");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var swipeMove = new CustomEvent("swipeMove");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var doubleTouch = new CustomEvent("doubleTouch");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var oneTouch = new CustomEvent("oneTouch");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"监听"),n("code",null,"touchstart"),n("em",null,"事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"$bm.addEventListener(")]),s(`
`),n("span",{class:"line"},[n("span",null,'"touchstart",')]),s(`
`),n("span",{class:"line"},[n("span",null,"function(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//e.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (e.touches.length >= 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"判断是否有两个点在屏幕上")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"isDoubleTouch = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"start = e.touches; //")])])])]),n("p",null,[n("em",null,"得到第一组两个点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var screenMinPoint = getMidpoint(start[0], start[1]); //")])])])]),n("p",null,[n("em",null,"获取两个触点中心坐标")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"gesturestart.midPoint = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"screenMinPoint[0] - e.target.offsetLeft,")]),s(`
`),n("span",{class:"line"},[n("span",null,"screenMinPoint[1] - e.target.offsetTop")]),s(`
`),n("span",{class:"line"},[n("span",null,"]; //")])])])]),n("p",null,[n("em",null,"获取中心点坐标相对目标元素坐标")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(gesturestart);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"delta = Date.now() - now; //")])])])]),n("p",null,[n("em",null,"计算两次点击时间差")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"now = Date.now();")]),s(`
`),n("span",{class:"line"},[n("span",null,"startPosition = [e.touches[0].pageX, e.touches[0].pageY];")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (delta > 0 && delta <= 250) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"双击事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"clearTimeout(timer);")]),s(`
`),n("span",{class:"line"},[n("span",null,"doubleTouch.position = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.touches[0].pageX - e.target.offsetLeft,")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.touches[0].pageY - e.target.offsetTop")]),s(`
`),n("span",{class:"line"},[n("span",null,"];")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(doubleTouch);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"滑动事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"timer = setTimeout(function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(oneTouch); //")])])])]),n("p",null,[n("em",null,"单击事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"}, 450);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"isTouch = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"},")]),s(`
`),n("span",{class:"line"},[n("span",null,"false")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"监听"),n("code",null,"touchmove"),n("em",null,"事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"$bm.addEventListener(")]),s(`
`),n("span",{class:"line"},[n("span",null,'"touchmove",')]),s(`
`),n("span",{class:"line"},[n("span",null,"function(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//e.preventDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"clearTimeout(timer);")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (e.touches.length >= 2 && isDoubleTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"手势事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var now = e.touches; //")])])])]),n("p",null,[n("em",null,"得到第二组两个点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var scale =")]),s(`
`),n("span",{class:"line"},[n("span",null,"getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //")])])])]),n("p",null,[n("em",null,"得到缩放比例")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var rotation =")]),s(`
`),n("span",{class:"line"},[n("span",null,"getAngle(now[0], now[1]) - getAngle(start[0], start[1]); //")])])])]),n("p",null,[n("em",null,"得到旋转角度差")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"gesturechange.scale = scale.toFixed(2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"gesturechange.rotation = rotation.toFixed(2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(gesturechange);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else if (isTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition = [e.touches[0].pageX, e.touches[0].pageY];")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(")]),s(`
`),n("span",{class:"line"},[n("span",null,'"touches:",')]),s(`
`),n("span",{class:"line"},[n("span",null,"e.touches,")]),s(`
`),n("span",{class:"line"},[n("span",null,'"start:",')]),s(`
`),n("span",{class:"line"},[n("span",null,"startPosition,")]),s(`
`),n("span",{class:"line"},[n("span",null,'"movePostion:",')]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"endPosition = movePosition;")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition[0] - startPosition[0],")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition[1] - startPosition[1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"];")]),s(`
`),n("span",{class:"line"},[n("span",null,"startPosition = [e.touches[0].pageX, e.touches[0].pageY];")]),s(`
`),n("span",{class:"line"},[n("span",null,"swipeMove.distance = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition[0].toFixed(2),")]),s(`
`),n("span",{class:"line"},[n("span",null,"movePosition[1].toFixed(2)")]),s(`
`),n("span",{class:"line"},[n("span",null,"];")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(swipeMove);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"},")]),s(`
`),n("span",{class:"line"},[n("span",null,"false")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"监听"),n("code",null,"touchend"),n("em",null,"事件")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"$bm.addEventListener(")]),s(`
`),n("span",{class:"line"},[n("span",null,'"touchend",')]),s(`
`),n("span",{class:"line"},[n("span",null,"function(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (isDoubleTouch) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"isDoubleTouch = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"gestureend.position = endPosition;")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.target.dispatchEvent(gestureend);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"},")]),s(`
`),n("span",{class:"line"},[n("span",null,"false")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")])])])]),n("p",null,[n("em",null,"两点的距离")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getDistance(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var x = p2.pageX - p1.pageX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"y = p2.pageY - p1.pageY;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return Math.sqrt(x * x + y * y);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")])])])]),n("p",null,[n("em",null,"两点的夹角")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getAngle(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var x = p1.pageX - p2.pageX,")]),s(`
`),n("span",{class:"line"},[n("span",null,"y = p1.pageY - p2.pageY;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return (Math.atan2(y, x) * 180) / Math.PI;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")])])])]),n("p",null,[n("em",null,"获取中点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getMidpoint(p1, p2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var x = (p1.pageX + p2.pageX) / 2,")]),s(`
`),n("span",{class:"line"},[n("span",null,"y = (p1.pageY + p2.pageY) / 2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return [x, y];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")])])])]),n("p",null,[n("em",null,"事件处理")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"var previewImg = function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'var $imgs = document.querySelector("#img_scan");')]),s(`
`),n("span",{class:"line"},[n("span",null,"var clientWidth = document.body.clientWidth; //")])])])]),n("p",null,[n("em",null,"窗口宽")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var clientHeight = document.body.clientHeight; //")])])])]),n("p",null,[n("em",null,"窗口高")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var imgWidth = parseInt(window.getComputedStyle($imgs).width); //")])])])]),n("p",null,[n("em",null,"图片宽")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var imgHeight = parseInt(window.getComputedStyle($imgs).height); //")])])])]),n("p",null,[n("em",null,"图片高")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("gesturestart", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("gesturechange", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("gestureend", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("swipeMove", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("doubleTouch", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.addEventListener("oneTouch", gesturef, false);')]),s(`
`),n("span",{class:"line"},[n("span",null,"var tMatrix = [1, 0, 0, 1, 0, 0]; //x")])])])]),n("p",null,[n("em",null,"缩放，无，无，"),n("code",null,"y"),n("em",null,"缩放，"),n("code",null,"x"),n("em",null,"平移，"),n("code",null,"y"),n("em",null,"平移")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var originLast,")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeLeft,")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeRight,")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeTop,")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeBottom; //")])])])]),n("p",null,[n("em",null,"上下左右可拖动距离")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function maxMove() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"最大可拖动范围")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var sca = tMatrix[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeLeft = Math.abs(sca - 1) * originLast[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeRight = Math.abs(sca - 1) * (imgWidth - originLast[0]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeTop = Math.abs(sca - 1) * originLast[1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"maxSwipeBottom = Math.abs(sca - 1) * (imgHeight - originLast[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function gesturef(event) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"switch (event.type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "gesturestart":')]),s(`
`),n("span",{class:"line"},[n("span",null,"var x = event.midPoint[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"var y = event.midPoint[1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"originLast = event.midPoint;")]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.style.transformOrigin = x + "px " + y + "px";')]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "gesturechange":')]),s(`
`),n("span",{class:"line"},[n("span",null,"var sc = parseFloat(event.scale);")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[0] =")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[0] + sc - 1 > 0.5 && tMatrix[0] + sc - 1 < 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"? tMatrix[0] + sc - 1")]),s(`
`),n("span",{class:"line"},[n("span",null,": tMatrix[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[3] =")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[3] + sc - 1 > 0.5 && tMatrix[3] + sc - 1 < 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"? tMatrix[3] + sc - 1")]),s(`
`),n("span",{class:"line"},[n("span",null,": tMatrix[3];")]),s(`
`),n("span",{class:"line"},[n("span",null,'var temp = tMatrix.join(",");')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.style.transform = "matrix(" + temp + ")";')]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "gestureend":')]),s(`
`),n("span",{class:"line"},[n("span",null,"maxMove();")]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "swipeMove":')]),s(`
`),n("span",{class:"line"},[n("span",null,"if (")]),s(`
`),n("span",{class:"line"},[n("span",null,"!maxSwipeLeft ||")]),s(`
`),n("span",{class:"line"},[n("span",null,"!maxSwipeRight ||")]),s(`
`),n("span",{class:"line"},[n("span",null,"!maxSwipeTop ||")]),s(`
`),n("span",{class:"line"},[n("span",null,"!maxSwipeBottom")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (event.distance[0] > 0 && maxSwipeLeft < tMatrix[4]) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (event.distance[0] < 0 && maxSwipeRight < -tMatrix[4]) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (event.distance[1] > 0 && maxSwipeTop < tMatrix[5]) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (event.distance[1] < 0 && maxSwipeBottom < -tMatrix[5]) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[4] = tMatrix[4] + parseInt(event.distance[0]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[5] = tMatrix[5] + parseInt(event.distance[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,'var temp = tMatrix.join(",");')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.style.transform = "matrix(" + temp + ")";')]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "doubleTouch":')]),s(`
`),n("span",{class:"line"},[n("span",null,"originLast = event.position;")]),s(`
`),n("span",{class:"line"},[n("span",null,"$imgs.style.transformOrigin =")]),s(`
`),n("span",{class:"line"},[n("span",null,'event.position[0] + "px " + event.position[1] + "px";')]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[0] = 2; //")])])])]),n("p",null,[n("em",null,"缩放倍数为")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"2")]),s(`
`),n("span",{class:"line"},[n("span",null,"tMatrix[3] = 2;")]),s(`
`),n("span",{class:"line"},[n("span",null,'var temp = tMatrix.join(",");')]),s(`
`),n("span",{class:"line"},[n("span",null,'$imgs.style.transform = "matrix(" + temp + ")";')]),s(`
`),n("span",{class:"line"},[n("span",null,"maxMove();")]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "oneTouch":')]),s(`
`),n("span",{class:"line"},[n("span",null,'var $bg = document.querySelector(".bgM");')]),s(`
`),n("span",{class:"line"},[n("span",null,"document.body.removeChild($bg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])])],-1)])])}const v=a(i,[["render",t]]);export{r as __pageData,v as default};
