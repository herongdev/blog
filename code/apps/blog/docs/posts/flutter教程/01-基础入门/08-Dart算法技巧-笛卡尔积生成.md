---
title: Dart 算法技巧：笛卡尔积生成详解
date: 2025-01-27
tags: [Dart, 算法, 笛卡尔积, 组合生成]
---

# Dart 算法技巧：笛卡尔积生成详解

> 逐行拆解如何用迭代方式生成属性值的所有组合（笛卡尔积），并给出完整示例、复杂度分析与常见陷阱。

## 问题场景

在电商、表单等业务中，经常需要生成所有属性组合：

```dart
// 输入：每个属性的可选值
final attrValues = [
  ['红', '绿', '蓝'],  // 颜色
  ['S', 'M', 'L'],     // 尺寸
  ['棉', '麻'],        // 材质
];

// 期望输出：所有组合（笛卡尔积）
// ['红', 'S', '棉']
// ['红', 'S', '麻']
// ['红', 'M', '棉']
// ['红', 'M', '麻']
// ...
// 共 3 × 3 × 2 = 18 种组合
```

## 核心代码

### 完整实现

```dart
List<List<String>> generateCombinations(List<List<String>> attrValues) {
  // 复杂逻辑：初始化"已有组合"为一个"空组合"，方便后续用"累乘"思路扩展
  List<List<String>> combinations = [[]];

  for (var values in attrValues) {
    // 复杂逻辑：为当前这一层属性的扩展结果准备一个新容器
    List<List<String>> newCombinations = [];

    for (var combination in combinations) {
      for (var value in values) {
        // 复杂逻辑：在"旧组合"的末尾追加当前属性的一个取值，形成一个"新组合"
        newCombinations.add([...combination, value]);
      }
    }

    // 复杂逻辑：完成这一层属性扩展后，更新"已知组合"为新结果，进入下一层
    combinations = newCombinations;
  }

  return combinations;
}
```

### 逐行解释

```dart
// 第 1 行：初始化
List<List<String>> combinations = [[]];
```

- **为什么是 `[[]]`？** 这是"乘法单位元"思想
- 空组合 `[]` 作为起点，方便第一轮扩展
- 类比数学：`1 × a = a`，这里 `[] × [a,b,c] = [[a],[b],[c]]`

```dart
// 第 2 行：遍历每个属性
for (var values in attrValues) {
```

- 逐层处理每个属性的取值列表
- 例如：第一次处理颜色，第二次处理尺寸...

```dart
// 第 3 行：准备新容器
List<List<String>> newCombinations = [];
```

- 为当前层的扩展结果准备存储空间
- 不能直接修改 `combinations`，需要新建

```dart
// 第 4-6 行：双层循环生成新组合
for (var combination in combinations) {
  for (var value in values) {
    newCombinations.add([...combination, value]);
  }
}
```

- **外层**：遍历上一轮的所有组合
- **内层**：遍历当前属性的所有值
- **扩展**：`[...combination, value]` 创建新列表，追加当前值

```dart
// 第 7 行：更新组合列表
combinations = newCombinations;
```

- 用新生成的组合替换旧的
- 进入下一层属性处理

## 执行过程可视化

### 输入数据

```dart
final attrValues = [
  ['红', '绿', '蓝'],  // 颜色
  ['S', 'M'],          // 尺寸
];
```

### 执行步骤

```
初始状态：
combinations = [[]]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第 1 轮：处理颜色 ['红', '绿', '蓝']
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

旧组合: [[]]
当前值: '红' → 新组合: [['红']]
当前值: '绿' → 新组合: [['红'], ['绿']]
当前值: '蓝' → 新组合: [['红'], ['绿'], ['蓝']]

更新后：
combinations = [['红'], ['绿'], ['蓝']]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第 2 轮：处理尺寸 ['S', 'M']
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

旧组合: [['红'], ['绿'], ['蓝']]

处理 ['红']：
  + 'S' → ['红', 'S']
  + 'M' → ['红', 'M']

处理 ['绿']：
  + 'S' → ['绿', 'S']
  + 'M' → ['绿', 'M']

处理 ['蓝']：
  + 'S' → ['蓝', 'S']
  + 'M' → ['蓝', 'M']

更新后：
combinations = [
  ['红', 'S'], ['红', 'M'],
  ['绿', 'S'], ['绿', 'M'],
  ['蓝', 'S'], ['蓝', 'M'],
]
```

