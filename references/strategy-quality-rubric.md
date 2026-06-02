# Strategy Quality Rubric

Use this reference for strategy review and finalization.

## Prototype

- runs or has a known blocker;
- core idea is represented;
- risk may be fixed-size or incomplete;
- suitable for further development only.

## Research Candidate

- runs cleanly;
- entries and exits match the design;
- per-trade risk is specified;
- metrics are available;
- visual editor graph is inspectable;
- known limitations are documented.

## Production Candidate

- all research-candidate requirements are met;
- costs are included;
- risk behavior is robust;
- optimization, if used, has anti-overfit checks;
- strategy-driving indicator parameters are optimized or explicitly documented as fixed;
- data assumptions are explicit;
- edge cases and failure modes are reviewed.

## Not Ready

Use this label when:

- the graph has disconnected or dead critical logic;
- the graph contains empty, non-working, duplicate, or template-leftover blocks;
- lifecycle is not clean and no concrete blocker is reported;
- trades do not match signals;
- position sizing is missing by accident;
- the stop/protective exit is not a real risk level;
- indicator parameters that drive the strategy are not optimization-ready and no fixed-parameter reason is documented;
- final documentation makes claims not supported by evidence.
