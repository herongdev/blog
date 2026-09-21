import {
  Catch,
  HttpException,
  type ArgumentsHost,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Response } from "express";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    if (response.headersSent || response.destroyed) return;
    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({ error: error.message });
      return;
    }
    const type =
      error && typeof error === "object" && "type" in error
        ? error.type
        : undefined;
    if (type === "entity.too.large" || type === "entity.parse.failed") {
      response
        .status(type === "entity.too.large" ? 413 : 400)
        .json({ error: "请求体无效或对话过长，请新建对话后重试。" });
      return;
    }
    response.status(500).json({ error: "服务暂时不可用，请稍后重试。" });
  }
}
