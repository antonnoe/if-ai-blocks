# if-ai-blocks

Config-driven repository skeleton for deterministic AI update blocks.

## Current state

This repository currently contains **only initial architecture scaffolding**:
- workspace/package boundaries
- shared contracts and taxonomy types
- config placeholders and examples
- draft documentation

No retrieval, model, or decision business logic is implemented yet.

All workspace packages are currently **type-only** in this scaffold phase (typecheck-only, no emitted runtime build artifacts).

## Workspace packages

- `@if-ai-blocks/types`: shared enums and cross-package type boundaries.
- `@if-ai-blocks/contracts`: request/response contract draft.
- `@if-ai-blocks/config`: block config schema draft and placeholders.
- `@if-ai-blocks/source-policy`: source policy structure and default-deny policy types.
- `@if-ai-blocks/editorial-anchor`: editorial anchor model draft.
- `@if-ai-blocks/core`: orchestration boundary (interfaces only, no logic).

## Docs

See `docs/` for draft product architecture notes:
- config schema
- request/response contract
- source policy
- status taxonomy
- anomaly taxonomy
- editorial anchor model
