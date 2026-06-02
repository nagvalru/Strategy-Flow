---
name: strategy-risk
description: "Use for every TSLab trading strategy that opens positions, especially to define per-trade risk, stop logic, position sizing, commissions, and risk verification."
---

# Strategy Risk

Risk is a required phase for every trading strategy.

## Required Risk Contract

A strategy is not ready until these are explicit:

- entry price source;
- protective stop or invalidation level;
- risk per unit: distance between entry and stop, or another defensible risk model;
- account risk per trade, fixed size, or explicit sizing rule;
- position size calculation;
- actual connection or mapping from calculated size to the opening block `Shares` input;
- behavior when the stop level is missing, invalid, or on the wrong side of entry;
- commission and slippage assumptions;
- whether position size is static, parameterized, or recalculated per trade.

## TSLab Graph Expectations

When risk-based sizing is required:

- the entry block must receive a real size input or documented sizing behavior;
- stop/protective exits must use a calculated level, not simply current close/open unless that is the intended rule;
- long and short risk directions must be handled separately when both sides trade;
- risk parameters should be exposed for later optimization only when optimization is expected.
- formulas are acceptable and preferred for `riskPerUnit` and `shares` when the math is simple, for example `shares = floor(riskMoney / riskPerUnit)`.

For trend-following strategies:

- the initial stop and trailing stop must be checked for same-bar or immediate exit behavior;
- the stop gate logic must be explicit when the platform would otherwise allow a stop to activate too early;
- the trailing stop must move only in the direction of the open position and must never loosen risk after entry unless the design explicitly allows that behavior;
- for long positions, the trailing stop may stay flat or move upward, but not move downward;
- for short positions, the trailing stop may stay flat or move downward, but not move upward;
- trailing parameters must be large enough to reflect the intended market swing, not so tight that the strategy exits almost immediately by construction;
- if the trailing stop is volatility-based, verify that the volatility multiplier or fraction is plausible for the timeframe and instrument.

## Blockers

Do not call a strategy complete if:

- it opens trades without an intentional size rule;
- opening position `Shares` inputs are empty or disconnected;
- it has a protective exit connected to a raw current price instead of a calculated stop level;
- a trend-following strategy exits immediately or almost immediately because the stop or trailing logic activates too early;
- a trailing stop moves against the direction of the open position and increases risk after entry without an explicit documented reason;
- a trend-following trailing stop uses parameters that are obviously too tight for the stated trend logic and timeframe;
- the risk description and graph behavior disagree;
- commission/slippage assumptions are absent from a strategy where results are being reported;
- the strategy cannot explain worst-case per-trade loss under its own assumptions.

## Output Contract

State the risk model in plain language and identify the exact graph behavior that implements it. For trend strategies, state how the stop avoids zero-bar or immediate exits and why the trailing parameters are plausible. If `Shares` is not calculated and connected, return to `strategy-authoring`. Optimization is forbidden until this phase is clean.
