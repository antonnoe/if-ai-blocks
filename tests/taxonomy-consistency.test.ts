import test from "node:test";
import assert from "node:assert/strict";

import { ANOMALY_SEVERITIES, OUTPUT_STATUSES } from "../packages/types/src/index.ts";

test("output status taxonomy is unchanged", () => {
  assert.deepEqual(OUTPUT_STATUSES, [
    "ok",
    "changed_since_publication",
    "information_not_available",
    "input_anomaly",
    "source_error",
    "validation_error",
    "policy_blocked",
  ]);
});

test("anomaly severity taxonomy is unchanged", () => {
  assert.deepEqual(ANOMALY_SEVERITIES, ["none", "warning", "critical"]);
});
