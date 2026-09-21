# UTS 数据类型快速入门

> **目标读者**：刚接触 UTS 的开发者，特别是来自 JavaScript/TypeScript 背景的同学
>
> **覆盖内容**：最常用的数据类型、基本语法、实用示例
>
> **阅读时间**：15 分钟

---

## 为什么需要类型？

UTS 是强类型语言，与 JavaScript 不同：

- ✅ **高性能**：明确的类型带来更大优化空间（Android/iOS）
- ✅ **代码安全**：类型检查、非空检查提高代码健壮性
- ✅ **更好提示**：IDE 能提供精确的代码补全

**学习心态**：你将牺牲一些代码灵活性，来换取代码的健壮性和高性能。

---

## 一、基础类型（必须掌握）

### 1. 布尔值 (boolean)

```ts
let isReady: boolean = true;
let isComplete = false; // 自动推导为 boolean
```

### 2. 数字 (number)

UTS 统一使用 `number` 类型，兼容整数和浮点数：

```ts
let age: number = 25;
let price = 99.9; // 自动推导为 number
let count = 0; // 自动推导为 number
```

### 3. 字符串 (string)

```ts
let name: string = "张三";
let message = "欢迎使用"; // 自动推导为 string
let template = `用户：${name}`; // 支持模板字符串
```

### 4. 空值处理 (null)

**重要**：UTS 中变量默认不能为空，需要显式声明可为空：

```ts
// ❌ 错误写法
let userName: string = null; // 编译错误

// ✅ 正确写法
let userName: string | null = null; // 可为空的字符串
userName = "张三"; // 赋值后就不为空了

// 安全访问
console.log(userName?.length); // 使用 ?. 安全调用
```

---

## 二、复合类型

### 1. 数组 (Array)

```ts
// 方式一：类型[]
let numbers: number[] = [1, 2, 3];
let names: string[] = ["张三", "李四"];

// 方式二：Array<类型>
let scores: Array<number> = [90, 85, 92];

// 空数组需要指定类型
let emptyList: string[] = [];
```

**常用操作：**

```ts
let fruits = ["苹果", "香蕉", "橙子"];

// 遍历
fruits.forEach((fruit: string, index: number) => {
  console.log(`${index}: ${fruit}`);
});

// 添加元素
fruits.push("葡萄");

// 获取长度
console.log(fruits.length);
```

