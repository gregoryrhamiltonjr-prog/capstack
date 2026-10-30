// Read-only HTTP checks against an already-running LOCAL production build.
// Intentionally fixed to loopback: never use this script to probe live accounts.
import assert from "node:assert/strict";

const base = "http://127.0.0.1:3100";
let checks = 0;

for (const pathname of ["/", "/login", "/robots.txt", "/sitemap.xml"]) {
  const response = await fetch(`${base}${pathname}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${pathname} should load`);
  console.log(`PASS GET ${pathname}: 200`);
  checks++;
}

for (const pathname of ["/api/fix-title", "/api/upsert-curriculum"]) {
  for (const method of ["GET", "POST"]) {
    const response = await fetch(`${base}${pathname}`, { method, redirect: "manual" });
    assert.equal(response.status, 410, `${method} ${pathname} should be retired`);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      error: "This maintenance endpoint has been retired.",
    });
    console.log(`PASS ${method} ${pathname}: 410, no-store`);
    checks++;
  }
}

for (const pathname of ["/dashboard", "/admin/waitlist"]) {
  const response = await fetch(`${base}${pathname}`, { redirect: "manual" });
  assert.equal(response.status, 307, `${pathname} must reject anonymous visitors`);
  assert.equal(new URL(response.headers.get("location"), base).pathname, "/login");
  console.log(`PASS anonymous GET ${pathname}: redirected to login`);
  checks++;
}

if (!process.env.DATABASE_URL || !(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)) {
  for (const [pathname, method] of [["/api/auth/session", "GET"], ["/api/mobile/login", "POST"]]) {
    const response = await fetch(`${base}${pathname}`, { method, redirect: "manual" });
    assert.equal(response.status, 503, `${pathname} must fail closed when unconfigured`);
    assert.equal(response.headers.get("cache-control"), "no-store");
    console.log(`PASS unconfigured ${method} ${pathname}: 503, no-store`);
    checks++;
  }
  const login = await fetch(`${base}/login`);
  const html = await login.text();
  assert.doesNotMatch(html, /<form|type="password"/);
  console.log("PASS unconfigured login does not collect credentials");
  checks++;
}

console.log(`${checks} local production smoke checks passed.`);
