---
title: Riverpod Provider Family 详解：参数化状态管理
date: 2025-01-27
tags: [Flutter, Riverpod, Provider Family, 状态管理]
---

# Riverpod Provider Family 详解：参数化状态管理

> 本文深入讲解 Riverpod 中的 Provider Family，教你如何为不同参数创建独立的状态域。

## 什么是 Provider Family？

Provider Family 是 Riverpod 提供的一种机制，允许你**基于参数**创建多个独立的 Provider 实例。

### 为什么需要 Family？

```dart
// ❌ 问题：如何为不同的用户ID创建独立的状态？
final userProvider = StateNotifierProvider<UserController, UserState>(...);

// ✅ 解决：使用 Family
final userProvider = StateNotifierProvider.family<UserController, UserState, String>(
  (ref, userId) => UserController(userId),
);

// 使用：每个 userId 都有独立的状态
final user1 = ref.watch(userProvider('user-1'));
final user2 = ref.watch(userProvider('user-2'));
```

## 基础用法

### 定义 Family Provider

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 状态类
class UserState {
  const UserState({
    required this.id,
    this.name = '',
    this.loading = false,
  });

  final String id;
  final String name;
  final bool loading;

  UserState copyWith({
    String? name,
    bool? loading,
  }) {
    return UserState(
      id: id,
      name: name ?? this.name,
      loading: loading ?? this.loading,
    );
  }
}

// 控制器
class UserController extends Notifier<UserState> {
  @override
  UserState build(String userId) {
    // 使用传入的 userId 初始化状态
    return UserState(id: userId);
  }

  Future<void> loadUser() async {
    state = state.copyWith(loading: true);
    
    // 模拟网络请求
    await Future.delayed(const Duration(seconds: 1));
    
    state = state.copyWith(
      name: '用户-${state.id}',
      loading: false,
    );
  }
}

// 定义 Family Provider
final userProvider = NotifierProvider.family<UserController, UserState, String>(
  UserController.new,
);
```

### 在 Widget 中使用

```dart
class UserProfilePage extends ConsumerWidget {
  const UserProfilePage({super.key, required this.userId});
  
  final String userId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 根据 userId 获取对应的状态
    final userState = ref.watch(userProvider(userId));

    return Scaffold(
      appBar: AppBar(title: Text('用户 $userId')),
      body: Column(
        children: [
          Text('ID: ${userState.id}'),
          Text('名称: ${userState.name}'),
          if (userState.loading)
            const CircularProgressIndicator(),
          ElevatedButton(
            onPressed: () {
              // 调用对应实例的方法
              ref.read(userProvider(userId).notifier).loadUser();
            },
            child: const Text('加载用户信息'),
          ),
        ],
      ),
    );
  }
}
```

## 完整示例：商品表单管理

这是原文中的核心场景：为不同的商品ID维护独立的表单状态。

### 定义状态和控制器

```dart
// 表单状态
class SpuFormState {
  const SpuFormState({
    this.inited = false,
    this.loading = false,
    this.name = '',
    this.price = 0.0,
  });

  final bool inited;
  final bool loading;
  final String name;
  final double price;

  SpuFormState copyWith({
    bool? inited,
    bool? loading,
    String? name,
    double? price,
  }) {
    return SpuFormState(
      inited: inited ?? this.inited,
      loading: loading ?? this.loading,
      name: name ?? this.name,
      price: price ?? this.price,
    );
  }
}

// 表单控制器
class SpuFormController extends FamilyNotifier<SpuFormState, String> {
  @override
  SpuFormState build(String spuId) {
    // 每个 spuId 都有独立的初始状态
    return const SpuFormState();
  }

  // 复杂逻辑：初始化表单，确保幂等性
  Future<void> init() async {
    // 防止重复初始化
    if (state.inited) return;

    state = state.copyWith(loading: true);

    try {
      // 从服务器加载商品信息
      final spuData = await _loadSpuData(arg); // arg 是传入的 spuId
      
      state = state.copyWith(
        inited: true,
        loading: false,
        name: spuData['name'] ?? '',
        price: spuData['price'] ?? 0.0,
      );
    } catch (e) {
      state = state.copyWith(loading: false);
      rethrow;
    }
  }

