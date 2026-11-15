import { createRemoteJWKSet, jwtVerify } from "jose";

let cachedJwks;
let cachedJwksUrl;

function getAuthConfiguration() {
  const issuer = process.env.AUTH_ISSUER;
  const audience = process.env.AUTH_AUDIENCE;
  const jwksUrl = process.env.AUTH_JWKS_URL;
  if (!issuer || !audience || !jwksUrl) return null;

  const parsed = new URL(jwksUrl);
  const localHttp = parsed.protocol === "http:" &&
    ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  if (parsed.protocol !== "https:" && !localHttp) {
    throw new Error("AUTH_JWKS_URL must use HTTPS outside local development.");
  }
  return { issuer, audience, jwksUrl: parsed };
}

export async function authenticateRequest(req) {
  let config;
  try {
    config = getAuthConfiguration();
  } catch {
    return { ok: false, status: 503, error: "A configuração de autenticação do serviço é inválida." };
  }
  if (!config) {
    return { ok: false, status: 503, error: "A autenticação do serviço ainda não foi configurada." };
  }

  const header = req.headers.authorization;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) {
    return { ok: false, status: 401, error: "Autenticação necessária." };
  }
  const token = header.slice(7).trim();
  if (!token || token.length > 8192 || /\s/.test(token)) {
    return { ok: false, status: 401, error: "Token de acesso inválido." };
  }

  try {
    if (!cachedJwks || cachedJwksUrl !== config.jwksUrl.href) {
      cachedJwks = createRemoteJWKSet(config.jwksUrl);
      cachedJwksUrl = config.jwksUrl.href;
    }
    const { payload } = await jwtVerify(token, cachedJwks, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ["RS256", "ES256"]
    });
    if (typeof payload.sub !== "string" || payload.sub.length < 1 || payload.sub.length > 255) {
      return { ok: false, status: 401, error: "Identidade da conta inválida." };
    }
    return {
      ok: true,
      user: {
        id: payload.sub,
        isCreator: Boolean(process.env.CREATOR_SUBJECT) &&
          payload.sub === process.env.CREATOR_SUBJECT
      }
    };
  } catch {
    return { ok: false, status: 401, error: "Sessão inválida ou expirada." };
  }
}
