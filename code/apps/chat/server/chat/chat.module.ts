import { Module, type DynamicModule } from "@nestjs/common";
import { ModelProvidersModule } from "../model-providers/model-providers.module";
import type { ModelProviderOptions } from "../model-providers/model-providers.service";
import { ChatController } from "./chat.controller";
import {
  CHAT_STREAM_TIMEOUT,
  CHAT_MAX_ACTIVE_GENERATIONS,
} from "./chat.policy";
import {
  DEFAULT_CHAT_TIMEOUT_MS,
  DEFAULT_MAX_ACTIVE_GENERATIONS,
} from "../common/runtime-config";
import { ChatService } from "./chat.service";
import { GenerationCapacity } from "./generation-capacity.service";

export interface ChatModuleOptions extends ModelProviderOptions {
  chatTimeoutMs?: number;
  maxActiveGenerations?: number;
}

@Module({})
export class ChatModule {
  static register(options: ChatModuleOptions): DynamicModule {
    return {
      module: ChatModule,
      imports: [ModelProvidersModule.register(options)],
      controllers: [ChatController],
      providers: [
        ChatService,
        GenerationCapacity,
        {
          provide: CHAT_STREAM_TIMEOUT,
          useValue: options.chatTimeoutMs ?? DEFAULT_CHAT_TIMEOUT_MS,
        },
        {
          provide: CHAT_MAX_ACTIVE_GENERATIONS,
          useValue:
            options.maxActiveGenerations ?? DEFAULT_MAX_ACTIVE_GENERATIONS,
        },
      ],
    };
  }
}
