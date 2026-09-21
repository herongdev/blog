import type { Locale } from "./catalog";

// Compatibility adapter for existing app-owned errors. The wire protocol keeps raw
// diagnostic text; only notices are localized, never user/model/source content.
const notices: Record<string, string> = {
  "发送请求超时，请检查网络或减少附件后重试。":
    "Sending the request timed out. Check your network or reduce attachments, then retry.",
  "当前生成任务较多，请稍后重试。":
    "All generation slots are busy. Please try again shortly.",
  "请求来源与当前站点不匹配。": "The request origin does not match this site.",
  "当前问题或附件过大，请缩短内容后重试。":
    "The current question or attachments are too large. Shorten the content and retry.",
  "图片附件无法读取，请重新添加。":
    "Could not read the image attachment. Please add it again.",
  "收到无法解析的消息数据，请重试。":
    "Received unreadable message data. Please retry.",
  "消息数据格式不符合约定，请刷新页面后重试。":
    "The message format is invalid. Refresh the page and retry.",
  "仅允许本机页面访问。": "Access is limited to the local application.",
  "等待模型响应超时，请稍后重试。":
    "The model response timed out. Please try again.",
  "无法连接模型服务，请检查网络与接口地址。":
    "Could not connect to the model service. Check your network and API endpoint.",
  "生成失败，请稍后重试。": "Generation failed. Please try again later.",
  "流式数据缓冲超过限制，请重试或缩小问题范围。":
    "The stream exceeded its buffer limit. Retry or narrow your question.",
  "请求体无效或对话过长，请新建对话后重试。":
    "The request is invalid or the conversation is too long. Start a new conversation.",
  "服务暂时不可用，请稍后重试。":
    "The service is temporarily unavailable. Please try again.",
  "模型服务拒绝了访问，请检查 API Key、地域与模型权限。":
    "The model service denied access. Check your API key, region, and model permissions.",
  "模型账户额度不足，请检查账户余额。":
    "Your model account has insufficient credit. Check your balance.",
  "请求过于频繁或额度受限，请稍后重试。":
    "Too many requests or a quota limit was reached. Please try again later.",
  "模型或请求配置不可用，请检查模型名称、接口地址与思考模式支持。":
    "The model or request configuration is unavailable. Check the model name, endpoint, and thinking mode support.",
  "模型服务没有返回预期的流式数据，请检查接口地址。":
    "The model service did not return the expected stream. Check the API endpoint.",
  "模型返回了无法解析的数据，请重试。":
    "The model returned unreadable data. Please retry.",
  "模型生成失败，请检查账户额度、模型配置后重试。":
    "Model generation failed. Check your quota and model settings, then retry.",
  "回答达到模型输出上限，已保留生成的内容。请缩小问题范围后重试。":
    "The answer reached the model output limit. Generated content has been kept. Narrow your question and retry.",
  "模型服务未能完成这次回答，请调整问题后重试。":
    "The model could not finish this answer. Adjust your question and retry.",
  "该模型请求执行工具，当前聊天接口尚未配置工具。":
    "The model requested a tool, but tools are not configured for this chat endpoint.",
  "本地服务未连接，请确认已运行 npm run dev。":
    "The local server is offline. Make sure npm run dev is running.",
  "模型配置数据格式异常，请检查本地服务后重试。":
    "The model configuration is invalid. Check the local server and try again.",
  "读取模型配置失败。": "Could not load model settings.",
  "连接暂时中断了。这是异常演示，你可以重试或切换样例。":
    "Connection interrupted. This is an error demo; retry or choose another sample.",
  "本地样例加载失败，请检查附件文件是否存在。":
    "Could not load the local sample. Check that the attachment exists.",
  "本地样例格式不正确。": "The local sample format is invalid.",
  "无法连接本地服务，请稍后重试。":
    "Could not connect to the local server. Please try again.",
  "本地服务没有返回流式消息，请检查服务是否正常启动。":
    "The local server did not return a message stream. Check that it is running.",
  "浏览器未收到响应数据。": "The browser received no response data.",
  "连接在回答完成前中断，已保留收到的内容，请重试。":
    "The connection ended before the answer was complete. Received content has been kept. Please retry.",
  "回答意外中断，请重试。": "The answer was interrupted. Please retry.",
  "生成失败，请重试。": "Generation failed. Please retry.",
  "请求格式不正确，请检查输入与模型配置。":
    "The request is invalid. Check your input and model settings.",
  "所选模型来源不可用，请刷新页面后重试。":
    "The selected provider is unavailable. Refresh the page and retry.",
  "所选模型未配置，请刷新页面后重试。":
    "The selected model is not configured. Refresh the page and retry.",
  "最后一条消息必须是用户问题。": "The last message must be a user question.",
};
export function translateNotice(locale: Locale, message: string): string {
  if (locale !== "en") return message;
  const http = /^模型服务暂时不可用（HTTP (\d{3})），请稍后重试。$/.exec(
    message,
  );
  if (http)
    return `The model service is temporarily unavailable (HTTP ${http[1]}). Please try again.`;
  const missingKey =
    /^(.*?) 尚未配置 API Key，请在(?: \.env\.local 中|服务端)配置后重启服务。$/.exec(
      message,
    );
  if (missingKey)
    return `${missingKey[1] === "阿里云百炼" ? "Alibaba Cloud Bailian" : missingKey[1]} has no API key configured. Update the server configuration and restart it.`;
  return notices[message] ?? message;
}
