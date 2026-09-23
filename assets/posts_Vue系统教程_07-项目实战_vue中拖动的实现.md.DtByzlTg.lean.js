import{_ as s,o as l,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse(`{"title":"vue中拖动的实现","description":"将拖动事件全部代理到这些拖动元素的公共父元素之上，即事件代理； 在事件处理函数中，我们一般要把被真实拖动的元素记录下来，记下一些坐标值等，配置拖拽属性： evt.dataTransfer.effectAllowed 'move' 然后在回调中再添加上其它拖拽事件： eventDe。","frontmatter":{"title":"vue中拖动的实现","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"将拖动事件全部代理到这些拖动元素的公共父元素之上，即事件代理； 在事件处理函数中，我们一般要把被真实拖动的元素记录下来，记下一些坐标值等，配置拖拽属性： evt.dataTransfer.effectAllowed 'move' 然后在回调中再添加上其它拖拽事件： eventDe。","sidebarWeight":50,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实战/vue中拖动的实现.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/vue中拖动的实现.md","filePath":"posts/Vue系统教程/07-项目实战/vue中拖动的实现.md"}`),p={name:"posts/Vue系统教程/07-项目实战/vue中拖动的实现.md"};function i(o,a,r,d,c,u){return l(),t("div",null,[...a[0]||(a[0]=[e("div",null,[e("h1",{id:"vue中拖动的实现",tabindex:"-1"},[n("vue中拖动的实现 "),e("a",{class:"header-anchor",href:"#vue中拖动的实现","aria-label":'Permalink to "vue中拖动的实现"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“vue中拖动的实现”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"给dom中需要拖动的元素加上属性，也可以带上数据")]),n(`
`),e("span",{class:"line"},[e("span",null,"el.draggable = true")])])])]),e("p",null,"将拖动事件全部代理到这些拖动元素的公共父元素之上，即事件代理；"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"先给公共父元素加上最基本的dragstart事件：")]),n(`
`),e("span",{class:"line"},[e("span",null,"eventDelegationEl.addEventListener(")]),n(`
`),e("span",{class:"line"},[e("span",null,"  'dragstart',")]),n(`
`),e("span",{class:"line"},[e("span",null,"  function (evt) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dragEl = evt.target")]),n(`
`),e("span",{class:"line"},[e("span",null,"    startX = evt.clientX")]),n(`
`),e("span",{class:"line"},[e("span",null,"    startY = evt.clientY")]),n(`
`),e("span",{class:"line"},[e("span",null,"    evt.dataTransfer.effectAllowed = 'move'")]),n(`
`),e("span",{class:"line"},[e("span",null,"    //   evt.dataTransfer.setData('Text', dragEl.textContent)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    eventDelegationEl.addEventListener('dragover', _onDragOver, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    eventDelegationEl.addEventListener('dragend', _onDragEnd, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    eventDelegationEl.addEventListener('dragleave', _onDragLeave, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"    setTimeout(function () {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      dragEl.classList.add('ghost')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }, 0)")]),n(`
`),e("span",{class:"line"},[e("span",null,"  },")]),n(`
`),e("span",{class:"line"},[e("span",null,"  false")]),n(`
`),e("span",{class:"line"},[e("span",null,")")])])])]),e("p",null,"在事件处理函数中，我们一般要把被真实拖动的元素记录下来，记下一些坐标值等，配置拖拽属性： evt.dataTransfer.effectAllowed = 'move'"),e("p",null,"然后在回调中再添加上其它拖拽事件： eventDelegationEl.addEventListener('dragover', _onDragOver, false) eventDelegationEl.addEventListener('dragend', _onDragEnd, false) eventDelegationEl.addEventListener('dragleave', _onDragLeave, false) 这里基本上有拖动目标元素的所有事件了；"),e("p",null,"dragover 接下来，便是在dragover或dragenter中进行处理，一般拖拽中，我们会在目标元素上添加一些样式，表示拖拽元素将会放置的位置；一般要判断拖拽方向，然后在目标元素或上或下，或左或右添加放置的样式；"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"drageleave这个事件中，一般是清除掉我们dragover添加的样式；")]),n(`
`),e("span",{class:"line"},[e("span",null,"function _onDragLeave() {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (dropTarget) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-top')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-right')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-bottom')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-left')")]),n(`
`),e("span",{class:"line"},[e("span",null,"  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("p",null,"dragend事件中，我们一般对数据进行修改，然后让数据影响视图； 同时，我们还要清除样式，清除我们添加的事件监听；主要是:"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"dragover")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"dragend")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"drageleave")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"function _onDragEnd(evt) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  evt.preventDefault()")]),n(`
`),e("span",{class:"line"},[e("span",null,"  dragEl.classList.remove('ghost')")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (dropTarget) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-top')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-right')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-bottom')")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dropTarget.classList.remove('drop-to-left')")]),n(`
`),e("span",{class:"line"},[e("span",null,"  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"  eventDelegationEl.removeEventListener('dragover', _onDragOver, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"  eventDelegationEl.removeEventListener('dragend', _onDragEnd, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"  eventDelegationEl.removeEventListener('dragleave', _onDragLeave, false)")]),n(`
`),e("span",{class:"line"},[e("span",null,"  if (dragEnd) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    const from = dragEl.dataset.type")]),n(`
`),e("span",{class:"line"},[e("span",null,"    const oldIndex = dragEl.dataset.index")]),n(`
`),e("span",{class:"line"},[e("span",null,"    dragEnd({")]),n(`
`),e("span",{class:"line"},[e("span",null,"      oldIndex,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      newIndex,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      from,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      to,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      direction")]),n(`
`),e("span",{class:"line"},[e("span",null,"    })")]),n(`
`),e("span",{class:"line"},[e("span",null,"  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const h=s(p,[["render",i]]);export{g as __pageData,h as default};
