import { catalogs, type Locale, type MessageKey, type zh } from "./catalog";

type Fields<S extends string> =
  S extends `${string}{${infer Field}}${infer Rest}`
    ? Field | Fields<Rest>
    : never;
type Params<K extends MessageKey> = Fields<(typeof zh)[K]>;
export function translate<K extends MessageKey>(
  locale: Locale,
  key: K,
  ...args: [Params<K>] extends [never]
    ? []
    : [Record<Params<K>, string | number>]
): string {
  const params = (args[0] ?? {}) as Record<string, string | number>;
  return catalogs[locale][key].replace(/\{(\w+)\}/g, (_, name: string) =>
    String(params[name] ?? `{${name}}`),
  );
}
export type Translator = <K extends MessageKey>(
  key: K,
  ...args: [Params<K>] extends [never]
    ? []
    : [Record<Params<K>, string | number>]
) => string;
export function createTranslator(locale: Locale): Translator {
  return (key, ...args) => translate(locale, key, ...args);
}
