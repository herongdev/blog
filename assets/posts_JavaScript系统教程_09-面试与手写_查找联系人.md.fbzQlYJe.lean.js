import{_ as l,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"查找联系人","description":"Profile Lookup 我们有一个对象数组，里面存储着通讯录。 函数 lookUp 有两个预定义参数： firstName 值和 prop 属性 。 函数将会检查通讯录中是否存在一个与传入的 firstName 相同的联系人。如果存在，那么还需要检查对应的联系人中是否存在。","frontmatter":{"title":"查找联系人","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"Profile Lookup 我们有一个对象数组，里面存储着通讯录。 函数 lookUp 有两个预定义参数： firstName 值和 prop 属性 。 函数将会检查通讯录中是否存在一个与传入的 firstName 相同的联系人。如果存在，那么还需要检查对应的联系人中是否存在。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/查找联系人.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/查找联系人.md","filePath":"posts/JavaScript系统教程/09-面试与手写/查找联系人.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/查找联系人.md"};function t(o,a,c,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"查找联系人",tabindex:"-1"},[n("查找联系人 "),s("a",{class:"header-anchor",href:"#查找联系人","aria-label":'Permalink to "查找联系人"'},"​")]),s("blockquote",null,[s("p",null,'本节目标：理解“查找联系人”的核心思路，并能把它用于实际开发或面试表达。 Profile Lookup 我们有一个对象数组，里面存储着通讯录。 函数 ==lookUp== 有两个预定义参数：==firstName==值和==prop==属性 。 函数将会检查通讯录中是否存在一个与传入的 ==firstName== 相同的联系人。如果存在，那么还需要检查对应的联系人中是否存在 ==prop==属性。 如果它们都存在，函数返回==prop==属性对应的值。 如果==firstName== 值不存在，返回 =="No such contact"==。 如果==prop== 属性不存在，返回 =="No such property"==。')]),s("p",null,'=="Kristian", "lastName"== 应该返回 =="Vos"== =="Sherlock", "likes"== 应该返回 ==["Intriguing Cases", "Violin"]== =="Harry","likes"== 应该返回一个数组 =="Bob", "number"== 应该返回 "No such contact" =="Akira", "address"== 应该返回 "No such property"'),s("p",null,[s("code",null,"//"),n("==初始化变量==")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"varcontacts=[")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'"firstName":"Akira",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"lastName":"Laine",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"number":"0543236543",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"likes":["Pizza","Coding","BrowniePoints"]')]),n(`
`),s("span",{class:"line"},[s("span",null,"},")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'"firstName":"Harry",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"lastName":"Potter",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"number":"0994372684",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"likes":["Hogwarts","Magic","Hagrid"]')]),n(`
`),s("span",{class:"line"},[s("span",null,"},")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'"firstName":"Sherlock",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"lastName":"Holmes",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"number":"0487345643",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"likes":["IntriguingCases","Violin"]')]),n(`
`),s("span",{class:"line"},[s("span",null,"},")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'"firstName":"Kristian",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"lastName":"Vos",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"number":"unknown",')]),n(`
`),s("span",{class:"line"},[s("span",null,'"likes":["Javascript","Gaming","Foxes"]')]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"];")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"functionlookUp(firstName,prop){")]),n(`
`),s("span",{class:"line"},[s("span",null,"//")])])])]),s("p",null,"==请把你的代码写在这条注释以下=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"for(vari=0;i<contacts.length;i++){")]),n(`
`),s("span",{class:"line"},[s("span",null,"if(contacts[i].firstName===firstName){")]),n(`
`),s("span",{class:"line"},[s("span",null,"if(contacts[i][prop]){")]),n(`
`),s("span",{class:"line"},[s("span",null,"returncontacts[i][prop];")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"return'Nosuchproperty';")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"return'Nosuchcontact';")]),n(`
`),s("span",{class:"line"},[s("span",null,"//")])])])]),s("p",null,[n("==请把你的代码写在这条注释以上== "),s("code",null,"}")]),s("p",null,[s("code",null,"//"),n("==你可以修改这一行来测试你的代码==")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'lookUp("Akira","likes");')])])])])],-1)])])}const g=l(i,[["render",t]]);export{h as __pageData,g as default};
