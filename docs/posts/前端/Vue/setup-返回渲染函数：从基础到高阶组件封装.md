---
title: setup 返回渲染函数：从基础到高阶组件封装（Vue3）
date: 2025-01-27
tags: [Vue3, 渲染函数, h函数, 高阶组件, JSX]
---

# setup 返回渲染函数：从基础到高阶组件封装

> 本文深入探讨 Vue3 中 `setup` 函数返回渲染函数的机制、使用场景与最佳实践，从基础用法到高阶组件封装的完整指南。

## 核心概念

### 什么是渲染函数？

在 Vue 3 的 `setup` 函数中，如果返回一个函数，这个函数会被当作**渲染函数**来处理。

**两种返回方式对比**：

```typescript
// 方式 1：返回对象（常规用法）
setup() {
  const count = ref(0)
  return {
    count,
    increment: () => count.value++
  }
}

// 方式 2：返回渲染函数（本文重点）
setup() {
  const count = ref(0)
  return () => h('div', `Count: ${count.value}`)
}
```

---

## 基础用法

### 示例 1：最简单的渲染函数

```typescript
import { h, ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    // 返回一个渲染函数
    return () =>
      h("div", [
        h("h1", `Count: ${count.value}`),
        h(
          "button",
          {
            onClick: () => count.value++,
          },
          "Increment"
        ),
      ]);
  },
};
```

**关键点**：

- ✅ 返回的函数会作为组件的渲染函数
- ✅ 在函数内访问响应式数据（闭包）
- ✅ 会**忽略**组件中的 `template`

### 示例 2：模板会被忽略

```typescript
export default {
  // ❌ 这个模板不会被渲染
  template: "<div>这个模板不会被渲染</div>",

  setup() {
    // ✅ 渲染函数会覆盖模板
    return () => h("div", "渲染函数的内容");
  },
};
```

### 示例 3：响应式数据访问

```typescript
setup() {
  const message = ref("Hello");

  // ✅ 正确：在返回的函数中访问响应式数据
  return () => h("div", message.value);

  // ❌ 错误：直接在 setup 中访问（非响应式）
  // const text = message.value;
  // return () => h('div', text);
}
```

---

## 与返回对象的区别

### 对比表

| 特性     | 返回对象                    | 返回渲染函数               |
| -------- | --------------------------- | -------------------------- |
| 模板     | ✅ 需要配合 `template` 使用 | ❌ 忽略 `template`         |
| 控制力   | ⭐⭐ 模板语法限制           | ⭐⭐⭐⭐⭐ 完全控制        |
| 学习曲线 | ⭐ 简单                     | ⭐⭐⭐ 需要了解 VNode      |
| 类型推断 | ✅ 自动推断                 | ⚠️ 需要手动类型定义        |
| 调试体验 | ✅ 模板语法清晰             | ⚠️ 需要理解 VNode 结构     |
| 动态性   | ⭐⭐⭐ 有限                 | ⭐⭐⭐⭐⭐ 极高            |
| 适用场景 | 大部分业务组件              | 高阶组件、动态组件、库封装 |

### 返回对象（正常用法）

```vue
<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
const increment = () => count.value++;
</script>
```

**特点**：

- ✅ 模板语法清晰
- ✅ 类型推断自动
- ✅ 调试友好
- ❌ 灵活性有限

### 返回渲染函数

```typescript
import { h, ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    return () =>
      h("div", [
        h("h1", `Count: ${count.value}`),
        h("button", { onClick: increment }, "Increment"),
      ]);
  },
};
```

**特点**：

- ✅ 完全控制渲染输出
- ✅ 动态性极高
- ✅ 适合复杂场景
- ❌ 学习曲线较陡

---

## h 函数详解

### 基础签名

```typescript
h(type, props?, children?)
```

**参数说明**：

- `type`：标签名、组件或异步组件
- `props`：属性对象（可选）
- `children`：子节点（可选）

### 完整用法示例

```typescript
import { h, ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    return () =>
      h(
        "div", // 标签名
        {
          // props
          class: "container",
          style: { color: "red" },
          onClick: () => count.value++,
        },
        [
          // children
          h("h1", `Count: ${count.value}`),
          h("p", { class: "text" }, "Hello World"),
          count.value > 5 ? h("strong", "Large!") : null,
        ]
      );
  },
};
```

