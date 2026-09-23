import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"拖放","description":"拖放是一种非常流行的用户界面模式。它的概念很简单：点击某个对象，并按住鼠标按钮不放，将鼠标移动到另一个区域，然后释放鼠标按钮将对象“放”在这里。指放功能也流行到了 Web上，成为了一些更传统的配置界面的一种候选方案。 修缮拖动功能 当你试了上面的例子之后，你会发现元素的左上角却是。","frontmatter":{"title":"拖放","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"拖放是一种非常流行的用户界面模式。它的概念很简单：点击某个对象，并按住鼠标按钮不放，将鼠标移动到另一个区域，然后释放鼠标按钮将对象“放”在这里。指放功能也流行到了 Web上，成为了一些更传统的配置界面的一种候选方案。 修缮拖动功能 当你试了上面的例子之后，你会发现元素的左上角却是。","sidebarWeight":64,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/拖放.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/拖放.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/拖放.md"}'),t={name:"posts/JavaScript系统教程/04-浏览器与 Web API/拖放.md"};function i(u,s,c,d,r,o){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"拖放",tabindex:"-1"},[l("拖放 "),n("a",{class:"header-anchor",href:"#拖放","aria-label":'Permalink to "拖放"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“拖放”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 拖放是一种非常流行的用户界面模式。它的概念很简单：点击某个对象，并按住鼠标按钮不放，将鼠标移动到另一个区域，然后释放鼠标按钮将对象“放”在这里。指放功能也流行到了 Web上，成为了一些更传统的配置界面的一种候选方案。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"拖放的基本概念很简单：创建一个绝对定位的元素，使其可以用鼠标移动。这个技术源自一种叫做“鼠标施尾”的经典网页技巧。鼠标拖尾是一个或者多个图片在页面上跟着鼠标指针移动。单元素鼠标拖尾的基本代码需要为文档设置一个onmousemove事件处理程序，它却是将指定元素移动到鼠标指针的位置，如：")]),l(`
`),n("span",{class:"line"},[n("span",null,'EventUtil.addHandler(document, "mousemove", function (event) {')]),l(`
`),n("span",{class:"line"},[n("span",null,'  var myDiv = document.getElementById("myDiv");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  myDiv.style.left = event.clientX + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,'  myDiv.style.top = event.clientY + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"在这个例子中，元素的left和top坐标设置为了 event对象的clientx和clientY属性，这")]),l(`
`),n("span",{class:"line"},[n("span",null,"就将元素放到了视口中指针的位置上。它的效果是一个元素始终跟随指针在页面上的移动。只要正确的时刻(当鼠标按钮按下的时候)实现该功能，并在之后删除它(当释放鼠标按钮时)，就可以实现拖放了。最简单的拖放界面可用以下代码实现：")]),l(`
`),n("span",{class:"line"},[n("span",null,"var DragDrop = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var dragging = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  function handleEvent(event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取事件和目标")]),l(`
`),n("span",{class:"line"},[n("span",null,"    event = EventUtil.getEvent(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var target = EventUtil.getTarget(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 确定事件类型")]),l(`
`),n("span",{class:"line"},[n("span",null,"    switch (event.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousedown":')]),l(`
`),n("span",{class:"line"},[n("span",null,'        if (target.className.indexOf("draggable") > -1) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"          dragging = target;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousemove":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (dragging !== null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          // 指定位置")]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.left = event.clientX + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.top = event.clientY + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mouseup":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        dragging = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 公共接口")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    enable: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    disable: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}();")]),l(`
`),n("span",{class:"line"},[n("span",null,"DragDrop对象封装了拖放的所有基本功能。这是一个单例对象，并使用了模块模式来隐藏某些实现细节。dragging变量起初是null，将会存放被施动的元素，所以当该变量不为null时，就知道正在拖动某个东西。handleEvent()函数处理拖放功能中的所有的三个鼠标事件。它首先获取event对象和事件目标的引用。之后，用一个switch语句确定要触发那个事件样式。当mousedown事件发生时，会检査target的class是否包含draggable类，如果是，那么将target存放到dragging中。这个技巧可以很方便地通过标记语言而非JavaScript脚本来确定可拖动的元素。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"handleEvent()的mousemove情况和前面的代码一样，不过要检査dragging是否为null，当")]),l(`
`),n("span",{class:"line"},[n("span",null,"它不是null，就知道dragging就是要拖动的元素，这样就会把它放到恰当的位置上。mouseup情况就仅仅是将dragging重置为null，让mousemove事件中的判断失效。")]),l(`
`),n("span",{class:"line"},[n("span",null,"DragDrop还有两个公共方法：enable()和disable。它们只是相应添加和删除所有的事件处")]),l(`
`),n("span",{class:"line"},[n("span",null,"理程序。这两个函数提供了额外的对拖放功能的控制手段。")]),l(`
`),n("span",{class:"line"},[n("span",null,"要使用Dragorop对象，只要在页面上包含这些代码并调用enable。指放会自动针对所有包含draggable类的元素启用，如下例所示：")]),l(`
`),n("span",{class:"line"},[n("span",null,'<div class="draggable" style="position:absolute; background:red"> </div>')]),l(`
`),n("span",{class:"line"},[n("span",null,"注意为了元素能被拖放，它必须是绝对定位的。")])])])]),n("p",null,[n("strong",null,"修缮拖动功能"),l(" 当你试了上面的例子之后，你会发现元素的左上角却是和指针在一起。这个结果对用户来说有一点不爽，因为当鼠标开始移动的时候，元素好像是突然跳了一下。理想情况是，这个动作应该看上去好像这个元索是被指针“拾起”的，也就是说当在拖动元素的时候，用户点击的那一点就是指针应该保持的位置，如下图：")]),n("p",null,"要达到需要的效果，必须做一些额外的计算。你需要计算元素左上角和指针位置之间的差值。这个差值应该在mousedown事件发生的时候确定，并且一直保持，直到mouseup事件发生。通过将event的clientx和clientY属性与该元素的offsetLeft和offsetTop属性进行比较，就可以算出水平方向和垂直方向上需要多少空间，如下图："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"为了保存x和y坐标上的差值，还需要几个变量。diffX和diffY这些变量需要在omousemove")]),l(`
`),n("span",{class:"line"},[n("span",null,"事件处理程序中用到，来对元素进行适当的定位，如下面的例子所示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"var DragDrop = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var dragging = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  diffX = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  diffY = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  function handleEvent(event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取事件目标")]),l(`
`),n("span",{class:"line"},[n("span",null,"    event = EventUtil.getEvent(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var target = EventUtil.getTarget(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 确定事件类型")]),l(`
`),n("span",{class:"line"},[n("span",null,"    switch (event.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousedown":')]),l(`
`),n("span",{class:"line"},[n("span",null,'        if (target.className.indexOf("draggable") > -1) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"          dragging = target;")]),l(`
`),n("span",{class:"line"},[n("span",null,"          diffX = event.clientX - target.offsetLeft;")]),l(`
`),n("span",{class:"line"},[n("span",null,"          diffY = event.clientY - target.offsetTop;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousemove":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (dragging !== null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          // 指定位置")]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.left = (event.clientX - diffX) + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.top = (event.clientY - diffY) + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mouseup":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        dragging = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 公共接口")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    enable: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.addHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    disable: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'      EventUtil.removeHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}();")]),l(`
`),n("span",{class:"line"},[n("span",null,"di££x和di££Y变量是私有的，因为只有handleEventO函数需要用到它们。当mousedown事")]),l(`
`),n("span",{class:"line"},[n("span",null,"件发生时，通过clientx 目标的offsetLeft, clientY 目标的offsetTop,可以狀到这")]),l(`
`),n("span",{class:"line"},[n("span",null,"两个变M的值。当触发了 mousenove事件后，就可以使用这些变量从指针坐标中减去，得到:S终的坐标。最后得到一个更加平滑的拖动体验，更加符合用户所期望的方式。")])])])]),n("p",null,"添加自定义事件 拖放功能还不能真正应用起来，除非能知道什么时候拖动开始了。从这点上看，前面的代码没有提供任何方法表示拖动开始、正在拖动或者已经结束。这时，可以使用自定义事件来指示这几个事件的发生，让应用的其他部分与拖动功能进行交互。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"由于Dragorop对象是一个使用了模块模式的单例，所以需要进行一些更改来使用EventTarget类型。首先，创建一个新的EventTarget对象，然后添加enable和disable方法，最后返回这个对象，看以下内容。")]),l(`
`),n("span",{class:"line"},[n("span",null,"var DragDrop = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var dragdrop = new EventTarget(),")]),l(`
`),n("span",{class:"line"},[n("span",null,"    dragging = null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    diffX = 0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    diffY = 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  function handleEvent(event) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 获取事件和对象")]),l(`
`),n("span",{class:"line"},[n("span",null,"    event = EventUtil.getEvent(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    var target = EventUtil.getTarget(event);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 确定事件类型")]),l(`
`),n("span",{class:"line"},[n("span",null,"    switch (event.type) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousedown":')]),l(`
`),n("span",{class:"line"},[n("span",null,'        if (target.className.indexOf("draggable") > -1) {')]),l(`
`),n("span",{class:"line"},[n("span",null,"          dragging = target;")]),l(`
`),n("span",{class:"line"},[n("span",null,"          diffX = event.clientX - target.offsetLeft;")]),l(`
`),n("span",{class:"line"},[n("span",null,"          diffY = event.clientY - target.offsetTop;")]),l(`
`),n("span",{class:"line"},[n("span",null,"          dragdrop.fire({")]),l(`
`),n("span",{class:"line"},[n("span",null,'            type: "dragstart", target: dragging,')]),l(`
`),n("span",{class:"line"},[n("span",null,"            x: event.clientX, y: event.clientY")]),l(`
`),n("span",{class:"line"},[n("span",null,"          });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mousemove":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (dragging !== null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"          // 指定位置")]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.left = (event.clientX - diffX) + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,'          dragging.style.top = (event.clientY - diffY) + "px";')]),l(`
`),n("span",{class:"line"},[n("span",null,"          // 触发自定义事件")]),l(`
`),n("span",{class:"line"},[n("span",null,"          dragdrop.fire({")]),l(`
`),n("span",{class:"line"},[n("span",null,'            type: "drag", target: dragging,')]),l(`
`),n("span",{class:"line"},[n("span",null,"            x: event.clientX, y: event.clientY")]),l(`
`),n("span",{class:"line"},[n("span",null,"          });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,'      case "mouseup":')]),l(`
`),n("span",{class:"line"},[n("span",null,"        dragdrop.fire({")]),l(`
`),n("span",{class:"line"},[n("span",null,'          type: "dragend", target: dragging,')]),l(`
`),n("span",{class:"line"},[n("span",null,"          x: event.clientX, y: event.clientY")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dragging = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // 公共接口")]),l(`
`),n("span",{class:"line"},[n("span",null,"  dragdrop.enable = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.addHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.addHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.addHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  dragdrop.disable = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.removeHandler(document, "mousedown", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.removeHandler(document, "mousemove", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,'    EventUtil.removeHandler(document, "mouseup", handleEvent);')]),l(`
`),n("span",{class:"line"},[n("span",null,"  };")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return dragdrop;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}();")]),l(`
`),n("span",{class:"line"},[n("span",null,"这段代码定义了三个事件:dragstart、drag和dragend它们都将被拖动的元素设置为了 target,并给出了 x和y属性来表示当前的位置。它们触发于dragdrop对象上，之后在返回对象前给对象增加enable()和disable ()方法。这些模块模式中的细小更改令DragDrop对象支持了事件，如下：")]),l(`
`),n("span",{class:"line"},[n("span",null,'DragDrop.addHandler("dragstart", function (event) {')]),l(`
`),n("span",{class:"line"},[n("span",null,'  var status = document.getElementById("status");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  status.innerHTML = "Started dragging " + event.target.id;')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,'DragDrop.addHandler("drag", function (event) {')]),l(`
`),n("span",{class:"line"},[n("span",null,'  var status = document.getElementById("status");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x +')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "," + event.y + ")";')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,'DragDrop.addHandler("dragend", function (event) {')]),l(`
`),n("span",{class:"line"},[n("span",null,'  var status = document.getElementById("status");')]),l(`
`),n("span",{class:"line"},[n("span",null,'  status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x +')]),l(`
`),n("span",{class:"line"},[n("span",null,'    "," + event.y + ")";')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,"这里，为Dragorop对象的每个事件添加了事件处理程序。还使用了一个元素来实现被拖动的元素当前的状态和位置。一旦元素被放下了，就可以看到从它一开始被拖动之后经过的所有的中间步骤。 为DragDrop添加自定义事件可以使这个对象更健壮，它将可以在网络应用中处理复杂的拖放 功能。")],-1)])])}const m=a(t,[["render",i]]);export{v as __pageData,m as default};
