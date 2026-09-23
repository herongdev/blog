import{_ as s,o as e,c as o,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"location 对象","description":"location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document。","frontmatter":{"title":"location 对象","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document。","sidebarWeight":4,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/BOM/location 对象/location 对象.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/location 对象/location 对象.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/location 对象/location 对象.md"}'),t={name:"posts/JavaScript系统教程/04-浏览器与 Web API/location 对象/location 对象.md"};function i(c,a,p,u,r,d){return e(),o("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"location-对象",tabindex:"-1"},[l("location 对象 "),n("a",{class:"header-anchor",href:"#location-对象","aria-label":'Permalink to "location 对象"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“location 对象”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document .location引用的是同一个对象。")]),n("p",null,"location对象的作用不只表现在它保存着当前文档的信息，还表现在它将URL解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。下表列出了location对象的所有属性(注：省略了每个属性前面的location前缀）"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"査询字符串参数")]),l(`
`),n("span",{class:"line"},[n("span",null,"虽然通过上面的属性可以访问到location对象的大多数信息，但其中访问URL包含的査询字符")]),l(`
`),n("span",{class:"line"},[n("span",null,"串的属性并不方便。location.search返回从问号到URL末尾的所有内容，但却没有办法逐个")]),l(`
`),n("span",{class:"line"},[n("span",null,"访何其中的每个査询字符串参数。为此，可以像下面这样创建一个函数，用以解析査询字符串，然后返回包含所有参数的一个对象：")]),l(`
`),n("span",{class:"line"},[n("span",null,"function getQueryStringArgs() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 取得查询字符串并去掉开头的问号")]),l(`
`),n("span",{class:"line"},[n("span",null,'    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),')]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 保存数据对象")]),l(`
`),n("span",{class:"line"},[n("span",null,"        args = {},")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 取得每一项")]),l(`
`),n("span",{class:"line"},[n("span",null,'        items = qs.length ? qs.split("&") : [],')]),l(`
`),n("span",{class:"line"},[n("span",null,"        item = null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        name = null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        value = null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 在 for循环中使用")]),l(`
`),n("span",{class:"line"},[n("span",null,"        i = 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        len = items.length;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 逐个将每一项加到args对象中")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (i = 0; i < len; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'        item = items[i].split("=");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        name = decodeURIComponent(item[0]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        value = decodeURIComponent(item[1]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (name.length) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            args[name] = value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return args;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=s(t,[["render",i]]);export{g as __pageData,h as default};
