import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"源码","description":"围绕“源码”整理的概念、示例与实践笔记。","frontmatter":{"title":"源码","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“源码”整理的概念、示例与实践笔记。","sidebarWeight":71,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/源码.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/源码.md","filePath":"posts/React系统教程/03-原理与手写实现/源码.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/源码.md"};function t(c,a,u,o,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"源码",tabindex:"-1"},[s("源码 "),n("a",{class:"header-anchor",href:"#源码","aria-label":'Permalink to "源码"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“源码”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"只有2300多行，可以一读；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/** @license React v17.0.2")]),s(`
`),n("span",{class:"line"},[n("span",null," * react.development.js")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * Copyright (c) Facebook, Inc. and its affiliates.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * This source code is licensed under the MIT license found in the")]),s(`
`),n("span",{class:"line"},[n("span",null," * LICENSE file in the root directory of this source tree.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"'use strict';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'if (process.env.NODE_ENV !== "production") {')]),s(`
`),n("span",{class:"line"},[n("span",null,"  (function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"'use strict';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var _assign = require('object-assign');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// TODO: this is special because it gets imported during build.")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ReactVersion = '17.0.2';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// ATTENTION")]),s(`
`),n("span",{class:"line"},[n("span",null,"// When adding new symbols to this file,")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'")]),s(`
`),n("span",{class:"line"},[n("span",null,"// The Symbol used to tag the ReactElement-like types. If there is no native Symbol")]),s(`
`),n("span",{class:"line"},[n("span",null,"// nor polyfill, then a plain number is used for performance.")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_ELEMENT_TYPE = 0xeac7;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_PORTAL_TYPE = 0xeaca;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.Fragment = 0xeacb;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.StrictMode = 0xeacc;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.Profiler = 0xead2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_PROVIDER_TYPE = 0xeacd;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_CONTEXT_TYPE = 0xeace;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_FORWARD_REF_TYPE = 0xead0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.Suspense = 0xead1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_SUSPENSE_LIST_TYPE = 0xead8;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_MEMO_TYPE = 0xead3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_LAZY_TYPE = 0xead4;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_BLOCK_TYPE = 0xead9;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_SERVER_BLOCK_TYPE = 0xeada;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_FUNDAMENTAL_TYPE = 0xead5;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_SCOPE_TYPE = 0xead7;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_OPAQUE_ID_TYPE = 0xeae0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_OFFSCREEN_TYPE = 0xeae2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (typeof Symbol === 'function' && Symbol.for) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var symbolFor = Symbol.for;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_ELEMENT_TYPE = symbolFor('react.element');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_PORTAL_TYPE = symbolFor('react.portal');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  exports.Fragment = symbolFor('react.fragment');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  exports.StrictMode = symbolFor('react.strict_mode');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  exports.Profiler = symbolFor('react.profiler');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_PROVIDER_TYPE = symbolFor('react.provider');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_CONTEXT_TYPE = symbolFor('react.context');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  exports.Suspense = symbolFor('react.suspense');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_MEMO_TYPE = symbolFor('react.memo');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_LAZY_TYPE = symbolFor('react.lazy');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_BLOCK_TYPE = symbolFor('react.block');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_SCOPE_TYPE = symbolFor('react.scope');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var FAUX_ITERATOR_SYMBOL = '@@iterator';")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getIteratorFn(maybeIterable) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (maybeIterable === null || typeof maybeIterable !== 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof maybeIterator === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return maybeIterator;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Keeps track of the current dispatcher.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ReactCurrentDispatcher = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @type {ReactComponent}")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  current: null")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Keeps track of the current batch's configuration such as how long an update")]),s(`
`),n("span",{class:"line"},[n("span",null," * should suspend for if it needs to.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ReactCurrentBatchConfig = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  transition: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Keeps track of the current owner.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * The current owner is the component who should own any components that are")]),s(`
`),n("span",{class:"line"},[n("span",null," * currently being constructed.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ReactCurrentOwner = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @type {ReactComponent}")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  current: null")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ReactDebugCurrentFrame = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var currentExtraStackFrame = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function setExtraStackFrame(stack) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    currentExtraStackFrame = stack;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      currentExtraStackFrame = stack;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }; // Stack implementation injected by the current renderer.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  ReactDebugCurrentFrame.getCurrentStack = null;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  ReactDebugCurrentFrame.getStackAddendum = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var stack = ''; // Add an extra top frame while an element is being validated")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (currentExtraStackFrame) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      stack += currentExtraStackFrame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } // Delegate to the injected renderer-specific implementation")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var impl = ReactDebugCurrentFrame.getCurrentStack;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (impl) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      stack += impl() || '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    return stack;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Used by act() to track whether you're inside an act() scope.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"var IsSomeRendererActing = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  current: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ReactSharedInternals = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ReactCurrentDispatcher: ReactCurrentDispatcher,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ReactCurrentBatchConfig: ReactCurrentBatchConfig,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ReactCurrentOwner: ReactCurrentOwner,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  IsSomeRendererActing: IsSomeRendererActing,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Used by renderers to avoid bundling object-assign twice in UMD bundles:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  assign: _assign")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// by calls to these methods by a Babel plugin.")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")]),s(`
`),n("span",{class:"line"},[n("span",null,"// In PROD (or in packages without access to React internals),")]),s(`
`),n("span",{class:"line"},[n("span",null,"// they are left as they are instead.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function warn(format) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      args[_key - 1] = arguments[_key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    printWarning('warn', format, args);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function error(format) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      args[_key2 - 1] = arguments[_key2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    printWarning('error', format, args);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function printWarning(level, format, args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // When changing this logic, you might want to also")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // update consoleWithStackDev.www.js as well.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var stack = ReactDebugCurrentFrame.getStackAddendum();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (stack !== '') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      format += '%s';")]),s(`
`),n("span",{class:"line"},[n("span",null,"      args = args.concat([stack]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var argsWithFormat = args.map(function (item) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return '' + item;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }); // Careful: RN currently depends on this prefix")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // breaks IE9: [https://github.com/facebook/react/issues/13610](https://github.com/facebook/react/issues/13610)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // eslint-disable-next-line react-internal/no-production-logging")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Function.prototype.apply.call(console[level], console, argsWithFormat);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var didWarnStateUpdateForUnmountedComponent = {};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function warnNoop(publicInstance, callerName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var _constructor = publicInstance.constructor;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';")]),s(`
`),n("span",{class:"line"},[n("span",null,'    var warningKey = componentName + "." + callerName;')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    error(\"Can't call %s on a component that is not yet mounted. \" + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    didWarnStateUpdateForUnmountedComponent[warningKey] = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * This is the abstract API for an update queue.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ReactNoopUpdateQueue = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * Checks whether or not this composite component is mounted.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {ReactClass} publicInstance The instance we want to test.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @return {boolean} True if mounted, false otherwise.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @protected")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @final")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  isMounted: function (publicInstance) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * Forces an update. This should only be invoked when it is known with")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * certainty that we are **not** in a DOM transaction.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * You may want to call this when you know that some deeper aspect of the")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * component's state has changed but `setState` was not called.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * This will not invoke `shouldComponentUpdate`, but it will invoke")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * `componentWillUpdate` and `componentDidUpdate`.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {ReactClass} publicInstance The instance that should rerender.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?function} callback Called after component is updated.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?string} callerName name of the calling function in the public API.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  enqueueForceUpdate: function (publicInstance, callback, callerName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    warnNoop(publicInstance, 'forceUpdate');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * Replaces all of the state. Always use this or `setState` to mutate state.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * You should treat `this.state` as immutable.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * There is no guarantee that `this.state` will be immediately updated, so")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * accessing `this.state` after calling this method may return the old value.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {ReactClass} publicInstance The instance that should rerender.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {object} completeState Next state.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?function} callback Called after component is updated.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?string} callerName name of the calling function in the public API.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    warnNoop(publicInstance, 'replaceState');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * Sets a subset of the state. This only exists because _pendingState is")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * internal. This provides a merging strategy that is not available to deep")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * properties which is confusing. TODO: Expose pendingState or don't use it")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * during the merge.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   *")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {ReactClass} publicInstance The instance that should rerender.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {object} partialState Next partial state to be merged with state.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?function} callback Called after component is updated.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @param {?string} Name of the calling function in the public API.")]),s(`
`),n("span",{class:"line"},[n("span",null,"   * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null,"   */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  enqueueSetState: function (publicInstance, partialState, callback, callerName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    warnNoop(publicInstance, 'setState');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var emptyObject = {};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Object.freeze(emptyObject);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Base class helpers for the updating state of a component.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Component(props, context, updater) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.props = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.context = context; // If a component has string refs, we will assign a different object later.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // renderer.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  this.updater = updater || ReactNoopUpdateQueue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Component.prototype.isReactComponent = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Sets a subset of the state. Always use this to mutate")]),s(`
`),n("span",{class:"line"},[n("span",null," * state. You should treat `this.state` as immutable.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * There is no guarantee that `this.state` will be immediately updated, so")]),s(`
`),n("span",{class:"line"},[n("span",null," * accessing `this.state` after calling this method may return the old value.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * There is no guarantee that calls to `setState` will run synchronously,")]),s(`
`),n("span",{class:"line"},[n("span",null," * as they may eventually be batched together.  You can provide an optional")]),s(`
`),n("span",{class:"line"},[n("span",null," * callback that will be executed when the call to setState is actually")]),s(`
`),n("span",{class:"line"},[n("span",null," * completed.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * When a function is provided to setState, it will be called at some point in")]),s(`
`),n("span",{class:"line"},[n("span",null," * the future (not synchronously). It will be called with the up to date")]),s(`
`),n("span",{class:"line"},[n("span",null," * component arguments (state, props, context). These values can be different")]),s(`
`),n("span",{class:"line"},[n("span",null," * from this.* because your function may be called after receiveProps but before")]),s(`
`),n("span",{class:"line"},[n("span",null," * shouldComponentUpdate, and this new state, props, and context will not yet be")]),s(`
`),n("span",{class:"line"},[n("span",null," * assigned to this.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {object|function} partialState Next partial state or function to")]),s(`
`),n("span",{class:"line"},[n("span",null," *        produce next partial state to be merged with current state.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?function} callback Called after state is updated.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @final")]),s(`
`),n("span",{class:"line"},[n("span",null," * @protected")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Component.prototype.setState = function (partialState, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  this.updater.enqueueSetState(this, partialState, callback, 'setState');")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Forces an update. This should only be invoked when it is known with")]),s(`
`),n("span",{class:"line"},[n("span",null," * certainty that we are **not** in a DOM transaction.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * You may want to call this when you know that some deeper aspect of the")]),s(`
`),n("span",{class:"line"},[n("span",null," * component's state has changed but `setState` was not called.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * This will not invoke `shouldComponentUpdate`, but it will invoke")]),s(`
`),n("span",{class:"line"},[n("span",null," * `componentWillUpdate` and `componentDidUpdate`.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?function} callback Called after update is complete.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @final")]),s(`
`),n("span",{class:"line"},[n("span",null," * @protected")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Component.prototype.forceUpdate = function (callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Deprecated APIs. These APIs used to exist on classic React classes but since")]),s(`
`),n("span",{class:"line"},[n("span",null," * we would like to deprecate them, we're not going to move them over to this")]),s(`
`),n("span",{class:"line"},[n("span",null," * modern base class. Instead, we define a getter that warns if it's accessed.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var deprecatedAPIs = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + '[https://github.com/facebook/react/issues/3236).](https://github.com/facebook/react/issues/3236\\).)']")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var defineDeprecationWarning = function (methodName, info) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Object.defineProperty(Component.prototype, methodName, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        return undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  for (var fnName in deprecatedAPIs) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (deprecatedAPIs.hasOwnProperty(fnName)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function ComponentDummy() {}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ComponentDummy.prototype = Component.prototype;")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Convenience component with default shallow equality check for sCU.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function PureComponent(props, context, updater) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.props = props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.context = context; // If a component has string refs, we will assign a different object later.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  this.refs = emptyObject;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.updater = updater || ReactNoopUpdateQueue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();")]),s(`
`),n("span",{class:"line"},[n("span",null,"pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"_assign(pureComponentPrototype, Component.prototype);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"pureComponentPrototype.isPureReactComponent = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// an immutable object with a single mutable value")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createRef() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var refObject = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    current: null")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Object.seal(refObject);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return refObject;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getWrappedName(outerType, innerType, wrapperName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var functionName = innerType.displayName || innerType.name || '';")]),s(`
`),n("span",{class:"line"},[n("span",null,`  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);`)]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getContextName(type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return type.displayName || 'Context';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getComponentName(type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (type == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Host root, text node or just invalid type.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof type.tag === 'number') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return type.displayName || type.name || null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'string') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  switch (type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    case exports.Fragment:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'Fragment';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case REACT_PORTAL_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'Portal';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case exports.Profiler:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'Profiler';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case exports.StrictMode:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'StrictMode';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case exports.Suspense:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'Suspense';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case REACT_SUSPENSE_LIST_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return 'SuspenseList';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    switch (type.$$typeof) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      case REACT_CONTEXT_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var context = type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return getContextName(context) + '.Consumer';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_PROVIDER_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var provider = type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return getContextName(provider._context) + '.Provider';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_FORWARD_REF_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return getWrappedName(type, type.render, 'ForwardRef');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_MEMO_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return getComponentName(type.type);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_BLOCK_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return getComponentName(type._render);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_LAZY_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var lazyComponent = type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var payload = lazyComponent._payload;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var init = lazyComponent._init;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return getComponentName(init(payload));")]),s(`
`),n("span",{class:"line"},[n("span",null,"          } catch (x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var hasOwnProperty = Object.prototype.hasOwnProperty;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var RESERVED_PROPS = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  key: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ref: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  __self: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  __source: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  didWarnAboutStringRefs = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function hasValidRef(config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (hasOwnProperty.call(config, 'ref')) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (getter && getter.isReactWarning) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return config.ref !== undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function hasValidKey(config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (hasOwnProperty.call(config, 'key')) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (getter && getter.isReactWarning) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return config.key !== undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function defineKeyPropWarningGetter(props, displayName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var warnAboutAccessingKey = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (!specialPropKeyWarningShown) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        specialPropKeyWarningShown = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. ([https://reactjs.org/link/special-props)'](https://reactjs.org/link/special-props\\)'), displayName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  warnAboutAccessingKey.isReactWarning = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Object.defineProperty(props, 'key', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get: warnAboutAccessingKey,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    configurable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function defineRefPropWarningGetter(props, displayName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var warnAboutAccessingRef = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (!specialPropRefWarningShown) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        specialPropRefWarningShown = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. ([https://reactjs.org/link/special-props)'](https://reactjs.org/link/special-props\\)'), displayName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  warnAboutAccessingRef.isReactWarning = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Object.defineProperty(props, 'ref', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get: warnAboutAccessingRef,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    configurable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function warnIfStringRefCannotBeAutoConverted(config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var componentName = getComponentName(ReactCurrentOwner.current.type);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (!didWarnAboutStringRefs[componentName]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,`        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + '[https://reactjs.org/link/strict-mode-string-ref](https://reactjs.org/link/strict-mode-string-ref)', componentName, config.ref);`)])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        didWarnAboutStringRefs[componentName] = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Factory method to create a new React element. This no longer adheres to")]),s(`
`),n("span",{class:"line"},[n("span",null," * the class pattern, so do not use new to call it. Also, instanceof check")]),s(`
`),n("span",{class:"line"},[n("span",null," * will not work. Instead test $$typeof field against Symbol.for('react.element') to check")]),s(`
`),n("span",{class:"line"},[n("span",null," * if something is a React Element.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} type")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} props")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} key")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {string|object} ref")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} owner")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} self A *temporary* helper to detect places where `this` is")]),s(`
`),n("span",{class:"line"},[n("span",null," * different from the `owner` when React.createElement is called, so that we")]),s(`
`),n("span",{class:"line"},[n("span",null," * can warn. We want to get rid of owner and replace string `ref`s with arrow")]),s(`
`),n("span",{class:"line"},[n("span",null," * functions, and as long as `this` and owner are the same, there will be no")]),s(`
`),n("span",{class:"line"},[n("span",null," * change in behavior.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} source An annotation object (added by a transpiler or otherwise)")]),s(`
`),n("span",{class:"line"},[n("span",null," * indicating filename, line number, and/or other information.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ReactElement = function (type, key, ref, self, source, owner, props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var element = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This tag allows us to uniquely identify this as a React Element")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_ELEMENT_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Built-in properties that belong on the element")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: type,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key: key,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ref: ref,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Record the component responsible for creating this element.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _owner: owner")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // The validation flag is currently mutative. We put it on")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // an external backing store so that we can freeze the whole object.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This can be replaced with a WeakMap once they are implemented in")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // commonly used development environments.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // the validation flag non-enumerable (where possible, which should")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // include every environment we run tests in), so the test framework")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // ignores it.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperty(element._store, 'validated', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      configurable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      writable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      value: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }); // self and source are DEV only properties.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperty(element, '_self', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      configurable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      writable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      value: self")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }); // Two elements created in two different places should be considered")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // equal for testing purposes and therefore we hide it from enumeration.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperty(element, '_source', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      configurable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      writable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      value: source")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (Object.freeze) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Object.freeze(element.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Object.freeze(element);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return element;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Create and return a new ReactElement of the given type.")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#createelement](https://reactjs.org/docs/react-api.html#createelement)")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var propName; // Reserved names are extracted")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var props = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var key = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var ref = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var self = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var source = null;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (config != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (hasValidRef(config)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ref = config.ref;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        warnIfStringRefCannotBeAutoConverted(config);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (hasValidKey(config)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      key = '' + config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    self = config.__self === undefined ? null : config.__self;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (propName in config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        props[propName] = config[propName];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Children can be more than one argument, and those are transferred onto")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // the newly allocated props object.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var childrenLength = arguments.length - 2;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (childrenLength === 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (childrenLength > 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var childArray = Array(childrenLength);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < childrenLength; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      childArray[i] = arguments[i + 2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (Object.freeze) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object.freeze(childArray);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    props.children = childArray;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Resolve default props")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type && type.defaultProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var defaultProps = type.defaultProps;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (propName in defaultProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (props[propName] === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        props[propName] = defaultProps[propName];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (key || ref) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        defineKeyPropWarningGetter(props, displayName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (ref) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        defineRefPropWarningGetter(props, displayName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function cloneAndReplaceKey(oldElement, newKey) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return newElement;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Clone and return a new ReactElement using element as the starting point.")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#cloneelement](https://reactjs.org/docs/react-api.html#cloneelement)")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function cloneElement(element, config, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!!(element === null || element === undefined)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var propName; // Original props are copied")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var props = _assign({}, element.props); // Reserved names are extracted")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var key = element.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var ref = element.ref; // Self is preserved since the owner is preserved.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // transpiler, and the original source is probably a better indicator of the")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // true owner.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var source = element._source; // Owner will be preserved, unless ref is overridden")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var owner = element._owner;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (config != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (hasValidRef(config)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Silently steal the ref from the parent.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ref = config.ref;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      owner = ReactCurrentOwner.current;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (hasValidKey(config)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      key = '' + config.key;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } // Remaining properties override existing props")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var defaultProps;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (element.type && element.type.defaultProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      defaultProps = element.type.defaultProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (propName in config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (config[propName] === undefined && defaultProps !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // Resolve default props")]),s(`
`),n("span",{class:"line"},[n("span",null,"          props[propName] = defaultProps[propName];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          props[propName] = config[propName];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Children can be more than one argument, and those are transferred onto")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // the newly allocated props object.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var childrenLength = arguments.length - 2;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (childrenLength === 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props.children = children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (childrenLength > 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var childArray = Array(childrenLength);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < childrenLength; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      childArray[i] = arguments[i + 2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    props.children = childArray;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return ReactElement(element.type, key, ref, self, source, owner, props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Verifies the object is a ReactElement.")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#isvalidelement](https://reactjs.org/docs/react-api.html#isvalidelement)")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?object} object")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {boolean} True if `object` is a ReactElement.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @final")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function isValidElement(object) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var SEPARATOR = '.';")]),s(`
`),n("span",{class:"line"},[n("span",null,"var SUBSEPARATOR = ':';")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Escape and wrap key so it is safe to use as a reactid")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {string} key to be escaped.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {string} the escaped key.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function escape(key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var escapeRegex = /[=:]/g;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var escaperLookup = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    '=': '=0',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ':': '=2'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var escapedString = key.replace(escapeRegex, function (match) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return escaperLookup[match];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return '$' + escapedString;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * TODO: Test that a single child and an array with one item have the same key")]),s(`
`),n("span",{class:"line"},[n("span",null," * pattern.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var didWarnAboutMaps = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var userProvidedKeyEscapeRegex = /\\/+/g;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function escapeUserProvidedKey(text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return text.replace(userProvidedKeyEscapeRegex, '$&/');")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Generate a key string that identifies a element within a set.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} element A element that could contain a manual key.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {number} index Index that is used if a manual key is not provided.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {string}")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getElementKey(element, index) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Do some typechecking here since we call this blindly. We want to ensure")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // that we don't block potential future ES APIs.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof element === 'object' && element !== null && element.key != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Explicit key")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return escape('' + element.key);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Implicit key determined by the index in the set")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return index.toString(36);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var type = typeof children;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type === 'undefined' || type === 'boolean') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // All of the above are perceived as null.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    children = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var invokeCallback = false;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (children === null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    invokeCallback = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    switch (type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      case 'string':")]),s(`
`),n("span",{class:"line"},[n("span",null,"      case 'number':")]),s(`
`),n("span",{class:"line"},[n("span",null,"        invokeCallback = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        break;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case 'object':")]),s(`
`),n("span",{class:"line"},[n("span",null,"        switch (children.$$typeof) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          case REACT_ELEMENT_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"          case REACT_PORTAL_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"            invokeCallback = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (invokeCallback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var _child = children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // so that it's consistent if the number of children grows:")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (Array.isArray(mappedChild)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var escapedChildKey = '';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (childKey != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        escapedChildKey = escapeUserProvidedKey(childKey) + '/';")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return c;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (mappedChild != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (isValidElement(mappedChild)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // traverseAllChildren used to do for objects as children")]),s(`
`),n("span",{class:"line"},[n("span",null,"        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key")]),s(`
`),n("span",{class:"line"},[n("span",null,"        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number")]),s(`
`),n("span",{class:"line"},[n("span",null,"        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      array.push(mappedChild);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    return 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var child;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var nextName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var subtreeCount = 0; // Count of children found in the current subtree.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (Array.isArray(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < children.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      child = children[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"      nextName = nextNamePrefix + getElementKey(child, i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var iteratorFn = getIteratorFn(children);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (typeof iteratorFn === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var iterableChildren = children;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Warn about using Maps as children")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (iteratorFn === iterableChildren.entries) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (!didWarnAboutMaps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          didWarnAboutMaps = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      var iterator = iteratorFn.call(iterableChildren);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var step;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var ii = 0;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      while (!(step = iterator.next()).done) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        child = step.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        nextName = nextNamePrefix + getElementKey(child, ii++);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type === 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var childrenString = '' + children;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,`          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead." );`)]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return subtreeCount;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Maps children that are typically specified as `props.children`.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#reactchildrenmap](https://reactjs.org/docs/react-api.html#reactchildrenmap)")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * The provided mapFunction(child, index) will be called for each")]),s(`
`),n("span",{class:"line"},[n("span",null," * leaf child.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?*} children Children tree container.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {function(*, int)} func The map function.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} context Context for mapFunction.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {object} Object containing the ordered map of results.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function mapChildren(children, func, context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (children == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var result = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var count = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mapIntoArray(children, result, '', '', function (child) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return func.call(context, child, count++);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Count the number of children that are typically specified as")]),s(`
`),n("span",{class:"line"},[n("span",null," * `props.children`.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#reactchildrencount](https://reactjs.org/docs/react-api.html#reactchildrencount)")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?*} children Children tree container.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {number} The number of children.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function countChildren(children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var n = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mapChildren(children, function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    n++; // Don't return anything")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return n;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Iterates through children that are typically specified as `props.children`.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#reactchildrenforeach](https://reactjs.org/docs/react-api.html#reactchildrenforeach)")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * The provided forEachFunc(child, index) will be called for each")]),s(`
`),n("span",{class:"line"},[n("span",null," * leaf child.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?*} children Children tree container.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {function(*, int)} forEachFunc")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} forEachContext Context for forEachContext.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function forEachChildren(children, forEachFunc, forEachContext) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mapChildren(children, function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    forEachFunc.apply(this, arguments); // Don't return anything.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }, forEachContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Flatten a children object (typically specified as `props.children`) and")]),s(`
`),n("span",{class:"line"},[n("span",null," * return an array with appropriately re-keyed children.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#reactchildrentoarray](https://reactjs.org/docs/react-api.html#reactchildrentoarray)")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function toArray(children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return mapChildren(children, function (child) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return child;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }) || [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Returns the first child in a collection of children and verifies that there")]),s(`
`),n("span",{class:"line"},[n("span",null," * is only one child in the collection.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * See [https://reactjs.org/docs/react-api.html#reactchildrenonly](https://reactjs.org/docs/react-api.html#reactchildrenonly)")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * The current implementation of this function assumes that a single child gets")]),s(`
`),n("span",{class:"line"},[n("span",null," * passed without a wrapper, but the purpose of this helper function is to")]),s(`
`),n("span",{class:"line"},[n("span",null," * abstract away the particular structure of children.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {?object} children Child collection structure.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @return {ReactElement} The first and only `ReactElement` contained in the")]),s(`
`),n("span",{class:"line"},[n("span",null," * structure.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function onlyChild(children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!isValidElement(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      throw Error( "React.Children.only expected to receive a single React element child." );')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createContext(defaultValue, calculateChangedBits) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (calculateChangedBits === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    calculateChangedBits = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var context = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_CONTEXT_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _calculateChangedBits: calculateChangedBits,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // As a workaround to support multiple concurrent renderers, we categorize")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // some renderers as primary and others as secondary. We only expect")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // there to be two concurrent renderers at most: React Native (primary) and")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Fabric (secondary); React DOM (primary) and React ART (secondary).")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Secondary renderers store their context values on separate fields.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _currentValue: defaultValue,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _currentValue2: defaultValue,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Used to track how many concurrent renderers this context currently")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // supports within in a single renderer. Such as parallel server rendering.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _threadCount: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // These are circular")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Provider: null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Consumer: null")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  context.Provider = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_PROVIDER_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _context: context")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var hasWarnedAboutUsingNestedContextConsumers = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var hasWarnedAboutUsingConsumerProvider = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var hasWarnedAboutDisplayNameOnConsumer = false;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // A separate object, but proxies back to the original context object for")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // backwards compatibility. It has a different $$typeof, so we can properly")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // warn for the incorrect usage of Context as a Consumer.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var Consumer = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      $$typeof: REACT_CONTEXT_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _context: context,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _calculateChangedBits: context._calculateChangedBits")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperties(Consumer, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Provider: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (!hasWarnedAboutUsingConsumerProvider) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            hasWarnedAboutUsingConsumerProvider = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          return context.Provider;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (_Provider) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          context.Provider = _Provider;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _currentValue: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return context._currentValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (_currentValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          context._currentValue = _currentValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _currentValue2: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return context._currentValue2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (_currentValue2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          context._currentValue2 = _currentValue2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      _threadCount: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return context._threadCount;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (_threadCount) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          context._threadCount = _threadCount;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Consumer: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (!hasWarnedAboutUsingNestedContextConsumers) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            hasWarnedAboutUsingNestedContextConsumers = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          return context.Consumer;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      displayName: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return context.displayName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (displayName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (!hasWarnedAboutDisplayNameOnConsumer) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            warn('Setting `displayName` on Context.Consumer has no effect. ' + \"You should set it directly on the context with Context.displayName = '%s'.\", displayName);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"            hasWarnedAboutDisplayNameOnConsumer = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    context.Consumer = Consumer;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    context._currentRenderer = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    context._currentRenderer2 = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return context;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var Uninitialized = -1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var Pending = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var Resolved = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var Rejected = 2;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function lazyInitializer(payload) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (payload._status === Uninitialized) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var ctor = payload._result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var thenable = ctor(); // Transition to the next state.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var pending = payload;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pending._status = Pending;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    pending._result = thenable;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    thenable.then(function (moduleObject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (payload._status === Pending) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var defaultExport = moduleObject.default;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (defaultExport === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\\n\\nYour code should look like: \\n  ' + // Break up imports to avoid accidentally parsing them as dependencies.")]),s(`
`),n("span",{class:"line"},[n("span",null,`            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);`)]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } // Transition to the next state.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        var resolved = payload;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        resolved._status = Resolved;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        resolved._result = defaultExport;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, function (error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (payload._status === Pending) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Transition to the next state.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var rejected = payload;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        rejected._status = Rejected;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        rejected._result = error;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (payload._status === Resolved) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return payload._result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    throw payload._result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function lazy(ctor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var payload = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // We use these fields to store the result.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _status: -1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _result: ctor")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var lazyType = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_LAZY_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _payload: payload,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _init: lazyInitializer")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // In production, this would just set it on the object.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var defaultProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var propTypes; // $FlowFixMe")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperties(lazyType, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      defaultProps: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return defaultProps;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (newDefaultProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          defaultProps = newDefaultProps; // Match production behavior more closely:")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // $FlowFixMe")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          Object.defineProperty(lazyType, 'defaultProps', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            enumerable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"          });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      propTypes: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return propTypes;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (newPropTypes) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          propTypes = newPropTypes; // Match production behavior more closely:")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // $FlowFixMe")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          Object.defineProperty(lazyType, 'propTypes', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            enumerable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"          });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return lazyType;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function forwardRef(render) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (typeof render !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (render.length !== 0 && render.length !== 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (render != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (render.defaultProps != null || render.propTypes != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var elementType = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_FORWARD_REF_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render: render")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var ownName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Object.defineProperty(elementType, 'displayName', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return ownName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      set: function (name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ownName = name;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (render.displayName == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          render.displayName = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return elementType;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var enableScopeAPI = false; // Experimental Create Event Handle API.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function isValidElementType(type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof type === 'string' || typeof type === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'object' && type !== null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function memo(type, compare) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!isValidElementType(type)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var elementType = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    $$typeof: REACT_MEMO_TYPE,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: type,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    compare: compare === undefined ? null : compare")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var ownName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Object.defineProperty(elementType, 'displayName', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return ownName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      set: function (name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ownName = name;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (type.displayName == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          type.displayName = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return elementType;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function resolveDispatcher() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = ReactCurrentDispatcher.current;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (!(dispatcher !== null)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\\n1. You might have mismatching versions of React and the renderer (such as React DOM)\\n2. You might be breaking the Rules of Hooks\\n3. You might have more than one copy of React in the same app\\nSee [https://reactjs.org/link/invalid-hook-call](https://reactjs.org/link/invalid-hook-call) for tips about how to debug and fix this problem." );')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return dispatcher;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function useContext(Context, unstable_observedBits) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (unstable_observedBits !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\\n\\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at [https://reactjs.org/link/rules-of-hooks'](https://reactjs.org/link/rules-of-hooks') : '');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } // TODO: add a more generic warning for invalid values.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (Context._context !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // and nobody should be using this in existing code.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (realContext.Consumer === Context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else if (realContext.Provider === Context) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return dispatcher.useContext(Context, unstable_observedBits);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useState(initialState) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useState(initialState);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useReducer(reducer, initialArg, init) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useReducer(reducer, initialArg, init);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useRef(initialValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useRef(initialValue);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useEffect(create, deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useEffect(create, deps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useLayoutEffect(create, deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useLayoutEffect(create, deps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useCallback(callback, deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useCallback(callback, deps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useMemo(create, deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useMemo(create, deps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useImperativeHandle(ref, create, deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return dispatcher.useImperativeHandle(ref, create, deps);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function useDebugValue(value, formatterFn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var dispatcher = resolveDispatcher();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return dispatcher.useDebugValue(value, formatterFn);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// Helpers to patch console.logs to avoid logging during side-effect free")]),s(`
`),n("span",{class:"line"},[n("span",null,"// replaying on render function. This currently only patches the object")]),s(`
`),n("span",{class:"line"},[n("span",null,"// lazily which won't cover if the log function was extracted eagerly.")]),s(`
`),n("span",{class:"line"},[n("span",null,"// We could also eagerly patch the method.")]),s(`
`),n("span",{class:"line"},[n("span",null,"var disabledDepth = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevLog;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevInfo;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevWarn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevError;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevGroup;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevGroupCollapsed;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prevGroupEnd;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function disabledLog() {}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"disabledLog.__reactDisabledLog = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function disableLogs() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (disabledDepth === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      /* eslint-disable react-internal/no-production-logging */")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevLog = console.log;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevInfo = console.info;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevWarn = console.warn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevError = console.error;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevGroup = console.group;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevGroupCollapsed = console.groupCollapsed;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      prevGroupEnd = console.groupEnd; // [https://github.com/facebook/react/issues/19099](https://github.com/facebook/react/issues/19099)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      var props = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        enumerable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value: disabledLog,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        writable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }; // $FlowFixMe Flow thinks console is immutable.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      Object.defineProperties(console, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        info: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        log: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        warn: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        group: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        groupCollapsed: props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        groupEnd: props")]),s(`
`),n("span",{class:"line"},[n("span",null,"      });")]),s(`
`),n("span",{class:"line"},[n("span",null,"      /* eslint-enable react-internal/no-production-logging */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    disabledDepth++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function reenableLogs() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    disabledDepth--;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (disabledDepth === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      /* eslint-disable react-internal/no-production-logging */")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var props = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        configurable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        enumerable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        writable: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }; // $FlowFixMe Flow thinks console is immutable.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      Object.defineProperties(console, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        log: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevLog")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        info: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevInfo")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        warn: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevWarn")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        error: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevError")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        group: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevGroup")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        groupCollapsed: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevGroupCollapsed")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        groupEnd: _assign({}, props, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: prevGroupEnd")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"      });")]),s(`
`),n("span",{class:"line"},[n("span",null,"      /* eslint-enable react-internal/no-production-logging */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (disabledDepth < 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var prefix;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function describeBuiltInComponentFrame(name, source, ownerFn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (prefix === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Extract the VM specific prefix used by each line.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw Error();")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } catch (x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var match = x.stack.trim().match(/\\n( *(at )?)/);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        prefix = match && match[1] || '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } // We use the prefix to ensure our stacks line up with native stack frames.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    return '\\n' + prefix + name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var reentry = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var componentFrameCache;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentFrameCache = new PossiblyWeakMap();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function describeNativeComponentFrame(fn, construct) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // If something asked for a stack inside a fake render, it should get ignored.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!fn || reentry) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var frame = componentFrameCache.get(fn);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (frame !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return frame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var control;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  reentry = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  Error.prepareStackTrace = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var previousDispatcher;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // for warnings.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    ReactCurrentDispatcher$1.current = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    disableLogs();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This should throw.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (construct) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Something should be setting the props in the constructor.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var Fake = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw Error();")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }; // $FlowFixMe")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      Object.defineProperty(Fake.prototype, 'props', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // We use a throwing setter instead of frozen or non-writable props")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // because that won't throw in a non-strict mode function.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          throw Error();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      });")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (typeof Reflect === 'object' && Reflect.construct) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // We construct a different control for this case to include any extra")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // frames added by the construct call.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          Reflect.construct(Fake, []);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } catch (x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          control = x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        Reflect.construct(fn, [], Fake);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          Fake.call();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } catch (x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          control = x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        fn.call(Fake.prototype);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw Error();")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } catch (x) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        control = x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } catch (sample) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This is inlined manually because closure doesn't do it for us.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (sample && control && typeof sample.stack === 'string') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // This extracts the first frame from the sample that isn't also in the control.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Skipping one frame that we assume is the frame that calls the two.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var sampleLines = sample.stack.split('\\n');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var controlLines = control.stack.split('\\n');")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var s = sampleLines.length - 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var c = controlLines.length - 1;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // We expect at least one stack frame to be shared.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Typically this will be the root most one. However, stack frames may be")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // cut off due to maximum stack limits. In this case, one maybe cut off")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // earlier than the other. We assume that the sample is longer or the same")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // and there for cut off earlier. So we should find the root most frame in")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // the sample somewhere in the control.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        c--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      for (; s >= 1 && c >= 0; s--, c--) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Next we find the first one that isn't the same which should be the")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // frame that called our sample function and the control.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (sampleLines[s] !== controlLines[c]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // In V8, the first line is describing the message but other VMs don't.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // If we're about to return the first line, and the control is also on the same")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // line, that's a pretty good indicator that our sample threw at same line as")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // the control. I.e. before we entered the sample frame. So we ignore this result.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // This can happen if you passed a class to function component, or non-function.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (s !== 1 || c !== 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            do {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              s--;")]),s(`
`),n("span",{class:"line"},[n("span",null,"              c--; // We may still have similar intermediate frames from the construct call.")]),s(`
`),n("span",{class:"line"},[n("span",null,"              // The next one that isn't the same should be our match though.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"              if (c < 0 || sampleLines[s] !== controlLines[c]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,`                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.`)]),s(`
`),n("span",{class:"line"},[n("span",null,"                var _frame = '\\n' + sampleLines[s].replace(' at new ', ' at ');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  if (typeof fn === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    componentFrameCache.set(fn, _frame);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                } // Return the line we found.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"                return _frame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"              }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            } while (s >= 1 && c >= 0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    reentry = false;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ReactCurrentDispatcher$1.current = previousDispatcher;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      reenableLogs();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Error.prepareStackTrace = previousPrepareStackTrace;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Fallback to just using the name if we couldn't make it throw.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var name = fn ? fn.displayName || fn.name : '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof fn === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      componentFrameCache.set(fn, syntheticFrame);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return syntheticFrame;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function describeFunctionComponentFrame(fn, source, ownerFn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return describeNativeComponentFrame(fn, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function shouldConstruct(Component) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var prototype = Component.prototype;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return !!(prototype && prototype.isReactComponent);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return describeNativeComponentFrame(type, shouldConstruct(type));")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'string') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return describeBuiltInComponentFrame(type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  switch (type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    case exports.Suspense:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return describeBuiltInComponentFrame('Suspense');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    case REACT_SUSPENSE_LIST_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return describeBuiltInComponentFrame('SuspenseList');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (typeof type === 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    switch (type.$$typeof) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      case REACT_FORWARD_REF_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return describeFunctionComponentFrame(type.render);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_MEMO_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Memo may contain any component type so we recursively resolve it.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_BLOCK_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return describeFunctionComponentFrame(type._render);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      case REACT_LAZY_TYPE:")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var lazyComponent = type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var payload = lazyComponent._payload;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          var init = lazyComponent._init;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // Lazy may contain any component type so we recursively resolve it.")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          } catch (x) {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var loggedTypeFailures = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function setCurrentlyValidatingElement(element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var owner = element._owner;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ReactDebugCurrentFrame$1.setExtraStackFrame(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function checkPropTypes(typeSpecs, values, location, componentName, element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // $FlowFixMe This is okay but Flow doesn't know it.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var has = Function.call.bind(Object.prototype.hasOwnProperty);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (var typeSpecName in typeSpecs) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (has(typeSpecs, typeSpecName)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // fail the render phase where it didn't fail before. So we log it.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // After these have been cleaned up, we'll let them throw.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // This is intentionally an invariant that gets caught. It's the same")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // behavior as without this statement except with a better message.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (typeof typeSpecs[typeSpecName] !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"            err.name = 'Invariant Violation';")]),s(`
`),n("span",{class:"line"},[n("span",null,"            throw err;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } catch (ex) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          error$1 = ex;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (error$1 && !(error$1 instanceof Error)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          setCurrentlyValidatingElement(element);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          setCurrentlyValidatingElement(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // Only monitor this failure once because there tends to be a lot of the")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // same error.")]),s(`
`),n("span",{class:"line"},[n("span",null,"          loggedTypeFailures[error$1.message] = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"          setCurrentlyValidatingElement(element);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          error('Failed %s type: %s', location, error$1.message);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          setCurrentlyValidatingElement(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function setCurrentlyValidatingElement$1(element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var owner = element._owner;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setExtraStackFrame(stack);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setExtraStackFrame(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var propTypesMisspellWarningShown;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"  propTypesMisspellWarningShown = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getDeclarationErrorAddendum() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (ReactCurrentOwner.current) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var name = getComponentName(ReactCurrentOwner.current.type);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return '\\n\\nCheck the render method of `' + name + '`.';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getSourceInfoErrorAddendum(source) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (source !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var fileName = source.fileName.replace(/^.*[\\\\\\/]/, '');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var lineNumber = source.lineNumber;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return '\\n\\nCheck your code at ' + fileName + ':' + lineNumber + '.';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getSourceInfoErrorAddendumForProps(elementProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (elementProps !== null && elementProps !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return getSourceInfoErrorAddendum(elementProps.__source);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Warn if there's no key explicitly set on dynamic arrays of children or")]),s(`
`),n("span",{class:"line"},[n("span",null," * object keys are not valid. This allows us to keep track of children between")]),s(`
`),n("span",{class:"line"},[n("span",null," * updates.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var ownerHasKeyUseWarning = {};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function getCurrentComponentErrorInfo(parentType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var info = getDeclarationErrorAddendum();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (!info) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (parentName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      info = "\\n\\nCheck the top-level render call using <" + parentName + ">.";')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return info;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Warn if the element doesn't have an explicit key assigned to it.")]),s(`
`),n("span",{class:"line"},[n("span",null," * This element is in an array. The array could grow and shrink or be")]),s(`
`),n("span",{class:"line"},[n("span",null," * reordered. All children that haven't already been validated are required to")]),s(`
`),n("span",{class:"line"},[n("span",null,' * have a "key" property assigned to it. Error statuses are cached so a warning')]),s(`
`),n("span",{class:"line"},[n("span",null," * will only be shown once.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {ReactElement} element Element that requires a key.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentType element's parent's type.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function validateExplicitKey(element, parentType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!element._store || element._store.validated || element.key != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  element._store.validated = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // property, it may be the creator of the child that's responsible for")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // assigning it a key.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var childOwner = '';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Give the component that originally created this child.")]),s(`
`),n("span",{class:"line"},[n("span",null,'    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";')]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setCurrentlyValidatingElement$1(element);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,`    error('Each child in a list should have a unique "key" prop.' + '%s%s See [https://reactjs.org/link/warning-keys](https://reactjs.org/link/warning-keys) for more information.', currentComponentErrorInfo, childOwner);`)])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    setCurrentlyValidatingElement$1(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Ensure that every element either is passed in a static location, in an")]),s(`
`),n("span",{class:"line"},[n("span",null," * array with an explicit keys property defined, or in an object literal")]),s(`
`),n("span",{class:"line"},[n("span",null," * with valid key property.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @internal")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {ReactNode} node Statically passed child of any type.")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {*} parentType node's parent's type.")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function validateChildKeys(node, parentType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof node !== 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (Array.isArray(node)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < node.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var child = node[i];")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (isValidElement(child)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        validateExplicitKey(child, parentType);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (isValidElement(node)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This element was passed in a valid location.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (node._store) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      node._store.validated = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var iteratorFn = getIteratorFn(node);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (typeof iteratorFn === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Entry iterators used to provide implicit keys,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // but now we print a separate warning for them later.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (iteratorFn !== node.entries) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var iterator = iteratorFn.call(node);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var step;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        while (!(step = iterator.next()).done) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          if (isValidElement(step.value)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            validateExplicitKey(step.value, parentType);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Given an element, validate that its props follow the propTypes definition,")]),s(`
`),n("span",{class:"line"},[n("span",null," * provided by the type.")]),s(`
`),n("span",{class:"line"},[n("span",null," *")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {ReactElement} element")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function validatePropTypes(element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var type = element.type;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (type === null || type === undefined || typeof type === 'string') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var propTypes;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (typeof type === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      propTypes = type.propTypes;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Inner props are checked in the reconciler.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type.$$typeof === REACT_MEMO_TYPE)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      propTypes = type.propTypes;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (propTypes) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Intentionally inside to avoid triggering lazy initializers:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var name = getComponentName(type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      checkPropTypes(propTypes, element.props, 'prop', name, element);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      var _name = getComponentName(type);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null," * Given a fragment, validate that it can only be provided with fragment props")]),s(`
`),n("span",{class:"line"},[n("span",null," * @param {ReactElement} fragment")]),s(`
`),n("span",{class:"line"},[n("span",null," */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function validateFragmentProps(fragment) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var keys = Object.keys(fragment.props);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < keys.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      var key = keys[i];")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      if (key !== 'children' && key !== 'key') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        setCurrentlyValidatingElement$1(fragment);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        setCurrentlyValidatingElement$1(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (fragment.ref !== null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setCurrentlyValidatingElement$1(fragment);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      error('Invalid attribute `ref` supplied to `React.Fragment`.');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      setCurrentlyValidatingElement$1(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createElementWithValidation(type, props, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // succeed and there will likely be errors in render.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (!validType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var info = '';")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,`      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";`)]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var sourceInfo = getSourceInfoErrorAddendumForProps(props);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (sourceInfo) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      info += sourceInfo;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      info += getDeclarationErrorAddendum();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    var typeString;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    if (type === null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      typeString = 'null';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (Array.isArray(type)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      typeString = 'array';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {")]),s(`
`),n("span",{class:"line"},[n("span",null,`      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";`)]),s(`
`),n("span",{class:"line"},[n("span",null,"      info = ' Did you accidentally export a JSX literal instead of a component?';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      typeString = typeof type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // TODO: Drop this when these are no longer allowed as the type argument.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (element == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return element;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } // Skip key warning if the type isn't valid since our key validation logic")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // doesn't expect a non-string/function type and can throw confusing errors.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // We don't want exception behavior to differ between dev and prod.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // (Rendering will throw with a helpful message and as soon as the type is")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // fixed, the key warnings will appear.)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (validType) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 2; i < arguments.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      validateChildKeys(arguments[i], type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type === exports.Fragment) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    validateFragmentProps(element);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    validatePropTypes(element);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return element;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var didWarnAboutDeprecatedCreateFactory = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createFactoryWithValidation(type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var validatedFactory = createElementWithValidation.bind(null, type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  validatedFactory.type = type;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!didWarnAboutDeprecatedCreateFactory) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      didWarnAboutDeprecatedCreateFactory = true;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } // Legacy hook: remove it")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    Object.defineProperty(validatedFactory, 'type', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      enumerable: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        Object.defineProperty(this, 'type', {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: type")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return type;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  return validatedFactory;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function cloneElementWithValidation(element, props, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  var newElement = cloneElement.apply(this, arguments);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  for (var i = 2; i < arguments.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    validateChildKeys(arguments[i], newElement.type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  validatePropTypes(newElement);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return newElement;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var frozenObject = Object.freeze({});")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /* eslint-disable no-new */")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"    new Map([[frozenObject, null]]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Set([frozenObject]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /* eslint-enable no-new */")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } catch (e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var createElement$1 =  createElementWithValidation ;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var cloneElement$1 =  cloneElementWithValidation ;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var createFactory =  createFactoryWithValidation ;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var Children = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  map: mapChildren,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  forEach: forEachChildren,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  count: countChildren,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  toArray: toArray,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  only: onlyChild")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"exports.Children = Children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.Component = Component;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.PureComponent = PureComponent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.cloneElement = cloneElement$1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.createContext = createContext;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.createElement = createElement$1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.createFactory = createFactory;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.createRef = createRef;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.forwardRef = forwardRef;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.isValidElement = isValidElement;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.lazy = lazy;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.memo = memo;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useCallback = useCallback;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useContext = useContext;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useDebugValue = useDebugValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useEffect = useEffect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useImperativeHandle = useImperativeHandle;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useLayoutEffect = useLayoutEffect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useMemo = useMemo;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useReducer = useReducer;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useRef = useRef;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.useState = useState;")]),s(`
`),n("span",{class:"line"},[n("span",null,"exports.version = ReactVersion;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=l(i,[["render",t]]);export{g as __pageData,v as default};
