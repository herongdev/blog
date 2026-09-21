import { Module, type DynamicModule } from "@nestjs/common";
import { ChatModule, type ChatModuleOptions } from "./chat/chat.module";
import { HealthController } from "./health/health.controller";

@Module({})
export class AppModule {
  static register(options: ChatModuleOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [ChatModule.register(options)],
      controllers: [HealthController],
    };
  }
}
