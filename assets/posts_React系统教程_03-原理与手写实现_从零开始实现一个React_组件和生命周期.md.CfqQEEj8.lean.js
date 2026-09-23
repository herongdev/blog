import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"组件和生命周期","description":"\\\\ 来自。","frontmatter":{"title":"组件和生命周期","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"\\\\ 来自。","sidebarWeight":17,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/从零开始实现一个React/组件和生命周期.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/组件和生命周期.md","filePath":"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/组件和生命周期.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/从零开始实现一个React/组件和生命周期.md"};function o(c,s,i,r,u,m){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"组件和生命周期",tabindex:"-1"},[e("组件和生命周期 "),n("a",{class:"header-anchor",href:"#组件和生命周期","aria-label":'Permalink to "组件和生命周期"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“组件和生命周期”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**前言**")]),e(`
`),n("span",{class:"line"},[n("span",null,"==在上一篇文章====JSX====和虚拟====DOM====中，我们实现了基础的====JSX====渲染功能，但是====React====的意义在于组件化。在这篇文章中，我们就要实现====React====的组件功能。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==组件==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==React====定义组件的方式可以分为两种：函数和类，函数定义可以看做是类定义的一种简单形式。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==createElement====的变化==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==回顾一下上一篇文章中我们对====React.createElement====的实现：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==function== ==createElement====(== ==tag====,== ==attrs====,== ==...====children== ==) {======    ==return== =={======        ==tag,======        ==attrs,======        ==children======    ==}========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==这种实现我们前面暂时只用来渲染原生====DOM====元素，而对于组件，====createElement====得到的参数略有不同：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==如果====JSX====片段中的某个元素是组件，那么====createElement====的第一个参数====tag====将会是一个方法，而不是字符串。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==区分组件和原生====DOM====的工作，是====babel-plugin-transform-react-jsx====帮我们做的==")]),e(`
`),n("span",{class:"line"},[n("span",null,'==例如在处理====<Welcome name="Sara" />====时，====createElement====方法的第一个参数====tag====，实际上就是我们定义====Welcome====的方法：==')]),e(`
`),n("span",{class:"line"},[n("span",null,"==function== ==Welcome====(== ==props== ==) {======    ==return== ==<====h1====>Hello, {====props====.====name====}</====h1====>;========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==我们不需要对====createElement====做修改，只需要知道如果渲染的是组件，====tag====的值将是一个函数==")]),e(`
`),n("span",{class:"line"},[n("span",null,"**组件基类****React.Component**")]),e(`
`),n("span",{class:"line"},[n("span",null,"==通过类的方式定义组件，我们需要继承====React.Component====：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==class== ==Welcome== ==extends== ==React====.====Component== =={======    ==render====() {======        ==return== ==<====h1====>Hello, {====this====.====props====.====name====}</====h1====>;======    ==}========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==所以我们就需要先来实现====React.Component====这个类：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==Component==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==React.Component====包含了一些预先定义好的变量和方法，我们来一步一步地实现它：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==先定义一个====Component====类：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==class== ==Component== =={}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"**state & props**")]),e(`
`),n("span",{class:"line"},[n("span",null,"==通过继承====React.Component====定义的组件有自己的私有状态====state====，可以通过====this.state====获取到。同时也能通过====this.props====来获取传入的数据。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==所以在构造函数中，我们需要初始化====state====和====props==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==// React.Component========class== ==Component== =={======    ==constructor====(== ==props== ===== =={} ) {======        ==this====.====state== ===== =={};======        ==this====.====props== ===== ==props;======    ==}========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==setState==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==组件内部的====state====和渲染结果相关，当====state====改变时通常会触发渲染，为了让====React====知道我们改变了====state====，我们只能通过====setState====方法去修改数据。我们可以通过====Object.assign====来做一个简单的实现。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==在每次更新====state====后，我们需要调用====renderComponent====方法来重新渲染组件，====renderComponent====方法的实现后文会讲到。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==import== =={== ==renderComponent== ==}== ==from== =='../react-dom/render'========class== ==Component== =={======    ==constructor====(== ==props== ===== =={} ) {======        ==// ...======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==setState====(== ==stateChange== ==) {======        ==//== ==将修改合并到====state======        ==Object====.====assign====(== ==this====.====state====, stateChange );======        ==renderComponent====(== ==this== ==);======    ==}========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==你可能听说过====React====的====setState====是异步的，同时它有很多优化手段，这里我们暂时不去管它，在以后会有一篇文章专门来讲====setState====方法。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==render==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==上一篇文章中实现的====render====方法只支持渲染原生====DOM====元素，我们需要修改====ReactDOM.render====方法，让其支持渲染组件。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==修改之前我们先来回顾一下上一篇文章中我们对====ReactDOM.render====的实现：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==function== ==render====(== ==vnode====,== ==container== ==) {======    ==return== ==container====.====appendChild====(== ==_render====( vnode ) );========}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==function== ==_render====(== ==vnode== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==( vnode== ======= ==undefined== ==||== ==vnode== ======= ==null== ==||== ==typeof== ==vnode== ======= =='boolean'== ==) vnode== ===== ==''====;======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==typeof== ==vnode== ======= =='number'== ==) vnode== ===== ==String====( vnode );======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==typeof== ==vnode== ======= =='string'== ==) {======        ==let== ==textNode== ===== ==document====.====createTextNode====( vnode );======        ==return== ==textNode;======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==const== ==dom== ===== ==document====.====createElement====(== ==vnode====.====tag== ==);======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==vnode====.====attrs== ==) {======        ==Object====.====keys====(== ==vnode====.====attrs== ==).====forEach====(== ==key== ===>== =={======            ==const== ==value== ===== ==vnode====.====attrs====[ key ];======            ==setAttribute====( dom, key, value );======        ==} );======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==vnode====.====children====.====forEach====(== ==child== ===>== ==render====( child, dom ) );==    ==//== ==递归渲染子节点======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==return== ==dom;== ======}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==我们需要在其中加一段用来渲染组件的代码：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==function== ==_render====(== ==vnode== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==// ...======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==typeof== ==vnode====.====tag== ======= =='function'== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==const== ==component== ===== ==createComponent====(== ==vnode====.====tag====,== ==vnode====.====attrs== ==);======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==setComponentProps====( component,== ==vnode====.====attrs== ==);======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==return== ==component====.====base====;======    ==}======    ====    ==// ...========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==组件渲染和生命周期==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==在上面的方法中用到了====createComponent====和====setComponentProps====两个方法，组件的生命周期方法也会在这里面实现。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==生命周期方法是一些在特殊时机执行的函数，例如====componentDidMount====方法会在组件挂载后执行==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==createComponent====方法用来创建组件实例，并且将函数定义组件扩展为类定义组件进行处理，以免其他地方需要区分不同定义方式。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==//== ==创建组件========function== ==createComponent====(== ==component====,== ==props== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==let== ==inst;======    ==//== ==如果是类定义组件，则直接返回实例======    ==if== ==(== ==component====.====prototype== ==&&== ==component====.====prototype====.====render== ==) {======        ==inst== ===== ==new== ==component====( props );======    ==//== ==如果是函数定义组件，则将其扩展为类定义组件======    ==}== ==else== =={======        ==inst== ===== ==new== ==Component====( props );======        ==inst====.====constructor== ===== ==component;======        ==inst====.====render== ===== ==function====() {======            ==return== ==this====.====constructor====( props );======        ==}======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==return== ==inst;========}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==setComponentProps====方法用来更新====props====，在其中可以实现====componentWillMount====，====componentWillReceiveProps====两个生命周期方法==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==// set props========function== ==setComponentProps====(== ==component====,== ==props== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==!====component====.====base== ==) {======        ==if== ==(== ==component====.====componentWillMount== ==)== ==component====.====componentWillMount====();======    ==}== ==else== ==if== ==(== ==component====.====componentWillReceiveProps== ==) {======        ==component====.====componentWillReceiveProps====( props );======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==component====.====props== ===== ==props;======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==renderComponent====( component );======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==renderComponent====方法用来渲染组件，====setState====方法中会直接调用这个方法进行重新渲染，在这个方法里可以实现====componentWillUpdate====，====componentDidUpdate====，====componentDidMount====几个生命周期方法。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==export== ==function== ==renderComponent====(== ==component== ==) {======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==let== ==base;======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==const== ==renderer== ===== ==component====.====render====();======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==component====.====base== ==&&== ==component====.====componentWillUpdate== ==) {======        ==component====.====componentWillUpdate====();======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==base== ===== ==_render====( renderer );======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==component====.====base== ==) {======        ==if== ==(== ==component====.====componentDidUpdate== ==)== ==component====.====componentDidUpdate====();======    ==}== ==else== ==if== ==(== ==component====.====componentDidMount== ==) {======        ==component====.====componentDidMount====();======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(== ==component====.====base== ==&&== ==component====.====base====.====parentNode== ==) {======        ==component====.====base====.====parentNode====.====replaceChild====( base,== ==component====.====base== ==);======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==component====.====base== ===== ==base;======    ==base====.====_component== ===== ==component;======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==渲染组件==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==现在大部分工作已经完成，我们可以用它来渲染组件了。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==渲染函数定义组件==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==渲染前文提到的====Welcome====组件：==")]),e(`
`),n("span",{class:"line"},[n("span",null,`==const== ==element== ===== ==<====Welcome== ==name========="Sara"== ==/>;========ReactDOM====.====render====(======    ==element====,======    ==document====.====getElementById====(== =='root'== ==)========);==`)]),e(`
`),n("span",{class:"line"},[n("span",null,"==在浏览器中可以看到结果：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==试试更复杂的例子，将多个组件组合起来：==")]),e(`
`),n("span",{class:"line"},[n("span",null,`==function== ==App====() {======    ==return== ==(======        ==<====div====>======            ==<====Welcome== ==name========="Sara"== ==/>======            ==<====Welcome== ==name========="Cahal"== ==/>======            ==<====Welcome== ==name========="Edite"== ==/>======        ==</====div====>======    ==);========}========ReactDOM====.====render====(======    ==<====App== ==/>,======    ==document====.====getElementById====(== =='root'== ==)========);==`)]),e(`
`),n("span",{class:"line"},[n("span",null,"==在浏览器中可以看到结果：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==渲染类定义组件==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==我们来试一试将刚才函数定义组件改成类定义：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==class== ==Welcome== ==extends== ==React====.====Component== =={======    ==render====() {======        ==return== ==<====h1====>Hello, {====this====.====props====.====name====}</====h1====>;======    ==}========}======")]),e(`
`),n("span",{class:"line"},[n("span",null,`==class== ==App== ==extends== ==React====.====Component== =={======    ==render====() {======        ==return== ==(======            ==<====div====>======                ==<====Welcome== ==name========="Sara"== ==/>======                ==<====Welcome== ==name========="Cahal"== ==/>======                ==<====Welcome== ==name========="Edite"== ==/>======            ==</====div====>======        ==);======    ==}========}========ReactDOM====.====render====(======    ==<====App== ==/>,======    ==document====.====getElementById====(== =='root'== ==)========);==`)]),e(`
`),n("span",{class:"line"},[n("span",null,"==运行起来结果和函数定义组件完全一致：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==再来尝试一个能体现出类定义组件区别的例子，实现一个计数器====Counter====，每点击一次就会加====1====。==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==并且组件中还增加了两个生命周期函数：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==class== ==Counter== ==extends== ==React====.====Component== =={======    ==constructor====(== ==props== ==) {======        ==super====(== ==props== ==);======        ==this====.====state== ===== =={======            ==num====:== ==0======        ==}======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==componentWillUpdate====() {======        ==console====.====log====(== =='update'== ==);======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==componentWillMount====() {======        ==console====.====log====(== =='mount'== ==);======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==onClick====() {======        ==this====.====setState====( {== ==num====:== ==this====.====state====.====num== ==+== ==1== ==} );======    ==}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==render====() {======        ==return== ==(======            ==<====div== ==onClick========={ ()== ===>== ==this====.====onClick====() }>======                ==<====h1====>number: {====this====.====state====.====num====}</====h1====>======                ==<====button====>add</====button====>======            ==</====div====>======        ==);======    ==}========}======")]),e(`
`),n("span",{class:"line"},[n("span",null,"==ReactDOM====.====render====(======    ==<====Counter== ==/>,======    ==document====.====getElementById====(== =='root'== ==)========);==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==可以看到结果：==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==mount====只在挂载时输出了一次，后面每次更新时会输出====update==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==后话==")]),e(`
`),n("span",{class:"line"},[n("span",null,"==至此我们已经从====API====层面实现了====React====的核心功能。但是我们目前的做法是每次更新都重新渲染整个组件甚至是整个应用，这样的做法在页面复杂时将会暴露出性能上的问题，====DOM====操作非常昂贵，而为了减少====DOM====操作，====React====又做了哪些事？这就是我们下一篇文章的内容了。==")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://github.com/hujiulong/blog/issues/5>")])])])])],-1)])])}const f=l(p,[["render",o]]);export{h as __pageData,f as default};
