# Indicator Policy

Use this reference before creating or using a custom indicator.

## Priority Order

1. Built-in TSLab blocks.
2. Formula blocks.
3. Existing documented project indicators.
4. New custom indicator.

## Built-In Blocks First

Use built-in blocks for common calculations:

- `Highest` / `МаксимумЗа`;
- `Lowest` / `МинимумЗа`;
- `STDev`;
- `EMA`;
- OHLCV source blocks;
- standard comparison, arithmetic, and position blocks.

Do not reimplement these inside a custom indicator unless there is a concrete limitation in the built-in block.

## Formulas Are First-Class Tools

Simple formulas are acceptable and should be preferred for:

- previous-bar references;
- breakout conditions;
- stop levels;
- trailing stop updates;
- risk per unit;
- position size;
- small arithmetic transformations;
- boolean entry and exit gates.

Do not treat formulas as unreliable just because they are formulas. Verify formula inputs and code names through the current TSLab graph.

## Avoid Monster Indicators

Do not create a single custom indicator that combines:

- channel calculation;
- volatility calculation;
- signal generation;
- stop calculation;
- trailing logic;
- position sizing.

That hides strategy logic and makes the visual editor less useful. Use a custom indicator only when it encapsulates a genuinely reusable primitive or a calculation that cannot be expressed safely with blocks and formulas.

## Local Organization

When local indicator artifacts are required, keep them under `Indicators/`. Prefer one shared indicator library for project indicators instead of one separate library per small indicator.

