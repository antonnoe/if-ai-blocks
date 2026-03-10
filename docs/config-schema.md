# Config Schema Draft

`RegistryConfigDraft` contains versioned block definitions.

Each `BlockConfigDraft` includes:
- `block_id`
- `block_type` (`static_update_block` or `contextual_update_block`)
- `scope`
- `context_allowlist`
- `output_template`
- `source_policy` (default deny)
- `cache_ttl_seconds`
- `anomaly_policy_id`

Purpose: provide strong boundaries before runtime logic exists.
