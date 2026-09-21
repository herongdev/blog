---
title: "src-react.js"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "15.1 15.4 src\\react.js +import \\{ wrapToVdom, shallowEqual \\} from \"./utils\";import \\{ Component \\} from './Component';+import \\{ REACT FORW。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/性能优化 /src-react.js.md"
---
::: v-pre

# src-react.js

> 本节目标：理解“src-react.js”的核心思路，并能把它用于实际开发或面试表达。
**15.1 15.4**
src\react.js
+import \{ wrapToVdom, shallowEqual \} from "./utils";import \{ Component \} from './Component';+import \{ REACT_FORWARD_REF_TYPE,REACT_FRAGMENT, REACT_CONTEXT, REACT_PROVIDER, REACT_MEMO \} from './constants';function createElement(type, config, children) \{ let ref; let key; if (config) \{ delete config.__source; delete config.__self; ref = config.ref; delete config.ref; key = config.key; delete config.key; \} let props = \{ ...config \}; if (arguments.length \> 3) \{ props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom); \} else \{ props.children = wrapToVdom(children); \} return \{ type, ref, key, props, \};\}function createRef() \{ return \{ current: null \};\}function forwardRef(render) \{ var elementType = \{ $$typeof: REACT_FORWARD_REF_TYPE, render: render \}; return elementType;\}function createContext() \{ let context = \{ $$typeof: REACT_CONTEXT \}; context.Provider = \{ $$typeof: REACT_PROVIDER, _context: context \} context.Consumer = \{ $$typeof: REACT_CONTEXT, _context: context \} return context;\}function cloneElement(element, newProps, ...newChildren) \{ let oldChildren = element.props && element.props.children; let children = [...(Array.isArray(oldChildren) ? oldChildren : [oldChildren]), ...newChildren] .filter(item =\> item !== undefined) .map(wrapToVdom); if (children.length === 1) children = children[0]; let props = \{ ...element.props, ...newProps, children \}; return \{ ...element, props \};\}+class PureComponent extends Component \{+ shouldComponentUpdate(newProps, nextState) \{+ return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState);+ \}+\}+function memo(type, compare = shallowEqual) \{+ return \{+ $$typeof: REACT_MEMO,+ type,+ compare+ \}+\}const React = \{ createElement, Component, createRef, forwardRef, Fragment:REACT_FRAGMENT, createContext, cloneElement, PureComponent,+ memo\};export default React;

:::
