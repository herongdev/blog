---
title: Riverpod 最佳实践：WidgetsBinding + Provider Family 完整指南
date: 2025-01-27
tags: [Flutter, Riverpod, 最佳实践, WidgetsBinding]
---

# Riverpod 最佳实践：WidgetsBinding + Provider Family 完整指南

> 本文综合讲解如何在实际项目中正确使用 Riverpod，结合 WidgetsBinding 实现优雅的状态初始化。

## 经典场景：首帧后初始化

### 问题描述

```dart
// ❌ 常见错误写法
class MyPage extends ConsumerStatefulWidget {
  @override
  ConsumerState<MyPage> createState() => _MyPageState();
}

class _MyPageState extends ConsumerState<MyPage> {
  @override
  void initState() {
    super.initState();
    // 错误1：可能还没有布局信息
    ref.read(provider).init();
    
    // 错误2：在 initState 中调用 setState
    setState(() {});
    
    // 错误3：在 initState 中显示对话框
    showDialog(...); // 报错！
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

### 正确解决方案

```dart
class MyPage extends ConsumerStatefulWidget {
  const MyPage({super.key, required this.id});
  final String id;

  @override
  ConsumerState<MyPage> createState() => _MyPageState();
}

class _MyPageState extends ConsumerState<MyPage> {
  @override
  void initState() {
    super.initState();

    // ✅ 正确：使用 addPostFrameCallback
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return; // 必须检查
      
      ref.read(myProvider(widget.id).notifier).init();
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(myProvider(widget.id));
    
    return Scaffold(
      body: state.loading
          ? const CircularProgressIndicator()
          : Text(state.data),
    );
  }
}
```

## 完整实战示例

### 场景：商品编辑页面

这是一个真实项目中的典型场景：根据商品ID加载数据并编辑。

#### 1. 定义状态和控制器

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// ===== 状态定义 ===== //

@immutable
class ProductState {
  const ProductState({
    this.inited = false,
    this.loading = false,
    this.error,
    this.name = '',
    this.price = 0.0,
    this.description = '',
  });

  final bool inited;
  final bool loading;
  final String? error;
  final String name;
  final double price;
  final String description;

  ProductState copyWith({
    bool? inited,
    bool? loading,
    String? error,
    String? name,
    double? price,
    String? description,
  }) {
    return ProductState(
      inited: inited ?? this.inited,
      loading: loading ?? this.loading,
      error: error,
      name: name ?? this.name,
      price: price ?? this.price,
      description: description ?? this.description,
    );
  }
}

// ===== 控制器定义 ===== //

class ProductController extends FamilyNotifier<ProductState, String> {
  @override
  ProductState build(String productId) {
    // 为每个 productId 创建独立的初始状态
    return const ProductState();
  }

  // 复杂逻辑：初始化加载，确保幂等性
  Future<void> init() async {
    // 防止重复初始化
    if (state.inited) {
      print('已初始化，跳过: $arg');
      return;
    }

    print('开始初始化: $arg');
    state = state.copyWith(loading: true);

    try {
      // 模拟网络请求
      final data = await _loadProduct(arg);
      
      state = state.copyWith(
        inited: true,
        loading: false,
        name: data['name'],
        price: data['price'],
        description: data['description'],
      );
      
      print('初始化完成: $arg');
    } catch (e) {
      state = state.copyWith(
        loading: false,
        error: e.toString(),
      );
      
      print('初始化失败: $arg, $e');
    }
  }

  Future<Map<String, dynamic>> _loadProduct(String productId) async {
    // 模拟API调用延迟
    await Future.delayed(const Duration(seconds: 1));
    
    // 模拟返回数据
    return {
      'name': '商品-$productId',
      'price': 99.99,
      'description': '这是商品 $productId 的描述',
    };
  }

  // 更新字段
  void updateName(String name) {
    state = state.copyWith(name: name);
  }

  void updatePrice(double price) {
    state = state.copyWith(price: price);
  }

  void updateDescription(String description) {
    state = state.copyWith(description: description);
  }

  // 提交保存
  Future<void> save() async {
    state = state.copyWith(loading: true, error: null);

    try {
      await _saveProduct();
      
      state = state.copyWith(loading: false);
      print('保存成功: $arg');
    } catch (e) {
      state = state.copyWith(
        loading: false,
        error: e.toString(),
      );
      
      print('保存失败: $arg, $e');
      rethrow;
    }
  }

  Future<void> _saveProduct() async {
    await Future.delayed(const Duration(seconds: 1));
    print('提交数据: 商品ID=$arg, 名称=${state.name}, 价格=${state.price}');
  }

  // 重置状态
  void reset() {
    state = const ProductState();
  }
}

// ===== Provider 定义 ===== //

final productControllerProvider =
    NotifierProvider.family<ProductController, ProductState, String>(
  ProductController.new,
);
```