### 常用模式

#### 1. 条件渲染

```typescript
return () =>
  h("div", [
    loading.value
      ? h("div", { class: "spinner" }, "Loading...")
      : h("div", { class: "content" }, data.value),
  ]);
```

#### 2. 列表渲染

```typescript
return () =>
  h(
    "ul",
    items.value.map((item) => h("li", { key: item.id }, item.name))
  );
```

#### 3. 插槽渲染

```typescript
return () =>
  h("div", [
    // 默认插槽
    slots.default?.(),
    // 具名插槽
    slots.header?.(),
  ]);
```

#### 4. 组件渲染

```typescript
import MyComponent from "./MyComponent.vue";

return () =>
  h(MyComponent, {
    // props
    count: count.value,
    // 事件
    onUpdate: (val: number) => (count.value = val),
  });
```

---

## 实战场景

### 场景 1：动态组件渲染

#### 问题

根据 `type` prop 渲染不同组件，模板语法冗长。

#### 解决方案

```typescript
import { h, defineComponent } from "vue";
import ButtonComponent from "./Button.vue";
import InputComponent from "./Input.vue";
import SelectComponent from "./Select.vue";

export default defineComponent({
  name: "DynamicField",
  props: {
    type: {
      type: String as PropType<"button" | "input" | "select">,
      required: true,
    },
    config: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  setup(props) {
    // 组件映射表
    const componentMap = {
      button: ButtonComponent,
      input: InputComponent,
      select: SelectComponent,
    };

    return () => {
      const Component = componentMap[props.type];

      if (!Component) {
        return h("div", { class: "error" }, `Unknown type: ${props.type}`);
      }

      return h(Component, props.config);
    };
  },
});
```

**优势**：

- ✅ 无需 `v-if` 堆叠
- ✅ 类型安全
- ✅ 易于扩展

### 场景 2：条件性包裹组件

#### 问题

根据条件决定是否包裹 `Transition` 或 `KeepAlive`。

#### 解决方案

```typescript
import { h, defineComponent, Transition, KeepAlive } from "vue";

export default defineComponent({
  name: "ConditionalWrapper",
  props: {
    enableTransition: Boolean,
    enableKeepAlive: Boolean,
  },
  setup(props, { slots }) {
    return () => {
      let vnode = slots.default?.();

      // 复杂逻辑：根据条件层层包裹
      if (props.enableKeepAlive) {
        vnode = h(KeepAlive, null, () => vnode);
      }

      if (props.enableTransition) {
        vnode = h(Transition, { name: "fade" }, () => vnode);
      }

      return vnode;
    };
  },
});
```

**使用示例**：

```vue
<ConditionalWrapper :enable-transition="true" :enable-keep-alive="false">
  <MyComponent />
</ConditionalWrapper>
```

### 场景 3：高阶组件（HOC）

#### 问题

需要为多个组件添加统一的 Loading、Error 处理逻辑。

#### 解决方案

```typescript
import { h, ref, onMounted, defineComponent } from "vue";

// 高阶组件：添加 Loading 状态
export function withLoading<T extends Record<string, any>>(
  WrappedComponent: any
) {
  return defineComponent({
    name: `WithLoading(${WrappedComponent.name || "Component"})`,
    props: {
      // 透传所有 props
      ...(WrappedComponent.props || {}),
    },
    setup(props, { attrs, slots }) {
      const loading = ref(true);
      const error = ref<Error | null>(null);

      onMounted(async () => {
        try {
          // 模拟异步加载
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
          error.value = e as Error;
        } finally {
          loading.value = false;
        }
      });

      return () => {
        // 复杂逻辑：根据状态渲染不同内容
        if (error.value) {
          return h("div", { class: "error" }, [
            h("h3", "Error"),
            h("p", error.value.message),
          ]);
        }

        if (loading.value) {
          return h("div", { class: "loading" }, [
            h("div", { class: "spinner" }),
            h("p", "Loading..."),
          ]);
        }

        // 渲染原始组件
        return h(
          WrappedComponent,
          {
            ...props,
            ...attrs,
          },
          slots
        );
      };
    },
  });
}

// 使用
import UserList from "./UserList.vue";
const UserListWithLoading = withLoading(UserList);
```

