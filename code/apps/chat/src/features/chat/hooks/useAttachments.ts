import type { Attachment } from "../types";
import { readAttachment } from "../services/readAttachment";
import { useLayoutEffect, useRef, useState } from "react";
import {
  attachmentFileError,
  attachmentCapabilityError,
  imageFile,
  attachmentLimit,
  type AttachmentError,
} from "../lib/attachments";

/** Each conversation owns its files; an obsolete file read cannot populate another draft. */
export function useAttachments(
  conversationId: string,
  provider: string,
  model: string,
  files: Attachment[],
  onChange: (conversationId: string, files: Attachment[]) => void,
) {
  const [error, setError] = useState<{
    conversationId: string;
    kind: AttachmentError;
  }>();
  const [readingId, setReadingId] = useState<string>();
  const currentFiles = useRef(files);
  useLayoutEffect(() => {
    currentFiles.current = files;
  }, [files]);
  const ticket = useRef(0);
  const busy = useRef(false);
  const previousContext = useRef({ conversationId, provider, model });
  useLayoutEffect(() => {
    const previous = previousContext.current;
    if (
      busy.current &&
      previous.conversationId === conversationId &&
      (previous.provider !== provider || previous.model !== model)
    ) {
      setError({ conversationId, kind: "modelChanged" });
    }
    previousContext.current = { conversationId, provider, model };
    ticket.current++;
    busy.current = false;
    setReadingId(undefined);
  }, [conversationId, provider, model]);
  useLayoutEffect(
    () => () => {
      ticket.current++;
      busy.current = false;
    },
    [],
  );

  async function add(selected: File[]) {
    if (busy.current || !selected.length) return;
    const invalid =
      selected.map(attachmentFileError).find(Boolean) ??
      selected
        .map((file) =>
          attachmentCapabilityError(
            provider,
            model,
            imageFile(file) ? "image" : "text",
          ),
        )
        .find(Boolean);
    if (files.length + selected.length > attachmentLimit || invalid) {
      setError({ conversationId, kind: invalid ?? "count" });
      return;
    }
    const version = ++ticket.current;
    busy.current = true;
    setReadingId(conversationId);
    setError(undefined);
    try {
      const loaded = await Promise.all(selected.map(readAttachment));
      if (ticket.current !== version) return;
      onChange(conversationId, [...currentFiles.current, ...loaded]);
    } catch {
      if (ticket.current === version)
        setError({ conversationId, kind: "read" });
    } finally {
      if (ticket.current === version) {
        busy.current = false;
        setReadingId(undefined);
      }
    }
  }
  function dropError(data: DataTransfer) {
    const hasImages =
      Array.from(data.items).some(
        (item) => item.kind === "file" && item.type.startsWith("image/"),
      ) || Array.from(data.files).some(imageFile);
    return attachmentCapabilityError(
      provider,
      model,
      hasImages ? "image" : "text",
    );
  }
  function remove(id: string) {
    onChange(
      conversationId,
      files.filter((file) => file.id !== id),
    );
    setError(undefined);
  }
  function clear() {
    ticket.current++;
    busy.current = false;
    setReadingId(undefined);
    setError(undefined);
    onChange(conversationId, []);
  }
  const currentError =
    error?.conversationId === conversationId ? error.kind : undefined;
  const visibleError =
    (currentError === "local" && provider !== "local") ||
    (currentError === "imageUnsupported" &&
      !attachmentCapabilityError(provider, model, "image"))
      ? undefined
      : currentError;
  return {
    files,
    dropError,
    add,
    remove,
    clear,
    reading: readingId === conversationId,
    error: visibleError,
  };
}

export type AttachmentController = ReturnType<typeof useAttachments>;
