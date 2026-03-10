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

export interface SourceCheckResult {
  allowed: boolean;
  reason: "allowed" | "domain_not_allowed" | "path_not_allowed";
}

export function isSourceAllowed(policy: SourcePolicyDraft, candidateUrl: string): SourceCheckResult {
  const parsed = new URL(candidateUrl);
  const match = policy.whitelist.find((entry) => entry.domain === parsed.hostname);

  if (!match) {
    return { allowed: false, reason: "domain_not_allowed" };
  }

  if (match.allowedPaths.length === 0) {
    return { allowed: true, reason: "allowed" };
  }

  const pathAllowed = match.allowedPaths.some((prefix) => parsed.pathname.startsWith(prefix));
  if (!pathAllowed) {
    return { allowed: false, reason: "path_not_allowed" };
  }

  return { allowed: true, reason: "allowed" };
}
