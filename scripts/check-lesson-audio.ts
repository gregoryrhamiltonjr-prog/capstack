// Hydrated UI tests with a mocked speech engine. No real audio, account, API,
// learner progress, database, owner browser profile, or external network.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import { build } from "esbuild";
import { chromium, type Page } from "playwright-core";

type MockSpeech = { spoken: Array<{ text: string; rate: number; voiceURI: string | null; lang: string }>; cancels: number; pauses: number; resumes: number; current: SpeechSynthesisUtterance | null; finish: () => void; fail: () => void };
declare global { interface Window { __lessonSpeechMock: MockSpeech; } }

async function main() {
  const executablePath = [process.env.CHROMIUM_PATH, "/usr/bin/chromium", "/usr/bin/google-chrome"].find((path): path is string => Boolean(path && existsSync(path)));
  if (!executablePath) throw new Error("Chromium is required for audio UI checks.");
  const output = resolve("test-results/audio"); mkdirSync(output, { recursive: true });
  const bundle = resolve(output, "fixture.js");
  await build({ entryPoints: ["tests/fixtures/audio-player.tsx"], outfile: bundle, bundle: true, platform: "browser", format: "iife", jsx: "automatic", define: { "process.env.NODE_ENV": '"production"' } });
  const staticRoot = resolve(".next/static");
  function cssFiles(folder: string): string[] { return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? cssFiles(resolve(folder, entry.name)) : entry.name.endsWith(".css") ? [resolve(folder, entry.name)] : []); }
  const styles = cssFiles(staticRoot).map((file) => `<link rel="stylesheet" href="/_next/static/${relative(staticRoot, file).split(sep).join("/")}">`).join("");
  assert.ok(styles, "Build the app before checking audio UI.");
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
    if (pathname === "/fixture") { response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); response.end(`<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1">${styles}</head><body><div id="root"></div><script src="/bundle.js"></script></body></html>`); return; }
    if (pathname === "/bundle.js") { response.writeHead(200, { "Content-Type": "text/javascript" }); response.end(readFileSync(bundle)); return; }
    if (pathname === "/favicon.ico") { response.writeHead(204); response.end(); return; }
    if (pathname.startsWith("/_next/static/")) {
      const file = resolve(staticRoot, pathname.slice("/_next/static/".length));
      if (file.startsWith(staticRoot + sep) && existsSync(file)) { response.writeHead(200, { "Content-Type": extname(file) === ".css" ? "text/css" : "font/woff2" }); response.end(readFileSync(file)); return; }
    }
    response.writeHead(404); response.end("Not found");
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  const errors: string[] = [];
  let checks = 0;
  const pass = (label: string) => { console.log(`PASS ${label}`); checks++; };
  try {
    browser = await chromium.launch({ executablePath, headless: true });
    const context = await browser.newContext();
    await context.route("**/*", (route) => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    async function fixture(available = true, blockedStorage = false): Promise<Page> {
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      await page.addInitScript({ content: `window.__audioFixtureOptions = ${JSON.stringify({ available, blockedStorage })};\n${readFileSync("tests/fixtures/mock-speech.js", "utf8")}` });
      await page.goto(`${base}/fixture`, { waitUntil: "networkidle" });
      assert.deepEqual(errors, [], "Fixture failed to initialize");
      return page;
    }
    const page = await fixture();
    await page.locator('option[value="test-uk"]').waitFor({ state: "attached" });
    assert.equal(await page.evaluate(() => window.__lessonSpeechMock.spoken.length), 0);
    pass("audio never auto-plays");
    await page.getByLabel("Speed", { exact: true }).selectOption("1.5");
    await page.getByLabel("Voice", { exact: true }).selectOption("test-uk");
    assert.equal(await page.locator('option[value="test-fr"]').count(), 0);
    await page.getByRole("button", { name: "Listen: Sample lesson one", exact: true }).click();
    await page.getByText("Reading aloud…", { exact: true }).waitFor();
    const first = await page.evaluate(() => window.__lessonSpeechMock.spoken[0]);
    assert.equal(first.rate, 1.5); assert.equal(first.voiceURI, "test-uk"); assert.equal(first.lang, "en-GB");
    assert.equal(await page.getByLabel("Voice", { exact: true }).isDisabled(), true);
    pass("selected voice and speed apply to actual playback requests");
    await page.getByRole("button", { name: "Pause: Sample lesson one", exact: true }).click();
    await page.getByText("Audio paused.", { exact: true }).waitFor();
    await page.getByRole("button", { name: "Resume: Sample lesson one", exact: true }).click();
    await page.getByText("Reading aloud…", { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.__lessonSpeechMock.pauses), 1);
    pass("pause and resume controls work");
    await page.getByRole("button", { name: "Stop", exact: true }).click();
    await page.getByRole("button", { name: "Listen: Sample lesson one", exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.__lessonSpeechMock.current === null), true);
    assert.equal(await page.getByLabel("Speed", { exact: true }).isEnabled(), true);
    pass("Stop cancels speech and unlocks preferences");
    await page.getByRole("button", { name: "Listen: Sample lesson one", exact: true }).click();
    await page.evaluate(() => { for (let limit = 0; limit < 100 && window.__lessonSpeechMock.current; limit++) window.__lessonSpeechMock.finish(); });
    await page.getByText("Finished reading this lesson.", { exact: true }).waitFor();
    pass("chunked narration finishes cleanly");
    await page.getByRole("button", { name: "Listen again: Sample lesson one", exact: true }).click();
    const beforeChange = await page.evaluate(() => window.__lessonSpeechMock.spoken.length);
    await page.getByRole("button", { name: "Next sample lesson", exact: true }).click();
    await page.getByRole("button", { name: "Listen: Sample lesson two", exact: true }).waitFor();
    // A new component is visible before its effect restores saved preferences.
    // Wait for that documented asynchronous initialization, not just DOM presence.
    await page.waitForFunction(() => (document.querySelector('select[id$="-rate"]') as HTMLSelectElement | null)?.value === "1.5");
    await page.waitForFunction(() => window.__lessonSpeechMock.current === null);
    assert.equal(await page.evaluate(() => window.__lessonSpeechMock.current === null), true);
    assert.equal(await page.evaluate(() => window.__lessonSpeechMock.spoken.length), beforeChange);
    assert.equal(await page.getByLabel("Speed", { exact: true }).inputValue(), "1.5");
    pass("changing lessons stops audio without auto-playing the next lesson");
    await page.getByRole("button", { name: "Listen: Sample lesson two", exact: true }).click();
    await page.evaluate(() => window.__lessonSpeechMock.fail());
    await page.getByRole("alert").filter({ hasText: "browser blocked audio" }).waitFor();
    await page.getByRole("button", { name: "Listen again: Sample lesson two", exact: true }).click();
    await page.getByText("Reading aloud…", { exact: true }).waitFor();
    await page.getByRole("button", { name: "Stop", exact: true }).click();
    pass("browser errors surface with a working retry");
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.getByLabel("Voice", { exact: true }).isVisible(), false);
    await page.getByRole("button", { name: "Voice & speed", exact: true }).click();
    await page.getByLabel("Voice", { exact: true }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Voice & speed", exact: true }).click();
    await page.getByLabel("Voice", { exact: true }).waitFor({ state: "hidden" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    await page.screenshot({ path: resolve(output, "player-mobile.png"), fullPage: true });
    pass("mobile controls wrap without horizontal overflow");
    const unsupported = await fixture(false);
    await unsupported.getByText(/Read-aloud isn’t available in this browser/).waitFor();
    assert.equal(await unsupported.getByRole("button", { name: "Listen: Sample lesson one", exact: true }).isDisabled(), true);
    pass("unsupported browsers show an honest fallback");
    const privateMode = await fixture(true, true);
    await privateMode.getByLabel("Speed", { exact: true }).selectOption("2");
    await privateMode.getByRole("button", { name: "Listen: Sample lesson one", exact: true }).click();
    await privateMode.getByText("Reading aloud…", { exact: true }).waitFor();
    assert.equal(await privateMode.evaluate(() => window.__lessonSpeechMock.spoken[0].rate), 2);
    pass("blocked preference storage does not prevent listening");
    assert.deepEqual(errors, [], "Unexpected audio UI errors");
    console.log(`${checks} isolated audio UI checks passed (mocked engine; no audible-voice certification).`);
  } finally {
    await browser?.close();
    await new Promise<void>((done, reject) => server.close((error) => error ? reject(error) : done()));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
