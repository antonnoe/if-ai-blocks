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
  request_id: string;
  result_id: string;
  checked_at_iso: string;
}

export interface SourceReference {
  label: string;
  url: string;
  checked_at_iso: string;
}
