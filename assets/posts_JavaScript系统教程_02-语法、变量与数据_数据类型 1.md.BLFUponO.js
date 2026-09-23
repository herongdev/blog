import{_ as s,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"数据类型 1","description":"4 、引用数据类型（存放在 堆 内存中的对象，每个空间大小不一样，要根据情况进行特定的配置） 引用类型是存放在堆内存中的对象，变量其实是保存的在栈内存中的一个指针（保存的是堆内存中的引用地址），这个指针指向堆内存。 引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通。","frontmatter":{"title":"数据类型 1","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"4 、引用数据类型（存放在 堆 内存中的对象，每个空间大小不一样，要根据情况进行特定的配置） 引用类型是存放在堆内存中的对象，变量其实是保存的在栈内存中的一个指针（保存的是堆内存中的引用地址），这个指针指向堆内存。 引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通。","sidebarWeight":77,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/数据类型/数据类型 1.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/数据类型 1.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/数据类型 1.md"}'),i={name:"posts/JavaScript系统教程/02-语法、变量与数据/数据类型 1.md"};function t(c,a,u,o,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"数据类型-1",tabindex:"-1"},[l("数据类型 1 "),n("a",{class:"header-anchor",href:"#数据类型-1","aria-label":'Permalink to "数据类型 1"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“数据类型 1”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**1****、栈****(stack)****和堆（****heap****）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==stack====为自动分配的内存空间，它由系统自动释放；而====heap====则是动态分配的内存，大小也不一定会自动释放==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2****、数据类型**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==JS====分两种数据类型：==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**基本数据类型**==：==**Number****、****String****、****Boolean****、****Null****、** **Undefined****、****Symbol****（****ES6****），**==这些类型可以直接操作保存在变量中的实际值。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**引用数据类型**==：==**Object****（在****JS****中除了基本数据类型以外的都是对象，数据是对象，函数是对象，正则表达式是对象）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3****、基本数据类型（存放在****栈****中）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"     ==基本数据类型是指存放在==**栈**==中的==**简单数据段，****数据大小确定，内存空间大小可以分配，**==它们是直接按值存放的，所以可以直接==**按值访问**")]),l(`
`),n("span",{class:"line"},[n("span",null,"var a = 10;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var b = a;")]),l(`
`),n("span",{class:"line"},[n("span",null,"b = 20;")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(a); // 10值")]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(b); // 20值")]),l(`
`),n("span",{class:"line"},[n("span",null,"==下图演示了这种基本数据类型赋值的过程：==")])])])]),n("p",null,[n("strong",null,"4"),l("**、引用数据类型（存放在"),n("strong",null,[n("strong",null,"堆")]),l("内存中的对象，每个空间大小不一样，要根据情况进行特定的配置）** ==引用类型是存放在堆内存中的对象，变量其实是保存的在栈内存中的一个指针（保存的是堆内存中的引用地址），这个指针指向堆内存。== ==引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象==")]),n("p",null,"[](javascript:void(0)😉"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var obj1 = new Object();")]),l(`
`),n("span",{class:"line"},[n("span",null,"var obj2 = obj1;")]),l(`
`),n("span",{class:"line"},[n("span",null,'obj2.name = "我有名字了";')]),l(`
`),n("span",{class:"line"},[n("span",null,"console.log(obj1.name); // 我有名字了")])])])]),n("p",null,"[](javascript:void(0)😉"),n("p",null,"==说明这两个引用数据类型指向了同一个堆内存对象。====obj1====赋值给====obj2====，实际上这个堆内存对象在栈内存的引用地址复制了一份给了====obj2====，但是实际上他们共同指向了同一个堆内存对象，所以修改====obj2====其实就是修改那个对象，所以通过====obj1====访问也能访问的到。=="),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,"```"),n("td")]),n("tr",null,[n("td",null,"1"),n("td")]),n("tr",null,[n("td",null,"2"),n("td")]),n("tr",null,[n("td",null,"3"),n("td")]),n("tr",null,[n("td",null,"4"),n("td")]),n("tr",null,[n("td",null,"5"),n("td")]),n("tr",null,[n("td",null,"6"),n("td")]),n("tr",null,[n("td",null,"7"),n("td")]),n("tr",null,[n("td",null,"8"),n("td")]),n("tr",null,[n("td",null,"9"),n("td")]),n("tr",null,[n("td",null,"10"),n("td")])])]),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"var a = [1,2,3,4,5];")]),l(`
`),n("span",{class:"line"},[n("span",null,"var b = a;//传址 ,对象中传给变量的数据是引用类型的，会存储在堆中；")]),l(`
`),n("span",{class:"line"},[n("span",null,"var c = a[0];//传值，把对象中的属性/数组中的数组项赋值给变量，这时变量C是基本数据类型，存储在栈内存中；改变栈中的数据不会影响堆中的数据")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(b);//1,2,3,4,5")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(c);//1")]),l(`
`),n("span",{class:"line"},[n("span",null,"//改变数值")]),l(`
`),n("span",{class:"line"},[n("span",null,"b[4] = 6;")]),l(`
`),n("span",{class:"line"},[n("span",null,"c = 7;")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(a[4]);//6")]),l(`
`),n("span",{class:"line"},[n("span",null,"alert(a[0]);//1")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==从上面我们可以得知，当我改变====b====中的数据时，====a====中数据也发生了变化；但是当我改变====c====的数据值时，====a====却没有发生改变。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"     ==这就是==**传值与传址的区别**==。因为====a====是==**数组**==，属于==**引用类型**==，所以它赋予给====b====的时候传的是栈中的地址（相当于新建了一个不同名“指针”），而不是堆内存中的对象。而====c====仅仅是从====a====堆内存中获取的一个数据值，并保存在栈中。所以====b====修改的时候，会根据地址回到====a====堆中修改，====c====则直接在栈中修改，并且不能指向====a====堆内存中。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**5****、浅拷贝**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==前面已经提到，在定义一个对象或数组时，变量存放的往往只是一个地址。当我们使用对象拷贝时，如果==**属性是对象或数组时**==，这时候我们传递的也只是一个地址。因此子对象在访问该属性时，会根据地址回溯到父对象指向的堆内存中，即==**父子对象发生了关联**==，两者的属性值会指向同一内存空间。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")])])])]),n("p",null,'var a={key1:"11111"}function Copy(p){ var c ={}; for (var i in p){ c[i]=p[i] } return c;}a.key2 = ["小辉","小辉"]var b = Copy(a);b.key3 = "33333"alert(b.key1)//11111alert(b.key3)//33333alert(a.key3);//undefined'),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,'b.key2.push("大辉")alert(a.key2);//小辉，小辉，大辉')]),l(`
`),n("span",{class:"line"},[n("span",null,"==但是若是修改的属性变为对象或数组时，那么父子对象之间就发生关联，从上可知：==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==原因是====key1====的值属于基本类型，所以拷贝的时候传递的就是该数据段；但是====key2====的值是堆内存中的对象，所以====key2====在拷贝的时候传递的是指向====key2====对象的地址，无论复制多少个====key2====，其值始终是指向父对象的====key2====对象的内存空间。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")])])])]),n("p",null,'//ES6实现浅拷贝的方法var a = {name:"暖风"}var b= Object.assign({},a);b.age = 18;console.log(a.age);//undefined----------------------------------//数组var a = [1,2,3];var b = a.slice();b.push(4);b//1,2,3,4a//1,2,4----------------------------------var a = [1,2,3];var b = a.concat();b.push(4);b//1,2,3,4a//1,2,4----------------------------------var a = [1,2,3];var b = [...a]b//1,2,3,4a//1,2,4'),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"**6****、深拷贝**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==或许以上并不是我们在实际编码中想要的结果，我们==**不希望父子对象之间产生关联**==，那么这时候可以用到==**深拷贝**==。既然属性值类型是数组和或象时只会传址，那么我们就用==**递归**==来解决这个问题，把父对象中所有属于对象的属性类型都遍历赋给子对象即可。测试代码如下：==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")])])])]),n("p",null,'var a={key1:"11111"}function Copy(p,c){ var c =c||{}; for (var i in p){ if(typeof p[i]==="object"){ c[i]=(p[i].constructor ===Array)?[]:{} Copy(p[i],c[i]); }else{ c[i]=p[i] } } return c;}a.key2 = ["小辉","小辉"]var b = {}b = Copy(a,b); b.key2.push("大辉");b.key2//小辉，小辉，大辉a.key2//小辉，小辉'),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"[](javascript:void\\(0\\);)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==最后：== **总结基本数据类型和引用数据类型区别**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**1****、声明变量时内存分配不同**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==*====原始类型：在栈中，因为占据空间是固定的，可以将他们存在较小的内存中====-====栈中，这样便于迅速查询变量的值==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==*====引用类型：存在堆中，栈中存储的变量，只是用来查找堆中的引用地址。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"   ==这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2****、不同的内存分配带来不同的访问机制**")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ==在====javascript====中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的==**按引用访问**==。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ==而原始类型的值则是可以直接访问到的。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3****、复制变量时的不同**")]),l(`
`),n("span",{class:"line"},[n("span",null," ==1====）原始值：在将一个保存着原始值的变量复制给另一个变量时，会将原始值的副本赋值给新变量，==**此后这两个变量是完全独立的，他们只是拥有相同的****value****而已。**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==2====）引用值：在将一个保存着对象内存地址的变量复制给另一个变量时，会把这个内存地址赋值给新变量，==")]),l(`
`),n("span",{class:"line"},[n("span",null,"也就是说这两个变量都指向了堆内存中的同一个对象，他们中任何一个作出的改变都会反映在另一个身上。")]),l(`
`),n("span",{class:"line"},[n("span",null,"（这里要理解的一点就是，复制对象时并不会在堆内存中新生成一个一模一样的对象，只是多了一个保存指向这个对象指针的变量罢了）。**多了一个指针**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**4****、参数传递的不同（把实参复制给形参的过程）**")]),l(`
`),n("span",{class:"line"},[n("span",null,"首先我们应该明确一点：ECMAScript中所有函数的参数都是按值来传递的。")]),l(`
`),n("span",{class:"line"},[n("span",null,"但是为什么涉及到原始类型与引用类型的值时仍然有区别呢？还不就是因为内存分配时的差别。")]),l(`
`),n("span",{class:"line"},[n("span",null,"1）原始值：只是把变量里的值传递给参数，之后参数和这个变量互不影响。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2）引用值：对象变量它里面的值是这个对象在堆内存中的内存地址，这一点你要时刻铭记在心！")]),l(`
`),n("span",{class:"line"},[n("span",null,"因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因了，因为它们都指向同一个对象。")]),l(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")])])])]),n("p",null,[n("a",{href:"https://www.cnblogs.com/c2016c/articles/9328725.html",target:"_blank",rel:"noreferrer"},"https://www.cnblogs.com/c2016c/articles/9328725.html")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])])],-1)])])}const h=s(i,[["render",t]]);export{v as __pageData,h as default};
