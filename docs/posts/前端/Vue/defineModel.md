不是“不能 push”，而是\*\*`defineModel` 只在你给 `model.value` 赋新值时才会触发 `update:modelValue`**。
像 `push / splice` 这种**对同一个数组实例的就地修改\*\*，不会触发 `defineModel` 的 setter，因此**不会向父组件同步**（除非父子共享同一对象引用，这样虽然会“看起来生效”，但违反单向数据流，且很容易被父层下一次渲染覆盖）。

## 结论（基于官方与社区资料）

- `defineModel` 本质是**把 `modelValue` + `update:modelValue` 封装成一个可写的 ref**；\*\*只有“赋值”\*\*才会触发 emit。([Vue.js][1])
- 多个社区 / issues 都指出：**对数组/对象的深层修改不会自动 emit**，因此父层拿不到变更；需要**重新赋值**或**手动 emit**。([GitHub][2])
- 这是**设计选择**而非 bug：Vue 仍然倡导**子组件通过事件同步父值**，避免直接深改 props 引用。([Vue 3 迁移指南][3])

## 推荐做法（两选一）

### A. 重新赋值（最简、最稳）

```ts
// 复杂逻辑：用新数组触发 defineModel 的 setter，从而 emit 到父层
model.value = [...model.value, newItem];
```

```ts
// 复杂逻辑：删除/更新同理——返回新数组再赋值
model.value = model.value.filter((_, idx) => idx !== i);
```

### B. 手动 emit（若你没用 defineModel，而是手写 props/emit）

```ts
// 复杂逻辑：就地改完后，显式把“新副本”通过事件抛给父层
const next = [...props.modelValue, newItem];
emit("update:modelValue", next);
```

> 不建议：`model.value.push(x)` 之后再 `model.value = model.value` 这种“自赋值触发”，虽然能 emit，但可读性差、容易踩坑。

## 什么时候 push“看起来能用”？

当父层把同一个数组实例传给子层时，你在子里 `push` 会直接改到父的那份引用，因此本地能看到变化——但这**绕过了 v-model 的事件同步**，属于**反模式**：
下一次父层产生新引用或重新渲染时，你的改动可能被覆盖掉。([Vue 3 迁移指南][3])

## 一句话收尾

**`defineModel` 没禁止 `push`**；只是**不会为“深层就地改动”自动发 `update`**。想让父子同步，**用“新引用赋值”**（或手动 emit）。这是官方推荐的单向数据流与 v-model 语义。([Vue.js][1])

[1]: https://vuejs.org/guide/components/v-model?utm_source=chatgpt.com "Component v-model"
[2]: https://github.com/vuejs/core/issues/11143?utm_source=chatgpt.com "defineModel push array doesnt trigger the value #11143"
[3]: https://v3-migration.vuejs.org/breaking-changes/v-model?utm_source=chatgpt.com "v-model breaking"
