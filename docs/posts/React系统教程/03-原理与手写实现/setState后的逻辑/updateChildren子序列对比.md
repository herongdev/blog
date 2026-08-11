---
title: "updateChildren子序列对比"
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
description: "围绕“updateChildren子序列对比”整理的概念、示例与实践笔记。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/setState后的逻辑/updateChildren子序列对比.md"
---
::: v-pre

# updateChildren子序列对比

> 本节目标：理解“updateChildren子序列对比”的核心思路，并能把它用于实际开发或面试表达。
```
/**
 * 实现完整的DOM-DIFF算法
 * @param {*} parentDOM 父DOM节点
 * @param {*} oldVChildren 老的虚拟DOM儿子的数组
 * @param {*} newVChildren 新的虚拟DOM儿子的数组
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];
  let keyedOldMap = {};
  let lastPlacedIndex = 0;//上一个不需要移动的老DOM节点的索引
  oldVChildren.forEach((oldVChild, index) => {
    let oldKey = oldVChild.key || index;//如果提供了key,会使用key作为唯一标识，如果没有提供，会使用索引
    keyedOldMap[oldKey] = oldVChild;
  });
  //存着将要进行的操作
  let patch = [];
  //循环新数组
  newVChildren.forEach((newVChild, index) => {
    newVChild._mountIndex = index;//设置虚拟DOM的挂载索引为index
    let newKey = newVChild.key || index;
    let oldVChild = keyedOldMap[newKey];
    if (oldVChild) {
      //如果找到了，按理应该在此判断类型，省略....
      //先执行更新虚拟DOM元素 在React15里 DOM的更新和DOM-DIFF放在一起进行的。
      updateElement(oldVChild, newVChild);
      if (oldVChild._mountIndex < lastPlacedIndex) {
        patch.push({
          type: MOVE,
          oldVChild,
          newVChild,
          fromIndex: oldVChild._mountIndex,
          toIndex: index
        });
      }
      //如果此节点被复用了，把它从map中删除
      delete keyedOldMap[newKey];
      lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild._mountIndex);
    } else {//没有找到可复用老节点
      patch.push({
        type: PLACEMENT,
        newVChild,
        toIndex: index
      });
    }
  });
  /* Object.values(keyedOldMap).forEach(oldVChild=>{
      patch.push({
          type:DELETION,
          oldVChild,
          fromIndex:oldVChild._mountIndex
      });
  }); */
  //获取要移动 的元素 这里面只有B
  //此处我只是把B从界面中移动了，但是B还在是内存里的，B 这个DOM元素并没有被 销毁
  const moveChilds = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);
  //现在keyedOldMap放着所有的剩下的元素
  Object.values(keyedOldMap).concat(moveChilds).forEach(oldVChild => {
    let currentDOM = findDOM(oldVChild);
    //获取到B D F三个真实DOM元素，然后从界面中删除
    currentDOM.parentNode.removeChild(currentDOM);
  });
  if (patch.length > 0) console.log(patch);
  patch.forEach(action => {
    let { type, oldVChild, newVChild, fromIndex, toIndex } = action;
    let childNodes = parentDOM.childNodes;//获取真实的子DOM元素的集合[A,C,E]
    if (type === PLACEMENT) {
      let newDOM = createDOM(newVChild);//根据虚拟DOM创建真实DOM
      let childDOMNode = childNodes[toIndex];//找一下目标索引现在对应的真实DOM元素
      if (childDOMNode) {//如果此位置 上已经 有DOM元素的，插入到它前面是
        parentDOM.insertBefore(newDOM, childDOMNode);
      } else {
        parentDOM.appendChild(newDOM);//添加到最后就可以了
      }
    } else if (type === MOVE) {
      let oldDOM = findDOM(oldVChild);//找到老的真实DOM 还可以把内存中的B取到，插入到指定的位置 B
      let childDOMNode = childNodes[toIndex];//找一下目标索引现在对应的真实DOM元素
      if (childDOMNode) {//如果此位置 上已经 有DOM元素的，插入到它前面是
        parentDOM.insertBefore(oldDOM, childDOMNode);
      } else {
        parentDOM.appendChild(oldDOM);//添加到最后就可以了
      }
    }
  });
```

```
  /*  let maxChildrenLength = Math.max(oldVChildren.length, newVChildren.length);
   //oldChildren=3 newChildren=2   oldChildren=2 newChildren=3
   for (let i = 0; i < maxChildrenLength; i++) {
       //试图取出当前的节点的下一个，最近的弟弟真实DOM节点
       let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
       compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], findDOM(nextVdom));
   } */
}
```

:::
