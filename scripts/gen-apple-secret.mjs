// Generate the Apple "Sign in with Apple" client secret (an ES256 JWT).
// Apple requires this instead of a static secret; it expires in ≤6 months, so
// re-run before expiry and update AUTH_APPLE_SECRET.
//
// Usage:
//   APPLE_TEAM_ID=ABCDE12345 \
//   APPLE_KEY_ID=XYZ1234567 \
//   APPLE_SERVICES_ID=app.capstack.web \
//   APPLE_KEY_PATH=./AuthKey_XYZ1234567.p8 \
//   node scripts/gen-apple-secret.mjs
//
// AUTH_APPLE_ID = the Services ID.  AUTH_APPLE_SECRET = the JWT this prints.
import { readFileSync } from "node:fs";
import { SignJWT, importPKCS8 } from "jose";

const teamId = process.env.APPLE_TEAM_ID;
const keyId = process.env.APPLE_KEY_ID;
const servicesId = process.env.APPLE_SERVICES_ID;
const keyPath = process.env.APPLE_KEY_PATH;

const missing = ["APPLE_TEAM_ID", "APPLE_KEY_ID", "APPLE_SERVICES_ID", "APPLE_KEY_PATH"].filter(
  (k) => !process.env[k]
);
if (missing.length) {
  console.error("✗ Missing env: " + missing.join(", "));
  process.exit(1);
}

const pkcs8 = readFileSync(keyPath, "utf8");
const key = await importPKCS8(pkcs8, "ES256");

// Apple caps client-secret lifetime at 6 months (15777000s). Use just under.
const now = Math.floor(Date.now() / 1000);
const exp = now + 60 * 60 * 24 * 180; // 180 days

const jwt = await new SignJWT({})
  .setProtectedHeader({ alg: "ES256", kid: keyId })
  .setIssuer(teamId)
  .setIssuedAt(now)
  .setExpirationTime(exp)
  .setAudience("https://appleid.apple.com")
  .setSubject(servicesId)
  .sign(key);

console.log("\nAUTH_APPLE_ID (Services ID):");
console.log(servicesId);
console.log("\nAUTH_APPLE_SECRET (JWT, expires " + new Date(exp * 1000).toISOString().slice(0, 10) + "):");
console.log(jwt);
console.log("\nSet both in .env and Vercel, then redeploy.");
