---
name: strategy-design
description: "Use when creating a written specification for a TSLab trading strategy before implementation."
---

# Strategy Design

Use this phase before graph authoring. The goal is a specification precise enough that the agent can implement the strategy without inventing hidden trading rules.

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
- protective stop or invalidation logic;
- profit-taking or trailing logic when applicable;
- position sizing and per-trade risk;
- commissions and slippage assumptions;
- parameters that should be exposed for later optimization;
- every indicator parameter, formula constant, risk constant, and entry/exit threshold that should be optimization-ready;
- visual outputs needed for trader inspection;
- proof plan: lifecycle, metrics, chart checks, and intent checks.

## Design Constraints

- Data provider, instrument, and timeframe are required inputs. If missing, ask the user. If the user allows any choice, select from active providers first and document the choice.
- Prefer transparent visual-editor logic.
- Prefer built-in TSLab blocks for common primitives such as `Highest` / `МаксимумЗа`, `Lowest` / `МинимумЗа`, `STDev`, `EMA`, `Close`, `Open`, `High`, and `Low`.
- Prefer formulas for ordinary arithmetic, previous-bar references, comparisons, stop levels, trailing logic, risk per unit, and position size. Do not create a custom indicator for logic that is straightforward as a small set of formulas.
- Do not require a new custom indicator unless standard blocks, formulas, and existing indicators are insufficient.
- Avoid hidden literals that should be parameters.
- Indicator parameters must be optimization-ready by default. If an indicator period, multiplier, threshold, deviation, lookback, smoothing, or similar value is intentionally fixed, document why it should not be optimized.
- Keep the first implementation to the smallest tradable version that can test the hypothesis.
- Treat missing risk as a blocker for trading strategies.

## Next Phase

After the design is accepted or sufficiently clear, use `strategy-authoring`. If risk is still underspecified, use `strategy-risk` first.
