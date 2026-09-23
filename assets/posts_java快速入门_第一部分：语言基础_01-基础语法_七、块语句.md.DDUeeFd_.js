import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"七、块语句","description":"","frontmatter":{"title":"七、块语句","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Java基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/七、块语句.md","filePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/七、块语句.md"}'),i={name:"posts/java快速入门/第一部分：语言基础/01-基础语法/七、块语句.md"};function c(t,a,u,o,r,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Java中的语句被组织成块。块以花括号开始和结束--左花括号{表示开始，右花括号}表示结束。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"块也叫做块语句（block statement)，因为整个块可用在任何可使用单条语句的地方（在C和其他语言中，它们被称为复合语句）。块中语句从上到下依次执行。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"块可以放在其他块中，就像交方法放在类定义中一样。")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用块时，需要注意的重要一点是，它为块中声明的局部变量创建了作用域。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"作用域是程序的一部分，在其中变量存在并可使用。如果在变量的作用域外要使用它，将发生错误。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Java中，变量的作用域是声明该变量的语句所在的块。可以在块中声明和使用局部变量，在该块执行完毕后，这些变量将不复存在。如testBlock()方法包含一个块：")]),s(`
`),n("span",{class:"line"},[n("span",null,"void testBlock() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"int x= 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"int y= 40;")]),s(`
`),n("span",{class:"line"},[n("span",null,"y=y+x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在这个方法中定义了两个变量：x和y。变量Y的作用域是它所在的块，因此只能在该块内被使用。试图在方法testBlock()的其他部分使用变量Y将出错。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"变量X是在方法内创建的，因此可用于方法的任何地方。可以在方法内的任何地方修改x的值，而且该值将保留下来。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"块语句可用于类定义和方法定义中，还可以用于接下来将介绍的逻辑和循环结构中。像示例这样使用内部内的方式并不常见。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"if 条件语句")]),s(`
`),n("span",{class:"line"},[n("span",null,"if条件语句使用布尔表达式来判断是否执行语句。如果表达式返回true，则执行语句。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果想在if表达式不为true时执行其他操作，可使用关键字else。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：Java if语句与在其他语言中if语句的区别在于，Java要求测试返回布尔值（true或false)。在C和C++中，测试可以返回整数值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**s****witch****条件语句**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在任何语言中，都常常需要将变量同某个值进行比较，如果不匹配，再同另一个值来进行比较，依此类推。")]),s(`
`),n("span",{class:"line"},[n("span",null,"char grade = 'D'")]),s(`
`),n("span",{class:"line"},[n("span",null,"switch (grade) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"case 'A'")]),s(`
`),n("span",{class:"line"},[n("span",null,' System.out.printLn("Great job!");')]),s(`
`),n("span",{class:"line"},[n("span",null,"break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"case 'B'")]),s(`
`),n("span",{class:"line"},[n("span",null,' System.out.println("Good job!");')]),s(`
`),n("span",{class:"line"},[n("span",null,"default:")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("Consider cheating!")')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"switch语句基于一个测试变量。在上面的例子中，测试的是变量grade的值，该变量存储的是char值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"测试变量可以是基本数据类型byte、char、short或int，还可以是String对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"测试变量将依次与每个case值进行比较。如果找到匹配的值，则执行相应的语句。如果没有找到匹配的值，则执行default语句。default语句是可选的，如果被省略，则没有任何case匹配时，将不执行任何操作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"switch语句中的测试只能是可转换为int的基本数据类型，如char和字符串。不能在switch中使用更大的数据类型，如long、float，也不能测试除相等性外的其它关系。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在每个case后，可以有任何数目的语句。与if语句不同，不必将多条语句用花括号括起。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"每个case中都有一个break语句，用于指出何时停止执行语句。如果case中没有break语句，则找到匹配的情况后，该case中的语句以及其后到break或switch末尾的所有语句都将执行。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"一种不需要break的情况是，对于多个不同的值，都执行相同的语句。为此，可以使用多个case行，switch将执行它到的第一条语句。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**三目运算符**")]),s(`
`),n("span",{class:"line"},[n("span",null,"三目运算符的优先级很低——通常在所有子表达式计算完毕后才被计算。在优先级上，唯一比它低的运算符是赋值运算符。")]),s(`
`),n("span",{class:"line"},[n("span",null,"警告：三目运算符的主要好处是，供经验丰富的程序员创建复杂表达式。它的功能可以用简单的if-else语句来实现。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**For****循环**")]),s(`
`),n("span",{class:"line"},[n("span",null,"for循环用于重复执行语句，直到条件得到满足。虽然for循环通常用于在语句重复次数确定的情况下简化迭代，但for循环也可用于几乎任何类型的循环中。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中，变量i用作循环计数——它计算循环执行的次数。每次循环执行之前，都将该计数与数组salutation中的元素数目salutation.length进行比较。当循环计数值等于或大于salutation.length时，循环结束。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for语句的最后一部分是i++。这使得每次循环后，循环计数值都加1。如果没有这条语句，循环将不会结束。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for循环的任何部分都可以是一条空语句，即不带任何表达式和语句的分号，")]),s(`
`),n("span",{class:"line"},[n("span",null,"这样，这部分将被忽略。注意，在for循环中使用空语句后，必须在程序的其他地方初始化或递增循环变量（循环计数）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果所有的工作都在循环的第1行完成了，则for循环也可以是一条空语句。例如，下面的for循环找出大于4000的第一个质数（这里假设存在一个名为notPrime()的方法，该方法返回一个布尔值，指出i是不是一个质数）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (i=4001; notPrime(i); i+=2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"这条语句以分号结尾，这表明其循环体没有包含任何语句。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于for循环，一种常见的错误是，for语句以分号结尾：")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：Java还有一种用于遍历诸如数组列表、链表、映射等集合中所有元素的for循环。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**while****和****do****循环**")]),s(`
`),n("span",{class:"line"},[n("span",null,"while循环用于重复执行一条语句，直到特定条件不为true。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"虽然上面的循环使用花括号来构成一个块语句，但它们不是必需的，因为该循环体只有一条语句：x=x*i++。然而，使用花括号也不会带来任何问题，如果以后需要在循环何内添加其它语句，花括号将是必不可少的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"do … while循环")]),s(`
`),n("span",{class:"line"},[n("span",null,"do循环与while循环非常类似，主要区别在于检测条件的位置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"while循环在循环执行前检测条件，因此如果首次检测时就为false，则循环体一次也不会被执行。do循环在检测条件之前，至少执行循环体一次，因此如果首次检测时条件为false，则循环体已执行一次了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for， while和do循环的用途相同，但方式存在细微差别。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**跳出循环**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在所有循环中，当测试条件满足时循环将结束。有时，在循环执行过程中，当发生了某种情况后，需要提早结束循环。在这种情况下，可以使用关键字break和continue。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"break的功能是立即结束当前循环。如果在循环中嵌套了循环，将跳到外层循环中，否则执行循环后的语句。")]),s(`
`),n("span",{class:"line"},[n("span",null,"continue直接进入循环的下一次迭代。对于do和while循环，这意味着重新回到块语句从头执行；对于for循环，则计算增量表达式，然后执行块语句。当需要在循环体内忽略某些特殊情况时，关键字continue很有用。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**标号**")]),s(`
`),n("span",{class:"line"},[n("span",null,"break和continue都有可选的标号，指出从哪里开始继续执行程序。没有标号时，break跳到外层循环或循环后面的语句处。关键字continue进入下一次迭代。使用标号后，break可以跳到手环外的某个位置，continue可以跳到当前循环外的循环中。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要使用标号，请在循环的起始部分前面添加标号和冒号。然后，使用break或continue时，在这些关键字后面加上标号的名称，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在上述代码片段中，标号out标记的是外层循环。然后，在for和while循环中，当特定条件满足时，break将跳出这两个循环。如果没有标号out，break将跳出内层循环，并继续挪外层循环。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Java中，标号用得很少，因为通常有其他替代方式。")])])])])],-1)])])}const k=l(i,[["render",c]]);export{h as __pageData,k as default};
