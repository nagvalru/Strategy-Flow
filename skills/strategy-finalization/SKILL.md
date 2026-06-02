---
name: strategy-finalization
description: "Use when preparing the final description, handoff, or delivery report for a completed TSLab trading strategy."
---

# Strategy Finalization

Use this phase after authoring, risk, verification, and any requested optimization are complete.

## Final Documentation Must Include

- strategy name and purpose;
- market, instrument, timeframe, and data assumptions;
- indicators and parameters;
- which indicator parameters were optimization-ready, optimized, or intentionally fixed;
- long and short entry rules;
- long and short exit rules;
- risk and position sizing model;
- confirmation that opening position `Shares` inputs are connected or a fixed-size prototype limitation is documented;
- commission and slippage assumptions;
- optimization status and selected parameters, if any;
- backtest period and key metrics;
- known limitations;
- what was verified;
- what was not verified.

## Delivery Rules

- Separate facts from interpretation.
- Do not claim profitability or robustness beyond the evidence.
- State whether the result is a prototype, research candidate, or production-ready candidate.
- If risk is incomplete, say so directly and do not present the strategy as complete.
- If optimization was not run, do not imply parameters are optimized.
- If final cleanup left threshold/debug/temporary blocks in the graph, return to authoring or verification before delivery.
- Always propose the next correct workflow step unless this is a final delivery answer. The next step must not skip unresolved risk, runtime, or verification blockers.

## Output Contract

Produce a concise final report suitable for a trader and a future agent. Include enough detail that another agent can recreate or inspect the strategy without guessing the trading rules.
