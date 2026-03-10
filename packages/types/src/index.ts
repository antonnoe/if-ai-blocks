export const BLOCK_TYPES = ["static_update_block", "contextual_update_block"] as const;
export type BlockType = (typeof BLOCK_TYPES)[number];

export const OUTPUT_STATUSES = [
  "ok",
  "changed_since_publication",
  "information_not_available",
  "input_anomaly",
  "source_error",
  "validation_error",
  "policy_blocked",
] as const;
export type OutputStatus = (typeof OUTPUT_STATUSES)[number];

export const ANOMALY_SEVERITIES = ["none", "warning", "critical"] as const;
export type AnomalySeverity = (typeof ANOMALY_SEVERITIES)[number];

export interface RequestTrace {
  requestId: string;
  resultId: string;
  checkedAtIso: string;
}

export interface SourceReference {
  label: string;
  url: string;
  checkedAtIso: string;
}
