export type MessageRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: Date;
};
