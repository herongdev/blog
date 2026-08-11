---
title: "记忆化库-memoize-one"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "根据 memoize one 名字中的 one 可以知道，这个库的每个实例都缓存了一个结果，下一次不同的结果将覆盖上一次的。虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。 使用 npm 安装： $ npm install memoize one ，先看一下官方例子：。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/记忆化库-memoize-one.md"
---
::: v-pre

# 记忆化库-memoize-one

> 本节目标：理解“记忆化库-memoize-one”的核心思路，并能把它用于实际开发或面试表达。
==根据====memoize-one====名字中的====one====可以知道，这个库的每个实例都缓存了一个结果，下一次不同的结果将覆盖上一次的。虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。==
==使用====npm====安装：====$ npm install memoize-one====，先看一下官方例子：==

|   |   |
|---|---|
|```
==1==
==2==
==3==
==4==
==5==
==6==
==7==
==8==
==9==
==10==
==11==
==12==
==13==
==14==
==15==
==16==
==17==
==18==
==19==
==20==
```text
|```
==import== ==memoizeOne== ==from== =='memoize-one'====;==
```

```
==const== ==add === ==(====a, b====) =>== ==a + b;==
==const== ==memoizedAdd = memoizeOne(add);==
```

```
==memoizedAdd(====1====,== ==2====);== ==// 3==
```

```
==memoizedAdd(====1====,== ==2====);== ==// 3==
==// Add== ==函数并没有执行====:== ==前一次执行的结果被返回==
```

```
==memoizedAdd(====2====,== ==3====);== ==// 5==
==// Add== ==函数再次被调用以获得新的结果==
```

```
==memoizedAdd(====2====,== ==3====);== ==// 5==
==// Add== ==函数并没有执行====:== ==前一次执行的结果被返回==
```

```
==memoizedAdd(====1====,== ==2====);== ==// 3==
==// Add== ==函数再次被调用以获得新的结果==
==//== ==虽然之前调用过==
==//== ==但是不是上一次调用的，所以结果丢失了==
```text
|

==memoizeOne(resultFn, isEqual)====接收一个结果函数和一个对比函数，对比函数为空则默认使用===========来进行入参的比较。==
==简单来讲就是，====memoizeOne()====在原来====resultFn()====函数外面包了一层，返回一个函数，然后每次调用的时候看新入参====newArgs====是否和上一次的入参====lastArgs====一致，参数不变，则直接返回缓存的结果，否则重新执行====resultFn(newArgs)====，缓存新结果。==
==简单改造一下上面的例子：==

|   |   |
|---|---|
|```
==1==
==2==
==3==
==4==
==5==
==6==
==7==
==8==
==9==
==10==
==11==
==12==
==13==
==14==
==15==
==16==
==17==
==18==
==19==
==20==
==21==
==22==
```text
|```
==import== ==React, { Component }== ==from== =='react'====;==
==import== ==memoizeOne== ==from== =='memoize-one'====;==
==class== ==TableList== ==extends== ==Component== =={==
==state = { filterText:== ==""== ==};==
==handleChange === ==event== ===>== =={==
==this====.setState({ filterText: event.target.value });==
==};==
==filter = memoize(==
==(list, filterText) => list.filter(====item== ===>== ==item.text.includes(filterText))==
==);==
==render() {==
==const== =={ list, title } === ==this====.props;==
==//====当====list====和====filterName====不变时，====filteredList====返回值不变==
==const== ==filteredList === ==this====.filter(list,== ==this====.state.filterText);==
==return== ==(==
==<Fragment>==
==<input onChange={====this====.handleChange} value={====this====.state.filterText} />==
==<ul>{filteredList.map(====item== ===>== ==<li key={item.id}>{item.text}<====/li>)}</u====l>==
==<====/Fragment>==
==)==
==}==
==}==
```text
|

==这样就简单的实现了一个记忆优化。==
**源码解读**
==memoize-one====记忆库巧妙的使用了====闭包====来实现，一般我是不看源码的，但是这个库的源码只有不到====40====行的代码，简单易懂，这里就简单看一下：==

