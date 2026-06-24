# Strategy Flow

Strategy Flow is a Codex plugin that gives AI agents a disciplined methodology for creating TSLab trading strategies.

It is not a library of ready-made strategies and it does not replace the technical TSLab Web API instructions in your workspace. It is a methodology layer: it tells the agent how to think, what phases to follow, what evidence to collect, and what must be true before a strategy can be called finished.

## Scope

Strategy Flow v0.1 focuses on:

- strategy-specific brainstorming and intake ownership;
- task intake and source-document setup;
- trading hypothesis research;
- strategy design before implementation;
- execution planning before graph mutation;
- TSLab visual-editor authoring discipline;
- mandatory per-trade risk design;
- post-run analysis that decides the next allowed step;
- verification of graph quality, signals, trades, and metrics;
- optimization only after a working baseline exists;
- final documentation and delivery checks;
- post-mutation cleanup and verification loops;
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

### Codex

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

### Claude Code

This repository includes:

- `CLAUDE.md` as the bootstrap context file
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

Use those files if you publish or load the plugin into Claude-compatible plugin workflows.

### Gemini

This repository includes:

- `GEMINI.md`
- `gemini-extension.json`

These files make the repository usable as a Gemini extension/context package.

### Cursor

This repository includes:

- `.cursor-plugin/plugin.json`

This gives Cursor a native plugin manifest with the local `skills/` directory.

### OpenCode

This repository includes:

- `.opencode/INSTALL.md`
- `.opencode/plugins/strategy-flow.js`
- [docs/README.opencode.md](./docs/README.opencode.md)

Use the OpenCode plugin when you want the router skill injected automatically at session start.

## Skills

- `strategy-flow`: router and phase selection.
- `strategy-brainstorming`: trading-specific ideation before design when stop semantics, pane mapping, and delivery scope are still unclear.
- `strategy-intake`: classify the task and establish the correct starting document.
- `strategy-research`: convert an idea into a testable trading hypothesis.
- `strategy-design`: specify indicators, signals, entries, exits, parameters, and proof requirements.
- `strategy-plan`: turn the accepted design into a concrete execution plan with documentation and decision gates.
- `strategy-authoring`: implement strategies in TSLab with visual-editor discipline.
- `strategy-risk`: define and verify per-trade risk and position sizing.
- `strategy-run-analysis`: interpret run results and decide the next allowed phase.
- `strategy-verification`: prove the graph, behavior, and metrics are coherent.
- `strategy-optimization`: optimize only after a clean baseline exists.
- `strategy-finalization`: produce final documentation and delivery evidence.

## License

MIT
