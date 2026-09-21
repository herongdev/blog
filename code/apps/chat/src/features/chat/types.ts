import type {
  ActivityStatus,
  ProviderId,
  Reference,
} from "@shared/contracts/chat";

export interface ImageAttachment {
  kind: "image";
  id: string;
  name: string;
  dataUrl: string;
  assetId?: string;
  encodedSize?: number;
  width: number;
  height: number;
}
export interface TextAttachment {
  id: string;
  name: string;
  content: string;
}
export type Attachment = TextAttachment | ImageAttachment;
export function isImageAttachment(file: Attachment): file is ImageAttachment {
  return "kind" in file && file.kind === "image";
}

export type Scenario = "sample" | "markdown" | "error" | "empty";

export type MessageStatus =
  "waiting" | "streaming" | "complete" | "stopped" | "error" | "empty";

export interface Activity {
  id: string;
  kind: "reasoning" | "tool";
  title: string;
  content: string;
  status: ActivityStatus;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: MessageStatus;
  activities: Activity[];
  references: Record<string, Reference>;
  createdAt: number;
  finishedAt?: number;
  sourceDurationMs?: number;
  error?: string;
  recordId?: string;
  requestId?: string;
  requestStage?: "preparing" | "sending" | "waiting";
  interrupted?: boolean;
  contextLimited?: boolean;
  images?: ImageAttachment[];
}

export interface ChatProject {
  revision?: string;
  pinnedAt?: number;
  deleted?: boolean;
  id: string;
  name: string;
  createdAt: number;
}

export interface Conversation {
  /** Live catalog metadata only; never restored as a running request. */
  generating?: boolean;
  /** Summary placeholders must be hydrated before editing or generating. */
  unloaded?: boolean;
  messageCount?: number;
  projectId?: string;
  id: string;
  title: string;
  titleEdited?: boolean;
  pinnedAt?: number;
  archived?: boolean;
  deleted?: boolean;
  provider: ProviderId;
  model: string;
  messages: ChatMessage[];
  hasDraft?: boolean;
  draft?: string;
  attachments?: Attachment[];
}

export interface StreamOptions {
  signal: AbortSignal;
  scenario: Scenario;
  speed: number;
}

export interface ConversationCatalog {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => Conversation[];
}
