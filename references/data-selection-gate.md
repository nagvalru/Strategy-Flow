# Data Selection Gate

Use this reference before creating or mutating a TSLab strategy when provider, instrument, or timeframe are not explicit.

## Required Inputs

Before authoring a new strategy, know:

- data provider;
- instrument/security;
- timeframe/interval;
- date range when relevant;
- whether the data should be live, cached, offline, or backtest-only.

## If Missing

Ask the user for missing provider, instrument, and timeframe before creating the strategy.

If the user says "any", "choose yourself", or delegates the choice:

1. inspect active providers from the current TSLab workspace using local TSLab rules;
2. prefer active providers with available instruments;
3. state the selected provider, instrument, and timeframe before authoring;
4. do not silently choose a provider such as OKX, ByBit, or another source without explaining why.

## Reporting

Final reports must include the provider, instrument, timeframe, and date range or state why a date range was not used.

