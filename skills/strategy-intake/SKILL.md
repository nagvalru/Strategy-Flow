---
name: strategy-intake
description: "Use when starting a TSLab strategy task and the agent must classify the request, collect missing inputs, choose the correct source document, and create a clean starting point before research, design, or authoring."
---

# Strategy Intake

Use this phase between the first user request and the first research, design, or authoring step.

The goal is to prevent the agent from mutating a TSLab strategy before the task type, data context, and source document are clear.

If the request is still exploratory or semantically underdefined, use `strategy-brainstorming` first.

## Classify the Task

Determine which mode applies:

- new strategy idea;
- porting a foreign idea;
- porting existing code;
- modifying an existing strategy;
- repairing a broken strategy;
- review only.

## Required Inputs

Confirm or ask for:

- data provider;
- instrument;
- timeframe;
- long, short, or both;
- strategy style when known: trend, counter-trend, breakout, mean reversion, other;
- target result: prototype, runnable baseline, optimization-ready, or final documented strategy.
- whether trader-facing delivery cleanliness matters for this run or only prototype behavior matters.
- whether the risk model is already known or still undecided.

If provider, instrument, or timeframe are missing, stop and ask.

If the user explicitly delegates the choice, select from active providers first and state the chosen provider, instrument, and timeframe before moving on.

If the risk model is still undecided, do not silently treat it as settled. Record that it remains open or state the default assumption chosen for the current iteration.

## Required Source Document

Choose the correct starting document:

- `initial-strategy-description` for a new strategy idea;
- `source-strategy-description` for porting a foreign idea or existing code;
- `change-description` for modifying an existing strategy;
- `review-baseline` for a pure audit or readiness review.

The starting document must live under the strategy folder and describe the work in human language, not only as code or graph blocks.

## What Each Starting Document Must Capture

### Initial Strategy Description

Use for new ideas. Capture:

- the trading hypothesis;
- expected market regime;
- expected entries and exits;
- initial risk intent;
- open questions that design must resolve.

### Source Strategy Description

Use for porting code or another platform's strategy. Capture:

- what the source logic already does;
- indicators and calculations present in the source;
- long and short entries;
- long and short exits;
- risk logic already present or missing;
- exact stop semantics already present or explicitly absent;
- parts that map cleanly to TSLab built-ins or formulas;
- parts that may require an existing or new indicator.

### Change Description

Use for modifying an existing strategy. Capture:

- current strategy being changed;
- what behavior must change;
- what behavior must remain untouched;
- what new risk, stop, or parameter behavior is expected;
- what plotted series and panes must remain trader-facing in the result;
- what final document will need to be updated after implementation.

## Exit Rules

Do not jump to authoring from intake.

After intake:

- use `strategy-research` when the idea still needs a trading hypothesis;
- use `strategy-design` when the source document exists and now needs technical decomposition;
- use `strategy-authoring` only when the task is a narrow repair on a well-understood existing script and the required logic is already fully described.
