import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"import()","description":"上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。 import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。 import()类似于N。","frontmatter":{"title":"import()","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。 import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。 import()类似于N。","sidebarWeight":28,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/import().md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import().md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import().md"}'),i={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import().md"};function t(o,l,c,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"import",tabindex:"-1"},[n("import() "),s("a",{class:"header-anchor",href:"#import","aria-label":'Permalink to "import()"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“import()”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**背景**")]),n(`
`),s("span",{class:"line"},[s("span",null,"前面介绍过，import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 报错")]),n(`
`),s("span",{class:"line"},[s("span",null,"if (x === 2) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import MyModual from './myModual';")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。")]),n(`
`),s("span",{class:"line"},[s("span",null,"这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。")]),n(`
`),s("span",{class:"line"},[s("span",null,"const path = './' + fileName;")]),n(`
`),s("span",{class:"line"},[s("span",null,"const myModual = require(path);")])])])]),s("p",null,"上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**动态加载**")]),n(`
`),s("span",{class:"line"},[s("span",null,"import(specifier)：[ES2020](https://github.com/tc39/proposal-dynamic-import)提案 引入import()函数，支持动态加载模块。")]),n(`
`),s("span",{class:"line"},[s("span",null,"参数：参数specifier，指定所要加载的模块的位置。")]),n(`
`),s("span",{class:"line"},[s("span",null,"返回值：import()返回一个 Promise 对象。下面是一个例子。")]),n(`
`),s("span",{class:"line"},[s("span",null,"const main = document.querySelector('main');")]),n(`
`),s("span",{class:"line"},[s("span",null,"import(`./section-modules/${someVariable}.js`)")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .then(module => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    module.loadPageInto(main);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  })")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .catch(err => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    main.textContent = err.message;")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"特点：")])])])]),s("p",null,"import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。"),s("p",null,"它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import()函数与所加载的模块没有静态连接关系，与import语句不相同。")])])])]),s("p",null,"import()类似于Node的require方法，区别主要是前者是异步加载，后者是同步加载。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**适用场合**")]),n(`
`),s("span",{class:"line"},[s("span",null,"按需加载：import()可以在需要的时候，再加载某个模块。")]),n(`
`),s("span",{class:"line"},[s("span",null,"button.addEventListener('click', event => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('./dialogBox.js')")]),n(`
`),s("span",{class:"line"},[s("span",null,"    .then(dialogBox => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      dialogBox.open();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"    .catch(error => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      /* Error handling */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"});")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"条件加载：import()可以放在if代码块，根据不同的情况，加载不同的模块。")]),n(`
`),s("span",{class:"line"},[s("span",null,"if (condition) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('moduleA').then(...);")]),n(`
`),s("span",{class:"line"},[s("span",null,"} else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('moduleB').then(...);")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"动态的模块路径")]),n(`
`),s("span",{class:"line"},[s("span",null,"import()允许模块路径动态生成。")]),n(`
`),s("span",{class:"line"},[s("span",null,"import(f()).then(...);")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，根据函数f的返回结果，加载不同的模块。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**加载成功后**")]),n(`
`),s("span",{class:"line"},[s("span",null,"import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。")]),n(`
`),s("span",{class:"line"},[s("span",null,"import('./myModule.js')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .then(({ export1, export2 }) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // ...·")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"上面代码中，export1和export2都是myModule.js的输出接口，可以解构获得。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果模块有default输出接口，可以用参数直接获得。")]),n(`
`),s("span",{class:"line"},[s("span",null,"import('./myModule.js')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .then(myModule => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(myModule.default);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"上面的代码也可以使用具名输入的形式。")]),n(`
`),s("span",{class:"line"},[s("span",null,"import('./myModule.js')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .then(({ default: theDefault }) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    console.log(theDefault);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果想同时加载多个模块，可以采用下面的写法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"Promise.all([")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('./module1.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('./module2.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"  import('./module3.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"])")]),n(`
`),s("span",{class:"line"},[s("span",null,"  .then(([module1, module2, module3]) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ···")]),n(`
`),s("span",{class:"line"},[s("span",null,"  });")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"import()也可以用在 async 函数之中。")]),n(`
`),s("span",{class:"line"},[s("span",null,"async function main() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const myModule = await import('./myModule.js');")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const { export1, export2 } = await import('./myModule.js');")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const [module1, module2, module3] =")]),n(`
`),s("span",{class:"line"},[s("span",null,"    await Promise.all([")]),n(`
`),s("span",{class:"line"},[s("span",null,"      import('./module1.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"      import('./module2.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"      import('./module3.js'),")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]);")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"main();")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://es6.ruanyifeng.com/#docs/module>")])])])])],-1)])])}const g=a(i,[["render",t]]);export{h as __pageData,g as default};
