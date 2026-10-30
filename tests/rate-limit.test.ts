import assert from "node:assert/strict";
import test from "node:test";
import { rateLimit, clientIpFromHeaders } from "../src/lib/rate-limit";

test("a bucket allows its limit and rejects the next attempt", () => {
  const key = "test:limit";
  assert.deepEqual(rateLimit(key, { limit: 2, windowMs: 60_000 }), { ok: true });
  assert.deepEqual(rateLimit(key, { limit: 2, windowMs: 60_000 }), { ok: true });
  const denied = rateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(denied.ok, false);
  if (!denied.ok) assert.ok(denied.retryAfterSec >= 1 && denied.retryAfterSec <= 60);
});

test("different bucket keys are independent", () => {
  assert.deepEqual(rateLimit("test:key-a", { limit: 1, windowMs: 60_000 }), { ok: true });
  assert.deepEqual(rateLimit("test:key-b", { limit: 1, windowMs: 60_000 }), { ok: true });
});

test("the rate limit resets at expiry", (t) => {
  t.mock.method(Date, "now", () => 1_000);
  const key = "test:expiry";
  assert.deepEqual(rateLimit(key, { limit: 1, windowMs: 1_000 }), { ok: true });
  assert.equal(rateLimit(key, { limit: 1, windowMs: 1_000 }).ok, false);
  t.mock.method(Date, "now", () => 2_000);
  assert.deepEqual(rateLimit(key, { limit: 1, windowMs: 1_000 }), { ok: true });
});

test("IP extraction handles forwarded chains, fallback and missing headers", () => {
  assert.equal(clientIpFromHeaders(new Headers({ "x-forwarded-for": "192.0.2.1, 192.0.2.2" })), "192.0.2.1");
  assert.equal(clientIpFromHeaders(new Headers({ "x-real-ip": "192.0.2.3" })), "192.0.2.3");
  assert.equal(clientIpFromHeaders(new Headers()), "unknown");
});
