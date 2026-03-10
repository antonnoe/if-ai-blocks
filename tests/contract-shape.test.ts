import test from "node:test";
import assert from "node:assert/strict";

import { resolveExampleRegistryPath, runMvpFromRegistryPath } from "../packages/core/src/index.ts";

test("MVP vertical slice returns compact contract-shaped response", async () => {
  const { response } = await runMvpFromRegistryPath(resolveExampleRegistryPath());

  assert.equal(typeof response.status, "string");
  assert.equal(typeof response.warning_state, "boolean");
  assert.ok(Array.isArray(response.summary_items));
  assert.ok(Array.isArray(response.sources));
  assert.equal(typeof response.trace.requestId, "string");
  assert.equal(typeof response.trace.resultId, "string");
});
