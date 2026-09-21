---
title: "服务器端渲染（SSR）概述"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "公司面试复盘"
description: "在现代Web开发中， 服务器端渲染（Server Side Rendering, SSR） 已成为提升应用性能、SEO优化和用户体验的重要手段。使用React进行服务器端渲染，可以将React组件在服务器上预先渲染成HTML，然后将其发送给客户端，客户端再接管后续的交互。这种方法。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/赢时胜/服务器端渲染（SSR）概述.md"
---
::: v-pre

# 服务器端渲染（SSR）概述

> 本节目标：理解“服务器端渲染（SSR）概述”的核心思路，并能把它用于实际开发或面试表达。
在现代Web开发中，**服务器端渲染（Server-Side Rendering, SSR）** 已成为提升应用性能、SEO优化和用户体验的重要手段。使用React进行服务器端渲染，可以将React组件在服务器上预先渲染成HTML，然后将其发送给客户端，客户端再接管后续的交互。这种方法结合了传统多页应用（MPA）和单页应用（SPA）的优势。本文将详细介绍如何使用React实现服务器端渲染，结合实际应用场景，涵盖其原理、实现步骤、优化方法以及常见的实操案例。

**1. 服务器端渲染（SSR）概述**
**1.1 什么是服务器端渲染（SSR）？**
服务器端渲染（SSR）是指在服务器上将React组件渲染成HTML字符串，然后将这些HTML发送到客户端浏览器。与之相对的是客户端渲染（Client-Side Rendering, CSR），即在客户端浏览器中通过JavaScript动态渲染React组件。
**1.2 SSR的优势**

1. **SEO友好**：
    - 搜索引擎爬虫更容易抓取和索引预渲染的HTML内容，提升网站的搜索排名。
2. **更快的首次内容渲染（FCP）**：
    - 用户可以更快地看到页面内容，提升用户体验，特别是在网络较慢或设备性能较低的情况下。
3. **更好的分享预览**：
    - 社交媒体平台在分享链接时，可以直接抓取到完整的页面内容，生成丰富的预览信息。
4. **性能优化**：
    - 减少客户端的计算负担，适用于性能敏感的应用场景。

**1.3 SSR的劣势**

1. **服务器负载增加**：
    - 每个请求都需要在服务器上渲染页面，增加了服务器的计算负担。
2. **复杂性增加**：
    - 实现和维护SSR比CSR更为复杂，涉及服务器配置、数据预取等问题。
3. **延迟与并发问题**：
    - 高并发下，服务器的渲染能力可能成为瓶颈，影响响应时间。

**2. React实现SSR的原理**
React通过在服务器上使用ReactDOMServer库，将React组件渲染为HTML字符串。然后，将这个字符串嵌入到一个HTML模板中，发送给客户端。客户端接收到HTML后，通过“水合（hydrate）”过程将其转化为可交互的React应用。
**2.1 渲染过程**

1. **服务器渲染**：
    - 使用ReactDOMServer.renderToString()或ReactDOMServer.renderToStaticMarkup()将React组件渲染为HTML字符串。
2. **发送HTML**：
    - 将渲染后的HTML字符串嵌入到HTML模板中，并发送给客户端浏览器。
3. **客户端水合**：
    - 客户端通过ReactDOM.hydrate()方法，将服务器渲染的HTML与React组件绑定，使其具有交互性。

**2.2 数据预取**
在SSR过程中，通常需要在渲染React组件之前预取必要的数据。可以通过在服务器端获取数据，然后将数据传递给React组件，实现数据在服务器渲染时即被注入。

**3. React SSR的实现步骤**
实现React SSR主要涉及以下步骤：

1. **设置服务器环境**：
    - 使用Node.js搭建服务器，处理HTTP请求。
2. **配置Babel**：
    - 使用Babel编译React和现代JavaScript代码，使其在Node.js环境中运行。
3. **创建React组件**：
    - 编写React组件，用于服务器渲染。
4. **服务器端渲染逻辑**：
    - 在服务器上渲染React组件，生成HTML字符串。
5. **构建HTML模板**：
    - 将渲染后的HTML字符串嵌入到HTML模板中，发送给客户端。
6. **客户端水合**：
    - 在客户端使用ReactDOM.hydrate()将预渲染的HTML转化为可交互的React应用。

