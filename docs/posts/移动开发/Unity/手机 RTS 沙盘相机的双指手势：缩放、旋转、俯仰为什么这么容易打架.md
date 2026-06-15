---
title: 手机 RTS 沙盘相机的双指手势：缩放、旋转、俯仰为什么这么容易打架
date: 2026-06-16 00:30:00
categories:
  - 游戏开发
  - Unity
tags:
  - Unity
  - RTS
  - 移动端
  - 触摸手势
  - 相机控制
---

做手机 RTS 的沙盘视角时，我原本以为双指操作很简单：

- 双指靠近/远离：缩放地图
- 双指捻转：旋转地图
- 双指同向上下拖：调整俯仰视角

真正上手机后才发现，这几个动作非常容易互相误判。尤其是旋转：有时双指刚按下就自己转，有时怎么捻都不转，有时想旋转却变成缩放，有时反向转又像被粘住。

这篇记录一下这次踩坑和最终解决方法。重点先说解决思路，最后给最小实现代码。

<!-- more -->

## 先说解决思路

不要把双指缩放、旋转、俯仰当成几个“数值阈值”去硬凑。应该把它们拆成三个阶段和三种几何证据。

### 1. 手势状态机必须清楚

相机手势至少分三态：

```text
Idle -> Priming -> Locked
```

- `Idle`：没有有效双指会话。
- `Priming`：双指刚按下，记录基准点，只判断用户意图，不移动相机。
- `Locked`：意图已经确定，后续持续输出缩放、旋转或俯仰。

关键点是：**锁定那一帧不要移动相机**。否则会把从按下到锁定期间累计的位移一次性打到相机上，画面就会跳。

### 2. 判定意图时用固定基准，不要累计每帧增量

一开始的问题是“按住不动也会慢慢触发旋转”。根因是旧逻辑会累计每一帧的小抖动：

```csharp
candidateRotateDegrees += frameAngleDelta;
```

真实手指不可能完全静止，小抖动累计久了就会越过阈值。

正确做法是：`Priming` 阶段只拿当前双指位置和“按下时的基准位置”比较。

- 手指不动，基准差值接近 0。
- 手指慢慢转，角度差会真实累积。
- 小抖动不会因为时间变长而被累加成大动作。

### 3. 缩放和旋转要用几何证据区分

最重要的坑在这里。

双指旋转时，人的手指不是圆规，捻转过程中通常会自然张开或收拢一点。也就是说，一个真实旋转会同时产生：

- 手指距离变化：看起来像缩放
- 两指连线角度变化：看起来像旋转

如果只用“谁的进度更大谁赢”，旋转就很容易被缩放偷走。

最终采用两个几何量：

```text
radialPixels     = 两指距离变化量，代表缩放证据
tangentialPixels = 两指连线扫过的弧长，代表旋转证据
```

其中：

```csharp
radialPixels = Abs(currentDistance - baselineDistance);
tangentialPixels = baselineDistance * Abs(angleFromBaselineInRadians);
```

这样缩放和旋转不再是混在一起抢分，而是变成物理意义更清楚的两个方向：

- 缩放是径向运动。
- 旋转是切向运动。

### 4. 不要抢判，证据不清楚就继续 Priming

另一个坑是：慢速捻转时，手指距离可能先越过缩放阈值，而角度还没越过旋转阈值。如果这时马上锁成缩放，这次手势就彻底错了。

所以仲裁规则应该是：

- 旋转角度过线，并且 `tangentialPixels >= radialPixels * rotateVsZoomBias`，才锁旋转。
- 缩放距离过线，并且 `tangentialPixels < radialPixels * rotateVsZoomBias`，才锁缩放。
- 如果不够明确，就继续等待下一帧。

这里 `rotateVsZoomBias` 可以理解为“旋转抢回缩放误判的力度”。我们当前用的是 `0.75`。它不是越小越好，太小会让旋转太容易抢走缩放；太大又会让旋转被缩放偷走。

### 5. 锁定后不要再重新判类型

一旦锁成 `Rotate`，这次双指没松开之前就持续旋转。不要因为中途夹带缩放又重新锁成 `Zoom`。

反向旋转也一样：已经锁定旋转后，只看每帧 `frameAngle` 的正负即可。

- 正值：一个方向转。
- 负值：反向转。

这解决了“我逆时针转了一下，不松手又顺时针转，为什么不马上响应”的问题。

### 6. 旋转方向要单独验证

