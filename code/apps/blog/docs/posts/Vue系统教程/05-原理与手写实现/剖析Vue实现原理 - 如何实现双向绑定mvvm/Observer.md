---
title: "Observer"
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
description: "围绕“Observer”整理的概念、示例与实践笔记。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/Observer.md"
---
::: v-pre

# Observer

> 本节目标：理解“Observer”的核心思路，并能把它用于实际开发或面试表达。
```
function Observer(data) {
    this.data = data;
    this.watch(data);
}
Observer.prototype = {
    constructor: Observer,
    watch: function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this.convert(key, data[key]);
        });
    },
    convert: function (key, val) {
        this.defineReactive(this.data, key, val);
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function () {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};
```

```
var uid = 0;
function Dep() {
    this.id = uid++;
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    depend: function () {
        Dep.target.addDep(this);
    },
    removeSub: function (sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
Dep.target = null;
```

:::
