import { Controller, Get, Inject } from "@nestjs/common";
import { ModelProvidersService } from "./model-providers.service";

@Controller("providers")
export class ModelProvidersController {
  constructor(
    @Inject(ModelProvidersService)
    private readonly providers: ModelProvidersService,
  ) {}

  @Get()
  list() {
    return { providers: this.providers.list() };
  }
}
