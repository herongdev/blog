import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import type { ChatRequest } from "../../shared/contracts/chat";
import { ModelProvidersService } from "../model-providers/model-providers.service";
import { supportsImages } from "../../shared/contracts/images";
import { CHAT_SYSTEM_PROMPT } from "./chat.policy";

@Injectable()
export class ChatService {
  constructor(
    @Inject(ModelProvidersService)
    private readonly providers: ModelProvidersService,
  ) {}

  // Validate synchronously, before the transport commits the SSE response headers.
  stream(
    request: ChatRequest,
    signal: AbortSignal,
    onUpstreamHeaders?: (status: number) => void,
  ) {
    const config = this.providers.find(request.provider);
    if (!config)
      throw new BadRequestException("所选模型来源不可用，请刷新页面后重试。");
    if (!config.configured) {
      throw new ServiceUnavailableException(
        `${config.name} 尚未配置 API Key，请在服务端配置后重启服务。`,
      );
    }
    if (!config.models.includes(request.model)) {
      throw new BadRequestException("所选模型未配置，请刷新页面后重试。");
    }
    if (request.messages.at(-1)?.role !== "user") {
      throw new BadRequestException("最后一条消息必须是用户问题。");
    }
    if (
      request.messages.some((message) => message.images?.length) &&
      !supportsImages(request.provider, request.model)
    ) {
      throw new BadRequestException("当前模型不支持图片，请选择视觉模型。");
    }
    return this.providers.stream(
      config,
      request,
      CHAT_SYSTEM_PROMPT,
      signal,
      onUpstreamHeaders,
    );
  }
}
