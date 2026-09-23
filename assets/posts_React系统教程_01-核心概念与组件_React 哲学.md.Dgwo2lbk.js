import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"React 哲学","description":"我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。 它在 Facebook 和 Instagram 上表现优秀。 在这篇文档中，我们将会通过 React 构建一个可搜索的产品数据表格来更深刻地领会 React 哲学。 从设计稿开始。","frontmatter":{"title":"React 哲学","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。 它在 Facebook 和 Instagram 上表现优秀。 在这篇文档中，我们将会通过 React 构建一个可搜索的产品数据表格来更深刻地领会 React 哲学。 从设计稿开始。","sidebarWeight":28,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/React 哲学.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/React 哲学.md","filePath":"posts/React系统教程/01-核心概念与组件/React 哲学.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/React 哲学.md"};function i(c,l,o,r,u,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"react-哲学",tabindex:"-1"},[s("React 哲学 "),n("a",{class:"header-anchor",href:"#react-哲学","aria-label":'Permalink to "React 哲学"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“React 哲学”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。 它在 Facebook 和 Instagram 上表现优秀。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 最棒的部分之一是引导我们思考如何构建一个应用。")])])])]),n("p",null,"在这篇文档中，我们将会通过 React 构建一个可搜索的产品数据表格来更深刻地领会 React 哲学。"),n("p",null,[n("strong",null,"从设计稿开始"),s(" 假设我们已经有了一个返回 JSON 的 API，以及设计师提供的组件设计稿。如下所示：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"该 JSON API 会返回以下数据：")]),s(`
`),n("span",{class:"line"},[n("span",null,'[  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}];')])])])]),n("p",null,[n("strong",null,"第一步：将设计好的"),s(),n("strong",null,"UI"),s(),n("strong",null,"划分为组件层级"),s(" 首先，你需要在设计稿上用方框圈出每一个组件（包括它们的子组件），并且以合适的名称命名。如果你是和设计师一起完成此任务，那么他们可能已经做过类似的工作，所以请和他们进行交流！他们的 Photoshop 的图层名称可能最终就是你编写的 React 组件的名称！")]),n("p",null,[s("但你如何确定应该将哪些部分划分到一个组件中呢？你可以将组件当作一种函数或者是对象来考虑，根据"),n("a",{href:"https://en.wikipedia.org/wiki/Single_responsibility_principle",target:"_blank",rel:"noreferrer"},"单一功能原则"),s("来判定组件的范围。也就是说，一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。")]),n("p",null,"在实践中，因为你经常是在向用户展示 JSON 数据模型，所以如果你的模型设计得恰当，UI（或者说组件结构）便会与数据模型一一对应，这是因为 UI 和数据模型都会倾向于遵守相同的_信息结构_。将 UI 分离为组件，其中每个组件需与数据模型的某部分匹配。"),n("p",null,"你会看到我们的应用中包含五个组件。我们已经将每个组件展示的数据标注为了斜体。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**FilterableProductTable (****橙色****):** 是整个示例应用的整体")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**SearchBar (****蓝色****):** 接受所有的_用户输入_")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**ProductTable (****绿色****):** 展示_数据内容_并根据_用户输入_筛选结果")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**ProductCategoryRow (****天蓝色****):** 为每一个_产品类别_展示标题")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**ProductRow (****红色****):** 每一行展示一个_产品_")])])])]),n("p",null,"你可能注意到，ProductTable 的表头（包含 “Name” 和 “Price” 的那一部分）并未单独成为一个组件。这仅仅是一种偏好选择，如何处理这一问题也一直存在争论。就这个示例而言，因为表头只起到了渲染_数据集合_的作用——这与 ProductTable 是一致的，所以我们仍然将其保留为 ProductTable 的一部分。但是，如果表头过于复杂（例如，我们需为其添加排序功能），那么将它作为一个独立的 ProductTableHeader 组件就显得很有必要了。 现在我们已经确定了设计稿中应该包含的组件，接下来我们将把它们描述为更加清晰的层级。设计稿中被其他组件包含的子组件，在层级上应该作为其子节点。"),n("ul",null,[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  FilterableProductTable")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"SearchBar")])])])]),n("ul",null,[n("li",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  ProductTable")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ProductCategoryRow")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ProductRow")])])])])])])])]),n("p",null,[n("strong",null,"第二步：用"),s(),n("strong",null,"React"),s(),n("strong",null,"创建一个静态版本"),s(" 参阅 "),n("a",{href:"https://codepen.io",target:"_blank",rel:"noreferrer"},"CodePen"),s(" 上的 "),n("a",{href:"https://codepen.io/gaearon/pen/BwWzwm",target:"_blank",rel:"noreferrer"},"React"),s(" 哲学：第二步。 现在我们已经确定了组件层级，可以编写对应的应用了。最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的 UI。最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。我们会在接下来的代码中体会到其中的区别。")]),n("p",null,[s("在构建应用的静态版本时，我们需要创建一些会重用其他组件的组件，然后通过 "),n("em",null,"props"),s(" 传入所需的数据。"),n("em",null,"props"),s(" 是父组件向子组件传递数据的方式。即使你已经熟悉了 "),n("em",null,"state"),s(" 的概念，也"),n("strong",null,"完全不应该使用"),s(),n("strong",null,"state"),s(" 构建静态版本。state 代表了随时间会产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。")]),n("p",null,"你可以自上而下或者自下而上构建应用： 自上而下意味着首先编写层级较高的组件（比如 FilterableProductTable），自下而上意味着从最基本的组件开始编写（比如 ProductRow）。当你的应用比较简单时，使用自上而下的方式更方便；对于较为大型的项目来说，自下而上地构建，并同时为低层组件编写测试是更加简单的方式。"),n("p",null,[s("到此为止，你应该已经有了一个可重用的组件库来渲染你的数据模型。由于我们构建的是静态版本，所以这些组件目前只需提供 render() 方法用于渲染。最顶层的组件 FilterableProductTable 通过 props 接受你的数据模型。如果你的数据模型发生了改变，再次调用 ReactDOM.render()，UI 就会相应地被更新。数据模型变化、调用 render() 方法、UI 相应变化，这个过程并不复杂，因此很容易看清楚 UI 是如何被更新的，以及是在哪里被更新的。React "),n("strong",null,"单向数据流"),s("（也叫_单向绑定_）的思想使得组件模块化，易于快速开发。 如果你在完成这一步骤时遇到了困难，可以参阅 "),n("a",{href:"https://react.docschina.org/docs/",target:"_blank",rel:"noreferrer"},"React"),s(" 文档。 "),n("strong",null,"补充说明"),s("**😗* "),n("strong",null,"有关"),s(),n("strong",null,"props"),s(),n("strong",null,"和"),s(),n("strong",null,"state"),s(" 在 React 中，有两类“模型”数据：props 和 state。清楚地理解两者的区别是十分重要的；如果你不太有把握，可以参阅 "),n("a",{href:"https://react.docschina.org/docs/state-and-lifecycle.html",target:"_blank",rel:"noreferrer"},"React"),s(" 官方文档。你也可以查看 "),n("a",{href:"https://react.docschina.org/docs/faq-state.html#what-is-the-difference-between-state-and-props",target:"_blank",rel:"noreferrer"},"FAQ: state"),s(" 与 props 的区别是什么？")]),n("p",null,[s("**第三步：**"),n("strong",null,"确定"),s(),n("strong",null,"UI state"),s(),n("strong",null,"的最小（且完整）表示"),s(" 想要使你的 UI 具备交互功能，需要有触发基础数据模型改变的能力。React 通过实现 "),n("strong",null,"state"),s(" 来完成这个任务。 为了正确地构建应用，你首先需要找出应用所需的 state 的最小表示，并根据需要计算出其他所有数据。其中的关键正是 "),n("a",{href:"https://en.wikipedia.org/wiki/Don%27t_repeat_yourself",target:"_blank",rel:"noreferrer"},"DRY:"),s(),n("em",null,"Don"),s("_’_"),n("em",null,"t Repeat Yourself"),s("。只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生。比如，你要编写一个任务清单应用，你只需要保存一个包含所有事项的数组，而无需额外保存一个单独的 state 变量（用于存储任务个数）。当你需要展示任务个数时，只需要利用该数组的 length 属性即可。 我们的示例应用拥有如下数据：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"包含所有产品的原始列表")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"用户输入的搜索词")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"复选框是否选中的值")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"经过搜索筛选的产品列表")])])])]),n("p",null,"通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state："),n("p",null,"该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。"),n("p",null,"该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。"),n("p",null,"你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。"),n("p",null,"包含所有产品的原始列表是经由 props 传入的，所以它不是 state； 搜索词和复选框的值应该是 state，因为它们随时间会发生改变且无法由其他数据计算而来； 经过搜索筛选的产品列表不是 state，因为它的结果可以由产品的原始列表根据搜索词和复选框的选择计算出来。 综上所述，属于 state 的有："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"用户输入的搜索词")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"复选框是否选中的值")])])])]),n("p",null,[n("strong",null,"第四步：确定"),s(),n("strong",null,"state"),s(),n("strong",null,"放置的位置"),s(" 参阅 "),n("a",{href:"https://codepen.io",target:"_blank",rel:"noreferrer"},"CodePen"),s(" 上的 "),n("a",{href:"https://codepen.io/gaearon/pen/qPrNQZ",target:"_blank",rel:"noreferrer"},"React"),s(" 哲学：第四步。 我们已经确定了应用所需的 state 的最小集合。接下来，我们需要确定哪个组件能够改变这些 state，或者说_拥有_这些 state。 注意：React 中的数据流是单向的，并顺着组件层级从上往下传递。哪个组件应该拥有某个 state 这件事，"),n("strong",null,"对初学者来说往往是最难理解的部分"),s("。尽管这可能在一开始不是那么清晰，但你可以尝试通过以下步骤来判断：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"对于应用中的每一个 state：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"找到根据这个 state 进行渲染的所有组件。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"该共同所有者组件或者比它层级更高的组件应该拥有该 state。")])])])]),n("p",null,"如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"根据以上策略重新考虑我们的示例应用：")])])])]),n("p",null,"ProductTable 需要根据 state 筛选产品列表。SearchBar 需要展示搜索词和复选框的状态。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"他们的共同所有者是 FilterableProductTable。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"因此，搜索词和复选框的值应该很自然地存放在 FilterableProductTable 组件中。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"很好，我们已经决定把这些 state 存放在 FilterableProductTable 组件中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先，将实例属性 this.state = {filterText: '', inStockOnly: false} 添加到 FilterableProductTable 的 constructor 中，设置应用的初始 state；")]),s(`
`),n("span",{class:"line"},[n("span",null,"接着，将 filterText 和 inStockOnly 作为 props 传入 ProductTable 和 SearchBar；")]),s(`
`),n("span",{class:"line"},[n("span",null,"最后，用这些 props 筛选 ProductTable 中的产品信息，并设置 SearchBar 的表单值。")]),s(`
`),n("span",{class:"line"},[n("span",null,'你现在可以看到应用的变化了：将 filterText 设置为 "ball" 并刷新应用，你能发现表格中的数据已经更新了。')])])])]),n("p",null,[n("strong",null,"第五步：添加反向数据流"),s(" 参阅 "),n("a",{href:"https://codepen.io",target:"_blank",rel:"noreferrer"},"CodePen"),s(" 上的 "),n("a",{href:"https://codepen.io/gaearon/pen/LzWZvb",target:"_blank",rel:"noreferrer"},"React"),s(" 哲学：第五步。 到目前为止，我们已经借助自上而下传递的 props 和 state 渲染了一个应用。现在，我们将尝试让数据反向传递：处于较低层级的表单组件更新较高层级的 FilterableProductTable 中的 state。 React 通过一种比传统的双向绑定略微繁琐的方法来实现反向数据传递。尽管如此，但这种需要显式声明的方法更有助于人们理解程序的运作方式。")]),n("p",null,"如果你在这时尝试在搜索框输入或勾选复选框，React 不会产生任何响应。这是正常的，因为我们之前已经将 input 的值设置为了从 FilterableProductTable 的 state 传递而来的固定值。"),n("p",null,"让我们重新梳理一下需要实现的功能：每当用户改变表单的值，我们需要改变 state 来反映用户的当前输入。由于 state 只能由拥有它们的组件进行更改，FilterableProductTable 必须将一个能够触发 state 改变的回调函数（callback）传递给 SearchBar。我们可以使用输入框的 onChange 事件来监视用户输入的变化，并通知 FilterableProductTable 传递给 SearchBar 的回调函数。然后该回调函数将调用 setState()，从而更新应用。"),n("p",null,[n("strong",null,"这就是全部了"),s(" 希望这篇文档能够帮助你建立起构建 React 组件和应用的一般概念。尽管你可能需要编写更多的代码，但是别忘了：比起写，代码更多地是给人看的。我们一起构建的这个模块化示例应用的代码就很易于阅读。当你开始构建更大的组件库时，你会意识到这种代码模块化和清晰度的重要性。并且随着代码重用程度的加深，你的代码行数也会显著地减少。😃 > 来自")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/thinking-in-react.html>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class ProductCategoryRow extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const category = this.props.category;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,'        <th colSpan="2">')]),s(`
`),n("span",{class:"line"},[n("span",null,"          {category}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </th>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ProductRow extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const product = this.props.product;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const name = product.stocked ?")]),s(`
`),n("span",{class:"line"},[n("span",null,"      product.name :")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <span style={{ color: 'red' }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {product.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </span>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>{name}</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <td>{product.price}</td>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ProductTable extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const filterText = this.props.filterText;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const inStockOnly = this.props.inStockOnly;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const rows = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let lastCategory = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props.products.forEach((product) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (product.name.indexOf(filterText) === -1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (inStockOnly && !product.stocked) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (product.category !== lastCategory) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        rows.push(")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <ProductCategoryRow")]),s(`
`),n("span",{class:"line"},[n("span",null,"            category={product.category}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            key={product.category} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        );")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      rows.push(")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ProductRow")]),s(`
`),n("span",{class:"line"},[n("span",null,"          product={product}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          key={product.name}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      );")]),s(`
`),n("span",{class:"line"},[n("span",null,"      lastCategory = product.category;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <thead>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <th>Name</th>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <th>Price</th>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          </tr>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </thead>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <tbody>{rows}</tbody>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </table>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class SearchBar extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleInStockChange = this.handleInStockChange.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleFilterTextChange(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props.onFilterTextChange(e.target.value);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleInStockChange(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.props.onInStockChange(e.target.checked);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <form>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="text"')]),s(`
`),n("span",{class:"line"},[n("span",null,'          placeholder="Search..."')]),s(`
`),n("span",{class:"line"},[n("span",null,"          value={this.props.filterText}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onChange={this.handleFilterTextChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'            type="checkbox"')]),s(`
`),n("span",{class:"line"},[n("span",null,"            checked={this.props.inStockOnly}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            onChange={this.handleInStockChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          />")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {' '}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          Only show products in stock")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </form>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class FilterableProductTable extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      filterText: '',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      inStockOnly: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleInStockChange = this.handleInStockChange.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleFilterTextChange(filterText) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      filterText: filterText")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleInStockChange(inStockOnly) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      inStockOnly: inStockOnly")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <SearchBar")]),s(`
`),n("span",{class:"line"},[n("span",null,"          filterText={this.state.filterText}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          inStockOnly={this.state.inStockOnly}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onFilterTextChange={this.handleFilterTextChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onInStockChange={this.handleInStockChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ProductTable")]),s(`
`),n("span",{class:"line"},[n("span",null,"          products={this.props.products}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          filterText={this.state.filterText}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          inStockOnly={this.state.inStockOnly}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const PRODUCTS = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"];")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <FilterableProductTable products={PRODUCTS} />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('container')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<div id="container">')]),s(`
`),n("span",{class:"line"},[n("span",null,"    <!-- This element's contents will be replaced with your component. -->")]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"body {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  padding: 5px")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const b=a(p,[["render",i]]);export{g as __pageData,b as default};