### 场景 4：递归组件（树形结构）

#### 问题

渲染嵌套的树形数据，深度不确定。

#### 解决方案

```typescript
import { h, defineComponent } from "vue";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export default defineComponent({
  name: "TreeNode",
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    return () => {
      const { node, level } = props;

      return h(
        "div",
        {
          class: "tree-node",
          style: { paddingLeft: `${level * 20}px` },
        },
        [
          // 当前节点
          h("div", { class: "node-label" }, node.label),

          // 复杂逻辑：递归渲染子节点
          ...(node.children || []).map((child) =>
            h(TreeNode, {
              node: child,
              level: level + 1,
              key: child.id,
            })
          ),
        ]
      );
    };
  },
});
```

**使用示例**：

```vue
<TreeNode :node="treeData" />
```

```typescript
const treeData = {
  id: "1",
  label: "Root",
  children: [
    {
      id: "1-1",
      label: "Child 1",
      children: [{ id: "1-1-1", label: "Grandchild 1" }],
    },
    { id: "1-2", label: "Child 2" },
  ],
};
```

---

## 进阶技巧

### 技巧 1：使用 JSX 替代 h 函数

#### 配置 JSX 支持

```bash
npm install @vitejs/plugin-vue-jsx -D
```

```typescript
// vite.config.ts
import vueJsx from "@vitejs/plugin-vue-jsx";

export default {
  plugins: [vueJsx()],
};
```

#### JSX 写法

```tsx
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    return () => (
      <div>
        <h1>Count: {count.value}</h1>
        <button onClick={() => count.value++}>Increment</button>
      </div>
    );
  },
});
```

**优势**：

- ✅ 语法更接近 HTML
- ✅ 可读性更好
- ✅ IDE 支持更好

### 技巧 2：结合 LazyScope 实现条件性渲染

```typescript
import { h, defineComponent } from "vue";
import LazyScope from "@/components/LazyScope";

export default defineComponent({
  setup() {
    const hasData = ref(false);

    return () =>
      h(
        LazyScope,
        {
          when: hasData.value,
          factory: () => ({
            // 创建昂贵的上下文
          }),
        },
        {
          // 插槽
          default: (ctx) => h("div", "有数据时渲染"),
          fallback: () => h("div", "无数据时渲染"),
        }
      );
  },
});
```

### 技巧 3：TypeScript 类型增强

```typescript
import { h, defineComponent, VNode, PropType } from "vue";

interface ButtonProps {
  type: "primary" | "default" | "danger";
  size: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

export default defineComponent({
  name: "TypedButton",
  props: {
    type: {
      type: String as PropType<ButtonProps["type"]>,
      default: "default",
    },
    size: {
      type: String as PropType<ButtonProps["size"]>,
      default: "medium",
    },
    disabled: Boolean,
  },
  emits: {
    click: () => true,
  },
  setup(props, { emit, slots }) {
    const handleClick = () => {
      if (!props.disabled) {
        emit("click");
      }
    };

    return (): VNode =>
      h(
        "button",
        {
          class: ["btn", `btn-${props.type}`, `btn-${props.size}`],
          disabled: props.disabled,
          onClick: handleClick,
        },
        slots.default?.()
      );
  },
});
```

### 技巧 4：Teleport 与渲染函数

```typescript
import { h, Teleport, ref } from "vue";

export default {
  setup() {
    const show = ref(false);

    return () =>
      h(
        Teleport,
        {
          to: "body", // 传送到 body
        },
        show.value
          ? h("div", { class: "modal" }, [
              h("div", { class: "modal-content" }, "Modal Content"),
              h(
                "button",
                {
                  onClick: () => (show.value = false),
                },
                "Close"
              ),
            ])
          : null
      );
  },
};
```

### 技巧 5：性能优化（v-memo 模拟）

```typescript
import { h, ref, shallowRef } from "vue";

export default {
  setup() {
    const list = ref([
      /* 大量数据 */
    ]);
    const cachedVNodes = shallowRef<VNode[]>([]);

    return () => {
      // 复杂逻辑：仅在数据变化时重新生成 VNode
      if (cachedVNodes.value.length === 0) {
        cachedVNodes.value = list.value.map((item) =>
          h("div", { key: item.id }, item.name)
        );
      }

      return h("div", cachedVNodes.value);
    };
  },
};
```

