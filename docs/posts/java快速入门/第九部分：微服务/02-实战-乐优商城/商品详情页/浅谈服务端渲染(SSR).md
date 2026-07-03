---
title: 浅谈服务端渲染(SSR)
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
==大家好，我是神三元，这一次，让我们来以====React====为例，把服务端渲染====(Server Side Render====，简称“====SSR====”====)====学个明明白白。==
==这里附上这个项目的====github====地址====:==
==https://github.com/sanyuan070...==
==欢迎大家点====star,====提====issue====，一起进步！==
==## part1====：实现一个基础的====React====组件====SSR==
==这一部分来简要实现一个====React====组件的====SSR====。==
==###== ==一====. SSR vs CSR==
==什么是服务端渲染？==
==废话不多说，直接起一个====express====服务器。==
**var** ==express === ==require====(===='express'====)====￼==**var** ==app = express()==
==app.get(===='/'====, (req, res) =\> {====￼== ==res.send(====￼== ==`====￼==   ==\<html\>====￼==     ==\<head\>====￼==       ==\<title\>hello\</title\>====￼==     ==\</head\>====￼==     ==\<body\>====￼==       ==\<h1\>hello\</h1\>====￼==       ==\<p\>world\</p\>====￼==     ==\</body\>====￼==   ==\</html\>====￼== ==`====￼== ==)====￼====})==
==app.listen(====3001====, () =\> {====￼== ==console====.log(===='listen:3001'====)====￼====})==
==启动之后打开====localhost:3001====可以看到页面显示了====hello world====。而且打开网页源代码：==
![he ad hello hea b ody html](Exported%20image%2020260703000042-0.png)

==也能够完成显示。==
==这就是服务端渲染。其实非常好理解，就是服务器返回一堆====html====字符串，然后让浏览器显示。==
==与服务端渲染相对的是客户端渲染====(Client Side Render)====。那什么是客户端渲染？==
==现在创建一个新的====React====项目，用脚手架生成项目，然后====run====起来。==
==这里你可以看到====React====脚手架自动生成的首页。==
![Edit srcApp. js and save to reload. Learn React](Exported%20image%2020260703000045-1.png)

`==然而打开网页源代码。==`

![html he ad meta link shortcl_t icon ico meta meta ...](Exported%20image%2020260703000052-2.png)

==body====中除了兼容处理的====noscript====标签之外，只有一个====id====为====root====的标签。那首页的内容是从哪来的呢？很明显，是下面的====script====中拉取的====JS====代码控制的。==
==因此，====CSR====和====SSR====最大的区别在于前者的页面渲染是====JS====负责进行的，而后者是服务器端直接返回====HTML====让浏览器直接渲染。==
==为什么要使用服务端渲染呢？==
![CSR HTML HTML LOADING .JS JS LOADING SSR HTML HTML...](Exported%20image%2020260703000055-3.png)

==传统====CSR====的弊端：==

==由于页面显示过程要进行====JS====文件拉取和====React====代码执行，首屏加载时间会比较慢。==

==对于====SEO(Search Engine Optimazition,====即搜索引擎优化====)====，完全无能为力，因为搜索引擎爬虫只认识====html====结构的内容，而不能识别====JS====代码内容。==

==SSR====的出现，就是为了解决这些传统====CSR====的弊端。==
==二、实现====React====组件的服务端渲染==
==刚刚起的====express====服务返回的只是一个普通的====html====字符串，但我们讨论的是如何进行====React====的服务端渲染，那么怎么做呢？==
==首先写一个简单的====React====组件====:==
_// containers/Home.js_==￼==**import** ==React== **from** =='react'====;====￼==**const** ==Home = () =\> {====￼==  **return** ==(====￼==    ==\<div\>====￼==      ==\<div\>====This is sanyuan====\</div\>====￼==    ==\</div\>====￼==  ==)====￼====}====￼==**export default** ==Home==
==现在的任务就是将它转换为====html====代码返回给浏览器。==
==总所周知，====JSX====中的标签其实是基于虚拟====DOM====的，最终要通过一定的方法将其转换为真实====DOM====。虚拟====DOM====也就是====JS====对象，可以看出整个服务端的渲染流程就是通过虚拟====DOM====的编译来完成的，因此虚拟====DOM====巨大的表达力也可见一斑了。==
==而====react-dom====这个库中刚好实现了编译虚拟====DOM====的方法。做法如下====:==
_// server/index.js_==￼==**import** ==express== **from** =='express'====;====￼==**import** =={ renderToString }== **from** =='react-dom/server'====;====￼==**import** ==Home== **from** =='./containers/Home'====;==
**const** ==app = express();====￼==**const** ==content = renderToString(====\<Home /\>====);====￼====app.get('/', function (req, res) {====￼==   ==res.send(====￼==   ==`====￼==    ==\<html\>====￼==      ==\<head\>====￼==        ==\<title\>====ssr====\</title\>====￼==      ==\</head\>====￼==      ==\<body\>====￼==        ==\<div== ==id========="root"====\>====${content}====\</div\>====￼==      ==\</body\>====￼==    ==\</html\>====￼==   ==`====￼==   ==);====￼====})====￼====app.listen(3001, () =\> {====￼==  ==console.log('listen:3001')====￼====})==
==启动====express====服务，再浏览器上打开对应端口，页面显示出===="this is sanyuan"====。==
==到此，就初步实现了一个====React====组件是服务端渲染。==
==当然，这只是一个非常简陋的====SSR====，事实上对于复杂的项目而言是无能为力的，在之后会一步步完善，打造出一个功能完整的====React====的====SSR====框架。==
==part2:== ==初识同构==
==一====.====引入同构==
==其实前面的====SSR====是不完整的，平时在开发的过程中难免会有一些事件绑定，比如加一个====button:==
_// containers/Home.js_==￼==**import** ==React== **from** =='react'====;====￼==**const** ==Home = () =\> {====￼==  **return** ==(====￼==    ==\<div\>====￼==      ==\<div\>====This is sanyuan====\</div\>====￼==      ==\<button== ==onClick========={()== ===\>== =={alert('666')}}\>click====\</button\>====￼==    ==\</div\>====￼==  ==)====￼====}====￼==**export default** ==Home==
==再试一下，你会惊奇的发现，事件绑定无效====!====那这是为什么呢？原因很简单，====react-dom/server====下的====renderToString====并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定。==
==那怎么解决这个问题呢？==
==这就需要进行同构了。所谓同构，通俗的讲，就是一套====React====代码在服务器上运行一遍，到达浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件绑定。==
==那如何进行浏览器端的事件绑定呢？==
==唯一的方式就是让浏览器去拉取====JS====文件执行，让====JS====代码来控制。于是服务端返回的代码变成了这样====:==
![he ad hea div is index. js X script script b ody h...](Exported%20image%2020260703000111-4.png)

