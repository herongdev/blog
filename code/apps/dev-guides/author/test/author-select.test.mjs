import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

// Exercise the actual TSX adapter without adding a DOM/test-runner dependency.
// These are value/accessibility contracts, not browser keyboard or visual tests.
const require = createRequire(import.meta.url);
const Select = require('@radix-ui/react-select');
const components = new Map();
const loadComponent = (name) => {
  if (components.has(name)) return components.get(name);
  const source = readFileSync(new URL(`../src/${name}.tsx`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const componentModule = { exports: {} };
  new Function('require', 'module', 'exports', compiled)((id) => id.startsWith('./') ? loadComponent(id.slice(2)) : require(id), componentModule, componentModule.exports);
  components.set(name, componentModule.exports);
  return componentModule.exports;
};
const AuthorSelect = loadComponent('AuthorSelect').default;
const base = { label: '封面', value: '', options: [{ value: '', label: '使用默认封面' }, { value: 'option:', label: '特殊资源' }], onValueChange() {} };
const items = (node) => {
  if (!React.isValidElement(node)) return [];
  return [...(node.type === Select.Item ? [node] : []), ...React.Children.toArray(node.props.children).flatMap(items)];
};

test('explicit empty and prefix-looking business values stay distinct and round-trip', () => {
  const received = [];
  const root = AuthorSelect({ ...base, onValueChange: (value) => received.push(value) });
  const choices = items(root);
  assert.equal(root.props.value, choices[0].props.value);
  assert.ok(choices.every((item) => item.props.value !== ''));
  assert.notEqual(choices[0].props.value, choices[1].props.value);
  choices.forEach((item) => root.props.onValueChange(item.props.value));
  assert.deepEqual(received, ['', 'option:']);
});

test('a missing controlled value is retained as unavailable without choosing a replacement', () => {
  let changed = false;
  const root = AuthorSelect({ ...base, value: 'removed-asset', onValueChange: () => { changed = true; } });
  const fallback = items(root).find((item) => item.props.value === root.props.value);
  assert.equal(fallback.props.disabled, true);
  assert.equal(fallback.props.textValue, '原选项已不可用');
  assert.equal(changed, false);
  assert.match(renderToStaticMarkup(root), /原选项已不可用/);
});

test('placeholder, empty lists and busy disabled state preserve their contracts', () => {
  const placeholder = AuthorSelect({ ...base, options: [{ value: 'video', label: '视频' }], placeholder: '选择视频' });
  assert.equal(placeholder.props.value, '');
  assert.equal(items(placeholder).length, 1);
  assert.match(renderToStaticMarkup(placeholder), /选择视频/);
  for (const props of [{ disabled: true }, { options: [] }]) {
    assert.equal(AuthorSelect({ ...base, ...props }).props.disabled, true);
  }
});

test('the visible trigger retains its label, id, selection and standard combobox semantics', () => {
  const markup = renderToStaticMarkup(React.createElement(AuthorSelect, { ...base, id: 'cover-choice' }));
  assert.match(markup, /role="combobox"/);
  assert.match(markup, /aria-expanded="false"/);
  assert.match(markup, /aria-label="封面"/);
  assert.match(markup, /id="cover-choice"/);
  assert.match(markup, /使用默认封面/);
  assert.match(markup, /lucide-chevron-down/);
});

test('icon buttons preserve native refs, handlers and aria state through Radix asChild', () => {
  const IconButton = loadComponent('IconButton').default;
  const ref = React.createRef(); const onClick = () => {};
  const button = IconButton.render({ 'aria-label': '更多操作', 'aria-pressed': true, disabled: true, onClick }, ref);
  assert.equal(button.type, 'button');
  assert.equal(button.props.type, 'button');
  assert.equal(button.props.ref, ref);
  assert.equal(button.props.onClick, onClick);
  assert.equal(button.props.disabled, true);
  assert.equal(button.props['aria-pressed'], true);
  const Menu = require('@radix-ui/react-dropdown-menu');
  const markup = renderToStaticMarkup(React.createElement(Menu.Root, null, React.createElement(Menu.Trigger, { asChild: true }, React.createElement(IconButton, { 'aria-label': '更多操作', 'data-business-id': 'topic' }))));
  assert.match(markup, /aria-haspopup="menu"/);
  assert.match(markup, /aria-expanded="false"/);
  assert.match(markup, /aria-label="更多操作"/);
  assert.match(markup, /data-business-id="topic"/);
});

test('shared dialogs retain focus handlers, disabled close and automatic/custom description ids', () => {
  const AuthorDialogContent = loadComponent('AuthorDialogContent').default;
  const Dialog = require('@radix-ui/react-dialog');
  const find = (node, type) => !React.isValidElement(node) ? undefined : node.type === type ? node : React.Children.toArray(node.props.children).map((child) => find(child, type)).find(Boolean);
  const ref = React.createRef(); const focus = () => {}; const block = () => {};
  const props = { title: '新建目录', description: '最多 6 层', closeLabel: '关闭目录操作', closeDisabled: true, onOpenAutoFocus: focus, onCloseAutoFocus: focus, onEscapeKeyDown: block, onPointerDownOutside: block };
  const tree = AuthorDialogContent.render(props, ref);
  const content = find(tree, Dialog.Content); const description = find(tree, Dialog.Description);
  assert.equal(content.props.ref, ref);
  assert.equal(content.props.onOpenAutoFocus, focus);
  assert.equal(content.props.onCloseAutoFocus, focus);
  assert.equal(content.props.onEscapeKeyDown, block);
  assert.equal(content.props.onPointerDownOutside, block);
  assert.equal(Object.hasOwn(content.props, 'aria-describedby'), false);
  assert.equal(Object.hasOwn(description.props, 'id'), false);
  assert.equal(find(tree, Dialog.Title).props.children, '新建目录');
  assert.equal(find(tree, Dialog.Close).props.children.props.disabled, true);
  const custom = AuthorDialogContent.render({ ...props, 'aria-describedby': 'file-description', descriptionId: 'file-description', surface: 'workspace' }, null);
  assert.equal(find(custom, Dialog.Content).props['aria-describedby'], 'file-description');
  assert.equal(find(custom, Dialog.Description).props.id, 'file-description');
  const optOut = find(AuthorDialogContent.render({ ...props, 'aria-describedby': undefined }, null), Dialog.Content);
  assert.equal(Object.hasOwn(optOut.props, 'aria-describedby'), true);
  assert.equal(optOut.props['aria-describedby'], undefined);
});
