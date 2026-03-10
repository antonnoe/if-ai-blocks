# if-ai-blocks

Deterministic, config-driven foundation for **AI update blocks**.

## What this repository currently is

- A TypeScript monorepo with strict package boundaries:
  - `@if-ai-blocks/types`
  - `@if-ai-blocks/contracts`
  - `@if-ai-blocks/config`
  - `@if-ai-blocks/source-policy`
  - `@if-ai-blocks/editorial-anchor`
  - `@if-ai-blocks/core`
- A minimal runnable vertical slice that validates a block registry and returns a contract-shaped `UpdateBlockResponse`.
- Deterministic defaults (default-deny source policy, compact structured output).

## What this repository is not

- Not a chat system
- Not conversational AI
- Not free-form prompt processing
- Not uncontrolled retrieval/search
- Not provider-specific runtime integration

## Install

```bash
npm ci
```

## Run the minimal vertical slice

```bash
npm run mvp
```

This command runs a deterministic engine stub that:
1. loads `examples/blocks/registry.example.json`
2. validates it with `@if-ai-blocks/config`
3. enforces source policy with `@if-ai-blocks/source-policy`
4. emits compact JSON with request + response contract shape

## Typecheck and tests

```bash
npm run typecheck
npm test
```

## CI

CI is self-contained and reproducible with lockfile-based install + typecheck + tests.

## Documentation

See `docs/` for architecture drafts:
- config schema
- request/response contract
- status taxonomy
- anomaly taxonomy
- source policy
- editorial anchor model
