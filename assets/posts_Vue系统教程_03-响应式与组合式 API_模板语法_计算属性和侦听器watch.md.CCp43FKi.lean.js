import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"计算属性和侦听器watch","description":"一、能用计算属性就不用watch；计算属性心智负担小，可缓存； 二、计算属性主要是监听一些响应式值的变化，根据这些值计算得到新的响应式值；新响应式值总是根据这个计算规则得到； 三、watch主要是监听一些响应式的变化，然后触发一些事件或改变一些响应式的值；新响应式的值的变化还有其。","frontmatter":{"title":"计算属性和侦听器watch","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"一、能用计算属性就不用watch；计算属性心智负担小，可缓存； 二、计算属性主要是监听一些响应式值的变化，根据这些值计算得到新的响应式值；新响应式值总是根据这个计算规则得到； 三、watch主要是监听一些响应式的变化，然后触发一些事件或改变一些响应式的值；新响应式的值的变化还有其。","sidebarWeight":112,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/模板语法/计算属性和侦听器watch.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/模板语法/计算属性和侦听器watch.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/模板语法/计算属性和侦听器watch.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/模板语法/计算属性和侦听器watch.md"};function i(u,l,c,o,h,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"计算属性和侦听器watch",tabindex:"-1"},[n("计算属性和侦听器watch "),s("a",{class:"header-anchor",href:"#计算属性和侦听器watch","aria-label":'Permalink to "计算属性和侦听器watch"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“计算属性和侦听器watch”的核心思路，并能把它用于实际开发或面试表达。 一、能用计算属性就不用watch；计算属性心智负担小，可缓存； 二、计算属性主要是监听一些响应式值的变化，根据这些值计算得到新的响应式值；新响应式值总是根据这个计算规则得到； 三、watch主要是监听一些响应式的变化，然后触发一些事件或改变一些响应式的值；新响应式的值的变化还有其它方式引起；")]),s("p",null,"==计算属性=="),s("p",null,"==模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如，有一个嵌套数组对象：=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Vue.createApp({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      author: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        name: 'John Doe',")]),n(`
`),s("span",{class:"line"},[s("span",null,"        books: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 2 - Advanced Guide',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 3 - Basic Guide',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 4 - The Mystery'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")])])])]),s("p",null,"==我们想根据== ==author== ==是否已经有一些书来显示不同的消息=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'<div id="computed-basics">')]),n(`
`),s("span",{class:"line"},[s("span",null,"  <p>Has published books:</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</div>")])])])]),s("p",null,"==此时，模板不再是简单的和声明性的。你必须先看一下它，然后才能意识到它执行的计算取决于== ==author.books====。如果要在模板中多次包含此计算，则问题会变得更糟。== ==所以，对于任何包含响应式数据的复杂逻辑，你都应该使用计算属性。=="),s("p",null,"==#====基本例子=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Vue.createApp({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      author: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        name: 'John Doe',")]),n(`
`),s("span",{class:"line"},[s("span",null,"        books: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 2 - Advanced Guide',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 3 - Basic Guide',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'Vue 4 - The Mystery'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  computed: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    //")])])])]),s("p",null,"计算属性的"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," getter")]),n(`
`),s("span",{class:"line"},[s("span",null,"    publishedBooksMessage() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // `this`")])])])]),s("p",null,[n("指向 "),s("code",null,"vm"),n(" 实例")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      return this.author.books.length > 0 ? 'Yes' : 'No'")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}).mount('#computed-basics')")])])])]),s("p",null,"==这里声明了一个计算属性== ==publishedBooksMessage====。== ==尝试更改应用程序== ==data== ==中== ==books== ==数组的值，你将看到== ==publishedBooksMessage== ==如何相应地更改。== ==你可以像普通属性一样将数据绑定到模板中的计算属性。Vue 知道== ==vm.publishedBookMessage== ==依赖于== ==vm.author.books====，因此当== ==vm.author.books== ==发生改变时，所有依赖== ==vm.publishedBookMessage== ==的绑定也会更新。而且最妙的是我们已经声明的方式创建了这个依赖关系：计算属性的 getter 函数没有副作用，它更易于测试和理解。=="),s("p",null,"==#====计算属性缓存 vs 方法== ==你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：== <p>{{ calculateBooksMessage() }}</p> // 在组件中methods:{calculateBooksMessage(){returnthis.author.books.length >0?'Yes':'No'}} ==我们可以将同样的函数定义为一个方法，而不是一个计算属性。从最终结果来说，这两种实现方式确实是完全相同的。然而，不同的是计算属性将基于它们的响应依赖关系缓存。计算属性只会在相关响应式依赖发生改变时重新求值。这就意味着只要== ==author.books== ==还没有发生改变，多次访问== ==publishedBookMessage== ==时计算属性会立即返回之前的计算结果，而不必再次执行函数。== ==这也同样意味着下面的计算属性将永远不会更新，因为== ==Date.now ()== ==不是响应式依赖：== computed:{now(){returnDate.now()}} ==相比之下，每当触发重新渲染时，调用方法将始终会再次执行函数。== ==我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性== ==list====，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于== ==list====。如果没有缓存，我们将不可避免的多次执行== ==list== ==的 getter！如果你不希望有缓存，请用== ==method== ==来替代。=="),s("p",null,"==#====计算属性的 Setter== ==计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"computed: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  fullName: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // getter")]),n(`
`),s("span",{class:"line"},[s("span",null,"    get() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return this.firstName + ' ' + this.lastName")]),n(`
`),s("span",{class:"line"},[s("span",null,"    },")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // setter")]),n(`
`),s("span",{class:"line"},[s("span",null,"    set(newValue) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const names = newValue.split(' ')")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.firstName = names[0]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.lastName = names[names.length - 1]")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"==现在再运行== ==vm.fullName = 'John Doe'== ==时，setter 会被调用，====vm.firstName== ==和== ==vm.lastName== ==也会相应地被更新。=="),s("p",null,"==#====侦听器== ==虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过== ==watch== ==选项提供了一个更通用的方法来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。== ==例如：=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'<div id="watch-example">')]),n(`
`),s("span",{class:"line"},[s("span",null,"  <p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Ask a yes/no question:")]),n(`
`),s("span",{class:"line"},[s("span",null,'    <input v-model="question" />')]),n(`
`),s("span",{class:"line"},[s("span",null,"  </p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  <p>{{ answer }}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</div>")])])])]),s("p",null,"<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 --><!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->"),s("p",null,[s("code",null,"\\<!--"),n(" 因为 "),s("code",null,"AJAX"),n(" 库和通用工具的生态已经相当丰富，"),s("code",null,"Vue"),n(" 核心代码没有重复")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," -->")]),n(`
`),s("span",{class:"line"},[s("span",null,"<!--")])])])]),s("p",null,"提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," -->")]),n(`
`),s("span",{class:"line"},[s("span",null,'<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"><\/script>')]),n(`
`),s("span",{class:"line"},[s("span",null,"<script>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const watchExampleVM = Vue.createApp({")]),n(`
`),s("span",{class:"line"},[s("span",null,"    data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        question: '',")]),n(`
`),s("span",{class:"line"},[s("span",null,"        answer: 'Questions usually contain a question mark. ;-)'")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    },")]),n(`
`),s("span",{class:"line"},[s("span",null,"    watch: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      //")])])])]),s("p",null,[n("每当 "),s("code",null,"question"),n(" 发生变化时，该函数将会执行")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"      question(newQuestion, oldQuestion) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (newQuestion.indexOf('?') > -1) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          this.getAnswer()")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    },")]),n(`
`),s("span",{class:"line"},[s("span",null,"    methods: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      getAnswer() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.answer = 'Thinking...'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        axios")]),n(`
`),s("span",{class:"line"},[s("span",null,"          .get('https://yesno.wtf/api')")]),n(`
`),s("span",{class:"line"},[s("span",null,"          .then(response => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.answer = response.data.answer")]),n(`
`),s("span",{class:"line"},[s("span",null,"          })")]),n(`
`),s("span",{class:"line"},[s("span",null,"          .catch(error => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.answer = 'Error! Could not reach the API. ' + error")]),n(`
`),s("span",{class:"line"},[s("span",null,"          })")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }).mount('#watch-example')")]),n(`
`),s("span",{class:"line"},[s("span",null,"<\/script>")])])])]),s("p",null,"在这个示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，并设置一个执行该操作的条件。这些都是计算属性无法做到的。 ==除了 watch 选项之外，你还可以使用命令式的== ==vm.$watch API====。=="),s("p",null,'==#====计算属性 vs 侦听器== ==Vue 提供了一种更通用的方式来观察和响应当前活动的实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，====watch== ==很容易被滥用——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的== ==watch== ==回调。细想一下这个例子：== <divid="demo">{{ fullName }}</div>'),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"const vm = Vue.createApp({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      firstName: 'Foo',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      lastName: 'Bar',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      fullName: 'Foo Bar'")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  watch: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    firstName(val) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.fullName = val + ' ' + this.lastName")]),n(`
`),s("span",{class:"line"},[s("span",null,"    },")]),n(`
`),s("span",{class:"line"},[s("span",null,"    lastName(val) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.fullName = this.firstName + ' ' + val")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}).mount('#demo')")])])])]),s("p",null,"==上面代码是命令式且重复的。将它与计算属性的版本进行比较：=="),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"const vm = Vue.createApp({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      firstName: 'Foo',")]),n(`
`),s("span",{class:"line"},[s("span",null,"      lastName: 'Bar'")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  computed: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    fullName() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return this.firstName + ' ' + this.lastName")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}).mount('#demo')")])])])]),s("p",null,[n("==好很多了，不是吗？== > 来自 <"),s("a",{href:"https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%99%A8",target:"_blank",rel:"noreferrer"},"https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%99%A8"),n(">")])],-1)])])}const m=a(t,[["render",i]]);export{g as __pageData,m as default};
