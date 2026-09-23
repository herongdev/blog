import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"创建新对象","description":"","frontmatter":{"title":"创建新对象","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/类和对象/创建新对象.md","filePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/类和对象/创建新对象.md"}'),t={name:"posts/java快速入门/第二部分：面向对象/01-类与对象/类和对象/创建新对象.md"};function i(c,a,o,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**使用字面量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如使用字符串字面量（用双引号括起来的字符序列）可以创建新的String类实例，该实例的值为该字符串。这种做法只适合String类和其它表示基本数据类型的类如Integer和Double；要创建其他类的实例，需要使用new运算符。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"数字和字符基本类型不会创建对象，只会创建数字和字符，这样可以提高效率；也可以使用对象来表示基本类型值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**n****ew****操作符**")]),s(`
`),n("span",{class:"line"},[n("span",null,"要创建对象，可以使用new操作符和要创建的对象所属类的名称，并加上圆括号，如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,'String name = new String("Hal Jordan");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"括号里可以为空，在这种情况下，创建的将是最简单、最基本的对象；")]),s(`
`),n("span",{class:"line"},[n("span",null,"也可以包含参数，这些参数决定了对象的实例变量的初始值和其它初始量。如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Random seed = new Random(606843071);")]),s(`
`),n("span",{class:"line"},[n("span",null,"Point pt = new Point(0,0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"圆括号中可包含的参数个数和类型由类本身决定，这是通过一种叫做构造函数（constructor)的特殊方法定义的。如果您使用类创建对象时，提供的参数的数目和类型不正确（或者在需要参数时，您没有提供），则编译程序时将出错。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当您使用运算符new时，将发生如下几件事：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建给定类的实例，为它分配内存，调用给定类定义的构造函数。构造函数是一种创建新实例的方式。构造函数初始化新对象及其变量，创建该对象所需的其他对象，并执行初始化该对象所需的其他操作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"同一个类可以有多个构造函数，每个构造函数的参数数目和类型各不相同。使用new时，您可以在参数列表中指定不同的参数，这样将调用相应的构造函数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在同一个类中，两个构造函数的参数数目和类型不能都相同，因为参数数目和类型是区分构造函数的唯一途径。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果类没有定义任何构造函数，创建这个类的对象时，默认将调用没有参数的构造函数。这个构造函数所做的唯一工作是，调用其超类中不接收任何参数的构造函数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"只有没有定义任何构造函数的类才有默认构造函数。只要您在类中定义了一个构造函数，它就不会再有不带任何参数的默认构造函数。")])])])])],-1)])])}const _=l(t,[["render",i]]);export{m as __pageData,_ as default};
