---
title: SVG 图标获取与使用实战：从下载到代码落地（HarmonyOS）
date: 2025-01-27
tags: [HarmonyOS, ArkTS, SVG, 图标, 实战]
---

# SVG 图标获取与使用实战：从下载到代码落地

> 本文提供一套「拿来就用」的完整流程，从图标资源获取、优化处理，到 HarmonyOS 项目中的代码实现，帮你快速落地 SVG 图标系统。

## 核心流程

```
1. 选择图标源 → 2. 下载 SVG → 3. 优化处理 → 4. 放入项目 → 5. 代码引用
```

---

## 步骤 1：获取 SVG 图标资源

### 推荐图标源

以下图标库均可商用（注意查看具体协议）：

#### 1️⃣ Material Symbols（Google）

- **地址**：[fonts.google.com/icons](https://fonts.google.com/icons)
- **特点**：官方、完整、风格统一
- **推荐款式**：Outlined（轮廓）、Rounded（圆角）
- **数量**：2500+ 图标

**使用步骤**：

```
1. 搜索关键词（如 "chat"）
2. 点击图标 → Download
3. 选择 SVG 格式下载
```

#### 2️⃣ Remix Icon

- **地址**：[remixicon.com](https://remixicon.com/)
- **特点**：精美、现代、开源
- **协议**：Apache License 2.0
- **数量**：2800+ 图标

**使用步骤**：

```
1. 搜索图标
2. 点击图标 → Copy SVG
3. 保存为 .svg 文件
```

#### 3️⃣ Iconify（聚合库）⭐ 推荐

- **地址**：[iconify.design](https://iconify.design/)
- **特点**：聚合多个图标库，一站式搜索
- **数量**：200,000+ 图标
- **包含**：Material Icons、Font Awesome、Remix Icon 等

**使用步骤**：

```
1. 搜索关键词（如 "mic"）
2. 点击图标 → Download → SVG
3. 选择 "Outlined/Line" 款式
```

### 选择建议

| 需求             | 推荐图标库       |
| ---------------- | ---------------- |
| 官方、稳定       | Material Symbols |
| 精美、现代       | Remix Icon       |
| 一站搜索、选择多 | Iconify ⭐       |

---

## 步骤 2：优化 SVG 文件

### 为什么需要优化？

- ❌ **原始 SVG**：包含无用的 metadata、注释、多余属性
- ❌ **多色 SVG**：无法用 `fillColor` 统一着色
- ❌ **没有 viewBox**：可能显示不完整

- ✅ **优化后**：体积更小、着色统一、显示完整

### 使用 SVGOMG 在线优化

#### 工具地址

[SVGOMG](https://jakearchibald.github.io/svgomg/)

#### 优化步骤

**1. 上传 SVG 文件**

```
点击 "Open SVG" → 选择下载的 SVG 文件
```

**2. 调整优化选项**

```
✅ Remove metadata          # 移除元数据
✅ Remove title              # 移除标题
✅ Remove desc               # 移除描述
✅ Remove comments           # 移除注释
✅ Remove hidden elements    # 移除隐藏元素
✅ Prefer viewBox            # 保留 viewBox（重要！）
❌ Remove viewBox            # 不要勾选
```

**3. 统一为纯黑色**

手动编辑代码（点击右上角 "Edit"）：

```xml
<!-- ❌ 错误：多色或渐变 -->
<path fill="#FF5722" d="..."/>
<path fill="url(#gradient)" d="..."/>

<!-- ✅ 正确：统一黑色 -->
<path fill="#000000" d="..."/>
<!-- 或者 -->
<path stroke="#000000" fill="none" d="..."/>
```

**4. 确保有 viewBox**

```xml
<!-- ✅ 正确格式 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000000" d="..."/>
</svg>
```

**5. 下载优化后的文件**

```
点击 "Download" → 保存为 icon_xxx.svg
```

### 优化前后对比

**优化前（500+ 字节）：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <title>chat icon</title>
  <desc>A chat bubble icon</desc>
  <metadata>...</metadata>
  <defs>...</defs>
  <path fill="#FF5722" d="M12 2C6.48..."/>
</svg>
```

**优化后（200 字节）：**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M12 2C6.48..."/>
</svg>
```

---

## 步骤 3：放入项目资源目录

### 目录结构

```
entry/src/main/resources/
  ├── base/
  │   ├── media/
  │   │   ├── icon_scenario.svg    # 情景对话
  │   │   ├── icon_mic.svg         # 麦克风
  │   │   ├── icon_user.svg        # 用户
  │   │   ├── icon_settings.svg    # 设置
  │   │   └── ...
```

### 命名规范

**规则：**

- ✅ 全小写字母
- ✅ 使用下划线分隔
- ✅ 前缀 `icon_`
- ❌ 不能有中文
- ❌ 不能有大写字母
- ❌ 不能有空格或特殊字符

**示例：**

```
✅ icon_home.svg
✅ icon_message.svg
✅ icon_settings.svg
✅ icon_user_filled.svg

❌ Home.svg           # 大写
❌ icon-home.svg      # 短横线
❌ 图标.svg           # 中文
❌ icon home.svg      # 空格
```

### 按功能分类（可选）

```
# 导航相关
icon_nav_home.svg
icon_nav_discover.svg
icon_nav_message.svg

# Tab 相关
icon_tab_home.svg
icon_tab_profile.svg

# 操作相关
icon_action_add.svg
icon_action_delete.svg
icon_action_edit.svg
```

---

## 步骤 4：代码实现

### 完整改造示例

以"首页菜单"为例，从 Emoji 改造为 SVG 图标。

#### 改造前（使用 Emoji）

```typescript
interface MenuItem {
  name: string;
  icon: string;    // Emoji 字符串
  route: string;
}

@Entry
@Component
struct HomePage {
  private menuItems: Array<MenuItem> = [
    { name: '情景对话', icon: '💬', route: 'pages/ScenarioDialogPage' },
    { name: '录音功能', icon: '🎙️', route: 'pages/RecorderPage' },
    { name: '个人中心', icon: '👤', route: '' },
    { name: '设置', icon: '⚙️', route: '' }
  ];

  @Builder
  MenuCard(item: MenuItem) {
    Column() {
      // ❌ 使用 Emoji
      Text(item.icon)
        .fontSize(40)

      Text(item.name)
        .fontSize(14)
    }
  }

  build() {
    Grid() {
      ForEach(this.menuItems, (item: MenuItem) => {
        GridItem() {
          this.MenuCard(item)
        }
      })
    }
  }
}
```

#### 改造后（使用 SVG）

**1. 修改类型定义**

```typescript
interface MenuItem {
  name: string;
  icon: Resource; // ⬅️ 改为 Resource 类型
  route: string;
  tint?: string; // ⬅️ 可选：自定义颜色
}
```

**2. 更新数据源**

```typescript
// 复杂逻辑：改为资源引用，这样就能用 Image 模板渲染和统一着色
private menuItems: Array<MenuItem> = [
  {
    name: '情景对话',
    icon: $r('app.media.icon_scenario'),
    route: 'pages/ScenarioDialogPage',
    tint: '#4A90E2'  // 蓝色
  },
  {
    name: '录音功能',
    icon: $r('app.media.icon_mic'),
    route: 'pages/RecorderPage',
    tint: '#E74C3C'  // 红色
  },
  {
    name: '个人中心',
    icon: $r('app.media.icon_user'),
    route: '',
    tint: '#2ECC71'  // 绿色
  },
  {
    name: '设置',
    icon: $r('app.media.icon_settings'),
    route: '',
    tint: '#95A5A6'  // 灰色
  }
];
```

**3. 修改渲染组件**

```typescript
@Builder
MenuCard(item: MenuItem) {
  Column() {
    // 复杂逻辑：使用模板渲染，颜色由 fillColor 控制；SVG 需为单色以确保正确着色
    Image(item.icon)
      .width(80)
      .height(80)
      .renderMode(ImageRenderMode.Template) // 把 SVG 当"模板图标"渲染
      .fillColor(item.tint ?? '#4A90E2')    // 统一主题色（带默认值）
      .borderRadius(16)
      .backgroundColor('#F5F5F5')

    Text(item.name)
      .fontSize(14)
      .fontColor('#333333')
      .margin({ top: 8 })
  }
  .width(100)
  .height(120)
  .padding(10)
  .onClick(() => {
    if (item.route) {
      router.pushUrl({ url: item.route });
    }
  })
}
```

### 完整代码

```typescript
import router from '@ohos.router';

interface MenuItem {
  name: string;
  icon: Resource;
  route: string;
  tint?: string;
}

@Entry
@Component
struct HomePage {
  private menuItems: Array<MenuItem> = [
    {
      name: '情景对话',
      icon: $r('app.media.icon_scenario'),
      route: 'pages/ScenarioDialogPage',
      tint: '#4A90E2'
    },
    {
      name: '录音功能',
      icon: $r('app.media.icon_mic'),
      route: 'pages/RecorderPage',
      tint: '#E74C3C'
    },
    {
      name: '个人中心',
      icon: $r('app.media.icon_user'),
      route: '',
      tint: '#2ECC71'
    },
    {
      name: '设置',
      icon: $r('app.media.icon_settings'),
      route: '',
      tint: '#95A5A6'
    }
  ];

  @Builder
  MenuCard(item: MenuItem) {
    Column() {
      Image(item.icon)
        .width(80)
        .height(80)
        .renderMode(ImageRenderMode.Template)
        .fillColor(item.tint ?? '#4A90E2')
        .borderRadius(16)
        .backgroundColor('#F5F5F5')

      Text(item.name)
        .fontSize(14)
        .fontColor('#333333')
        .margin({ top: 8 })
    }
    .width(100)
    .height(120)
    .padding(10)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      if (item.route) {
        router.pushUrl({ url: item.route });
      }
    })
  }

  build() {
    Column() {
      Text('首页')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 20 })

      Grid() {
        ForEach(this.menuItems, (item: MenuItem) => {
          GridItem() {
            this.MenuCard(item)
          }
        })
      }
      .columnsTemplate('1fr 1fr')
      .rowsTemplate('1fr 1fr')
      .rowsGap(20)
      .columnsGap(20)
      .width('90%')
      .height(300)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}
```

---

## 可选增强功能

### 1. 统一主题色管理

**创建主题配置文件：**

```typescript
// common/constants/Theme.ets
export class AppTheme {
  static readonly PRIMARY = "#4A90E2";
  static readonly SUCCESS = "#2ECC71";
  static readonly WARNING = "#F39C12";
  static readonly DANGER = "#E74C3C";
  static readonly INFO = "#95A5A6";
}
```

**使用：**

```typescript
import { AppTheme } from '../common/constants/Theme';

private menuItems: Array<MenuItem> = [
  {
    name: '情景对话',
    icon: $r('app.media.icon_scenario'),
    route: 'pages/ScenarioDialogPage',
    tint: AppTheme.PRIMARY  // ✅ 使用主题色
  }
];
```

### 2. 夜间模式自动切换

**定义颜色资源：**

```json
// entry/src/main/resources/base/element/color.json
{
  "color": [
    {
      "name": "icon_primary",
      "value": "#4A90E2"
    }
  ]
}

// entry/src/main/resources/dark/element/color.json
{
  "color": [
    {
      "name": "icon_primary",
      "value": "#64B5F6"  // 夜间模式更亮的蓝色
    }
  ]
}
```

**使用：**

```typescript
Image(item.icon)
  .renderMode(ImageRenderMode.Template)
  .fillColor($r("app.color.icon_primary")); // 自动适配主题
```

### 3. 激活状态切换

```typescript
interface TabItem {
  name: string;
  icon: Resource;
  activeIcon: Resource;  // 激活态图标
}

@State currentIndex: number = 0;

@Builder
TabIcon(index: number, item: TabItem) {
  Column() {
    // 根据激活状态选择图标
    Image(this.currentIndex === index ? item.activeIcon : item.icon)
      .width(24)
      .height(24)
      .renderMode(ImageRenderMode.Template)
      .fillColor(this.currentIndex === index ? '#4A90E2' : '#999999')

    Text(item.name)
      .fontSize(12)
      .fontColor(this.currentIndex === index ? '#4A90E2' : '#999999')
  }
}
```

---

## 常见问题与解决方案

### 问题 1：图标显示不完整

**原因：** SVG 缺少 `viewBox` 或 `viewBox` 不正确

**解决：**

```xml
<!-- ❌ 错误：没有 viewBox -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <path d="..."/>
</svg>

<!-- ✅ 正确：添加 viewBox -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="..."/>
</svg>
```

**工具修复：**

1. 用 [SVGOMG](https://jakearchibald.github.io/svgomg/) 打开
2. 勾选 "Prefer viewBox"
3. 重新下载

### 问题 2：图标着色不生效

**原因：** SVG 内部指定了 `fill` 颜色，且未设置 `renderMode`

**解决：**

```typescript
// ❌ 错误：未设置 renderMode
Image($r("app.media.icon_home")).fillColor("#4A90E2"); // 无效

// ✅ 正确：必须设置 renderMode
Image($r("app.media.icon_home"))
  .renderMode(ImageRenderMode.Template) // 关键
  .fillColor("#4A90E2"); // 生效
```

**SVG 修正：**

```xml
<!-- 方案 1：移除 fill 属性 -->
<path d="..."/>

<!-- 方案 2：设为黑色 -->
<path fill="#000" d="..."/>
```

### 问题 3：编译报错"找不到资源"

**原因：** 资源名称不符合规范

**检查清单：**

```
✅ 文件放在 entry/src/main/resources/base/media/
✅ 文件名全小写
✅ 使用下划线分隔
✅ 无中文、无空格
✅ 重新编译（Ctrl+F9）
```

**正确引用：**

```typescript
// ✅ 正确
$r("app.media.icon_home");

// ❌ 错误：大小写不匹配
$r("app.media.icon_Home");
$r("app.media.iconHome");
```

### 问题 4：图标显示为方框

**原因：** SVG 包含不支持的特性

**解决：**

```xml
<!-- ❌ 不支持：滤镜、渐变、复杂效果 -->
<svg>
  <defs>
    <linearGradient id="grad">...</linearGradient>
  </defs>
  <path fill="url(#grad)" d="..."/>
</svg>

<!-- ✅ 支持：基础路径、纯色填充 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="..."/>
</svg>
```

### 问题 5：不同尺寸显示模糊

**原因：** 使用了位图（PNG）而非矢量（SVG）

**解决：**

```typescript
// ✅ SVG 矢量图标（任意尺寸清晰）
Image($r("app.media.icon_home"))
  .width(80) // 大尺寸也清晰
  .height(80);

// ❌ PNG 位图（放大模糊）
// 改用 SVG
```

---

## 示例 SVG 文件

以下是 4 个常用图标的优化后 SVG 代码，可直接使用。

### icon_scenario.svg（情景对话）

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
</svg>
```

### icon_mic.svg（麦克风）

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
</svg>
```

### icon_user.svg（用户）

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/>
</svg>
```

### icon_settings.svg（设置）

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
</svg>
```

**使用方法：**

1. 复制上面的 SVG 代码
2. 保存为对应的文件名（如 `icon_scenario.svg`）
3. 放入 `entry/src/main/resources/base/media/` 目录
4. 在代码中用 `$r('app.media.icon_scenario')` 引用

---

## 最佳实践总结

### ✅ 推荐做法

1. **图标源选择**：优先使用 Iconify（汇总多个库，选择多）
2. **款式选择**：选择 Outlined/Line 单色款式
3. **优化处理**：必须用 SVGOMG 优化，统一黑色
4. **命名规范**：`icon_[功能]_[状态].svg`（全小写+下划线）
5. **模板渲染**：务必设置 `renderMode: Template`
6. **主题管理**：统一配置颜色，便于维护

### ❌ 避免陷阱

1. **不要用多色/渐变 SVG**（无法统一着色）
2. **不要忘记 viewBox**（显示不完整）
3. **不要用中文或大写命名**（编译报错）
4. **不要直接用 PNG**（放大模糊）
5. **不要省略 renderMode**（着色不生效）

### 完整 Checklist

```
□ 从推荐图标库下载 SVG
□ 使用 SVGOMG 优化
  □ 移除 metadata/title/desc
  □ 统一为纯黑色 (#000)
  □ 保留 viewBox
□ 文件命名符合规范（小写+下划线）
□ 放入 resources/base/media/ 目录
□ 代码中使用 $r('app.media.xxx') 引用
□ 设置 renderMode: Template
□ 使用 fillColor 统一着色
□ 测试不同尺寸显示效果
```

---

## 总结

### 核心要点

1. **图标源**：Iconify（推荐）、Material Symbols、Remix Icon
2. **优化工具**：SVGOMG 在线处理（必须）
3. **关键操作**：统一黑色 + 保留 viewBox
4. **资源路径**：`entry/src/main/resources/base/media/`
5. **命名规范**：`icon_xxx.svg`（小写+下划线）
6. **代码实现**：`Image` + `renderMode: Template` + `fillColor`

### 快速流程

```
1. Iconify 搜索 → 下载 SVG
   ↓
2. SVGOMG 优化 → 统一黑色 + viewBox
   ↓
3. 放入 media/ 目录 → 符合命名规范
   ↓
4. 代码引用 → $r('app.media.xxx')
   ↓
5. 模板渲染 → renderMode + fillColor
```

### 下一步学习

- [HarmonyOS 图标方案选型与实战](./图标方案选型与实战：SVG-IconFont-Emoji完整对比.md)
- [HarmonyOS 主题系统详解](../主题与样式/主题系统详解.md)
- [ArkUI 资源管理最佳实践](../资源管理/资源分类与命名规范.md)

---

**相关资源：**

- [SVGOMG 在线优化工具](https://jakearchibald.github.io/svgomg/)
- [Iconify 图标搜索](https://iconify.design/)
- [Material Symbols](https://fonts.google.com/icons)
- [Remix Icon](https://remixicon.com/)
- [HarmonyOS Image 组件文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V13/ts-basic-components-image-V13)
