````markdown
---
title: Vue3 计算属性的依赖收集（以 selectedAccount 为例，超细颗粒度）
date: 2025-09-11
tags: [Vue3, reactivity, computed, ref, reactive, 数组依赖, 对象依赖]
---

## 1. 目标场景回顾

我们有一个计算属性：

```ts
const selectedAccount = computed(
  () =>
    (accountList.value ?? []).find(
      (a) => a.loginid === selectedLoginid.value
    ) ?? null
);
```
````

问题：当**只修改选中行的其它字段**（如 `equity/balance/...`）时，为什么 **UI 会更新**，但 `computed` **不一定重新求值**？

---

## 2. Vue3 依赖收集是“所读即所依”

计算属性在**执行 getter 的那一刻**，会对**被读取的响应式源**建立依赖；**只有这些依赖发生变化**时，计算属性才会被标记为脏，从而在下次读取时重新求值。

### 2.1 常见响应式源与依赖粒度

- **`ref`**：访问 `.value` 建立依赖（例如 `selectedLoginid.value`）。
- **`reactive`/`ref` 包裹的对象**：访问 **某个属性** 时，以“对象 + 属性键”为依赖（例如读取 `row.loginid`）。
- **数组（`reactive`/`ref` 的数组）**：

  - 访问 **`length`** 会对 `length` 建依赖（影响 push/pop 等修改）。
  - **按索引读取**（`arr[i]`）会对该 **索引键** 建依赖。
  - **遍历/查找类方法**（如 `for...of`、`map`、`find` 等）通常会对**迭代键**和**相关索引**建依赖；在遍历过程中，若读取了元素对象的某些属性，也会对这些**属性键**建立依赖（见 2.3）。

- **Map/Set 等集合**：遍历时依赖“迭代键”（内部用 `ITERATE_KEY` 追踪）。

> 要点：**只对“读取过”的键建立依赖**；没读到的字段**不会**成为依赖。

### 2.2 `selectedAccount` 的依赖具体有哪些？

执行 `find()` 的过程中，会读取：

1. `selectedLoginid.value` —— 对这个 `ref` 的 `.value` 建依赖；
2. `accountList.value` —— 对 **数组引用/长度/迭代** 建依赖；
3. `a.loginid` —— 对**参与比较的那些元素**的 `loginid` 属性建依赖（直到找到命中的那一个或遍历结束）。

> 注意：此 getter **没有读取** `a.equity/balance/...`，所以**不会**对这些字段建依赖。

### 2.3 “读取时才变成响应式”的懒代理

当 `accountList.value` 是一个响应式数组，**访问数组元素 `a = arr[i]` 时**，Vue 会对该元素对象做**懒代理**（即在 `get` 拦截时把它包装为响应式代理）。此后读取 `a.loginid` 就会被**精确追踪**为“元素对象的 `loginid` 属性依赖”。

---

## 3. 为什么只改 `equity` 也能让 UI 更新？

- 模板或其它计算/侦听，在渲染时**单独读取**了 `selectedAccount.value?.equity`，因而对“**选中行对象的 `equity` 属性**”建立了依赖。
- 当你执行：

  ```ts
  // 原地修改选中行的对象字段
  selectedRow.equity = newEquity;
  ```

  由于这是 **被依赖的属性本身**，视图会**立即更新**。

- 但 `selectedAccount` 这个 **computed** 的 getter **并没有读取 `equity`**，所以它**不需要**重新求值；返回值（选中行对象的**同一引用**）保持不变，模板依旧能看到它的内部字段变化。

> 结论：**UI 更新**是因为模板对 `equity` 建立了依赖；**computed 不重算**是因为 getter 没依赖 `equity`。

---

## 4. 哪些变更会让 `selectedAccount` 重新求值？

- ✅ `selectedLoginid.value` 改变（切换了要找的 id）。
- ✅ `accountList.value` **换了新引用**（例如 `accountList.value = [...accountList.value]`）。
- ✅ 数组结构变化影响到依赖（如 `length` 变化、迭代相关变更）。
- ✅ 参与比较的元素的 **`loginid` 字段**改变，或该元素对象被**整体替换为新对象**。
- ❌ 只改**匹配元素的其它字段**（`equity/balance/...`），且**不换数组引用** —— **不会**触发 `selectedAccount` 重算，但模板会更新相应单元格。

