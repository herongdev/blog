---
title: "如何在Javascript中编写异步await而不使用try-catch块"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "ES7 Async/await 允许我们作为开发人员编写 看起来是 同步的异步 JS 代码。在当前的 JS 版本中，我们被引入了 Promises ，这使我们能够简化异步流程并避免回调地狱。 回调地狱是一个术语，用于描述 JS 中的以下情况： } ); } 这使得维护代码和管理控。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/如何在Javascript中编写异步await而不使用try-catch块.md"
---
::: v-pre

# 如何在Javascript中编写异步await而不使用try-catch块

> 本节目标：理解“如何在Javascript中编写异步await而不使用try-catch块”的核心思路，并能把它用于实际开发或面试表达。
`ES7 Async/await` 允许我们作为开发人员编写**看起来是**同步的异步 `JS` 代码。在当前的 `JS` 版本中，我们被引入了 `Promises`，这使我们能够简化异步流程并避免回调地狱。
回调地狱是一个术语，用于描述 `JS` 中的以下情况：

```
async function asyncTask(cb) {
```

```
 const user = await UserModel.findById(1);
```

```
 if (!user) return cb("No user found");
```

```
 const savedTask = await TaskModel({ userId: user.id, name: "Demo Task" });
```

```
 if (user.notificationsEnabled) {
```

```
 await NotificationService.sendNotification(user.id, "Task Created");
```
   `}`

```
 if (savedTask.assignedUser.id !== user.id) {
```

```
 await NotificationService.sendNotification(
```

```
 savedTask.assignedUser.id,
```

```
 "Task was created for you"
```
     `);`
  `}`

```
 cb(null, savedTask);
}
```

这使得维护代码和管理控制流变得非常困难。如果回调`A`的某些结果等于`'foo'`，请考虑一个需要执行其他异步方法的`if`语句。

`promise`**方案**
有了 `Promise` 和 `ES6`，我们可以将之前的代码噩梦简化为：

```
function asyncTask(cb) {
```

```
 asyncFuncA.then(AsyncFuncB)
```

```
.then(AsyncFuncC)
```

```
.then(AsyncFuncD)
```

```
.then(data => cb(null, data)
```

```
.catch(err => cb(err));
}
```

你不觉得好看多了？
但在现实世界的场景中，**异步流程可能会变得更复杂一些**，例如在您的服务器模型（`nodejs`）中，您可能希望将实体保存到数据库中，然后根据保存的值查找其他实体（如果该值存在） ，执行其他一些异步任务，在所有任务完成后，您可能希望使用步骤 `1` 中创建的对象来响应用户。如果在某个步骤中发生错误，您希望通知用户确切的错误。
当然，有了承诺，它看起来会比普通的回调更干净，但是，恕我直言，它可能会有点混乱。

```
ES7 async/await
```
 _注意：您需要使用转译器才能享受_ `async/await`_，您可以使用_ `babel` _或_ `typescript` _来满足所需的_ `polyfills`_。_
这就是我发现 `async await` 非常有用的地方，它允许您编写如下代码：

```
async function asyncTask(cb) {
```

```
 const user = await UserModel.findById(1);
```

```
 if (!user) return cb("No user found");
```

```
 const savedTask = await TaskModel({ userId: user.id, name: "Demo Task" });
```

```
 if (user.notificationsEnabled) {
```

```
 await NotificationService.sendNotification(user.id, "Task Created");
```
   `}`

```
 if (savedTask.assignedUser.id !== user.id) {
```

```
 await NotificationService.sendNotification(
```

```
 savedTask.assignedUser.id,
```

```
 "Task was created for you"
```
     `);`
  `}`

```
 cb(null, savedTask);
}
```

==上面的代码看起来干净多了，==**但是，错误处理呢？**
==在进行异步调用时，在执行== `promise` ==期间可能会发生某些事情（数据库连接错误、数据库模型验证错误等。）==
==由于异步函数正在等待== `Promise`==，所以当== `Promise` ==遇到错误时，它会抛出一个异常，该异常将在== `Promise` ==的== `catch` ==方法中被捕获。==
==在== `async/await` ==函数中，通常使用==`try/catch`==块来捕获此类错误。==
==我不是来自打字语言背景，所以== `try/catch` ==为我添加了额外的代码，我认为这些代码看起来并不那么干净。====我确定这是个人喜好问题，但这是我的意见。==
==所以前面的代码看起来像这样：==

```
async function asyncTask(cb) {
```

```
 try {
```

```
 const user = await UserModel.findById(1);
```

```
 if (!user) return cb("No user found");
```

```
 } catch (e) {
```

```
 return cb("Unexpected error occurred");
```
   `}`

```
 try {
```

```
 const savedTask = await TaskModel({ userId: user.id, name: "Demo Task" });
```

```
 } catch (e) {
```

```
 return cb("Error occurred while saving task");
```
   `}`

```
 if (user.notificationsEnabled) {
```

```
 try {
```

```
 await NotificationService.sendNotification(user.id, "Task Created");
```

```
 } catch (e) {
```

```
 return cb("Error while sending notification");
```
     `}`
  `}`

```
 if (savedTask.assignedUser.id !== user.id) {
```

```
 try {
```

```
 await NotificationService.sendNotification(
```

```
 savedTask.assignedUser.id,
```

