import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"5、computed 和 watch 的区别和运用的场景？","description":"computed ： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值； watch ： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都。","frontmatter":{"title":"5、computed 和 watch 的区别和运用的场景？","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","面试复习"],"description":"computed ： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值； watch ： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都。","sidebarWeight":6,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/面试/5、computed 和 watch 的区别和运用的场景？.md"},"headers":[],"relativePath":"posts/Vue系统教程/08-面试复习/5、computed 和 watch 的区别和运用的场景？.md","filePath":"posts/Vue系统教程/08-面试复习/5、computed 和 watch 的区别和运用的场景？.md"}'),t={name:"posts/Vue系统教程/08-面试复习/5、computed 和 watch 的区别和运用的场景？.md"};function c(u,s,i,o,d,h){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"_5、computed-和-watch-的区别和运用的场景",tabindex:"-1"},[l("5、computed 和 watch 的区别和运用的场景？ "),n("a",{class:"header-anchor",href:"#_5、computed-和-watch-的区别和运用的场景","aria-label":'Permalink to "5、computed 和 watch 的区别和运用的场景？"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“5、computed 和 watch 的区别和运用的场景？”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"computed"),l("**：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；")])]),n("p",null,[n("strong",null,"watch"),l("**：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**运用场景：**")])])])]),n("p",null,"当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；"),n("p",null,"当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。"),n("p",null,"如果我们要根据一些值计算出另外一个值的时候，用计算属性； 如果我们要根据一个值的变化，来执行一系列操作，特别是含有异步操作的时候，我们使用观察属性。同时，我们还可以根据这个值的变化，设置不同的data值。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**watch**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**类型**：{ [key: string]: string | Function | Object | Array }")]),l(`
`),n("span",{class:"line"},[n("span",null,"**详细**：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个 property。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**示例**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"var vm = new Vue({")]),l(`
`),n("span",{class:"line"},[n("span",null,"    data: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        a: 1,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        b: 2,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        c: 3,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        d: 4,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        e: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            f: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                g: 5")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    watch: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        a: function (val, oldVal) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            console.log('new: %s, old: %s', val, oldVal)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        },")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 方法名")]),l(`
`),n("span",{class:"line"},[n("span",null,"        b: 'someMethod',")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深")]),l(`
`),n("span",{class:"line"},[n("span",null,"        c: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            handler: function (val, oldVal) { /* ... */ },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            deep: true")]),l(`
`),n("span",{class:"line"},[n("span",null,"        },")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 该回调将会在侦听开始之后被立即调用")]),l(`
`),n("span",{class:"line"},[n("span",null,"        d: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            handler: 'someMethod',")]),l(`
`),n("span",{class:"line"},[n("span",null,"            immediate: true")]),l(`
`),n("span",{class:"line"},[n("span",null,"        },")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 你可以传入回调数组，它们会被逐一调用")]),l(`
`),n("span",{class:"line"},[n("span",null,"        e: [")]),l(`
`),n("span",{class:"line"},[n("span",null,"            'handle1',")]),l(`
`),n("span",{class:"line"},[n("span",null,"            function handle2(val, oldVal) { /* ... */ },")]),l(`
`),n("span",{class:"line"},[n("span",null,"            {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                handler: function handle3(val, oldVal) { /* ... */ },")]),l(`
`),n("span",{class:"line"},[n("span",null,"                /* ... */")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        ],")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // watch vm.e.f's value: {g: 5}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        'e.f': function (val, oldVal) { /* ... */ }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"})")]),l(`
`),n("span",{class:"line"},[n("span",null,"vm.a = 2 // => new: 2, old: 1")])])])]),n("p",null,[l("注意，"),n("strong",null,"不应该使用箭头函数来定义"),l(),n("strong",null,"watcher"),l(),n("strong",null,"函数"),l(" (例如 searchQuery: newValue => this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**参考**：[实例方法](https://cn.vuejs.org/v2/api/#vm-watch) / 数据 - vm.$watch")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://cn.vuejs.org/v2/api/#watch>")])])])])],-1)])])}const v=a(t,[["render",c]]);export{m as __pageData,v as default};
