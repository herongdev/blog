---
title: Vite + Vue 3 国际化（i18n）完整实战教程
date: 2025-10-11
categories:
  - 前端国际化
tags:
  - Vue 3
  - Vite
  - vue-i18n
  - 国际化
  - i18n
---

## 概述

在 Vite + Vue 3 项目中实现国际化（i18n）可以使用 `vue-i18n` 库。本文将从零开始，详细讲解如何配置 Vue I18n、组织语言资源、实现语言切换，以及在组件中正确使用翻译功能。

---

## 一、安装依赖

```bash
npm install vue-i18n@9
# 或
pnpm add vue-i18n@9
```

> **注意**：Vue 3 项目必须使用 vue-i18n@9 版本。

---

## 二、目录结构

推荐的目录组织方式：

```
src/
├── locales/
│   ├── index.ts          # i18n 实例与配置
│   ├── en-US.json        # 英语翻译
│   ├── zh-CN.json        # 简体中文翻译
│   └── ja-JP.json        # 日语翻译
├── main.ts               # 应用入口
└── components/
    └── LanguageSwitcher.vue  # 语言切换组件
```

---

## 三、创建语言文件

### 1️⃣ 创建语言 JSON 文件

```json
// src/locales/zh-CN.json
{
  "lang": {
    "label": "简体中文",
    "code": "zh-CN"
  },
  "common": {
    "confirm": "确定",
    "cancel": "取消",
    "save": "保存",
    "delete": "删除"
  },
  "user": {
    "login": "登录",
    "logout": "退出登录",
    "profile": "个人信息"
  },
  "message": {
    "saveSuccess": "保存成功",
    "deleteConfirm": "确定要删除吗？"
  }
}
```

```json
// src/locales/en-US.json
{
  "lang": {
    "label": "English (US)",
    "code": "en-US"
  },
  "common": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete"
  },
  "user": {
    "login": "Login",
    "logout": "Logout",
    "profile": "Profile"
  },
  "message": {
    "saveSuccess": "Save successfully",
    "deleteConfirm": "Are you sure to delete?"
  }
}
```

---

## 四、配置 Vue I18n 实例

### 1️⃣ 创建 i18n 配置文件

```ts
// src/locales/index.ts
import { createI18n } from "vue-i18n";

// 复杂逻辑：动态导入所有语言文件
const modules = import.meta.glob("./*.json", { eager: true });

// 复杂逻辑：生成 messages 对象
const messages: Record<string, any> = {};
const SUPPORT_LOCALES: string[] = [];

for (const path in modules) {
  const locale = path.replace(/^\.\/(.+)\.json$/, "$1");
  messages[locale] = (modules[path] as any).default;
  SUPPORT_LOCALES.push(locale);
}

// 复杂逻辑：从 localStorage 或浏览器获取默认语言
const getDefaultLocale = (): string => {
  const saved = localStorage.getItem("locale");
  if (saved && SUPPORT_LOCALES.includes(saved)) {
    return saved;
  }

  // 浏览器语言匹配
  const browserLang = navigator.language;
  if (SUPPORT_LOCALES.includes(browserLang)) {
    return browserLang;
  }

  // 尝试匹配语言前缀（如 'zh' 匹配 'zh-CN'）
  const langPrefix = browserLang.split("-")[0];
  const matched = SUPPORT_LOCALES.find((locale) =>
    locale.startsWith(langPrefix)
  );

  return matched || "en-US"; // 默认英语
};

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  globalInjection: true, // 全局注入 $t, $d, $n 等方法
  locale: getDefaultLocale(), // 默认语言
  fallbackLocale: "en-US", // 回退语言
  messages, // 语言包
  // 可选：日期时间格式化
  datetimeFormats: {
    "en-US": {
      short: { year: "numeric", month: "short", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    "zh-CN": {
      short: { year: "numeric", month: "2-digit", day: "2-digit" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
  },
  // 可选：数字格式化
  numberFormats: {
    "en-US": {
      currency: { style: "currency", currency: "USD" },
      decimal: { style: "decimal", minimumFractionDigits: 2 },
    },
    "zh-CN": {
      currency: { style: "currency", currency: "CNY" },
      decimal: { style: "decimal", minimumFractionDigits: 2 },
    },
  },
});

export default i18n;
export { SUPPORT_LOCALES };
```