**3.1 手动实现React SSR**
以下是一个简单的React SSR实现示例：
**3.1.1 项目结构**
my-ssr-app/├── package.json├── server.js├── src/│ ├── App.js│ └── index.js├── public/│ └── index.html├── babel.config.js└── webpack.config.js
**3.1.2 安装依赖**
npm init -ynpm install react react-dom expressnpm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli nodemon
**3.1.3 配置Babel**
**babel.config.js**
module.exports = \{ presets: [ '@babel/preset-env', '@babel/preset-react' ]\};
**3.1.4 创建React组件**
**src/App.js**
import React from 'react';
const App = (\{ initialData \}) =\> \{ return ( \<div\> \<h1\>服务器端渲染的React应用\</h1\> \<p\>初始数据: \{initialData\}\</p\> \</div\> );\};
export default App;
**3.1.5 设置服务器**
**server.js**
require('@babel/register')(\{ presets: ['@babel/preset-env', '@babel/preset-react']\});
const path = require('path');const express = require('express');const fs = require('fs');const React = require('react');const ReactDOMServer = require('react-dom/server');const App = require('./src/App').default;
const PORT = process.env.PORT || 3000;const app = express();
// 处理静态文件app.use(express.static(path.resolve(__dirname, 'public')));
app.get('*', (req, res) =\> \{ // 模拟数据预取 const initialData = "这是从服务器获取的数据";
// 服务器渲染React组件 const appHtml = ReactDOMServer.renderToString( React.createElement(App, \{ initialData \}) );
// 读取HTML模板 const indexFile = path.resolve('./public/index.html'); fs.readFile(indexFile, 'utf8', (err, data) =\> \{ if (err) \{ console.error('读取HTML模板出错:', err); return res.status(500).send('内部服务器错误'); \}
// 注入渲染后的HTML和初始数据 return res.send( data.replace('\<div id="root"\>\</div\>', ` \<div id="root"\>${appHtml}\</div\> \<script\> window.__INITIAL_DATA__ = "${initialData}" \</script\> `) ); \});\});
app.listen(PORT, () =\> \{ console.log(`服务器正在运行在 http://localhost:${PORT}`);\});
**3.1.6 创建HTML模板**
**public/index.html**
\<!DOCTYPE html\>\<html lang="en"\>\<head\> \<meta charset="UTF-8"\> \<title\>React SSR 示例\</title\>\</head\>\<body\> \<div id="root"\>\</div\> \<script src="bundle.js"\>\</script\>\</body\>\</html\>
**3.1.7 客户端入口**
**src/index.js**
import React from 'react';import ReactDOM from 'react-dom';import App from './App';
const initialData = window.__INITIAL_DATA__;
ReactDOM.hydrate( \<App initialData=\{initialData\} /\>, document.getElementById('root'));
**3.1.8 配置Webpack**
**webpack.config.js**
const path = require('path');
module.exports = \{ entry: './src/index.js', output: \{ path: path.resolve(__dirname, 'public'), filename: 'bundle.js' \}, module: \{ rules: [ \{ test: /\.js$/, exclude: /node_modules/, use: \{ loader: 'babel-loader' \} \} ] \}, mode: 'development'\};
**3.1.9 添加启动脚本**
**package.json**
\{ "name": "my-ssr-app", "version": "1.0.0", "main": "server.js", "scripts": \{ "build": "webpack", "start": "nodemon server.js --exec babel-node" \}, "dependencies": \{ "express": "^4.17.1", "react": "^17.0.2", "react-dom": "^17.0.2" \}, "devDependencies": \{ "@babel/core": "^7.14.6", "@babel/node": "^7.14.5", "@babel/preset-env": "^7.14.7", "@babel/preset-react": "^7.14.5", "babel-loader": "^8.2.2", "nodemon": "^2.0.7", "webpack": "^5.38.1", "webpack-cli": "^4.7.2" \}\}
**3.1.10 构建和运行**
# 构建客户端代码npm run build
# 启动服务器npm run start
访问 http://localhost:3000，您将看到服务器渲染的React应用，并且浏览器控制台中没有React警告，表明水合成功。
**3.2 使用Next.js实现React SSR**
虽然手动实现SSR可以帮助开发者理解其原理，但在实际项目中，使用成熟的框架如**Next.js**会更为高效和便捷。Next.js提供了开箱即用的SSR支持，自动处理路由、数据预取、代码分割等功能。
**3.2.1 创建Next.js项目**
npx create-next-app my-next-ssr-appcd my-next-ssr-appnpm run dev
**3.2.2 创建页面组件**
Next.js使用pages目录中的文件自动生成路由，支持服务器端渲染。
**pages/index.js**
import React from 'react';
const Home = (\{ initialData \}) =\> \{ return ( \<div\> \<h1\>Next.js SSR 示例\</h1\> \<p\>初始数据: \{initialData\}\</p\> \</div\> );\};
export async function getServerSideProps() \{ // 模拟数据预取 const initialData = "这是从服务器获取的数据";
return \{ props: \{ initialData \} \};\}
export default Home;
在上述示例中，getServerSideProps是一个Next.js提供的函数，用于在服务器端预取数据并将其作为props传递给组件。
**3.2.3 启动和访问**
npm run dev
访问 http://localhost:3000，即可看到服务器渲染的页面，初始数据已注入。

**4. 数据预取与同步**
在SSR中，数据预取是关键步骤。需要在服务器端获取必要的数据，然后将其注入到React组件中，确保页面在首次渲染时即包含所需的数据。
**4.1 手动实现数据预取**
在手动SSR实现中，可以在服务器渲染之前通过API调用或其他方式获取数据，并将数据传递给React组件。
**示例：**
app.get('*', async (req, res) =\> \{ try \{ // 预取数据 const response = await fetch('https://api.example.com/data'); const data = await response.json();
// 服务器渲染React组件 const appHtml = ReactDOMServer.renderToString( React.createElement(App, \{ initialData: data \}) );
// 注入HTML模板 const indexFile = path.resolve('./public/index.html'); const html = fs.readFileSync(indexFile, 'utf8').replace( '\<div id="root"\>\</div\>', `\<div id="root"\>${appHtml}\</div\> \<script\> window.__INITIAL_DATA__ = ${JSON.stringify(data)} \</script\>` );
res.send(html); \} catch (error) \{ console.error('数据预取失败:', error); res.status(500).send('内部服务器错误'); \}\});
**4.2 使用Next.js的数据预取**
Next.js通过getServerSideProps和getStaticProps简化了数据预取过程。
**pages/about.js**
import React from 'react';
const About = (\{ aboutData \}) =\> \{ return ( \<div\> \<h1\>关于我们\</h1\> \<p\>\{aboutData\}\</p\> \</div\> );\};
export async function getServerSideProps() \{ const response = await fetch('https://api.example.com/about'); const aboutData = await response.text();
return \{ props: \{ aboutData \} \};\}
export default About;
在上述示例中，getServerSideProps在服务器端执行，预取数据并将其作为props传递给组件。

**5. 客户端水合**
**水合（Hydration）**是指将服务器渲染的静态HTML转化为可交互的React应用。客户端通过ReactDOM.hydrate()方法，实现这一过程。
**5.1 手动SSR中的水合**
在手动实现的SSR中，客户端入口文件通常使用ReactDOM.hydrate()而不是ReactDOM.render()。
**src/index.js**
import React from 'react';import ReactDOM from 'react-dom';import App from './App';
const initialData = window.__INITIAL_DATA__;
ReactDOM.hydrate( \<App initialData=\{initialData\} /\>, document.getElementById('root'));
**5.2 Next.js中的水合**
Next.js自动处理水合过程，无需开发者手动调用hydrate。只需使用ReactDOM.hydrate()作为默认行为，确保页面在客户端正常工作。

**6. 优化SSR的性能**
为了确保SSR的高效性，需考虑以下优化措施：
**6.1 缓存**

- **页面缓存**：
    - 对静态页面或频繁访问的页面进行缓存，减少服务器渲染的频率。
- **数据缓存**：
    - 缓存API响应数据，避免重复请求，提高响应速度。

**示例：使用内存缓存**
const cache = \{\};
app.get('*', async (req, res) =\> \{ const cacheKey = req.url; if (cache[cacheKey]) \{ return res.send(cache[cacheKey]); \}
// 数据预取和渲染逻辑 const html = await renderPage(req);
cache[cacheKey] = html; res.send(html);\});
**6.2 分片渲染**
将应用拆分为多个独立渲染的部分，按需渲染，提高整体性能。
**6.3 代码分割**
通过代码分割（Code Splitting）减少首次加载的JavaScript体积，提高页面加载速度。
**示例：使用React.lazy和Suspense**
import React, \{ Suspense, lazy \} from 'react';import ReactDOM from 'react-dom';
const LazyComponent = lazy(() =\> import('./LazyComponent'));
ReactDOM.hydrate( \<Suspense fallback=\{\<div\>加载中...\</div\>\}\> \<LazyComponent /\> \</Suspense\>, document.getElementById('root'));
**6.4 服务器性能优化**

- **使用高性能服务器**：
    - 选择高效的Node.js服务器，优化服务器配置，提升渲染速度。
- **异步渲染**：
    - 使用异步数据预取和渲染，提高并发处理能力。

**6.5 静态资源优化**

- **压缩和缩小**：
    - 压缩JavaScript和CSS文件，减少传输体积。
- **使用CDN**：
    - 将静态资源部署到内容分发网络（CDN），缩短资源加载时间。

**7. 实际应用场景中的SSR优势**
**7.1 内容丰富的博客和新闻网站**
这些网站依赖于搜索引擎流量，SSR能够确保搜索引擎爬虫能够正确抓取和索引内容，提高网站的SEO表现。
**示例：Next.js博客**
Next.js非常适合构建博客，支持静态生成（Static Generation）和服务器端渲染，结合Markdown文件，实现高效内容管理和渲染。
**7.2 电子商务平台**
电子商务网站需要快速加载以提升用户体验，特别是在移动设备上。SSR可以显著提升首次渲染速度，减少用户等待时间。
**示例：React + Redux SSR电子商务应用**
结合Redux进行状态管理，通过服务器预取购物车数据、商品列表等，快速呈现完整页面。
**7.3 社交媒体和实时应用**
社交媒体平台需要处理大量的动态内容和用户交互。SSR可以提升初始页面加载速度，提升用户体验。
**示例：React SSR + WebSocket**
结合SSR和WebSocket，实现初始内容的快速加载和实时更新，提供流畅的用户体验。
**7.4 企业级仪表盘和管理系统**
这些应用通常需要展示大量的数据和复杂的交互。SSR可以优化数据加载和渲染，提高整体性能和响应速度。
**示例：React SSR + GraphQL**
使用GraphQL进行高效的数据查询，通过SSR预取关键数据，快速渲染仪表盘。

**8. 实操建议与最佳实践**
**8.1 使用成熟的框架**
尽量使用成熟的SSR框架如**Next.js**，它提供了开箱即用的SSR支持，简化了配置和开发过程，同时拥有活跃的社区和丰富的插件生态。
**8.2 处理数据预取**
确保在服务器渲染之前预取所有必要的数据，避免在客户端进行重复请求。可以使用getServerSideProps（Next.js）或手动在服务器上预取数据。
**8.3 优化初始加载**
通过代码分割、懒加载和资源压缩等手段，减少首次加载的JavaScript和CSS体积，提升页面加载速度。
**8.4 管理状态**
结合状态管理工具如**Redux**或**MobX**，在服务器和客户端之间同步状态，确保一致性和可预测性。
**8.5 实现缓存策略**
结合页面缓存和数据缓存，减少服务器的渲染负担，提升响应速度。可以使用内存缓存、Redis等缓存工具。
**8.6 监控和日志**
在生产环境中，监控SSR的性能和错误，及时发现和解决问题。可以使用日志记录工具和性能监控服务。
**8.7 考虑渐进增强**
在实现SSR的同时，保持应用在没有JavaScript支持的情况下仍然可用，实现渐进增强，提升应用的兼容性和可访问性。

**9. 示例项目：使用Next.js实现SSR**
以下是一个使用Next.js构建的简单SSR项目示例，展示了数据预取和页面渲染的过程。
**9.1 创建Next.js项目**
npx create-next-app my-next-ssr-appcd my-next-ssr-appnpm run dev
**9.2 编写首页组件**
**pages/index.js**
import React from 'react';
const Home = (\{ posts \}) =\> \{ return ( \<div\> \<h1\>Next.js SSR 示例\</h1\> \<ul\> \{posts.map(post =\> ( \<li key=\{post.id\}\>\{post.title\}\</li\> ))\} \</ul\> \</div\> );\};
export async function getServerSideProps() \{ // 从API获取数据 const res = await fetch('https://jsonplaceholder.typicode.com/posts'); const posts = await res.json();
return \{ props: \{ posts: posts.slice(0, 10) // 只取前10条 \} \};\}
export default Home;
**9.3 运行并访问**
启动开发服务器：
npm run dev
访问 http://localhost:3000，您将看到服务器端渲染的页面，包含预先加载的帖子列表。

**10. 总结**
使用React实现服务器端渲染（SSR）是一种有效提升应用性能、SEO表现和用户体验的技术手段。通过在服务器上预先渲染React组件，可以确保页面内容的快速加载和搜索引擎的良好抓取。同时，结合成熟的框架如Next.js，可以大幅简化SSR的实现过程，提升开发效率和代码维护性。
在实际项目中，选择是否使用SSR应基于具体需求，如SEO要求、首次加载性能、应用复杂度和开发资源等因素。对于内容丰富、SEO敏感的应用，SSR无疑是一个强有力的工具。而对于高度动态和交互密集的应用，可以结合SSR和CSR的优势，实现更佳的用户体验。
通过深入理解SSR的原理和实践方法，开发者可以更好地利用React的强大功能，构建高效、可维护和性能优越的现代Web应用。
 \> 来自 \<[https://chatgpt.com/c/677e0e2c-71c4-8004-b340-26e0f8bae043](https://chatgpt.com/c/677e0e2c-71c4-8004-b340-26e0f8bae043)\>

:::
