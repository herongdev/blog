/** Bounded, conversation-local UI memory; never retain message bodies or attachments. */
export class MessageViewCache {
  private entries = new Map<string, boolean | number>();
  constructor(private limit = 200) {}
  get<T extends boolean | number>(key: string, fallback: T): T {
    const value = this.entries.get(key);
    if (value === undefined) return fallback;
    this.entries.delete(key);
    this.entries.set(key, value);
    return value as T;
  }
  set(key: string, value: boolean | number) {
    this.entries.delete(key);
    this.entries.set(key, value);
    if (this.entries.size > this.limit)
      this.entries.delete(this.entries.keys().next().value!);
  }
}
