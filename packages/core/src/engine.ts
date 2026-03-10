import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

import type { UpdateBlockRequest, UpdateBlockResponse } from "../../contracts/src/index.ts";
import { parseRegistryConfig, type RegistryConfigDraft } from "../../config/src/index.ts";
import { isSourceAllowed, type SourcePolicyDraft } from "../../source-policy/src/index.ts";
import type { SourceReference } from "../../types/src/index.ts";

function mapPolicy(config: RegistryConfigDraft["blocks"][number]["source_policy"]): SourcePolicyDraft {
  return {
    defaultDeny: true,
    whitelist: config.allow.map((rule) => ({
      domain: rule.domain,
      allowedPaths: rule.allowed_paths ?? [],
    })),
  };
}

export async function runMvpFromRegistryPath(
  registryPath: string,
): Promise<{ request: UpdateBlockRequest; response: UpdateBlockResponse }> {
  const registryRaw = await readFile(registryPath, "utf8");
  const registry = parseRegistryConfig(JSON.parse(registryRaw));
  const firstBlock = registry.blocks[0];

  const requestBase: UpdateBlockRequest = {
    block_id: firstBlock.block_id,
    block_type: firstBlock.block_type,
    control_date: new Date().toISOString().slice(0, 10),
    anchor: {
      editorial_anchor_text: "Reference editorial anchor text",
      editorial_anchor_hash: "sha256:example",
      publication_date: "2026-01-01",
      page_url: "https://example.org/article/update-reference",
    },
  };

  const request: UpdateBlockRequest =
    firstBlock.block_type === "contextual_update_block"
      ? { ...requestBase, context: { topic: "traffic" } }
      : requestBase;

  const firstRule = firstBlock.source_policy.allow[0];
  const candidateSourceUrl = `https://${firstRule?.domain ?? "example.org"}${firstRule?.allowed_paths?.[0] ?? "/"}`;
  const policyCheck = isSourceAllowed(mapPolicy(firstBlock.source_policy), candidateSourceUrl);

  const sources: SourceReference[] =
    policyCheck.allowed === true
      ? [
          {
            label: "configured_source",
            url: candidateSourceUrl,
            checkedAtIso: new Date().toISOString(),
          },
        ]
      : [];

  const response: UpdateBlockResponse = {
    status: policyCheck.allowed ? "ok" : "policy_blocked",
    change_state: policyCheck.allowed ? "no_change" : "unknown",
    warning_state: !policyCheck.allowed,
    anomaly_severity: "none",
    summary_items: [
      { key: "block_id", value: firstBlock.block_id },
      { key: "source_policy_reason", value: policyCheck.reason },
      { key: "registry_version", value: registry.version },
    ],
    sources,
    trace: {
      requestId: randomUUID(),
      resultId: randomUUID(),
      checkedAtIso: new Date().toISOString(),
    },
  };

  return { request, response };
}

export function resolveExampleRegistryPath(): string {
  return fileURLToPath(new URL("../../../examples/blocks/registry.example.json", import.meta.url));
}
