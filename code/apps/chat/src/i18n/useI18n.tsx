import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./catalog";
import { createTranslator } from "./translate";
import { translateNotice } from "./notices";

const LocaleContext = createContext<Locale>("zh-CN");
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
export function useI18n() {
  const locale = useContext(LocaleContext);
  return useMemo(() => {
    const t = createTranslator(locale);
    return {
      locale,
      t,
      providerName: (id: "local" | "aliyun" | "deepseek") =>
        t(`provider.${id}`),
      notice: (message: string | undefined) =>
        translateNotice(locale, message ?? ""),
    };
  }, [locale]);
}
