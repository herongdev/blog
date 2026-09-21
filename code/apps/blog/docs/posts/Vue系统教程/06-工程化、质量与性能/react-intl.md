---
title: "react-intl"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "使用 react intl 实现 React 组件国际化 开始之前，先了解目前常用的 React 国际化插件： 。因为看上去使用方法比较简单，我先选择了 。但是使用过程中遇到很多问题，不想继续浪费时间，于是转而使用 。事实证明及时改变方案是明智的。 用于国际化 React 组件。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/常用依赖/react-intl.md"
---
::: v-pre

# react-intl

> 本节目标：理解“react-intl”的核心思路，并能把它用于实际开发或面试表达。
**使用** `react-intl` **实现** `React` **组件国际化**
==开始之前，先了解目前常用的== `React` ==国际化插件：==

```
The Best Libraries for React i18n
```

==。因为看上去使用方法比较简单，我先选择了==

```
react-i18next
```

==。但是使用过程中遇到很多问题，不想继续浪费时间，于是转而使用==

```
react-intl
```

==。事实证明及时改变方案是明智的。==

```
React Intl
React Intl
```

用于国际化 `React` 组件，提供 `React` 组件和 `API` 来格式化日期，数字，字符串（包括单复数和翻译） 。这次只用它实现文本翻译。
用法

2. 先安装： `npm install react-intl --save` 。
3. 载入语言环境数据。`React Intl` 依赖这些数据来支持单复数和相对时间格式化的功能。

    ```
    // Main.jsimport { addLocaleData } from 'react-intl'; /* react-intl imports */import en from 'react-intl/locale-data/en';import zh from 'react-intl/locale-data/zh';addLocaleData([...en, ...zh]);  //
    ```

    ==引入多语言环境的数据==

    ```

    ```

    虽然我只用到了文本翻译的功能，以为就不需要加载这些数据，但后来发现这是必须的步骤。不然会报错：

    ```
    [React Intl] Missing locale data for locale: "zh". Using default locale: "en" as fallback.
    ```

4. 使用`\<IntlProvider\>`组件包裹需要实现国际化的根组件，这个组件树之后就会在配置的`i18n`上下文中了。``由于项目中用到了`react-hot-loader`，根组件 `Main`被`\<AppContainer\>`包裹了，并且是从单独的一个文件 `import` 了 `Main` 组件。

    ```
    //app.jsimport { AppContainer } from 'react-hot-loader'import Main from './components/Main'//... ...const render = Component => {    ReactDOM.render(        <AppContainer>            <Component />        </AppContainer>,        document.getElementById('app')    )}render(Main);
    ```

    于是直接在 `Main.js` 中使用`\<IntlProvider\>`组件。把它加到 `render()`返回节点的最外层就行了。

    ```
    // Main.jsimport { addLocaleData, IntlProvider } from 'react-intl'; /* react-intl imports */render(){    return (        <IntlProvider>          //
    ```

    ==···== ==···==

    ```
            </IntlProvider>    )}
    ```

5. 添加多种语言对应的文本。比如要支持中英文，为了方便之后维护，可以新建两个文件：

    ```
    // en_US.jsconst en_US = {    hello: "Hello!"
    ```

    ==，==

    ```
        //... ...}export default en_US;// zh_CN.jsconst zh_CN = {    hello: "
    ```

    ==你好！==`"`==，==

    ```
        //... ...}export default zh_CN;
    ```

    然后在`Main.js`中引入这两个变量。

    ```
    // Main.jsimport zh_CN from "../locale/zh_CN"     // import defined messages in Chineseimport en_US from "../locale/en_US"     // import defined messages in English
    ```

6. 全局配置当前的语言，和相对应的文本。即配置`\<IntlProvider\>`组件的两个属性`locale`和`messages`。

    ```
    // Main.jsrender(){    let messages = {}    messages['en'] = en_US;    messages['zh'] = zh_CN;    return (        <IntlProvider locale={this.state.lang} messages={messages[this.state.lang]}>            //
    ```

    ==···== ==···==

    ```
            </IntlProvider>    )}
    ```

