import { ReplaySpeedSlider } from "./ReplaySpeedSlider";
import { useId } from "react";
import { useI18n } from "@/i18n/useI18n";
import type { Scenario } from "../types";
import styles from "./ReplayControls.module.css";

const scenarios: Scenario[] = ["sample", "markdown", "error", "empty"];

export function ReplayControls({
  scenario,
  speed,
  onScenario,
  onSpeed,
}: {
  scenario: Scenario;
  speed: number;
  onScenario: (value: Scenario) => void;
  onSpeed: (value: number) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  return (
    <div className={styles.controls}>
      <ReplaySpeedSlider speed={speed} onChange={onSpeed} />
      <fieldset>
        <legend>{t("composer.scenario")}</legend>
        <div className={styles.choices}>
          {scenarios.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={`${id}-scenario`}
                checked={scenario === value}
                onChange={() => onScenario(value)}
              />
              <span>{t(`scenario.${value}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
