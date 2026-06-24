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
- capital base for percent-based risk: initial deposit, explicit deposit constant, equity source, or another declared base;
- position size calculation;
- actual connection or mapping from calculated size to the opening block `Shares` input;
- behavior when the stop level is missing, invalid, or on the wrong side of entry;
- whether the source strategy originally had no stop-loss and, if so, whether any added engineering stop is optional and switchable;
- commission and slippage assumptions;
- whether any `Margin,%` / borrow-carry field in the commission block is applicable to this market;
- whether position size is static, parameterized, or recalculated per trade.
- whether each risk parameter is fixed or optimization-ready.

## TSLab Graph Expectations

When risk-based sizing is required:

- the entry block must receive a real size input or documented sizing behavior;
- stop/protective exits must use a calculated level, not simply current close/open unless that is the intended rule;
- a stop-loss anchored to trade risk should normally be based on entry price and a risk offset, for example `long = entryLong - k * ATR` and `short = entryShort + k * ATR`, not on a bar-by-bar recalculation from current close unless the design explicitly defines a dynamic protective level;
- long and short risk directions must be handled separately when both sides trade;
- risk parameters should be exposed for later optimization only when optimization is expected;
- if the risk model is percent-based, the graph must identify the capital base explicitly; percent risk without a capital base is incomplete;
- formulas are acceptable and preferred for `riskPerUnit` and `shares` when the math is simple, for example `shares = floor(riskMoney / riskPerUnit)`;
- if a TSLab commission block contains `Margin,%`, do not leave the default blindly. For non-equity markets where overnight stock borrow is not the intended cost model, set `Margin,%` to `0` unless the user explicitly requests another financing-cost assumption. For crypto, default `Margin,%` to `0`.

For trend-following strategies:

- the initial stop and trailing stop must be checked for same-bar or immediate exit behavior;
- the stop gate logic must be explicit when the platform would otherwise allow a stop to activate too early;
- if the source strategy had no stop-loss and an engineering stop is introduced only to make the baseline safer or more runnable, it must be controllable by an explicit logical constant or equivalent on/off gate so the added stop can be disabled cleanly;
- do not label a bar-by-bar recalculated ATR level from current close as a trailing stop unless it is monotonic in the direction of the position;
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
- an added engineering stop is silently baked into the strategy without explicit design disclosure and without a switch that allows disabling it;
- a moving ATR level derived from current close is presented as stop-loss or trailing-stop logic even though it can loosen risk against the open position;
- a trailing stop moves against the direction of the open position and increases risk after entry without an explicit documented reason;
- a trend-following trailing stop uses parameters that are obviously too tight for the stated trend logic and timeframe;
- the risk description and graph behavior disagree;
- a percent-based risk model has no explicit capital base;
- a risk parameter materially affects behavior but is neither mapped for optimization nor declared intentionally fixed;
- commission/slippage assumptions are absent from a strategy where results are being reported;
- the commission block still uses a default `Margin,%` value that is not appropriate for the market and materially distorts the result;
- the strategy cannot explain worst-case per-trade loss under its own assumptions.

## Output Contract

State the risk model in plain language and identify the exact graph behavior that implements it. For trend strategies, state how the stop avoids zero-bar or immediate exits and why the trailing parameters are plausible. If the source strategy had no stop-loss, say whether an optional engineering stop was added and where its logical enable/disable gate lives. State the capital base used for percent risk and whether the relevant risk parameters are optimization-ready or intentionally fixed. State the commission model, including whether `Margin,%` is zeroed or intentionally nonzero for the chosen market. If `Shares` is not calculated and connected, return to `strategy-authoring`. Optimization is forbidden until this phase is clean.
