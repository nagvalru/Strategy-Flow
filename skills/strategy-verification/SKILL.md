---
name: strategy-verification
description: "Use when reviewing whether a TSLab strategy is actually correct, runnable, inspectable, and ready for optimization or delivery."
---

# Strategy Verification

Use this phase before optimization, finalization, or any claim that a strategy is finished.

## Verification Areas

Check:

- lifecycle proof from the local TSLab workflow;
- metrics summary and run status;
- logs and messages for hidden errors or warnings;
- entries and exits match the written strategy rules;
- risk sizing and protective exits match the risk contract;
- no dead, detached, empty, non-working, duplicate, auto-threshold, temporary constant, debug, template-leftover, or unused graph blocks remain;
- every remaining block has a clear purpose in the trade path, risk path, parameter/control path, or trader-facing visualization;
- no extra diagnostic panes obscure the trader-facing chart;
- parameters are named and exposed consistently;
- long-only, short-only, or symmetric behavior is intentional;
- for trend-following strategies, stop/trailing logic does not cause immediate exits unless that is explicitly intended;
- for trailing-stop strategies, the stop moves only in the direction of the open position unless the design explicitly allows loosening;
- for trend-following strategies, stop and trailing parameters are plausible for the instrument and timeframe;
- backtest result dates and data assumptions are clear.

## Trading Nonsense Checks

Flag these as blockers:

- position closes every bar without a strategy reason;
- a trend-following strategy exits on the same bar or the next bar by construction because the stop gate or trailing distance is wrong;
- a trailing stop for a long position moves downward, or a trailing stop for a short position moves upward, without an explicit design reason;
- stop/profit exit uses current price instead of a calculated order level;
- signal shown on chart does not match trade execution;
- strategy trades before required warm-up data exists;
- short logic is accidentally wired to long signals, or the reverse;
- position size is missing, constant by accident, or disconnected from the risk model.
- auto-added threshold blocks remain after final visual cleanup;
- any empty or non-working block remains in the graph, even if only one;
- a newly created helper block is not connected to the final logic and was only useful during diagnosis;
- lifecycle stops at build/load without a successful run that has bars and useful metrics, unless the exact runtime/data blocker is reported.

## Output Contract

Report one of:

- `Ready for finalization`;
- `Ready for optimization`;
- `Needs authoring repair`;
- `Needs risk repair`;
- `Blocked by runtime/data issue`.

Include the evidence used for the decision.
