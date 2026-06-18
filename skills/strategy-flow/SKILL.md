---
name: strategy-flow
description: "Router for TSLab trading strategy work: use when the user asks to design, create, port, improve, verify, optimize, document, or review a TSLab trading strategy."
---

# Strategy Flow Router

Use this skill as the methodology router for TSLab strategy development.

This plugin is a strategy methodology layer. It does not replace the current workspace's TSLab Web API instructions, helper scripts, local `AGENTS*.md` files, or TSLab-specific skills. When a phase requires live TSLab work, load and follow the local TSLab workflow from the active workspace.

## Phase Selection

- Exploratory strategy request that still needs trading-specific ideation: use `strategy-brainstorming`.
- New request or ambiguous starting point: use `strategy-intake`.
- New idea or vague strategy request: use `strategy-research`.
- Clear strategy request without a written specification: use `strategy-design`.
- Written or accepted strategy design that now needs an execution sequence: use `strategy-plan`.
- Create, port, or repair a TSLab script: use `strategy-authoring`, then the local TSLab script-authoring workflow.
- Any trading strategy with position sizing, stops, protective exits, or capital allocation: use `strategy-risk`.
- A strategy has been run and the result must be interpreted before deciding what comes next: use `strategy-run-analysis`.
- Existing strategy review, delivery check, or "is this ready": use `strategy-verification`.
- Optimization request: use `strategy-optimization`.
- Final report, README, handoff, or publishable strategy description: use `strategy-finalization`.

## Non-Negotiable Rules

- A strategy is not complete just because it validates, builds, loads, or runs.
- If the user did not specify data provider, instrument, and timeframe, ask before creating or mutating the strategy. If the user explicitly says "any" or delegates the choice, prefer active providers from the current TSLab workspace and state the selected provider, instrument, and timeframe before authoring.
- Every trading strategy must have an explicit per-trade risk design or an explicit documented reason why risk cannot be computed from available information.
- Do not optimize before a clean baseline strategy exists and has been verified.
- Prefer standard TSLab blocks first, formulas second, existing project indicators third, and new custom indicators last. Simple formulas are trusted implementation tools and must be preferred over creating a custom indicator for ordinary arithmetic, comparisons, stop levels, and position sizing.
- When the user or source document specifies exact trading semantics, semantic fidelity overrides generic implementation heuristics such as "built-in blocks first".
- Keep strategy logic inspectable in the visual editor whenever reasonable.
- Preserve the distinction between a trading hypothesis, implementation mechanics, backtest results, and final claims.
- Preserve the distinction between the starting source document and the final strategy description. New, ported, and modified strategies all require an updated final description of what the resulting strategy actually does.
- Keep workflow continuity. After each phase, either perform the next required phase or explicitly propose the next correct phase. Do not jump from authoring to optimization while risk or verification is incomplete.
- If the active workspace already contains project-specific strategy-development documents or templates, preserve and use those rules rather than replacing them with weaker generic summaries.

## Completion Gate

Before saying the strategy is finished, all applicable phase gates must be satisfied:

- intake classified the task and established the right starting document when the request did not begin with one;
- research hypothesis is clear;
- design describes indicators, signals, entries, exits, risk, parameters, and expected proof;
- a concrete execution plan exists before substantial graph authoring begins;
- TSLab graph has a meaningful trade path;
- risk and position sizing are specified;
- `Shares` inputs for opening position blocks are intentionally connected or the fixed-size behavior is explicitly documented as a prototype limitation;
- run analysis classified the last real run and allowed the current next step;
- lifecycle and metrics were verified through the local TSLab workflow;
- final visual and pane audit passed after the last graph mutation and after any optimization/apply that changed plotted behavior;
- graph and visualization are clean enough for a trader to inspect;
- temporary threshold, constant, debug, and auto-visualization blocks that are not part of the strategy have been removed;
- strategy documentation exists and reflects the implemented logic;
- modified strategies end with a full updated final description, not only change notes;
- any new custom indicator has its own documentation and is reflected in the indicator registry when the project uses one;
- final documentation states assumptions, limits, and evidence.
