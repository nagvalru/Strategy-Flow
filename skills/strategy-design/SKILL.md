---
name: strategy-design
description: "Use when creating a written specification for a TSLab trading strategy before implementation."
---

# Strategy Design

Use this phase after `strategy-intake` and any needed `strategy-research`. The goal is a specification precise enough that the agent can implement the strategy without inventing hidden trading rules.

The design should be based on the correct starting document:

- `initial-strategy-description` for new strategies;
- `source-strategy-description` for ports from code or another platform;
- `change-description` for modifications of an existing strategy.

## Required Design Sections

Create or confirm:

- strategy name;
- market, data source, instrument, and timeframe;
- trading hypothesis;
- indicators and input series;
- long entry rules;
- short entry rules, or explicit long-only reason;
- long exit rules;
- short exit rules, or explicit reason if absent;
- direct-versus-conditional execution semantics for each entry and exit: pure price level, `Close` confirmation, `High/Low` touch, previous-bar confirmation, or another explicit rule;
- protective stop or invalidation logic;
- profit-taking or trailing logic when applicable;
- if the source strategy had no stop-loss, whether any optional engineering stop is being added for baseline safety and how it can be disabled;
- stop contract: source series, current bar vs previous bar policy, whether `Close` is allowed, whether auxiliary indicators are allowed, whether the stop may loosen, and whether the result is entry-anchored, dynamic protective, or true trailing logic;
- position sizing and per-trade risk;
- commissions and slippage assumptions;
- commission model details when a TSLab `RelativeCommission` or similar block is used, including whether `Margin,%` applies to this market;
- parameters that should be exposed for later optimization;
- every indicator parameter, formula constant, risk constant, and entry/exit threshold that should be optimization-ready;
- visual outputs needed for trader inspection;
- visible plotted trigger/reference levels that should appear on the chart because they are part of the trading decision;
- pane map for each visible series: price pane, separate pane, or hidden;
- proof plan: lifecycle, metrics, chart checks, and intent checks.

## Design Constraints

- Data provider, instrument, and timeframe are required inputs. If missing, ask the user. If the user allows any choice, select from active providers first and document the choice.
- Prefer transparent visual-editor logic.
- Treat commission settings as market-specific, not platform-default. If a commission block includes `Margin,%`, document whether that field is economically applicable to the market.
- Prefer built-in TSLab blocks for common primitives such as `Highest`, `Lowest`, `STDev`, `EMA`, `Close`, `Open`, `High`, and `Low`.
- Prefer formulas for ordinary arithmetic, previous-bar references, comparisons, stop levels, trailing logic, risk per unit, and position size. Do not create a custom indicator for logic that is straightforward as a small set of formulas.
- Do not require a new custom indicator unless standard blocks, formulas, and existing indicators are insufficient.
- Avoid hidden literals that should be parameters.
- Indicator parameters must be optimization-ready by default. If an indicator period, multiplier, threshold, deviation, lookback, smoothing, or similar value is intentionally fixed, document why it should not be optimized.
- If the source strategy has no stop-loss, do not silently invent one and present it as native strategy logic. Any added engineering/protective stop must be declared explicitly in the design and must specify whether it is optional and how it is enabled or disabled.
- If the user specified the stop source and update rule exactly, the implementation must match that contract before lifecycle is treated as meaningful proof.
- If an entry or exit block already expresses the intended direct price semantics, do not add a duplicate logical formula that restates the same threshold test.
- If the user explicitly asked for bar-condition semantics such as "exit only when Close is below the stop level" or "enter only when Close is above the band", that extra logical condition is valid and should be modeled explicitly.
- Do not leave `Margin,% = 10` by default just because the platform prefilled it. For non-equity markets where stock-borrow carry is not the intended model, set `Margin,%` to `0` unless the user explicitly wants another financing-cost assumption. For crypto, default `Margin,%` to `0`.
- Keep the first implementation to the smallest tradable version that can test the hypothesis.
- Treat missing risk as a blocker for trading strategies.

## Next Phase

After the design is accepted or sufficiently clear, use `strategy-plan`. If risk is still underspecified, use `strategy-risk` before or during planning.
