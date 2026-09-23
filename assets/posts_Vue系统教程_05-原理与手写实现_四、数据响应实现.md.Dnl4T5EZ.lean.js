import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"四、数据响应实现","description":"Vue普遍走的就是数据劫持方式。 不同的在于使用DefineProperty还是Proxy。 也就是一次一个属性劫持还是一次劫持一个对象。 当然后者比前者听着就明显有优势。这也就是Vue3的响应式原理。 Proxy/Reflect是在ES2015规范中加入的，Proxy可以更好的。","frontmatter":{"title":"四、数据响应实现","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"Vue普遍走的就是数据劫持方式。 不同的在于使用DefineProperty还是Proxy。 也就是一次一个属性劫持还是一次劫持一个对象。 当然后者比前者听着就明显有优势。这也就是Vue3的响应式原理。 Proxy/Reflect是在ES2015规范中加入的，Proxy可以更好的。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/min-vue/四、数据响应实现.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/四、数据响应实现.md","filePath":"posts/Vue系统教程/05-原理与手写实现/四、数据响应实现.md"}'),t={name:"posts/Vue系统教程/05-原理与手写实现/四、数据响应实现.md"};function i(c,l,u,o,r,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"四、数据响应实现",tabindex:"-1"},[s("四、数据响应实现 "),n("a",{class:"header-anchor",href:"#四、数据响应实现","aria-label":'Permalink to "四、数据响应实现"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“四、数据响应实现”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 Vue普遍走的就是数据劫持方式。 不同的在于使用DefineProperty还是Proxy。 也就是一次一个属性劫持还是一次劫持一个对象。 当然后者比前者听着就明显有优势。这也就是Vue3的响应式原理。")]),n("p",null,"Proxy/Reflect是在ES2015规范中加入的，Proxy可以更好的拦截对象行为，Reflect可以更优雅的操纵对象。 优势在于"),n("p",null,"针对整个对象定制而不是对象的某个属性，所以也就不需要对keys进行遍历。"),n("p",null,"支持数组,这个DefineProperty不具备。这样就省去了重载数组方法这样的Hack过程。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"可以通过递归方便的进行对象嵌套。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"说了这么多我们先来一个小例子")]),s(`
`),n("span",{class:"line"},[n("span",null,"var obj = new Proxy({}, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  get: function (target, key, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`getting ${key}!`);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return Reflect.get(target, key, receiver);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  set: function (target, key, value, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(`setting ${key}!`);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return Reflect.set(target, key, value, receiver);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj.abc = 132")])])])]),n("p",null,"这样写如果你修改obj中的值，就会打印出来。 也就是说如果对象被修改就会得的被响应。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当然我们需要的响应就是重新更新视图也就是重新运行render方法。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"首先制造一个抽象的数据响应函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义响应函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"let effective")]),s(`
`),n("span",{class:"line"},[n("span",null,"observed = new Proxy(config.data(), {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  set(target, key, value, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const ret = Reflect.set(target, key, value, receiver)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 触发函数响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effective()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return ret")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在初始化的时候我们设置响应动作为渲染视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"const dom = document.querySelector(container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置响应动作为渲染视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"effective = () => render(observed, dom)")]),s(`
`),n("span",{class:"line"},[n("span",null,"render(observed, dom)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**1.** **视图变化的监听**")]),s(`
`),n("span",{class:"line"},[n("span",null,"浏览器视图的变化,主要体现在对输入项变化的监听上，所以只需要通过绑定监听事件就可以了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"document.querySelector('input').addEventListener('keyup', function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  data.message = this.value")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**2.** **完整的代码**")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<html lang="en">')]),s(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const Vue = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      createApp(config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 编译过程")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const compile = (template) => (content, dom) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // 重新渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,'          dom.innerText = "";')]),s(`
`),n("span",{class:"line"},[n("span",null,'          input = document.createElement("input");')]),s(`
`),n("span",{class:"line"},[n("span",null,'          input.addEventListener("keyup", function () {')]),s(`
`),n("span",{class:"line"},[n("span",null,"            content.state.message = this.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          });")]),s(`
`),n("span",{class:"line"},[n("span",null,'          input.setAttribute("value", content.state.message);')]),s(`
`),n("span",{class:"line"},[n("span",null,"          dom.appendChild(input);")]),s(`
`),n("span",{class:"line"},[n("span",null,'          let button = dom.querySelector("button");')]),s(`
`),n("span",{class:"line"},[n("span",null,'          button = document.createElement("button");')]),s(`
`),n("span",{class:"line"},[n("span",null,'          button.addEventListener("click", () => {')]),s(`
`),n("span",{class:"line"},[n("span",null,"            return content.click.apply(content.state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          });")]),s(`
`),n("span",{class:"line"},[n("span",null,"          button.innerText = content.state.message;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          dom.appendChild(button);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 生成渲染函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const render = compile(config.template);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          mount: function (container) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const dom = document.querySelector(container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const setupResult = config.setup();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            effective = () => render(setupResult, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            render(setupResult, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 定义响应函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let effective;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const App = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"      template: `")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <input v-model="message"/>')]),s(`
`),n("span",{class:"line"},[n("span",null,"                <button @click='click'>{{message}}</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                `,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setup() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 数据劫持")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const state = new Proxy(")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,'            message: "Hello Vue 3!!",')]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            set(target, key, value, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              const ret = Reflect.set(target, key, value, receiver);")]),s(`
`),n("span",{class:"line"},[n("span",null,"              // 触发函数响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"              effective();")]),s(`
`),n("span",{class:"line"},[n("span",null,"              return ret;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        );")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const click = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          state.message = state.message.split("").reverse().join("");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return { state, click };")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { createApp } = Vue;")]),s(`
`),n("span",{class:"line"},[n("span",null,'    createApp(App).mount("#app");')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])])],-1)])])}const h=e(t,[["render",i]]);export{v as __pageData,h as default};
