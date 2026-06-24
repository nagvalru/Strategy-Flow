---
name: strategy-authoring
description: "Use when implementing, porting, or repairing a TSLab trading strategy while preserving visual-editor clarity and local TSLab Web API rules."
---

# Strategy Authoring

Use this phase for actual TSLab script creation or graph mutation.

This skill controls strategy methodology. For concrete API calls, routes, helper usage, request-body files, lifecycle, and graph mutation rules, follow the current workspace's local TSLab instructions and skills.

## Authoring Order

1. Use standard TSLab blocks when they express the logic clearly.
2. Use formula blocks for derived conditions, previous-bar references, price levels, trailing stops, risk per unit, and position sizing when the formula is simple and inspectable.
3. Use existing project indicators only when their origin and behavior are documented.
4. Create a new custom indicator only when the first three options are not suitable.

Built-in primitives such as `Highest`, `Lowest`, and `STDev` must be used instead of reimplementing those calculations inside a custom indicator.

Do not create monster indicators that combine channel calculation, volatility, signal generation, stop logic, and risk sizing in one opaque handler. Split strategy logic into built-in blocks and formulas unless there is a specific, documented reason not to.

## Entry And Exit Semantics

- If a TSLab entry or exit block already captures the intended direct price-trigger behavior, wire the relevant price level into that block and stop there.
- Do not add a boolean formula that merely restates the same direct threshold logic. That creates redundant semantics and often leaves dead blocks after later repairs.
- Do not add `AlwaysTrue` wrappers such as `Close >= Close`, `Price <= Price`, `PositionSize > 0`, or other conditions already implied by the native block behavior.
- Add a separate boolean condition only when the strategy explicitly requires bar-condition semantics beyond the native block behavior, for example:
  - `Close > level`
  - `Close < level`
  - `High > level` with separate confirmation logic
  - `Low < level` with separate confirmation logic
  - an additional enable/disable gate that is truly part of the trading rule
- For `ClosePositionByStopItem` or equivalent stop-close blocks, do not add a separate logical gate unless the strategy explicitly requires an extra exit-enable condition beyond position plus stop price.

## First Working Prototype

The first implementation should establish one meaningful tradable path:

- mapped source data;
- confirmed provider, instrument, and timeframe;
- entry logic;
- protective or profit-taking exit;
- position size input;
- commission/slippage when supported;
- explicit `Margin,%` review when the commission block contains that field;
- required visual overlays for inspection.

Do not build a complex multi-branch system before the first clean lifecycle proof.

## Visual-Editor Discipline

- Avoid dead blocks, detached indicators, and unused helper panes.
- Keep the graph minimal. Every block must have a current purpose: trade path, risk sizing, exit logic, parameter/control, or intentional trader-facing visualization. Empty, non-working, disconnected, duplicate, or speculative helper blocks are blockers.
- Before completion, be able to classify every block explicitly as trade path, risk path, parameter, trader-facing visualization, or justified helper still required for runtime behavior. If a block cannot be classified, remove or rewrite it.
- Remove auto-added threshold blocks, temporary constants, debug blocks, template leftovers, diagnostic entry gates, and visualization/helper blocks that are not part of the final strategy logic. These blocks can cause compilation problems and are a delivery blocker.
- After using a template or repair route, audit the added blocks before lifecycle. If the template created semantically unclear helper blocks, unused protective flags, empty placeholders, or blocks that do not participate in the final logic, either wire/rename them intentionally or remove them.
- After any substantial mutation, run a cleanup audit immediately. Do not postpone cleanup until the end if the mutation changed entry, exit, risk, panes, plotted series, or optimization mappings.
- Keep chart output readable.
- For price levels and other calculated series that can be zero or absent on many bars, prefer `Chart style = Line without zeroes`.
- For formula outputs and other calculated lines shown on the chart, default to `Chart style = Line without zeroes` and `Line Style = Solid line` unless the design explicitly requires another style.
- When a block is shown on the chart and its zero values do not represent meaningful trader-facing information, do not use plain `Line`; use `Line without zeroes`.
- Do not plot constants or thresholds on a pane whose numeric scale is unrelated to that value. Dimensionless thresholds such as `0.3`, `0.7`, probabilities, normalized bands, and oscillator levels belong on the indicator pane that uses the same scale, not on the main price chart.
- If a constant or threshold is already visualized on its correct pane, do not duplicate it on another pane unless the duplication is explicitly justified.
- Do not let diagnostic series become the main visual output.
- Ensure plotted signals match actual trading conditions.
- Plot the trader-relevant trigger or reference level when that level is part of the execution rule and useful for inspection. Do not substitute an easier generic overlay if it hides the actual trigger line.
- Expose meaningful parameters instead of burying important constants.
- If two parameters are logically one trading knob, do not expose them as two independent optimization knobs unless the design explicitly calls for independent control.
- Add optimization ranges for indicator parameters and formula constants that define strategy behavior, unless the design explicitly marks them fixed. This includes periods, lookbacks, STDev periods/multipliers, channel lengths, trailing coefficients, thresholds, and risk constants.
- If a newly introduced risk parameter affects strategy behavior, either expose it to optimization or explicitly document why it is fixed.
- Do not trust default commission-block values. If the block has `Margin,%`, set it intentionally for the target market instead of leaving the default. For crypto and other non-equity markets where stock-borrow carry is not intended, set `Margin,% = 0` unless the design says otherwise.

## Project Organization

When this plugin owns local project artifacts, keep them organized:

- strategy documentation and strategy-specific artifacts go under `Strategies/`;
- custom indicator source and compiled library artifacts go under `Indicators/`;
- custom indicators should belong to one project/library where practical, not one separate library per tiny indicator.

## Completion Gate

After graph mutation, remove or repair unused/empty/non-working blocks, check for stray links and panes, then run the local TSLab proof sequence required by the workspace. Then use `strategy-risk` and `strategy-verification` before optimization or finalization.