#### 2. 实现页面

```dart
class ProductEditPage extends ConsumerStatefulWidget {
  const ProductEditPage({super.key, required this.productId});
  
  final String productId;

  @override
  ConsumerState<ProductEditPage> createState() => _ProductEditPageState();
}

class _ProductEditPageState extends ConsumerState<ProductEditPage> {
  // 表单控制器
  late final TextEditingController _nameController;
  late final TextEditingController _priceController;
  late final TextEditingController _descController;

  @override
  void initState() {
    super.initState();

    // 初始化控制器
    _nameController = TextEditingController();
    _priceController = TextEditingController();
    _descController = TextEditingController();

    // 复杂逻辑：等首帧绘制完成后初始化数据
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;

      // 复杂逻辑：触发数据加载
      ref.read(productControllerProvider(widget.productId).notifier).init();
    });

    // 复杂逻辑：监听状态变化，同步到表单控制器
    ref.listenManual(productControllerProvider(widget.productId), (prev, next) {
      if (!mounted) return;
      
      // 数据加载完成后，更新表单
      if (next.inited && !next.loading) {
        _nameController.text = next.name;
        _priceController.text = next.price.toString();
        _descController.text = next.description;
      }
      
      // 显示错误提示
      if (next.error != null) {
        _showError(next.error!);
      }
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _priceController.dispose();
    _descController.dispose();
    super.dispose();
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _handleSave() async {
    try {
      await ref
          .read(productControllerProvider(widget.productId).notifier)
          .save();
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('保存成功')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      // 错误已在 controller 中处理
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(productControllerProvider(widget.productId));

    return Scaffold(
      appBar: AppBar(
        title: Text('编辑商品 ${widget.productId}'),
        actions: [
          if (state.loading)
            const Center(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                child: SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
              ),
            ),
        ],
      ),
      body: !state.inited
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextField(
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: '商品名称',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (value) {
                      ref
                          .read(productControllerProvider(widget.productId).notifier)
                          .updateName(value);
                    },
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _priceController,
                    decoration: const InputDecoration(
                      labelText: '价格',
                      border: OutlineInputBorder(),
                      prefixText: '¥ ',
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      final price = double.tryParse(value) ?? 0.0;
                      ref
                          .read(productControllerProvider(widget.productId).notifier)
                          .updatePrice(price);
                    },
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _descController,
                    decoration: const InputDecoration(
                      labelText: '描述',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 5,
                    onChanged: (value) {
                      ref
                          .read(productControllerProvider(widget.productId).notifier)
                          .updateDescription(value);
                    ),
                  ),
                  const SizedBox(height: 32),
                  ElevatedButton(
                    onPressed: state.loading ? null : _handleSave,
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(
                        state.loading ? '保存中...' : '保存',
                        style: const TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
```

#### 3. 使用示例

```dart
// 在路由中使用
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => const ProductEditPage(productId: 'prod-123'),
  ),
);

// 在列表中使用
class ProductListPage extends ConsumerWidget {
  const ProductListPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final products = ['prod-1', 'prod-2', 'prod-3'];

    return Scaffold(
      appBar: AppBar(title: const Text('商品列表')),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final productId = products[index];
          
          return ListTile(
            title: Text('商品 $productId'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProductEditPage(
                    productId: productId,
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
```

## 最佳实践总结

### 1. 初始化时机

```dart
// ✅ 推荐：addPostFrameCallback + mounted 检查
@override
void initState() {
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((_) {
    if (!mounted) return;
    ref.read(provider.notifier).init();
  });
}

// ❌ 避免：直接在 initState
@override
void initState() {
  super.initState();
  ref.read(provider.notifier).init(); // 可能太早
}

// ❌ 避免：在 build 中
@override
Widget build(BuildContext context) {
  ref.read(provider.notifier).init(); // 每次 rebuild 都调用！
  return Container();
}
```

### 2. ref 使用规则

```dart
// watch：监听状态，自动重建
final state = ref.watch(provider);

// read：一次性读取，调用方法
ref.read(provider.notifier).doSomething();

// listen：监听变化，执行副作用
ref.listen(provider, (prev, next) {
  if (next.error != null) {
    showError(next.error!);
  }
});

// listenManual：手动管理监听器
ref.listenManual(provider, (prev, next) {
  // 不会自动取消，需要在 dispose 中处理
});
```

### 3. 幂等性保护