**进阶提示**：UTS Array 在不同平台有专门的转换方法，比如 Android 平台可以与 Java/Kotlin 原生数组互转，详见[进阶指南](./UTS数据类型进阶指南.md#三数组类型深度)。

### 2. 对象 (UTSJSONObject)

`UTSJSONObject` 是 UTS 的内置类型，专门用来操作匿名对象，支持 Vue 响应式变更（3.97+）。

#### 创建 UTSJSONObject

```ts
// 方式一：对象字面量（自动推导为 UTSJSONObject）
let user = {
  id: 1,
  name: "张三",
  age: 25,
  isVip: true,
};

// 方式二：JSON 字符串解析
let jsonString = `{"name": "李四", "age": 30}`;
let userData = JSON.parseObject(jsonString);
```

#### 访问属性的三种方式

```ts
let profile = {
  name: "张三",
  age: 25,
  address: {
    city: "北京",
    street: "朝阳区",
  },
  hobbies: ["阅读", "游泳", "编程"],
};

// 1. 点操作符（Web 端支持，App 端有限制）
console.log(profile.name); // "张三"

// 2. 下标访问（通用方式）
console.log(profile["age"]); // 25

// 3. 类型安全的 get 方法（推荐）
console.log(profile.getString("name")); // "张三"
console.log(profile.getNumber("age")); // 25
console.log(profile.getJSON("address")); // 获取嵌套对象
console.log(profile.getArray("hobbies")); // 获取数组
```

#### 常用的类型安全方法

```ts
let data = {
  username: "admin",
  score: 95.5,
  isActive: true,
  profile: { level: "VIP" },
  tags: ["user", "premium"],
};

// 获取不同类型的数据（返回 类型 | null）
let name = data.getString("username"); // string | null
let score = data.getNumber("score"); // number | null
let active = data.getBoolean("isActive"); // boolean | null
let profile = data.getJSON("profile"); // UTSJSONObject | null
let tags = data.getArray("tags"); // Array<any> | null

// 带默认值的获取（返回确定类型）
let safeName = data.getString("username", "匿名"); // string
let safeScore = data.getNumber("score", 0); // number
let safeActive = data.getBoolean("isActive", false); // boolean
```

### 3. Set 和 Map

**Set（集合）** - 存储唯一值：

```ts
// 创建 Set
let uniqueNumbers = new Set<number>();
uniqueNumbers.add(1);
uniqueNumbers.add(2);
uniqueNumbers.add(1); // 重复值不会被添加

console.log(uniqueNumbers.size); // 2
console.log(uniqueNumbers.has(1)); // true

// 遍历 Set
uniqueNumbers.forEach((value: number) => {
  console.log(value); // 1, 2
});
```

**Map（映射）** - 键值对存储，保持插入顺序：

```ts
// 创建 Map
let userInfo = new Map<string, string>();
userInfo.set("name", "张三");
userInfo.set("email", "zhangsan@example.com");
userInfo.set("phone", "13800138000");

console.log(userInfo.get("name")); // "张三"
console.log(userInfo.size); // 3

// 遍历 Map（按插入顺序）
userInfo.forEach((value: string, key: string) => {
  console.log(`${key}: ${value}`);
  // 输出顺序：name: 张三, email: zhangsan@example.com, phone: 13800138000
});
```

**使用场景**：

- **Set**: 去重、检查元素是否存在
- **Map**: 缓存数据、键值对查找

---

## 三、实用技巧

### 1. 类型推导

UTS 会自动推导类型，大多数情况下无需显式声明：

```ts
let message = "Hello"; // 自动推导为 string
let count = 0; // 自动推导为 number
let isActive = true; // 自动推导为 boolean
let items = [1, 2, 3]; // 自动推导为 number[]
```

### 2. 类型判断

```ts
let data = "Hello World";

// typeof 用于基础类型
console.log(typeof data); // "string"

// instanceof 用于对象类型
let numbers = [1, 2, 3];
console.log(numbers instanceof Array); // true
```

### 3. any 类型（谨慎使用）

当不确定类型时，可以使用 `any`：

```ts
let dynamicValue: any = "字符串";
dynamicValue = 123;
dynamicValue = true;
dynamicValue = [1, 2, 3];

// 注意：any 失去了类型检查，尽量避免使用
```

---

## 四、常见场景示例

### 1. Vue 组件中的数据定义

```ts
export default {
  data() {
    return {
      // 基础数据
      title: "我的应用",
      count: 0,
      isLoading: false,

      // 数组数据
      todoList: [] as Array<UTSJSONObject>,

      // 可为空的数据
      currentUser: null as UTSJSONObject | null,
    };
  },

  onLoad() {
    // 模拟从服务器获取数据
    this.currentUser = {
      name: "张三",
      avatar: "/static/avatar.png",
    };

    console.log(this.currentUser?.name); // 安全访问
  },
};
```

### 2. 网络请求数据处理

```ts
// 发起请求
uni.request({
  url: "/api/user/profile",
  success: (res) => {
    // 解析响应数据
    let userData = res.data as UTSJSONObject;

    // 获取用户信息
    let userName = userData.getString("name");
    let userAge = userData.getNumber("age");
    let isVip = userData.getBoolean("isVip");

    console.log(`用户：${userName}，年龄：${userAge}`);
  },
});
```

### 3. 数组操作

```ts
// 商品列表
let products = [
  { name: "iPhone", price: 6999, category: "手机" },
  { name: "iPad", price: 3999, category: "平板" },
  { name: "MacBook", price: 12999, category: "电脑" },
];

// 筛选手机类商品
let phones = products.filter((product: UTSJSONObject) => {
  return product.getString("category") == "手机";
});

// 计算总价
let totalPrice = products.reduce((sum: number, product: UTSJSONObject) => {
  return sum + (product.getNumber("price") ?? 0);
}, 0);

console.log(`总价：${totalPrice}`);
```

---

## 五、最佳实践

### 1. 优先使用类型推导

```ts
// ✅ 推荐：让 UTS 自动推导
let message = "Hello World";
let numbers = [1, 2, 3];

// ❌ 不必要：显式声明明显的类型
let message: string = "Hello World";
let numbers: number[] = [1, 2, 3];
```

### 2. 合理处理空值

```ts
// ✅ 推荐：明确声明可能为空的数据
let userProfile: UTSJSONObject | null = null;

// 安全访问
if (userProfile != null) {
  console.log(userProfile.name);
}

// 或使用安全调用
console.log(userProfile?.getString("name"));
```

### 3. 数组操作要指定类型

```ts
// ✅ 推荐：空数组要指定类型
let todoList: UTSJSONObject[] = [];

// 添加数据时类型安全
todoList.push({
  id: 1,
  title: "学习 UTS",
  completed: false,
});
```

---

## 六、常见错误与解决

### 1. 空值错误

```ts
// ❌ 错误：直接访问可能为空的对象
let user: UTSJSONObject | null = getUserData();
console.log(user.name); // 编译错误

// ✅ 解决：判空或安全调用
if (user != null) {
  console.log(user.name);
}
// 或
console.log(user?.getString("name"));
```

### 2. 数组类型错误

```ts
// ❌ 错误：空数组无法推导类型
let items = []; // 编译错误

// ✅ 解决：指定数组类型
let items: string[] = [];
let products: UTSJSONObject[] = [];
```

### 3. JSON 数据访问错误

```ts
let userData: UTSJSONObject = getUserData();

// ❌ 错误：直接访问可能不存在的属性
console.log(userData.age); // 可能为 undefined

// ✅ 解决：使用类型安全的方法
console.log(userData.getNumber("age")); // 返回 number | null
console.log(userData.getString("name")); // 返回 string | null
console.log(userData.getBoolean("isVip")); // 返回 boolean | null
```

---

## 总结

掌握了这些基础类型，你就可以开始 UTS 开发了：

- **基础类型**：`boolean`、`number`、`string`、`null`
- **复合类型**：`Array`、`UTSJSONObject`、`Set`、`Map`
- **关键概念**：类型推导、空值安全、类型判断
- **实用技巧**：安全调用 `?.`、类型安全的 JSON 操作

**下一步**：当你需要更高级的功能时，可以学习[UTS 数据类型进阶指南](#)，包括自定义类型、平台专有类型、类型系统等内容。