7. 这样基本配置就完成了，可以通过改变 `this.state.lang`的值来改变页面语言。

    ```
    // Main.js/** * Change language * @param {String} lang new language */changeLanguage(lang) {    this.setState({        lang: lang    })}
    ```

8. 接下来，添加翻译的文本到页面中。``基本只需要使用到一个组件：`\<FormattedMessage\>`。这个组件默认生成一个`\<span\>`，内容是翻译后的文本，也就是 `messages`中对应字段的值。``在需要添加国际化文本的组件中，引入`FormattedMessage`组件。

    ```
    import { FormattedMessage  } from 'react-intl'; /* react-intl imports *///... ...<FormattedMessage id="hello" />
    ```

    当前语言为`en`时，生成结果：

    ```
    <span>Hello!</span>
    ```

    到这里，基本的国际化就实现了。

    - 文本中添加变量。

        ```
        // en_US.jsconst en_US = {    helloSomeone: "Hello, {name}!"}// zh_CN.jsconst zh_CN = {    helloSomeone: "{name}
        ```

        ==，你好！==

        ```
        "}<FormattedMessage id="helloSomeone" values={{name:"Evelyn"}}/>
        ```

    - 在任意组件，获取当前页面语言。``基于以上的配置，可以看出当前语言是英语还是中文，取决于`Main`组件的 `state.lang`。那如果在其他组件中想要知道当前语言呢？方法一是直接传递给`Main`组件的子组件的`props`，但由于使用了 `react-router`不方便使用这方法；于是选择了方法二。

        ```
        React Intl
        ```

        提供一个`API`，`injectIntl`，可以把命令式格式化的 `API` 注入到任意组件的`props`中。然后可以在那个组件中通过`this.props.intl`直接去调用一些`API`和属性，比如`this.props.intl.locale`的值就是当前语言了。

    `injectIntl` 把 `API` 注入到组件的 `props` 中
    `injectIntl` 的使用方法可以看官方文档的[例子](https://github.com/yahoo/react-intl/wiki/API#injectintl)，这里不赘述了。

    - 自定义标签名，不生成`\<span\>`。比如生成 `\<p\>`。

        ```
        <FormattedMessage id="hello" tagName="p" />
        ```

    - 生成的文本中包含富文本。在`messages`中直接包含富文本无效，不会被解析。可以通过`values`传值时，加上富文本，比如：

        ```
        <FormattedMessage   id="helloSomeone"   tagName="div"   values={{    name:<p className="name">Evelyn</p>  }} />
        ```

        注意此处`name`不是字符串，而是 `React` 元素。结果为：

        ```
        <div>Hello, <p class="name">Evelyn</p>!</div>
        ```

    - 自定义生成的节点。比如，生成一个按钮：

        ```
        <FormattedMessage id='hello'>    {(txt) => (      <input type="button"        className="btn-hello"        onClick={this.handleClickHello.bind(this)}        value={txt} />    )}</FormattedMessage>txt
        ```

        对应`messages`中的文本。当语言为`en`时生成结果：

        ```
        <input type="button" class="btn-hello" value="Hello!">
        ```

        此时再定义`tagName`属性是无效的。

参考阅读

10. `The Best Libraries for React i18n:`

    ```
    https://phraseapp.com/blog/posts/react-i18n-best-libraries/
    ```

11. `React Intl wiki:`

    ```
    https://github.com/yahoo/react-intl/wiki#getting-started
    ```

`14`人点赞

```
React
```
 \> 来自

```
 <https://www.jianshu.com/p/574f6cea4f26>
```

更进一步
 \> 来自

```
 <https://www.jianshu.com/p/574f6cea4f26>
```

:::
