# Strategy Flow

Strategy Flow is a Codex plugin that gives AI agents a disciplined methodology for creating TSLab trading strategies.

It is not a library of ready-made strategies and it does not replace the technical TSLab Web API instructions in your workspace. It is a methodology layer: it tells the agent how to think, what phases to follow, what evidence to collect, and what must be true before a strategy can be called finished.

## Scope

Strategy Flow v0.1 focuses on:

- trading hypothesis research;
- strategy design before implementation;
- TSLab visual-editor authoring discipline;
- mandatory per-trade risk design;
- verification of graph quality, signals, trades, and metrics;
- optimization only after a working baseline exists;
- final documentation and delivery checks;
- repository organization for `Strategies/` and `Indicators/`.

It intentionally does not include example strategy implementations in v0.1.

## Repository Organization

- `Strategies/`: strategy specs, final reports, and strategy-specific notes.
- `Indicators/`: shared custom indicator source/build artifacts when custom indicators are truly needed.
- `skills/`: Codex skills that drive the workflow.
- `references/`: detailed methodology references loaded only when needed.

Custom indicators should be a last resort. Built-in TSLab blocks and formulas are preferred for ordinary strategy logic.

## Expected Environment

Use this plugin from a workspace that already contains the TSLab Web API operational instructions and helpers, such as an `ai-agent` workspace with local TSLab skills and `AGENTS*.md` files.

The plugin assumes the agent can use the current workspace's TSLab API workflow for concrete operations such as creating scripts, mutating graphs, running lifecycle checks, reading metrics, and working with indicators.

## Installation

Clone this repository into a local plugins directory or any local path that Codex can reference.

If you use a local marketplace file, add an entry that points to this folder and uses the plugin name:

```json
{
  "name": "strategy-flow",
  "source": {
    "source": "local",
    "path": "./strategy-flow"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Coding"
}
```

The plugin manifest is stored at:

```text
.codex-plugin/plugin.json
```

## Skills

- `strategy-flow`: router and phase selection.
- `strategy-research`: convert an idea into a testable trading hypothesis.
- `strategy-design`: specify indicators, signals, entries, exits, parameters, and proof requirements.
- `strategy-authoring`: implement strategies in TSLab with visual-editor discipline.
- `strategy-risk`: define and verify per-trade risk and position sizing.
- `strategy-verification`: prove the graph, behavior, and metrics are coherent.
- `strategy-optimization`: optimize only after a clean baseline exists.
- `strategy-finalization`: produce final documentation and delivery evidence.

## License

MIT