|   |   |
|---|---|
|```
==1==
==2==
==3==
==4==
==5==
==6==
==7==
==8==
==9==
==10==
==11==
==12==
==13==
==14==
==15==
==16==
==17==
==18==
==19==
==20==
==21==
==22==
==23==
==24==
==25==
==26==
==27==
==28==
==29==
==30==
==31==
==32==
==33==
==34==
==35==
==36==
==37==
==38==
==39==
==40==
==41==
==42==
==43==
```text
|```
==//isEqual====比较函数，用来判断参数是否一致，默认使用全等来判断==
==var== ==simpleIsEqual === ==function== ==simpleIsEqual====(====a, b====)== =={==
==return== ==a === b;==
==};==
```

```
==function== ==index== ==(====resultFn, isEqual====)== =={==
==//====不传====isEqual====，使用默认的内置函数==
==if== ==(isEqual ===== ==void== ==0====) {==
==isEqual = simpleIsEqual;==
==}==
```

```
==var== ==lastThis;==
==var== ==lastArgs = [];==  ==//====上一次的入参==
==var== ==lastResult;==     ==//====缓存的结果==
==var== ==calledOnce === ==false====;==  ==//====是否调用过，区分第一次==
```

```
==//====判断两次入参是否相等，使用了====every====方法，这个是====every====方法的函数==
==var== ==isNewArgEqualToLast === ==function== ==isNewArgEqualToLast====(====newArg, index====)== =={==
==return== ==isEqual(newArg, lastArgs[index]);==
==};==
```

```
==var== ==result === ==function== ==result====()== =={==
==//====将入参====arguments====按顺序一个个存入====newArgs====内==
==for== ==(====var== ==_len === ==arguments====.length, newArgs === ==new== ==Array====(_len), _key === ==0====; _key < _len; _key++) {==
==newArgs[_key] === ==arguments====[_key];==
==}==
```

```
==//====入参不变，直接返回缓存的结果====lastResult==
==if== ==(calledOnce && lastThis ===== ==this== ==&& newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {==
==return== ==lastResult;==
==}==
```

```
==lastResult = resultFn.apply(====this====, newArgs);==  ==//apply====到====resultFn,====传入参数====newArgs====，缓存结果==
==calledOnce === ==true====;==
==lastThis === ==this====;==  ==//this====？==
==lastArgs = newArgs;==  ==//====新入参替换缓存的参数==
==return== ==lastResult;==   ==//====返回新计算的结果==
==};==
```

```
==return== ==result;==   ==//====返回一个函数，闭包，不被====GC==
==}==
```

```
==export default== ==index;==
```text
|

==源码还是比较容易看懂的。==
**isEqual****函数**
==因为对相等的理解，不同场景不一样，而且参数有时候是复杂的对象，所以我们不能仅仅通过比较操作符== ====== ==或者== ======= ==来判断。====memoize-one== ==允许用户自定义传入判断是否相等的函数，比如我们可以使用== ==lodash== ==的== ==isEqual== ==来判断两次参数是否相等。==

|   |   |
|---|---|
|```
==1==
==2==
==3==
==4==
==5==
==6==
==7==
==8==
==9==
==10==
==11==
==12==
==13==
==14==
==15==
==16==
==17==
```text
|```
==import== ==memoizeOne== ==from== =='memoize-one'====;==
==import== ==deepEqual== ==from== =='lodash/isEqual'====;==
```

```
==const== ==identity === ==x== ===>== ==x;==
```

```
==const== ==defaultMemoization = memoizeOne(identity);==
==const== ==customMemoization = memoizeOne(identity, deepEqual);==
```

```
==const== ==result1 = defaultMemoization({foo:== =='bar'====});==
==const== ==result2 = defaultMemoization({foo:== =='bar'====});==
```

```
==result1 === result2== ==// false -== ==索引不同==
```

```
==const== ==result3 = customMemoization({foo:== =='bar'====});==
==const== ==result4 = customMemoization({foo:== =='bar'====});==
```

```
==result3 === result4== ==// true -== ==参数通过== ==lodash== ==的== ==isEqual== ==判断是相等的==
```text
|
 \> 来自

```
 <https://liyang0207.github.io/2018/10/11/%E3%80%8A%E8%AE%B0%E5%BF%86%E5%8C%96%E6%8A%80%E6%9C%AFmemoize-one%E3%80%8B/>
```

:::