```
 "Task was created for you"
```
       `);`

```
 } catch (e) {
```

```
 return cb("Error while sending notification");
```
     `}`
  `}`

```
 cb(null, savedTask);
}
```
 不同的做事方式
最近我一直在使用`go-lang`进行编码，并且非常喜欢他们看起来像这样的解决方案：

```
data, err := db.Query("SELECT ...")
if err != nil { return err }
```

==我认为它比使用== `try-catch` ==块更干净，并且更少地聚集代码，这使得它具有可读性和可维护性。==
==但是==`await`==的问题是，如果没有为它提供== `try-catch` ==块，它会默默地退出你的函数。除非提供== `catch` ==子句，否则您将无法控制它。==
==当我和我的一个好朋友== `Tomer Barnea` ==坐下来试图找到一个更清洁的解决方案时，我们完成了使用下一个方法：==
==还记得==`await`==是在等待解决的承诺吗？==
==有了这些知识，我们可以制作小的实用函数来帮助我们捕捉这些错误：==
 \> 来自

```
 <https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/>
```

```
// to.js
export default function to(promise) {
```

```
 return promise
```

```
 .then((data) => {
```

```
 return [null, data];
```
     `})`

```
 .catch((err) => [err]);
}
```

==实用程序函数接收一个承诺，然后将成功响应解析为一个数组，返回数据作为第二项。====并且第一个从捕获中收到的错误。==
==然后我们可以让我们的异步代码看起来像这样：==
 \> 来自

```
 <https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/>
```

```
async function asyncTask() {
```

```
 let err, user, savedTask;
```

```
 [err, user] = await to(UserModel.findById(1));
```

```
 if (!user) throw new CustomerError("No user found");
```

```
 [err, savedTask] = await to(
```

```
 TaskModel({ userId: user.id, name: "Demo Task" })
```
   `);`

```
 if (err) throw new CustomError("Error occurred while saving task");
```

```
 if (user.notificationsEnabled) {
```

```
 const [err] = await to(
```

```
 NotificationService.sendNotification(user.id, "Task Created")
```
     `);`

```
 if (err) console.error("Just log the error and continue flow");
```

```
 }
}
```
 上面的示例只是解决方案的一个简单用例，您可以在 `to.js` 方法中附加拦截器，该方法将接收原始错误对象，记录它或在将其传回之前对其执行任何您需要做的事情。
 \> 来自

```
 <https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/>
```

_这篇文章只是看待异步_`/`_等待错误处理的另一种方式。它不应该用作您编写的每个_ `async/await` _函数的_ `goto`_，并且在很多情况下，在顶部有一个_ `catch` _就可以了。有时我们不想暴露模型实现的错误对象，而是希望提供一个自定义错误对象来屏蔽底层的_ `mongoose` _错误实现。_
我们为这个库创建了一个简单的 `NPM` 包，您可以使用以下方式安装它：

```
Github Repo
npm i await-to-js
```

==源码==

`/**`

```
* @param { Promise } promise
```

```
* @param { Object= } errorExt - Additional Information you can pass to the err object
```

```
* @return { Promise }
```

```
*/
export function to<T, U = Error>(
```

```
 promise: Promise<T>,
```

```
 errorExt?: object
): Promise<[U, undefined] | [null, T]> {
```

```
 return promise
```

```
 .then<[null, T]>((data: T) => [null, data])
```

```
 .catch<[U, undefined]>((err: U) => {
```

```
 if (errorExt) {
```

```
 const parsedError = Object.assign({}, err, errorExt);
```

```
 return [parsedError, undefined];
```
       `}`

```
 return [err, undefined];
```

```
 });
}
```

这个函数 to 是一个常见的 JavaScript 工具，用于优雅地处理 Promise 的错误，而不必在每次使用 then 和 catch 时都进行大量的错误处理。通常情况下，当我们使用 Promise 或 async/await 时，需要用 try-catch 语句来捕获错误，但使用这个函数可以更简洁地处理。
这是如何使用这个函数的一些示例：
1. 使用普通的 Promise:
javascript
Copy code
const myPromise = new Promise((resolve, reject) =\> \{
if (/* some condition */) \{
resolve('Success data');
\} else \{
reject(new Error('Something went wrong'));
\}
\});
to(myPromise)
.then(([err, data]) =\> \{
if (err) \{
console.error(err);
\} else \{
console.log(data);
\}
\});
2. 使用 async/await:
假设您有一个名为 fetchData 的异步函数，您希望使用这个函数并处理它可能会抛出的任何错误：
javascript
Copy code
async function fetchData() \{
// Some async operations
return 'Some data';
\}
async function main() \{
const [err, data] = await to(fetchData());
if (err) \{
console.error('Error occurred:', err);
\} else \{
console.log('Received data:', data);
\}
\}
main();
3. 使用额外的错误信息:
有时，您可能希望将额外的错误上下文或信息与捕获的错误一起返回。您可以这样做：
javascript
Copy code
const [err, data] = await to(fetchData(), \{ customErrorInfo: 'This is custom error info' \});
if (err) \{
console.error('Error occurred:', err, 'Custom Info:', err.customErrorInfo);
\} else \{
console.log('Received data:', data);
\}
以上是该 to 函数的三种使用方式，帮助您更简洁地处理 Promise 错误。

:::
