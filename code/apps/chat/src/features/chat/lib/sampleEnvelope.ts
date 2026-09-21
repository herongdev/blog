import { z } from "zod";

const reference = z.object({
  id: z.string().min(1),
  title: z.string(),
  content: z.string(),
  link: z.string(),
  web: z
    .object({ media: z.string().optional(), icon: z.string().optional() })
    .optional(),
});
const envelope = z
  .object({
    event: z.string(),
    data: z.object({
      event: z.string().optional(),
      content: z.string().optional(),
      index: z.number().int().nonnegative().optional(),
      raw: z.string().optional(),
      recordId: z.string().optional(),
      reference: z.array(reference).optional(),
      tool: z
        .object({
          id: z.string().min(1),
          key: z.string().optional(),
          result: z.string().optional(),
          call: z
            .object({
              function: z
                .object({
                  name: z.string().optional(),
                  arguments: z.string().optional(),
                })
                .optional(),
            })
            .optional(),
        })
        .optional(),
    }),
  })
  .superRefine(({ data }, context) => {
    if (data.raw === "[DONE]") return;
    const kind = data.event;
    const missing =
      !kind ||
      (["content", "reasoning_content", "title", "timer_finished"].includes(
        kind,
      ) &&
        data.content === undefined) ||
      (kind === "reference" && !data.reference) ||
      (["call_tool", "tool_stream", "tool_result"].includes(kind) &&
        !data.tool) ||
      (kind === "assistant_record_id" && !data.recordId);
    if (missing)
      context.addIssue({ code: "custom", message: "Missing event payload" });
  });

export type SampleEnvelope = z.infer<typeof envelope>;

/** Validate before replay; unknown event names remain compatible and the adapter ignores them. */
export function parseSample(value: unknown): SampleEnvelope[] {
  const result = z.array(envelope).safeParse(value);
  if (!result.success) throw new Error("本地样例格式不正确。");
  return result.data;
}
