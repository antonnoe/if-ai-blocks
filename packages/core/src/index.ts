import type { UpdateBlockRequest, UpdateBlockResponse } from "@if-ai-blocks/contracts";
import type { RegistryConfigDraft } from "@if-ai-blocks/config";

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
