import{_ as a,o as l,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"冻结的对象","description":"最严格的防篡改级别是冻结对象(frozen object)冻结的对象既不可扩展，又是密封的，而且对象数据属性的[[writable]]特性会被设置为false，如果定义[[set]]函数，访何器属性仍然是可写的。","frontmatter":{"title":"冻结的对象","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"最严格的防篡改级别是冻结对象(frozen object)冻结的对象既不可扩展，又是密封的，而且对象数据属性的[[writable]]特性会被设置为false，如果定义[[set]]函数，访何器属性仍然是可写的。","sidebarWeight":77,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-对象/防篡改対象/冻结的对象.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/冻结的对象.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/冻结的对象.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/冻结的对象.md"};function r(i,n,c,o,u,d){return l(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"冻结的对象",tabindex:"-1"},[s("冻结的对象 "),e("a",{class:"header-anchor",href:"#冻结的对象","aria-label":'Permalink to "冻结的对象"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“冻结的对象”的核心思路，并能把它用于实际开发或面试表达。 最严格的防篡改级别是冻结对象(frozen object)冻结的对象既不可扩展，又是密封的，而且对象数据属性的[[writable]]特性会被设置为false，如果定义[[set]]函数，访何器属性仍然是可写的。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"ECMAScript5定义的object.freeze()方法可以用来冻结对象。")]),s(`
`),e("span",{class:"line"},[e("span",null,'var person = { name: "Nicholas" };')]),s(`
`),e("span",{class:"line"},[e("span",null,"Object.freeze(person);")]),s(`
`),e("span",{class:"line"},[e("span",null,"person.age = 29;")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(person.age); //undefined")]),s(`
`),e("span",{class:"line"},[e("span",null,"delete person.name;")]),s(`
`),e("span",{class:"line"},[e("span",null,'alert(person.name); //"Nicholas"')]),s(`
`),e("span",{class:"line"},[e("span",null,'person.name = "Greg";')]),s(`
`),e("span",{class:"line"},[e("span",null,'alert(person.name); //"Nicholas"')]),s(`
`),e("span",{class:"line"},[e("span",null,"与密封和不允许扩展一样，对冻结的对象执行非法操作在非严格模式下会被忽略，而在严格模式下会抛出错误。")]),s(`
`),e("span",{class:"line"},[e("span",null,"当然，也有一个Object.isFrozen()方法用于检测冻结对象。因为冻结对象既是密封的又是不可扩展的，所以Object.isExtensible()和Object.isSealed检测冻结对象将分别返回false和true。")]),s(`
`),e("span",{class:"line"},[e("span",null,'var person = { name: "Nicholas" };')]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isExtensible(person)); //true")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isSealed(person)); //false")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isFrozen(person)); //false")]),s(`
`),e("span",{class:"line"},[e("span",null,"Object.freeze(person);")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isExtensible(person)); //false")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isSealed(person)); //true")]),s(`
`),e("span",{class:"line"},[e("span",null,"alert(Object.isFrozen(person)); //true")]),s(`
`),e("span",{class:"line"},[e("span",null,"对JavaScript库的作者而言，冻结对象是很有用的。因为JavaScript库最怕有人意外(或有意)地修改了库中的核心对象。冻结(或密封)主要的库对象能够防止这些问题的发生。")])])])])],-1)])])}const m=a(p,[["render",r]]);export{f as __pageData,m as default};
