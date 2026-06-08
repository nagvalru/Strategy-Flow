---
name: strategy-research
description: "Use when turning a raw trading idea into a testable TSLab strategy hypothesis before design or implementation."
---

# Strategy Research

Use this phase after `strategy-intake` when the trading idea is incomplete, ambiguous, or only described informally.

## Goal

Produce a compact trading hypothesis that can later be decomposed, implemented, and tested in TSLab.

## Research Checklist

Clarify or infer:

- market and instrument class;
- timeframe and trading session assumptions;
- market regime the idea expects to exploit;
- long, short, or symmetric behavior;
- signal source and why it should have predictive value;
- entry logic;
- exit logic;
- protective stop or invalidation logic;
- position sizing and per-trade risk intent;
- data requirements;
- what result would make the idea worth keeping;
- what result would falsify the idea.

## Output Contract

Do not jump to implementation from a vague idea. End this phase with a short hypothesis:

- "This strategy tries to profit from..."
- "It should trade when..."
- "It should avoid trading when..."
- "Risk is controlled by..."
- "The first TSLab prototype should prove..."

Then move to `strategy-design`.

