import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"发布订阅的形成","description":"使用class来实现发布订阅，封装性更好，代码更简洁，对传统程序员更友好； 当使用new Promsie创造实例时，每个实例就在内部定义了几个变量用来保存： 用于触发事件，从而将成功回调函数依次执行的resolve方法和将失败回调函数依次执行的reject方法；我们将成功的值和失。","frontmatter":{"title":"发布订阅的形成","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"使用class来实现发布订阅，封装性更好，代码更简洁，对传统程序员更友好； 当使用new Promsie创造实例时，每个实例就在内部定义了几个变量用来保存： 用于触发事件，从而将成功回调函数依次执行的resolve方法和将失败回调函数依次执行的reject方法；我们将成功的值和失。","sidebarWeight":86,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/promise实现/发布订阅的形成.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/promise实现/发布订阅的形成.md","filePath":"posts/JavaScript系统教程/05-异步编程/promise实现/发布订阅的形成.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/promise实现/发布订阅的形成.md"};function t(c,l,u,o,r,h){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"发布订阅的形成",tabindex:"-1"},[n("发布订阅的形成 "),s("a",{class:"header-anchor",href:"#发布订阅的形成","aria-label":'Permalink to "发布订阅的形成"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“发布订阅的形成”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 使用class来实现发布订阅，封装性更好，代码更简洁，对传统程序员更友好；")]),s("ul",null,[s("li",null,[s("p",null,"当使用new Promsie创造实例时，每个实例就在内部定义了几个变量用来保存："),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"状态")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"成功值和失败原因")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"成功回调函数")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"失败回调函数")])])])]),s("p",null,"用于触发事件，从而将成功回调函数依次执行的resolve方法和将失败回调函数依次执行的reject方法；我们将成功的值和失败的原因会传入回调函数；从而执行状态值变化后的一些逻辑，相当于异步代码执行完后，再将执行结果传入后面的函数，从而实现了异步编程的处理；这里，这个方法是内部方法，不是实例的本身的属性；"),s("p",null,"异步代码我们通过executor函数传入到了类的构造器中；在应用的时候，我们就是将会阻塞的代码也就是异步代码放入executor函数中；在executor方法会传入我们用来触发成功的resolve和失败回调reject两个内部方法；当我们exector中的异步代码成功时，我们就调用触发成功的resolve方法；如果异步代码失败的话，我们就触发失败的reject方法；然后，我们通过then方法来添加成功回调和失败回调；")])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"promise实例的实例方法then方法，用来添加成功回调和失败回调；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"const PENDING = 'PENDING';")]),n(`
`),s("span",{class:"line"},[s("span",null,"const FULFILLED = 'FUFILLED';")]),n(`
`),s("span",{class:"line"},[s("span",null,"const REJECTED = 'REJECTED';")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Promise {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  constructor(excutor) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.state = PENDING;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存成功值")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.value = undefined;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存失败值")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.reason = undefined;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态成功后要执行的回调函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.resolveCallbacks = [];")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态失败后要执行的回调函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.rejectedCallbacks = [];")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 触发成功回调的方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const resolve = (value) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (this.state === PENDING) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.state = FULFILLED;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.value = value;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.resolveCallbacks.forEacth(fn => fn());")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 触发失败回调的方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const reject = (reason) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (this.state === PENDING) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.state = REJECTED;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.reason = reason;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.rejectedCallbacks.forEacth(fn => fn());")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 执行用户定义的控制状态成功或失败的函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    try {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      excutor(resolve, resolve)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } catch (e) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      reject(e);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"then方法添加回调函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Promise {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  constructor(excutor) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.state = PENDING;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存成功值")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.value = undefined;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存失败值")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.reason = undefined;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态成功后要执行的回调函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const resolveCallbacks = [];")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 保存状态失败后要执行的回调函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const rejectedCallbacks = [];")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 触发成功回调的方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const resolve = (value) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (this.state === PENDING) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.state = FULFILLED;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.value = value;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.resolveCallbacks.forEacth(fn => fn());")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 触发失败回调的方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const reject = (reason) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      if (this.state === PENDING) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.state = REJECTED;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.reason = reason;")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.rejectedCallbacks.forEacth(fn => fn());")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 执行用户定义的控制状态成功或失败的函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"    try {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      excutor(resolve, resolve)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } catch (e) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      reject(e);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ==then====(====onResolve====,== ==onReject====)== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==//== ==我们添加回调时，如果异步代码执行完了，状态已经凝固，成功值生成，我们直接执行成功回调==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==if== ==(====this====.====state== ======= ==FULFILLED====)== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==onResolve====(====this====.====value====)==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==}==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==//== ==我们添加回调时，如果异步代码执行完，状态已经凝固，失败值生成，我们直接执行成功回调==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==if== ==(====this====.====state== ======= ==REJECTED====)== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==onReject====(====this====.====reason====)==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==}==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==//== ==如果异步代码还没有执行完，状态未凝固，我们把成功和失败的回调存入到类的成功回调和失败回调中==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==if== ==(====this====.====state== ======= ==PENDING====)== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==this====.====resolveCallbacks====.====push====(()== ===>== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ==//== ==切片，可以加入一些其它逻辑==")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ==onResolve====(====this====.====value====)==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==})==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==this====.====rejectedCallbacks====.====push====(()== ===>== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ==onReject====(====this====.====reason====)==")]),n(`
`),s("span",{class:"line"},[s("span",null,"      ==})==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==}==")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ==}==")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"测试：")]),n(`
`),s("span",{class:"line"},[s("span",null,"const p = new Promise((resolve, reject) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  console.log('start')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  resolve(1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  console.log('end')")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"p.then((v) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  console.log(v)")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"结果")])])])]),s("p",null,"解析，执行器函数会立即执行，这里，我们的成功和失败回调数组中还没有回调函数，所以，执行resolve(1)时，没有任何回调执行； 所以，依次打印出start,end； 接着，我们使用then添加回调函数；这时，我们会判断promsie的状态，如果异步代码已经执行完了，状态已经凝固，异步值已经生成，我们就直接执行成功或失败回调函数，并不会将回调函数放入到promise实例的成功和失败回调数组中去；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"测试")]),n(`
`),s("span",{class:"line"},[s("span",null,"const p = new MyPromise((resolve, reject) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  setTimeout(() => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log('start')")]),n(`
`),s("span",{class:"line"},[s("span",null,"    resolve(1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log('end')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }, 1000);")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"p.then((v) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  console.log(v)")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"打印结果：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"解析：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"执行器函数立即执行；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"将settimeout回调过1秒后放入事件队列；")])])])]),s("p",null,"使用then添加回调，每次调用then时，如果promsie的异步代码已经执行出了结果，状态已经不是pending状态，我们就将成功的回调和失败的回调立即执行；"),s("p",null,"如果promise还是pending状态，意味着异步代码未完成，我们就将成功和操作性回调分别放入到promise实例的成功回调和失败回调数组中，等异步代码执行完毕，我们会调用resolve或reject来触发回调函数；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"所以，在约1秒后，我们执行了start;")])])])]),s("p",null,"然后，我们resolve(1)，这代表异步代码完成，状态凝固，我们调用依次执行成功回调中函数，这时，打印出了1；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"resolve或reject后，代码还会执行，打印了end;")])])])])],-1)])])}const g=a(i,[["render",t]]);export{v as __pageData,g as default};
