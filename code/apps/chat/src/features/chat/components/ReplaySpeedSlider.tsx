import { useId, useState } from "react";
import { Zap } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import styles from "./ReplaySpeedSlider.module.css";

import {
  replaySpeeds as speeds,
  replaySpeedLabels as labels,
} from "../lib/replaySpeeds";

/** Keep the native range for pointer/keyboard input, animate a separate visual thumb. */
export function ReplaySpeedSlider({
  speed,
  onChange,
}: {
  speed: number;
  onChange: (speed: number) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const [boost, setBoost] = useState(0);
  function select(next: number) {
    if (next > speed) setBoost((value) => value + 1);
    else if (next < speed) setBoost(0);
    onChange(next);
  }
  const step = Math.max(
    0,
    speeds.findIndex((value) => value === speed),
  );
  return (
    <div className={styles.control} data-step={step}>
      <div className={styles.heading}>
        <label htmlFor={id}>
          <Icon icon={Zap} size="sm" />
          <span>{t("composer.speed")}</span>
        </label>
        <output htmlFor={id}>
          {t(`replay.speed.${labels[step]}`)} <strong>{speeds[step]}×</strong>
        </output>
      </div>
      <div className={styles.slider}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.fill}>
            {speeds.map((value, index) => (
              <span
                key={value}
                className={styles.gradient}
                data-color={index}
                data-active={step === index}
              />
            ))}
            <span className={styles.particles}>
              <i />
              <i />
              <i />
            </span>
            {boost > 0 && <span key={boost} className={styles.boost} />}
          </div>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {speeds.map((value) => (
            <i key={value} data-passed={speed >= value} />
          ))}
        </div>
        <span className={styles["thumb-path"]} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        <input
          id={id}
          type="range"
          min={0}
          max={speeds.length - 1}
          step={1}
          value={step}
          aria-valuetext={t("composer.speedValue", { speed: speeds[step] })}
          onChange={(event) =>
            select(speeds[Number(event.currentTarget.value)])
          }
        />
      </div>
      <div className={styles.labels} aria-hidden="true">
        {speeds.map((value) => (
          <span key={value} data-selected={speed === value}>
            {value}×
          </span>
        ))}
      </div>
    </div>
  );
}
