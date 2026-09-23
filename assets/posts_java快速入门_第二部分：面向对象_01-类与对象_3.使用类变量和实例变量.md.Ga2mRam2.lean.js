import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"3.使用类变量和实例变量","description":"","frontmatter":{"title":"3.使用类变量和实例变量","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/3.使用类变量和实例变量.md","filePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/3.使用类变量和实例变量.md"}'),t={name:"posts/java快速入门/第二部分：面向对象/01-类与对象/3.使用类变量和实例变量.md"};function i(c,a,o,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**获取值：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"要获取值，可以使用句点表示法。实例变量和类变量由两个部分组成：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"句点运算符（.）:左边为对象和类的引用；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"句点右边为变量。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"float total = customer.orderTotal;")]),s(`
`),n("span",{class:"line"},[n("span",null,"这条语句将对象customer的实例变量orderTotal的值赋给浮点变量total。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"以句点表示法访问变量的语句是表达式（即它返回一个值），句点的两边也都是表达式。这意味着可以嵌套实例变量的访问。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在前面的例子中，如果customer对象是store类的实例变量，则可以使用两次句点表示法来访问它，如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"float total = store.customer.orderTotal;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"句点表达式是从左向右求值的，因此首先等到的是store的实例变量customer，而customer本身包含实例变量orderTotal。因此最后的结果是，将变量orderTotal的值赋给变量total。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"以这种方式串接对象时需要注意的一点是，被串接的任何对象没有值都将引发错误。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**设置值**")]),s(`
`),n("span",{class:"line"},[n("span",null,"要使用句点表示法给实例变量赋值，可使用运算符=，就像给基本类型变量赋值一样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"customer.layaway = true;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**类变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"类变量是在类中定义和存储的。它们的值适用于类及其所有实例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"每个实例都将有实例变量的一个副本，它们可以修改实例变量的值，而不会影响其他实例；而类变量只有一个副本，修改它的值将影响所有的实例。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义类变量的方法是，在前面加上关键字static。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class FamilyMember {")]),s(`
`),n("span",{class:"line"},[n("span",null,"static String surname = 'Mendoza';")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"int age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"类FamilyMember的每个实例都在自己的name和age值；但对所有家庭成员来说，类变量surname的值都相同：Mendoza。修改surname的值将影响所有FamilyMember实例。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"之所以将类变量叫做静态（static）变量，是取了static的一种意思：固定在某处。如果类有一个static变量，则对于该类的每个对象，该变量的值都相同。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要访问类变量，可以使用与实例变量相同的句点表示法。要取得或修改类变量的值，可以在句点运算符的左边使用实例名或类名。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于可以使用对象来修改类变量的值，因此容易对类变量及其值从何而来感到困惑。所以为了避免这种情况，应使用类名来引用类变量，这样可以清楚地指出了引用的是类变量，出现奇怪结果时，调试起来也更容易。")])])])])],-1)])])}const g=l(t,[["render",i]]);export{_ as __pageData,g as default};