---

## 完整实战：Form Builder

### 需求

根据配置动态生成表单，支持多种字段类型、验证、联动。

### 实现

```typescript
import { h, ref, reactive, defineComponent, PropType } from "vue";

interface FieldConfig {
  name: string;
  type: "input" | "select" | "checkbox" | "radio";
  label: string;
  options?: Array<{ label: string; value: any }>;
  rules?: Array<(val: any) => boolean | string>;
  visible?: (formData: Record<string, any>) => boolean;
}

export default defineComponent({
  name: "FormBuilder",
  props: {
    fields: {
      type: Array as PropType<FieldConfig[]>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(data: Record<string, any>) => void>,
      required: true,
    },
  },
  setup(props) {
    const formData = reactive<Record<string, any>>({});
    const errors = reactive<Record<string, string>>({});

    const validate = (field: FieldConfig): boolean => {
      const value = formData[field.name];
      const fieldRules = field.rules || [];

      for (const rule of fieldRules) {
        const result = rule(value);
        if (result !== true) {
          errors[field.name] = typeof result === "string" ? result : "Invalid";
          return false;
        }
      }

      delete errors[field.name];
      return true;
    };

    const handleSubmit = () => {
      let isValid = true;

      for (const field of props.fields) {
        if (!validate(field)) {
          isValid = false;
        }
      }

      if (isValid) {
        props.onSubmit(formData);
      }
    };

    // 复杂逻辑：根据字段类型渲染不同组件
    const renderField = (field: FieldConfig) => {
      // 可见性控制
      if (field.visible && !field.visible(formData)) {
        return null;
      }

      const commonProps = {
        value: formData[field.name],
        onInput: (e: Event) => {
          formData[field.name] = (e.target as HTMLInputElement).value;
          validate(field);
        },
      };

      let input: any;

      switch (field.type) {
        case "input":
          input = h("input", {
            ...commonProps,
            type: "text",
            class: "form-input",
          });
          break;

        case "select":
          input = h(
            "select",
            {
              ...commonProps,
              onChange: (e: Event) => {
                formData[field.name] = (e.target as HTMLSelectElement).value;
                validate(field);
              },
              class: "form-select",
            },
            field.options?.map((opt) =>
              h("option", { value: opt.value }, opt.label)
            )
          );
          break;

        case "checkbox":
          input = h("input", {
            type: "checkbox",
            checked: formData[field.name],
            onChange: (e: Event) => {
              formData[field.name] = (e.target as HTMLInputElement).checked;
              validate(field);
            },
            class: "form-checkbox",
          });
          break;

        case "radio":
          input = h(
            "div",
            { class: "form-radio-group" },
            field.options?.map((opt) =>
              h("label", { key: opt.value }, [
                h("input", {
                  type: "radio",
                  value: opt.value,
                  checked: formData[field.name] === opt.value,
                  onChange: () => {
                    formData[field.name] = opt.value;
                    validate(field);
                  },
                }),
                h("span", opt.label),
              ])
            )
          );
          break;
      }

      return h("div", { class: "form-field", key: field.name }, [
        h("label", { class: "form-label" }, field.label),
        input,
        errors[field.name]
          ? h("div", { class: "form-error" }, errors[field.name])
          : null,
      ]);
    };

    return () =>
      h("form", { class: "form-builder", onSubmit: handleSubmit }, [
        ...props.fields.map(renderField),
        h(
          "button",
          {
            type: "submit",
            class: "form-submit",
          },
          "Submit"
        ),
      ]);
  },
});
```

### 使用示例

```typescript
const formConfig: FieldConfig[] = [
  {
    name: "username",
    type: "input",
    label: "用户名",
    rules: [
      (val) => !!val || "用户名不能为空",
      (val) => val.length >= 3 || "用户名至少 3 个字符",
    ],
  },
  {
    name: "role",
    type: "select",
    label: "角色",
    options: [
      { label: "管理员", value: "admin" },
      { label: "普通用户", value: "user" },
    ],
  },
  {
    name: "permissions",
    type: "checkbox",
    label: "权限",
    visible: (formData) => formData.role === "admin", // 联动
  },
];
```

