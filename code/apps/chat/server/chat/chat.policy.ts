export const CHAT_SYSTEM_PROMPT =
  "请使用清晰易读的 Markdown 回答。没有实际检索资料时，不要编造引用编号或声称完成了联网搜索。";

export const CHAT_STREAM_TIMEOUT = Symbol("CHAT_STREAM_TIMEOUT");
export const CHAT_MAX_ACTIVE_GENERATIONS = Symbol(
  "CHAT_MAX_ACTIVE_GENERATIONS",
);
