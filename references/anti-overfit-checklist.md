# Anti-Overfit Checklist

Use this reference before accepting optimized strategy parameters.

## Red Flags

- too few trades;
- extreme parameter value selected at range boundary;
- large performance difference from neighboring values;
- best result selected by net profit only;
- drawdown ignored;
- optimization range chosen after seeing results;
- many parameters optimized at once;
- indicator parameters omitted from optimization even though they drive entries, exits, stops, or filters;
- strategy only works on one narrow date range;
- risk model changes during optimization without being documented.

## Better Evidence

- stable neighboring parameter values;
- acceptable drawdown;
- enough trades for the timeframe and strategy type;
- simple parameter set;
- every strategy-driving indicator parameter is either optimized or intentionally fixed with a stated reason;
- out-of-sample or walk-forward evidence when available;
- result remains plausible after costs;
- selected parameters make trading sense.

## Reporting

Always report optimization result as evidence, not proof. State remaining uncertainty.
