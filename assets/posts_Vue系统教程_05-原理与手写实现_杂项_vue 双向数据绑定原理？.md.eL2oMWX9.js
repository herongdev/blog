import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"vue 双向数据绑定原理？","description":"\\\\ 来自。","frontmatter":{"title":"vue 双向数据绑定原理？","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"\\\\ 来自。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理/杂项/vue 双向数据绑定原理？.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/杂项/vue 双向数据绑定原理？.md","filePath":"posts/Vue系统教程/05-原理与手写实现/杂项/vue 双向数据绑定原理？.md"}'),p={name:"posts/Vue系统教程/05-原理与手写实现/杂项/vue 双向数据绑定原理？.md"};function i(u,s,o,c,d,r){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"vue-双向数据绑定原理",tabindex:"-1"},[e("vue 双向数据绑定原理？ "),n("a",{class:"header-anchor",href:"#vue-双向数据绑定原理","aria-label":'Permalink to "vue 双向数据绑定原理？"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“vue 双向数据绑定原理？”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==vue== ==通过使用双向数据绑定，来实现了== ==View== ==和== ==Model== ==的同步更新。====vue== ==的双向数据绑定主要是通过使用数据劫持和发布订阅者模式来实现的。======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==首先我们通过== ==Object.defineProperty()== ==方法来对== ==Model== ==数据各个属性添加访问器属性，以此来实现数据的劫持，因此当== ==Model== ==中的数据发生变化的时候，我们可以通过配置的== ==setter== ==和== ==getter== ==方法来实现对== ==View== ==层数据更新的通知。======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==数据在== ==html== ==模板中一共有两种绑定情况，一种是使用== ==v-model== ==来对== ==value== ==值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==如果遇到元素节点，并且属性值包含== ==v-model== ==的话，我们就从== ==Model== ==中去获取== ==v-model== ==所对应的属性的值，并赋值给元素的====value====值。然后给这个元素设置一个监听事件，当== ==View== ==中元素的数据发生变化的时候触发该事件，通知== ==Model== ==中的对应的属性的值进行更新。======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==如果遇到了绑定的文本节点，我们使用== ==Model== ==中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当== ==Model== ==层数据发生改变的时候，====Model== ==作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==详细资料可以参考：== ==《====Vue.js== ==双向绑定的实现原理》==")]),e(`
`),n("span",{class:"line"},[n("span",null,"**js实现简单的双向绑定**")]),e(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),e(`
`),n("span",{class:"line"},[n("span",null,'    <div id="app">')]),e(`
`),n("span",{class:"line"},[n("span",null,'    <input type="text" id="txt">')]),e(`
`),n("span",{class:"line"},[n("span",null,'    <p id="show"></p>')]),e(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),e(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),e(`
`),n("span",{class:"line"},[n("span",null,'<script type="text/javascript">')]),e(`
`),n("span",{class:"line"},[n("span",null,"var obj = {};")]),e(`
`),n("span",{class:"line"},[n("span",null,'Object.defineProperty(obj, "txt", {')]),e(`
`),n("span",{class:"line"},[n("span",null,"  get: function () {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return obj;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  },")]),e(`
`),n("span",{class:"line"},[n("span",null,"  set: function (newValue) {")]),e(`
`),n("span",{class:"line"},[n("span",null,'    document.getElementById("txt").value = newValue;')]),e(`
`),n("span",{class:"line"},[n("span",null,'    document.getElementById("show").innerHTML = newValue;')]),e(`
`),n("span",{class:"line"},[n("span",null,"  },")]),e(`
`),n("span",{class:"line"},[n("span",null,"});")]),e(`
`),n("span",{class:"line"},[n("span",null,'document.addEventListener("keyup", function (e) {')]),e(`
`),n("span",{class:"line"},[n("span",null,"  obj.txt = e.target.value;")]),e(`
`),n("span",{class:"line"},[n("span",null,"});")]),e(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md>")])])])])],-1)])])}const m=l(p,[["render",i]]);export{h as __pageData,m as default};
