import{_ as l,o as i,c as e,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const y=JSON.parse('{"title":"histoiy 对象","description":"history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL,不过，借。","frontmatter":{"title":"histoiy 对象","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL,不过，借。","sidebarWeight":3,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/BOM/histoiy 对象.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/histoiy 对象.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/histoiy 对象.md"}'),t={name:"posts/JavaScript系统教程/04-浏览器与 Web API/histoiy 对象.md"};function o(p,a,r,c,h,d){return i(),e("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"histoiy-对象",tabindex:"-1"},[n("histoiy 对象 "),s("a",{class:"header-anchor",href:"#histoiy-对象","aria-label":'Permalink to "histoiy 对象"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“histoiy 对象”的核心思路，并能把它用于实际开发或面试表达。 history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL,不过，借由用户访何过的页面列表，同样可以在不知道实际URL的情况下实现后退和前进。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"使用go()方法可以在用户的历史记录中任意跳转，可以向后也可以向前。这个方法接受一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似于单击浏览器的“后退”按钮)，正数表示向前跳转(类似于单击浏览器的噴进”按钮E来看下面的例子。")]),n(`
`),s("span",{class:"line"},[s("span",null,"//后退一页")]),n(`
`),s("span",{class:"line"},[s("span",null,"history.go(-1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"history.go(1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"history.go(2);")]),n(`
`),s("span",{class:"line"},[s("span",null,"也可以给go()方法传递一个字符串参数，此时浏览器会跳转到历史记录中包含该字符串的第一")]),n(`
`),s("span",{class:"line"},[s("span",null,"位置一可能后退，也可能前进，具体要看那个位置最近。如果历史记录中不包含该字符串，那么这个方法什么也不做，例如：")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 跳转到最近的wrox.com")]),n(`
`),s("span",{class:"line"},[s("span",null,'history.go("wrox.com");')]),n(`
`),s("span",{class:"line"},[s("span",null,"// 跳转到最近的 nczonline.net页面")]),n(`
`),s("span",{class:"line"},[s("span",null,'history.go("nczonline.net");')]),n(`
`),s("span",{class:"line"},[s("span",null,"另外，还可以使用两个简写方法back()和forward()。来代替go()顾名思义，这两个方法可以")]),n(`
`),s("span",{class:"line"},[s("span",null,"模仿浏览器的“后退”和“前进”按钮°")]),n(`
`),s("span",{class:"line"},[s("span",null,"history.back();")]),n(`
`),s("span",{class:"line"},[s("span",null,"history.forward();")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"除了上述几个方法外，history对象还有一个length属性，保存着历史记录的数量。这个数量")]),n(`
`),s("span",{class:"line"},[s("span",null,"包括所有历史记录，即所有向后和向前的记录。对于加载到窗口、标签页或框架中的第一个页面而言，history.length等于0。通过像下面这样测试该属性的值，可以确定用户是否一开始就打开了你的页面")]),n(`
`),s("span",{class:"line"},[s("span",null,"if (history.length == 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 这应该是用户打开窗口后的第一个貢面")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"history并不常用，但在创建自定义的“后退”和“前进”按钮，以及检测当前页面是不是")]),n(`
`),s("span",{class:"line"},[s("span",null,"用户历史记录中的第一个页面时，还是必须使用它。")])])])]),s("p",null,"注意：当页面的URL改变时，就会生成一条历史记录。在IE8及更高版本、Opera、Firefox、Safari3及更高版本以及Chrome中，这里所说的改变包括URL中hash的支 化(因此，设置location.hash会在这些浏浏览器中生成一条新的历史记录)•")],-1)])])}const g=l(t,[["render",o]]);export{y as __pageData,g as default};
