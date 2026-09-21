import { Module, type DynamicModule } from "@nestjs/common";
import { ModelProvidersController } from "./model-providers.controller";
import {
  MODEL_PROVIDER_OPTIONS,
  ModelProvidersService,
  type ModelProviderOptions,
} from "./model-providers.service";

@Module({})
export class ModelProvidersModule {
  static register(options: ModelProviderOptions): DynamicModule {
    return {
      module: ModelProvidersModule,
      controllers: [ModelProvidersController],
      providers: [
        { provide: MODEL_PROVIDER_OPTIONS, useValue: options },
        ModelProvidersService,
      ],
      exports: [ModelProvidersService],
    };
  }
}
