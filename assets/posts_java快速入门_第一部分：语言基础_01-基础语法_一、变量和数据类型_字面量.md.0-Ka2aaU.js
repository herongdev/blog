import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"字面量","description":"","frontmatter":{"title":"字面量","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Java基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/字面量.md","filePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/字面量.md"}'),i={name:"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/字面量.md"};function c(t,a,u,o,r,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"字面量是任何直接表示一个值的数字、文本或其他信息。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**一、数字字面量：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java有几种整型字面量。例如，数字4是一个int类型的整型字面量，可将其赋给byte或short类型的变量，因为它足够小，在这些整数类型的取值范围内。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"位于int取值范围之外的整型字面量将被视为long类型。可以在后面加上字母L（或l）来指出字面量的类型为long，如下列：")]),s(`
`),n("span",{class:"line"},[n("span",null,"pennytotal = pennyTotal + 4L;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"表示负的数字字面量，可在前面加上负号（-），如-45。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于很大的整型字面量，可以加下划线提高可读性，如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"int jackpot = 3_500_000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java 编译器忽略这样的下划线；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"浮点数字面量使用句点（.）表示小数点。如3.55。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有浮点数字字面量都被视为double类型，而不是float类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"要将字面量的类型指定为float，可加上字母F（或f），如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"float piValue = 3.1415927F;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在浮点数字字面量中，可以使用指数表示法，即使用字母e(或E)，而指数可以是负数。如")]),s(`
`),n("span",{class:"line"},[n("span",null,"double x  = 12e22;")]),s(`
`),n("span",{class:"line"},[n("span",null,"double y = 19e-19;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java也支持使用二进制、八进制和十六进制表示的数字字面量。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"二进制是以2为基数的计数系统，这意味着每位只能是0或1。")]),s(`
`),n("span",{class:"line"},[n("span",null,"每位称为一个比特，8个比特为一个字节。二进制字面量以0b开头，如0b101(5)，0b11111111(127)；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"八进制是以8为基数的计数系统，这意味着每位只能是0和7之间的值。在八进制里，第8个数是10。八进制字面量以0打头，如010表示十进制值8；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"十六进制是以16基数的计数系统，每位可能的取值为16个。字母A-F表示最后的6个数字，十六进制字面量以0x开头，如0x12表示十进制值18，0xFF表示十进制值255。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"有时候，八进制和十六进制比十进制更适合。如表示颜色值0x001100等；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**二、布尔字面量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"布尔值true和false也是字面量。和其它语言不同的时，必须使用true和false来表示布尔值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"布尔值不能加引号，加引号会被视为字符串。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**三、字符字面量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"字符字面量是用单引号括起的单个字符，如'a'，'#'和'3'。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如ASCII字符集包括128个字符，其中有数字、字母、标点和其他对计算有帮助的符号。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java使用16位的Unicode标准，除了ASCII字符外，还支持其它数以千计的字符。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"有些字符字面量表示的是非打印的字符或不能通过键盘输入的字符。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如下表所示：")]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**四、字符串字面量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java中的字符串是一种对象，而不是一种基本数据类型。同时，不像C语言那样，字符串被存储在数组中。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"因为字符串对象是Java中的真正对象，所以存在于用于合并和修改字符串以及判断两个字符串是否相同的方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"字符串字面量是用双引号括起的一系列字符，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,'String quitMsg = "Are you sure you want to quit?"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"字符串可以包含表2.2列出的转义字符，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,'String example = "Socrates asked, \\"Hemlo"')]),s(`
`),n("span",{class:"line"},[n("span",null,'String title =  "Sams Teach Yourself Node in \\u2122"')]),s(`
`),n("span",{class:"line"},[n("span",null,"在上述最后一行代码中，在支持Unicode的系统上，Unicode编码序列\\u2122将生成一个TM符号。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"虽然在程序中使用字符串字面量的方式与其他字面量类似，但在后台对它们的处理是不一样的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于字符串字面量，Java交其存储为String对象。您不必像使用其他对象那样，显式地创建一个新对象，因此使用起来与基本数据类型一样简单。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"从这种意义上说，字符串与众不同——基本数据类型都不会被存储为对象。")])])])])],-1)])])}const g=l(i,[["render",c]]);export{f as __pageData,g as default};
