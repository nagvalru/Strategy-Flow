# Installing Strategy Flow for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- a workspace that already contains the TSLab Web API instructions and helpers you want the agent to use for live operations

## Installation

Add Strategy Flow to the `plugin` array in your `opencode.json`:

```json
{
  "plugin": ["strategy-flow@git+https://github.com/nagvalru/Strategy-Flow.git"]
}
```

Restart OpenCode. The plugin installs through OpenCode's plugin manager and registers the Strategy Flow skills.

Verify by asking:

```text
Tell me what Strategy Flow does for TSLab strategies
```

OpenCode uses its own plugin install. If you also use Claude, Cursor, Codex, or Gemini, install Strategy Flow separately for each harness.

## Usage

Use OpenCode's native `skill` tool:

```text
use skill tool to list skills
use skill tool to load strategy-flow/strategy-flow
```

Strategy Flow is a methodology layer. It does not replace the active workspace's TSLab Web API instructions. Use it together with the workspace that contains the actual TSLab API helpers and live localhost workflow.

## Updating

OpenCode installs Strategy Flow through a git-backed package spec. If an update does not appear after restart, clear OpenCode's package cache or reinstall the plugin.

To pin a specific version:

```json
{
  "plugin": ["strategy-flow@git+https://github.com/nagvalru/Strategy-Flow.git#v0.1.0"]
}
```

## Troubleshooting

### Plugin not loading

1. Check OpenCode logs: `opencode run --print-logs "hello" 2>&1 | grep -i strategy-flow`
2. Verify the plugin line in `opencode.json`
3. Make sure you are running a recent version of OpenCode

### Skills not found

1. Use OpenCode's `skill` tool to list available skills
2. Check that the plugin is loading
3. Each skill needs a `SKILL.md` file with valid YAML frontmatter

### Windows install issues

Some Windows OpenCode builds have upstream installer issues with git-backed plugin specs. If OpenCode cannot install the plugin, try installing with system npm and pointing OpenCode at the local package:

```powershell
npm install strategy-flow@git+https://github.com/nagvalru/Strategy-Flow.git --prefix "$HOME\.config\opencode"
```

Then use the installed package path in `opencode.json`:

```json
{
  "plugin": ["~/.config/opencode/node_modules/strategy-flow"]
}
```
