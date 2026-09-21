---
title: "JSX和虚拟DOM"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "\\ 来自。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/JSX和虚拟DOM.md"
---
::: v-pre

# JSX和虚拟DOM

> 本节目标：理解“JSX和虚拟DOM”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
**前言**
==React====是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读====React====：从零开始实现一个====React====，从====API====层面实现====React====的大部分功能，在这个过程中去探索为什么有虚拟====DOM====、====diff====、为什么====setState====这样设计等问题。==
==提起====React====，总是免不了和====Vue====做一番对比==
==Vue====的====API====设计非常简洁，但是其实现方式却让人感觉是“魔法”，开发者虽然能马上上手，但其原理却很难说清楚。==
==相比之下====React====的设计哲学非常简单，虽然有很多需要自己处理的细节问题，但它没有引入任何新的概念，相对更加的干净和简单。==
==关于====jsx==
==在开始之前，我们有必要搞清楚一些概念。==
==我们来看一下这样一段代码：==
==const== ==title== ===== ==<====h1== ==className========="title"====>Hello, world!</====h1====>;==
==这段代码并不是合法的====js====代码，它是一种被称为====jsx====的语法扩展，通过它我们就可以很方便的在====js====代码中书写====html====片段。==
==本质上，====jsx====是语法糖，上面这段代码会被====babel====转换成如下代码==
==const== ==title== ===== ==React====.====createElement====(======    =='h1'====,======    =={ className====:== =='title'== ==},======    =='Hello, world!'========);==
==你可以在====babel====官网提供的在线转译测试====jsx====转换后的代码，这里有一个====稍微复杂一点的例子==
==准备工作==
==为了集中精力编写逻辑，在代码打包工具上选择了最近火热的零配置打包工具====parcel====，需要先安装====parcel====：==
==npm install -g parcel-bundler==
==接下来新建====index.js====和====index.html====，在====index.html====中引入====index.js====。==
==当然，有一个更简单的方法，你可以直接下载这个仓库的代码：==
==https://github.com/hujiulong/simple-react/tree/chapter-1==
==注意一下====babel====的配置==
==.babelrc==
=={======    =="presets"====: [===="env"====],======    =="plugins"====: [======        ==[===="transform-react-jsx"====, {======            =="pragma"====:== =="React.createElement"======        ==}]======    ==]========}==
==这个====transform-react-jsx====就是将====jsx====转换成====js====的====babel====插件，它有一个====pragma====项，可以定义====jsx====转换方法的名称，你也可以将它改成====h====（这是很多类====React====框架使用的名称）或别的。==
==准备工作完成后，我们可以用命令====parcel index.html====将它跑起来了，当然，现在它还什么都没有。==
==React.createElement====和虚拟====DOM==
==前文提到，====jsx====片段会被转译成用====React.createElement====方法包裹的代码。所以第一步，我们来实现这个====React.createElement====方法==
==从====jsx====转译结果来看，====createElement====方法的参数是这样：==
==createElement====( tag, attrs, child1, child2, child3 );==
==第一个参数是====DOM====节点的标签名，它的值可能是====div====，====h1====，====span====等等==
==第二个参数是一个对象，里面包含了所有的属性，可能包含了====className====，====id====等等==
==从第三个参数开始，就是它的子节点==
==我们对====createElement====的实现非常简单，只需要返回一个对象来保存它的信息就行了。==
==function== ==createElement====(== ==tag====,== ==attrs====,== ==...====children== ==) {======    ==return== =={======        ==tag,======        ==attrs,======        ==children======    ==}========}==
==函数的参数== ==...children====使用了====ES6====的====rest====参数====，它的作用是将后面====child1,child2====等参数合并成一个数组====children====。==
==现在我们来试试调用它==
==//== ==将上文定义的====createElement====方法放到对象====React====中========const== ==React== ===== =={======    ==createElement========}======
==const== ==element== ===== ==(======    ==<====div====>======        ==hello<====span====>world!</====span====>======    ==</====div====>========);========console====.====log====(== ==element== ==);==
==打开调试工具，我们可以看到输出的对象和我们预想的一致==
```

[](https://user-images.githubusercontent.com/13267437/37565774-89d1c788-2aea-11e8-9b2a-e55acaecbe77.png)

```
==我们的====createElement====方法返回的对象记录了这个====DOM====节点所有的信息，换言之，通过它我们就可以生成真正的====DOM====，这个记录信息的对象我们称之为====虚拟====DOM====。==
==ReactDOM.render==
==接下来是====ReactDOM.render====方法，我们再来看这段代码==
==ReactDOM====.====render====(======    ==<====h1====>Hello, world!</====h1====>,======    ==document====.====getElementById====(===='root'====)========);==
==经过转换，这段代码变成了这样==
==ReactDOM====.====render====(======    ==React====.====createElement====(== =='h1'====,== ==null====,== =='Hello, world!'== ==),======    ==document====.====getElementById====(===='root'====)========);==
==所以====render====的第一个参数实际上接受的是====createElement====返回的对象，也就是虚拟====DOM==
==而第二个参数则是挂载的目标====DOM==
==总而言之，====render====方法的作用就是====将虚拟====DOM====渲染成真实的====DOM====，下面是它的实现：==
==function== ==render====(== ==vnode====,== ==container== ==) {======    ====    ==//== ==当====vnode====为字符串时，渲染结果是一段文本======    ==if== ==(== ==typeof== ==vnode== ======= =='string'== ==) {======        ==const== ==textNode== ===== ==document====.====createTextNode====( vnode );======        ==return== ==container====.====appendChild====( textNode );======    ==}======
==const== ==dom== ===== ==document====.====createElement====(== ==vnode====.====tag== ==);======
==if== ==(== ==vnode====.====attrs== ==) {======        ==Object====.====keys====(== ==vnode====.====attrs== ==).====forEach====(== ==key== ===>== =={======            ==const== ==value== ===== ==vnode====.====attrs====[ key ];======             ==setAttribute====( dom, key, value );==    ==//== ==设置属性======        ==} );======    ==}======
==vnode====.====children====.====forEach====(== ==child== ===>== ==render====( child, dom ) );==    ==//== ==递归渲染子节点======
==return== ==container====.====appendChild====( dom );==    ==//== ==将渲染结果挂载到真正的====DOM====上========}==
==设置属性需要考虑一些特殊情况，我们单独将其拿出来作为一个方法====setAttribute==
==function== ==setAttribute====(== ==dom====,== ==name====,== ==value== ==) {======    ==//== ==如果属性名是====className====，则改回====class======    ==if== ==( name== ======= =='className'== ==) name== ===== =='class'====;======
==//== ==如果属性名是====onXXX====，则是一个事件监听方法======    ==if== ==(== ==/on====\w====+====/====.====test====( name ) ) {======        ==name== ===== ==name====.====toLowerCase====();======        ==dom[ name ]== ===== ==value== ==||== ==''====;======    ==//== ==如果属性名是====style====，则更新====style====对象======    ==}== ==else== ==if== ==( name== ======= =='style'== ==) {======        ==if== ==(== ==!====value== ==||== ==typeof== ==value== ======= =='string'== ==) {======            ==dom====.====style====.====cssText== ===== ==value== ==||== ==''====;======        ==}== ==else== ==if== ==( value== ==&&== ==typeof== ==value== ======= =='object'== ==) {======            ==for== ==(== ==let== ==name== ==in== ==value ) {======                ==//== ==可以通过====style={ width: 20 }====这种形式来设置样式，可以省略掉单位====px======                ==dom====.====style====[ name ]== ===== ==typeof== ==value[ name ]== ======= =='number'== ==?== ==value[ name ]== ==+== =='px'== ==:== ==value[ name ];======            ==}======        ==}======    ==//== ==普通属性则直接更新属性======    ==}== ==else== =={======        ==if== ==( name== ==in== ==dom ) {======            ==dom[ name ]== ===== ==value== ==||== ==''====;======        ==}======        ==if== ==( value ) {======            ==dom====.====setAttribute====( name, value );======        ==}== ==else== =={======            ==dom====.====removeAttribute====( name );======        ==}======    ==}========}==
==这里其实还有个小问题：当多次调用====render====函数时，不会清除原来的内容。所以我们将其附加到====ReactDOM====对象上时，先清除一下挂载目标====DOM====的内容：==
==const== ==ReactDOM== ===== =={======    ==render====:== ==(== ==vnode====,== ==container== ==)== ===>== =={======        ==container====.====innerHTML== ===== ==''====;======        ==return== ==render====( vnode, container );======    ==}========}==
==渲染和更新==
==到这里我们已经实现了====React====最为基础的功能，可以用它来做一些事了。==
==我们先在====index.html====中添加一个根节点==
==<====div== ==id========="root"====></====div====>==
==我们先来试试官方文档中的====Hello,World==
==ReactDOM====.====render====(======    ==<====h1====>Hello, world!</====h1====>,======    ==document====.====getElementById====(===='root'====)========);==
==可以看到结果：==
```

[](https://user-images.githubusercontent.com/13267437/37565800-1d4e23e4-2aeb-11e8-8349-9b56e96fb569.png)

```
==试试渲染一段动态的代码，这个例子也来自====官方文档==
==function== ==tick====() {======    ==const== ==element== ===== ==(======        ==<====div====>======            ==<====h1====>Hello, world!</====h1====>======            ==<====h2====>It is {====new== ==Date====()====.====toLocaleTimeString====()}.</====h2====>======        ==</====div====>======      ==);======    ==ReactDOM====.====render====(======        ==element====,======        ==document====.====getElementById====(== =='root'== ==)======    ==);========}======
==setInterval====(== ==tick====,== ==1000== ==);==
==可以看到结果：==
```

[](https://user-images.githubusercontent.com/13267437/37565989-ffdbc6e2-2aed-11e8-8567-326fd3db2744.gif)

```
==后话==
==这篇文章中，我们实现了====React====非常基础的功能，也了解了====jsx====和虚拟====DOM====，下一篇文章我们将实现非常重要的====组件====功能。==
==最后留下一个小问题==
==在定义====React====组件或者书写====React====相关代码，不管代码中有没有用到====React====这个对象，我们都必须将其====import====进来，这是为什么？==
==例如：==
==import== ==React== ==from== =='react'====;==    ==//== ==下面的代码没有用到====React====对象，为什么也要将其====import====进来========import== ==ReactDOM== ==from== =='react-dom'====;======
==ReactDOM====.====render====( <====App== ==/>,== ==document====.====getElementById====(== =='editor'== ==) );==
==不知道答案的同学再仔细看看这篇文章哦==
==从零开始实现====React====系列==
==React====是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读====React====：从零开始实现一个====React====，从====API====层面实现====React====的大部分功能，在这个过程中去探索为什么有虚拟====DOM====、====diff====、为什么====setState====这样设计等问题。==
==整个系列大概会有四篇左右，我每周会更新一到两篇，我会第一时间在====github====上更新，有问题需要探讨也请在====github====上回复我====~==
```
 \> 来自

```
 <https://github.com/hujiulong/blog/issues/4>
```

:::
