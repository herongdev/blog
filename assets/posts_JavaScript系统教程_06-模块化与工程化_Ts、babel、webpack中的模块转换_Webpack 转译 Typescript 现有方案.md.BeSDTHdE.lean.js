import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Webpack 转译 Typescript 现有方案","description":"1. ts loader + babel loader + fork ts checker webpack plugin 这种方案，当 webpack 编译的时候，ts loader 会调用 typescript（所以本地项目需要安装 typescript），然后 typescr。","frontmatter":{"title":"Webpack 转译 Typescript 现有方案","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"1. ts loader + babel loader + fork ts checker webpack plugin 这种方案，当 webpack 编译的时候，ts loader 会调用 typescript（所以本地项目需要安装 typescript），然后 typescr。","sidebarWeight":34,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Ts、babel、webpack中的模块转换/Webpack 转译 Typescript 现有方案.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/Webpack 转译 Typescript 现有方案.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/Webpack 转译 Typescript 现有方案.md"}'),i={name:"posts/JavaScript系统教程/06-模块化与工程化/Ts、babel、webpack中的模块转换/Webpack 转译 Typescript 现有方案.md"};function c(t,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"webpack-转译-typescript-现有方案",tabindex:"-1"},[n("Webpack 转译 Typescript 现有方案 "),s("a",{class:"header-anchor",href:"#webpack-转译-typescript-现有方案","aria-label":'Permalink to "Webpack 转译 Typescript 现有方案"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“Webpack 转译 Typescript 现有方案”的核心思路，并能把它用于实际开发或面试表达。")]),s("ol",null,[s("li",null,"ts-loader + babel-loader + fork-ts-checker-webpack-plugin 这种方案，当 webpack 编译的时候，ts-loader 会调用 typescript（所以本地项目需要安装 typescript），然后 typescript 运行的时候会去读取本地的 tsconfig.json 文件。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"默认情况下，ts-loader 会进行 **转译** 和 **类型检查，**每当文件改动时，都会重新去 **转译** 和 **类型检查**，当文件很多的时候，就会特别慢，影响开发速度。所以需要使用 fork-ts-checker-webpack-plugin ，开辟一个单独的线程去执行类型检查的任务，这样就不会影响 webpack 重新编译的速度。")]),n(`
`),s("span",{class:"line"},[s("span",null,"fork-ts-checker-webpack-plugin 这个插件要求最低 Node.js 6.11.5，webpack 4，TypeScript 2.1 和可选的 ESLint 6（其本身要求最低 Node.js 8.10.0）。")]),n(`
`),s("span",{class:"line"},[s("span",null,"**webpack** **配置方法一**")]),n(`
`),s("span",{class:"line"},[s("span",null,"使用并行化构建提升速度（thread-loader），对于 webpack 4+ 来说，速度提升好像不是很明显;")]),n(`
`),s("span",{class:"line"},[s("span",null,"webpack.config.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"const cpus = require('os').cpus().length;")]),n(`
`),s("span",{class:"line"},[s("span",null,"const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');")]),n(`
`),s("span",{class:"line"},[s("span",null,"module.exports = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  module: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    rules: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // 单进程")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // test: /\\.tsx?$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // 默认情况下，ts-loader 会进行转译和类型检查")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // 因为是单进程，所以 webpack 可以收集到错误信息，并通过 dev-server 反馈到浏览器")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // 但这也导致了 webpack 构建速度极慢")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // use:['ts-loader']")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // },")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // 多进程")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.tsx?$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: /node_modules/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"          { loader: 'cache-loader' },")]),n(`
`),s("span",{class:"line"},[s("span",null,"          {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            loader: 'thread-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"            options: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"              workers: cpus - 1,")]),n(`
`),s("span",{class:"line"},[s("span",null,"            },")]),n(`
`),s("span",{class:"line"},[s("span",null,"          },")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'babel-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            loader: 'ts-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"            options: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 关闭类型检查，即只进行转译")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // transpileOnly: true,")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 如果设置了 happyPackMode 为 true")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 会隐式的设置 transpileOnly: true")]),n(`
`),s("span",{class:"line"},[s("span",null,"              happyPackMode: true")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 如果是 vue 应用，需要配置下这个")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // appendTsSuffixTo: [/\\.vue$/]")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"          }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      },")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.(js|jsx)$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: ['happypack/loader?id=js'],")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: [/node_modules/, /(.|_)min\\.js$/],")]),n(`
`),s("span",{class:"line"},[s("span",null,"        // include: [")]),n(`
`),s("span",{class:"line"},[s("span",null,'        //     path.resolve(__dirname, "src")')]),n(`
`),s("span",{class:"line"},[s("span",null,"        // ],")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ],")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  plugins: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // fork 一个进程进行检查")]),n(`
`),s("span",{class:"line"},[s("span",null,"    new ForkTsCheckerWebpackPlugin({")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // eslint: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      checkSyntacticErrors: true")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")]),n(`
`),s("span",{class:"line"},[s("span",null,"tsconfig.json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "compilerOptions": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    //"module": "commonjs",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "target": "es5",')]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 'react' 模式下，ts 会将 tsx 编译成 jsx 后再将 jsx 编译成 js*/")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 'preserve' 模式下：TS 会将 tsx 编译成 jsx 后，不再将 jsx 编译成 js，保留 jsx */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 保留 jsx 时，就需要在 ts-loader 前面配置（但执行是在ts-loader后） babel-loader 去处理 jsx */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 换句话说：只有想要用 babel-laoder 的时候，才需要设置这个值 */")]),n(`
`),s("span",{class:"line"},[s("span",null,'    "jsx": "preserve",')]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"**webpack** **配置方法二**")]),n(`
`),s("span",{class:"line"},[s("span",null,"编译 ts/tsx 文件时，不使用并行化构建（thread-loader）")]),n(`
`),s("span",{class:"line"},[s("span",null,"const cpus = require('os').cpus().length;")]),n(`
`),s("span",{class:"line"},[s("span",null,"const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');")]),n(`
`),s("span",{class:"line"},[s("span",null,"module.exports = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  module: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    rules: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.tsx?$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: /node_modules/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"          'babel-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"          {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            loader: 'ts-loader',")]),n(`
`),s("span",{class:"line"},[s("span",null,"            options: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 关闭类型检查，即只进行转译")]),n(`
`),s("span",{class:"line"},[s("span",null,"              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做")]),n(`
`),s("span",{class:"line"},[s("span",null,"              transpileOnly: true,")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"          }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      },")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.(js|jsx)$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: ['happypack/loader?id=js'],")]),n(`
`),s("span",{class:"line"},[s("span",null,"        exclude: [/node_modules/, /(.|_)min\\.js$/],")]),n(`
`),s("span",{class:"line"},[s("span",null,"        // include: [")]),n(`
`),s("span",{class:"line"},[s("span",null,'        //     path.resolve(__dirname, "src")')]),n(`
`),s("span",{class:"line"},[s("span",null,"        // ],")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ],")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  plugins: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // fork 一个进程进行检查")]),n(`
`),s("span",{class:"line"},[s("span",null,"    new ForkTsCheckerWebpackPlugin({")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // async: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // eslint: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      checkSyntacticErrors: true")]),n(`
`),s("span",{class:"line"},[s("span",null,"    })")]),n(`
`),s("span",{class:"line"},[s("span",null,"  ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"tsconfig.json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "compilerOptions": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    //"module": "commonjs",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "target": "es5",')]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 'react' 模式下，ts 会将 tsx 编译成 jsx 后再将 jsx 编译成 js*/")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 'preserve' 模式下：TS 会将 tsx 编译成 jsx 后，不再将 jsx 编译成 js，保留 jsx */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 保留 jsx 时，就需要在 ts-loader 前面配置 babel-loader 去处理 jsx */")]),n(`
`),s("span",{class:"line"},[s("span",null,"    /* 换句话说：只有想要用 babel-laoder 的时候，才需要设置这个值 */")]),n(`
`),s("span",{class:"line"},[s("span",null,'    "jsx": "preserve",')]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"**2.** **babel-loader** **+** **@babel/preset-typescript**")]),n(`
`),s("span",{class:"line"},[s("span",null,"这种方案，当 webpack 编译的时候，**babel-loader** **会读取** **.babelrc** **里的配置，**不会调用 typescript（所以本地项目无需安装 typescript），不会去检查类型；")]),n(`
`),s("span",{class:"line"},[s("span",null,"但是 tsconfig.json 是需要配置的，因为需要在开发代码时，让 idea 提示错误信息；")]),n(`
`),s("span",{class:"line"},[s("span",null,"webapack.config.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"module.exports = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  module: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    rules: [")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        test: /\\.(tsx?|jsx?)$/,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        // 默认会调用 @babel/core")]),n(`
`),s("span",{class:"line"},[s("span",null,"        use: 'babel-loader'")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,".babel.rc")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "presets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/preset-env"，')]),n(`
`),s("span",{class:"line"},[s("span",null,'     "@babel/preset-react",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/preset-typescript"')]),n(`
`),s("span",{class:"line"},[s("span",null,"  ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"常见问题 awesome-typescript-loader 与 ts-loader 的主要区别 • awesome-typescript-loader 不需要安装额外的插件，可以通过内置的 CheckerPlugin 插件，把类型检查放在独立的进程中执行 • 编译时间对比： • 如果都是用默认配置的话，awesome-typescript-loader 的速度相对快一些 • 如果都设置了禁止类型检查的选项，ts-loader 的速度相对快一些 如果都设置了禁止类型检查的选项并且将类型检查放到独立的进程中执行，awesome-typescript-loader 相对快一些"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"并行构建不再适合新版本的 webpack 了？")])])])]),s("p",null,"并行化构建对于 webpack 2/3 的性能有明显的提升，使用 webpack 4+时，速度提升的收益似乎要少得多。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"并行化构建有两种方式： happypack 和 thread-loader")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**使用了** **TypeScript****，为什么还需要** **Babel**")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"大部分已存项目依赖了 babel")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"有些需求/功能需要 babel 的插件去实现（如：按需加载）")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"babel 有非常丰富的插件，它的生态发展得很好")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"babel 7 之前：需要前面两种方案来转译 TS")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"babel 7 之后：babel 直接移除 TS，转为 JS，这使得它的编译速度飞快")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**为什么用了** **ts-loader** **后，还要使用** **babel-loader**")])])])]),s("p",null,"ts-loader 是不会读取 .babelrc 里的配置，即无法使用 babel 系列的插件，所以直接使用 ts-loader 将 ts/tsx 转成 js ，就会出现垫片无法按需加载、antd 无法按需引入的问题。所以需要用 ts-loader 把 ts/tsx 转成 js/jsx，然后再用 babel-loader 去调用 babel 系列插件，编译成最终的 js。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**如何选择转译方案**")])])])]),s("p",null,[n("想要在"),s("strong",null,"旧的项目"),n("中使用 TS，可以考虑使用 "),s("a",{href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-loader",target:"_blank",rel:"noreferrer"},"ts-loader"),n(" + "),s("a",{href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin",target:"_blank",rel:"noreferrer"},"fork-ts-checker-webpack-plugin"),n("。"),s("strong",null,"新的项目"),n("中可以考虑使用 "),s("a",{href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40babel%2Fpreset-typescript",target:"_blank",rel:"noreferrer"},"@babel/preset-typescript"),n(" 。前一种方案默认多了类型检查这个功能。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**如果在使用** **babel-loader** **+** **@babel/preset-typescript** **这种方案时，也想要类型检查，该怎么做**")]),n(`
`),s("span",{class:"line"},[s("span",null,"package.json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "scripts": {')]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 再开一个 npm 脚本自动检查类型")]),n(`
`),s("span",{class:"line"},[s("span",null,'    "type-check": "tsc --watch",')]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "devDependencies": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/cli": "^7.4.4",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/core": "^7.4.5",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/plugin-proposal-class-properties": "^7.4.4",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/plugin-proposal-object-rest-spread": "^7.4.4",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/preset-env": "^7.4.5",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "@babel/preset-typescript": "^7.3.3",')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "typescript": "^3.5.2"')]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"tsconfig.json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "compilerOptions": {')]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 不生成文件，只做类型检查")]),n(`
`),s("span",{class:"line"},[s("span",null,'    "noEmit": true,')]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"**使用** **@babel/preset-typescript** **需要注意的地方，有四种语法在** **babel** **中是无法编译的**")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"namespace：不要再用了，已经过时了。改用标准的 ES6 module（==import==/==export==），在[推荐的](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpalantir%2Ftslint%2Fblob%2F21358296ad11a857918b45e6a9cc628290dc3f96%2Fsrc%2Fconfigs%2Frecommended.ts%23L89) tslint 规则中也建议不要使用 namesapce。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"==namespace== ==Person{==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==const== ==name== ===== =='abc';==")]),n(`
`),s("span",{class:"line"},[s("span",null,"==}==")])])])]),s("p",null,"类型断言：改用 as 来断言类型（但是在 demo 中试了下，好像没报错，不知道是不是可以正常编译了）。"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"interface Person {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    name: string;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    age: number")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let p1 = {age: 18} as Person;")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(p2.name);")]),n(`
`),s("span",{class:"line"},[s("span",null,"let p2 = <Person>{age: 18};")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(p3.name);")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"常量枚举")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"==const== ==enum== ==Sex== =={==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==man,==")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ==woman==")]),n(`
`),s("span",{class:"line"},[s("span",null,"==}==")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"历史遗留风格的 import/export 语法：==import xxx= require(====…====)== 和 ==export = xxx==。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**Typescript** **官方转向** **ESLint** **的原因**")])])])]),s("p",null,"TSLint 执行规则的方式存在一些架构问题，从而影响了性能，而修复这些问题会破坏现有规则；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"ESLint 的性能更好并且使用者较多")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**使用了** **TypeScript****，为什么还需要** **ESLint**")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"TS 主要是用来做类型检查和语言转换的，顺带一小部分的语法检查")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"ESLint 主要是用来检查代码风格和语法错误的")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**使用** **`npx create-react-app xxx --typescript`** **可以快速创建** **TS** **项目**")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://juejin.cn/post/6844904052094926855>")])])])])],-1)])])}const g=a(i,[["render",c]]);export{h as __pageData,g as default};
