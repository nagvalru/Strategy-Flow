# Visual Editor Principles

Use this reference when reviewing the clarity and maintainability of a TSLab visual strategy.

## Principles

- Prefer visible, inspectable logic over opaque custom code.
- Keep the main chart focused on trader-relevant signals and orders.
- Use separate panes only when they add decision value.
- Remove dead, detached, or unused blocks.
- Name parameters and key blocks clearly.
- Avoid many duplicate hidden constants when one exposed parameter would be clearer.
- Keep diagnostic artifacts out of final user-facing visualization unless they are intentionally part of the strategy.
- Remove auto-added threshold blocks before delivery unless they are intentionally part of a user-facing signal. Stale threshold blocks are a known source of compilation and graph-link problems.

## Custom Indicator Policy

Before creating a new custom indicator, verify:

1. no standard TSLab block expresses the logic clearly;
2. no simple formula can express it safely;
3. no existing documented project indicator already covers it;
4. the new indicator will be reusable or materially simplify the graph.

If a custom indicator is used, its source, build artifact, behavior, inputs, outputs, and intended use must be documented.
