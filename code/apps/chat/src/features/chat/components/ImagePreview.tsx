import { useImageSource } from "../hooks/useImageSource";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import type { ImageAttachment } from "../types";
import primitives from "@/styles/primitives.module.css";
import styles from "./ImagePreview.module.css";

/** Native modal owns focus trapping, Escape and background inertness. */
export function ImagePreview({
  image,
  onClose,
}: {
  image: ImageAttachment;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const src = useImageSource(image);
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={t("image.preview", { name: image.name })}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <span title={image.name}>{image.name}</span>
          <button
            type="button"
            className={primitives["icon-button"]}
            aria-label={t(zoomed ? "image.fit" : "image.original")}
            aria-pressed={zoomed}
            onClick={() => setZoomed((value) => !value)}
          >
            <Icon icon={zoomed ? ZoomOut : ZoomIn} />
          </button>
          <button
            type="button"
            className={primitives["icon-button"]}
            aria-label={t("image.close")}
            onClick={onClose}
          >
            <Icon icon={X} />
          </button>
        </header>
        <div className={styles.canvas} data-zoomed={zoomed}>
          <img
            src={src}
            alt={image.name}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    </dialog>
  );
}
