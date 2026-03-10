export interface SourceWhitelistEntry {
  domain: string;
  allowedPaths: string[];
}

export interface SourcePolicyDraft {
  defaultDeny: true;
  whitelist: SourceWhitelistEntry[];
  notes?: string;
}

export const DEFAULT_SOURCE_POLICY: SourcePolicyDraft = {
  defaultDeny: true,
  whitelist: [],
};