Unity 里这个符号很容易反：

```csharp
frameAngle = Vector2.SignedAngle(previousVector, currentVector);
cameraRig.Rotate(amount); // 内部 yaw += amount
```

如果你写成：

```csharp
Rotate(-frameAngle * speed)
```

很可能就会出现“手指逆时针，地图顺时针”的反直觉手感。

最终我们采用“地图跟手”的规则：手指逆时针，地图也逆时针，所以不加负号。

### 7. 旋转反向要有更小的死区

缩放和俯仰可以有稍大的像素死区，但旋转反向时，过零点附近每帧角度很小。如果旋转也用较大的死区，用户会觉得反向慢半拍。

所以旋转使用独立死区：

```csharp
rotateFrameJitterDegrees = 0.03f;
```

## 这次踩过的坑

### 坑 1：双指按下不动，画面自己旋转

原因是把每帧的小抖动累加了。手机触摸永远有噪声，累加就一定会误触。

解决：`Priming` 阶段用固定基准判断位移，不累计噪声。

### 坑 2：旋转完全不灵，像没实现

一版逻辑里缩放和旋转是“进度比赛”。真实捻转会夹带缩放，两个进度一起升，谁也赢不了足够多，于是手势一直停在 `Priming`。

解决：用 `radialPixels` 和 `tangentialPixels` 做几何区分。

### 坑 3：想旋转，却被识别成缩放

慢捻转时，手指距离变化可能先过缩放阈值，角度后过旋转阈值。旧逻辑会提前锁缩放。

解决：证据不清楚时继续等待，不要抢判；旋转过角度线后允许切向运动把缩放抢回来。

### 坑 4：旋转方向有时感觉反

根因是 `SignedAngle` 的正负和相机 `yaw` 的正方向没对齐，还多乘了一个负号。

解决：定义产品规则：“地图跟手”。然后用测试锁住方向：逆时针手势输出正旋转，顺时针输出负旋转。

### 坑 5：同一次手势中反向旋转不马上响应

一部分是因为前面已经误锁成缩放；另一部分是旋转死区太大，反向初期的小角度被吞掉。

解决：锁定 Rotate 后保持 Rotate；旋转使用更小的角度死区。

### 坑 6：只在编辑器里试不够

鼠标模拟和真机双指不是一回事。移动端必须真机验证，最好还要有调试浮层显示：

- 当前状态：`Idle / Priming / Locked`
- 已锁类型：`Zoom / Rotate / Tilt`
- `radialPixels`
- `tangentialPixels`
- 输出量
- 相机 yaw / pitch / distance

这次很多判断都是靠“真机手感 + 日志 + 回归测试”一起收敛的。

## 当前参数

这组值不是绝对标准，但已经比较适合手机 RTS 沙盘：

| 参数 | 值 | 作用 |
|---|---:|---|
| `pinchLockPixels` | `9` | 缩放锁定距离 |
| `rotateLockDegrees` | `3` | 旋转锁定角度 |
| `tiltLockPixels` | `26` | 俯仰锁定位移 |
| `rotateVsZoomBias` | `0.75` | 旋转和缩放仲裁，越低越偏向旋转 |
| `twistRotateSpeed` | `1.4` | 旋转输出倍率 |
| `rotateFrameJitterDegrees` | `0.03` | 旋转逐帧死区 |
| `frameJitterPixels` | `0.35` | 缩放/俯仰逐帧死区 |
| `maxFrameRotateDegrees` | `12` | 防止单帧旋转跳变 |
| `teleportRotateDegrees` | `45` | 防止换指/传感器跳变 |

## 必须写的测试

移动端手势很容易“修好一个，弄坏三个”。至少要覆盖这些场景：

- 双指按下不动，不触发任何手势。
- 纯缩放仍然是 `Zoom`。
- 双指同向上下拖仍然是 `Tilt`。
- 普通捻转锁成 `Rotate`。
- 旋转夹带明显张开，不得误判成 `Zoom`。
- 已锁 `Rotate` 后，不松手反向旋转，要在 1 到 2 帧内反向输出。
- 瞬移、换指、距离过近要重建基准，不得产生跳变。

## 最小实现代码

下面不是项目里的完整版本，而是最小可复用思路。它只展示核心状态机、缩放/旋转/俯仰仲裁和锁定后的输出。

