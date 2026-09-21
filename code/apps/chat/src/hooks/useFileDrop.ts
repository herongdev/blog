import { useEffect, useState, type DragEvent } from "react";

const hasFiles = (event: DragEvent | globalThis.DragEvent) =>
  event.dataTransfer?.types.includes("Files");
/** Native file drags only. Text/link drags retain normal editor behavior. */
export function useFileDrop(
  onFiles: (files: File[]) => void,
  disabled: boolean,
  getRejection?: (data: DataTransfer) => string | undefined,
) {
  const [active, setActive] = useState(false);
  const [rejection, setRejection] = useState<string>();
  useEffect(() => {
    const prevent = (event: globalThis.DragEvent) => {
      if (hasFiles(event)) event.preventDefault();
      if (event.type === "drop") setActive(false);
    };
    const reset = () => setActive(false);
    const leave = (event: globalThis.DragEvent) => {
      if (!event.relatedTarget) reset();
    };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    window.addEventListener("dragend", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("dragleave", leave);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
      window.removeEventListener("dragend", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("dragleave", leave);
    };
  }, []);
  return {
    active: active && !disabled,
    rejection,
    handlers: {
      onDragEnter(event: DragEvent<HTMLElement>) {
        if (!hasFiles(event)) return;
        event.preventDefault();
        setRejection(getRejection?.(event.dataTransfer));
        setActive(!disabled);
      },
      onDragOver(event: DragEvent<HTMLElement>) {
        if (!hasFiles(event)) return;
        event.preventDefault();
        const reason = getRejection?.(event.dataTransfer);
        setRejection(reason);
        event.dataTransfer.dropEffect = disabled || reason ? "none" : "copy";
      },
      onDragLeave(event: DragEvent<HTMLElement>) {
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        )
          setActive(false);
      },
      onDrop(event: DragEvent<HTMLElement>) {
        if (!hasFiles(event)) return;
        event.preventDefault();
        setActive(false);
        if (!disabled) onFiles(Array.from(event.dataTransfer.files));
      },
    },
  };
}
