import{_ as l,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"枚举","description":"","frontmatter":{"title":"枚举","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/枚举.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/枚举.md"}'),t={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/枚举.md"};function i(c,a,o,u,r,d){return e(),p("div",null,[...a[0]||(a[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在Java中，常量的一种常见用途是给一系列整数指定有意义的名称，前面使用位组时您这样做过：")]),n(`
`),s("span",{class:"line"},[s("span",null,"class ConnectionAttributes {")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"这些常量很有用——让包含它们的语句提供了额外的信息。请比较下面两条等效的语句：")]),n(`
`),s("span",{class:"line"},[s("span",null,"setConnectionType(1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"setConnectionType(ConnectionAttributes.W）;")]),n(`
`),s("span",{class:"line"},[s("span",null,"对于程序员来说，第二条语句要更容易理解得多。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Java提供了被称为枚举的数据类型，可用于实现上述目标，但优于在类中使用常量。为了定义枚举，可使用关键字enum而不是class，并将值用逗号分隔。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"下面是一个名为Compass的简单枚举，它包含8个指南针方向：")]),n(`
`),s("span",{class:"line"},[s("span",null,"public enum compass {")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"这些值都是static和final的，就像常量一样，与类常量一样，它们可出现在语句、方法调用和其他代码中。下面是一个使用这个枚举的程序 ：")]),n(`
`),s("span",{class:"line"},[s("span",null," ")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"这个应用程序将示例变量current设置为枚举Compass中的值WEST,再显示这个变量的值，结果为文本WEST.")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"相比于使用类变量，使用枚举的优点是，如果您使用了非法值，编译器将能够发现这种错误。调用方法setDirection(Compass）时，只能向它传递枚举Compass包含的值。")]),n(`
`),s("span",{class:"line"},[s("span",null,"相反，对于接受ConnectionAttribues参数的方法，调用它时可传入任何整数值。")]),n(`
`),s("span",{class:"line"},[s("span",null,"枚举还有其他优点，它就像类那样，可以包含方法和变量。")]),n(`
`),s("span",{class:"line"},[s("span",null,"每当需要一组固定的常量时，都可在枚举中定义它们。")])])])])],-1)])])}const C=l(t,[["render",i]]);export{v as __pageData,C as default};