```csharp
using UnityEngine;

public enum GestureKind
{
    None,
    Zoom,
    Rotate,
    Tilt
}

public enum GestureState
{
    Idle,
    Priming,
    Locked
}

public readonly struct GestureResult
{
    public GestureResult(GestureKind kind, float amount)
    {
        Kind = kind;
        Amount = amount;
    }

    public GestureKind Kind { get; }
    public float Amount { get; }

    public static GestureResult None => new GestureResult(GestureKind.None, 0f);
}

public sealed class TwoFingerCameraGesture
{
    private const float PinchLockPixels = 9f;
    private const float RotateLockDegrees = 3f;
    private const float TiltLockPixels = 26f;
    private const float RotateVsZoomBias = 0.75f;
    private const float TiltParallelDot = 0.55f;
    private const float TiltVerticalDominance = 1.1f;
    private const float PrimingJitterPixels = 3f;
    private const float MinFingerDistancePixels = 40f;
    private const float MaxFramePinchPixels = 120f;
    private const float MaxFrameRotateDegrees = 12f;
    private const float MaxFrameTiltPixels = 90f;
    private const float FrameJitterPixels = 0.35f;
    private const float RotateFrameJitterDegrees = 0.03f;

    private GestureState state = GestureState.Idle;
    private GestureKind lockedKind = GestureKind.None;
    private int fingerA = -1;
    private int fingerB = -1;
    private Vector2 baselineA;
    private Vector2 baselineB;
    private Vector2 previousA;
    private Vector2 previousB;

    public GestureResult Update(Touch a, Touch b)
    {
        SortByFingerId(ref a, ref b);

        if (a.phase == TouchPhase.Ended || a.phase == TouchPhase.Canceled ||
            b.phase == TouchPhase.Ended || b.phase == TouchPhase.Canceled)
        {
            Reset();
            return GestureResult.None;
        }

        if (state == GestureState.Idle ||
            a.phase == TouchPhase.Began || b.phase == TouchPhase.Began ||
            a.fingerId != fingerA || b.fingerId != fingerB)
        {
            BeginPriming(a, b);
            return GestureResult.None;
        }

        Vector2 currentVector = a.position - b.position;
        if (currentVector.magnitude < MinFingerDistancePixels)
        {
            BeginPriming(a, b);
            return GestureResult.None;
        }

        Vector2 previousVector = previousA - previousB;
        float framePinch = previousVector.magnitude - currentVector.magnitude;
        float frameAngle = Vector2.SignedAngle(previousVector, currentVector);
        Vector2 frameCenterDelta = ((a.position + b.position) - (previousA + previousB)) * 0.5f;

        if (state == GestureState.Priming)
        {
            return Prime(a, b);
        }

        return ApplyLocked(a, b, framePinch, frameAngle, frameCenterDelta);
    }

    private GestureResult Prime(Touch a, Touch b)
    {
        Vector2 deltaA = a.position - baselineA;
        Vector2 deltaB = b.position - baselineB;
        float travel = Mathf.Max(deltaA.magnitude, deltaB.magnitude);
        if (travel < PrimingJitterPixels)
        {
            StorePrevious(a, b);
            return GestureResult.None;
        }

        Vector2 baselineVector = baselineA - baselineB;
        Vector2 currentVector = a.position - b.position;
        float baselineDistance = baselineVector.magnitude;
        float currentDistance = currentVector.magnitude;
        float angleDegrees = Mathf.Abs(Vector2.SignedAngle(baselineVector, currentVector));
        Vector2 centerDelta = ((a.position + b.position) - (baselineA + baselineB)) * 0.5f;
        float parallelDot = ParallelDot(deltaA, deltaB);

        float radialPixels = Mathf.Abs(currentDistance - baselineDistance);
        float tangentialPixels = baselineDistance * angleDegrees * Mathf.Deg2Rad;

        StorePrevious(a, b);

        GestureKind kind = ChooseGesture(radialPixels, angleDegrees, tangentialPixels, centerDelta, parallelDot);
        if (kind == GestureKind.None)
        {
            return GestureResult.None;
        }

        lockedKind = kind;
        state = GestureState.Locked;

        // 锁定这一帧不输出，避免画面跳变。
        return GestureResult.None;
    }

    private static GestureKind ChooseGesture(
        float radialPixels,
        float angleDegrees,
        float tangentialPixels,
        Vector2 centerDelta,
        float parallelDot)
    {
        bool zoomReady = radialPixels >= PinchLockPixels;
        bool rotateReady = angleDegrees >= RotateLockDegrees;

        bool tiltReady =
            parallelDot >= TiltParallelDot &&
            Mathf.Abs(centerDelta.y) >= Mathf.Abs(centerDelta.x) * TiltVerticalDominance &&
            Mathf.Abs(centerDelta.y) >= TiltLockPixels;

        if (tiltReady &&
            Mathf.Abs(centerDelta.y) >= radialPixels &&
            Mathf.Abs(centerDelta.y) >= tangentialPixels)
        {
            return GestureKind.Tilt;
        }

        // 旋转：角度过线，并且切向运动足够强。
        if (rotateReady && tangentialPixels >= radialPixels * RotateVsZoomBias)
        {
            return GestureKind.Rotate;
        }

        // 缩放：距离变化过线，并且切向运动没有明显起来。
        if (zoomReady && tangentialPixels < radialPixels * RotateVsZoomBias)
        {
            return GestureKind.Zoom;
        }

        // 不明确就继续等，千万不要抢判。
        return GestureKind.None;
    }

    private GestureResult ApplyLocked(
        Touch a,
        Touch b,
        float framePinch,
        float frameAngle,
        Vector2 frameCenterDelta)
    {
        StorePrevious(a, b);

        switch (lockedKind)
        {
            case GestureKind.Zoom:
            {
                float amount = Mathf.Clamp(framePinch, -MaxFramePinchPixels, MaxFramePinchPixels);
                return Mathf.Abs(amount) > FrameJitterPixels
                    ? new GestureResult(GestureKind.Zoom, amount)
                    : GestureResult.None;
            }

            case GestureKind.Rotate:
            {
                float amount = Mathf.Clamp(frameAngle, -MaxFrameRotateDegrees, MaxFrameRotateDegrees);
                return Mathf.Abs(amount) > RotateFrameJitterDegrees
                    // 不加负号：手指逆时针，地图也逆时针。
                    ? new GestureResult(GestureKind.Rotate, amount)
                    : GestureResult.None;
            }

            case GestureKind.Tilt:
            {
                float amount = Mathf.Clamp(frameCenterDelta.y, -MaxFrameTiltPixels, MaxFrameTiltPixels);
                return Mathf.Abs(amount) > FrameJitterPixels
                    ? new GestureResult(GestureKind.Tilt, -amount)
                    : GestureResult.None;
            }

            default:
                return GestureResult.None;
        }
    }

    private void BeginPriming(Touch a, Touch b)
    {
        state = GestureState.Priming;
        lockedKind = GestureKind.None;
        fingerA = a.fingerId;
        fingerB = b.fingerId;
        baselineA = a.position;
        baselineB = b.position;
        StorePrevious(a, b);
    }

    private void StorePrevious(Touch a, Touch b)
    {
        previousA = a.position;
        previousB = b.position;
    }

    private void Reset()
    {
        state = GestureState.Idle;
        lockedKind = GestureKind.None;
        fingerA = -1;
        fingerB = -1;
    }

    private static float ParallelDot(Vector2 a, Vector2 b)
    {
        if (a.sqrMagnitude < 4f || b.sqrMagnitude < 4f) return 0f;
        return Vector2.Dot(a.normalized, b.normalized);
    }

    private static void SortByFingerId(ref Touch a, ref Touch b)
    {
        if (a.fingerId <= b.fingerId) return;
        Touch temp = a;
        a = b;
        b = temp;
    }
}
```

接到相机时只需要按类型分发：

```csharp
GestureResult result = gesture.Update(Input.GetTouch(0), Input.GetTouch(1));

switch (result.Kind)
{
    case GestureKind.Zoom:
        cameraRig.Zoom(result.Amount * pinchZoomSpeed);
        break;
    case GestureKind.Rotate:
        cameraRig.Rotate(result.Amount * twistRotateSpeed);
        break;
    case GestureKind.Tilt:
        cameraRig.Pitch(result.Amount * tiltSpeed);
        break;
}
```

## 最后的经验

手机 RTS 的沙盘手势不是“能动就行”。它是玩家对战场的第一层信任。

玩家的手指没有机械精度，旋转会夹带缩放，缩放会夹带轻微角度，反向会经过零速度，按下会有抖动。好的手势系统不是把阈值调得很玄学，而是承认这些现实，然后用状态机和几何证据把用户意图稳定地读出来。

这次最大的收获是：**不要抢判，不要累计噪声，锁定后保持意图，方向用产品直觉和测试钉住。**
