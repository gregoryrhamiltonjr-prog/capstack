// Isolated, synthetic component checks. Never opens the owner's browser/profile,
// signs in, accesses production, or reads application/database credentials.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright-core";
import { DashboardView } from "../src/components/DashboardView";
import { CourseMapView } from "../src/components/CourseMapView";
import { CourseDetailView } from "../src/components/CourseDetailView";
import { layoutDashboard, layoutTrack } from "../tests/fixtures/responsive-layout";

async function main() {
  const executablePath = [process.env.CHROMIUM_PATH, "/usr/bin/chromium", "/usr/bin/google-chrome"].find((path): path is string => Boolean(path && existsSync(path)));
  if (!executablePath) throw new Error("Install Chromium or set CHROMIUM_PATH to run responsive layout checks.");
  const staticRoot = resolve(".next/static");
  function cssFiles(folder: string): string[] {
    return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? cssFiles(resolve(folder, entry.name)) : entry.name.endsWith(".css") ? [resolve(folder, entry.name)] : []);
  }
  const styles = cssFiles(staticRoot);
  assert.ok(styles.length, "Run npm run build before checking layout.");
  const layoutSource = readFileSync("src/app/(app)/layout.tsx", "utf8");
  const navSource = readFileSync("src/components/AppNav.tsx", "utf8");
  const shellClass = layoutSource.match(/<div className="([^"]*)"/)?.[1];
  const mainClass = layoutSource.match(/<main[^>]*className="([^"]*)"/)?.[1];
  const sidebarClass = navSource.match(/<aside className="([^"]*)"/)?.[1];
  assert.ok(shellClass && mainClass && sidebarClass, "Fixture must use actual shell/sidebar classes, not a separate guessed layout.");
  const fixtures = {
    dashboard: renderToStaticMarkup(createElement(DashboardView, layoutDashboard)),
    map: renderToStaticMarkup(createElement(CourseMapView, { tracks: [layoutTrack] })),
    course: renderToStaticMarkup(createElement(CourseDetailView, { track: layoutTrack, completedLessonIds: new Set<string>() })),
  };
  const styleLinks = styles.map((file) => `<link rel="stylesheet" href="/_next/static/${relative(staticRoot, file).split(sep).join("/")}">`).join("");
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
    const kind = pathname.slice(1) as keyof typeof fixtures;
    if (Object.hasOwn(fixtures, kind)) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(`<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1">${styleLinks}</head><body data-synthetic-layout-fixture><div data-test-shell class="${shellClass}"><aside class="${sidebarClass}"><p class="p-4 text-sm">Sample navigation</p></aside><main id="main-content" class="${mainClass}">${fixtures[kind]}</main></div><p class="fixed bottom-2 right-2 rounded bg-canvas px-2 text-xs text-ink-muted">Synthetic layout fixture — not a live account</p></body></html>`);
      return;
    }
    if (pathname === "/favicon.ico") { response.writeHead(204); response.end(); return; }
    if (pathname.startsWith("/_next/static/")) {
      const file = resolve(staticRoot, pathname.slice("/_next/static/".length));
      if (file.startsWith(staticRoot + sep) && existsSync(file)) {
        response.writeHead(200, { "Content-Type": extname(file) === ".css" ? "text/css" : extname(file) === ".woff2" ? "font/woff2" : "application/octet-stream" });
        response.end(readFileSync(file));
        return;
      }
    }
    response.writeHead(404); response.end("Not found");
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    browser = await chromium.launch({ executablePath, headless: true });
    const context = await browser.newContext({ reducedMotion: "reduce" });
    // Only this local fixture server is reachable. No production/browser accounts.
    await context.route("**/*", (route) => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) errors.push(`HTTP ${response.status()} ${new URL(response.url()).pathname}`); });
    const viewports = [{ width: 390, height: 844 }, { width: 1280, height: 900 }, { width: 1920, height: 1080 }, { width: 2560, height: 1440 }, { width: 3440, height: 1440 }];
    const output = resolve("test-results/responsive");
    mkdirSync(output, { recursive: true });
    let checks = 0;
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      for (const kind of Object.keys(fixtures) as Array<keyof typeof fixtures>) {
        await page.goto(`${base}/${kind}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const metrics = await page.evaluate(() => {
          const root = document.querySelector<HTMLElement>("[data-test-shell]")!;
          const main = document.querySelector<HTMLElement>("main")!;
          const content = main.firstElementChild as HTMLElement;
          const rect = content.getBoundingClientRect();
          const mainRect = main.getBoundingClientRect();
          const style = getComputedStyle(main);
          const grid = document.querySelector<HTMLElement>("[data-course-unit-grid], [data-course-chapter-grid]");
          return {
            clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
            shellLeft: root.getBoundingClientRect().left, shellWidth: root.getBoundingClientRect().width,
            left: rect.left, right: rect.right, width: rect.width,
            expectedLeft: mainRect.left + parseFloat(style.paddingLeft), expectedRight: mainRect.right - parseFloat(style.paddingRight),
            columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length : null,
            cards: grid ? [...grid.children].map((card) => { const r = card.getBoundingClientRect(); return { top: r.top, height: r.height }; }) : [],
          };
        });
        const label = `${kind} ${viewport.width}px`;
        assert.ok(metrics.scrollWidth <= metrics.clientWidth + 1, `${label}: horizontal overflow`);
        assert.ok(Math.abs(metrics.shellLeft) <= 1 && Math.abs(metrics.shellWidth - metrics.clientWidth) <= 1, `${label}: shell is capped or centered`);
        assert.ok(Math.abs(metrics.left - metrics.expectedLeft) <= 1 && Math.abs(metrics.right - metrics.expectedRight) <= 1, `${label}: content does not fill available workspace`);
        if (metrics.columns !== null) {
          const expected = viewport.width >= 2400 ? 4 : viewport.width >= 1800 ? 3 : viewport.width >= 768 ? 2 : 1;
          assert.equal(metrics.columns, expected, `${label}: unexpected column count`);
          for (let i = 0; i < metrics.cards.length; i++) for (let j = i + 1; j < metrics.cards.length; j++) {
            if (Math.abs(metrics.cards[i].top - metrics.cards[j].top) < 1) assert.ok(Math.abs(metrics.cards[i].height - metrics.cards[j].height) < 1, `${label}: paired card edges do not align`);
          }
        }
        if (kind === "map") {
          const valuation = page.locator('[aria-labelledby="unit-layout-unit-2"]');
          const ecosystem = page.locator('[aria-labelledby="unit-layout-unit-0"]');
          await ecosystem.scrollIntoViewIfNeeded();
          const before = await valuation.boundingBox();
          await ecosystem.hover({ position: { x: 10, y: 10 } });
          const after = await valuation.boundingBox();
          assert.deepEqual(after, before, `${label}: hovering Ecosystem moved Valuation`);
          assert.equal(await valuation.evaluate((element) => getComputedStyle(element).opacity), "1", `${label}: Valuation became hidden`);
        }
        if ((viewport.width === 2560 || viewport.width === 390) && kind === "dashboard") await page.screenshot({ path: resolve(output, `${kind}-${viewport.width}.png`), fullPage: true });
        console.log(`PASS ${label}: workspace ${Math.round(metrics.width)}px, no overflow${metrics.columns ? `, ${metrics.columns} columns with aligned cards` : ""}`);
        checks++;
      }
    }
    assert.deepEqual(errors, [], "Browser/asset errors");
    console.log(`${checks} isolated responsive layout checks passed.`);
  } finally {
    await browser?.close();
    await new Promise<void>((done, reject) => server.close((error) => error ? reject(error) : done()));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
