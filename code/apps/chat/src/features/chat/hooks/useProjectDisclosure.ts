import { useCallback, useEffect, useState } from "react";
import type { ChatProject } from "../types";

/** Sidebar view state survives list virtualization, archive view and drawer toggles. */
export function useProjectDisclosure(
  projects: ChatProject[],
  activeProjectId?: string,
) {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(
    () => new Set(activeProjectId ? [activeProjectId] : []),
  );
  const expand = useCallback((id: string) => {
    setExpandedIds((previous) =>
      previous.has(id) ? previous : new Set([...previous, id]),
    );
  }, []);
  const toggle = useCallback((id: string) => {
    setExpandedIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  useEffect(() => {
    if (activeProjectId) expand(activeProjectId);
  }, [activeProjectId, expand]);
  useEffect(() => {
    const existing = new Set(projects.map((project) => project.id));
    setExpandedIds((previous) => {
      const next = new Set([...previous].filter((id) => existing.has(id)));
      return next.size === previous.size ? previous : next;
    });
  }, [projects]);
  return { expandedIds, expand, toggle };
}
