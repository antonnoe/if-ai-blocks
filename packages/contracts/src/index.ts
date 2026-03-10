import type {
  AnomalySeverity,
  BlockType,
  OutputStatus,
  RequestTrace,
  SourceReference,
} from "@if-ai-blocks/types";

export interface EditorialAnchorContract {
  editorial_anchor_text: string;
  editorial_anchor_hash: string;
  publication_date: string;
  page_url: string;
}

export interface UpdateBlockRequest {
  block_id: string;
  block_type: BlockType;
  control_date: string;
  anchor: EditorialAnchorContract;
  context?: Record<string, string | number | boolean | null>;
}

export interface CompactSummaryItem {
  key: string;
  value: string;
}

export interface UpdateBlockResponse {
  status: OutputStatus;
  change_state: "no_change" | "changed" | "unknown";
  warning_state: boolean;
  anomaly_severity: AnomalySeverity;
  summary_items: CompactSummaryItem[];
  sources: SourceReference[];
  trace: RequestTrace;
}
