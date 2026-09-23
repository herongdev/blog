import{_ as e,o as a,c as p,j as l,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"vue中style的scope属性","description":"在 vue 项目中通常会给 style 标签加上 scope 属性，以此来实现样式的私有化，避免全局污染。但有的时候这个属性又会带来麻烦：当引入第三方组件且需要修改其样式时，通常出现没有修改成功的情况 一、 scope 实现私有化样式的原理 通过给 DOM 元素结构上以及 css。","frontmatter":{"title":"vue中style的scope属性","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","模板、组件与交互"],"description":"在 vue 项目中通常会给 style 标签加上 scope 属性，以此来实现样式的私有化，避免全局污染。但有的时候这个属性又会带来麻烦：当引入第三方组件且需要修改其样式时，通常出现没有修改成功的情况 一、 scope 实现私有化样式的原理 通过给 DOM 元素结构上以及 css。","sidebarWeight":3,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/api/Class和style属性/vue中style的scope属性.md"},"headers":[],"relativePath":"posts/Vue系统教程/02-模板、组件与交互/Class和style属性/vue中style的scope属性.md","filePath":"posts/Vue系统教程/02-模板、组件与交互/Class和style属性/vue中style的scope属性.md"}'),i={name:"posts/Vue系统教程/02-模板、组件与交互/Class和style属性/vue中style的scope属性.md"};function c(t,n,u,o,d,g){return a(),p("div",null,[...n[0]||(n[0]=[l("div",null,[l("h1",{id:"vue中style的scope属性",tabindex:"-1"},[s("vue中style的scope属性 "),l("a",{class:"header-anchor",href:"#vue中style的scope属性","aria-label":'Permalink to "vue中style的scope属性"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“vue中style的scope属性”的核心思路，并能把它用于实际开发或面试表达。")]),l("blockquote",null,[l("p",null,[s("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 在"),l("code",null,"vue"),s("项目中通常会给"),l("code",null,"style"),s("标签加上"),l("code",null,"scope"),s("属性，以此来实现样式的私有化，避免全局污染。但有的时候这个属性又会带来麻烦：当引入第三方组件且需要修改其样式时，通常出现没有修改成功的情况")])]),l("p",null,[s("一、"),l("code",null,"scope"),s("实现私有化样式的原理")]),l("p",null,[s("通过给"),l("code",null,"DOM"),s("元素结构上以及"),l("code",null,"css"),s("样式上添加一个不重复的标记，来保证其唯一性，以此达到样式的私有化")]),l("p",null,[s("例如：当使用第三方插件"),l("code",null,"elementui"),s("的"),l("code",null,"button"),s("、"),l("code",null,"dialog"),s("组件，并在"),l("code",null,"style"),s("标签上加上"),l("code",null,"scoped"),s("的属性")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<template>")]),s(`
`),l("span",{class:"line"},[l("span",null,'  <div class="login-page">')]),s(`
`),l("span",{class:"line"},[l("span",null,"    <h1>{{ msg }}</h1>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="login">')])])])]),l("p",null,"登录"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="dialogVisible = true">')])])])]),l("p",null,"弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <el-input></el-input>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"      <el-dialog")]),s(`
`),l("span",{class:"line"},[l("span",null,'        title="')])])])]),l("p",null,"提示"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'1111"')]),s(`
`),l("span",{class:"line"},[l("span",null,'        :visible.sync="dialogVisible"')]),s(`
`),l("span",{class:"line"},[l("span",null,"      >")])])])]),l("p",null,"这是一个弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"      </el-dialog>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"</template>")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<style lang="less" scoped>')]),s(`
`),l("span",{class:"line"},[l("span",null,'  @import "../less/login.less";')]),s(`
`),l("span",{class:"line"},[l("span",null,"</style>")])])])]),l("p",null,[l("code",null,"login.less"),s("文件")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,".login-page{")]),s(`
`),l("span",{class:"line"},[l("span",null,"  h1{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    cursor: pointer;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    background: #f00;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-button{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-input{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 100px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }   .el-dialog{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width:200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    height: 300px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    background: #ddd;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[s("在浏览器运行后的"),l("code",null,"DOM"),s("显示结果为： "),l("code",null,"1"),s("、"),l("code",null,"el-button"),s("元素加上了"),l("code",null,"data"),s("属性，且其"),l("code",null,"css"),s("也加上了"),l("code",null,"data"),s("属性选择器 "),l("code",null,"2"),s("、"),l("code",null,"el-dialog"),s("组件元素只有最外层元素有"),l("code",null,"data"),s("属性，从第二层元素起就没有，且虽然在"),l("code",null,"login.less"),s("文件中改变其样式，但是没有效果")]),l("p",null,[s("由此可以看出： "),l("code",null,"1"),s("、添加"),l("code",null,"scoped"),s("属性之后，"),l("code",null,"DOM"),s("节点添加了一个不重复的"),l("code",null,"data"),s("属性来表示其唯一性 "),l("code",null,"2"),s("、添加"),l("code",null,"scoped"),s("属性之后，"),l("code",null,"DOM"),s("节点的"),l("code",null,"css"),s("选择器末尾添加了"),l("code",null,"data"),s("属性选择器来私有化该元素的样式 "),l("code",null,"3"),s("、添加"),l("code",null,"scoped"),s("属性之后，会给组件的最外部添加"),l("code",null,"data"),s("属性，如果组件里面还有包含其他组件，那么其他组件是作用不到的")]),l("p",null,[s("二、解决引入第三方组件并修改其样式不生效的问题 "),l("code",null,"1"),s("、解决方案一：因为"),l("code",null,"vue"),s("文件中可以出现多个"),l("code",null,"style"),s("，所以可以使用两个"),l("code",null,"style"),s("，一个"),l("code",null,"style"),s("加上"),l("code",null,"scoped"),s("属性，一个"),l("code",null,"style"),s("不加"),l("code",null,"scoped"),s("属性， 且将第三方组件中嵌套的元素样式放置在不带"),l("code",null,"scoped"),s("的"),l("code",null,"style"),s("元素内，这样子第三方组件中的嵌套元素中样式就可以生效了")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<template>")]),s(`
`),l("span",{class:"line"},[l("span",null,'  <div class="login-page">')]),s(`
`),l("span",{class:"line"},[l("span",null,"    <h1>{{ msg }}</h1>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="login">')])])])]),l("p",null,"登录"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="dialogVisible = true">')])])])]),l("p",null,"弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <el-input></el-input>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"      <el-dialog")]),s(`
`),l("span",{class:"line"},[l("span",null,'        title="')])])])]),l("p",null,"提示"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'1111"')]),s(`
`),l("span",{class:"line"},[l("span",null,'        :visible.sync="dialogVisible"')]),s(`
`),l("span",{class:"line"},[l("span",null,"      >")])])])]),l("p",null,"这是一个弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"      </el-dialog>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"</template>")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<style lang="less" scoped>')]),s(`
`),l("span",{class:"line"},[l("span",null,'  @import "../less/login.less";')]),s(`
`),l("span",{class:"line"},[l("span",null,"</style>")]),s(`
`),l("span",{class:"line"},[l("span",null,'<style lang="less">')]),s(`
`),l("span",{class:"line"},[l("span",null,"   .el-dialog{//")])])])]),l("p",null,[s("将第三方组件中嵌套的元素样式放置在不带"),l("code",null,"scoped"),s("的"),l("code",null,"style"),s("元素内，这样子第三方组件中的嵌套元素中样式就可以生效了")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"      width:200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"      height: 300px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"      background: #ddd;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    }")]),s(`
`),l("span",{class:"line"},[l("span",null,"</style>")]),s(`
`),l("span",{class:"line"},[l("span",null,"login.less")])])])]),l("p",null,"文件"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,".login-page{")]),s(`
`),l("span",{class:"line"},[l("span",null,"  h1{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    cursor: pointer;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    background: #f00;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-button{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-input{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 100px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[l("code",null,"2"),s("、解决方案二：使用深度选择器： "),l("code",null,"\\<\\<\\<"),s(" 或者 "),l("code",null,"/deep/"),s(" 穿透性的改变第三方组件的样式需要加上"),l("code",null,"deep,"),s("如果是"),l("code",null,"stylus"),s("使用 "),l("code",null,"\\>\\>\\> ,"),s("如果是"),l("code",null,"less"),s(" 或者"),l("code",null,"sass"),s("就使用 "),l("code",null,"/deep/")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<template>")]),s(`
`),l("span",{class:"line"},[l("span",null,'  <div class="login-page">')]),s(`
`),l("span",{class:"line"},[l("span",null,"    <h1>{{ msg }}</h1>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="login">')])])])]),l("p",null,"登录"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,'      <el-button type="success" @click="dialogVisible = true">')])])])]),l("p",null,"弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</el-button>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <el-input></el-input>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    <div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"      <el-dialog")]),s(`
`),l("span",{class:"line"},[l("span",null,'        title="')])])])]),l("p",null,"提示"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'1111"')]),s(`
`),l("span",{class:"line"},[l("span",null,'        :visible.sync="dialogVisible"')]),s(`
`),l("span",{class:"line"},[l("span",null,"      >")])])])]),l("p",null,"这是一个弹框"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"      </el-dialog>")]),s(`
`),l("span",{class:"line"},[l("span",null,"    </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"</template>")])])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<style lang="less" scoped>')]),s(`
`),l("span",{class:"line"},[l("span",null,'  @import "../less/login.less";')]),s(`
`),l("span",{class:"line"},[l("span",null,"</style>")])])])]),l("p",null,[l("code",null,"login.less"),s("文件")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,".login-page{")]),s(`
`),l("span",{class:"line"},[l("span",null,"  h1{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    cursor: pointer;")]),s(`
`),l("span",{class:"line"},[l("span",null,"    background: #f00;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-button{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  .el-input{")]),s(`
`),l("span",{class:"line"},[l("span",null,"    width: 100px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"  //")])])])]),l("p",null,[s("穿透性的改变第三方组件的样式需要加上"),l("code",null,"deep,"),s("如果是"),l("code",null,"stylus"),s("使用 "),l("code",null,"\\>\\>\\> ,"),s("如果是"),l("code",null,"less"),s(" 或者"),l("code",null,"sass"),s("就使用")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"  /deep/")]),s(`
`),l("span",{class:"line"},[l("span",null,"  /deep/.el-dialog{")]),s(`
`),l("span",{class:"line"},[l("span",null,"        width:200px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"        height: 300px;")]),s(`
`),l("span",{class:"line"},[l("span",null,"        background: #ddd;")]),s(`
`),l("span",{class:"line"},[l("span",null,"  }")]),s(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[l("code",null,"el-dialog"),s("成功产生效果为所自定义的样式：")])],-1)])])}const b=e(i,[["render",c]]);export{v as __pageData,b as default};
