# Strategy Flow for OpenCode

Strategy Flow can be used in OpenCode as a git-backed plugin. It provides the strategy-development workflow while the active workspace provides the live TSLab API instructions and helpers.

## Install

Add this to `opencode.json`:

```json
{
  "plugin": ["strategy-flow@git+https://github.com/nagvalru/Strategy-Flow.git"]
}
```

Restart OpenCode after changing the config.

## What the plugin does

1. Registers the local `skills/` directory so OpenCode can discover the Strategy Flow skills.
2. Injects the router skill into the first user message of the session.
3. Leaves live TSLab API work to the active workspace instead of trying to replace it.

## Recommended usage

- Use Strategy Flow for workflow and quality gates.
- Use your TSLab workspace for live authoring, graph mutation, lifecycle, metrics, and indicator operations.
- Keep provider, instrument, timeframe, risk, cleanup, and verification gates explicit before optimization.
