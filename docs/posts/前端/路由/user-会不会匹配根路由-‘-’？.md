---
title: /user 会不会匹配根路由 ‘/’？
date: 2025-09-05 19:00:06
tags:
---

---

title: “/user 会不会匹配根路由 ‘/’？”
date: 2025-09-05
tags: \[Vue Router 4, 路由匹配, 懒加载]

---

## 结论

不会。`/user` **不会**匹配到你定义的根路由 `{ path: '/' }`。它只会匹配到**自己**这条顶层路由 `{ path: '/user' }`，因此也**不会**渲染 `@/views/(public)/layout.vue`。

## 为什么

- Vue Router 使用基于 `path-to-regexp` 的**精确匹配**。`'/'` 不是“前缀匹配一切”，只匹配根路径本身，或作为**父路由**被命中的**相对子路由**所包含。
- 你现在把 `/user` 定义为**顶层**路由（不在 `children` 里），所以跳转到 `/user` 时，`to.matched` 里只有 `/user` 这一条记录，不会包含 `'/'` 那个布局。

## 什么时候会经过 `'/'` 布局？

只有当你把 **子路由写成相对路径** 时，例如：

```ts
// 复杂逻辑：相对子路由会被拼成 /user，且会渲染父布局
{
  path: '/',
  component: () => import('@/views/(public)/layout.vue'),
  children: [
    { path: 'user', component: () => import('@/views/user/page.vue') } // 注意没有前导斜杠
  ]
}
```

上面这种写法才会让 `/user` 经过 `layout.vue`。而你当前是：

```ts
{ path: '/user', component: () => import('@/views/user/page.vue') } // 顶层、绝对路径
```

两者行为不同。

## 快速自检（可在控制台验证）

```ts
// 复杂逻辑：查看匹配链，确认是否包含根布局
console.log(router.resolve("/user").matched.map((r) => r.path));
// 期望：['/user']，而不是 ['/', '/user']
```
