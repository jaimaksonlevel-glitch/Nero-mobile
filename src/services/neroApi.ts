import type { ChatMessage, NeroReply } from "../types/chat";
import { supabase } from "./supabase";

const API_URL = process.env.EXPO_PUBLIC_NERO_API_URL?.replace(/\/$/, "");

export class NeroApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NeroApiError";
  }
}

async function getAuthorizationHeader(): Promise<Record<string, string>> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.access_token) {
    throw new NeroApiError("Sua sessão expirou. Entre novamente para continuar.");
  }
  return { Authorization: `Bearer ${data.session.access_token}` };
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

  const authorization = await getAuthorizationHeader();
  let response: Response;
  try {
    response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authorization },
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

export async function transcribeAudio(uri: string): Promise<string> {
  if (!API_URL) {
    throw new NeroApiError(
      "A conexão com o serviço de transcrição ainda não foi configurada."
    );
  }

  const form = new FormData();
  form.append("audio", {
    uri,
    name: "nero-audio.m4a",
    type: "audio/mp4"
  } as unknown as Blob);

  const authorization = await getAuthorizationHeader();
  let response: Response;
  try {
    response = await fetch(`${API_URL}/transcribe`, {
      method: "POST",
      headers: authorization,
      body: form
    });
  } catch {
    throw new NeroApiError(
      "Não consegui enviar o áudio. Verifique sua conexão e tente novamente."
    );
  }

  const data = (await response.json().catch(() => ({}))) as {
    text?: string;
    error?: string;
  };

  if (!response.ok || !data.text?.trim()) {
    throw new NeroApiError(
      data.error || "O serviço não conseguiu transcrever o áudio."
    );
  }

  return data.text.trim();
}
