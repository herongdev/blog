import { SearchRuntime } from './runtime.mjs';
let runtime;
let signature;
self.onmessage = async ({ data }) => {
  try {
    const nextSignature = JSON.stringify(data.config);
    if (!runtime || signature !== nextSignature) {
      runtime = new SearchRuntime(data.config);
      signature = nextSignature;
    }
    const result = await runtime.search(data.query, data.options);
    self.postMessage({ id: data.id, result });
  } catch (error) {
    self.postMessage({ id: data.id, error: error instanceof Error ? error.message : '搜索暂时不可用，请重试。' });
  }
};
