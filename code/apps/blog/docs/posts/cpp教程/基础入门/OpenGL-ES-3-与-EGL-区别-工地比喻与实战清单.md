---
title: "OpenGL ES 3 与 EGL 的区别：工地比喻 + 实战清单"
date: 2025-01-27
tags:
  - OpenGL ES
  - EGL
  - 图形
  - HarmonyOS
description: "用工地比喻快速理解：OpenGL ES 3 负责“怎么画”，EGL 负责“在哪画”。含初始化与绘制清单。"
---

## 比喻：建筑工地

- OpenGL ES 3 = 建筑工人和施工技术（具体怎么盖房子）
- EGL = 工地办公室和施工许可（在哪儿盖、如何展示）

## OpenGL ES 3 —— “建筑工人团队”

```cpp
// OpenGL ES 3：真正干活的人
glClearColor(0.05f, 0.05f, 0.08f, 1.0f);    // 准备“底色”
glDrawArrays(GL_TRIANGLES, 0, 36);           // 砌“砖”（画三角形）
glUniform4fv(uColor_, 1, c.color);           // 上“油漆”（设置颜色）
```

OpenGL ES 3 负责：

- 绘制几何（点/线/三角形）
- 颜色与透明度
- 光照计算
- 3D 变换（平移/旋转/缩放）
- 纹理贴图

特点：

- 只管画画，不管在哪显示；
- 专业工具齐全；
- ES 3 相比 ES 2 功能更强、效率更高。

## EGL —— “工地管理办公室”

```cpp
// EGL：准备场地、许可与展示
display_ = eglGetDisplay(EGL_DEFAULT_DISPLAY);  // 找到“工地”
eglInitialize(display_, nullptr, nullptr);       // 初始化“场地”
surface_ = eglCreateWindowSurface(display_, cfg, window_, nullptr); // 准备“画布”
context_ = eglCreateContext(display_, cfg, EGL_NO_CONTEXT, ctxAttrs); // 许可证
eglSwapBuffers(display_, surface_);              // 展示成果
```

EGL 负责：

- 场地准备：连接 OS 与显示设备（EGLDisplay）；
- 手续办理：创建绘图上下文（EGLContext）；
- 舞台搭建：创建绘制表面（EGLSurface）；
- 成果展示：交换缓冲、把图像显示到屏幕；
- 工具协调：管理 OpenGL 与系统通信。

特点：

- 不画内容，只提供“能画并能显示”的环境；
- 是 App 和系统的桥梁。

## 实际工作流程对比

EGL（准备工作）：

```cpp
display_ = eglGetDisplay(EGL_DEFAULT_DISPLAY);
eglInitialize(display_, nullptr, nullptr);
context_ = eglCreateContext(display_, cfg, EGL_NO_CONTEXT, ctxAttrs);
surface_ = eglCreateWindowSurface(display_, cfg, window_, nullptr);
eglMakeCurrent(display_, surface_, surface_, context_);
```

OpenGL ES 3（实际施工）：

```cpp
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
glUseProgram(program_);
glBindVertexArray(vao_);
glDrawArrays(GL_TRIANGLES, 0, 36);
glUniform4fv(uColor_, 1, c.color);
```

两者关系：

```text
EGL 准备好 → OpenGL ES 3 开始画 → EGL 负责展示
```

## 在代码中的分工（示例）

```cpp
void RenderFrame() {
  // EGL：初始化阶段已完成 display_/surface_/context_

  // OpenGL ES 3：绘制
  glClearColor(0.05f, 0.05f, 0.08f, 1.0f);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  glUseProgram(program_);
  glBindVertexArray(vao_);

  for (/* 每个物体 */) {
    glUniformMatrix4fv(uMVP_, 1, GL_FALSE, MVP);
    glUniform4fv(uColor_, 1, c.color);
    glDrawArrays(GL_TRIANGLES, 0, 36);
  }

  // EGL：展示
  eglSwapBuffers(display_, surface_);
}
```

## 版本对比：OpenGL ES 3 vs ES 2

```glsl
// ES 2（较旧）
#version 100
attribute vec3 aPos;

// ES 3（较新）
#version 300 es
layout(location=0) in vec3 aPos;
```

ES 3 典型提升：

- 更多纹理格式；
- 更强缓冲/对象管理；
- GLSL 语法更现代、更灵活；
- 更好的性能与可移植性。

## 速览表

| 角色 | OpenGL ES 3       | EGL                |
| ---- | ----------------- | ------------------ |
| 职责 | 画什么（内容）    | 在哪画（环境）     |
| 比喻 | 建筑工人          | 工地办公室         |
| 工作 | 绘图、上色、光照  | 创建环境、显示结果 |
| 依赖 | 需要 EGL 提供环境 | 不画内容、只管环境 |

## 总结

EGL 是“舞台管理员”，OpenGL ES 3 是“演员”。

- 没有 EGL，演员无处表演；
- 没有 OpenGL，舞台上无人演；
- 两者配合，才能上演精彩的 3D 图形大戏。
