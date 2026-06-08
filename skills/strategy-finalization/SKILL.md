---
name: strategy-finalization
description: "Use when preparing the final description, handoff, or delivery report for a completed TSLab trading strategy."
---

# Strategy Finalization

Use this phase after authoring, risk, run analysis, verification, and any requested optimization are complete.

This phase must end with a full current description of the resulting strategy, not only a summary of changes.

## Final Documentation Must Include

- task mode: new strategy, port, modification, repair, or review;
- starting document used: `initial-strategy-description`, `source-strategy-description`, or `change-description`;
- strategy name and purpose;
- market, instrument, timeframe, and data assumptions;
- indicators and parameters;
- which indicator parameters were optimization-ready, optimized, or intentionally fixed;
- long and short entry rules;
- long and short exit rules;
- risk and position sizing model;
- confirmation that opening position `Shares` inputs are connected or a fixed-size prototype limitation is documented;
- commission and slippage assumptions;
- any nonzero `Margin,%` or borrow-carry assumption, and why it is applicable to the market;
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
- If the task modified an existing strategy, do not end with change notes only. Update the full final strategy description so another trader or agent can read what the strategy now does without reconstructing history.
- Always state whether `Margin,%` was set to `0` by market rule or intentionally left nonzero as a borrow/financing assumption.
- Always propose the next correct workflow step unless this is a final delivery answer. The next step must not skip unresolved risk, runtime, or verification blockers.

## Output Contract

Produce a concise final report suitable for a trader and a future agent. Include enough detail that another agent can recreate or inspect the strategy without guessing the trading rules.
