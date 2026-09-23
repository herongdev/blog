import{_ as a,o as e,c as p,j as s,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"数组处理","description":"因为我们很少使用属性名，即键名的方式去对数组进行取值或赋值操作； 此时还对数据按索引进行截持时，如果数组长度大时，将会非常耗性能； 所以数组需要特殊处理： 正常用户修改数组，无非采用数组的变异方法， push、pop、splice、shift、unsfhit、reverse、so。","frontmatter":{"title":"数组处理","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"因为我们很少使用属性名，即键名的方式去对数组进行取值或赋值操作； 此时还对数据按索引进行截持时，如果数组长度大时，将会非常耗性能； 所以数组需要特殊处理： 正常用户修改数组，无非采用数组的变异方法， push、pop、splice、shift、unsfhit、reverse、so。","sidebarWeight":62,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/使用我们的Vue/数组处理.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数组处理.md","filePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数组处理.md"}'),i={name:"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数组处理.md"};function t(c,n,u,o,r,d){return e(),p("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"数组处理",tabindex:"-1"},[l("数组处理 "),s("a",{class:"header-anchor",href:"#数组处理","aria-label":'Permalink to "数组处理"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“数组处理”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"注意：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Object.keys、Ojbect.values、Ojbect.entries都可以遍历数组；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"此外，Object.defineProperty方法可以对数组的访问进行拦截，如下代码：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"var a = [1, 2, 3, 4]")]),l(`
`),s("span",{class:"line"},[s("span",null,"Object.entries(a).forEach(([k, v]) => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    Object.defineProperty(a, k, {")]),l(`
`),s("span",{class:"line"},[s("span",null,"        get() {")]),l(`
`),s("span",{class:"line"},[s("span",null,"            // 闭包，此vaule会向上层的value进行查找")]),l(`
`),s("span",{class:"line"},[s("span",null,"            return v + 1;")]),l(`
`),s("span",{class:"line"},[s("span",null,"        },")]),l(`
`),s("span",{class:"line"},[s("span",null,"        set(newValue) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"            v = newValue;")]),l(`
`),s("span",{class:"line"},[s("span",null,"        }")]),l(`
`),s("span",{class:"line"},[s("span",null,"    })")]),l(`
`),s("span",{class:"line"},[s("span",null,"})")]),l(`
`),s("span",{class:"line"},[s("span",null,"console.log(a[1])；// 输出为3")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"所以，之前的代码会对数组的每一项进行劫持；这不合适；")])])])]),s("p",null,"因为我们很少使用属性名，即键名的方式去对数组进行取值或赋值操作；"),s("p",null,"此时还对数据按索引进行截持时，如果数组长度大时，将会非常耗性能；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"所以这种当成对象处理的方式不合适；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"所以修改数组索引和修改数组长度不会引发更新；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"但vue3中为了兼容proxy，内部对数组就是defineProperty")])])])]),s("p",null,"所以数组需要特殊处理： 正常用户修改数组，无非采用数组的变异方法， push、pop、splice、shift、unsfhit、reverse、sort"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"修改observe/index.js中逻辑")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"当new Observe(value)传入的值是数组时，我们进行特殊处理；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"处理的方式是对数组的变异方法进行重写；")])])])]),s("ul",null,[s("li",null,[s("p",null,"然后再调用observeArray方法遍历数组，对数组每一项调用observe进行数据劫持，这样的话："),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果数组成员是基本数据类型，不进行劫持。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果是objcet类型时，再进行劫持；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果是数组，我们递归进行处理；")])])])])])]),s("p",null,"这样的话，对于数组中的成员，如果是数组，它的原型上的七个变异方法都是被重写过的；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class Observer {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  constructor(value) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // 核心是循环对象")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==if== ==(====isArray====(====value====)) {==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==//== ==更改数组原型方法====,== ==如果是数组== ==我就改写数组的原型链==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==value====.====__proto__== ===== ==arrayMethods====;== ==//== ==重写数组的方法==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==this====.====observeArray====(====value====);==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==}== ==else== =={==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==this====.====walk====(====value====);== ==//== ==核心就是循环对象==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==}==")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  ==observeArray====(====data====) {== ==//== ==递归遍历数组，对数组内部的对象再次重写== ==[[]]  [{}]==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==// vm.arr[0].a = 100;==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==// vm.arr[0] = 100;==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==//== ==数组里面如果是引用类型那么是响应式的==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==data====.====forEach====(====item== ===>== ==observe====(====item====));==")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  walk(data) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // 使用defineProperty重新定义")]),l(`
`),s("span",{class:"line"},[s("span",null,"    Object.keys(data).forEach(key => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      defineReactive(data, key, data[key])")]),l(`
`),s("span",{class:"line"},[s("span",null,"    })")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"新建observe/array.js文件：")]),l(`
`),s("span",{class:"line"},[s("span",null,"主要逻辑：")])])])]),s("p",null,"如果变异方法是对数组元素进行新增，我们要对新增的元素调用数组的observeArray方法进行新值的劫持；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果变异方法是对数组元素进行删除，我们不用处理；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"这里注意使用…args将参数转化为数组；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"要让这arrayMethods方法可以获取到Observe实例的observeArray方法；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class Observer {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  constructor(value) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // 不让__ob__ 被遍历到")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // value.__ob__ = this;"),s("span",null," // 我给对象和数组添加一个自定义属性")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==Object====.====defineProperty====(====value====,== =='__ob__'====,== =={==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==value:== ==this====,==")]),l(`
`),s("span",{class:"line"},[s("span",null,"      ==enumerable:== ==false== ==//== ==标识这个属性不能被列举出来，不能被循环到==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==})==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // 核心是循环对象")]),l(`
`),s("span",{class:"line"},[s("span",null,"    if (isArray(value)) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      // 更改数组原型方法, 如果是数组 我就改写数组的原型链")]),l(`
`),s("span",{class:"line"},[s("span",null,"      value.__proto__ = arrayMethods; // 重写数组的方法")]),l(`
`),s("span",{class:"line"},[s("span",null,"      this.observeArray(value);")]),l(`
`),s("span",{class:"line"},[s("span",null,"    } else {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      this.walk(value); // 核心就是循环对象")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  observeArray(data) { // 递归遍历数组，对数组内部的对象再次重写 [[]]  [{}]")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // vm.arr[0].a = 100;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // vm.arr[0] = 100;")]),l(`
`),s("span",{class:"line"},[s("span",null,"    data.forEach(item => observe(item)); // 数组里面如果是引用类型那么是响应式的")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  walk(data) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    // 使用defineProperty重新定义")]),l(`
`),s("span",{class:"line"},[s("span",null,"    Object.keys(data).forEach(key => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"      defineReactive(data, key, data[key])")]),l(`
`),s("span",{class:"line"},[s("span",null,"    })")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")]),l(`
`),s("span",{class:"line"},[s("span",null,"为了observe方法调用时的死循环，我们在上面的代码中定义==enumerable:== ==false==")]),l(`
`),s("span",{class:"line"},[s("span",null,"此外，添加以下代码，防止属性被重复劫持；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export function observe(value) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  if (!isObject(value)) return;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  ==if== ==(====value====.====__ob__====) {==")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ==return====;== ==//== ==一个对象不需要重新被观测==")]),l(`
`),s("span",{class:"line"},[s("span",null,"  ==}==")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 利用new Class方式的特点")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 调用函数")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 返回一个实例")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 这个实例我们加上了很多实例属性和方法")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return new Observer(value)")]),l(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// 获取数组的老的原型方法")]),l(`
`),s("span",{class:"line"},[s("span",null,"let oldArrayPrototype = Array.prototype;")]),l(`
`),s("span",{class:"line"},[s("span",null,"// 让arrayMethods 通过__proto__ 能获取到数组的方法")]),l(`
`),s("span",{class:"line"},[s("span",null,"// 相当于 arrayMethods.__proto__ == oldArrayPrototype")]),l(`
`),s("span",{class:"line"},[s("span",null,"export let arrayMethods = Object.create(oldArrayPrototype);")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// 只有这七个方法 可以导致数组发生变化")]),l(`
`),s("span",{class:"line"},[s("span",null,"let methods = [")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'push',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'shift',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'pop',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'unshift',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'reverse',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'sort',")]),l(`
`),s("span",{class:"line"},[s("span",null,"    'splice'")]),l(`
`),s("span",{class:"line"},[s("span",null,"]")]),l(`
`),s("span",{class:"line"},[s("span",null,"methods.forEach(method => {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    arrayMethods[method] = function (...args) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"        // 数组新增的属性 要看一下是不是对象，如果是对象 继续进行劫持")]),l(`
`),s("span",{class:"line"},[s("span",null,"        // 需要调用数组原生逻辑")]),l(`
`),s("span",{class:"line"},[s("span",null,"        oldArrayPrototype[method].call(this, ...args)")]),l(`
`),s("span",{class:"line"},[s("span",null,"        // todo... 可以添加自己逻辑 函数劫持 切片")]),l(`
`),s("span",{class:"line"},[s("span",null,"        let inserted = null;")]),l(`
`),s("span",{class:"line"},[s("span",null,"        let ob = this.__ob__;// this指向数组实例，即调用此方法的数组")]),l(`
`),s("span",{class:"line"},[s("span",null,"        switch (method) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"            // 修改 删除  添加  arr.splice(0,0,100,200,300)")]),l(`
`),s("span",{class:"line"},[s("span",null,"            case 'splice':")]),l(`
`),s("span",{class:"line"},[s("span",null,"                // splice方法从第三个参数起 是增添的新数据")]),l(`
`),s("span",{class:"line"},[s("span",null,"                inserted = args.slice(2);")]),l(`
`),s("span",{class:"line"},[s("span",null,"                break;")]),l(`
`),s("span",{class:"line"},[s("span",null,"            case 'push':")]),l(`
`),s("span",{class:"line"},[s("span",null,"            case 'unshift':")]),l(`
`),s("span",{class:"line"},[s("span",null,"                // 调用push 和 unshift 传递的参数就是新增的逻辑")]),l(`
`),s("span",{class:"line"},[s("span",null,"                inserted = args;")]),l(`
`),s("span",{class:"line"},[s("span",null,"                break;")]),l(`
`),s("span",{class:"line"},[s("span",null,"        }")]),l(`
`),s("span",{class:"line"},[s("span",null,"        // inserted[] 遍历数组 看一下它是否需要进行劫持")]),l(`
`),s("span",{class:"line"},[s("span",null,"        if (inserted) ob.observeArray(inserted)")]),l(`
`),s("span",{class:"line"},[s("span",null,"    }")]),l(`
`),s("span",{class:"line"},[s("span",null,"});")])])])]),s("p",null,"所以，如果数组使用变异方法新增了元素，这些新增的元素转换成一个数组，然后会偏历其中的每个元素，并对其调用observe方法，也就是如果是对象，就进行截持，基本类型不做处理；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"总结：")]),l(`
`),s("span",{class:"line"},[s("span",null,"New Observer中的重要逻辑：")])])])]),s("p",null,"给每个传入的值，也就是对象类型的值，加上__ob__属性，表示已经被观测；同时，通过每个值的__ob__属性，就能获取Observer对象，也就能获取Observer对象的所有属性和方法；"),s("p",null,"再判断传入的值是对象还是数组，如果是对象，遍历对象的属性值，然后分别添加get和set方法拦截对属性的访问和修改；"),s("p",null,"如果是数组，修改这个数组的原型，这样当调用这个数组的变异方法时，会调用我们改写过的变异方法；其中这些变异方法如果是给数组新增元素，我们把新增的元素用数组进行包装，然后调用obsever对象的observerArray方法，也就是对每个数组元素进行调用observer方法进行观测，如果其中的元素是数组，我们再递归调用observerArray方法；")],-1)])])}const g=a(i,[["render",t]]);export{v as __pageData,g as default};
