import { useImageSource } from "../hooks/useImageSource";
import { useState } from "react";
import { FileText, X } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import {
  isImageAttachment,
  type Attachment,
  type ImageAttachment,
} from "../types";
import { ImagePreview } from "./ImagePreview";
import styles from "./AttachmentList.module.css";

export function AttachmentList({
  files,
  onRemove,
}: {
  files: Attachment[];
  onRemove?: (id: string) => void;
}) {
  const { t } = useI18n();
  const [preview, setPreview] = useState<ImageAttachment>();
  if (!files.length) return null;
  return (
    <>
      <ul
        className={styles.list}
        aria-label={t(onRemove ? "composer.attachments" : "image.sent")}
      >
        {files.map((file) => (
          <li
            key={file.id}
            className={styles.file}
            data-image={isImageAttachment(file)}
          >
            {isImageAttachment(file) ? (
              <button
                type="button"
                className={styles.thumbnail}
                aria-label={t("image.preview", { name: file.name })}
                onClick={() => setPreview(file)}
              >
                <Thumbnail image={file} />
              </button>
            ) : (
              <Icon icon={FileText} size="sm" />
            )}
            <span className={styles.name} title={file.name}>
              {file.name}
            </span>
            {onRemove && (
              <button
                type="button"
                className={styles.remove}
                aria-label={t("composer.removeAttachment", { name: file.name })}
                onClick={() => {
                  if (preview?.id === file.id) setPreview(undefined);
                  onRemove(file.id);
                }}
              >
                <Icon icon={X} size="sm" />
              </button>
            )}
          </li>
        ))}
      </ul>
      {preview && (
        <ImagePreview image={preview} onClose={() => setPreview(undefined)} />
      )}
    </>
  );
}

function Thumbnail({ image }: { image: ImageAttachment }) {
  const src = useImageSource(image);
  return (
    <img
      src={src}
      alt={image.name}
      width={image.width}
      height={image.height}
      loading="lazy"
    />
  );
}
