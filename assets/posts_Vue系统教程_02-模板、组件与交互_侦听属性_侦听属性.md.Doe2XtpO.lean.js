import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"侦听属性","description":"\\\\ 来自。","frontmatter":{"title":"侦听属性","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","模板、组件与交互"],"description":"\\\\ 来自。","sidebarWeight":38,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/api/侦听属性/侦听属性.md"},"headers":[],"relativePath":"posts/Vue系统教程/02-模板、组件与交互/侦听属性/侦听属性.md","filePath":"posts/Vue系统教程/02-模板、组件与交互/侦听属性/侦听属性.md"}'),i={name:"posts/Vue系统教程/02-模板、组件与交互/侦听属性/侦听属性.md"};function t(c,a,u,o,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"侦听属性",tabindex:"-1"},[s("侦听属性 "),n("a",{class:"header-anchor",href:"#侦听属性","aria-label":'Permalink to "侦听属性"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“侦听属性”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==侦听器==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==这就是为什么== ==Vue== ==通过== ==watch== ==选项提供了一个更通用的方法，来响应数据的变化。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==例如：==")]),s(`
`),n("span",{class:"line"},[n("span",null,'==<div id====="watch-example"====>======  ==<p>======    ==Ask a yes/no question:======    ==<input v-model====="question"====>======  ==</p>======  ==<p>===={{ answer }}====</p>========</div>==')]),s(`
`),n("span",{class:"line"},[n("span",null,"==<!--== ==因为== ==AJAX== ==库和通用工具的生态已经相当丰富，====Vue== ==核心代码没有重复== ==-->========<!--== ==提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。== ==-->======")]),s(`
`),n("span",{class:"line"},[n("span",null,'<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,'<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var watchExampleVM = new Vue({")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el: '#watch-example',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        data: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            question: '',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            answer: 'I cannot give you an answer until you ask a question!'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        watch: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // 如果 `question` 发生改变，这个函数就会运行")]),s(`
`),n("span",{class:"line"},[n("span",null,"            question: function (newQuestion, oldQuestion) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.answer = 'Waiting for you to stop typing...'")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.debouncedGetAnswer()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        created: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // 请参考：https://lodash.com/docs#debounce")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        methods: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            getAnswer: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (this.question.indexOf('?') === -1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    this.answer = 'Questions usually contain a question mark. ;-)'")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    return")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.answer = 'Thinking...'")]),s(`
`),n("span",{class:"line"},[n("span",null,"                var vm = this")]),s(`
`),n("span",{class:"line"},[n("span",null,"                axios.get('https://yesno.wtf/api')")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    .then(function (response) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        vm.answer = _.capitalize(response.data.answer)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    .catch(function (error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        vm.answer = 'Error! Could not reach the API. ' + error")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"==结果：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"Ask a yes/no question:")]),s(`
`),n("span",{class:"line"},[n("span",null,"I cannot give you an answer until you ask a question!")]),s(`
`),n("span",{class:"line"},[n("span",null,"==在这个示例中，使用== ==watch== ==选项允许我们执行异步操作== ==(====访问一个== ==API)====，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态====（改变====Data====的值）====。这些都是计算属性无法做到的。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==除了== ==watch== ==选项之外，您还可以使用命令式的== ==vm.$watch API====。==")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://cn.vuejs.org/v2/guide/computed.html>")])])])])],-1)])])}const v=l(i,[["render",t]]);export{m as __pageData,v as default};
