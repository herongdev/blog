import SearchWorker from "./chatSearch.worker?worker&inline";
import type { ChatSearchResults } from "../lib/searchConversations";
import type { SearchDocument } from "../lib/conversationSummary";

export class ChatSearchClient {
  private worker?: Worker;
  private sequence = 0;
  private cancel?: () => void;
  async query(
    query: string,
    offset: number,
    overrides: SearchDocument[],
    signal: AbortSignal,
  ): Promise<ChatSearchResults> {
    this.cancel?.();
    if (signal.aborted)
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    this.worker ??= new SearchWorker();
    const worker = this.worker;
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        signal.removeEventListener("abort", abort);
        worker.removeEventListener("message", message);
        worker.removeEventListener("error", error);
        if (this.cancel === abort) this.cancel = undefined;
      };
      const abort = () => {
        cleanup();
        worker.postMessage({ id: ++this.sequence, cancel: true });
        reject(new DOMException("Aborted", "AbortError"));
      };
      const error = () => {
        cleanup();
        this.worker?.terminate();
        this.worker = undefined;
        reject(new Error("Search unavailable"));
      };
      const message = (
        event: MessageEvent<{
          id: number;
          results: ChatSearchResults;
          error?: boolean;
        }>,
      ) => {
        if (event.data.id !== id) return;
        cleanup();
        if (event.data.error) reject(new Error("Search unavailable"));
        else resolve(event.data.results);
      };
      this.cancel = abort;
      signal.addEventListener("abort", abort, { once: true });
      worker.addEventListener("message", message);
      worker.addEventListener("error", error);
      worker.postMessage({ id, query, offset, overrides });
    });
  }
  close() {
    this.cancel?.();
    this.worker?.terminate();
    this.worker = undefined;
  }
}
