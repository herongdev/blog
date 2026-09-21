---
title: "Compile"
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
description: "围绕“Compile”整理的概念、示例与实践笔记。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/Compile.md"
---
::: v-pre

# Compile

> 本节目标：理解“Compile”的核心思路，并能把它用于实际开发或面试表达。
```
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    constructor: Compile,
    node2Fragment: function (el) {
        var fragment = document.createDocumentFragment(),
            child;
        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    init: function () {
        this.compileElement(this.$fragment);
    },
    compileElement: function (el) {
        var childNodes = el.childNodes,
            _this = this;
        [].slice.call(childNodes).forEach(function (node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;
            if (_this.isElementNode(node)) {
                _this.compile(node);
            } else if (_this.isTextNode(node) && reg.test(text)) {
                _this.compileText(node, RegExp.$1.trim());
            }
            if (node.childNodes && node.childNodes.length) {
                _this.compileElement(node);
            }
        });
    },
    compile: function (node) {
        var nodeAttrs = node.attributes,
            _this = this;
        [].slice.call(nodeAttrs).forEach(function (attr) {
            var attrName = attr.name;
            if (_this.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (_this.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, _this.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, _this.$vm, exp);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function (node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
};
// 指令处理集合
var compileUtil = {
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        var _this = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            _this._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    class: function (node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    bind: function (node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    // 事件处理
    eventHandler: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    _getVMVal: function (vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k) {
            val = val[k];
        });
        return val;
    },
    _setVMVal: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};
```

```
var updater = {
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    classUpdater: function (node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');
        var space = className && String(value) ? ' ' : '';
        node.className = className + space + value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};
```

:::