---

## 5. 最简代码验证（逐步演示）

### 5.1 基础：只改其它字段，computed 不重算但 UI 会变

```ts
const selectedLoginid = ref("a1");
const accountList = ref([
  { loginid: "a1", equity: 100 },
  { loginid: "a2", equity: 200 },
]);

const selectedAccount = computed(
  () =>
    accountList.value.find((a) => a.loginid === selectedLoginid.value) ?? null
);

// ✅ 模板读取 selectedAccount?.equity → 对 “a1.equity” 建依赖
// 改 equity（不换数组引用），UI 会更新；computed 不一定重算（引用不变）
accountList.value[0].equity = 120;
```

### 5.2 换数组引用触发表格类重算（排序/分组等）

```ts
// 在复杂逻辑上一行加注释：原地改字段后，若还需触发表格模型重算，再“换数组引用”
accountList.value[0].equity = 130;
accountList.value = accountList.value.slice();
```

### 5.3 替换对象会让 computed 重算（因为命中的那一项换了引用）

```ts
// 在复杂逻辑上一行加注释：替换命中元素对象 → getter 要重新 .find()，computed 重算
const idx = accountList.value.findIndex((a) => a.loginid === "a1");
accountList.value.splice(idx, 1, { loginid: "a1", equity: 999 });
```

### 5.4 仅切换 loginid，一定重算

```ts
// 在复杂逻辑上一行加注释：selectedLoginid 变化是显式依赖，computed 一定重算
selectedLoginid.value = "a2";
```

---

## 6. 数组与对象的依赖“表格”

| 读取操作（在 getter 内）                    | 建立的依赖键                       | 哪些更新会触发重算                      |
| ------------------------------------------- | ---------------------------------- | --------------------------------------- |
| `selectedLoginid.value`                     | 该 `ref` 的 `value`                | 任何对 `selectedLoginid.value` 的修改   |
| `accountList.value`（拿到数组引用）         | 数组 `value` 引用、`length`/迭代键 | 换数组引用、`push/pop/splice`、长度变更 |
| `accountList.value[i]`                      | 数组索引 `i`                       | 替换该索引处元素、数组结构影响该索引    |
| `a.loginid`（查找时访问的元素属性）         | **元素对象的 `loginid` 属性**      | 改变该属性、或把该元素整体替换为新对象  |
| 未读取的字段（如 `a.equity` / `a.balance`） | **不会**建立依赖                   | 改这些字段**不会**让 computed 重算      |

> 模板/其它 computed/侦听如果单独读取了 `a.equity`，它们**会**对 `equity` 建依赖，从而在你改 `equity` 时更新 UI。

---

## 7. 实战建议（与表格场景结合）

1. **selectedAccount 只做“指向哪一行”**：通过 `loginid + accountList` 定位对象引用即可，不要在 getter 里读取无关字段，避免不必要重算。
2. **更新选中行的业务字段**（如盈亏、净值）：

   - 只需 **原地改对象字段**，UI 就会变。
   - 若还需要**触发表格模型重算**（排序/分组/聚合），在修改后**再换一次数组引用**：

     ```ts
     // 在复杂逻辑上一行加注释：需要触发表格重算时再换数组引用
     Object.assign(accountList.value[idx], patch);
     accountList.value = accountList.value.slice();
     ```

3. **避免错误写法**：不要让 `selectedAccount` 变成可写的 `ref` 并随行情去 `Object.assign(selectedAccount.value, ...)`；保持它是**纯派生**，杜绝引用抖动。
4. **高频更新时合批**：把多次行情更新合并到一帧内，再一次性换数组引用，减小重算与渲染负担。

---

## 8. 一句话总结

- computed **只会**对 getter **读到的键**建立依赖；
- 模板单独读取的字段，会建立**它自己的依赖**；
- **只改选中行的其它字段** ⇒ UI 更新，但 `selectedAccount` 不一定重算；
- **需要表格重排/聚合** ⇒ 修改后再“**换数组引用**”。

如果你愿意，把你当前的 `selectedAccount` 与“盈亏更新”两段代码贴上来；我只改**必要的几行**，并在复杂逻辑上一行加注释，帮你做到“UI 跟随变、computed 不抖动、表格按需重算”。

```
::contentReference[oaicite:0]{index=0}
```
