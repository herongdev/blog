import { BadRequestException, type PipeTransform } from "@nestjs/common";
import {
  chatRequestSchema,
  type ChatRequest,
} from "../../shared/contracts/chatRequestSchema";

export class ChatRequestPipe implements PipeTransform<unknown, ChatRequest> {
  transform(value: unknown): ChatRequest {
    const parsed = chatRequestSchema.safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException("请求格式不正确，请检查输入与模型配置。");
    }
    return parsed.data;
  }
}
