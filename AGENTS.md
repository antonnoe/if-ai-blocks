# AGENTS.md

## Project
if-ai-blocks

## Mission
Build a generic, reusable repository for contextual AI update blocks for websites and tools.

This system is NOT a chat system.
This system is NOT conversational AI.
This system does NOT accept free-form user prompts.

The system provides small clickable [AI] blocks that return:
- a compact, source-bound update
- only for the specific block
- within a fixed scope
- using an explicit source whitelist
- with a fixed output structure
- with control date
- with visible sources
- with a strict fallback: "Information not available"

## Core product definition
A block is a controlled update unit.

Each block has:
- a unique `block_id`
- a fixed `block_type`
- a fixed scope
- a fixed source whitelist
- a fixed output template
- a fixed context allowlist
- a fixed cache strategy
- a fixed anomaly policy

## Only two block types exist
- `static_update_block`
- `contextual_update_block`

No third hybrid type may be introduced.

## Non-goals
Do NOT build:
- chat UI
- conversational assistant
- free text input
- generic AI answers
- open-ended search
- autonomous browsing outside policy
- provider-locked architecture
- dossier-specific hardcoding in the core

## Binding architectural decisions
These decisions are fixed and must not be changed unless explicitly requested:

1. Config-driven architecture
2. Default-deny source policy
3. Block-specific context allowlist
4. Fixed request/response contract
5. Dynamic cache key
6. Editorial anchor model required
7. Deterministic anomaly regime
8. Model abstraction required
9. Server-side retrieval and summarization
10. Compact structured output only

## Source policy
Allowed sources must be explicitly configured per block at domain level and, where needed, path level.

Examples of trusted domains:
- service-public.fr
- legifrance.gouv.fr
- urssaf.fr
- ameli.fr
- caf.fr
- insee.fr
- ecologie.gouv.fr
- onisr.securite-routiere.gouv.fr

Rules:
- default deny
- no unrestricted search
- no answer without evidence
- no hallucinations
- if evidence is insufficient: return `Information not available`

## Context policy
Runtime context is allowed only for `contextual_update_block`.

Rules:
- structured fields only
- no free text
- no personal data
- only block-approved fields may be used
- never pass the full tool state
- context must be normalized before use
- context used in the check must be visible in the output

## Editorial anchor policy
Every block must be linked to the editorial context it checks.

Required concepts:
- `editorial_anchor_text`
- `editorial_anchor_hash`
- `publication_date`
- `page_url` or equivalent content reference

Without an editorial anchor, a block is invalid.

## Output policy
Output must be structured and compact.

Allowed output states:
- `ok`
- `changed_since_publication`
- `information_not_available`
- `input_anomaly`
- `source_error`
- `validation_error`
- `policy_blocked`

Required output elements:
- status
- checked date
- change state
- compact summary items
- visible sources
- warning state if relevant
- anomaly state if relevant
- traceable request/result id

No open narrative output.

## Anomaly policy
Anomalies are rule-based, never intuition-based.

Severity levels:
- `none`
- `warning`
- `critical`

Rules:
- anomaly checks run before normal content output
- a `critical` anomaly triggers a red alert state
- critical anomalies block normal update output
- anomaly rules must be deterministic and testable

## Internal IF guidance layer
The system must know the local container it is operating in:
- article
- dossier
- tool
- calculator
- builder
- module

It must know:
- container type
- container title
- container URL
- container function
- section or anchor
- topic tags

Optional later feature:
The system may know other IF modules/articles/tools/builders, but only as a navigation layer.

Strict rule:
- internal IF knowledge is NOT a factual evidence source
- internal IF items may only be used as navigation hints if explicitly allowed by config

## Delivery priority
Build in this order:

1. config schema
2. block registry
3. request/response contract
4. context validator
5. source-policy enforcer
6. cache-signature builder
7. editorial-anchor module
8. status and anomaly enums
9. model adapter interface
10. retrieval core
11. evidence normalizer
12. decision engine
13. output renderer
14. embed script/component
15. tests

Do not start with front-end polish.
Do not start with a generic AI service.
Do not start with dossier-specific examples in core code.

## Quality bar
Everything must be:
- deterministic where possible
- testable
- reusable
- maintainable
- safe
- explainable
- easy to embed in WordPress/Divi and other front-ends

## Implementation constraints
- Prefer TypeScript for core packages and API
- Keep provider adapters isolated
- Keep source connectors isolated
- Keep block configs externalized
- Keep output contract stable
- Fail closed, not open
- Log all important decisions without storing personal data

## What Codex must do first
Before writing functional code, create:
- repo skeleton
- package/module boundaries
- config schema draft
- request/response contract draft
- status taxonomy
- anomaly taxonomy
- source-policy structure
- minimal documentation for these decisions

Do not invent extra product features.
Do not widen scope.
Ask for missing decisions only if implementation is impossible without them.

## First implementation target
A minimal but real MVP with:
- `static_update_block`
- `contextual_update_block`
- strict config validation
- one retrieval pipeline
- one output contract
- one embed strategy
- caching
- logging
- fallback handling
- anomaly handling