  Future<Map<String, dynamic>> _loadSpuData(String spuId) async {
    // 模拟API请求
    await Future.delayed(const Duration(seconds: 1));
    return {
      'name': '商品-$spuId',
      'price': 99.99,
    };
  }

  void updateName(String name) {
    state = state.copyWith(name: name);
  }

  void updatePrice(double price) {
    state = state.copyWith(price: price);
  }

  Future<void> submit() async {
    state = state.copyWith(loading: true);
    
    try {
      // 提交表单
      await _submitForm();
      state = state.copyWith(loading: false);
    } catch (e) {
      state = state.copyWith(loading: false);
      rethrow;
    }
  }

  Future<void> _submitForm() async {
    await Future.delayed(const Duration(seconds: 1));
    print('提交商品: ${arg}, 名称: ${state.name}, 价格: ${state.price}');
  }
}

// 定义 Provider
final spuFormControllerProvider =
    NotifierProvider.family<SpuFormController, SpuFormState, String>(
  SpuFormController.new,
);
```

### 在页面中使用

```dart
class SpuFormPage extends ConsumerStatefulWidget {
  const SpuFormPage({super.key, required this.spuId});
  
  final String spuId;

  @override
  ConsumerState<SpuFormPage> createState() => _SpuFormPageState();
}

class _SpuFormPageState extends ConsumerState<SpuFormPage> {
  @override
  void initState() {
    super.initState();

    // 复杂逻辑：等首帧绘制完成后初始化表单
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;

      // 复杂逻辑：读取指定 spuId 的控制器并初始化
      ref.read(spuFormControllerProvider(widget.spuId).notifier).init();
    });
  }

  @override
  Widget build(BuildContext context) {
    // 监听状态变化
    final state = ref.watch(spuFormControllerProvider(widget.spuId));

    return Scaffold(
      appBar: AppBar(title: Text('编辑商品 ${widget.spuId}')),
      body: state.loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  TextField(
                    decoration: const InputDecoration(labelText: '商品名称'),
                    controller: TextEditingController(text: state.name),
                    onChanged: (value) {
                      ref
                          .read(spuFormControllerProvider(widget.spuId).notifier)
                          .updateName(value);
                    },
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    decoration: const InputDecoration(labelText: '价格'),
                    keyboardType: TextInputType.number,
                    controller: TextEditingController(
                      text: state.price.toString(),
                    ),
                    onChanged: (value) {
                      final price = double.tryParse(value) ?? 0.0;
                      ref
                          .read(spuFormControllerProvider(widget.spuId).notifier)
                          .updatePrice(price);
                    },
                  ),
                  const SizedBox(height: 32),
                  ElevatedButton(
                    onPressed: () {
                      ref
                          .read(spuFormControllerProvider(widget.spuId).notifier)
                          .submit();
                    },
                    child: const Text('提交'),
                  ),
                ],
              ),
            ),
    );
  }
}
```

## Family 的核心概念

### 1. ref.read() vs ref.watch()

```dart
// watch：订阅状态变化，自动重建
final state = ref.watch(userProvider(userId));

// read：一次性读取，不订阅
ref.read(userProvider(userId).notifier).loadUser();

// listen：监听变化执行副作用
ref.listen(userProvider(userId), (prev, next) {
  if (next.error != null) {
    showErrorDialog(next.error!);
  }
});
```

### 2. .notifier 的作用

```dart
// 获取状态
final state = ref.read(userProvider(userId));

// 获取控制器（可调用方法）
final controller = ref.read(userProvider(userId).notifier);
controller.loadUser();
controller.updateName('新名称');
```

### 3. 参数要求

```dart
// ✅ 正确：基本类型
final provider = Provider.family<State, String>(...);
final provider = Provider.family<State, int>(...);

// ✅ 正确：可序列化对象
class UserId {
  const UserId(this.value);
  final String value;
  
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserId && value == other.value;
  
  @override
  int get hashCode => value.hashCode;
}

// ❌ 错误：可变对象
final provider = Provider.family<State, List<String>>(...);
```

## 高级用法

### 多参数 Family

```dart
// 使用 record 传递多个参数
final searchProvider = NotifierProvider.family<
  SearchController,
  SearchState,
  ({String keyword, int page}) // record 类型
