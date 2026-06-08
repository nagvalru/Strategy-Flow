# Risk Management Contract

Use this reference when designing or reviewing risk for a TSLab trading strategy.

## Minimum Contract

Every trading strategy must define:

- account risk rule or fixed size rule;
- entry price source;
- stop or invalidation level;
- risk per unit;
- position size;
- how the calculated size reaches the opening position block `Shares` input;
- commission and slippage assumptions;
- whether the commission model includes a `Margin,%` / borrow-carry component and whether that component is valid for the market;
- behavior when the risk model cannot produce a valid size.
- if the original source logic had no stop-loss, whether any added engineering stop is optional and how it is disabled.

## Common Models

### Fixed Size

Use when early prototyping or when the strategy intentionally trades a constant quantity. The final report must say this is fixed-size, not risk-normalized.

### Fixed Money Risk

Position size is based on account currency risk:

```text
size = allowed_money_risk / abs(entry_price - stop_price)
```

### Fixed Percent Risk

Position size is based on account equity:

```text
allowed_money_risk = equity * risk_percent
size = allowed_money_risk / abs(entry_price - stop_price)
```

## Direction Checks

For long trades:

- stop should normally be below entry;
- risk is `entry - stop`.

For short trades:

- stop should normally be above entry;
- risk is `stop - entry`.

If the strategy uses another model, document it explicitly.

## Invalid Risk Behavior

If risk distance is zero, negative, missing, or too small to be meaningful, the strategy should avoid opening a new position or fall back to a documented fixed-size prototype mode.

## Added Engineering Stops

If the source strategy originally had no stop-loss:

- do not silently add a stop and present it as native source logic;
- if an engineering/protective stop is introduced for baseline safety, document it explicitly;
- make that added stop switchable, for example with a logical constant or equivalent on/off gate feeding the stop-close blocks;
- distinguish between an entry-anchored stop-loss and a dynamic protective level.

For example:

- entry-anchored long stop: `entryLong - 2 * ATR`
- entry-anchored short stop: `entryShort + 2 * ATR`

A bar-by-bar level such as `close - 2 * ATR` for long or `close + 2 * ATR` for short is not a proper trailing stop unless additional monotonic logic prevents it from loosening risk against the position.

## Commission and Margin Field

If a TSLab commission block includes `Margin,%`, do not leave the platform default blindly.

- `Margin,%` is a market-model assumption, not a neutral default.
- If the strategy is for equities and the user intends overnight stock-borrow carry for short positions, document the chosen value explicitly.
- If the strategy is for crypto or another non-equity market where this stock-borrow model does not apply, set `Margin,%` to `0` unless the user explicitly wants another financing-cost assumption.
- Final reports must state the commission model clearly enough that another trader can understand whether the backtest includes only execution commission or also financing/borrow carry.

## Trend Strategy Stop Checks

For trend-following strategies, also verify:

- the initial stop is not so close that the strategy exits immediately by construction;
- the trailing stop does not activate too early on the entry bar unless that is explicitly intended;
- the trailing stop moves only in the direction of the position and does not widen risk after entry unless that behavior is explicitly intended;
- for long positions, the trailing stop is monotonic non-decreasing;
- for short positions, the trailing stop is monotonic non-increasing;
- stop-gate logic prevents zero-bar exits when the platform requires an explicit gate;
- volatility fractions or multipliers are plausible for the instrument and timeframe;
- observed minimum holding time is compatible with the strategy design, rather than showing accidental immediate exits.

## Optimization Block

Do not move to optimization while per-trade risk is absent, `Shares` is empty, or the graph only has a placeholder/fixed size by accident.