## 完整可运行示例

```dart
void main() {
  // 示例 1：基本用法
  print('=== 示例 1：基本用法 ===');
  final attrValues1 = [
    ['红', '绿', '蓝'],
    ['S', 'M'],
  ];

  final result1 = generateCombinations(attrValues1);
  print('输入: $attrValues1');
  print('组合数: ${result1.length}');
  print('结果:');
  for (var combo in result1) {
    print('  $combo');
  }

  // 示例 2：三个属性
  print('\n=== 示例 2：三个属性 ===');
  final attrValues2 = [
    ['红', '绿'],
    ['S', 'M'],
    ['棉', '麻'],
  ];

  final result2 = generateCombinations(attrValues2);
  print('输入: $attrValues2');
  print('组合数: ${result2.length} (应该是 2 × 2 × 2 = 8)');
  print('结果:');
  for (var combo in result2) {
    print('  ${combo.join(' + ')}');
  }

  // 示例 3：包含空数组
  print('\n=== 示例 3：包含空数组（陷阱）===');
  final attrValues3 = [
    ['红', '绿'],
    [],              // 空数组！
    ['S', 'M'],
  ];

  final result3 = generateCombinations(attrValues3);
  print('输入: $attrValues3');
  print('组合数: ${result3.length} (结果为 0！)');

  // 示例 4：使用规范化处理空数组
  print('\n=== 示例 4：规范化处理 ===');
  final result4 = generateCombinationsNormalized(attrValues3);
  print('输入: $attrValues3');
  print('组合数: ${result4.length}');
  print('结果:');
  for (var combo in result4) {
    print('  $combo');
  }
}

// 基础版本
List<List<String>> generateCombinations(List<List<String>> attrValues) {
  List<List<String>> combinations = [[]];

  for (var values in attrValues) {
    List<List<String>> newCombinations = [];

    for (var combination in combinations) {
      for (var value in values) {
        newCombinations.add([...combination, value]);
      }
    }

    combinations = newCombinations;
  }

  return combinations;
}

// 规范化版本（处理空数组）
List<List<String>> generateCombinationsNormalized(List<List<String>> attrValues) {
  List<List<String>> combinations = [[]];

  for (var values in attrValues) {
    // 复杂逻辑：跳过空属性组，避免结果为空
    if (values.isEmpty) continue;

    List<List<String>> newCombinations = [];

    for (var combination in combinations) {
      for (var value in values) {
        newCombinations.add([...combination, value]);
      }
    }

    combinations = newCombinations;
  }

  return combinations;
}
```

### 运行结果

```
=== 示例 1：基本用法 ===
输入: [[红, 绿, 蓝], [S, M]]
组合数: 6
结果:
  [红, S]
  [红, M]
  [绿, S]
  [绿, M]
  [蓝, S]
  [蓝, M]

=== 示例 2：三个属性 ===
输入: [[红, 绿], [S, M], [棉, 麻]]
组合数: 8 (应该是 2 × 2 × 2 = 8)
结果:
  红 + S + 棉
  红 + S + 麻
  红 + M + 棉
  红 + M + 麻
  绿 + S + 棉
  绿 + S + 麻
  绿 + M + 棉
  绿 + M + 麻

=== 示例 3：包含空数组（陷阱）===
输入: [[红, 绿], [], [S, M]]
组合数: 0 (结果为 0！)

=== 示例 4：规范化处理 ===
输入: [[红, 绿], [], [S, M]]
组合数: 4
结果:
  [红, S]
  [红, M]
  [绿, S]
  [绿, M]
```

## 复杂度分析

### 时间复杂度

