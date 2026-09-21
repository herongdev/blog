import {
  EventSourceParserStream,
  ParseError,
} from "../../third_party/eventsource-parser/stream";

/** Decode bytes, then frame complete SSE events; business JSON is validated by the consumer. */
export async function* readSSE(
  body: ReadableStream<Uint8Array>,
  { maxBufferSize = 1_048_576 }: { maxBufferSize?: number } = {},
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  const decode = new TransformStream<Uint8Array, string>({
    transform(bytes, controller) {
      controller.enqueue(decoder.decode(bytes, { stream: true }));
    },
    flush(controller) {
      controller.enqueue(decoder.decode());
    },
  });
  // The parser handles LF/CRLF/CR, comments, BOM and split fields. The cap is in characters.
  const reader = body
    .pipeThrough(decode)
    .pipeThrough(new EventSourceParserStream({ maxBufferSize }))
    .getReader();
  let ended = false;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        ended = true;
        return;
      }
      yield value.data;
    }
  } catch (error) {
    if (error instanceof ParseError)
      throw new Error("流式数据缓冲超过限制，请重试或缩小问题范围。", {
        cause: error,
      });
    throw error;
  } finally {
    // Early consumer exit (done/error/stop) cancels the entire pipe back to fetch.
    if (!ended) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
