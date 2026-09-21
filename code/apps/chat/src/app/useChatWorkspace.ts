import { useEffect, useState } from "react";
import type { ProviderId } from "@shared/contracts/chat";
import { useAttachments } from "@/features/chat/hooks/useAttachments";
import type { ImageAttachment } from "@/features/chat/types";
import type { Scenario } from "@/features/chat/types";
import { isGenerating } from "@/features/chat/state/selectors";
import { useAutoScroll } from "@/features/chat/hooks/useAutoScroll";
import { useChat } from "@/features/chat/hooks/useChat";
import { useProviders } from "@/features/model-settings/hooks/useProviders";

/** Page-level policies: provider/model selection, replay options and explicit sends. */
export function useChatWorkspace() {
  const chat = useChat();
  const attachments = useAttachments(
    chat.current.id,
    chat.current.provider,
    chat.current.model,
    chat.current.attachments ?? [],
    chat.setAttachments,
  );
  const empty = !chat.current.unloaded && chat.current.messages.length === 0;
  const scroll = useAutoScroll(chat.current.id, !empty);
  const providerState = useProviders();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scenario, setScenario] = useState<Scenario>("sample");
  const [speed, setSpeed] = useState(1);
  const [thinking, setThinking] = useState(false);
  const provider = providerState.providers.find(
    (p) => p.id === chat.current.provider,
  )!;
  const generating = isGenerating(chat.current.messages.at(-1));
  const { setModel } = chat;
  const model = chat.current.model;
  const models = provider.models;

  useEffect(() => {
    if (chat.ready && empty && !models.includes(model)) setModel(models[0]);
  }, [chat.ready, empty, model, models, setModel]);

  function selectModel(id: ProviderId, model: string) {
    if (
      generating ||
      (id === chat.current.provider && model === chat.current.model)
    )
      return;
    const next = providerState.providers.find((p) => p.id === id);
    if (!next?.models.includes(model)) return;
    chat.setProvider(id, model);
  }

  function send(
    text: string,
    nextScenario = scenario,
    images: ImageAttachment[] = [],
  ) {
    if (!provider.configured) {
      setSettingsOpen(true);
      return;
    }
    setScenario(nextScenario);
    scroll.bottom();
    void chat.send(
      text,
      { scenario: nextScenario, speed, thinking },
      false,
      images,
    );
  }

  function retry() {
    scroll.bottom();
    void chat.send("", { scenario, speed, thinking }, true);
  }

  return {
    chat,
    attachments,
    historyImageBytes: chat.current.messages.reduce(
      (sum, message) =>
        sum +
        (message.images?.reduce(
          (size, image) => size + (image.encodedSize ?? image.dataUrl.length),
          0,
        ) ?? 0),
      0,
    ),
    scroll,
    providerState,
    provider,
    generating,
    empty,
    settingsOpen,
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
    scenario,
    setScenario,
    speed,
    setSpeed,
    thinking,
    toggleThinking: () => setThinking((value) => !value),
    selectModel,
    send,
    retry,
  };
}
