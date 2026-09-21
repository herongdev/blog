---
title: Unity iOS/Android 中文 UI 缺字：字体与字重排查与修复
date: 2026-06-13
tags:
  - Unity
  - iOS
  - Android
  - 字体
  - UI
categories:
  - 移动开发
description: Unity 旧版 UI Text 在 iOS 上对 CJK 字体使用 Bold 时部分汉字缺失；统一打包 CJK 字体并将 fontStyle 改为 Normal 可修复。
---

## 问题现象

Unity 旧版 **UI Text** 在 iOS 模拟器/真机上使用 CJK 字体时，若 `Text.fontStyle` 为 **Bold**，某些汉字会单独缺失，例如：

| 原文 | 实际显示 |
|------|----------|
| 胜利 | 利 |
| 再战 | 再 |

看起来像编码问题，**更像是字体字形 / 字重问题**。  
最终有效修复：**统一 CJK 字体 + 所有中文 UI 的 `fontStyle` 从 Bold 改为 Normal**。

主菜单修好后结果弹窗仍缺字，是因为部分 UI 路径仍在走 Bold。

---

## 部署与排查思路（给另一个项目 AI 的检查清单）

可直接把下面这段发给另一个 Unity 项目的 AI 或同事：

```text
请检查 Unity 项目里 iOS/Android 上中文 UI 缺字的问题。不要只看编码，重点检查字体和字重。

我遇到的问题是：Unity 的旧版 UI Text 在 iOS 模拟器上使用 CJK 字体时，如果 Text.fontStyle 是 Bold，某些汉字会单独缺失。例如“胜利”只显示“利”，“再战”只显示“再”。最终有效修复是把所有中文 UI 的 fontStyle 从 Bold 改成 Normal。

请重点检查：
1. 所有 UnityEngine.UI.Text / TMP_Text 的字体设置。
2. 是否用了默认 Arial/LegacyRuntime 字体，这些不可靠支持中文。
3. 是否有 Text.fontStyle = FontStyle.Bold、FontStyle.Italic、FontStyle.BoldAndItalic。
4. 按钮文字、结果弹窗、HUD、动态更新的文本是否也用了同一套字体。
5. iOS 真机/模拟器上是否打包进了 CJK 字体，而不是只依赖编辑器里的系统字体。
```

---

## 重点检查项

1. 所有 `UnityEngine.UI.Text` / `TMP_Text` 的字体设置  
2. 是否使用默认 **Arial / LegacyRuntime**（不可靠支持中文）  
3. 是否存在 `FontStyle.Bold`、`Italic`、`BoldAndItalic`  
4. 按钮、结果弹窗、HUD、**动态更新**的文本是否同一套字体  
5. iOS 构建是否**打包进 CJK 字体**，而非仅依赖编辑器系统字体  

---

## 修复方案：UnityEngine.UI.Text

### 1. 准备字体

- 放到 `Assets/Resources/Fonts/`  
- 生产项目建议用有授权字体，如 **Noto Sans CJK / Source Han Sans**，按需子集化  
- **所有 UI Text 使用同一字体**  
- CJK 文本优先 **`FontStyle.Normal`**，不要用 Unity Text 的 Bold 合成样式  

### 2. 加载与预热

```csharp
private static Font CreateUiFont()
{
    var bundledFont = Resources.Load<Font>("Fonts/NotoSansCJKsc-Regular");
    if (bundledFont != null)
    {
        WarmUpUiFont(bundledFont);
        return bundledFont;
    }

    return Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
}

private static void WarmUpUiFont(Font font)
{
    var sample = "胜利失败再战主菜单玩家对手剑枪气血时间攻击跳闪蹲重技";
    var sizes = new[] { 13, 15, 17, 18, 20, 21, 24, 25, 32, 34, 36 };

    foreach (var size in sizes)
    {
        font.RequestCharactersInTexture(sample, size, FontStyle.Normal);
    }
}
```

### 3. 统一 UI Token / Style（字重改 Normal）

若项目有统一 `TextStyle`，先把中文 UI 字重全部改为 Normal：

```csharp
public static class TextStyle
{
    public const FontStyle Title = FontStyle.Normal;
    public const FontStyle Control = FontStyle.Normal;
    public const FontStyle Story = FontStyle.Normal;
    public const FontStyle Body = FontStyle.Normal;
}
```

---

## 修复方案：TextMeshPro

- 使用支持中文的 **TMP Font Asset**  
- **Atlas Population Mode**：Dynamic，或提前生成含全部中文字符的静态 atlas  
- 配好 **Fallback Font Assets**  
- 检查按钮、弹窗、HUD 是否都引用该 TMP Font Asset  

---

## iOS 验证清单

在 **iOS Simulator 或真机** 上确认以下文案完整显示：

- 胜利  
- 再战  
- 主菜单  
- 玩家 / 剑  
- 对手 / 枪  
- 一段较长中文剧情或提示文本  

---

## 小结

| 误区 | 实际原因 |
|------|----------|
| 像 UTF-8 / 编码问题 | 多为 CJK 字体未打包或 Bold 合成缺字形 |
| 只改主菜单 | 弹窗、HUD、动态 Text 仍可能用 Bold / 旧字体 |

**统一 CJK 字体 + UI 字重 Normal + 全路径同一字体**，是本次问题的有效修复路径。
