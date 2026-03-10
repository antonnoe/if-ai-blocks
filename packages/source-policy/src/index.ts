export interface SourceAllowRule {
  domain: string;
  allowed_paths?: string[];
}

export interface SourcePolicy {
  mode: "default_deny";
  allow: SourceAllowRule[];
  notes?: string;
}

export const DEFAULT_SOURCE_POLICY: SourcePolicy = {
  mode: "default_deny",
  allow: [],
};
