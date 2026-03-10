# Contributing

Thanks for contributing to `if-ai-blocks`.

## Principles

- Keep architecture config-driven and deterministic.
- Preserve package boundaries (`types`, `contracts`, `config`, `source-policy`, `editorial-anchor`, `core`).
- Keep output compact and contract-first.
- Fail closed (no evidence => `information_not_available` / blocked states as defined).
- Do not add chat/conversational behavior.

## Setup

```bash
npm ci
```

## Required checks

```bash
npm run typecheck
npm test
```

## Scope discipline

Do not widen product scope in foundational PRs. Avoid provider-specific integrations unless explicitly requested.
