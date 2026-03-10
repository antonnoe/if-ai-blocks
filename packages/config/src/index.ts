import type { BlockType } from "@if-ai-blocks/types";
import type { SourcePolicy } from "@if-ai-blocks/source-policy";

export interface BlockConfigDraft {
  block_id: string;
  block_type: BlockType;
  scope: string;
  context_allowlist: string[];
  output_template: string;
  source_policy: SourcePolicy;
  cache_ttl_seconds: number;
  anomaly_policy_id: string;
}

export interface RegistryConfigDraft {
  version: string;
  blocks: BlockConfigDraft[];
}
