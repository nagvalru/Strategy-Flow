---
name: strategy-run-analysis
description: "Use after a TSLab strategy has been run and the agent must interpret bars, trades, logs, metrics, and stop behavior to determine the next allowed workflow step."
---

# Strategy Run Analysis

Use this phase after authoring, risk wiring, and a real run attempt.

The goal is to decide what the run actually proved and what the next allowed step is.

## Read the Run Evidence

Inspect:

- run status;
- bars loaded;
- trades and position behavior;
- metrics summary;
- logs and messages;
- chart outputs needed to compare signals with trades.

## Analyze Trading Behavior

Check:

- whether trades actually occur;
- whether entries match the written strategy rules;
- whether exits match the written strategy rules;
- whether native entry/exit block semantics were used cleanly or were wrapped in redundant logical conditions;
- whether the latest mutation introduced any `AlwaysTrue` gate or redundant position/existence gate;
- whether warm-up behavior is sane;
- whether stop and trailing logic behave as intended;
- whether `Shares` and risk sizing affect actual openings;
- whether there are immediate exits, same-bar exits, or nearly zero holding times that contradict the intended strategy type.

For trend strategies, treat immediate exit behavior as a blocker unless it is explicitly intended.

## Classify the Result

Return exactly one main result:

- `Needs authoring repair`
- `Needs risk repair`
- `Blocked by runtime/data issue`
- `Ready for verification`
- `Ready for optimization`
- `Ready for finalization`

## Classification Rules

Use `Needs authoring repair` when:

- entries or exits do not match the described logic;
- the mutation introduced redundant or `AlwaysTrue` gating;
- trades never happen because the graph logic is wrong;
- the graph runs but produces nonsensical trade behavior;
- chart logic and trade logic diverge.

Use `Needs risk repair` when:

- stop logic is not a real risk contract;
- `Shares` is missing, accidental, or disconnected;
- capital base for percent risk is missing or incoherent;
- trailing logic widens risk after entry without explicit design approval;
- trend strategy stop settings cause obviously premature exits.

Use `Blocked by runtime/data issue` when:

- the strategy cannot produce bars or useful metrics because of a concrete runtime or data blocker that is explicitly identified.

Use `Ready for verification` when:

- the run shows coherent behavior and the next step is a broader graph and delivery-quality review.

Use `Ready for optimization` only when:

- the baseline run is coherent;
- metrics are usable;
- risk is connected;
- indicator and strategy parameters are optimization-ready;
- there is no unresolved visual/pane blocker from plotted series changed by the latest mutation;
- nothing still requires authoring or risk repair.

Use `Ready for finalization` only when:

- optimization is not required or is already complete;
- the run and graph are both clean enough to deliver.

## Output Contract

Always return:

- the main classification;
- the evidence behind it;
- the next allowed phase.

Do not say only what happened. Say what the agent is allowed to do next.
