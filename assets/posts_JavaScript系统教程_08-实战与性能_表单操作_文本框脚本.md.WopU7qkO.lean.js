import{_ as s,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse(`{"title":"文本框脚本","description":"在HTML中，有两种方式来表现文本框： 一种是使用input元素的单行文本框 另一种是使用\\\\<textarea\\\\ 的多行文本框。 这两个控件非常相似，而且多数时候的行为也差不多。不过，它们之间仍然存在一些重要的区别。 要表现文本框，必须将input元素的type特性设置为'tex。","frontmatter":{"title":"文本框脚本","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","实战与性能"],"description":"在HTML中，有两种方式来表现文本框： 一种是使用input元素的单行文本框 另一种是使用\\\\<textarea\\\\ 的多行文本框。 这两个控件非常相似，而且多数时候的行为也差不多。不过，它们之间仍然存在一些重要的区别。 要表现文本框，必须将input元素的type特性设置为'tex。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/经典方法/表单操作/文本框脚本.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/08-实战与性能/表单操作/文本框脚本.md","filePath":"posts/JavaScript系统教程/08-实战与性能/表单操作/文本框脚本.md"}`),p={name:"posts/JavaScript系统教程/08-实战与性能/表单操作/文本框脚本.md"};function i(c,l,u,o,r,x){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"文本框脚本",tabindex:"-1"},[e("文本框脚本 "),n("a",{class:"header-anchor",href:"#文本框脚本","aria-label":'Permalink to "文本框脚本"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“文本框脚本”的核心思路，并能把它用于实际开发或面试表达。 在HTML中，有两种方式来表现文本框： 一种是使用input元素的单行文本框 另一种是使用<textarea>的多行文本框。")]),n("p",null,"这两个控件非常相似，而且多数时候的行为也差不多。不过，它们之间仍然存在一些重要的区别。 要表现文本框，必须将input元素的type特性设置为'text'，"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"而通过设置size特性，可以指定文本框中能够显示的字符数。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"通过value特性，可以设置文本框的初始值，")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"而maxlength特性则用于指定文本框可以接受的最大字符数。")])])])]),n("p",null,'如果要创建一个文本框，让它能够显示25个字符，但输入不能超过50个字符，可以使用以下代码： <input type="text" size="25" maxlength="50" value="initial value">'),n("p",null,"相对而言<textarea>元素则始终会呈现为一个多行文本框。 要指定文本框的大小，可以使用rows和cols特性。其中，rows特性指定的是文本框的字符行数，而cols特性指定的是文本框的字符列数(类似于<inpu>元素的size特性)。"),n("p",null,'与<input>元素不同，<textarea>的初始值必须要放在<textarea></textarea>之间，如下面的例子所示： <textarea rows="25" cols="5">initial value</textarea> 另一个与input的区别在于，不能在HTML中给textarea指定最大字符数。'),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"无论这两种文本框在标记中有什么区别，但它们都会将用户输入的内容保存在value属性中。可以通过这个属性读取和设置文本框的值，如下面的例子所示：")]),e(`
`),n("span",{class:"line"},[n("span",null,'var textbox = document.forms[0].elements["textbox1"];')]),e(`
`),n("span",{class:"line"},[n("span",null,"alert(textbox.value);")]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.value = "Some new value";')]),e(`
`),n("span",{class:"line"},[n("span",null,"我们建议读者像上面这样使用value属性读取或设置文本框的值，不建议使用标准的D0M方法。换句话说，不要使用setAttribute设置input元素的value特性，也不要去修改<textarea>元素的第一个子节点。原因很简单：对valued属性所作的修改，不一定会反映在DoM中。因此，在处理文本框的值时，最好不要使用DOM方法。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**选择文本**")]),e(`
`),n("span",{class:"line"},[n("span",null,"上述两种文本框都支持select()方法，这个方法用于选择文本框中的所有文本。在调用select()方法时，大多数浏览器(Opea除外)都会将焦点设置到文本框中。这个方法不接受参数，可以在任何时候被调用。下面来看一个例子。")]),e(`
`),n("span",{class:"line"},[n("span",null,'var textbox = document.forms[0].elements["textbox1"];')]),e(`
`),n("span",{class:"line"},[n("span",null,"textbox.select();")]),e(`
`),n("span",{class:"line"},[n("span",null,"在文本框获得焦点时选择其所有文本，这是一种非常常见的做法，特别是在文本框包含默认值的时候。因为这样做可以让用户不必一个一个地删除文本。如：")]),e(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(textbox, "focus", function (event) {')]),e(`
`),n("span",{class:"line"},[n("span",null,"  event = EventUtil.getEvent(event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var target = EventUtil.getTarget(event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"  target.select();")]),e(`
`),n("span",{class:"line"},[n("span",null,"});")]),e(`
`),n("span",{class:"line"},[n("span",null,"将上面的代码应用到文本框之后，只要文本框获得焦点，就会选择其中所有的文本。这种技术能够较大幅度地提升表单的易用性。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**选择****(select)****事件**")]),e(`
`),n("span",{class:"line"},[n("span",null,"与select()方法对应的，是select事件在选择了文本框中的文本时，就会触发select")]),e(`
`),n("span",{class:"line"},[n("span",null,"事件。不过，到底什么时候触发select事件，还会因浏览器而异。在IE+、Opera、Firefox. Chrcane和Safri中，只有用户选择了文本(而且要释放鼠标)，才会触发select事件。而在IE8及更早版本中，只要用户选择了一个字母(不必释放鼠标)，就会触发select事件。另外，在调用select()法时也会触发select事件。如：")]),e(`
`),n("span",{class:"line"},[n("span",null,'var textbox = document.forms[0].elements["textbox1"];')]),e(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(textbox, "select", function (event) {')]),e(`
`),n("span",{class:"line"},[n("span",null,'  var alert("Text selected" + textbox.value);')]),e(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**取得选择的文本**")]),e(`
`),n("span",{class:"line"},[n("span",null,"HTML5通过两个属性：selectionStart和selectionEnd这两个属性来解决这个问题，这两个属性中保存的是基于0的数值，表示所选择文本的范围(即文本选区开头和结尾的偏移量）。因此，要取得用户在文本框中选择的文本，可以使用如下代码。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function getSelectedText(textbox) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"因为substring()方法基于字符串的偏移量执行操作，所以将selectionStart和selectionEnd直接传给它就可以取得选中的文本。Firefox， Safri，Chrome和Opera都支持这两个属性° IE8及之前版本不支持这两个属性，而是提供了另一种方案。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**选择部分文本**")]),e(`
`),n("span",{class:"line"},[n("span",null,"HTML5也为选择文本框中的部分文本提供了解决方案，即最早由Firefox引入的setSelectionRange()方法。现在除select()方法之外，所有文本框都有一个setSelectionRange ()方法。这个方法接收两个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的字符的索引(类似于substring()方法的两个参数)。如：")]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.value = "Hello world!"')]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.setSelectionRange(0, textbox.value.length); //"Hello world!"')]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.setSelectionRange(0, 3); //"Hel"')]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.setSelectionRange(4, 7); //"o w"')]),e(`
`),n("span",{class:"line"},[n("span",null,"要看到选择的文本，必须在调用setSelectionRange()之前或之后立即将焦点设置到文本框。")]),e(`
`),n("span",{class:"line"},[n("span",null,"IE9、Fiiefbx、Safri、Chrome和Opera支持这种方案。IE8及更早版本不同。与在其他浏览器中一样，要想在文本框中看到文本被选择的效果，必须让文本框获得焦点。为了实现跨浏览器编程，可以将上述两种方案组合起来，如下面的例子所示。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function selectText(textbox, startIndex, stopIndex) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  if (textbox.setSelectionRange) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    textbox.setSelectionRange(startIndex, stopIndex);")]),e(`
`),n("span",{class:"line"},[n("span",null,"  } else if (textbox.createTextRange) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    var range = textbox.createTextRange();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    range.collapse(true);")]),e(`
`),n("span",{class:"line"},[n("span",null,'    range.moveStart("character", startIndex);')]),e(`
`),n("span",{class:"line"},[n("span",null,'    range.moveEnd("character", stopIndex - startIndex);')]),e(`
`),n("span",{class:"line"},[n("span",null,"    range.select();")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  textbox.focus();")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"这个selectTextO函数收三个参数：要操作的文本框、要选择文本中第一个字符的索引和要选")]),e(`
`),n("span",{class:"line"},[n("span",null,"择文本中最后一个字符之后的索引。首先，函数测试了文本框是否包含etselectionsange()")]),e(`
`),n("span",{class:"line"},[n("span",null,"如果有，则使用该方法。否则,检测文本框是否支持creaBTextRange方法。如果支持，则通过创建范围来实现选择。最后一步，就是为文本框设置焦点，以便用户看到文本框中选择的文本。可以像下面这样：")]),e(`
`),n("span",{class:"line"},[n("span",null,'textbox.value = "Hello world!"')]),e(`
`),n("span",{class:"line"},[n("span",null,'selectText(textbox, 0, textbox.value.length); //"Hello world!"')]),e(`
`),n("span",{class:"line"},[n("span",null,'selectText(textbox, 0, 3); //"Hel"')]),e(`
`),n("span",{class:"line"},[n("span",null,'selectText(textbox, 4, 7); //"o w"')]),e(`
`),n("span",{class:"line"},[n("span",null,"选择部分文本的技术在实现高级文本输入框时很有用，例如提供自动完成建议的文本框就可以使用这种技术。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**过滤****输入**")]),e(`
`),n("span",{class:"line"},[n("span",null,"我们经常会要求用户在文本框中输入特定的数据，或者输入特定格式的数据。例如，必须包含某些")]),e(`
`),n("span",{class:"line"},[n("span",null,"字符，或者必须匹配某种模式。由于文本框在默认情况下没有提供多少验证麟的手段，因此必须使用")]),e(`
`),n("span",{class:"line"},[n("span",null,"JavaScript来完成此类过滤输入的操作。而综合运用事件和D0M手段，就可以将普通的文本框转换成能")]),e(`
`),n("span",{class:"line"},[n("span",null,"够理解用户输入数据的功能型控件。")]),e(`
`),n("span",{class:"line"},[n("span",null,"1.屏鳌字符")]),e(`
`),n("span",{class:"line"},[n("span",null,"有时候，我们需要用户输入的文本中包含或不包含某些字符。例如，电话号码中不能包含非数值字")]),e(`
`),n("span",{class:"line"},[n("span",null,"符。如前所述，响应向文本框中捕人字符操作的是keypre88事件。因此，可以通过阻止这个事件的默")]),e(`
`),n("span",{class:"line"},[n("span",null,"认行为来屏蔽此类字符。在极端的情况下，可以通过下列代码屛蔽所有按键操作°")]),e(`
`),n("span",{class:"line"},[n("span",null,"Eventutil .addHandler( textbox, •keypreae，，function (event)(")]),e(`
`),n("span",{class:"line"},[n("span",null,"event = Even tut il. ge tE vent (event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"EventUtil- preventDefauIt (event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"E")]),e(`
`),n("span",{class:"line"},[n("span",null,"运行以上代码后，由于所有按跡作都将被屏蔽，结果会导致文本框变成只读的。如果只想屏蔽特")]),e(`
`),n("span",{class:"line"},[n("span",null,"定的字符，则需要检测keypress事件对应的字符编码，然后再决定如何响应。例如，下列代码只允许")]),e(`
`),n("span",{class:"line"},[n("span",null,"用户输入数值。")]),e(`
`),n("span",{class:"line"},[n("span",null,"EventUtil -addHandlerf textbox, ■keypress，，function (event)(")]),e(`
`),n("span",{class:"line"},[n("span",null,"event = Even tut il. ge tE vent (event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"ex targrt ■ Smttrell .g«tTar0«t /")]),e(`
`),n("span",{class:"line"},[n("span",null,"▼ax ahaxCodo ■ BrentUtU .gBtCharCodo(«r«nt)/")]),e(`
`),n("span",{class:"line"},[n("span",null,"If “八0/.tert(8trlBff.Cr^ChaxCodo(aharCod«)))<")]),e(`
`),n("span",{class:"line"},[n("span",null,"图嶼区鈿1 suterxx(sularxx@163xom)专専尊■£ 权")])])])])],-1)])])}const g=s(p,[["render",i]]);export{v as __pageData,g as default};
