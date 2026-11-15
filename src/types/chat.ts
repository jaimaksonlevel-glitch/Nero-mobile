export type MessageRole = "assistant" | "user";

export type NeroSource = {
  title: string;
  url: string;
};

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: Date;
  sources?: NeroSource[];
};

export type NeroReply = {
  reply: string;
  sources: NeroSource[];
};
