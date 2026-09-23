import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"alloyFinger使用源码","description":"综合例子。","frontmatter":{"title":"alloyFinger使用源码","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"综合例子。","sidebarWeight":53,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实战/vue手势AlloyFinger用法/alloyFinger使用源码.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/alloyFinger使用源码.md","filePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/alloyFinger使用源码.md"}'),i={name:"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/alloyFinger使用源码.md"};function c(u,s,t,o,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"alloyfinger使用源码",tabindex:"-1"},[l("alloyFinger使用源码 "),n("a",{class:"header-anchor",href:"#alloyfinger使用源码","aria-label":'Permalink to "alloyFinger使用源码"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“alloyFinger使用源码”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<!DOCTYPE html>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<html>")]),l(`
`),n("span",{class:"line"},[n("span",null,'<head lang="en">')]),l(`
`),n("span",{class:"line"},[n("span",null,'    <meta charset="UTF-8">')]),l(`
`),n("span",{class:"line"},[n("span",null,"    <title>AlloyFinger</title>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"    <style>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        html,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        body {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            padding: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: #ccc;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-align: center;")]),l(`
`),n("span",{class:"line"},[n("span",null,'            font: 14px / 1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;')]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .header {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: #333;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 40px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            color: white;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-align: left;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-indent: 20px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-weight: bold;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-size: 20px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            line-height: 40px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .title {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 30px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            color: #333333;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-size: 20px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            line-height: 30px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .example img {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .imgBox {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin-bottom: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border-bottom: 1px solid #333333;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .swipeBox {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin: 0 auto;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            overflow: hidden;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-size: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: relative;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border: 2px solid #ccc;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            box-sizing: border-box;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .scroll {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 480px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            white-space: nowrap;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .nuclear-nav {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: absolute;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            bottom: 6px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            right: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .nuclear-nav a {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            display: inline-block;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: white;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            cursor: pointer;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -moz-border-radius: 5px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-border-radius: 5px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border-radius: 5px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin-right: 5px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border: 1px solid #808080;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .nuclear-nav a.active {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: #ffd800;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .longTapBox {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: relative;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin: 0 auto;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            overflow: hidden;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-user-drag: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-touch-callout: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            user-drag: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            touch-callout: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .longTapBox img {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            pointer-events: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .overlay2,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .overlay {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: rgba(70, 70, 70, 0.8);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: absolute;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            top: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            left: 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 160px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            display: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .overlay2 img,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .overlay img {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 40px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 40px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: absolute;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            top: 60px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            left: 60px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .pb6 {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            padding-bottom: 6px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .ribbon {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            top: 3.2em;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            right: -3.7em;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-transform: rotate(45deg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -moz-transform: rotate(45deg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -ms-transform: rotate(45deg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -o-transform: rotate(45deg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            transform: rotate(45deg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            color: #fff;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            display: block;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            padding: .6em 3.5em;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            position: fixed;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-align: center;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-decoration: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -moz-user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -ms-user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            user-select: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: green;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            z-index: 10000;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .btn {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            letter-spacing: 3px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            display: inline-block;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            color: white;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            width: 270px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 45px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-size: 24px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            line-height: 45px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            background-color: green;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -moz-border-radius: 2px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            -webkit-border-radius: 2px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            border-radius: 2px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            text-decoration: none;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .footer {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            height: 120px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .linkCanvasBox {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            margin-top: 10px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .linkCanvasBox .btn {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            font-size: 16px;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </style>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</head>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <a href="https://github.com/AlloyTeam/AlloyFinger" class="ribbon">Fork me on Github</a>')]),l(`
`),n("span",{class:"line"},[n("span",null,'    <div class="header">AlloyFinger</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'    <div class="example">')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">pinch</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <img id="pinchImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">rotate</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <img id="rotateImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">pinch+rotate</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <img id="pinchRotateImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">pressMove</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <img id="pressMoveImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">doubleTap</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <img id="doubleTapImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">swipe</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox pb6">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <div class="swipeBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                <div class="scroll" id="swipeScroll">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <img src="asset/test.png" /> <img src="asset/test2.png" /> <img src="asset/test3.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'                <div class="nuclear-nav">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <a data-index="0" class="active"></a>')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <a data-index="1" class=" "></a>')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <a data-index="2" class=" "></a>')]),l(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">longTap</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox pb6">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <div class=" longTapBox" id="longTapBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                <img id="longTapImg" src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,'                <div class="overlay" id="overlay">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <img src="asset/yes.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="title">tap</div>')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div class="imgBox pb6">')]),l(`
`),n("span",{class:"line"},[n("span",null,'            <div class=" longTapBox" id="tapBox">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                <img src="asset/test.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,'                <div class="overlay2" id="overlay2">')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    <img src="asset/yes.png" />')]),l(`
`),n("span",{class:"line"},[n("span",null,"                </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <div class="footer">')]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div> <a class="btn" href="http://alloyteam.github.io/AlloyFinger/example/picture/">')])])])]),n("p",null,"综合例子"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"→</a></div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,'    <script src="asset/transform.js"><\/script>')]),l(`
`),n("span",{class:"line"},[n("span",null,'    <script src="alloy_finger.js"><\/script>')]),l(`
`),n("span",{class:"line"},[n("span",null,'    <script src="asset/to.js"><\/script>')]),l(`
`),n("span",{class:"line"},[n("span",null,"    <script>")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var pinchImg = document.getElementById("pinchImg");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(pinchImg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var initScale = 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(pinchImg, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            multipointStart: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                initScale = pinchImg.scaleX;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            pinch: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                pinchImg.scaleX = pinchImg.scaleY = initScale * evt.zoom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var rotateImg = document.getElementById("rotateImg");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(rotateImg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(rotateImg, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            rotate: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                rotateImg.rotateZ += evt.angle;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var pinchRotateImg = document.getElementById("pinchRotateImg");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(pinchRotateImg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(pinchRotateImg, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            rotate: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                pinchRotateImg.rotateZ += evt.angle;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            multipointStart: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                initScale = pinchRotateImg.scaleX;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            pinch: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                pinchRotateImg.scaleX = pinchRotateImg.scaleY = initScale * evt.zoom;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var pressMoveImg = document.getElementById("pressMoveImg");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(pressMoveImg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(pressMoveImg, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            pressMove: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                pressMoveImg.translateX += evt.deltaX;")]),l(`
`),n("span",{class:"line"},[n("span",null,"                pressMoveImg.translateY += evt.deltaY;")]),l(`
`),n("span",{class:"line"},[n("span",null,"                evt.preventDefault();")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        function ease(x) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return Math.sqrt(1 - Math.pow(x - 1, 2));")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var doubleTapImg = document.getElementById("doubleTapImg");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(doubleTapImg);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(doubleTapImg, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            doubleTap: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                if (doubleTapImg.scaleX === 1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                    new To(doubleTapImg, "scaleX", 2, 500, ease);')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    new To(doubleTapImg, "scaleY", 2, 500, ease);')]),l(`
`),n("span",{class:"line"},[n("span",null,"                } else if (doubleTapImg.scaleX === 2) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                    new To(doubleTapImg, "scaleX", 1, 500, ease);')]),l(`
`),n("span",{class:"line"},[n("span",null,'                    new To(doubleTapImg, "scaleY", 1, 500, ease);')]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var swipeScroll = document.getElementById("swipeScroll"),')]),l(`
`),n("span",{class:"line"},[n("span",null,"            currentIndex = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(swipeScroll);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        function activeNav(index) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'            var items = document.querySelectorAll(".nuclear-nav a"),')]),l(`
`),n("span",{class:"line"},[n("span",null,"                i = 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"                len = items.length;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            for (; i < len; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                if (i === index) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                    items[i].classList.add("active");')]),l(`
`),n("span",{class:"line"},[n("span",null,"                } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                    items[i].classList.remove("active");')]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(swipeScroll, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            touchMove: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    evt.preventDefault();")]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            swipe: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                if (evt.direction === "Left") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"                    if (currentIndex < 2) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                        currentIndex++;")]),l(`
`),n("span",{class:"line"},[n("span",null,'                        new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function () {')]),l(`
`),n("span",{class:"line"},[n("span",null,"                            activeNav(currentIndex);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),l(`
`),n("span",{class:"line"},[n("span",null,'                } else if (evt.direction === "Right") {')]),l(`
`),n("span",{class:"line"},[n("span",null,"                    if (currentIndex > 0) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                        currentIndex--;")]),l(`
`),n("span",{class:"line"},[n("span",null,'                        new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function () {')]),l(`
`),n("span",{class:"line"},[n("span",null,"                            activeNav(currentIndex);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var longTapBox = document.getElementById("longTapBox");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(longTapBox);")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var overlay = document.getElementById("overlay");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(longTapBox, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            longTap: function (evt) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                evt.preventDefault();")]),l(`
`),n("span",{class:"line"},[n("span",null,"                toggleDom(overlay);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var tapBox = document.getElementById("tapBox");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        Transform(tapBox);")]),l(`
`),n("span",{class:"line"},[n("span",null,'        var overlay2 = document.getElementById("overlay2");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        new AlloyFinger(tapBox, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            tap: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                toggleDom(overlay2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            singleTap: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                console.log("singleTap")')]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            doubleTap: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                console.log("doubleTap")')]),l(`
`),n("span",{class:"line"},[n("span",null,"            },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            pointStart: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                console.log("pointStart")')]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        function toggleDom(dom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'            var displayValue = window.getComputedStyle(dom, null)["display"];')]),l(`
`),n("span",{class:"line"},[n("span",null,'            if (displayValue === "none") {')]),l(`
`),n("span",{class:"line"},[n("span",null,'                dom.style.display = "block";')]),l(`
`),n("span",{class:"line"},[n("span",null,"            } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,'                dom.style.display = "none";')]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    <\/script>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])])],-1)])])}const v=a(i,[["render",c]]);export{m as __pageData,v as default};
