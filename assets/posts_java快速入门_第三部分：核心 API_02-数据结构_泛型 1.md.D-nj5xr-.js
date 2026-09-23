import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"泛型 1","description":"","frontmatter":{"title":"泛型 1","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型 1.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型 1.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型 1.md"};function t(c,a,u,o,r,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Java类库中最基本的实用类")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"无论开发哪类程序，java.util包中的散列映射，链表，堆栈和其他结构都很在用。几乎每个软件程序都需要以某种方式对数据进行处理。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这些数据结构也非常适合用于编写适用于各种对象类的代码。为操纵链表而编写的方法，也可用于对字符串、字符串缓冲区、字符数组和其他表示文本的对象执行相同的功能。会计程序中的方法可以接受表示整数、浮点数和其他数学类的对象，并使用它们来计算结余。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这种灵活性是要付出代价的：如果数据结构能够处理任何类型的对象，则当程序错误地使用这种数据结构时，Java编译器将不会提出警告。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，应用程序ComicBook使用一个名为quality的散列映射将新旧程度描述（如崭新和新）同价格乘数关联起来。下面是针对九成新的语句：")]),s(`
`),n("span",{class:"line"},[n("span",null,'quality.put("near mint",1.50F);')]),s(`
`),n("span",{class:"line"},[n("span",null,"根据设计，散列映射quality应该只能以Float对象的方式存储浮点数。然而不管在这个类中将什么的值加入散列映射，这个类都将通过编译。程序员可能无意间将字符串加入散列映射，如下面的语句：")]),s(`
`),n("span",{class:"line"},[n("span",null,'quality.put("near mint","1.50"）;')]),s(`
`),n("span",{class:"line"},[n("span",null,"这个类仍将通过编译，但在运行阶段执行到下述语句时，将发生ClassCastExcption错误，进而停止运行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发生这种错误的原因在于，上述语句试图将散列映射中的字符串1.50转换为Float对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"鉴于显而易见的原因，对程序员而言，运行阶段错误要比编译错误棘手得多。编译错误让您无法继续跟踪，必须修改错误后才能继续；而运行阶段错误可能进入代码，而程序员对此一无所知，从而给软件用户带来麻烦。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可使用Java语言支持的泛型来指定数据结构期望的类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"期望的类信息被加入到将结构赋给变量或使用构造函数来创建结构的语句中。将期望的类用字符\\<和\\>括超，并将其放到数据结构名的后面，如下面的语句所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<Integer\\> zipCodes  new ArrayList();")]),s(`
`),n("span",{class:"line"},[n("span",null,"上述语句创建一个用于存储Integer对象的ArrayList。")]),s(`
`),n("span",{class:"line"},[n("span",null,"遇到第二个\\<和\\>字符时，编译器通过推断来确定正确的类。类名后面的\\<\\>有时被称为菱形运算符。下面再来看一个示例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashMap\\<String,Float\\> quality = new HashMap()；")]),s(`
`),n("span",{class:"line"},[n("span",null,"见到菱形运算符后，编译器通过推断来确定正确的类，以确保语句是有意义的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"前面声明链表时指定了类Integer，因此下面的语句将导致编译错误，而NetBeans将在源代码编辑器中指出这种错误：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`编译器知道，不能将String对象加入到这个链表。将元素加入到这个链表中的正确方式是使用整数值：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这些整数将通过自动封装转换为Integer对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于支持多种类的数据结构（如散列映射），可将这些类的名称用\\<和\\>括超，并用逗号分隔。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"另外，泛型还使得检索数据结构中的对象更简单，因为不需要将它们强制转换为所需的类。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"从风格的角度看，在变量声明和构造函数方法中加上泛型好像限制了自由。但习惯使用泛型、自动封装、拆封和新的for循环后，将发现数据结构使用起来更容易，且不容易出错。")])])])])],-1)])])}const m=l(i,[["render",t]]);export{g as __pageData,m as default};
