# 分层与命名建议

1. 传输层（Transport / Adapter）

   - 现在的类：`WebSocketClient`
   - 职责：原生 WebSocket 封装、事件派发、心跳、重连（指数退避+抖动）、优雅关闭。
   - 常见模式：**Adapter**（适配原生 API）、**Event Emitter/Observer**（事件发布订阅）。

2. 会话/连接层（Connection / Supervisor / Subscription Manager）

   - 现在的类：`WebSocketService`
   - 职责：连接生命周期管理（先关后开、代次隔离）、订阅状态机（pending/active）、批量订阅/退订、切换连接时的回灌。
   - 常见模式：**Supervisor**（监督者，Erlang/Elixir 风格）、**Facade**（对上层提供简化接口）、**Reconciler**（把“期望状态”与“实际状态”对齐）。

3. 应用层/状态层（Application Store / Orchestrator）

   - 现在的模块：Pinia `useSocketStore`
   - 职责：计算“期望订阅集”（来自多个模块池的并集）、与 Service 做**差量对齐**、业务侧缓存（行情/订单/资金）、登录单飞、命令发送与结果路由。
   - 常见模式：**MVVM** 里的 **Model/Store**、**Orchestrator**（编排者）、**Controller-Reconciler**（Kubernetes 控制器那套“期望 vs 实际”的宣言式对齐）。

简单一句话：**Adapter（Client） → Supervisor/Facade（Service） → Orchestrator/Store（Pinia）**。

## 传输层（Transport / Adapter）

1. 通过 class 来进行封装；主要管五件事：

   - 创建实例
   - 实例操作（连接，关闭）
   - 操作四种事件处理：（连接成功，收到消息，连接或关闭失败，关闭成功）
   - 心跳管理
   - 重连管理

2. 构造函数保存的值有，三类：实例，重连相关，心跳

   - websocket 实例
   - 重连相关：close 后是否重连，间隔，最大重连次数，当前已经重连次数
   - 心跳间隔
   - 心跳计时器

3. 主动 connect 方法

   - 设置 close 后可重连
   - 创建实例
   - 设置四个事件的监听

     - open 回调
       - 重置已重连次数
       - 向外通知 open 事件
       - 开始心跳
     - close 事件回调，默认是回重连的
       - 向外发布 close 事件
       - 停止心跳（清除计时器）
       - 重连
     - message 事件回调：向外发布事件
     - error 事件回调：向外发布事件

4. close 连接的方法
   - 控制状态来决定要不要重试
   - 调用原生 ws.close
   - **重点** close 包括 ws 原生的 close 调用后，并不是说就一定 close 了，我们还要监听 ws.onclose 事件，事件触发才是真正的 close，所有调用 close，和 promise 的等待 onclose 事件是不一样的；

## 会话/连接层（Connection / Supervisor / Subscription Manager）

1. 通过 class 来进行封装；主要管三件事：

   - 创建实例
   - 保存当前已订阅数据和未连接前待订阅数据
   - 调用传输层实例的方法，同时处理好订阅数据，同时将事件回调转递给传输层

2. 构造函数保存的值有，三类：实例，重连相关，心跳

   - websocket 实例
   - 重连相关：close 后是否重连，间隔，最大重连次数，当前已经重连次数
   - 心跳间隔
   - 心跳计时器

3. 连接方法 connect

   - 状态判断是否返回
   - 创建传输层实例
   - 设置四个事件的监听

     - open 回调
       - 将未订阅的订阅，更新已订阅和未订阅的变量
     - close 事件回调，默认是回重连的
       - 向外发布 close 事件
       - 更新订阅状态，把已订阅转成未订阅，**这样下次重连成功后会自动订阅**
     - message 事件回调：向外发布事件
     - error 事件回调：向外发布事件

4. close 连接的方法
   - 控制状态来决定要不要重试
   - 调用原生 ws.close
   - **重点** close 包括 ws 原生的 close 调用后，并不是说就一定 close 了，我们还要监听 ws.onclose 事件，事件触发才是真正的 close，所有调用 close，和 promise 的等待 onclose 事件是不一样的；
