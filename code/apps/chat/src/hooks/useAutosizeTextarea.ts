import { useLayoutEffect, useRef } from "react";

export function useAutosizeTextarea(value: string) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Density and viewport changes can reflow an unchanged draft. Observe width
    // only so our own height writes do not create a ResizeObserver loop.
    const measure = () => {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };
    let width = element.getBoundingClientRect().width;
    measure();
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === width) return;
      width = entry.contentRect.width;
      measure();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);
  return ref;
}
