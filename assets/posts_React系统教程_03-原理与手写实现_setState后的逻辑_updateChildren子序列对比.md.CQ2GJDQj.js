import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const C=JSON.parse('{"title":"updateChildren子序列对比","description":"围绕“updateChildren子序列对比”整理的概念、示例与实践笔记。","frontmatter":{"title":"updateChildren子序列对比","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“updateChildren子序列对比”整理的概念、示例与实践笔记。","sidebarWeight":55,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/setState后的逻辑/updateChildren子序列对比.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/setState后的逻辑/updateChildren子序列对比.md","filePath":"posts/React系统教程/03-原理与手写实现/setState后的逻辑/updateChildren子序列对比.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/setState后的逻辑/updateChildren子序列对比.md"};function d(t,s,c,u,o,h){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"updatechildren子序列对比",tabindex:"-1"},[l("updateChildren子序列对比 "),n("a",{class:"header-anchor",href:"#updatechildren子序列对比","aria-label":'Permalink to "updateChildren子序列对比"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“updateChildren子序列对比”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * 实现完整的DOM-DIFF算法")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM 父DOM节点")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVChildren 老的虚拟DOM儿子的数组")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVChildren 新的虚拟DOM儿子的数组")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"function updateChildren(parentDOM, oldVChildren, newVChildren) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let keyedOldMap = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let lastPlacedIndex = 0;//上一个不需要移动的老DOM节点的索引")]),l(`
`),n("span",{class:"line"},[n("span",null,"  oldVChildren.forEach((oldVChild, index) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let oldKey = oldVChild.key || index;//如果提供了key,会使用key作为唯一标识，如果没有提供，会使用索引")]),l(`
`),n("span",{class:"line"},[n("span",null,"    keyedOldMap[oldKey] = oldVChild;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //存着将要进行的操作")]),l(`
`),n("span",{class:"line"},[n("span",null,"  let patch = [];")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //循环新数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"  newVChildren.forEach((newVChild, index) => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    newVChild._mountIndex = index;//设置虚拟DOM的挂载索引为index")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let newKey = newVChild.key || index;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let oldVChild = keyedOldMap[newKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVChild) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      //如果找到了，按理应该在此判断类型，省略....")]),l(`
`),n("span",{class:"line"},[n("span",null,"      //先执行更新虚拟DOM元素 在React15里 DOM的更新和DOM-DIFF放在一起进行的。")]),l(`
`),n("span",{class:"line"},[n("span",null,"      updateElement(oldVChild, newVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (oldVChild._mountIndex < lastPlacedIndex) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"          type: MOVE,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          oldVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          newVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          fromIndex: oldVChild._mountIndex,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          toIndex: index")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"      //如果此节点被复用了，把它从map中删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"      delete keyedOldMap[newKey];")]),l(`
`),n("span",{class:"line"},[n("span",null,"      lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild._mountIndex);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else {//没有找到可复用老节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"        type: PLACEMENT,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        newVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        toIndex: index")]),l(`
`),n("span",{class:"line"},[n("span",null,"      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  /* Object.values(keyedOldMap).forEach(oldVChild=>{")]),l(`
`),n("span",{class:"line"},[n("span",null,"      patch.push({")]),l(`
`),n("span",{class:"line"},[n("span",null,"          type:DELETION,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          oldVChild,")]),l(`
`),n("span",{class:"line"},[n("span",null,"          fromIndex:oldVChild._mountIndex")]),l(`
`),n("span",{class:"line"},[n("span",null,"      });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  }); */")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //获取要移动 的元素 这里面只有B")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //此处我只是把B从界面中移动了，但是B还在是内存里的，B 这个DOM元素并没有被 销毁")]),l(`
`),n("span",{class:"line"},[n("span",null,"  const moveChilds = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  //现在keyedOldMap放着所有的剩下的元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Object.values(keyedOldMap).concat(moveChilds).forEach(oldVChild => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = findDOM(oldVChild);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //获取到B D F三个真实DOM元素，然后从界面中删除")]),l(`
`),n("span",{class:"line"},[n("span",null,"    currentDOM.parentNode.removeChild(currentDOM);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")]),l(`
`),n("span",{class:"line"},[n("span",null,"  if (patch.length > 0) console.log(patch);")]),l(`
`),n("span",{class:"line"},[n("span",null,"  patch.forEach(action => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let { type, oldVChild, newVChild, fromIndex, toIndex } = action;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let childNodes = parentDOM.childNodes;//获取真实的子DOM元素的集合[A,C,E]")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (type === PLACEMENT) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let newDOM = createDOM(newVChild);//根据虚拟DOM创建真实DOM")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let childDOMNode = childNodes[toIndex];//找一下目标索引现在对应的真实DOM元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (childDOMNode) {//如果此位置 上已经 有DOM元素的，插入到它前面是")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.insertBefore(newDOM, childDOMNode);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.appendChild(newDOM);//添加到最后就可以了")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type === MOVE) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let oldDOM = findDOM(oldVChild);//找到老的真实DOM 还可以把内存中的B取到，插入到指定的位置 B")]),l(`
`),n("span",{class:"line"},[n("span",null,"      let childDOMNode = childNodes[toIndex];//找一下目标索引现在对应的真实DOM元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"      if (childDOMNode) {//如果此位置 上已经 有DOM元素的，插入到它前面是")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.insertBefore(oldDOM, childDOMNode);")]),l(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        parentDOM.appendChild(oldDOM);//添加到最后就可以了")]),l(`
`),n("span",{class:"line"},[n("span",null,"      }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"  });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  /*  let maxChildrenLength = Math.max(oldVChildren.length, newVChildren.length);")]),l(`
`),n("span",{class:"line"},[n("span",null,"   //oldChildren=3 newChildren=2   oldChildren=2 newChildren=3")]),l(`
`),n("span",{class:"line"},[n("span",null,"   for (let i = 0; i < maxChildrenLength; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"       //试图取出当前的节点的下一个，最近的弟弟真实DOM节点")]),l(`
`),n("span",{class:"line"},[n("span",null,"       let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));")]),l(`
`),n("span",{class:"line"},[n("span",null,"       compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], findDOM(nextVdom));")]),l(`
`),n("span",{class:"line"},[n("span",null,"   } */")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const O=a(i,[["render",d]]);export{C as __pageData,O as default};
