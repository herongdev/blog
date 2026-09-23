import{_ as e,o as a,c as t,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"组件基础","description":"基本示例 这里有一个 Vue 组件的示例： // 创建一个 Vue 应用 定义一个名为 button counter 的新全局组件 INFO 在这里演示的是一个简单的示例，但是在典型的 Vue 应用中，我们使用单文件组件而不是字符串模板。你可以在本节找到有关它们的更多信息。 组件。","frontmatter":{"title":"组件基础","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"基本示例 这里有一个 Vue 组件的示例： // 创建一个 Vue 应用 定义一个名为 button counter 的新全局组件 INFO 在这里演示的是一个简单的示例，但是在典型的 Vue 应用中，我们使用单文件组件而不是字符串模板。你可以在本节找到有关它们的更多信息。 组件。","sidebarWeight":115,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/组件基础.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/组件基础.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/组件基础.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/组件基础.md"};function i(o,s,u,c,d,r){return a(),t("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"组件基础",tabindex:"-1"},[n("组件基础 "),l("a",{class:"header-anchor",href:"#组件基础","aria-label":'Permalink to "组件基础"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“组件基础”的核心思路，并能把它用于实际开发或面试表达。")]),l("blockquote",null,[l("p",null,[n("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 ==#====基本示例== ==这里有一个 Vue 组件的示例：== "),l("code",null,"//"),n(" 创建一个"),l("code",null,"Vue"),n(" 应用")])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const app = Vue.createApp({})")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,[n("定义一个名为 "),l("code",null,"button-counter"),n(" 的新全局组件")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"app.component('button-counter', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  data() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      count: 0")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  template: `")]),n(`
`),l("span",{class:"line"},[l("span",null,'    <button @click="count++">')]),n(`
`),l("span",{class:"line"},[l("span",null,"      You clicked me {{ count }} times.")]),n(`
`),l("span",{class:"line"},[l("span",null,"    </button>`")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")])])])]),l("p",null,[n("INFO 在这里演示的是一个简单的示例，但是在典型的 Vue 应用中，我们使用单文件组件而不是字符串模板。你可以"),l("a",{href:"https://v3.cn.vuejs.org/guide/single-file-component.html",target:"_blank",rel:"noreferrer"},"在本节"),n(`找到有关它们的更多信息。 ==组件是带有名称的可复用实例，在这个例子中是== ==<button-counter>====。我们可以把这个组件作为一个根实例中的自定义元素来使用：== <div id="components-demo"><button-counter></button-counter></div> app.mount('#components-demo') ==因为组件是可复用的实例，所以它们与根实例接收相同的选项，例如== ==data====、====computed====、====watch====、====methods== ==以及生命周期钩子等。==`)]),l("p",null,"==#====组件的复用== ==你可以将组件进行任意次数的复用：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<div id="components-demo">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <button-counter></button-counter>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <button-counter></button-counter>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <button-counter></button-counter>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("p",null,"==注意当点击按钮时，每个组件都会各自独立维护它的== ==count====。因为你每用一次组件，就会有一个它的新实例被创建。== ==#====组件的组织== ==通常一个应用会以一棵嵌套的组件树的形式来组织：=="),l("p",null,"==例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。== ==为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：全局注册和局部注册。至此，我们的组件都只是通过== ==component== ==方法全局注册的：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const app = Vue.createApp({})")]),n(`
`),l("span",{class:"line"},[l("span",null,"app.component('my-component-name', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  // ...")])])])]),l("p",null,"选项"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," ...")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")])])])]),l("p",null,"==全局注册的组件可以在应用中的任何组件的模板中使用。== ==到目前为止，关于组件注册你需要了解的就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把====组件注册====读完。=="),l("p",null,"==#====通过 Prop 向子组件传递数据== ==早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。== ==Prop 是你可以在组件上注册的一些自定义 attribute。为了给博文组件传递一个标题，我们可以用== ==props== ==选项将其包含在该组件可接受的 prop 列表中：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const app = Vue.createApp({})")]),n(`
`),l("span",{class:"line"},[l("span",null,"app.component('blog-post', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: ['title'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  template: `<h4>{{ title }}</h4>`")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")]),n(`
`),l("span",{class:"line"},[l("span",null,"app.mount('#blog-post-demo')")])])])]),l("p",null,"==当一个值被传递给一个 prop attribute 时，它就成为该组件实例中的一个 property。该 property 的值可以在模板中访问，就像任何其他组件 property 一样。== ==一个组件可以拥有任意数量的 prop，并且在默认情况下，无论任何值都可以传递给 prop。=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<div id="blog-post-demo" class="demo">')]),n(`
`),l("span",{class:"line"},[l("span",null,'  <blog-post title="My journey with Vue"></blog-post>')]),n(`
`),l("span",{class:"line"},[l("span",null,'  <blog-post title="Blogging with Vue"></blog-post>')]),n(`
`),l("span",{class:"line"},[l("span",null,'  <blog-post title="Why Vue is so fun"></blog-post>')]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("p",null,"==然而在一个典型的应用中，你可能在== ==data== ==里有一个博文的数组：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const App = {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  data() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      posts: [")]),n(`
`),l("span",{class:"line"},[l("span",null,"        { id: 1, title: 'My journey with Vue' },")]),n(`
`),l("span",{class:"line"},[l("span",null,"        { id: 2, title: 'Blogging with Vue' },")]),n(`
`),l("span",{class:"line"},[l("span",null,"        { id: 3, title: 'Why Vue is so fun' }")]),n(`
`),l("span",{class:"line"},[l("span",null,"      ]")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"const app = Vue.createApp(App)")]),n(`
`),l("span",{class:"line"},[l("span",null,"app.component('blog-post', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: ['title'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  template: `<h4>{{ title }}</h4>`")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")]),n(`
`),l("span",{class:"line"},[l("span",null,"app.mount('#blog-posts-demo')")])])])]),l("p",null,"==并想要为每篇博文渲染一个组件：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<div id="blog-posts-demo">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <blog-post")]),n(`
`),l("span",{class:"line"},[l("span",null,'    v-for="post in posts"')]),n(`
`),l("span",{class:"line"},[l("span",null,'    :key="post.id"')]),n(`
`),l("span",{class:"line"},[l("span",null,'    :title="post.title"')]),n(`
`),l("span",{class:"line"},[l("span",null,"  ></blog-post>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("p",null,"==如上所示，你会发现我们可以使用== ==v-bind== ==来动态传递 prop。这在你一开始不清楚要渲染的具体内容，是非常有用的。== ==到目前为止，关于 prop 你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把== ==Props== ==读完。=="),l("p",null,"==#====监听子组件事件== ==Vue====：子组件的交互要改变自身接受的属性值：== ==通过触发一个事件，父组件捕获这个事件，并改变传给子组件的属性值====;== ==React:== ==给子组件传递一个函数，子组件在事件中调用这个函数，这个函数改变了传给子组件的属性值== ==我们在开发== ==<blog-post>== ==组件时，它的一些功能可能需要与父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号。== ==在其父组件中，我们可以通过添加一个== ==postFontSize== ==data property 来支持这个功能：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"const App = {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  data() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      posts: [")]),n(`
`),l("span",{class:"line"},[l("span",null,"        /* ... */")]),n(`
`),l("span",{class:"line"},[l("span",null,"      ],")]),n(`
`),l("span",{class:"line"},[l("span",null,"      postFontSize: 1")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,"==它可以在模板中用来控制所有博文的字号：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<div id="blog-posts-events-demo">')]),n(`
`),l("span",{class:"line"},[l("span",null,`  <div :style="{ fontSize: postFontSize + 'em' }">`)]),n(`
`),l("span",{class:"line"},[l("span",null,"    <blog-post")]),n(`
`),l("span",{class:"line"},[l("span",null,'      v-for="post in posts"')]),n(`
`),l("span",{class:"line"},[l("span",null,'      :key="post.id"')]),n(`
`),l("span",{class:"line"},[l("span",null,'      :title="post.title"')]),n(`
`),l("span",{class:"line"},[l("span",null,"    ></blog-post>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("p",null,"==现在我们在每篇博文正文之前添加一个按钮来放大字号：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<div id="blog-posts-events-demo">')]),n(`
`),l("span",{class:"line"},[l("span",null,`  <div :style="{ fontSize: postFontSize + 'em' }">`)]),n(`
`),l("span",{class:"line"},[l("span",null,"    <blog-post")]),n(`
`),l("span",{class:"line"},[l("span",null,'      v-for="post in posts"')]),n(`
`),l("span",{class:"line"},[l("span",null,'      :key="post.id"')]),n(`
`),l("span",{class:"line"},[l("span",null,'      :title="post.title"')]),n(`
`),l("span",{class:"line"},[l("span",null,"    ></blog-post>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</div>")])])])]),l("p",null,`==问题是这个按钮不会做任何事：== <button>Enlarge text</button> ==当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好组件实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理原生 DOM 事件一样通过== ==v-on== ==或== ==@== ==监听子组件实例的任意事件：== <blog-post...@enlarge-text="postFontSize += 0.1"></blog-post> 1 ==同时子组件可以通过调用内建的== ==$emit 方法====并传入事件名称来触发一个事件：== <button@click="$emit('enlargeText')">Enlarge text</button> 1 2 3 ==多亏了== ==@enlarge-text="postFontSize += 0.1"== ==监听器，父级组件能够接收事件并更新== ==postFontSize== ==的值。== ==我们可以在组件的== ==emits== ==选项中列出已抛出的事件：==`),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"app.component('blog-post', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: ['title'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  emits: ['enlargeText']")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")])])])]),l("p",null,"==这将允许我们检查组件抛出的所有事件，还可以选择====验证它们====。=="),l("p",null,`==#====使用事件抛出一个值== ==有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让== ==<blog-post>== ==组件决定它的文本要放大多少。这时可以使用== ==$emit== ==的第二个参数来提供这个值：== <button @click="$emit('enlargeText', 0.1)">Enlarge text</button> ==然后当在父级组件监听这个事件的时候，我们可以通过== ==$event== ==访问到被抛出的这个值：== <blog-post...@enlarge-text="postFontSize += $event"></blog-post>`),l("p",null,'==或者，如果这个事件处理函数是一个方法：== <blog-post...@enlarge-text="onEnlargeText"></blog-post>'),l("p",null,"==那么这个值将会作为第一个参数传入这个方法：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"methods: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  onEnlargeText(enlargeAmount) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.postFontSize += enlargeAmount")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,'==#====在组件上使用 v-model== ==自定义事件也可以用于创建支持== ==v-model== ==的自定义输入组件。记住：== <input v-model="searchText"/>'),l("p",null,'==等价于：== <input :value="searchText"@input="searchText = $event.target.value"/>'),l("p",null,"==当用在组件上时，====v-model== ==则会这样：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<custom-input")]),n(`
`),l("span",{class:"line"},[l("span",null,'  :model-value="searchText"')]),n(`
`),l("span",{class:"line"},[l("span",null,'  @update:model-value="searchText = $event"')]),n(`
`),l("span",{class:"line"},[l("span",null,"></custom-input>")])])])]),l("p",null,[n("WARNING 请注意，我们在这里使用的是 model-value，因为我们使用的是 DOM 模板中的 kebab-case。你可以在"),l("a",{href:"https://v3.cn.vuejs.org/guide/component-basics.html#%E8%A7%A3%E6%9E%90-dom-%E6%A8%A1%E6%9D%BF%E6%97%B6%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9",target:"_blank",rel:"noreferrer"},"解析 DOM 模板时的注意事项"),n("部分找到关于 kebab cased 和 camelCased 属性的详细说明 ==为了让它正常工作，这个组件内的== ==<input>== ==必须：==")]),l("ul",null,[l("li",null,"==将其== ==value== ==attribute 绑定到一个名叫== ==modelValue== ==的 prop 上=="),l("li",null,"==在其== ==input== ==事件被触发时，将新的值通过自定义的== ==update:modelValue== ==事件抛出==")]),l("p",null,"==写成代码之后是这样的：=="),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"app.component('custom-input', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: ['modelValue'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  emits: ['update:modelValue'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  template: `")]),n(`
`),l("span",{class:"line"},[l("span",null,"    <input")]),n(`
`),l("span",{class:"line"},[l("span",null,'      :value="modelValue"')]),n(`
`),l("span",{class:"line"},[l("span",null,`      @input="$emit('update:modelValue', $event.target.value)"`)]),n(`
`),l("span",{class:"line"},[l("span",null,"    >")]),n(`
`),l("span",{class:"line"},[l("span",null,"  `")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")])])])]),l("p",null,'==现在== ==v-model== ==就可以在这个组件上完美地工作起来了：== <custom-inputv-model="searchText"></custom-input> 1 ==在该组件中实现== ==v-model== ==的另一种方法是使用== ==computed== ==property 的功能来定义 getter 和 setter。====get== ==方法应返回== ==modelValue== ==property，====set== ==方法应该触发相应的事件。=='),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"app.component('custom-input', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: ['modelValue'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  emits: ['update:modelValue'],")]),n(`
`),l("span",{class:"line"},[l("span",null,"  template: `")]),n(`
`),l("span",{class:"line"},[l("span",null,'    <input v-model="value">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  `,")]),n(`
`),l("span",{class:"line"},[l("span",null,"  computed: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    value: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      get() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        return this.modelValue")]),n(`
`),l("span",{class:"line"},[l("span",null,"      },")]),n(`
`),l("span",{class:"line"},[l("span",null,"      set(value) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        this.$emit('update:modelValue', value)")]),n(`
`),l("span",{class:"line"},[l("span",null,"      }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")])])])]),l("p",null,[n("==现在你只需要了解自定义组件事件，但一旦你读完本页并对其内容还觉得不错，我们建议你稍后再阅读有关====自定义事件====的完整指南。== ==#====通过插槽分发内容== ==和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：== <alert-box>Something bad happened.</alert-box> 1 2 3 ==可能会渲染出这样的东西：== ==这可以通过使用 Vue 的自定义== ==<slot>== ==元素来实现：== app.component('alert-box',{template:"),l("code",null,' \\<divclass="demo-alert-box"\\>\\<strong\\>Error!\\</strong\\>\\<slot\\>\\</slot\\>\\</div\\>'),n("}) 1 2 3 4 5 6 7 8 ==如你所见，我们使用== ==<slot>== ==作为我们想要插入内容的占位符——就这么简单！== ==到目前为止，关于插槽你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把====插槽====读完。== ==#====动态组件== ==有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：== ==上述内容可以通过 Vue 的== ==<component>== ==元素加一个特殊的== ==is== ==attribute 来实现：== <!-- 组件会在 "),l("code",null,"currentTabComponent"),n(' 改变时改变 --><component:is="currentTabComponent"></component> 1 2 ==在上述示例中，====currentTabComponent== ==可以包括：==')]),l("ul",null,[l("li",null,"==已注册组件的名字，或=="),l("li",null,"==一个组件选项对象==")]),l("p",null,"==查看====该沙盒====以调试绑定了组件注册名的完整代码，或在====另一个沙盒====中查看绑定了组件选项对象的示例。== ==你也可以使用== ==is== ==attribute 来创建常规的 HTML 元素。== ==到目前为止，关于动态组件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把====动态 & 异步组件====读完。== ==#====解析 DOM 模板时的注意事项== ==如果想在 DOM 中直接书写 Vue 模板，Vue 将不得不从 DOM 中获取字符串。这会因为浏览器的原生 HTML 解析行为而导致一些小问题。== TIP 应该注意的是，下面讨论的限制仅适用于直接在 DOM 中编写模板的情况。它们不适用于以下来源的字符串模板："),l("ul",null,[l("li",null,"字符串模板 (比如 template: '...')"),l("li",null,[l("a",{href:"https://v3.cn.vuejs.org/guide/single-file-component.html",target:"_blank",rel:"noreferrer"},"单文件组件")]),l("li",null,'<script type="text/x-template">')]),l("p",null,[n('==#====元素位置受限== ==有些 HTML 元素，诸如== ==<ul>====、====<ol>====、====<table>== ==和== ==<select>====，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如== ==<li>====、====<tr>== ==和== ==<option>====，只能出现在其它某些特定的元素内部。== ==这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：== <table><blog-post-row></blog-post-row></table> 1 2 3 ==这个自定义组件== ==<blog-post-row>== ==会被作为无效的内容提升到外部，并导致最终渲染结果出错。我们可以使用特殊的== ==is== ==attribute== ==作为一个变通的办法：== <table><tris="vue:blog-post-row"></tr></table> 1 2 3 TIP 当它用于原生 HTML 元素时，is 的值必须以 vue: 开头，才可以被解释为 Vue 组件。这是避免和原生'),l("a",{href:"https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example",target:"_blank",rel:"noreferrer"},"自定义元素"),n("混淆。 ==#====大小写不敏感== ==另外，HTML attribute 名不区分大小写，因此浏览器将所有大写字符解释为小写。这意味着当你在 DOM 模板中使用时，驼峰 prop 名称和 event 处理器参数需要使用它们的 kebab-cased (横线字符分隔) 等效值：== // 在 JavaScript 中是驼峰式app.component('blog-post',{props:['postTitle'],template:"),l("code",null," \\<h3\\>{{ postTitle }}\\</h3\\>"),n('}) 1 2 3 4 5 6 7 8 <!-- 在 HTML 中则是横线字符分割 --><blog-postpost-title="hello!"></blog-post> 1 2 3 ==到这里，你需要了解的解析 DOM 模板时的注意事项——实际上也是 Vue 的全部=='),l("em",null,"必要"),n("==内容，大概就是这些了。恭喜你！接下来还有很多东西要去学习，不过首先，我们推荐你先休息一下，试用一下 Vue，自己随意做些好玩的东西。== ==如果你感觉已经掌握了这些知识，我们推荐你再回来把完整的====组件&异步组件====指南，包括侧边栏中组件深入章节的所有页面读完。== > 来自 <"),l("a",{href:"https://v3.cn.vuejs.org/guide/component-basics.html#%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F",target:"_blank",rel:"noreferrer"},"https://v3.cn.vuejs.org/guide/component-basics.html#%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F"),n(">")])],-1)])])}const b=e(p,[["render",i]]);export{h as __pageData,b as default};
