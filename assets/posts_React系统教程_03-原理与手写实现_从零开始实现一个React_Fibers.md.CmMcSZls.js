import{_ as e,o as a,c as i,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"Fibers","description":"在渲染中，我们将创建根纤维并将其设置为下一个tunitofwork。剩下的工作将在performUnitOfWork功能上完成，在那里我们将为每根纤维做三件事: 这种数据结构的目标之一是使查找下一个工作单元变得容易。这就是为什么每根纤维都与它的第一个子细胞、下一个兄弟细胞和亲本细。","frontmatter":{"title":"Fibers","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"在渲染中，我们将创建根纤维并将其设置为下一个tunitofwork。剩下的工作将在performUnitOfWork功能上完成，在那里我们将为每根纤维做三件事: 这种数据结构的目标之一是使查找下一个工作单元变得容易。这就是为什么每根纤维都与它的第一个子细胞、下一个兄弟细胞和亲本细。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/从零开始实现一个React/Fibers.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/Fibers.md","filePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/Fibers.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/Fibers.md"};function t(c,s,o,u,r,d){return a(),i("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"fibers",tabindex:"-1"},[l("Fibers "),n("a",{class:"header-anchor",href:"#fibers","aria-label":'Permalink to "Fibers"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Fibers”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"为了组织工作单元，我们需要一个数据结：一个Fiber树。")]),l(`
`),n("span",{class:"line"},[n("span",null,"We’ll have one fiber for each element and each fiber will be a unit of work.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"让我举个例子。")]),l(`
`),n("span",{class:"line"},[n("span",null,"假设我们想渲染一个这样的元素树：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==Didact====.====render====(==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<div>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<h1>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<p />==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<a />==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==</h1>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<h2 />==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==</div>,==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==container==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==)==")])])])]),n("p",null,"在渲染中，我们将创建根纤维并将其设置为下一个tunitofwork。剩下的工作将在performUnitOfWork功能上完成，在那里我们将为每根纤维做三件事:"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==add the element to the DOM==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==create the fibers for the element’s children==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==select the next unit of work==")])])])]),n("p",null,"这种数据结构的目标之一是使查找下一个工作单元变得容易。这就是为什么每根纤维都与它的第一个子细胞、下一个兄弟细胞和亲本细胞相连。"),n("p",null,"当我们完成对一根纤维的工作时，如果它有一个孩子，那么纤维将是下一个工作单元。 在我们的示例中，当我们完成对div光纤的工作时，下一个工作单元将是h1光纤。"),n("p",null,"当我们完成对一根纤维的工作时，如果它有一个孩子，那么纤维将是下一个工作单元。 在我们的示例中，当我们完成对div光纤的工作时，下一个工作单元将是h1光纤。"),n("p",null,"如果纤维既没有孩子也没有兄弟姐妹，我们就去找“叔叔”:父母的兄弟姐妹。比如例子中的a和h2纤维。 同样，如果父结点没有兄弟结点，我们会一直向上，直到找到有兄弟结点的父结点，或者直到找到根结点。如果我们到达了根节点，这意味着我们已经完成了渲染的所有工作。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createDom(fiber) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const dom =")]),l(`
`),n("span",{class:"line"},[n("span",null,'        fiber.type == "TEXT_ELEMENT"')]),l(`
`),n("span",{class:"line"},[n("span",null,'            ? document.createTextNode("")')]),l(`
`),n("span",{class:"line"},[n("span",null,"            : document.createElement(fiber.type)")]),l(`
`),n("span",{class:"line"},[n("span",null,'    const isProperty = key => key !== "children"')]),l(`
`),n("span",{class:"line"},[n("span",null,"    Object.keys(fiber.props)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .filter(isProperty)")]),l(`
`),n("span",{class:"line"},[n("span",null,"        .forEach(name => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            dom[name] = fiber.props[name]")]),l(`
`),n("span",{class:"line"},[n("span",null,"        })")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return dom")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"In the ==render== function we set ==nextUnitOfWork== to the root of the fiber tree.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function render(element, container) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    nextUnitOfWork = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        dom: container,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props: {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            children: [element],")]),l(`
`),n("span",{class:"line"},[n("span",null,"        },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let nextUnitOfWork = null")]),l(`
`),n("span",{class:"line"},[n("span",null,"function workLoop(deadline) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let shouldYield = false")]),l(`
`),n("span",{class:"line"},[n("span",null,"    while (nextUnitOfWork && !shouldYield) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        nextUnitOfWork = performUnitOfWork(")]),l(`
`),n("span",{class:"line"},[n("span",null,"            nextUnitOfWork")]),l(`
`),n("span",{class:"line"},[n("span",null,"        )")]),l(`
`),n("span",{class:"line"},[n("span",null,"        shouldYield = deadline.timeRemaining() < 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    requestIdleCallback(workLoop)")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"requestIdleCallback(workLoop)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function performUnitOfWork(fiber) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (!fiber.dom) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        fiber.dom = createDom(fiber)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (fiber.parent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        fiber.parent.dom.appendChild(fiber.dom)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const elements = fiber.props.children")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let index = 0")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let prevSibling = null")]),l(`
`),n("span",{class:"line"},[n("span",null,"    while (index < elements.length) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        const element = elements[index]")]),l(`
`),n("span",{class:"line"},[n("span",null,"        const newFiber = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            type: element.type,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            props: element.props,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            parent: fiber,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            dom: null,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (index === 0) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            fiber.child = newFiber")]),l(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            prevSibling.sibling = newFiber")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        prevSibling = newFiber")]),l(`
`),n("span",{class:"line"},[n("span",null,"        index++")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (fiber.child) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return fiber.child")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let nextFiber = fiber")]),l(`
`),n("span",{class:"line"},[n("span",null,"    while (nextFiber) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (nextFiber.sibling) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            return nextFiber.sibling")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        nextFiber = nextFiber.parent")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"每次处理一个元素时，我们都会向DOM添加一个新节点。而且，请记住，浏览器可能会在我们完成渲染整个树之前中断我们的工作。在这种情况下，用户将看到一个不完整的UI。我们不想这样。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function commitRoot() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    commitWork(wipRoot.child)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    wipRoot = null")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function commitWork(fiber) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (!fiber) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const domParent = fiber.parent.dom")]),l(`
`),n("span",{class:"line"},[n("span",null,"    domParent.appendChild(fiber.dom)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    commitWork(fiber.child)")]),l(`
`),n("span",{class:"line"},[n("span",null,"    commitWork(fiber.sibling)")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=e(p,[["render",t]]);export{b as __pageData,g as default};
