---
name: strategy-verification
description: "Use when reviewing whether a TSLab strategy is actually correct, runnable, inspectable, and ready for optimization or delivery."
---

# Strategy Verification

Use this phase after `strategy-run-analysis` and before optimization, finalization, or any claim that a strategy is finished.

## Verification Areas

Check:

- lifecycle proof from the local TSLab workflow;
- metrics summary and run status;
- logs and messages for hidden errors or warnings;
- entries and exits match the written strategy rules;
- implemented stop logic matches the declared stop contract, including source series, current-vs-previous-bar rule, allowed use of `Close`, and monotonicity expectations;
- entry and exit blocks are semantically aligned with the declared rule: direct price-trigger blocks for direct price semantics, explicit logical conditions only when the strategy really requires bar-condition confirmation or an additional gate;
- no `AlwaysTrue` or semantically built-in gates were added on top of native entry/exit/stop blocks;
- risk sizing and protective exits match the risk contract;
- no dead, detached, empty, non-working, duplicate, auto-threshold, temporary constant, debug, template-leftover, or unused graph blocks remain;
- every remaining block has a clear purpose in the trade path, risk path, parameter/control path, or trader-facing visualization;
- no extra diagnostic panes obscure the trader-facing chart;
- calculated chart lines do not spam zero-valued vertical lines because of an inappropriate chart style;
- formula-based price levels and other sparse calculated series shown on the chart use `Line without zeroes` unless zero is intentionally meaningful;
- constants and thresholds are plotted only on panes whose scale matches their meaning;
- dimensionless thresholds, normalized bands, and oscillator guide levels are not leaked onto the main price pane;
- each visible series has an explicit pane classification: price pane, separate pane, or hidden;
- price-scale helper series are not stranded on their own pane without explicit justification;
- parameters are named and exposed consistently;
- long-only, short-only, or symmetric behavior is intentional;
- for trend-following strategies, stop/trailing logic does not cause immediate exits unless that is explicitly intended;
- for trailing-stop strategies, the stop moves only in the direction of the open position unless the design explicitly allows loosening;
- if the source strategy originally had no stop-loss, any added engineering stop is explicitly documented and has a visible on/off gate such as a logical constant;
- for trend-following strategies, stop and trailing parameters are plausible for the instrument and timeframe;
- backtest result dates and data assumptions are clear.

## Trading Nonsense Checks

Flag these as blockers:

- position closes every bar without a strategy reason;
- a trend-following strategy exits on the same bar or the next bar by construction because the stop gate or trailing distance is wrong;
- a trailing stop for a long position moves downward, or a trailing stop for a short position moves upward, without an explicit design reason;
- implemented stop logic does not match the declared stop contract even though the graph is runnable;
- a recalculated ATR level from current close is presented as a stop-loss or trailing stop even though it is really a moving protective level that can loosen risk;
- a source strategy with no original stop-loss silently receives a mandatory engineering stop with no visible switch to disable it;
- stop/profit exit uses current price instead of a calculated order level;
- signal shown on chart does not match trade execution;
- a boolean entry or exit formula merely restates a direct threshold already expressed by the native block and serves no independent trading purpose;
- an `AlwaysTrue` gate such as `Close >= Close` or `PositionSize > 0` was added even though the native block behavior already implies it;
- the chart omits the actual trigger/reference level even though that level is central to trader inspection of the strategy;
- calculated chart series are drawn with plain `Line` and produce misleading zero-line spikes instead of sparse level visualization;
- constants or thresholds are plotted on the wrong pane or wrong scale and distort the visual range of that chart;
- a constant already shown on its proper pane is duplicated on another pane without an explicit reason;
- a price-scale line is left on a separate pane even though it belongs on the main price chart;
- final verification relied only on compact API proof and skipped a trader-facing pane/plot audit after the last mutation;
- strategy trades before required warm-up data exists;
- short logic is accidentally wired to long signals, or the reverse;
- position size is missing, constant by accident, or disconnected from the risk model.
- auto-added threshold blocks remain after final visual cleanup;
- any empty or non-working block remains in the graph, even if only one;
- a newly created helper block is not connected to the final logic and was only useful during diagnosis;
- lifecycle stops at build/load without a successful run that has bars and useful metrics, unless the exact runtime/data blocker is reported.
- two optimization parameters are exposed separately even though they are one logical trading knob and the design did not ask for independent control.
- a risk parameter affecting strategy behavior was added but not mapped for optimization and not declared intentionally fixed;
- a percent-risk model was added without an explicit deposit or other capital base.

## Output Contract

Report one of:

- `Ready for finalization`;
- `Ready for optimization`;
- `Ready for run analysis`;
- `Needs authoring repair`;
- `Needs risk repair`;
- `Blocked by runtime/data issue`.

Include the evidence used for the decision.

When the strategy is close to completion, evidence should include a final block classification audit and a pane/plot audit, not only compact lifecycle proof.
