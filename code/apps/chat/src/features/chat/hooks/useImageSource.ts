import { useEffect, useState } from "react";
import type { ImageAttachment } from "../types";
import { acquireImage } from "../services/attachmentAssets";
export function useImageSource(image: ImageAttachment) {
  const [source, setSource] = useState<string | undefined>(
    image.dataUrl || undefined,
  );
  useEffect(() => {
    let active = true;
    setSource(image.dataUrl || undefined);
    const asset = acquireImage(image);
    void asset.url.then(
      (url) => {
        if (active) setSource(url);
      },
      () => {
        if (active) setSource(undefined);
      },
    );
    return () => {
      active = false;
      asset.release();
    };
  }, [image]);
  return source;
}
