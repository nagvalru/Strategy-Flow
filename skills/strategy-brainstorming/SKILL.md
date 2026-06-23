---
name: strategy-brainstorming
description: "Use before strategy design when a TSLab strategy idea still needs trading-specific clarification about stop semantics, pane mapping, plotted series, prototype scope, or delivery expectations."
---

# Strategy Brainstorming

Use this phase before `strategy-intake` or `strategy-design` when the request is still exploratory.

This skill is the strategy-specific replacement for generic brainstorming when the task is TSLab strategy work. It exists to prevent generic product-design heuristics from outranking trading semantics and trader-facing chart discipline.

## Goal

Turn a rough strategy idea into a trading-specific pre-design agreement.

## Must Clarify

Clarify or record:

- what the strategy is trying to exploit;
- whether the user wants a prototype, verified baseline, delivery-clean artifact, or live-trading-ready candidate;
- whether stops exist in the source idea at all;
- if stops exist, what the exact stop source and update rule are;
- whether stop logic may use `Close`, current bar values, previous bar values, or only entry-anchored logic;
- whether entry and exit semantics are direct price-level semantics or bar-condition semantics such as `Close > level`, `Close < level`, `High > level`, or `Low < level`;
- whether stop logic may loosen risk;
- whether auxiliary indicators are allowed in stop logic;
- which series must be visible to the trader;
- which of those visible series belong on the price pane versus a separate indicator pane;
- whether any helper or diagnostic visualization is allowed to survive into the final artifact.

## Hard Rules

- If the user specified exact stop semantics, preserve them. Do not let "built-in blocks first" override the stop contract.
- If the user specified direct price-trigger semantics, do not wrap them in a redundant boolean formula. If the user specified bar-condition semantics such as `Close > level` or `Close < level`, preserve that explicitly instead of silently converting it to a pure price-trigger block.
- If the user did not ask for a stop-loss, do not silently introduce one as core strategy logic.
- If an engineering stop is proposed for baseline safety, present it as optional and explicitly switchable.
- If a series is price-scale, plan to keep it on the main price pane unless there is a strong explicit reason not to.
- If a series is dimensionless, normalized, oscillator-based, or threshold-only, do not leak it onto the price pane.

## Output Contract

End this phase with a concise strategy-specific brainstorming summary that states:

- target artifact state;
- stop contract status;
- allowed implementation freedoms;
- pane and plotted-series expectations;
- what must be preserved exactly from the source idea.

Then move to `strategy-intake` or `strategy-design`.
