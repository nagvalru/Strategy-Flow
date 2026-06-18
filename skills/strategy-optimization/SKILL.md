---
name: strategy-optimization
description: "Use when optimizing TSLab strategy parameters after a verified baseline exists; prevents premature optimization and overfit-prone workflows."
---

# Strategy Optimization

Use this phase only after `strategy-run-analysis` and `strategy-verification` confirm a clean baseline.

## Preconditions

Do not optimize until:

- the strategy runs successfully;
- the run has bars and useful metrics, or there is a documented runtime/data blocker and optimization is explicitly postponed;
- the graph is clean enough to inspect;
- risk is defined;
- opening position `Shares` inputs are intentionally populated;
- baseline metrics are recorded;
- optimization parameters are meaningful and not accidental literals;
- all strategy-driving indicator parameters have optimization ranges or an explicit fixed-parameter justification;
- the objective is stated before running the optimization.
- optimization result selection includes a trading-sanity filter, not only raw metric rank.

## Optimization Design

Specify:

- selected parameters;
- indicator parameters included in optimization, and indicator parameters intentionally excluded;
- ranges, steps, and defaults;
- objective metric;
- constraints such as drawdown, trade count, profit factor, or stability;
- in-sample and out-of-sample split when available;
- what result will be rejected as overfit.

## Anti-Overfit Rules

- Do not optimize every available parameter by default.
- Do not forget indicator parameters. Periods, lookbacks, smoothing lengths, STDev periods, multipliers, thresholds, and trailing coefficients must be included in optimization when they affect the strategy, unless there is a documented reason to keep them fixed.
- Do not optimize if per-trade risk is missing or `Shares` is not calculated/connected.
- Prefer broad, interpretable ranges over narrow curve-fit ranges.
- Preserve the baseline result.
- Treat "best net profit" alone as weak evidence.
- Do not apply a best optimization row with zero trades, no meaningful fills, or other obvious trading-sanity failures even if the ranking metric puts it first.
- For metrics such as `RecoveryFactor`, reject no-trade rows and choose the best row that still satisfies trading sanity conditions.
- Watch for too few trades, unstable neighboring parameter values, and extreme parameter choices.

## Output Contract

Return selected parameters, included indicator parameters, excluded fixed parameters with reasons, objective, constraints, best result, trading-sanity checks on the selected row, comparison to baseline, and remaining overfit risk. Then use `strategy-finalization` only if the result is defensible.
