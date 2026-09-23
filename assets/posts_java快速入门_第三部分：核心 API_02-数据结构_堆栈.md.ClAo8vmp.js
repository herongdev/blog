import{_ as l,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"堆栈","description":"","frontmatter":{"title":"堆栈","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/堆栈.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/堆栈.md"}'),t={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/堆栈.md"};function i(c,a,o,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"stack：后进先出（LIFO）型结构")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"类Stack只定义了一个构造函数，这是一个默认构造函数，它创建一个空栈。")]),n(`
`),s("span",{class:"line"},[s("span",null,"Stack s= new Stack();")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Java类Stack包含用于操纵堆栈的方法；")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"可使用方法push()将新元素加入堆栈，这个方法将元素压入到栈顶：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"可使用方法pop()将元素从堆栈中弹出，从而将其删除：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"String s1 = (String) s.pop();")]),n(`
`),s("span",{class:"line"},[s("span",null,"String s2  = (Sting) s.pop();")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"如果要获得栈顶元素，但并不将其从堆栈中弹出，可使用peek();")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"String s3 = (String) s.peek();")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"使用方法search()在堆栈中搜索元素：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'int I = s.search("Two");如果找到，方法search()将返回该元素到栈顶的距离，否则返回-1。与涉及索引和列表的Java数据结构一样，类Stack在报告元素位置时，也以0开始。这意味着栈顶元素的位置为0，第4个元素的位置为3。')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"类Stack定义的最后一个方法是empty()，用于判断堆栈是否为空：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"boolean isEmppty = s.empty();")])])])])],-1)])])}const k=l(t,[["render",i]]);export{v as __pageData,k as default};
