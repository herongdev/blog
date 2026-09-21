import { Inject, Injectable } from "@nestjs/common";
import { CHAT_MAX_ACTIVE_GENERATIONS } from "./chat.policy";

@Injectable()
export class GenerationCapacity {
  private active = 0;

  constructor(
    @Inject(CHAT_MAX_ACTIVE_GENERATIONS) private readonly maximum: number,
  ) {}

  acquire(): (() => void) | undefined {
    if (this.active >= this.maximum) return;
    this.active++;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.active--;
    };
  }
}
