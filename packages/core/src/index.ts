import type { UpdateBlockRequest, UpdateBlockResponse } from "../../contracts/src/index.ts";
import type { RegistryConfigDraft } from "../../config/src/index.ts";

export interface RetrievalEngine {
  run(request: UpdateBlockRequest): Promise<unknown>;
}

export interface DecisionEngine {
  decide(input: unknown): Promise<UpdateBlockResponse>;
}

export interface BlockRuntime {
  config: RegistryConfigDraft;
  retrieval: RetrievalEngine;
  decision: DecisionEngine;
}

export { resolveExampleRegistryPath, runMvpFromRegistryPath } from "./engine.ts";
