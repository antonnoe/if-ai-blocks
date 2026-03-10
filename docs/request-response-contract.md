# Request / Response Contract Draft

## Request (`UpdateBlockRequest`)

- `block_id`
- `block_type`
- `control_date`
- `anchor` (editorial anchor contract)
- `context` (structured optional fields only)

## Response (`UpdateBlockResponse`)

- `status`
- `change_state`
- `warning_state`
- `anomaly_severity`
- `summary_items`
- `sources`
- `trace`

The contract is compact and structured with no open narrative field.