```dart
// 假设有 n 个属性，每个属性有 m 个值
// 最终组合数 = m^n
// 每个组合需要 O(n) 时间复制
// 总时间复杂度 = O(n × m^n)

// 具体示例：
// 3 个属性，每个 10 个值
// 组合数 = 10^3 = 1,000
// 时间 ≈ 3 × 1,000 = 3,000 次操作
```

### 空间复杂度

```dart
// 需要存储所有组合
// 空间复杂度 = O(m^n)

// 示例：
final attrs = [
  List.generate(20, (i) => 'v$i'),  // 20 个值
  List.generate(10, (i) => 'v$i'),  // 10 个值
  List.generate(10, (i) => 'v$i'),  // 10 个值
];

// 组合数 = 20 × 10 × 10 = 2,000（可接受）

final bigAttrs = [
  List.generate(50, (i) => 'v$i'),  // 50 个值
  List.generate(50, (i) => 'v$i'),  // 50 个值
  List.generate(50, (i) => 'v$i'),  // 50 个值
];

// 组合数 = 50 × 50 × 50 = 125,000（需警惕内存）
```

## 常见陷阱与解决方案

### 陷阱 1：空数组导致结果为空

```dart
// ❌ 问题
final attrs = [
  ['红', '绿'],
  [],              // 空数组！
  ['S', 'M'],
];

final result = generateCombinations(attrs);
print(result.length); // 0（期望是 4）

// ✅ 解决方案 1：跳过空数组
List<List<String>> generateCombinationsSafe(List<List<String>> attrValues) {
  List<List<String>> combinations = [[]];

  for (var values in attrValues) {
    // 复杂逻辑：跳过空属性组
    if (values.isEmpty) continue;

    List<List<String>> newCombinations = [];
    for (var combination in combinations) {
      for (var value in values) {
        newCombinations.add([...combination, value]);
      }
    }
    combinations = newCombinations;
  }

  return combinations;
}

// ✅ 解决方案 2：用占位符
List<List<String>> generateCombinationsWithPlaceholder(
  List<List<String>> attrValues
) {
  // 复杂逻辑：空数组用占位符 '' 替代
  final normalized = attrValues.map((g) => g.isEmpty ? [''] : g).toList();

  return generateCombinations(normalized);
}
```

### 陷阱 2：组合数爆炸

```dart
// ❌ 危险：组合数过大
final dangerousAttrs = [
  List.generate(100, (i) => 'v$i'),  // 100 个值
  List.generate(100, (i) => 'v$i'),  // 100 个值
  List.generate(100, (i) => 'v$i'),  // 100 个值
];
// 组合数 = 100^3 = 1,000,000（内存爆炸！）

// ✅ 解决方案：限制上限
List<List<String>> generateCombinationsWithLimit(
  List<List<String>> attrValues,
  {int maxCombinations = 10000}
) {
  // 先计算总组合数
  int totalCombinations = 1;
  for (var values in attrValues) {
    totalCombinations *= values.length;
    if (totalCombinations > maxCombinations) {
      throw Exception('组合数超过限制: $maxCombinations');
    }
  }

  return generateCombinations(attrValues);
}

// ✅ 解决方案：懒加载生成器
Iterable<List<String>> generateCombinationsLazy(
  List<List<String>> attrValues
) sync* {
  if (attrValues.isEmpty) {
    yield [];
    return;
  }

  if (attrValues.length == 1) {
    for (var value in attrValues[0]) {
      yield [value];
    }
    return;
  }

  // 递归生成
  final first = attrValues[0];
  final rest = attrValues.sublist(1);

  for (var value in first) {
    for (var restCombo in generateCombinationsLazy(rest)) {
      yield [value, ...restCombo];
    }
  }
}
```

### 陷阱 3：引用共享问题

```dart
// ❌ 错误：直接修改旧列表
newCombinations.add(combination..add(value)); // 修改了原列表！

// ✅ 正确：创建新列表
newCombinations.add([...combination, value]); // 解构复制

// ✅ 也可以
newCombinations.add(List.from(combination)..add(value));
```

### 陷阱 4：重复值

