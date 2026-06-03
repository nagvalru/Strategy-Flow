---
name: strategy-flow
description: "Router for TSLab trading strategy work: use when the user asks to design, create, port, improve, verify, optimize, document, or review a TSLab trading strategy."
---

# Strategy Flow Router

Use this skill as the methodology router for TSLab strategy development.

This plugin is a strategy methodology layer. It does not replace the current workspace's TSLab Web API instructions, helper scripts, local `AGENTS*.md` files, or TSLab-specific skills. When a phase requires live TSLab work, load and follow the local TSLab workflow from the active workspace.

## Phase Selection

- New idea or vague strategy request: use `strategy-research`.
- Clear strategy request without a written specification: use `strategy-design`.
- Create, port, or repair a TSLab script: use `strategy-authoring`, then the local TSLab script-authoring workflow.
- Any trading strategy with position sizing, stops, protective exits, or capital allocation: use `strategy-risk`.
- Existing strategy review, delivery check, or "is this ready": use `strategy-verification`.
- Optimization request: use `strategy-optimization`.
- Final report, README, handoff, or publishable strategy description: use `strategy-finalization`.

## Non-Negotiable Rules

- A strategy is not complete just because it validates, builds, loads, or runs.
- If the user did not specify data provider, instrument, and timeframe, ask before creating or mutating the strategy. If the user explicitly says "any" or delegates the choice, prefer active providers from the current TSLab workspace and state the selected provider, instrument, and timeframe before authoring.
- Every trading strategy must have an explicit per-trade risk design or an explicit documented reason why risk cannot be computed from available information.
- Do not optimize before a clean baseline strategy exists and has been verified.
- Prefer standard TSLab blocks first, formulas second, existing project indicators third, and new custom indicators last. Simple formulas are trusted implementation tools and must be preferred over creating a custom indicator for ordinary arithmetic, comparisons, stop levels, and position sizing.
- Keep strategy logic inspectable in the visual editor whenever reasonable.
- Preserve the distinction between a trading hypothesis, implementation mechanics, backtest results, and final claims.
- Keep workflow continuity. After each phase, either perform the next required phase or explicitly propose the next correct phase. Do not jump from authoring to optimization while risk or verification is incomplete.

## Completion Gate

Before saying the strategy is finished, all applicable phase gates must be satisfied:

- research hypothesis is clear;
- design describes indicators, signals, entries, exits, risk, parameters, and expected proof;
- TSLab graph has a meaningful trade path;
- risk and position sizing are specified;
- `Shares` inputs for opening position blocks are intentionally connected or the fixed-size behavior is explicitly documented as a prototype limitation;
- lifecycle and metrics were verified through the local TSLab workflow;
- graph and visualization are clean enough for a trader to inspect;
- temporary threshold, constant, debug, and auto-visualization blocks that are not part of the strategy have been removed;
- final documentation states assumptions, limits, and evidence.
