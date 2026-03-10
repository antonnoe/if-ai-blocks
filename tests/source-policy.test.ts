import test from "node:test";
import assert from "node:assert/strict";

import { isSourceAllowed } from "../packages/source-policy/src/index.ts";

test("source policy allows configured domain/path", () => {
  const result = isSourceAllowed(
    {
      defaultDeny: true,
      whitelist: [{ domain: "service-public.fr", allowedPaths: ["/particuliers/"] }],
    },
    "https://service-public.fr/particuliers/vosdroits/F17698",
  );

  assert.deepEqual(result, { allowed: true, reason: "allowed" });
});

test("source policy blocks unknown domain", () => {
  const result = isSourceAllowed(
    {
      defaultDeny: true,
      whitelist: [{ domain: "service-public.fr", allowedPaths: ["/particuliers/"] }],
    },
    "https://example.org/particuliers/vosdroits/F17698",
  );

  assert.deepEqual(result, { allowed: false, reason: "domain_not_allowed" });
});
