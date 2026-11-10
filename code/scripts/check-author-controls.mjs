import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const codeRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const authorRoot = path.join(codeRoot, 'apps/dev-guides/author');
const requireAuthor = createRequire(path.join(authorRoot, 'package.json'));
const ts = requireAuthor('typescript');
const nativeInputTypes = new Set(['file', 'checkbox', 'radio', 'range']);
const editorClasses = new Set(['title-input', 'summary-input', 'frontmatter-input', 'markdown-import-input']);
const legacyButtonClasses = new Set(['save-button', 'secondary-button', 'icon-text-button', 'cw-button', 'cw-text-button']);
const controlClass = /\.(?:author-input|author-button|author-textarea|author-select-trigger)(?![\w-])/;
const geometryProperties = new Set(['height', 'min-height', 'padding', 'padding-top', 'padding-bottom', 'padding-block', 'padding-block-start', 'padding-block-end', 'font', 'font-size', 'line-height']);

function jsxAttribute(opening, name) {
  return opening.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && attribute.name.text === name);
}

function staticText(attribute) {
  const value = attribute?.initializer;
  if (value && ts.isStringLiteral(value)) return value.text;
  if (value && ts.isJsxExpression(value) && value.expression && (ts.isStringLiteral(value.expression) || ts.isNoSubstitutionTemplateLiteral(value.expression))) return value.expression.text;
  return undefined;
}

// Read literal fragments of className expressions; computed class maps are outside this check.
function classNames(opening) {
  const attribute = jsxAttribute(opening, 'className');
  const values = [];
  function collect(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) values.push(node.text);
    else ts.forEachChild(node, collect);
  }
  if (attribute?.initializer) collect(attribute.initializer);
  return values.flatMap(value => value.split(/\s+/)).filter(Boolean);
}

function inProductionEditor(node) {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ts.isJsxElement(ancestor) && classNames(ancestor.openingElement).includes('production-editor')) return true;
  }
  return false;
}

export function checkTsx(source, filename) {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const issues = [];
  const sharedImplementation = path.basename(filename) === 'AuthorUI.tsx';
  const report = (node, message) => issues.push({ file: filename, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1, message });
  for (const problem of tree.parseDiagnostics) {
    issues.push({ file: filename, line: tree.getLineAndCharacterOfPosition(problem.start ?? 0).line + 1, message: `TSX syntax: ${ts.flattenDiagnosticMessageText(problem.messageText, ' ')}` });
  }
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(tree);
      if (tag === 'input' && !sharedImplementation && !nativeInputTypes.has(staticText(jsxAttribute(node, 'type')))) report(node, 'Use AuthorInput or AuthorSearchField for ordinary inputs. Native file/checkbox/radio/range inputs are allowed.');
      if (tag === 'select') report(node, 'Use AuthorSelect instead of a native select.');
      if (tag === 'textarea' && !sharedImplementation && !classNames(node).some(value => editorClasses.has(value)) && !inProductionEditor(node)) report(node, 'Use AuthorTextarea for form fields; dedicated title/summary/Markdown/production editors remain native.');
      if (['button', 'AuthorButton', 'IconButton'].includes(tag)) {
        const legacy = classNames(node).filter(value => legacyButtonClasses.has(value));
        if (legacy.length) report(node, `Replace legacy button classes (${[...new Set(legacy)].join(', ')}) with component variant/size props and layout-only classes.`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return issues;
}

function maskComments(source) {
  let output = '', quote = '', escaped = false, comment = false;
  for (let index = 0; index < source.length; index++) {
    const char = source[index], next = source[index + 1];
    if (comment) {
      if (char === '*' && next === '/') { output += '  '; index++; comment = false; }
      else output += char === '\n' ? '\n' : ' ';
    } else if (quote) {
      output += char;
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
    } else if (char === '/' && next === '*') { output += '  '; index++; comment = true; }
    else { output += char; if (char === '"' || char === "'") quote = char; }
  }
  return output;
}

function splitSelectors(selector) {
  const result = [];
  let start = 0, depth = 0, quote = '', escaped = false;
  for (let index = 0; index < selector.length; index++) {
    const char = selector[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
    } else if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === '[') depth++;
    else if (char === ')' || char === ']') depth--;
    else if (char === ',' && depth === 0) { result.push(selector.slice(start, index)); start = index + 1; }
  }
  result.push(selector.slice(start));
  return result;
}

// Check the selected element, not an icon descendant such as `.author-button > svg`.
// Classes hidden inside :is/:where/:not and attribute strings are deliberately not inferred.
function targetsControl(selector) {
  let subject = '', depth = 0, quote = '', escaped = false;
  for (const char of selector.trim()) {
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
    } else if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === '[') depth++;
    else if (char === ')' || char === ']') depth--;
    else if (depth === 0 && /[\s>+~]/.test(char)) subject = '';
    else if (depth === 0) subject += char;
  }
  return controlClass.test(subject);
}

