---
title: "谈谈JavaScript中的双向数据绑定"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "双向数据绑定指的是将对象属性变化绑定到 UI ，或者反之。 换句话说，如果我们有一个拥有 name 属性的 user 对象，当我们给 user.name 赋予一个新值时， UI 也会相应的显示新的名字。同样的，如果 UI 包括了一个输入字段用来输入用户名，输入一个新的值会导致 u。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/谈谈JavaScript中的双向数据绑定.md"
---
::: v-pre

# 谈谈JavaScript中的双向数据绑定

> 本节目标：理解“谈谈JavaScript中的双向数据绑定”的核心思路，并能把它用于实际开发或面试表达。
双向数据绑定指的是将对象属性变化绑定到`UI`，或者反之。

换句话说，如果我们有一个拥有`name`属性的`user`对象，当我们给`user.name`赋予一个新值时，`UI`也会相应的显示新的名字。同样的，如果`UI`包括了一个输入字段用来输入用户名，输入一个新的值会导致`user`对象中的那么属性发生变化。

许多流行的客户端`JavaScript`框架例如`Ember.js`，`AngularJS`以及`KnockoutJS`都将双向数据绑定作为自己的头号特性。但是这并不意味着从零开始实现双向数据绑定就很困难，同样的当我们需要双向数据绑定时并不是只能够选择这些框架其中的一个。双向数据绑定底层的思想非常的基本，它可以被压缩成为三个步骤：

一、需要识别哪些`UI`元素被绑定了相应的属性；
二、需要监视属性和`UI`元素的变化；
三、需要将变化传播到绑定的对象和元素；

虽然实现的方法有很多，但是最简单也是最有效的途径是使用发布者`-`订阅者模式。

思想很简单：
我们可以使用自定义的`data`属性在`HTML`代码中指明绑定。
所有绑定起来的`JavaScript`对象以及`DOM`元素都将“订阅”一个发布者对象。
任何时候如果`JavaScript`对象或者一个`HTML`输入字段被侦测到发生了变化，我们将代理事件到发布者`-`订阅者模式，这会反过来将变化广播并传播到所有绑定的对象和元素。

**使用**`jQuery`**的简单实现**
使用`jQuery`来实现双向数据绑定非常的直接且简单，因为这个流行的库能够使我们轻松的订阅和发布`DOM`事件，以及我们自定义的事件：

```
function DataBinder(object_id) {
  //
```

使用一个`jQuery`对象作为简单的订阅者发布者

```
  var pubSub = jQuery({});
  //
```

我们希望一个`data`元素可以在表单中指明绑定：

```
data-bind-<object_id>="<property_name>"
  var data_attr = "bind-" + object_id,
    message = object_id + ":change";
  //
```

使用`data-binding`属性和代理来监听那个元素上的变化事件

```
  //
```

以便变化能够`“`广播`”`到所有的关联对象

```

  jQuery(document).on("change", "[data-" + data_attr + "]", function (evt) {
    var input = jQuery(this);
    pubSub.trigger(message, [$input.data(data_attr), $input.val()]);
  });
  //PubSub
```

将变化传播到所有的绑定元素，设置`input`标签的值或者其他标签的`HTML`内容

```

  pubSub.on(message, function (evt, prop_name, new_val) {
    jQuery("[data-" + data_attr + "=" + prop_name + "]").each(function () {
      var $bound = jQuery(this);
      if ($bound.is("input,text area,select")) {
        $bound.val(new_val);
      } else {
        $bound.html(new_val);
      }
    });
  });
  return pubSub;
}
```
 在这个实验中可以按照以下代码简单的实现一个`User`模型：

```

function User(uid){    var binder = new DataBinder(uid),
user = {            atttibutes: {},
//
```

属性设置器使用数据绑定器`PubSub`来发布变化

```

set: function(attr_name,val){                this.attriures[attr_name] = val;                binder.trigger(uid + ":change", [attr_name, val, this]);            },
get: function(attr_name){                return this.attributes[attr_name];            },
_binder: binder        };
binder.on(uid +":change",function(vet,attr_name,new_val,initiator){            if(initiator !== user){                user.set(attr_name,new_val);            }        })}
```
 现在，无论我们什么时候想把模型的属性绑定到`UI`的一部分上，我们只需要在相应的`HTML`元素上设置一个合适的`data`属性即可。

```

//JavaScript
var user = new User(123);user.set("name","Wolfgang");
//html
<input type="number" data-bind-123="name" />
input
```

字段的值会自动反映出`user`对象的`name`属性，反之亦然。任务完成了！
**不使用**`jQuery`**来创建数据双向绑定**
在入如今的大多数项目中，都可能已经用到了`jQuery`，因此完全可以借用前面的例子。但是如果我们更进一步，移除对`jQuery`的依赖会怎样呢？事实上，这并不是太困难（尤其是当我们限定只支持`IE8`以上的版本）。最终，我们需要使用原生的`JavaScript`来实现一个自定义的`PubSub`以及观察`DOM`事件。

```

function DataBinder(object_id){    //
```

创建一个简单地`PubSub`对象

```

var pubSub = {        callbacks: {}.
on: function(msg,calssback){            this.callbacks[msg] = this.callbacks[msg] || [];            this.callbacks[msg].push(callback);        },
publish: function(msg){            this.callbacks[msg] = this.callbacks[msg] || [];            for(var i = 0, len = this.callbacks[msg].length; i<lenli++){                this.callbacks[msg][i].apply(this,arguments);            }        }    },
data_attr = "data-bind-" + object_id,    message = object_id + ":change",
changeHandler = function(evt){        var target = evt.target || evt.srcElemnt, //IE8
```

兼容

```
            prop_name = target.getAttribute(data_attr);
if(prop_name && prop_name !== ""){                pubSub.publish(message,prop_name,target.value);            }    };
//
```

监听变化事件并代理到

```
PubSub     if(document.addEventListener){        document.addEventListener("change",changeHandler,false);    }else{        //IE8
```

使用`attachEvent`而不是

```
addEventListener             document.attachEvent("onchange",changeHandler);    }
//PubSub
```

将变化传播到所有绑定元素

```

pubSub.on(message,function(vet,prop_name,new)_val){        var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),                tah_name;
for(var i = 0,len =elements.length; i < len; i++){            tag_name = elements[i].tagName.toLowerCase();
if(tag_name === "input" || tag_name === "textarea" || tag_name === "select"){            elements[i].value = new_val;            }else{                elements[i].innerHTML = new_val;            }        }    });
return pubSub;}
```
 模型可以和勤勉你的例子保持一直，除了在设置器中调用那个`jQuery`的`trigger`方法之外，它需要通过调用一个自定义的`PubSub`的`publish`方法来实现：

```

//
```

在`model`的设置器中

```

function User(uid){//...
user = {//...set: function(attr_name,val){    this.attribute[attr_name] = val;    //
```

使用“`publish`”方法

```
      binder.publish(uid+ ":change", attr_name, val,this);        }    }
//...}
```
 再一次，我们使用原生的`JavaScript`代码实现了相同的结果，而不是使用臃肿的`JavaScript`框架。

**本文译自**`easy two way data-binding in JavaScript`**，原文地址**

```
http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/
```
 **如果你觉得本文对你有帮助，请点击下面的链接为我提供赞助**
 \> 来自

```
 <http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day>
```

:::