>(SearchController.new);

// 使用
ref.watch(searchProvider((keyword: '手机', page: 1)));
```

### 自动清理

```dart
// 当没有任何 Widget 监听时，Provider 会自动销毁
final userProvider = NotifierProvider.family.autoDispose<
  UserController,
  UserState,
  String
>(UserController.new);
```

### 缓存控制

```dart
// 手动销毁特定参数的 Provider
ref.invalidate(userProvider('user-1'));

// 销毁所有参数的 Provider
ref.invalidate(userProvider);
```

## 常见问题

### Q1. 何时使用 Family？

| 场景 | 是否使用 Family |
|------|----------------|
| 列表中每项需要独立状态 | ✅ 使用 |
| 详情页需要根据ID加载 | ✅ 使用 |
| 全局单例状态 | ❌ 普通 Provider |
| 主题、语言等配置 | ❌ 普通 Provider |

### Q2. 参数变化时会怎样？

```dart
class MyPage extends ConsumerWidget {
  const MyPage({super.key, required this.userId});
  final String userId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 当 userId 变化时，会自动切换到新的 Provider 实例
    final user = ref.watch(userProvider(userId));
    return Text(user.name);
  }
}
```

### Q3. 如何避免内存泄漏？

```dart
// ✅ 使用 autoDispose
final provider = NotifierProvider.family.autoDispose<
  Controller,
  State,
  String
>(...);

// ✅ 手动清理
@override
void dispose() {
  ref.invalidate(userProvider(widget.userId));
  super.dispose();
}
```

### Q4. 如何在初始化时传入参数？

```dart
class MyController extends FamilyNotifier<State, String> {
  @override
  State build(String userId) {
    // 使用 userId 参数初始化
    // 这里可以访问 arg 属性（等于 userId）
    return State(id: userId);
  }

  void doSomething() {
    // 在方法中使用参数
    print('处理用户: ${arg}');
  }
}
```

## 最佳实践

### 1. 参数类型选择

```dart
// ✅ 推荐：基本类型
final provider = Provider.family<State, String>(...);
final provider = Provider.family<State, int>(...);

// ✅ 可以：不可变对象
@immutable
class Query {
  const Query(this.keyword, this.page);
  final String keyword;
  final int page;
}

// ❌ 避免：可变对象
class MutableQuery {
  String keyword; // 可变！
  int page;
}
```

### 2. 初始化时机

```dart
// ✅ 推荐：在 initState + addPostFrameCallback
@override
void initState() {
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((_) {
    if (!mounted) return;
    ref.read(provider(id).notifier).init();
  });
}

// ❌ 避免：在 build 中
@override
Widget build(BuildContext context) {
  ref.read(provider(id).notifier).init(); // 每次 rebuild 都会调用！
  return Container();
}
```

### 3. 幂等性保护

```dart
class MyController extends FamilyNotifier<State, String> {
  @override
  State build(String id) => State(inited: false);

  Future<void> init() async {
    // ✅ 防止重复初始化
    if (state.inited) return;
    
    state = state.copyWith(inited: true);
    // 执行初始化...
  }
}
```

## 总结

### 核心要点

1. **Provider Family** 为不同参数创建独立状态域
2. **参数必须可比较**且不可变
3. 使用 `ref.read(...).notifier` 调用方法
4. 使用 `ref.watch(...)` 监听状态
5. 配合 `addPostFrameCallback` 进行初始化

### 使用场景

- ✅ 列表项独立状态
- ✅ 详情页根据ID加载
- ✅ 多实例表单管理
- ✅ 搜索结果缓存
- ❌ 全局单例
- ❌ 简单配置

### 下一步学习

- [Riverpod 最佳实践](./05-Riverpod最佳实践.md)
- [帧回调机制](../02-核心概念/07-帧回调机制.md)
- [State 管理对比](./08-方案对比.md)

---

**相关资源：**
- [Riverpod 官方文档 - Family](https://riverpod.dev/docs/concepts/modifiers/family)
- [Provider Family 进阶](https://riverpod.dev/docs/concepts/modifiers/auto_dispose)
