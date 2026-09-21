import { Inject, Injectable } from "@nestjs/common";
import type { ChatRequest, ProviderInfo } from "../../shared/contracts/chat";
import {
  getProviders,
  publicProvider,
  type ProviderConfig,
} from "./providers.config";
import { streamUpstream } from "./upstream";

export const MODEL_PROVIDER_OPTIONS = Symbol("MODEL_PROVIDER_OPTIONS");

export interface ModelProviderOptions {
  env?: NodeJS.ProcessEnv;
  fetcher?: typeof fetch;
}

@Injectable()
export class ModelProvidersService {
  private readonly configurations: ProviderConfig[];
  private readonly fetcher: typeof fetch;

  constructor(@Inject(MODEL_PROVIDER_OPTIONS) options: ModelProviderOptions) {
    this.configurations = getProviders(options.env);
    this.fetcher = options.fetcher ?? fetch;
  }

  list(): ProviderInfo[] {
    return [
      { id: "local", name: "本地样例", configured: true, models: ["sample"] },
      ...this.configurations.map(publicProvider),
    ];
  }

  find(id: ChatRequest["provider"]) {
    return this.configurations.find((provider) => provider.id === id);
  }

  stream(
    config: ProviderConfig,
    request: ChatRequest,
    systemPrompt: string,
    signal: AbortSignal,
    onUpstreamHeaders?: (status: number) => void,
  ) {
    return streamUpstream(
      config,
      request,
      systemPrompt,
      signal,
      this.fetcher,
      onUpstreamHeaders,
    );
  }
}
