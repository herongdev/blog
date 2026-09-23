import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"webpack处理ts模块","description":"TypeScript 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。 基础安装 首先，执行以下命令，安装 TypeScript 编译器(comp。","frontmatter":{"title":"webpack处理ts模块","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"TypeScript 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。 基础安装 首先，执行以下命令，安装 TypeScript 编译器(comp。","sidebarWeight":35,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Ts、babel、webpack中的模块转换/webpack处理ts模块.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/webpack处理ts模块.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/webpack处理ts模块.md"}'),t={name:"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/webpack处理ts模块.md"};function c(i,l,r,o,u,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"webpack处理ts模块",tabindex:"-1"},[n("webpack处理ts模块 "),s("a",{class:"header-anchor",href:"#webpack处理ts模块","aria-label":'Permalink to "webpack处理ts模块"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“webpack处理ts模块”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,[n("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 "),s("a",{href:"https://www.typescriptlang.org/",target:"_blank",rel:"noreferrer"},"TypeScript"),n(" 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。")])]),s("p",null,"基础安装 首先，执行以下命令，安装 TypeScript 编译器(compiler)和 loader： npm install--save-dev typescript ts-loader==== 现在，我们将修改目录结构和配置文件： project"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"tsconfig.json")]),n(`
`),s("span",{class:"line"},[s("span",null,"这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "compilerOptions": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "outDir": "./dist/",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "noImplicitAny": true,')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "module": "es6",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "target": "es5",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "jsx": "react",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "allowJs": true')]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"查看 [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 官方文档了解更多关于 tsconfig.json 的配置选项。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"现在让我们在 webpack 配置中处理 TypeScript：")]),n(`
`),s("span",{class:"line"},[s("span",null,"webpack.config.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"const path = require('path');")]),n(`
`),s("span",{class:"line"},[s("span",null,"module.exports = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  entry: './src/index.ts',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  module: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    rules: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.tsx?$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: 'ts-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: /node_modules/")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  resolve: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    extensions: ['.tsx', '.ts', '.js']")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  output: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    filename: 'bundle.js',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: path.resolve(__dirname, 'dist')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")])])])]),s("p",null,[n("这会直接将 webpack 的入口起点指定为 ./index.ts，然后通过 ts-loader "),s("em",null,"加载_所有的"),n(),s("em",null,".ts"),n(),s("em",null,"和"),n(),s("em",null,".tsx"),n(" _文件，并且在当前目录_输出_一个 bundle.js 文件。 Loader")]),s("p",null,[s("a",{href:"https://github.com/TypeStrong/ts-loader",target:"_blank",rel:"noreferrer"},"ts-loader"),n(" 在本指南中，我们使用 ts-loader，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。")]),s("p",null,[n("source map 想要了解 source map 的更多信息，请查看"),s("a",{href:"https://www.webpackjs.com/guides/development",target:"_blank",rel:"noreferrer"},"开发指南"),n("。 要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 TypeScript 配置中添加下面这行： tsconfig.json")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"现在，我们需要告诉 webpack 提取这些 source map，并内联到最终的 bundle 中。")]),n(`
`),s("span",{class:"line"},[s("span",null,"webpack.config.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"const path = require('path');")]),n(`
`),s("span",{class:"line"},[s("span",null,"module.exports = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  entry: './src/index.ts',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ==devtool:== =='inline-source-map'====,==")]),n(`
`),s("span",{class:"line"},[s("span",null,"  module: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    rules: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.tsx?$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: 'ts-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: /node_modules/")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  resolve: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    extensions: ['.tsx', '.ts', '.js']")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  output: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    filename: 'bundle.js',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: path.resolve(__dirname, 'dist')")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")]),n(`
`),s("span",{class:"line"},[s("span",null,"查看 [devtool](https://www.webpackjs.com/configuration/devtool/) 文档以了解更多信息。")])])])]),s("p",null,[n("使用第三方库 当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 "),s("a",{href:"http://microsoft.github.io/TypeSearch/",target:"_blank",rel:"noreferrer"},"TypeSearch"),n(" 中找到并安装这些第三方库的类型声明文件。 举个例子，如果想安装 lodash 这个库的类型声明文件，我们可以运行下面的命令： npm install--save-dev @types/lodash 想了解更多，可以查看"),s("a",{href:"https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/",target:"_blank",rel:"noreferrer"},"这篇文章"),n("。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"导入其他资源")]),n(`
`),s("span",{class:"line"},[s("span",null,"要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。那么首先，我们需要在项目里创建 custom.d.ts 文件，这个文件用来编写自定义的类型声明。让我们将 .svg 文件进行声明设置：")]),n(`
`),s("span",{class:"line"},[s("span",null,"custom.d.ts")]),n(`
`),s("span",{class:"line"},[s("span",null,'declare module "*.svg" {')]),n(`
`),s("span",{class:"line"},[s("span",null,"  const content: any;")]),n(`
`),s("span",{class:"line"},[s("span",null,"  export default content;")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"这里，我们通过指定任何以 .svg 结尾的导入，并将模块的 content 定义为 any，将 SVG 声明一个新的模块。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的理念适用于其他资源，包括 CSS, SCSS, JSON 等。"),s("p",null,[n("构建性能 "),s("em",null,"这可能会降低构建性能。"),n(" 关于构建工具，请查看"),s("a",{href:"https://www.webpackjs.com/guides/build-performance/",target:"_blank",rel:"noreferrer"},"构建性能"),n("指南。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"原文： [https://webpack.js.org/guides/typescript/](https://webpack.js.org/guides/typescript/)")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://www.webpackjs.com/guides/typescript/>")])])])])],-1)])])}const g=a(t,[["render",c]]);export{h as __pageData,g as default};