export function checkCss(source, filename) {
  if (path.basename(filename) === 'author-ui.css') return [];
  const masked = maskComments(source), stack = [], issues = [];
  let start = 0, quote = '', escaped = false, parentheses = 0;
  for (let index = 0; index < masked.length; index++) {
    const char = masked[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === '(') { parentheses++; continue; }
    if (char === ')') { parentheses--; continue; }
    if (parentheses !== 0) continue;
    if (char === '{') {
      if (stack.length) stack[stack.length - 1].nested = true;
      stack.push({ selector: masked.slice(start, index).trim(), body: index + 1, nested: false });
      start = index + 1;
    } else if (char === '}') {
      const rule = stack.pop();
      if (rule && !rule.nested && splitSelectors(rule.selector).some(targetsControl)) {
        const body = masked.slice(rule.body, index);
        for (const declaration of body.matchAll(/(?:^|;)\s*([\w-]+)\s*:/g)) {
          const property = declaration[1].toLowerCase();
          if (!geometryProperties.has(property)) continue;
          const offset = rule.body + declaration.index + declaration[0].lastIndexOf(declaration[1]);
          issues.push({ file: filename, line: source.slice(0, offset).split('\n').length, message: `Control ${property} belongs in author-ui.css; this selector overrides a shared control: ${rule.selector}` });
        }
      }
      start = index + 1;
    } else if (char === ';' && stack.length === 0) start = index + 1;
  }
  return issues;
}

function selfTest() {
  const tsx = source => checkTsx(source, 'Example.tsx');
  const css = source => checkCss(source, 'example.css');
  assert.equal(tsx('<><input type="file" /><input type={"checkbox"} /><input type="radio" /><input type="range" /></>').length, 0);
  assert.equal(checkTsx('<><input /><textarea /></>', 'AuthorUI.tsx').length, 0);
  assert.equal(tsx('<><AuthorInput /><AuthorTextarea /><AuthorSelect /><AuthorButton variant="primary" /><IconButton aria-label="关闭" /></>').length, 0);
  assert.equal(tsx('<><textarea className="title-input" /><textarea className="summary-input" /><textarea className="frontmatter-input" /><textarea className="markdown-import-input" /><div className="production-editor"><textarea /></div></>').length, 0);
  assert.equal(tsx('<input placeholder="普通文本" />').length, 1);
  assert.equal(tsx('<select><option>默认</option></select>').length, 1);
  assert.equal(tsx('<textarea rows={3} />').length, 1);
  assert.equal(tsx('<><button className="save-button" /><AuthorButton className={busy ? "secondary-button" : "cw-button"} /><IconButton className={`icon-text-button ${state}`} /></>').length, 3);
  assert.equal(css('.toolbar .author-input { width: 100%; margin-top: 4px; padding-inline: 12px; } .author-button > svg { height: 16px; }').length, 0);
  assert.equal(css('/* .author-input { height: 50px; } */ .other { content: ".author-input"; height: 50px; }').length, 0);
  assert.equal(css('@media (max-width: 760px) { .toolbar > .author-input:disabled { min-height: 44px; padding-block: 4px; } }').length, 2);
  assert.equal(css('.author-select-trigger, .other { font: inherit; } .author-button { height: 44px; } .author-textarea { line-height: 2; }').length, 3);
  assert.equal(checkCss('.author-input { height: 36px; }', 'author-ui.css').length, 0);
  console.log('Author controls self-test passed (native exceptions, editor exceptions, JSX classes, CSS geometry and selector scope).');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === '--self-test') { selfTest(); return; }
  if (args.length) throw new Error('Usage: node scripts/check-author-controls.mjs [--self-test]');
  const src = path.join(authorRoot, 'src');
  const filenames = (await fs.readdir(src)).filter(name => /\.(tsx|css)$/.test(name)).sort();
  const issues = [];
  for (const filename of filenames) {
    const absolute = path.join(src, filename), relative = path.relative(codeRoot, absolute);
    const source = await fs.readFile(absolute, 'utf8');
    issues.push(...(filename.endsWith('.tsx') ? checkTsx(source, relative) : checkCss(source, relative)));
  }
  if (issues.length) {
    for (const issue of issues) console.error(`${issue.file}:${issue.line}: ${issue.message}`);
    console.error(`Author controls check failed: ${issues.length} issue(s).`);
    process.exitCode = 1;
  } else console.log(`Author controls check passed (${filenames.length} source files).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