---

## 五、在应用中注册 i18n

```ts
// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./locales";

const app = createApp(App);

app.use(i18n);

app.mount("#app");
```

---

## 六、切换语言时的同步更新

### 1️⃣ 创建语言切换工具函数

```ts
// src/utils/i18nHelper.ts
import i18n from "@/locales";
import axios from "axios";

// 复杂逻辑：切换语言并同步更新所有相关配置
export const setLocale = (locale: string) => {
  // 1. 更新 i18n locale
  i18n.global.locale.value = locale;

  // 2. 更新 localStorage
  localStorage.setItem("locale", locale);

  // 3. 更新 HTML lang 属性
  document.documentElement.lang = locale;

  // 4. 更新 axios 请求头
  axios.defaults.headers.common["Accept-Language"] = locale;
};

// 复杂逻辑：初始化时同步所有配置
export const initLocale = () => {
  const currentLocale = i18n.global.locale.value;
  setLocale(currentLocale);
};

// 翻译函数快捷方式
export const tr = (key: string, params?: Record<string, any>) =>
  i18n.global.t(key, params ?? {});
```

### 2️⃣ 在应用启动时初始化

```ts
// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./locales";
import { initLocale } from "./utils/i18nHelper";

const app = createApp(App);

app.use(i18n);

// 复杂逻辑：初始化语言配置
initLocale();

app.mount("#app");
```

---

## 七、创建语言切换组件

```vue
<!-- src/components/LanguageSwitcher.vue -->
<template>
  <a-select
    v-model:value="currentLocale"
    style="width: 160px"
    @change="handleLocaleChange"
  >
    <a-select-option
      v-for="locale in supportedLocales"
      :key="locale"
      :value="locale"
    >
      {{ getLocaleLabel(locale) }}
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/locales";
import { setLocale } from "@/utils/i18nHelper";

const { locale, messages } = useI18n();

// 当前语言
const currentLocale = computed({
  get: () => locale.value,
  set: (val) => {
    locale.value = val;
  },
});

// 支持的语言列表
const supportedLocales = ref(SUPPORT_LOCALES);

// 复杂逻辑：从语言文件中读取语言标签
const getLocaleLabel = (locale: string): string => {
  const langData = messages.value[locale] as any;
  return langData?.lang?.label || locale;
};

// 复杂逻辑：切换语言并同步所有配置
const handleLocaleChange = (newLocale: string) => {
  setLocale(newLocale);

  // 可选：刷新页面以确保所有内容更新
  // window.location.reload()
};
</script>
```

---

## 八、在组件中使用翻译

### 1️⃣ 模板中使用（globalInjection: true）

```vue
<template>
  <div>
    <!-- 直接使用 $t -->
    <h1>{{ $t("user.profile") }}</h1>

    <!-- 使用插值 -->
    <p>{{ $t("message.welcome", { name: userName }) }}</p>

    <!-- 日期格式化 -->
    <p>{{ $d(new Date(), "long") }}</p>

    <!-- 数字格式化 -->
    <p>{{ $n(1234.56, "currency") }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const userName = ref("张三");
</script>
```

### 2️⃣ Composition API 中使用

```vue
<template>
  <div>
    <button @click="handleSave">{{ t("common.save") }}</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Modal } from "ant-design-vue";

const { t } = useI18n();

const handleSave = () => {
  Modal.confirm({
    title: t("message.deleteConfirm"),
    okText: t("common.confirm"),
    cancelText: t("common.cancel"),
    onOk: () => {
      console.log(t("message.saveSuccess"));
    },
  });
};
</script>
```

### 3️⃣ 在 JS/TS 文件中使用

