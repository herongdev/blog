---
title: npm 脚本的 post 钩子机制与自动打包压缩实战
date: 2025-09-23
---

## 核心原理：npm 生命周期钩子

**npm（含 pnpm/yarn）脚本有"生命周期钩子"**：任何脚本名 `x`，都会在执行 `npm run x` 时自动寻找并依次执行：

1. `prex` （先执行）
2. `x` （主体脚本）
3. `postx`（最后执行）

这不是保留字列表，而是**通用于任意脚本名**。所以你有 `build-only`，就能写 `prebuild-only` / `postbuild-only`。

### 极简示例

```json
{
  "scripts": {
    "foo": "echo run foo",
    "postfoo": "echo after foo"
  }
}
```

运行 `npm run foo` 的输出顺序：

```
run foo
after foo
```

### 什么时候不会触发？

- **直接调用底层命令**不会触发生命周期：例如运行 `vite build`（绕过了 `npm run build-only`），`postbuild-only` 就不会被执行
- 同理：只有在执行 `npm|pnpm run build` 时，才会触发 `postbuild`

---

## 实战应用：自动打包压缩

### 方案一：使用 PowerShell 自动压缩

在 `package.json` 中添加：

```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "powershell -NoProfile -Command \"Remove-Item -Force dist.zip -ErrorAction SilentlyContinue; Compress-Archive -Path dist\\* -DestinationPath dist.zip -Force\"",
    "build-only": "vite build",
    "postbuild-only": "powershell -NoProfile -Command \"Remove-Item -Force dist.zip -ErrorAction SilentlyContinue; Compress-Archive -Path dist\\* -DestinationPath dist.zip -Force\""
  }
}
```

### 方案二：显式串行脚本

```json
{
  "scripts": {
    "build": "vite build",
    "zip": "powershell -NoProfile -Command \"Remove-Item -Force dist.zip -ErrorAction SilentlyContinue; Compress-Archive -Path dist\\* -DestinationPath dist.zip -Force\"",
    "build:zip": "npm run build --silent && npm run zip"
  }
}
```

---

## 解决 Windows 下的构建问题

### 1. 移除有问题的 zip 插件

如果遇到 `vite-plugin-zip-file` 在 Windows 上的 `EPERM` 错误：

```ts
// ❌ 删除或注释这行
/* import zipPlugin from 'vite-plugin-zip-file' */

// ❌ 从 plugins 数组里删除该插件调用
/* zipPlugin({ ... }) */
```

### 2. 处理大包警告

在 `vite.config.ts` 中：

```ts
export default defineConfig({
  build: {
    // 调高警告阈值
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // node_modules 统一拆分
          if (id.includes("node_modules")) {
            // 常见大库单独拆分，便于长期缓存
            if (id.includes("react")) return "vendor-react";
            if (id.includes("vue")) return "vendor-vue";
            if (id.includes("antd")) return "vendor-antd";
            if (id.includes("echarts")) return "vendor-echarts";
            if (id.includes("lodash")) return "vendor-lodash";
            return "vendor";
          }
          // 路由级页面独立成异步 chunk
          if (id.includes("/src/pages/")) {
            const m = id.split("/src/pages/")[1]?.split("/")[0];
            return m ? `page-${m}` : "page-misc";
          }
        },
      },
    },
  },
});
```

### 3. Windows 权限问题处理

如果遇到文件权限问题，在命令行执行一次：

```powershell
attrib -R -S -H .\dist /S /D
```

---

## 进一步优化

### 按需引入和代码分割

- **按需引入** UI 组件：`import { Button } from 'antd'`
- **动态导入**路由级页面：
  ```ts
  const UserPage = () => import("@/pages/user");
  ```

### 服务器侧清理

```powershell
# 清理构建产物
rm -r -fo .\dist
# 如果提示权限，先执行
attrib -R -S -H .\dist /S /D
rm -r -fo .\dist
```

---

## 总结

- `pre* / post*` 是 npm 脚本的**生命周期钩子机制**，对任何脚本名都生效
- 只要通过 `npm|pnpm run <name>` 执行，`post<name>` 就会在 `<name>` 成功后自动执行
- 使用 PowerShell 的 `Compress-Archive` 替代第三方插件，避免 Windows 权限问题
- 合理配置 `manualChunks` 可以有效控制包体积和缓存策略
