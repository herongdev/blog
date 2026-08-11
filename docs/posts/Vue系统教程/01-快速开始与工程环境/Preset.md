---
title: "Preset"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。 在 vue create 过程中保存的 preset 会被放在你的 home 目录下的一个配置文件中 。你可以通过直接编辑这个文件来调整、添加、删除保。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-cli/Preset.md"
---
::: v-pre

# Preset

> 本节目标：理解“Preset”的核心思路，并能把它用于实际开发或面试表达。
==一个== `Vue CLI preset` ==是一个包含创建新项目所需预定义选项和插件的== `JSON` ==对象，让用户无需在命令提示中选择它们。==

==在== `vue create` ==过程中保存的== `preset` ==会被放在你的== `home` ==目录下的一个配置文件中==

```
 (~/.vuerc)
```

==。你可以通过直接编辑这个文件来调整、添加、删除保存好的== `preset`==。==

==这里有一个== `preset` ==的示例：==

```
{
  "useConfigFiles": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": [
        "save",
        "commit"
      ]
    },
    "@vue/cli-plugin-router": {},
    "@vue/cli-plugin-vuex": {}
  }
}
```

`Preset` ==的数据会被插件生成器用来生成相应的项目文件。除了上述这些字段，你也可以为集成工具添加配置：==

```
{
  "useConfigFiles": true,
  "plugins": {...},
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    "jest": {...}
  }
}
```

==这些额外的配置将会根据== `useConfigFiles` ==的值被合并到== `package.json` ==或相应的配置文件中。例如，当== `"useConfigFiles": true` ==的时候，==`configs` ==的值将会被合并到== `vue.config.js` ==中。==

```
#Preset
```

==插件的版本管理==
==你可以显式地指定用到的插件的版本：==

```
{"plugins":{"@vue/cli-plugin-eslint":{"version":"^3.0.0",// ...
```

该插件的其它选项`}}}`
==注意对于官方插件来说这不是必须的——当被忽略时，==`CLI` ==会自动使用== `registry` ==中最新的版本。不过我们推荐为== `preset` ==列出的所有第三方插件提供显式的版本范围。==

```
#
```

==允许插件的命令提示==
==每个插件在项目创建的过程中都可以注入它自己的命令提示，不过当你使用了一个== `preset`==，这些命令提示就会被跳过，因为== `Vue CLI` ==假设所有的插件选项都已经在== `preset` ==中声明过了。==
==在有些情况下你可能希望== `preset` ==只声明需要的插件，同时让用户通过插件注入的命令提示来保留一些灵活性。==
==对于这种场景你可以在插件选项中指定== `"prompts": true` ==来允许注入命令提示：==

```
{
  "plugins": {
    "@vue/cli-plugin-eslint": {
      //
```

让用户选取他们自己的

```
 ESLint config
      "prompts": true
    }
  }
}
```

```
#
```

==远程== `Preset`
==你可以通过发布== `git repo` ==将一个== `preset` ==分享给其他开发者。这个== `repo` ==应该包含以下文件：==

- ```
    preset.json:
    ```

    ==包含== `preset` ==数据的主要文件（必需）。==
- ```
    generator.js:
    ```

    ==一个可以注入或是修改项目中文件的==

    ```
    Generator
    ```

    ==。==
- `prompts.js` ==一个可以通过命令行对话为== `generator` ==收集选项的==

    ```
    prompts
    ```

    ==文件====。==

==发布== `repo` ==后，你就可以在创建项目的时候通过== `--preset` ==选项使用这个远程的== `preset` ==了：==
`#` 从 `GitHub repo` 使用

```
 preset
vue create --preset username/repo my-project
GitLab
```

==和== `BitBucket` ==也是支持的。如果要从私有== `repo` ==获取，请确保使用== `--clone` ==选项：==

```
vue create --preset gitlab:username/repo --clone my-projectvue create --preset bitbucket:username/repo --clone my-project
#
```

私有服务器

```
vue create --preset gitlab:my-gitlab-server.com:group/projectname --clone my-projectvue create --preset direct:ssh://git@my-gitlab-server.com/group/projectname.git --clone my-project
```

```
#
```

==加载文件系统中的== `Preset`
==当开发一个远程== `preset` ==的时候，你必须不厌其烦的向远程== `repo` ==发出== `push` ==进行反复测试。为了简化这个流程，你也可以直接在本地测试== `preset`==。如果== `--preset` ==选项的值是一个相对或绝对文件路径，或是以== `.json` ==结尾，则== `Vue CLI` ==会加载本地的== `preset`==：==
`# ./my-preset` 应当是一个包含 `preset.json` 的文件夹

```
vue create --preset ./my-preset my-project
#
```

或者，直接使用当前工作目录下的 `json` 文件：
`vue create --preset my-preset.json my-project`
 \> 来自

```
 <https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E8%BF%9C%E7%A8%8B-preset>
```

:::
