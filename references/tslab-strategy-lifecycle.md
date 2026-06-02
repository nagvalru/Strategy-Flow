# TSLab Strategy Lifecycle

Use this reference when a strategy phase needs concrete evidence from TSLab.

## Lifecycle

A trading strategy normally moves through:

1. research hypothesis;
2. written design;
3. TSLab graph authoring;
4. risk and position sizing check;
5. cleanup of temporary and auto-added visual/debug blocks;
6. validation and build;
7. load and run;
8. metrics, logs, and chart review;
9. optional optimization;
10. final documentation.

## Dependency on the Active Workspace

This plugin does not define localhost routes or helper script syntax. Use the active workspace's local TSLab Web API instructions for:

- API status checks;
- script creation;
- instrument mapping;
- graph mutation;
- lifecycle proof;
- metrics summary;
- indicator authoring;
- optimization jobs.

## Evidence Standard

For a strategy to be considered implemented, the agent should have current evidence for:

- source data mapping;
- explicitly chosen provider, instrument, and timeframe;
- meaningful graph blocks;
- successful lifecycle proof;
- run with bars and useful metrics, or a concrete runtime/data blocker;
- metrics or a clear runtime blocker;
- risk model presence;
- connected position sizing for opening trades;
- absence of obvious visual-editor clutter;
- final written strategy rules.
