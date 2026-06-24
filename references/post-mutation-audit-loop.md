# Post-Mutation Audit Loop

Use this reference after any substantial graph mutation.

## Purpose

A TSLab strategy can become structurally runnable while drifting away from the intended workflow.

This loop exists to prevent skipped cleanup and skipped verification after changes such as:

- new risk model;
- stop rewrite;
- entry or exit rewrite;
- new plotted series;
- optimization mapping changes;
- server-side repair mutations.

## Required Checks After Each Substantial Mutation

Run these checks before moving on:

1. **Semantic check**
   - Does the new logic still match the declared trading semantics?
   - Did any `AlwaysTrue` or redundant gate appear?

2. **Graph cleanup check**
   - Any empty blocks?
   - Any dead helper blocks?
   - Any leftover links or parasite links?
   - Any duplicate panes or stray plotted series?

3. **Risk contract check**
   - If risk changed, is capital base explicit?
   - Is `Shares` still connected correctly?
   - Are risk parameters either fixed with explanation or mapped for optimization?

4. **Lifecycle proof**
   - validate/build/load/run as required by the local workspace;
   - inspect messages and run status.

5. **Next-step decision**
   - repair;
   - continue authoring;
   - verification;
   - optimization only if all prior gates are still clean.

## Blocking Conditions

Do not treat a mutation as complete if:

- it introduced an `AlwaysTrue` gate or redundant gate;
- it introduced unused blocks, links, or panes;
- it changed risk logic without rechecking the capital base and optimization mappings;
- it changed plotted series without rechecking chart cleanliness.
