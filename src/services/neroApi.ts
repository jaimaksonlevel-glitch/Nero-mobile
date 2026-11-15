import type { ChatMessage, NeroReply } from "../types/chat";

const API_URL = process.env.EXPO_PUBLIC_NERO_API_URL?.replace(/\/$/, "");

export class NeroApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NeroApiError";
  }
}

export async function askNero(messages: ChatMessage[]): Promise<NeroReply> {
  if (!API_URL) {
    throw new NeroApiError(
      "A conexão com o cérebro do Nero ainda não foi configurada. O endereço seguro do serviço será definido na etapa de implantação."
    );
  }

  const conversation = messages.slice(-12).map((message) => ({
    role: message.role,
    content: message.text
  }));

  let response: Response;
  try {
    response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation })
    });
  } catch {
    throw new NeroApiError(
      "Não consegui alcançar o serviço do Nero. Verifique sua conexão e tente novamente."
    );
  }

  const data = (await response.json().catch(() => ({}))) as {
    reply?: string;
    sources?: NeroReply["sources"];
    error?: string;
  };

  if (!response.ok || !data.reply) {
    throw new NeroApiError(
      data.error || "O serviço do Nero não conseguiu responder agora."
    );
  }

  return {
    reply: data.reply,
    sources: Array.isArray(data.sources) ? data.sources : []
  };
}
