# Architecture Draft (Skeleton Phase)

This repository is in skeleton phase and intentionally excludes business logic.

## Module boundaries

- `packages/types`: shared vocabulary and state taxonomy.
- `packages/contracts`: API request/response contract draft.
- `packages/config`: config schema draft interfaces + sample registry.
- `packages/source-policy`: default-deny source policy structure.
- `packages/editorial-anchor`: editorial anchor and container context model.
- `packages/core`: runtime interfaces only.

## Delivery status

Implemented in draft form:
1. config schema
2. request/response contract
3. status taxonomy
4. anomaly taxonomy
5. source policy structure
6. editorial anchor model

Deferred (no implementation yet):
- retrieval execution
- evidence normalization
- anomaly decision rules
- output rendering logic
- embed runtime behavior
