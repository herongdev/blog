import{_ as s,o as l,c as p,j as n,a}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"dash命令原理","description":"当我们全局安装一个包之后，如 npm I create react app g 后，会在 C:\\\\Users\\\\RONG\\\\AppData\\\\Roaming\\\\npm 下创建一个 create react app.cmd 命令； 当我们执行 create react app 时，就会执行其。","frontmatter":{"title":"dash命令原理","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"当我们全局安装一个包之后，如 npm I create react app g 后，会在 C:\\\\Users\\\\RONG\\\\AppData\\\\Roaming\\\\npm 下创建一个 create react app.cmd 命令； 当我们执行 create react app 时，就会执行其。","sidebarWeight":65,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/创建react项目 /dash命令原理.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/创建react项目/dash命令原理.md","filePath":"posts/React系统教程/01-核心概念与组件/创建react项目/dash命令原理.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/创建react项目/dash命令原理.md"};function c(i,e,o,r,d,u){return l(),p("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"dash命令原理",tabindex:"-1"},[a("dash命令原理 "),n("a",{class:"header-anchor",href:"#dash命令原理","aria-label":'Permalink to "dash命令原理"'},"​")]),n("blockquote",null,[n("p",null,[a("本节目标：理解“dash命令原理”的核心思路，并能把它用于实际开发或面试表达。 当我们全局安装一个包之后，如"),n("code",null,"npm I create-react-app -g"),a("后，会在"),n("code",null,"C:\\Users\\RONG\\AppData\\Roaming\\npm"),a("下创建一个"),n("code",null,"create-react-app.cmd"),a("命令；")])]),n("p",null,[a("当我们执行"),n("code",null,"create-react-app"),a("时，就会执行其中的代码，其中就会指示运行这个脚本的程序，比如"),n("code",null,"node"),a('，如下： @ECHO off SETLOCAL CALL :find_dp0 IF EXIST "%dp0%\\node.exe" ( SET "_prog=%dp0%\\node.exe" ) ELSE ( SET "_prog=node" SET PATHEXT=%PATHEXT:;.JS;=;% ) "%_prog%" "%dp0%\\node_modules\\create-react-app\\index.js" %* ENDLOCAL EXIT /b %errorlevel% :find_dp0 SET dp0=%~dp0 EXIT /b')]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'从代码中可以看出，最终会执行"%dp0%\\node_modules\\create-react-app\\index.js" 这个js脚本；')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"由于create-react-app是全局安装的，所以，执行的是C:\\Users\\RONG\\AppData\\Roaming\\npm\\node_modules下的create-react-app/index.js文件；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"#!/usr/bin/env node")]),a(`
`),n("span",{class:"line"},[n("span",null,"/**")]),a(`
`),n("span",{class:"line"},[n("span",null," * Copyright (c) 2015-present, Facebook, Inc.")]),a(`
`),n("span",{class:"line"},[n("span",null," *")]),a(`
`),n("span",{class:"line"},[n("span",null," * This source code is licensed under the MIT license found in the")]),a(`
`),n("span",{class:"line"},[n("span",null," * LICENSE file in the root directory of this source tree.")]),a(`
`),n("span",{class:"line"},[n("span",null," */")]),a(`
`),n("span",{class:"line"},[n("span",null,"// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")]),a(`
`),n("span",{class:"line"},[n("span",null,"//   /!\\ DO NOT MODIFY THIS FILE /!\\")]),a(`
`),n("span",{class:"line"},[n("span",null,"// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// create-react-app is installed globally on people's computers. This means")]),a(`
`),n("span",{class:"line"},[n("span",null,"// that it is extremely difficult to have them upgrade the version and")]),a(`
`),n("span",{class:"line"},[n("span",null,"// because there's only one global version installed, it is very prone to")]),a(`
`),n("span",{class:"line"},[n("span",null,"// breaking changes.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// The only job of create-react-app is to init the repository and then")]),a(`
`),n("span",{class:"line"},[n("span",null,"// forward all the commands to the local version of create-react-app.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// If you need to add a new command, please add it to the scripts/ folder.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// The only reason to modify this file is to add more warnings and")]),a(`
`),n("span",{class:"line"},[n("span",null,"// troubleshooting information for the `create-react-app` command.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// Do not make breaking changes! We absolutely don't want to have to")]),a(`
`),n("span",{class:"line"},[n("span",null,"// tell people to update their global version of create-react-app.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// Also be careful with new language features.")]),a(`
`),n("span",{class:"line"},[n("span",null,"// This file must work on Node 0.10+.")]),a(`
`),n("span",{class:"line"},[n("span",null,"//")]),a(`
`),n("span",{class:"line"},[n("span",null,"// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")]),a(`
`),n("span",{class:"line"},[n("span",null,"//   /!\\ DO NOT MODIFY THIS FILE /!\\")]),a(`
`),n("span",{class:"line"},[n("span",null,"// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")]),a(`
`),n("span",{class:"line"},[n("span",null,"'use strict';")]),a(`
`),n("span",{class:"line"},[n("span",null,"var currentNodeVersion = process.versions.node;")]),a(`
`),n("span",{class:"line"},[n("span",null,"var semver = currentNodeVersion.split('.');")]),a(`
`),n("span",{class:"line"},[n("span",null,"var major = semver[0];")]),a(`
`),n("span",{class:"line"},[n("span",null,"if (major < 8) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  console.error(")]),a(`
`),n("span",{class:"line"},[n("span",null,"    'You are running Node ' +")]),a(`
`),n("span",{class:"line"},[n("span",null,"      currentNodeVersion +")]),a(`
`),n("span",{class:"line"},[n("span",null,"      '.\\n' +")]),a(`
`),n("span",{class:"line"},[n("span",null,"      'Create React App requires Node 8 or higher. \\n' +")]),a(`
`),n("span",{class:"line"},[n("span",null,"      'Please update your version of Node.'")]),a(`
`),n("span",{class:"line"},[n("span",null,"  );")]),a(`
`),n("span",{class:"line"},[n("span",null,"  process.exit(1);")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")]),a(`
`),n("span",{class:"line"},[n("span",null,"require('./createReactApp');")])])])]),n("p",null,"最后一个命含中引入了createReactApp这个文件； 这里是所有创建react-app的重要逻辑；")],-1)])])}const g=s(t,[["render",c]]);export{m as __pageData,g as default};