==有没有发现和之前的区别？区别就是多了一个====script====标签。而它拉取的====JS====代码就是来完成同构的。==
==那么这个====index.js====我们如何生产出来呢？==
==在这里，要用到====react-dom====。具体做法其实就很简单了：==
_//client/index. js_==￼==**import** ==React== **from** =='react'====;====￼==**import** ==ReactDom== **from** =='react-dom'====;====￼==**import** ==Home== **from** =='../containers/Home'====;==
==ReactDom.hydrate(====\<Home /\>====, document.getElementById('root'))==
==然后用====webpack====将其编译打包成====index.js:==
_//webpack.client.js_==￼==**const** ==path === ==require====(===='path'====);====￼==**const** ==merge === ==require====(===='webpack-merge'====);====￼==**const** ==config === ==require====(===='./webpack.base'====);==
**const** ==clientConfig = {====￼==  ==mode:== =='development'====,====￼==  ==entry:== =='./src/client/index.js'====,====￼==  ==output: {====￼==    ==filename:== =='index.js'====,====￼==    ==path: path.resolve(__dirname,== =='public'====)====￼==  ==},====￼====}==
==module====.exports = merge(config, clientConfig);==
_//webpack.base.js_==￼====module====.exports = {====￼==  ==module: {====￼==    ==rules: [{====￼==      ==test:== ==/\.js$/====,====￼==      ==loader:== =='babel-loader'====,====￼==      ==exclude:== ==/node_modules/====,====￼==      ==options: {====￼==        ==presets: [===='@babel/preset-react'====,  [===='@babel/preset-env'====, {====￼==          ==targets: {====￼==            ==browsers: [===='last 2 versions'====]====￼==          ==}====￼==        ==}]]====￼==      ==}====￼==    ==}]====￼==  ==}====￼====}==
_//package.json__的__script__部分_==￼==  =="scripts"====: {====￼==    =="dev"====:== =="npm-run-all --parallel dev:**"====,====￼==    =="dev:start"====:== =="nodemon --watch build --exec node \"./build/bundle.js\""====,====￼==    =="dev:build:server"====:== =="webpack --config webpack.server.js --watch"====,====￼==    =="dev:build:client"====:== =="webpack --config webpack.client.js --watch"====￼==  ==},==
==在这里需要开启====express====的静态文件服务：==
**const** ==app = express();====￼====app.use(express.static(===='public'====));==
==现在前端的====script====就能拿到控制浏览器的====JS====代码啦。==
==绑定事件完成！==
==现在来初步总结一下同构代码执行的流程：==
![React HTML HTML JS s](Exported%20image%2020260703000112-5.png)

==二====.====同构中的路由问题==
==现在写一个路由的配置文件：==
_// Routes.js_==￼==**import** ==React== **from** =='react'====;====￼==**import** =={Route}== **from** =='react-router-dom'====￼==**import** ==Home== **from** =='./containers/Home'====;====￼==**import** ==Login== **from** =='./containers/Login'==
**export** **default** ==(====￼==  ==\<div\>====￼==    ==\<Route== ==path========='/'== ==exact component========={Home}====\>\</Route\>====￼==    ==\<Route== ==path========='/login'== ==exact component========={Login}====\>\</Route\>====￼==  ==\</div\>====￼====)==
==在客户端的控制代码，也就是上面写过的====client/index.js====中，要做相应的更改====:==
**import** ==React== **from** =='react'====;====￼==**import** ==ReactDom== **from** =='react-dom'====;====￼==**import** =={ BrowserRouter }== **from** =='react-router-dom'====￼==**import** ==Routes== **from** =='../Routes'==
**const** ==App = () =\> {====￼==  **return** ==(====￼==    ==\<BrowserRouter\>====￼==      =={Routes}====￼==    ==\</BrowserRouter\>====￼==  ==)====￼====}====￼====ReactDom.hydrate(====\<App /\>====, document.getElementById('root'))==
==这时候控制台会报错，==
![Exported image](Exported%20image%2020260703000116-6.png)