```ts
// 方法1：使用辅助函数
import { tr } from "@/utils/i18nHelper";

const message = tr("message.saveSuccess");
console.log(message);

// 方法2：直接使用 i18n 实例
import i18n from "@/locales";

const message = i18n.global.t("message.saveSuccess");
console.log(message);
```

---

## 九、配置 Axios 拦截器

```ts
// src/api/axios.ts
import axios from "axios";
import i18n from "@/locales";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器：自动添加语言头
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.global.locale.value;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
```

---

## 十、TypeScript 类型支持

### 1️⃣ 创建类型声明文件

```ts
// src/types/i18n.d.ts
import "vue-i18n";
import type zhCN from "@/locales/zh-CN.json";

declare module "vue-i18n" {
  // 定义消息类型
  export interface DefineLocaleMessage {
    [key: string]: any;
  }

  // 启用类型检查和自动补全
  export interface I18nOptions {
    locale: string;
    messages: {
      "zh-CN": typeof zhCN;
      "en-US": typeof zhCN;
      [key: string]: any;
    };
  }
}
```

---

## 十一、常见问题与最佳实践

### ❓ Q1：为什么要设置 `legacy: false`？

**A**：`legacy: false` 启用 Composition API 模式，这是 Vue 3 推荐的方式，提供更好的类型推断和 Tree-shaking 支持。

### ❓ Q2：`globalInjection: true` 的作用？

**A**：启用后可以在模板中直接使用 `$t`、`$d`、`$n` 等全局方法，无需在每个组件中 `import { useI18n }`。

### ❓ Q3：如何处理语言切换后的页面刷新？

**A**：大多数情况下无需刷新，但如果有缓存的翻译内容（如从后端获取的数据），可以：

- 监听语言变化，重新请求数据
- 或在切换后执行 `window.location.reload()`

### ❓ Q4：如何实现按需加载语言包？

```ts
// src/locales/index.ts
const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`./${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  return messages.default;
};

export const setLocale = async (locale: string) => {
  // 如果语言包未加载，先加载
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale);
  }

  i18n.global.locale.value = locale;
  localStorage.setItem("locale", locale);
  document.documentElement.lang = locale;
};
```

### ✅ 最佳实践

1. **语言文件命名**：使用 IETF BCP 47 标准（如 `en-US`、`zh-CN`）
2. **翻译键命名**：使用点号分隔的层级结构（如 `user.profile.title`）
3. **导出语言标签**：在每个语言文件中包含 `lang.label` 字段
4. **同步更新**：切换语言时同步更新 HTML lang、axios 请求头、localStorage
5. **类型安全**：使用 TypeScript 定义翻译消息类型
6. **回退策略**：始终设置 `fallbackLocale` 以避免翻译缺失

---

## 十二、完整项目示例

### 目录结构

```
src/
├── locales/
│   ├── index.ts
│   ├── en-US.json
│   └── zh-CN.json
├── utils/
│   └── i18nHelper.ts
├── components/
│   └── LanguageSwitcher.vue
├── api/
│   └── axios.ts
├── types/
│   └── i18n.d.ts
└── main.ts
```

### 语言切换流程图

```
用户选择语言
    ↓
调用 setLocale(newLocale)
    ↓
├─ 更新 i18n.global.locale.value
├─ 更新 localStorage.setItem('locale', newLocale)
├─ 更新 document.documentElement.lang
└─ 更新 axios.defaults.headers['Accept-Language']
    ↓
Vue 自动重新渲染所有使用 $t 的组件
```

---

## 结语

通过本教程，你已经掌握了在 Vite + Vue 3 项目中实现完整国际化的方法。关键要点：

✅ 使用 `vue-i18n@9` 配合 Vue 3  
✅ 启用 `legacy: false` 和 `globalInjection: true`  
✅ 使用 `import.meta.glob` 动态加载语言文件  
✅ 切换语言时同步更新所有相关配置  
✅ 在语言文件中导出语言标签供选择器使用

现在你可以为你的项目添加多语言支持了！🌍
