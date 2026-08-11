---
title: "For await of"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "for await…of 前面介绍过， for...of 循环用于遍历同步的 Iterator 接口。新引入的 for await...of 循环，则是用于遍历异步的 Iterator 接口。 3. 4. 5. 6. } 7. } 8. // a 9. // b 上面代码中， c。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/For await of.md"
---
::: v-pre

# For await of

> 本节目标：理解“For await of”的核心思路，并能把它用于实际开发或面试表达。
for await…of
前面介绍过，`for...of`循环用于遍历同步的 Iterator 接口。新引入的`for await...of`循环，则是用于遍历异步的 Iterator 接口。
 3. ```
    async function f() {
    ```

4. ```
    for await (const x of createAsyncIterable(['a', 'b'])) {
    ```

5. ```
    console.log(x);
    ```

6. `}`
7. `}`
8. `// a`
9. `// b`

上面代码中，`createAsyncIterable()`返回一个拥有异步遍历器接口的对象，`for...of`循环自动调用这个对象的异步遍历器的`next`方法，会得到一个 Promise 对象。`await`用来处理这个 Promise 对象，一旦`resolve`，就把得到的值（`x`）传入`for...of`的循环体。
`for await...of`循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。
 12. ```
    let body = '';
    ```

13. ```
    async function f() {
    ```

14. ```
    for await(const data of req) body += data;
    ```

15. ```
    const parsed = JSON.parse(body);
    ```

16. ```
    console.log('got', parsed);
    ```

17. `}`

上面代码中，`req`是一个 asyncIterable 对象，用来异步读取数据。可以看到，使用`for await...of`循环以后，代码会非常简洁。
如果`next`方法返回的 Promise 对象被`reject`，`for await...of`就会报错，要用`try...catch`捕捉。
 20. ```
    async function () {
    ```

21. ```
    try {
    ```

22. ```
    for await (const x of createRejectingIterable()) {
    ```

23. ```
    console.log(x);
    ```

24. `}`
25. ```
    } catch (e) {
    ```

26. ```
    console.error(e);
    ```

27. `}`
28. `}`

注意，`for await...of`循环也可以用于同步遍历器。
 31. ```
    (async function () {
    ```

32. ```
    for await (const x of ['a', 'b']) {
    ```

33. ```
    console.log(x);
    ```

34. `}`
35. `})();`
36. `// a`
37. `// b`

Node v10 支持异步遍历器，Stream 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。
 40. `//` 传统写法
41. ```
    function main(inputFilePath) {
    ```

42. ```
    const readStream = fs.createReadStream(
    ```

43. ```
    inputFilePath,
    ```

44. ```
    { encoding: 'utf8', highWaterMark: 1024 }
    ```

45. `);`
46. ```
    readStream.on('data', (chunk) => {
    ```

47. ```
    console.log('>>> '+chunk);
    ```

48. `});`
49. ```
    readStream.on('end', () => {
    ```

50. ```
    console.log('### DONE ###');
    ```

51. `});`
52. `}`
53. `//` 异步遍历器写法
54. ```
    async function main(inputFilePath) {
    ```

55. ```
    const readStream = fs.createReadStream(
    ```

56. ```
    inputFilePath,
    ```

57. ```
    { encoding: 'utf8', highWaterMark: 1024 }
    ```

58. `);`
59. ```
    for await (const chunk of readStream) {
    ```

60. ```
    console.log('>>> '+chunk);
    ```

61. `}`
62. ```
    console.log('### DONE ###');
    ```

63. `}` \> 来自 \<[https://www.bookstack.cn/read/es6-3rd/spilt.3.docs-async-iterator.md](https://www.bookstack.cn/read/es6-3rd/spilt.3.docs-async-iterator.md)\>
\> 来自 \<[https://www.bookstack.cn/read/es6-3rd/spilt.3.docs-async-iterator.md](https://www.bookstack.cn/read/es6-3rd/spilt.3.docs-async-iterator.md)\>

:::
