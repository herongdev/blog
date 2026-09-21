---
title: "EGL 是什么：OpenGL 与系统之间的“翻译官 + 中介”"
date: 2025-01-27
tags:
  - EGL
  - OpenGL ES
  - 图形
  - HarmonyOS
description: "用大白话理解 EGL：Display/Surface/Context 三件套、完整初始化流程、为什么需要 EGL，以及在鸿蒙上的典型用法。"
---

## EGL 就是“翻译官 + 中介”

OpenGL（画图 API）不能直接“说话”给系统的窗口/屏幕。EGL 负责把 OpenGL 的请求翻译成系统能懂的调用，并在两者之间做资源中介。

### 没有 EGL 的情况

```text
OpenGL（画家）  ❌  无法直接沟通  ❌  操作系统/窗口系统（画布）
```

### 有 EGL 的情况

```text
OpenGL（画家）  ↔  EGL（翻译官）  ↔  操作系统/窗口系统（画布）
```

## 三件套：Display / Surface / Context

### 1) EGLDisplay —— “工作场地”

```cpp
EGLDisplay display_ = EGL_NO_DISPLAY;
```

- 连接显示系统/设备的“工作室”。
- 没有它，就谈不上初始化和绘制。

### 2) EGLSurface —— “画布”

```cpp
EGLSurface surface_ = EGL_NO_SURFACE;
```

- 真正可以被显示/交换的缓冲区（前后台缓冲）。
- 窗口 Surface（window surface）通常来自系统窗口句柄。

### 3) EGLContext —— “工具箱和规则”

```cpp
EGLContext context_ = EGL_NO_CONTEXT;
```

- OpenGL ES 的执行上下文：包含着着色器/状态/资源的规则与载体。
- 没有当前上下文就不能调用 GL 函数绘制。

## 完整初始化流程（类比 + 代码）

```cpp
// 1. 找到工作场地（连接显示系统）
EGLDisplay display = eglGetDisplay(EGL_DEFAULT_DISPLAY);

// 2. 初始化 EGL
eglInitialize(display, nullptr, nullptr);

// 3. 选择配置（像挑画布材质）
const EGLint cfgAttrs[] = {
  EGL_RED_SIZE,   8,
  EGL_GREEN_SIZE, 8,
  EGL_BLUE_SIZE,  8,
  EGL_ALPHA_SIZE, 8,
  EGL_RENDERABLE_TYPE, EGL_OPENGL_ES3_BIT,
  EGL_SURFACE_TYPE,    EGL_WINDOW_BIT,
  EGL_NONE
};
EGLConfig cfg; EGLint num = 0;
eglChooseConfig(display, cfgAttrs, &cfg, 1, &num);

// 4. 准备画布（把窗口和 EGL 绑定）
// window_ 为系统提供的原生窗口句柄（HarmonyOS: XComponent window）
EGLSurface surface = eglCreateWindowSurface(display, cfg, window_, nullptr);

// 5. 准备绘图工具（OpenGL ES 上下文）
const EGLint ctxAttrs[] = { EGL_CONTEXT_CLIENT_VERSION, 3, EGL_NONE };
EGLContext context = eglCreateContext(display, cfg, EGL_NO_CONTEXT, ctxAttrs);

// 6. 开始绘画（让上下文与画布成为“当前”）
eglMakeCurrent(display, surface, surface, context);

// 7. 展示作品（交换前后缓冲）
eglSwapBuffers(display, surface);
```

类比流程：

```text
1) eglGetDisplay        → 找到画廊（能展示的地方）
2) eglInitialize        → 布置基础设施（灯光/展架）
3) eglChooseConfig      → 选画布材质（像素格式/能力）
4) eglCreateWindowSurface → 装裱到画架（窗口绑定画布）
5) eglCreateContext     → 准备画笔和规则（GL 上下文）
6) eglMakeCurrent       → 人到位、提笔临画（设为当前）
7) eglSwapBuffers       → 把画给观众看（前后缓冲交换）
```

## 为什么需要 EGL？

不同系统对“怎么把图画到屏幕上”各有“方言”：

```text
Windows → WGL
Linux   → GLX/EGL
Android → EGL
HarmonyOS → EGL
```

EGL 提供统一接口：

```text
OpenGL ES → 统一说“EGL 语言” → 各个系统/窗口管理器
```

开发者只要会 EGL，一套 OpenGL ES 代码就能跨系统跑。

## HarmonyOS/XComponent 场景

配合 XComponent 的原生 window，常见做法：

```cpp
// window 来自 XComponent 的回调（如 onSurfaceCreated 提供的 window）
surface = eglCreateWindowSurface(display, cfg, window, nullptr);
context = eglCreateContext(display, cfg, EGL_NO_CONTEXT, ctxAttrs);
eglMakeCurrent(display, surface, surface, context);

// 之后就可以调用 GL 进行绘制
glViewport(0, 0, width, height);
glClearColor(0.1f, 0.2f, 0.3f, 1.0f);
glClear(GL_COLOR_BUFFER_BIT);
eglSwapBuffers(display, surface);
```

## 关键 API 速览

- `eglGetDisplay`：获取显示连接。
- `eglInitialize`：初始化 EGL。
- `eglChooseConfig`：选择像素格式/渲染能力等配置。
- `eglCreateWindowSurface`：从原生窗口创建可显示的 Surface。
- `eglCreateContext`：创建 OpenGL ES 上下文。
- `eglMakeCurrent`：绑定当前上下文与绘制/读取 Surface。
- `eglSwapBuffers`：交换前后缓冲，把结果显示出来。

## 总结

- EGL 是 OpenGL 与系统之间的“翻译官 + 中介”。
- 三件套：Display（场地）/ Surface（画布）/ Context（工具）。
- 一次性学会 EGL，把 OpenGL 作品带到不同系统展示。