```dart
class MyController extends Notifier<MyState> {
  @override
  MyState build() => const MyState();

  Future<void> init() async {
    // ✅ 防止重复初始化
    if (state.inited) return;
    
    // ✅ 使用标志位
    if (_isInitializing) return;
    _isInitializing = true;
    
    try {
      // 执行初始化...
      state = state.copyWith(inited: true);
    } finally {
      _isInitializing = false;
    }
  }
  
  bool _isInitializing = false;
}
```

### 4. 错误处理

```dart
class MyController extends Notifier<MyState> {
  @override
  MyState build() => const MyState();

  Future<void> loadData() async {
    state = state.copyWith(loading: true, error: null);

    try {
      final data = await api.fetchData();
      state = state.copyWith(
        loading: false,
        data: data,
      );
    } catch (e, stackTrace) {
      // ✅ 记录错误
      print('加载失败: $e');
      print(stackTrace);
      
      // ✅ 更新状态
      state = state.copyWith(
        loading: false,
        error: e.toString(),
      );
      
      // ✅ 可选：重新抛出
      rethrow;
    }
  }
}
```

### 5. 资源清理

```dart
class MyPage extends ConsumerStatefulWidget {
  @override
  ConsumerState<MyPage> createState() => _MyPageState();
}

class _MyPageState extends ConsumerState<MyPage> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    // ✅ 清理控制器
    _controller.dispose();
    
    // ✅ 可选：清理 Provider（如果使用 autoDispose 可省略）
    // ref.invalidate(myProvider);
    
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## 常见陷阱与解决方案

### 陷阱 1：忘记检查 mounted

```dart
// ❌ 错误
WidgetsBinding.instance.addPostFrameCallback((_) {
  ref.read(provider.notifier).init();
  setState(() {}); // 可能报错！
});

// ✅ 正确
WidgetsBinding.instance.addPostFrameCallback((_) {
  if (!mounted) return; // 必须检查
  ref.read(provider.notifier).init();
});
```

### 陷阱 2：在 build 中调用方法

```dart
// ❌ 错误
@override
Widget build(BuildContext context) {
  ref.read(provider.notifier).init(); // 每次 rebuild 都调用
  return Container();
}

// ✅ 正确
@override
void initState() {
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((_) {
    if (!mounted) return;
    ref.read(provider.notifier).init();
  });
}
```

### 陷阱 3：循环依赖

```dart
// ❌ 错误
final providerA = Provider((ref) {
  final b = ref.watch(providerB); // 依赖 B
  return A(b);
});

final providerB = Provider((ref) {
  final a = ref.watch(providerA); // 依赖 A，循环！
  return B(a);
});

// ✅ 正确：重新设计依赖关系
final baseProvider = Provider((ref) => Base());

final providerA = Provider((ref) {
  final base = ref.watch(baseProvider);
  return A(base);
});

final providerB = Provider((ref) {
  final base = ref.watch(baseProvider);
  return B(base);
});
```

### 陷阱 4：过度使用 Family

```dart
// ❌ 不推荐：参数是可变对象
final provider = Provider.family<State, List<String>>(...);

// ✅ 推荐：参数是不可变值
final provider = Provider.family<State, String>(...);

// ✅ 推荐：使用 record 或不可变类
final provider = Provider.family<State, ({String keyword, int page})>(...);
```

## 总结

### 核心原则

1. **等首帧完成**：使用 `addPostFrameCallback`
2. **检查 mounted**：避免访问已销毁的组件
3. **幂等性保护**：防止重复初始化
4. **错误处理**：完善的错误捕获和提示
5. **资源清理**：及时释放资源

### 代码清单

```dart
// 标准初始化模式
@override
void initState() {
  super.initState();
  
  WidgetsBinding.instance.addPostFrameCallback((_) {
    if (!mounted) return;
    ref.read(provider(id).notifier).init();
  });
}

// 标准控制器模式
class MyController extends FamilyNotifier<State, String> {
  @override
  State build(String id) => const State();

  Future<void> init() async {
    if (state.inited) return; // 幂等性
    
    state = state.copyWith(loading: true);
    
    try {
      final data = await loadData(arg);
      state = state.copyWith(inited: true, loading: false, data: data);
    } catch (e) {
      state = state.copyWith(loading: false, error: e.toString());
      rethrow;
    }
  }
}
```

### 下一步学习

- [Provider Family 详解](./04-ProviderFamily.md)
- [帧回调机制](../02-核心概念/07-帧回调机制.md)
- [WidgetsBinding 详解](../02-核心概念/06-WidgetsBinding详解.md)

---

**相关资源：**
- [Riverpod 官方文档](https://riverpod.dev/)
- [Flutter 最佳实践](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options)
