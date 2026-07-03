---
title: Lambda
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 面向对象, OneNote]
---
如果您的开发环境支持 Java 8 或更高版本，Lambda 表达式应该可以正常工作，并且是处理类似情况的首选方法。Lambda 表达式为 Java 提供了一种更简洁和更直观的方式来实现只有单个方法的接口（如 ActivityResultCallback），这样的接口被称为函数式接口。

Lambda 表达式是 Java 8 引入的一种简洁的方式来表示只有一个方法的匿名内部类（即函数式接口的实现）。Lambda 表达式提供了一种更简单、更清晰的方式来编写这样的代码，特别是在处理事件监听器或者线程等场景中。

### Lambda 表达式简介

一个 Lambda 表达式由三部分组成：
1. 参数列表
2. 箭头符号 `-\>`
3. 方法体

例如：
`(parameters) -\> expression`
或
```java
(parameters) -\> { statements; }
如果方法没有参数，可以写成 `() -\> expression`。

### 示例

假设我们有一个简单的函数式接口：
```java
interface MyFunctionalInterface {
void execute();
}
使用 Lambda 表达式实现这个接口：
```java
MyFunctionalInterface myFunc = () -\> System.out.println("Hello World");
myFunc.execute(); // 输出 "Hello World"
### 使用类定义实现 `ActivityResultCallback`

在您的情况下，如果 Lambda 表达式和匿名类都不适用，您可以考虑创建一个实现了 `ActivityResultCallback` 接口的单独类。这种方式更传统，但在某些环境下可能是必要的。

以下是对 `MultiplePermissionsFragment` 中的 `ActivityResultCallback` 实现的修改：

首先，创建一个实现 `ActivityResultCallback` 接口的类：
```java
public class PermissionResultHandler implements ActivityResultCallback\<Map\<String, Boolean\>\> {
private MultiplePermissionsFragment fragment;

public PermissionResultHandler(MultiplePermissionsFragment fragment) {
this.fragment = fragment;
}

@Override
public void onActivityResult(Map\<String, Boolean\> result) {
fragment.updateUIBasedOnPermissions();
}
}
然后，在您的 `Fragment` 中使用这个类：
```java
public class MultiplePermissionsFragment extends Fragment {
// ... 其他成员变量 ...

private ActivityResultLauncher\<String[]\> permissionRequest;

@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
// ... 初始化视图 ...

this.permissionRequest = this.registerForActivityResult(
new ActivityResultContracts.RequestMultiplePermissions(),
new PermissionResultHandler(this)
);

// ... 其他逻辑 ...
}

// ... 其他方法 ...
}
在这个例子中，我们定义了一个名为 `PermissionResultHandler` 的新类，该类实现了 `ActivityResultCallback` 接口，并在 `onActivityResult` 方法中调用了 `fragment.updateUIBasedOnPermissions` 方法。这样，您就能够在不使用 Lambda 表达式或匿名类的情况下处理 Activity 结果。