==因为在====Routes.js====中，每个====Route====组件外面包裹着一层====div====，但服务端返回的代码中并没有这个====div,====所以报错。如何去解决这个问题？需要将服务端的路由逻辑执行一遍。==
_// server/index.js_==￼==**import** ==express== **from** =='express'====;====￼==**import** =={render}== **from** =='./utils'====;==
**const** ==app = express();====￼====app.use(express.static(===='public'====));====￼==_//__注意这里要换成__*__来匹配_==￼====app.get(===='*'====,== **function** ==(req, res) {====￼==   ==res.send(render(req));====￼====});====￼== ==￼====app.listen(====3001====, () =\> {====￼==  ==console====.log(===='listen:3001'====)====￼====});==
_// server/utils.js_==￼==**import** ==Routes== **from** =='../Routes'====￼==**import** =={ renderToString }== **from** =='react-dom/server'====;====￼==_//__重要是要用到__StaticRouter_==￼==**import** =={ StaticRouter }== **from** =='react-router-dom'====;== ==￼==**import** ==React== **from** =='react'==
**export** **const** ==render = (req) =\> {====￼==  _//__构建服务端的路由_==￼==  **const** ==content = renderToString(====￼==    ==\<StaticRouter== ==location========={req.path}== ==\>====￼==      =={Routes}====￼==    ==\</StaticRouter\>====￼==  ==);====￼==  **return** ==`====￼==    ==\<html\>====￼==      ==\<head\>====￼==        ==\<title\>ssr\</title\>====￼==      ==\</head\>====￼==      ==\<body\>====￼==        ==\<div id="root"\>====${content}====\</div\>====￼==        ==\<script src="/index.js"\>\</script\>====￼==      ==\</body\>====￼==    ==\</html\>====￼==  ==`====￼====}==
==现在路由的跳转就没有任何问题啦。==
==注意，这里仅仅是一级路由的跳转，多级路由的渲染在之后的系列中会用====react-router-config====中====renderRoutes====来处理。==
==part3:== ==同构项目中引入====Redux==
==这一节主要是讲述====Redux====如何被引入到同构项目中以及其中需要注意的问题。==
==重新回顾一下====redux====的运作流程：==
![Action store Store newState React Component prevSt...](Exported%20image%2020260703000119-7.png)

==再回顾一下同构的概念，即在====React====代码客户端和服务器端各自运行一遍。==
==一、创建全局====store==
==现在开始创建====store====。==
==在项目根目录的====store====文件夹====(====总的====store)====下====:==
**import** =={createStore, applyMiddleware, combineReducers}== **from** =='redux'====;====￼==**import** ==thunk== **from** =='redux-thunk'====;====￼==**import** =={ reducer== **as** ==homeReducer }== **from** =='../containers/Home/store'====;====￼==_//__合并项目组件中__store__的__reducer_==￼==**const** ==reducer = combineReducers({====￼==  ==home: homeReducer====￼====})====￼==_//__创建__store__，并引入中间件__thunk__进行异步操作的管理_==￼==**const** ==store = createStore(reducer, applyMiddleware(thunk));==
_//__导出创建的__store_==￼==**export default** ==store==
==二、组件内====action====和====reducer====的构建==
==Home====文件夹下的工程文件结构如下：==
![Home store JS actions.js JS constants.js JS index....](Exported%20image%2020260703000123-8.png)

==在====Home====的====store====目录下的各个文件代码示例：==
_//constants.js_==￼==**export const** ==CHANGE_LIST === =='HOME/CHANGE_LIST'====;==
_//actions.js_==￼==**import** ==axios== **from** =='axios'====;====￼==**import** =={ CHANGE_LIST }== **from** =="./constants"====;==
_//__普通__action_==￼==**const** ==changeList = list =\> ({====￼==  ==type: CHANGE_LIST,====￼==  ==list====￼====});====￼==_//__异步操作的__action(__采用__thunk__中间件__)_==￼==**export const** ==getHomeList = () =\> {====￼==  **return** ==(dispatch) =\> {====￼==    **return** ==axios.get(===='xxx'====)====￼==      ==.then((res) =\> {====￼==        **const** ==list = res.data.data;====￼==        ==console====.log(list)====￼==        ==dispatch(changeList(list))====￼==      ==});====￼==  ==};====￼====}==
_//reducer.js_==￼==**import** =={ CHANGE_LIST }== **from** =="./constants"====;==
**const** ==defaultState = {====￼==  ==name:== =='sanyuan'====,====￼==  ==list: []====￼====}==
**export** **default** ==(state = defaultState, action) =\> {====￼==  **switch**==(action.type) {====￼==    ==default:====￼==      **return** ==state;====￼==  ==}====￼====}==
_//index.js_==￼==**import**  ==reducer==  **from** =="./reducer"====;====￼==_//__这么做是为了导出__reducer__让全局的__store__来进行合并_==￼==_//__那么在全局的__store__下的__index.js__中只需引入__Home/store__而不需要__Home/store/reducer.js_==￼==_//__因为脚手架会自动识别文件夹下的__index__文件_==￼==**export** =={reducer}==
==三、组件连接全局====store==
==下面是====Home====组件的编写示例。==
**import** **React**==, {== **Component** ==} from== =='reac====t';====￼==**import** =={ connect } from== =='react====-redux';====￼==**import** =={ getHomeList } from './store/actions'==
**class** **Home** **extends** **Component** =={====￼==  ==render() {====￼==    ==const { list } === **this**==.props====￼==    **return** ==list.map(item =\> \<div key={item.id}\>{item.title}\</div\>)====￼==  ==}====￼====}==
==const mapStateToProps = state =\> ({====￼==  ==list: state.home.newsList,====￼====})==
==const mapDispatchToProps = dispatch =\> ({====￼==  ==getHomeList() {====￼==    ==dispatch(getHomeList());====￼==  ==}====￼====})====￼==_//__连接__store_==￼====export== **default** ==connect(mapStateToProps, mapDispatchToProps)(==**Home**==);==
==对于====store====的连接操作，在同构项目中分两个部分，一个是与客户端====store====的连接，另一部分是与服务端====store====的连接。都是通过====react-redux====中的====Provider====来传递====store====的。==
==客户端====:==
_//src/client/index.js_==￼==**import** ==React== **from** =='react'====;====￼==**import** ==ReactDom== **from** =='react-dom'====;====￼==**import** =={BrowserRouter, Route}== **from** =='react-router-dom'====;====￼==**import** =={ Provider }== **from** =='react-redux'====;====￼==**import** ==store== **from** =='../store'====￼==**import** ==routes== **from** =='../routes.js'==
**const** ==App = () =\> {====￼==  **return** ==(====￼==    ==\<Provider== ==store========={store}====\>====￼==      ==\<BrowserRouter\>====￼==        =={routes}====￼==      ==\</BrowserRouter\>====￼==    ==\</Provider\>====￼==  ==)====￼====}==
==ReactDom.hydrate(====\<App /\>====, document.getElementById('root'))==
==服务端====:==
_//src/server/index.js__的内容保持不变_==￼==_//__下面是__src/server/utils.js_==￼==**import** ==Routes== **from** =='../Routes'====￼==**import** =={ renderToString }== **from** =='react-dom/server'====;====￼==**import** =={ StaticRouter }== **from** =='react-router-dom'====;== ==￼==**import** =={ Provider }== **from** =='react-redux'====;====￼==**import** ==React== **from** =='react'==
**export** **const** ==render = (req) =\> {====￼==  **const** ==content = renderToString(====￼==    ==\<Provider== ==store========={store}====\>====￼==      ==\<StaticRouter== ==location========={req.path}== ==\>====￼==        =={Routes}====￼==      ==\</StaticRouter\>====￼==    ==\</Provider\>====￼==  ==);====￼==  **return** ==`====￼==    ==\<html\>====￼==      ==\<head\>====￼==        ==\<title\>ssr\</title\>====￼==      ==\</head\>====￼==      ==\<body\>====￼==        ==\<div id="root"\>====${content}====\</div\>====￼==        ==\<script src="/index.js"\>\</script\>====￼==      ==\</body\>====￼==    ==\</html\>====￼==  ==`====￼====}==
==四、潜在的坑==
==其实上面这样的====store====创建方式是存在问题的，什么原因呢？==
==上面的====store====是一个单例，当这个单例导出去后，所有的用户用的是同一份====store====，这是不应该的。那么这么解这个问题呢？==
==在全局的====store/index.js====下修改如下：==
_//__导出部分修改_==￼==**export default**  ==() =\> {====￼==  **return** ==createStore(reducer, applyMiddleware(thunk))====￼====}==
==这样在客户端和服务端的====js====文件引入时其实引入了一个函数，把这个函数执行就会拿到一个新的====store,====这样就能保证每个用户访问时都是用的一份新的====store====。==
==part4:== ==异步数据的服务端渲染方案====(====数据注水与脱水====)==
==一、问题引入==
==在平常客户端的====React====开发中，我们一般在组件的====componentDidMount====生命周期函数进行异步数据的获取。但是，在服务端渲染中却出现了问题。==
==现在我在====componentDidMount====钩子函数中进行====Ajax====请求====:==
**import** =={ getHomeList }== **from** =='./store/actions'====￼==  _//......_==￼==  ==componentDidMount() {====￼==    **this**==.props.getList();====￼==  ==}====￼==  _//......_==￼==  **const** ==mapDispatchToProps = dispatch =\> ({====￼==    ==getList() {====￼==      ==dispatch(getHomeList());====￼==    ==}====￼====})==
_//actions.js_==￼==**import** =={ CHANGE_LIST }== **from** =="./constants"====;====￼==**import** ==axios== **from** =='axios'==
**const** ==changeList = list =\> ({====￼==  ==type: CHANGE_LIST,====￼==  ==list====￼====})==
**export** **const** ==getHomeList = () =\> {====￼==  **return** ==dispatch =\> {====￼==    _//__另外起的本地的后端服务_==￼==    **return** ==axiosInstance.get(===='localhost:4000/api/news.json'====)====￼==      ==.then((res) =\> {====￼==        **const** ==list = res.data.data;====￼==        ==dispatch(changeList(list))====￼==      ==})====￼==  ==}====￼====}====￼==_//reducer.js_==￼==**import** =={ CHANGE_LIST }== **from** =="./constants"====;==
**const** ==defaultState = {====￼==  ==name:== =='sanyuan'====,====￼==  ==list: []====￼====}==
**export** **default** ==(state = defaultState, action) =\> {====￼==  **switch**==(action.type) {====￼==    **case** ==CHANGE_LIST:====￼==      **const** ==newState = {====￼==        ==...state,====￼==        ==list: action.list====￼==      ==}====￼==      **return** ==newState====￼==    **default**==:====￼==      **return** ==state;====￼==  ==}====￼====}==
==好，现在启动服务。==
![HomeLogin 2222222 3333333 5555555 click](Exported%20image%2020260703000128-9.png)

`==现在页面能够正常渲染，但是打开网页源代码。==`

![he ad hea div index. js X script script b ody html...](Exported%20image%2020260703000130-10.png)

==源代码里面并没有这些列表数据啊！那这是为什么呢？==
==让我们来分析一下客户端和服务端的运行流程，当浏览器发送请求时，服务器接受到请求，这时候服务器和客户端的====store====都是空的，紧接着客户端执行====componentDidMount====生命周期中的函数，获取到数据并渲染到页面，然而服务器端始终不会执行====componentDidMount====，因此不会拿到数据，这也导致服务器端的====store====始终是空的。换而言之，关于异步数据的操作始终只是客户端渲染。==
==现在的工作就是让服务端将获得数据的操作执行一遍，以达到真正的服务端渲染的效果。==
==二、改造路由==
==在完成这个方案之前需要改造一下原有的路由，也就是====routes.js==
**import** ==Home== **from** =='./containers/Home'====;====￼==**import** ==Login== **from** =='./containers/Login'====;==
**export** **default** ==[====￼===={====￼==  ==path:== =="/"====,====￼==  ==component: Home,====￼==  ==exact:== ==true====,====￼==  ==loadData: Home.loadData,==_//__服务端获取异步数据的函数_==￼==  ==key:== =='home'====￼====},====￼===={====￼==  ==path:== =='/login'====,====￼==  ==component: Login,====￼==  ==exact:== ==true====,====￼==  ==key:== =='login'====￼====}====￼====}];==
==此时客户端和服务端中编写的====JSX====代码也发生了相应变化==
_//__客户端_==￼==_//__以下的__routes__变量均指__routes.js__导出的数组_==￼====\<Provider store={store}\>====￼==  ==\<BrowserRouter\>====￼==      ==\<div\>====￼==        =={====￼==            ==routers.map(route =\> {====￼==                ==\<Route {====...route====} /\>====￼==            ==})====￼==        ==}====￼==      ==\</div\>====￼==  ==\</BrowserRouter\>====￼====\</Provider\>==
_//__服务端_==￼====\<Provider store={store}\>====￼==  ==\<StaticRouter\>====￼==      ==\<div\>====￼==        =={====￼==            ==routers.map(route =\> {====￼==                ==\<Route {====...route====} /\>====￼==            ==})====￼==        ==}====￼==      ==\</div\>====￼==  ==\</StaticRouter\>====￼====\</Provider\>==
==其中配置了一个====loadData====参数，这个参数代表了服务端获取数据的函数。每次渲染一个组件获取异步数据时，都会调用相应组件的这个函数。因此，在编写这个函数具体的代码之前，我们有必要想清楚如何来针对不同的路由来匹配不同的====loadData====函数。==
==在====server/utils.js====中加入以下逻辑==
  **import** =={ matchRoutes }== **from** =='react-router-config'====;====￼==  _//__调用__matchRoutes__用来匹配当前路由__(__支持多级路由__)_==￼==  **const** ==matchedRoutes = matchRoutes(routes, req.path)====￼==  _//promise__对象数组_==￼==  **const** ==promises = [];====￼==  ==matchedRoutes.forEach(item =\> {====￼==    _//__如果这个路由对应的组件有__loadData__方法_==￼==    **if** ==(item.route.loadData) {====￼==      _//__那么就执行一次__,__并将__store__传进去_==￼==      _//__注意__loadData__函数调用后需要返回__Promise__对象_==￼==      ==promises.push(item.route.loadData(store))====￼==    ==}====￼==  ==})====￼==  ==Promise====.all(promises).then(() =\> {====￼==      _//__此时该有的数据都已经到__store__里面去了_==￼==      _//__执行渲染的过程__(res.send__操作__)_==￼==  ==}====￼==  ==)==
==现在就可以安心的写我们的====loadData====函数，其实前面的铺垫工作做好后，这个函数是相当容易的。==
**import** =={ getHomeList }== **from** =='./store/actions'==
==Home.loadData = (store) =\> {====￼==    **return** ==store.dispatch(getHomeList())====￼====}==
_//actions.js_==￼==**export const** ==getHomeList = () =\> {====￼==  **return** ==dispatch =\> {====￼==    **return** ==axios.get(===='xxxx'====)====￼==      ==.then((res) =\> {====￼==        **const** ==list = res.data.data;====￼==        ==dispatch(changeList(list))====￼==      ==})====￼==  ==}====￼====}==
==根据这个思路，服务端渲染中异步数据的获取功能就完成啦。==
==三、数据的注水和脱水==
==其实目前做了这里还是存在一些细节问题的。比如当我将生命周期钩子里面的异步请求函数注释，现在页面中不会有任何的数据，但是打开网页源代码，却发现====:==
![h_ref II II div div div di ut to cl di di di di 22...](Exported%20image%2020260703000132-11.png)

==数据已经挂载到了服务端返回的====HTML====代码中。那这就说明服务端和客户端的====store====不同步的问题。==
==其实也很好理解。当服务端拿到====store====并获取数据后，客户端的====js====代码又执行一遍，在客户端代码执行的时候又创建了一个空的====store====，两个====store====的数据不能同步。==
==那如何才能让这两个====store====的数据同步变化呢====?==
==首先，在服务端获取获取之后，在返回的====html====代码中加入这样一个====script====标签：==
==\<script\>====￼==  ==window====.context = {====￼==    ==state: ${====JSON====.stringify(store.getState())}====￼==  ==}====￼====\</script\>==
==这叫做数据的“注水”操作，即把服务端的====store====数据注入到====window====全局环境中。==
==接下来是“脱水”处理，换句话说也就是把====window====上绑定的数据给到客户端的====store====，可以在客户端====store====产生的源头进行，即在全局的====store/index.js====中进行。==
_//store/index.js_==￼==**import** =={createStore, applyMiddleware, combineReducers}== **from** =='redux'====;====￼==**import** ==thunk== **from** =='redux-thunk'====;====￼==**import** =={ reducer== **as** ==homeReducer }== **from** =='../containers/Home/store'====;==
**const** ==reducer = combineReducers({====￼==  ==home: homeReducer====￼====})====￼==_//__服务端的__store__创建函数_==￼==**export const** ==getStore = () =\> {====￼==  **return** ==createStore(reducer, applyMiddleware(thunk));====￼====}====￼==_//__客户端的__store__创建函数_==￼==**export const** ==getClientStore = () =\> {====￼==  **const** ==defaultState === ==window====.context ?== ==window====.context.state : {};====￼==  **return** ==createStore(reducer, defaultState, applyMiddleware(thunk));====￼====}==
==至此，数据的脱水和注水操作完成。但是还是有一些瑕疵，其实当服务端获取数据之后，客户端并不需要再发送====Ajax====请求了，而客户端的====React====代码仍然存在这样的浪费性能的代码。怎么办呢？==
==还是在====Home====组件中，做如下的修改====:==
==componentDidMount() {====￼==  _//__判断当前的数据是否已经从服务端获取_==￼==  _//__要知道，如果是首次渲染的时候就渲染了这个组件，则不会重复发请求_==￼==  _//__若首次渲染页面的时候未将这个组件渲染出来，则一定要执行异步请求的代码_==￼==  _//__这两种情况对于同一组件是都是有可能发生的_==￼==  **if** ==(!==**this**==.props.list.length) {====￼==    **this**==.props.getHomeList()====￼==  ==}====￼====}==
==一路做下来，异步数据的服务端渲染还是比较复杂的，但是难度并不是很大，需要耐心地理清思路。==
==至此一个比较完整的====SSR====框架就搭建的差不多了，但是还有一些内容需要补充，之后会继续更新的。加油吧！==
==part5: node====作中间层及请求代码优化==
==一、为什么要引入====node====中间层====?==
==其实任何技术都是与它的应用场景息息相关的。这里我们反复谈的====SSR====，其实不到万不得已我们是用不着它的，====SSR====所解决的最大的痛点在于====SEO====，但它同时带来了更昂贵的成本。不仅因为服务端渲染需要更加复杂的处理逻辑，还因为同构的过程需要服务端和客户端都执行一遍代码，这虽然对于客户端并没有什么大碍，但对于服务端却是巨大的压力，因为数量庞大的访问量，对于每一次访问都要另外在服务器端执行一遍代码进行计算和编译，大大地消耗了服务器端的性能，成本随之增加。如果访问量足够大的时候，以前不用====SSR====的时候一台服务器能够承受的压力现在或许要增加到====10====台才能抗住。痛点在于====SEO====，但如果实际上对====SEO====要求并不高的时候，那使用====SSR====就大可不必了。==
==那同样地，为什么要引入====node====作为中间层呢？它是处在哪两者的中间？又是解决了什么场景下的问题？==
==在不用中间层的前后端分离开发模式下，前端一般直接请求后端的接口。但真实场景下，后端所给的数据格式并不是前端想要的，但处于性能原因或者其他的因素接口格式不能更改，这时候需要在前端做一些额外的数据处理操作。前端来操作数据本身无可厚非，但是当数据量变得庞大起来，那么在客户端就是产生巨大的性能损耗，甚至影响到用户体验。在这个时候，====node====中间层的概念便应运而生。==
==它最终解决的前后端协作的问题。==
==一般的中间层工作流是这样的====:====前端每次发送请求都是去请求====node====层的接口，然后====node====对于相应的前端请求做转发，用====node====去请求真正的后端接口获取数据，获取后再由====node====层做对应的数据计算等处理操作，然后返回给前端。这就相当于让====node====层替前端接管了对数据的操作。==
![Exported image](Exported%20image%2020260703000135-12.png)

==二、====SSR====框架中引入中间层==
==在之前搭建的====SSR====框架中，服务端和客户端请求利用的是同一套请求后端接口的代码，但这是不科学的。==
==对客户端而言，最好通过====node====中间层。而对于这个====SSR====项目而言，====node====开启的服务器本来就是一个中间层的角色，因而对于服务器端执行数据请求而言，就可以直接请求真正的后端接口啦。==
_//actions.js_==￼==_//__参数__server__表示当前请求是否发生在__node__服务端_==￼==**const** ==getUrl = (server) =\> {====￼==    **return** ==server ?== =='xxxx(====后端接口地址====)'== ==:== =='/api/sanyuan.json(node====接口====)'====;====￼====}====￼==_//__这个__server__参数是__Home__组件里面传过来的，_==￼==_//__在__componentDidMount__中调用这个__action__时传入__false__，_==￼==_//__在__loadData__函数中调用时传入__true,_ _这里就不贴组件代码了_==￼==**export const** ==getHomeList = (server) =\> {====￼==  **return** ==dispatch =\> {====￼==    **return** ==axios.get(getUrl(server))====￼==      ==.then((res) =\> {====￼==        **const** ==list = res.data.data;====￼==        ==dispatch(changeList(list))====￼==      ==})====￼==  ==}====￼====}==
==在====server/index.js====应拿到前端的请求做转发，这里是直接用====proxy====形式来做，也可以用====node====单独向后端发送一次====HTTP====请求。==
_//__增加如下代码_==￼==**import** ==proxy== **from** =='express-http-proxy'====;====￼==_//__相当于拦截到了前端请求地址中的__/api__部分，然后换成另一个地址_==￼====app.use(===='/api'====, proxy(===='http://xxxxxx(====服务端地址====)'====, {====￼==  ==proxyReqPathResolver:== **function**==(req) {====￼==    **return** =='/api'====+req.url;====￼==  ==}====￼====}));==
==三、请求代码优化==
==其实请求的代码还是有优化的余地的，仔细想想，上面的====server====参数其实是不用传递的。==
==现在我们利用====axios====的====instance====和====thunk====里面的====withExtraArgument====来做一些封装。==
_//__新建__server/request.js_==￼==**import** ==axios== **from** =='axios'==
**const** ==instance = axios.create({====￼==  ==baseURL:== =='====http://xxxxxx(====服务端地址====)===='====￼====})==
**export** **default** ==instance==
_//__新建__client/request.js_==￼==**import** ==axios== **from** =='axios'==
**const** ==instance = axios.create({====￼==  _//__即当前路径的__node__服务_==￼==  ==baseURL:== =='/'====￼====})==
**export** **default** ==instance==
==然后对全局下====store====的代码做一个微调====:==
**import** =={createStore, applyMiddleware, combineReducers}== **from** =='redux'====;====￼==**import** ==thunk== **from** =='redux-thunk'====;====￼==**import** =={ reducer== **as** ==homeReducer }== **from** =='../containers/Home/store'====;====￼==**import** ==clientAxios== **from** =='../client/request'====;====￼==**import** ==serverAxios== **from** =='../server/request'====;==
**const** ==reducer = combineReducers({====￼==  ==home: homeReducer====￼====})==
**export** **const** ==getStore = () =\> {====￼==  _//__让__thunk__中间件带上__serverAxios_==￼==  **return** ==createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));====￼====}====￼==**export const** ==getClientStore = () =\> {====￼==  **const** ==defaultState === ==window====.context ?== ==window====.context.state : {};====￼==   _//__让__thunk__中间件带上__clientAxios_==￼==  **return** ==createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));====￼====}==
==现在====Home====组件中请求数据的====action====无需传参，====actions.js====中的请求代码如下：==
**export const** ==getHomeList = () =\> {====￼==  _//__返回函数中的默认第三个参数是__withExtraArgument__传进来的__axios__实例_==￼==  **return** ==(dispatch, getState, axiosInstance) =\> {====￼==    **return** ==axiosInstance.get(===='/api/sanyuan.json'====)====￼==      ==.then((res) =\> {====￼==        **const** ==list = res.data.data;====￼==        ==console====.log(res)====￼==        ==dispatch(changeList(list))====￼==      ==})====￼==  ==}====￼====}==
==至此，代码优化就做的差不多了，这种代码封装的技巧其实可以用在其他的项目当中，其实还是比较优雅的。==
==part6:== ==多级路由渲染====(renderRoutes)==
==现在将====routes.js====的内容改变如下====:==
**import** ==Home== **from** =='./containers/Home'====;====￼==**import** ==Login== **from** =='./containers/Login'====;====￼==**import** ==App== **from** =='./App'==
_//__这里出现了多级路由_==￼==**export default** ==[{====￼==  ==path:== =='/'====,====￼==  ==component: App,====￼==  ==routes: [====￼==    =={====￼==      ==path:== =="/"====,====￼==      ==component: Home,====￼==      ==exact:== ==true====,====￼==      ==loadData: Home.loadData,====￼==      ==key:== =='home'====,====￼==    ==},====￼==    =={====￼==      ==path:== =='/login'====,====￼==      ==component: Login,====￼==      ==exact:== ==true====,====￼==      ==key:== =='login'====,====￼==    ==}====￼==  ==]====￼====}]==
==现在的需求是让页面公用一个====Header====组件，====App====组件编写如下====:==
**import** ==React== **from** =='react'====;====￼==**import** ==Header== **from** =='./components/Header'====;==
**const**  ==App = (props) =\> {====￼==  ==console====.log(props.route)====￼==  **return** ==(====￼==    ==\<div\>====￼==      ==\<Header\>\</Header\>====￼==    ==\</div\>====￼==  ==)====￼====}==
**export** **default** ==App;==
==对于多级路由的渲染，需要服务端和客户端各执行一次。==
==因此编写的====JSX====代码都应有所实现：==
_//routes__是指__routes.js__中返回的数组_==￼==_//__服务端__:_==￼====\<Provider store={store}\>====￼==  ==\<StaticRouter== ==location========={req.path}== ==\>====￼==    ==\<div\>====￼==      =={renderRoutes(routes)}====￼==    ==\</div\>====￼==  ==\</StaticRouter\>====￼====\<====/Provider\>==
==//====客户端：====￼====\<Provider store={getClientStore()}\>====￼==  ==\<BrowserRouter\>====￼==  ==\<div\>====￼==    =={renderRoutes(routes)}====￼==  ==\</====div\>====￼==  ==\</BrowserRouter\>====￼====\<====/Provider\>==
==这里都用到了====renderRoutes====方法，其实它的工作非常简单，就是根据====url====渲染一层路由的组件====(====这里渲染的是====App====组件====)====，然后将下一层的路由通过====props====传给目前的====App====组件，依次循环。==
==那么，在====App====组件就能通过====props.route.routes====拿到下一层路由进行渲染====:==
**import** ==React== **from** =='react'====;====￼==**import** ==Header== **from** =='./components/Header'====;====￼==_//__增加__renderRoutes__方法_==￼==**import** =={ renderRoutes }== **from** =='react-router-config'====;==
**const**  ==App = (props) =\> {====￼==  ==console====.log(props.route)====￼==  **return** ==(====￼==    ==\<div\>====￼==      ==\<Header\>\</Header\>====￼==      _\<!--__拿到__Login__和__Home__组件的路由__--\>_==￼==      =={renderRoutes(props.route.routes)}====￼==    ==\</div\>====￼==  ==)====￼====}==
**export** **default** ==App;==
==至此，多级路由的渲染就完成啦。==
==part7: CSS====的服务端渲染思路====(context====钩子变量====)==
==一、客户端项目中引入====CSS==
==还是以====Home====组件为例==
_//Home/style.css_==￼====body {====￼==  ==background: gray;====￼====}==
==现在，在====Home====组件代码中引入：==
**import** ==styles== **from** =='./style.css'====;==
==要知道这样的引入====CSS====代码的方式在一般环境下是运行不起来的，需要在====webpack====中做相应的配置。==
==首先安装相应的插件。==
==npm install style-loader css-loader --D==
_//webpack.client.js_==￼==**const** ==path === ==require====(===='path'====);====￼==**const** ==merge === ==require====(===='webpack-merge'====);====￼==**const** ==config === ==require====(===='./webpack.base'====);==
**const** ==clientConfig = {====￼==  ==mode:== =='development'====,====￼==  ==entry:== =='./src/client/index.js'====,====￼==  ==module: {====￼==    ==rules: [{====￼==      ==test:== ==/\.css?$/====,====￼==      ==use: [===='style-loader'====, {====￼==        ==loader:== =='css-loader'====,====￼==        ==options: {====￼==          ==modules:== ==true====￼==        ==}====￼==      ==}]====￼==    ==}]====￼==  ==},====￼==  ==output: {====￼==    ==filename:== =='index.js'====,====￼==    ==path: path.resolve(__dirname,== =='public'====)====￼==  ==},====￼====}==
==module====.exports = merge(config, clientConfig);==
_//webpack.base.js__代码，回顾一下，配置了__ES__语法相关的内容_==￼====module====.exports = {====￼==  ==module: {====￼==    ==rules: [{====￼==      ==test:== ==/\.js$/====,====￼==      ==loader:== =='babel-loader'====,====￼==      ==exclude:== ==/node_modules/====,====￼==      ==options: {====￼==        ==presets: [===='@babel/preset-react'====,  [===='@babel/preset-env'====, {====￼==          ==targets: {====￼==            ==browsers: [===='last 2 versions'====]====￼==          ==}====￼==        ==}]]====￼==      ==}====￼==    ==}]====￼==  ==}====￼====}==
==好，现在在客户端====CSS====已经产生了效果。==
![2222222 3333333 5555555](Exported%20image%2020260703000137-13.png)

`==可是打开网页源代码：==`

![he ad hea div script wi_ndow. cortex t state home ...](Exported%20image%2020260703000140-14.png)

==咦？里面并没有出现任何有关====CSS====样式的代码啊！那这是什么原因呢？很简单，其实我们的服务端的====CSS====加载还没有做。接下来我们来完成====CSS====代码的服务端的处理。==
==二、服务端====CSS====的引入==
==首先，来安装一个====webpack====的插件，==
==npm install -D isomorphic-style-loader==
==然后再====webpack.server.js====中做好相应的====css====配置：==
_//webpack.server.js_==￼==**const** ==path === ==require====(===='path'====);====￼==**const** ==nodeExternals === ==require====(===='webpack-node-externals'====);====￼==**const** ==merge === ==require====(===='webpack-merge'====);====￼==**const** ==config === ==require====(===='./webpack.base'====);==
**const** ==serverConfig = {====￼==  ==target:== =='node'====,====￼==  ==mode:== =='development'====,====￼==  ==entry:== =='./src/server/index.js'====,====￼==  ==externals: [nodeExternals()],====￼==  ==module: {====￼==    ==rules: [{====￼==      ==test:== ==/\.css?$/====,====￼==      ==use: [===='isomorphic-style-loader'====, {====￼==        ==loader:== =='css-loader'====,====￼==        ==options: {====￼==          ==modules:== ==true====￼==        ==}====￼==      ==}]====￼==    ==}]====￼==  ==},====￼==  ==output: {====￼==    ==filename:== =='bundle.js'====,====￼==    ==path: path.resolve(__dirname,== =='build'====)====￼==  ==}====￼====}==
==module====.exports = merge(config, serverConfig);==
==它做了些什么事情？==
==再看看这行代码====:==
**import** ==styles== **from** =='./style.css'====;==
==引入====css====文件时，这个====isomorphic-style-loader====帮我们在====styles====中挂了三个函数。输出====styles====看看：==
![_getContent Function, _getcss insertCss Function](Exported%20image%2020260703000142-15.png)

==现在我们的目标是拿到====CSS====代码，直接通过====styles._getCss====即可获得。==
==那我们拿到====CSS====代码后放到哪里呢？其实====react-router-dom====中的====StaticRouter====中已经帮我们准备了一个钩子变量====context====。如下==
_//context__从外界传入_==￼====\<StaticRouter location={req.path} context={context}\>====￼==    ==\<div\>====￼==        =={renderRoutes(routes)}====￼==    ==\</div\>====￼====\<====/StaticRouter\>==
==这就意味着在路由配置对象====routes====中的组件都能在服务端渲染的过程中拿到这个====context====，而且这个====context====对于组件来说，就相当于组件中的====props.staticContext====。并且，这个====props.staticContext====只会在服务端渲染的过程中存在，而客户端渲染的时候不会被定义。这就让我们能够通过这个变量来区分两种渲染环境啦。==
==现在，我们需要在服务端的====render====函数执行之前，初始化====context====变量的值====:==
**let** ==context = {== ==css: [] }==
==我们只需要在组件的====componentWillMount====生命周期中编写相应的逻辑即可====:==
==componentWillMount() {====￼==  _//__判断是否为服务端渲染环境_==￼==  **if** ==(==**this**==.props.staticContext) {====￼==    **this**==.props.staticContext.css.push(styles._getCss())====￼==  ==}====￼====}==
==服务端的====renderToString====执行完成后，====context====的====CSS====现在已经是一个有内容的数组，让我们来获取其中的====CSS====代码：==
_//__拼接代码_==￼==**const** ==cssStr = context.css.length ? context.css.join(===='\n'====) :== ==''====;==
==现在挂载到页面：==
_//__放到返回的__html__字符串里的__header__里面_==￼====\<style\>${cssStr}\<====/style\>==
![Exported image](Exported%20image%2020260703000147-16.png)

==网页源代码中看到了====CSS====代码，效果也没有问题。====CSS====渲染完成！==
==三、利用高阶组件优化代码==
==也许你已经发现，对于每一个含有样式的组件，都需要在====componentWillMount====生命周期中执行完全相同的逻辑，对于这些逻辑我们是否能够把它封装起来，不用反复出现呢？==
==其实是可以实现的。利用高阶组件就可以完成====:==
_//__根目录下创建__withStyle.js__文件_==￼==**import** **React**==, {== **Component** ==} from== =='reac====t';====￼==_//__函数返回组件_==￼==_//__需要传入的第一个参数是需要装饰的组件_==￼==_//__第二个参数是__styles__对象_==￼====export== **default** ==(==**DecoratedComponent**==, styles) =\> {====￼==  **return class** **NewComponent** **extends** **Component** =={====￼==    ==componentWillMount() {====￼==      _//__判断是否为服务端渲染过程_==￼==      **if** ==(==**this**==.props.staticContext) {====￼==        **this**==.props.staticContext.css.push(styles._getCss())====￼==      ==}====￼==    ==}====￼==    ==render() {====￼==      **return** ==\<==**DecoratedComponent** =={...==**this**==.props} /\>====￼==    ==}====￼==  ==}====￼====}==
==然后让这个导出的函数包裹我们的====Home====组件。==
**import** ==WithStyle== **from** =='../../withStyle'====;====￼==_//......_==￼==**const** ==exportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));====￼==**export default** ==exportHome;==
==这样是不是简洁很多了呢？将来对于越来越多的组件，采用这种方式也是完全可以的。==
==part8:== ==做好====SEO====的一些技巧，引入====react-helmet==
==这一节我们来简单的聊一点====SEO====相关的内容。==
==一、====SEO====技巧分享==
==所谓====SEO(Search Engine Optimization)====，指的是利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。现在的搜索引擎爬虫一般是全文分析的模式，分析内容涵盖了一个网站主要====3====个部分的内容====:====文本、多媒体====(====主要是图片====)====和外部链接，通过这些来判断网站的类型和主题。因此，在做====SEO====优化的时候，可以围绕这三个角度来展开。==
==对于文本来说，尽量不要抄袭已经存在的文章，以写技术博客为例，东拼西凑抄来的文章排名一般不会高，如果需要引用别人的文章要记得声明出处，不过最好是原创，这样排名效果会比较好。多媒体包含了视频、图片等文件形式，现在比较权威的搜索引擎爬虫比如====Google====做到对图片的分析是基本没有问题的，因此高质量的图片也是加分项。另外是外部链接，也就是网站中====a====标签的指向，最好也是和当前网站相关的一些链接，更容易让爬虫分析。==
==当然，做好网站的门面，也就是标题和描述也是至关重要的。如：==
![M000 M000 MOOC 0 985 MOOC 51 h s w urse163 V3](Exported%20image%2020260703000149-17.png)

==网站标题中不仅仅包含了关键词，而且有比较详细和靠谱的描述，这让用户一看到就觉得非常亲切和可靠，有一种想要点击的冲动，这就表明网站的====转化率====比较高。==
==二、引入====react-helmet==
==而====React====项目中，开发的是单页面的应用，页面始终只有一份====title====和====description====，如何根据不同的组件显示来对应不同的网站标题和描述呢？==
==其实是可以做到的。==
==npm install react-helmet --save==
==组件代码====:(====还是以====Home====组件为例====)==
**import** =={ Helmet }== **from** =='react-helmet'====;==
_//..._==￼====render() {== ==￼==    **return** ==(====￼==      ==\<Fragment\>====￼==        _\<!--Helmet__标签中的内容会被放到客户端的__head__部分__--\>_==￼==        ==\<Helmet\>====￼==          ==\<title\>====这是三元的技术博客，分享前端知识====\</title\>====￼==          ==\<meta== ==name========="description"== ==content========="====这是三元的技术博客，分享前端知识===="====/\>====￼==        ==\</Helmet\>====￼==        ==\<div== ==className========="test"====\>====￼==          =={====￼==            ==this.getList()====￼==          ==}====￼==        ==\</div\>====￼==      ==\</Fragment\>====￼==     ==￼==    ==);====￼====//...==
==这只是做了客户端的部分，在服务端仍需要做相应的处理。==
==其实也非常简单：==
_//server/utils.js_==￼==**import** =={ renderToString }== **from** =='react-dom/server'====;====￼==**import** =={  StaticRouter }== **from** =='react-router-dom'====;== ==￼==**import** ==React== **from** =='react'====;====￼==**import** =={ Provider }== **from** =="react-redux"====;====￼==**import** =={ renderRoutes }== **from** =='react-router-config'====;====￼==**import** =={ Helmet }== **from** =='react-helmet'====;==
**export** **const** ==render = (store, routes, req, context) =\> {====￼==  **const** ==content = renderToString(====￼==    ==\<Provider== ==store========={store}====\>====￼==      ==\<StaticRouter== ==location========={req.path}== ==context========={context}====\>====￼==        ==\<div\>====￼==          =={renderRoutes(routes)}====￼==        ==\</div\>====￼==      ==\</StaticRouter\>====￼==    ==\</Provider\>====￼==  ==);====￼==  _//__拿到__helmet__对象，然后在__html__字符串中引入_==￼==  **const** ==helmet = Helmet.renderStatic();==
**const** ==cssStr = context.css.length ? context.css.join(===='\n'====) :== ==''====;==
**return**  ==`====￼==    ==\<html\>====￼==      ==\<head\>====￼==        ==\<style\>====${cssStr}====\</style\>====￼==        ==${helmet.title.toString()}====￼==        ==${helmet.meta.toString()}====￼==      ==\</head\>====￼==      ==\<body\>====￼==        ==\<div id="root"\>====${content}====\</div\>====￼==        ==\<script\>====￼==          ==window.context = {====￼==            ==state:== ==${====JSON====.stringify(store.getState())}====￼==          ==}====￼==        ==\</script\>====￼==        ==\<script src="/index.js"\>\</script\>====￼==      ==\</body\>====￼==    ==\</html\>====￼==  ==`====￼====};==
==现在来看看效果：==
![he ad backgrcnmd gray title meta hea description](Exported%20image%2020260703000151-18.png)

==网页源代码中显示出对应的====title====和====description,== ==客户端的显示也没有任何问题，大功告成！==
==关于====React====的服务端渲染原理，就先分享到这里，内容还是比较复杂的，对于前端的综合能力要求也比较高，但是坚持跟着学下来，一定会大有裨益的。相信你看了这一系列之后也有能力造出自己的====SSR====轮子，更加深刻地理解这一方面的技术。==
 \> 来自

 \<https://segmentfault.com/a/1190000020029159?utm_source=tag-newest\>
```
