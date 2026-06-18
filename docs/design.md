# Strategy Flow v0.1 Design

## Purpose

Strategy Flow is a standalone Codex plugin for AI-assisted TSLab strategy development. It provides methodology, phase routing, quality gates, risk discipline, and finalization rules.

It is designed to be used from a TSLab `ai-agent` workspace that already contains Web API operation knowledge. The plugin deliberately avoids duplicating low-level TSLab API instructions.

## First Version Scope

Included:

- methodology and skills only;
- strategy-specific brainstorming before design;
- universal support for TSLab trading strategies;
- intake and source-document control;
- mandatory risk phase;
- run-analysis between implementation and optimization/finalization;
- verification and finalization rules;
- references for risk, visual-editor discipline, lifecycle, and anti-overfit review.
- `Strategies/` and `Indicators/` folders for repository order.

Excluded:

- Kaufman/TSM examples;
- ready-made strategy library;
- copied local TSLab API skills;
- official marketplace publication workflow.
- strategy examples or Kaufman/TSM implementation database.

## Skill Model

The plugin uses a router skill plus phase skills:

- `strategy-flow`: choose the active phase.
- `strategy-brainstorming`: own pre-design ideation for strategy-specific semantics.
- `strategy-intake`: classify the task and create or confirm the correct starting document.
- `strategy-research`: convert ideas into hypotheses.
- `strategy-design`: create implementable strategy specs.
- `strategy-plan`: convert strategy specs into an execution plan with documentation, lifecycle, and decision gates.
- `strategy-authoring`: guide TSLab graph implementation discipline.
- `strategy-risk`: require per-trade risk and sizing.
- `strategy-run-analysis`: interpret a run and determine the next allowed workflow step.
- `strategy-verification`: prove strategy correctness and readiness.
- `strategy-optimization`: prevent premature and overfit-prone optimization.
- `strategy-finalization`: produce final handoff documentation.

## Readiness Definition

A strategy is ready only when the graph runs, the trading behavior matches the design, risk is explicit, metrics are inspected, visual-editor output is readable, and final documentation states assumptions and limits.

The intended sequence is:

`strategy-brainstorming -> intake -> research/design -> plan -> authoring -> risk -> run-analysis -> verification -> optimization/finalization`

The document model is:

- `initial-strategy-description` for new ideas;
- `source-strategy-description` for ports from code or another platform;
- `change-description` for modifications of an existing strategy;
- `final-strategy-description` as the required final current-state document for any new, ported, or modified strategy.

## Test Feedback Incorporated

The methodology explicitly blocks these failure modes:

- silently choosing a data provider when provider/instrument/timeframe were not specified;
- creating custom indicators for logic that built-in blocks and formulas can express;
- reimplementing `Highest`, `Lowest`, or `STDev` inside a custom indicator;
- leaving auto-added threshold/debug blocks before delivery;
- leaving even one empty, non-working, unused, duplicate, or template-leftover block in the final graph;
- moving to optimization before risk and `Shares` wiring are complete;
- stopping the workflow without proposing or executing the next correct phase.