---

## 最佳实践

### ✅ 推荐做法

1. **简单场景使用模板**

   - 大部分业务组件使用 `<template>`
   - 只在需要高度动态性时使用渲染函数

2. **类型安全**

   - 使用 TypeScript 定义 props 类型
   - 使用 `PropType` 增强类型推断
   - 明确标注返回类型 `VNode`

3. **性能优化**

   - 使用 `shallowRef` 缓存 VNode
   - 避免在渲染函数中创建新对象
   - 合理使用 `key` 属性

4. **JSX 优先**

   - 配置 JSX 支持
   - 复杂组件使用 JSX 提高可读性
   - 享受更好的 IDE 支持

5. **插槽处理**
   ```typescript
   return () =>
     h(MyComponent, null, {
       default: () => slots.default?.(),
       header: () => slots.header?.(),
     });
   ```

### ❌ 避免陷阱

1. **不要**忘记响应式访问

   ```typescript
   // ❌ 错误
   const text = message.value;
   return () => h("div", text);
   // ✅ 正确
   return () => h("div", message.value);
   ```

2. **不要**在渲染函数中创建响应式数据

   ```typescript
   // ❌ 错误：每次渲染都创建新 ref
   return () => {
     const count = ref(0);
     return h("div", count.value);
   };
   ```

3. **不要**混合返回对象和函数

   ```typescript
   // ❌ 错误
   return {
     count,
     render: () => h("div", count.value),
   };
   ```

4. **不要**忘记 key 属性（列表渲染）

   ```typescript
   // ❌ 错误
   items.value.map((item) => h("div", item.name));
   // ✅ 正确
   items.value.map((item) => h("div", { key: item.id }, item.name));
   ```

5. **不要**在生产环境使用（性能敏感场景）
   - 渲染函数性能通常不如模板编译
   - 除非有明确的动态需求

### Checklist

```
□ 是否真的需要渲染函数？（优先考虑模板）
□ 是否正确访问响应式数据？（在渲染函数内 .value）
□ 是否添加了 key 属性？（列表渲染）
□ 是否有类型定义？（TypeScript）
□ 是否考虑 JSX？（可读性更好）
□ 是否处理了插槽？（slots.default?.()）
□ 是否处理了事件？（onXxx）
□ 是否优化了性能？（缓存 VNode）
```

---

## 扩展阅读

### 相关技术文章

- [早退出与懒挂载：Vue3 性能优化的最佳实践](./早退出与懒挂载：Vue3-性能优化的最佳实践.md)
- [effectScope 深度解析：从原理到实战](./effectScope-深度解析：从原理到实战.md)
- [Vue3 响应式系统原理解析](./Vue3-响应式系统原理解析.md)

### 相关资源

- **Vue 3 文档**：[渲染函数 & JSX](https://vuejs.org/guide/extras/render-function.html)
- **Vue 3 API**：[h() 函数](https://vuejs.org/api/render-function.html#h)
- **Vite JSX**：[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)

---

## 总结

本文深入探讨了 Vue3 中 `setup` 返回渲染函数的机制与实践：

1. **核心概念**：

   - `setup` 返回函数会作为渲染函数
   - 会覆盖组件的 `template`
   - 需要使用 `h()` 函数创建 VNode

2. **使用场景**：

   - 动态组件渲染
   - 高阶组件封装
   - 递归组件
   - 复杂条件逻辑

3. **最佳实践**：

   - 简单场景优先使用模板
   - 类型安全（TypeScript）
   - 性能优化（缓存 VNode）
   - JSX 优先（可读性）

4. **进阶技巧**：
   - JSX 语法
   - 与 LazyScope 结合
   - Teleport 使用
   - 性能优化

渲染函数是 Vue3 强大的底层 API，在需要高度动态性和控制力的场景下，能够发挥巨大价值。但在大多数业务场景中，建议优先使用模板语法，保持代码的简洁和可维护性。

---

**相关资源：**

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue 3 渲染函数指南](https://vuejs.org/guide/extras/render-function.html)
- [JSX 插件文档](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)
- [Vue 3 TypeScript 支持](https://vuejs.org/guide/typescript/overview.html)
