# UTS 数据类型进阶指南

> **目标读者**：已掌握 UTS 基础类型，需要深入了解类型系统的开发者
>
> **覆盖内容**：平台专有类型、自定义类型、类型系统深度特性、性能优化
>
> **前置知识**：建议先阅读[UTS 数据类型快速入门](#)

---

## 一、数字类型深度解析

### 1. number 类型的跨平台实现

UTS 的 `number` 是一个跨平台的泛数字类型：

```ts
let a: number = 42; // 整数
let b: number = 3.14159; // 浮点数
let c: number = -1; // 负数

// 编译到不同平台的实现：
// - JavaScript: 原生 number
// - Kotlin: 使用 Number 抽象类
// - Swift: 使用 NSNumber
```

### 2. 平台专有数字类型

当需要调用原生 API 或追求极致性能时，可以使用平台专有类型：

#### Android (Kotlin) 专有类型

```ts
// #ifdef APP-ANDROID
let byteVal: Byte = 127; // 8bit: -128 到 127
let shortVal: Short = 32767; // 16bit: -32768 到 32767
let intVal: Int = 2147483647; // 32bit: -2^31 到 2^31-1
let longVal: Long = 9223372036854775807; // 64bit
let floatVal: Float = (3.14).toFloat(); // 32bit 浮点
let doubleVal: Double = 3.14159; // 64bit 浮点

// 无符号类型
let uByteVal: UByte = 255;
let uIntVal: UInt = 4294967295;
// #endif
```

#### iOS (Swift) 专有类型

```ts
// #ifdef APP-IOS
let int8Val: Int8 = 127;
let int16Val: Int16 = 32767;
let int32Val: Int32 = 2147483647;
let int64Val: Int64 = 9223372036854775807;

let uint8Val: UInt8 = 255;
let uint16Val: UInt16 = 65535;

let floatVal: Float = 3.14;
let doubleVal: Double = 3.14159;
// #endif
```

### 3. 类型转换与性能考量

```ts
// number 转平台专有类型
let num: number = 42;

// #ifdef APP-ANDROID
let kotlinInt = num.toInt(); // 转为 Kotlin Int
let kotlinFloat = num.toFloat(); // 转为 Kotlin Float
let kotlinDouble = num.toDouble(); // 转为 Kotlin Double
// #endif

// #ifdef APP-IOS
let swiftInt = num.toInt(); // 转为 Swift Int
let swiftFloat = num.toFloat(); // 转为 Swift Float
// #endif

// 平台专有类型转 number
// #ifdef APP-ANDROID
let kotlinVal: Int = 100;
let numberVal = Number.from(kotlinVal); // Int 转 number
// #endif
```

**性能提示**：在大量数值计算中，平台专有类型性能更优，但在普通业务逻辑中差异可忽略。

---

## 二、字符串类型深度

### 1. 跨平台字符串处理

```ts
let text: string = "Hello UTS";
console.log(text.length); // 获取长度
console.log(text.toUpperCase()); // 转大写
console.log(text.substring(0, 5)); // 截取子字符串
```

### 2. 平台专有字符串类型

#### iOS NSString

```ts
// #ifdef APP-IOS
// string 转 NSString
let str = "Hello World";
let nsStr1 = NSString((string = str)); // 方式一
let nsStr2 = str as NSString; // 方式二

// NSString 转 string
let nsStr3 = NSString((string = "iOS String"));
let str1 = String(nsStr3); // 方式一
let str2 = nsStr3 as string; // 方式二
// #endif
```

#### Android Char 和 CharArray

```ts
// #ifdef APP-ANDROID
// string 转 CharArray
let charArray = "hello".toCharArray();
console.log("CharArray", charArray);

// 获取单个字符
let singleChar = "hello".toCharArray()[0];
console.log("singleChar", singleChar);

// CharArray 转 string
let arrayMock = Array<kotlin.Char>();
arrayMock.add("h".toCharArray()[0]);
arrayMock.add("e".toCharArray()[0]);
arrayMock.add("l".toCharArray()[0]);
arrayMock.add("l".toCharArray()[0]);
arrayMock.add("o".toCharArray()[0]);
console.log(arrayMock.joinToString("")); // "hello"
// #endif
```

---

## 三、数组类型深度

### 1. UTS Array vs 平台原生数组

UTS 的 `Array` 是可变长的泛型数组，在不同平台有不同实现：

- **JavaScript**: 原生 Array
- **Kotlin**: 继承自 ArrayList（可变长）
- **Swift**: 原生 Array（值类型）

### 2. 平台专有数组类型

#### Android 专有数组

UTS 的 `Array` 在 Android 平台编译为 `io.dcloud.uts.UTSArray`，继承自 `java.util.ArrayList`，支持所有 Java/Kotlin 提供的扩展函数。

```ts
// #ifdef APP-ANDROID
// 创建 UTS Array
let utsArray = ["1", 2, 3.0]; // 混合类型数组

// UTS Array 转换为平台专有类型
let javaArray = utsArray.toTypedArray();    // 转为 Java Array
let kotlinList = utsArray.toKotlinList();   // 转为 Kotlin List

// 平台专有类型转换为 UTS Array
let convertFromJava = Array.fromNative(javaArray);
let convertFromKotlin = Array.fromNative(kotlinList);

console.log(convertFromJava[0] == convertFromKotlin[0]); // true
console.log(convertFromJava[0]); // "1"

// 支持的原生数组类型转换
let kotlinArray = arrayOf("hello", "world");           // kotlin.Array
let intArray = intArrayOf(1, 2, 3, 4, 5);             // IntArray
let byteArray = byteArrayOf(-1, 2, 0, 3, 4, 5);       // ByteArray
let longArray = longArrayOf(1L, 2L, 3L);              // LongArray
let floatArray = floatArrayOf(1.0f, 2.0f, 3.0f);      // FloatArray
let doubleArray = doubleArrayOf(1.0, 2.0, 3.0);       // DoubleArray
let shortArray = shortArrayOf(1, 2, 3);               // ShortArray
let charArray = charArrayOf('a', 'b', 'c');           // CharArray
let booleanArray = booleanArrayOf(true, false, true); // BooleanArray

// 统一使用 fromNative 转换
let utsFromKotlin = Array.fromNative(kotlinArray);
let utsFromInt = Array.fromNative(intArray);
let utsFromByte = Array.fromNative(byteArray);
let utsFromLong = Array.fromNative(longArray);
let utsFromFloat = Array.fromNative(floatArray);
let utsFromDouble = Array.fromNative(doubleArray);
let utsFromShort = Array.fromNative(shortArray);
let utsFromChar = Array.fromNative(charArray);
let utsFromBoolean = Array.fromNative(booleanArray);
// #endif
```

**重要方法说明**：

- `toKotlinList()`: 将 UTS Array 转换为 `kotlin.collections.List<any>`
- `toTypedArray()`: 将 UTS Array 转换为 Java/Kotlin Array
- `Array.fromNative()`: 支持多种原生数组类型转换为 UTS Array

**兼容性**：

- `toKotlinList()`: HBuilderX 3.90+ (仅 Android)
- `Array.fromNative()`: HBuilderX 3.90+ (仅 Android)

#### iOS 专有数组

```ts
// #ifdef APP-IOS
// NSArray (不可变)
let nsArray: NSArray = NSArray((array = [1, 2, 3, 4]));

// NSMutableArray (可变)
let nsMutableArray: NSMutableArray = NSMutableArray();
nsMutableArray.add(1);
nsMutableArray.add("string");
nsMutableArray.add(true);
nsMutableArray.remove(1);

// 转换
let utsArray = Array(nsArray); // NSArray 转 Array
let nsArray2: NSArray = NSArray((array = utsArray)); // Array 转 NSArray
// #endif
```

---

## 四、Set 与 Map 类型深度

### 1. Set 类型跨平台实现

UTS 的 `Set` 是一个跨平台的集合类型，用于存储唯一值：

```ts
// 基本 Set 操作
let mySet = new Set<string>();
mySet.add("apple");
mySet.add("banana");
mySet.add("apple"); // 重复值不会被添加

console.log(mySet.size); // 2
console.log(mySet.has("apple")); // true
```

### 2. Android 平台 Set 类型

UTS 的 `Set` 在 Android 平台编译为 `io.dcloud.uts.Set`，可以与 Kotlin 原生 Set 类型互转：

```ts
// #ifdef APP-ANDROID
// 创建 Kotlin HashSet
let kotlinSet = new kotlin.collections.HashSet<string>();
kotlinSet.add("a");
kotlinSet.add("b");

// Kotlin Set 转换为 UTS Set
let utsSet = new Set<string>();
utsSet.addAll(kotlinSet);
console.log(utsSet); // Set(2) {"a", "b"}

// UTS Set 转换为 Kotlin HashSet
let nextKotlinSet = new kotlin.collections.HashSet<string>();
nextKotlinSet.addAll(utsSet);
console.log(nextKotlinSet); // [a, b]

// 其他 Kotlin Set 类型
let kotlinLinkedHashSet = new kotlin.collections.LinkedHashSet<string>();
let kotlinMutableSet = kotlin.collections.mutableSetOf("x", "y", "z");

// 转换示例
let utsFromLinkedHashSet = new Set<string>();
utsFromLinkedHashSet.addAll(kotlinLinkedHashSet);

let utsFromMutableSet = new Set<string>();
utsFromMutableSet.addAll(kotlinMutableSet);
// #endif
```

**重要方法说明**：

- `addAll(collection)`: 将另一个集合的所有元素添加到当前 Set
- 支持与 `kotlin.collections.HashSet`、`kotlin.collections.LinkedHashSet`、`kotlin.collections.MutableSet` 等互转

### 3. Map 类型深度

#### 基本 Map 操作

```ts
// 基本 Map 操作
let userMap = new Map<number, string>();
userMap.set(1, "张三");
userMap.set(2, "李四");

console.log(userMap.get(1)); // "张三"
console.log(userMap.size); // 2

// 遍历 Map
userMap.forEach((value: string, key: number) => {
  console.log(`${key}: ${value}`);
});
```

#### Android 平台 Map 类型

UTS 的 `Map` 在 Android 平台编译为 `io.dcloud.uts.Map`，其直接父类为 `LinkedHashMap`，保持插入顺序。

```ts
// #ifdef APP-ANDROID
// Kotlin Map 转换为 UTS Map
let kotlinMap = getMapFromNative(); // 假设从原生获取 Kotlin Map
console.log(kotlinMap);

let utsMap = new Map<string, any>();
utsMap.putAll(kotlinMap); // 使用 putAll 批量添加

// 创建各种 Kotlin Map 类型
let kotlinHashMap = new kotlin.collections.HashMap<string, number>();
kotlinHashMap.put("score1", 95);
kotlinHashMap.put("score2", 87);

let kotlinLinkedHashMap = new kotlin.collections.LinkedHashMap<
  string,
  string
>();
kotlinLinkedHashMap.put("name", "张三");
kotlinLinkedHashMap.put("email", "zhangsan@example.com");

let kotlinMutableMap = kotlin.collections.mutableMapOf(
  kotlin.Pair("key1", "value1"),
  kotlin.Pair("key2", "value2")
);

// Kotlin Map → UTS Map 转换
let utsFromHashMap = new Map<string, number>();
utsFromHashMap.putAll(kotlinHashMap);

let utsFromLinkedHashMap = new Map<string, string>();
utsFromLinkedHashMap.putAll(kotlinLinkedHashMap);

let utsFromMutableMap = new Map<string, string>();
utsFromMutableMap.putAll(kotlinMutableMap);

// UTS Map → Kotlin Map 转换
let utsOriginal = new Map<string, number>();
utsOriginal.set("math", 95);
utsOriginal.set("english", 88);

let kotlinResult = new kotlin.collections.HashMap<string, number>();
utsOriginal.forEach((value: number, key: string) => {
  kotlinResult.put(key, value);
});

console.log("UTS Map size:", utsOriginal.size);
console.log("Kotlin Map size:", kotlinResult.size);
// #endif
```

**重要方法说明**：

- `putAll(map)`: 将另一个 Map 的所有键值对添加到当前 Map
- 继承自 `LinkedHashMap`，保持键的插入顺序
- 支持与 `kotlin.collections.HashMap`、`kotlin.collections.LinkedHashMap`、`kotlin.collections.MutableMap` 等互转

**性能特点**：

- 作为 `LinkedHashMap` 的子类，既有 HashMap 的快速查找特性
- 又保持了元素的插入顺序，适合需要顺序的场景

---

## 五、UTSJSONObject 深度解析

### 1. UTSJSONObject 核心特性

`UTSJSONObject` 是 UTS 的内置类型，专门用于操作匿名对象，具有以下特性：

- **Vue 响应式支持**：3.97+ 版本支持 Vue 响应式变更
- **类型安全访问**：提供多种类型安全的访问方法
- **跨平台兼容**：在不同平台有统一的 API
- **与原生类型互转**：支持与平台原生 Map 类型转换

### 2. 创建与初始化

```ts
// 方式一：对象字面量
let userInfo = {
  id: 1001,
  name: "张三",
  email: "zhangsan@example.com",
  isVip: true,
  profile: {
    level: 5,
    points: 1250,
  },
  hobbies: ["读书", "游泳", "编程"],
};

// 方式二：JSON 字符串解析
let jsonStr = `{
    "userId": 2001,
    "userName": "李四",
    "settings": {
        "theme": "dark",
        "notifications": true
    }
}`;
let userData = JSON.parseObject(jsonStr);
```

### 3. 静态方法

#### UTSJSONObject.keys() - 获取对象键名

```ts
let obj = {
  name: "测试",
  age: 25,
  city: "北京",
};

let keys = UTSJSONObject.keys(obj);
console.log(keys); // ["name", "age", "city"]
```

#### UTSJSONObject.assign() - 对象合并

```ts
let obj1 = { name: "张三", age: 25 };
let obj2 = { city: "北京", age: 30 }; // age 会覆盖 obj1 的值
let obj3 = { isVip: true };

// 合并多个对象，返回新对象（与 JS Object.assign 不同）
let merged = UTSJSONObject.assign(obj1, obj2, obj3);
console.log(merged); // { name: "张三", age: 30, city: "北京", isVip: true }

// 泛型版本，保持类型信息
type UserType = {
  name: string;
  age: number;
  city?: string;
};

let user1: UserType = { name: "王五", age: 28 };
let user2: UserType = { name: "王五", age: 28, city: "上海" };
let mergedUser = UTSJSONObject.assign<UserType>(user1, user2);
```

### 4. 实例方法详解

#### 基础访问方法

```ts
let data = {
  username: "admin",
  score: 95.5,
  isActive: true,
  metadata: null,
  profile: { level: "VIP" },
  tags: ["user", "premium"],
};

// get/set 方法
let value = data.get("username"); // any | null
data.set("newField", "新值");

// 类型安全的获取方法
let name = data.getString("username"); // string | null
let score = data.getNumber("score"); // number | null
let active = data.getBoolean("isActive"); // boolean | null
let profile = data.getJSON("profile"); // UTSJSONObject | null
let tags = data.getArray("tags"); // Array<any> | null

// 带默认值的方法（返回确定类型，不为 null）
let safeName = data.getString("username", "匿名用户"); // string
let safeScore = data.getNumber("score", 0); // number
let safeActive = data.getBoolean("isActive", false); // boolean
let safeProfile = data.getJSON("profile", {}); // UTSJSONObject
let safeTags = data.getArray("tags", []); // Array<any>
```

#### 高级访问：KeyPath 支持

```ts
let complexData = {
  user: {
    profile: {
      name: "张三",
      address: {
        city: "北京",
        district: "朝阳区",
      },
    },
    preferences: {
      theme: "dark",
      language: "zh-CN",
    },
  },
  data: [
    { id: 1, title: "文章1" },
    { id: 2, title: "文章2" },
  ],
};

// 使用 KeyPath 深度访问
let userName = complexData.getString("user.profile.name"); // "张三"
let city = complexData.getString("user.profile.address.city"); // "北京"
let theme = complexData.getString("user.preferences.theme"); // "dark"

// 数组访问
let firstTitle = complexData.getString("data[0].title"); // "文章1"
let secondId = complexData.getNumber("data[1].id"); // 2
```

### 5. 类型转换

#### 与 Map 的转换

```ts
let obj = {
  name: "张三",
  age: 25,
  city: "北京",
};

// UTSJSONObject 转 Map
let map = obj.toMap();
console.log(map.get("name")); // "张三"

// Map 转 UTSJSONObject（通过对象字面量）
let newObj = {
  name: map.get("name"),
  age: map.get("age"),
  city: map.get("city"),
};
```

#### 与 type 的相互转换

```ts
type UserProfile = {
  id: number;
  name: string;
  email: string;
};

// UTSJSONObject 转 type
let jsonObj = {
  id: 1001,
  name: "李四",
  email: "lisi@example.com",
};
let typedUser = jsonObj as UserProfile;

// type 转 UTSJSONObject
let userType: UserProfile = {
  id: 2001,
  name: "王五",
  email: "wangwu@example.com",
};
let jsonUser = userType as UTSJSONObject;
```

### 6. Android 平台特性

在 Android 平台，`UTSJSONObject` 编译为 `io.dcloud.uts.UTSJSONObject`，支持与 Kotlin Map 互转：

```ts
// #ifdef APP-ANDROID
// Kotlin HashMap 转 UTSJSONObject
let kotlinMap = new kotlin.collections.HashMap<string, number>();
kotlinMap.put("a", 111);
kotlinMap.put("b", 222);

let utsObj = new UTSJSONObject(kotlinMap);
console.log(utsObj.getNumber("a")); // 111

// UTSJSONObject 转 Map
let convertedMap = utsObj.toMap();
console.log(convertedMap.get("b")); // 222
// #endif
```

### 7. 注意事项与最佳实践

#### 方法覆盖问题（仅 JS 平台）

```ts
// ⚠️ 在 JS 平台，实例方法可能被覆盖
let problematicObj = {
  getString: 1, // 这会覆盖 getString 方法
};
console.log(problematicObj.getString); // 1，而不是方法

// ✅ 避免使用与 UTSJSONObject 方法同名的属性
let safeObj = {
  stringValue: 1, // 使用不同的属性名
  textContent: "安全的属性名",
};
```

#### 最佳实践

```ts
// ✅ 推荐：使用类型安全的方法访问属性
let userData = getUserData();
let name = userData.getString("name", "未知用户");
let age = userData.getNumber("age", 0);

// ✅ 推荐：对于复杂嵌套，使用 KeyPath
let address = userData.getString("profile.address.city", "未知城市");

// ✅ 推荐：在 Vue 中利用响应式特性（3.97+）
export default {
  data() {
    return {
      userInfo: {
        name: "张三",
        score: 0,
      } as UTSJSONObject,
    };
  },
  methods: {
    updateScore(newScore: number) {
      // 响应式更新
      this.userInfo.set("score", newScore);
    },
  },
};

// ❌ 避免：在生产代码中过度使用 getAny
let riskyValue = userData.getAny("someField"); // 失去类型安全
```

---

## 六、自定义类型系统

### 1. type 定义对象类型

使用 `type` 为 JSON 数据定义严格的类型结构：

```ts
// 定义用户类型
type UserType = {
  id: number;
  name: string;
  email: string;
  age: number | null; // 可为空
  isActive?: boolean; // 可选属性
};

// 定义地址类型
type AddressType = {
  street: string;
  city: string;
  zipCode: string;
};

// 嵌套类型
type UserProfileType = {
  user: UserType;
  address: AddressType;
  preferences: {
    theme: "light" | "dark"; // 字面量联合类型
    language: string;
  };
};
```

### 2. JSON 解析与类型转换

```ts
// HBuilderX 3.9+ 支持泛型解析
let jsonString = `{
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com",
    "age": 25,
    "isActive": true
}`;

// 解析为指定类型
let user = JSON.parse<UserType>(jsonString);
console.log(user?.name); // 类型安全访问

// 数组解析
let usersJson = `[
    {"id": 1, "name": "张三", "email": "zhangsan@example.com"},
    {"id": 2, "name": "李四", "email": "lisi@example.com"}
]`;
let users = JSON.parse<UserType[]>(usersJson);
```

### 3. 敏感字段处理

当 JSON 字段名不符合变量命名规则时，使用 `@JSON_FIELD` 注解：

```ts
type ResponseType = {
  /**
   * @JSON_FIELD "user-name"
   */
  user_name: string;

  /**
   * @JSON_FIELD "class"
   */
  _class: string;

  /**
   * @JSON_FIELD "api-version"
   */
  api_version: string;
};

// JSON: {"user-name": "张三", "class": "admin", "api-version": "v1.0"}
// 会正确映射到 user_name, _class, api_version 属性
```

### 4. type 的高级操作

```ts
type PersonType = {
  id: number;
  name: string;
  age: number;
};

let person: PersonType = { id: 1, name: "张三", age: 25 };

// for-in 遍历 (HBuilderX 3.9+)
for (let key in person) {
  console.log(key); // 输出 "id", "name", "age"
}

// 下标访问 (HBuilderX 3.9+)
console.log(person["id"]); // 1
person["age"] = 26; // 修改属性值
console.log(person.age); // 26
```

---

## 五、高级类型特性

### 1. 联合类型

```ts
// 字面量联合类型（开发时类型）
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type StatusCode = 200 | 400 | 401 | 403 | 404 | 500;

let method: HttpMethod = "GET";
let status: StatusCode = 200;

// 基础类型联合
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // 也可以是数字

// 可为空类型
type NullableString = string | null;
let text: NullableString = null;
text = "hello";
```

### 2. 开发时类型与运行时类型

```ts
// 开发时类型：编译后会被擦除
type Theme = "light" | "dark"; // 运行时变为 string
let currentTheme: Theme = "light";

// 运行时类型：编译后保留
let userAge: number = 25; // 运行时仍为 number
let userName: string = "张三"; // 运行时仍为 string
```

### 3. 特殊值域 string

```ts
// 特殊值域类型（开发时类型，IDE 提供更好的提示）
let colorValue: string.ColorString = "red"; // 颜色值
let imageUrl: string.ImageURIString = "/static/logo.png"; // 图片路径
let elementId: string.IDString = "user-profile"; // 元素 ID
```

---

## 六、类型判断与转换

### 1. 运行时类型检查

```ts
let data: any = "Hello World";

// 基础类型判断
if (typeof data == "string") {
  console.log(data.toUpperCase());
}

// 对象类型判断
let numbers = [1, 2, 3];
console.log(numbers instanceof Array); // true
console.log(Array.isArray(numbers)); // true

let date = new Date();
console.log(date instanceof Date); // true

let jsonObj = { name: "test" };
console.log(jsonObj instanceof UTSJSONObject); // true
```

### 2. 类型断言

```ts
// 使用 as 进行类型断言
let userInput: any = getUserInput();
let userName = userInput as string;

// 非空断言 (!)
let userData: UserType | null = getUser();
let user = userData!; // 告诉编译器这里肯定不为 null（谨慎使用）
console.log(user.name);
```

---

## 七、性能优化与最佳实践

### 1. 类型选择的性能考量

```ts
// 高性能数值计算场景
// #ifdef APP
function performanceCalculation() {
  // 使用平台专有类型获得更好性能
  let a: Int = 1000000;
  let b: Int = 2000000;
  let result: Int = a * b;
  return result;
}
// #endif

// 普通业务逻辑
function businessLogic() {
  // 使用 number 类型即可，跨平台兼容好
  let price: number = 99.9;
  let quantity: number = 5;
  let total: number = price * quantity;
  return total;
}
```

### 2. 内存管理最佳实践

```ts
// ✅ 推荐：合理使用 null 避免内存泄漏
class DataManager {
  private cache: Map<string, UTSJSONObject> | null = null;

  init() {
    this.cache = new Map();
  }

  destroy() {
    this.cache?.clear();
    this.cache = null; // 及时释放引用
  }
}

// ✅ 推荐：大数据集合使用合适的数据结构
let userMap: Map<number, UserType> = new Map(); // 查找性能更好
let userArray: UserType[] = []; // 遍历性能更好

// ❌ 避免：过度使用 any 类型
let data: any = getData(); // 失去类型检查和性能优化
```

### 3. 跨平台兼容性

```ts
// 使用条件编译处理平台差异
function processData(data: any) {
  // #ifdef APP-ANDROID
  // Android 特定处理
  if (data instanceof kotlin.collections.List) {
    return Array.fromNative(data);
  }
  // #endif

  // #ifdef APP-IOS
  // iOS 特定处理
  if (data instanceof NSArray) {
    return Array(data);
  }
  // #endif

  // #ifdef WEB
  // Web 特定处理
  return data;
  // #endif
}
```

---

## 八、调试与错误处理

### 1. 常见类型错误诊断

```ts
// 错误：类型不匹配
// let user: UserType = { name: "张三" }  // 缺少必需字段 id

// 正确：提供完整的类型信息
let user: UserType = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: null, // 可为空字段
  isActive: true, // 可选字段
};

// 错误：空值访问
// let userData: UserType | null = getUser()
// console.log(userData.name)  // 可能为 null

// 正确：安全访问
let userData: UserType | null = getUser();
if (userData != null) {
  console.log(userData.name);
}
// 或使用安全调用
console.log(userData?.name);
```

### 2. 类型边界处理

```ts
// 数值边界检查
function safeNumberConversion(value: any): number {
  if (typeof value == "number") {
    // 检查是否在安全范围内
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
      console.warn("数值超出安全范围");
      return 0;
    }
    return value;
  }

  if (typeof value == "string") {
    let parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

// 字符串长度边界
function safeStringOperation(text: string | null): string {
  if (text == null) return "";

  // 不同平台的字符串长度限制不同，需要注意
  if (text.length > 1000000) {
    // 假设限制为 100万字符
    console.warn("字符串过长，进行截取");
    return text.substring(0, 1000000);
  }

  return text;
}
```

---

## 九、与 Vue 集成的高级用法

### 1. 复杂数据结构管理

```ts
// 定义复杂的应用状态类型
type AppState = {
  user: UserType | null;
  settings: SettingsType;
  cache: Map<string, any>;
  loading: {
    user: boolean;
    data: boolean;
  };
};

export default {
  data(): AppState {
    return {
      user: null,
      settings: {
        theme: "light",
        language: "zh-CN",
      },
      cache: new Map(),
      loading: {
        user: false,
        data: false,
      },
    };
  },

  methods: {
    async loadUserData() {
      this.loading.user = true;
      try {
        let response = await this.fetchUser();
        this.user = JSON.parse<UserType>(response.data);
      } catch (error) {
        console.error("加载用户数据失败", error);
        this.user = null;
      } finally {
        this.loading.user = false;
      }
    },
  },
};
```

### 2. 类型安全的事件处理

```ts
// 定义事件类型
type CustomEvent = {
  type: "user_login" | "user_logout" | "data_update";
  payload: UTSJSONObject;
};

export default {
  methods: {
    handleCustomEvent(event: CustomEvent) {
      switch (event.type) {
        case "user_login":
          let userData = event.payload as UserType;
          this.onUserLogin(userData);
          break;

        case "user_logout":
          this.onUserLogout();
          break;

        case "data_update":
          let updateData = event.payload;
          this.onDataUpdate(updateData);
          break;
      }
    },
  },
};
```

---

## 总结

UTS 的类型系统提供了强大的功能：

**核心特性**：

- 跨平台的统一类型系统
- 平台专有类型的性能优化
- 灵活的自定义类型定义
- 严格的空值安全检查

**高级功能**：

- 联合类型与字面量类型
- 开发时类型与运行时类型
- 类型推导与类型断言
- 复杂数据结构的类型管理

**最佳实践**：

- 优先使用跨平台类型，必要时使用平台专有类型
- 合理使用 type 定义复杂数据结构
- 注意空值安全和边界检查
- 利用条件编译处理平台差异

掌握了这些进阶特性，你就能充分发挥 UTS 类型系统的威力，编写出高性能、类型安全的跨平台应用。
