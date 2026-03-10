import type { BlockType } from "@if-ai-blocks/types";

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
