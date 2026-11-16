import { supabase } from "../config/supabase";

type NeroReply = {
  ok: boolean;
  reply?: string;
  conversation_id?: string;
  provider?: string;
  error?: string;
};

export async function sendToNero(message: string, conversationId: string | null) {
  const { data, error } = await supabase.functions.invoke("continuum-core", {
    body: {
      action: "chat",
      message,
      agent: "nero",
      provider: "auto",
      ...(conversationId ? { conversation_id: conversationId } : {})
    }
  });

  if (error) throw new Error("Falha na conexão com a Nero Continuum: " + error.message);
  const result = data as NeroReply | null;
  if (!result?.ok || typeof result.reply !== "string" || !result.conversation_id) {
    throw new Error(result?.error || "O backend retornou uma resposta inválida.");
  }

  return {
    text: result.reply,
    conversationId: result.conversation_id,
    provider: result.provider || "desconhecido"
  };
}
