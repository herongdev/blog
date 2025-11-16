---
title: "Shader 源是什么：食谱比喻与实战清单"
date: 2025-01-27
tags:
  - OpenGL ES
  - 着色器
  - 图形学
  - GLSL
description: "用最通俗的大白话：Shader 源=给 GPU 的绘图食谱。包含顶点/片段 Shader 源的职责、工作流与项目示例。"
---

## 比喻：做菜的食谱

```text
Shader 源 = 做 3D 图形的“详细食谱”
GPU 大厨 = 执行食谱的“超级厨师”
3D 画面 = 做出来的“美味菜肴”
```

## Shader 源是什么？

就是告诉 GPU 如何画图的“指令手册”。

```glsl
// 这是一段 Shader 源的示意（伪）—— 就像一份食谱
// 输入/输出随具体平台而异，这里仅做直观展示

// 输入：顶点位置、法线
in vec3 a_position;
in vec3 a_normal;

// 传递给片段着色器（半成品）
out vec3 v_normal;

uniform mat4 u_matrix;

void main() {
  // 步骤1：处理位置（摆盘）
  gl_Position = u_matrix * vec4(a_position, 1.0);

  // 步骤2：处理法线（准备调味信息）
  v_normal = normalize(a_normal);
}
```

## Shader 源的作用

### 1) 控制 3D 物体的“形状”

```glsl
// 告诉 GPU 如何把 3D 模型变成 2D 屏幕图像
gl_Position = 计算后的屏幕位置;
```

### 2) 控制 3D 物体的“外观”

```glsl
// 告诉 GPU 如何上颜色、加光影
// 在片段着色器输出像素颜色
out vec4 fragColor;
fragColor = 最终像素颜色;
```

### 3) 实现各种炫酷效果

```text
金属反光 / 玻璃透明 / 水面波纹 / 卡通渲染 / 衰减雾效 ...
```

## Shader 源的种类

### 顶点 Shader 源 —— “造型师傅的食谱”

```text
职责：专门处理物体的形状和位置
输入：3D 顶点坐标等
输出：2D 屏幕位置 + 传递给片段着色器的数据
频次：每个顶点执行一次
```

### 片段 Shader 源 —— “上色师傅的食谱”

```text
职责：专门处理物体的颜色和纹理
输入：从顶点着色器传来的插值数据
输出：每个像素的最终颜色
频次：每个像素执行一次
```

## 工作流程（总览）

```text
3D 模型数据
    ↓
[顶点 Shader 源] → 处理形状和位置
    ↓
[光栅化] → 把几何形状切成像素
    ↓
[片段 Shader 源] → 给每个像素上颜色
    ↓
漂亮的 3D 画面 🎨
```

## 实际例子对比

### 没有 Shader 源

```text
立方体 = 8 个点 + 6 个面
显示：平平的色块，没有立体感（像用单色笔画的方块）
```

### 有 Shader 源

```glsl
// 在 Shader 源中计算光照（片段着色器片段示意）
in vec3 v_normal;
out vec4 fragColor;

void main() {
  float light = clamp(dot(normalize(v_normal), vec3(0,0,1)), 0.0, 1.0);
  vec3 base = vec3(1.0, 0.2, 0.2);
  fragColor = vec4(base * light, 1.0);
}
```

显示效果：有明暗变化的立体立方体（像专业素描）。

## 为什么需要 Shader 源？

### 灵活性

```text
固定流水线：只能画固定效果
可编程 Shader：可以创造任何你能想象的效果
```

### 效率

```text
CPU：逐像素算颜色 → 慢
GPU+Shader：并行处理百万像素 → 快
```

### 逼真度

```text
简单渲染：平面颜色，像玩具
Shader 渲染：光影/纹理/反射，像真实物体
```

## 项目组织建议（示例）

```text
shaders/
├─ vs_cubes.glsl     ← 顶点 Shader 源（造型食谱）
├─ fs_cubes.glsl     ← 片段 Shader 源（上色食谱）
└─ common/
   └─ varying.glsl   ← 顶点/片段之间的传递变量约定
```

示例内容：

```glsl
// vs_cubes.glsl —— 顶点 Shader 源（造型食谱）
in vec3 a_position;
in vec3 a_normal;
out vec3 v_normal;
uniform mat4 u_mvp;
void main() {
  gl_Position = u_mvp * vec4(a_position, 1.0);
  v_normal = a_normal;
}
```

```glsl
// fs_cubes.glsl —— 片段 Shader 源（上色食谱）
in vec3 v_normal;
out vec4 fragColor;
void main() {
  float light = max(dot(normalize(v_normal), vec3(0,0,1)), 0.0);
  fragColor = vec4(vec3(1.0, 0.3, 0.3) * light, 1.0);
}
```

## 总结

| 概念        | 比喻     | 作用                      |
| ----------- | -------- | ------------------------- |
| Shader 源   | 烹饪食谱 | 告诉 GPU 如何制作 3D 画面 |
| 顶点 Shader | 造型师傅 | 处理物体形状和位置        |
| 片段 Shader | 上色师傅 | 处理物体颜色和效果        |
| GPU         | 超级厨师 | 高并发执行“食谱”          |

**洲煌总结：Shader 源就是给 GPU 看的“绘画教程”。没有它，GPU 像没食谱的厨师；有了它，GPU 就能做出各种炫酷的 3D 效果！**
