import{_ as a,o as e,c as t,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"H5案例分享：移动端touch事件判断滑屏手势的方向 1","description":"移动端 touch 事件判断滑屏手势的方向 方法一 1. 当开始一个 touchstart 事件的时候，获取此刻手指的横坐标 startX 和纵坐标 startY ； 2. 当触发 touchmove 事件时，在获取此时手指的横坐标 moveEndX 和纵坐标 moveEndY。","frontmatter":{"title":"H5案例分享：移动端touch事件判断滑屏手势的方向 1","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"移动端 touch 事件判断滑屏手势的方向 方法一 1. 当开始一个 touchstart 事件的时候，获取此刻手指的横坐标 startX 和纵坐标 startY ； 2. 当触发 touchmove 事件时，在获取此时手指的横坐标 moveEndX 和纵坐标 moveEndY。","sidebarWeight":33,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/H5案例分享：移动端touch事件判断滑屏手势的方向 1.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/H5案例分享：移动端touch事件判断滑屏手势的方向 1.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/H5案例分享：移动端touch事件判断滑屏手势的方向 1.md"}'),p={name:"posts/JavaScript系统教程/04-浏览器与 Web API/H5案例分享：移动端touch事件判断滑屏手势的方向 1.md"};function i(c,s,u,o,d,h){return e(),t("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"h5案例分享-移动端touch事件判断滑屏手势的方向-1",tabindex:"-1"},[n("H5案例分享：移动端touch事件判断滑屏手势的方向 1 "),l("a",{class:"header-anchor",href:"#h5案例分享-移动端touch事件判断滑屏手势的方向-1","aria-label":'Permalink to "H5案例分享：移动端touch事件判断滑屏手势的方向 1"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“H5案例分享：移动端touch事件判断滑屏手势的方向 1”的核心思路，并能把它用于实际开发或面试表达。")]),l("blockquote",null,[l("p",null,[n("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 移动端"),l("code",null,"touch"),n("事件判断滑屏手势的方向 "),l("strong",null,"方法一")])]),l("ol",null,[l("li",null,[n("当开始一个"),l("code",null,"touchstart"),n("事件的时候，获取此刻手指的横坐标"),l("code",null,"startX"),n("和纵坐标"),l("code",null,"startY"),n("；")]),l("li",null,[n("当触发"),l("code",null,"touchmove"),n("事件时，在获取此时手指的横坐标"),l("code",null,"moveEndX"),n("和纵坐标"),l("code",null,"moveEndY;"),n("最后，通过这两次获取的坐标差值来判断手指在手机屏幕上的滑动方向。")])]),l("p",null,[l("strong",null,"思路"),n("：用"),l("code",null,"touchmove"),n("的最后坐标减去"),l("code",null,"touchstart"),n("的起始坐标，"),l("code",null,"X"),n("的结果如果正数，则说明手指是从左往右划动；"),l("code",null,"X"),n("的结果如果负数，则说明手指是从右往左划动；"),l("code",null,"Y"),n("的结果如果正数，则说明手指是从上往下划动；"),l("code",null,"Y"),n("的结果如果负数，则说明手指是从下往上划动。 "),l("strong",null,"具体代码如下"),n("：")]),l("p",null,"[](javascript:void(0)😉"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var mybody = document.getElementsByTagName('body')[0];")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,"滑动处理"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var startX, startY, moveEndX, moveEndY, X, Y;")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchstart', function(e) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"e.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"startX = e.touches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"startY = e.touches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"});")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchmove', function(e) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"e.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"moveEndX = e.changedTouches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"moveEndY = e.changedTouches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"X = moveEndX - startX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"Y = moveEndY - startY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"if ( X > 0 ) {alert(")])])])]),l("p",null,"‘向右’"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,");}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( X < 0 ) {alert(")])])])]),l("p",null,"‘向左’"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,");}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( Y > 0) {alert(")])])])]),l("p",null,"‘向下’"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,");}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( Y < 0 ) { alert(")])])])]),l("p",null,"‘向上’"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,");}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else{alert(")])])])]),l("p",null,"‘没滑动’"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"); }")]),n(`
`),l("span",{class:"line"},[l("span",null,"});")])])])]),l("p",null,"[](javascript:void(0)😉"),l("p",null,[l("strong",null,"然而在实际的操作中，手指的上下滑动很难做到直上直下，只要稍微有点斜，只要稍微有点斜，就会被"),l("code",null,"X"),l("strong",null,"轴的判断先行接管，而与我们实际的操作意愿相背离"),n("。此时就需要添加特殊的判断技巧，"),l("strong",null,"修改代码如下"),n("：")]),l("p",null,"[](javascript:void(0)😉"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var mybody = document.getElementsByTagName('body')[0];")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,"滑动处理"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var startX, startY, moveEndX, moveEndY, X, Y;")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchstart', function(e) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"e.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"startX = e.touches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"startY = e.touches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}, false);")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchmove', function(e) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"e.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"moveEndX = e.changedTouches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"moveEndY = e.changedTouches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"X = moveEndX - startX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"Y = moveEndY - startY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向右"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向左"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向下"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向上"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"else{")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"没滑动"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"});")])])])]),l("p",null,"[](javascript:void(0)😉"),l("p",null,[n("以上代码，在测试时仍不能达到预期的效果，因为还有一个问题——"),l("code",null,"body"),l("strong",null,"的元素的高仔细查查，发现其值是"),l("code",null,"0"),n("； 故还应该在此基础上"),l("strong",null,"添加以下代码"),n("：")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var mybody = document.getElementsByTagName('body')[0];")]),n(`
`),l("span",{class:"line"},[l("span",null,"var h = document.documentElement.clientHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.style.height = h + 'px';")])])])]),l("p",null,[n("到此，已实现了手机移动端手指的上滑、下滑、左滑和右滑操作。 "),l("strong",null,"方法二"),l("code",null,"1"),n("、滑动屏幕事件使用"),l("code",null,"HTML5"),n("中的"),l("code",null,"touchstart"),n("滑动开始事件和"),l("code",null,"touchmove"),n("滑动结束事件。 "),l("code",null,"2"),n("、方向的判断：以起点做平面坐标系，与终点连线做直线，直线与"),l("code",null,"x"),n("正半轴计算角度；我们以"),l("code",null,"45"),n("度角为方向分割线，如：只要滑动角度大于等于"),l("code",null,"45"),n("度且小于"),l("code",null,"135"),n("度，则判断它方向为向上滑。如图所示： "),l("code",null,"3"),n("、使用"),l("code",null,"Math.atan2"),n("来计算起点与终点形成的直线角度。 注意：标准坐标系与屏幕坐标系并不相同，在屏幕坐标系中，上半轴为负值，要实现转换，只需要调换"),l("code",null,"Y"),n("坐标起点与终于位置即可。 代码如下：")]),l("p",null,"[](javascript:void(0)😉"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var h = document.documentElement.clientHeight,")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody = document.getElementsByTagName('body')[0];")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.style.height = h + 'px';")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,"返回角度"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"function GetSlideAngle(dx,dy) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"return Math.atan2(dy,dx) * 180 / Math.PI;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,[n("根据起点和终点返回方向 "),l("code",null,"1"),n("：向上，"),l("code",null,"2"),n("：向下，"),l("code",null,"3"),n("：向左，"),l("code",null,"4"),n("：向右"),l("code",null,",0"),n("：未滑动")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"function GetSlideDirection(startX,startY, endX, endY) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"var dy = startY - endY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"var dx = endX - startX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"var result = 0;")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,"如果滑动距离太短"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"return result;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"var angle = GetSlideAngle(dx, dy);")]),n(`
`),l("span",{class:"line"},[l("span",null,"if (angle >= -45 && angle < 45) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"result = 4;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}else if (angle >= 45 && angle < 135) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"result = 1;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}else if (angle >= -135 && angle < -45) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"result = 2;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"result = 3;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"return result;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,"滑动处理"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"var startX, startY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchstart', function (ev){")]),n(`
`),l("span",{class:"line"},[l("span",null,"ev.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"startX = ev.touches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"startY = ev.touches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}, false);")]),n(`
`),l("span",{class:"line"},[l("span",null,"mybody.addEventListener('touchmove', function (ev){")]),n(`
`),l("span",{class:"line"},[l("span",null,"var endX, endY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"ev.preventDefault();")]),n(`
`),l("span",{class:"line"},[l("span",null,"endX = ev.changedTouches[0].pageX;")]),n(`
`),l("span",{class:"line"},[l("span",null,"endY = ev.changedTouches[0].pageY;")]),n(`
`),l("span",{class:"line"},[l("span",null,"var direction = GetSlideDirection(startX, startY, endX, endY);")]),n(`
`),l("span",{class:"line"},[l("span",null,"switch (direction){")]),n(`
`),l("span",{class:"line"},[l("span",null,"case 0:")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"没滑动"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"break;")]),n(`
`),l("span",{class:"line"},[l("span",null,"case 1:")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向上"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"break;")]),n(`
`),l("span",{class:"line"},[l("span",null,"case 2:")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向下"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"break;")]),n(`
`),l("span",{class:"line"},[l("span",null,"case 3:")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向左"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"break;")]),n(`
`),l("span",{class:"line"},[l("span",null,"case 4:")]),n(`
`),l("span",{class:"line"},[l("span",null,'alert("')])])])]),l("p",null,"向右"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'");')]),n(`
`),l("span",{class:"line"},[l("span",null,"break;")]),n(`
`),l("span",{class:"line"},[l("span",null,"default:")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"}, false);")])])])]),l("p",null,"[](javascript:void(0)😉"),l("p",null,[l("code",null,"PS"),n("："),l("strong",null,"用"),l("code",null,"touchmove"),l("strong",null,"事件获取终点坐标，而不是用"),l("code",null,"touchend"),l("strong",null,"事件，是因为当你只是点击屏幕的时候，就会触发"),l("code",null,"touchEnd"),l("strong",null,"事件，但是不会触发"),l("code",null,"touchMove"),l("strong",null,"事件。这样会造成"),l("code",null,"touchEnd"),l("strong",null,"中取得的"),l("code",null,"endX"),l("strong",null,"，从而造成"),l("code",null,"endY"),l("strong",null,"值不准确。比如先滑动再点击，可能同样会触发滑动事件"),n("。 "),l("strong",null,"另外此代码只是提供了判断滑屏方向的思路，还需要根据具体的项目需求进行修改完善！"),l("strong",null,"转自："),l("code",null,"https://www.cnblogs.com/yangmengsheng/p/5973487.html"),n(" > 来自")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," <https://www.cnblogs.com/sky6699/p/11091067.html>")])])])])],-1)])])}const v=a(p,[["render",i]]);export{g as __pageData,v as default};
