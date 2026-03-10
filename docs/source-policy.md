# Source Policy Draft

Canonical policy shape:
- `mode: "default_deny"`
- `allow: SourceAllowRule[]`
- `notes?`

`SourceAllowRule` supports:
- `domain`
- optional `allowed_paths` (domain-only rules are valid)

Policy remains fail-closed by construction through the `default_deny` mode.

No unrestricted search behavior is represented in this skeleton.
