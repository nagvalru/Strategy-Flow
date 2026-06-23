# Final Visual Audit

Use this reference before calling a TSLab strategy delivery-clean or finished.

## Purpose

A strategy can be structurally runnable and still fail as a trader-facing artifact.

This audit exists to catch:

- empty or leftover blocks;
- wrong pane assignment;
- wrong chart-link style;
- missing trader-relevant trigger lines;
- price chart flattening from bad plotted series;
- helper or diagnostic visuals that survived into the final graph.

## Required Checks

For every visible plotted series, record:

- series name;
- semantic type: price-level / oscillator / threshold / volume / diagnostic / other;
- intended pane;
- actual pane;
- chart style;
- whether zero is meaningful;
- whether the series can be zero while flat;
- whether the series is trader-facing or diagnostic only.
- whether the series is a true trading trigger/reference level that must be visible for human inspection.

## Blocking Conditions

Block completion if:

- a visible series has no justified pane assignment;
- a price-scale line is left on a separate pane without explicit reason;
- a dimensionless threshold or normalized band leaks onto the price pane;
- a sparse price-level series uses plain `Line` and can flatten autoscaling;
- a core trigger/reference level is missing from the trader-facing chart without explicit justification;
- a helper pane survives without explicit trader-facing justification;
- an empty, helper, threshold, debug, or semantically unclassified block remains.

## Timing

Run this audit:

- after the final graph mutation;
- after the final stop rewrite;
- after optimization apply if plotted parameters changed;
- before finalization or live-launch claims.
