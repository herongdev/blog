import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"项目整合与优化","description":"很明显， Gzip 压缩后的文件体积得到了很大程度的减小，这对于浏览器资源加载速度的提升起到了非常有效的帮助。但是需要注意的是访问 Gzip 压缩的文件需要服务端进行相应配置，以下是 Nginx Gzip 压缩的流程： Nginx 开启 Gzip 压缩配置后，其会根据配置情况对指。","frontmatter":{"title":"项目整合与优化","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"很明显， Gzip 压缩后的文件体积得到了很大程度的减小，这对于浏览器资源加载速度的提升起到了非常有效的帮助。但是需要注意的是访问 Gzip 压缩的文件需要服务端进行相应配置，以下是 Nginx Gzip 压缩的流程： Nginx 开启 Gzip 压缩配置后，其会根据配置情况对指。","sidebarWeight":51,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/安装配置/项目整合与优化.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/项目整合与优化.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/项目整合与优化.md"}'),o={name:"posts/Vue系统教程/01-快速开始与工程环境/项目整合与优化.md"};function i(r,l,u,c,t,m){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"项目整合与优化",tabindex:"-1"},[s("项目整合与优化 "),n("a",{class:"header-anchor",href:"#项目整合与优化","aria-label":'Permalink to "项目整合与优化"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“项目整合与优化”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**使用** **alias** **简化路径**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==使用== ==webpack== ==构建过== ==Vue== ==项目的同学应该知道== ==alias== ==的作用，我们可以使用它将复杂的文件路径定义成一个变量来访问。在不使用== ==alias== ==的项目中，我们引入文件的时候通常会去计算被引入文件对于引入它的文件的相对路径，比如像这样：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**import** ==HelloWorld== **from** =='../../../../HelloWorld.vue'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==一旦相对层次结构较深，我们就很难去定位所引入文件的具体位置，其实这并不是我们应该操心的地方，完全可以交给== ==webpack== ==来进行处理。在原生的== ==webpack== ==配置中我们可以定义== ==alias== ==来解决这一问题：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"const path = require('path')")]),s(`
`),n("span",{class:"line"},[n("span",null,"const resolve = dir => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return path.join(__dirname, dir)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  resolve: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    alias: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      '@': resolve('src'),"),n("span",null," // 定义 src 目录变量")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _lib: resolve('src/common'), // 定义 common 目录变量,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _com: resolve('src/components'), // 定义 components 目录变量,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _img: resolve('src/images'), // 定义 images 目录变量,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _ser: resolve('src/services'), // 定义 services 目录变量,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"==上方我们在== ==webpack resolve====（解析）对象下配置== ==alias== ==的值，将常用的一些路径赋值给了我们自定义的变量，这样我们便可以将第一个例子简化为：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**import** ==HelloWorld== **from** =='_com/HelloWorld.vue'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==而在== ==CLI 3.x== ==中我们无法直接操作== ==webpack== ==的配置文件，我们需要通过== ==chainWebpack== ==来进行间接修改，代码如下：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* vue.config.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  chainWebpack: config => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    config.resolve.alias")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .set('@', resolve('src'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .set('_lib', resolve('src/common'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .set('_com', resolve('src/components'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .set('_img', resolve('src/images'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .set('_ser', resolve('src/services'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意：**==这样我们修改== ==webpack alias== ==来简化路径的优化就实现了。但是需要注意的是对于在样式及== ==html== ==模板中引用路径的简写时，前面需要加上== ==～== ==符，否则路径解析会失败，如：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==.img {======    ==background====: (~_img/home.png);========}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**整合功能模块**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==在多页应用的构建中，由于存在多个入口文件，因此会出现重复书写相同入口配置的情况，这样对于后期的修改和维护都不是特别友好，需要修改所有入口文件的相同配置，比如在== ==index== ==单页的入口中我们引用了== ==VConsole== ==及== ==performance== ==的配置，同时在== ==Vue== ==实例上还添加了== ==$openRouter== ==方法：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**import** ==Vue== **from** =='vue'======**import** ==App== **from** =='./index.vue'======**import** ==router== **from** =='./router'======**import** ==store== **from** =='@/store/'======**import** =={ Navigator }== **from** =='../../common'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==//== ==如果是非线上环境，不加载== ==VConsole======**if** ==(process.env.NODE_ENV !==== =='production'====) {======    **var** ==VConsole === ==require====(===='vconsole/dist/vconsole.min.js'====);======    **var** ==vConsole === **new** ==VConsole();======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Vue.config.performance === ==true====;========}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Vue.$openRouter = Vue.prototype.$openRouter = Navigator.openRouter;======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**new** ==Vue({======  ==router,======  ==store,======  ==render: h => h(App)========}).$mount(===='#app'====)======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==而在== ==page1== ==和== ==page2== ==的入口文件中也同样进行了上述配置，那我们该如何整合这些重复代码，使其能够实现一次修改多处生效的功能呢？最简单的方法便是封装成一个共用方法来进行调用，这里我们可以在== ==common== ==文件夹下新建== ==entryConfig== ==文件夹用于放置入口文件中公共配置的封装，封装代码如下：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**import** =={ Navigator }== **from** =='../index'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**export** **default** ==(Vue) => {======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==//== ==如果是非线上环境，不加载== ==VConsole======    **if** ==(process.env.NODE_ENV !==== =='production'====) {======        **var** ==VConsole === ==require====(===='vconsole/dist/vconsole.min.js'====);======        **var** ==vConsole === **new** ==VConsole();======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Vue.config.performance === ==true====;======    ==}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Vue.$openRouter = Vue.prototype.$openRouter = Navigator.openRouter;========}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==上述代码我们向外暴露了一个函数，在调用它的入口文件中传入== ==Vue== ==实例作为参数即可实现内部功能的共用，我们可以将原本的入口文件简化为====:==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**import** ==Vue== **from** =='vue'======**import** ==App== **from** =='./index.vue'======**import** ==router== **from** =='./router'======**import** ==store== **from** =='@/store/'======**import** ==entryConfig== **from** =='_lib/entryConfig/'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==//== ==调用公共方法加载配置========entryConfig(Vue)======")]),s(`
`),n("span",{class:"line"},[n("span",null,"**new** ==Vue({======  ==router,======  ==store,======  ==render: h => h(App)========}).$mount(===='#app'====)======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==这样我们便完成了入口文件配置的整合，当然你还可以给该函数传入== ==router== ==实例及自定义参数用于其他共用配置的封装。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**开启** **Gzip** **压缩**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==在《====webpack== ==在== ==CLI 3== ==中的应用》章节，我们介绍了== ==CLI== ==为我们内置的== ==webpack plugins====，使用这些内置插件基本已经能够满足我们大多数项目的构建和优化，当然你仍然可以为项目添加自己想要的插件来实现一些差异化的功能，比如使用== ==compression-webpack-plugin== ==来开启== ==Gzip== ==压缩。在== ==vue.config.js== ==配置文件中，我们通过== ==configureWebpack== ==中返回一个对象来实现== ==plugins== ==的合并：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==/* vue.config.js */======**const** ==isPro = process.env.NODE_ENV ===== =='production'======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==module====.exports = {======    ==...======    ====    ==configureWebpack: config => {======        **if** ==(isPro) {======            **return** =={======                ==plugins: [======                    **new** ==CompressionWebpackPlugin({======                         ==//== ==目标文件名称。====[path]== ==被替换为原始文件的路径和== ==[query]== ==查询======                        ==filename:== =='[path].gz[query]'====,======                        ==//== ==使用== ==gzip== ==压缩======                        ==algorithm:== =='gzip'====,== ====                        ==//== ==处理与此正则相匹配的所有文件======                        ==test:== **new** ==RegExp====(======                            =='====\\\\.(js|css)$===='======                        ==),======                        ==//== ==只处理大于此大小的文件======                        ==threshold:== ==10240====,======                        ==//== ==最小压缩比达到== ==0.8== ==时才会被压缩======                        ==minRatio:== ==0.8====，======                    ==})======                ==]======            ==}======        ==}======    ==}======    ==...========}======")]),s(`
`),n("span",{class:"line"},[n("span",null,"==上方我们通过在生产环境中增加== ==Gzip== ==压缩配置实现了打包后输出增加对应的== ==.gz== ==为后缀的文件，而由于我们配置项中配置的是只压缩大小超过== ==10240B====（====10kB====）的== ==JS== ==及== ==CSS====，因此不满足条件的文件不会进行== ==Gzip== ==压缩。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Gzip== ==压缩能在普通压缩的基础上再进行== ==50%== ==以上== ==的压缩，我们可以直接来看下控制台的输出对比图：==")])])])]),n("p",null,[s("==很明显，====Gzip== ==压缩后的文件体积得到了很大程度的减小，这对于浏览器资源加载速度的提升起到了非常有效的帮助。但是需要注意的是访问== ==Gzip== ==压缩的文件需要服务端进行相应配置，以下是== ==Nginx Gzip== ==压缩的流程：== ==Nginx== ==开启== ==Gzip== ==压缩配置后，其会根据配置情况对指定的类型文件进行压缩，主要针对== ==JS== ==与== ==CSS== ==。如果文件路径中存在与原文件同名（加了个== ==.gz====），====Nginx== ==会获取== ==gz== ==文件，如果找不到，会主动进行== ==Gzip== ==压缩。== "),n("strong",null,"结语"),s(" ==至此，一路走来，我们成功完成了本小册== ==Vue== ==项目构建部分的教程，从== ==CLI 3.x== ==的使用到项目内外部环境的配置，再到最后多页应用的拓展，我们循序渐进、由浅入深的讲解了== ==Vue== ==项目构建的主要知识点及详细流程，希望大家能够在此基础上举一反三，结合实际代码，将理论知识转化为实际运用，配合自己的理解，一步步实现自己的项目构建，并为构建出的项目添砖加瓦，实现质的飞跃。== "),n("strong",null,"思考"),s(),n("strong",null,"&"),s(),n("strong",null,"作业")]),n("p",null,"==除了本文中介绍的项目优化方法，还有哪些常见的优化手段？如何通过== ==Vue CLI 3== ==配置实现？=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==总结并对比== ==Vue CLI 2.x====，====Vue CLI 3.x== ==在项目构建方面有哪些优势和不足？==")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/book/5b23a5aef265da59716fda09/section/5b679af4e51d45162679fb95>")])])])])],-1)])])}const v=e(o,[["render",i]]);export{d as __pageData,v as default};
