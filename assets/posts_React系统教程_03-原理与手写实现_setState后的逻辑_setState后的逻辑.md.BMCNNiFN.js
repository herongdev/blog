import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"setState后的逻辑","description":"再调用emitUpdate，主要是判断这次的更新是批量更新还是直接更新； 最终要调用直接更新，这时是调用updateQueue.batchUpdate方法，它会遍历数组，然后将数组中的每个update取出，调用它的updateComponent方法； updateComponen。","frontmatter":{"title":"setState后的逻辑","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"再调用emitUpdate，主要是判断这次的更新是批量更新还是直接更新； 最终要调用直接更新，这时是调用updateQueue.batchUpdate方法，它会遍历数组，然后将数组中的每个update取出，调用它的updateComponent方法； updateComponen。","sidebarWeight":54,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/setState后的逻辑/setState后的逻辑.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/setState后的逻辑/setState后的逻辑.md","filePath":"posts/React系统教程/03-原理与手写实现/setState后的逻辑/setState后的逻辑.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/setState后的逻辑/setState后的逻辑.md"};function i(o,l,d,c,u,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"setstate后的逻辑",tabindex:"-1"},[s("setState后的逻辑 "),n("a",{class:"header-anchor",href:"#setstate后的逻辑","aria-label":'Permalink to "setState后的逻辑"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“setState后的逻辑”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在调用setState后；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"会先调用updater.addState方法，将state放入数组；")])])])]),n("p",null,"再调用emitUpdate，主要是判断这次的更新是批量更新还是直接更新；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果是批量更新，就直接把updater放入数组中存储；")])])])]),n("p",null,"最终要调用直接更新，这时是调用updateQueue.batchUpdate方法，它会遍历数组，然后将数组中的每个update取出，调用它的updateComponent方法；"),n("p",null,"updateComponent方法先判断是不是有要更新的props或state，如果有，就调用shouldUpdate方法，其中第一个参数是组件实例，第二个参数是props，第三个参数是合并后的State值；即this.getState()方法的返回值；"),n("ol",{start:"6"},[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," 在shouldUpdate方法中，有较多的逻辑：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"先判断和调用shouldUpdate钩子；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"再调用willUpdate钩子；")])])])]),n("p",null,"再更新状态，即props和state，不管组件要不要更新，这两个值还是要改变的；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"最后，如果要更新，调用真正的更新方法，forceUpdate方法；")])])])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function shouldUpdate(classInstance, nextProps, nextState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let willUpdate = true;//表示组件是否要更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //如果有shouldComponentUpdate方法并且shouldComponentUpdate方法返回了false")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    willUpdate = false;//表示不需要更校招")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //如果要更新，并且有componentWillUpdate方法，就执行它")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (willUpdate && classInstance.componentWillUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.componentWillUpdate();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //不管要不要更新组件，状态都要更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (nextProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.props = nextProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  classInstance.state = nextState;//先把新状态赋值给实例的state")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (willUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    classInstance.forceUpdate();//强制更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("ol",{start:"8"},[n("li",null,[n("p",null,"再看forceUpdate方法，这个方法涉及到了三个生命周期，其中两个是新增的生命周期；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"context")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"getDerivedStateFromProps")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"getSnapshotBeforeUpdate，它的返回值将传给didUpdate的第三个参数")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"didUpdate生命周期")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"domDiff")])])])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"forceUpdate() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let oldRenderVdom = this.oldRenderVdom;//上一次类组件render方法计算得到的虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //let oldDOM = oldRenderVdom.dom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let oldDOM = findDOM(oldRenderVdom);//获取 oldRenderVdom对应的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this.constructor.contextType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.context = this.constructor.contextType._currentValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this.constructor.getDerivedStateFromProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (newState)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.state = newState;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();//TODO")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //然后基于新的属性和状态，计算新的虚拟DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let newRenderVdom = this.render();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.oldRenderVdom = newRenderVdom;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this.componentDidUpdate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.componentDidUpdate(this.props, this.state, snapshot);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"compareTwoVdom方法详解，这是react进行domdiff的地方；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * dom-diff核心是比较新旧虚拟DOM的差异，然后把差异同步到真实DOM节点上")]),s(`
`),n("span",{class:"line"},[n("span",null," * 1 老新都没有")]),s(`
`),n("span",{class:"line"},[n("span",null," * 2 老有新没有")]),s(`
`),n("span",{class:"line"},[n("span",null," * 3.老没有新有")]),s(`
`),n("span",{class:"line"},[n("span",null," * 4.老新都有")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentDOM")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //老新都没有,什么都不需要做")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!oldVdom && !newVdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的没有 卸载老节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom && !newVdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    unMountVdom(oldVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的没有，新有的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (!oldVdom && newVdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (nextDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.insertBefore(newDOM, nextDOM)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.appendChild(newDOM);//添加到父节点上")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM._componentDidMount) newDOM._componentDidMount();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的也有，但是类型不同")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    unMountVdom(oldVdom);//删除老的节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (nextDOM) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.insertBefore(newDOM, nextDOM)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentDOM.appendChild(newDOM);//添加到父节点上")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (newDOM._componentDidMount) newDOM._componentDidMount();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //如果老的有，新的也有，并且类型也一样，只需要更新就可以，就可以复用老的节点了")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {//进入 深度对比子节点的流程")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateElement(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"updateElement方法：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 深度更新节点")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {} oldVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newVdom")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function updateElement(oldVdom, newVdom) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //Provider更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (oldVdom.type.$$typeof === REACT_MEMO) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateMemo(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //Consumer的更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type.$$typeof === REACT_PROVIDER) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateProvider(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //Consumer的更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type.$$typeof === REACT_CONTEXT) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateContext(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type === REACT_TEXT) {    //如果新老节点都是纯文本节点的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVdom.props.content !== newVdom.props.content) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      currentDOM.textContent = newVdom.props.content;//更新文本节点的内容为新的文本内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (oldVdom.type === REACT_FRAGMENT) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //此节点是下原生组件 span div而且 类型一样，说明可以复用老的dom节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof oldVdom.type === 'string') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let currentDOM = newVdom.dom = findDOM(oldVdom);//获取老的真实DOM，准备复用")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateProps(currentDOM, oldVdom.props, newVdom.props);//直接用新的属性更新老的DOM节点即可")]),s(`
`),n("span",{class:"line"},[n("span",null,"    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (typeof oldVdom.type === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (oldVdom.type.isReactComponent) {//类组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"      updateClassComponent(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {//函数组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"      updateFunctionComponent(oldVdom, newVdom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"updateProps:")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * 把新的属性更新到真实DOM上")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} dom 真实DOM")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} oldProps 旧的属性对象")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} newProps 新的属性对象")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function updateProps(dom, oldProps, newProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (key === 'children') {//children")]),s(`
`),n("span",{class:"line"},[n("span",null,"      continue;//此处忽略子节点的处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (key === 'style') {//style")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let styleObj = newProps[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (let attr in styleObj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        dom.style[attr] = styleObj[attr];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (key.startsWith('on')) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      //dom[key.toLocaleLowerCase()] = newProps[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dom[key] = newProps[key];//className")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(t,[["render",i]]);export{m as __pageData,g as default};
