import type { ReactNode } from "react";
import { useI18n } from "@/i18n/useI18n";
import { Select } from "@/components/Select/Select";
import styles from "./ModelSelector.module.css";
import type { ProviderId, ProviderInfo } from "@shared/contracts/chat";

interface ModelSelectorProps {
  provider: ProviderInfo;
  providers: ProviderInfo[];
  model: string;
  generating: boolean;
  onSelect: (provider: ProviderId, model: string) => void;
  localControls: ReactNode;
  localSpeed: number;
}
export function ModelSelector({
  provider,
  providers,
  model,
  generating,
  onSelect,
  localControls,
  localSpeed,
}: ModelSelectorProps) {
  const { t, providerName } = useI18n();
  const options = providers.flatMap((item) =>
    item.models.map((name) => ({
      value: JSON.stringify([item.id, name]),
      label: item.id === "local" ? providerName(item.id) : name,
      group: providerName(item.id),
      provider: item.id,
      model: name,
    })),
  );
  const selected = provider.models.includes(model) ? model : provider.models[0];
  return (
    <Select
      label={t("provider.selectModel")}
      value={JSON.stringify([provider.id, selected])}
      options={options}
      selectedLabel={
        provider.id === "local"
          ? `${providerName("local")} · ${t("composer.speedValue", { speed: localSpeed })}`
          : selected
      }
      onChange={(value) => {
        const option = options.find((item) => item.value === value);
        if (option) onSelect(option.provider, option.model);
      }}
      disabled={generating}
      variant="quiet"
      className={styles["model-select"]}
      footer={provider.id === "local" ? localControls : undefined}
    />
  );
}
