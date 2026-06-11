export interface PlannedProcessor {
  id: string;
  status: "planned";
}

export const plannedProcessors: PlannedProcessor[] = [
  { id: "pdf-merge", status: "planned" },
  { id: "pdf-split", status: "planned" },
  { id: "image-to-pdf", status: "planned" },
  { id: "image-compress", status: "planned" },
  { id: "mp4-to-gif", status: "planned" }
];
