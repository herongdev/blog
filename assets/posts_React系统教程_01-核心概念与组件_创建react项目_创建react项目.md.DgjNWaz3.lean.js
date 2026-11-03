import{_ as l,o as e,c as t,j as s,a}from"./chunks/framework.hJBPIJiS.js";const g=JSON.parse('{"title":"创建react项目","description":"围绕“创建react项目”整理的概念、示例与实践笔记。","frontmatter":{"title":"创建react项目","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“创建react项目”整理的概念、示例与实践笔记。","sidebarWeight":66,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/创建react项目 /创建react项目.md","navbar":false},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/创建react项目/创建react项目.md","filePath":"posts/React系统教程/01-核心概念与组件/创建react项目/创建react项目.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/创建react项目/创建react项目.md"};function i(c,n,r,u,o,d){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"创建react项目",tabindex:"-1"},[a("创建react项目 "),s("a",{class:"header-anchor",href:"#创建react项目","aria-label":'Permalink to "创建react项目"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“创建react项目”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"一、npx命令或yarn create命令")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"npx create-react-app my-app")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"cd my-app")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"npm start")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"生成的项目目录结构如下：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"已经帮我们安装好了相关依赖；")]),a(`
`),s("span",{class:"line"},[s("span",null,"其中还生成了git仓库；")]),a(`
`),s("span",{class:"line"},[s("span",null,"package.json")]),a(`
`),s("span",{class:"line"},[s("span",null,"{")]),a(`
`),s("span",{class:"line"},[s("span",null,'  "name": "my-react-demo",')]),a(`
`),s("span",{class:"line"},[s("span",null,'  "version": "0.1.0",')]),a(`
`),s("span",{class:"line"},[s("span",null,'  "private": true,')]),a(`
`),s("span",{class:"line"},[s("span",null,'  "dependencies": {')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "@testing-library/jest-dom": "^5.11.4",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "@testing-library/react": "^11.1.0",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "@testing-library/user-event": "^12.1.10",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "react": "^17.0.2",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "react-dom": "^17.0.2",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "react-scripts": "4.0.3",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "web-vitals": "^1.0.1"')]),a(`
`),s("span",{class:"line"},[s("span",null,"  },")]),a(`
`),s("span",{class:"line"},[s("span",null,'  "scripts": {')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "start": "react-scripts start",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "build": "react-scripts build",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "test": "react-scripts test",')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "eject": "react-scripts eject"')]),a(`
`),s("span",{class:"line"},[s("span",null,"  },")]),a(`
`),s("span",{class:"line"},[s("span",null,'  "eslintConfig": {')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "extends": [')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "react-app",')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "react-app/jest"')]),a(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),a(`
`),s("span",{class:"line"},[s("span",null,"  },")]),a(`
`),s("span",{class:"line"},[s("span",null,'  "browserslist": {')]),a(`
`),s("span",{class:"line"},[s("span",null,'    "production": [')]),a(`
`),s("span",{class:"line"},[s("span",null,'      ">0.2%",')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "not dead",')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "not op_mini all"')]),a(`
`),s("span",{class:"line"},[s("span",null,"    ],")]),a(`
`),s("span",{class:"line"},[s("span",null,'    "development": [')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "last 1 chrome version",')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "last 1 firefox version",')]),a(`
`),s("span",{class:"line"},[s("span",null,'      "last 1 safari version"')]),a(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),a(`
`),s("span",{class:"line"},[s("span",null,"  }")]),a(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const v=l(p,[["render",i]]);export{g as __pageData,v as default};
