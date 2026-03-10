export type BlockType = "static_update_block" | "contextual_update_block";

export type OutputStatus =
  | "ok"
  | "changed_since_publication"
  | "information_not_available"
  | "input_anomaly"
  | "source_error"
  | "validation_error"
  | "policy_blocked";

export type AnomalySeverity = "none" | "warning" | "critical";

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
