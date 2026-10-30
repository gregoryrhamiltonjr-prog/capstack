import assert from "node:assert/strict";
import test from "node:test";
import { GET as getTitle, POST as postTitle } from "../src/app/api/fix-title/route";
import { GET as getCurriculum, POST as postCurriculum } from "../src/app/api/upsert-curriculum/route";

// These imports must work without DATABASE_URL or auth secrets. Retired routes
// must not read sessions, initialize Prisma, or perform database mutations.
for (const [name, handler] of [
  ["GET fix-title", getTitle],
  ["POST fix-title", postTitle],
  ["GET upsert-curriculum", getCurriculum],
  ["POST upsert-curriculum", postCurriculum],
] as const) {
  test(`${name} is a non-mutating, non-cacheable tombstone`, async () => {
    const response = await handler();
    assert.equal(response.status, 410);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      error: "This maintenance endpoint has been retired.",
    });
  });
}
