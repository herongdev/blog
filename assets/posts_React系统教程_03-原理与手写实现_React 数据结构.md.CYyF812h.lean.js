import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"React 数据结构","description":"围绕“React 数据结构”整理的概念、示例与实践笔记。","frontmatter":{"title":"React 数据结构","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“React 数据结构”整理的概念、示例与实践笔记。","sidebarWeight":2,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/React 数据结构.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/React 数据结构.md","filePath":"posts/React系统教程/03-原理与手写实现/React 数据结构.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/React 数据结构.md"};function i(c,l,o,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"react-数据结构",tabindex:"-1"},[s("React 数据结构 "),n("a",{class:"header-anchor",href:"#react-数据结构","aria-label":'Permalink to "React 数据结构"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“React 数据结构”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"FiberRoot")]),s(`
`),n("span",{class:"line"},[n("span",null,"type BaseFiberRootProperties = {|")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // root节点，render方法接收的第二个参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  containerInfo: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 只有在持久更新中会用到，也就是不支持增量更新的平台，react-dom不会用到")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pendingChildren: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当前应用对应的Fiber对象，是Root Fiber")]),s(`
`),n("span",{class:"line"},[n("span",null,"  current: Fiber,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 一下的优先级是用来区分")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 1) 没有提交(committed)的任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 2) 没有提交的挂起任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 3) 没有提交的可能被挂起的任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 我们选择不追踪每个单独的阻塞登记，为了兼顾性能")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The earliest and latest priority levels that are suspended from committing.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 最老和新的在提交的时候被挂起的任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  earliestSuspendedTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  latestSuspendedTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The earliest and latest priority levels that are not known to be suspended.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 最老和最新的不确定是否会挂起的优先级（所有任务进来一开始都是这个状态）")]),s(`
`),n("span",{class:"line"},[n("span",null,"  earliestPendingTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  latestPendingTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The latest priority level that was pinged by a resolved promise and can")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // be retried.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 最新的通过一个promise被reslove并且可以重新尝试的优先级")]),s(`
`),n("span",{class:"line"},[n("span",null,"  latestPingedTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果有错误被抛出并且没有更多的更新存在，我们尝试在处理错误前同步重新从头渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在`renderRoot`出现无法处理的错误时会被设置为`true`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  didError: boolean,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 正在等待提交的任务的`expirationTime`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pendingCommitExpirationTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 已经完成的任务的FiberRoot对象，如果你只有一个Root，那他永远只可能是这个Root对应的Fiber，或者是null")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在commit阶段只会处理这个值对应的任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  finishedWork: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在任务被挂起的时候通过setTimeout设置的返回内容，用来下一次如果有新的任务挂起时清理还没触发的timeout")]),s(`
`),n("span",{class:"line"},[n("span",null,"  timeoutHandle: TimeoutHandle | NoTimeout,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 顶层context对象，只有主动调用`renderSubtreeIntoContainer`时才会有用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  context: Object | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pendingContext: Object | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 用来确定第一次渲染的时候是否需要融合")]),s(`
`),n("span",{class:"line"},[n("span",null,"  +hydrate: boolean,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当前root上剩余的过期时间")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // TODO: 提到renderer里面区处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextExpirationTimeToWorkOn: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当前更新对应的过期时间")]),s(`
`),n("span",{class:"line"},[n("span",null,"  expirationTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // List of top-level batches. This list indicates whether a commit should be")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // deferred. Also contains completion callbacks.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // TODO: Lift this into the renderer")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 顶层批次（批处理任务？）这个变量指明一个commit是否应该被推迟")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 同时包括完成之后的回调")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 貌似用在测试的时候？")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstBatch: Batch | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // root之间关联的链表结构")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextScheduledRoot: FiberRoot | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"|};")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fiber")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Fiber对应一个组件需要被处理或者已经处理了，一个组件可以有一个或者多个Fiber")]),s(`
`),n("span",{class:"line"},[n("span",null,"type Fiber = {|")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 标记不同的组件类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tag: WorkTag,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // ReactElement里面的key")]),s(`
`),n("span",{class:"line"},[n("span",null,"  key: null | string,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // ReactElement.type，也就是我们调用`createElement`的第一个参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  elementType: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The resolved function/class/ associated with this fiber.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 异步组件resolved之后返回的内容，一般是`function`或者`class`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  type: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The local state associated with this fiber.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）")]),s(`
`),n("span",{class:"line"},[n("span",null,"  stateNode: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 单链表树结构")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指向自己的第一个子节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"  child: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指向自己的兄弟结构")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 兄弟节点的return指向同一个父节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"  sibling: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  index: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // ref属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}) | RefObject,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 新的变动带来的新的props")]),s(`
`),n("span",{class:"line"},[n("span",null,"  pendingProps: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 上一次渲染完成之后的props")]),s(`
`),n("span",{class:"line"},[n("span",null,"  memoizedProps: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 该Fiber对应的组件产生的Update会存放在这个队列里面")]),s(`
`),n("span",{class:"line"},[n("span",null,"  updateQueue: UpdateQueue<any> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 上一次渲染的时候的state")]),s(`
`),n("span",{class:"line"},[n("span",null,"  memoizedState: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 一个列表，存放这个Fiber依赖的context")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstContextDependency: ContextDependency<mixed> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 用来描述当前Fiber和他子树的`Bitfield`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 共存的模式表示这个子树是否默认是异步渲染的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Fiber被创建的时候他会继承父Fiber")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 其他的标识也可以在创建的时候被设置")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 但是在创建之后不应该再被修改，特别是他的子Fiber创建之前")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mode: TypeOfMode,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 用来记录Side Effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effectTag: SideEffectTag,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 单链表用来快速查找下一个side effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextEffect: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 子树中第一个side effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstEffect: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 子树中最后一个side effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  lastEffect: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 代表任务在未来的哪个时间点应该被完成")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 不包括他的子树产生的任务")]),s(`
`),n("span",{class:"line"},[n("span",null,"  expirationTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 快速确定子树中是否有不在等待的变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"  childExpirationTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 我们称他为`current <==> workInProgress`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在渲染完成之后他们会交换位置")]),s(`
`),n("span",{class:"line"},[n("span",null,"  alternate: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 下面是调试相关的，收集每个Fiber和子树渲染时间的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  actualDuration?: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,'  // If the Fiber is currently active in the "render" phase,')]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This marks the time at which the work began.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This field is only set when the enableProfilerTimer flag is enabled.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  actualStartTime?: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Duration of the most recent render time for this Fiber.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This value is not updated when we bailout for memoization purposes.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This field is only set when the enableProfilerTimer flag is enabled.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  selfBaseDuration?: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Sum of base times for all descedents of this Fiber.")]),s(`
`),n("span",{class:"line"},[n("span",null,'  // This value bubbles up during the "complete" phase.')]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This field is only set when the enableProfilerTimer flag is enabled.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  treeBaseDuration?: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Conceptual aliases")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // workInProgress : Fiber ->  alternate The alternate used for reuse happens")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // to be the same as work in progress.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // __DEV__ only")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _debugID?: number,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _debugSource?: Source | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _debugOwner?: Fiber | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _debugIsCurrentlyTiming?: boolean,")]),s(`
`),n("span",{class:"line"},[n("span",null,"|};")]),s(`
`),n("span",{class:"line"},[n("span",null,"effectTags")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Copyright (c) Facebook, Inc. and its affiliates.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * This source code is licensed under the MIT license found in the")]),s(`
`),n("span",{class:"line"},[n("span",null," * LICENSE file in the root directory of this source tree.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @flow")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export type SideEffectTag = number;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Don't change these two values. They're used by React Dev Tools.")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const NoEffect = /*              */ 0b00000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const PerformedWork = /*         */ 0b00000000001;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// You can change the rest (and add more).")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Placement = /*             */ 0b00000000010;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Update = /*                */ 0b00000000100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const PlacementAndUpdate = /*    */ 0b00000000110;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Deletion = /*              */ 0b00000001000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ContentReset = /*          */ 0b00000010000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Callback = /*              */ 0b00000100000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const DidCapture = /*            */ 0b00001000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Ref = /*                   */ 0b00010000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Snapshot = /*              */ 0b00100000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Update & Callback & Ref & Snapshot")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const LifecycleEffectMask = /*   */ 0b00110100100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Union of all host effects")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostEffectMask = /*        */ 0b00111111111;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Incomplete = /*            */ 0b01000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ShouldCapture = /*         */ 0b10000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactWorkTag")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const FunctionComponent = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ClassComponent = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const IndeterminateComponent = 2; // Before we know whether it is function or class")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostComponent = 5;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostText = 6;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Fragment = 7;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Mode = 8;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ContextConsumer = 9;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ContextProvider = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ForwardRef = 11;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Profiler = 12;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const SuspenseComponent = 13;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const MemoComponent = 14;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const SimpleMemoComponent = 15;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const LazyComponent = 16;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const IncompleteClassComponent = 17;")]),s(`
`),n("span",{class:"line"},[n("span",null,"sideEffects")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Copyright (c) Facebook, Inc. and its affiliates.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * This source code is licensed under the MIT license found in the")]),s(`
`),n("span",{class:"line"},[n("span",null," * LICENSE file in the root directory of this source tree.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @flow")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"export type SideEffectTag = number;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Don't change these two values. They're used by React Dev Tools.")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const NoEffect = /*              */ 0b00000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const PerformedWork = /*         */ 0b00000000001;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// You can change the rest (and add more).")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Placement = /*             */ 0b00000000010;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Update = /*                */ 0b00000000100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const PlacementAndUpdate = /*    */ 0b00000000110;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Deletion = /*              */ 0b00000001000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ContentReset = /*          */ 0b00000010000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Callback = /*              */ 0b00000100000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const DidCapture = /*            */ 0b00001000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Ref = /*                   */ 0b00010000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Snapshot = /*              */ 0b00100000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Update & Callback & Ref & Snapshot")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const LifecycleEffectMask = /*   */ 0b00110100100;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Union of all host effects")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const HostEffectMask = /*        */ 0b00111111111;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Incomplete = /*            */ 0b01000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const ShouldCapture = /*         */ 0b10000000000;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Update & UpdateQueue")]),s(`
`),n("span",{class:"line"},[n("span",null,"export type Update<State> = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 更新的过期时间")]),s(`
`),n("span",{class:"line"},[n("span",null,"  expirationTime: ExpirationTime,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // export const UpdateState = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // export const ReplaceState = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // export const ForceUpdate = 2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // export const CaptureUpdate = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指定更新的类型，值为以上几种")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tag: 0 | 1 | 2 | 3,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 更新内容，比如`setState`接收的第一个参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  payload: any,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 对应的回调，`setState`，`render`都有")]),s(`
`),n("span",{class:"line"},[n("span",null,"  callback: (() => mixed) | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指向下一个更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  next: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 指向下一个`side effect`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextEffect: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"export type UpdateQueue<State> = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 每次操作完更新之后的`state`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  baseState: State,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 队列中的第一个`Update`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstUpdate: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 队列中的最后一个`Update`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  lastUpdate: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 第一个捕获类型的`Update`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstCapturedUpdate: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 最后一个捕获类型的`Update`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  lastCapturedUpdate: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 第一个`side effect`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstEffect: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 最后一个`side effect`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  lastEffect: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 第一个和最后一个捕获产生的`side effect`")]),s(`
`),n("span",{class:"line"},[n("span",null,"  firstCapturedEffect: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  lastCapturedEffect: Update<State> | null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])])],-1)])])}const m=a(t,[["render",i]]);export{b as __pageData,m as default};
