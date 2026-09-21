import { createServer } from "node:http";

const requests = [];
const server = createServer(async (request, response) => {
  if (request.url === "/stats") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(requests));
    return;
  }
  if (request.url !== "/v1/chat/completions" || request.method !== "POST") {
    response.writeHead(404).end();
    return;
  }
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const body = JSON.parse(Buffer.concat(chunks).toString());
  const mode = body.messages.at(-1).content;
  const record = { mode, completed: false, closed: false };
  requests.push(record);
  let timer;
  response.on("close", () => {
    record.closed = true;
    clearTimeout(timer);
  });
  if (mode === "error") {
    response.writeHead(500).end("private-test-upstream-detail");
    return;
  }
  response.writeHead(200, { "Content-Type": "text/event-stream" });
  response.write(
    'data: {"choices":[{"delta":{"content":"container answer"}}]}\n\n',
  );
  if (mode === "success") {
    timer = setTimeout(() => {
      record.completed = true;
      response.end(
        'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
      );
    }, 700);
  }
});
server.listen(4010, "0.0.0.0");
