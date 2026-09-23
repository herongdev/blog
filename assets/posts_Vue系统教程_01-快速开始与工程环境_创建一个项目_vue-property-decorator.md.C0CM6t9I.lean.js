import{_ as e,o as a,c as p,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"vue-property-decorator","description":"官网：kaorun343/vue property decorator: Vue.js and Property Decorator (github.com) 这个组件完全依赖于 vue class component .它具备以下几个属性: @Component (完全继承于。","frontmatter":{"title":"vue-property-decorator","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"官网：kaorun343/vue property decorator: Vue.js and Property Decorator (github.com) 这个组件完全依赖于 vue class component .它具备以下几个属性: @Component (完全继承于。","sidebarWeight":12,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue-cli/创建一个项目/vue-property-decorator.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/创建一个项目/vue-property-decorator.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/创建一个项目/vue-property-decorator.md"}'),o={name:"posts/Vue系统教程/01-快速开始与工程环境/创建一个项目/vue-property-decorator.md"};function u(t,s,i,c,d,r){return a(),p("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"vue-property-decorator",tabindex:"-1"},[n("vue-property-decorator "),l("a",{class:"header-anchor",href:"#vue-property-decorator","aria-label":'Permalink to "vue-property-decorator"'},"​")]),l("blockquote",null,[l("p",null,[n("本节目标：理解“vue-property-decorator”的核心思路，并能把它用于实际开发或面试表达。 官网："),l("a",{href:"https://github.com/kaorun343/vue-property-decorator",target:"_blank",rel:"noreferrer"},"kaorun343/vue-property-decorator: Vue.js and Property Decorator (github.com)"),n(" 这个组件完全依赖于"),l("code",null,"vue-class-component"),n(".它具备以下几个属性:")])]),l("ul",null,[l("li",null,[n("@Component (完全继承于"),l("code",null,"vue-class-component"),n(")")]),l("li",null,"@Emit"),l("li",null,"@Inject"),l("li",null,"@Provice"),l("li",null,"@Prop"),l("li",null,"@Watch"),l("li",null,"@Model"),l("li",null,[n("Mixins (在"),l("code",null,"vue-class-component"),n("中定义);")])]),l("p",null,[n("使用 当我们在"),l("code",null,"vue"),n("单文件中使用"),l("code",null,"TypeScript"),n("时,引入"),l("code",null,"vue-property-decorator"),n("之后,"),l("code",null,"script"),n("中的标签就变为这样")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<script lang="ts">')]),n(`
`),l("span",{class:"line"},[l("span",null,"    import {Vue, Component} from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"    @Component({})")]),n(`
`),l("span",{class:"line"},[l("span",null,'    export default class "')])])])]),l("p",null,"组件名"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'" extends Vue{')]),n(`
`),l("span",{class:"line"},[l("span",null,'        ValA: string = "hello world";')]),n(`
`),l("span",{class:"line"},[l("span",null,"        ValB: number = 1;")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"<\/script>")])])])]),l("p",null,"等同于"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'<script lang="es6">')]),n(`
`),l("span",{class:"line"},[l("span",null,"    import Vue from 'vue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"    export default {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        data(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"            return {")]),n(`
`),l("span",{class:"line"},[l("span",null,"                ValA: 'hello world',")]),n(`
`),l("span",{class:"line"},[l("span",null,"                ValB: 1")]),n(`
`),l("span",{class:"line"},[l("span",null,"            }")]),n(`
`),l("span",{class:"line"},[l("span",null,"        }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"<\/script>")])])])]),l("p",null,[n("总结: 对于"),l("code",null,"data"),n("里的变量对顶,我们可以直接按"),l("code",null,"ts"),n("定义类变量的写法写就可以 那么如果是计算属性呢? 这就要用到"),l("code",null,"getter"),n("了.")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component({})")]),n(`
`),l("span",{class:"line"},[l("span",null,'export default class "')])])])]),l("p",null,"组件名"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'" extends Vue{')]),n(`
`),l("span",{class:"line"},[l("span",null,"    get ValA(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return 1;")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,"等同于"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import Vue from 'vue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  computed: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    ValA: function () {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      return 1;")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("总结: 对于"),l("code",null,"Vue"),n("中的计算属性,我们只需要将该计算属性名定义为一个函数,并在函数前加上"),l("code",null,"get"),n("关键字即可. 原本"),l("code",null,"Vue"),n("中的"),l("code",null,"computed"),n("里的每个计算属性都变成了在前缀添加"),l("code",null,"get"),n("的函数. @Emit 关于"),l("code",null,"Vue"),n("中的事件的监听与触发,"),l("code",null,"Vue"),n("提供了两个函数"),l("code",null,"$emit"),n("和"),l("code",null,"$on"),n(".那么在"),l("code",null,"vue-property-decorator"),n("中如何使用呢? 这就需要用到"),l("code",null,"vue-property-decorator"),n("提供的"),l("code",null,"@Emit"),n("属性.")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Emit } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component({})")]),n(`
`),l("span",{class:"line"},[l("span",null,'export default class "')])])])]),l("p",null,"组件名"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'" extends Vue{')]),n(`
`),l("span",{class:"line"},[l("span",null,"  mounted(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.$on('emit-todo', function (n) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      console.log(n)")]),n(`
`),l("span",{class:"line"},[l("span",null,"    })")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.emitTodo('world');")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  @Emit()")]),n(`
`),l("span",{class:"line"},[l("span",null,"  emitTodo(n: string){")]),n(`
`),l("span",{class:"line"},[l("span",null,"    console.log('hello');")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,"运行上面的代码会打印 'hello' 'world', 为什么呢? 让我们来看看它等同于什么"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import Vue from 'vue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  mounted() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.$on('emit-todo', function (n) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      console.log(n)")]),n(`
`),l("span",{class:"line"},[l("span",null,"    })")]),n(`
`),l("span",{class:"line"},[l("span",null,"    this.emitTodo('world');")]),n(`
`),l("span",{class:"line"},[l("span",null,"  },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  methods: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    emitTodo(n) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      console.log('hello');")]),n(`
`),l("span",{class:"line"},[l("span",null,"      this.$emit('emit-todo', n);")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("可以看到,在"),l("code",null,"@Emit"),n("装饰器的函数会在运行之后触发等同于其函数名(==驼峰式会转为横杠式写法==)的事件, 并将其函数传递给"),l("code",null,"$emit"),n(". 如果我们想触发特定的事件呢,比如在"),l("code",null,"emitTodo"),n("下触发"),l("code",null,"reset"),n("事件:")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Emit } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component({})")]),n(`
`),l("span",{class:"line"},[l("span",null,'export default class "')])])])]),l("p",null,"组件名"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'" extends Vue{')]),n(`
`),l("span",{class:"line"},[l("span",null,"  @Emit('reset')")]),n(`
`),l("span",{class:"line"},[l("span",null,"  emitTodo(n: string){")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("我们只需要给装饰器"),l("code",null,"@Emit"),n("传递一个事件名参数"),l("code",null,"reset"),n(",这样函数"),l("code",null,"emitTodo"),n("运行之后就会触发"),l("code",null,"reset"),n("事件. 总结:在"),l("code",null,"Vue"),n("中我们是使用"),l("code",null,"$emit"),n("触发事件,使用"),l("code",null,"vue-property-decorator"),n("时,可以借助"),l("code",null,"@Emit"),n("装饰器来实现."),l("code",null,"@Emit"),n("修饰的函数所接受的参数会在运行之后触发事件的时候传递过去."),l("code",null,"@Emit"),n("触发事件有两种写法")]),l("ol",null,[l("li",null,[l("code",null,"@Emit()"),n("不传参数,那么它触发的事件名就是它所修饰的函数名.")]),l("li",null,[l("code",null,"@Emit(name: string)"),n(",里面传递一个字符串,该字符串为要触发的事件名.")])]),l("p",null,[n("@Watch 我们可以利用"),l("code",null,"vue-property-decorator"),n("提供的"),l("code",null,"@Watch"),n("装饰器来替换"),l("code",null,"Vue"),n("中的"),l("code",null,"watch"),n("属性,以此来监听值的变化. 在"),l("code",null,"Vue"),n("中监听器的使用如下:")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"watch: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  'child': this.onChangeValue")]),n(`
`),l("span",{class:"line"},[l("span",null,"    //")])])])]),l("p",null,[n("这种写法默认 "),l("code",null,"`immediate`"),n("和"),l("code",null,"`deep`"),n("为")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"`false`")]),n(`
`),l("span",{class:"line"},[l("span",null,"    ,")]),n(`
`),l("span",{class:"line"},[l("span",null,"    'person': {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    handler: 'onChangeValue',")]),n(`
`),l("span",{class:"line"},[l("span",null,"      immediate: true,")]),n(`
`),l("span",{class:"line"},[l("span",null,"        deep: true")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"},")]),n(`
`),l("span",{class:"line"},[l("span",null,"methods: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  onChangeValue(newVal, oldVal){")]),n(`
`),l("span",{class:"line"},[l("span",null,"    // todo...")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("那么我们如何使用"),l("code",null,"@Watch"),n("装饰器来改造它呢?")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Watch } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Watch('child')")]),n(`
`),l("span",{class:"line"},[l("span",null,"onChangeValue(newVal: string, oldVal: string){")]),n(`
`),l("span",{class:"line"},[l("span",null,"  // todo...")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Watch('person', { immediate: true, deep: true })")]),n(`
`),l("span",{class:"line"},[l("span",null,"onChangeValue(newVal: Person, oldVal: Person){")]),n(`
`),l("span",{class:"line"},[l("span",null,"  // todo...")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("总结: "),l("code",null,"@Watch"),n("使用非常简单,接受第一个参数为要监听的属性名 第二个属性为可选对象."),l("code",null,"@Watch"),n("所装饰的函数即监听到属性变化之后的操作.")]),l("p",null,[n("@Prop 我们在使用"),l("code",null,"Vue"),n("时有时会遇到子组件接收父组件传递来的参数.我们需要定义"),l("code",null,"Prop"),n("属性. 比如子组件从父组件接收三个属性"),l("code",null,"propA"),n(","),l("code",null,"propB"),n(","),l("code",null,"propC"),n(".")]),l("ul",null,[l("li",null,[l("code",null,"propA"),n("类型为"),l("code",null,"Number")]),l("li",null,[l("code",null,"propB"),n("默认值为"),l("code",null,"default value")]),l("li",null,[l("code",null,"propC"),n("类型为"),l("code",null,"String"),n("或者"),l("code",null,"Boolean")])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"export default {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    propA: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      type: Number")]),n(`
`),l("span",{class:"line"},[l("span",null,"    },")]),n(`
`),l("span",{class:"line"},[l("span",null,"    propB: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      default: 'default value'")]),n(`
`),l("span",{class:"line"},[l("span",null,"    },")]),n(`
`),l("span",{class:"line"},[l("span",null,"    propC: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      type: [String, Boolean]")]),n(`
`),l("span",{class:"line"},[l("span",null,"    },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("我们使用"),l("code",null,"vue-property-decorator"),n("提供的"),l("code",null,"@Prop"),n("可以将上面的代码改造为如下:")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Prop } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component({})")]),n(`
`),l("span",{class:"line"},[l("span",null,'export default class "')])])])]),l("p",null,"组件名"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,'" extends Vue{')]),n(`
`),l("span",{class:"line"},[l("span",null,"  @Prop(Number) propA!: number;")]),n(`
`),l("span",{class:"line"},[l("span",null,"  @Prop({ default: 'default value' }) propB!: string;")]),n(`
`),l("span",{class:"line"},[l("span",null,"  @propC([String, Boolean]) propC: string | boolean;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("==这里== "),l("code",null,"!"),n("==和可选参数=="),l("code",null,"?"),n("==是相反的,== "),l("code",null,"!"),n("==告诉=="),l("code",null,"TypeScript"),n("==我这里一定有值.== 总结: "),l("code",null,"@Prop"),n("接受一个参数可以是类型变量或者对象或者数组."),l("code",null,"@Prop"),n("接受的类型比如"),l("code",null,"Number"),n("是"),l("code",null,"JavaScript"),n("的类型,之后定义的属性类型则是"),l("code",null,"TypeScript"),n("的类型.")]),l("p",null,[n("Mixins 在使用"),l("code",null,"Vue"),n("进行开发时我们经常要用到混合,结合"),l("code",null,"TypeScript"),n("之后我们有两种"),l("code",null,"mixins"),n("的方法. 一种是"),l("code",null,"vue-class-component"),n("提供的. "),l("code",null,"//"),n("定义要混合的类")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," mixins.ts")]),n(`
`),l("span",{class:"line"},[l("span",null,"import Vue from 'vue';")]),n(`
`),l("span",{class:"line"},[l("span",null,"import Component from 'vue-class-component';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component  //")])])])]),l("p",null,[n("一定要用"),l("code",null,"Component"),n("修饰")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"export default class myMixins extends Vue {")]),n(`
`),l("span",{class:"line"},[l("span",null,'  value: string = "Hello"')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[l("code",null,"//"),n(" 引入")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import Component  { mixins }  from 'vue-class-component';")]),n(`
`),l("span",{class:"line"},[l("span",null,"import myMixins from 'mixins.ts';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component")]),n(`
`),l("span",{class:"line"},[l("span",null,"export class myComponent extends mixins(myMixins) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  //")])])])]),l("p",null,[n("直接"),l("code",null,"extends myMinxins"),n(" 也可以正常运行")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"  created() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    console.log(this.value) // => Hello")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("第二种方式是在"),l("code",null,"@Component"),n("中混入，我们改造一下"),l("code",null,"mixins.ts"),n(",定义"),l("code",null,"vue/type/vue"),n("模块,实现"),l("code",null,"Vue"),n("接口")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"// mixins.ts")]),n(`
`),l("span",{class:"line"},[l("span",null,"import { Vue, Component } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"declare module 'vue/types/vue' {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  interface Vue {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    value: string;")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default class myMixins extends Vue {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  value: string = 'Hello'")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,"混入"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Prop } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"import myMixins from '@static/js/mixins';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component({")]),n(`
`),l("span",{class:"line"},[l("span",null,"  mixins: [myMixins]")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default class myComponent extends Vue {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  created() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    console.log(this.value) // => Hello")]),n(`
`),l("span",{class:"line"},[l("span",null,"  }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("总结: 两种方式不同的是在定义"),l("code",null,"mixins"),n("时如果没有定义"),l("code",null,"vue/type/vue"),n("模块, 那么在混入的时候就要==继承==该"),l("code",null,"mixins"),n("; 如果定义"),l("code",null,"vue/type/vue"),n("模块,在混入时可以在"),l("code",null,"@Component"),n("中"),l("code",null,"mixins"),n("直接混入.")]),l("p",null,[n("@Model "),l("code",null,"Vue"),n("组件提供"),l("code",null,"model"),n(": "),l("code",null,"{prop?: string, event?: string}"),n("让我们可以定制"),l("code",null,"prop"),n("和"),l("code",null,"event"),n(". 默认情况下，一个组件上的"),l("code",null,"v-model"),n(" 会把 "),l("code",null,"value"),n("用作 "),l("code",null,"prop"),n("且把 "),l("code",null,"input"),n("用作 "),l("code",null,"event"),n("，但是一些输入类型比如单选框和复选框按钮可能想使用 "),l("code",null,"value prop"),n("来达到不同的目的。使用"),l("code",null,"model"),n("选项可以回避这些情况产生的冲突。 下面是"),l("code",null,"Vue"),n("官网的例子")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"Vue.component('my-checkbox', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  model: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    prop: 'checked',")]),n(`
`),l("span",{class:"line"},[l("span",null,"    event: 'change'")]),n(`
`),l("span",{class:"line"},[l("span",null,"  },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  props: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    // this allows using the `value` prop for a different purpose")]),n(`
`),l("span",{class:"line"},[l("span",null,"    value: String,")]),n(`
`),l("span",{class:"line"},[l("span",null,"    // use `checked` as the prop which take the place of `value`")]),n(`
`),l("span",{class:"line"},[l("span",null,"    checked: {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      type: Number,")]),n(`
`),l("span",{class:"line"},[l("span",null,"      default: 0")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"  },")]),n(`
`),l("span",{class:"line"},[l("span",null,"  // ...")]),n(`
`),l("span",{class:"line"},[l("span",null,"})")]),n(`
`),l("span",{class:"line"},[l("span",null,'<my-checkboxv-model="foo"value="some value"></my-checkbox>')])])])]),l("p",null,"上述代码相当于："),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<my-checkbox")]),n(`
`),l("span",{class:"line"},[l("span",null,'  :checked="foo"')]),n(`
`),l("span",{class:"line"},[l("span",null,'  @change="')]),n(`
`),l("span",{class:"line"},[l("span",null,"    (val) => {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      foo = val;")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,'  "')]),n(`
`),l("span",{class:"line"},[l("span",null,'  value="some value"')]),n(`
`),l("span",{class:"line"},[l("span",null,"></my-checkbox>")])])])]),l("p",null,[n("即"),l("code",null,"foo"),n("双向绑定的是组件的"),l("code",null,"checke"),n(", 触发双向绑定数值的事件是"),l("code",null,"change"),n(" 使用"),l("code",null,"vue-property-decorator"),n("提供的"),l("code",null,"@Model"),n("改造上面的例子.")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { Vue, Component, Model } from 'vue-property-decorator';")]),n(`
`),l("span",{class:"line"},[l("span",null,"@Component")]),n(`
`),l("span",{class:"line"},[l("span",null,"export class myCheck extends Vue {")]),n(`
`),l("span",{class:"line"},[l("span",null,"  @Model('change', { type: Boolean }) checked!: boolean;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")])])])]),l("p",null,[n("总结, "),l("code",null,"@Model()"),n("接收两个参数, 第一个是"),l("code",null,"event"),n("值, 第二个是"),l("code",null,"prop"),n("的类型说明, 与"),l("code",null,"@Prop"),n("类似, 这里的类型要用"),l("code",null,"JS"),n("的. 后面在接着是"),l("code",null,"prop"),n("和在"),l("code",null,"TS"),n("下的类型说明.")]),l("p",null,[n("暂时常用的就这几个,还有"),l("code",null,"@Provice"),n("和"),l("code",null,"@Inject"),n("等用到了再写. > 来自 <"),l("a",{href:"https://www.jianshu.com/p/d8ed3aa76e9b",target:"_blank",rel:"noreferrer"},"https://www.jianshu.com/p/d8ed3aa76e9b"),n(">")])],-1)])])}const v=e(o,[["render",u]]);export{m as __pageData,v as default};
