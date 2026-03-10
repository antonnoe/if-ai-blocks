# Request / Response Contract Draft

## Request (`UpdateBlockRequest`)

`UpdateBlockRequest` is a discriminated union on `block_type`:

- `static_update_block` request:
  - `block_id`
  - `block_type`
  - `control_date`
  - `anchor`
  - **no runtime `context` field**
- `contextual_update_block` request:
  - `block_id`
  - `block_type`
  - `control_date`
  - `anchor`
  - `context` (structured fields only)

## Response (`UpdateBlockResponse`)

- `status`
- `change_state`
- `warning_state`
- `anomaly_severity`
- `summary_items`
- `sources`
- `trace`

Wire contract fields are snake_case.

The contract is compact and structured with no open narrative field.
