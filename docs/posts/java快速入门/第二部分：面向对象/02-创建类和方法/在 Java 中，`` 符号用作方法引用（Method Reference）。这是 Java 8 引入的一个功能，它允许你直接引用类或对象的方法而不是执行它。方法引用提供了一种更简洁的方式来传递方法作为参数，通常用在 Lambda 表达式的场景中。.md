---
title: 在 Java 中，`` 符号用作方法引用（Method Reference）。这是 Java 8 引入的一个功能，它允许你直接引用类或对象的方法而不是执行它。方法引用提供了一种更简洁的方式来传递方法作为参数，通常用在 Lambda 表达式的场景中。
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 面向对象, OneNote]
---
在 Java 中，`::` 符号用作方法引用（Method Reference）。这是 Java 8 引入的一个功能，它允许你直接引用类或对象的方法而不是执行它。方法引用提供了一种更简洁的方式来传递方法作为参数，通常用在 Lambda 表达式的场景中。

方法引用有四种主要形式：

1. **静态方法引用：** 使用 `类名::静态方法名` 的形式。例如，`Math::max` 引用 `Math` 类的静态方法 `max`。

2. **特定对象的实例方法引用：** 使用 `实例对象::实例方法名` 的形式。例如，假设有一个 `String` 对象 `str`，`str::length` 引用了 `str` 的 `length` 方法。

3. **特定类型的任意对象的实例方法引用：** 使用 `类名::实例方法名` 的形式。这种形式类似于静态方法引用，但它用于实例方法。例如，`String::length` 引用了任何 `String` 对象的 `length` 方法。

4. **构造函数引用：** 使用 `类名::new` 的形式。例如，`ArrayList::new` 引用 `ArrayList` 的构造函数。

在您的代码 `this::onPermissionResult` 中，它是一个特定对象的实例方法引用。这里 `this` 指的是当前类的实例，`onPermissionResult` 是这个类中的一个方法。这种引用传递给了 `registerForActivityResult` 方法，意味着当权限请求的结果可用时，`onPermissionResult` 方法将被调用。

举个例子：

```java
button.setOnClickListener(this::handleButtonClick);
这里，当按钮被点击时，会自动调用当前类中的 `handleButtonClick` 方法，而不需要使用传统的匿名类或 Lambda 表达式。这使得代码更加简洁和易读。

注意
在 Java 中，`this.onPermissionResult` 和使用方法引用 `this::onPermissionResult` 在某些情况下有不同的含义和用途，尤其是在期望一个函数接口（如 Lambda 表达式或方法引用）作为参数的场合。

### `this.onPermissionResult`：

- 这种用法通常表示立即调用 `onPermissionResult` 方法。它直接执行这个方法并返回该方法的结果。
- 不能用作方法引用，因为它不是在传递一个方法作为参数，而是调用该方法并使用它的返回值。

### `this::onPermissionResult`：
- 这是一个方法引用，意味着你传递了一个方法而不是调用它。在这种情况下，你提供了一个对 `onPermissionResult` 方法的引用，可以稍后在其他地方调用。
- 它适用于期望函数接口作为参数的情况，如在 Lambda 表达式中。这里，你不是执行方法，而是告诉程序“这里有一个方法，当你需要的时候可以调用它”。

在您的代码中，`registerForActivityResult` 方法需要一个 `ActivityResultCallback` 类型的参数。这个参数是一个函数接口，需要一个方法引用或 Lambda 表达式。因此，使用 `this::onPermissionResult` 作为参数是合适的，因为它提供了一个方法的引用，而不是立即执行该方法。

如果你直接使用 `this.onPermissionResult`，它会尝试立即调用该方法并期望将其结果（而不是方法本身）传递给 `registerForActivityResult`，这通常不是你想要的行为，并且会导致编译错误，因为它不满足 `registerForActivityResult` 所期望的参数类型。
