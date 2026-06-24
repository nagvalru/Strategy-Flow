---
name: strategy-plan
description: "Use after strategy design and before TSLab graph authoring to turn a strategy spec into a concrete execution plan with documentation, indicator, risk, lifecycle, and decision gates."
---

# Strategy Plan

Use this phase after `strategy-design` and before `strategy-authoring`.

The goal is to convert a strategy specification into a concrete execution plan that the agent can follow without skipping risk, documentation, indicator checks, or run analysis.

## Existing Project Rules

Strategy Flow is a public methodology plugin. It should remain neutral with respect to any one trader, author, or private workspace.

If the active workspace already contains its own strategy-development standards, templates, or indicator rules, preserve them when they are stronger or more specific than the generic Strategy Flow defaults.

Do not create a competing documentation standard inside the same project when the project already has:

- a strategy description template;
- an indicator description template;
- a risk document;
- an indicator registry;
- project-specific implementation rules for the TSLab visual editor.

## Required Plan Output

Produce a step-by-step execution plan that includes:

1. create or locate the target script;
2. map the source data;
3. confirm stop contract and pane map before graph authoring;
4. build the minimum meaningful trade path;
5. add risk sizing and connect `Shares`;
6. add initial stop and trailing/protective logic;
7. clean the graph;
8. run lifecycle proof;
9. inspect metrics, messages, and logs;
10. run final visual and pane audit after the last mutation;
11. decide: repair, optimize, or finalize.

Every substantial mutation inside the plan must include a mini-loop:

- mutate;
- cleanup audit;
- lifecycle proof;
- decide whether the mutation is accepted or must be repaired immediately.

## Required Documentation Checks

The plan must also include:

- confirm which starting document exists: `initial-strategy-description`, `source-strategy-description`, or `change-description`;
- create or update the strategy documentation under the strategy folder;
- verify that the strategy logic is described in human language, not only as graph blocks;
- plan to produce a full `final-strategy-description` after implementation, even when the task is only a modification of an existing strategy;
- if a new custom indicator is created, create or update its own final indicator description;
- if a new custom indicator is created, update the indicator registry/list in the active project when that registry exists;
- if the active project already has a strategy-description or indicator-description standard, follow that standard instead of inventing a new one;
- preserve links between strategy documentation and indicator documentation.
- define whether the current goal is prototype, verified baseline, delivery-clean, or live-trading-ready.

## Indicator Decision Gate

Before allowing a new indicator in the plan, explicitly check:

- can this be done with standard TSLab blocks;
- can this be done with formulas;
- does an existing documented project indicator already exist;
- is the new indicator a reusable primitive rather than a one-off strategy hack.

If the answer does not justify a new indicator, the plan must return to built-in blocks or formulas.

## Plan Shape

Each plan step should say:

- what artifact is being changed;
- what proof will confirm the step;
- what blocker would force a repair loop instead of continuing.

The stop-contract step must explicitly say:

- source level for long and short stops;
- whether the formula may use `Close`;
- whether the stop is entry-anchored, dynamic protective, or monotonic trailing;
- whether any engineering stop is optional and how it is switched on or off.

The risk step must explicitly say:

- what capital base is used if risk is percent-based;
- whether that capital base comes from initial deposit, a constant, or another explicit source;
- whether risk parameters must be optimization-ready.

## Exit Conditions

Do not allow the plan to jump directly from authoring to optimization.

The execution plan must explicitly pass through:

- risk complete;
- run analysis complete;
- graph cleanup complete;
- final visual and pane audit complete;
- documentation complete enough for finalization.
