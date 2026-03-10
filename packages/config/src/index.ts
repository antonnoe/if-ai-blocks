import { BLOCK_TYPES, type BlockType } from "../../types/src/index.ts";

export interface SourceRule {
  domain: string;
  allowed_paths?: string[];
}

export interface SourcePolicyConfig {
  mode: "default_deny";
  allow: SourceRule[];
}

export interface BlockConfigDraft {
  block_id: string;
  block_type: BlockType;
  scope: string;
  context_allowlist: string[];
  output_template: string;
  source_policy: SourcePolicyConfig;
  cache_ttl_seconds: number;
  anomaly_policy_id: string;
}

export interface RegistryConfigDraft {
  version: string;
  blocks: BlockConfigDraft[];
}


export function parseRegistryConfig(input: unknown): RegistryConfigDraft {
  if (typeof input !== "object" || input === null) {
    throw new Error("Registry config must be an object");
  }

  const candidate = input as Partial<RegistryConfigDraft>;

  if (typeof candidate.version !== "string" || candidate.version.length === 0) {
    throw new Error("Registry config version must be a non-empty string");
  }

  if (!Array.isArray(candidate.blocks) || candidate.blocks.length === 0) {
    throw new Error("Registry config must include at least one block");
  }

  const blockIds = new Set<string>();

  candidate.blocks.forEach((block, index) => {
    validateBlock(block, index);
    if (blockIds.has(block.block_id)) {
      throw new Error(`Duplicate block_id detected: ${block.block_id}`);
    }
    blockIds.add(block.block_id);
  });

  return candidate as RegistryConfigDraft;
}

function validateBlock(block: BlockConfigDraft, index: number): void {
  const prefix = `Block at index ${index}`;

  if (typeof block.block_id !== "string" || block.block_id.length === 0) {
    throw new Error(`${prefix} has invalid block_id`);
  }

  if (!BLOCK_TYPES.includes(block.block_type)) {
    throw new Error(`${prefix} has invalid block_type`);
  }

  if (!Array.isArray(block.context_allowlist)) {
    throw new Error(`${prefix} has invalid context_allowlist`);
  }

  if (block.source_policy.mode !== "default_deny") {
    throw new Error(`${prefix} must use source_policy.mode=default_deny`);
  }

  if (!Array.isArray(block.source_policy.allow)) {
    throw new Error(`${prefix} has invalid source_policy.allow`);
  }

  for (const rule of block.source_policy.allow) {
    if (typeof rule.domain !== "string" || rule.domain.length === 0) {
      throw new Error(`${prefix} has source policy rule with invalid domain`);
    }

    if (
      rule.allowed_paths !== undefined &&
      (!Array.isArray(rule.allowed_paths) ||
        !rule.allowed_paths.every((value) => typeof value === "string" && value.startsWith("/")))
    ) {
      throw new Error(`${prefix} has source policy rule with invalid allowed_paths`);
    }
  }

  if (!Number.isInteger(block.cache_ttl_seconds) || block.cache_ttl_seconds <= 0) {
    throw new Error(`${prefix} has invalid cache_ttl_seconds`);
  }

  if (typeof block.anomaly_policy_id !== "string" || block.anomaly_policy_id.length === 0) {
    throw new Error(`${prefix} has invalid anomaly_policy_id`);
  }
}
