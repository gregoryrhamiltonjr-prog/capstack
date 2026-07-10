// One-shot Stripe setup: creates the CapStack product, $12.99/mo price, and the
// webhook endpoint — then writes STRIPE_PRICE_ID and STRIPE_WEBHOOK_SECRET back
// into .env. Requires STRIPE_SECRET_KEY in .env.
// Usage: npm run stripe:setup   (APP_URL overrides the webhook target)
import Stripe from "stripe";
import { readFileSync, writeFileSync } from "node:fs";

const ENV_PATH = ".env";

function readEnvFile() {
  try {
    return readFileSync(ENV_PATH, "utf8");
  } catch {
    return "";
  }
}

function loadEnv() {
  for (const line of readEnvFile().split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// Update KEY="value" in .env in place, or append if missing.
function writeEnv(key, value) {
  let text = readEnvFile();
  const line = `${key}="${value}"`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(text)) text = text.replace(re, line);
  else text += (text.endsWith("\n") || text === "" ? "" : "\n") + line + "\n";
  writeFileSync(ENV_PATH, text);
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("✗ STRIPE_SECRET_KEY not set. Add it to .env, then re-run: npm run stripe:setup");
  process.exit(1);
}

const stripe = new Stripe(key);
const AMOUNT_CENTS = 1299; // $12.99
const CURRENCY = "usd";
const PRODUCT_NAME = "CapStack Membership";
const APP_URL = (process.env.APP_URL || "https://capstack-sage.vercel.app").replace(/\/$/, "");
const WEBHOOK_URL = `${APP_URL}/api/stripe/webhook`;
const WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.paused",
  "customer.subscription.resumed",
];

const live = key.startsWith("sk_live");
console.log(`Using ${live ? "LIVE" : "TEST"} mode key.\n`);

// ── Product ──
const found = await stripe.products.search({ query: `name:'${PRODUCT_NAME}' AND active:'true'` });
let product = found.data[0];
if (product) console.log(`• Found product ${product.id}`);
else {
  product = await stripe.products.create({
    name: PRODUCT_NAME,
    description: "Full access to CapStack — CRE + High Finance curriculum, social, and Free Roam.",
  });
  console.log(`• Created product ${product.id}`);
}

// ── Price ──
const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
let price = prices.data.find(
  (p) => p.unit_amount === AMOUNT_CENTS && p.currency === CURRENCY && p.recurring?.interval === "month"
);
if (price) console.log(`• Reusing price ${price.id}`);
else {
  price = await stripe.prices.create({
    product: product.id,
    unit_amount: AMOUNT_CENTS,
    currency: CURRENCY,
    recurring: { interval: "month" },
  });
  console.log(`• Created price ${price.id} ($12.99/month)`);
}
writeEnv("STRIPE_PRICE_ID", price.id);

// ── Webhook endpoint ──
const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
const existing = endpoints.data.find((e) => e.url === WEBHOOK_URL);
let webhookSecretNote = "";
if (existing) {
  console.log(`• Webhook already exists (${existing.id}) → ${WEBHOOK_URL}`);
  console.log("  Signing secret is shown only at creation. Keep the existing STRIPE_WEBHOOK_SECRET,");
  console.log("  or delete this endpoint and re-run to mint a new one.");
  webhookSecretNote = "(unchanged — reused existing endpoint)";
} else {
  const wh = await stripe.webhookEndpoints.create({
    url: WEBHOOK_URL,
    enabled_events: WEBHOOK_EVENTS,
  });
  console.log(`• Created webhook ${wh.id} → ${WEBHOOK_URL}`);
  if (wh.secret) {
    writeEnv("STRIPE_WEBHOOK_SECRET", wh.secret);
    webhookSecretNote = "(written to .env)";
  }
}

console.log("\n✔ Stripe configured. Written to .env:");
console.log(`   STRIPE_PRICE_ID=${price.id}`);
console.log(`   STRIPE_WEBHOOK_SECRET ${webhookSecretNote}`);
console.log("\nNext:");
console.log("  • Set the same 3 STRIPE_* vars in Vercel (production) and redeploy.");
console.log("  • Run `prisma db push` so the billing columns exist in the DB.");
console.log(`  • Webhook target: ${WEBHOOK_URL}`);
