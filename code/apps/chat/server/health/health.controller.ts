import { Controller, Get } from "@nestjs/common";

@Controller("healthz")
export class HealthController {
  @Get()
  health() {
    // Application readiness only: never spend tokens or disclose provider config.
    return { status: "ok" };
  }
}