```dart
// ❌ 问题：输入有重复
final attrs = [
  ['红', '红', '绿'],  // 重复的"红"
  ['S', 'M'],
];

final result = generateCombinations(attrs);
// 结果：
// ['红', 'S'], ['红', 'S'], ['绿', 'S']  // 重复！
// ['红', 'M'], ['红', 'M'], ['绿', 'M']

// ✅ 解决方案 1：输入去重
final deduped = attrs.map((g) => g.toSet().toList()).toList();

// ✅ 解决方案 2：结果去重
final uniqueResult = result.map((combo) => combo.join(',')).toSet()
    .map((str) => str.split(',')).toList();
```

## 性能优化

### 优化版本 1：预计算容量

```dart
List<List<String>> generateCombinationsOptimized(
  List<List<String>> attrValues
) {
  List<List<String>> combinations = [[]];

  for (var values in attrValues) {
    if (values.isEmpty) continue;

    // 复杂逻辑：预计算新容器大小，减少扩容次数
    final newSize = combinations.length * values.length;
    List<List<String>> newCombinations = List.empty(growable: true);

    for (var combination in combinations) {
      for (var value in values) {
        newCombinations.add([...combination, value]);
      }
    }

    combinations = newCombinations;
  }

  return combinations;
}
```

### 优化版本 2：使用固定长度列表

```dart
List<List<String>> generateCombinationsFast(
  List<List<String>> attrValues
) {
  if (attrValues.isEmpty) return [[]];

  // 过滤空数组
  final validAttrs = attrValues.where((v) => v.isNotEmpty).toList();
  if (validAttrs.isEmpty) return [[]];

  // 计算总组合数
  int total = 1;
  for (var values in validAttrs) {
    total *= values.length;
  }

  // 使用固定长度列表
  final result = List<List<String>>.filled(total, []);
  int index = 0;

  void generate(int depth, List<String> current) {
    if (depth == validAttrs.length) {
      result[index++] = List.from(current);
      return;
    }

    for (var value in validAttrs[depth]) {
      generate(depth + 1, [...current, value]);
    }
  }

  generate(0, []);
  return result;
}
```

## 实战应用

### 应用 1：生成 SKU 组合

```dart
class Product {
  final String name;
  final Map<String, List<String>> attributes;

  const Product(this.name, this.attributes);
}

class SKU {
  final String skuId;
  final Map<String, String> attributes;
  final double price;

  SKU({
    required this.skuId,
    required this.attributes,
    this.price = 0.0,
  });
}

List<SKU> generateSKUs(Product product) {
  // 提取属性值
  final attrNames = product.attributes.keys.toList();
  final attrValues = product.attributes.values.toList();

  // 生成组合
  final combinations = generateCombinations(attrValues);

  // 构建 SKU 列表
  return combinations.map((combo) {
    final attrs = <String, String>{};
    for (int i = 0; i < attrNames.length; i++) {
      attrs[attrNames[i]] = combo[i];
    }

    return SKU(
      skuId: 'SKU-${combo.join('-')}',
      attributes: attrs,
    );
  }).toList();
}

// 使用示例
void testSKUGeneration() {
  final product = Product('T恤', {
    '颜色': ['红', '绿', '蓝'],
    '尺寸': ['S', 'M', 'L'],
    '材质': ['棉', '麻'],
  });

  final skus = generateSKUs(product);

  print('生成 ${skus.length} 个 SKU:');
  for (var sku in skus) {
    print('${sku.skuId}: ${sku.attributes}');
  }
}
```

### 应用 2：表单选项组合

```dart
class FormOption {
  final String name;
  final List<String> options;

  const FormOption(this.name, this.options);
}

List<Map<String, String>> generateFormCombinations(
  List<FormOption> formOptions
) {
  final names = formOptions.map((o) => o.name).toList();
  final values = formOptions.map((o) => o.options).toList();

  final combinations = generateCombinations(values);

  return combinations.map((combo) {
    final result = <String, String>{};
    for (int i = 0; i < names.length; i++) {
      result[names[i]] = combo[i];
    }
    return result;
  }).toList();
}

// 使用示例
void testFormCombinations() {
  final options = [
    FormOption('支付方式', ['微信', '支付宝', '银行卡']),
    FormOption('配送方式', ['快递', '自提']),
  ];

  final combinations = generateFormCombinations(options);

  print('表单组合:');
  for (var combo in combinations) {
    print(combo);
  }
}
```

