import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { authenticationUnavailableResponse, isAuthenticationConfigured } from "../src/lib/auth-configuration";
import { AuthUnavailable } from "../src/components/AuthUnavailable";

// Presence-only fixtures: these are not credentials or connection strings.
const present = "test-only-placeholder";

test("authentication fails closed without both database and auth configuration", () => {
  assert.equal(isAuthenticationConfigured({}), false);
  assert.equal(isAuthenticationConfigured({ DATABASE_URL: present }), false);
  assert.equal(isAuthenticationConfigured({ AUTH_SECRET: present }), false);
  assert.equal(isAuthenticationConfigured({ DATABASE_URL: present, AUTH_SECRET: " " }), false);
});

test("current and legacy auth configuration names are accepted", () => {
  assert.equal(isAuthenticationConfigured({ DATABASE_URL: present, AUTH_SECRET: present }), true);
  assert.equal(isAuthenticationConfigured({ DATABASE_URL: present, NEXTAUTH_SECRET: present }), true);
});

test("unconfigured authentication responds with a safe non-cacheable 503", async () => {
  const response = authenticationUnavailableResponse();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("retry-after"), "300");
  assert.deepEqual(await response.json(), { error: "Sign-in is temporarily unavailable in this environment." });
});

test("unconfigured previews do not collect passwords and point explicitly to the live site", () => {
  const html = renderToStaticMarkup(createElement(AuthUnavailable, { preview: true }));
  assert.match(html, /Preview environment/);
  assert.match(html, /href="https:\/\/learncapstack.com\/login"/);
  assert.doesNotMatch(html, /<form|type="password"|DATABASE_URL|AUTH_SECRET/);
});

test("production configuration failures do not leak details or link to a preview", () => {
  const html = renderToStaticMarkup(createElement(AuthUnavailable, { preview: false }));
  assert.match(html, /Sign-in is temporarily unavailable/);
  assert.doesNotMatch(html, /<form|DATABASE_URL|AUTH_SECRET|vercel\.app/);
});
