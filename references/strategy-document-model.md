# Strategy Document Model

Use this reference when deciding which human-readable strategy document must exist at each phase.

## Starting Documents

Choose one:

- `initial-strategy-description` for a new strategy idea;
- `source-strategy-description` for porting existing code or another platform's strategy;
- `change-description` for modifying an existing strategy;
- `review-baseline` for pure audits.

These are starting documents. They describe the request, the source logic, or the intended change.

## Final Document

Any implemented or modified strategy must end with a full `final-strategy-description`.

This final document must describe what the resulting strategy actually does now.

It is not enough to leave:

- raw code;
- graph blocks;
- a design draft;
- change notes only.

## Indicator Documents

If a new custom indicator is created:

- produce its own final indicator description;
- update the project's indicator registry when one exists.
