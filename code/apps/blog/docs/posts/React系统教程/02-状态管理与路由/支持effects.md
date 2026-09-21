---
title: "支持effects"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "4.1 使用 异步 实现。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/dva/支持effects.md"
---
::: v-pre

# 支持effects

> 本节目标：理解“支持effects”的核心思路，并能把它用于实际开发或面试表达。
`4.1` **使用**

```

4.1.1 src\index.js
src\index.js
import React from 'react';import dva, { connect } from './dva';const app = dva();app.model({    namespace: 'counter',    state: { number: 0 },    reducers: {        add(state) {            return { number: state.number + 1 };        }    },+    effects: {+        *asyncAdd(action, { call, put }) {+            yield call(delay, 1000);+            yield put({ type: 'counter/add' });+        }+    }});function Counter(props) {    return (        <div>            <p>{props.number}</p>            <button onClick={() => props.dispatch({ type: "counter/add" })}>+</button>+            <button onClick={() => props.dispatch({ type: "counter/asyncAdd" })}>
```

异步

```
+</button></div>    )}const ConnectedCounter = connect(    (state) => state.counter)(Counter);app.router(() => <ConnectedCounter />);app.start('#root');
+function delay(ms) {+    return new Promise((resolve) => {+        setTimeout(function () {+            resolve();+        }, ms);+    });+}
4.2
```

**实现**

```

4.2.1 dva\index.js
src\dva\index.js
import React from 'react';import ReactDOM from 'react-dom';+import { createStore, combineReducers, applyMiddleware } from 'redux';+import createSagaMiddleware from 'redux-saga';+import * as sagaEffects from 'redux-saga/effects';+import { NAMESPACE_SEP } from './constants';import { connect, Provider } from 'react-redux';import prefixNamespace from './prefixNamespace';export { connect };
function dva() {    const app = {        _models: [],        model,        router,        _router: null,        start    }    const initialReducers = {};    function model(model) {        const prefixedModel = prefixNamespace(model);        app._models.push(prefixedModel);        return prefixedModel;    }    function router(router) {        app._router = router;    }
function start(root) {        for (const model of app._models) {            initialReducers[model.namespace] = getReducer(model);        }        let rootReducer = createReducer();+        const sagas = getSagas(app);+        const sagaMiddleware = createSagaMiddleware();+        let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));+        sagas.forEach(saga => sagaMiddleware.run(saga));ReactDOM.render(<Provider store={store}>{app._router()}</Provider>, document.querySelector(root));        function createReducer() {            return combineReducers(initialReducers);        }    }+    function getSagas(app) {+        let sagas = [];+        for (const model of app._models) {+            sagas.push(getSaga(model.effects, model));+        }+        return sagas;+    }return app;}+function getSaga(effects, model) {+    return function* () {+        for (const key in effects) {+            const watcher = getWatcher(key, model.effects[key], model);+            yield sagaEffects.fork(watcher);+        }+    };+}+function getWatcher(key, effect, model) {+    return function* () {+        yield sagaEffects.takeEvery(key, function* sagaWithCatch(...args) {+            yield effect(...args, { ...sagaEffects, put: action => sagaEffects.put({ ...action, +type: prefixType(action.type, model) }) });+        });+    };+}+function prefixType(type, model) {+    if (type.indexOf('/') === -1) {+        return `${model.namespace}${NAMESPACE_SEP}${type}`;+    }+    return type;+}function getReducer(model) {    let { reducers, state: defaultState } = model;    let reducer = (state = defaultState, action) => {        let reducer = reducers[action.type];        if (reducer) {            return reducer(state, action);        }        return state;    }    return reducer;}
export default dva;
4.2.2 prefixNamespace.js
src\dva\prefixNamespace.js
import { NAMESPACE_SEP } from './constants';function prefix(obj, namespace) {    return Object.keys(obj).reduce((memo, key) => {        const newKey = `${namespace}${NAMESPACE_SEP}${key}`;        memo[newKey] = obj[key];        return memo;    }, {});}export default function prefixNamespace(model) {    if (model.reducers)        model.reducers = prefix(model.reducers, model.namespace);+    if (model.effects) {+       model.effects = prefix(model.effects, model.namespace);+    }    return model;}
```

:::