## 高级技巧

### 技巧 1：带索引信息

```dart
class CombinationWithIndex {
  final List<String> values;
  final List<int> indices;

  CombinationWithIndex(this.values, this.indices);

  @override
  String toString() => 'values: $values, indices: $indices';
}

List<CombinationWithIndex> generateCombinationsWithIndex(
  List<List<String>> attrValues
) {
  List<List<int>> indexCombinations = [[]];

  for (int attrIndex = 0; attrIndex < attrValues.length; attrIndex++) {
    final values = attrValues[attrIndex];
    if (values.isEmpty) continue;

    List<List<int>> newCombinations = [];

    for (var combination in indexCombinations) {
      for (int valueIndex = 0; valueIndex < values.length; valueIndex++) {
        newCombinations.add([...combination, valueIndex]);
      }
    }

    indexCombinations = newCombinations;
  }

  // 转换为值和索引
  return indexCombinations.map((indices) {
    final values = <String>[];
    for (int i = 0; i < indices.length; i++) {
      values.add(attrValues[i][indices[i]]);
    }
    return CombinationWithIndex(values, indices);
  }).toList();
}
```

### 技巧 2：生成器模式（节省内存）

```dart
class CombinationGenerator {
  final List<List<String>> attrValues;

  CombinationGenerator(this.attrValues);

  // 生成器：按需产生组合
  Iterable<List<String>> generate() sync* {
    if (attrValues.isEmpty) {
      yield [];
      return;
    }

    // 过滤空数组
    final validAttrs = attrValues.where((v) => v.isNotEmpty).toList();
    if (validAttrs.isEmpty) {
      yield [];
      return;
    }

    yield* _generateRecursive(validAttrs, 0, []);
  }

  Iterable<List<String>> _generateRecursive(
    List<List<String>> attrs,
    int depth,
    List<String> current,
  ) sync* {
    if (depth == attrs.length) {
      yield List.from(current);
      return;
    }

    for (var value in attrs[depth]) {
      yield* _generateRecursive(attrs, depth + 1, [...current, value]);
    }
  }

  // 获取总数（不生成实际组合）
  int count() {
    int total = 1;
    for (var values in attrValues) {
      if (values.isEmpty) return 0;
      total *= values.length;
    }
    return total;
  }
}

// 使用示例
void testGenerator() {
  final generator = CombinationGenerator([
    ['红', '绿', '蓝'],
    ['S', 'M'],
  ]);

  print('总组合数: ${generator.count()}');

  print('生成组合:');
  for (var combo in generator.generate()) {
    print(combo);
  }
}
```

## 总结

### 核心要点

1. **笛卡尔积**：所有属性值的完全组合
2. **迭代构造**：从空组合开始，逐层扩展
3. **空数组陷阱**：会导致结果为空
4. **复杂度**：时间和空间都是指数级增长
5. **优化方向**：生成器模式、限制上限

### 使用建议

| 场景            | 推荐方案            |
| --------------- | ------------------- |
| 组合数 < 1,000  | 基础版本            |
| 组合数 < 10,000 | 优化版本 + 限制检查 |
| 组合数 > 10,000 | 生成器模式 + 分页   |
| 可能有空数组    | 规范化版本          |

### 实际应用

- ✅ 电商 SKU 生成
- ✅ 表单选项组合
- ✅ 测试用例生成
- ✅ 配置项组合
- ❌ 海量数据场景

### 下一步学习

- [Dart 集合操作](./09-Dart集合操作.md)
- [Dart 函数式编程](./10-Dart函数式编程.md)
- [性能优化技巧](../08-性能优化/01-渲染优化.md)

---

**相关资源：**

- [Dart 集合文档](https://dart.dev/guides/libraries/library-tour#collections)
- [算法复杂度分析](https://dart.dev/guides/language/effective-dart/usage)
