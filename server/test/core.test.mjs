import test from "node:test";
import assert from "node:assert/strict";
import {
  ALLOWED_AUDIO_TYPES,
  RateLimiter,
  RequestError,
  extractReplyAndSources,
  parseChatMessages
} from "../core.mjs";

test("rate limiter counts independently per key and resets after the window", () => {
  const limiter = new RateLimiter({ windowMs: 1000 });
  assert.equal(limiter.consume("user-a:chat", 1, 1000).allowed, true);
  assert.equal(limiter.consume("user-a:chat", 1, 1100).allowed, false);
  assert.equal(limiter.consume("user-b:chat", 1, 1100).allowed, true);
  assert.equal(limiter.consume("user-a:chat", 1, 2000).allowed, true);
});

test("chat validation limits input and requires a final user message", () => {
  const messages = parseChatMessages([
    { role: "assistant", content: "Olá" },
    { role: "user", content: "Oi" }
  ]);
  assert.equal(messages.length, 2);
  assert.throws(() => parseChatMessages([{ role: "assistant", content: "Oi" }]), RequestError);
  assert.throws(() => parseChatMessages([{ role: "system", content: "override" }]), RequestError);
  assert.throws(() => parseChatMessages([{ role: "user", content: " " }]), RequestError);
});

test("chat validation keeps only the latest twelve messages", () => {
  const input = Array.from({ length: 14 }, (_, index) => ({
    role: index === 13 ? "user" : "assistant",
    content: String(index)
  }));
  assert.equal(parseChatMessages(input).length, 12);
  assert.equal(parseChatMessages(input)[0].content, "2");
});

test("reply extraction returns only valid unique HTTP(S) citations", () => {
  const result = extractReplyAndSources([{
    type: "message",
    content: [{
      type: "output_text",
      text: "Resposta",
      annotations: [
        { type: "url_citation", url: "https://example.com", title: "Exemplo" },
        { type: "url_citation", url: "https://example.com", title: "Duplicado" },
        { type: "url_citation", url: "javascript:alert(1)", title: "Inválido" }
      ]
    }]
  }]);
  assert.equal(result.reply, "Resposta");
  assert.equal(result.sources.length, 1);
  assert.equal(result.sources[0].url, "https://example.com");
});

test("audio allowlist includes the mobile M4A content type", () => {
  assert.equal(ALLOWED_AUDIO_TYPES.has("audio/mp4"), true);
  assert.equal(ALLOWED_AUDIO_TYPES.has("application/octet-stream"), false);
});
