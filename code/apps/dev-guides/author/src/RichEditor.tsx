import { useMemo, useRef } from 'react';
import { Editor } from '@bytemd/react';
import type { BytemdPlugin } from 'bytemd';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { looksLikeMarkdownDocument } from './markdown-import';

function localImagePreview(kind: string, slug: string): BytemdPlugin {
  const prefix = `./${slug}/`;
  return {
    viewerEffect({ markdownBody }) {
      markdownBody.querySelectorAll<HTMLImageElement>('img[src]').forEach((image) => {
        const value = image.getAttribute('src') ?? '';
        if (!value.startsWith(prefix)) return;
        const filename = value.slice(prefix.length);
        if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpg|webp)$/i.test(filename) || filename.includes('..')) return;
        image.src = `${import.meta.env.BASE_URL}api/assets/${kind}/${slug}/${encodeURIComponent(filename)}`;
      });
    },
  };
}

type Props = {
  kind: 'draft' | 'content';
  slug: string;
  value: string;
  compact: boolean;
  onChange: (value: string) => void;
  onImportMarkdown: (value: string) => void;
  uploadImages: (files: File[]) => Promise<{ url: string; alt: string }[]>;
};

export default function RichEditor({ kind, slug, value, compact, onChange, onImportMarkdown, uploadImages }: Props) {
  const importCallback = useRef(onImportMarkdown);
  importCallback.current = onImportMarkdown;
  const plugins = useMemo(() => {
    const documentPaste: BytemdPlugin = {
      editorEffect({ editor }) {
        const beforeChange = (_editor: typeof editor, change: { origin?: string; text: string[]; cancel: () => void }) => {
          const source = change.text.join('\n');
          if (change.origin !== 'paste' || !looksLikeMarkdownDocument(source)) return;
          change.cancel();
          // CodeMirror must finish its transaction before the dialog takes focus.
          queueMicrotask(() => importCallback.current(source));
        };
        editor.on('beforeChange', beforeChange);
        return () => editor.off('beforeChange', beforeChange);
      },
    };
    return [gfm(), highlight(), localImagePreview(kind, slug), documentPaste];
  }, [kind, slug]);
  return <Editor value={value} onChange={onChange} mode={compact ? 'tab' : 'split'} plugins={plugins} locale={zhHans} uploadImages={uploadImages} placeholder="从读者遇到的问题开始，再写清楚步骤和结果…" />;
}
