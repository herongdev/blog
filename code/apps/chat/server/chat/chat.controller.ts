import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Res,
} from "@nestjs/common";
import type { Response } from "express";
import type { ChatRequest } from "../../shared/contracts/chat";
import { requestTrace } from "../http/request-diagnostics";
import { sendChatStream } from "../http/sse";
import { ChatRequestPipe } from "./chat-request.pipe";
import { CHAT_STREAM_TIMEOUT } from "./chat.policy";
import { ChatService } from "./chat.service";
import { GenerationCapacity } from "./generation-capacity.service";

@Controller("chat")
export class ChatController {
  constructor(
    @Inject(ChatService) private readonly chat: ChatService,
    @Inject(CHAT_STREAM_TIMEOUT) private readonly timeoutMs: number,
    @Inject(GenerationCapacity) private readonly capacity: GenerationCapacity,
  ) {}

  @Post()
  async stream(
    @Body(new ChatRequestPipe()) request: ChatRequest,
    @Res() response: Response,
  ) {
    const release = this.capacity.acquire();
    if (!release) {
      response.setHeader("Retry-After", "1");
      throw new HttpException("当前生成任务较多，请稍后重试。", 429);
    }
    try {
      await sendChatStream(
        response,
        (signal) => {
          const trace = requestTrace(response);
          const events = this.chat.stream(
            request,
            signal,
            trace?.upstreamHeaders,
          );
          trace?.accept(request);
          return events;
        },
        this.timeoutMs,
      );
    } finally {
      // Includes validation failures before SSE, disconnects and upstream errors.
      release();
    }
  }
}
