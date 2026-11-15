export class RequestError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "RequestError";
    this.statusCode = statusCode;
  }
}

export class RateLimiter {
  constructor({ windowMs = 60_000, maxEntries = 10_000 } = {}) {
    this.windowMs = windowMs;
    this.maxEntries = maxEntries;
    this.entries = new Map();
  }

  consume(key, limit, now = Date.now()) {
    let entry = this.entries.get(key);
    if (!entry || now - entry.startedAt >= this.windowMs) {
      entry = { startedAt: now, count: 0 };
    }
    entry.count += 1;
    this.entries.set(key, entry);

    if (this.entries.size > this.maxEntries) {
      for (const [candidate, value] of this.entries) {
        if (now - value.startedAt >= this.windowMs) this.entries.delete(candidate);
      }
      while (this.entries.size > this.maxEntries) {
        this.entries.delete(this.entries.keys().next().value);
      }
    }

    const allowed = entry.count <= limit;
    return {
      allowed,
      retryAfterSeconds: allowed
        ? 0
        : Math.max(1, Math.ceil((this.windowMs - (now - entry.startedAt)) / 1000))
    };
  }
}

export function parseChatMessages(value) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 40) {
    throw new RequestError("Envie entre 1 e 40 mensagens.");
  }
  const messages = value.slice(-12).map((item) => {
    if (!item || !["user", "assistant"].includes(item.role) ||
        typeof item.content !== "string" || item.content.trim().length === 0 ||
        item.content.length > 6000) {
      throw new RequestError("Formato de mensagem inválido.");
    }
    return { role: item.role, content: item.content };
  });
  if (messages[messages.length - 1].role !== "user") {
    throw new RequestError("A última mensagem precisa ser do usuário.");
  }
  return messages;
}

export function extractReplyAndSources(outputItems) {
  const items = Array.isArray(outputItems) ? outputItems : [];
  const content = items
    .filter((item) => item?.type === "message")
    .flatMap((item) => Array.isArray(item.content) ? item.content : []);
  const reply = content
    .filter((item) => item?.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\\n")
    .trim();
  const sources = content
    .flatMap((item) => Array.isArray(item.annotations) ? item.annotations : [])
    .filter((item) => item?.type === "url_citation" &&
      typeof item.url === "string" && /^https?:\\/\\//i.test(item.url))
    .map((item) => ({
      title: typeof item.title === "string" ? item.title.slice(0, 300) : item.url,
      url: item.url
    }))
    .filter((source, index, all) =>
      all.findIndex((candidate) => candidate.url === source.url) === index
    )
    .slice(0, 8);
  return { reply, sources };
}

export const ALLOWED_AUDIO_TYPES = new Set([
  "audio/mp4",
  "audio/m4a",
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/webm",
  "audio/ogg"
]);
