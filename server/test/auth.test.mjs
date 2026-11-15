import test from "node:test";
import assert from "node:assert/strict";
import { authenticateRequest } from "../auth.mjs";

const authEnvKeys = ["AUTH_ISSUER", "AUTH_AUDIENCE", "AUTH_JWKS_URL"];

function withEnv(values, callback) {
  const previous = Object.fromEntries(authEnvKeys.map((key) => [key, process.env[key]]));
  for (const key of authEnvKeys) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try {
    return callback();
  } finally {
    for (const key of authEnvKeys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}

test("private endpoints fail closed when OIDC is not configured", async () => {
  const result = await withEnv({}, () => authenticateRequest({ headers: {} }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
});

test("private endpoints reject requests without a bearer token", async () => {
  const result = await withEnv({
    AUTH_ISSUER: "https://identity.example/",
    AUTH_AUDIENCE: "nero-api",
    AUTH_JWKS_URL: "https://identity.example/.well-known/jwks.json"
  }, () => authenticateRequest({ headers: {} }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 401);
});

test("remote JWKS endpoints cannot use plain HTTP", async () => {
  const result = await withEnv({
    AUTH_ISSUER: "https://identity.example/",
    AUTH_AUDIENCE: "nero-api",
    AUTH_JWKS_URL: "http://identity.example/.well-known/jwks.json"
  }, () => authenticateRequest({ headers: {} }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
});
