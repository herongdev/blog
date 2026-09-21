import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const src = fileURLToPath(new URL("../../src", import.meta.url));
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const sourceFiles = files(src);
const css = sourceFiles
  .filter((file) => file.endsWith(".css"))
  .map((file) => ({
    file: path.relative(src, file),
    source: readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
  }));
const declarations = (source) => [
  ...source.matchAll(/([\w-]+)\s*:\s*([^;{}]+);/g),
];

function literalErrors(source) {
  return declarations(source).flatMap(([, property, value]) => {
    // Structural fractions, zero, viewport/% geometry and CSS keywords stay local.
    const literal =
      /#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|color-mix)\(|\b(?:white|black)\b|(?<![\w-])\d*\.?\d+(?:px|rem|em|ms|s)\b/i.test(
        value,
      );
    const numericRole =
      /^(font-weight|line-height|letter-spacing|z-index|stroke-width)$/.test(
        property,
      ) && /^\d/.test(value);
    return literal || numericRole ? [`${property}: ${value.trim()}`] : [];
  });
}

describe("design token boundaries", () => {
  it("密度只调整间距，不能缩放字体、图标或控件尺寸", () => {
    for (const { file, source } of css) {
      if (file === "styles/tokens.css") continue;
      for (const [, property, value] of declarations(source)) {
        if (value.includes("var(--density-"))
          expect(property, `${file}: ${property}`).toMatch(
            /^(?:gap|(?:row|column)-gap|(?:padding|margin)(?:-(?:top|right|bottom|left|block|inline)(?:-start|-end)?)?)$/,
          );
      }
    }
    const tokens = css.find(({ file }) => file === "styles/tokens.css").source;
    for (const [, overrides] of tokens.matchAll(
      /:root\[data-density="[^"]+"\]\s*\{([^}]+)\}/g,
    ))
      for (const [, property] of declarations(overrides))
        expect(property).toMatch(/^--density-/);
  });
  it("页面和组件的外观值必须来自令牌", () => {
    const errors = css
      .filter(({ file }) => file !== "styles/tokens.css")
      .flatMap(({ file, source }) =>
        literalErrors(source).map((error) => `${file}: ${error}`),
      );
    expect(errors).toEqual([]);
  });

  it("检查能发现新增硬编码，同时允许运行时几何及结构值", () => {
    expect(
      literalErrors(
        ".bad { color: #aaa; padding: 12px; font: 13px sans-serif; z-index: 80; }",
      ),
    ).toHaveLength(4);
    expect(
      literalErrors(
        ".ok { color: var(--muted); margin: 0 auto; width: calc(100% - var(--space-4)); transform: translateX(-50%); }",
      ),
    ).toEqual([]);
  });

  it("CSS 变量引用已定义，令牌不存在循环依赖", () => {
    const definitions = new Map(
      css.flatMap(({ source }) =>
        declarations(source)
          .filter(([, property]) => property.startsWith("--"))
          .map(([, property, value]) => [property, value]),
      ),
    );
    // Runtime geometry from floating overlays and measured virtual rows.
    const geometry = readFileSync(
      path.join(src, "components/Select/useSelect.ts"),
      "utf8",
    );
    const runtime = new Set(
      [...geometry.matchAll(/setProperty\(\s*"(--[\w-]+)"/g)].map(
        (match) => match[1],
      ),
    );
    runtime.add("--virtual-height");
    runtime.add("--virtual-offset");
    const references = (value) =>
      [...value.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]);
    for (const { source, file } of css) {
      for (const name of references(source))
        expect(
          definitions.has(name) || runtime.has(name),
          `${file}: ${name}`,
        ).toBe(true);
    }
    function visit(name, parents = []) {
      expect(
        parents,
        `Token cycle: ${[...parents, name].join(" → ")}`,
      ).not.toContain(name);
      for (const dependency of references(definitions.get(name) ?? ""))
        visit(dependency, [...parents, name]);
    }
    for (const name of definitions.keys()) visit(name);
  });

  it("媒体查询只使用约定断点，不将无效的 CSS var 写入查询", () => {
    for (const { source } of css) {
      for (const [, condition] of source.matchAll(/@media\s*([^{]+)/g)) {
        expect(condition).not.toContain("var(");
        for (const [, width] of condition.matchAll(
          /(?:min|max)-width:\s*(\d+)px/g,
        )) {
          expect(["760", "1100", "1450"]).toContain(width);
        }
      }
    }
  });

  it("展示组件只接收运行时定位样式，图标尺寸由公共组件管理", () => {
    const components = sourceFiles.filter((file) => file.endsWith(".tsx"));
    for (const file of components) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/\b(?:size|strokeWidth)=\{[\d.]+\}/);
      for (const [, value] of source.matchAll(/\bstyle=\{([^}]+)\}/g)) {
        const allowed = ["floatingStyles", "select.floatingStyles"];
        if (file === path.join(src, "components/WindowedList/WindowedList.tsx"))
          allowed.push("listStyle", "rowStyle");
        expect(allowed, file).toContain(value);
      }
    }
  });
});
