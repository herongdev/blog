import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Data Property 和方法","description":"Data Property 组件的 data 选项是一个函数。Vue 会在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 $data 的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也会直接通过组件实。","frontmatter":{"title":"Data Property 和方法","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"Data Property 组件的 data 选项是一个函数。Vue 会在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 $data 的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也会直接通过组件实。","sidebarWeight":105,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/模板语法/Data Property 和方法.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/模板语法/Data Property 和方法.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/模板语法/Data Property 和方法.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/模板语法/Data Property 和方法.md"};function i(c,a,u,o,d,r){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"data-property-和方法",tabindex:"-1"},[s("Data Property 和方法 "),n("a",{class:"header-anchor",href:"#data-property-和方法","aria-label":'Permalink to "Data Property 和方法"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Data Property 和方法”的核心思路，并能把它用于实际开发或面试表达。 ==#====Data Property== ==组件的== ==data== ==选项是一个函数。Vue 会在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以== ==$data== ==的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也会直接通过组件实例暴露出来：==")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const app = Vue.createApp({")]),s(`
`),n("span",{class:"line"},[n("span",null,"  data() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return { count: 4 }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"const vm = app.mount('#app')")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.$data.count) // => 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.count)       // => 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("修改 "),n("code",null,"vm.count"),s(" 的值也会更新")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," $data.count")]),s(`
`),n("span",{class:"line"},[n("span",null,"vm.count = 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.$data.count) // => 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"反之亦然"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"vm.$data.count = 6")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.count) // => 6")])])])]),n("p",null,"==这些实例 property 仅在实例首次创建时被添加，所以你需要确保它们都在== ==data== ==函数返回的对象中。必要时，要对尚未提供所需值的 property 使用== ==null====、====undefined== ==或其他占位的值。=="),n("p",null,"==直接将不包含在== ==data== ==中的新 property 添加到组件实例是可行的。但由于该 property 不在背后的响应式== ==$data== ==对象内，所以== ==Vue 的响应性系统====不会自动跟踪它。== ==Vue 使用== ==$== ==前缀通过组件实例暴露自己的内置 API。它还为内部 property 保留== ==_== ==前缀。你应该避免使用这两个字符开头的顶级== ==data== ==property 名称。=="),n("p",null,"==#====方法== ==我们用== ==methods== ==选项向组件实例添加方法，它应该是一个包含所需方法的对象：=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const app = Vue.createApp({")]),s(`
`),n("span",{class:"line"},[n("span",null,"  data() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return { count: 4 }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  methods: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    increment() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // `this`")])])])]),n("p",null,"指向该组件实例"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      this.count++")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"const vm = app.mount('#app')")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.count) // => 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"vm.increment()")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(vm.count) // => 5")])])])]),n("p",null,'==Vue 自动为== ==methods== ==绑定== ==this====，以便于它始终指向组件实例。这将确保方法在用作事件监听或回调时保持正确的== ==this== ==指向。在定义== ==methods== ==时应避免使用箭头函数，因为这会阻止 Vue 绑定恰当的== ==this== ==指向。== ==这些== ==methods== ==和组件实例的其它所有 property 一样可以在组件的模板中被访问。在模板中，它们通常被当做事件监听使用：== <button @click="increment">Up vote</button> ==在上面的例子中，点击== ==<button>== ==时，会调用== ==increment== ==方法。== ==也可以直接从模板中调用方法。就像下一章节即将看到的，通常换做====计算属性====会更好。但是，在计算属性不可行的情况下，使用方法可能会很有用。你可以在模板支持 JavaScript 表达式的任何地方调用方法：== <span:title="toTitleDate(date)">{{ formatDate(date) }}</span> ==如果== ==toTitleDate== ==或== ==formatDate== ==访问了任何响应式数据，则将其作为渲染依赖项进行跟踪，就像直接在模板中使用过一样。== ==从模板调用的方法不应该有任何副作用，比如更改数据或触发异步进程。如果你想这么做，应该使用====生命周期钩子====来替换。=='),n("p",null,"==#====防抖和节流== ==Vue 没有内置支持防抖和节流，但可以使用== ==Lodash== ==等库来实现。== ==如果某个组件仅使用一次，可以在== ==methods== ==中直接应用防抖：=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Vue.createApp({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    methods: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //")])])])]),n("p",null,[s("用 "),n("code",null,"Lodash"),s(" 的防抖函数")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      click: _.debounce(function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // ...")])])])]),n("p",null,"响应点击"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }, 500)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }).mount('#app')")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])]),n("p",null,"==但是，这种方法对于可复用组件有潜在的问题，因为它们都共享相同的防抖函数。为了使组件实例彼此独立，可以在生命周期钩子的== ==created== ==里添加该防抖函数:=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"app.component('save-button', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  created() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,[s("使用 "),n("code",null,"Lodash"),s(" 实现防抖")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    this.debouncedClick = _.debounce(this.click, 500)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  unmounted() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //")])])])]),n("p",null,"移除组件时，取消定时器"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    this.debouncedClick.cancel()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  methods: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    click() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // ...")])])])]),n("p",null,"响应点击"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  template: `")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <button @click="debouncedClick">')]),s(`
`),n("span",{class:"line"},[n("span",null,"      Save")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  `")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])])],-1)])])}const v=l(t,[["render",i]]);export{g as __pageData,v as default};
