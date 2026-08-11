---
title: "dash命令原理"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "当我们全局安装一个包之后，如 npm I create react app g 后，会在 C:\\Users\\RONG\\AppData\\Roaming\\npm 下创建一个 create react app.cmd 命令； 当我们执行 create react app 时，就会执行其。"
sidebarWeight: 65
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/创建react项目 /dash命令原理.md"
---
::: v-pre

# dash命令原理

> 本节目标：理解“dash命令原理”的核心思路，并能把它用于实际开发或面试表达。
当我们全局安装一个包之后，如`npm I create-react-app -g`后，会在`C:\Users\RONG\AppData\Roaming\npm`下创建一个`create-react-app.cmd`命令；

当我们执行`create-react-app`时，就会执行其中的代码，其中就会指示运行这个脚本的程序，比如`node`，如下：
@ECHO off
SETLOCAL
CALL :find_dp0
IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)
"%_prog%"  "%dp0%\node_modules\create-react-app\index.js" %*
ENDLOCAL
EXIT /b %errorlevel%
:find_dp0
SET dp0=%~dp0
EXIT /b

```
从代码中可以看出，最终会执行"%dp0%\node_modules\create-react-app\index.js" 这个js脚本；
```

```
由于create-react-app是全局安装的，所以，执行的是C:\Users\RONG\AppData\Roaming\npm\node_modules下的create-react-app/index.js文件；
```

```
#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// create-react-app is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// The only job of create-react-app is to init the repository and then
// forward all the commands to the local version of create-react-app.
//
// If you need to add a new command, please add it to the scripts/ folder.
//
// The only reason to modify this file is to add more warnings and
// troubleshooting information for the `create-react-app` command.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of create-react-app.
//
// Also be careful with new language features.
// This file must work on Node 0.10+.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'use strict';
var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];
if (major < 8) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create React App requires Node 8 or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}
require('./createReactApp');
```

最后一个命含中引入了createReactApp这个文件；
这里是所有创建react-app的重要逻辑；

:::
