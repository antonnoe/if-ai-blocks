import test from "node:test";
import assert from "node:assert/strict";

import { parseRegistryConfig } from "../packages/config/src/index.ts";

test("parseRegistryConfig accepts valid registry", () => {
  const parsed = parseRegistryConfig({
    version: "2026-01-01",
    blocks: [
      {
        block_id: "a",
        block_type: "static_update_block",
        scope: "scope",
        context_allowlist: [],
        output_template: "standard_compact_update_v1",
        source_policy: {
          mode: "default_deny",
          allow: [{ domain: "service-public.fr", allowed_paths: ["/particuliers/"] }],
        },
        cache_ttl_seconds: 60,
        anomaly_policy_id: "deterministic-v1",
      },
    ],
  });

  assert.equal(parsed.blocks[0]?.block_id, "a");
});

test("parseRegistryConfig rejects duplicate block ids", () => {
  assert.throws(() =>
    parseRegistryConfig({
      version: "2026-01-01",
      blocks: [
        {
          block_id: "a",
          block_type: "static_update_block",
          scope: "scope",
          context_allowlist: [],
          output_template: "standard_compact_update_v1",
          source_policy: { mode: "default_deny", allow: [] },
          cache_ttl_seconds: 60,
          anomaly_policy_id: "deterministic-v1",
        },
        {
          block_id: "a",
          block_type: "contextual_update_block",
          scope: "scope",
          context_allowlist: ["topic"],
          output_template: "standard_compact_update_v1",
          source_policy: { mode: "default_deny", allow: [] },
          cache_ttl_seconds: 60,
          anomaly_policy_id: "deterministic-v1",
        },
      ],
    }),
  );
});
